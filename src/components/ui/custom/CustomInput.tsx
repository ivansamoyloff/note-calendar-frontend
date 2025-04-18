// 'use client';

// import type { InputHTMLAttributes } from 'react';
// import { cn } from '@/lib/utils';

// type InputSize = 'sm' | 'md' | 'lg';

// type InputProps = InputHTMLAttributes<HTMLInputElement> & {
//   inputSize?: InputSize;
//   label?: string;
//   labelClassName?: string;
//   customInputNode?: boolean;
//   containerClassName?: string;
// };

// export const CustomInput = ({
//   className,
//   labelClassName,
//   containerClassName,
//   disabled = false,
//   placeholder = 'Placeholder',
//   label = '',
//   inputSize = 'sm',
//   required = false,
//   customInputNode = false,
//   ...props
// }: InputProps) => {
//   return (
//     <div className={containerClassName}>
//       {inputSize !== 'lg' && !!label.length && (
//         <label
//         className={cn(
//           labelBaseStyles,
//           labelClassName,
//           labelSizesStyles[inputSize],
//           disabled && 'text-disabled',
//           required && !disabled && 'text-error'
//         )}>
//           {label}
//         </label>
//       )}
//       {customInputNode ? (
//         props.children
//       ) : (
//         <div className='w-full flex'>
//           <input
//             {...props}
//             disabled={disabled}
//             placeholder={placeholder}
//             required={required}
//             className={cn(
//               baseStyles,
//               sizeStyles[inputSize],
//               className
//             )}
//           />
//         </div>
//       )}
//       {inputSize === 'lg' && !!label.length && (
//         <label
//         className={cn(
//           labelBaseStyles,
//           labelClassName,
//           labelSizesStyles[inputSize],
//           disabled && 'text-disabled',
//           required && !disabled && 'text-error'
//         )}>
//           {label}
//         </label>
//       )}
//     </div>
    
//   );
// };

// const baseStyles = `
//   font-mono text-blue-100 outline-offset-0 w-full
//   bg-transparent text-black
//   transition-all duration-300 ease-in-out
//   placeholder:text-gray-20
//   hover:text-gray-70 hover:placeholder:text-gray-70
//   active:text-blue-70
//   focus:text-blue-40 focus:border-blue-40 focus:placeholder:text-blue-40
//   required:text-error required:placeholder:text-error required:border-error
//   disabled:text-disabled disabled:placeholder:text-disabled

//   dark:bg-gray-90 dark:text-gray-10
// `;

// const labelBaseStyles = `
//   font-mono text-gray-100 text-sm
//   bg-transparent
//   pt-[6px] pb-1
//   transition-all duration-300 ease-in-out
//   disabled:text-disabled

//   dark:bg-gray-90 dark:text-gray-10
// `;

// const sizeStyles: Record<InputSize, string> = {
//   sm: `p-4 rounded-lg text-xs border-gray-30 border-[1px]
//     bg-gray-10 focus:outline-blue-40 disabled:border-disabled disabled:required:border-disabled`,

//   md: `p-4 rounded-lg text-base border-gray-30 border-[1px]
//   bg-gray-10 focus:outline-blue-40 disabled:border-disabled disabled:required:border-disabled`,

//   lg: `px-4 py-[18px] rounded-none text-[28px] border-b-[2px] 
//     border-gray-40 required:disabled:border-disabled focus:outline-none`,
// };

// const labelSizesStyles: Record<InputSize, string> = {
//   sm: `p-1`,
//   md: `p-1`,
//   lg: `px-4`,
// };

// 'use client'

// import type { InputHTMLAttributes, ReactNode } from 'react'
// import { cn } from '@/lib/utils'

// // Типы
// type InputSize = 'sm' | 'md' | 'lg'

// type InputProps = InputHTMLAttributes<HTMLInputElement> & {
//   inputSize?: InputSize
//   label?: string
//   labelClassName?: string
//   customInputNode?: boolean
//   containerClassName?: string
//   icon?: ReactNode
// }

// export const CustomInput = ({
//   className,
//   labelClassName,
//   containerClassName,
//   disabled = false,
//   placeholder = 'Placeholder',
//   label = '',
//   inputSize = 'sm',
//   required = false,
//   customInputNode = false,
//   icon,
//   ...props
// }: InputProps) => {
//   return (
//     <div className={cn('w-full', containerClassName)}>
//       {inputSize !== 'lg' && !!label.length && (
//         <label
//           className={cn(
//             labelBaseStyles,
//             labelClassName,
//             labelSizesStyles[inputSize],
//             disabled && 'text-disabled',
//             required && !disabled && 'text-error'
//           )}
//         >
//           {label}
//         </label>
//       )}

