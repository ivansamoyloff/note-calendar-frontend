import DayView from '@/components/views/DayView/DayView';
import WeekView from '@/components/views/WeekView/WeekView';
import MonthView from '@/components/views/MonthView/MonthView';
import YearView from '@/components/views/YearView/YearView';
import { notFound } from 'next/navigation';

const VALID_VIEWS = ['day', 'week', 'month', 'year'] as const;

type View = (typeof VALID_VIEWS)[number];


export default async function CalendarPage({ 
  params 
}: { 
  params: { view: string; date: string };
}){
  const { view, date } = await params;
  const curDate = new Date(date || new Date());

  const curView = view as View;

  if (!VALID_VIEWS.includes(curView)) {
    notFound();
  }

  const renderCurView = () => {
    switch (curView) {
      case 'day': return <DayView date={curDate}/>;
      case 'week': return <WeekView date={curDate}/>;
      case 'month': return <MonthView date={curDate}/>;
      case 'year': return <YearView date={curDate}/>;
    }
  }

  return (
    <main className="h-full pt-12 px-8 text-lg flex-1 overflow-auto rounded-t-[30px] rounded-b-none shadow-body-calendar">
      {renderCurView()}
    </main>
  )
}