import { useEffect, useState } from 'react'
import { NavLink, Route, Routes, useParams } from 'react-router-dom'
import './App.css'

const dashboardStats = [
  {
    title: 'Bewerbungen',
    value: '1',
    subtitle: 'Gesamt eingegangen',
    tone: 'blue',
    icon: 'applications',
  },
  {
    title: 'Mitarbeiter',
    value: '3',
    subtitle: 'Aktive Mitarbeiter',
    tone: 'indigo',
    icon: 'users',
  },
  {
    title: 'Video-Anfragen',
    value: '0',
    subtitle: 'Unbearbeitet',
    tone: 'purple',
    icon: 'video',
  },
  {
    title: 'Aktive Auftraege',
    value: '0',
    subtitle: 'In Bearbeitung',
    tone: 'green',
    icon: 'orders',
  },
  {
    title: 'KYC-Pruefungen',
    value: '3',
    subtitle: 'Ausstehend',
    tone: 'orange',
    icon: 'shield',
  },
]

const applicationStats = [
  { title: 'Gesamt', value: '1' },
  { title: 'Ausstehend', value: '1' },
  { title: 'Eingestellt', value: '0' },
  { title: 'Abgelehnt', value: '0' },
]

const initialEmployees = [
  {
    id: 'admin',
    name: 'admin',
    email: 'admin@admin.to',
    role: 'Administrator',
    status: 'Aktiv',
    phone: 'Nicht angegeben',
    registeredAt: '20.7.2025',
    nationality: 'DE',
  },
  {
    id: 'test-babos',
    name: 'Test Babos',
    email: 'test@babo.de',
    role: 'Mitarbeiter',
    status: 'Aktiv',
    phone: 'Nicht angegeben',
    registeredAt: '12.1.2026',
    nationality: 'DE',
  },
  {
    id: 'hanna-schweden',
    name: 'Hanna Schweden',
    email: 'hannaschweden@gmail.de',
    role: 'Mitarbeiter',
    status: 'Aktiv',
    phone: 'Nicht angegeben',
    registeredAt: '03.2.2026',
    nationality: 'DE',
  },
  {
    id: 'jan-orambek',
    name: 'jan orambek',
    email: 'orambek@proton.me',
    role: 'Mitarbeiter',
    status: 'Aktiv',
    phone: 'Nicht angegeben',
    registeredAt: '18.2.2026',
    nationality: 'DE',
  },
]
const kycRequests = [
  {
    id: 'jan-orambek',
    name: 'jan orambek',
    email: 'orambek@proton.me',
    status: 'Ausstehend',
    verified: 'Ausstehend',
    updatedAt: '28.02.2026, 07:38',
  },
  {
    id: 'hanna-schweden',
    name: 'Hanna Schweden',
    email: 'hannaschwende@gmail.de',
    status: 'Ausstehend',
    verified: 'Ausstehend',
    updatedAt: '28.02.2026, 07:33',
  },
  {
    id: 'test-babos',
    name: 'Test Babos',
    email: 'test@babo.de',
    status: 'Ausstehend',
    verified: 'Ausstehend',
    updatedAt: '25.02.2026, 08:40',
  },
]

const taskTemplates = [
  {
    id: 'bosch',
    title: 'Bewertung der Webseite - Bosch',
    level: 'Mittel',
    tag: 'platzhalter',
    hours: '1 Stunde',
    updated: '23.05.2025',
    createdAt: '21.05.2025',
    assignment: 'Starter-Job (automatisch)',
    description:
      'Hier bewertest du die Webseite von Bosch. Achte auf das Design, ob du dich gut zurechtfindest und ob alles sinnvoll aufgebaut ist. Deine Meinung hilft dabei, die Seite fuer andere Nutzer zu verbessern.',
    stepTitle: 'Bewertung der Webseite - Bosch',
    stepText:
      'Besuche die Webseite: https://www.bosch.de/ Sobald du auf der Seite bist, kannst du direkt auf "Weiter" klicken. Der Bewertungsbogen erscheint automatisch. Fuelle ihn vollstaendig aus und klicke auf "Bewertung abschliessen".',
  },
  {
    id: 'siemens',
    title: 'Bewertung der Webseite - Siemens',
    level: 'Mittel',
    tag: 'platzhalter',
    hours: '1 Stunde',
    updated: '25.09.2025',
    createdAt: '21.05.2025',
    assignment: 'Starter-Job (automatisch)',
    description:
      'In diesem Auftrag bewertest du die Webseite von Siemens. Achte auf Design, Uebersichtlichkeit und Benutzerfuehrung.',
    stepTitle: 'Bewertung der Webseite - Siemens',
    stepText: 'Bewerte den Gesamteindruck und schliesse den Bewertungsbogen vollstaendig ab.',
  },
  {
    id: 'basf',
    title: 'Bewertung der Webseite - BASF',
    level: 'Mittel',
    tag: 'platzhalter',
    hours: '2 Stunden',
    updated: '23.05.2025',
    createdAt: '21.05.2025',
    assignment: 'Starter-Job (automatisch)',
    description:
      'In diesem Auftrag gibst du Feedback zur Webseite von BASF. Deine Einschaetzung hilft, Webseiten besser zu machen.',
    stepTitle: 'Bewertung der Webseite - BASF',
    stepText: 'Fuehre die Bewertung Schritt fuer Schritt durch und schliesse den Auftrag ab.',
  },
  {
    id: 'deutsche-bank-mobile',
    title: 'Mobile Bewertung & Ablauf-Test - Deutsche Bank',
    level: 'Manuell',
    tag: 'bankdrop',
    hours: '5 Stunden',
    updated: '04.09.2025',
    createdAt: '21.05.2025',
    assignment: 'Manuell',
    description:
      'In diesem Auftrag analysierst du die mobile Webseite und testest den digitalen Ablauf mit bereitgestellten Demo-Daten.',
    stepTitle: 'Mobile Bewertung & Ablauf-Test',
    stepText: 'Teste den Ablauf wie vorgegeben und dokumentiere moegliche Probleme.',
  },
  {
    id: 'crypto',
    title: 'Bewertung der Webseite - crypto.com',
    level: 'Manuell',
    tag: 'exchanger',
    hours: '1 Stunde',
    updated: '04.09.2025',
    createdAt: '21.05.2025',
    assignment: 'Manuell',
    description:
      'Du gibst Feedback zu Design, Uebersichtlichkeit und Gesamteindruck. Danach pruefst du einen Demo-Ident Prozess.',
    stepTitle: 'Bewertung der Webseite - crypto.com',
    stepText: 'Fuehre den Testprozess mit den Demo-Daten vollstaendig durch.',
  },
  {
    id: 'consors',
    title: 'Visuelle Bewertung & Ablauf-Check - Consors',
    level: 'Manuell',
    tag: 'bankdrop',
    hours: '5 Stunden',
    updated: '04.09.2025',
    createdAt: '21.05.2025',
    assignment: 'Manuell',
    description:
      'Bewerte die Webseite und teste den digitalen Identifikationsablauf fuer eine grosse deutsche Onlinebank.',
    stepTitle: 'Visuelle Bewertung & Ablauf-Check',
    stepText: 'Pruefe den Ablauf ohne Verpflichtung, aber vollstaendig fuer den Abschluss.',
  },
  {
    id: 'comdirect',
    title: 'Bewertung der Webseite - comdirect',
    level: 'Manuell',
    tag: 'bankdrop',
    hours: '5 Stunden',
    updated: '04.09.2025',
    createdAt: '21.05.2025',
    assignment: 'Manuell',
    description:
      'Du gibst Feedback zur Webseite und pruefst zusaetzlich einen Videochat/Ident Prozess mit Demo-Daten.',
    stepTitle: 'Bewertung der Webseite - comdirect',
    stepText: 'Bewertung und Prozesspruefung vollstaendig abschliessen.',
  },
]
function StatIcon({ name }) {
  switch (name) {
    case 'applications':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      )
    case 'users':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="9" cy="8" r="3" />
          <circle cx="16" cy="9" r="2.5" />
          <path d="M4 19c0-3 3-5 5-5s5 2 5 5" />
          <path d="M13 19c0-2.4 2.4-4 4.5-4S22 16.6 22 19" />
        </svg>
      )
    case 'video':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="6" width="12" height="12" rx="2" />
          <path d="M15 10l6-3v10l-6-3" />
        </svg>
      )
    case 'orders':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16v12H4z" />
          <path d="M4 7l4-4h8l4 4" />
        </svg>
      )
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l7 3v6c0 5-3 7-7 9-4-2-7-4-7-9V6l7-3z" />
          <path d="M8 12l3 3 5-5" />
        </svg>
      )
    default:
      return null
  }
}

function EmptyStateIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M9 12h6" />
    </svg>
  )
}

function ToolbarIcon({ name }) {
  switch (name) {
    case 'bell':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 16h12l-1.5-2.5V9a4.5 4.5 0 10-9 0v4.5L6 16z" />
          <path d="M9.5 18a2.5 2.5 0 005 0" />
        </svg>
      )
    case 'help':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9.5a2.5 2.5 0 015 0c0 2-2.5 2-2.5 4" />
          <path d="M12 17h0" />
        </svg>
      )
    case 'theme':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 12.8A8 8 0 1111.2 3a6 6 0 109.8 9.8z" />
        </svg>
      )
    case 'settings':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <path d="M4 12h2m12 0h2M12 4v2m0 12v2M6.5 6.5l1.4 1.4m8.2 8.2 1.4 1.4M6.5 17.5l1.4-1.4m8.2-8.2 1.4-1.4" />
        </svg>
      )
    default:
      return null
  }
}

function DashboardPage() {
  return (
    <div className="page page--dashboard">
      <section className="page-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Willkommen zurueck, admin. Hier ist ein Ueberblick ueber Ihr Unternehmen.</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn--ghost dashboard-meta-btn">
            <span aria-hidden="true">□</span>
            Samstag, 28. Februar 2026
          </button>
          <button className="btn btn--ghost dashboard-meta-btn">
            <span aria-hidden="true">↻</span>
            Aktualisieren
          </button>
        </div>
      </section>

      <section className="stats-grid">
        {dashboardStats.map((item) => (
          <div key={item.title} className={`stat-card stat-card--${item.tone}`}>
            <div>
              <p className="stat-card__title">{item.title}</p>
              <p className="stat-card__value">{item.value}</p>
              <p className="stat-card__subtitle">{item.subtitle}</p>
            </div>
            <div className="stat-card__icon">
              <StatIcon name={item.icon} />
            </div>
          </div>
        ))}
      </section>

      <section className="status-banner">
        <div>
          <strong>Starter-Aufgaben Status</strong>
          <p>Alle Mitarbeiter haben ihre Starter-Aufgaben abgeschlossen</p>
        </div>
        <button className="btn btn--ghost">Details anzeigen →</button>
      </section>

      <section className="grid-2">
        <div className="panel">
          <div className="panel__header">
            <h3><span className="panel__title-icon" aria-hidden="true">⌁</span>Aktivitaeten</h3>
          </div>
          <div className="panel__empty">
            <div className="panel__empty-icon">
              <EmptyStateIcon />
            </div>
            <p>Keine aktuellen Aktivitaeten</p>
          </div>
          <div className="panel__footer-actions">
            <button className="btn btn--ghost">Alle Pruefungen ↗</button>
          </div>
        </div>

        <div className="panel">
          <div className="panel__header">
            <h3><span className="panel__title-icon" aria-hidden="true">◉</span>Neueste Bewerbungen</h3>
            <span className="badge badge--warning">Ausstehend • 25.01.2026</span>
          </div>
          <div className="applications">
            <div className="applications__row">
              <div className="avatar avatar--soft">MM</div>
              <div className="applications__info">
                <div className="panel__title">Max Mustermann</div>
                <div className="panel__subtitle">azwugfujaksefg723g@proton.me</div>
              </div>
              <NavLink className="btn btn--ghost" to="/bewerbungen/details">
                Alle Bewerbungen ↗
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <section className="panel panel--wide">
        <div className="panel__header">
          <h3><span className="panel__title-icon panel__title-icon--pink" aria-hidden="true">◌</span>Sub-Admin Verwaltung</h3>
          <button className="btn btn--dark">Sub-Admins verwalten</button>
        </div>
        <p>Erstellen und verwalten Sie Sub-Admins mit eingeschraenkten Berechtigungen.</p>
      </section>

      <section className="panel panel--wide">
        <div className="panel__header">
          <h3><span className="panel__title-icon panel__title-icon--amber" aria-hidden="true">◍</span>Caller Leaderboard <span className="muted">(Monat)</span></h3>
          <button className="btn btn--ghost">Alle anzeigen ↗</button>
        </div>
        <div className="panel__empty">
          <div className="panel__empty-icon">
            <EmptyStateIcon />
          </div>
          <p>Keine Caller-Aktivitaet vorhanden</p>
          <span className="muted">Statistiken werden angezeigt, sobald Caller Bewerbungen bearbeiten</span>
        </div>
      </section>
    </div>
  )
}

