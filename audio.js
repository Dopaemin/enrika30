// ===================================================================
// ENRIKA & EMIN - LEVEL 30: AUDIO & VOICE ENGINE
// Web Audio Synth & Dual-Track HTML5 Voiceover Player
// ===================================================================

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.bossPlayer = null;
    this.narratorPlayer = null;
    this.letterPlayer = null;
    this.currentPlaying = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (!this.bossPlayer) {
      this.bossPlayer = document.getElementById('audio-player-boss') || new Audio();
      this.narratorPlayer = document.getElementById('audio-player-narrator') || new Audio();
      this.letterPlayer = document.getElementById('audio-player-letter') || new Audio();
      this.musicPlayer = new Audio();

      // Mobile Safari Unlocking
      [this.bossPlayer, this.narratorPlayer, this.letterPlayer, this.musicPlayer].forEach(p => {
        try {
          p.load();
        } catch (e) {}
      });
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      this.stopAllVoices();
    }
    return this.muted;
  }

  stopAllVoices() {
    [this.bossPlayer, this.narratorPlayer, this.letterPlayer, this.musicPlayer].forEach(p => {
      if (p) {
        try {
          p.pause();
          p.currentTime = 0;
          p.onended = null;
          p.onerror = null;
        } catch (e) {}
      }
    });
    this.currentPlaying = null;
  }

  stopVoice() {
    this.stopAllVoices();
  }

  playBoss(src, onEnded = null, onStart = null) {
    if (this.muted || !src) {
      if (onStart) onStart();
      if (onEnded) onEnded();
      return null;
    }
    this.init();
    this.stopAllVoices();
    this.bossPlayer.src = src;
    this.currentPlaying = this.bossPlayer;

    let called = false;
    const finish = () => {
      if (!called) {
        called = true;
        this.bossPlayer.onended = null;
        this.bossPlayer.onerror = null;
        this.bossPlayer.onplaying = null;
        if (onEnded) onEnded();
      }
    };

    let started = false;
    const start = () => {
      if (!started) {
        started = true;
        if (onStart) onStart();
      }
    };

    this.bossPlayer.onended = finish;
    this.bossPlayer.onerror = finish;
    this.bossPlayer.onplaying = start;

    const p = this.bossPlayer.play();
    if (p) {
      p.then(() => start()).catch((err) => {
        if (err && (err.name === 'AbortError' || err.code === 20)) {
          return;
        }
        finish();
      });
    }
    return this.bossPlayer;
  }

  playNarrator(src, onEnded = null, onStart = null) {
    if (this.muted || !src) {
      if (onStart) onStart();
      if (onEnded) onEnded();
      return null;
    }
    this.init();
    this.stopAllVoices();
    this.narratorPlayer.src = src;
    this.currentPlaying = this.narratorPlayer;

    let called = false;
    const finish = () => {
      if (!called) {
        called = true;
        this.narratorPlayer.onended = null;
        this.narratorPlayer.onerror = null;
        this.narratorPlayer.onplaying = null;
        if (onEnded) onEnded();
      }
    };

    let started = false;
    const start = () => {
      if (!started) {
        started = true;
        if (onStart) onStart();
      }
    };

    this.narratorPlayer.onended = finish;
    this.narratorPlayer.onerror = finish;
    this.narratorPlayer.onplaying = start;

    const p = this.narratorPlayer.play();
    if (p) {
      p.then(() => start()).catch((err) => {
        if (err && (err.name === 'AbortError' || err.code === 20)) {
          return;
        }
        finish();
      });
    }
    return this.narratorPlayer;
  }

  playLetter(src, onEnded = null) {
    if (this.muted || !src) return null;
    this.init();
    this.stopAllVoices();
    this.letterPlayer.src = src;
    this.currentPlaying = this.letterPlayer;
    if (onEnded) {
      this.letterPlayer.onended = onEnded;
    }
    this.letterPlayer.play().catch(() => {});
    return this.letterPlayer;
  }

  playVictorySong(src = 'assets/audio/victory_metal_birthday.mp3', onEnded = null) {
    if (this.muted) {
      if (onEnded) onEnded();
      return null;
    }
    this.init();
    if (this.musicPlayer) {
      try {
        this.musicPlayer.pause();
        this.musicPlayer.currentTime = 0;
      } catch (e) {}
    }
    this.musicPlayer.src = src;
    this.musicPlayer.volume = 0.95;
    if (onEnded) {
      this.musicPlayer.onended = onEnded;
    }
    this.musicPlayer.play().catch(e => console.warn('Music play error:', e));
    return this.musicPlayer;
  }

  stopVictorySong() {
    if (this.musicPlayer) {
      try {
        this.musicPlayer.pause();
        this.musicPlayer.currentTime = 0;
        this.musicPlayer.onended = null;
      } catch (e) {}
    }
  }

  // Legacy compatibility helpers
  playVoice(src, onEnded = null) {
    return this.playBoss(src, onEnded);
  }

  // -------------------------------------------------------------
  // SYNTH SOUND EFFECTS
  // -------------------------------------------------------------
  playTone(freq, type, duration, delay = 0, gainLevel = 0.15) {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(gainLevel, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  playBlip() {
    this.playTone(520, 'sine', 0.08, 0, 0.1);
  }

  playSelect() {
    this.playTone(660, 'triangle', 0.1, 0, 0.12);
    this.playTone(880, 'triangle', 0.15, 0.06, 0.12);
  }

  playPop() {
    if (this.muted) return;
    this.init();
    this.playTone(740, 'sine', 0.18, 0, 0.08);
    this.playTone(1100, 'triangle', 0.22, 0.03, 0.12);
  }

  playHit() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.25);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  playCrit() {
    this.playTone(440, 'sawtooth', 0.1, 0, 0.2);
    this.playTone(660, 'sawtooth', 0.15, 0.08, 0.2);
    this.playTone(990, 'triangle', 0.35, 0.16, 0.25);
  }

  playWrong() {
    if (this.muted) return;
    this.init();
    this.playTone(240, 'sawtooth', 0.16, 0, 0.22);
    this.playTone(170, 'sawtooth', 0.3, 0.14, 0.25);
  }

  playBuzzer() {
    if (this.muted) return;
    this.init();

    // 1. Synthesized Game-Show / Stadium Schluss-Sirene (2 kraftvolle Huptöne)
    try {
      if (this.ctx) {
        const now = this.ctx.currentTime;
        const blasts = [
          { start: 0, duration: 0.28, freq: 165 },
          { start: 0.38, duration: 0.75, freq: 155 }
        ];

        blasts.forEach(b => {
          const t = now + b.start;
          const dur = b.duration;

          const osc1 = this.ctx.createOscillator();
          osc1.type = 'sawtooth';
          osc1.frequency.setValueAtTime(b.freq, t);
          osc1.frequency.linearRampToValueAtTime(b.freq * 0.93, t + dur);

          const osc2 = this.ctx.createOscillator();
          osc2.type = 'sawtooth';
          osc2.frequency.setValueAtTime(b.freq * 1.5, t);
          osc2.frequency.linearRampToValueAtTime(b.freq * 1.5 * 0.93, t + dur);

          const osc3 = this.ctx.createOscillator();
          osc3.type = 'square';
          osc3.frequency.setValueAtTime(b.freq * 2.5, t);
          osc3.frequency.linearRampToValueAtTime(b.freq * 2.5 * 0.93, t + dur);

          const gain = this.ctx.createGain();
          gain.gain.setValueAtTime(0.32, t);
          gain.gain.setValueAtTime(0.32, t + dur - 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

          osc1.connect(gain);
          osc2.connect(gain);
          osc3.connect(gain);
          gain.connect(this.ctx.destination);

          osc1.start(t);
          osc1.stop(t + dur);
          osc2.start(t);
          osc2.stop(t + dur);
          osc3.start(t);
          osc3.stop(t + dur);
        });
      }
    } catch (e) {
      console.warn('Synth buzzer error', e);
    }

    // 2. Audio-File Fallback (spielt buzzer.wav / buzzer.m4a ab)
    try {
      const buzzerAudio = new Audio('assets/audio/buzzer.wav');
      buzzerAudio.volume = 0.85;
      buzzerAudio.play().catch(() => {});
    } catch (e) {}
  }

  playBossRoar() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.linearRampToValueAtTime(70, now + 0.4);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  playHeal() {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'sine', 0.3, idx * 0.08, 0.15);
    });
  }

  playVictory() {
    const melody = [
      { f: 523.25, d: 0.15, t: 0.0 },  // C5
      { f: 523.25, d: 0.15, t: 0.15 }, // C5
      { f: 523.25, d: 0.15, t: 0.3 },  // C5
      { f: 523.25, d: 0.35, t: 0.45 }, // C5
      { f: 415.30, d: 0.35, t: 0.75 }, // G#4
      { f: 466.16, d: 0.35, t: 1.05 }, // A#4
      { f: 523.25, d: 0.3, t: 1.35 },  // C5
      { f: 466.16, d: 0.15, t: 1.65 }, // A#4
      { f: 523.25, d: 0.65, t: 1.8 }   // C5 long
    ];
    melody.forEach(m => {
      this.playTone(m.f, 'triangle', m.d, m.t, 0.22);
    });
  }
}

window.soundEngine = new SoundEngine();
