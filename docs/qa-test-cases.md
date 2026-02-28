# QA Test Cases

## Prerequisites
- Install dependencies: `npm install`
- Run QA gates:
  - `npm run qa:lint`
  - `npm run qa:build`
- Optional smoke:
  - `npm run qa:smoke`

## Core Flow Scenarios

### 1. Mitarbeiter - Add Employee (in-memory)
1. Go to `/mitarbeiter`.
2. Click `Mitarbeiter hinzufuegen`.
3. Submit with missing required fields.
Expected:
- Form does not submit.
- Browser validation blocks submission.
4. Fill valid values and submit.
Expected:
- New employee row appears at top.
- Employee count in header/tabs updates.
5. Open `Details` and `Bearbeiten` for the new row.
Expected:
- Routes open without crash.
6. Refresh page.
Expected:
- New employee disappears (documented in-memory behavior).

### 2. Caller - Add/Search/Persistence
1. Go to `/caller`.
2. Click `Caller hinzufuegen`.
3. Submit invalid/empty required fields.
Expected:
- Submission blocked by validation.
4. Submit valid caller.
Expected:
- Caller count increments.
- New row appears in caller table.
5. Search by caller name and email.
Expected:
- Filtered results shown correctly.
6. Refresh page.
Expected:
- Caller remains (localStorage persistence).

### 3. Telefonnummern - Three Add Flows + Card Actions
1. Go to `/telefonnummern`.
2. Open `+ de Anosim` modal and submit valid data.
3. Open `+ ru SMSPVA` modal and submit valid data.
4. Open `Manual URL` modal with invalid URL.
Expected:
- Submit blocked (URL parsing/validation).
5. Submit valid URL.
Expected:
- New card added.
6. On any card:
  - Click `Zuweisen` (toggle assignment)
  - Click `Verlaengern` (expiry update)
  - Click `Loeschen` (card removed)
Expected:
- Card state changes immediately and correctly.
7. Refresh page.
Expected:
- Remaining changes persist (localStorage).

### 4. Bankdrops - Add/Tab/Search/Status
1. Go to `/bankdrops`.
2. Verify tabs:
  - `Offene Anfragen`
  - `Fertige Bankdrops`
3. Create one `open` and one `done` bankdrop via modal.
Expected:
- Items appear in corresponding tabs.
4. Search by title, employee, and code.
Expected:
- Filtering works in active tab.
5. Move status:
  - `Als fertig markieren` from open
  - `Wieder oeffnen` from done
Expected:
- Item moves between tabs.
6. Refresh page.
Expected:
- Data persists (localStorage).

## Secondary Route Sanity Scenarios

For each route below, open and verify no runtime crash and expected shell renders:
- `/bewerbungen`
- `/bewerbungen/details`
- `/kyc-pruefung`
- `/aufgaben-pruefung`
- `/ident-anfragen`
- `/bewertungen`
- `/auftraege`
- `/auftraege/neu`
- `/auftraege/bosch`
- `/stellenanzeigen`
- `/stellenanzeigen/neu`
- `/ai-chat-agent`
- `/chat-ueberwachung`
- `/email-verlauf`
- `/email-anbieter`
- `/einstellungen`

Expected:
- Route renders.
- Static/mock actions remain non-persistent by design unless explicitly implemented.

## Acceptance Checklist
- [ ] `npm run qa:lint` passes.
- [ ] `npm run qa:build` passes.
- [ ] Core flow scenarios 1-4 pass.
- [ ] Secondary route sanity pass complete.
- [ ] Known limitations acknowledged in `qa-feature-matrix.md`.
