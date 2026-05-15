import { NextRequest, NextResponse } from "next/server";
import { getCalendarSlots } from "@/lib/ghl";

export const revalidate = 60;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");

  if (!date || !DATE_RE.test(date)) {
    return NextResponse.json(
      { error: "Missing or invalid `date` param. Expected YYYY-MM-DD." },
      { status: 400 },
    );
  }

  try {
    const start = new Date(date + "T00:00:00");
    const end = new Date(start);
    end.setDate(end.getDate() + 13);

    const endDate = end.toISOString().split("T")[0];
    const data = await getCalendarSlots(date, endDate);

    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch slots";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
