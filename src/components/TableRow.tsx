import { useEffect } from "react";
import type { Evento } from "../lib/types";

export default function TableRow({
  event,
  onClick,
}: {
  event: Evento;
  onClick?: (id: number) => void;
}) {
  return (
    <tr
      key={event.id}
      className="min-h-12 hover:bg-main-divider/30 hover:text-main-accent cursor-pointer"
      onClick={() => onClick && onClick(event.id)}
    >
      <td
        className="border border-main-divider px-2 py-1 rounded truncate"
        onClick={() => onClick && onClick(event.id)}
      >
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
        {(event.time_spent / 1000).toFixed(1)} sec
      </td>
    </tr>
  );
}
