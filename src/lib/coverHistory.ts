// ─────────────────────────────────────────────────────────────────────────────
// Cover page history — stores the FORM DATA of generated covers (not images),
// so any past cover can be reopened and re-printed / re-exported at any time.
// ─────────────────────────────────────────────────────────────────────────────

import type { CoverData } from './cover'
import { isCoverStyleId, type CoverStyleId } from './coverStyles'

const HISTORY_KEY = 'cover_history_v1'
const MAX_ENTRIES = 60

export interface CoverHistoryEntry {
  id: string
  savedAt: string // ISO timestamp
  styleId: CoverStyleId
  data: CoverData
}

export function loadHistory(): CoverHistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (e): e is CoverHistoryEntry =>
        !!e &&
        typeof e === 'object' &&
        typeof (e as CoverHistoryEntry).id === 'string' &&
        typeof (e as CoverHistoryEntry).savedAt === 'string' &&
        isCoverStyleId((e as CoverHistoryEntry).styleId) &&
        !!(e as CoverHistoryEntry).data,
    )
  } catch {
    return []
  }
}

function persist(entries: CoverHistoryEntry[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)))
  } catch {
    // storage full/unavailable — ignore
  }
}

function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
}

/**
 * Saves a generated cover. If the newest entry has identical data + style,
 * only its timestamp is refreshed (no duplicate spam from re-generating).
 */
export function upsertHistoryEntry(data: CoverData, styleId: CoverStyleId): CoverHistoryEntry {
  const entries = loadHistory()
  const signature = JSON.stringify({ data, styleId })
  const existingIdx = entries.findIndex(
    (e) => JSON.stringify({ data: e.data, styleId: e.styleId }) === signature,
  )
  const savedAt = new Date().toISOString()

  let entry: CoverHistoryEntry
  if (existingIdx >= 0) {
    entry = { ...entries[existingIdx], savedAt }
    entries.splice(existingIdx, 1)
  } else {
    entry = { id: makeId(), savedAt, styleId, data: { ...data } }
  }
  entries.unshift(entry)
  persist(entries)
  return entry
}

export function deleteHistoryEntry(id: string) {
  persist(loadHistory().filter((e) => e.id !== id))
}
