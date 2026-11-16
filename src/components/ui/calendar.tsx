import * as React from 'react'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { DayPicker, getDefaultClassNames } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { buttonVariants, Button } from '@/components/ui/button'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'bg-background group/calendar p-3 [--cell-size:--spacing(8)] w-fit',
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn('flex flex-col relative sm:flex-row gap-4', defaultClassNames.months),
        month: cn('flex flex-col relative gap-4', defaultClassNames.month),
        nav: cn(
          'flex items-center gap-1 w-full absolute inset-x-0 top-0 justify-between',
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant, size: 'icon-sm' }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant, size: 'icon-sm' }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          'h-(--cell-size) px-2 flex items-center justify-center w-full bg-inherit',
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          'w-full flex items-center text-sm font-medium justify-between h-(--cell-size) gap-4',
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          'relative has-focus:border-ring border border-input shadow-xs has-first:[&>button:first-of-type]:rounded-l-md has-last:[&>button:last-of-type]:rounded-r-md h-(--cell-size) flex items-center gap-2 rounded-md bg-background ps-2 pe-1 dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          'absolute bg-background inset-0 w-full opacity-0 z-10 h-full appearance-none',
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          'select-none font-medium',
          captionLayout === 'label'
            ? 'text-sm'
            : 'rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 bg-background font-medium [&>svg]:text-muted-foreground [&>svg]:size-3.5',
          defaultClassNames.caption_label,
        ),
        month_grid: cn('w-full border-collapse space-x-1', defaultClassNames.month_grid),
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none w-(--cell-size) h-(--cell-size) flex items-center justify-center',
          defaultClassNames.weekday,
        ),
        week: cn('flex w-full mt-2', defaultClassNames.week),
        week_number_header: cn('select-none w-(--cell-size)', defaultClassNames.week_number_header),
        week_number: cn(
          'text-[0.8rem] select-none text-muted-foreground',
          defaultClassNames.week_number,
        ),
        day: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20',
          defaultClassNames.day,
        ),
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-(--cell-size) p-0 font-normal select-none z-10 relative rounded-md',
          defaultClassNames.day_button,
        ),
        selected: cn(
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md',
          defaultClassNames.selected,
        ),
        today: cn('bg-accent text-accent-foreground rounded-md', defaultClassNames.today),
        outside: cn(
          'text-muted-foreground aria-selected:text-muted-foreground',
          defaultClassNames.outside,
        ),
        disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
        range_middle: cn(
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
          defaultClassNames.range_middle,
        ),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return <ChevronLeftIcon className={cn('size-4', className)} {...props} />
          }

          if (orientation === 'right') {
            return <ChevronRightIcon className={cn('size-4', className)} {...props} />
          }

          return <ChevronDownIcon className={cn('size-4', className)} {...props} />
        },
        ...components,
      }}
      {...props}
    />
  )
}

export { Calendar }
