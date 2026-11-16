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

function SmallLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-400">
      {children}
    </p>
  )
}

export const CoverSheetMinimal = React.forwardRef<HTMLDivElement, { data: CoverData }>(
  function CoverSheetMinimal({ data }, ref) {
    return (
      <div
        ref={ref}
        id="cover-sheet"
        className="relative bg-white text-neutral-900 overflow-hidden font-sans"
        style={{ width: 794, height: 1122 }}
      >
        {/* hairline frame */}
        <div className="absolute inset-6 border border-neutral-200 pointer-events-none" />

        <div className="relative h-full flex flex-col px-20 pt-16 pb-14">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/college-logo.webp"
              alt={COLLEGE_NAME}
              className="h-[76px] w-auto object-contain"
            />
            <p className="mt-4 text-[13px] font-medium uppercase tracking-[0.35em] text-neutral-900">
              {COLLEGE_NAME}
            </p>
            {data.studentDepartment && (
              <p className="mt-1.5 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
                {data.studentDepartment}
              </p>
            )}
          </div>

          <div className="mt-8 border-t border-neutral-200" />

          {/* Assignment */}
          <div className="mt-10 text-center">
            <SmallLabel>{data.docTitle || 'Assignment'}</SmallLabel>
            {data.topic && (
              <p className="mt-3 text-[22px] font-light text-neutral-800 leading-snug">
                {data.topic}
              </p>
            )}
          </div>

          {/* Course info */}
          <div className="mt-9 mx-auto w-[520px]">
            <div className="flex justify-between items-baseline py-2 border-b border-neutral-100 text-[13px]">
              <span className="text-neutral-400">Course Title</span>
              <span className="text-neutral-900">{data.courseTitle || '—'}</span>
            </div>
            <div className="flex justify-between items-baseline py-2 border-b border-neutral-100 text-[13px]">
              <span className="text-neutral-400">Course Code</span>
              <span className="text-neutral-900">{data.courseCode || '—'}</span>
            </div>
            {data.assignmentNo && (
              <div className="flex justify-between items-baseline py-2 border-b border-neutral-100 text-[13px]">
                <span className="text-neutral-400">Assignment No.</span>
                <span className="text-neutral-900">{data.assignmentNo}</span>
              </div>
            )}
          </div>

          {/* To / By */}
          <div className="mt-10 grid grid-cols-2 gap-10">
            <div>
              <SmallLabel>Submitted To</SmallLabel>
              <div className="mt-3 space-y-1">
                <Row
                  label="Name"
                  value={data.teacherName}
                  labelClass="text-neutral-500"
                  valueClass="text-neutral-900"
                />
                <Row
                  label="Designation"
                  value={data.teacherDesignation}
                  labelClass="text-neutral-500"
                  valueClass="text-neutral-900"
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
                  labelClass="text-neutral-500"
                  valueClass="text-neutral-900"
                />
              </div>
            </div>
            <div>
              <SmallLabel>Submitted By</SmallLabel>
              <div className="mt-3 space-y-1">
                <Row
                  label="Name"
                  value={data.studentName}
                  labelClass="text-neutral-500"
                  valueClass="text-neutral-900"
                />
                <Row
                  label="Student ID"
                  value={data.studentId}
                  labelClass="text-neutral-500"
                  valueClass="text-neutral-900"
                />
                <Row
                  label="Session"
                  value={formatSession(data.batch, data.section)}
                  labelClass="text-neutral-500"
                  valueClass="text-neutral-900"
                />
                <Row
                  label="Semester"
                  value={data.semester}
                  labelClass="text-neutral-500"
                  valueClass="text-neutral-900"
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
                  labelClass="text-neutral-500"
                  valueClass="text-neutral-900"
                />
              </div>
            </div>
          </div>

          <div className="flex-1" />

          {/* Evaluator */}
          <div className="pt-4">
            <SmallLabel>For Evaluator&apos;s Use Only</SmallLabel>
            <div className="mt-4">
              <MarksTable tone="mono" />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 flex items-end justify-between">
            <div>
              <SmallLabel>Date of Submission</SmallLabel>
              <p className="mt-1 text-[14px] text-neutral-900">
                {formatSubmissionDate(data.submissionDate) || '—'}
              </p>
            </div>
            <span className="text-[11px] text-neutral-400">{COLLEGE_NAME}</span>
          </div>
        </div>
      </div>
    )
  },
)
