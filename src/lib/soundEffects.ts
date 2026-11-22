// Cyberpunk / Dark Web Web Audio Synthesizer for CSI Anomali
// 100% pure client-side Web Audio API synthesis - zero external audio assets!

class CyberSoundEngine {
  private ctx: AudioContext | null = null;
  private ambientInterval: any = null;
  private isAmbientPlaying: boolean = false;

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

  // 1. Terminal Keystroke / Cyber Click
  public playKeyClick() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1400 + Math.random() * 400, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.03);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  }

  // 2. Glitch / Static Cyber Burst
  public playGlitchBurst() {
    const ctx = this.getContext();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * 0.12;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * (i % 20 < 10 ? 0.3 : 0.05);
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2200, ctx.currentTime);
    filter.Q.setValueAtTime(3, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start();
  }

  // 3. Cyber Sonar / Radar Ping (Deep Web Detection)
  public playSonarPing() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1046.5, now); // C6
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.8);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.8);
  }

  // 4. Retri Failure Cyber Alarm (Glitchy slide down)
  public playRetriGlitch() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.linearRampToValueAtTime(120, now + 0.45);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  // 5. Digital Tas-Tas-Tas Cyber Pulse
  public playDigitalRecall() {
    const ctx = this.getContext();
    if (!ctx) return;

    for (let i = 0; i < 7; i++) {
      const startTime = ctx.currentTime + i * 0.07;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(1760 + (i % 2 === 0 ? 440 : 0), startTime);

      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.05);
    }
  }

  // 6. Security Breach / Warning Siren
  public playBreachAlarm() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.setValueAtTime(1200, now + 0.15);
    osc.frequency.setValueAtTime(800, now + 0.3);
    osc.frequency.setValueAtTime(1200, now + 0.45);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);
  }

  // 7. Ambient Darknet Cyber Drone (Dark ambient atmospheric pulse)
  public toggleAmbientDrone(callback?: (playing: boolean) => void): boolean {
    if (this.isAmbientPlaying) {
      this.stopAmbientDrone();
      if (callback) callback(false);
      return false;
    } else {
      this.startAmbientDrone();
      if (callback) callback(true);
      return true;
    }
  }

  public startAmbientDrone() {
    const ctx = this.getContext();
    if (!ctx) return;
    this.stopAmbientDrone();
    this.isAmbientPlaying = true;

    // Dark cyberpunk techno drone sequence
    const notes = [65.41, 73.42, 65.41, 87.31, 58.27, 65.41]; // C2, D2, C2, F2, Bb1, C2
    let step = 0;

    this.ambientInterval = setInterval(() => {
      if (!this.isAmbientPlaying || !this.ctx) return;
      const freq = notes[step % notes.length];
      step++;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, now);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320 + (step % 3) * 120, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.7);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.75);
    }, 750);
  }

  public stopAmbientDrone() {
    this.isAmbientPlaying = false;
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }

  public getIsPlaying() {
    return this.isAmbientPlaying;
  }
}

export const cyberSounds = new CyberSoundEngine();
// Alias for backwards compatibility
export const sounds = {
  playRecallSpam: () => cyberSounds.playDigitalRecall(),
  playRetriMiss: () => cyberSounds.playRetriGlitch(),
  playDangerPing: () => cyberSounds.playSonarPing(),
  playDefeat: () => cyberSounds.playBreachAlarm(),
  playErrorBonk: () => cyberSounds.playGlitchBurst(),
  playVictoryFals: () => cyberSounds.playSonarPing(),
  toggleBgm: (cb?: (p: boolean) => void) => cyberSounds.toggleAmbientDrone(cb),
};
