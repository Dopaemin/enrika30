// ===================================================================
// ENRIKA & EMIN - LEVEL 30: GAME CONTROLLER & SHOWDOWN ENGINE
// Keine Emojis, kein KI-Kitsch, Jackbox-Style Paardynamik
// Synchronisierte Sprachausgabe mit animierten Charakteren
// ===================================================================

class EnrikaGame {
  constructor() {
    this.currentEncounterIdx = 0;
    this.bossMaxHp = GAME_CONFIG.boss.maxHp;
    this.bossCurrentHp = GAME_CONFIG.boss.maxHp;
    this.heroMaxHp = GAME_CONFIG.heroes.maxHp;
    this.heroCurrentHp = GAME_CONFIG.heroes.maxHp;

    this.timerInterval = null;
    this.remainingSeconds = 0;
    this.hasUsedShield = false;

    this.userPhotos = [];
    this.loadSavedPhotos();

    this.initElements();
    this.bindEvents();
    this.renderIntro();
  }

  initElements() {
    // Screens
    this.screenIntro = document.getElementById('screen-intro');
    this.screenBattle = document.getElementById('screen-battle');
    this.screenVictory = document.getElementById('screen-victory');
    this.screenDefeat = document.getElementById('screen-defeat');
    this.btnRetry = document.getElementById('btn-retry-game');

    // Ready Gate Overlay
    this.readyOverlay = document.getElementById('ready-overlay');
    this.btnReady = document.getElementById('btn-ready');

    // Intro Screen elements
    this.previewBossAvatar = document.getElementById('preview-boss-avatar');
    this.introNarratorPortrait = document.getElementById('intro-narrator-portrait');
    this.introNarratorBadge = document.getElementById('intro-narrator-badge');
    this.battleNarratorBadge = document.getElementById('battle-narrator-badge');
    this.heroShieldPill = document.getElementById('hero-shield-pill');
    this.introVoiceTimeout = null;
    this.banterTimeout = null;
    this.activeRevealTimeouts = [];
    this.currentQuizButtons = [];

    // Battle HUD
    this.bossPortrait = document.getElementById('boss-portrait');
    this.bossPortraitSlot = document.getElementById('boss-portrait-slot');
    this.bossName = document.getElementById('boss-name');
    this.bossHpNum = document.getElementById('boss-hp-num');
    this.bossHpFill = document.getElementById('boss-hp-fill');

    // Narrator Stage
    this.narratorStage = document.getElementById('narrator-stage');
    this.narratorPortrait = document.getElementById('narrator-portrait');
    this.narratorBubbleText = document.getElementById('narrator-bubble-text');

    this.teamHpFill = document.getElementById('team-hp-fill');
    this.teamHpNum = document.getElementById('team-hp-num');
    this.heroesHudStrip = document.querySelector('.heroes-hud-strip');
    this.encounterProgress = document.getElementById('encounter-progress');

    // Sync Hero & Boss & Narrator avatars explicitly with config
    const introHero = document.getElementById('intro-hero-avatar');
    if (introHero && GAME_CONFIG.heroes?.avatar) introHero.src = GAME_CONFIG.heroes.avatar;

    const introBoss = document.getElementById('intro-boss-avatar');
    if (introBoss && GAME_CONFIG.boss?.avatar) introBoss.src = GAME_CONFIG.boss.avatar;

    const miniHero = document.querySelector('.hero-mini-avatar');
    if (miniHero && GAME_CONFIG.heroes?.avatar) miniHero.src = GAME_CONFIG.heroes.avatar;

    const victoryCrest = document.querySelector('.victory-crest img');
    if (victoryCrest && GAME_CONFIG.heroes?.avatar) {
      victoryCrest.src = GAME_CONFIG.heroes.avatar;
      victoryCrest.style.cursor = 'zoom-in';
      victoryCrest.title = 'Foto groß anschauen';
      victoryCrest.addEventListener('click', () => {
        this.openLightbox(GAME_CONFIG.heroes.avatar, 'Enrika & Emin – Unbesiegbar gegen das Spießertum!');
      });
    }

    const bossPortrait = document.getElementById('boss-portrait');
    if (bossPortrait && GAME_CONFIG.boss?.avatar) bossPortrait.src = GAME_CONFIG.boss.avatar;

    // Encounter Container
    this.encounterAct = document.getElementById('encounter-act');
    this.encounterTitle = document.getElementById('encounter-title');
    this.encounterNarrative = document.getElementById('encounter-narrative');
    this.encounterContent = document.getElementById('encounter-content');
    this.battleToast = document.getElementById('battle-toast');

    // Buttons
    this.btnStart = document.getElementById('btn-start-game');
    this.btnMute = document.getElementById('btn-toggle-sound');
    this.btnRestart = document.getElementById('btn-restart');

    // Victory elements
    this.victorySpeech = document.getElementById('victory-speech');
    this.btnReplayRockSong = document.getElementById('btn-replay-rock-song');
    this.rockBtnLabel = document.getElementById('rock-btn-label');
    this.isRockSongPlaying = false;
    this.loveLetterContent = document.getElementById('love-letter-content');
    this.btnPlayLetter = document.getElementById('btn-play-letter');
    this.polaroidGrid = document.getElementById('polaroid-grid');
    this.btnRevealGift = document.getElementById('btn-reveal-gift');
    this.giftRevealCard = document.getElementById('gift-reveal-card');
    this.giftTitle = document.getElementById('gift-title');
    this.giftBody = document.getElementById('gift-body');
    this.photoInput = document.getElementById('photo-input');

    // Lightbox Modal
    this.lightboxModal = document.getElementById('image-lightbox');
    this.lightboxImg = document.getElementById('lightbox-img');
    this.lightboxCaption = document.getElementById('lightbox-caption');
    this.lightboxClose = document.getElementById('lightbox-close');
  }

