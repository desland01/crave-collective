import { NextRequest, NextResponse } from "next/server";
import { createContact, createAppointment, splitName } from "@/lib/ghl";

type BookingPayload = {
  filmingTypes: string[];
  projectScope: string[];
  budgetTier: string | null;
  customBudget: string;
  preferredDate: string;
  preferredTime: string;
  name: string;
  email: string;
  phone: string;
};

const EMAIL_RECIPIENT = "dante@cravecollective.co";

function composeBrief(b: BookingPayload): string {
  const budgetLine =
    b.budgetTier === "custom" ? b.customBudget : b.budgetTier || "";

  return [
    `Filming: ${b.filmingTypes.join(", ")}`,
    `Production needs: ${b.projectScope.join(", ") || "Not specified"}`,
    `Budget: ${budgetLine}`,
    `Appointment: ${b.preferredDate} at ${b.preferredTime}`,
    `Contact: ${b.name} <${b.email}>${b.phone ? ` / ${b.phone}` : ""}`,
    "---",
    `Automated email recipient: ${EMAIL_RECIPIENT}`,
  ].join("\n");
}

function toISO(date: string, time: string): string {
  return `${date}T${time}:00-04:00`;
}

function addMinutes(iso: string, mins: number): string {
  const d = new Date(iso);
  d.setMinutes(d.getMinutes() + mins);
  return d.toISOString().replace("Z", "-04:00").replace(/\.\d{3}/, "");
}

export async function POST(req: NextRequest) {
  let body: BookingPayload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (
    !Array.isArray(body.filmingTypes) ||
    body.filmingTypes.length === 0 ||
    !body.name ||
    !body.email ||
    !body.preferredDate ||
    !body.preferredTime
  ) {
    return NextResponse.json(
      { ok: false, error: "filmingTypes, name, email, preferredDate, and preferredTime are required" },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { ok: false, error: "Automated email is not configured." },
      { status: 500 },
    );
  }

  try {
    const { firstName, lastName } = splitName(body.name);

    const { contactId } = await createContact({
      firstName,
      lastName,
      email: body.email,
      phone: body.phone,
    });

    const isoStart = toISO(body.preferredDate, body.preferredTime);
    const isoEnd = addMinutes(isoStart, 30);

    const appointment = await createAppointment({
      contactId,
      startTime: isoStart,
      endTime: isoEnd,
      title: `Game Plan Call: ${body.filmingTypes.join(", ")}`,
    });

    const brief = composeBrief(body);
    const emailRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: EMAIL_RECIPIENT,
        subject: `New Crave booking: ${body.filmingTypes.join(", ")}`,
        name: body.name,
        email: body.email,
        phone: body.phone,
        brief,
        budget:
          body.budgetTier === "custom"
            ? body.customBudget
            : body.budgetTier || "",
        filming_types: body.filmingTypes.join(", "),
        project_scope: body.projectScope.join(", "),
        preferred_date: body.preferredDate,
        preferred_time: body.preferredTime,
      }),
    });

    if (!emailRes.ok) {
      throw new Error(`Automated email failed: ${emailRes.status} ${emailRes.statusText}`);
    }

    return NextResponse.json({
      ok: true,
      appointmentId: appointment.id,
      emailRecipient: EMAIL_RECIPIENT,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Booking failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
