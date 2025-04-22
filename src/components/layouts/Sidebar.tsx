import { AsideCalendar } from "../ui/calendar/AsideCalendar";
import CreateEventButton from '../ui/buttons/CreateEventButton';

const VALID_VIEWS = ['day', 'week', 'month', 'year'] as const;
type View = typeof VALID_VIEWS[number];

export default async function Sidebar({ 
  params 
}: { 
  params: { view: string; date: string };
}) {
  const awaitParams = await params;

  const viewParam =  awaitParams.view;
  const dateParam =  awaitParams.date;

  const view = (VALID_VIEWS.includes(viewParam as View)
  ? viewParam
  : 'day') as View;
  return(
    <aside className="w-76 pt-8 shrink-0 flex flex-col justify-start items-center gap-16 mx-11 ml-0">
      <CreateEventButton />
      <div className="flex flex-col gap-7 items-center">
        <div className="min-h-[2px] min-w-45 max-w-45 bg-gray-20 dark:bg-blue-80"></div>
        <AsideCalendar date={dateParam} />
        <div className="min-h-[2px] min-w-45 max-w-45 bg-gray-20 dark:bg-blue-80"></div>
      </div>
      
    </aside>
  )
}