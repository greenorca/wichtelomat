# User Stories – Wichtelomat

> Modul 210 · LB-Projektarbeit · WISS  
> Erstellt: 22.06.2026

---

## Akteure

| Akteur | Beschreibung |
|---|---|
| **Gast** | Nicht registriert. Tritt einer Aktion nur mit E-Mail-Adresse bei. Erhält persönlichen Zugangslink. |
| **Mitglied** | Registrierter Benutzer mit Konto (E-Mail + Passwort). |
| **Aktionsadmin** | Mitglied mit Verwaltungsrechten für seine Aktion. Spielt selbst mit. |
| **System** | Automatisierte Abläufe (Auslosung, E-Mail-Versand, Abschluss bei Übergabedatum). |

---

## Aktions-Lifecycle

```
SETUP → ACTIVE → COMPLETED
                ↘ CANCELLED
```

| Status | Bedeutung |
|---|---|
| **SETUP** | Einrichtung: Admin lädt ein, Mitglieder treten bei, Wunschzettel werden ausgefüllt. Noch nicht ausgelost. |
| **ACTIVE** | Auslosung erfolgreich. Zuweisungen stehen fest, Wunschzettel gesperrt. |
| **COMPLETED** | Übergabedatum erreicht. Automatisch vom System gesetzt. |
| **CANCELLED** | Vom Admin abgebrochen. Aktionsspezifische Daten gelöscht. |

---

## UC-01: Registrieren

**Akteur:** Gast  
**Vorbedingung:** Keine.

**Hauptablauf:**
1. Gast gibt Name, E-Mail und Passwort an.
2. System prüft ob die E-Mail frei ist.
3. System erstellt das Konto und sendet Bestätigungs-E-Mail.

**Alternativablauf:** E-Mail bereits vergeben → Fehlermeldung, kein Konto erstellt.

**Nachbedingung:** Konto existiert, Benutzer kann sich anmelden.

**Akzeptanzkriterien:**
- Passwort muss mindestens 8 Zeichen haben
- E-Mail muss gültig sein (Format-Validierung)
- Fehlermeldung wenn E-Mail bereits registriert

---

## UC-02: Anmelden

**Akteur:** Mitglied  
**Vorbedingung:** Konto existiert und ist bestätigt.

**Hauptablauf:**
1. Mitglied gibt E-Mail und Passwort ein.
2. System validiert die Daten.
3. System stellt Session aus (JWT via Supabase Auth).

**Alternativablauf:** Falsche Daten → Fehlermeldung. Zu viele Fehlversuche → temporäre Sperre.

**Nachbedingung:** Mitglied ist angemeldet, Session aktiv.

**Akzeptanzkriterien:**
- Fehlermeldung bei falschen Zugangsdaten (ohne Angabe ob E-Mail oder Passwort falsch)
- Nach Login Weiterleitung zur Aktionsliste

---

## UC-03: Passwort zurücksetzen

**Akteur:** Mitglied  
**Vorbedingung:** Konto existiert.

**Hauptablauf:**
1. Mitglied klickt "Passwort vergessen" und gibt E-Mail ein.
2. System sendet E-Mail mit zeitlich begrenztem Reset-Link (via Supabase Auth).
3. Mitglied klickt Link und setzt neues Passwort.

**Alternativablauf:** Link abgelaufen → Fehlermeldung, neue Anforderung nötig.

**Nachbedingung:** Neues Passwort aktiv, Link verbraucht.

**Akzeptanzkriterien:**
- Reset-Link ist nur einmal verwendbar
- Kein Hinweis ob E-Mail im System existiert (Sicherheit)

---

## UC-04: Profil verwalten

**Akteur:** Mitglied  
**Vorbedingung:** Angemeldet.

**Hauptablauf:**
1. Mitglied ändert Name, E-Mail oder Passwort.
2. System validiert und speichert.

**Alternativablauf:** Neue E-Mail bereits vergeben → Fehlermeldung.

**Nachbedingung:** Profil aktualisiert.

**Akzeptanzkriterien:**
- Alle drei Felder (Name, E-Mail, Passwort) einzeln änderbar
- Passwort-Änderung erfordert Bestätigung des neuen Passworts

---

## UC-05: Wichtelaktion erstellen

**Akteur:** Mitglied  
**Vorbedingung:** Angemeldet.

