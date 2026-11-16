import {Department, Designation} from "#/data/enums.ts";

export interface Teacher {
  name: string
  designation: Designation
  department: Department
}


export const teachers: Teacher[] = [
  {
    name: 'Md. Gias Uddin',
    designation: Designation.LECTURER,
    department: Department.ACCOUNTING,
  },
  {
    name: 'Md. Forhad Hossain',
    designation: Designation.LECTURER,
    department: Department.ACCOUNTING,
  },
  {
    name: 'G.M. Muhitul Islam',
    designation: Designation.ASSISTANT_PROFESSOR,
    department: Department.ACCOUNTING,
  },
  {
    name: 'Ismat Ara Sarker',
    designation: Designation.ASSISTANT_PROFESSOR,
    department: Department.ACCOUNTING,
  },
  {
    name: 'Mohammad Mainul Ashraf',
    designation: Designation.PROFESSOR,
    department: Department.ACCOUNTING,
  },
  {
    name: 'Md. Ayanal Haque',
    designation: Designation.ASSISTANT_PROFESSOR,
    department: Department.ACCOUNTING,
  },
  {
    name: 'Prof. Mahbub Alam',
    designation: Designation.PROFESSOR,
    department: Department.ACCOUNTING,
  },
  {
    name: 'Prof. Sagar Bikash Bhowmick',
    designation: Designation.PROFESSOR,
    department: Department.ACCOUNTING,
  },
  {
    name: 'Mohammad Mashiur Rahman',
    designation: Designation.PROFESSOR,
    department: Department.ACCOUNTING,
  },
]
