import MonthGridRow from "./MonthGridRow";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

export default function MonthView({ date }: { date: Date }) {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start, end });

  const rows = Array.from({ length: 6 }, (_, i) => days.slice(i * 7, i * 7 + 7));

  return (
    <div className="grid grid-rows-6 h-full w-full">
      {rows.map((week, i) => (
        <MonthGridRow key={i} week={week} currentMonth={date.getMonth()} />
      ))}
    </div>
  );
};