import { ViewSwitcher } from '../ui/switchers/ViewSwitcher';
import DateSwitcher from '../ui/switchers/DateSwitcher';
import SignButton from '../ui/buttons/SignButton';
import SettingsButton from '../ui/buttons/SettingsButton';

const VALID_VIEWS = ['day', 'week', 'month', 'year'] as const;
type View = typeof VALID_VIEWS[number];

export default async function Header({ 
  params 
}: { 
  params: { view: string; date: string };
}){
  const awaitParams = await params;

  const viewParam =  awaitParams.view;
  const dateParam =  awaitParams.date;

  const view = (VALID_VIEWS.includes(viewParam as View)
  ? viewParam
  : 'day') as View;

  return(
    <header className='mb-12 flex flex-col gap-8'>
      <div className='flex items-center justify-end gap-6'>
        <SignButton />
        <SettingsButton />
      </div>
      <div
        className='flex items-center justify-start gap-18'
      >

        <div
          className='flex flex-1 items-center justify-between'
        >
          <DateSwitcher view={view} date={dateParam}/>
          <ViewSwitcher view={view} date={new Date(dateParam)}/>
        </div>
      </div>
    </header>
  );
};
