// Web Audio API Synthesizer for CSI Anomali
// 100% pure browser audio synthesis - no external audio files required!

class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgmInterval: any = null;
  private isBgmPlaying: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // 1. Recall "Tas-Tas-Tas" Spam Sound (10 rapid pings)
  public playRecallSpam() {
    const ctx = this.getContext();
    if (!ctx) return;

    for (let i = 0; i < 8; i++) {
      const startTime = ctx.currentTime + i * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1200 + (i % 2 === 0 ? 300 : 0), startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.06);
    }
  }

  // 2. Retri Miss / Sad Trombone (Wah wah wah waaaah)
  public playRetriMiss() {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [293.66, 277.18, 261.63, 246.94]; // D4, C#4, C4, B3
    const durations = [0.25, 0.25, 0.25, 0.6];

    let current = ctx.currentTime;
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, current);
      if (idx === 3) {
        // Bend pitch down for final waaaah
        osc.frequency.linearRampToValueAtTime(200, current + durations[idx]);
      }

      gain.gain.setValueAtTime(0.2, current);
      gain.gain.linearRampToValueAtTime(0.01, current + durations[idx]);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(current);
      osc.stop(current + durations[idx]);

      current += durations[idx] + 0.05;
    });
  }

  // 3. First Blood / Danger Ping
  public playDangerPing() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.3);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  // 4. Defeat Sound (Depressing 8-bit descent)
  public playDefeat() {
    const ctx = this.getContext();
    if (!ctx) return;

    const freqs = [523.25, 493.88, 466.16, 440.0, 415.3, 349.23, 261.63];
    let time = ctx.currentTime;

    freqs.forEach((f) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, time);

      gain.gain.setValueAtTime(0.25, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 0.18);

      time += 0.18;
    });
  }

  // 5. Windows XP Error Clunk / Bonk
  public playErrorBonk() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.setValueAtTime(90, now + 0.08);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // 6. Halusinasi Kemenangan / Victory Fanfare yang Fals
  public playVictoryFals() {
    const ctx = this.getContext();
    if (!ctx) return;

    // A intentionally out of tune fanfare
    const notes = [261, 329, 392, 523, 493, 587, 659];
    let now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx % 2 === 0 ? "sawtooth" : "square";
      osc.frequency.setValueAtTime(freq + (Math.random() * 20 - 10), now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);

      now += 0.18;
    });
  }

  // 7. Looping 8-Bit Meme Circus BGM
  public toggleBgm(callback?: (playing: boolean) => void) {
    if (this.isBgmPlaying) {
      this.stopBgm();
      if (callback) callback(false);
      return false;
    } else {
      this.startBgm();
      if (callback) callback(true);
      return true;
    }
  }

  public startBgm() {
    const ctx = this.getContext();
    if (!ctx) return;
    this.stopBgm();
    this.isBgmPlaying = true;

    // Goofy Indonesian meme / Tetris / Dangdut style 8-bit riff
    const melody = [
      330, 0, 330, 349, 392, 0, 392, 349, 330, 294, 261, 0, 261, 294, 330, 0,
      330, 294, 294, 0, 330, 0, 330, 349, 392, 0, 392, 349, 330, 294, 261, 0
    ];
    let step = 0;

    this.bgmInterval = setInterval(() => {
      if (!this.isBgmPlaying || !this.ctx) return;
      const freq = melody[step % melody.length];
      step++;

      if (freq > 0) {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now);

        // Bass accompaniment
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = "sawtooth";
        bassOsc.frequency.setValueAtTime(freq / 2, now);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);

        bassGain.gain.setValueAtTime(0.06, now);
        bassGain.gain.exponentialRampToValueAtTime(0.005, now + 0.14);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        bassOsc.connect(bassGain);
        bassGain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.15);
        bassOsc.start(now);
        bassOsc.stop(now + 0.15);
      }
    }, 180);
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  public getIsBgmPlaying() {
    return this.isBgmPlaying;
  }
}

export const sounds = new SoundEngine();
