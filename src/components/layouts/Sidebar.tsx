import { AsideCalendar } from "../ui/calendar/AsideCalendar";

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
    <aside className="w-76 pt-8 shrink-0 flex flex-col justify-start items-start gap-8">
      <AsideCalendar date={dateParam} />
    </aside>
  )
}