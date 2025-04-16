import { cn } from "@/lib/utils";
import { isBefore } from "date-fns";
import IEvent from "@/store/interfaces/IEvent";
import ITask from "@/store/interfaces/ITask";

export default function EventGroup ({
  events,
  isBeforeToday,
  isCurrentMonth
}: {
  events: ITask[] | IEvent[];
  isBeforeToday: boolean;
  isCurrentMonth: boolean;
}) {
  // const alreadyFinished = isBefore(date, new Date());
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center gap-1 w-full">
        <div className={cn(
          "rounded-full min-h-2 min-w-2",
          (isBeforeToday || !isCurrentMonth) ? 'bg-blue-50/20' : 'bg-blue-50/50'
        )}></div>
        <span className={cn(
        "font-saira text-xs truncate",
        (isBeforeToday || !isCurrentMonth) && 'text-disabled'
      )}>Tasks placed here</span>
      </div>
      <div className="flex items-center gap-1 w-full">
      <div className={cn(
          "rounded-full min-h-2 min-w-2",
          (isBeforeToday || !isCurrentMonth) ? 'bg-green-50/20' : 'bg-green-50/50'
        )}></div>
        <span className={cn(
        "font-saira text-xs truncate",
        (isBeforeToday || !isCurrentMonth) && 'text-disabled'
      )}>Tasks placed here text yesytasd </span>
      </div>
    </div>
  );
};
