import MonthCell from "./MonthCell";
import { cn } from "@/lib/utils";

export default function MonthGridRow ({
  week,
  currentMonth,
  lastRow,
}: {
  week: Date[];
  currentMonth: number;
  lastRow: boolean;
}) {
  return (
    <div className={cn(
      "grid grid-cols-7 border-gray-20 dark:border-blue-80",
      !lastRow && 'border-b-[2px]'
    )}>
      {week.map((date, idx) => (
        <MonthCell
          key={date.toISOString()}
          date={date}
          isCurrentMonth={date.getMonth() === currentMonth}
          lastDay={idx === 6}
        />
      ))}
    </div>
  )
}