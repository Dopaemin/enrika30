// ===================================================================
// ENRIKA & EMIN - LEVEL 30: THE COUPLE SHOWDOWN
// 50 Runden: Quiz, Paar-Duelle & Live-Missionen
// Witzig, authentisch, ohne KI-Kitsch und ohne Emojis
// ===================================================================

const GAME_CONFIG = {
  "heroineName": "Enrika",
  "partnerName": "Emin",
  "birthdayDate": "24. Oktober 1996",
  "turningAge": 30,
  "boss": {
    "name": "Lord Dreißig",
    "title": "Amt für Seriösität und vorzeitiges Spießertum",
    "maxHp": 8000,
    "avatar": "assets/boss.jpg",
    "defeatQuote": "Ich gebe mich geschlagen. Ihr seid weder spießig noch vernünftig geworden. Ihr seid einfach nur unverschämt verliebt und habt viel zu viel Spaß zusammen. Level 30 ist hiermit offiziell freigegeben."
  },
  "heroes": {
    "name": "Enrika & Emin",
    "avatar": "assets/heroes.jpg",
    "maxHp": 100
  },
  "narrator": {
    "name": "Showmaster Pablo",
    "title": "Euer unparteiischer Liebes-Schiedsrichter",
    "avatar": "assets/narrator.jpg"
  },
  "encounters": [
    {
      "id": 1,
      "category": "AUFTAKT",
      "title": "Die Akte 24. Oktober",
      "bossQuote": "Akte Enrika liegt auf meinem Tisch. Dreißig Jahre alt, verheiratet, reist gern. Mein Auftrag ist glasklar: Ab heute gelten strenge Regeln für Ernsthaftigkeit und vernünftige Bettgehzeiten.",
      "narrative": "Lord Dreißig startet die Kontrolle. Mit welcher Einstellung wehrt ihr den ersten bürokratischen Angriff ab?",
      "type": "quiz",
      "options": [
        {
          "text": "Wir kaufen uns ab heute Tupperdosen und gehen sonntags um 20 Uhr schlafen.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsche Antwort! Vorzeitige Kapitulation vor dem Spießertum. Lord Dreißig triumphiert!",
          "bossReaction": "Sehr brav. Genau so habe ich mir das offizielle Spießertum vorgestellt."
        },
        {
          "text": "Solange wir über dieselben absurden Dinge lachen altert hier überhaupt niemand.",
          "isCorrect": true,
          "damage": 185,
          "reaction": "Volltreffer! Humor ist der beste Schutz vor verfrühtem Seniorentum.",
          "bossReaction": "Hört auf mit diesen Lebensweisheiten, das steht nicht im Protokoll."
        },
        {
          "text": "Wir stellen beim Amt einen Eilantrag auf fünf Jahre Verlängerung der Jugend.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Antrag abgelehnt. Verlängerungen gibt es beim Amt für Seriösität nicht.",
          "bossReaction": "Bürokratischer Einspruch abgelehnt. Es wird nicht verhandelt."
        }
      ]
    },
    {
      "id": 2,
      "category": "FOTO VERHÖR",
      "title": "Das Geheimnis des Lachanfalls",
      "image": "assets/photos/felsen_portrait.jpg",
      "bossQuote": "Auf diesem Foto lacht Enrika verdächtig ehrlich. Niemand kichert einfach so vor einer Felswand. Was war da wirklich los?",
      "narrative": "Warum musste Enrika bei diesem wunderschönen Shooting vor den Felsen so unendlich herzlich lachen?",
      "type": "quiz",
      "options": [
        {
          "text": "Weil der Fotograf stolz versprochen hat dieses Bild wird absolut seriös.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch geraten! Seriösität war ab diesem Moment komplett unmöglich.",
          "bossReaction": "Gute Theorie, aber die Wahrheit liegt bei Emins Mimik."
        },
        {
          "text": "Weil Emin behauptet hat er kann klettern wie eine Bergziege.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch geraten! Emins Gesichtsausdruck war der wahre Grund.",
          "bossReaction": "Schade, die Kletterei hätte ich gern im Bericht gesehen."
        },
        {
          "text": "Weil Emin so dumm geguckt hat.",
          "isCorrect": true,
          "damage": 190,
          "reaction": "Volltreffer! Die ungeschminkte Wahrheit. Emin nimmt es mit Humor und der Boss lacht mit.",
          "bossReaction": "Ein ehrliches Geständnis. Emins Blick ist hiermit aktenkundig."
        }
      ]
    },
    {
      "id": 3,
      "category": "PAAR DUELL",
      "title": "Das Pommes Gesetz",
      "bossQuote": "Jetzt kommen wir zu den tiefen Abgründen des Ehealltags. Bei Essen hört die Freundschaft bekanntlich auf.",
      "narrative": "Schaut euch an und tippt gleichzeitig. Wer von euch beiden bestellt nur einen kleinen Salat weil angeblich kein Hunger da ist, isst dann aber die Hälfte von Emins Pommes weg?",
      "type": "who_is_it",
      "whoQuestion": "Wer behauptet keinen Hunger zu haben und isst dann fremde Pommes?",
      "reactions": {
        "enrika": {
          "damage": 180,
          "reaction": "Punkt an Enrika. Pommes vom fremden Teller haben nachweislich null Kalorien.",
          "bossReaction": "Das älteste Beziehungsmanöver der Welt. Meisterhaft ausgeführt."
        },
        "emin": {
          "damage": 180,
          "reaction": "Punkt an Emin. Wenn Emin Pommes stiehlt ist das eine offizielle Beschlagnahmung.",
          "bossReaction": "Mundraub unter Eheleuten. Vor keinem Gericht anfechtbar."
        }
      }
    },
    {
      "id": 4,
      "category": "LIVE MISSION",
      "title": "Der Handtaschen Schnelltest",
      "bossQuote": "Frauenhandtaschen sind ein schwarzes Loch für Raum und Zeit. Kein Ehemann dieser Welt weiß was sich darin befindet.",
      "narrative": "Emin muss jetzt innerhalb von 20 Sekunden vier Gegenstände aufzählen die Enrika jeden Tag begeleiten, Enrika muss bestätigen ob das stimmt.",
      "type": "challenge",
      "challengePrompt": "Startet den Timer. Emin zählt vier Gegenstände auf. Enrika gibt das Urteil.",
      "timerSeconds": 20,
      "completionReward": {
        "text": "Inventur bestanden. Emin kennt den Inhalt erstaunlich gut.",
        "damage": 210,
        "reaction": "Unglaublich. Emin hat das Mysterium der Handtasche gelöst.",
        "bossReaction": "Wie konnte er das wissen? Normalerweise scheitern daran alle Männer."
      }
    },
    {
      "id": 5,
      "category": "FOTO VERHÖR",
      "title": "Traumausblick mit Meeresrauschen",
      "image": "assets/photos/balkon_meerblick.jpg",
      "bossQuote": "Steinbogen, blaues Meer, zwei Kaffeetassen. Ein Bild wie aus einem Reisekatalog. Wann genau fand dieser Ausblick statt?",
      "narrative": "Wann haben Enrika und Emin diesen wunderschönen Ausblick bei einem Kaffee genossen?",
      "type": "quiz",
      "options": [
        {
          "text": "Ende August 2024 nach einer wilden Taxifahrt.",
          "isCorrect": true,
          "damage": 185,
          "reaction": "Volltreffer! Präzises Gedächtnis. Der Urlaubszauber bringt Lord Dreißig ins Wanken.",
          "bossReaction": "Ende August 2024. Exakt protokolliert. Da war der Sommer perfekt."
        },
        {
          "text": "Mitte Juli 2023 nach zehn Stunden Flugverspätung.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsches Datum! Der Kalender der Behörde sagt etwas ganz anderes.",
          "bossReaction": "Falsches Jahr. Mein Kalender schlägt gnadenlos zu."
        },
        {
          "text": "Anfang Mai 2024 kurz vor dem ersten großen Wolkenbruch.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsche Jahreszeit! Der echte Sommerurlaub war später.",
          "bossReaction": "Falsche Jahreszeit. Dieser Punkt geht an die Behörde."
        }
      ]
    },
    {
      "id": 6,
      "category": "FOTO VERHÖR",
      "title": "Vollgas im Elektroflitzer",
      "image": "assets/photos/auto_polestar.jpg",
      "bossQuote": "Ein schickes Elektroauto mit ordentlich Drehmoment. Emin gibt den Schlüssel normalerweise nicht ohne Herzrasen her.",
      "narrative": "Wann durfte Enrika das allererste Mal das neue Auto selbst über den Asphalt steuern?",
      "type": "quiz",
      "options": [
        {
          "text": "Erst nachdem Emin alle vier Felgen mit Luftpolsterfolie abgeklebt hat.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Emin war vorsichtig, aber so extrem nun auch wieder nicht.",
          "bossReaction": "Klingt plausibel, entspricht aber nicht den Akten."
        },
        {
          "text": "Erst im Hochsommer als Emin nach drei Stunden Fahrt die Augen zugefallen sind.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Enrika hat sich den Schlüssel viel schneller gesichert.",
          "bossReaction": "Monatelang warten? Nicht mit dieser Frau."
        },
        {
          "text": "Ende Februar als das Auto neu dazu kam.",
          "isCorrect": true,
          "damage": 190,
          "reaction": "Volltreffer! Enrika beschleunigt mühelos an allen Vorwürfen vorbei.",
          "bossReaction": "Ende Februar. Da lag noch fast Schnee und sie übernimmt direkt das Steuer."
        }
      ]
    },
    {
      "id": 7,
      "category": "PAAR DUELL",
      "title": "Google Maps gegen Männerstolz",
      "bossQuote": "Im Auto fallen alle Masken. Wer hat bei der Routenführung wirklich das letzte Wort?",
      "narrative": "Schaut euch an und stimmt ab. Wer verfährt sich laut Navigation um einen halben Kilometer und behauptet felsenfest das sei eine geheime Abkürzung?",
      "type": "who_is_it",
      "whoQuestion": "Wer weigert sich umzudrehen weil das angeblich eine Abkürzung ist?",
      "reactions": {
        "emin": {
          "damage": 180,
          "reaction": "Klassischer Männerstolz. Umkehren ist eine Schwäche, Verirren ist ein Abenteuer.",
          "bossReaction": "Hauptsache selbstbewusst in die falsche Richtung fahren."
        },
        "enrika": {
          "damage": 180,
          "reaction": "Enrikas Intuition schlägt jeden Satelliten. Google Maps hatte einfach keine Ahnung.",
          "bossReaction": "Moderne Technik kapituliert vor weiblicher Entschlossenheit."
        }
      }
    },
    {
      "id": 8,
      "category": "FOTO VERHÖR",
      "title": "Romantik am Atlantik",
      "image": "assets/photos/strand_nacht.jpg",
      "bossQuote": "Dunkle Nacht, sanfte Wellen, warmer Sand. Was war das Besondere an genau diesem Abend?",
      "narrative": "Was war der unvergessliche Anlass für dieses wunderschöne Foto am Strand?",
      "type": "quiz",
      "options": [
        {
          "text": "Emin hat behauptet er sieht die Milchstraße und es war ein Passagierflugzeug nach Madrid.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Astronomie ist zwar nicht Emins Stärke, aber der Anlass war ein anderer.",
          "bossReaction": "Schöne Anekdote, aber die Akte verlangt den wahren Anlass."
        },
        {
          "text": "Das war unser allererster Abend in Gran Canaria.",
          "isCorrect": true,
          "damage": 190,
          "reaction": "Volltreffer! Der Zauber des ersten Urlaubsabends lässt Lord Dreißig verzweifeln.",
          "bossReaction": "Gran Canaria, erster Abend. Da war die Welt noch voller Romantik."
        },
        {
          "text": "Enrika hat mitten im Sand festgestellt dass sie ihre Lieblingssandalen im Taxi vergessen hat.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Alle Schuhe blieben an Bord.",
          "bossReaction": "Wäre ein Fest für meine Schadensakte gewesen, schade."
        }
      ]
    },
    {
      "id": 9,
      "category": "PAAR DUELL",
      "title": "Die schwerste Frage der Menschheit",
      "bossQuote": "Es ist Samstagabend, der Magen knurrt. Der Ernst des Lebens schlägt mit voller Wucht zu.",
      "narrative": "Wer von euch beiden sagt zuerst mir ist total egal was wir essen, lehnt dann aber fünf Restaurants hintereinander ab?",
      "type": "who_is_it",
      "whoQuestion": "Wer sagt mir egal, findet dann aber an jedem Vorschlag einen Haken?",
      "reactions": {
        "enrika": {
          "damage": 180,
          "reaction": "Ein weltweites Phänomen. Keine Pizza, keine Nudeln, kein Burger, aber wirklich völlig offen.",
          "bossReaction": "An dieser Frage sind schon ganze Zivilisationen gescheitert."
        },
        "emin": {
          "damage": 180,
          "reaction": "Emin scrollt durch Lieferando wie durch Börsenkurse und entscheidet sich nie.",
          "bossReaction": "Lieferdienste fürchten diese Entscheidungsschwäche seit Jahren."
        }
      }
    },
    {
      "id": 10,
      "category": "FOTO VERHÖR",
      "title": "Frischer Wind über zwei Kontinenten",
      "image": "assets/photos/bosporus_bootsfahrt.jpg",
      "bossQuote": "Kapuze tief im Gesicht, Sonnenbrille sitzt, Möwen kreisen über dem Wasser. In welchem Monat fand diese Seefahrt statt?",
      "narrative": "Wann fand diese stürmische und wunderschöne Bootsfahrt in Istanbul statt?",
      "type": "quiz",
      "options": [
        {
          "text": "April 2025 als alle keine Lust hatten an dem Tag.",
          "isCorrect": true,
          "damage": 185,
          "reaction": "Volltreffer! Perfekt erinnert. Die frische Meeresbrise wirbelt Lord Dreißigs Akten durcheinander.",
          "bossReaction": "April 2025. Notiert. Da hat der Bosporus ordentlich durchgepustet."
        },
        {
          "text": "April 2024 als frühlicher Spaziergang auf dem Wasser.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falscher Monat! Die unvergessliche Bootsfahrt fand im Frühling statt.",
          "bossReaction": "Falscher Monat. Mein Stempel sagt nein."
        },
        {
          "text": "Mai 2025 bei dreißig Grad im Schatten.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Bei Sommerhitze hätte Enrika die Kapuze wohl kaum so fest zugezogen.",
          "bossReaction": "Bei Hitze mit Kapuze? Absurd."
        }
      ]
    },
    {
      "id": 11,
      "category": "LIVE MISSION",
      "title": "30 Sekunden Augenduell",
      "bossQuote": "Nach so vielen Jahren schaut man sich doch nur noch aufs Display anstatt in die Augen. Das widerlegt ihr mir im Leben nicht.",
      "narrative": "iPad oder Handy ablegen. Schaut euch dreißig Sekunden lang tief in die Augen ohne wegzusehen und ohne zu grinsen.",
      "type": "challenge",
      "challengePrompt": "Startet den Timer. Dreißig Sekunden ehrlicher Blickkontakt. Wer zuerst kichert verliert.",
      "timerSeconds": 30,
      "completionReward": {
        "text": "Überstanden. Dieser Blickkontakt beweist alles.",
        "damage": 220,
        "reaction": "Der Boss ist sprachlos. Gegen echte Nähe hat seine Bürokratie keine Chance.",
        "bossReaction": "Unglaublich. Ihr könnt euch tatsächlich noch ohne Smartphone ansehen."
      }
    },
    {
      "id": 12,
      "category": "PAAR DUELL",
      "title": "Logistik vor der Abreise",
      "bossQuote": "Reisen erfordert Disziplin und Minimalismus. Wer von euch beiden übertreibt beim Packen maßlos?",
      "narrative": "Schaut euch an und tippt. Wer packt für einen Dreitageausflug vierzehn verschiedene Outfits ein für den Fall eines spontanen Empfangs beim Bundespräsidenten?",
      "type": "who_is_it",
      "whoQuestion": "Wer packt dreimal mehr Kleidung ein als jemals getragen werden kann?",
      "reactions": {
        "enrika": {
          "damage": 175,
          "reaction": "Vorsicht ist besser als Nachsicht. Man weiß schließlich nie welches Wetter oder welches Event droht.",
          "bossReaction": "Drei Koffer für ein Wochenende. Die Fluggesellschaften danken herzlich."
        },
        "emin": {
          "damage": 175,
          "reaction": "Emin packt zwei T Shirts, eine Badehose und das Ladekabel. Das nennt man Optimismus.",
          "bossReaction": "Minimalismus an der Grenze zur Verwahrlosung."
        }
      }
    },
    {
      "id": 13,
      "category": "HOCHZEITSSPEZIAL",
      "title": "Das offizielle Ja Wort",
      "image": "assets/photos/standesamt.jpg",
      "bossQuote": "Unterschrift geleistet, Ringe am Finger. Ein rechtsgültiger Bund fürs Leben. Was war der wahre Gedanke in dieser Sekunde?",
      "narrative": "Was ging euch beiden bei der Unterschrift im Standesamt durch den Kopf?",
      "type": "quiz",
      "options": [
        {
          "text": "Hoffentlich passt der Ring sonst muss Emin zur Nagelfeile greifen.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 15,
          "reaction": "Falsch! Pragmatischer Humor, aber die Romantik stand an diesem Tag ganz oben.",
          "bossReaction": "Ein handwerklicher Ansatz, gefällt mir fast schon."
        },
        {
          "text": "Wann wird endlich das Hochzeitsbuffet eröffnet, der Magen knurrt seit drei Stunden.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 15,
          "reaction": "Falsch! Hunger war zwar da, aber das Ja-Wort war der eigentliche Star.",
          "bossReaction": "Ein verständlicher Gedanke bei langen Behördenterminen."
        },
        {
          "text": "Ab heute ganz offiziell Team Unbesiegbar, kein Zurück mehr und das ist das Beste überhaupt.",
          "isCorrect": true,
          "damage": 195,
          "reaction": "Volltreffer der Extraklasse! Das Bündnis fürs Leben erschüttert die Behörde.",
          "bossReaction": "Ein rechtskräftiger Bund fürs Leben. Da ist jeder Einspruch zwecklos."
        }
      ]
    },
    {
      "id": 14,
      "category": "LIVE MISSION",
      "title": "Die Pose des Jahrhunderts",
      "image": "assets/photos/hochzeit_rosen.jpg",
      "bossQuote": "Euer Foto vor der Rosenwand ist legendär. Enrika strahlt elegant, Emin zieht seine unnachahmliche Grimasse. Macht mir das jetzt nach.",
      "narrative": "Stellt genau diese Pose gemeinsam auf der Couch für fünfzehn Sekunden nach.",
      "type": "challenge",
      "challengePrompt": "Enrika stützt das Kinn sanft auf die Hände, Emin zieht seine berühmte Grimasse. Fünfzehn Sekunden halten.",
      "timerSeconds": 15,
      "completionReward": {
        "text": "Perfekt nachgestellt. Eins zu eins wie am Hochzeitstag.",
        "damage": 220,
        "reaction": "Lord Dreißig bricht in schallendes Gelächter aus. Seine Contenance schwindet.",
        "bossReaction": "Emins Gesichtsausdruck gehört eingerahmt und an die Wand gehängt."
      }
    },
    {
      "id": 15,
      "category": "PAAR DUELL",
      "title": "Der beste Freund des Hauses",
      "bossQuote": "Onlinebestellungen und Pappkartons. Wer von euch beiden hält die Konsumwirtschaft am Laufen?",
      "narrative": "Wer von euch beiden bekommt mehr Pakete geliefert und versteckt die Kartons dezent im Flur?",
      "type": "who_is_it",
      "whoQuestion": "Wer kennt den DHL Boten mit Vornamen und bekommt täglich Päckchen?",
      "reactions": {
        "enrika": {
          "damage": 175,
          "reaction": "Der Paketbote grüßt Enrika auf der Straße wie ein alter Schulfreund.",
          "bossReaction": "Kartons über Kartons, aber die Freude beim Aufreißen ist unbezahlbar."
        },
        "emin": {
          "damage": 175,
          "reaction": "Emin und seine geheimnisvollen Technik Gadgets die man angeblich unbedingt braucht.",
          "bossReaction": "Ein weiteres Ladekabel für die Sammlung. Man kann nie genug haben."
        }
      }
    },
    {
      "id": 16,
      "category": "EHE ALLTAG",
      "title": "Die Serien Verrat Akte",
      "bossQuote": "Netflix und Streaming sind der wahre Treuetest des einundzwanzigsten Jahrhunderts. Wer betrügt hier beim Weiterschauen?",
      "narrative": "Was passiert wenn einer von euch heimlich eine Folge der gemeinsamen Lieblingsserie vorarbeitet?",
      "type": "quiz",
      "options": [
        {
          "text": "Wir schauen Serien nur noch mit notarieller Beglaubigung zusammen.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! So spießig sind selbst Enrika und Emin nicht.",
          "bossReaction": "Notariell beglaubigt? Das wäre mein Traum gewesen."
        },
        {
          "text": "Emin schwört er hat nicht weitergeschaut, kennt aber verdächtig genau schon den Mörder.",
          "isCorrect": true,
          "damage": 190,
          "reaction": "Volltreffer! Überführt durch schlechtes Pokerface. Der Boss amüsiert sich.",
          "bossReaction": "Typisch. Unschuldig gucken und trotzdem alles vorher wissen."
        },
        {
          "text": "Enrika wartet immer brav, selbst wenn die Fortsetzung erst in zwei Jahren erscheint.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Niemand hat so viel Geduld bei einem echten Cliffhanger.",
          "bossReaction": "Zwei Jahre warten? Das glaubt euch kein Richter."
        }
      ]
    },
    {
      "id": 17,
      "category": "PAAR DUELL",
      "title": "Der Kältetod im Schlafzimmer",
      "bossQuote": "Das Thermometer trennt die Menschheit in Frostbeulen und Polarbären.",
      "narrative": "Wer von euch beiden dreht die Heizung nachts heimlich herunter oder reißt bei Minusgraden das Fenster sperrangelweit auf?",
      "type": "who_is_it",
      "whoQuestion": "Wer schläft am liebsten im arktischen Eisschrank und wer braucht drei Daunendecken?",
      "reactions": {
        "emin": {
          "damage": 180,
          "reaction": "Emin braucht Frischluft wie ein Eisbär. Sauerstoff vor Gemütlichkeit.",
          "bossReaction": "Zitterpartie im Ehebett. Spart immerhin Heizkosten."
        },
        "enrika": {
          "damage": 180,
          "reaction": "Enrika baut sich ein Wärmenest aus drei Decken und Wärmflasche.",
          "bossReaction": "Ein Murmeltier im Winterschlaf. Sehr sympathisch."
        }
      }
    },
    {
      "id": 18,
      "category": "LIVE MISSION",
      "title": "Der Rücken Blindtest",
      "bossQuote": "Blindes Vertrauen und feine Antennen. Jetzt testen wir wie gut eure sensorische Verbindung wirklich ist.",
      "narrative": "Emin malt mit dem Finger langsam ein Symbol oder ein kurzes Wort wie Herz, Stern oder Sonne auf Enrikas Rücken. Enrika muss es innerhalb von zwanzig Sekunden mit geschlossenen Augen blind erraten.",
      "type": "challenge",
      "challengePrompt": "Startet den Timer. Emin zeichnet ein Symbol mit dem Finger auf Enrikas Rücken. Enrika errät es blind.",
      "timerSeconds": 20,
      "completionReward": {
        "text": "Blindes Verständnis bewiesen. Enrika spürt jede Regung.",
        "damage": 215,
        "reaction": "Volltreffer! Enrika hat das Symbol sofort fehlerfrei erfühlt.",
        "bossReaction": "Sensorische Telepathie auf der Couch. Meine Messgeräte spielen verrückt."
      }
    },
    {
      "id": 19,
      "category": "FOTO VERHÖR",
      "title": "Tosende Fluten und nasse Haare",
      "image": "assets/photos/rheinfall_urlaub.jpg",
      "bossQuote": "Wasserrauschen, Gischt im Gesicht, strahlende Laune. Wer hatte bei diesem Abenteuer mehr Angst nass zu werden?",
      "narrative": "Was war der geheime Höhepunkt dieses Ausflugs zu den Wasserfällen?",
      "type": "quiz",
      "options": [
        {
          "text": "Enrika wollte unbedingt mit den Fischen um die Wette tauchen.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Enrika hat das Naturschauspiel lieber sicher vom Boot aus genossen.",
          "bossReaction": "Bisschen zu viel Fantasie für meinen amtlichen Bericht."
        },
        {
          "text": "Das Boot ist rückwärts wieder den Wasserfall hochgefahren.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Die Physik gilt auch für Enrika und Emin.",
          "bossReaction": "Physikalische Gesetze außer Kraft gesetzt? Nicht in meiner Schicht."
        },
        {
          "text": "Emin hat krampfhaft versucht seine Frisur vor dem Wind zu retten.",
          "isCorrect": true,
          "damage": 190,
          "reaction": "Volltreffer! Prioritäten müssen schließlich gewahrt bleiben.",
          "bossReaction": "Haargel gegen Naturgewalten. Ein epischer Kampf."
        }
      ]
    },
    {
      "id": 20,
      "category": "PAAR DUELL",
      "title": "Das Badezimmer Monopol",
      "bossQuote": "Zehn Minuten vor der Verabredung. Wer blockiert jetzt noch das Badezimmer?",
      "narrative": "Wer von euch beiden braucht morgens oder vor Partys dreimal länger im Bad und behauptet bin in zwei Minuten fertig?",
      "type": "who_is_it",
      "whoQuestion": "Wer braucht länger im Bad und definiert zwei Minuten extrem großzügig?",
      "reactions": {
        "enrika": {
          "damage": 175,
          "reaction": "Perfektion braucht Zeit. Schönheit lässt sich nun mal nicht hetzen.",
          "bossReaction": "Zwei Minuten bedeuten mindestens eine halbe Stunde. Klassiker."
        },
        "emin": {
          "damage": 175,
          "reaction": "Emin vor dem Spiegel beim Barttrimmen ist eine eigene wissenschaftliche Disziplin.",
          "bossReaction": "Haarpflege auf Millimeter-Präzision. Die Behörde staunt."
        }
      }
    },
    {
      "id": 21,
      "category": "LIVE MISSION",
      "title": "Die Gedankenübertragung",
      "bossQuote": "Ihr behauptet ihr kennt euch in und auswendig? Dann beweist mir jetzt telepathische Übereinstimmung.",
      "narrative": "Zählt gemeinsam laut von Drei herunter und ruft auf Eins gleichzeitig euer absolutes gemeinsames Lieblingsessen für einen gemütlichen Couchabend aus.",
      "type": "challenge",
      "challengePrompt": "Startet den Timer. Zählt von Drei herunter und ruft gleichzeitig euer Lieblingsessen aus. Bei Treffer Mission abschließen.",
      "timerSeconds": 15,
      "completionReward": {
        "text": "Telepathie bewiesen. Eins zu eins der gleiche Gedanke.",
        "damage": 210,
        "reaction": "Perfekte Synchronisation! Lord Dreißigs Bürokratiemonitor stürzt ab.",
        "bossReaction": "Zwei Köpfe, ein Magen. Das nenne ich beängstigende Einigkeit."
      }
    },
    {
      "id": 22,
      "category": "QUIZ",
      "title": "Der Sonntagmorgen Spießer Test",
      "bossQuote": "Es ist Sonntag, 8 Uhr morgens. Wie verbringt ein echter Spießer ab Level 30 diesen heiligen Tag?",
      "narrative": "Was ist das verbotenste Verhalten an einem Sonntagmorgen für Enrika und Emin?",
      "type": "quiz",
      "options": [
        {
          "text": "Vor 10 Uhr aufstehen um den Rasen auf exakt 3 Millimeter zu stutzen.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Das ist pure Gemütlichkeit und das genaue Gegenteil von Spießertum.",
          "bossReaction": "Rasenmähen vor dem Aufstehen. Die Höchststrafe für Lebensfreude."
        },
        {
          "text": "Im Bett Kaffee trinken und bis mittags gemeinsam Serien schauen.",
          "isCorrect": true,
          "damage": 190,
          "reaction": "Volltreffer! Genau diese Spießer-Hölle wird heute feierlich abgewehrt.",
          "bossReaction": "Im Bett faulenzen? Das ist ja wohl die reinste Provokation."
        },
        {
          "text": "Spontan beschließen Brötchen zu holen und mit frischen Croissants zurückkommen.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Frische Croissants sind Lebensqualität und kein Verbrechen.",
          "bossReaction": "Croissants statt Haferbrei? Meine Diät-Akte rebelliert."
        }
      ]
    },
    {
      "id": 23,
      "category": "PAAR DUELL",
      "title": "Der Film Einschlaf Champion",
      "bossQuote": "Ein packender Thriller auf dem Bildschirm. Die Spannung steigt. Wer sägt bereits leise auf dem Kissen?",
      "narrative": "Wer von euch beiden schläft nach genau zehn Minuten Film auf der Couch ein und sagt beim Wecken ich hab nur kurz die Augen ausgeruht?",
      "type": "who_is_it",
      "whoQuestion": "Wer schläft beim Film zuerst ein und behauptet er hat alles mitbekommen?",
      "reactions": {
        "enrika": {
          "damage": 180,
          "reaction": "Augen kurz ausruhen ist Enrikas Spezialdisziplin. Der Film läuft im Traum weiter.",
          "bossReaction": "Augen ausgeruht. Die beste Ausrede der Fernsehgeschichte."
        },
        "emin": {
          "damage": 180,
          "reaction": "Emin pennt mitten im Finale weg und fragt am nächsten Morgen wie es ausgegangen ist.",
          "bossReaction": "Tiefschlaf bei Explosionen. Beneidenswerte Nerven."
        }
      }
    },
    {
      "id": 24,
      "category": "FOTO VERHÖR",
      "title": "Lichtermeer am Bosporus",
      "image": "assets/photos/istanbul_nacht.jpg",
      "bossQuote": "Istanbul bei Nacht, die Brücke funkelt, die Stadt schläft nie. Wer von euch beiden wollte nach Mitternacht noch weiterziehen?",
      "narrative": "Was war das Unvergesslichste an dieser magischen Nacht in Istanbul?",
      "type": "quiz",
      "options": [
        {
          "text": "Dass Emin nach dem besten Döner der Stadt gesucht hat.",
          "isCorrect": true,
          "damage": 195,
          "reaction": "Volltreffer! Wahre Liebe geht eben auch mitten in der Nacht durch den Magen.",
          "bossReaction": "Döner-Jagd um zwei Uhr nachts. Echte Entschlossenheit."
        },
        {
          "text": "Dass Enrika vorgeschlagen hat die Brücke zu Fuß nach Asien zu überqueren.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Die Füße taten vom Tag schon viel zu sehr weh.",
          "bossReaction": "Zu Fuß nach Asien? Klingt nach einer sportlichen Lüge."
        },
        {
          "text": "Dass beide um 21 Uhr mit Kamillentee im Hotelzimmer saßen.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Kamillentee in Istanbul? Nicht mit diesem Paar.",
          "bossReaction": "Kamillentee hätte mir gefallen, entspricht aber leider nicht der Wahrheit."
        }
      ]
    },
    {
      "id": 25,
      "category": "LIVE MISSION",
      "title": "Der Tauchstation Ernsthaftigkeitstest",
      "image": "assets/photos/taucherbrille_kueche.jpg",
      "bossQuote": "Eine Taucherbrille beim Kochen in der Küche? Im Amtsdeutsch nennt man das groben Unfug. Schafft ihr es, euch 15 Sekunden lang ernst in die Augen zu schauen ohne loszuprusten?",
      "narrative": "Schaut euch dieses legendäre Küchenfoto an. Blickt euch danach 15 Sekunden lang gegenseitig tief in die Augen und behaltet ein eiskaltes Pokerface.",
      "type": "challenge",
      "challengePrompt": "Startet den Timer. Fünfzehn Sekunden lang tief in die Augen schauen – wer zuerst lacht oder grinst, verliert die Runde.",
      "timerSeconds": 15,
      "completionReward": {
        "text": "Eiserne Nerven bewiesen! Trotz Taucherbrillen-Flashback eiskalt standgehalten.",
        "damage": 220,
        "reaction": "Lachanfall erfolgreich unterdrückt! Lord Dreißigs ernste Miene gerät ins Wanken.",
        "bossReaction": "Faszinierende Beherrschung. Bei diesem Foto hätte selbst ich fast geschmunzelt."
      }
    },
    {
      "id": 26,
      "category": "PAAR DUELL",
      "title": "Das Einpark Manöver",
      "bossQuote": "Enge Parklücke, Bordsteinkante droht. Wer übernimmt das Kommando?",
      "narrative": "Wer von euch beiden korrigiert heimlich die Parkposition oder steigt mit einem skeptischen Blick aus dem Auto?",
      "type": "who_is_it",
      "whoQuestion": "Wer kontrolliert nach dem Einparken noch dreimal den Abstand zum Bordstein?",
      "reactions": {
        "emin": {
          "damage": 175,
          "reaction": "Emins Alufelgen sind sein Augapfel. Zehn Zentimeter Sicherheitsabstand müssen sein.",
          "bossReaction": "Felgenschutz ist Männersache. Sehr ordentlich."
        },
        "enrika": {
          "damage": 40,
          "reaction": "Enrika parkt mit Schwung ein. Steht er erst mal, steht er.",
          "bossReaction": "Pragmatisch und schmerzfrei. So muss das sein."
        }
      }
    },
    {
      "id": 27,
      "category": "QUIZ",
      "title": "Das Mysterium der Tupperdosen",
      "bossQuote": "Der absolute Kern des dreißigsten Geburtstags: Glasschüsseln mit Klickverschluss.",
      "narrative": "Wohin verschwinden im Haushalt von Enrika und Emin eigentlich immer die Tupperdosendeckel?",
      "type": "quiz",
      "options": [
        {
          "text": "Emin faltet sie akkurat und stapelt sie nach Größe im Schrank.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! So viel deutsche Gründlichkeit traut Emin niemand zu.",
          "bossReaction": "Nach Durchmesser sortiert? Das wäre vorbildlich gewesen."
        },
        {
          "text": "Enrika verschenkt sie heimlich an Bedürftige.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Niemand verschenkt freiwillig passende Deckel.",
          "bossReaction": "Völlig abwegig. Deckel behält man für die Ewigkeit."
        },
        {
          "text": "Enrika bringt sie immer mit zur Arbeit und vergisst sie dann",
          "isCorrect": true,
          "damage": 185,
          "reaction": "Volltreffer! Ein kosmisches Naturgesetz das kein Physiker erklären kann.",
          "bossReaction": "Das ist ja unglaublich präzise. Die Behälter bleiben in der Praxis zurück."
        }
      ]
    },
    {
      "id": 28,
      "category": "LIVE MISSION",
      "title": "Fünf Kosenamen ohne Pause",
      "bossQuote": "Romantischer Wortschatz oder peinliche Kosenamen? Zeigt mir euer Repertoire.",
      "narrative": "Emin und Enrika müssen sich abwechselnd innerhalb von 15 Sekunden fünf originelle Kosenamen zuwerfen ohne zu stocken.",
      "type": "challenge",
      "challengePrompt": "Startet den Timer. Abwechselnd fünf Kosenamen nennen. Schatz und Maus zählen nur einmal.",
      "timerSeconds": 15,
      "completionReward": {
        "text": "Kreativer Liebesregen. Lord Dreißig schüttelt sich vor Kitsch.",
        "damage": 220,
        "reaction": "Gegen so viel Zuneigung hat der Boss keine bürokratischen Mittel.",
        "bossReaction": "Mein Zuckerwert schießt durch die Decke. Hört auf damit."
      }
    },
    {
      "id": 29,
      "category": "PAAR DUELL",
      "title": "Das Akku Drama",
      "bossQuote": "Drei Prozent Restakku und kein Ladekabel in Sicht. Wer lebt am Limit?",
      "narrative": "Wer von euch beiden hat ständig einen roten Akkubalken und fragt verzweifelt hast du kurz dein Ladekabel?",
      "type": "who_is_it",
      "whoQuestion": "Wer verlässt das Haus regelmäßig mit fünf Prozent Akku?",
      "reactions": {
        "enrika": {
          "damage": 180,
          "reaction": "Enrika lebt digital am Limit. Ein Prozent reicht noch für drei Sprachnachrichten.",
          "bossReaction": "Nervenkitzel im Alltag. Reine Akku-Verschwendung."
        },
        "emin": {
          "damage": 180,
          "reaction": "Emin besitzt vier Powerbanks und leiht trotzdem Enrikas Kabel aus.",
          "bossReaction": "Kabeldiebstahl unter Eheleuten. Schweres Dienstvergehen."
        }
      }
    },
    {
      "id": 30,
      "category": "QUIZ",
      "title": "Die Baumarkt Versuchung",
      "bossQuote": "Der dreißigste Geburtstag öffnet automatisch das Tor zu Schrauben, Dübeln und Gartenfräsen.",
      "narrative": "Was passiert wenn Emin an einem Samstagnachmittag zufällig einen Baumarkt betritt?",
      "type": "quiz",
      "options": [
        {
          "text": "Er kauft gar nichts weil er nichts damit anstellen kann, sondern Enrika",
          "isCorrect": true,
          "damage": 190,
          "reaction": "Volltreffer! Klassischer Baumarkt-Zauber. Man braucht schließlich immer einen zweiten Akkuschrauber.",
          "bossReaction": "Werkzeug horten ist das erste Anzeichen des Spießertums. Ertappt."
        },
        {
          "text": "Er dreht sofort um weil ihm die Gerüche von Holz und Farbe Kopfschmerzen bereiten.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Emin liebt das Stöbern in den Gängen.",
          "bossReaction": "Kopfschmerzen im Baumarkt? Eine glatte Lüge."
        },
        {
          "text": "Er kauft ausschließlich Zimmerpflanzen und Duftkerzen.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Emin sucht nach Schrauben und Gadgets, nicht nach Lavendel.",
          "bossReaction": "Duftkerzen in der Werkzeugabteilung? Völlig verfehlt."
        }
      ]
    },
    {
      "id": 31,
      "category": "LIVE MISSION",
      "title": "Der Schwarzlicht Verrücktheits-Check",
      "image": "assets/photos/schwarzlicht_3d_brille.jpg",
      "bossQuote": "3D-Brillen, Neonlicht und hemmungsloser Spaß vor der Kamera. So benimmt sich doch keine gesetzte, seriöse Ehegemeinschaft!",
      "narrative": "Schaut euch diese Party-Energie an! Steht auf und feiert oder tanzt zwanzig Sekunden lang euren verrücktesten Paartanz mitten im Raum.",
      "type": "challenge",
      "challengePrompt": "Startet den Timer. Zwanzig Sekunden Party-Action auf der Couch oder im Wohnzimmer.",
      "timerSeconds": 20,
      "completionReward": {
        "text": "Schwungvoll und unbezahlbar. Das Spießertum ist meilenweit entfernt.",
        "damage": 225,
        "reaction": "Lord Dreißig traut seinen Augen nicht. So viel Rhythmus und Spaß steht in keiner Akte.",
        "bossReaction": "Das sieht nach absolut verbotenem Spaß aus. Meine Akten fangen Feuer."
      }
    },
    {
      "id": 32,
      "category": "PAAR DUELL",
      "title": "Der Dickkopf Pokal",
      "bossQuote": "Eine Meinungsverschiedenheit bricht aus. Wer gibt als Erster klein bei?",
      "narrative": "Wer von euch beiden ist sturer beim Streiten und braucht länger um zuzugeben dass der andere recht hatte?",
      "type": "who_is_it",
      "whoQuestion": "Wer behält lieber recht als Frieden zu schließen?",
      "reactions": {
        "enrika": {
          "damage": 50,
          "reaction": "Enrika argumentiert mit messerscharfer Logik bis Emin aufgibt.",
          "bossReaction": "Eiserner Wille. Eine Debatte mit Enrika gewinnt man nie."
        },
        "emin": {
          "damage": 180,
          "reaction": "Emin schmollt fünf Minuten und tut dann so als wäre nie etwas gewesen.",
          "bossReaction": "Selektives Gedächtnis. Eine bewährte Überlebensstrategie."
        }
      }
    },
    {
      "id": 33,
      "category": "FOTO VERHÖR",
      "title": "Das leuchtende Herz",
      "image": "assets/photos/herz_moment.jpg",
      "bossQuote": "Ein riesiges leuchtendes Herz vor dunklem Himmel. Was war der wahre Grund für diesen Schnappschuss?",
      "narrative": "Was beweist dieses Foto über die Liebe von Enrika und Emin?",
      "type": "quiz",
      "options": [
        {
          "text": "Dass Emin nur stehengeblieben ist weil er dachte es gibt kostenlose Zuckerwatte.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Das Herz war ein echter Romantik-Moment, keine Snackbude.",
          "bossReaction": "Zuckerwatte? Hätte zu Emin gepasst, war aber nicht so."
        },
        {
          "text": "Dass beide zusammen heller strahlen als jede LED Installation dieser Stadt.",
          "isCorrect": true,
          "damage": 195,
          "reaction": "Volltreffer! Romantischer Direktschlag gegen Lord Dreißigs kalte Paragrafen.",
          "bossReaction": "Kitschig bis zum Gehtnichtmehr. Meine Brille beschlägt."
        },
        {
          "text": "Dass Enrika das Herz für ihren Instagram Feed exakt 47 Mal fotografiert hat.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Ein Schuss, voller Treffer.",
          "bossReaction": "47 Fotos hätte ich im Protokoll vermerkt. Einzelschuss reicht."
        }
      ]
    },
    {
      "id": 34,
      "category": "PAAR DUELL",
      "title": "Die geheime Snack Schatzkammer",
      "bossQuote": "In jeder Ehe gibt es dunkle Geheimnisse. Die schlimmsten betreffen Süßigkeiten.",
      "narrative": "Wer von euch beiden versteckt Schokolade, Chips oder Gummibärchen vor dem anderen an geheimen Orten?",
      "type": "who_is_it",
      "whoQuestion": "Wer bunkert heimlich Snacks und behauptet die Packung war schon leer?",
      "reactions": {
        "enrika": {
          "damage": 180,
          "reaction": "Enrikas Geheimversteck hinter den Haferflocken ist legendär.",
          "bossReaction": "Taktische Vorratshaltung. Sehr vorausschauend."
        },
        "emin": {
          "damage": 50,
          "reaction": "Emin isst die Schokolade auf und lässt ein Alibi-Stückchen in der Verpackung.",
          "bossReaction": "Das Alibi-Stückchen. Eine feige Tat vor dem Gesetz."
        }
      }
    },
    {
      "id": 35,
      "category": "LIVE MISSION",
      "title": "Das Datums Duell im Rückwärtsgang",
      "bossQuote": "Geburtstage und Hochzeitstage. Für viele Ehemänner das sichere Todesurteil.",
      "narrative": "Emin muss innerhalb von zwanzig Sekunden Enrikas Geburtstag und das Hochzeitsdatum rückwärts fehlerfrei aufsagen.",
      "type": "challenge",
      "challengePrompt": "Startet den Timer. Emin sagt beide Daten rückwärts auf. Enrika stoppt mit.",
      "timerSeconds": 20,
      "completionReward": {
        "text": "Meisterleistung! Kein Datum vergessen, die Ehe ist gerettet.",
        "damage": 220,
        "reaction": "Lord Dreißig sucht verzweifelt nach Fehlern in Emins Kalender.",
        "bossReaction": "Selbst rückwärts? Das grenzt an Zauberei."
      }
    },
    {
      "id": 36,
      "category": "QUIZ",
      "title": "Der Rückenschmerz Paragraf",
      "bossQuote": "Ab 30 meldet sich die Lendenwirbelsäule pünktlich zum Frühstück.",
      "narrative": "Was ist das erste offizielle Symptom für das Überschreiten der Dreißiger-Grenze?",
      "type": "quiz",
      "options": [
        {
          "text": "Man abonniert freiwillig die Zeitschrift Schöner Wohnen und Gartenfreunde.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! So tief sinkt hier heute niemand.",
          "bossReaction": "Abo abgeschlossen? Wäre schön gewesen."
        },
        {
          "text": "Man kauft sich orthopädische Hausschuhe mit ergonomischem Fußbett.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Enrika trägt weiterhin stylische Schuhe, keine Rentnerlatschen.",
          "bossReaction": "Orthopädische Pantoffeln verweigert? Frechheit."
        },
        {
          "text": "Man macht beim Aufstehen von der Couch plötzlich ein tiefes Seufz-Geräusch.",
          "isCorrect": true,
          "damage": 185,
          "reaction": "Volltreffer! Das universelle Zeichen des Erwachsenwerdens. Ertappt!",
          "bossReaction": "Das Aufsteh-Stöhnen. Paragraph eins des Senioren-Gesetzbuchs."
        }
      ]
    },
    {
      "id": 37,
      "category": "PAAR DUELL",
      "title": "Die Schlummer Tasten Sucht",
      "bossQuote": "Der Wecker klingelt um sieben. Wer drückt siebenmal auf Snooze?",
      "narrative": "Wer von euch beiden stellt sich morgens fünf Wecker im Fünf-Minuten-Takt und steht trotzdem erst um halb acht auf?",
      "type": "who_is_it",
      "whoQuestion": "Wer ist morgens die größere Schlafmütze und braucht die Snooze-Taste wie die Luft zum Atmen?",
      "reactions": {
        "enrika": {
          "damage": 180,
          "reaction": "Noch fünf Minuten Kuscheln ist Enrikas unverhandelbares Grundrecht.",
          "bossReaction": "Fünf Wecker hintereinander grenzt an Ruhestörung."
        },
        "emin": {
          "damage": 50,
          "reaction": "Emin schlägt im Halbschlaf den Wecker aus und schläft seelenruhig weiter.",
          "bossReaction": "Verweigerung des morgendlichen Dienstantritts."
        }
      }
    },
    {
      "id": 38,
      "category": "LIVE MISSION",
      "title": "Der Lieblingsmoment des Jahrzehnts",
      "bossQuote": "Zehn Jahre voller Erinnerungen, Reisen und Verrücktheiten. Glaubt ihr wirklich, dass ihr denselben Zauber im Kopf habt?",
      "narrative": "Beide schließen für 15 Sekunden fest die Augen und reisen gedanklich durch euer gemeinsames letztes Jahrzehnt. Wenn der Timer abläuft, öffnet ihr die Augen und erzählt euch euren absoluten Lieblingsmoment miteinander.",
      "type": "challenge",
      "challengePrompt": "Startet den Timer. Beide schließen 15 Sekunden lang die Augen und denken an euer letztes Jahrzehnt. Bei Null verratet ihr euch euren schönsten Moment.",
      "timerSeconds": 15,
      "completionReward": {
        "text": "Ein unvergesslicher Moment geteilt. Zehn Jahre voller Liebe und Abenteuer.",
        "damage": 225,
        "reaction": "Gänsehaut auf der Couch! Gegen echte gemeinsame Geschichte ist Lord Dreißig machtlos.",
        "bossReaction": "Zehn Jahre Erinnerungen. Dagegen verblasst jeder bürokratische Paragraph."
      }
    },
    {
      "id": 39,
      "category": "QUIZ",
      "title": "Die Urlaubs Koffer Panne",
      "bossQuote": "Der Koffer kreist auf dem Gepäckband. Was passiert wenn er nicht auftaucht?",
      "narrative": "Was ist die beste Methode für Enrika und Emin wenn am Urlaubsziel das Gepäck fehlt?",
      "type": "quiz",
      "options": [
        {
          "text": "Drei Tage am Schalter der Fluggesellschaft lautstark Paragrafen vorlesen.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Spießer meckern drei Tage lang, Enrika und Emin gehen an den Strand.",
          "bossReaction": "Paragrafen vorlesen wäre mein Ding gewesen."
        },
        {
          "text": "Einfach Badesachen und Zahnbürste kaufen und das Leben trotzdem in vollen Zügen genießen.",
          "isCorrect": true,
          "damage": 190,
          "reaction": "Volltreffer! Wahre Liebe braucht keinen 20-Kilo-Koffer zum Glücklichsein.",
          "bossReaction": "Gepäckverlust ohne Nervenzusammenbruch? Das widerspricht allen Vorschriften."
        },
        {
          "text": "Sofort den nächsten Flug nach Hause buchen und schmollen.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Kein Abenteuer wird wegen eines Koffers abgebrochen.",
          "bossReaction": "Abreise storniert? Schade um den Papierkram."
        }
      ]
    },
    {
      "id": 40,
      "category": "PAAR DUELL",
      "title": "Die Reiseplanung vs Spontanität",
      "bossQuote": "Reiseführer mit Textmarkern oder einfach draufloslaufen?",
      "narrative": "Wer plant im Urlaub jedes Museum und jede Mahlzeit auf die Minute vor und wer sagt lass uns einfach schauen wo es nett ist?",
      "type": "who_is_it",
      "whoQuestion": "Wer hat den minutiösen Ablaufplan und wer stolpert einfach ins Abenteuer?",
      "reactions": {
        "enrika": {
          "damage": 175,
          "reaction": "Enrika kennt die besten Geheimtipps und versteckten Fotospots schon vor dem Abflug.",
          "bossReaction": "Recherche auf Profi-Niveau. Gute Organisation."
        },
        "emin": {
          "damage": 175,
          "reaction": "Emin folgt dem Duft von gutem Essen und findet die besten Restaurants durch Zufall.",
          "bossReaction": "Improvisation mit Glücksgarantie. Gefährlich unbürokratisch."
        }
      }
    },
    {
      "id": 41,
      "category": "LIVE MISSION",
      "title": "Das 25 Sekunden Flüster Versprechen",
      "bossQuote": "Geheime Worte dringen nicht in meine Akten. Was habt ihr euch noch zu sagen?",
      "narrative": "Flüstert euch abwechselnd innerhalb von 25 Sekunden drei Dinge ins Ohr die ihr am anderen über alles liebt.",
      "type": "challenge",
      "challengePrompt": "Startet den Timer. Drei intime Worte ins Ohr flüstern. Enrika beginnt.",
      "timerSeconds": 25,
      "completionReward": {
        "text": "Gänsehautmoment auf der Couch. Lord Dreißigs Sensoren schlagen Alarm.",
        "damage": 235,
        "reaction": "Gegen echte Nähe ist die Behörde absolut machtlos.",
        "bossReaction": "Geflüsterte Worte stehen nicht im Protokoll. Mein System stürzt ab."
      }
    },
    {
      "id": 42,
      "category": "QUIZ",
      "title": "Das Geheimnis von Team Unbesiegbar",
      "bossQuote": "Mein Schutzwall wackelt bedenklich. Was macht euch eigentlich so unschlagbar?",
      "narrative": "Was ist das wahre Fundament eurer Ehe das euch vor jedem Spießertum schützt?",
      "type": "quiz",
      "options": [
        {
          "text": "Dass wir beste Freunde sind, bedingungslos zusammenhalten und jeden Tag gemeinsam lachen.",
          "isCorrect": true,
          "damage": 210,
          "reaction": "Volltreffer der Extraklasse! Der schwerste Schlag gegen Lord Dreißig.",
          "bossReaction": "Freundschaft und Liebe vereint. Dagegen existiert kein Gesetz."
        },
        {
          "text": "Dass wir einen gemeinsamen Bausparvertrag mit vier Prozent Zinsen abgeschlossen haben.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Bausparverträge halten keine Ehe lebendig.",
          "bossReaction": "Bausparen ist zwar vernünftig, aber keine Romantik."
        },
        {
          "text": "Dass Emin immer pünktlich den Müll raus bringt.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Müll ist nützlich, aber nicht das Geheimnis wahrer Liebe.",
          "bossReaction": "Müllentsorgung reicht nicht für Level 30."
        }
      ]
    },
    {
      "id": 43,
      "category": "PAAR DUELL",
      "title": "Die Rührungs Tränen",
      "bossQuote": "Ein trauriges oder wunderschönes Filmende. Wer greift heimlich zum Taschentuch?",
      "narrative": "Wer von euch beiden weint schneller bei emotionalen Filmszenen und behauptet da war nur Staub im Auge?",
      "type": "who_is_it",
      "whoQuestion": "Wer weint zuerst bei romantischen Liebesfilmen?",
      "reactions": {
        "enrika": {
          "damage": 180,
          "reaction": "Enrika fühlt jede Szene mit dem ganzen Herzen mit. Pure Emotionalität.",
          "bossReaction": "Tränen der Rührung. Meine Akten werden feucht."
        },
        "emin": {
          "damage": 50,
          "reaction": "Emin räuspert sich verdächtig laut und schaut angestrengt an die Decke.",
          "bossReaction": "Staub im Auge ist die älteste Männerlüge der Welt."
        }
      }
    },
    {
      "id": 44,
      "category": "DER EHE TEST",
      "title": "Enrikas geheime Superkraft",
      "image": "assets/photos/sommer_garten_hut.jpg",
      "bossQuote": "Dreißig Jahre Enrika. Was macht diese Frau eigentlich so besonders dass Emin sie jeden Tag anhimmelt wie am ersten Tag?",
      "narrative": "Was ist Enrikas stärkste und schönste Eigenschaft?",
      "type": "quiz",
      "options": [
        {
          "text": "Dass sie Emin jeden Samstag pünktlich an die Kehrwoche und den Hausputz erinnert.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Das ist Spießertum in Reinform, keine Superkraft!",
          "bossReaction": "Vorbildlich spießig, aber das ist ganz sicher nicht der Grund."
        },
        {
          "text": "Dass sie stundenlang über Küchengeräte und Rabattgutscheine fachsimpeln kann.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Enrika hat Geschmack und Lebensfreude, keine Haushalts-Obsession!",
          "bossReaction": "Netter Versuch, aber Enrika ist meilenweit davon entfernt."
        },
        {
          "text": "Ihr unverwechselbares Lachen, ihre pure Herzenswärme und die Art wie sie jeden Raum heller macht.",
          "isCorrect": true,
          "damage": 220,
          "reaction": "Volltreffer! Reine Wahrheit. Gegen so viel Ausstrahlung hat Lord Dreißig keine Argumente mehr.",
          "bossReaction": "Das geht direkt ins Herz. Mein Aktenordner klappt von allein zu."
        }
      ]
    },
    {
      "id": 45,
      "category": "LIVE MISSION",
      "title": "Das Komplimente Dauerfeuer",
      "bossQuote": "Mein System steht kurz vor dem totalen Zusammenbruch. Ihr wollt den Sieg? Dann beweist mir wie schnell ihr euch nette Dinge sagen könnt.",
      "narrative": "Zwanzig Sekunden lang abwechselnd ohne Pause Komplimente machen.",
      "type": "challenge",
      "challengePrompt": "Startet den Timer. Abwechselnd im Sekundentakt etwas Nettes sagen ohne zu stocken und ohne zu zögern.",
      "timerSeconds": 20,
      "completionReward": {
        "text": "Perfektes Teamwork. Die Worte sitzen wie gegossen.",
        "damage": 240,
        "reaction": "Lord Dreißigs Schutzwall zerfällt in feinen Staub.",
        "bossReaction": "Es reicht, ich ergebe mich fast schon freiwillig."
      }
    },
    {
      "id": 46,
      "category": "PAAR DUELL",
      "title": "Die unlösbare Liebesfrage",
      "bossQuote": "Eine Frage die schon Tausende Ehen erschüttert hat.",
      "narrative": "Wer liebt den anderen ein winziges bisschen mehr auf dieser Welt?",
      "type": "who_is_it",
      "whoQuestion": "Wer hat das größere Herz für den anderen?",
      "reactions": {
        "enrika": {
          "damage": 190,
          "reaction": "Enrikas Liebe ist grenzenlos und wärmt wie die Sommersonne.",
          "bossReaction": "Gegen Enrikas Herzenswärme verliert jeder Vorwurf."
        },
        "emin": {
          "damage": 190,
          "reaction": "Emin würde für Enrika jeden Stern vom Himmel holen und jeden Lord besiegen.",
          "bossReaction": "Bedingungslose Hingabe. Ich muss mich geschlagen geben."
        }
      }
    },
    {
      "id": 47,
      "category": "QUIZ",
      "title": "Der finale Spießer Schwur",
      "bossQuote": "Mein vorletzter Aktenordner brennt lichterloh. Wie wollt ihr die nächsten dreißig Jahre überstehen?",
      "narrative": "Mit welchem feierlichen Versprechen besiegelt ihr euren gemeinsamen Weg durch Level 30?",
      "type": "quiz",
      "options": [
        {
          "text": "Wir geloben ab morgen ausschließlich beige Kleidung und Funktionsjacken zu tragen.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Beige Funktionsjacken sind ab heute für immer verboten.",
          "bossReaction": "Beige Funktionsjacken? Das wäre mein Traum gewesen."
        },
        {
          "text": "Wir versprechen für immer albern, verliebt, unvernünftig und füreinander da zu sein.",
          "isCorrect": true,
          "damage": 230,
          "reaction": "Volltreffer! Der finale Eid gegen jedes Spießertum der Welt.",
          "bossReaction": "Ein unzerbrechlicher Schwur. Meine Akten lösen sich auf."
        },
        {
          "text": "Wir verpflichten uns zu sonntäglichen Autowäschen mit der Zahnbürste.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Der Polestar wird geliebt, aber nicht mit der Zahnbürste.",
          "bossReaction": "Zahnbürsten-Wäsche abgelehnt. Schade um die Genauigkeit."
        }
      ]
    },
    {
      "id": 48,
      "category": "LIVE MISSION",
      "title": "Der Geburtstags Ehrentanz",
      "bossQuote": "Letzte Zuckungen meiner Amtsgewalt. Zeigt mir den feierlichen Tanz vor dem Thron.",
      "narrative": "Emin steht auf, nimmt Enrika an beiden Händen und dreht sie einmal schwungvoll wie eine Königin im Kreis.",
      "type": "challenge",
      "challengePrompt": "Startet den Timer. Emin dreht Enrika feierlich und schwungvoll im Kreis.",
      "timerSeconds": 15,
      "completionReward": {
        "text": "Königliche Drehung gemeistert. Enrika strahlt in voller Pracht.",
        "damage": 250,
        "reaction": "Der Saal tobt! Lord Dreißigs Krawatte löst sich in Luft auf.",
        "bossReaction": "Königliche Eleganz. Dagegen hat mein Aktenkoffer keine Chance."
      }
    },
    {
      "id": 49,
      "category": "QUIZ",
      "title": "Lord Dreißigs Kapitulationsurteil",
      "bossQuote": "Mein System hat noch genau einen Funken Restenergie. Was ist euer letztes Wort an die Behörde?",
      "narrative": "Was antwortet ihr Lord Dreißig kurz vor seinem endgültigen K.O.?",
      "type": "quiz",
      "options": [
        {
          "text": "Dreißig ist nur eine Zahl, aber unsere Liebe ist für immer unbesiegbar.",
          "isCorrect": true,
          "damage": 250,
          "reaction": "Direkter K.O. Treffer! Lord Dreißig taumelt und bricht zusammen.",
          "bossReaction": "Ich kann nicht mehr. Ihr seid einfach viel zu stark zusammen."
        },
        {
          "text": "Wir unterschreiben freiwillig die lebenslange Spießerurkunde.",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Vor dem Ziel wird niemals kapituliert!",
          "bossReaction": "Zu spät für eine Kapitulation. Zeigt mir den K.O."
        },
        {
          "text": "Können wir den Termin bitte auf nächsten Dienstag verschieben?",
          "isCorrect": false,
          "damage": 0,
          "heroDamage": 20,
          "reaction": "Falsch! Heute wird gefeiert, nicht verschoben!",
          "bossReaction": "Terminverschiebung abgelehnt. Kämpft zu Ende."
        }
      ]
    },
    {
      "id": 50,
      "category": "DAS FINALE",
      "title": "Der 30er Kuss",
      "bossQuote": "Mein letzter Funke Widerstand. Dreißig Jahre Enrika lassen sich nicht aufhalten. Zeigt mir den finalen Abschluss.",
      "narrative": "Der feierliche Moment. Besiegelt den offiziellen Eintritt in das beste Jahrzehnt eures Lebens.",
      "type": "challenge",
      "challengePrompt": "Nehmt euch fest in den Arm, gebt euch einen innigen Geburtstagskuss und wünscht euch gemeinsam das beste Lebensjahr aller Zeiten.",
      "timerSeconds": 10,
      "completionReward": {
        "text": "Vollbracht. Lord Dreißig ist restlos geschlagen.",
        "damage": 750,
        "reaction": "Level 30 ist freigeschaltet. Willkommen im besten Jahrzehnt eures Lebens.",
        "bossReaction": "Ihr habt gewonnen. Bleibt genauso unvernünftig und glücklich wie ihr seid."
      }
    }
  ],
  "victory": {
    "heroineTitle": "Enrika, Königin von Level 30",
    "celebrationHeadline": "Herzlichen Glückwunsch zum 30. Geburtstag, mein Schatz!",
    "loveLetter": [
      "Liebe Enrika,",
      "heute feierst du deinen 30. Geburtstag, und wenn dieses Spiel eines bewiesen hat, dann dass wir gemeinsam jedes Abenteuer meistern und absolut unschlagbar sind.",
      "Mit 30 beginnt nicht einfach nur ein neues Jahrzehnt, sondern das bisher schönste, aufregendste und glücklichste Kapitel deines Lebens. Du bist eine so unglaublich starke, wunderschöne, warmherzige und besondere Frau.",
      "Danke für jedes Lächeln, jede Reise, jeden geteilten Lachanfall und jeden einzelnen Tag, den ich mit dir verbringen darf. Mit dir an meiner Seite ist jeder Tag der größte Hauptgewinn.",
      "Ich liebe dich von ganzem Herzen und freue mich auf jedes weitere Jahr und alle Abenteuer, die noch vor uns liegen.",
      "Auf dich, dein neues Jahrzehnt und das glücklichste Level 30 aller Zeiten!"
    ],
    "galleryPhotos": [
      {
        "src": "assets/photos/hochzeit_rosen.jpg",
        "caption": "Unsere Hochzeit, für immer Seite an Seite und der beste Gesichtsausdruck aller Zeiten"
      },
      {
        "src": "assets/photos/standesamt.jpg",
        "caption": "Für immer verbunden: Der Tag, an dem wir offiziell Team Unbesiegbar wurden"
      },
      {
        "src": "assets/photos/felsen_portrait.jpg",
        "caption": "Dein Lachen, meine Welt, das schönste Strahlen überhaupt"
      },
      {
        "src": "assets/photos/herz_moment.jpg",
        "caption": "Ein Herz für uns zwei, zusammen leuchten wir heller als jede Stadt bei Nacht"
      },
      {
        "src": "assets/photos/balkon_meerblick.jpg",
        "caption": "Kaffee mit Meeresrauschen, unser Traumurlaub zu zweit"
      },
      {
        "src": "assets/photos/bosporus_bootsfahrt.jpg",
        "caption": "Bootsfahrt auf dem Bosporus, frischer Wind und gemeinsame Abenteuer"
      },
      {
        "src": "assets/photos/rheinfall_urlaub.jpg",
        "caption": "Reisen und Entdecken, vor dieser Aussicht strahlst du trotzdem am schönsten"
      },
      {
        "src": "assets/photos/strand_nacht.jpg",
        "caption": "Nachtspaziergang am Strand, Wellenrauschen und du an meiner Seite"
      },
      {
        "src": "assets/photos/istanbul_nacht.jpg",
        "caption": "Magische Nächte, wohin die Reise auch geht, mit dir ist es perfekt"
      },
      {
        "src": "assets/photos/auto_polestar.jpg",
        "caption": "Powerfrau am Steuer, mit Vollgas ins neue Lebensjahrzehnt"
      },
      {
        "src": "assets/photos/sommer_garten_hut.jpg",
        "caption": "Sommertag im Garten: Sonnenhut, Sonnenbrille und die wärmste Umarmung"
      },
      {
        "src": "assets/photos/schwarzlicht_3d_brille.jpg",
        "caption": "Schwarzlicht & 3D-Brillen: Verrückt, verspielt und immer für jeden Spaß zu haben"
      },
      {
        "src": "assets/photos/meer_sonnenuntergang.jpg",
        "caption": "Goldene Stunde am Meer: Der Sonnenuntergang im Rücken und das größte Glück im Arm"
      },
      {
        "src": "assets/photos/taucherbrille_kueche.jpg",
        "caption": "Sicherheit geht vor: Zwiebelschneiden oder Tauchkurs in der Küche"
      },
      {
        "src": "assets/photos/erster_abend_zu_zweit.jpg",
        "caption": "Unser erster Abend zu Zwei hehe"
      }
    ]
  }
};
