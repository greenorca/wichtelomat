# Datenmodell – Wichtelomat

> Modul 210 · LB-Projektarbeit · WISS  
> Erstellt: 22.06.2026

---

## Übersicht Entitäten

```
auth.users (Supabase intern)
    │
    ├──< wichtel_aktionen (created_by)
    │         │
    │         ├──< memberships (action_id)
    │         │         │
    │         │         ├──< exclusions (giver_membership_id)
    │         │         ├──< exclusions (excluded_membership_id)
    │         │         ├──< assignments (giver_membership_id)
    │         │         ├──< assignments (receiver_membership_id)
    │         │         ├──< wishlists (membership_id) [1:1]
    │         │         └──< member_access_tokens (membership_id)
    │         │
    │         └──< invitations (action_id)
    │
    └── (user_id in memberships)
```

---

## Enums

| Enum | Werte |
|---|---|
| `action_status` | `SETUP`, `ACTIVE`, `COMPLETED`, `CANCELLED` |
| `role_in_action` | `ADMIN`, `MEMBER` |
| `invitation_status` | `PENDING`, `ACCEPTED`, `EXPIRED` |

---

## Tabellen

### wichtel_aktionen
Die zentrale Tabelle. Jede Wichtelaktion hat genau einen Admin (created_by).

| Feld | Typ | Constraint | Beschreibung |
|---|---|---|---|
| id | UUID | PK, DEFAULT gen_random_uuid() | Eindeutige ID |
| name | TEXT | NOT NULL | Name der Aktion |
| status | action_status | NOT NULL, DEFAULT 'SETUP' | Lifecycle-Status |
| max_cost | NUMERIC(10,2) | nullable | Max. Geschenkkosten (optional) |
| handover_date | DATE | NOT NULL | Übergabedatum (Pflichtfeld) |
| created_by | UUID | FK → auth.users | Ersteller / Aktionsadmin |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Erstellzeitpunkt |

---

### memberships
Verbindet User mit Aktionen. Ein User kann in mehreren Aktionen sein.

| Feld | Typ | Constraint | Beschreibung |
|---|---|---|---|
| id | UUID | PK | Eindeutige ID |
| action_id | UUID | FK → wichtel_aktionen | Zugehörige Aktion |
| user_id | UUID | FK → auth.users, nullable | Registrierter User (null bei Gästen) |
| role_in_action | role_in_action | NOT NULL, DEFAULT 'MEMBER' | Rolle in dieser Aktion |
| is_guest | BOOLEAN | NOT NULL, DEFAULT FALSE | Gast-Kennzeichnung |
| guest_email | TEXT | nullable | E-Mail von Gästen |
| joined_at | TIMESTAMPTZ | DEFAULT NOW() | Beitrittszeitpunkt |

**Unique Constraint:** `(action_id, user_id)`

---

### exclusions
Definiert wer wem nicht wichteln darf.

| Feld | Typ | Constraint | Beschreibung |
|---|---|---|---|
| id | UUID | PK | Eindeutige ID |
| action_id | UUID | FK → wichtel_aktionen | Zugehörige Aktion |
| giver_membership_id | UUID | FK → memberships | Das Mitglied das nicht wichteln darf |
| excluded_membership_id | UUID | FK → memberships | Das ausgeschlossene Ziel-Mitglied |

**Unique Constraint:** `(action_id, giver_membership_id, excluded_membership_id)`  
**Bedeutung:** "giver darf excluded nicht wichteln"

---

### assignments
Das Ergebnis der Auslosung. Entsteht erst beim Starten der Aktion.

| Feld | Typ | Constraint | Beschreibung |
|---|---|---|---|
| id | UUID | PK | Eindeutige ID |
| action_id | UUID | FK → wichtel_aktionen | Zugehörige Aktion |
| giver_membership_id | UUID | FK → memberships, UNIQUE | Wer wichtelt |
| receiver_membership_id | UUID | FK → memberships, UNIQUE | Wem gewichtelt wird |

**Regel:** Pro Aktion hat jedes Mitglied genau eine Zuweisung als Giver und genau eine als Receiver.

---

### wishlists
Aktionsspezifischer Wunschzettel. 1:1 mit Membership.

| Feld | Typ | Constraint | Beschreibung |
|---|---|---|---|
| id | UUID | PK | Eindeutige ID |
| membership_id | UUID | FK → memberships, UNIQUE | Aktionsspezifisch (1:1) |
| content | TEXT | DEFAULT '' | Wunschtext |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Letzte Änderung |

**Wichtig:** Wunschzettel werden beim Löschen der Membership automatisch mitgelöscht (ON DELETE CASCADE). Ein User hat keinen globalen Wunschzettel – jede Aktion hat einen eigenen.

---

### invitations
Einladungs-Tokens für den Beitritt zur Aktion.

| Feld | Typ | Constraint | Beschreibung |
|---|---|---|---|
| id | UUID | PK | Eindeutige ID |
| action_id | UUID | FK → wichtel_aktionen | Zugehörige Aktion |
| email | TEXT | NOT NULL | Eingeladene E-Mail-Adresse |
| token | TEXT | UNIQUE, DEFAULT gen_random_uuid() | Einladungs-Token im Link |
| status | invitation_status | NOT NULL, DEFAULT 'PENDING' | Status der Einladung |
| expires_at | TIMESTAMPTZ | DEFAULT NOW() + 3 months | Ablaufzeitpunkt |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Erstellzeitpunkt |

---

### member_access_tokens
Persönliche Zugangslinks für Gäste, damit sie ihre Zuweisung in der App einsehen können.

| Feld | Typ | Constraint | Beschreibung |
|---|---|---|---|
| id | UUID | PK | Eindeutige ID |
| membership_id | UUID | FK → memberships | Zugehörige Membership |
| token | TEXT | UNIQUE, DEFAULT gen_random_uuid() | Persönlicher Zugangstoken |
| expires_at | TIMESTAMPTZ | DEFAULT NOW() + 1 year | Ablaufzeitpunkt |

---

## Löschverhalten (ON DELETE CASCADE)

Wenn eine `wichtel_aktion` gelöscht wird, werden automatisch gelöscht:
- alle `memberships` dieser Aktion
  - alle `exclusions` dieser Memberships
  - alle `assignments` dieser Memberships
  - alle `wishlists` dieser Memberships
  - alle `member_access_tokens` dieser Memberships
- alle `invitations` dieser Aktion

**Benutzerkonten (`auth.users`) bleiben immer erhalten.**

---

## Row Level Security (RLS)

Alle Tabellen haben RLS aktiviert. Die Policies stellen sicher:

| Tabelle | Regel |
|---|---|
| wichtel_aktionen | User sieht nur Aktionen wo er Mitglied ist |
| memberships | User sieht nur Mitglieder seiner eigenen Aktionen |
| assignments | User sieht NUR seine eigene Zuweisung (wem er wichtelt) |
| wishlists | User sieht eigenen Wunschzettel + Wunschzettel seines Zugeteilten |
| invitations | Öffentlich lesbar (für Einladungslink-Flow) |

Die Auslosung läuft als `SECURITY DEFINER` RPC-Funktion (`draw_assignments`) – sie umgeht RLS mit Datenbankrechten und ist damit die einzige Stelle wo Assignments geschrieben werden können.
