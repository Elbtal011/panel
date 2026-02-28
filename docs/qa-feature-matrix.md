# QA Feature Matrix

## Working Definition
- Open UI action (button/modal/tab) works.
- Validation prevents invalid submit.
- Valid submit mutates expected state.
- Data appears in list/detail views.
- Search/filter/status actions reflect state correctly.
- Persistence behavior matches intended model.
- `npm run qa:lint` and `npm run qa:build` pass.

## Route Coverage Matrix

| Route | Page | Status | Storage Model | Notes |
|---|---|---|---|---|
| `/` | Dashboard | Static display only | none | Informational dashboard cards/panels. |
| `/bewerbungen` | Bewerbungen | Static display only | none | Table/actions are UI-only placeholders. |
| `/bewerbungen/details` | Bewerbung Details | Static display only | none | Detail view is mock/static. |
| `/mitarbeiter` | Mitarbeiter | **Partially functional** | in-memory only | Add employee works and updates list/count; resets after refresh. |
| `/mitarbeiter/:id` | Mitarbeiter Details | Partially functional | in-memory only | New employee detail/edit route works while session state exists. |
| `/mitarbeiter/:id/bearbeiten` | Mitarbeiter Edit | Static display only | none | Form is UI-only; no save persistence yet. |
| `/kyc-pruefung` | KYC Pruefung | Partially functional | none | Tabs/loading/modal interactions work; no backend data mutation. |
| `/aufgaben-pruefung` | Aufgaben Pruefung | Static display only | none | Empty/list shell with mock controls. |
| `/ident-anfragen` | Ident Anfragen | Static display only | none | Empty/list shell with mock controls. |
| `/bewertungen` | Bewertungen | Static display only | none | Empty/list shell with mock controls. |
| `/auftraege` | Aufgabenvorlagen | Static display only | none | List/detail are predefined template data. |
| `/auftraege/neu` | Neue Aufgabenvorlage | Static display only | none | Form is UI-only; no save. |
| `/auftraege/:templateId` | Aufgabenvorlage Details | Static display only | none | Detail from in-file seed data. |
| `/stellenanzeigen` | Stellenanzeigen | Static display only | none | List/filter/actions are UI-only placeholders. |
| `/stellenanzeigen/neu` | Neue Stellenanzeige | Static display only | none | Form is UI-only; no save. |
| `/caller` | Caller Verwaltung | **Fully functional (local)** | localStorage (`crm_callers`) | Create/search/list + persistence. |
| `/telefonnummern` | Telefonnummern | **Fully functional (local)** | localStorage (`crm_phone_numbers`) | 3 add modals + assign/extend/delete + persistence. |
| `/bankdrops` | Bankdrops | **Fully functional (local)** | localStorage (`crm_bankdrops`) | Create/search/tab filter/status transitions + persistence. |
| `/ai-chat-agent` | AI Chat Agent | Placeholder | none | PlaceholderPage. |
| `/chat-ueberwachung` | Chat Ueberwachung | Placeholder | none | PlaceholderPage. |
| `/email-verlauf` | E-Mail Verlauf | Placeholder | none | PlaceholderPage. |
| `/email-anbieter` | E-Mail Anbieter | Placeholder | none | PlaceholderPage. |
| `/einstellungen` | Einstellungen | Placeholder | none | PlaceholderPage. |

## Core Flow Readiness

| Flow | Status | Validation | Mutation | Persistence | Notes |
|---|---|---|---|---|---|
| Mitarbeiter: add employee | Pass (session) | Pass | Pass | Deferred | In-memory only by design for now. |
| Caller: add + search + list | Pass | Pass | Pass | Pass | localStorage-backed. |
| Telefonnummern: add + card actions | Pass | Pass | Pass | Pass | URL validation present for Manual URL. |
| Bankdrops: add + tabs + search + move status | Pass | Pass | Pass | Pass | localStorage-backed. |

## Known Limitations
- No server-side persistence yet (Postgres deferred).
- Mitarbeiter module is session/in-memory only.
- Multiple pages are intentionally static/mock or placeholder.
- No auth/role backend enforcement.

## Readiness Verdict
- **Amber**

Reason:
- Core admin flows targeted in this phase are functional and stable with local persistence where intended.
- Product-wide readiness is not Green yet due to static/placeholder pages and deferred backend integration.
