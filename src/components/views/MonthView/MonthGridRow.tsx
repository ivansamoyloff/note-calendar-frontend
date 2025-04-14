import MonthCell from "./MonthCell";

export default function MonthGridRow ({
  week,
  currentMonth
}: {
  week: Date[];
  currentMonth: number;
}) {
  return (
    <div className="grid grid-cols-7 border-b border-gray-20">
      {week.map((date) => (
        <MonthCell key={date.toISOString()} date={date} isCurrentMonth={date.getMonth() === currentMonth} />
      ))}
    </div>
  )
}