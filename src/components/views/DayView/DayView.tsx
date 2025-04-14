import TimeTable from "./TimeTable";

export default async function DayView({ date }: { date: Date }) {
  return (
    <div className="relative h-full">
      <TimeTable curDate={date} />
    </div>
  );
};