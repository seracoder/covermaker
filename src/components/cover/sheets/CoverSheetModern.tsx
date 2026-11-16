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

export const CoverSheetModern = React.forwardRef<HTMLDivElement, { data: CoverData }>(
  function CoverSheetModern({ data }, ref) {
    return (
      <div
        ref={ref}
        id="cover-sheet"
        className="relative bg-white text-neutral-900 overflow-hidden font-sans"
        style={{ width: 794, height: 1122 }}
      >
        {/* Header banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-500 px-14 py-8">
          <div className="flex items-center gap-6">
            <div className="h-[92px] w-[92px] shrink-0 rounded-2xl bg-white flex items-center justify-center p-1.5 shadow-md">
              <img
                src="/college-logo.png"
                alt={COLLEGE_NAME}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-[24px] font-extrabold leading-tight text-white">
                {COLLEGE_NAME}
              </h1>
              {data.studentDepartment && (
                <p className="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-emerald-100">
                  {data.studentDepartment}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="h-1.5 bg-emerald-400" />

        <div className="flex flex-col h-[calc(1122px-173px)] px-14 pt-8 pb-10">
          {/* Title block */}
          <div>
            <div className="flex items-center gap-4">
              <span className="h-10 w-1.5 bg-emerald-600 rounded-full" />
              <h2 className="text-[34px] font-black tracking-[0.12em] text-neutral-900">
                {(data.docTitle || 'Assignment').toUpperCase()}
              </h2>
            </div>
            {data.topic && (
              <p className="mt-2 text-[16px] font-medium text-neutral-600 pl-[26px]">
                &ldquo;{data.topic}&rdquo;
              </p>
            )}
          </div>

          {/* Course info */}
          <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50/40 px-6 py-4 space-y-1.5">
            <div className="flex justify-between items-center gap-4 text-[13px]">
              <span className="font-bold text-emerald-800 shrink-0">Course Title</span>
              <span className="font-medium text-neutral-800 text-right">
                {data.courseTitle || '—'}
              </span>
            </div>
            <div className="flex justify-between items-center gap-4 text-[13px]">
              <span className="font-bold text-emerald-800 shrink-0">Course Code</span>
              <span className="font-medium text-neutral-800">{data.courseCode || '—'}</span>
            </div>
            {data.assignmentNo && (
              <div className="flex justify-between items-center gap-4 text-[13px]">
                <span className="font-bold text-emerald-800 shrink-0">Assignment No.</span>
                <span className="font-medium text-neutral-800">{data.assignmentNo}</span>
              </div>
            )}
          </div>

          {/* To / By */}
          <div className="mt-7 grid grid-cols-2 gap-8">
            <div>
              <p className="text-[13px] font-black uppercase tracking-[0.2em] text-emerald-700 border-b-2 border-emerald-200 pb-2">
                Submitted To
              </p>
              <div className="mt-3 space-y-1 px-1">
                <Row
                  label="Name"
                  value={data.teacherName}
                  labelClass="font-semibold text-neutral-500"
                  valueClass="font-medium text-neutral-900"
                />
                <Row
                  label="Designation"
                  value={data.teacherDesignation}
                  labelClass="font-semibold text-neutral-500"
                  valueClass="font-medium text-neutral-900"
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
                  labelClass="font-semibold text-neutral-500"
                  valueClass="font-medium text-neutral-900"
                />
              </div>
            </div>
            <div>
              <p className="text-[13px] font-black uppercase tracking-[0.2em] text-emerald-700 border-b-2 border-emerald-200 pb-2">
                Submitted By
              </p>
              <div className="mt-3 space-y-1 px-1">
                <Row
                  label="Name"
                  value={data.studentName}
                  labelClass="font-semibold text-neutral-500"
                  valueClass="font-medium text-neutral-900"
                />
                <Row
                  label="Student ID"
                  value={data.studentId}
                  labelClass="font-semibold text-neutral-500"
                  valueClass="font-medium text-neutral-900"
                />
                <Row
                  label="Session"
                  value={formatSession(data.batch, data.section)}
                  labelClass="font-semibold text-neutral-500"
                  valueClass="font-medium text-neutral-900"
                />
                <Row
                  label="Semester"
                  value={data.semester}
                  labelClass="font-semibold text-neutral-500"
                  valueClass="font-medium text-neutral-900"
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
                  labelClass="font-semibold text-neutral-500"
                  valueClass="font-medium text-neutral-900"
                />
              </div>
            </div>
          </div>

          <div className="flex-1" />

          {/* Evaluator */}
          <div className="border-t border-neutral-200 pt-5">
            <p className="text-[12px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-4">
              For Evaluator&apos;s Use Only
            </p>
            <MarksTable tone="emerald" />
          </div>

          {/* Date footer */}
          <div className="mt-6 flex items-center justify-between">
            <span className="text-[12px] text-neutral-400">
              Generated with Cover Page Maker
            </span>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-1.5">
              <span className="text-[12px] font-bold text-white">Submitted:</span>
              <span className="text-[12px] font-medium text-white">
                {formatSubmissionDate(data.submissionDate) || '—'}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  },
)
