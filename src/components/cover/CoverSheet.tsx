import * as React from 'react'

import type { CoverData } from '@/lib/cover'
import type { CoverStyleId } from '@/lib/coverStyles'
import { CoverSheetClassic } from '@/components/cover/sheets/CoverSheetClassic'
import { CoverSheetModern } from '@/components/cover/sheets/CoverSheetModern'
import { CoverSheetMinimal } from '@/components/cover/sheets/CoverSheetMinimal'
import { CoverSheetElegant } from '@/components/cover/sheets/CoverSheetElegant'
import { CoverSheetBold } from '@/components/cover/sheets/CoverSheetBold'

type SheetComponent = React.ForwardRefExoticComponent<
  { data: CoverData } & React.RefAttributes<HTMLDivElement>
>

const SHEETS: Record<CoverStyleId, SheetComponent> = {
  classic: CoverSheetClassic,
  modern: CoverSheetModern,
  minimal: CoverSheetMinimal,
  elegant: CoverSheetElegant,
  bold: CoverSheetBold,
}

/**
 * Renders the selected A4 cover sheet design (794 × 1122 px).
 * The root of every design carries id="cover-sheet" — the print/PDF target.
 */
export const CoverSheet = React.forwardRef<HTMLDivElement, { data: CoverData; styleId: CoverStyleId }>(
  function CoverSheet({ data, styleId }, ref) {
    const Sheet = SHEETS[styleId] ?? CoverSheetClassic
    return <Sheet ref={ref} data={data} />
  },
)
