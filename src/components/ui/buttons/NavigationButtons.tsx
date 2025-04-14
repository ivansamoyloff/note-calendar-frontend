'use client'

import { useRouter } from 'next/navigation';
import {
  format,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  addYears,
  subYears
} from 'date-fns';
import { CustomButton } from '../custom/CustomButton';

type ViewType = 'day' | 'week' | 'month' | 'year'

type BaseProps = {
  className?: string;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
}

type NavigateProps = {
  mode: 'navigate';
  view: ViewType;
  currentDate: Date;
} & BaseProps;

type ControlProps = {
  mode: 'control';
  onPrev: () => void;
  onNext: () => void;
} & BaseProps;

type NavButtonsProps = NavigateProps | ControlProps;

type Direction = 'prev' | 'next';

function getNextDate(view: ViewType, current: Date, direction: Direction): Date {
  switch (view) {
    case 'day':
      return direction === 'next' ? addDays(current, 1) : subDays(current, 1);
    case 'week':
      return direction === 'next' ? addWeeks(current, 1) : subWeeks(current, 1);
    case 'month':
      return direction === 'next' ? addMonths(current, 1) : subMonths(current, 1);
    case 'year':
      return direction === 'next' ? addYears(current, 1) : subYears(current, 1);
  }
}

export const NavigationButtons = (props: NavButtonsProps) => {
  const router = useRouter();
  
  const commonStyle = 'flex items-center justify-center';

  if (props.mode === 'navigate') {
    const { view, currentDate } = props;

    const handleNavigate = (date: Date, direction: Direction) => {
      const targetDate = getNextDate(view, date, direction);
      router.push(`/${view}/${format(targetDate, 'yyyy-MM-dd')}`)
    }

    return(
      <div className={`${commonStyle} ${props.className} gap-4`}>
        <CustomButton
          size='lg'
          variant='ghost'
          className='p-2 flex items-center justify-center'
          onClick={() => handleNavigate(currentDate, 'prev')}
        >
          <svg className='fill-current w-8 h-8' width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M20.9428 27.6095C20.4222 28.1302 19.5779 28.1302 19.0572 27.6095L8.39057 16.9428C7.86987 16.4221 7.86987 15.5779 8.39057 15.0572L19.0572 4.39052C19.5779 3.86982 20.4222 3.86982 20.9428 4.39052C21.4635 4.91122 21.4635 5.75544 20.9428 6.27614L11.219 16L20.9428 25.7239C21.4635 26.2446 21.4635 27.0888 20.9428 27.6095Z"/>
          </svg>
        </CustomButton>
        <CustomButton
          size='lg'
          variant='ghost'
          className='p-2 flex items-center justify-center'
          onClick={() => handleNavigate(currentDate, 'next')}
        >
        <svg className='fill-current w-8 h-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M11.0572 4.39052C11.5778 3.86983 12.4221 3.86983 12.9428 4.39052L23.6094 15.0572C24.1301 15.5779 24.1301 16.4221 23.6094 16.9428L12.9428 27.6095C12.4221 28.1302 11.5778 28.1302 11.0572 27.6095C10.5365 27.0888 10.5365 26.2446 11.0572 25.7239L20.781 16L11.0572 6.27614C10.5365 5.75544 10.5365 4.91122 11.0572 4.39052Z"/>
        </svg>
        </CustomButton>
      </div>
    );
  }
  
  return(
    <div className={`${commonStyle} ${props.className} gap-1`}>
      <CustomButton
        size='md'
        variant='ghost'
        className='p-2 flex items-center justify-center'
        onClick={props.onPrev}
      >
        <svg className='fill-current w-3.5 h-3.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M20.9428 27.6095C20.4222 28.1302 19.5779 28.1302 19.0572 27.6095L8.39057 16.9428C7.86987 16.4221 7.86987 15.5779 8.39057 15.0572L19.0572 4.39052C19.5779 3.86982 20.4222 3.86982 20.9428 4.39052C21.4635 4.91122 21.4635 5.75544 20.9428 6.27614L11.219 16L20.9428 25.7239C21.4635 26.2446 21.4635 27.0888 20.9428 27.6095Z"/>
        </svg>
      </CustomButton>
      <CustomButton
        size='md'
        variant='ghost'
        className='p-2 flex items-center justify-center'
        onClick={props.onNext}
      >
      <svg className='fill-current w-3.5 h-3.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M11.0572 4.39052C11.5778 3.86983 12.4221 3.86983 12.9428 4.39052L23.6094 15.0572C24.1301 15.5779 24.1301 16.4221 23.6094 16.9428L12.9428 27.6095C12.4221 28.1302 11.5778 28.1302 11.0572 27.6095C10.5365 27.0888 10.5365 26.2446 11.0572 25.7239L20.781 16L11.0572 6.27614C10.5365 5.75544 10.5365 4.91122 11.0572 4.39052Z"/>
      </svg>
      </CustomButton>
    </div>
  )
}