**Hauptablauf:**
1. Mitglied gibt Name der Aktion und Übergabedatum an (Pflicht), optional max. Kosten.
2. System legt Aktion im Status SETUP an.
3. Ersteller wird automatisch Aktionsadmin und erstes Mitglied.

**Nachbedingung:** Aktion existiert im Status SETUP, Ersteller ist Admin und Mitglied.

**Akzeptanzkriterien:**
- Übergabedatum ist Pflichtfeld, max. Kosten optional
- Aktionsname darf nicht leer sein
- Nach Erstellung Weiterleitung zur Aktionsdetail-Seite

---

## UC-06: Mitglieder einladen

**Akteur:** Aktionsadmin  
**Vorbedingung:** Aktion im Status SETUP.

**Hauptablauf:**
1. Admin gibt eine oder mehrere E-Mail-Adressen ein.
2. System erstellt pro Einladung einen Token (gültig 3 Monate) und sendet E-Mail.
3. Alternativ: Admin kopiert einen teilbaren Einladungslink.

**Alternativablauf:** E-Mail bereits eingeladen oder Mitglied → Hinweis.

**Nachbedingung:** Einladung(en) im Status PENDING.

**Akzeptanzkriterien:**
- Einladungslink kann über beliebige Kanäle geteilt werden (WhatsApp, etc.)
- Einladungen laufen nach 3 Monaten ab
- Bereits eingeladene E-Mails werden erkannt

---

## UC-07: Einladung annehmen

**Akteur:** Gast oder Mitglied  
**Vorbedingung:** Gültige, nicht abgelaufene Einladung. Aktion in SETUP.

**Hauptablauf:**
1. Empfänger öffnet den Einladungslink.
2. Wählt eine Option:
   - **(a) Als Gast beitreten** – nur E-Mail angeben (bei Mail-Einladung vorausgefüllt)
   - **(b) Anmelden** – mit bestehendem Konto
   - **(c) Registrieren** – neues Konto erstellen
3. System fügt ihn der Aktion als Mitglied hinzu.

**Alternativablauf:** Link abgelaufen → Fehlermeldung. Aktion nicht mehr in SETUP → Beitritt abgelehnt.

**Nachbedingung:** Empfänger ist Mitglied, Einladung auf ACCEPTED gesetzt.

**Akzeptanzkriterien:**
- Gäste müssen immer eine E-Mail angeben
- Alle drei Optionen (Gast, Login, Register) auf der Seite sichtbar
- Abgelaufene Links zeigen klare Fehlermeldung

---

## UC-08: Ausschlüsse festlegen

**Akteur:** Aktionsadmin  
**Vorbedingung:** Aktion in SETUP.

**Hauptablauf:**
1. Admin wählt pro Mitglied beliebig viele andere Mitglieder, denen es nicht wichteln darf.
2. System speichert die Ausschlüsse.

**Nachbedingung:** Ausschlüsse gespeichert, werden bei Auslosung berücksichtigt.

**Akzeptanzkriterien:**
- Beliebig viele Ausschlüsse pro Mitglied möglich
- Ausschlüsse können auch wieder entfernt werden

---

## UC-09: Mitglied entfernen

**Akteur:** Aktionsadmin  
**Vorbedingung:** Aktion in SETUP.

**Hauptablauf:**
1. Admin wählt ein Mitglied aus.
2. System zeigt Bestätigungsdialog: *"Wollen Sie dieses Mitglied endgültig aus der Aktion entfernen?"*
3. Admin bestätigt → Mitgliedschaft, Ausschlüsse und Wunschzettel werden gelöscht (Transaktion via ON DELETE CASCADE).

**Alternativablauf:** Admin bricht ab → keine Änderung.

**Nachbedingung:** Mitglied nicht mehr Teil der Aktion. Benutzerkonto bleibt erhalten.

**Akzeptanzkriterien:**
- Bestätigungsdialog immer anzeigen (keine versehentliche Löschung)
- Admin kann sich nicht selbst entfernen

---

## UC-10: Wunschzettel ausfüllen

**Akteur:** Mitglied  
**Vorbedingung:** Aktion in SETUP.

**Hauptablauf:**
1. Mitglied füllt Wunschzettel aus. Hinweis im Formular: *"Nur bis zum Aktionsstart bearbeitbar."*
2. System speichert den Wunschzettel.

**Alternativablauf:** Aktion bereits ACTIVE → Eingabefeld gesperrt, Hinweis anzeigen.

