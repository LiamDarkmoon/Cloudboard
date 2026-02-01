import type { EventData } from "../types";
import { latestUrl, eventsUrl, eventUrl } from "../cons";

async function fetchEvent(url: string = eventsUrl, token?: string) {
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!res.ok) {
    throw new Error(`HTTP Error ${res.status}`);
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

export async function deleteEvent(id: number, token?: string) {
  const res = await fetch(eventUrl + id.toString(), {
    method: "DElETE",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!res.ok) {
    throw new Error(`HTTP Error ${res.status}`);
  }

  console.log("Event", id, "deleted");
}