//       {customInputNode ? (
//         props.children
//       ) : (
//         <div
//           className={cn(
//             'relative w-full transition-all',
//             wrapperSizeStyles[inputSize],
//             'has-[:focus-visible]:border-blue-40 has-[:focus-visible]:ring-0 has-[:disabled]:opacity-50 has-[:required]:border-error',
//             disabled && 'cursor-not-allowed'
//           )}
//         >
//           <input
//             {...props}
//             disabled={disabled}
//             required={required}
//             placeholder={placeholder}
//             className={cn(
//               'peer w-full bg-transparent outline-none border-none font-mono',
//               'placeholder:text-gray-20 text-blue-100',
//               'transition-all duration-300 ease-in-out',
//               'focus:text-blue-40 focus:placeholder:text-blue-40',
//               'hover:text-gray-70 hover:placeholder:text-gray-70',
//               'active:text-blue-70',
//               'required:text-error required:placeholder:text-error',
//               'disabled:text-disabled disabled:placeholder:text-disabled',
//               'dark:bg-gray-90 dark:text-gray-10',
//               icon && 'pr-10',
//               className
//             )}
//           />
//           {icon && (
//             <div className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-70 transition-colors duration-300 ease-in-out group-has-[:focus-visible]:text-blue-40 group-has-[:required]:text-error group-has-[:disabled]:text-disabled">
//               {icon}
//             </div>
//           )}
//         </div>
//       )}

//       {inputSize === 'lg' && !!label.length && (
//         <label
//           className={cn(
//             labelBaseStyles,
//             labelClassName,
//             labelSizesStyles[inputSize],
//             disabled && 'text-disabled',
//             required && !disabled && 'text-error'
//           )}
//         >
//           {label}
//         </label>
//       )}
//     </div>
//   )
// }

// const labelBaseStyles = `
//   font-mono text-gray-100 text-sm
//   bg-transparent
//   pt-[6px] pb-1
//   transition-all duration-300 ease-in-out
//   disabled:text-disabled
//   dark:bg-gray-90 dark:text-gray-10
// `

// const wrapperSizeStyles: Record<InputSize, string> = {
//   sm: `p-4 rounded-lg text-xs font-mono border-[1px] border-gray-30 bg-gray-10`,
//   md: `p-4 rounded-lg text-base font-mono border-[1px] border-gray-30 bg-gray-10`,
//   lg: `px-4 py-[18px] text-[28px] font-mono border-b-[2px] border-gray-40`,
// }

// const labelSizesStyles: Record<InputSize, string> = {
//   sm: `p-1`,
//   md: `p-1`,
//   lg: `px-4`,
// }

'use client'

import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Типы
type InputSize = 'sm' | 'md' | 'lg'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  inputSize?: InputSize
  label?: string
  labelClassName?: string
  customInputNode?: boolean
  containerClassName?: string
  icon?: ReactNode
}

export const CustomInput = ({
  className,
  labelClassName,
  containerClassName,
  disabled = false,
  placeholder = 'Placeholder',
  label = '',
  inputSize = 'sm',
  required = false,
  customInputNode = false,
  icon,
  ...props
}: InputProps) => {
  return (
    <div className={cn('w-full', containerClassName)}>
      {inputSize !== 'lg' && !!label.length && (
        <label
          className={cn(
            labelBaseStyles,
            labelClassName,
            labelSizesStyles[inputSize],
            disabled && 'text-disabled',
            required && !disabled && 'text-error'
          )}
        >
          {label}
        </label>
      )}

      {customInputNode ? (
        props.children
      ) : (
        <div
          className={cn(
            'group relative w-full transition-all',
            wrapperSizeStyles[inputSize],
            'has-[:focus-visible]:border-blue-40 has-[:focus-visible]:ring-0 has-[:disabled]:opacity-50 has-[:required]:border-error',
            disabled && 'cursor-not-allowed'
          )}
        >
          <input
            {...props}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            className={cn(
              'peer w-full bg-transparent outline-none border-none font-mono',
              'placeholder:text-gray-20 text-blue-100',
              'transition-all duration-300 ease-in-out',
              'focus:text-blue-40 focus:placeholder:text-blue-40',
              'hover:text-gray-70 hover:placeholder:text-gray-70',
              'active:text-blue-70',
              'required:text-error required:placeholder:text-error',
              'disabled:text-disabled disabled:placeholder:text-disabled disabled:cursor-not-allowed',
              'dark:bg-gray-90 dark:text-gray-10',
              icon && 'pr-12',
              className
            )}
          />
          {icon && (
            <div className="absolute right-0 top-0 h-full flex items-center justify-center text-gray-70 transition-colors duration-300 ease-in-out group-has-[:focus-visible]:text-blue-40 group-has-[:required]:text-error group-has-[:disabled]:text-disabled">
              {icon}
            </div>
          )}
        </div>
      )}

      {inputSize === 'lg' && !!label.length && (
        <label
          className={cn(
            labelBaseStyles,
            labelClassName,
            labelSizesStyles[inputSize],
            disabled && 'text-disabled',
            required && !disabled && 'text-error'
          )}
        >
          {label}
        </label>
      )}
    </div>
  )
}

const labelBaseStyles = `
  font-mono text-gray-100 text-sm
  bg-transparent
  pt-[6px] pb-1
  transition-all duration-300 ease-in-out
  disabled:text-disabled
  dark:bg-gray-90 dark:text-gray-10
`

const wrapperSizeStyles: Record<InputSize, string> = {
  sm: `p-4 rounded-lg text-xs font-mono border-[1px] border-gray-30 bg-gray-10`,
  md: `p-4 rounded-lg text-base font-mono border-[1px] border-gray-30 bg-gray-10`,
  lg: `px-4 py-[18px] text-[28px] font-mono border-b-[2px] border-gray-40`,
}

const labelSizesStyles: Record<InputSize, string> = {
  sm: `p-1`,
  md: `p-1`,
  lg: `px-4`,
}
