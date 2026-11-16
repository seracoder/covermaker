import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { FileText, History as HistoryIcon, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { deleteHistoryEntry, loadHistory, type CoverHistoryEntry } from '@/lib/coverHistory'
import { coverStyleName } from '@/lib/coverStyles'

export const Route = createFileRoute('/history')({
  component: HistoryPage,
})

function HistoryPage() {
  const [entries, setEntries] = useState<CoverHistoryEntry[]>(() => loadHistory())

  const handleDelete = (id: string) => {
    deleteHistoryEntry(id)
    setEntries(loadHistory())
    toast.success('Removed from history')
  }

  return (
    <div className="mx-auto max-w-5xl space-y-4 p-4">
      <div className="flex items-center justify-between pt-2">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
          <HistoryIcon className="h-6 w-6 text-emerald-600" />
          Cover History
        </h1>
        <span className="text-sm text-muted-foreground">
          {entries.length} saved {entries.length === 1 ? 'cover' : 'covers'}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">
        Only the form data is stored — open any cover to preview, print it as PDF or download it
        again.
      </p>

      {entries.length === 0 ? (
        <Card className="items-center gap-3 py-14 text-center">
          <FileText className="h-10 w-10 text-muted-foreground/40" />
          <p className="font-medium text-foreground">No covers saved yet</p>
          <p className="text-sm text-muted-foreground">
            Generate a cover page and it will appear here automatically.
          </p>
          <Button asChild className="mt-2 bg-emerald-600 text-white hover:bg-emerald-700">
            <Link to="/cover">Create your first cover page</Link>
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {entries.map((e) => (
            <Card key={e.id} className="flex-row items-center gap-4 py-4">
              <div className="min-w-0 flex-1 space-y-1 px-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-800">
                    {e.data.courseCode || '—'}
                  </span>
                  <span className="truncate font-semibold text-foreground">
                    {e.data.courseTitle || 'Untitled course'}
                  </span>
                </div>
                {e.data.topic && (
                  <p className="truncate text-sm text-muted-foreground">
                    &ldquo;{e.data.topic}&rdquo;
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  {e.data.studentName || 'Unknown student'}
                  {e.data.studentId ? ` · ${e.data.studentId}` : ''}
                  {` · ${coverStyleName(e.styleId)} style`}
                  {` · saved ${format(new Date(e.savedAt), 'd MMM yyyy, h:mm a')}`}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2 px-6">
                <Button
                  asChild
                  size="sm"
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  <Link to="/cover" search={{ history: e.id }}>
                    Open
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  aria-label={`Delete ${e.data.courseCode || 'entry'}`}
                  onClick={() => handleDelete(e.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
