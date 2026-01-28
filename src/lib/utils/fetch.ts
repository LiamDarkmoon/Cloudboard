import type { EventData } from "../types";
import { latestUrl, eventsUrl, eventUrl } from "../cons";

async function fetchEvent(url: string, token?: string) {
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!res.ok) {
    throw new Error(`HTTP error ${res.status}`);
  }

  const data = await res.json();

  return data;
}

export async function getEvent(id?: number, token?: string) {
  if (!id) {
    const data = await fetchEvent(latestUrl);
    return [data];
  } else {
    const url = eventUrl + id.toString();
    const data = await fetchEvent(url, token);
    return data;
  }
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
    const data = await fetchEvent(url, token);
    const normalized: EventData = Array.isArray(data) ? data : [data];
    events = normalized.length > 1 ? normalized.slice().reverse() : normalized;
  } catch (error) {
    events = [];
  }
  return events;
}