  bindEvents() {
    this.btnStart.addEventListener('click', () => {
      this.stopAllCharacterAudio();
      window.soundEngine.init();
      window.soundEngine.playSelect();

      // Audio Battle-Cry beim Start abspielen
      let started = false;
      const launch = () => {
        if (!started) {
          started = true;
          this.startBattle();
        }
      };

      window.soundEngine.playBoss('assets/audio/voice/zeigs ihm.mp3', launch);
      setTimeout(launch, 1350);
    });

    this.btnMute.addEventListener('click', () => {
      const isMuted = window.soundEngine.toggleMute();
      this.btnMute.textContent = isMuted ? 'Sound Aus' : 'Sound An';
      if (isMuted) {
        this.stopAllCharacterAudio();
      }
    });

    this.btnRestart.addEventListener('click', () => {
      if (confirm('Möchtest du das Spiel neu starten?')) {
        this.resetGame();
      }
    });

    if (this.btnRetry) {
      this.btnRetry.addEventListener('click', () => {
        this.resetGame();
      });
    }

    // Intro Speech: Lord Dreißig spricht ZUERST, danach übernimmt Showmaster Pablo!
    this.isIntroSpeaking = false;
    const playIntroSpeech = () => {
      if (this.isIntroSpeaking) {
        this.stopAllCharacterAudio();
        return;
      }

      this.stopAllCharacterAudio();
      this.isIntroSpeaking = true;

      // 1. Lord Dreißig spricht ZUERST (intro_boss.mp3)
      window.soundEngine.playBoss(
        'assets/audio/voice/intro_boss.mp3',
        // onEnded: Lord Dreißig ist fertig
        () => {
          if (this.previewBossAvatar) {
            this.previewBossAvatar.classList.remove('character-talking');
          }
          if (!this.isIntroSpeaking) return;

          // Kurze Pause, dann übernimmt Showmaster Pablo (start_page.mp3)
          setTimeout(() => {
            if (!this.isIntroSpeaking) return;
            window.soundEngine.playNarrator(
              'assets/audio/voice/start_page.mp3',
              // onEnded: Pablo ist fertig
              () => {
                this.isIntroSpeaking = false;
                if (this.introNarratorPortrait) {
                  this.introNarratorPortrait.classList.remove('narrator-talking');
                }
              },
              // onStart: Pablo beginnt zu reden
              () => {
                if (this.introNarratorPortrait) {
                  this.introNarratorPortrait.classList.add('narrator-talking');
                }
              }
            );
          }, 320);
        },
        // onStart: Lord Dreißig beginnt zu reden
        () => {
          if (this.previewBossAvatar) {
            this.previewBossAvatar.classList.add('character-talking');
          }
          if (this.introNarratorPortrait) {
            this.introNarratorPortrait.classList.remove('narrator-talking');
          }
        }
      );
    };

    // Klick auf Lord Dreißig: Spielt Lord Dreißigs Intro ab
    if (this.previewBossAvatar) {
      this.previewBossAvatar.addEventListener('click', () => {
        this.stopAllCharacterAudio();
        this.isIntroSpeaking = true;
        window.soundEngine.playBoss(
          'assets/audio/voice/intro_boss.mp3',
          () => {
            this.isIntroSpeaking = false;
            if (this.previewBossAvatar) {
              this.previewBossAvatar.classList.remove('character-talking');
            }
          },
          () => {
            if (this.previewBossAvatar) {
              this.previewBossAvatar.classList.add('character-talking');
            }
          }
        );
      });
    }

    // Klick auf Showmaster Pablo: Spielt Pablos Intro ab
    if (this.introNarratorPortrait) {
      this.introNarratorPortrait.addEventListener('click', () => {
        this.stopAllCharacterAudio();
        this.isIntroSpeaking = true;
        window.soundEngine.playNarrator(
          'assets/audio/voice/start_page.mp3',
          () => {
            this.isIntroSpeaking = false;
            if (this.introNarratorPortrait) {
              this.introNarratorPortrait.classList.remove('narrator-talking');
            }
          },
          () => {
            if (this.introNarratorPortrait) {
              this.introNarratorPortrait.classList.add('narrator-talking');
            }
          }
        );
      });
    }

    // READY BUTTON: Blendet alles aus bis Klick, startet start_page.mp3 und enthüllt die Seite
    if (this.btnReady) {
      this.btnReady.addEventListener('click', () => {
        window.soundEngine.init();
        window.soundEngine.playSelect();
        this.triggerHaptic(50);

        if (this.readyOverlay) {
          this.readyOverlay.classList.add('hidden');
          setTimeout(() => {
            this.readyOverlay.style.display = 'none';
          }, 520);
        }

        // Startet sofort die Sprachausgabe von Lord Dreißig
        playIntroSpeech();
      });
    }

    if (this.readyOverlay) {
      this.readyOverlay.addEventListener('click', (e) => {
        if (e.target === this.readyOverlay) {
          if (this.btnReady) this.btnReady.click();
        }
      });
    }

    // Lightbox / Großansicht für Helden (Enrika & Emin - heroes.jpg)
    const onHeroesPhotoClick = (e) => {
      e?.stopPropagation();
      this.openLightbox('assets/heroes.jpg', 'Enrika & Emin');
    };
    const hudHeroAvatar = document.getElementById('hud-hero-avatar');
    const hudHeroSlot = document.getElementById('hud-hero-avatar-slot');
    const introHeroAvatar = document.getElementById('intro-hero-avatar');
    const introHeroSlot = document.getElementById('intro-hero-slot');
    if (hudHeroAvatar) hudHeroAvatar.addEventListener('click', onHeroesPhotoClick);
    if (hudHeroSlot) hudHeroSlot.addEventListener('click', onHeroesPhotoClick);
    if (introHeroAvatar) introHeroAvatar.addEventListener('click', onHeroesPhotoClick);
    if (introHeroSlot) introHeroSlot.addEventListener('click', onHeroesPhotoClick);

    // Lightbox / Großansicht für Lord Dreißig (boss.jpg)
    const onBossPhotoClick = (e) => {
      e?.stopPropagation();
      this.openLightbox('assets/boss.jpg', 'Lord Dreißig • Amt für Seriösität');
      window.soundEngine.playBossRoar();
    };
    if (this.bossPortrait) this.bossPortrait.addEventListener('click', onBossPhotoClick);
    if (this.bossPortraitSlot) this.bossPortraitSlot.addEventListener('click', onBossPhotoClick);
    if (this.previewBossAvatar) this.previewBossAvatar.addEventListener('click', onBossPhotoClick);
    const introBossAvatar = document.getElementById('intro-boss-avatar');
    const introBossSlot = document.getElementById('intro-boss-slot');
    if (introBossAvatar) introBossAvatar.addEventListener('click', onBossPhotoClick);
    if (introBossSlot) introBossSlot.addEventListener('click', onBossPhotoClick);

    // Tap on Narrator Portrait or Encounter Title (replays narrator audio)
    const replayNarrator = () => {
      if (this.currentNarratorAudio) {
        this.stopAllCharacterAudio();
        this.showNarratorStage();
        if (this.narratorPortrait) {
          this.narratorPortrait.classList.add('narrator-talking');
        }
        window.soundEngine.playNarrator(this.currentNarratorAudio, () => {
          if (this.narratorPortrait) {
            this.narratorPortrait.classList.remove('narrator-talking');
          }
        });
      }
    };

    if (this.narratorPortrait) {
      this.narratorPortrait.addEventListener('click', replayNarrator);
    }
    if (this.encounterTitle) {
      this.encounterTitle.addEventListener('click', replayNarrator);
    }

    // Love letter audio playback
    if (this.btnPlayLetter) {
      this.btnPlayLetter.addEventListener('click', () => {
        this.stopVictoryRockSong();
        window.soundEngine.playLetter('assets/audio/voice/victory_letter.mp3');
      });
    }

    // Heavy Metal Victory Rock Song Playback
    if (this.btnReplayRockSong) {
      this.btnReplayRockSong.addEventListener('click', () => {
        if (this.isRockSongPlaying) {
          this.stopVictoryRockSong();
        } else {
          this.playVictoryRockSong();
        }
      });
    }

    if (this.btnRevealGift) {
      this.btnRevealGift.addEventListener('click', () => {
        window.soundEngine.playCrit();
        if (window.confetti) window.confetti.burst(window.innerWidth / 2, window.innerHeight * 0.7, 80);
        this.giftRevealCard.style.display = 'block';
        this.btnRevealGift.style.display = 'none';
      });
    }

    if (this.photoInput) {
      this.photoInput.addEventListener('change', (e) => this.handleCustomPhotoUpload(e));
    }

    // Lightbox close events
    if (this.lightboxClose) {
      this.lightboxClose.addEventListener('click', () => this.closeLightbox());
    }
    if (this.lightboxModal) {
      this.lightboxModal.addEventListener('click', (e) => {
        if (e.target === this.lightboxModal) this.closeLightbox();
      });
    }

    // Mobile & iOS Safari Audio Unlock on first touch gesture
    const unlockAudio = () => {
      window.soundEngine.init();
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', unlockAudio);
    };
    window.addEventListener('touchstart', unlockAudio, { passive: true });
    window.addEventListener('click', unlockAudio, { passive: true });
  }

