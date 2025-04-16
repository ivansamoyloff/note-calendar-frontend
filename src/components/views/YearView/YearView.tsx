'use client';

import { Calendar } from "@/components/ui/calendar/Calendar";
import { format } from "date-fns";
import { useRouter, usePathname } from "next/navigation"

export default function YearView({ date }: { date: Date }){
  const router = useRouter()
  const pathname = usePathname()
  const months = Array.from({ length: 12 }, (_, i) => new Date(date.getFullYear(), i, 1));

  const handleSelect = (newDate: Date | undefined): void => {
    if (!newDate) return

    const formatted = format(newDate, "yyyy-MM-dd")
    const segments = pathname.split("/")
    if (segments.length >= 2) {
      router.push(`/day/${formatted}`)
    }
  }

  return(
    <div className="grid grid-cols-4 gap-x-8 gap-y-0">
      {months.map((monthDate, idx) => {
        const header = () => (<span className="font-saira text-lg ml-1.5">{format(monthDate ,'MMMM')}</span>)
        return(
          <Calendar
            key={idx}
            mode='single'
            month={monthDate}
            header={header}
            handleSelect={(e) => handleSelect(e)}
            isYearView
          />
        )
      })}
    </div>
  );
}