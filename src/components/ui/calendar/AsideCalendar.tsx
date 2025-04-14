'use client';

import { Calendar } from './Calendar';

export const AsideCalendar = ({ date }: { date: string }) => {
  return <Calendar date={date} showOutsideDays />
};