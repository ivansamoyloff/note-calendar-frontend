'use client';

import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'default' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}

export const CustomButton = ({
  className,
  variant = 'default',
  size = 'md',
  disabled = false,
  children,
  onClick = () => {},
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </button>
  );
};

const baseStyles = `
  font-mono text-blue-100
  cursor-pointer
  border-none outline-offset-0 shadow-def
  transition-all duration-300 ease-in-out
  hover:text-blue-90 hover:shadow-hov
  active:shadow-none active:text-blue-70
  focus-visible:text-blue-70 focus-visible:outline-blue-70 focus-visible:shadow-foc 
  disabled:cursor-not-allowed disabled:text-disabled disabled:shadow-none
  dark:text-gray-10
`;

const variantStyles: Record<Variant, string> = {
  default: `
    bg-gray-10
    dark:bg-blue-70
  `,
  ghost: `
    bg-transparent
    border-none
    shadow-none
  `,
};

const sizeStyles: Record<Size, string> = {
  sm: `p-3 rounded-md text-[14px] focus-visible:outline-[1px]`,
  md: `p-4 rounded-xl text-[22px] focus-visible:outline-[2px]`,
  lg: `p-4 rounded-2xl text-[26px] focus-visible:outline-[2px]`,
} 