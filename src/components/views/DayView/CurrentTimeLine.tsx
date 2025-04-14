'use client';

import { useEffect, useState } from 'react';

const SLOT_HEIGHT = 50; 

function getOffset(slotHeight = SLOT_HEIGHT) {
  const now = new Date();
  return now.getHours() * slotHeight + (now.getMinutes() * slotHeight) / 60;
}

export default function CurrentTimeLine() {
  const [position, setPosition] = useState(getOffset());

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(getOffset());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute left-13.5 right-0 h-[2px] z-1 bg-red-500 transition-all duration-300 ease-in-out"
      style={{ top: `${position}px` }}
    >
      <svg className='absolute -left-3.5 -top-2' xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
        <path d="M6.93535 2.09219C4.93774 0.830539 2.33337 2.26599 2.33337 4.62865V13.3713C2.33337 15.734 4.93775 17.1695 6.93535 15.9078L13.8567 11.5365C15.7207 10.3592 15.7207 7.64081 13.8567 6.46353L6.93535 2.09219Z" stroke="#E02E2E" strokeWidth="2"/>
      </svg>
    </div>
  )
}