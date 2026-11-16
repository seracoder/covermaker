import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { courses, type Course } from '@/data/courses'

interface CourseComboboxProps {
  onSelect: (course: Course) => void
}

export function CourseCombobox({ onSelect }: CourseComboboxProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return courses
    return courses.filter(
      (c) =>
        String(c.code).includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.department.toLowerCase().includes(q),
    )
  }, [search])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-11 w-full justify-between bg-background font-normal"
        >
          <span className="truncate">Choose a course...</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Type course code or title..."
            className="h-9"
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No course found.</CommandEmpty>
            <CommandGroup>
              {filtered.map((course) => (
                <CommandItem
                  key={`${course.code}-${course.title}`}
                  value={String(course.code)}
                  onSelect={() => {
                    setOpen(false)
                    setSearch('')
                    onSelect(course)
                    toast.success('Course details auto-filled')
                  }}
                  className="cursor-pointer flex-col items-start gap-1 py-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-emerald-700">{course.code}</span>
                    {course.department && (
                      <span className="text-[10px] uppercase bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded font-semibold tracking-wider">
                        {course.department}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground truncate w-full">{course.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
