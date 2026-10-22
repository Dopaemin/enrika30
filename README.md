# 👑 Enrika & Emin – Level 30: Das Paar-Showdown gegen das Spießertum
**Das interaktive Geburtstags-Spiel zum 30. Geburtstag (24. Oktober 1996 - 2026)**

Ein liebevoll gestaltetes, interaktives TV-Game-Show- und Bosskampf-Spiel, bei dem Enrika und Emin gemeinsam gegen **Lord Dreißig** vom Amt für Seriösität antreten.

---

## 🎮 Gameplay & Features

1. **50 abwechslungsreiche Runden**:
   - **Quiz- & Situations-Tests**: Fragen mit schrittweise einblendenden Antwortkarten (A, B, C) passend zum Moderationstext.
   - **Paar-Duelle („Wer von euch beiden...“)**: Gegenseitige Einschätzungsrunden mit animierten Fotokarten von Enrika und Emin.
   - **Live-Challenges mit Timer**: Echte Paar-Aufgaben auf der Couch (Kuss-Parcours, Komplimente, Augenkontakt, Gegenstände erraten) mit Countdown und Sprachansage.
   - **Foto-Verhöre**: Wunderschöne private Urlaubserinnerungen mit Tap-to-Zoom-Lightbox.

2. **Voll vertonte Spielshow**:
   - **Lord Dreißig** (Amt für Seriösität): Trocken, bürokratisch, herrlich hochnäsig.
   - **Showmaster Pablo**: Charismatischer, energiegeladener Liebes-Schiedsrichter.
   - **Synchronisierte Animationen**: Münder und Karten bewegen sich synchron zur tatsächlichen Sprachausgabe.
   - **Interaktiver Heavy Metal Geburtstagssong**: Ein 22-sekündiger Rock-Anthem zur Siegesfeier nach dem Besiegen von Lord Dreißig.

3. **Sieges-Finale**:
   - Lord Dreißig gesteht seine Niederlage ein.
   - Konfetti-Feuerwerk und 22s Metal-Geburtstagssong.
   - Romantischer Liebesbrief (inkl. Vorlese-Funktion).
   - Polaroid-Fotogalerie mit echten Meilensteinen.
   - Überraschungs-Geschenk enthüllen.

---

## 🌐 Hosting auf GitHub Pages (Live schalten)

Das Projekt ist komplett als statische Webanwendung gebaut (reines HTML, Vanilla CSS und JavaScript) und benötigt keinen Server.

### Schritt-für-Schritt Anleitung:
1. **Änderungen zu GitHub pushen**:
   ```bash
   git add .
   git commit -m "Level 30: Ready for GitHub Pages deployment"
   git push -u origin main
   ```

2. **GitHub Pages in den Repository-Einstellungen aktivieren**:
   - Öffne dein GitHub Repository: [https://github.com/Dopaemin/enrika30](https://github.com/Dopaemin/enrika30)
   - Klicke oben rechts auf **Settings** (Zahnrad).
   - Wähle in der linken Seitenleiste **Pages** (unter *Code and automation*).
   - Unter **Build and deployment**:
     - **Source**: `Deploy from a branch` auswählen
     - **Branch**: `main` auswählen und Ordner `/ (root)` belassen
     - Klicke auf **Save**.

3. **Fertig!**
   - Nach ca. 1 bis 2 Minuten ist das Spiel weltweit erreichbar unter:
     👉 **`https://dopaemin.github.io/enrika30/`**
   - Auf iPhone, iPad, Mac oder TV-Bildschirm direkt im Safari/Chrome-Browser öffnen.

---

## 💻 Lokales Spielen (Offline)

### Option 1: Lokaler Python-Webserver (Empfohlen)
```bash
python3 -m http.server 8085
```
Anschließend im Browser öffnen: [http://localhost:8085](http://localhost:8085)

### Option 2: Direkt öffnen
Die Datei `index.html` per Doppelklick in einem beliebigen Browser (Safari, Chrome, Firefox) öffnen.

---

## 🎙️ Sprachdateien neu generieren (Optional)

Alle 100+ Sprachdateien und der Metal-Song liegen bereits fertig generiert im Ordner `assets/audio/`.

Falls du in Zukunft Texte in `gameData.js` änderst und neue Sprachdateien über ElevenLabs generieren möchtest:
1. Kopiere `.env.example` zu `.env`:
   ```bash
   cp .env.example .env
   ```
2. Trage deinen `ELEVENLABS_API_KEY`, `BOSS_VOICE_ID` und `NARRATOR_VOICE_ID` in `.env` ein.
3. Generator ausführen:
   ```bash
   # Alle fehlenden Runden generieren
   python3 generate_voices.py --only-missing

   # Oder Metal-Geburtstagssong neu generieren
   python3 generate_voices.py --victory-song
   ```
*(Hinweis: Die `.env`-Datei wird durch `.gitignore` automatisch geschützt und gelangt niemals öffentlich auf GitHub.)*
