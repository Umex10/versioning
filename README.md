
# Versionierung – Beispielprojekt

## Projektbeschreibung

Dieses Projekt demonstriert das Konzept der API-Versionierung anhand eines einfachen Task-Management-Systems. Es gibt zwei API-Versionen (V1 und V2), die jeweils unterschiedliche Datenmodelle und Endpunkte bereitstellen. Ziel ist es, zu zeigen, wie sich APIs und Datenstrukturen im Laufe der Zeit weiterentwickeln können, ohne bestehende Funktionalität zu verlieren.

### Was ist Versionierung?
Versionierung in Webservices bedeutet, dass verschiedene Versionen einer API parallel existieren können. So können alte Clients weiterhin mit der alten Version arbeiten, während neue Features in einer neuen Version bereitgestellt werden.

---

## Startanleitung

### Voraussetzungen
- Node.js und npm müssen installiert sein

### Backend starten
1. In das Backend-Verzeichnis wechseln:
	```bash
	cd backend
	```
2. Abhängigkeiten installieren:
	```bash
	npm install
	```
3. Backend-Server starten:
	```bash
	npm run dev
	```
	Der Server läuft auf http://localhost:5000

### Frontend starten
1. In das Frontend-Verzeichnis wechseln:
	```bash
	cd frontend
	```
2. Abhängigkeiten installieren:
	```bash
	npm install
	```
3. Frontend-Entwicklungsserver starten:
	```bash
	npm run dev
	```
	Die Anwendung ist dann unter http://localhost:5173 erreichbar.

---

## API-Versionen und Task-Struktur

### V1 – Einfache Task-Liste
- **Endpunkte:** `/api/v1/tasks`
- **Task-Datenstruktur:**
  ```json
  "Mein Task als String"
  ```
  In V1 ist ein Task einfach nur ein String (z.B. "Einkaufen gehen").

### V2 – Erweiterte Task-Verwaltung
- **Endpunkte:** `/api/v2/tasks`
- **Task-Datenstruktur:**
  ```json
  {
	 "id": "1234567890",
	 "title": "Mein Task als Titel",
	 "checked": false,
	 "createdAt": 1711200000000
  }
  ```
  In V2 ist ein Task ein Objekt mit eindeutiger ID, Titel, Status (abgehakt oder nicht) und Erstellungsdatum.

---

## Weiterführende Dokumentation

## End-to-End Tests ausführen

Im Projekt befindet sich im Frontend-Ordner unter `__tests__/e2e` eine Sammlung von End-to-End-Tests für beide API-Versionen (V1 und V2). Diese Tests werden mit [Playwright](https://playwright.dev/) ausgeführt.

### Voraussetzungen
- Das Backend und das Frontend müssen jeweils lokal laufen (siehe Startanleitung oben).
- Die Abhängigkeiten im Frontend müssen installiert sein (`npm install` im `frontend`-Verzeichnis).

### Tests starten
1. In das Frontend-Verzeichnis wechseln:
	```bash
	cd frontend
	```
2. End-to-End-Tests ausführen:
	```bash
	npm run test:e2e
	```
	Alternativ kann mit folgendem Befehl die Playwright-Testoberfläche gestartet werden:
	```bash
	npm run test:ui
	```
	Dort können einzelne Tests gezielt ausgeführt werden.

Die Testergebnisse werden im Terminal angezeigt. Ein ausführlicher HTML-Report ist nach dem Lauf im Ordner `playwright-report` zu finden und kann mit `npx playwright show-report` angezeigt werden.


- [V1 Dokumentation](./V1_DOCUMENTATION.md) – Details und Screenshots zu allen Endpunkten der ersten API-Version
- [V2 Dokumentation](./V2_DOCUMENTATION.md) – Details und Screenshots zu allen Endpunkten der zweiten API-Version

---

## Hinweise
- Die beiden Versionen laufen parallel und können unabhängig getestet werden.
- Die Daten werden jeweils in einer eigenen JSON-Datei im Backend gespeichert.
- Die Frontend-Komponenten sind so aufgebaut, dass sie beide Versionen getrennt ansprechen und visualisieren.

## Zusammenfassung

- Die "beiden" Ergebnisse bzw v1 und v2 sehen Sie nebeneinander, wenn sie das frontend starten. um es zu verdeutlichen. In der echten Software Welt, wären die nämlich nicht nebeneiandner, sondern auf verschiednen Versionen der software. Max hat vielleicht nicht das update installiert, aber Lea schon. Für beide muss die app aber laufen. Nach einiger zeit, wenn alle Geräte bedeckt wurden, dann darf man die api v1 z.b deleten und vollständig auf v2 umsteigen. 

---

**Viel Spaß beim Testen und Lernen über API-Versionierung!**
