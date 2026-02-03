import { useEffect, useState } from "react";
import type { Evento, EventData } from "../lib/types.ts";
import TableRow from "./TableRow";
import Card from "./Card.tsx";
import { actions } from "astro:actions";

export default function Table({
  token,
  events,
}: {
  token?: string;
  events: EventData;
}) {
  const [version, setVersion] = useState(0);
  const [data, setData] = useState<EventData>(events);
  const [pointedData, setPointedData] = useState<Evento>();

  useEffect(() => {
    const updateData = async () => {
      const { data, error } = await actions.fetchEvents();
      if (error) {
        console.log(error);
      } else setData(data);
    };
    if (version > 0) {
      updateData();
    }
  }, [version]);

  const handleClick = async (id: number) => {
    const { data, error } = await actions.fetchEvent(id);
    if (error) {
      console.log(error);
    } else setPointedData(data);
  };

  return (
    <div className="h-full overflow-scroll hide-scrollbar">
      {pointedData ? (
        <Card
          event={pointedData}
          token={token}
          state={setVersion}
          onClose={() => setPointedData(undefined)}
        />
      ) : null}

      <table className="table-fixed min-h-12 w-full border-separate border-spacing-1 rounded-md border-main-divider">
        <thead className="sticky top-0">
          <tr className="min-h-12 bg-main-divider">
            <th className="border border-main-divider rounded truncate">
              Website
            </th>
            <th className="border border-main-divider rounded truncate hidden sm:block">
              Path
            </th>
            <th className="border border-main-divider rounded truncate">
              Event
            </th>
            <th className="border border-main-divider rounded truncate hidden sm:block">
              Element
            </th>
            <th className="border border-main-divider rounded truncate">Id</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((event) => (
              <TableRow key={event.id} event={event} onClick={handleClick} />
            ))}
        </tbody>
      </table>
    </div>
  );
}
