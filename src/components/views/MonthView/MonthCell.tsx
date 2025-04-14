import { isToday, format } from "date-fns";
import { cn } from "@/lib/utils";

export default function MonthCell({
  date,
  isCurrentMonth
}: {
  date: Date;
  isCurrentMonth: boolean;
}) {
  const today = isToday(date);   
  return (
    <div className="border-r border-gray-20 p-1 h-full">
      <div className={cn(
        'text-xs font-medium mb-1 rounded px-1',
        today && 'bg-blue-50/50 text-white',
        !isCurrentMonth && 'text-gray-50'
      )}>
        {format(date, 'd')}
      </div>
      <span>Tasks placed here</span>
    </div>
  );
};
