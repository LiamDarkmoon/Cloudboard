import { useEffect, useState } from "react";

export default function Table({ token }: { token?: string }) {
  type Event = {
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
  };
  type EventData = Event[];

  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<EventData>([]);
  const latestUrl = "https://cloudapi-chi.vercel.app/events/event/latest";
  const eventsUrl = "https://cloudapi-chi.vercel.app/events/";

  useEffect(() => {
    let eData: EventData = [];
    fetch(token ? eventsUrl : latestUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const normalized: EventData = Array.isArray(data) ? data : [data];

        const ordered =
          normalized.length > 1 ? normalized.slice().reverse() : normalized;

        setEvents(ordered);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  return (
    <table className="table-fixed min-h-14 w-full border-separate border-spacing-1 rounded-md border-main-divider">
      <thead>
        <tr>
          <th className="border border-main-divider rounded">Website</th>
          <th className="border border-main-divider rounded hidden sm:block">
            Path
          </th>
          <th className="border border-main-divider rounded">Element</th>
          <th className="border border-main-divider rounded">Event</th>
          <th className="border border-main-divider rounded hidden sm:block">
            Time spent
          </th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={5} className="text-center">
              <b className="text-2xl italic">Loading...</b>
            </td>
          </tr>
        ) : (
          events.map((event) => (
            <tr key={event.id}>
              <td className="border border-main-divider px-2 py-1 rounded">
                {event.domain}
              </td>
              <td className="border border-main-divider px-2 py-1 rounded hidden sm:block">
                {event.pathname}
              </td>
              <td className="border border-main-divider px-2 py-1 rounded">
                {event.element}
              </td>
              <td className="border border-main-divider px-2 py-1 rounded">
                {event.event_type}
              </td>
              <td className="border border-main-divider px-2 py-1 rounded hidden sm:block">
                {(event.time_spent / 1000).toFixed(2)} seconds
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
