import { parseISO, isValid } from 'date-fns';
import { NavigationButtons } from '../buttons/NavigationButtons';
import { formatDate } from '@/lib/date';

type ViewDateProps = {
  view: 'day' | 'week' | 'month' | 'year';
  date: string;
}

export default async function DateSwitcher({ view, date }: ViewDateProps) {
  const parsedDate = isValid(parseISO(date)) ? parseISO(date) : new Date();
  const title = formatDate(parsedDate);

  return(
    <div className='ml-10 flex items-center justify-center gap-4'>
      <NavigationButtons
        mode='navigate'
        view={view}
        currentDate={parsedDate}
      />
      <h2 className='font-saira font-light text-[40px]'>{title}</h2>
    </div>
  )
}