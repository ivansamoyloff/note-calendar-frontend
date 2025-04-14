import { cn } from "@/lib/utils";
import IEvent from "@/store/interfaces/IEvent";
import { format } from "date-fns";

export default function EventCard({ event }: { event: IEvent & { height: number } }) {
  return (
    <div className={cn(
      `bg-blue-50/70 text-gray-70 rounded-[9px] px-2 py-1
      font-saira font-medium text-[14px] h-full w-full flex cursor-pointer select-none`,
      event.height > 40 ? 'flex-col justify-start': 'flex-row justify-between'
    )}>
      <span className={cn(
        event.height < 55 ? 'truncate' : ''
      )}>{event.title}</span>
      <span>{format(event.startDate, 'hh:mm aaa')}</span>
    </div>
  )
}