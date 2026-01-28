import type { EventData } from "../types";
import { latestUrl, eventsUrl } from "../cons";

async function fetchEvent({ url, token }: { url: string; token?: string }) {
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!res.ok) {
    throw new Error(`HTTP error ${res.status}`);
  }

  const data = await res.json();

  return data;
}

export async function getLastEvent() {
  const data = await fetchEvent({ url: latestUrl });
  return [data];
}

export async function getAllEvents({
  url,
  token,
}: {
  url: string;
  token?: string;
}) {
  let events: EventData = [];

  try {
    const data = await fetchEvent({ url, token });
    const normalized: EventData = Array.isArray(data) ? data : [data];
    events = normalized.length > 1 ? normalized.slice().reverse() : normalized;
  } catch (error) {
    console.error(error);
    events = [];
  }
  console.log(events);

  return events;
}
