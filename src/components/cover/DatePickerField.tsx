import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarDays } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface DatePickerFieldProps {
  value?: Date
  onChange: (date: Date | undefined) => void
}

export function DatePickerField({ value, onChange }: DatePickerFieldProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal bg-background"
        >
          <CalendarDays className="mr-2 h-4 w-4 text-emerald-600" />
          {value ? format(value, 'MM/dd/yyyy') : <span>Choose a date...</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          defaultMonth={value}
          onSelect={(date) => {
            onChange(date)
            setOpen(false)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
