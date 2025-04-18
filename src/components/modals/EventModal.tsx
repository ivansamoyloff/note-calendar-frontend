'use client';

import { useState } from "react";
import { CustomInput } from "@/components/ui/custom/CustomInput";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { TimeSelectInput } from "@/components/ui/custom/TimeSelectInput";
import { Switch } from "@/components/ui/switch";
import { Transition } from "@headlessui/react"
import { CustomButton } from "../ui/custom/CustomButton";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type EventType = 'event' | 'task';
type StatusType = 'onProgress' | 'onHold' | 'finished';

type EventModal = {
  type?: EventType;
};

const views = ['event', 'task'] as const;

export default function EventModal({
  type = 'event',
}: EventModal) {

  const [customType, setCustomType] = useState<EventType>(type);
  const [status, setStatus] = useState<StatusType>('onProgress');

  const [date, setDate] = useState<Date>();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [allDay, setAllDay] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);

  // PASSWORD PLACEHOLDER
  // const [pass, setPass] = useState<string>('');
  // const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-7">
      <div>
        <CustomInput
          inputSize='lg'
          label={`${customType === 'event' ? 'Event' : 'Task'} name`}
          placeholder={`Enter ${customType === 'event' ? 'event' : 'task'} name`}
        />
      </div>
      <div
        className={
          `relative p-1 inline-flex justify-start border-none border-b-gray-80 
          rounded-none overflow-hidden gap-2 
          transition-all duration-300 ease-in-out`
        }
      >
        {views.map((v) => (
          <button
            key={v}
            onClick={() => setCustomType(v)}
            className={cn(
              'px-4 py-2 text-sm transition-all duration-300 ease-in-out rounded-[5px] font-mono font-light',
              customType === v
                ? 'bg-blue-50/40 text-blue-80 focus-visible:text-blue-70 focus-visible:outline-blue-70'
                : 'text-blue-80 hover:bg-blue-30 hover:text-blue-80/80 focus-visible:text-blue-50 focus-visible:outline-blue-50'
            )}
          >
            {v[0].toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>
      <div>
        <CustomInput
          label="Date"
          customInputNode
        >
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-between text-left font-light font-mono text-base py-3 h-12",
                  !date && "text-disabled"
                )}
              >
                {date ? format(date, "dd/MM/yyyy") : <span>Pick a date</span>}
                <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7 2C7.55228 2 8 2.44772 8 3V4H16V3C16 2.44772 16.4477 2 17 2C17.5523 2 18 2.44772 18 3V4C19.6569 4 21 5.34315 21 7V19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V7C3 5.34315 4.34315 4 6 4V3C6 2.44772 6.44772 2 7 2ZM6 6C5.44772 6 5 6.44772 5 7V8H19V7C19 6.44772 18.5523 6 18 6H6ZM19 10H5V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V10Z" fill="#C5C5C5"/>
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </CustomInput>
      </div>
      <div className="flex flex-col gap-4">
        <Transition
          show={!allDay}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex w-full justify-between">
            <CustomInput
              label="Starts"
              containerClassName="flex flex-col basis-[45%]"
              customInputNode
            >
              <TimeSelectInput value={startDate} onChange={setStartDate}/>
            </CustomInput>
            <CustomInput
              label="Ends"
              containerClassName="flex flex-col basis-[45%]"
              customInputNode
            >
              <TimeSelectInput value={endDate} onChange={setEndDate}/>
            </CustomInput>
          </div>
        </Transition>
        <div className="flex items-center justify-start gap-3">
          <Switch id='allDay' className="data-[state=checked]:bg-blue-50" checked={allDay} onCheckedChange={setAllDay} />
          <label htmlFor="allDay" className="font-mono text-[13px]">All day long</label>
        </div>
      </div>
      <Transition
          show={customType === 'event'}
          enter="transition-opacity duration-0"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-0"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div>
            <CustomInput
              label="Meet link"
              inputSize='md'
              placeholder={`Enter meet link for event`}
              containerClassName='flex flex-col'
              icon={
                <div className="px-3">
                  <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="22" height="10" viewBox="0 0 22 10" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5 2C3.34315 2 2 3.34315 2 5C2 6.65685 3.34315 8 5 8H9C10.6569 8 12 6.65685 12 5C12 4.44772 12.4477 4 13 4C13.5523 4 14 4.44772 14 5C14 7.76142 11.7614 10 9 10H5C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0H7C7.55228 0 8 0.447715 8 1C8 1.55228 7.55228 2 7 2H5ZM13 2C11.3431 2 10 3.34315 10 5C10 5.55228 9.55229 6 9 6C8.44772 6 8 5.55228 8 5C8 2.23858 10.2386 0 13 0H17C19.7614 0 22 2.23858 22 5C22 7.76142 19.7614 10 17 10H15C14.4477 10 14 9.55229 14 9C14 8.44772 14.4477 8 15 8H17C18.6569 8 20 6.65685 20 5C20 3.34315 18.6569 2 17 2H13Z"/>
                  </svg>
                </div>
              }
            />
          </div>
      </Transition>
      <Transition
          show={customType === 'event'}
          enter="transition-opacity duration-0"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-0"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div>
            <CustomInput
              label="Location"
              inputSize='md'
              placeholder={`Enter location for event`}
              containerClassName='flex flex-col'
              icon={
                <div className="px-3">
                  <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4ZM6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 10.973 15.8377 13.441 13 13.917V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V13.917C8.16229 13.441 6 10.973 6 8ZM10 7C10 6.44772 10.4477 6 11 6H11.01C11.5623 6 12.01 6.44772 12.01 7C12.01 7.55228 11.5623 8 11.01 8H11C10.4477 8 10 7.55228 10 7Z" />
                  </svg>
                </div>
              }
            />
          </div>
      </Transition>
      <Transition
        show={customType === 'task'}
        enter="transition-opacity duration-0"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-0"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <RadioGroup defaultValue={status} onValueChange={(e) => setStatus(e as StatusType)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="onProgress" id="onProgress" className="text-gray-10 [&_svg]:fill-blue-50 data-[state=checked]:border-blue-50 data-[state=unchecked]:border-gray-30"/>
            <Label htmlFor="onProgress" className="font-mono text-gray-100 text-sm">In progress</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="onHold" id="onHold" className="text-gray-10 [&_svg]:fill-blue-50 data-[state=checked]:border-blue-50 data-[state=unchecked]:border-gray-30" />
            <Label htmlFor="onHold" className="font-mono text-gray-100 text-sm">Hold</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="finished" id="finished" className="text-gray-10 [&_svg]:fill-blue-50 data-[state=checked]:border-blue-50 data-[state=unchecked]:border-gray-30" />
            <Label htmlFor="finished" className="font-mono text-gray-100 text-sm">Finished</Label>
          </div>
        </RadioGroup>
      </Transition>
      <div>
        <CustomInput
          label="Description"
          inputSize='md'
          placeholder={`${customType === 'event' ? 'Event' : 'Task'} description`}
          containerClassName='flex flex-col'
        />
      </div>
      <div className="flex justify-end mt-8">
        <CustomButton className="px-15 py-3" size="md">Save</CustomButton>
      </div>
      {/* <div> PASSWORD PLACEHOLDER
          <CustomInput
            label="Meet link"
            inputSize='md'
            placeholder={`Enter meet link for event`}
            containerClassName='flex flex-col'
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type={isHidden ? "password" : 'text'}
            icon={
              <button className="cursor-pointer h-full px-3" onClick={() => setIsHidden((prev) => !prev)}>
                {!isHidden ? (
                  <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.61403 6.34903C7.51752 4.96903 9.78322 4 12.0005 4C14.2178 4 16.4832 4.96932 18.3863 6.34948C20.2964 7.73463 21.9433 9.6059 22.8985 11.5613C23.0338 11.8383 23.0338 12.1621 22.8985 12.4391C21.9433 14.3946 20.2962 16.2657 18.3859 17.6508C16.4826 19.0308 14.217 20 11.9998 20C9.78248 20 7.51693 19.0308 5.61362 17.6507C3.70344 16.2656 2.05637 14.3943 1.10141 12.4386C0.966198 12.1617 0.966198 11.8379 1.10141 11.561C2.0564 9.60523 3.70369 7.73401 5.61403 6.34903ZM3.12786 11.9998C3.94752 13.4726 5.25598 14.9209 6.78768 16.0316C8.4782 17.2574 10.3393 18 11.9998 18C13.6602 18 15.5213 17.2574 17.2119 16.0316C18.7436 14.921 20.0522 13.4729 20.8721 12.0002C20.0522 10.5275 18.7438 9.07922 17.2122 7.96856C15.5218 6.74267 13.6609 6 12.0005 6C10.3399 6 8.47864 6.74254 6.78795 7.96826C5.2561 9.07884 3.94752 10.527 3.12786 11.9998ZM12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10ZM8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" />
                  </svg>
                ) : (
                  <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.56095 11.1018C3.05722 10.8594 3.65599 11.0653 3.89834 11.5615C4.28644 12.3562 4.75926 13.0843 5.30163 13.7316C5.32943 13.7607 5.35513 13.7911 5.37874 13.8225C6.17012 14.7448 7.10462 15.4976 8.13684 16.0387C8.16411 16.0495 8.19113 16.0615 8.21785 16.0749C8.24882 16.0905 8.27863 16.1074 8.30725 16.1256C9.44451 16.6902 10.695 17.0001 12 17.0001C13.3048 17.0001 14.5553 16.6902 15.6926 16.1257C15.7213 16.1074 15.7511 16.0905 15.7821 16.0749C15.8089 16.0615 15.836 16.0494 15.8633 16.0386C16.8944 15.4981 17.828 14.7464 18.6189 13.8256C18.6439 13.792 18.6713 13.7597 18.7011 13.7287C19.2425 13.0822 19.7145 12.3552 20.1021 11.5618C20.3446 11.0656 20.9434 10.8598 21.4396 11.1023C21.9358 11.3447 22.1416 11.9435 21.8991 12.4397C21.5708 13.1118 21.1878 13.7487 20.7563 14.3422L22.207 15.793C22.5976 16.1835 22.5976 16.8166 22.207 17.2072C21.8165 17.5977 21.1834 17.5977 20.7928 17.2072L19.4483 15.8627C18.8674 16.4342 18.2321 16.9412 17.5514 17.3721L18.3938 19.0517C18.6414 19.5454 18.442 20.1463 17.9483 20.3939C17.4546 20.6415 16.8537 20.442 16.6061 19.9484L15.7696 18.2805C14.8936 18.6272 13.9657 18.857 13 18.9514L13 21.0001C13 21.5523 12.5523 22.0001 12 22.0001C11.4477 22.0001 11 21.5524 11 21.0001L11 18.9514C10.0343 18.857 9.10635 18.6272 8.23037 18.2805L7.39387 19.9484C7.14628 20.4421 6.54536 20.6415 6.05168 20.3939C5.55801 20.1463 5.35853 19.5454 5.60612 19.0517L6.44854 17.3721C5.76785 16.9411 5.13262 16.4341 4.55173 15.8625L3.20711 17.2072C2.81658 17.5977 2.18342 17.5977 1.79289 17.2072C1.40237 16.8166 1.40237 16.1835 1.79289 15.793L3.24393 14.3419C2.81245 13.7483 2.42947 13.1114 2.1012 12.4392C1.85884 11.9429 2.06468 11.3441 2.56095 11.1018Z" />
                  </svg>
                )}
              </button>
            }
          />
        </div> */}
    </div>
  )
}