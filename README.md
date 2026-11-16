# Cover Page Maker — Govt. Tolaram College

A free assignment cover page generator for **Government Tolaram College**, rebuilt with
**React 19 + TanStack Router (file-based routing) + Tailwind CSS v4 + shadcn/ui** in a light
emerald theme.

Students fill in course, teacher, and personal details, pick one of **5 cover styles**, then
generate a print-ready A4 cover page — download as PNG or print/save as PDF (the cover renders
at 794×1122 px, which is exactly A4 at 96 dpi). Every generated cover is auto-saved to a
**history page** (form data only) so it can be reopened, re-printed, or re-exported later.

## Getting Started

```bash
pnpm install   # or npm install
pnpm dev       # dev server on http://localhost:3000
pnpm build     # production build
```

> **Note:** this project was scaffolded with pnpm — use `pnpm` for installs to stay in sync
> with `pnpm-lock.yaml`.

## Editing the predefined lists (no API needed)

The two dropdowns are powered by plain local files you can edit freely — users can always
type values manually instead of using the dropdowns:

| Dropdown       | File                  | Entry shape                                |
| -------------- | --------------------- | ------------------------------------------ |
| Search Course  | `src/data/courses.ts` | `{ code, title, department? }`             |
| Search Teacher | `src/data/teachers.ts`| `{ name, designation, department }`        |

## Rebranding

College name / college line on the cover live in `src/lib/cover.ts`
(`COLLEGE_NAME`, `COLLEGE_UNIVERSITY_LINE`). The logo is `public/college-logo.png`, and the
page title is set in `index.html`.

## Cover styles

Five designs live in `src/components/cover/sheets/`, registered in `src/lib/coverStyles.ts`:

| Style     | Look                                                   |
| --------- | ------------------------------------------------------ |
| `classic` | Navy-on-light formal layout with a full frame          |
| `modern`  | Emerald header banner, left-aligned sections           |
| `minimal` | Monochrome, letterspaced labels, hairlines             |
| `elegant` | Cream & maroon serif with ornamental gold frame        |
| `bold`    | Slate header banner, heavy typography                  |

Chosen style is persisted (`cover_style_v1`), selectable in the form and switchable live in
the preview.

## Project structure

```
src/
  data/
    courses.ts            ← predefined course list (editable)
    teachers.ts           ← predefined teacher list (editable)
  lib/
    cover.ts              ← CoverData type, branding constants, formatting helpers
    coverStyles.ts        ← the 5-style registry
    coverHistory.ts       ← localStorage history store (data only, capped at 60)
  components/
    cover/
      CoverSheet.tsx      ← style dispatcher (all sheets target #cover-sheet)
      sheets/             ← the 5 cover designs + shared Row/MarksTable helpers
      CoverForm.tsx       ← cards + style picker + validation + Generate
      CoverPreview.tsx    ← scaled preview, live style switcher, PNG/PDF export
      CourseCombobox.tsx / TeacherCombobox.tsx / DatePickerField.tsx
  components/ui/          ← shadcn/ui components
  routes/
    __root.tsx            ← brand header + floating nav (Cover / History)
    index.tsx             ← redirects "/" to "/cover"
    cover.tsx             ← form ⇄ preview, style persistence, history save,
                            opens /cover?history=<id> from the history page
    history.tsx           ← saved covers list (Open / Delete)
```

## Behavior notes

- **PWA / offline**: the site is a Progressive Web App (`vite-plugin-pwa`, Workbox). After the
  first visit, the app shell and all assets are precached, so it loads and works fully offline.
  Installable on phones/desktop (standalone display, college-logo icons incl. maskable).
  Update strategy: `autoUpdate` — new versions activate on next reload. In dev the SW is
  enabled too (`devOptions.enabled`).
- **History** stores only the form input data (never images) under `cover_history_v1`.
  Generating again with identical data refreshes the existing entry instead of duplicating.
- Student info (name, ID, batch, section, semester, department) persists in
  `localStorage` under `cover_page_form_v1`.
- **Print / Save as PDF** uses `window.print()` with a `@page { size: A4; margin: 0 }`
  stylesheet — only `#cover-sheet` is visible in print output.
- **Download PNG** rasterizes the sheet at 3× pixel ratio via `html-to-image`
  (`Cover_<course code>.png`).
- Required fields are validated in form order with toast messages before generating;
  **Section** and **Semester Name** are optional.
```
