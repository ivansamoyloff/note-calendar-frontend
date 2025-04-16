import MonthGridRow from "./MonthGridRow";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { cn } from "@/lib/utils";

export default function MonthView({ date }: { date: Date }) {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start, end });

  const rows = Array.from({ length: 6 }, (_, i) => days.slice(i * 7, i * 7 + 7));
  const filledRows = rows.filter((row) => row.length > 0).length;

  const gridClass = {
    4: 'grid-rows-4',
    5: 'grid-rows-5',
    6: 'grid-rows-6',
  }[filledRows] || 'grid-rows-6';

  console.log(gridClass)

  return (
    <div className={cn(
      "grid h-full w-full",
      gridClass
    )}>
      {rows.map((week, idx) => !!week.length && (
        <MonthGridRow
          key={idx}
          week={week}
          currentMonth={date.getMonth()}
          lastRow={idx + 1 === rows.length}
        />
      ))}
    </div>
  );
};