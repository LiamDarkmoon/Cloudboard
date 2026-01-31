import { useEffect, useState } from "react";
import type { Evento } from "../lib/types";
import { getTime } from "../lib/utils/utils";

export default function Card({ event }: { event: Evento }) {
  const [isVisible, setIsVisible] = useState(true);
  const created = getTime(event.created_at);
  const updated = getTime(new Date());

  return (
    <>
      {isVisible ? (
        <div
          className="absolute top-0 left-0 h-full w-full  bg-main-bg/90 z-20 grid place-items-center"
          onClick={() => !setIsVisible}
        >
          <div className="w-4/5 md:w-1/2 flex flex-col items-center justify-center text-center rounded-lg px-3 py-5 bg-main-bg shadow-md shadow-main-accent">
            <div className="px-1.5 py-3 border-b border-main-divider w-full">
              <h2 className="text-xl border-b border-main-divider pb-1.5">
                Event
              </h2>
              <h3 className="pt-1.5">Domain: {event.domain}</h3>
            </div>

            <div className="flex justify-around px-1.5 py-3 border-b border-main-divider w-full">
              <span>id: {event.id}</span>
              <span>User id: {event.user_id}</span>
              <span>Domain id: {event.domain_id}</span>
            </div>

            <div className="px-1.5 py-3 border-b border-main-divider w-full">
              Path: {event.pathname}
            </div>
            <div className="px-1.5 py-3 border-b border-main-divider w-full">
              Referrer: {event.referrer}
            </div>
            <div className="px-1.5 py-3 border-b border-main-divider w-full">
              Element: {event.element}
            </div>
            <div className="px-1.5 py-3 border-b border-main-divider w-full">
              Event: {event.event_type}
            </div>

            <div className="flex justify-around px-1.5 py-3 border-b border-main-divider w-full">
              <span>Screen H: {event.screen_height}</span>
              <span>Screen W: {event.screen_width}</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-around px-1.5 py-3 w-full">
              <span>Time: {event.time_spent.toFixed(1)}</span>
              <span>Created: {created}</span>
              <span>Updated: {updated}</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
