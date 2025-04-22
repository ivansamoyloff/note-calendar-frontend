
import WeekDayColumn from './WeekDayColumn';
import { addDays, startOfWeek } from 'date-fns';
import IEvent from "@/store/interfaces/IEvent";
// import CurrentTimeLine from "../DayView/CurrentTimeLine";
import { cn } from '@/lib/utils';
import { format } from "date-fns";


const _hours = Array.from({ length: 24 }, (_, i) => i);
const _days = (date: Date) => Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(date, { weekStartsOn: 0 }), i));

const mockEvents = [
  {
    id: 1,
    title: 'Team Sync',
    description: 'Daily stand-up with the team',
    meetLink: 'https://meet.example.com/team-sync',
    location: 'null',
    startDate: new Date('2025-04-09T09:00:00'),
    endDate: new Date('2025-04-09T09:30:00'),
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: 'Design Review',
    description: 'null',
    meetLink: 'null',
    location: 'Room 301',
    startDate: new Date('2025-04-09T09:15:00'),
    endDate: new Date('2025-04-09T10:15:00'),
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: '1:1 with Anna',
    description: 'Catch-up meeting',
    meetLink: 'https://meet.example.com/1-1',
    location: 'null',
    startDate: new Date('2025-04-09T10:00:00'),
    endDate: new Date('2025-04-09T11:00:00'),
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    title: 'Lunch Break',
    description: 'null',
    meetLink: 'null',
    location: 'null',
    startDate: new Date('2025-04-09T12:00:00'),
    endDate: new Date('2025-04-09T13:00:00'),
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    title: 'Workshop: AI Trends',
    description: 'Tech workshop with external speakers',
    meetLink: 'https://meet.example.com/ai-workshop',
    location: 'Conference Hall',
    startDate: new Date('2025-04-09T13:00:00'),
    endDate: new Date('2025-04-09T15:30:00'),
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    title: 'Marketing Sync',
    description: 'null',
    meetLink: 'null',
    location: 'Room 204',
    startDate: new Date('2025-04-09T14:00:00'),
    endDate: new Date('2025-04-09T15:00:00'),
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    title: 'All-hands Meeting',
    description: 'Monthly update for the entire company',
    meetLink: 'https://meet.example.com/allhands',
    location: 'null',
    startDate: new Date('2025-04-09T16:00:00'),
    endDate: new Date('2025-04-09T17:30:00'),
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // {
  //   id: 8,
  //   title: 'Focus Time',
  //   description: 'No meetings, deep work',
  //   meetLink: 'null',
  //   location: 'null',
  //   startDate: new Date('2025-04-09T08:00:00'),
  //   endDate: new Date('2025-04-09T11:30:00'),
  //   userId: 1,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // },
  // {
  //   id: 9,
  //   title: 'Evening Study Session',
  //   description: 'Frontend system design',
  //   meetLink: 'null',
  //   location: 'Home Office',
  //   startDate: new Date('2025-04-09T20:00:00'),
  //   endDate: new Date('2025-04-09T22:30:00'),
  //   userId: 1,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // },
  // {
  //   id: 10,
  //   title: 'Full-day Conference',
  //   description: 'Virtual event',
  //   meetLink: 'https://meet.example.com/full-day',
  //   location: 'null',
  //   startDate: new Date('2025-04-09T00:00:00'),
  //   endDate: new Date('2025-04-09T23:59:00'),
  //   userId: 1,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // },
  // {
  //   id: 11,
  //   title: 'Full-day Conference',
  //   description: 'Virtual event',
  //   meetLink: 'https://meet.example.com/full-day',
  //   location: 'null',
  //   startDate: new Date('2025-04-09T00:00:00'),
  //   endDate: new Date('2025-04-09T23:59:00'),
  //   userId: 1,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // },
];


export default function WeekView({ allEvents = mockEvents, date }: { allEvents: IEvent[], date: Date }) {

  return (
    <div className="relative grid grid-cols-[65px_repeat(7,minmax(0,1fr))] h-full w-full">
      <div className="flex flex-col mt-12">
        {_hours.map((hour, idx, arr) => (
          <div className="flex h-[50px]" key={hour}>
            <div className="flex flex-col items-start justify-between">
              <div className="relative w-[55px] h-5">
                <span className={cn(
                  'w-[55px] font-saira font-medium text-[14px] leading-5 absolute -inset-y-3 select-none',
                  idx === 0 ? '-inset-y-2.5' : '-inset-y-[12px]'
                )}>
                  {format(new Date().setHours(hour, 0, 0, 0), 'h aaa')}
                </span>
              </div>
            </div>
            <div className={cn(
              'min-w-3 border-[2px] border-l-0 border-gray-20 dark:border-blue-80',
              idx === 0 ? '' : 'border-t-0',
              idx + 1 === arr.length ? 'border-b-0' : ''
            )}>
            </div>
          </div>
        ))}
      </div>
      {/* <CurrentTimeLine /> */}
      {_days(date).map((date, idx) => {
        const events = allEvents.filter((e) =>
          new Date(e.startDate).toDateString() === date.toDateString()
        );
        return <WeekDayColumn key={date.toISOString()} date={date} events={events} first={idx === 0}/>;
      })}
    </div>
  );
}