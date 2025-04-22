'use client';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type Props = {
  view: 'day' | 'week' | 'month' | 'year';
  date: Date;
};

const views = ['day', 'week', 'month', 'year'] as const


export const ViewSwitcher = ({ view = 'day', date }: Props) => {
  const router = useRouter();

  const handleChange = (newView: string) => {
    const dateStr = date.toISOString().split('T')[0]
    router.push(`/${newView}/${dateStr}`)
  }

  return (
    <div
      className={
        `relative p-1 inline-flex border border-gray-80
        dark:border-gray-10
        rounded-[5px] overflow-hidden gap-2 
        transition-all duration-300 ease-in-out`
      }
    >
      {views.map((v) => (
        <button
          key={v}
          onClick={() => handleChange(v)}
          className={cn(
            'px-4 py-2 text-sm transition-all duration-300 ease-in-out rounded-[5px] font-mono font-normal',
            view === v
              ? 'bg-blue-50 text-gray-10 focus-visible:text-blue-70 focus-visible:outline-blue-70 dark:text-blue-100 dark:bg-blue-70'
              : 'text-blue-80 dark:text-gray-10 hover:bg-blue-30 hover:text-blue-80/80 focus-visible:text-blue-50 focus-visible:outline-blue-50'
          )}
        >
          {v[0].toUpperCase() + v.slice(1)}
        </button>
      ))}
    </div>
  )
};