**Nachbedingung:** Wunschzettel gespeichert (aktionsspezifisch).

**Akzeptanzkriterien:**
- Hinweis auf Sperrung nach Aktionsstart immer sichtbar
- Speichern-Button deaktiviert wenn Aktion ACTIVE

---

## UC-11: Aktionsvorgaben festlegen

**Akteur:** Aktionsadmin  
**Vorbedingung:** Aktion in SETUP.

**Hauptablauf:**
1. Admin setzt Übergabedatum (Pflicht) und optional maximale Geschenkkosten.
2. System speichert die Vorgaben.

**Alternativablauf:** Kein Übergabedatum → Aktion kann nicht gestartet werden.

**Nachbedingung:** Vorgaben gespeichert.

**Akzeptanzkriterien:**
- Übergabedatum ist Pflichtfeld (Start-Button gesperrt ohne Datum)
- Max. Kosten sind optional (kein Limit wenn leer)

---

## UC-12: Auslosung starten

**Akteur:** Aktionsadmin  
**Vorbedingung:** Aktion in SETUP, mindestens 2 Mitglieder, Übergabedatum gesetzt.

**Hauptablauf:**
1. Admin klickt "Aktion starten".
2. System berechnet via PostgreSQL RPC-Funktion eine gültige Zuweisung (alle Ausschlüsse respektiert, keine Selbst-Zuweisung).
3. Status wechselt auf ACTIVE, Wunschzettel werden gesperrt.
4. Jedes Mitglied erhält E-Mail mit Zuweisung, Wunschzettel, Übergabedatum und max. Kosten.

**Alternativablauf:** Keine gültige Lösung möglich (zu viele Ausschlüsse) → Fehlermeldung *"Zu viele Ausschlüsse – bitte überarbeiten."* Status bleibt SETUP, nichts wird gespeichert (Transaktion rollback).

**Nachbedingung:** Zuweisungen gespeichert, Aktion ACTIVE, Wunschzettel gesperrt.

**Akzeptanzkriterien:**
- Start-Button nur aktiv wenn: SETUP + mind. 2 Mitglieder + Übergabedatum vorhanden
- Bei Fehler bleibt Aktion in SETUP (kein Datenverlust)
- Alle Mitglieder erhalten E-Mail

---

## UC-13: Eigene Zuweisung ansehen

**Akteur:** Mitglied (inkl. Aktionsadmin), Gast  
**Vorbedingung:** Aktion ACTIVE.

**Hauptablauf:**
1. Mitglied öffnet die Aktion (Gast über persönlichen Zugangslink aus E-Mail).
2. System zeigt ausschliesslich die eigene Zuweisung: wem man wichtelt, dessen Wunschzettel, Übergabedatum und max. Kosten.

**Nachbedingung:** Keine Änderung.

**Akzeptanzkriterien:**
- Jedes Mitglied sieht NUR seine eigene Zuweisung (auch der Admin)
- Kein Mitglied kann die Gesamtübersicht aller Zuweisungen sehen
- RLS auf DB-Ebene erzwingt das technisch

---

## UC-14: Aktion abbrechen

**Akteur:** Aktionsadmin  
**Vorbedingung:** Aktion existiert (beliebiger Status).

**Hauptablauf:**
1. Admin wählt "Aktion abbrechen".
2. System zeigt Bestätigungsdialog.
3. Nach Bestätigung: alle aktionsspezifischen Daten werden gelöscht (Aktion, Memberships, Ausschlüsse, Assignments, Wunschzettel, Einladungen, Tokens) via ON DELETE CASCADE.

**Nachbedingung:** Aktion und alle zugehörigen Daten gelöscht. Benutzerkonten bleiben erhalten.

**Akzeptanzkriterien:**
- Bestätigungsdialog zwingend
- Benutzerkonten und Profile bleiben erhalten
- Vollständiger Datenlöschung via Datenbank-Cascade

---

## UC-15: Aktion abschliessen

**Akteur:** System  
**Vorbedingung:** Aktion ACTIVE, Übergabedatum erreicht.

**Hauptablauf:**
1. System erkennt das erreichte Übergabedatum und setzt Status auf COMPLETED.

**Nachbedingung:** Aktion COMPLETED.

**Akzeptanzkriterien:**
- Automatischer Übergang ohne manuellen Eingriff
- COMPLETED-Aktionen sind noch lesbar (Zuweisung einsehbar)
