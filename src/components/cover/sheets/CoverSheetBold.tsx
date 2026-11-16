import * as React from 'react'

import {
  COLLEGE_NAME,
  COLLEGE_UNIVERSITY_LINE,
  formatSession,
  formatSubmissionDate,
  withDepartmentPrefix,
  type CoverData,
} from '@/lib/cover'
import { MarksTable, Row } from '@/components/cover/sheets/shared'

function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 border-b-2 border-slate-900 pb-2">
      <span className="h-3.5 w-3.5 bg-emerald-500 shrink-0" />
      <p className="text-[15px] font-black uppercase tracking-[0.15em] text-slate-900">
        {children}
      </p>
    </div>
  )
}

export const CoverSheetBold = React.forwardRef<HTMLDivElement, { data: CoverData }>(
  function CoverSheetBold({ data }, ref) {
    return (
      <div
        ref={ref}
        id="cover-sheet"
        className="relative bg-white text-slate-900 overflow-hidden font-sans"
        style={{ width: 794, height: 1122 }}
      >
        {/* Header banner */}
        <div className="bg-slate-900 px-14 py-9">
          <div className="flex items-center gap-6">
            <div className="h-[88px] w-[88px] shrink-0 rounded-full bg-white flex items-center justify-center p-2">
              <img
                src="/college-logo.png"
                alt={COLLEGE_NAME}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-[26px] font-black leading-tight text-white uppercase tracking-wide">
                {COLLEGE_NAME}
              </h1>
              {data.studentDepartment && (
                <span className="mt-2 inline-block bg-emerald-500 text-white text-[11px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full">
                  {data.studentDepartment}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="h-2 bg-emerald-500" />

        <div className="flex flex-col h-[calc(1122px-185px)] px-14 pt-9 pb-10">
          {/* Assignment */}
          <div>
            <h2 className="text-[52px] font-black leading-none tracking-tight text-slate-900">
              {(data.docTitle || 'Assignment').toUpperCase()}
            </h2>
            <div className="mt-2 h-2 w-40 bg-emerald-500" />
            {data.topic && (
              <p className="mt-4 text-[18px] font-semibold text-slate-600">
                &ldquo;{data.topic}&rdquo;
              </p>
            )}
          </div>

          {/* Course info */}
          <div className="mt-6 rounded-lg border-2 border-slate-900 bg-slate-50 px-6 py-4 space-y-1.5">
            <div className="flex justify-between items-center gap-4 text-[13px]">
              <span className="font-bold text-slate-700 shrink-0">Course Title</span>
              <span className="font-semibold text-slate-900 text-right">
                {data.courseTitle || '—'}
              </span>
            </div>
            <div className="flex justify-between items-center gap-4 text-[13px]">
              <span className="font-bold text-slate-700 shrink-0">Course Code</span>
              <span className="font-semibold text-slate-900">{data.courseCode || '—'}</span>
            </div>
            {data.assignmentNo && (
              <div className="flex justify-between items-center gap-4 text-[13px]">
                <span className="font-bold text-slate-700 shrink-0">Assignment No.</span>
                <span className="font-semibold text-slate-900">{data.assignmentNo}</span>
              </div>
            )}
          </div>

          {/* To / By */}
          <div className="mt-8 grid grid-cols-2 gap-8">
            <div>
              <SectionHead>Submitted To</SectionHead>
              <div className="mt-3 space-y-1 px-0.5">
                <Row
                  label="Name"
                  value={data.teacherName}
                  labelClass="font-bold text-slate-500"
                  valueClass="font-semibold text-slate-900"
                />
                <Row
                  label="Designation"
                  value={data.teacherDesignation}
                  labelClass="font-bold text-slate-500"
                  valueClass="font-semibold text-slate-900"
                />
                <Row
                  label="Department"
                  value={
                    data.teacherDepartment ? (
                      <>
                        {withDepartmentPrefix(data.teacherDepartment)},
                        <br />
                        {COLLEGE_UNIVERSITY_LINE}
                      </>
                    ) : (
                      ''
                    )
                  }
                  labelClass="font-bold text-slate-500"
                  valueClass="font-semibold text-slate-900"
                />
              </div>
            </div>
            <div>
              <SectionHead>Submitted By</SectionHead>
              <div className="mt-3 space-y-1 px-0.5">
                <Row
                  label="Name"
                  value={data.studentName}
                  labelClass="font-bold text-slate-500"
                  valueClass="font-semibold text-slate-900"
                />
                <Row
                  label="Student ID"
                  value={data.studentId}
                  labelClass="font-bold text-slate-500"
                  valueClass="font-semibold text-slate-900"
                />
                <Row
                  label="Session"
                  value={formatSession(data.batch, data.section)}
                  labelClass="font-bold text-slate-500"
                  valueClass="font-semibold text-slate-900"
                />
                <Row
                  label="Semester"
                  value={data.semester}
                  labelClass="font-bold text-slate-500"
                  valueClass="font-semibold text-slate-900"
                />
                <Row
                  label="Department"
                  value={
                    data.studentDepartment ? (
                      <>
                        {withDepartmentPrefix(data.studentDepartment)},
                        <br />
                        {COLLEGE_UNIVERSITY_LINE}
                      </>
                    ) : (
                      ''
                    )
                  }
                  labelClass="font-bold text-slate-500"
                  valueClass="font-semibold text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="flex-1" />

          {/* Evaluator */}
          <div className="border-t-2 border-slate-200 pt-5">
            <p className="text-[12px] font-black uppercase tracking-[0.25em] text-slate-400 mb-4">
              For Evaluator&apos;s Use Only
            </p>
            <MarksTable tone="slate" />
          </div>

          {/* Date */}
          <div className="mt-6 flex justify-end">
            <div className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-5 py-2">
              <span className="text-[12px] font-black uppercase tracking-wider text-emerald-100">
                Date of Submission
              </span>
              <span className="text-[12px] font-bold text-white">
                {formatSubmissionDate(data.submissionDate) || '—'}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  },
)
