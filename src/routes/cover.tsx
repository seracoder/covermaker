import { useCallback, useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'

import { CoverForm } from '@/components/cover/CoverForm'
import { CoverPreview } from '@/components/cover/CoverPreview'
import {
  createEmptyCoverData,
  PERSISTED_FIELDS,
  STORAGE_KEY,
  type CoverData,
} from '@/lib/cover'
import { isCoverStyleId, type CoverStyleId } from '@/lib/coverStyles'
import { loadHistory, upsertHistoryEntry } from '@/lib/coverHistory'

export const Route = createFileRoute('/cover')({
  validateSearch: (search: Record<string, unknown>): { history?: string } => ({
    history: typeof search.history === 'string' ? search.history : undefined,
  }),
  component: CoverPage,
})

type Mode = 'form' | 'preview'
const STYLE_KEY = 'cover_style_v1'

function CoverPage() {
  const [mode, setMode] = useState<Mode>('form')
  const [data, setData] = useState<CoverData>(() => createEmptyCoverData())
  const [styleId, setStyleId] = useState<CoverStyleId>('classic')
  const [hydrated, setHydrated] = useState(false)

  const { history: historyParam } = Route.useSearch()
  const navigate = Route.useNavigate()
  const historyApplied = useRef(false)

  // Restore persisted student info + chosen style (once, on first mount).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const saved = JSON.parse(raw) as Partial<CoverData>
        const patch = Object.fromEntries(
          PERSISTED_FIELDS.filter((f) => typeof saved[f] === 'string').map((f) => [f, saved[f]]),
        ) as Partial<CoverData>
        setData((d) => ({ ...d, ...patch }))
      }
    } catch {
      // ignore corrupted storage
    }
    try {
      const savedStyle = localStorage.getItem(STYLE_KEY)
      if (isCoverStyleId(savedStyle)) setStyleId(savedStyle)
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  // Persist student info on change.
  useEffect(() => {
    if (!hydrated) return
    try {
      const partial = Object.fromEntries(PERSISTED_FIELDS.map((f) => [f, data[f]]))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(partial))
    } catch {
      // storage unavailable — ignore
    }
  }, [data, hydrated])

  // Persist chosen style on change.
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STYLE_KEY, styleId)
    } catch {
      // ignore
    }
  }, [styleId, hydrated])

  // Open a saved cover from history via /cover?history=<id>.
  useEffect(() => {
    if (!historyParam || historyApplied.current) return
    historyApplied.current = true
    const found = loadHistory().find((e) => e.id === historyParam)
    if (found) {
      setData(found.data)
      setStyleId(found.styleId)
      setMode('preview')
    } else {
      toast.error('History entry not found')
    }
    void navigate({ to: '/cover', search: {}, replace: true })
  }, [historyParam, navigate])

  const handleChange = useCallback(
    <K extends keyof CoverData>(field: K, value: CoverData[K]) => {
      setData((d) => ({ ...d, [field]: value }))
    },
    [],
  )

  const handleStyleChange = useCallback((id: CoverStyleId) => {
    setStyleId(id)
  }, [])

  const handleGenerate = useCallback(() => {
    upsertHistoryEntry(data, styleId)
    toast.success('Cover generated — saved to history')
    setMode('preview')
    window.scrollTo({ top: 0 })
  }, [data, styleId])

  return mode === 'preview' ? (
    <CoverPreview
      data={data}
      styleId={styleId}
      onStyleChange={handleStyleChange}
      onEdit={() => setMode('form')}
    />
  ) : (
    <CoverForm
      data={data}
      onChange={handleChange}
      styleId={styleId}
      onStyleChange={handleStyleChange}
      onGenerate={handleGenerate}
    />
  )
}
