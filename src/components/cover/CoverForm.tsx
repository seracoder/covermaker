import { format } from 'date-fns'
import { Sparkles } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CourseCombobox } from '@/components/cover/CourseCombobox'
import { TeacherCombobox } from '@/components/cover/TeacherCombobox'
import { DatePickerField } from '@/components/cover/DatePickerField'
import type { CoverData } from '@/lib/cover'
import { coverStyles, type CoverStyleId } from '@/lib/coverStyles'

interface CoverFormProps {
  data: CoverData
  onChange: <K extends keyof CoverData>(field: K, value: CoverData[K]) => void
  styleId: CoverStyleId
  onStyleChange: (id: CoverStyleId) => void
  onGenerate: () => void
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
}) {
  return (
    <div className="space-y-2">
      <Label className="font-normal text-muted-foreground">{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11"
      />
    </div>
  )
}

/** One titled form panel (a bordered card with heading + description). */
function Section({
  title,
  description,
  children,
  className = '',
}: {
  title: string
  description: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`rounded-xl border border-border bg-card ${className}`}>
      <section className="space-y-5 p-6 sm:p-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        {children}
      </section>
    </div>
  )
}

export function CoverForm({ data, onChange, styleId, onStyleChange, onGenerate }: CoverFormProps) {
  const handleGenerate = () => {
    const required: Array<[keyof CoverData, string]> = [
      ['courseTitle', 'Course title'],
      ['courseCode', 'Course code'],
      ['topic', 'Topic'],
      ['teacherName', 'Teacher name'],
      ['teacherDesignation', 'Teacher designation'],
      ['teacherDepartment', 'Teacher department'],
      ['studentName', 'Student name'],
      ['studentId', 'Student ID'],
      ['batch', 'Batch'],
      ['studentDepartment', 'Department'],
    ]
    for (const [field, label] of required) {
      if (!String(data[field]).trim()) {
        toast.error(`${label} is required`)
        return
      }
    }
    onGenerate()
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col space-y-6 p-4 pb-28">
      {/* Two balanced columns on large screens (Course + Teacher | Student + Date);
          each column's last card stretches so both columns end flush.
          Stacks to a single column on small screens. */}
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
        {/* Column 1 */}
        <div className="flex flex-col gap-6">
          <Section
            title="Course"
            description="Pick a course to fill the details, or type your own."
          >
            <div className="space-y-2">
              <Label className="font-normal text-muted-foreground">Quick pick</Label>
              <CourseCombobox
                onSelect={(course) => {
                  onChange('courseCode', String(course.code))
                  onChange('courseTitle', course.title)
                  onChange('studentDepartment', course.department)
                }}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
              <Field
                label="Course code"
                value={data.courseCode}
                onChange={(v) => onChange('courseCode', v)}
                placeholder="e.g. 8222551"
              />
              <Field
                label="Course title"
                value={data.courseTitle}
                onChange={(v) => onChange('courseTitle', v)}
                placeholder="e.g. Intermediate Accounting"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <Field
                label="Topic"
                value={data.topic}
                onChange={(v) => onChange('topic', v)}
                placeholder="e.g. GAAP standards"
              />
              <Field
                label="Assignment no."
                value={data.assignmentNo}
                onChange={(v) => onChange('assignmentNo', v)}
                placeholder="e.g. 02 (optional)"
              />
            </div>
          </Section>

          <Section
            title="Teacher"
            description="Choose from the faculty list or enter details by hand."
            className="flex-1"
          >
            <div className="space-y-2">
              <Label className="font-normal text-muted-foreground">Quick pick</Label>
              <TeacherCombobox
                onSelect={(teacher) => {
                  onChange('teacherName', teacher.name)
                  onChange('teacherDesignation', teacher.designation)
                  onChange('teacherDepartment', teacher.department ?? '')
                }}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Name"
                value={data.teacherName}
                onChange={(v) => onChange('teacherName', v)}
                placeholder="e.g. Fujiko F. Fujio"
              />
              <Field
                label="Designation"
                value={data.teacherDesignation}
                onChange={(v) => onChange('teacherDesignation', v)}
                placeholder="e.g. Professor"
              />
            </div>
            <Field
              label="Department"
              value={data.teacherDepartment}
              onChange={(v) => onChange('teacherDepartment', v)}
              placeholder="e.g. Department of Accounting"
            />
          </Section>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-6">
          <Section
            title="Student"
            description="Who is handing this in."
          >
            <div className="grid gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <Field
                label="Full name"
                value={data.studentName}
                onChange={(v) => onChange('studentName', v)}
                placeholder="e.g. Doraemon"
              />
              <Field
                label="Student ID"
                value={data.studentId}
                onChange={(v) => onChange('studentId', v)}
                placeholder="e.g. 21120903"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field
                label="Session"
                value={data.batch}
                onChange={(v) => onChange('batch', v)}
                placeholder="e.g. 2024-2025"
              />
              <Field
                label="Section (optional)"
                value={data.section}
                onChange={(v) => onChange('section', v)}
                placeholder="e.g. A"
              />
              <Field
                label="Semester (optional)"
                value={data.semester}
                onChange={(v) => onChange('semester', v)}
                placeholder="e.g. 1st Semester"
              />
            </div>
            <Field
              label="Department"
              value={data.studentDepartment}
              onChange={(v) => onChange('studentDepartment', v)}
              placeholder="e.g. Department of Accounting"
            />
          </Section>

          <Section
            title="Submission date"
            description="What you are handing in, and when."
            className="flex-1"
          >
            <Field
              label="Title"
              value={data.docTitle}
              onChange={(v) => onChange('docTitle', v)}
              placeholder="e.g. Assignment, Homework, Lab Report"
            />
            <div className="max-w-xs">
              <DatePickerField
                value={data.submissionDate ? new Date(data.submissionDate + 'T00:00:00') : undefined}
                onChange={(date) => onChange('submissionDate', date ? format(date, 'yyyy-MM-dd') : '')}
              />
            </div>
          </Section>
        </div>
      </div>

      {/* Cover style */}
      <Section
        title="Cover style"
        description="Pick a design for the printed page — you can switch it in the preview."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {coverStyles.map((s) => {
            const selected = s.id === styleId
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onStyleChange(s.id)}
                aria-pressed={selected}
                className={
                  selected
                    ? 'rounded-xl border-2 border-emerald-600 bg-emerald-50 p-3 text-left transition-colors'
                    : 'rounded-xl border border-border bg-background p-3 text-left transition-colors hover:border-emerald-400'
                }
              >
                <span
                  className={
                    selected
                      ? 'block text-sm font-semibold text-emerald-900'
                      : 'block text-sm font-semibold'
                  }
                >
                  {s.name}
                </span>
                <span className="mt-1 block text-xs leading-snug text-muted-foreground">
                  {s.description}
                </span>
              </button>
            )
          })}
        </div>
      </Section>

      <Button
        onClick={handleGenerate}
        className="h-12 w-full bg-emerald-600 text-base text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 sm:w-96 sm:self-center"
      >
        <Sparkles className="mr-2 h-5 w-5" />
        Generate cover page
      </Button>
    </div>
  )
}
