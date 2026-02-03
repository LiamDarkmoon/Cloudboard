import { useState } from "react";
import type { Evento } from "../lib/types";
import Icon from "../components/Icon";

export default function TableRow({
  event,
  onClick,
}: {
  event: Evento;
  onClick?: (id: number) => void;
}) {
  const [hover, setHover] = useState(false);

  return (
    <tr
      id={event.id.toString()}
      className="min-h-12 hover:bg-main-divider/30 hover:text-main-accent cursor-pointer"
      onClick={() => onClick && onClick(event.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <td className="border border-main-divider px-2 py-1 rounded truncate">
        {event.domain}
      </td>
      <td className="border border-main-divider px-2 py-1 rounded truncate hidden sm:block">
        {event.pathname}
      </td>
      <td className="border border-main-divider px-2 py-1 rounded truncate">
        {event.event_type}
      </td>
      <td className="border border-main-divider px-2 py-1 rounded truncate hidden sm:block">
        {event.element}
      </td>
      <td className="border border-main-divider px-2 py-1 rounded truncate text-end">
        {hover && <Icon name="eye" className="float-start" />}
        {event.id}
      </td>
    </tr>
  );
}
