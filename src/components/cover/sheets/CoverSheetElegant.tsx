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

const SERIF = { fontFamily: 'Georgia, "Times New Roman", serif' }

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-24 bg-[#b08d3f]/70" />
      <span className="h-2 w-2 rotate-45 bg-[#b08d3f]" />
      <span className="h-px w-24 bg-[#b08d3f]/70" />
    </div>
  )
}

export const CoverSheetElegant = React.forwardRef<HTMLDivElement, { data: CoverData }>(
  function CoverSheetElegant({ data }, ref) {
    return (
      <div
        ref={ref}
        id="cover-sheet"
        className="relative bg-[#fdfaf3] text-neutral-900 overflow-hidden font-sans"
        style={{ width: 794, height: 1122 }}
      >
        {/* Ornamental double frame */}
        <div className="absolute inset-4 border border-[#b08d3f]/60 pointer-events-none" />
        <div className="absolute inset-7 border-2 border-[#7a1f2b]/50 pointer-events-none" />

        <div className="relative h-full flex flex-col px-20 pt-16 pb-14">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/college-logo.webp"
              alt={COLLEGE_NAME}
              className="h-[84px] w-auto object-contain"
            />
            <h1
              className="mt-3 text-[30px] font-bold text-[#7a1f2b]"
              style={SERIF}
            >
              {COLLEGE_NAME}
            </h1>
            {data.studentDepartment && (
              <p className="mt-1.5 text-[12px] uppercase tracking-[0.25em] text-[#7a1f2b]/80">
                {data.studentDepartment}
              </p>
            )}
            <div className="mt-4">
              <GoldDivider />
            </div>
          </div>

          {/* Assignment */}
          <div className="mt-7 text-center">
            <p
              className="text-[26px] tracking-[0.3em] text-[#7a1f2b]"
              style={SERIF}
            >
              {(data.docTitle || 'Assignment').toUpperCase()}
            </p>
            {data.topic && (
              <p
                className="mt-3 text-[19px] italic text-neutral-700"
                style={SERIF}
              >
                &ldquo;{data.topic}&rdquo;
              </p>
            )}
          </div>

          {/* Course info */}
          <div className="mt-6 mx-auto w-[560px] rounded-md border border-[#b08d3f]/50 bg-white/60 px-7 py-4 space-y-1.5">
            <div className="flex justify-between items-baseline gap-4 text-[14px]" style={SERIF}>
              <span className="font-semibold text-[#7a1f2b] shrink-0">Course Title</span>
              <span className="text-neutral-800 text-right">{data.courseTitle || '—'}</span>
            </div>
            <div className="flex justify-between items-baseline gap-4 text-[14px]" style={SERIF}>
              <span className="font-semibold text-[#7a1f2b] shrink-0">Course Code</span>
              <span className="text-neutral-800">{data.courseCode || '—'}</span>
            </div>
            {data.assignmentNo && (
              <div className="flex justify-between items-baseline gap-4 text-[14px]" style={SERIF}>
                <span className="font-semibold text-[#7a1f2b] shrink-0">Assignment No.</span>
                <span className="text-neutral-800">{data.assignmentNo}</span>
              </div>
            )}
          </div>

          {/* To / By */}
          <div className="mt-8 grid grid-cols-2 gap-9">
            <div>
              <p
                className="text-center text-[17px] font-bold text-[#7a1f2b] border-b border-[#b08d3f]/60 pb-2"
                style={SERIF}
              >
                Submitted To
              </p>
              <div className="mt-3 space-y-1 px-1">
                <Row
                  label="Name"
                  value={data.teacherName}
                  labelClass="text-[#7a1f2b] font-semibold"
                  valueClass="text-neutral-800"
                />
                <Row
                  label="Designation"
                  value={data.teacherDesignation}
                  labelClass="text-[#7a1f2b] font-semibold"
                  valueClass="text-neutral-800"
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
                  labelClass="text-[#7a1f2b] font-semibold"
                  valueClass="text-neutral-800"
                />
              </div>
            </div>
            <div>
              <p
                className="text-center text-[17px] font-bold text-[#7a1f2b] border-b border-[#b08d3f]/60 pb-2"
                style={SERIF}
              >
                Submitted By
              </p>
              <div className="mt-3 space-y-1 px-1">
                <Row
                  label="Name"
                  value={data.studentName}
                  labelClass="text-[#7a1f2b] font-semibold"
                  valueClass="text-neutral-800"
                />
                <Row
                  label="Student ID"
                  value={data.studentId}
                  labelClass="text-[#7a1f2b] font-semibold"
                  valueClass="text-neutral-800"
                />
                <Row
                  label="Session"
                  value={formatSession(data.batch, data.section)}
                  labelClass="text-[#7a1f2b] font-semibold"
                  valueClass="text-neutral-800"
                />
                <Row
                  label="Semester"
                  value={data.semester}
                  labelClass="text-[#7a1f2b] font-semibold"
                  valueClass="text-neutral-800"
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
                  labelClass="text-[#7a1f2b] font-semibold"
                  valueClass="text-neutral-800"
                />
              </div>
            </div>
          </div>

          <div className="flex-1" />

          {/* Evaluator */}
          <div className="border-t border-[#b08d3f]/50 pt-5">
            <p
              className="text-center text-[14px] font-bold text-[#7a1f2b] tracking-[0.15em] mb-4"
              style={SERIF}
            >
              For Evaluator&apos;s Use Only
            </p>
            <MarksTable tone="maroon" />
          </div>

          {/* Date */}
          <div className="mt-6 text-center">
            <span
              className="text-[14px] italic text-neutral-600"
              style={SERIF}
            >
              Date of Submission:{' '}
            </span>
            <span className="text-[14px] font-semibold text-neutral-800" style={SERIF}>
              {formatSubmissionDate(data.submissionDate) || '—'}
            </span>
          </div>
        </div>
      </div>
    )
  },
)
