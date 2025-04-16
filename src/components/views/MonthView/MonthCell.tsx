import { isToday, isBefore, startOfDay, format } from "date-fns";
import { cn } from "@/lib/utils";
import EventGroup from "./EventGroup";

export default function MonthCell({
  date,
  isCurrentMonth,
  lastDay
}: {
  date: Date;
  isCurrentMonth: boolean;
  lastDay: boolean;
}) {
  const today = isToday(date);
  const isBeforeToday = isBefore(startOfDay(date), startOfDay(new Date()));

  return (
    <div className={cn(
      "border-gray-20  px-2 py-1 h-full flex flex-col items-center",
      !lastDay && 'border-r-[2px]'
    )}>
      <span className={cn(
        'font-saira font-normal text-base mb-2 px-2 py-1 flex justify-center rounded-full',
        today && 'bg-blue-50/50 text-white',
        !isCurrentMonth && 'text-disabled'
      )}>
        {format(date, 'd')}
      </span>
      <EventGroup
        events={[]}
        isBeforeToday={isBeforeToday}
        isCurrentMonth={isCurrentMonth}
      />      
    </div>
  );
};
