// TÜRK KÜLTÜR PORTALI — Geleneksel Enstrümanlar, Masa Oyunları & Ses Motoru (Web Audio API)
class TurkishSoundEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.masterVolume = 0.5;
        this.ambientPlaying = false;
        this.ambientGain = null;
        this.ambientNodes = [];
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // === OKEY SESLERİ ===
    playTileDraw() {
        if (this.isMuted) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            for (let i = 0; i < 2; i++) {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(420 + i * 140, now + i * 0.04);
                osc.frequency.exponentialRampToValueAtTime(120, now + i * 0.04 + 0.06);

                gain.gain.setValueAtTime(this.masterVolume * 0.4, now + i * 0.04);
                gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.06);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now + i * 0.04);
                osc.stop(now + i * 0.04 + 0.06);
            }
        } catch (e) {}
    }

    playTileClick() {
        if (this.isMuted) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(560 + Math.random() * 80, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.05);

            gain.gain.setValueAtTime(this.masterVolume * 0.5, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.05);
        } catch (e) {}
    }

    playTileDiscard() {
        if (this.isMuted) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(320, now);
            osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);

            gain.gain.setValueAtTime(this.masterVolume * 0.65, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.09);
        } catch (e) {}
    }

    playOkeyWin() {
        if (this.isMuted) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + idx * 0.09);

                gain.gain.setValueAtTime(this.masterVolume * 0.5, now + idx * 0.09);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.4);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now + idx * 0.09);
                osc.stop(now + idx * 0.09 + 0.4);
            });
        } catch (e) {}
    }

    // === TAVLA VE ZAR SESLERİ ===
    playDiceRoll() {
        if (this.isMuted) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const bounces = 4;
            for (let i = 0; i < bounces; i++) {
                const delay = i * 0.06 + Math.random() * 0.03;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(600 + Math.random() * 300, now + delay);
                osc.frequency.exponentialRampToValueAtTime(140, now + delay + 0.04);

                const vol = (bounces - i) / bounces * this.masterVolume * 0.55;
                gain.gain.setValueAtTime(vol, now + delay);
                gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.04);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now + delay);
                osc.stop(now + delay + 0.045);
            }
        } catch (e) {}
    }

    playCheckerMove() {
        if (this.isMuted) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(240, now);
            osc.frequency.exponentialRampToValueAtTime(90, now + 0.07);

            gain.gain.setValueAtTime(this.masterVolume * 0.5, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.07);
        } catch (e) {}
    }

    playCheckerHit() {
        if (this.isMuted) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const osc1 = this.ctx.createOscillator();
            const gain1 = this.ctx.createGain();

            osc1.type = 'square';
            osc1.frequency.setValueAtTime(450, now);
            osc1.frequency.exponentialRampToValueAtTime(80, now + 0.1);

            gain1.gain.setValueAtTime(this.masterVolume * 0.6, now);
            gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

            osc1.connect(gain1);
            gain1.connect(this.ctx.destination);
            osc1.start(now);
            osc1.stop(now + 0.1);
        } catch (e) {}
    }

    // === ENSTRÜMAN SESLERİ ===
    playNey(freq = 440, duration = 1.3) {
        if (this.isMuted) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            // Yumuşak nefes tonu için sinüs ve vibrato
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);

            // Hafif Türk musikisi vibratosu
            const lfo = this.ctx.createOscillator();
            const lfoGain = this.ctx.createGain();
            lfo.frequency.setValueAtTime(5.2, now);
            lfoGain.gain.setValueAtTime(4.0, now);
            lfo.connect(osc.frequency);
            lfo.start(now);
            lfo.stop(now + duration);

            // Nefes atak ve sönümleme eğrisi
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(this.masterVolume * 0.6, now + 0.18);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + duration);
        } catch (e) {}
    }

    playBaglama(freq = 293.66, duration = 0.9) {
        if (this.isMuted) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(2900, now);
            filter.frequency.exponentialRampToValueAtTime(240, now + duration);

            gain.gain.setValueAtTime(this.masterVolume * 0.75, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + duration);
        } catch (e) {}
    }

    playKanun(freq = 523.25, duration = 1.0) {
        if (this.isMuted) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now);

            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(freq * 1.8, now);
            filter.Q.setValueAtTime(4.0, now);

            gain.gain.setValueAtTime(this.masterVolume * 0.7, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + duration);
        } catch (e) {}
    }

    playKudum(isDum = true) {
        if (this.isMuted) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            const baseFreq = isDum ? 85 : 140;
            osc.frequency.setValueAtTime(baseFreq, now);
            osc.frequency.exponentialRampToValueAtTime(35, now + 0.22);

            gain.gain.setValueAtTime(this.masterVolume * 0.85, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.26);
        } catch (e) {}
    }

    // === EBRU SANATI SESLERİ ===
    playDrop() {
        if (this.isMuted) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(720 + Math.random() * 260, now);
            osc.frequency.exponentialRampToValueAtTime(1450 + Math.random() * 200, now + 0.08);

            gain.gain.setValueAtTime(this.masterVolume * 0.35, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.12);
        } catch (e) {}
    }

    // === KEMANKEŞ OKÇULUK SESLERİ ===
    playBowShoot() {
        if (this.isMuted) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const bufferSize = Math.floor(this.ctx.sampleRate * 0.22);
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(420, now);
            filter.frequency.exponentialRampToValueAtTime(1900, now + 0.11);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(this.masterVolume * 0.6, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            noise.start(now);
            noise.stop(now + 0.22);
        } catch (e) {}
    }

    playArrowHit(isBullseye = false) {
        if (this.isMuted) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(isBullseye ? 320 : 190, now);
            osc.frequency.exponentialRampToValueAtTime(45, now + 0.14);

            gain.gain.setValueAtTime(this.masterVolume * 0.75, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.16);
        } catch (e) {}
    }

    playClick() {
        if (this.isMuted) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(750, now);
            osc.frequency.exponentialRampToValueAtTime(180, now + 0.03);

            gain.gain.setValueAtTime(this.masterVolume * 0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.03);
        } catch (e) {}
    }

    // === HUZUR VERİCİ SARAY AMBİYANS TONU (DEM SESİ) ===
    toggleAmbientMusic() {
        this.init();
        if (this.ambientPlaying) {
            this.stopAmbientMusic();
            return false;
        } else {
            this.startAmbientMusic();
            return true;
        }
    }

    startAmbientMusic() {
        try {
            this.ambientNodes = [];
            const now = this.ctx.currentTime;
            this.ambientGain = this.ctx.createGain();
            this.ambientGain.gain.setValueAtTime(0.001, now);
            this.ambientGain.gain.linearRampToValueAtTime(0.08, now + 2);
            this.ambientGain.connect(this.ctx.destination);

            // Tanbur Dem Notaları (Rast Kökü: SOL ve RE akoru)
            const freqs = [196.00, 293.66, 392.00];
            freqs.forEach((f) => {
                const osc = this.ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(f, now);

                const filter = this.ctx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(800, now);

                osc.connect(filter);
                filter.connect(this.ambientGain);
                osc.start(now);
                this.ambientNodes.push(osc);
            });

            this.ambientPlaying = true;
        } catch (e) {}
    }

    stopAmbientMusic() {
        try {
            if (this.ambientGain) {
                const now = this.ctx.currentTime;
                this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 1);
                setTimeout(() => {
                    this.ambientNodes.forEach(n => {
                        try { n.stop(); n.disconnect(); } catch (err) {}
                    });
                    this.ambientNodes = [];
                }, 1000);
            }
            this.ambientPlaying = false;
        } catch (e) {}
    }
}

window.turkishSound = new TurkishSoundEngine();
