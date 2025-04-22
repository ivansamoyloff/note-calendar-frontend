'use client';

import { useMemo } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function TimeSlot({ 
  hour,
  idx,
  lastHour,
  withoutLabel = false,
}: { 
  hour: number,
  idx: number,
  lastHour: boolean,
  withoutLabel?: boolean,
 }) {
  const hourRange = useMemo(() => {
    const start = format(new Date().setHours(hour, 0, 0, 0), 'h aaa');
    const end = format(new Date().setHours(hour + 1, 0, 0, 0), 'H aaa');
    return [start, end];
  }, [hour]);

  return (
    <div className={cn(
      `relative h-[50px] flex`
    )}>
      {!withoutLabel && (
        <>
          <div className="flex flex-col items-start justify-between">
            <div className="relative w-[55px] h-5">
              <span className={cn(
                'w-[55px] font-saira font-medium text-[14px] leading-5 absolute -inset-y-3 select-none',
                idx === 0 ? '-inset-y-2.5' : '-inset-y-[12px]'
              )}>
                {hourRange[0]}
              </span>
            </div>
          </div>
          <div className={cn(
            'w-3 border-[2px] border-l-0 border-gray-20 dark:border-blue-80',
            idx === 0 ? '' : 'border-t-0',
            lastHour ? 'border-b-0' : ''
          )}>
          </div>
        </>
      )}
      <div className={cn(
        'w-full px-2 py-1 border-[2px] border-l-0 border-r-0 border-gray-20 cursor-grab dark:border-blue-80',
        idx === 0 ? '' : 'border-t-0',
        lastHour ? 'border-b-0' : '',
        withoutLabel ? 'border-r-2' : ''
      )}>

      </div>
    </div>
    
  )
}