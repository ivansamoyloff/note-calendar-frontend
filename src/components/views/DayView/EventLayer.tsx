import IEvent from "@/store/interfaces/IEvent";
import EventCard from "./EventCard";
import { calculateEventLayout } from "@/lib/calculateEventLayout";

export default function EventLayer({
  events,
  containerWidth
}: {
  events: IEvent[],
  containerWidth: number | null
}) {
  const positionedEvents = calculateEventLayout(events); // TODO: Add useMemo or think how to optimize rerenders

  return (
    <>
      {containerWidth &&
        positionedEvents.map((event) => {
          const availableWidth = containerWidth - 65;
          const left = event.leftPercent * availableWidth + 65;
          const width = event.widthPercent * availableWidth;
          return (
            <div
              key={event.id}
              className="absolute px-1 py-0.5 z-1"
              style={{
                top: event.top,
                height: event.height,
                left,
                width,
              }}
            >
              <EventCard event={event} />
            </div>
          )
        })
      }
    </>
  )
}