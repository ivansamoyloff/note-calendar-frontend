'use client';

import { useRouter, usePathname } from "next/navigation"
import { useMemo, useState } from "react";
import { format, parseISO, addMonths, subMonths, isSameMonth} from "date-fns";
import { formatDate } from "@/lib/date";
import { DayPickerProps } from "react-day-picker";
import CalendarHeader from './CalendarHeader';
import { Calendar } from './Calendar';

export const AsideCalendar = ({ date }: { date: string }) => {

  const router = useRouter()
  const pathname = usePathname()

  const selected = useMemo(() => parseISO(date), [date])
  const [month, setMonth] = useState(selected)

  const handleSelect = (newDate: Date | undefined) => {
    if (!newDate) return

    const formatted = format(newDate, "yyyy-MM-dd")
    const segments = pathname.split("/")
    if (segments.length >= 2) {
      const view = segments[1]
      router.push(`/${view}/${formatted}`)
    }
  }

  const modifiers: DayPickerProps["modifiers"] = {};

  if (selected) {
    modifiers.selected = selected;
  }

  const header = () => 
    <CalendarHeader
      date={isSameMonth(selected, month) ? formatDate(new Date(date), 'short') : format(month, 'MMM, yyyy')}
      onPrev={() => setMonth(prev => subMonths(prev, 1))}
      onNext={() => setMonth(prev => addMonths(prev, 1))}
    />

  return (
    <Calendar
      header={header}
      modifiers={modifiers}
      handleSelect={handleSelect}
      month={month}
      selected={selected}
      setMonth={setMonth}
      showOutsideDays
    />
  )
};