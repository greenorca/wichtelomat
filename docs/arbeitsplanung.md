# Arbeitsplanung – Wichtelomat

> Modul 210 · LB-Projektarbeit · WISS  
> Erstellt: 22.06.2026  
> Abgabe: 27. Juni 2026, 14:30

---

## Zeitplan Übersicht

| Phase | Tasks | Geschätzte Zeit |
|---|---|---|
| 1 – Planung & Setup | Doku, Git, Supabase-Projekt | 3h |
| 2 – Datenbank | Migrations, RLS, RPC | 4h |
| 3 – Auth & Frontend-Setup | Vite, Routing, AuthContext | 3h |
| 4 – Core Features | CRUD-Services, Hauptseiten | 8h |
| 5 – Auslosung & E-Mail | RPC testen, Edge Function | 3h |
| 6 – Einladungs-Flow | Invitation-Seite, Gast-Beitritt | 2h |
| 7 – CI/CD & Docker | GitHub Actions, Dockerfile | 2h |
| 8 – Abschluss | Review, README, Abgabe | 2h |
| **Total** | | **~27h** |

---

## Detaillierte Arbeitspakete

### Phase 1 – Planung & Setup

| # | Task | Geschätzt | Effektiv | Datum | Status |
|---|---|---|---|---|---|
| WO-00000 | Initial Commit, Git-Branches anlegen | 0.5h | | | ✅ |
| WO-00001 | .gitignore erstellen | 0.25h | | | ✅ |
| WO-00002 | README.md (Projekt Pitch) erstellen | 0.5h | | | ✅ |
| WO-00003 | User Stories dokumentieren | 1h | | | ✅ |
| WO-00004 | Datenmodell dokumentieren | 0.5h | | | ✅ |
| WO-00005 | Arbeitsplanung erstellen | 0.25h | | | ✅ |
| WO-00006 | Supabase Projekt erstellen + CLI einrichten | 0.5h | | | |

---

### Phase 2 – Datenbank

| # | Task | Geschätzt | Effektiv | Datum | Status |
|---|---|---|---|---|---|
| WO-00007 | Migration-Datei anlegen | 0.25h | | | |
| WO-00008 | Enums erstellen (action_status, role_in_action, invitation_status) | 0.25h | | | |
| WO-00009 | Tabellen erstellen (wichtel_aktionen, memberships) | 0.5h | | | |
| WO-00010 | Tabellen erstellen (exclusions, assignments, wishlists) | 0.5h | | | |
| WO-00011 | Tabellen erstellen (invitations, member_access_tokens) | 0.25h | | | |
| WO-00012 | RLS aktivieren für alle Tabellen | 0.25h | | | |
| WO-00013 | RLS Policies – wichtel_aktionen | 0.5h | | | |
| WO-00014 | RLS Policies – memberships | 0.5h | | | |
| WO-00015 | RLS Policies – assignments, wishlists, invitations | 0.5h | | | |
| WO-00016 | RPC Funktion draw_assignments implementieren | 1h | | | |
| WO-00017 | Migration auf Supabase anwenden (supabase db push) | 0.25h | | | |

---

### Phase 3 – Auth & Frontend-Setup

| # | Task | Geschätzt | Effektiv | Datum | Status |
|---|---|---|---|---|---|
| WO-00018 | Vite + React Projekt erstellen, Dependencies installieren | 0.5h | | | |
| WO-00019 | Supabase Client initialisieren (supabaseClient.js) | 0.25h | | | |
| WO-00020 | i18n konfigurieren + Übersetzungsdateien (DE/EN) | 0.5h | | | |
| WO-00021 | Design-Tokens erstellen (tokens.css, global.css) | 0.5h | | | |
| WO-00022 | Ordnerstruktur anlegen | 0.25h | | | |
| WO-00023 | AuthContext.jsx implementieren | 0.5h | | | |
| WO-00024 | App.jsx mit Routing und ProtectedRoute | 0.5h | | | |

---

### Phase 4 – Core Features

