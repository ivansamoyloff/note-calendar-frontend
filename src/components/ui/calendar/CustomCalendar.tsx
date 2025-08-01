"use client"

import * as React from "react"
import { DayPicker} from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const weekdayShort = ["S", "M", "T", "W", "T", "F", "S"]

type CalendarProps = React.ComponentProps<typeof DayPicker> & { 
  handleSelect: (newDate?: Date | undefined) => void; 
  setMonth?: React.Dispatch<React.SetStateAction<Date>>;
  month?: Date;
  header?: () => React.JSX.Element,
  isYearView?: boolean;
};

function CustomCalendar({
  className,
  classNames,
  showOutsideDays = true,
  modifiers,
  month = new Date(),
  handleSelect = () => {},
  setMonth = () => {},
  header = () => (<></>),
  isYearView = false,
  ...props
}: CalendarProps) {


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
        month:cn(
          "flex flex-col",
          isYearView ? 'gap-4.5' : 'gap-8'
        ),
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
        row: cn("flex w-full", isYearView ? 'gap-0.5 mt-2.5' : 'gap-1 mt-4'),
        cell: "relative p-0 text-center focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-blue-20 [&:has([aria-selected])]:rounded-full",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "text-base p-0 rounded-full font-light cursor-pointer aria-selected:opacity-100 font-mono dark:hover:bg-blue-70 hover:bg-blue-20 hover:text-blue-50 focus-visible:border-transparent focus-visible:ring-3 focus-visible:ring-blue-50",
          isYearView ? 'size-7 text-xs' : 'size-8 text-sm'
        ),
        day_selected:
          "bg-gray-10 text-blue-50 rounded-full border border-blue-50 dark:text-blue-60 dark:border-blue-60 dark:bg-blue-100 dark:hover:bg-blue-80 dark:hover:text-gray-10 hover:bg-blue-30 hover:text-gray-10 focus:bg-blue-20 focus:text-blue-50",
        day_today: "text-blue-50 bg-blue-20 dark:bg-blue-80 hover:bg-blue-30 hover:text-gray-10 focus:bg-blue-20 focus:text-blue-50",
        day_outside:
          "day-outside text-disabled aria-selected:text-muted-foreground",
        day_disabled: "text-disabled opacity-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Caption: header,
        Head: () => (
          <thead>
            <tr className={cn(
              "flex ",
               isYearView ? 'gap-0.5' : 'gap-1'
            )}>
              {weekdayShort.map((day, index) => (
                <th
                  key={index}
                  className={cn(
                    "text-disabled font-saira rounded-md font-medium ",
                    isYearView ? 'w-7 text-sm' : 'w-8 text-base'
                  )}
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

export { CustomCalendar }
