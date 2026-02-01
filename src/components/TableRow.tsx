import { useEffect } from "react";
import type { Evento } from "../lib/types";
import { getTime } from "../lib/utils/utils";

export default function TableRow({
  event,
  onClick,
}: {
  event: Evento;
  onClick?: (id: number) => void;
}) {
  const time = event ? getTime(event.created_at) : 0;

  return (
    <tr
      className="min-h-12 hover:bg-main-divider/30 hover:text-main-accent cursor-pointer"
      onClick={() => onClick && onClick(event.id)}
    >
      <td className="border border-main-divider px-2 py-1 rounded truncate">
        {event.domain}
      </td>
      <td className="border border-main-divider px-2 py-1 rounded truncate hidden sm:block">
        {event.pathname}
      </td>
      <td className="border border-main-divider px-2 py-1 rounded truncate">
        {event.element}
      </td>
      <td className="border border-main-divider px-2 py-1 rounded truncate">
        {event.event_type}
      </td>
      <td className="border border-main-divider px-2 py-1 rounded truncate hidden sm:block">
        {time}
      </td>
    </tr>
  );
}
