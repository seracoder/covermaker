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

function DoubleRule() {
  return (
    <div className="border-y border-[#1b5e3a]/25 py-0.5">
      <div className="border-y-2 border-[#1b5e3a]/60" />
    </div>
  )
}

/**
 * "Classic" — formal serif design in the college's deep-green palette with a
 * double frame and crest-by-name header. Distinct layout from a certain other
 * cover generator: no black box frame, no dash-flanked title, green table.
 */
export const CoverSheetClassic = React.forwardRef<HTMLDivElement, { data: CoverData }>(
  function CoverSheetClassic({ data }, ref) {
    return (
      <div
        ref={ref}
        id="cover-sheet"
        className="relative bg-white text-neutral-900 overflow-hidden font-sans"
        style={{ width: 794, height: 1122 }}
      >
        {/* Double frame: hairline outside, heavy inside */}
        <div className="absolute inset-4 border border-[#1b5e3a]/30 pointer-events-none" />
        <div className="absolute inset-[26px] border-4 border-double border-[#1b5e3a]/70 pointer-events-none" />

        <div className="relative h-full flex flex-col px-20 pt-16 pb-14">
          {/* Crest + name in one row */}
          <div className="flex items-center justify-center gap-5">
            <img
              src="/college-logo.png"
              alt={COLLEGE_NAME}
              className="h-[72px] w-[72px] shrink-0 object-contain"
            />
            <div className="text-left">
              <h1 className="text-[28px] font-bold leading-tight text-[#14532d]" style={SERIF}>
                {COLLEGE_NAME}
              </h1>
              {data.studentDepartment && (
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1b5e3a]">
                  {data.studentDepartment}
                </p>
              )}
            </div>
          </div>

          <div className="mt-5">
            <DoubleRule />
          </div>

          {/* Assignment */}
          <div className="mt-10 text-center">
            <p
              className="text-[34px] font-bold tracking-[0.3em] text-[#14532d]"
              style={SERIF}
            >
              {(data.docTitle || 'Assignment').toUpperCase()}
            </p>
            <div className="mx-auto mt-3 h-[3px] w-28 bg-[#1b5e3a]" />
            {data.topic && (
              <p className="mx-auto mt-5 max-w-[540px] text-[18px] italic text-neutral-700" style={SERIF}>
                &ldquo;{data.topic}&rdquo;
              </p>
            )}
          </div>

          {/* Course info */}
          <div className="mx-auto mt-7 w-[540px] overflow-hidden rounded-lg border border-[#1b5e3a]/40">
            <div className="bg-[#1b5e3a]/5 px-6 py-3 text-[13px]">
              <div className="flex justify-between items-baseline gap-4">
                <span className="font-semibold text-[#14532d]">Course Title</span>
                <span className="text-neutral-800 text-right">{data.courseTitle || '—'}</span>
              </div>
            </div>
            <div className="border-t border-[#1b5e3a]/20 px-6 py-3 text-[13px]">
              <div className="flex justify-between items-baseline gap-4">
                <span className="font-semibold text-[#14532d]">Course Code</span>
                <span className="text-neutral-800">{data.courseCode || '—'}</span>
              </div>
            </div>
            {data.assignmentNo && (
              <div className="border-t border-[#1b5e3a]/20 bg-[#1b5e3a]/5 px-6 py-3 text-[13px]">
                <div className="flex justify-between items-baseline gap-4">
                  <span className="font-semibold text-[#14532d]">Assignment No.</span>
                  <span className="text-neutral-800">{data.assignmentNo}</span>
                </div>
              </div>
            )}
          </div>

          {/* To / By */}
          <div className="mt-9 grid grid-cols-2 gap-10">
            <div>
              <p
                className="text-center text-[18px] font-bold text-[#14532d] border-b-4 border-double border-[#1b5e3a]/50 pb-2"
                style={SERIF}
              >
                Submitted To
              </p>
              <div className="mt-3 space-y-1.5 px-1">
                <Row
                  label="Name"
                  value={data.teacherName}
                  labelClass="text-[#14532d] font-semibold"
                  valueClass="text-neutral-700"
                />
                <Row
                  label="Designation"
                  value={data.teacherDesignation}
                  labelClass="text-[#14532d] font-semibold"
                  valueClass="text-neutral-700"
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
                  labelClass="text-[#14532d] font-semibold"
                  valueClass="text-neutral-700"
                />
              </div>
            </div>
            <div>
              <p
                className="text-center text-[18px] font-bold text-[#14532d] border-b-4 border-double border-[#1b5e3a]/50 pb-2"
                style={SERIF}
              >
                Submitted By
              </p>
              <div className="mt-3 space-y-1.5 px-1">
                <Row
                  label="Name"
                  value={data.studentName}
                  labelClass="text-[#14532d] font-semibold"
                  valueClass="text-neutral-700"
                />
                <Row
                  label="Student ID"
                  value={data.studentId}
                  labelClass="text-[#14532d] font-semibold"
                  valueClass="text-neutral-700"
                />
                <Row
                  label="Session"
                  value={formatSession(data.batch, data.section)}
                  labelClass="text-[#14532d] font-semibold"
                  valueClass="text-neutral-700"
                />
                <Row
                  label="Semester"
                  value={data.semester}
                  labelClass="text-[#14532d] font-semibold"
                  valueClass="text-neutral-700"
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
                  labelClass="text-[#14532d] font-semibold"
                  valueClass="text-neutral-700"
                />
              </div>
            </div>
          </div>

          <div className="flex-1" />

          {/* Evaluator */}
          <div>
            <div className="mb-4 flex items-center justify-center gap-4">
              <span className="h-px w-16 bg-[#1b5e3a]/40" />
              <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#1b5e3a]">
                For Evaluator&apos;s Use Only
              </p>
              <span className="h-px w-16 bg-[#1b5e3a]/40" />
            </div>
            <MarksTable tone="forest" />
          </div>

          {/* Date */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#1b5e3a]/40 bg-[#1b5e3a]/5 px-8 py-2.5">
              <span className="text-[13px] font-bold text-[#14532d]">Date of Submission</span>
              <span className="h-4 w-px bg-[#1b5e3a]/40" />
              <span className="text-[13px] text-neutral-700">
                {formatSubmissionDate(data.submissionDate) || '—'}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  },
)