function BewerbungenPage() {
  return (
    <div className="page page--applications">
      <section className="page-header page-header--wide">
        <div>
          <h1>Bewerbungen</h1>
          <p>Verwalten Sie eingegangene Bewerbungen und Einstellungsprozesse.</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn--ghost">CSV Export</button>
          <button className="btn">Aktualisieren</button>
        </div>
      </section>

      <section className="panel panel--wide">
        <div className="panel__header">
          <h3>Bewerbungsuebersicht</h3>
        </div>
        <div className="applications-stats">
          {applicationStats.map((item) => (
            <div key={item.title} className="applications-stat">
              <p className="applications-stat__label">{item.title}</p>
              <p className="applications-stat__value">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel panel--wide">
        <div className="panel__header">
          <h3>Bewerbungen verwalten</h3>
        </div>
        <div className="applications-filter">
          <div className="search search--compact">
            <input type="text" placeholder="Nach Name, E-Mail oder Telefon suchen..." />
          </div>
          <select className="select">
            <option>Alle Status</option>
            <option>Ausstehend</option>
            <option>Eingestellt</option>
            <option>Abgelehnt</option>
          </select>
        </div>
        <div className="table">
          <div className="table__header">
            <span>Bewerber</span>
            <span>Kontakt</span>
            <span>Status</span>
            <span>Eingegangen</span>
            <span>Aktionen</span>
          </div>
          <div className="table__row">
            <div>
              <div className="table__title">Max Mustermann</div>
              <div className="table__subtitle">bullenland</div>
            </div>
            <div className="table__contact">
              <span>azwugfujaksefg723g@proton.me</span>
              <span>+4917583745</span>
            </div>
            <div>
              <span className="status-pill">Ausstehend</span>
            </div>
            <div>25.01.2026, 01:01</div>
            <div className="table__actions">
              <button className="btn btn--ghost">✓</button>
              <button className="btn btn--ghost">✕</button>
              <NavLink className="btn btn--ghost" to="/bewerbungen/details">Details</NavLink>
              <button className="btn btn--ghost">Loeschen</button>
            </div>
          </div>
        </div>
        <div className="table__footer">
          <span>1–1 von 1</span>
          <select className="select select--small">
            <option>50 pro Seite</option>
          </select>
          <div className="pagination">
            <button className="btn btn--ghost">‹</button>
            <span>Seite 1 / 1</span>
            <button className="btn btn--ghost">›</button>
          </div>
        </div>
      </section>
    </div>
  )
}

function KycPruefungPage() {
  const [requests] = useState(kycRequests)
  const [activeTab, setActiveTab] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState(null)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [activeTab])
  const tabs = [
    { id: 'all', label: 'Alle' },
    { id: 'Ausstehend', label: 'Ausstehend' },
    { id: 'In Pruefung', label: 'In Pruefung' },
    { id: 'Genehmigt', label: 'Genehmigt' },
    { id: 'Abgelehnt', label: 'Abgelehnt' },
  ]
  const filteredRequests = activeTab === 'all'
    ? requests
    : requests.filter((item) => item.status === activeTab)
  function countForTab(tabId) {
    if (tabId === 'all') return requests.length
    return requests.filter((item) => item.status === tabId).length
  }
  return (
    <div className="page page--kyc">
      <section className="page-header page-header--wide kyc-header">
        <div>
          <h1>KYC-Pruefung</h1>
          <p>Ueberpruefen und genehmigen Sie eingereichte KYC-Dokumente</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn--ghost">Aktualisieren</button>
        </div>
      </section>
      <section className="panel panel--wide kyc-panel">
        <div className="kyc-tabs" role="tablist" aria-label="KYC Filter">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                className={`kyc-tab ${isActive ? 'kyc-tab--active' : ''}`}
                type="button"
                onClick={() => {
                  if (tab.id !== activeTab) {
                    setIsLoading(true)
                  }
                  setActiveTab(tab.id)
                }}
              >
                {tab.label}
                <span className="kyc-tab__count">{countForTab(tab.id)}</span>
              </button>
            )
          })}
        </div>
        {isLoading ? (
          <div className="kyc-loading" aria-live="polite">
            <span className="kyc-spinner" aria-hidden="true" />
          </div>
        ) : (
          <div className="kyc-list">
            {filteredRequests.map((item) => (
              <article key={item.id} className="kyc-item">
                <div className="kyc-item__left">
                  <div className="avatar avatar--soft kyc-item__avatar">{item.name.charAt(0).toUpperCase()}</div>
                  <div>
                    <div className="table__title">{item.name}</div>
                    <div className="table__subtitle">{item.email}</div>
                    <div className="kyc-item__meta">
                      <span>Verifiziert: {item.verified}</span>
                      <span>•</span>
                      <span>Aktualisiert: {item.updatedAt}</span>
                    </div>
                  </div>
                  <span className="status-pill kyc-item__status">{item.status}</span>
                </div>
                <div className="kyc-item__actions">
                  <button className="btn btn--ghost btn--tiny" onClick={() => setSelectedRequest(item)}>KYC pruefen</button>
                  <button className="btn btn--tiny btn--soft-warning">E-Mail</button>
                  <button className="btn btn--tiny btn--soft-warning">SMS</button>
                  <button className="btn btn--tiny btn--soft-warning">Beides</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      {selectedRequest ? (
        <div className="modal-backdrop" onClick={() => setSelectedRequest(null)}>
          <section className="modal kyc-review-modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal__header">
              <h3>KYC-Dokumente prüfen</h3>
              <button className="kyc-review-close" onClick={() => setSelectedRequest(null)} aria-label="Schließen">×</button>
            </div>
            <div className="modal__body">
              <div className="kyc-review-user">
                <div className="avatar avatar--soft kyc-review-user__avatar" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="3.2" />
                    <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
                  </svg>
                </div>
                <div>
                  <div className="table__title">{selectedRequest.name}</div>
                  <div className="table__subtitle">{selectedRequest.email}</div>
                  <div className="kyc-review-user__status">
                    <span className="kyc-review-user__warn" aria-hidden="true">!</span>
                    <span className="status-pill">{selectedRequest.status}</span>
                  </div>
                </div>
              </div>
              <div className="kyc-review-sep" />

              <div className="kyc-review-title">
                <span className="kyc-review-title__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
                    <path d="M14 3v5h5" />
                    <path d="M9 12h6M9 16h6M9 8h2" />
                  </svg>
                </span>
                <span>Hochgeladene Dokumente</span>
              </div>

              <div className="kyc-review-empty">
                <span className="kyc-review-empty__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
                    <path d="M14 3v5h5" />
                    <path d="M9 12h6M9 16h6M9 8h2" />
                  </svg>
                </span>
                <p>Keine Dokumente hochgeladen</p>
              </div>

              <div className="kyc-review-sep" />

              <div className="modal__actions kyc-review-actions">
                <button className="btn btn--ghost" onClick={() => setSelectedRequest(null)}>Schließen</button>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  )
}
function AufgabenPruefungPage() {
  const [range, setRange] = useState('Alle')
  const ranges = ['Alle', 'Heute', 'Woche', 'Monat']

  return (
    <div className="page page--task-review">
      <section className="page-header page-header--wide">
        <div>
          <h1>Aufgaben-Pruefung</h1>
          <p>Pruefen und genehmigen Sie eingereichte Aufgaben von Mitarbeitern</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn--ghost">Aktualisieren</button>
        </div>
      </section>

      <section className="panel panel--wide">
        <div className="review-toolbar">
          <div className="search review-toolbar__search">
            <input type="text" placeholder="Suchen nach Mitarbeiter, Aufgabe oder ID..." />
          </div>
          <div className="review-range">
            {ranges.map((item) => (
              <button
                key={item}
                type="button"
                className={`review-range__btn ${range === item ? 'review-range__btn--active' : ''}`}
                onClick={() => setRange(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <button className="btn btn--ghost review-toolbar__count">0 Eingereicht</button>
        </div>
      </section>

      <section className="panel panel--wide review-empty-panel">
        <div className="review-empty">
          <h3>Keine eingereichten Aufgaben</h3>
          <p>Derzeit sind keine Aufgaben zur Pruefung eingereicht.</p>
        </div>
      </section>
    </div>
  )
}

function IdentAnfragenPage() {
  return (
    <div className="page page--ident-requests">
      <section className="page-header page-header--wide">
        <div>
          <h1>Ident-Anfragen</h1>
          <p>Verwalte Ident-Anfragen und fuege Test-Daten oder PostIdent-Coupons hinzu</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn--ghost">Aktualisieren</button>
        </div>
      </section>

      <section className="panel panel--wide">
        <div className="review-toolbar">
          <div className="search review-toolbar__search">
            <input type="text" placeholder="Nach Name oder Aufgabe suchen..." />
          </div>
          <label className="ident-filter">
            <span>Filter:</span>
            <select className="select">
              <option>Alle Anfragen</option>
            </select>
          </label>
        </div>
      </section>

      <section className="panel panel--wide review-empty-panel">
        <div className="review-empty">
          <h3>Keine Einreichungen gefunden</h3>
          <p>Es gibt aktuell keine Ident-Anfragen mit dem ausgewaehlten Filter.</p>
        </div>
      </section>
    </div>
  )
}

function ReviewsStatIcon({ name }) {
  if (name === 'star') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 16l-4.9 2.5.9-5.5-4-3.9 5.5-.8L12 3z" />
      </svg>
    )
  }
  if (name === 'bars') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 19V9M10 19V5M15 19v-7M20 19V3" />
      </svg>
    )
  }
  if (name === 'trend') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 16l6-6 4 4 6-6" />
        <path d="M15 8h5v5" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

function BewertungenPage() {
  const stats = [
    { label: 'Gesamt Bewertungen', value: '0', icon: 'star' },
    { label: 'Erste Bewertungen', value: '0', icon: 'bars' },
    { label: 'Video-Chat Bewertungen', value: '0', icon: 'trend' },
    { label: 'Letzte 7 Tage', value: '0', icon: 'clock' },
  ]

  return (
    <div className="page page--reviews">
      <section className="page-header page-header--wide">
        <div>
          <h1>Aufgaben-Bewertungen</h1>
          <p>Uebersicht aller eingereichten Bewertungen von Mitarbeitern</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn--dark">Aktualisieren</button>
        </div>
      </section>

      <section className="reviews-stats">
        {stats.map((item) => (
          <article key={item.label} className="reviews-stat">
            <span className="reviews-stat__icon" aria-hidden="true">
              <ReviewsStatIcon name={item.icon} />
            </span>
            <div>
              <p className="reviews-stat__label">{item.label}</p>
              <p className="reviews-stat__value">{item.value}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="panel panel--wide">
        <div className="review-toolbar">
          <div className="search review-toolbar__search">
            <input type="text" placeholder="Nach Mitarbeiter oder Aufgabe suchen..." />
          </div>
          <select className="select"><option>Alle Bewertungen</option></select>
          <select className="select"><option>Alle Zeiten</option></select>
          <select className="select"><option>Alle Status</option></select>
        </div>
      </section>

      <section className="panel panel--wide review-list-panel">
        <div className="panel__header review-list-panel__header">
          <h3>Bewertungen (0)</h3>
        </div>
        <div className="review-empty">
          <h3>Keine Bewertungen gefunden</h3>
          <p>Es wurden noch keine Bewertungen eingereicht.</p>
        </div>
      </section>
    </div>
  )
}

function AufgabenvorlagenPage() {
  return (
    <div className="page page--task-templates">
      <section className="page-header page-header--wide">
        <div>
          <h1>Aufgabenvorlagen</h1>
          <p>Erstellen und verwalten Sie Vorlagen fuer wiederkehrende Aufgabentypen</p>
        </div>
        <div className="page-header__actions">
          <NavLink className="btn btn--dark" to="/auftraege/neu">+ Neue Vorlage</NavLink>
        </div>
      </section>

      <section className="panel panel--wide">
        <div className="template-list">
          {taskTemplates.map((item) => (
            <article key={item.id} className="template-item">
              <div className="template-item__main">
                <div className="template-item__title-row">
                  <h3>{item.title}</h3>
                  <span className="template-pill template-pill--level">{item.level}</span>
                  <span className="template-pill">{item.tag}</span>
                </div>
                <p>
                  In diesem Auftrag bewertest du die Webseite und gibst Feedback zu Design, Uebersichtlichkeit und Nutzerfuehrung.
                  Fuer diesen Auftrag bekommst du {item.hours} Arbeitszeit gutgeschrieben.
                </p>
                <div className="template-item__meta">
                  <span>{item.hours}</span>
                  <span>Aktualisiert: {item.updated}</span>
                </div>
              </div>
              <div className="template-item__actions">
                <NavLink className="btn btn--ghost btn--tiny" to={`/auftraege/${item.id}`}>Ansehen</NavLink>
                <button className="btn btn--ghost btn--tiny">Zuweisen</button>
                <button className="btn btn--ghost btn--tiny">⋮</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function AufgabenvorlageDetailsPage() {
  const { templateId } = useParams()
  const template = taskTemplates.find((item) => item.id === templateId) || taskTemplates[0]

  return (
    <div className="page page--task-template-details">
      <section className="template-details-top">
        <div className="template-details-top__title">
          <NavLink className="btn btn--ghost" to="/auftraege">Zurueck</NavLink>
          <h1>{template.title}</h1>
        </div>
        <div className="template-details-top__actions">
          <button className="btn btn--ghost">Bearbeiten</button>
          <button className="btn btn--ghost">Duplizieren</button>
          <button className="btn btn--ghost">Loeschen</button>
          <button className="btn btn--dark">Mitarbeiter zuweisen</button>
        </div>
      </section>

      <section className="template-details-grid">
        <article className="panel template-details-main">
          <div className="panel__header"><h3>Details</h3></div>
          <div className="template-details-body">
            <p className="template-details-label">Beschreibung</p>
            <p>{template.description}</p>
            <p className="template-details-note">Fuer diesen Auftrag bekommst du {template.hours} Arbeitszeit gutgeschrieben.</p>

            <h4>Arbeitsschritte:</h4>
            <p className="template-details-label">Arbeitsschritte</p>
            <div className="template-step">
              <h5>1. {template.stepTitle}</h5>
              <p>{template.stepText}</p>
            </div>
          </div>
        </article>

        <article className="panel template-details-meta">
          <div className="panel__header"><h3>Metadaten</h3></div>
          <div className="template-meta-list">
            <div><span>Typ</span><p><span className="template-pill">{template.tag}</span></p></div>
            <div><span>Prioritaet</span><p><span className="template-pill template-pill--level">{template.level}</span></p></div>
            <div><span>Zuweisung</span><p><span className="template-pill template-pill--warn">{template.assignment}</span></p></div>
            <div><span>Geschaetzte Stunden</span><p>{template.hours}</p></div>
            <div><span>Erstellt am</span><p>{template.createdAt}</p></div>
            <div><span>Zuletzt aktualisiert</span><p>{template.updated}</p></div>
          </div>
        </article>
      </section>
    </div>
  )
}

function AufgabenvorlageNeuPage() {
  return (
    <div className="page page--task-template-new">
      <section className="template-new-top">
        <NavLink className="btn btn--ghost" to="/auftraege">Zurueck</NavLink>
        <h1>Neue Aufgabenvorlage erstellen</h1>
      </section>

      <section className="panel panel--wide template-new-panel">
        <div className="template-new-steps">
          <button className="template-new-step template-new-step--active">1. Grundinformationen</button>
          <button className="template-new-step">2. Arbeitsschritte definieren</button>
          <button className="template-new-step">3. Erforderliche Anhaenge</button>
        </div>

        <div className="template-new-body">
          <div className="template-new-grid template-new-grid--single">
            <label className="field">
              <span>Titel *</span>
              <input type="text" placeholder="Titel der Aufgabenvorlage" />
            </label>
          </div>

          <div className="template-new-grid template-new-grid--single">
            <label className="field">
              <span>Beschreibung *</span>
              <textarea placeholder="Detaillierte Beschreibung der Aufgabe" />
            </label>
          </div>

          <div className="template-new-grid">
            <label className="field">
              <span>Typ *</span>
              <select><option>Bankdrop</option></select>
            </label>
            <div className="field">
              <span>Identifikationsmethode *</span>
              <label className="radio-line"><input type="radio" name="ident" defaultChecked /> VideoIdent (Video-Chat)</label>
              <label className="radio-line"><input type="radio" name="ident" /> PostIdent (Postversand)</label>
              <small>Mitarbeiter fuehren Video-Chat fuer Identifikation durch</small>
            </div>
          </div>

          <div className="template-new-grid">
            <label className="field">
              <span>Prioritaet *</span>
              <select><option>Mittel</option></select>
            </label>
            <label className="field">
              <span>Verguetungsbetrag (EUR)</span>
              <input type="text" placeholder="0.00" />
              <small>Standard-Verguetung fuer diese Aufgabe. Kann bei der Zuweisung ueberschrieben werden.</small>
            </label>
          </div>

          <div className="template-new-grid">
            <label className="field">
              <span>Geschaetzte Stunden</span>
              <input type="text" placeholder="Geschaetzte Arbeitsstunden" />
            </label>
            <div />
          </div>

          <div className="template-new-section-title">App Store URLs</div>
          <p className="template-new-section-sub">Fuegen Sie App Store URLs hinzu, die automatisch bei Task-Zuweisungen verfuegbar sind</p>

          <div className="template-new-grid">
            <label className="field">
              <span>Google Play Store URL</span>
              <input type="text" placeholder="https://play.google.com/store/apps/..." />
            </label>
            <label className="field">
              <span>Apple App Store URL</span>
              <input type="text" placeholder="https://apps.apple.com/app/..." />
            </label>
          </div>

          <div className="template-new-starter">
            <label className="template-new-switch">
              <input type="checkbox" />
              <span>Als Starter-Job fuer neue Mitarbeiter festlegen</span>
            </label>
            <small>Diese Aufgabe wird automatisch jedem neuen Mitarbeiter direkt nach der Registrierung zugewiesen.</small>
          </div>

          <div className="template-new-grid template-new-grid--single">
            <label className="field">
              <span>Reihenfolge-Nr. (fuer automatische Zuweisung)</span>
              <input type="text" placeholder="z.B. 1, 2, 3..." />
              <small>Definiert die Reihenfolge der automatischen Zuweisung. Leer lassen fuer manuelle Zuweisung.</small>
            </label>
          </div>
        </div>

        <div className="template-new-actions">
          <NavLink className="btn btn--ghost" to="/auftraege">Zurueck</NavLink>
          <button className="btn btn--dark">Weiter</button>
        </div>
      </section>
    </div>
  )
}

function StellenanzeigenPage() {
  return (
    <div className="page page--job-postings">
      <section className="page-header page-header--wide">
        <div>
          <h1>Stellenanzeigen</h1>
          <p>Verwalten Sie Ihre Stellenanzeigen fuer die Landing Pages</p>
        </div>
        <div className="page-header__actions">
          <NavLink className="btn btn--dark" to="/stellenanzeigen/neu">+ Neue Stellenanzeige</NavLink>
        </div>
      </section>

      <section className="job-stats">
        <article className="job-stat">
          <div>
            <p>Gesamt</p>
            <strong>0</strong>
          </div>
          <span className="job-stat__icon job-stat__icon--blue">▣</span>
        </article>
        <article className="job-stat">
          <div>
            <p>Aktiv</p>
            <strong>0</strong>
          </div>
          <span className="job-stat__icon job-stat__icon--green">◉</span>
        </article>
        <article className="job-stat">
          <div>
            <p>Entwurf</p>
            <strong>0</strong>
          </div>
          <span className="job-stat__icon">◌</span>
        </article>
      </section>

      <section className="panel panel--wide">
        <div className="review-toolbar">
          <div className="search review-toolbar__search">
            <input type="text" placeholder="Stellenanzeigen durchsuchen..." />
          </div>
          <select className="select"><option>Alle Status</option></select>
          <select className="select"><option>Alle Tags</option></select>
        </div>
      </section>

      <section className="panel panel--wide job-table">
        <div className="job-table__head">
          <span>Stellenanzeige</span>
          <span>Typ / Modell</span>
          <span>Verguetung</span>
          <span>Status</span>
          <span>Erstellt</span>
          <span>Aktionen</span>
        </div>
        <div className="job-table__empty">
          <h3>Keine Stellenanzeigen gefunden</h3>
          <p>Erstellen Sie Ihre erste Stellenanzeige</p>
        </div>
      </section>
    </div>
  )
}

function NeueStellenanzeigePage() {
  return (
    <div className="page page--job-posting-new">
      <section className="job-new-top">
        <NavLink className="btn btn--ghost" to="/stellenanzeigen">Zurueck</NavLink>
        <div>
          <h1>Neue Stellenanzeige</h1>
          <p>Erstellen Sie eine neue Stellenanzeige fuer Ihre Landing Pages</p>
        </div>
      </section>

      <section className="panel panel--wide job-new-panel">
        <div className="job-new-section">
          <h3>Grundinformationen</h3>
          <div className="job-new-grid">
            <label className="field">
              <span>Titel *</span>
              <input type="text" placeholder="z.B. Marktforscher im digitalen Qualitaetsmanagement (m/w/d)" />
            </label>
            <label className="field">
              <span>URL-Slug</span>
              <input type="text" placeholder="marktforscher-qualitaetsmanagement" />
            </label>
          </div>
          <label className="field">
            <span>Kurzbeschreibung</span>
            <input type="text" placeholder="Kurze Zusammenfassung fuer die Listenansicht..." />
          </label>
          <label className="field">
            <span>Beschreibung *</span>
            <textarea placeholder="Ausfuehrliche Stellenbeschreibung..." />
          </label>
        </div>

        <div className="job-new-section">
          <h3>Anstellungsdetails</h3>
          <div className="job-new-grid job-new-grid--triple">
            <label className="field">
              <span>Anstellungsart</span>
              <select><option>Minijob</option></select>
            </label>
            <label className="field">
              <span>Arbeitsmodell</span>
              <select><option>Remote / Homeoffice</option></select>
            </label>
            <label className="field">
              <span>Standort</span>
              <input type="text" placeholder="Homeoffice / Deutschland" />
            </label>
          </div>
        </div>

        <div className="job-new-section">
          <h3>Verguetung</h3>
          <div className="job-new-grid job-new-grid--quad">
            <label className="field">
              <span>Min. Gehalt (EUR)</span>
              <input type="text" placeholder="0.00" />
            </label>
            <label className="field">
              <span>Max. Gehalt (EUR)</span>
              <input type="text" placeholder="0.00" />
            </label>
            <label className="field">
              <span>Gehaltstyp</span>
              <select><option>pro Monat</option></select>
            </label>
            <label className="field">
              <span>Anzeige-Text</span>
              <input type="text" placeholder="z.B. 556 / Monat" />
            </label>
          </div>
        </div>

        <div className="job-new-section">
          <h3>Details</h3>
          <div className="job-new-grid job-new-grid--triple">
            <button className="btn btn--ghost">+ Hinzufuegen</button>
            <button className="btn btn--ghost">+ Hinzufuegen</button>
            <button className="btn btn--ghost">+ Hinzufuegen</button>
          </div>
        </div>

        <div className="job-new-section">
          <div className="job-new-section__row">
            <h3>Interne Tags</h3>
            <button className="btn btn--ghost">+ Neuer Tag</button>
          </div>
          <p className="muted">Keine Tags vorhanden. Erstellen Sie Ihren ersten Tag.</p>
        </div>

        <div className="job-new-section">
          <h3>Einstellungen</h3>
          <div className="job-new-grid">
            <label className="field">
              <span>Bewerbungsfrist</span>
              <input type="text" placeholder="mm/dd/yyyy" />
            </label>
            <label className="field">
              <span>Anzeigereihenfolge</span>
              <input type="text" placeholder="0" />
            </label>
          </div>
        </div>

        <div className="job-new-section">
          <h3>SEO</h3>
          <label className="field">
            <span>Meta-Titel</span>
            <input type="text" placeholder="SEO-Titel (leer = Stellentitel wird verwendet)" />
          </label>
          <label className="field">
            <span>Meta-Beschreibung</span>
            <textarea placeholder="SEO-Beschreibung (max. 160 Zeichen empfohlen)" />
          </label>
        </div>

        <div className="job-new-actions">
          <NavLink className="btn btn--ghost" to="/stellenanzeigen">Abbrechen</NavLink>
          <button className="btn btn--dark">Erstellen</button>
        </div>
      </section>
    </div>
  )
}

function PlaceholderPage({ title }) {
  return (
    <section className="panel panel--wide">
      <div className="panel__header">
        <h3>{title}</h3>
      </div>
      <p className="muted">Diese Seite ist noch in Arbeit.</p>
    </section>
  )
}

const initialPhoneNumbers = [
  {
    id: 'de-anosim-1',
    phone: '+4917614590832',
    provider: 'Anosim',
    status: 'Aktiv',
    service: 'Tinder',
    country: 'Germany',
    expiresIn: 'in 30 days',
    assignedTo: 'Nicht zugewiesen',
    badgeTone: 'orange',
  },
  {
    id: 'ru-smspva-1',
    phone: '+4915778640686',
    provider: 'sms_receive_net',
    status: 'Aktiv',
    service: 'sms_receive_net',
    country: 'Germany',
    expiresIn: '2 months ago',
    assignedTo: 'Nicht zugewiesen',
    badgeTone: 'purple',
  },
]

function generatePhoneNumber(countryCode) {
  const digits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
  if (countryCode === 'ru') {
    return `+7${digits}`
  }
  return `+49${digits}`
}

function formatCountry(value) {
  if (!value) return value
  const text = String(value).trim().toLowerCase()
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function TelefonnummernPage() {
  const storageKey = 'crm_phone_numbers'
  const [phoneNumbers, setPhoneNumbers] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (!stored) return initialPhoneNumbers
      const parsed = JSON.parse(stored)
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialPhoneNumbers
    } catch {
      return initialPhoneNumbers
    }
  })
  const [isAnosimOpen, setIsAnosimOpen] = useState(false)
  const [isSmspvaOpen, setIsSmspvaOpen] = useState(false)
  const [isManualOpen, setIsManualOpen] = useState(false)

  const [anosimMode, setAnosimMode] = useState('miete')
  const [anosimService, setAnosimService] = useState('Full Germany Phone Rental')
  const [anosimCountry, setAnosimCountry] = useState('Germany')
  const [anosimDuration, setAnosimDuration] = useState('7 Tage - $10.85 (Empfohlen)')

  const [smspvaService, setSmspvaService] = useState('1xbet - ~$1.5')
  const [smspvaCountry, setSmspvaCountry] = useState('Germany')
  const [smspvaDuration, setSmspvaDuration] = useState('4 Stunden')

  const [manualUrl, setManualUrl] = useState('')

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(phoneNumbers))
  }, [phoneNumbers])

  function addPhoneNumber(newItem) {
    setPhoneNumbers((prev) => [newItem, ...prev])
  }

  function handleAnosimSubmit(event) {
    event.preventDefault()
    const expiresIn = anosimDuration.startsWith('7 Tage') ? 'in 7 days' : 'in 30 days'
    addPhoneNumber({
      id: `de-anosim-${Date.now()}`,
      phone: generatePhoneNumber('de'),
      provider: 'Anosim',
      status: 'Aktiv',
      service: anosimService,
      country: anosimCountry,
      expiresIn: anosimMode === 'aktivierung' ? 'in 1 day' : expiresIn,
      assignedTo: 'Nicht zugewiesen',
      badgeTone: 'orange',
    })
    setIsAnosimOpen(false)
  }

  function handleSmspvaSubmit(event) {
    event.preventDefault()
    addPhoneNumber({
      id: `ru-smspva-${Date.now()}`,
      phone: generatePhoneNumber('ru'),
      provider: 'SMSPVA',
      status: 'Aktiv',
      service: smspvaService,
      country: smspvaCountry,
      expiresIn: smspvaDuration,
      assignedTo: 'Nicht zugewiesen',
      badgeTone: 'purple',
    })
    setIsSmspvaOpen(false)
  }

  function handleManualSubmit(event) {
    event.preventDefault()
    let hostname = 'Manuelle Quelle'
    try {
      hostname = new URL(manualUrl).hostname
    } catch {
      return
    }
    addPhoneNumber({
      id: `manual-${Date.now()}`,
      phone: generatePhoneNumber('de'),
      provider: 'Manual',
      status: 'Aktiv',
      service: hostname,
      country: 'Germany',
      expiresIn: 'manual',
      assignedTo: 'Nicht zugewiesen',
      badgeTone: 'neutral',
    })
    setManualUrl('')
    setIsManualOpen(false)
  }

  function handleDelete(id) {
    setPhoneNumbers((prev) => prev.filter((item) => item.id !== id))
  }

  function handleAssignToggle(id) {
    setPhoneNumbers((prev) => prev.map((item) => {
      if (item.id !== id) return item
      return { ...item, assignedTo: item.assignedTo === 'Nicht zugewiesen' ? 'admin' : 'Nicht zugewiesen' }
    }))
  }

  function handleExtend(id) {
    setPhoneNumbers((prev) => prev.map((item) => {
      if (item.id !== id) return item
      return { ...item, expiresIn: 'in 30 days' }
    }))
  }

  return (
    <div className="page page--phone-numbers">
      <section className="page-header page-header--wide">
        <div>
          <h1>Telefonnummern</h1>
          <p>Verwalten Sie Ihre gemieteten Telefonnummern fuer SMS-Dienste</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn--ghost" type="button">Aktualisieren</button>
          <button className="btn btn--dark" type="button" onClick={() => setIsAnosimOpen(true)}>+ de Anosim</button>
          <button className="btn btn--dark" type="button" onClick={() => setIsSmspvaOpen(true)}>+ ru SMSPVA</button>
          <button className="btn btn--ghost" type="button" onClick={() => setIsManualOpen(true)}>Manuelle URL</button>
        </div>
      </section>

      <section className="panel panel--wide phone-panel">
        <div className="phone-grid">
          {phoneNumbers.map((item) => (
            <article key={item.id} className="phone-card">
              <header className="phone-card__header">
                <h3>{item.phone}</h3>
                <div className="phone-card__badges">
                  <span className={`phone-badge phone-badge--${item.badgeTone}`}>{item.provider}</span>
                  <span className="phone-badge phone-badge--green">{item.status}</span>
                </div>
              </header>
              <p className="phone-card__service">Dienst {item.service}</p>
              <div className="phone-card__meta">
                <div>
                  <span>Land</span>
                  <strong>{formatCountry(item.country)}</strong>
                </div>
                <div>
                  <span>Laeuft ab</span>
                  <strong>{item.expiresIn}</strong>
                </div>
                <div className="phone-card__assigned">
                  <span>Zugewiesen an</span>
                  <strong>{item.assignedTo}</strong>
                </div>
              </div>
              <footer className="phone-card__footer">
                <span>Nachrichten</span>
                <div className="phone-card__actions">
                  <button className="btn btn--ghost btn--tiny" type="button" onClick={() => handleAssignToggle(item.id)}>Zuweisen</button>
                  <button className="btn btn--ghost btn--tiny" type="button" onClick={() => handleExtend(item.id)}>Verlaengern</button>
                  <button className="btn btn--ghost btn--tiny" type="button" onClick={() => handleDelete(item.id)}>Loeschen</button>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </section>

      {isAnosimOpen && (
        <div className="modal-backdrop" onClick={() => setIsAnosimOpen(false)}>
          <section className="modal phone-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <header className="modal__header">
              <h3>Anosim - Premium deutsche Nummern</h3>
              <button className="btn btn--ghost modal__close" type="button" onClick={() => setIsAnosimOpen(false)}>×</button>
            </header>
            <form className="modal__body phone-modal__body" onSubmit={handleAnosimSubmit}>
              <div className="phone-modal__label">Modus</div>
              <div className="phone-mode-grid">
                <button
                  className={`phone-mode-btn ${anosimMode === 'aktivierung' ? 'phone-mode-btn--active' : ''}`}
                  type="button"
                  onClick={() => setAnosimMode('aktivierung')}
                >
                  <strong>Aktivierung</strong>
                  <span>Eine SMS, guenstiger</span>
                </button>
                <button
                  className={`phone-mode-btn ${anosimMode === 'miete' ? 'phone-mode-btn--active' : ''}`}
                  type="button"
                  onClick={() => setAnosimMode('miete')}
                >
                  <strong>Miete</strong>
                  <span>Mehrere SMS, laengere Laufzeit</span>
                </button>
              </div>
              <label className="phone-field">
                <span>Dienst</span>
                <select value={anosimService} onChange={(event) => setAnosimService(event.target.value)}>
                  <option>Full Germany Phone Rental</option>
                  <option>Tinder</option>
                  <option>Telegram</option>
                </select>
              </label>
              <label className="phone-field">
                <span>Land</span>
                <select value={anosimCountry} onChange={(event) => setAnosimCountry(event.target.value)}>
                  <option>Germany</option>
                  <option>Austria</option>
                  <option>Switzerland</option>
                </select>
              </label>
              <label className="phone-field">
                <span>Mietdauer</span>
                <select value={anosimDuration} onChange={(event) => setAnosimDuration(event.target.value)}>
                  <option>7 Tage - $10.85 (Empfohlen)</option>
                  <option>30 Tage - $28.50</option>
                </select>
              </label>
              <div className="phone-benefits">
                <h4>Premium-Miete Vorteile:</h4>
                <ul>
                  <li>Premium deutsche Mobilnummern</li>
                  <li>Alle SMS-Dienste unterstuetzt</li>
                  <li>Hohe Zustellrate</li>
                  <li>Auto-Verlaengerungsoptionen</li>
                  <li>24/7 Nummernverfuegbarkeit</li>
                </ul>
              </div>
              <div className="modal__actions">
                <button className="btn btn--ghost" type="button" onClick={() => setIsAnosimOpen(false)}>Abbrechen</button>
                <button className="btn btn--dark" type="submit">Nummer mieten</button>
              </div>
            </form>
          </section>
        </div>
      )}

      {isSmspvaOpen && (
        <div className="modal-backdrop" onClick={() => setIsSmspvaOpen(false)}>
          <section className="modal phone-modal phone-modal--compact" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <header className="modal__header">
              <h3>ru SMSPVA - Osteuropa-Spezialist</h3>
              <button className="btn btn--ghost modal__close" type="button" onClick={() => setIsSmspvaOpen(false)}>×</button>
            </header>
            <form className="modal__body phone-modal__body" onSubmit={handleSmspvaSubmit}>
              <div className="phone-provider-note">SMSPVA - Zuverlaessiger Dienst fuer osteuropaeische Telefonnummern</div>
              <label className="phone-field">
                <span>Dienst</span>
                <select value={smspvaService} onChange={(event) => setSmspvaService(event.target.value)}>
                  <option>1xbet - ~$1.5</option>
                  <option>Telegram - ~$0.8</option>
                  <option>Whatsapp - ~$1.1</option>
                </select>
              </label>
              <label className="phone-field">
                <span>Land</span>
                <select value={smspvaCountry} onChange={(event) => setSmspvaCountry(event.target.value)}>
                  <option>Germany</option>
                  <option>Russia</option>
                  <option>Poland</option>
                </select>
              </label>
              <label className="phone-field">
                <span>Mietdauer</span>
                <select value={smspvaDuration} onChange={(event) => setSmspvaDuration(event.target.value)}>
                  <option>4 Stunden</option>
                  <option>12 Stunden</option>
                  <option>24 Stunden</option>
                </select>
              </label>
              <div className="modal__actions">
                <button className="btn btn--danger" type="button" onClick={() => setIsSmspvaOpen(false)}>Abbrechen</button>
                <button className="btn btn--dark" type="submit">Nummer mieten</button>
              </div>
            </form>
          </section>
        </div>
      )}

      {isManualOpen && (
        <div className="modal-backdrop" onClick={() => setIsManualOpen(false)}>
          <section className="modal phone-modal phone-modal--compact" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <header className="modal__header">
              <h3>Manuelle Telefonnummer hinzufuegen</h3>
              <button className="btn btn--ghost modal__close" type="button" onClick={() => setIsManualOpen(false)}>×</button>
            </header>
            <form className="modal__body phone-modal__body" onSubmit={handleManualSubmit}>
              <p className="phone-manual-text">
                Fuegen Sie eine Telefonnummer von receive-sms-online.info, sms-receive.net
                oder einer Anosim-Freigabe-URL hinzu.
                Dadurch koennen SMS-Nachrichten per Web-Scraping oder API empfangen werden.
              </p>
              <label className="phone-field">
                <span>Manuelle SMS-Provider-URL</span>
                <input
                  type="url"
                  placeholder="URL von sms-receive.net, receive-sms-online.info oder anosim eingeben"
                  value={manualUrl}
                  onChange={(event) => setManualUrl(event.target.value)}
                  required
                />
              </label>
              <div className="modal__actions">
                <button className="btn btn--danger" type="button" onClick={() => setIsManualOpen(false)}>Abbrechen</button>
                <button className="btn btn--dark" type="submit" disabled={!manualUrl.trim()}>Telefonnummer hinzufuegen</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  )
}

function BankdropsPage() {
  const storageKey = 'crm_bankdrops'
  const [activeTab, setActiveTab] = useState('open')
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [bankdrops, setBankdrops] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (!stored) return []
      const parsed = JSON.parse(stored)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })
  const [formData, setFormData] = useState({
    title: '',
    employee: '',
    code: '',
    status: 'open',
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(bankdrops))
  }, [bankdrops])

  function handleFormChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function closeModal() {
    setIsAddOpen(false)
    setFormData({
      title: '',
      employee: '',
      code: '',
      status: 'open',
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const title = formData.title.trim()
    const employee = formData.employee.trim()
    const code = formData.code.trim()
    if (!title || !employee || !code) return

    const today = new Date()
    const createdAt = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`

    const nextItem = {
      id: `bankdrop-${Date.now()}`,
      title,
      employee,
      code,
      status: formData.status,
      createdAt,
    }

    setBankdrops((prev) => [nextItem, ...prev])
    setActiveTab(formData.status)
    closeModal()
  }

  function moveStatus(id, nextStatus) {
    setBankdrops((prev) => prev.map((item) => (item.id === id ? { ...item, status: nextStatus } : item)))
  }

  const normalizedSearch = searchTerm.trim().toLowerCase()
  const filtered = bankdrops.filter((item) => {
    if (item.status !== activeTab) return false
    if (!normalizedSearch) return true
    return (
      item.title.toLowerCase().includes(normalizedSearch)
      || item.employee.toLowerCase().includes(normalizedSearch)
      || item.code.toLowerCase().includes(normalizedSearch)
    )
  })

  const emptyTitle = activeTab === 'open' ? 'Keine offenen Anfragen' : 'Keine fertigen Bankdrops'
  const emptyText = activeTab === 'open'
    ? 'Es gibt derzeit keine offenen Bankdrop-Anfragen zum Bearbeiten'
    : 'Es wurden noch keine Bankdrop-Auftraege abgeschlossen oder abgelehnt'

  return (
    <div className="page page--bankdrops">
      <section className="page-header page-header--wide">
        <div>
          <h1>Bankdrops</h1>
          <p>Alle Bankdrop-Auftraege mit hochgeladenen Dokumenten</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn--dark" type="button" onClick={() => setIsAddOpen(true)}>
            Neuer Bankdrop
          </button>
        </div>
      </section>

      <section className="panel panel--wide bankdrops-panel">
        <div className="bankdrops-tabs" role="tablist" aria-label="Bankdrops Filter">
          <button
            className={`bankdrops-tab ${activeTab === 'open' ? 'bankdrops-tab--active' : ''}`}
            type="button"
            onClick={() => setActiveTab('open')}
          >
            Offene Anfragen
          </button>
          <button
            className={`bankdrops-tab ${activeTab === 'done' ? 'bankdrops-tab--active' : ''}`}
            type="button"
            onClick={() => setActiveTab('done')}
          >
            Fertige Bankdrops
          </button>
        </div>

        <div className="search bankdrops-search">
          <input type="text" placeholder="Nach Titel, Mitarbeiter oder Code suchen..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        </div>

        {filtered.length === 0 ? (
          <div className="bankdrops-empty">
            <h3>{emptyTitle}</h3>
            <p>{emptyText}</p>
          </div>
        ) : (
          <div className="bankdrops-list">
            {filtered.map((item) => (
              <article key={item.id} className="bankdrop-item">
                <div>
                  <h4>{item.title}</h4>
                  <p>Mitarbeiter: {item.employee}</p>
                  <p>Code: {item.code}</p>
                </div>
                <div className="bankdrop-item__actions">
                  <span>{item.createdAt}</span>
                  {item.status === 'open' ? (
                    <button className="btn btn--ghost btn--tiny" type="button" onClick={() => moveStatus(item.id, 'done')}>Als fertig markieren</button>
                  ) : (
                    <button className="btn btn--ghost btn--tiny" type="button" onClick={() => moveStatus(item.id, 'open')}>Wieder oeffnen</button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {isAddOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <section className="modal bankdrops-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <header className="modal__header">
              <h3>Neuer Bankdrop</h3>
              <button className="btn btn--ghost modal__close" type="button" onClick={closeModal} aria-label="Schliessen">
                ×
              </button>
            </header>
            <form className="modal__body" onSubmit={handleSubmit}>
              <label className="field">
                <span>Titel</span>
                <input name="title" value={formData.title} onChange={handleFormChange} placeholder="z.B. Dokumentenpruefung DE-0123" required />
              </label>
              <label className="field">
                <span>Mitarbeiter</span>
                <input name="employee" value={formData.employee} onChange={handleFormChange} placeholder="z.B. Max Mustermann" required />
              </label>
              <label className="field">
                <span>Code</span>
                <input name="code" value={formData.code} onChange={handleFormChange} placeholder="z.B. BKD-2026-001" required />
              </label>
              <label className="field">
                <span>Status</span>
                <select name="status" value={formData.status} onChange={handleFormChange}>
                  <option value="open">Offene Anfrage</option>
                  <option value="done">Fertiger Bankdrop</option>
                </select>
              </label>
              <div className="modal__actions">
                <button className="btn btn--ghost" type="button" onClick={closeModal}>Abbrechen</button>
                <button className="btn btn--dark" type="submit">Erstellen</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  )
}

function CallerPage() {
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '••••••••••••',
  }
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [searchTerm, setSearchTerm] = useState('')
  const [callers, setCallers] = useState(() => {
    try {
      const stored = localStorage.getItem('crm_callers')
      if (!stored) return []
      const parsed = JSON.parse(stored)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })
  const [permissions, setPermissions] = useState({
    viewApplications: true,
    changeStatus: true,
    addNotes: true,
    createEmployees: false,
    deleteApplications: false,
    ownStatistics: true,
  })

  const permissionItems = [
    {
      id: 'viewApplications',
      label: 'Bewerbungen anzeigen',
      description: 'Zugriff auf die Liste aller Bewerbungen',
    },
    {
      id: 'changeStatus',
      label: 'Status aendern',
      description: 'Bewerbungen einstellen oder ablehnen',
    },
    {
      id: 'addNotes',
      label: 'Notizen hinzufuegen',
      description: 'Notizen zu Bewerbungen hinzufuegen und bearbeiten',
    },
    {
      id: 'createEmployees',
      label: 'Mitarbeiter erstellen',
      description: 'Bewerber direkt als Mitarbeiter anlegen',
    },
    {
      id: 'deleteApplications',
      label: 'Bewerbungen loeschen',
      description: 'Bewerbungen aus dem System entfernen',
    },
    {
      id: 'ownStatistics',
      label: 'Eigene Statistiken',
      description: 'Dashboard mit eigenen Leistungsdaten anzeigen',
    },
  ]

  useEffect(() => {
    localStorage.setItem('crm_callers', JSON.stringify(callers))
  }, [callers])

  function handleInputChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function togglePermission(permissionId) {
    setPermissions((prev) => ({ ...prev, [permissionId]: !prev[permissionId] }))
  }

  function closeModal() {
    setIsAddOpen(false)
    setFormData(initialFormData)
    setPermissions({
      viewApplications: true,
      changeStatus: true,
      addNotes: true,
      createEmployees: false,
      deleteApplications: false,
      ownStatistics: true,
    })
  }

  function generatePassword() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$'
    const nextPassword = Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    setFormData((prev) => ({ ...prev, password: nextPassword }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const firstName = formData.firstName.trim()
    const lastName = formData.lastName.trim()
    const email = formData.email.trim().toLowerCase()
    if (!firstName || !lastName || !email) return

    const today = new Date()
    const createdAt = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`
    const enabledPermissions = Object.values(permissions).filter(Boolean).length
    const nextCaller = {
      id: `${firstName.toLowerCase()}-${lastName.toLowerCase()}-${Date.now()}`,
      name: `${firstName} ${lastName}`,
      email,
      createdAt,
      enabledPermissions,
      permissions,
    }

    setCallers((prev) => [nextCaller, ...prev])
    closeModal()
  }

  const normalizedSearch = searchTerm.trim().toLowerCase()
  const filteredCallers = callers.filter((caller) => (
    caller.name.toLowerCase().includes(normalizedSearch) || caller.email.toLowerCase().includes(normalizedSearch)
  ))

  return (
    <div className="page page--caller">
      <section className="page-header page-header--wide">
        <div className="caller-page-title">
          <div>
            <h1>Caller Verwaltung</h1>
            <p>{callers.length} Caller insgesamt</p>
          </div>
        </div>
        <div className="page-header__actions">
          <button className="btn btn--ghost" type="button">
            Aktualisieren
          </button>
          <button className="btn btn--dark" type="button" onClick={() => setIsAddOpen(true)}>
            Caller hinzufuegen
          </button>
        </div>
      </section>

      <section className="panel panel--wide">
        <div className="review-toolbar">
          <div className="search review-toolbar__search">
            <input
              type="text"
              placeholder="Caller suchen (Name, E-Mail)..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="panel panel--wide review-list-panel">
        <div className="panel__header review-list-panel__header">
          <h3>Caller Liste</h3>
        </div>
        {filteredCallers.length === 0 ? (
          <div className="review-empty">
            <h3>{callers.length === 0 ? 'Noch keine Caller vorhanden' : 'Keine Caller gefunden'}</h3>
            <p>
              {callers.length === 0
                ? 'Erstellen Sie Ihren ersten Caller, um loszulegen.'
                : 'Passen Sie den Suchbegriff an oder erstellen Sie einen neuen Caller.'}
            </p>
            <button className="btn btn--dark caller-empty__action" type="button" onClick={() => setIsAddOpen(true)}>
              Ersten Caller erstellen
            </button>
          </div>
        ) : (
          <div className="caller-table">
            <div className="caller-table__header">
              <span>Name</span>
              <span>E-Mail</span>
              <span>Berechtigungen</span>
              <span>Erstellt</span>
            </div>
            {filteredCallers.map((caller) => (
              <div key={caller.id} className="caller-table__row">
                <span className="caller-table__title">{caller.name}</span>
                <span>{caller.email}</span>
                <span>{caller.enabledPermissions} aktiv</span>
                <span>{caller.createdAt}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {isAddOpen && (
        <div className="modal-backdrop caller-modal-backdrop" onClick={closeModal}>
          <section
            className="modal caller-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="caller-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="modal__header caller-modal__header">
              <h3 id="caller-modal-title">
                <span className="caller-modal__title-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 6c0 7 7 14 14 14l2-2-4-4-2 2c-2-1-4-3-5-5l2-2-4-4-3 1z" />
                  </svg>
                </span>
                Neuen Caller hinzufuegen
              </h3>
              <button className="btn btn--ghost modal__close" type="button" onClick={closeModal} aria-label="Schliessen">
                ×
              </button>
            </header>

            <form className="modal__body caller-modal__body" onSubmit={handleSubmit}>
              <div className="caller-modal__grid">
                <label className="field">
                  <span>Vorname</span>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Max"
                    required
                  />
                </label>
                <label className="field">
                  <span>Nachname</span>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Mustermann"
                    required
                  />
                </label>
              </div>

              <label className="field">
                <span>E-Mail</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="max.mustermann@example.com"
                  required
                />
              </label>

              <div className="caller-modal__password-row">
                <label className="field">
                  <span>Passwort</span>
                  <input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <button className="btn btn--ghost caller-modal__password-btn" type="button" onClick={generatePassword}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 11a8 8 0 10-2 5.3" />
                    <path d="M20 4v7h-7" />
                  </svg>
                  Neu
                </button>
              </div>

              <div className="caller-modal__permissions">
                <h4>
                  <span aria-hidden="true">◔</span>
                  Berechtigungen
                </h4>
                {permissionItems.map((item) => (
                  <div key={item.id} className="caller-permission-row">
                    <div>
                      <p>{item.label}</p>
                      <span>{item.description}</span>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={permissions[item.id]}
                      className={`caller-switch ${permissions[item.id] ? 'caller-switch--on' : ''}`}
                      onClick={() => togglePermission(item.id)}
                    >
                      <span />
                    </button>
                  </div>
                ))}
              </div>

              <div className="modal__actions caller-modal__actions">
                <button className="btn btn--ghost" type="button" onClick={closeModal}>
                  Abbrechen
                </button>
                <button className="btn btn--dark" type="submit">
                  Caller erstellen
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  )
}

function MitarbeiterPage({ employees, onAddEmployee }) {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    password: '',
  })

  function handleFormChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function closeAddModal() {
    setIsAddOpen(false)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      password: '',
    })
  }

  function handleAddSubmit(event) {
    event.preventDefault()
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.password.trim()) {
      return
    }

    const baseId = `${formData.firstName}-${formData.lastName}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    const today = new Date()
    const employee = {
      id: `${baseId}-${Date.now()}`,
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      email: formData.email.trim().toLowerCase(),
      role: formData.position.trim() ? formData.position.trim() : 'Mitarbeiter',
      status: 'Aktiv',
      phone: formData.phone.trim() || 'Nicht angegeben',
      registeredAt: `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`,
      nationality: 'DE',
    }

    onAddEmployee(employee)
    closeAddModal()
  }

  return (
    <div className="page page--employees">
      <section className="page-header page-header--wide">
        <div>
          <h1>Mitarbeiter</h1>
          <p>Verwalten Sie Ihre Mitarbeiter und deren Konten.</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn--ghost">Aktualisieren</button>
          <button className="btn btn--ghost">Alle exportieren</button>
          <button className="btn btn--dark" onClick={() => setIsAddOpen(true)}>Mitarbeiter hinzufuegen</button>
        </div>
      </section>

      <section className="panel panel--wide">
        <div className="tabs">
          <button className="tab tab--active">Alle Mitarbeiter <span className="tab__count">{employees.length}</span></button>
          <button className="tab">Starter-Aufgaben offen</button>
        </div>

        <div className="employees-header">
          <h3>Mitarbeiter ({employees.length})</h3>
          <div className="employees-actions">
            <div className="search search--compact">
              <input type="text" placeholder="Suchen..." />
            </div>
            <button className="btn btn--ghost btn--filter">Filter</button>
          </div>
        </div>

        <div className="employees-table">
          <div className="employees-table__header">
            <span></span>
            <span>Name</span>
            <span>Rolle</span>
            <span>Status</span>
            <span>Tags</span>
            <span>Aktionen</span>
          </div>

          {employees.map((employee) => (
            <div key={employee.id} className="employees-table__row">
              <div><input type="checkbox" /></div>
              <div className="employee">
                <div className="avatar avatar--soft">{employee.name.charAt(0).toUpperCase()}</div>
                <div>
                  <div className="table__title">{employee.name}</div>
                  <div className="table__subtitle">{employee.email}</div>
                </div>
              </div>
              <div>{employee.role}</div>
              <div><span className="status-pill status-pill--success">{employee.status}</span></div>
              <div className="tags">Keine Tags <button className="btn btn--ghost btn--tiny btn--tag-add">+</button></div>
              <div className="table__actions">
                <NavLink className="btn btn--row-action btn--row-action-details" to={`/mitarbeiter/${employee.id}`}>
                  <span className="row-action__icon" aria-hidden="true">↗</span>
                  Details
                </NavLink>
                <NavLink className="btn btn--row-action btn--row-action-edit" to={`/mitarbeiter/${employee.id}/bearbeiten`}>
                  <span className="row-action__icon" aria-hidden="true">✎</span>
                  Bearbeiten
                </NavLink>
                <button className="btn btn--row-action btn--row-action-delete">Loeschen</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {isAddOpen ? (
        <div className="modal-backdrop" onClick={closeAddModal}>
          <section className="modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal__header">
              <h3>Neuen Mitarbeiter hinzufuegen</h3>
              <button className="btn btn--ghost modal__close" onClick={closeAddModal}>×</button>
            </div>
            <form className="modal__body" onSubmit={handleAddSubmit}>
              <div className="modal__grid">
                <label className="field">
                  <span>Vorname</span>
                  <input name="firstName" value={formData.firstName} onChange={handleFormChange} placeholder="Max" required />
                </label>
                <label className="field">
                  <span>Nachname</span>
                  <input name="lastName" value={formData.lastName} onChange={handleFormChange} placeholder="Mustermann" required />
                </label>
              </div>
              <label className="field">
                <span>E-Mail</span>
                <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="max.mustermann@example.com" required />
              </label>
              <label className="field">
                <span>Telefonnummer (optional)</span>
                <input name="phone" value={formData.phone} onChange={handleFormChange} placeholder="+49 123 456789" />
              </label>
              <label className="field">
                <span>Position</span>
                <input name="position" value={formData.position} onChange={handleFormChange} placeholder="z.B. Entwickler, Designer usw." />
              </label>
              <label className="field">
                <span>Passwort</span>
                <input type="password" name="password" value={formData.password} onChange={handleFormChange} placeholder="Mindestens 6 Zeichen" minLength={6} required />
              </label>
              <div className="modal__actions">
                <button type="button" className="btn btn--ghost" onClick={closeAddModal}>Abbrechen</button>
                <button type="submit" className="btn btn--dark">Mitarbeiter erstellen</button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </div>
  )
}

function MitarbeiterDetailsPage({ employees }) {
  const { employeeId } = useParams()
  const employee = employees.find((item) => item.id === employeeId) || employees[0]
  const [activeTab, setActiveTab] = useState('overview')

  if (!employee) {
    return (
      <section className="panel panel--wide">
        <h3>Mitarbeiter nicht gefunden</h3>
      </section>
    )
  }

  return (
    <div className="page page--employee-details">
      <section className="employee-details__top">
        <div className="employee-details__head">
          <div className="employee-details__title">
            <NavLink className="btn btn--ghost employee-back" to="/mitarbeiter">
              Zurueck
            </NavLink>
            <div>
              <h1>{employee.name}</h1>
              <p>{employee.email}</p>
            </div>
          </div>
          <div className="employee-details__actions">
            <button className="btn btn--success employee-action">Anrufen</button>
            <button className="btn btn--ghost employee-action">Exportieren</button>
            <NavLink className="btn btn--dark employee-action" to={`/mitarbeiter/${employee.id}/bearbeiten`}>Bearbeiten</NavLink>
            <button className="btn btn--ghost employee-action">Deaktivieren</button>
            <button className="btn btn--danger employee-action">Loeschen</button>
          </div>
        </div>

        <div className="employee-details__tabs">
          <button
            className={`tab employee-tab ${activeTab === 'overview' ? 'tab--active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Uebersicht
          </button>
          <button
            className={`tab employee-tab ${activeTab === 'tasks' ? 'tab--active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            Aufgaben
          </button>
          <button
            className={`tab employee-tab ${activeTab === 'contracts' ? 'tab--active' : ''}`}
            onClick={() => setActiveTab('contracts')}
          >
            Vertraege
          </button>
          <button
            className={`tab employee-tab ${activeTab === 'kyc' ? 'tab--active' : ''}`}
            onClick={() => setActiveTab('kyc')}
          >
            KYC-Dokumente
          </button>
          <button
            className={`tab employee-tab ${activeTab === 'phones' ? 'tab--active' : ''}`}
            onClick={() => setActiveTab('phones')}
          >
            Telefonnummern
          </button>
        </div>

        <div className="employee-details__summary">
          <div className="avatar avatar--soft">{employee.name.slice(0, 1).toUpperCase()}</div>
          <div className="employee-details__meta">
            <div className="table__title">{employee.name}</div>
            <div className="table__subtitle">{employee.email} - {employee.role} - Registriert {employee.registeredAt}</div>
          </div>
          <div className="employee-details__badges">
            <span className="status-pill status-pill--success">{employee.status}</span>
            <span className="status-pill">Ausstehend</span>
          </div>
          <div className="employee-details__tags">
            <p className="details-field__label">Tags</p>
            <div className="tags">Keine Tags <button className="btn btn--ghost btn--tiny btn--tag-add">+ Tag</button></div>
          </div>
        </div>
      </section>

      {activeTab === 'overview' ? (
      <section className="employee-details__layout">
        <div className="employee-details__left">
          <div className="panel">
            <h3>Persoenliche Daten</h3>
            <div className="info-grid">
              <div className="info-row">
                <span className="info-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="3" />
                    <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
                  </svg>
                </span>
                <div>
                  <p className="info-label">Vorname</p>
                  <p className="info-value">{employee.name}</p>
                </div>
              </div>
              <div className="info-row">
                <span className="info-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="3" />
                    <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
                  </svg>
                </span>
                <div>
                  <p className="info-label">Nachname</p>
                  <p className="info-value">Not specified</p>
                </div>
              </div>
              <div className="info-row">
                <span className="info-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <rect x="5" y="4" width="14" height="16" rx="2" />
                    <path d="M8 2v4M16 2v4M5 9h14" />
                  </svg>
                </span>
                <div>
                  <p className="info-label">E-Mail</p>
                  <p className="info-value">{employee.email}</p>
                </div>
              </div>
              <div className="info-row">
                <span className="info-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 6c0 7 7 14 14 14l2-2-4-4-2 2c-2-1-4-3-5-5l2-2-4-4-3 1z" />
                  </svg>
                </span>
                <div>
                  <p className="info-label">Phone</p>
                  <p className="info-value">{employee.phone}</p>
                </div>
              </div>
              <div className="info-row">
                <span className="info-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <rect x="5" y="4" width="14" height="16" rx="2" />
                    <path d="M8 2v4M16 2v4M5 9h14" />
                  </svg>
                </span>
                <div>
                  <p className="info-label">Birth date</p>
                  <p className="info-value">Not specified</p>
                </div>
              </div>
              <div className="info-row">
                <span className="info-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18" />
                  </svg>
                </span>
                <div>
                  <p className="info-label">Nationality</p>
                  <p className="info-value">{employee.nationality}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <h3>Adresse</h3>
            <div className="info-grid info-grid--compact">
              <div className="info-row">
                <span className="info-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3c4 3 6 6 6 9a6 6 0 11-12 0c0-3 2-6 6-9z" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </span>
                <div>
                  <p className="info-label">Street, house number</p>
                  <p className="info-value">Not specified</p>
                </div>
              </div>
              <div className="info-row">
                <span className="info-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <rect x="4" y="5" width="16" height="14" rx="2" />
                  </svg>
                </span>
                <div>
                  <p className="info-label">Postal code</p>
                  <p className="info-value">Not specified</p>
                </div>
              </div>
              <div className="info-row">
                <span className="info-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <rect x="4" y="5" width="16" height="14" rx="2" />
                  </svg>
                </span>
                <div>
                  <p className="info-label">City</p>
                  <p className="info-value">Not specified</p>
                </div>
              </div>
            </div>
          </div>

          <div className="employee-details__bottom">
            <div className="panel">
              <h3>Bank details</h3>
              <div className="info-grid info-grid--compact">
                <div className="info-row">
                  <span className="info-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M3 9l9-5 9 5" />
                      <path d="M5 9v9M9 9v9M15 9v9M19 9v9" />
                      <path d="M4 18h16" />
                    </svg>
                  </span>
                  <div>
                    <p className="info-label">IBAN</p>
                    <p className="info-value">Not specified</p>
                  </div>
                </div>
                <div className="info-row">
                  <span className="info-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M4 7h16v12H4z" />
                    </svg>
                  </span>
                  <div>
                    <p className="info-label">BIC</p>
                    <p className="info-value">Not specified</p>
                  </div>
                </div>
                <div className="info-row">
                  <span className="info-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  </span>
                  <div>
                    <p className="info-label">Account holder</p>
                    <p className="info-value">Not specified</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel">
              <h3>Tax & insurance</h3>
              <div className="info-grid info-grid--compact">
                <div className="info-row">
                  <span className="info-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <rect x="4" y="5" width="16" height="14" rx="2" />
                    </svg>
                  </span>
                  <div>
                    <p className="info-label">Tax identification number (Tax ID)</p>
                    <p className="info-value">Not specified</p>
                  </div>
                </div>
                <div className="info-row">
                  <span className="info-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <rect x="4" y="5" width="16" height="14" rx="2" />
                    </svg>
                  </span>
                  <div>
                    <p className="info-label">Social security number</p>
                    <p className="info-value">Not specified</p>
                  </div>
                </div>
                <div className="info-row">
                  <span className="info-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 3l7 3v6c0 5-3 7-7 9-4-2-7-4-7-9V6l7-3z" />
                    </svg>
                  </span>
                  <div>
                    <p className="info-label">Health insurance</p>
                    <p className="info-value">Not specified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

          <div className="employee-details__right">
          <div className="panel">
            <h3>Access data</h3>
            <p className="employee-card-subtitle">Mitarbeiter-Logininformationen</p>
            <div className="employee-credentials">
              <div>
                <p className="details-field__label">e-mail address</p>
                <div className="input-row">
                  <input type="text" value={employee.email} readOnly />
                  <button className="btn btn--ghost">Copy</button>
                </div>
              </div>
              <div>
                <p className="details-field__label">Passwort</p>
                <div className="input-row">
                  <input type="text" value="Not saved" readOnly />
                </div>
              </div>
              <button className="btn btn--ghost">Neues Passwort generieren</button>
            </div>
          </div>

          <div className="panel">
            <h3>Admin notes</h3>
            <p className="employee-card-subtitle">Nur fuer Administratoren sichtbar</p>
            <div className="employee-notes">
              <div className="employee-notes__empty">Keine Notizen vorhanden.</div>
              <button className="btn btn--ghost">Bearbeiten</button>
            </div>
          </div>
          </div>
        </section>
      ) : null}

      {activeTab === 'tasks' ? (
        <section className="panel panel--wide employee-section">
          <div className="employee-section__header">
            <div>
              <h3>Aufgaben</h3>
              <p>Zugewiesene Aufgaben fuer {employee.name}</p>
            </div>
            <button className="btn btn--ghost">Aktualisieren</button>
          </div>
          <div className="employee-stats">
            <div className="applications-stat">
              <p className="applications-stat__label">Gesamt</p>
              <p className="applications-stat__value">0</p>
            </div>
            <div className="applications-stat">
              <p className="applications-stat__label">Ausstehend</p>
              <p className="applications-stat__value">0</p>
            </div>
            <div className="applications-stat">
              <p className="applications-stat__label">Abgeschlossen</p>
              <p className="applications-stat__value">0</p>
            </div>
            <div className="applications-stat">
              <p className="applications-stat__label">Stunden</p>
              <p className="applications-stat__value">0h</p>
            </div>
          </div>
          <div className="employee-empty">
            <div className="employee-empty__icon">[]</div>
            <h4>Keine Aufgaben gefunden</h4>
            <p>Noch keine Aufgaben zugewiesen.</p>
          </div>
        </section>
      ) : null}

      {activeTab === 'contracts' ? (
        <section className="panel panel--wide employee-section">
          <div className="employee-section__header">
            <div>
              <h3>Vertraege</h3>
              <p>0 Vertraege zugewiesen</p>
            </div>
          </div>
          <div className="employee-contracts">
            <div className="applications-stat">
              <p className="applications-stat__label">Unterzeichnet</p>
              <p className="applications-stat__value">0</p>
            </div>
            <div className="applications-stat">
              <p className="applications-stat__label">Ausstehend</p>
              <p className="applications-stat__value">0</p>
            </div>
            <div className="applications-stat">
              <p className="applications-stat__label">Abgelehnt</p>
              <p className="applications-stat__value">0</p>
            </div>
          </div>
          <div className="employee-empty">
            <div className="employee-empty__icon">[]</div>
            <h4>Keine Vertraege</h4>
            <p>Noch keine Vertraege zugewiesen.</p>
          </div>
        </section>
      ) : null}

      {activeTab === 'kyc' ? (
        <section className="panel panel--wide employee-section">
          <div className="employee-section__header">
            <div>
              <h3>KYC-Pruefung</h3>
            </div>
            <span className="status-pill">Ausstehend</span>
          </div>
          <div className="employee-kyc">
            <div className="employee-kyc__status">
              <p>Status: Ausstehend</p>
              <span>Noch keine Dokumente eingereicht</span>
              <div className="employee-kyc__actions">
                <button className="btn btn--ghost">Genehmigen</button>
                <button className="btn btn--danger">Ablehnen</button>
              </div>
            </div>
            <div className="employee-kyc__docs">
              <h4>Hochgeladene Dokumente (2)</h4>
              <div className="employee-kyc__doc">
                <div>
                  <strong>Adressnachweis</strong>
                  <p>Screenshot_20250609-124904.png - 0.14 MB</p>
                </div>
                <div className="employee-kyc__doc-actions">
                  <button className="btn btn--ghost">Ansehen</button>
                  <button className="btn btn--ghost">Herunterladen</button>
                </div>
              </div>
              <div className="employee-kyc__doc">
                <div>
                  <strong>Reisepass</strong>
                  <p>Screenshot_20250609-124834.png - 0.22 MB</p>
                </div>
                <div className="employee-kyc__doc-actions">
                  <button className="btn btn--ghost">Ansehen</button>
                  <button className="btn btn--ghost">Herunterladen</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {activeTab === 'phones' ? (
        <section className="panel panel--wide employee-section">
          <div className="employee-section__header">
            <div>
              <h3>Telefonnummern</h3>
              <p>Zugewiesene Nummern</p>
            </div>
            <div className="employee-section__actions">
              <button className="btn btn--ghost">Aktualisieren</button>
              <button className="btn btn--ghost">Alle Nummern</button>
            </div>
          </div>
          <div className="employee-empty">
            <div className="employee-empty__icon">[]</div>
            <h4>Keine Nummern zugewiesen</h4>
            <p>Noch keine Telefonnummern zugewiesen.</p>
            <button className="btn btn--ghost">Nummer zuweisen</button>
          </div>
        </section>
      ) : null}
    </div>
  )
}

function MitarbeiterEditPage({ employees }) {
  const { employeeId } = useParams()
  const employee = employees.find((item) => item.id === employeeId) || employees[0]
  const [activeTab, setActiveTab] = useState('personal')
  const [formData, setFormData] = useState({
    firstName: employee?.name || '',
    lastName: '',
    phone: '',
    day: 'Tag',
    month: 'Monat',
    year: 'Jahr',
    nationality: employee?.nationality || 'DE',
    role: employee?.role === 'Administrator' ? 'Administrator' : 'Mitarbeiter',
    kyc: 'Ausstehend',
    notes: '',
  })

  if (!employee) {
    return (
      <section className="panel panel--wide">
        <h3>Mitarbeiter nicht gefunden</h3>
      </section>
    )
  }

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="page page--employee-edit">
      <section className="employee-edit-head">
        <NavLink className="employee-edit-back" to={`/mitarbeiter/${employee.id}`}>
          ← Zurueck
        </NavLink>
        <div>
          <h1>Mitarbeiter bearbeiten</h1>
          <p>Vollstaendige Bearbeitung aller Mitarbeiterdaten</p>
        </div>
      </section>

      <section className="panel employee-edit-profile">
        <div className="avatar avatar--soft">{employee.name.charAt(0).toUpperCase()}</div>
        <div>
          <div className="table__title">{employee.name}</div>
          <div className="table__subtitle">{employee.email} • {employee.role}</div>
        </div>
      </section>

      <section className="panel employee-edit-form">
        <div className="employee-edit-tabs">
          <button className={`employee-edit-tab ${activeTab === 'personal' ? 'is-active' : ''}`} onClick={() => setActiveTab('personal')}>Persoenliche Daten</button>
          <button className={`employee-edit-tab ${activeTab === 'address' ? 'is-active' : ''}`} onClick={() => setActiveTab('address')}>Adresse</button>
          <button className={`employee-edit-tab ${activeTab === 'finance' ? 'is-active' : ''}`} onClick={() => setActiveTab('finance')}>Finanzdaten</button>
          <button className={`employee-edit-tab ${activeTab === 'payroll' ? 'is-active' : ''}`} onClick={() => setActiveTab('payroll')}>Lohnabrechnung</button>
        </div>

        {activeTab === 'personal' ? (
          <>
            <div className="employee-edit-grid">
              <label className="field">
                <span>Vorname</span>
                <input name="firstName" value={formData.firstName} onChange={handleChange} />
              </label>
              <label className="field">
                <span>Nachname</span>
                <input name="lastName" value={formData.lastName} onChange={handleChange} />
              </label>
            </div>

            <label className="field">
              <span>Telefonnummer</span>
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+49 123 456789" />
            </label>

            <div className="employee-edit-grid employee-edit-grid--dob">
              <label className="field">
                <span>Tag</span>
                <select name="day" value={formData.day} onChange={handleChange}>
                  <option>Tag</option>
                </select>
              </label>
              <label className="field">
                <span>Monat</span>
                <select name="month" value={formData.month} onChange={handleChange}>
                  <option>Monat</option>
                </select>
              </label>
              <label className="field">
                <span>Jahr</span>
                <select name="year" value={formData.year} onChange={handleChange}>
                  <option>Jahr</option>
                </select>
              </label>
            </div>

            <label className="field">
              <span>Nationalitaet</span>
              <input name="nationality" value={formData.nationality} onChange={handleChange} />
            </label>

            <div className="employee-edit-hint">
              <strong>Hinweis</strong>
              <p>Bitte geben Sie Ihre korrekten persoenlichen Daten ein. Diese Informationen werden fuer die Vertragsabwicklung benoetigt.</p>
            </div>

            <section className="employee-edit-admin">
              <h3>Admin-Einstellungen</h3>
              <div className="employee-edit-grid">
                <div className="field">
                  <span>Rolle</span>
                  <div className="employee-edit-radios">
                    <label><input type="radio" name="role" value="Mitarbeiter" checked={formData.role === 'Mitarbeiter'} onChange={handleChange} /> Mitarbeiter</label>
                    <label><input type="radio" name="role" value="Caller" checked={formData.role === 'Caller'} onChange={handleChange} /> Caller</label>
                    <label><input type="radio" name="role" value="Administrator" checked={formData.role === 'Administrator'} onChange={handleChange} /> Administrator</label>
                  </div>
                </div>
                <label className="field">
                  <span>KYC Status</span>
                  <select name="kyc" value={formData.kyc} onChange={handleChange}>
                    <option>Ausstehend</option>
                    <option>Genehmigt</option>
                    <option>Abgelehnt</option>
                  </select>
                </label>
              </div>

              <label className="field">
                <span>Admin-Notizen</span>
                <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Private Notizen ueber diesen Mitarbeiter..." />
              </label>
            </section>
          </>
        ) : (
          <div className="employee-edit-placeholder">Dieser Bereich ist in dieser Demo noch nicht ausgefuellt.</div>
        )}

        <div className="employee-edit-actions">
          <NavLink className="btn btn--ghost" to={`/mitarbeiter/${employee.id}`}>Abbrechen</NavLink>
          <button className="btn btn--dark" type="button">Aenderungen speichern</button>
        </div>
      </section>
    </div>
  )
}

function BewerbungenDetailsPage() {
  return (
    <div className="page page--application-details">
      <section className="details-top">
        <div className="details-top__bar">
          <NavLink className="btn btn--ghost" to="/bewerbungen">
            ← Zurueck
          </NavLink>
          <div className="details-top__title details-top__title--left">
            <h1>Max Mustermann</h1>
            <div className="details-top__meta">
              <span className="status-pill">Ausstehend</span>
              <span>Eingegangen am 25.01.2026, 01:01</span>
            </div>
          </div>
          <div className="details-top__actions">
            <button className="btn btn--dark">Einstellen</button>
            <button className="btn btn--ghost">Ablehnen</button>
            <button className="btn btn--ghost">Loeschen</button>
          </div>
        </div>
        <div className="details-top__profile">
          <div className="avatar avatar--soft">MM</div>
          <div>
            <div className="details-hero__title">Max Mustermann</div>
            <div className="details-hero__meta">
              <span>azwugfujaksefg723g@proton.me</span>
              <span>+4917583745</span>
            </div>
          </div>
        </div>
      </section>

      <section className="panel panel--wide">
        <div className="details-field details-field--inline">
          <p className="details-field__label">Art der Bewerbung</p>
          <p className="details-field__value">Initiativbewerbung</p>
        </div>
      </section>

      <section className="panel panel--wide">
        <h3>Persoenliche Informationen</h3>
        <div className="details-list">
          <div className="details-item">
            <span className="details-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="3" />
                <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
              </svg>
            </span>
            <div className="details-item__text">
              <p className="details-field__label">Vollstaendiger Name</p>
              <p className="details-field__value">Max Mustermann</p>
            </div>
          </div>
          <div className="details-item">
            <span className="details-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect x="5" y="4" width="14" height="16" rx="2" />
                <path d="M8 2v4M16 2v4M5 9h14" />
              </svg>
            </span>
            <div className="details-item__text">
              <p className="details-field__label">Geburtsdatum</p>
              <p className="details-field__value">17.01.1990</p>
            </div>
          </div>
          <div className="details-item">
            <span className="details-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18" />
              </svg>
            </span>
            <div className="details-item__text">
              <p className="details-field__label">Nationalitaet</p>
              <p className="details-field__value">Deutsch</p>
            </div>
          </div>
          <div className="details-item">
            <span className="details-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M4 7h16v12H4z" />
                <path d="M4 7l4-4h8l4 4" />
              </svg>
            </span>
            <div className="details-item__text">
              <p className="details-field__label">Fruehester Starttermin</p>
              <p className="details-field__value">Nicht angegeben</p>
            </div>
          </div>
          <div className="details-item">
            <span className="details-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="6" width="18" height="12" rx="2" />
                <path d="M3 7l9 7 9-7" />
              </svg>
            </span>
            <div className="details-item__text">
              <p className="details-field__label">E-Mail</p>
              <p className="details-field__value">azwugfujaksefg723g@proton.me</p>
            </div>
          </div>
          <div className="details-item">
            <span className="details-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M4 6c0 7 7 14 14 14l2-2-4-4-2 2c-2-1-4-3-5-5l2-2-4-4-3 1z" />
              </svg>
            </span>
            <div className="details-item__text">
              <p className="details-field__label">Telefon</p>
              <p className="details-field__value">+4917583745</p>
            </div>
          </div>
          <div className="details-item">
            <span className="details-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 3c4 3 6 6 6 9a6 6 0 11-12 0c0-3 2-6 6-9z" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </span>
            <div className="details-item__text">
              <p className="details-field__label">Adresse</p>
              <p className="details-field__value">manstrasse 3, 65746 bullenland</p>
              <p className="details-item__sub">Deutschland</p>
            </div>
          </div>
        </div>
      </section>

      <section className="panel panel--wide">
        <h3>Bewerbungsdetails</h3>
        <div className="details-block">
          <p className="details-field__label">Motivation & Erfahrung</p>
          <p className="details-field__value">kdjsfhgisdgfhguhsdfguibh</p>
        </div>
        <div className="details-block">
          <p className="details-field__label">Weitere Erfahrungen</p>
          <p className="details-field__value">aiushjerfioahsdiofhioashdfihasdf</p>
        </div>
      </section>

      <section className="panel panel--wide">
        <h3>Interne Notizen</h3>
        <div className="details-notes">
          <textarea placeholder="Fuegen Sie hier interne Notizen zu dieser Bewerbung hinzu..." />
          <button className="btn btn--dark details-notes__btn">Notizen speichern</button>
        </div>
      </section>
    </div>
  )
}

function SidebarIcon({ name }) {
  switch (name) {
    case 'dashboard':
      return (
        <svg className="sidebar__icon" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="8" height="8" rx="2" />
          <rect x="13" y="3" width="8" height="8" rx="2" />
          <rect x="3" y="13" width="8" height="8" rx="2" />
          <rect x="13" y="13" width="8" height="8" rx="2" />
        </svg>
      )
    case 'bewerbungen':
      return (
        <svg className="sidebar__icon" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      )
    case 'mitarbeiter':
      return (
        <svg className="sidebar__icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="8" cy="8" r="3" />
          <circle cx="16" cy="8" r="3" />
          <path d="M3 19c0-3 3-5 5-5s5 2 5 5" />
          <path d="M11 19c0-3 3-5 5-5s5 2 5 5" />
        </svg>
      )
    case 'kyc':
      return (
        <svg className="sidebar__icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l7 3v6c0 5-3 7-7 9-4-2-7-4-7-9V6l7-3z" />
          <path d="M8 12l3 3 5-5" />
        </svg>
      )
    case 'tasks':
      return (
        <svg className="sidebar__icon" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 7h8M8 11h8M8 15h6" />
        </svg>
      )
    case 'ident':
      return (
        <svg className="sidebar__icon" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <circle cx="9" cy="12" r="2" />
          <path d="M13 10h5M13 14h4" />
        </svg>
      )
    case 'bewertungen':
      return (
        <svg className="sidebar__icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 16l-4.9 2.5.9-5.5-4-3.9 5.5-.8L12 3z" />
        </svg>
      )
    case 'auftraege':
      return (
        <svg className="sidebar__icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16v12H4z" />
          <path d="M4 7l4-4h8l4 4" />
        </svg>
      )
    case 'stellenanzeigen':
      return (
        <svg className="sidebar__icon" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M8 9h8M8 13h6" />
        </svg>
      )
    case 'caller':
      return (
        <svg className="sidebar__icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 6c0 7 7 14 14 14l2-2-4-4-2 2c-2-1-4-3-5-5l2-2-4-4-3 1z" />
        </svg>
      )
    case 'telefonnummern':
      return (
        <svg className="sidebar__icon" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="6" y="3" width="12" height="18" rx="2" />
          <path d="M9 7h6M9 11h6M9 15h4" />
        </svg>
      )
    case 'bankdrops':
      return (
        <svg className="sidebar__icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 9l9-5 9 5" />
          <path d="M5 9v9M9 9v9M15 9v9M19 9v9" />
          <path d="M4 18h16" />
        </svg>
      )
    case 'ai':
      return (
        <svg className="sidebar__icon" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="6" y="6" width="12" height="12" rx="3" />
          <path d="M9 9h6M9 12h6M9 15h6" />
        </svg>
      )
    case 'chat':
      return (
        <svg className="sidebar__icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5h16v10H7l-3 4z" />
        </svg>
      )
    case 'mail':
      return (
        <svg className="sidebar__icon" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 7l9 7 9-7" />
        </svg>
      )
    case 'provider':
      return (
        <svg className="sidebar__icon" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h6" />
        </svg>
      )
    case 'settings':
      return (
        <svg className="sidebar__icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <path d="M4 12h2m12 0h2M12 4v2m0 12v2M6.5 6.5l1.4 1.4m8.2 8.2 1.4 1.4M6.5 17.5l1.4-1.4m8.2-8.2 1.4-1.4" />
        </svg>
      )
    default:
      return null
  }
}

function App() {
  const [employees, setEmployees] = useState(initialEmployees)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function handleAddEmployee(employee) {
    setEmployees((prev) => [employee, ...prev])
  }

  return (
    <div className={`app ${isMobileMenuOpen ? 'app--menu-open' : ''}`}>
      <button
        className="sidebar-backdrop"
        type="button"
        aria-label="Menue schliessen"
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <aside className="sidebar">
        <div className="sidebar__brand">
          <span>JJPanel</span>
        </div>
        <nav
          className="sidebar__nav"
          onClick={(event) => {
            if (event.target.closest('.sidebar__link')) {
              setIsMobileMenuOpen(false)
            }
          }}
        >
          <p className="sidebar__label">Uebersicht</p>
          <NavLink className="sidebar__link" to="/" end>
            <SidebarIcon name="dashboard" />
            Dashboard
          </NavLink>
          <NavLink className="sidebar__link" to="/bewerbungen">
            <SidebarIcon name="bewerbungen" />
            Bewerbungen
            <span className="badge badge--alert">1</span>
          </NavLink>
          <NavLink className="sidebar__link" to="/mitarbeiter">
            <SidebarIcon name="mitarbeiter" />
            Mitarbeiter
          </NavLink>

          <p className="sidebar__label">Anfragen</p>
          <NavLink className="sidebar__link" to="/kyc-pruefung">
            <SidebarIcon name="kyc" />
            KYC-Pruefung
            <span className="badge badge--danger">3</span>
          </NavLink>
          <NavLink className="sidebar__link" to="/aufgaben-pruefung">
            <SidebarIcon name="tasks" />
            Aufgaben-Pruefung
          </NavLink>
          <NavLink className="sidebar__link" to="/ident-anfragen">
            <SidebarIcon name="ident" />
            Ident-Anfragen
          </NavLink>
          <NavLink className="sidebar__link" to="/bewertungen">
            <SidebarIcon name="bewertungen" />
            Bewertungen
          </NavLink>

          <p className="sidebar__label">Verwaltung</p>
          <NavLink className="sidebar__link" to="/auftraege">
            <SidebarIcon name="auftraege" />
            Auftraege
          </NavLink>
          <NavLink className="sidebar__link" to="/stellenanzeigen">
            <SidebarIcon name="stellenanzeigen" />
            Stellenanzeigen
          </NavLink>
          <NavLink className="sidebar__link" to="/caller">
            <SidebarIcon name="caller" />
            Caller
          </NavLink>
          <NavLink className="sidebar__link" to="/telefonnummern">
            <SidebarIcon name="telefonnummern" />
            Telefonnummern
          </NavLink>
          <NavLink className="sidebar__link" to="/bankdrops">
            <SidebarIcon name="bankdrops" />
            Bankdrops
          </NavLink>

          <p className="sidebar__label">Einstellungen</p>
          <NavLink className="sidebar__link" to="/ai-chat-agent">
            <SidebarIcon name="ai" />
            AI Chat Agent
          </NavLink>
          <NavLink className="sidebar__link" to="/chat-ueberwachung">
            <SidebarIcon name="chat" />
            Chat Ueberwachung
          </NavLink>
          <NavLink className="sidebar__link" to="/email-verlauf">
            <SidebarIcon name="mail" />
            E-Mail Verlauf
          </NavLink>
          <NavLink className="sidebar__link" to="/email-anbieter">
            <SidebarIcon name="provider" />
            E-Mail Anbieter
          </NavLink>
          <NavLink className="sidebar__link" to="/einstellungen">
            <SidebarIcon name="settings" />
            Einstellungen
          </NavLink>
        </nav>
        <div className="sidebar__footer">
          <div className="avatar">A</div>
          <div>
            <div className="sidebar__name">admin</div>
            <div className="sidebar__role">Administrator</div>
          </div>
        </div>
      </aside>

      <main className="content">
        <header className="topbar">
          <button
            className="icon-btn mobile-menu-btn"
            type="button"
            aria-label="Menue oeffnen"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            ☰
          </button>
          <div className="search">
            <input
              type="text"
              placeholder="Mitarbeiter, Bankdrops, Aufgaben..."
            />
          </div>
          <div className="topbar__actions">
            <button className="icon-btn" aria-label="Benachrichtigungen">
              <ToolbarIcon name="bell" />
              <span className="badge badge--danger badge--dot">7</span>
            </button>
            <button className="icon-btn" aria-label="Hilfe">
              <ToolbarIcon name="help" />
            </button>
            <button className="icon-btn" aria-label="Theme">
              <ToolbarIcon name="theme" />
            </button>
            <button className="icon-btn" aria-label="Einstellungen">
              <ToolbarIcon name="settings" />
            </button>
            <button className="avatar">A</button>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/bewerbungen" element={<BewerbungenPage />} />
          <Route path="/bewerbungen/details" element={<BewerbungenDetailsPage />} />
          <Route path="/mitarbeiter" element={<MitarbeiterPage employees={employees} onAddEmployee={handleAddEmployee} />} />
          <Route path="/mitarbeiter/:employeeId" element={<MitarbeiterDetailsPage employees={employees} />} />
          <Route path="/mitarbeiter/:employeeId/bearbeiten" element={<MitarbeiterEditPage employees={employees} />} />
          <Route path="/kyc-pruefung" element={<KycPruefungPage />} />
          <Route path="/aufgaben-pruefung" element={<AufgabenPruefungPage />} />
          <Route path="/ident-anfragen" element={<IdentAnfragenPage />} />
          <Route path="/bewertungen" element={<BewertungenPage />} />
          <Route path="/auftraege" element={<AufgabenvorlagenPage />} />
          <Route path="/auftraege/neu" element={<AufgabenvorlageNeuPage />} />
          <Route path="/auftraege/:templateId" element={<AufgabenvorlageDetailsPage />} />
          <Route path="/stellenanzeigen" element={<StellenanzeigenPage />} />
          <Route path="/stellenanzeigen/neu" element={<NeueStellenanzeigePage />} />
          <Route path="/caller" element={<CallerPage />} />
          <Route path="/telefonnummern" element={<TelefonnummernPage />} />
          <Route path="/bankdrops" element={<BankdropsPage />} />
          <Route path="/ai-chat-agent" element={<PlaceholderPage title="AI Chat Agent" />} />
          <Route path="/chat-ueberwachung" element={<PlaceholderPage title="Chat Ueberwachung" />} />
          <Route path="/email-verlauf" element={<PlaceholderPage title="E-Mail Verlauf" />} />
          <Route path="/email-anbieter" element={<PlaceholderPage title="E-Mail Anbieter" />} />
          <Route path="/einstellungen" element={<PlaceholderPage title="Einstellungen" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App




