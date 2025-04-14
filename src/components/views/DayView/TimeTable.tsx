'use client';

import { useRef, useState, useEffect } from "react";
import TimeSlot from "./TimeSlot";
import CurrentTimeLine from "./CurrentTimeLine";
import EventLayer from "./EventLayer";
import IEvent from "@/store/interfaces/IEvent";

const _hours = Array.from({ length: 24 }, (_, i) => i);

// const mockEvents = [
//   {
//     id: 1,
//     title: 'Team Sync',
//     description: 'Daily stand-up with the team',
//     meetLink: 'https://meet.example.com/team-sync',
//     location: 'null',
//     startDate: new Date('2025-04-09T09:00:00'),
//     endDate: new Date('2025-04-09T09:30:00'),
//     userId: 1,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 2,
//     title: 'Design Review',
//     description: 'null',
//     meetLink: 'null',
//     location: 'Room 301',
//     startDate: new Date('2025-04-09T09:15:00'),
//     endDate: new Date('2025-04-09T10:15:00'),
//     userId: 1,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 3,
//     title: '1:1 with Anna',
//     description: 'Catch-up meeting',
//     meetLink: 'https://meet.example.com/1-1',
//     location: 'null',
//     startDate: new Date('2025-04-09T10:00:00'),
//     endDate: new Date('2025-04-09T11:00:00'),
//     userId: 1,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 4,
//     title: 'Lunch Break',
//     description: 'null',
//     meetLink: 'null',
//     location: 'null',
//     startDate: new Date('2025-04-09T12:00:00'),
//     endDate: new Date('2025-04-09T13:00:00'),
//     userId: 1,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 5,
//     title: 'Workshop: AI Trends',
//     description: 'Tech workshop with external speakers',
//     meetLink: 'https://meet.example.com/ai-workshop',
//     location: 'Conference Hall',
//     startDate: new Date('2025-04-09T13:00:00'),
//     endDate: new Date('2025-04-09T15:30:00'),
//     userId: 1,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 6,
//     title: 'Marketing Sync',
//     description: 'null',
//     meetLink: 'null',
//     location: 'Room 204',
//     startDate: new Date('2025-04-09T14:00:00'),
//     endDate: new Date('2025-04-09T15:00:00'),
//     userId: 1,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 7,
//     title: 'All-hands Meeting',
//     description: 'Monthly update for the entire company',
//     meetLink: 'https://meet.example.com/allhands',
//     location: 'null',
//     startDate: new Date('2025-04-09T16:00:00'),
//     endDate: new Date('2025-04-09T17:30:00'),
//     userId: 1,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 8,
//     title: 'Focus Time',
//     description: 'No meetings, deep work',
//     meetLink: 'null',
//     location: 'null',
//     startDate: new Date('2025-04-09T08:00:00'),
//     endDate: new Date('2025-04-09T11:30:00'),
//     userId: 1,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 9,
//     title: 'Evening Study Session',
//     description: 'Frontend system design',
//     meetLink: 'null',
//     location: 'Home Office',
//     startDate: new Date('2025-04-09T20:00:00'),
//     endDate: new Date('2025-04-09T22:30:00'),
//     userId: 1,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 10,
//     title: 'Full-day Conference',
//     description: 'Virtual event',
//     meetLink: 'https://meet.example.com/full-day',
//     location: 'null',
//     startDate: new Date('2025-04-09T00:00:00'),
//     endDate: new Date('2025-04-09T23:59:00'),
//     userId: 1,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 11,
//     title: 'Full-day Conference',
//     description: 'Virtual event',
//     meetLink: 'https://meet.example.com/full-day',
//     location: 'null',
//     startDate: new Date('2025-04-09T00:00:00'),
//     endDate: new Date('2025-04-09T23:59:00'),
//     userId: 1,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];

const mockEvents: IEvent[] = [];

export default function TimeTable({ curDate }: { curDate: Date }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [containerWidth, setContainerWidth] = useState<number | null>(null);
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
    const base = curDate ? new Date(curDate) : new Date();
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
      // TODO: dispatch createDraftEvent або викликати модалку
  
      // Очистити стейт
      setDragStartY(null);
      setDragEndY(null);
    }
  };
  

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
  
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <CurrentTimeLine />
      {_hours.map((hour, idx, arr) => (
        <TimeSlot
          key={hour}
          idx={idx}
          lastHour={arr.length === idx + 1}
          hour={hour}
        />
      ))}
      {dragStartY !== null && dragEndY !== null && (
        <div
          className="absolute left-[65px] right-0 bg-blue-400/40 rounded z-[10]"
          style={{
            top: Math.min(dragStartY, dragEndY),
            height: Math.abs(dragEndY - dragStartY)
          }}
        />
      )}
      <EventLayer events={mockEvents} containerWidth={containerWidth} />
    </div>
  )
}