| # | Task | Geschätzt | Effektiv | Datum | Status |
|---|---|---|---|---|---|
| WO-00025 | authService.js (register, login, logout, reset, profil) | 0.75h | | | |
| WO-00026 | LoginPage.jsx | 0.5h | | | |
| WO-00027 | RegisterPage.jsx | 0.5h | | | |
| WO-00028 | ForgotPasswordPage.jsx + ResetPasswordPage.jsx | 0.5h | | | |
| WO-00029 | actionsService.js (CRUD) | 0.75h | | | |
| WO-00030 | ActionsListPage.jsx | 0.75h | | | |
| WO-00031 | CreateActionPage.jsx | 0.5h | | | |
| WO-00032 | memberService.js (getMembers, removeMember) | 0.5h | | | |
| WO-00033 | wishlistService.js (getWishlist, saveWishlist) | 0.5h | | | |
| WO-00034 | ActionDetailPage.jsx – Tab Mitglieder | 1h | | | |
| WO-00035 | ActionDetailPage.jsx – Tab Ausschlüsse | 1h | | | |
| WO-00036 | ActionDetailPage.jsx – Tab Vorgaben | 0.5h | | | |
| WO-00037 | ActionDetailPage.jsx – Tab Wunschzettel | 0.5h | | | |
| WO-00038 | ActionDetailPage.jsx – Tab Zuweisung | 0.5h | | | |
| WO-00039 | Modal-Komponente für Bestätigungsdialoge | 0.5h | | | |

---

### Phase 5 – Auslosung & E-Mail

| # | Task | Geschätzt | Effektiv | Datum | Status |
|---|---|---|---|---|---|
| WO-00040 | drawService.js (RPC-Aufruf) | 0.25h | | | |
| WO-00041 | Auslosung in ActionDetailPage integrieren + testen | 0.5h | | | |
| WO-00042 | Edge Function send-assignment-email erstellen | 1h | | | |
| WO-00043 | Resend Account einrichten + API Key | 0.25h | | | |
| WO-00044 | Edge Function deployen + testen | 0.5h | | | |
| WO-00045 | assignmentService.js (getMyAssignment) | 0.5h | | | |

---

### Phase 6 – Einladungs-Flow

| # | Task | Geschätzt | Effektiv | Datum | Status |
|---|---|---|---|---|---|
| WO-00046 | invitationService.js (Einladung erstellen, Token prüfen) | 0.5h | | | |
| WO-00047 | InvitationPage.jsx (Gast / Login / Register Optionen) | 1h | | | |
| WO-00048 | Einladungs-Flow testen (E-Mail + Link) | 0.5h | | | |

---

### Phase 7 – CI/CD & Docker

| # | Task | Geschätzt | Effektiv | Datum | Status |
|---|---|---|---|---|---|
| WO-00049 | frontend-ci.yml erstellen | 0.25h | | | |
| WO-00050 | supabase-deploy.yml erstellen | 0.25h | | | |
| WO-00051 | GitHub Secrets konfigurieren | 0.25h | | | |
| WO-00052 | CI Pipelines testen (grüner Build) | 0.25h | | | |
| WO-00053 | Dockerfile (Frontend, mehrstufig) erstellen | 0.5h | | | |
| WO-00054 | nginx.conf erstellen | 0.25h | | | |
| WO-00055 | docker-compose.yml erstellen | 0.25h | | | |
| WO-00056 | Docker-Build lokal testen | 0.25h | | | |

---

### Phase 8 – Abschluss

| # | Task | Geschätzt | Effektiv | Datum | Status |
|---|---|---|---|---|---|
| WO-00057 | README.md vervollständigen (Architektur, Deployment, Review) | 0.5h | | | |
| WO-00058 | Kritischen Review schreiben | 0.5h | | | |
| WO-00059 | Vollständigen End-to-End-Test durchführen | 0.5h | | | |
| WO-00060 | .env-Datei für Lehrer vorbereiten | 0.25h | | | |
| WO-00061 | Finaler Commit + Tag, Abgabe | 0.25h | | | |

---

## Stundenprotokoll

*Wird laufend ausgefüllt während der Arbeit.*

| Datum | Task-Nr. | Beschreibung | Geschätzt | Effektiv | Differenz |
|---|---|---|---|---|---|
| 22.06.2026 | WO-00000 | Initial Commit, Git-Branches | 0.5h | | |
| 22.06.2026 | WO-00001 | .gitignore | 0.25h | | |
| 22.06.2026 | WO-00002 | README.md | 0.5h | | |
| 22.06.2026 | WO-00003 | User Stories | 1h | | |
| 22.06.2026 | WO-00004 | Datenmodell | 0.5h | | |
| 22.06.2026 | WO-00005 | Arbeitsplanung | 0.25h | | |
| | | | | | |
| | | **Total** | **~27h** | | |

---

## Hinweise

- Die Ticketnummern (WO-XXXXX) entsprechen den Commit-Messages im Format `task/WO-XXXXX: beschreibung`
- Effektive Zeiten werden laufend eingetragen
- Abweichungen von mehr als 50% werden im kritischen Review begründet
