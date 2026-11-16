import { format } from 'date-fns'

// ─────────────────────────────────────────────────────────────────────────────
// College / branding constants — change these to rebrand the cover sheet.
// ─────────────────────────────────────────────────────────────────────────────

export const COLLEGE_NAME = 'Government Tolaram College'
export const COLLEGE_NAME_SHORT = 'Govt. Tolaram College'

/** Used on the cover for the department lines: "<Dept>,<br/>Government Tolaram College" */
export const COLLEGE_UNIVERSITY_LINE = COLLEGE_NAME

export interface CoverData {
  /** The big document heading on the cover — "Assignment", "Homework", etc. */
  docTitle: string
  courseTitle: string
  courseCode: string
  assignmentNo: string
  topic: string
  teacherName: string
  teacherDesignation: string
  teacherDepartment: string
  teacherUniversity: string
  teacherEmail: string
  teacherFacultyId: string
  studentName: string
  studentId: string
  batch: string
  section: string
  semester: string
  studentDepartment: string
  studentUniversity: string
  submissionDate: string // yyyy-MM-dd
}

export function createEmptyCoverData(defaults?: Partial<CoverData>): CoverData {
  return {
    docTitle: 'Assignment',
    courseTitle: '',
    courseCode: '',
    assignmentNo: '',
    topic: '',
    teacherName: '',
    teacherDesignation: '',
    teacherDepartment: '',
    teacherUniversity: COLLEGE_NAME,
    teacherEmail: '',
    teacherFacultyId: '',
    studentName: '',
    studentId: '',
    batch: '',
    section: '',
    semester: '',
    studentDepartment: '',
    studentUniversity: COLLEGE_NAME,
    submissionDate: '',
    ...defaults,
  }
}

/** Fields persisted to localStorage between visits (student info only, like the original). */
export const PERSISTED_FIELDS = [
  'studentName',
  'studentId',
  'batch',
  'section',
  'semester',
  'studentDepartment',
  'studentUniversity',
] as const satisfies readonly (keyof CoverData)[]

export const STORAGE_KEY = 'cover_page_form_v1'

/**
 * "Department of X" → "DEPARTMENT OF X"; anything else → "DEPARTMENT OF <UPPER>".
 */
export function formatDepartmentHeading(value: string): string {
  if (!value) return ''
  if (/department of/i.test(value)) return value.toUpperCase()
  return `DEPARTMENT OF ${value.toUpperCase()}`
}

/** Strips a leading "Department of " so we can render "<X>, Government Tolaram College". */
export function stripDepartmentPrefix(value: string): string {
  return value ? value.replace(/^Department\s+of\s+/i, '').trim() : ''
}

/** Adds a "Department of " prefix unless the value already has one (idempotent). */
export function withDepartmentPrefix(value: string): string {
  if (!value) return ''
  if (/department of/i.test(value)) return value
  return `Department of ${value}`
}

/** Session line for the cover: "2024-2025 (A)" when a section exists, else whichever part exists. */
export function formatSession(batch: string, section: string): string {
  if (batch && section) return `${batch} (${section})`
  return section || batch || ''
}

/** yyyy-MM-dd → "20 November, 2026" (the date format used on the cover). */
export function formatSubmissionDate(value: string): string {
  return value ? format(new Date(value + 'T00:00:00'), 'd MMMM, yyyy') : ''
}
