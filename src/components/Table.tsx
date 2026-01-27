import { useEffect, useState } from "react";
import type { EventData } from "../lib/types.ts";
import { latestUrl, eventsUrl } from "../lib/cons.ts";
import useWidth from "../lib/hooks/useWidth.tsx";

export default function Table({
  token,
  events,
}: {
  token?: string;
  events: EventData;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<EventData>(events);
  const windowWidth = useWidth();

  /* useEffect(() => {
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
  }, [token]); */

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
        {!data ? (
          <tr>
            <td colSpan={windowWidth > 640 ? 5 : 3} className="text-center">
              <b className="text-2xl italic">Loading...</b>
            </td>
          </tr>
        ) : (
          data.map((event) => (
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
                {(event.time_spent / 1000).toFixed(1)} sec
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
