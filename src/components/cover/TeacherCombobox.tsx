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
import { teachers, type Teacher } from '@/data/teachers'

interface TeacherComboboxProps {
  onSelect: (teacher: Teacher) => void
}

export function TeacherCombobox({ onSelect }: TeacherComboboxProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return teachers
    return teachers.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.designation.toLowerCase().includes(q) ||
        (t.department ?? '').toLowerCase().includes(q),
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
          <span className="truncate">Choose a teacher...</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Type teacher name..."
            className="h-9"
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No teacher found.</CommandEmpty>
            <CommandGroup>
              {filtered.map((teacher) => (
                <CommandItem
                  key={teacher.name}
                  value={teacher.name}
                  onSelect={() => {
                    setOpen(false)
                    setSearch('')
                    onSelect(teacher)
                    toast.success('Teacher details auto-filled')
                  }}
                  className="cursor-pointer flex-col items-start gap-1 py-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-emerald-700">{teacher.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground truncate w-full">
                    {teacher.department
                      ? `${teacher.designation}, ${teacher.department}`
                      : teacher.designation}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
