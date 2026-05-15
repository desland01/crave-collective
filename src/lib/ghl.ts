const BASE_URL = "https://services.leadconnectorhq.com";

function ghlHeaders() {
  return {
    Authorization: `Bearer ${process.env.GHL_API_KEY}`,
    "Content-Type": "application/json",
    Version: "2021-07-28",
  };
}

export type SlotsResponse = Record<string, { slots: string[] }>;

export async function getCalendarSlots(
  startDate: string,
  endDate: string,
  timezone = "America/New_York",
): Promise<SlotsResponse> {
  const calendarId = process.env.GHL_CALENDAR_ID;
  const url = `${BASE_URL}/calendars/${calendarId}/free-slots?startDate=${startDate}&endDate=${endDate}&timezone=${encodeURIComponent(timezone)}`;

  const res = await fetch(url, { method: "GET", headers: ghlHeaders() });

  if (!res.ok) {
    throw new Error(`GHL free-slots failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function createContact(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}): Promise<{ contactId: string }> {
  const res = await fetch(`${BASE_URL}/contacts/`, {
    method: "POST",
    headers: ghlHeaders(),
    body: JSON.stringify({
      ...data,
      locationId: process.env.GHL_LOCATION_ID,
    }),
  });

  if (!res.ok) {
    throw new Error(`GHL create-contact failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  return { contactId: json.contact.id };
}

export async function createAppointment(data: {
  contactId: string;
  startTime: string;
  endTime: string;
  title?: string;
}): Promise<{ id: string; status: string }> {
  const res = await fetch(`${BASE_URL}/calendars/events/appointments`, {
    method: "POST",
    headers: ghlHeaders(),
    body: JSON.stringify({
      calendarId: process.env.GHL_CALENDAR_ID,
      locationId: process.env.GHL_LOCATION_ID,
      contactId: data.contactId,
      startTime: data.startTime,
      endTime: data.endTime,
      title: data.title || "Game Plan Call",
      appointmentStatus: "new",
      toNotify: true,
    }),
  });

  if (!res.ok) {
    throw new Error(`GHL create-appointment failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" ") || "",
  };
}
