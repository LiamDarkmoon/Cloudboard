import type { EventData, Evento } from "../types";
import { latestUrl, eventsUrl, eventUrl } from "../cons";

async function fetchEvent(url: string = latestUrl, token?: string) {
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!res.ok) {
    throw new Error(`HTTP Error ${res.status}`);
  }

  return await res.json();
}

export async function getEvent(id?: number, token?: string): Promise<Evento> {
  if (!id) {
    const data = await fetchEvent();
    return data;
  } else {
    const url = eventUrl + id.toString();
    const data = await fetchEvent(url, token);
    return data;
  }
}

export async function getAllEvents(token?: string) {
  let events: EventData = [];

  try {
    const data = await fetchEvent(eventsUrl, token);
    events = data;
  } catch (error) {
    events = [];
  }
  return events;
}
