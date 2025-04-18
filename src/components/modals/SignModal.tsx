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
import { CustomButton } from "@/components/ui/custom/CustomButton";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type SignType = 'signIn' | 'signUp';
type SignModal = {
  type?: SignType;
};

const views = ['signIn', 'signUp'] as const;

export default function SignModal({
  type = 'signIn',
}: SignModal) {

  const [customType, setCustomType] = useState<SignType>(type);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleSwitchForm = () => setCustomType(customType === 'signIn' ? 'signUp' : 'signIn');

  return (
    <div className="flex flex-col gap-5">
      <span className="font-saira font-light text-[54px]">
        {customType === 'signIn' ? 'Sign In' : 'Sign Up'}
      </span>
      <div className="flex">
        <CustomButton
          variant="ghost"
          onClick={handleSwitchForm}
          className="font-mono font-light text-[14px] text-blue-50 cursor-pointer"
        >
          {customType === 'signIn' ? "Haven't an account yet?" : 'Already have an account?'}
        </CustomButton>
      </div>
      
      
      {customType === 'signUp' && (
        <CustomInput
          label="Name"
          inputSize='md'
          placeholder={`Enter your name`}
          containerClassName='flex flex-col'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <div>
        <CustomInput
          label="Email"
          inputSize='md'
          placeholder={`example@mail.com`}
          containerClassName='flex flex-col'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <CustomInput
          label="Password"
          inputSize='md'
          placeholder={`password123`}
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
          }/>
        </div>
        <div className="flex justify-center">
          <CustomButton
            className="font-mono font-light text-gray-10 bg-blue-50 text-[22px] px-15 py-5 mt-5"
            size="md"
          >
            {customType === 'signIn' ? 'Sign In' : 'Sign Up'}
          </CustomButton>
        </div>
    </div>
  )
}