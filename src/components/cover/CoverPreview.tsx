import { useCallback, useEffect, useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { jsPDF } from 'jspdf'
import { ArrowLeft, Download, FileDown, Share2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { CoverSheet } from '@/components/cover/CoverSheet'
import type { CoverData } from '@/lib/cover'
import { coverStyles, type CoverStyleId } from '@/lib/coverStyles'

interface CoverPreviewProps {
  data: CoverData
  styleId: CoverStyleId
  onStyleChange: (id: CoverStyleId) => void
  onEdit: () => void
}

const SHEET_WIDTH = 794
const SHEET_HEIGHT = 1122

function coverFileName(courseCode: string, ext: string): string {
  return `Cover_${(courseCode || 'Page').replace(/[^a-zA-Z0-9-]/g, '')}.${ext}`
}

export function CoverPreview({ data, styleId, onStyleChange, onEdit }: CoverPreviewProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [downloading, setDownloading] = useState(false)
  const [downloadingPdf, setDownloadingPdf] = useState(false)
  const [sharing, setSharing] = useState(false)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const update = () => {
      // Measure the wrapper's real layout box — never window.innerWidth, which
      // can misreport on mobile devices / emulators (e.g. 2× under OS scaling).
      const available = wrapper.clientWidth || document.documentElement.clientWidth
      if (available > 0) setScale(Math.min(1, available / SHEET_WIDTH))
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [])

  /** Rasterizes the cover sheet at 3× and returns the PNG data URL. */
  const getSheetPng = useCallback(async () => {
    if (!sheetRef.current) throw new Error('Cover sheet is not rendered')
    return toPng(sheetRef.current, {
      cacheBust: true,
      backgroundColor: '#ffffff',
      pixelRatio: 3,
      width: SHEET_WIDTH,
      height: SHEET_HEIGHT,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
        width: `${SHEET_WIDTH}px`,
        height: `${SHEET_HEIGHT}px`,
      },
    })
  }, [])

  const handleDownload = useCallback(async () => {
    setDownloading(true)
    try {
      const dataUrl = await getSheetPng()
      const link = document.createElement('a')
      link.download = coverFileName(data.courseCode, 'png')
      link.href = dataUrl
      link.click()
      toast.success('Cover page downloaded')
    } catch {
      toast.error('Failed to generate the image. Please try again.')
    } finally {
      setDownloading(false)
    }
  }, [data.courseCode, getSheetPng])

  /** Builds the A4 PDF blob from the rendered cover sheet. */
  const getSheetPdfBlob = useCallback(async () => {
    const dataUrl = await getSheetPng()
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 297)
    return pdf.output('blob')
  }, [getSheetPng])

  const handleDownloadPdf = useCallback(async () => {
    setDownloadingPdf(true)
    try {
      const blob = await getSheetPdfBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = coverFileName(data.courseCode, 'pdf')
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
      toast.success('PDF downloaded')
    } catch {
      toast.error('Failed to generate the PDF. Please try again.')
    } finally {
      setDownloadingPdf(false)
    }
  }, [data.courseCode, getSheetPdfBlob])

  const handleShare = useCallback(async () => {
    setSharing(true)
    try {
      const blob = await getSheetPdfBlob()
      const fileName = coverFileName(data.courseCode, 'pdf')
      const file = new File([blob], fileName, { type: 'application/pdf' })

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: data.docTitle || 'Cover Page',
          text: `${data.docTitle || 'Cover page'} — ${data.courseTitle} (${data.courseCode})`,
        })
        toast.success('Cover page shared')
      } else {
        // Web Share API unavailable (or can't share files) — fall back to a download.
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = fileName
        link.href = url
        link.click()
        URL.revokeObjectURL(url)
        toast.info('Sharing is not supported here — the PDF was downloaded instead')
      }
    } catch (err) {
      // User dismissed the share sheet — not an error.
      if ((err as DOMException)?.name === 'AbortError') return
      toast.error('Failed to generate the PDF. Please try again.')
    } finally {
      setSharing(false)
    }
  }, [data, getSheetPdfBlob])

  return (
    <div className="p-4 space-y-4">
      {/* Print rules: only the cover sheet is printed, exactly at A4 size. */}
      <style>{`
        @media print {
            @page { size: A4; margin: 0; }
            html, body { margin: 0 !important; padding: 0 !important; background: white; }
            body * { visibility: hidden !important; }
            #cover-sheet, #cover-sheet * { visibility: visible !important; }
            #cover-scale, #cover-scale > div {
                transform: none !important;
                width: auto !important;
                height: auto !important;
            }
            #cover-sheet {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 794px !important;
                height: 1122px !important;
                margin: 0 !important;
                page-break-after: avoid !important;
                page-break-before: avoid !important;
            }
        }
      `}</style>

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onEdit}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Edit details
        </Button>
      </div>

      {/* Live style switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {coverStyles.map((s) =>
          s.id === styleId ? (
            <button
              key={s.id}
              type="button"
              onClick={() => onStyleChange(s.id)}
              className="rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm shadow-emerald-600/25"
            >
              {s.name}
            </button>
          ) : (
            <button
              key={s.id}
              type="button"
              onClick={() => onStyleChange(s.id)}
              className="rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-emerald-400 hover:text-foreground"
            >
              {s.name}
            </button>
          ),
        )}
      </div>

      <div
        ref={wrapperRef}
        id="cover-scale"
        className="mx-auto w-full overflow-hidden"
        style={{ height: SHEET_HEIGHT * scale }}
      >
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: SHEET_WIDTH }}>
          <CoverSheet ref={sheetRef} data={data} styleId={styleId} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 max-w-2xl mx-auto pb-28">
        <Button
          onClick={handleDownload}
          disabled={downloading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white h-11"
        >
          {downloading ? (
            'Generating…'
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" /> Download PNG
            </>
          )}
        </Button>
        <Button variant="outline" onClick={handleDownloadPdf} disabled={downloadingPdf} className="h-11">
          {downloadingPdf ? (
            'Generating…'
          ) : (
            <>
              <FileDown className="w-4 h-4 mr-2" /> Download PDF
            </>
          )}
        </Button>
        <Button
          variant="outline"
          onClick={handleShare}
          disabled={sharing}
          className="h-11"
        >
          {sharing ? (
            'Preparing…'
          ) : (
            <>
              <Share2 className="w-4 h-4 mr-2 text-emerald-600" /> Share
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
