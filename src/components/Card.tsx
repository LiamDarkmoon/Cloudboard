import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Evento } from "../lib/types";
import { getTime } from "../lib/utils/utils";
import Icon from "../components/Icon";
import { actions } from "astro:actions";
import { success } from "zod";

type eDate = {
  created: string;
  updated: string;
  spent: string;
};

export default function Card({
  event,
  state,
  onClose,
}: {
  event?: Evento;
  token?: string;
  state: Dispatch<SetStateAction<number>>;
  onClose: () => void;
}) {
  const [eventDate, setEventDate] = useState<eDate>();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (event) {
      setEventDate({
        created: getTime(event.created_at),
        updated: getTime(event.updated_at),
        spent: event.time_spent.toFixed(1),
      });
      setIsVisible(true);
    }
  }, [event]);

  const handleClick = async (id: number) => {
    const deleted = actions.deleteEvent(id);
    deleted.then(() => {
      state((v) => v + 1);
      onClose();
    });
  };

  return (
    <>
      {isVisible && event ? (
        <div
          className="absolute top-0 left-0 h-full w-full  bg-main-bg/90 z-20 grid place-items-center"
          onClick={() => setIsVisible(false)}
        >
          <div className="relative z-30 max-h-screen w-full md:w-1/2 grid grid-cols-2 grid-rows-8 gap-3 text-center rounded-lg px-3 py-5 bg-main-bg shadow-md shadow-main-accent">
            <div className="col-span-2 row-span-1 flex gap-3 items-center justify-center border-b border-e border-main-divider p-3">
              <Icon
                name="x"
                className="absolute top-1 right-1 cursor-pointer hover:text-main-accent hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => setIsVisible(false)}
              />
              <h2 className="text-3xl">
                Event <b className="text-main-accent">{event.id}</b>
              </h2>
              <Icon
                event_id={event.id}
                name="trash"
                className="cursor-pointer hover:text-main-accent hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={handleClick}
              />
            </div>
            <div className="col-span-2 row-span-1 p-3 border-b border-e border-main-divider w-full">
              <h3>Domain: {event.domain}</h3>
            </div>

            <div className="col-span-2 grid grid-cols-3 gap-3">
              <span className="col-span-1 p-3 border-b border-e border-main-divider w-full">
                id: {event.id}
              </span>
              <span className="col-span-1 p-3 border-b border-e border-main-divider w-full">
                User id: {event.user_id}
              </span>
              <span className="col-span-1 p-3 border-b border-e border-main-divider w-full">
                Domain id: {event.domain_id}
              </span>
            </div>

            <div className="col-span-1 p-3 border-b border-e border-main-divider w-full">
              Element: {event.element}
            </div>
            <div className="col-span-1 p-3 border-b border-e border-main-divider w-full">
              Element: {event.element}
            </div>

            <div className="col-span-2 p-3 border-b border-e border-main-divider w-full">
              Referrer: {event.referrer}
            </div>
            <div className="col-span-2 p-3 border-b border-e border-main-divider w-full">
              Event: {event.event_type}
            </div>

            <div className="col-span-1 p-3 border-b border-e border-main-divider w-full">
              Screen H: {event.screen_height}
            </div>
            <div className="col-span-1 p-3 border-b border-e border-main-divider w-full">
              Screen W: {event.screen_width}
            </div>

            <div className="col-span-1 p-3 border-b border-e border-main-divider">
              <span>created: {eventDate?.created}</span>
            </div>
            <div className="col-span-1 p-3 border-b border-e border-main-divider">
              <span>Time: {eventDate?.spent}</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
