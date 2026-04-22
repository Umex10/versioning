# Bewertungskriterien für TechDemo Review

## README & Projektübersicht
- [x] Zweck des Webservices klar beschrieben
- [x] Architekturüberblick
- [x] Setup-Anleitung (Installation, Start, Ports, ENV-Variablen)
- [X] Beispiel-Requests
- [x] Technologiestack genannt

## API-Design & Struktur
- [x] Sinnvolle Methoden
- [x] Konsistente Naming-Convention
- [x] Ressourcenorientierung
- [X] Versionierung (optional, aber positiv)

## Imlementierungsqualität & Code-Struktur
- [ ] Trennung / Aufteilung (Controller, Service, etc.) - Business-Logik ist direkt in Routes, keine Service-Layer
- [X] Keine riesigen Monolith-Dateien
- [X] Lesbarer Code
- [X] Keine unnötige Duplikation
- [X] Sinnvolle Ordnerstruktur

## Lauffähigkeit & Stabilität
- [X] Projekt startet ohne manuelle Hacks
- [X] Keine Abstürze bei Standardnutzung
- [X] Fehler werden korrekt behandelt
- [X] Port-Konfiguration funktioniert

## Fehlerbehandlung & Statuscodes
- [X] Richtige HTTP-Statuscodes
- [X] Klare Fehlermeldungen (JSON)
- [X] Validierung von Input
- [X] Keine unkontrollierten 500er

## Testing
- [X] Unit- oder Integrationstests (Playwright e2e-Tests vorhanden)
- [X] Testbare Services
- [X] Automatisierbarkeit
- [ ] Coverage nachvollziehbar - Keine Coverage da keine unit tests geschrieben wurden

## Dokumentation der Endpunkte
- [X] Swagger / OpenAPI oder gleichwertige Dokumentation
- [X] Beispiel-Requests & Responses
- [X] Parameterbeschreibung
- [X] Response-Struktur erklärt

## Demo & Nachvollziehbarkeit
- [ ] Konkretes Demo-Szenario - Nicht dokumentiert
- [ ] Beispiel-Use-Case - Nicht dokumentiert
- [ ] Postman-Collection oder curl-Beispiele - curl-Beispiele im README, aber keine .json-Collection
- [ ] Klarer Ablauf zur Demonstration - Nicht dokumentiert
