# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React + Vite SPA for clinical decision support in occupational health assessments at ACHS (Asociación Chilena de Seguridad). Provides structured questionnaires for occupational health consultations and generates evidence-based treatment protocols.

## Commands

```bash
npm run dev       # Vite dev server with HMR at http://localhost:5173
npm run build     # Production build → /dist/
npm run lint      # ESLint
npm run preview   # Serve production build locally
npm run deploy    # Build + push to gh-pages branch (GitHub Pages)
```

No test suite is configured. Verification is done via `npm run lint` and manual testing on `npm run dev`.

## Architecture

### Core Flow

`App.jsx` (~2000 LOC) is the central hub managing everything: category/questionnaire selection, step-by-step question rendering, answer state, and report generation. The flow is:

1. User selects a **category** (e.g., Lumbago, Tobillo y Pie) from `src/config/categories.js`
2. Category maps to a **questionnaire** — each questionnaire is lazy-loaded via dynamic `import()` from `src/questionnaires/`
3. Questions render one-by-one with `showIf(answers)` callbacks controlling conditional skip logic
4. On completion, `generateClinicalReport(answers)` produces the clinical report text

### Questionnaire Files (`src/questionnaires/`)

Each questionnaire module exports:
- `questions` — array of question objects (`id`, `type`, `label`, `options?`, `showIf?`)
- `allQuestions` — flattened list for answer lookups
- `generateClinicalReport(answers)` — returns the final report text/markdown
- Protocol generator functions (e.g., `getProtocoloEsguince1(answers)`) — return structured treatment instructions based on clinical findings

Shared building blocks: `commonAnamnesis.js` and `commonDemographics.js` are imported by multiple questionnaire files.

### Configuration (`src/config/categories.js`)

Defines the two-level menu structure (category → questionnaire) and provides `getQuestionsModule()` for lazy dynamic imports.

### Supabase Integration

- Client initialized in `src/supabaseClient.js` with embedded public anon key (safe; Supabase RLS enforces access control)
- `ocupaciones` table: occupation lookup with `search_ocupaciones_v2(q, limit_count)` RPC
- `casos` table: auto-saves assessment data at specific question checkpoints (`RX_CHECKPOINT_IDS` in App.jsx)
- `OccupationSelect.jsx`: autocomplete component wrapping the occupation RPC

### Components

- `MultiSelect.jsx` — handles exclusive vs. non-exclusive multi-select logic
- `QuestionGroup.jsx` — renders question arrays with conditional visibility
- `OccupationSelect.jsx` — Supabase-backed occupation autocomplete

## Styling

Tailwind CSS v4 (JIT via `@tailwindcss/vite` plugin). Primary color: `#002a6c`. `src/App.css` contains legacy styles gradually being migrated to Tailwind classes.

## Adding a New Questionnaire

1. Create `src/questionnaires/newNameQuestions.js` — export `questions`, `allQuestions`, `generateClinicalReport()`
2. Register it in `src/config/categories.js` under the appropriate category with a `getQuestionsModule()` entry

## Known Pending Work (from branch `expansion_diagnosticos`)

- Add control/scheduling messages for diagnostic results in MetaTarso and Ortejos questionnaires
- Separate ISH (insurance/clinical) fields in reports
