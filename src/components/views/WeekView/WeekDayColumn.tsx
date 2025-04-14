'use client';

import TimeSlot from "../DayView/TimeSlot";
import IEvent from "@/store/interfaces/IEvent";
import { useRef, useState } from "react";
import { format, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import EventLayerColumn from "./EventLayerColumn";

const hours = Array.from({ length: 24 }, (_, i) => i);

export default function WeekDayColumn({
  date,
  events,
  first = false,
}: {
  date: Date,
  events: IEvent[],
  first?: boolean,
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [dragEndY, setDragEndY] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const y = e.clientY - containerRef.current.getBoundingClientRect().top;
    setDragStartY(y);
    setDragEndY(y);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartY === null || !containerRef.current) return;
    const y = e.clientY - containerRef.current.getBoundingClientRect().top;
    setDragEndY(y);
  };

  const coordToDate = (y: number): Date => {
    const totalMinutes = Math.floor(y / 50 * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const base = new Date(date);
    base.setHours(hours, minutes, 0, 0);
    return base;
  };

  const handleMouseUp = () => {
    if (dragStartY !== null && dragEndY !== null) {
      const top = Math.min(dragStartY, dragEndY);
      const bottom = Math.max(dragStartY, dragEndY);

      const startTime = coordToDate(top);
      const endTime = coordToDate(bottom);

      console.log('Создать черновик:', startTime, '→', endTime);

      setDragStartY(null);
      setDragEndY(null);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className={'flex flex-col items-center justify-center'}>
        <span className={cn(
          'font-saira font-[28px] text-center px-2 py-1 rounded-full select-none',
          isToday(date) ? 'bg-blue-50/30' : ''
        )}>
          {format(date, 'EEE, d')}
        </span>
        <div className={cn(
          "h-3 border-l-0 border-r-2 w-full border-gray-20",
          first ? 'border-l-2' : '' 
          )}></div>
      </div>
      {hours.map((hour, idx) => (
        <TimeSlot key={hour} idx={idx} lastHour={idx === 23} hour={hour} withoutLabel />
      ))}
      {dragStartY !== null && dragEndY !== null && (
        <div
          className="absolute left-0 right-0 bg-blue-400/40 rounded z-[10]"
          style={{
            top: Math.min(dragStartY, dragEndY),
            height: Math.abs(dragEndY - dragStartY),
          }}
        />
      )}
      <EventLayerColumn events={events} />
    </div>
  );
}