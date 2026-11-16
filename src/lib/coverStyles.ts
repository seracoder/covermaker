// ─────────────────────────────────────────────────────────────────────────────
// Cover style registry — the 5 available cover page designs.
// ─────────────────────────────────────────────────────────────────────────────

export type CoverStyleId = 'classic' | 'modern' | 'minimal' | 'elegant' | 'bold'

export interface CoverStyleMeta {
  id: CoverStyleId
  name: string
  description: string
}

export const coverStyles: CoverStyleMeta[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Serif formal design in deep green with a double-rule frame.',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Emerald header banner with clean, left-aligned sections.',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Quiet monochrome design with generous whitespace.',
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Cream & maroon serif styling with an ornamental gold frame.',
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'High-contrast slate banner with heavy typography.',
  },
]

export function isCoverStyleId(value: unknown): value is CoverStyleId {
  return typeof value === 'string' && coverStyles.some((s) => s.id === value)
}

export function coverStyleName(id: CoverStyleId): string {
  return coverStyles.find((s) => s.id === id)?.name ?? 'Classic'
}
