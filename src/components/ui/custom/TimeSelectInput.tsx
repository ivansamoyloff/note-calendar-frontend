"use client"

import { useState } from "react"
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, ComboboxButton } from "@headlessui/react"
import { cn } from "@/lib/utils"

function generateTimes(step = 15) {
  const result: string[] = []
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += step) {
      const hour = h % 12 === 0 ? 12 : h % 12
      const minute = m.toString().padStart(2, "0")
      const ampm = h < 12 ? "am" : "pm"
      result.push(`${hour}:${minute}${ampm}`)
    }
  }
  return result
}
// TODO:
// COLOR SELECTION ON SELECTED ITEMS
// MAKE VALIDATION
export function TimeSelectInput({
  value,
  onChange,
  placeholder = "hh:mm",
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  const times = generateTimes()
  const [query, setQuery] = useState(value)

  const filtered =
    query === ""
      ? times
      : times.filter((t) =>
          t.toLowerCase().includes(query.toLowerCase())
        )

  return (
    <Combobox value={value} onChange={onChange}>
      <div className="relative">
        <div className="relative">
          <ComboboxInput
            className="w-full rounded-md border border-input bg-background p-3 font-mono font-light text-base placeholder:text-disabled"
            displayValue={() => value}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer">
            <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM12 6C12.5523 6 13 6.44772 13 7V11.382L16.4472 13.1056C16.9412 13.3526 17.1414 13.9532 16.8944 14.4472C16.6474 14.9412 16.0468 15.1414 15.5528 14.8944L11.5528 12.8944C11.214 12.725 11 12.3788 11 12V7C11 6.44772 11.4477 6 12 6Z" fill="#C5C5C5"/>
            </svg>
          </ComboboxButton>
        </div>

        {filtered.length > 0 && (
          <ComboboxOptions className="absolute z-50 mt-1 max-h-48 w-full overflow-auto rounded-md border bg-popover py-1 text-sm shadow-md">
            {filtered.map((time) => (
              <ComboboxOption
                key={time}
                value={time}
                className={'cursor-default select-none px-3 py-2'}
              >
                {({ selected }) => (
                  <span className="flex items-center justify-between font-mono font-light">
                    {time}
                  </span>
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </div>
    </Combobox>
  )
}
