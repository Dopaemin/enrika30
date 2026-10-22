#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
===================================================================
ENRIKA & EMIN - LEVEL 30: ELEVENLABS AUDIO GENERATOR
===================================================================
Generiert alle MP3-Sprachdateien für:
1. Lord Dreißig (Böser Bürokrat)  -> round_{id}_boss.mp3
2. Showmaster Pablo (Moderator)   -> round_{id}_narrator.mp3
   (inkl. Vorlesen der Antwortoptionen A, B, C für Quizrunden!)
3. Intro & Outro Spezial-Audios   -> intro_boss, start_page, victory_boss, victory_letter

Voraussetzungen:
- Python 3 (standardmäßig auf macOS vorinstalliert)
- Keine zusätzlichen pip-Installationen nötig (reine Standardbibliothek!)
- ElevenLabs API-Key (kostenlos oder kostenpflichtig)
===================================================================
"""

import os
import sys
import re
import json
import time
import argparse
import urllib.request
import urllib.error

# Standard-Pfade
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
GAME_DATA_PATH = os.path.join(BASE_DIR, "gameData.js")
AUDIO_OUTPUT_DIR = os.path.join(BASE_DIR, "assets", "audio", "voice")
DOTENV_PATH = os.path.join(BASE_DIR, ".env")
EXPORT_TXT_PATH = os.path.join(AUDIO_OUTPUT_DIR, "SPRECHTEXTE_ALLE_50.txt")

# ElevenLabs API Endpoints & Default Settings
ELEVEN_API_BASE = "https://api.elevenlabs.io/v1"
DEFAULT_MODEL = "eleven_multilingual_v2"

# Vorschläge für beliebte ElevenLabs Stimmen
VOICE_SUGGESTIONS = {
    "boss": {
        "description": "Lord Dreißig: Hochnäsig, bürokratisch, tief & amüsant-trocken",
        "recommended_premade": [
            ("Adam", "pNInz6obpgDQGcFmaJgB", "Tief, autoritär, narrativ"),
            ("Daniel", "onwK4e9ZLuTAKqWW03F9", "Britisch/europäisch, förmlich, seriös"),
            ("Arnold", "VR6AewLTigWG4xSOukaG", "Klar, markant, fordernd"),
            ("Marcus", "IdkSsqYpQG4yQx9iR02f", "Autoritär, bürokratisch"),
        ]
    },
    "narrator": {
        "description": "Showmaster Pablo: Charismatischer, energiegeladener TV-Gameshow-Host",
        "recommended_premade": [
            ("Antoni", "ErXwobaYiN019PkySvjV", "Lebhaft, sympathisch, energievoll"),
            ("Liam", "TX3LPaxmHKxFdv7VOQHJ", "Jung, dynamisch, modern"),
            ("Charlie", "IKne3meq5aSn9XLyUdCD", "Locker, plaudernd, herzlich"),
            ("George", "JBFqnCBsd6RMkjVDRZzb", "Warm, einladend"),
        ]
    }
}

# Interaktive Showmaster-Sprüche für Challenges & Bedenkzeit bei Fragen
INTERACTIVE_BANTER_CLIPS = [
    # 1. Challenge Timer Start
    {
        "filename": "pablo_timer_start_1.mp3",
        "role": "narrator",
        "speaker": "Showmaster Pablo",
        "category": "CHALLENGE_TIMER",
        "title": "Timer Start 1",
        "text": "Und die Zeit läuft! Zeigt was ihr könnt!"
    },
    {
        "filename": "pablo_timer_start_2.mp3",
        "role": "narrator",
        "speaker": "Showmaster Pablo",
        "category": "CHALLENGE_TIMER",
        "title": "Timer Start 2",
        "text": "Auf die Plätze, fertig, los!"
    },
    # 2. Challenge Timer Countdown Warnung (ca. 5s vor Ende)
    {
        "filename": "pablo_timer_warning_1.mp3",
        "role": "narrator",
        "speaker": "Showmaster Pablo",
        "category": "CHALLENGE_TIMER",
        "title": "Timer Warnung 1",
        "text": "Die Zeit ist gleich rum, haltet durch!"
    },
    {
        "filename": "pablo_timer_warning_2.mp3",
        "role": "narrator",
        "speaker": "Showmaster Pablo",
        "category": "CHALLENGE_TIMER",
        "title": "Timer Warnung 2",
        "text": "Endspurt! Nur noch wenige Sekunden!"
    },
    {
        "filename": "pablo_timer_warning_3.mp3",
        "role": "narrator",
        "speaker": "Showmaster Pablo",
        "category": "CHALLENGE_TIMER",
        "title": "Timer Warnung 3",
        "text": "Noch fünf Sekunden, gebt alles!"
    },
    # 3. Challenge Timer Zeit abgelaufen
    {
        "filename": "pablo_timer_finish_1.mp3",
        "role": "narrator",
        "speaker": "Showmaster Pablo",
        "category": "CHALLENGE_TIMER",
        "title": "Timer Ende",
        "text": "Und Stopp! Die Zeit ist um!"
    },
    # 4. Challenge Erfolg
    {
        "filename": "pablo_challenge_win_1.mp3",
        "role": "narrator",
        "speaker": "Showmaster Pablo",
        "category": "CHALLENGE_WIN",
        "title": "Challenge Erfolg",
        "text": "Großartig gemacht! Volle Punktzahl für das Traumpaar!"
    },
    # 5. Interaktive Sprüche nach Fragen / beim Überlegen
    {
        "filename": "pablo_banter_1.mp3",
        "role": "narrator",
        "speaker": "Showmaster Pablo",
        "category": "QUESTION_BANTER",
        "title": "Frage Nachhaken 1",
        "text": "Was denkt ihr? Ich bin echt gespannt was ihr auswählt!"
    },
    {
        "filename": "pablo_banter_2.mp3",
        "role": "narrator",
        "speaker": "Showmaster Pablo",
        "category": "QUESTION_BANTER",
        "title": "Frage Nachhaken 2",
        "text": "Sprecht euch gut ab, lasst euch von Lord Dreißig nicht verunsichern!"
    },
    {
        "filename": "pablo_banter_3.mp3",
        "role": "narrator",
        "speaker": "Showmaster Pablo",
        "category": "QUESTION_BANTER",
        "title": "Frage Nachhaken 3",
        "text": "Gar nicht so einfach! Was sagt euer Bauchgefühl?"
    },
    {
        "filename": "pablo_banter_4.mp3",
        "role": "narrator",
        "speaker": "Showmaster Pablo",
        "category": "QUESTION_BANTER",
        "title": "Frage Nachhaken 4",
        "text": "Ich halte den Atem an... auf was tippt ihr?"
    },
    {
        "filename": "pablo_banter_5.mp3",
        "role": "narrator",
        "speaker": "Showmaster Pablo",
        "category": "QUESTION_BANTER",
        "title": "Frage Nachhaken 5",
        "text": "Keine falsche Bescheidenheit, hört auf euer Herz!"
    }
]


def load_env_file(path=DOTENV_PATH):
    """Lädt Variablen aus einer .env Datei ohne externe Abhängigkeiten."""
    if not os.path.exists(path):
        return
    try:
        with open(path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                key, val = line.split("=", 1)
                key = key.strip()
                val = val.strip().strip("'\"")
                if key and key not in os.environ:
                    os.environ[key] = val
    except Exception as e:
        print(f"Hinweis: .env konnte nicht geladen werden ({e})")


def load_game_config(path=GAME_DATA_PATH):
    """Extrahiert das GAME_CONFIG JSON-Objekt aus gameData.js."""
    if not os.path.exists(path):
        raise FileNotFoundError(f"gameData.js nicht gefunden unter: {path}")

    with open(path, "r", encoding="utf-8") as f:
        text = f.read()

    # Entferne einzeilige JS-Kommentare
    text = re.sub(r'//.*', '', text)
    # Extrahiere den Block zwischen der ersten geschweiften Klammer und der letzten
    start = text.find('{')
    end = text.rfind('}')
    if start == -1 or end == -1:
        raise ValueError("Konnte GAME_CONFIG in gameData.js nicht lokalisieren.")

    json_str = text[start:end+1]
    # Entferne nachgestellte Kommas (trailing commas), die in reinem JSON ungültig sind
    json_str = re.sub(r',\s*([}\]])', r'\1', json_str)

    try:
        data = json.loads(json_str)
        return data
    except Exception as e:
        raise ValueError(f"Fehler beim Parsen von gameData.js: {e}")


def format_narrator_text(enc, include_answers=True):
    """
    Formatiert den Text für Showmaster Pablo.
    Für Quiz: Liest die Frage plus Antwort A, B, C vor.
    Für Paar-Duell: Liest Einleitung plus Kernfrage vor.
    Für Live-Mission: Liest Anweisung plus Timer-Aufforderung vor.
    """
    enc_type = enc.get("type", "quiz")
    letters = ["A", "B", "C", "D", "E"]

    if enc_type == "quiz":
        narrative = (enc.get("narrative") or "").strip()
        if not include_answers:
            return narrative

        options = enc.get("options", [])
        opt_texts = []
        for i, opt in enumerate(options):
            letter = letters[i] if i < len(letters) else f"Option {i+1}"
            text = (opt.get("text") or "").strip()
            if not text.endswith((".", "!", "?")):
                text += "."
            opt_texts.append(f"Antwort {letter}: {text}")

        if opt_texts:
            return f"{narrative} {' '.join(opt_texts)}"
        return narrative

    elif enc_type == "who_is_it":
        narrative = (enc.get("narrative") or "").strip()
        who_q = (enc.get("whoQuestion") or "").strip()
        if narrative and who_q and narrative != who_q:
            return f"{narrative} {who_q}"
        return who_q or narrative

    elif enc_type == "challenge":
        narrative = (enc.get("narrative") or "").strip()
        prompt = (enc.get("challengePrompt") or "").strip()
        if narrative and prompt and narrative != prompt:
            return f"{narrative} {prompt}"
        return prompt or narrative

    return (enc.get("narrative") or "").strip()


def build_audio_jobs(config, include_answers=True, selected_rounds=None, voice_type="both"):
    """
    Erstellt die Liste aller zu generierenden Audio-Jobs.
    Jeder Job: { filename, role, voice_id, text, title, category, round_id }
    """
    jobs = []
    encounters = config.get("encounters", [])

    for enc in encounters:
        r_id = enc.get("id")
        if selected_rounds is not None and r_id not in selected_rounds:
            continue

        title = enc.get("title", f"Runde {r_id}")
        category = enc.get("category", "")

        # 1. Lord Dreißig
        if voice_type in ("both", "boss"):
            boss_text = (enc.get("bossQuote") or "").strip()
            if boss_text:
                jobs.append({
                    "filename": f"round_{r_id}_boss.mp3",
                    "role": "boss",
                    "speaker": "Lord Dreißig",
                    "round_id": r_id,
                    "title": title,
                    "category": category,
                    "text": boss_text
                })

        # 2. Showmaster Pablo
        if voice_type in ("both", "narrator"):
            narr_text = format_narrator_text(enc, include_answers=include_answers)
            if narr_text:
                jobs.append({
                    "filename": f"round_{r_id}_narrator.mp3",
                    "role": "narrator",
                    "speaker": "Showmaster Pablo",
                    "round_id": r_id,
                    "title": title,
                    "category": category,
                    "text": narr_text
                })

    # Spezial-Dateien (Intro, Outro etc.) wenn "all" ausgewählt oder kein Rundenfilter
    if selected_rounds is None or 0 in selected_rounds:
        if voice_type in ("both", "boss"):
            jobs.append({
                "filename": "intro_boss.mp3",
                "role": "boss",
                "speaker": "Lord Dreißig",
                "round_id": 0,
                "title": "Intro Warnung",
                "category": "INTRO",
                "text": "Akte Enrika liegt bereit. Mal sehen ob ihr dem Spießertum entkommen könnt."
            })
            jobs.append({
                "filename": "victory_boss.mp3",
                "role": "boss",
                "speaker": "Lord Dreißig",
                "round_id": 999,
                "title": "Kapitulation",
                "category": "VICTORY",
                "text": config.get("boss", {}).get("defeatQuote", 
                    "Ich gebe mich geschlagen. Ihr seid weder spießig noch vernünftig geworden. "
                    "Ihr seid einfach nur unverschämt verliebt und habt viel zu viel Spaß zusammen. "
                    "Level 30 ist hiermit offiziell freigegeben."
                )
            })

        if voice_type in ("both", "narrator"):
            jobs.append({
                "filename": "start_page.mp3",
                "role": "narrator",
                "speaker": "Showmaster Pablo",
                "round_id": 0,
                "title": "Startseite Intro",
                "category": "INTRO",
                "text": (
                    "Eigentlich droht ab heute die gesetzliche Verpflichtung zu Samstagsausflügen in den Baumarkt, "
                    "Tupperdosen und Gesprächen über Rückenschmerzen. Doch bevor Enrika die 30 offiziell betreten darf, "
                    "prüft Lord Dreißig vom Amt für Seriösität eure Beziehung auf Herz und Nieren. "
                    "Beweist ihm auf der Couch, dass ihr viel zu verliebt und viel zu unvernünftig seid, um spießig zu werden!"
                )
            })

    return jobs


def parse_rounds_spec(spec_str):
    """
    Parst Angaben wie: '1-10', '19-50', '1,3,5', 'all', 'special'
    """
    if not spec_str or spec_str.lower() == "all":
        return None  # None bedeutet alle Runden inklusive Spezial

    spec_str = spec_str.strip().lower()
    rounds = set()

    if "special" in spec_str or "intro" in spec_str:
        rounds.add(0)

    for part in spec_str.split(","):
        part = part.strip()
        if not part:
            continue
        if "-" in part:
            try:
                start, end = part.split("-", 1)
                for r in range(int(start), int(end) + 1):
                    rounds.add(r)
            except ValueError:
                pass
        else:
            try:
                rounds.add(int(part))
            except ValueError:
                pass

    return rounds


def api_request(url, api_key, data=None, method="GET"):
    """Führt einen HTTPS-Request an ElevenLabs aus."""
    headers = {
        "xi-api-key": api_key,
        "Accept": "application/json" if method == "GET" else "audio/mpeg",
        "User-Agent": "EnrikaLevel30AudioGen/1.0"
    }

    body = None
    if data is not None:
        body = json.dumps(data).encode("utf-8")
        headers["Content-Type"] = "application/json"

    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as response:
            return response.read(), response.getcode()
    except urllib.error.HTTPError as e:
        error_msg = e.read().decode("utf-8", errors="replace")
        return error_msg, e.code
    except Exception as e:
        return str(e), 500


def list_elevenlabs_voices(api_key):
    """Ruft alle Stimmen des Accounts ab und zeigt sie an."""
    print("\n🔍 Rufe Stimmen von deinem ElevenLabs Account ab...")
    url = f"{ELEVEN_API_BASE}/voices"
    res, status = api_request(url, api_key, method="GET")

    if status != 200:
        print(f"❌ Fehler beim Abrufen der Stimmen (Status {status}): {res}")
        return

    data = json.loads(res.decode("utf-8"))
    voices = data.get("voices", [])
    print(f"✅ Gefundene Stimmen: {len(voices)}\n")
    print(f"{'NAME':<20} | {'VOICE ID':<25} | {'KATEGORIE':<12} | BESCHREIBUNG")
    print("-" * 80)
    for v in sorted(voices, key=lambda x: (x.get("category", ""), x.get("name", ""))):
        v_id = v.get("voice_id", "")
        v_name = v.get("name", "")
        cat = v.get("category", "")
        labels = v.get("labels", {})
        desc = ", ".join(f"{k}:{val}" for k, val in labels.items()) if labels else v.get("description") or ""
        print(f"{v_name:<20} | {v_id:<25} | {cat:<12} | {desc[:40]}")


def check_subscription_quota(api_key):
    """Prüft das verbleibende Kontingent des Nutzers."""
    url = f"{ELEVEN_API_BASE}/user/subscription"
    res, status = api_request(url, api_key, method="GET")
    if status != 200:
        return

    data = json.loads(res.decode("utf-8"))
    used = data.get("character_count", 0)
    limit = data.get("character_limit", 0)
    remaining = limit - used
    tier = data.get("tier", "unknown")
    print(f"\n📊 ElevenLabs Abo: Tier '{tier}'")
    print(f"   Verbraucht: {used:,} Zeichen | Limit: {limit:,} Zeichen | Verbleibend: {remaining:,} Zeichen")


def generate_audio_file(job, api_key, voice_id, model=DEFAULT_MODEL, output_dir=AUDIO_OUTPUT_DIR):
    """Ruft die ElevenLabs TTS API auf und speichert die MP3."""
    out_path = os.path.join(output_dir, job["filename"])
    url = f"{ELEVEN_API_BASE}/text-to-speech/{voice_id}?output_format=mp3_44100_128"

    payload = {
        "text": job["text"],
        "model_id": model,
        "voice_settings": {
            "stability": 0.50,
            "similarity_boost": 0.80,
            "style": 0.0,
            "use_speaker_boost": True
        }
    }

    res, status = api_request(url, api_key, data=payload, method="POST")

    if status != 200:
        return False, f"HTTP {status}: {res}"

    try:
        os.makedirs(output_dir, exist_ok=True)
        with open(out_path, "wb") as f:
            f.write(res)
        return True, out_path
    except Exception as e:
        return False, f"Dateifehler beim Schreiben: {e}"


def export_all_scripts_to_txt(jobs, output_path=EXPORT_TXT_PATH):
    """Schreibt alle Sprechtexte sauber gegliedert in eine Textdatei zum Nachlesen."""
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("=" * 70 + "\n")
        f.write("ENRIKA & EMIN - LEVEL 30: VOLLSTÄNDIGE SPRECHTEXTE (ALLE 50 RUNDEN)\n")
        f.write("Inklusive automatischer Einbindung der Antwortmöglichkeiten A, B, C\n")
        f.write("=" * 70 + "\n\n")

        # Boss Texte
        f.write("--- TEIL 1: LORD DREISSIG (BÖSEWICHT / BÜROKRAT) ---\n")
        f.write("Stimm-Tipp: Hochnäsig, bürokratisch, tief & amüsant-trocken\n\n")
        for job in [j for j in jobs if j["role"] == "boss"]:
            f.write(f"DATEINAME: {job['filename']}\n")
            f.write(f"TITEL: {job['title']} | KATEGORIE: {job['category']}\n")
            f.write(f"TEXT: {job['text']}\n\n")

        f.write("\n" + "=" * 70 + "\n")
        f.write("--- TEIL 2: SHOWMASTER PABLO (GAMESHOW-HOST & SCHIEDSRICHTER) ---\n")
        f.write("Stimm-Tipp: Sympathisch, charismatisch, mitreißend\n\n")
        for job in [j for j in jobs if j["role"] == "narrator"]:
            f.write(f"DATEINAME: {job['filename']}\n")
            f.write(f"TITEL: {job['title']} | KATEGORIE: {job['category']}\n")
            f.write(f"TEXT: {job['text']}\n\n")

        f.write("\n" + "=" * 70 + "\n")
        f.write("--- TEIL 3: INTERAKTIVE SHOWMASTER-SPRÜCHE (CHALLENGE-TIMER & BEDENKZEIT) ---\n")
        f.write("Werden dynamisch bei Countdown und beim Überlegen abgespielt\n\n")
        for clip in INTERACTIVE_BANTER_CLIPS:
            f.write(f"DATEINAME: {clip['filename']}\n")
            f.write(f"TITEL: {clip['title']} | KATEGORIE: {clip['category']}\n")
            f.write(f"TEXT: {clip['text']}\n\n")

    print(f"📄 Alle Sprechtexte erfolgreich exportiert nach:\n   {output_path}")


def generate_metal_birthday_song(api_key, output_path=None, duration_ms=22000):
    """
    Generiert einen 20-22-sekündigen Metal/Hard-Rock Geburtstagssong für Enrika
    über die offizielle ElevenLabs Music API (/v1/music).
    """
    if output_path is None:
        output_path = os.path.join(BASE_DIR, "assets", "audio", "victory_metal_birthday.mp3")

    prompt = (
        "20 second explosive heavy metal rock birthday anthem for Enrika turning 30. "
        "Dual distorted electric guitar riffs, punchy rock drums, celebratory shouting rock vocals "
        "singing Happy Birthday Enrika Level 30 rock on, epic final power chord finish"
    )

    payload = {
        "prompt": prompt,
        "music_length_ms": duration_ms
    }

    print("\n🎸 Starte Generierung des Metal-Geburtstagssongs für Enrika...")
    print(f"   Dauer: {duration_ms / 1000:.0f} Sekunden")
    print(f"   Prompt: {prompt}")

    url = f"{ELEVEN_API_BASE}/music"
    res, status = api_request(url, api_key, data=payload, method="POST")

    if status != 200:
        print(f"❌ Fehler bei der Song-Generierung (Status {status}): {res}")
        return False

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "wb") as f:
        f.write(res)
    print(f"✅ Metal-Song erfolgreich gespeichert! ({len(res):,} Bytes)")
    print(f"   Pfad: {output_path}")
    return True


def main():
    load_env_file()

    parser = argparse.ArgumentParser(
        description="ElevenLabs Voice Generator für Enrika & Emin - Level 30",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
BEISPIELE:
  # 1. Vorschau aller Texte & Zeichenanzahl anzeigen (ohne API-Aufruf):
  python3 generate_voices.py --dry-run

  # 2. Verfügbare Stimmen in deinem ElevenLabs Account auflisten:
  python3 generate_voices.py --list-voices --api-key DEIN_KEY

  # 3. Nur die fehlenden Runden (z.B. Runde 19 bis 50) generieren:
  python3 generate_voices.py --rounds 19-50 --only-missing

  # 4. Nur Showmaster Pablo für alle Quizrunden inkl. Antworten neu generieren:
  python3 generate_voices.py --type narrator --overwrite

  # 5. Sprechtexte als schöne TXT-Datei exportieren:
  python3 generate_voices.py --export-txt
        """
    )

    parser.add_argument("--api-key", default=os.getenv("ELEVENLABS_API_KEY") or os.getenv("ELEVEN_API_KEY"),
                        help="ElevenLabs API Key (oder via ELEVENLABS_API_KEY in .env)")
    parser.add_argument("--boss-voice", default=os.getenv("BOSS_VOICE_ID"),
                        help="Voice ID für Lord Dreißig")
    parser.add_argument("--narrator-voice", default=os.getenv("NARRATOR_VOICE_ID"),
                        help="Voice ID für Showmaster Pablo")
    parser.add_argument("--model", default=DEFAULT_MODEL,
                        help=f"ElevenLabs Modell (Standard: {DEFAULT_MODEL})")
    parser.add_argument("--rounds", default=None,
                        help="Welche Runden generieren? z.B. '19-50', '1,2,5', 'all'")
    parser.add_argument("--type", choices=["boss", "narrator", "both"], default="both",
                        help="Welche Rollen generieren? 'boss', 'narrator' oder 'both'")
    parser.add_argument("--only-missing", action="store_true",
                        help="Bereits im Ordner existierende MP3-Dateien überspringen (spart Credits!)")
    parser.add_argument("--overwrite", action="store_true",
                        help="Bestehende MP3-Dateien überschreiben")
    parser.add_argument("--no-answers", action="store_true",
                        help="Antworten A, B, C NICHT vorlesen (nur die Frage)")
    parser.add_argument("--banter", action="store_true",
                        help="Nur die interaktiven Showmaster-Sprüche (Challenge Timer, Nachfragen) generieren")
    parser.add_argument("--include-banter", action="store_true",
                        help="Interaktive Showmaster-Sprüche zu den Runden-Audios hinzufügen")
    parser.add_argument("--dry-run", action="store_true",
                        help="Vorschau der Texte und Zeichenanzahl anzeigen, ohne API aufzurufen")
    parser.add_argument("--list-voices", action="store_true",
                        help="Alle Stimmen deines ElevenLabs-Accounts auflisten")
    parser.add_argument("--export-txt", action="store_true",
                        help="Alle Texte in SPRECHTEXTE_ALLE_50.txt exportieren")
    parser.add_argument("--victory-song", action="store_true",
                        help="Generiert den 20-22s Metal/Rock-Geburtstagssong für Enrika via Eleven Music API")

    args = parser.parse_args()

    # 0. Metal-Geburtstagssong generieren
    if args.victory_song:
        if not args.api_key:
            print("❌ Bitte gib deinen API-Key an (--api-key oder via .env).")
            sys.exit(1)
        ok = generate_metal_birthday_song(args.api_key)
        sys.exit(0 if ok else 1)

    # 1. Konfiguration & Daten laden
    try:
        config = load_game_config()
    except Exception as e:
        print(f"❌ Fehler: {e}")
        sys.exit(1)

    include_answers = not args.no_answers

    if args.banter:
        jobs = INTERACTIVE_BANTER_CLIPS
    else:
        selected_rounds = parse_rounds_spec(args.rounds)
        jobs = build_audio_jobs(config, include_answers=include_answers,
                                selected_rounds=selected_rounds, voice_type=args.type)
        if args.include_banter:
            jobs.extend(INTERACTIVE_BANTER_CLIPS)

    # 2. TXT-Export
    if args.export_txt:
        export_all_scripts_to_txt(jobs)
        return

    # 3. Stimmen auflisten
    if args.list_voices:
        if not args.api_key:
            print("❌ Bitte gib deinen API-Key an (--api-key oder via .env), um Stimmen abzurufen.")
            sys.exit(1)
        list_elevenlabs_voices(args.api_key)
        check_subscription_quota(args.api_key)
        return

    # 4. Dry Run / Vorschau
    if args.dry_run or not args.api_key:
        print("\n" + "=" * 70)
        print("🔍 ENRIKA & EMIN - LEVEL 30: AUDIO GENERATOR VORSCHAU (DRY-RUN)")
        print("=" * 70)
        print(f"Modus: {'Frage + Antworten A, B, C' if include_answers else 'Nur Fragen'}")
        print(f"Rollen-Filter: {args.type} | Runden-Filter: {args.rounds or 'Alle (inkl. Spezial)'}")
        print(f"Geplante Audio-Dateien: {len(jobs)}")
        print("-" * 70)

        total_chars = 0
        boss_chars = 0
        narr_chars = 0
        existing_count = 0
        missing_count = 0

        for idx, job in enumerate(jobs, 1):
            out_file = os.path.join(AUDIO_OUTPUT_DIR, job["filename"])
            exists = os.path.exists(out_file)
            if exists:
                existing_count += 1
            else:
                missing_count += 1

            status_tag = "[Bereits vorhanden]" if exists else "[FEHLT NOCH]"
            c_len = len(job["text"])
            total_chars += c_len
            if job["role"] == "boss":
                boss_chars += c_len
            else:
                narr_chars += c_len

            # Zeige die ersten 6 und die letzten 4 als Beispieldetails
            if idx <= 6 or idx > len(jobs) - 4:
                print(f"\n#{idx:02d} [{job['speaker']}] -> {job['filename']} {status_tag}")
                print(f"     Titel: {job['title']} ({job['category']}) | Zeichen: {c_len}")
                print(f"     Text : \"{job['text']}\"")
            elif idx == 7:
                print(f"\n... [{len(jobs) - 10} weitere Runden im gleichen Format] ...")

        print("\n" + "=" * 70)
        print("📊 ZUSAMMENFASSUNG DER ZEICHEN & KOSTEN:")
        print(f"  Dateien gesamt     : {len(jobs)}")
        print(f"  Bereits vorhanden  : {existing_count}")
        print(f"  Noch fehlend       : {missing_count}")
        print(f"  Lord Dreißig Zeichen: {boss_chars:,}")
        print(f"  Showmaster Pablo   : {narr_chars:,} (inkl. Antwortoptionen)")
        print(f"  Gesamtzeichen      : {total_chars:,}")
        print("=" * 70)

        if not args.api_key:
            print("\n💡 Kein API-Key angegeben. Du kannst das Skript mit folgendem Befehl starten:")
            print("   python3 generate_voices.py --api-key DEIN_KEY --boss-voice VOICE_ID --narrator-voice VOICE_ID")
            print("   Oder lege eine .env Datei an mit:")
            print("     ELEVENLABS_API_KEY=dein_key")
            print("     BOSS_VOICE_ID=deine_boss_stimme")
            print("     NARRATOR_VOICE_ID=deine_moderator_stimme")
            print("\n💡 Tipp: Führe 'python3 generate_voices.py --list-voices --api-key DEIN_KEY' aus,")
            print("   um alle verfügbaren Stimmen deines Accounts mit ihren IDs zu sehen.")
        return

    # 5. Stimmen-Validierung vor Start
    if not args.boss_voice and args.type in ("both", "boss"):
        print("❌ Bitte gib eine Voice ID für Lord Dreißig an (--boss-voice oder BOSS_VOICE_ID in .env)")
        print("   Tipp: Nutze --list-voices, um deine Stimmen zu sehen.")
        sys.exit(1)

    if not args.narrator_voice and args.type in ("both", "narrator"):
        print("❌ Bitte gib eine Voice ID für Showmaster Pablo an (--narrator-voice oder NARRATOR_VOICE_ID in .env)")
        print("   Tipp: Nutze --list-voices, um deine Stimmen zu sehen.")
        sys.exit(1)

    # Quota check
    check_subscription_quota(args.api_key)

    # 6. Audio-Generierung
    print(f"\n🚀 Starte Generierung von {len(jobs)} Audio-Dateien...")
    print(f"   Modell: {args.model}")
    print(f"   Zielordner: {AUDIO_OUTPUT_DIR}")
    print("-" * 70)

    success_count = 0
    skipped_count = 0
    failed_count = 0

    for idx, job in enumerate(jobs, 1):
        target_path = os.path.join(AUDIO_OUTPUT_DIR, job["filename"])
        if os.path.exists(target_path) and args.only_missing and not args.overwrite:
            print(f"[{idx}/{len(jobs)}] ⏩ Übersprungen (existiert bereits): {job['filename']}")
            skipped_count += 1
            continue

        voice_id = args.boss_voice if job["role"] == "boss" else args.narrator_voice
        print(f"[{idx}/{len(jobs)}] 🎙️ Generiere {job['filename']} ({job['speaker']}, {len(job['text'])} Zeichen)...", end="", flush=True)

        ok, msg = generate_audio_file(job, args.api_key, voice_id, model=args.model)
        if ok:
            print(" ✅ Fertig!")
            success_count += 1
        else:
            print(f" ❌ FEHLER: {msg}")
            failed_count += 1

        # Kurze Pause gegen Rate-Limits
        time.sleep(0.35)

    print("\n" + "=" * 70)
    print("🎉 GENERIERUNG ABGESCHLOSSEN!")
    print(f"  Erfolgreich generiert: {success_count}")
    print(f"  Übersprungen         : {skipped_count}")
    print(f"  Fehlgeschlagen       : {failed_count}")
    print(f"  Dateien gespeichert in: {AUDIO_OUTPUT_DIR}")
    print("=" * 70)


if __name__ == "__main__":
    main()
