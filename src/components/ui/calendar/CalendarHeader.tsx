import { NavigationButtons } from "../buttons/NavigationButtons"

export default function CalendarHeader({
  date,
  onPrev,
  onNext,
}: { 
  date: string,
  onPrev: () => void,
  onNext: () => void,
 }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="font-saira text-[32px] font-light">{date}</h3>
      <NavigationButtons
        mode='control'
        onNext={onNext} 
        onPrev={onPrev} 
      />
    </div>
  )
}