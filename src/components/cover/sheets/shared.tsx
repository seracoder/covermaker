import * as React from 'react'

// Shared building blocks for the five cover sheet designs.

export function Row({
  label,
  value,
  labelClass,
  valueClass,
}: {
  label: string
  value: React.ReactNode
  labelClass: string
  valueClass: string
}) {
  return (
    <div className="flex gap-2 text-[13px] leading-6">
      <span className={`${labelClass} min-w-[100px] shrink-0`}>{label}:</span>
      <span className={`${valueClass} flex-1 break-words`}>{value || '—'}</span>
    </div>
  )
}

export type TableTone = 'navy' | 'emerald' | 'mono' | 'maroon' | 'slate' | 'forest'

const tableTones: Record<
  TableTone,
  { head: string; headText: string; border: string; total: string }
> = {
  navy: {
    head: 'bg-gray-100/50',
    headText: 'text-[#002b5c]',
    border: 'border-gray-400/60',
    total: 'text-[#002b5c]',
  },
  forest: {
    head: 'bg-[#1b5e3a]',
    headText: 'text-white',
    border: 'border-[#1b5e3a]/30',
    total: 'text-[#14532d]',
  },
  emerald: {
    head: 'bg-emerald-50',
    headText: 'text-emerald-900',
    border: 'border-emerald-200',
    total: 'text-emerald-900',
  },
  mono: {
    head: 'bg-white',
    headText: 'text-neutral-600',
    border: 'border-neutral-300',
    total: 'text-neutral-900',
  },
  maroon: {
    head: 'bg-[#7a1f2b]/5',
    headText: 'text-[#7a1f2b]',
    border: 'border-[#7a1f2b]/30',
    total: 'text-[#7a1f2b]',
  },
  slate: {
    head: 'bg-slate-700',
    headText: 'text-white',
    border: 'border-slate-300',
    total: 'text-slate-800',
  },
}

/** "For Evaluator's Use Only" marks table with the signature line. */
export function MarksTable({ tone }: { tone: TableTone }) {
  const t = tableTones[tone]
  return (
    <div className="flex justify-between items-end gap-6">
      <table className={`flex-1 border-collapse ${t.border} text-[12px] bg-white`}>
        <thead>
          <tr className={t.head}>
            <th className={`border ${t.border} p-2 text-left font-semibold ${t.headText}`}>
              Criteria
            </th>
            <th
              className={`border ${t.border} p-2 text-center font-semibold ${t.headText} w-20`}
            >
              Max Marks
            </th>
            <th
              className={`border ${t.border} p-2 text-center font-semibold ${t.headText} w-28`}
            >
              Marks Obtained
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 4 }).map((_, i) => (
            <tr key={i}>
              <td className={`border ${t.border} p-2 h-7`} />
              <td className={`border ${t.border} p-2 text-center h-7`} />
              <td className={`border ${t.border} p-2 text-center h-7`} />
            </tr>
          ))}
          <tr>
            <td className={`border ${t.border} p-2 text-right font-bold ${t.total} h-7`}>
              Total
            </td>
            <td className={`border ${t.border} p-2 text-center h-7`} />
            <td className={`border ${t.border} p-2 text-center h-7`} />
          </tr>
        </tbody>
      </table>

      <div className="w-[180px] flex flex-col items-center shrink-0 mb-1">
        <div className="w-full border-b border-gray-500 h-8" />
        <span className={`text-[12px] font-semibold ${t.total} mt-2`}>
          Teacher&apos;s Signature
        </span>
      </div>
    </div>
  )
}
