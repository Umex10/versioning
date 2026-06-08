
# Versionierung – Beispielprojekt

## Projektbeschreibung

Dieses Projekt demonstriert das Konzept der API-Versionierung anhand eines einfachen Task-Management-Systems. Es gibt zwei API-Versionen (V1 und V2), die jeweils unterschiedliche Datenmodelle und Endpunkte bereitstellen. Ziel ist es, zu zeigen, wie sich APIs und Datenstrukturen im Laufe der Zeit weiterentwickeln können, ohne bestehende Funktionalität zu verlieren.

### Was ist Versionierung?
Versionierung in Webservices bedeutet, dass verschiedene Versionen einer API parallel existieren können. So können alte Clients weiterhin mit der alten Version arbeiten, während neue Features in einer neuen Version bereitgestellt werden.

---

## Technologiestack

| Bereich | Technologie |
|---|---|
| Backend | Node.js, Express 5, TypeScript, ts-node, nodemon |
| Frontend | React 19, Vite, TypeScript, Tailwind CSS, lucide-react |
| Testing | Playwright |
| Datenspeicherung | JSON-Dateien (kein Datenbankserver erforderlich) |

---

## Architekturüberblick

Das Projekt ist in zwei voneinander unabhängige Teile gegliedert: ein **Backend** (REST-API) und ein **Frontend** (React-SPA). Beide kommunizieren ausschließlich über HTTP.

```
┌──────────────────────────────────────────────────┐
│                    Frontend                       │
│             React + Vite  (Port 5173)             │
│                                                   │
│   ┌─────────────────┐   ┌──────────────────────┐  │
│   │   V1-Ansicht    │   │     V2-Ansicht        │  │
│   │  (use-v1.ts)    │   │   (use-v2.ts)         │  │
│   └────────┬────────┘   └──────────┬────────────┘  │
└────────────┼───────────────────────┼───────────────┘
             │ HTTP GET/POST/DELETE  │ HTTP GET/POST/PUT/DELETE
             ▼                      ▼
┌──────────────────────────────────────────────────┐
│                    Backend                        │
│             Express 5  (Port 5000)                │
│                                                   │
│   ┌─────────────────┐   ┌──────────────────────┐  │
│   │  /api/v1/tasks  │   │   /api/v2/tasks       │  │
│   │  (routes/v1.ts) │   │   (routes/v2.ts)      │  │
│   └────────┬────────┘   └──────────┬────────────┘  │
│            │                       │               │
│   ┌────────┴────────┐   ┌──────────┴────────────┐  │
│   │ v1_tasks.json   │   │   v2_tasks.json        │  │
│   └─────────────────┘   └──────────────────────┘  │
└──────────────────────────────────────────────────┘
```

---

## Startanleitung

### Voraussetzungen
- Node.js (v18 oder neuer) und npm müssen installiert sein

### Ports

| Dienst | Port | URL |
|---|---|---|
| Backend (Express) | 5000 | http://localhost:5000 |
| Frontend (Vite) | 5173 | http://localhost:5173 |

### Umgebungsvariablen (ENV)

Dieses Projekt benötigt **keine** `.env`-Datei. Alle relevanten Werte (Ports, Pfade) sind direkt im Code hinterlegt:
- Backend-Port: `5000` (in `backend/src/index.ts`)
- Frontend-Dev-Port: `5173` (Vite-Standard)
- Datendateien: `backend/data/v1_tasks.json` und `backend/data/v2_tasks.json`

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

#### Swagger UI öffnen
Nachdem der Backend-Server läuft, kann die interaktive API-Dokumentation über Swagger UI aufgerufen werden:
- **V1 Swagger:** http://localhost:5000/api/v1/docs
- **V2 Swagger:** http://localhost:5000/api/v2/docs

Hier können alle verfügbaren Endpoints getestet werden, ohne separate curl-Befehle zu verwenden.

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

#### Beispiel-Requests V1

**Alle Tasks abrufen:**
```bash
curl -X GET http://localhost:5000/api/v1/tasks
```

**Neuen Task hinzufügen:**
```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '"Einkaufen gehen"'
```

**Task löschen (nach Index):**
```bash
curl -X DELETE http://localhost:5000/api/v1/tasks/0
```

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

#### Beispiel-Requests V2

**Alle Tasks abrufen:**
```bash
curl -X GET http://localhost:5000/api/v2/tasks
```

**Neuen Task hinzufügen:**
```bash
curl -X POST http://localhost:5000/api/v2/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Neuer Task"}'
```

**Task aktualisieren (abhaken/Status ändern):**
```bash
curl -X PUT http://localhost:5000/api/v2/tasks/1711200000000 \
  -H "Content-Type: application/json" \
  -d '{"checked": true}'
```

**Task löschen:**
```bash
curl -X DELETE http://localhost:5000/api/v2/tasks/1711200000000
```

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