  triggerHaptic(pattern = 40) {
    if (navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // Ignore vibration errors if not permitted
      }
    }
  }

  switchScreen(targetScreen) {
    [this.screenIntro, this.screenBattle, this.screenVictory].forEach(s => s.classList.remove('active'));
    targetScreen.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openLightbox(src, caption = '') {
    if (!this.lightboxModal || !this.lightboxImg) return;
    this.lightboxImg.src = src;
    if (this.lightboxCaption) {
      if (caption) {
        this.lightboxCaption.textContent = caption;
        this.lightboxCaption.style.display = 'block';
      } else {
        this.lightboxCaption.textContent = '';
        this.lightboxCaption.style.display = 'none';
      }
    }
    this.lightboxModal.classList.add('active');
    window.soundEngine.playSelect();
    this.triggerHaptic(25);
  }

  closeLightbox() {
    if (!this.lightboxModal) return;
    this.lightboxModal.classList.remove('active');
  }

  renderIntro() {
    this.hideNarratorStage();
    this.switchScreen(this.screenIntro);
  }

  startBattle() {
    this.currentEncounterIdx = 0;
    this.bossCurrentHp = this.bossMaxHp;
    this.heroCurrentHp = this.heroMaxHp;
    this.hasUsedShield = false;
    if (this.heroShieldPill) this.heroShieldPill.style.display = 'none';
    this.updateHpBars();
    this.switchScreen(this.screenBattle);
    window.soundEngine.playBossRoar();
    this.renderCurrentEncounter();
  }

  updateHpBars() {
    const bossPercent = Math.max(0, Math.min(100, (this.bossCurrentHp / this.bossMaxHp) * 100));
    this.bossHpFill.style.width = `${bossPercent}%`;
    this.bossHpNum.textContent = `${Math.max(0, this.bossCurrentHp)} / ${this.bossMaxHp} HP`;

    const heroPercent = Math.max(0, Math.min(100, (this.heroCurrentHp / this.heroMaxHp) * 100));
    this.teamHpFill.style.width = `${heroPercent}%`;
    if (this.teamHpNum) {
      this.teamHpNum.textContent = `${Math.max(0, this.heroCurrentHp)} / ${this.heroMaxHp} HP`;
      if (this.heroCurrentHp <= 30) {
        this.teamHpNum.classList.add('low');
        this.teamHpFill.classList.add('danger');
      } else {
        this.teamHpNum.classList.remove('low');
        this.teamHpFill.classList.remove('danger');
      }
    }

    if (this.heroShieldPill) {
      if (this.hasUsedShield) {
        this.heroShieldPill.style.display = 'inline-flex';
        this.heroShieldPill.className = 'hero-shield-pill shield-used';
        this.heroShieldPill.textContent = '🛡️ Schutz verbraucht';
        this.heroShieldPill.title = 'Der 1-HP-Schutzengel wurde bereits verbraucht!';
      } else {
        this.heroShieldPill.style.display = 'none';
      }
    }
  }

  renderCurrentEncounter() {
    const enc = GAME_CONFIG.encounters[this.currentEncounterIdx];
    if (!enc) {
      this.triggerVictory();
      return;
    }

    this.battleToast.style.display = 'none';
    this.encounterAct.textContent = enc.category || 'AUFGABE';
    this.encounterTitle.textContent = enc.title;
    this.encounterNarrative.textContent = enc.narrative;
    if (this.bossDialogText) {
      this.bossDialogText.textContent = enc.bossQuote;
    }

    // Update text in the Narrator's speech bubble (Pablo appears once Lord Dreißig finishes)
    if (this.narratorBubbleText) {
      this.narratorBubbleText.textContent = enc.whoQuestion || enc.challengePrompt || enc.narrative;
    }
    this.hideNarratorStageImmediate();

    // Audio-Dateien für die aktuelle Runde
    this.currentBossAudio = `assets/audio/voice/round_${enc.id}_boss.mp3`;
    this.currentNarratorAudio = `assets/audio/voice/round_${enc.id}_narrator.mp3`;

    // Audio vorladen gegen Ladeverzögerungen
    try {
      const bPre = new Audio();
      bPre.preload = 'auto';
      bPre.src = this.currentBossAudio;
      const nPre = new Audio();
      nPre.preload = 'auto';
      nPre.src = this.currentNarratorAudio;
    } catch (e) {}

    // Start animated dual voiceover sequence: Boss speaks, then Narrator bobs & speaks
    this.playRoundAudioSequence();

    this.encounterContent.innerHTML = '';

    // Render Photo if encounter has an image
    if (enc.image) {
      this.encounterContent.classList.add('has-image');
      const imgWrap = document.createElement('div');
      imgWrap.className = 'encounter-image-wrap';
      imgWrap.innerHTML = `
        <img src="${enc.image}" class="encounter-photo" alt="Rätselbild">
        <div class="photo-zoom-hint">Antippen zum Vergrößern</div>
      `;
      imgWrap.addEventListener('click', () => this.openLightbox(enc.image));
      this.encounterContent.appendChild(imgWrap);
    } else {
      this.encounterContent.classList.remove('has-image');
    }

    // TYPE 1: PAAR-DUELL (Wer von euch beiden...)
    if (enc.type === 'who_is_it') {
      const wrap = document.createElement('div');
      wrap.className = 'who-duel-wrap duel-waiting';
      wrap.innerHTML = `
        <div class="who-question-lead">${enc.whoQuestion || enc.narrative}</div>
        <div class="who-instruction">Zählt bis 3 und tippt auf den Namen!</div>
        <div class="who-duel-grid">
          <button class="who-choice-btn who-enrika-btn" id="btn-who-enrika" type="button">
            <img src="assets/photos/avatar_enrika_3567.jpg" class="who-choice-avatar" alt="Enrika">
            <div class="who-choice-name">Enrika</div>
            <div class="who-tap-label">Auswählen</div>
          </button>
          <div class="who-vs-divider">ODER</div>
          <button class="who-choice-btn who-emin-btn" id="btn-who-emin" type="button">
            <img src="assets/photos/avatar_emin_3637.jpg" class="who-choice-avatar" alt="Emin">
            <div class="who-choice-name">Emin</div>
            <div class="who-tap-label">Auswählen</div>
          </button>
        </div>
      `;

      this.encounterContent.appendChild(wrap);

      const btnEnrika = wrap.querySelector('#btn-who-enrika');
      const btnEmin = wrap.querySelector('#btn-who-emin');
      const imgEnrika = wrap.querySelector('#btn-who-enrika .who-choice-avatar');
      const imgEmin = wrap.querySelector('#btn-who-emin .who-choice-avatar');

      if (imgEnrika) {
        imgEnrika.style.cursor = 'zoom-in';
        imgEnrika.title = 'Foto groß anschauen';
        imgEnrika.addEventListener('click', (e) => {
          e.stopPropagation();
          this.openLightbox('assets/photos/avatar_enrika_3567.jpg', 'Enrika');
        });
      }

      if (imgEmin) {
        imgEmin.style.cursor = 'zoom-in';
        imgEmin.title = 'Foto groß anschauen';
        imgEmin.addEventListener('click', (e) => {
          e.stopPropagation();
          this.openLightbox('assets/photos/avatar_emin_3637.jpg', 'Emin');
        });
      }

      btnEnrika.addEventListener('click', () => {
        const res = enc.reactions.enrika;
        const heal = 15;
        this.healHeroes(heal);
        this.applyBossDamage(res.damage, res.reaction, res.bossReaction, false, 0, heal);
      });

      btnEmin.addEventListener('click', () => {
        const res = enc.reactions.emin;
        const heal = 15;
        this.healHeroes(heal);
        this.applyBossDamage(res.damage, res.reaction, res.bossReaction, false, 0, heal);
      });
    }

    // TYPE 2: QUIZ ODER SITUATIONS-TEST
    else if (enc.type === 'quiz' || enc.type === 'decision') {
      const grid = document.createElement('div');
      grid.className = 'options-grid';
      const letters = ['A', 'B', 'C', 'D'];
      const optionButtons = [];

      enc.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn option-waiting';
        btn.id = `btn-option-${this.currentEncounterIdx}-${idx}`;
        btn.innerHTML = `
          <span class="option-letter">${letters[idx] || ''}</span>
          <span class="option-text">${opt.text}</span>
        `;
        btn.addEventListener('click', () => this.handleOptionSelected(opt, btn, grid, optionButtons, enc.options));
        grid.appendChild(btn);
        optionButtons.push(btn);
      });

      this.currentQuizButtons = optionButtons;
      this.encounterContent.appendChild(grid);
    }

    // TYPE 3: LIVE MISSION / CHALLENGE
    else if (enc.type === 'challenge') {
      const box = document.createElement('div');
      box.className = 'challenge-box';
      box.innerHTML = `
        <div class="challenge-badge">LIVE MISSION</div>
        <p class="challenge-prompt">${enc.challengePrompt}</p>
        <div class="timer-display" id="challenge-timer">${enc.timerSeconds}s</div>
        <div class="challenge-actions">
          <button class="btn-primary btn-waiting-audio" id="btn-start-timer" disabled style="font-size: 1rem; padding: 0.8rem 1.6rem; width: 100%; max-width: 320px;">
            <span>⏳ Pablo erklärt die Aufgabe...</span>
          </button>
          <button class="btn-skip-audio" id="btn-skip-explanation" style="display: inline-block;">⏩ Direkt starten</button>
          <div id="challenge-active-btns" style="display: none; width: 100%; flex-direction: column; gap: 0.6rem; align-items: center;">
            <button class="btn-primary" id="btn-complete-challenge" style="background: linear-gradient(135deg, #10b981, #059669); font-size: 1rem; padding: 0.8rem 1.6rem; width: 100%; max-width: 320px;">Aufgabe gemeistert (+Heilung)</button>
            <button class="btn-secondary" id="btn-abort-challenge" style="border-color: rgba(239, 68, 68, 0.45); color: #fca5a5; font-size: 0.85rem; padding: 0.55rem 1.2rem; width: 100%; max-width: 320px;">Nicht geschafft / Abbrechen (-25 HP)</button>
          </div>
        </div>
      `;
      this.encounterContent.appendChild(box);

      const btnStartTimer = document.getElementById('btn-start-timer');
      const btnSkipExplanation = document.getElementById('btn-skip-explanation');
      const activeBtnsWrap = document.getElementById('challenge-active-btns');
      const btnComplete = document.getElementById('btn-complete-challenge');
      const btnAbort = document.getElementById('btn-abort-challenge');
      const timerDisplay = document.getElementById('challenge-timer');

      this.challengeStartBtn = btnStartTimer;
      this.challengeSkipBtn = btnSkipExplanation;

      if (btnSkipExplanation) {
        btnSkipExplanation.addEventListener('click', () => {
          this.enableChallengeTimerStart();
          this.stopAllCharacterAudio();
        });
      }

      btnStartTimer.addEventListener('click', () => {
        if (btnStartTimer.disabled) return;
        btnStartTimer.style.display = 'none';
        if (btnSkipExplanation) btnSkipExplanation.style.display = 'none';
        activeBtnsWrap.style.display = 'flex';
        window.soundEngine.playSelect();
        this.runChallengeTimer(enc.timerSeconds, timerDisplay, btnComplete);
      });

      btnComplete.addEventListener('click', () => {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.handleChallengeComplete(enc.completionReward);
      });

      btnAbort.addEventListener('click', () => {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.applyHeroDamage(25);
        this.applyBossDamage(
          0,
          'Mission abgebrochen! Lord Dreißig nutzt die Gunst der Stunde.',
          'Ha! Selbst an so einer einfachen Aufgabe gescheitert.',
          true,
          25
        );
      });
    }

    // Tap auf den Bereich deckt sofort alle Optionen auf
    this.encounterContent.onclick = () => {
      if (this.encounterContent.querySelector('.option-waiting, .duel-waiting, .challenge-waiting')) {
        this.revealAllOptionsImmediately();
      }
    };
  }

  // -------------------------------------------------------------
  // ANIMATED DUAL VOICE SEQUENCE (LORD DREISSIG -> ERZÄHLER)
  // -------------------------------------------------------------
  playRoundAudioSequence() {
    this.stopAllCharacterAudio();
    this.hideNarratorStageImmediate();

    // 1. Lord Dreißig spricht zuerst (Pablo bleibt unsichtbar!)
    window.soundEngine.playBoss(
      this.currentBossAudio,
      // onEnded: Lord Dreißig ist fertig
      () => {
        if (this.bossPortrait) {
          this.bossPortrait.classList.remove('character-talking');
        }

        // 2. SHOWMASTER PABLO startet:
        // Pablo wird ERST eingeblendet & animiert wenn der Sound tatsächlich im Lautsprecher ankommt (onStart)!
        window.soundEngine.playNarrator(
          this.currentNarratorAudio,
          // onEnded: Sprache ist zu Ende
          () => {
            if (this.narratorPortrait) {
              this.narratorPortrait.classList.remove('narrator-talking');
            }

            // Sicherstellen, dass alle Optionen sichtbar sind
            this.revealAllOptionsImmediately();

            // Challenge: Timer-Startbutton jetzt freischalten!
            this.enableChallengeTimerStart();

            // Interaktiver Nachhak-Spruch von Pablo wenn das Paar überlegt
            const enc = GAME_CONFIG.encounters[this.currentEncounterIdx];
            if (enc && (enc.type === 'quiz' || enc.type === 'who_is_it')) {
              this.scheduleQuestionBanter(enc);
            }
          },
          // onStart: Exakt in der Millisekunde, in der die Audio tatsächlich ertönt
          () => {
            this.showNarratorStage();
            if (this.narratorPortrait) {
              this.narratorPortrait.classList.add('narrator-talking');
            }
            // Fragen und Antworten schrittweise beim Vorlesen einblenden!
            const enc = GAME_CONFIG.encounters[this.currentEncounterIdx];
            this.triggerEncounterReveal(enc);
          }
        );
      },
      // onStart: Lord Dreißigs Mund wackelt erst wenn Sound tatsächlich startet
      () => {
        if (this.bossPortrait) {
          this.bossPortrait.classList.add('character-talking');
        }
      }
    );
  }

  showNarratorStage() {
    if (!this.narratorStage) return;
    this.narratorStage.classList.remove('narrator-fade-out');
    this.narratorStage.style.display = 'block';
  }

  hideNarratorStageImmediate() {
    if (!this.narratorStage) return;
    if (this.narratorPortrait) {
      this.narratorPortrait.classList.remove('narrator-talking');
    }
    this.narratorStage.classList.remove('narrator-fade-out');
    this.narratorStage.style.display = 'none';
  }

  hideNarratorStage() {
    if (!this.narratorStage) return;
    if (this.narratorPortrait) {
      this.narratorPortrait.classList.remove('narrator-talking');
    }
    this.narratorStage.classList.add('narrator-fade-out');
    setTimeout(() => {
      if (this.narratorStage && this.narratorStage.classList.contains('narrator-fade-out')) {
        this.narratorStage.style.display = 'none';
      }
    }, 360);
  }

  stopAllCharacterAudio() {
    this.isIntroSpeaking = false;
    this.stopVictoryRockSong();
    if (this.introVoiceTimeout) {
      clearTimeout(this.introVoiceTimeout);
      this.introVoiceTimeout = null;
    }
    if (this.banterTimeout) {
      clearTimeout(this.banterTimeout);
      this.banterTimeout = null;
    }
    window.soundEngine.stopAllVoices();
    this.clearRevealTimeouts();
    if (this.bossPortrait) this.bossPortrait.classList.remove('character-talking');
    if (this.previewBossAvatar) this.previewBossAvatar.classList.remove('character-talking');
    if (this.introNarratorPortrait) this.introNarratorPortrait.classList.remove('narrator-talking');
    if (this.narratorPortrait) this.narratorPortrait.classList.remove('narrator-talking');
  }

  clearRevealTimeouts() {
    if (this.activeRevealTimeouts && this.activeRevealTimeouts.length > 0) {
      this.activeRevealTimeouts.forEach(t => clearTimeout(t));
      this.activeRevealTimeouts = [];
    }
  }

  revealAllOptionsImmediately() {
    this.clearRevealTimeouts();
    if (!this.encounterContent) return;

    const hiddenBtns = this.encounterContent.querySelectorAll('.option-btn.option-waiting');
    hiddenBtns.forEach(btn => {
      btn.classList.remove('option-waiting');
      btn.classList.add('option-revealed');
    });

    const duelWrap = this.encounterContent.querySelector('.who-duel-wrap.duel-waiting');
    if (duelWrap) {
      duelWrap.classList.remove('duel-waiting');
      duelWrap.classList.add('duel-revealed');
    }

    const challengeBox = this.encounterContent.querySelector('.challenge-box.challenge-waiting');
    if (challengeBox) {
      challengeBox.classList.remove('challenge-waiting');
      challengeBox.classList.add('challenge-revealed');
    }
  }

  triggerEncounterReveal(enc) {
    this.clearRevealTimeouts();
    if (!enc || !this.encounterContent) return;

    // 1. Live Mission / Challenge
    if (enc.type === 'challenge') {
      const box = this.encounterContent.querySelector('.challenge-box.challenge-waiting');
      if (box) {
        box.classList.remove('challenge-waiting');
        box.classList.add('challenge-revealed');
      }
      return;
    }

    // 2. Paar-Duell
    if (enc.type === 'who_is_it') {
      const wrap = this.encounterContent.querySelector('.who-duel-wrap.duel-waiting');
      if (wrap) {
        wrap.classList.remove('duel-waiting');
        wrap.classList.add('duel-revealed');
      }
      return;
    }

    // 3. Quiz / Situations-Test: Antworten schrittweise beim Vorlesen einblenden!
    if (enc.type === 'quiz' || enc.type === 'decision') {
      const buttons = this.currentQuizButtons || Array.from(this.encounterContent.querySelectorAll('.option-btn'));
      if (!buttons || buttons.length === 0) return;

      const letters = ['A', 'B', 'C', 'D'];
      const narrLen = (enc.narrative || '').length;
      const optLens = (enc.options || []).map((o, i) => (`Antwort ${letters[i] || ''}: ` + (o.text || '')).length);
      const totalLen = narrLen + optLens.reduce((sum, len) => sum + len, 0) || 1;

      // Audio-Dauer abrufen (oder Schätzung ~14 Zeichen/Sekunde)
      const playerDuration = window.soundEngine?.narratorPlayer?.duration;
      const totalDurationSec = (playerDuration && !isNaN(playerDuration) && playerDuration > 3)
        ? playerDuration
        : Math.max(7, totalLen / 14);

      let accumulatedChars = narrLen;

      buttons.forEach((btn, idx) => {
        // Exakter Zeitpunkt, wann Pablo zu Antwort A, B, C kommt
        const triggerTimeSec = (accumulatedChars / totalLen) * totalDurationSec;
        const delayMs = Math.max(300, Math.round(triggerTimeSec * 1000));
        accumulatedChars += optLens[idx] || 50;

        const tId = setTimeout(() => {
          if (btn && btn.classList.contains('option-waiting')) {
            btn.classList.remove('option-waiting');
            btn.classList.add('option-revealed');
          }
        }, delayMs);

        this.activeRevealTimeouts.push(tId);
      });
    }
  }

  enableChallengeTimerStart() {
    if (this.challengeStartBtn) {
      this.challengeStartBtn.disabled = false;
      this.challengeStartBtn.classList.remove('btn-waiting-audio');
      this.challengeStartBtn.classList.add('pulse-ready-btn');
      this.challengeStartBtn.innerHTML = `<span>⏱️ Timer jetzt starten!</span>`;
    }
    if (this.challengeSkipBtn) {
      this.challengeSkipBtn.style.display = 'none';
    }
  }

  speakPablo(audioSrc, text = null, onEnded = null) {
    if (!audioSrc) {
      if (onEnded) onEnded();
      return;
    }

    if (this.narratorBubbleText && text) {
      this.narratorBubbleText.textContent = text;
    }

    window.soundEngine.playNarrator(
      audioSrc,
      // onEnded
      () => {
        if (this.narratorPortrait) {
          this.narratorPortrait.classList.remove('narrator-talking');
        }
        if (onEnded) onEnded();
      },
      // onStart: Pablo bobs & appears in exact sync with sound
      () => {
        this.showNarratorStage();
        if (this.narratorPortrait) {
          this.narratorPortrait.classList.add('narrator-talking');
        }
      }
    );
  }

  scheduleQuestionBanter(enc) {
    if (this.banterTimeout) clearTimeout(this.banterTimeout);

    // Nach ca. 6.5 Sekunden Bedenkzeit hakt Showmaster Pablo sympathisch nach!
    this.banterTimeout = setTimeout(() => {
      if (this.isAnswerLocked) return;

      const BANTER_LINES = [
        { file: 'assets/audio/voice/pablo_banter_1.mp3', text: 'Was denkt ihr? Ich bin echt gespannt was ihr auswählt!' },
        { file: 'assets/audio/voice/pablo_banter_2.mp3', text: 'Sprecht euch gut ab, lasst euch von Lord Dreißig nicht verunsichern!' },
        { file: 'assets/audio/voice/pablo_banter_3.mp3', text: 'Gar nicht so einfach! Was sagt euer Bauchgefühl?' },
        { file: 'assets/audio/voice/pablo_banter_4.mp3', text: 'Ich halte den Atem an... auf was tippt ihr?' },
        { file: 'assets/audio/voice/pablo_banter_5.mp3', text: 'Keine falsche Bescheidenheit, hört auf euer Herz!' }
      ];

      const banter = BANTER_LINES[Math.floor(Math.random() * BANTER_LINES.length)];
      const originalText = this.narratorBubbleText ? this.narratorBubbleText.textContent : '';

      this.speakPablo(banter.file, banter.text, () => {
        // Nach dem Spruch nach kurzer Pause den Fragetext wieder einblenden
        setTimeout(() => {
          if (!this.isAnswerLocked && this.narratorBubbleText) {
            this.narratorBubbleText.textContent = originalText;
          }
        }, 3200);
      });
    }, 6500);
  }

  runChallengeTimer(seconds, displayEl, completeBtn) {
    let remaining = seconds;

    // Pablo feuert das Paar beim Start an!
    const startClips = [
      { file: 'assets/audio/voice/pablo_timer_start_1.mp3', text: 'Und die Zeit läuft! Zeigt was ihr könnt!' },
      { file: 'assets/audio/voice/pablo_timer_start_2.mp3', text: 'Auf die Plätze, fertig, los!' }
    ];
    const startClip = startClips[Math.floor(Math.random() * startClips.length)];
    this.speakPablo(startClip.file, startClip.text);

    this.timerInterval = setInterval(() => {
      remaining--;
      window.soundEngine.playBlip();
      displayEl.textContent = `${remaining}s`;

      // 5 Sekunden vor Schluss: Pablo feuert an! ("Die Zeit ist gleich rum, haltet durch!")
      if (remaining === 5 && seconds >= 10) {
        const warnClips = [
          { file: 'assets/audio/voice/pablo_timer_warning_1.mp3', text: 'Die Zeit ist gleich rum, haltet durch!' },
          { file: 'assets/audio/voice/pablo_timer_warning_2.mp3', text: 'Endspurt! Nur noch wenige Sekunden!' },
          { file: 'assets/audio/voice/pablo_timer_warning_3.mp3', text: 'Noch fünf Sekunden, gebt alles!' }
        ];
        const warnClip = warnClips[Math.floor(Math.random() * warnClips.length)];
        this.speakPablo(warnClip.file, warnClip.text);
      }

      if (remaining <= 0) {
        clearInterval(this.timerInterval);
        displayEl.textContent = 'ZEIT ABGELAUFEN!';
        displayEl.classList.add('timer-alarm');
        window.soundEngine.playBuzzer();
        this.speakPablo('assets/audio/voice/pablo_timer_finish_1.mp3', 'Und Stopp! Die Zeit ist um!');
        this.triggerHaptic([120, 60, 180, 80, 450]);
        if (window.confetti) window.confetti.burst(window.innerWidth / 2, window.innerHeight * 0.5, 60);
      }
    }, 1000);
  }

  applyHeroDamage(amount) {
    const projectedHp = this.heroCurrentHp - amount;

    // Schutzengel-Mechanik: Falls Schaden tödlich wäre und Schutz noch aktiv ist
    if (projectedHp <= 0 && !this.hasUsedShield) {
      this.hasUsedShield = true;
      this.heroCurrentHp = 1;
      this.updateHpBars();
      if (this.heroShieldPill) {
        this.heroShieldPill.style.display = 'inline-flex';
        this.heroShieldPill.className = 'hero-shield-pill shield-saved-pop';
        this.heroShieldPill.textContent = '🛡️ Bei 1 HP gerettet!';
      }
      this.triggerHaptic([120, 80, 300, 100, 500]);

      this.spawnHeroDamagePopup(`-${amount} HP (BEI 1 HP GERETTET!)`);
      this.spawnShieldRescuePopup('🛡️ SCHUTZENGEL AKTIVIERT! LETZTE CHANCE!');

      if (window.soundEngine && window.soundEngine.playCrit) {
        window.soundEngine.playCrit();
      }

      if (this.heroesHudStrip) {
        this.heroesHudStrip.classList.remove('hero-damaged');
        this.heroesHudStrip.classList.remove('hero-shield-saved');
        void this.heroesHudStrip.offsetWidth;
        this.heroesHudStrip.classList.add('hero-shield-saved');
        setTimeout(() => this.heroesHudStrip.classList.remove('hero-shield-saved'), 2200);
      }
      return;
    }

    this.heroCurrentHp = Math.max(0, projectedHp);
    this.updateHpBars();
    this.triggerHaptic([70, 50, 160]);

    if (this.heroesHudStrip) {
      this.heroesHudStrip.classList.remove('hero-damaged');
      void this.heroesHudStrip.offsetWidth;
      this.heroesHudStrip.classList.add('hero-damaged');
    }

    if (this.heroCurrentHp <= 0) {
      setTimeout(() => {
        this.triggerDefeat();
      }, 1500);
    }
  }

  healHeroes(amount = 10) {
    if (amount <= 0) return;
    const oldHp = this.heroCurrentHp;
    this.heroCurrentHp = Math.min(this.heroMaxHp, this.heroCurrentHp + amount);
    const healed = this.heroCurrentHp - oldHp;
    this.updateHpBars();

    if (healed > 0) {
      this.spawnHeroHealPopup(`+${healed} HP`);
      if (window.soundEngine && window.soundEngine.playHeal) {
        window.soundEngine.playHeal();
      }
    } else {
      this.spawnHeroHealPopup('MAX HP');
    }

    if (this.heroesHudStrip) {
      this.heroesHudStrip.classList.remove('hero-healed');
      void this.heroesHudStrip.offsetWidth;
      this.heroesHudStrip.classList.add('hero-healed');
      setTimeout(() => this.heroesHudStrip.classList.remove('hero-healed'), 800);
    }
  }

  handleOptionSelected(option, clickedBtn = null, grid = null, allBtns = [], allOptions = []) {
    if (grid) {
      grid.style.pointerEvents = 'none';
    }

    const isWrong = option.isCorrect === false || !!option.heroDamage;

    // Visuelles Button-Feedback (Rot vs Grün)
    if (clickedBtn && allBtns.length > 0 && allOptions.length > 0) {
      if (isWrong) {
        clickedBtn.classList.add('option-wrong');
        // Richtige Antwort(en) in Grün enthüllen, damit das Paar die Lösung sieht
        allOptions.forEach((opt, idx) => {
          if (opt.isCorrect !== false && allBtns[idx]) {
            allBtns[idx].classList.add('option-correct');
          } else if (allBtns[idx] && allBtns[idx] !== clickedBtn) {
            allBtns[idx].classList.add('option-dimmed');
          }
        });
      } else {
        clickedBtn.classList.add('option-correct');
        allBtns.forEach(btn => {
          if (btn !== clickedBtn) btn.classList.add('option-dimmed');
        });
      }
    }

    if (isWrong) {
      this.applyHeroDamage(option.heroDamage || 20);
    } else {
      this.healHeroes(10);
    }

    this.applyBossDamage(
      option.damage || 0,
      option.reaction,
      option.bossReaction,
      isWrong,
      option.heroDamage || 20,
      isWrong ? 0 : 10
    );
  }

  handleChallengeComplete(reward) {
    const heal = 20;
    this.healHeroes(heal);

    // Erst wenn Pablo seinen Siegerspruch zu Ende gesprochen hat, geht das Spiel weiter!
    this.applyBossDamage(
      reward.damage,
      reward.reaction,
      reward.bossReaction,
      false,
      0,
      heal,
      (advanceEncounter) => {
        let hasAdvanced = false;
        const doAdvanceOnce = () => {
          if (!hasAdvanced) {
            hasAdvanced = true;
            setTimeout(advanceEncounter, 500);
          }
        };

        // Sicherheits-Timeout (4.5s), falls Audio blockiert ist
        const safetyTimer = setTimeout(doAdvanceOnce, 4500);

        this.speakPablo(
          'assets/audio/voice/pablo_challenge_win_1.mp3',
          'Großartig gemacht! Volle Punktzahl für das Traumpaar!',
          () => {
            clearTimeout(safetyTimer);
            doAdvanceOnce();
          }
        );
      }
    );
  }

  applyBossDamage(damage, playerReaction, bossReaction, isWrong = false, heroDamage = 0, healAmount = 10, customAdvanceHandler = null) {
    // Instantly stop voiceovers on player answer
    this.stopAllCharacterAudio();

    if (isWrong) {
      if (window.soundEngine && window.soundEngine.playWrong) {
        window.soundEngine.playWrong();
      } else if (window.soundEngine) {
        window.soundEngine.playHit();
      }
      this.triggerHaptic([80, 50, 160]);

      if (heroDamage > 0) {
        this.spawnHeroDamagePopup(`-${heroDamage} HP`);
      }
    } else {
      if (window.soundEngine) {
        window.soundEngine.playCrit();
      }
      this.triggerHaptic(40);
      if (window.confetti) {
        window.confetti.burst(window.innerWidth / 2, window.innerHeight * 0.35, 35);
      }

      // Schaden & Schütteln nur auf Lord Dreißig wenn nicht falsch und Schaden > 0
      if (damage > 0) {
        const isFinalRound = this.currentEncounterIdx >= GAME_CONFIG.encounters.length - 1;
        if (isFinalRound) {
          // Im Finale (Runde 50 "Der 30er Kuss") wird Lord Dreißig restlos auf 0 HP besiegt!
          this.bossCurrentHp = 0;
        } else {
          // In Runden 1 bis 49 behält er eine Mindest-Reserve (100 HP), damit garantiert alle 50 Runden erlebt werden!
          const minReserveHp = 100;
          this.bossCurrentHp = Math.max(minReserveHp, this.bossCurrentHp - damage);
        }
        this.updateHpBars();

        this.bossPortrait.classList.remove('boss-shake');
        void this.bossPortrait.offsetWidth; // trigger reflow
        this.bossPortrait.classList.add('boss-shake');

        this.spawnBossDamagePopup(`-${damage} HP`);
      }
    }

    // Feedback Toast
    let toastHtml = '';
    if (isWrong) {
      toastHtml = `<span><strong style="color: #f87171;">Falsch! Lord Dreißig kontert (-${heroDamage} HP):</strong> ${playerReaction}</span>`;
      if (this.heroCurrentHp <= 0) {
        toastHtml += `<div style="color: #ef4444; font-weight: 800; font-size: 0.95rem; margin-top: 6px;">⚠️ Lebensenergie erschöpft! Das Amt übernimmt die Kontrolle...</div>`;
      }
      this.battleToast.className = 'battle-toast toast-wrong';
    } else {
      const healText = healAmount > 0 ? ` (+${healAmount} Heilung)` : '';
      toastHtml = `<span><strong style="color: #6ee7b7;">Volltreffer${healText}:</strong> ${playerReaction}</span>`;
      this.battleToast.className = 'battle-toast toast-crit';
    }

    this.battleToast.innerHTML = toastHtml;
    this.battleToast.style.display = 'flex';

    if (bossReaction && this.bossDialogText) {
      this.bossDialogText.textContent = bossReaction;
    }

    // Disable buttons temporarily to prevent double tap
    const buttons = this.encounterContent.querySelectorAll('button');
    buttons.forEach(b => (b.disabled = true));

    const advanceEncounter = () => {
      if (this.heroCurrentHp <= 0) {
        return; // Defeat-Screen wird ausgelöst
      }
      // Sieg wird NUR nach Runde 50 im großen Finale ausgelöst – man sieht garantiert alles!
      if (this.currentEncounterIdx >= GAME_CONFIG.encounters.length - 1) {
        this.triggerVictory();
      } else {
        this.currentEncounterIdx++;
        this.renderCurrentEncounter();
      }
    };

    if (customAdvanceHandler) {
      customAdvanceHandler(advanceEncounter);
    } else {
      setTimeout(advanceEncounter, isWrong ? 2300 : 1750);
    }
  }

  triggerDefeat() {
    this.stopAllCharacterAudio();
    this.hideNarratorStage();
    this.switchScreen(this.screenDefeat);
    if (window.soundEngine) {
      window.soundEngine.playHit();
    }
    this.triggerHaptic([150, 80, 300, 100, 500]);
  }

  spawnHeroDamagePopup(text) {
    if (!this.heroesHudStrip) return;
    const popup = document.createElement('div');
    popup.className = 'damage-popup hero-dmg';
    popup.textContent = text;

    const rect = this.heroesHudStrip.getBoundingClientRect();
    const x = rect.left + rect.width / 2 + (Math.random() * 40 - 20);
    const y = rect.top + 8;

    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;

    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1200);
  }

  spawnHeroHealPopup(text) {
    if (!this.heroesHudStrip) return;
    const popup = document.createElement('div');
    popup.className = 'damage-popup hero-heal';
    popup.textContent = text;

    const rect = this.heroesHudStrip.getBoundingClientRect();
    const x = rect.left + rect.width / 2 + (Math.random() * 30 - 15);
    const y = rect.top + 6;

    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;

    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1200);
  }

  spawnShieldRescuePopup(text) {
    if (!this.heroesHudStrip) return;
    const popup = document.createElement('div');
    popup.className = 'damage-popup hero-shield-popup';
    popup.textContent = text;

    const rect = this.heroesHudStrip.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top - 14;

    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;

    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1800);
  }

  spawnBossDamagePopup(text) {
    if (!this.bossPortrait) return;
    const popup = document.createElement('div');
    popup.className = 'damage-popup';
    popup.textContent = text;

    const rect = this.bossPortrait.getBoundingClientRect();
    const x = rect.left + rect.width / 2 + (Math.random() * 40 - 20);
    const y = rect.top + rect.height / 2;

    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;

    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1200);
  }

  spawnDamagePopup(text) {
    this.spawnBossDamagePopup(text);
  }

  triggerVictory() {
    this.stopAllCharacterAudio();
    this.stopVictoryRockSong();
    this.hideNarratorStage();
    this.bossCurrentHp = 0;
    this.updateHpBars();
    this.switchScreen(this.screenVictory);

    this.triggerHaptic([80, 50, 150]);
    if (window.confetti) {
      window.confetti.stream(6000);
    }

    // 1. Lord Dreißig gesteht seine Niederlage ein ("Level 30 ist freigegeben")
    // 2. Sobald er fertig gesprochen hat: Der 22-sekündige Metal-Geburtstagssong zündet mit voller Power!
    window.soundEngine.playBoss(
      'assets/audio/voice/victory_boss.mp3',
      // onEnded:
      () => {
        this.playVictoryRockSong();
      }
    );

    this.renderVictoryContent();
  }

  playVictoryRockSong() {
    this.isRockSongPlaying = true;
    if (this.btnReplayRockSong) {
      this.btnReplayRockSong.classList.add('is-playing');
      if (this.rockBtnLabel) this.rockBtnLabel.textContent = 'Metal-Song pausieren ⏸️';
    }
    if (window.confetti) {
      window.confetti.burst(window.innerWidth / 2, window.innerHeight * 0.45, 45);
    }
    window.soundEngine.playVictorySong('assets/audio/victory_metal_birthday.mp3', () => {
      this.stopVictoryRockSong();
    });
  }

  stopVictoryRockSong() {
    this.isRockSongPlaying = false;
    window.soundEngine.stopVictorySong();
    if (this.btnReplayRockSong) {
      this.btnReplayRockSong.classList.remove('is-playing');
      if (this.rockBtnLabel) this.rockBtnLabel.textContent = 'Metal-Geburtstagssong noch mal rocken 🎸';
    }
  }

  renderVictoryContent() {
    const v = GAME_CONFIG.victory;
    this.victorySpeech.textContent = GAME_CONFIG.boss.defeatQuote;

    // Render Love Letter
    this.loveLetterContent.innerHTML = '';
    v.loveLetter.forEach(paragraph => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      this.loveLetterContent.appendChild(p);
    });

    // Render Photos
    this.renderPolaroids();

    // Gift Info (if present in config and DOM)
    if (this.btnRevealGift && v.surpriseGift) {
      this.btnRevealGift.textContent = v.surpriseGift.buttonText;
      if (this.giftTitle) this.giftTitle.textContent = v.surpriseGift.title;
      if (this.giftBody) this.giftBody.textContent = v.surpriseGift.message;
    }
  }

  renderPolaroids() {
    this.polaroidGrid.innerHTML = '';
    const allPhotos = [...GAME_CONFIG.victory.galleryPhotos, ...this.userPhotos];

    allPhotos.forEach(photo => {
      const card = document.createElement('div');
      card.className = 'polaroid-card';
      card.style.cursor = 'pointer';
      card.innerHTML = `
        <img class="polaroid-img" src="${photo.src}" alt="Erinnerung" loading="lazy">
        <p class="polaroid-caption">${photo.caption}</p>
      `;
      card.addEventListener('click', () => this.openLightbox(photo.src, photo.caption));
      this.polaroidGrid.appendChild(card);
    });
  }

  handleCustomPhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const newPhoto = {
        src: e.target.result,
        caption: `Unvergesslicher Moment mit ${GAME_CONFIG.heroineName}`
      };
      this.userPhotos.push(newPhoto);
      this.saveCustomPhotos();
      this.renderPolaroids();
      window.soundEngine.playHeal();
      if (window.confetti) window.confetti.burst(window.innerWidth / 2, window.innerHeight * 0.8, 40);
    };
    reader.readAsDataURL(file);
  }

  saveCustomPhotos() {
    try {
      localStorage.setItem('enrika30_custom_photos', JSON.stringify(this.userPhotos));
    } catch (err) {
      console.warn('Could not store photo to local storage (likely size limit)', err);
    }
  }

  loadSavedPhotos() {
    try {
      const data = localStorage.getItem('enrika30_custom_photos');
      if (data) {
        this.userPhotos = JSON.parse(data);
      }
    } catch (err) {
      console.warn('Error loading custom photos', err);
    }
  }

  resetGame() {
    this.stopAllCharacterAudio();
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.bossCurrentHp = this.bossMaxHp;
    this.heroCurrentHp = this.heroMaxHp;
    this.hasUsedShield = false;
    this.currentEncounterIdx = 0;
    this.updateHpBars();
    this.renderIntro();
  }
}

// Start Game Engine once DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.initConfetti();
  window.game = new EnrikaGame();
});
