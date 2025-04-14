"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { DayPicker, DayPickerProps } from "react-day-picker"
import { format, parseISO, addMonths, subMonths, isSameMonth} from "date-fns"
import { formatDate } from "@/lib/date"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/buttons/button"

import CalendarHeader from './CalendarHeader';


const weekdayShort = ["S", "M", "T", "W", "T", "F", "S"]

type CalendarProps = React.ComponentProps<typeof DayPicker> & { date: string }

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  date,
  ...props
}: CalendarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const selected = React.useMemo(() => parseISO(date), [date])
  const [month, setMonth] = React.useState(selected)

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

  return (
    <DayPicker
      modifiers={modifiers}
      onDayClick={handleSelect}
      month={month}
      onMonthChange={setMonth}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-8",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex gap-1",
        head_cell:
          "text-disabled font-saira rounded-md w-8 font-medium text-base",
        row: "flex w-full mt-4 gap-1",
        cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-blue-20 [&:has([aria-selected])]:rounded-full",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 text-base p-0 rounded-full font-light cursor-pointer aria-selected:opacity-100 font-mono hover:bg-blue-20 hover:text-blue-50 focus-visible:border-transparent focus-visible:ring-3 focus-visible:ring-blue-50"
        ),
        day_selected:
          "bg-blue-20 text-blue-50 rounded-full border border-blue-50 hover:bg-blue-30 hover:text-blue-50 focus:bg-blue-20 focus:text-blue-50",
        day_today: "text-blue-50 bg-blue-20 ",
        day_outside:
          "day-outside text-disabled aria-selected:text-muted-foreground",
        day_disabled: "text-disabled opacity-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Caption: () => (
          <CalendarHeader
            date={isSameMonth(selected, month) ? formatDate(new Date(date), 'short') : format(month, 'MMM, yyyy')}
            onPrev={() => setMonth(prev => subMonths(prev, 1))}
            onNext={() => setMonth(prev => addMonths(prev, 1))}
          />
        ),
        Head: () => (
          <thead>
            <tr className="flex gap-1">
              {weekdayShort.map((day, index) => (
                <th
                  key={index}
                  className="text-disabled font-saira rounded-md w-8 font-medium text-base"
                  scope="col"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
        ),
      }}
      {...props}
    />
  )
}

export { Calendar }
