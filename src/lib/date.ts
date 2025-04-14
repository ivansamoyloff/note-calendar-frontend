import { format } from 'date-fns';
import { ru, enUS, uk } from 'date-fns/locale';

const locales = {
  en: enUS,
  uk,
  ru,
}

type Lang = keyof typeof locales;

type DateType = 'default' | 'short';

export const formatDate = (
  date: Date = new Date(),
  type: DateType = 'default',
  locale: Lang = 'en',
):string => {
  const pattern = type === 'default' ? 'd MMMM yyyy' : 'EEE, MMM d';
  return format(date, pattern, { locale: locales[locale] })
}