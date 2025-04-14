import IEvent from "@/store/interfaces/IEvent";
import EventCard from "../DayView/EventCard";
import { calculateEventLayout } from "@/lib/calculateEventLayout";
import { filterLongestInOverlaps } from "@/lib/filterLongestInOverlaps";

const offsetTop = 48;

export default function EventLayerColumn({
  events
}: {
  events: IEvent[];
}) {
  const filteredEvents = filterLongestInOverlaps(events);
  const positionedEvents = calculateEventLayout(filteredEvents);

  return (
    <>
      {positionedEvents.map((event, index) => (
        <div
          key={event.id}
          className="absolute left-[0] right-[0] px-1 py-0.5 transition-all duration-200"
          style={{
            top: event.top + offsetTop,
            height: event.height,
            zIndex: index + 1,
          }}
        >
          <EventCard event={event} />
        </div>
      ))}
    </>
  );
}
