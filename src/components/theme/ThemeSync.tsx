'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { storeAccessors } from '@/store/utils/storeAccessors/storeAccessors';

export const ThemeSync = () => {
  const preferredTheme = storeAccessors.settings('theme');
  const { setTheme, theme: current } = useTheme();

  useEffect(() => {
    if (preferredTheme && preferredTheme !== current) {
      console.log('⚡ Ставим тему из Zustand:', preferredTheme);
      setTheme(preferredTheme);
    }
  }, [preferredTheme, current, setTheme]);

  return null;
};