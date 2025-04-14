'use client';

import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type InputSize = 'sm' | 'md' | 'lg';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  inputSize?: InputSize;
  label?: string;
  labelClassName?: string;
};

export const CustomInput = ({
  className,
  labelClassName,
  disabled = false,
  placeholder = 'Placeholder',
  label = '',
  inputSize = 'sm',
  required = false,
  ...props
}: InputProps) => {
  return (
    <>
      {inputSize !== 'lg' && !!label.length && (
        <label
        className={cn(
          labelBaseStyles,
          labelClassName,
          labelSizesStyles[inputSize],
          disabled && 'text-disabled',
          required && !disabled && 'text-error'
        )}>
          {label}
        </label>
      )}
      <input
        {...props}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        className={cn(
          baseStyles,
          sizeStyles[inputSize],
          className
        )}
      />
      {inputSize === 'lg' && !!label.length && (
        <label
        className={cn(
          labelBaseStyles,
          labelClassName,
          labelSizesStyles[inputSize],
          disabled && 'text-disabled',
          required && !disabled && 'text-error'
        )}>
          {label}
        </label>
      )}
    </>
    
  );
};

const baseStyles = `
  font-mono text-blue-100 outline-offset-0 
  bg-transparent text-black
  transition-all duration-300 ease-in-out
  placeholder:text-gray-20
  hover:text-gray-70 hover:placeholder:text-gray-70
  active:text-blue-70
  focus:text-blue-40 focus:border-blue-40 focus:placeholder:text-blue-40
  required:text-error required:placeholder:text-error required:border-error
  disabled:text-disabled disabled:placeholder:text-disabled

  dark:bg-gray-90 dark:text-gray-10
`;

const labelBaseStyles = `
  font-mono text-gray-100 text-sm
  bg-transparent
  pt-[6px] pb-1
  transition-all duration-300 ease-in-out
  disabled:text-disabled

  dark:bg-gray-90 dark:text-gray-10
`;

const sizeStyles: Record<InputSize, string> = {
  sm: `p-4 rounded-lg text-xs border-gray-30 border-[1px]
    bg-gray-10 focus:outline-blue-40 disabled:border-disabled disabled:required:border-disabled`,

  md: `p-4 rounded-lg text-base border-gray-30 border-[1px]
  bg-gray-10 focus:outline-blue-40 disabled:border-disabled disabled:required:border-disabled`,

  lg: `px-4 py-[18px] rounded-none text-[28px] border-b-[2px] 
    border-gray-40 required:disabled:border-disabled focus:outline-none`,
};

const labelSizesStyles: Record<InputSize, string> = {
  sm: `p-1`,
  md: `p-1`,
  lg: `px-4`,
};