import { useEffect, useState } from "react";
import type { Evento, EventData } from "../lib/types.ts";
import { latestUrl, eventsUrl, eventUrl } from "../lib/cons.ts";
import useWidth from "../lib/hooks/useWidth.tsx";
import { getEvent } from "../lib/utils/fetch.ts";
import TableRow from "./TableRow";

export default function Table({
  token,
  events,
}: {
  token?: string;
  events: EventData;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<EventData>(events);
  const [pointedData, setPointedData] = useState<Evento>();
  const windowWidth = useWidth();

  const handleClick = async (id: number) => {
    const event = await getEvent(id, token);
    console.log("Fetched event data:", event);
    setPointedData(event);
  };

  return (
    <table className="table-fixed min-h-12 w-full border-separate border-spacing-1 rounded-md border-main-divider">
      <thead>
        <tr className="min-h-12 bg-main-divider/50">
          <th className="border border-main-divider rounded truncate">
            Website
          </th>
          <th className="border border-main-divider rounded truncate hidden sm:block">
            Path
          </th>
          <th className="border border-main-divider rounded truncate">
            Element
          </th>
          <th className="border border-main-divider rounded truncate">Event</th>
          <th className="border border-main-divider rounded truncate hidden sm:block">
            Time spent
          </th>
        </tr>
      </thead>
      <tbody>
        {!data && !pointedData ? (
          <tr>
            <td colSpan={windowWidth > 640 ? 5 : 3} className="text-center">
              <b className="text-2xl italic">Loading...</b>
            </td>
          </tr>
        ) : pointedData ? (
          <TableRow event={pointedData} />
        ) : (
          data.map((event) => (
            <TableRow key={event.id} event={event} onClick={handleClick} />
          ))
        )}
      </tbody>
    </table>
  );
}
