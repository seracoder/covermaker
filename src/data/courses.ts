import {Department} from "#/data/enums.ts";

export interface Course {
  code: number
  title: string
  inEnglish: boolean
  department: Department
}



export const courses: Course[] = [
  // ── Accounting ────────────────────────────────────────────────────────────────
  { code: 8222551, title: 'Intermediate Accounting', inEnglish: true, department: Department.ACCOUNTING },
  { code: 8222553, title: 'Fundamentals of Taxation', inEnglish: false, department: Department.ACCOUNTING },
  { code: 8222555, title: 'Business Laws and Ethics', inEnglish: false, department: Department.ACCOUNTING },
  { code: 8222557, title: 'Business Mathematics', inEnglish: true, department: Department.ACCOUNTING },
  { code: 8222559, title: 'Business Communication', inEnglish: true, department: Department.ACCOUNTING },
  { code: 8222561, title: 'Macroeconomics ', inEnglish: false, department: Department.ACCOUNTING },
  { code: 8221171, title: 'Functional English', inEnglish: false, department: Department.ACCOUNTING },
  { code: 8226601, title: 'Applied ICT', inEnglish: false, department: Department.ACCOUNTING },
  { code: 8226602, title: 'Practical: Applied ICT', inEnglish: false, department: Department.ACCOUNTING },
  { code: 8222564, title: 'Viva-Voce', inEnglish: false, department: Department.ACCOUNTING },

]
