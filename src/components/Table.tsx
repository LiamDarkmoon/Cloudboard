import { useEffect, useState } from "react";

export default function Table({ token }: { token: string | undefined }) {
  type EventData = {
    id: number;
    element: string;
    event_type: string;
    created_at: Date;
    time_spent: number;
    updated_at: Date;
    domain: string;
    pathname: string;
    referrer: string;
    user_agent: string;
    screen_width: number;
    screen_height: number;
    session_id: string;
    user_id: number;
    domain_id: number;
  }[];

  const [events, setEvents] = useState<EventData | null>(null);
  const latestUrl = "https://cloudapi-chi.vercel.app/events/event/latest";
  const eventsUrl = "https://cloudapi-chi.vercel.app/events/";

  useEffect(() => {
    let eData: EventData | null = null;
    fetch(token ? eventsUrl : latestUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        eData = data;
        console.log(data);
        setEvents(eData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <table className="table-fixed w-full border-separate border-spacing-1 rounded-md border-main-divider">
      <thead>
        <tr>
          <th className="border border-main-divider rounded">Website</th>
          <th className="border border-main-divider rounded">Path</th>
          <th className="border border-main-divider rounded">Element</th>
          <th className="border border-main-divider rounded">Event</th>
          <th className="border border-main-divider rounded">Time spent</th>
        </tr>
      </thead>
      <tbody>
        {events ? (
          events.map((event) => (
            <tr key={event.id}>
              <td className="border border-main-divider px-2 py-1 rounded">
                {event.domain}
              </td>
              <td className="border border-main-divider px-2 py-1 rounded">
                {event.pathname}
              </td>
              <td className="border border-main-divider px-2 py-1 rounded">
                {event.element}
              </td>
              <td className="border border-main-divider px-2 py-1 rounded">
                {event.event_type}
              </td>
              <td className="border border-main-divider px-2 py-1 rounded">
                {(event.time_spent / 1000).toFixed(2)} seconds
              </td>
            </tr>
          ))
        ) : (
          <div className="w-full h-full text-center py-4 grid place-items-center">
            <b className="text-2xl italic">Loading...</b>
          </div>
        )}
      </tbody>
    </table>
  );
}
