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

### App Flow (3 steps)

`App.jsx` (~2000 LOC) drives everything. The UI moves through three `step` values:

1. **`"selection"`** — user picks a category then questionnaire from `src/config/categories.js`
2. **`"questionnaire"`** — two tabs:
   - **`"anamnesis"`** tab: renders all questions with `group: "anamnesis"` via `QuestionGroup.jsx`
   - **`"evaluation"`** tab: walks `group: "risk"` questions one-at-a-time (`currentRiskQuestionId` tracks position); triggers auto-save to Supabase at `RX_CHECKPOINT_IDS`
3. **`"result"`** — calls `questionnaireModule.evaluateRisk(answers)` → `finalResult` with `{ protocolId, text, color }`; then `resolveProtocol()` maps `protocolId` to a protocol object `{ titulo, pasos[] }`; then `generateClinicalReport()` renders the final text

### Questionnaire Modules (`src/questionnaires/`)

Each module exports a standard interface:

| Export | Purpose |
|---|---|
| `questions` | Array of all question objects (both groups) |
| `evaluateRisk(answers)` | Returns `{ protocolId, text, color, ... }` |
| `generateClinicalReport({ caseId, answers, resultQuestion, stepsOverride })` | Returns report string |
| `protocols` | Static map of `protocolId → { titulo, pasos[] }` |
| `getProtocoloXxx(answers)` | Dynamic protocol generators (answers-dependent) |
| `restTextPorCarga?(answers, protocolId)` | Optional: dynamic rest text by workload |

Shared imports: `commonAnamnesis.js` (anamnesis questions reused across lumbago questionnaires) and `commonDemographics.js`.

### Question Object Schema

```js
{
  id: "field_name",       // answer key in the answers object
  text: "Label",          // static label, OR
  textFn: (ans) => "",    // dynamic label based on prior answers
  type: "options" | "button-group" | "slider" | "textarea" | "multi" | "date",
  group: "anamnesis" | "risk",
  options: [{ value, label, labelBold?, labelDesc? }],  // for options/button-group/multi
  showIf: (ans) => bool,  // optional: hides question when false
  min, max,               // for slider
}
```

### Protocol Resolution

`resolveProtocol(protocolId, questionnaireModule, answers)` in `App.jsx` dispatches by `protocolId` string — calling the named dynamic getter (e.g. `getProtocoloEsguince1`) if present, otherwise falling back to `questionnaireModule.protocols[protocolId]`. When adding a new dynamic protocol, register it in `resolveProtocol`.

### Configuration (`src/config/categories.js`)

Two-level menu: `categoriesConfig[categoryKey].questionnaires[questionnaireKey]`. Each questionnaire entry has `name` and `getQuestionsModule()` (a dynamic `import()` thunk for code-splitting).

Helper predicates in `App.jsx`:
- `esTobilloPie(category)` — true for the `tobillo_pie` category
- `esTobilloMecanismo(questionnaireKey)` — true only for `torsion_tobillo`
- `esMetaTarso(questionnaireKey)` — true only for `metaTarso`

### Supabase Integration

- Client: `src/supabaseClient.js` (embedded public anon key; RLS enforces access)
- `casos` table: auto-saved at `RX_CHECKPOINT_IDS` questions (X-ray decision points) and on questionnaire completion
- `ocupaciones` table: powers `OccupationSelect.jsx` autocomplete via `search_ocupaciones_v2(q, limit_count)` RPC

### Components

- `MultiSelect.jsx` — exclusive vs. non-exclusive multi-select logic
- `QuestionGroup.jsx` — renders a question array with conditional visibility (`showIf`)
- `OccupationSelect.jsx` — Supabase-backed occupation autocomplete (currently commented out in App.jsx)
- `SelectableSteps` (inline in App.jsx) — lets clinicians deselect protocol steps before generating the report
- `ImageModal` (inline in App.jsx) — full-screen image viewer for clinical guides

## Styling

Tailwind CSS v4 (JIT via `@tailwindcss/vite` plugin). Primary color: `#002a6c`. `src/App.css` contains legacy styles gradually being migrated to Tailwind classes.

## Adding a New Questionnaire

1. Create `src/questionnaires/newNameQuestions.js` — export `questions`, `evaluateRisk()`, `generateClinicalReport()`, `protocols`, and any dynamic protocol getters
2. Register it in `src/config/categories.js` under the appropriate category
3. If the questionnaire uses dynamic protocols, add dispatch cases to `resolveProtocol()` in `App.jsx`
4. If it needs category-specific UI behavior (tabs, transport text, etc.), add a predicate helper alongside `esTobilloPie`/`esTobilloMecanismo` and wire it into the relevant render branches

## Known Pending Work

- Add control/scheduling messages for diagnostic results in MetaTarso and Ortejos questionnaires
- Separate ISH (insurance/clinical) fields in reports
