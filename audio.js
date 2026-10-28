
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
        try {
            if (!this.ctx) {
                const AudioContextClass =
                    window.AudioContext || window.webkitAudioContext;

                if (!AudioContextClass) {
                    console.warn("Tarayıcınız Web Audio API desteklemiyor.");
                    return false;
                }

                this.ctx = new AudioContextClass();
            }

            if (this.ctx.state === "suspended") {
                this.ctx.resume().catch(err =>
                    console.warn("Ses başlatılamadı:", err)
                );
            }

            return true;
        } catch (err) {
            console.error("Ses motoru başlatılamadı:", err);
            return false;
        }
    }

    playTone({
        type = "sine",
        frequency = 440,
        endFrequency = null,
        duration = 0.08,
        volume = 0.5,
        delay = 0
    } = {}) {
        if (this.isMuted || !this.init()) return;

        try {
            const now = this.ctx.currentTime + delay;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(
                Math.max(1, frequency),
                now
            );

            if (endFrequency !== null && endFrequency > 0) {
                osc.frequency.exponentialRampToValueAtTime(
                    endFrequency,
                    now + duration
                );
            }

            gain.gain.setValueAtTime(
                Math.max(0.0001, this.masterVolume * volume),
                now
            );

            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                now + duration
            );

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + duration + 0.01);
        } catch (err) {
            console.warn("Ses oynatılamadı:", err);
        }
    }

    playTileDraw() {
        this.playTone({
            type: "triangle",
            frequency: 420,
            endFrequency: 120,
            duration: 0.06,
            volume: 0.4
        });

        this.playTone({
            type: "triangle",
            frequency: 560,
            endFrequency: 120,
            duration: 0.06,
            volume: 0.4,
            delay: 0.04
        });
    }

    playTileClick() {
        this.playTone({
            type: "triangle",
            frequency: 600,
            endFrequency: 80,
            duration: 0.05,
            volume: 0.5
        });
    }

    playTileDiscard() {
        this.playTone({
            type: "sine",
            frequency: 320,
            endFrequency: 60,
            duration: 0.09,
            volume: 0.65
        });
    }

    playOkeyWin() {
        [523.25, 659.25, 783.99, 1046.5, 1318.51]
            .forEach((freq, idx) => {
                this.playTone({
                    type: "triangle",
                    frequency: freq,
                    duration: 0.4,
                    volume: 0.5,
                    delay: idx * 0.09
                });
            });
    }

    // Tavla ve zar sesleri
    playDiceRoll() {
        for (let i = 0; i < 4; i++) {
            this.playTone({
                type: "triangle",
                frequency: 600 + Math.random() * 300,
                endFrequency: 140,
                duration: 0.045,
                volume: 0.55 * ((4 - i) / 4),
                delay: i * 0.06 + Math.random() * 0.03
            });
        }
    }

    playCheckerMove() {
        this.playTone({
            type: "sine",
            frequency: 240,
            endFrequency: 90,
            duration: 0.07,
            volume: 0.5
        });
    }

    playCheckerHit() {
        this.playTone({
            type: "square",
            frequency: 450,
            endFrequency: 80,
            duration: 0.1,
            volume: 0.6
        });
    }

    // Geleneksel enstrüman sesleri
    playNey(freq = 440, duration = 1.3) {
        if (this.isMuted || !this.init()) return;

        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const lfo = this.ctx.createOscillator();
            const lfoGain = this.ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, now);

            lfo.frequency.setValueAtTime(5.2, now);
            lfoGain.gain.setValueAtTime(4, now);

            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);

            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(
                this.masterVolume * 0.6,
                now + Math.min(0.18, duration * 0.3)
            );
            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                now + duration
            );

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            lfo.start(now);
            osc.start(now);

            lfo.stop(now + duration);
            osc.stop(now + duration);
        } catch (err) {
            console.warn("Ney sesi oynatılamadı:", err);
        }
    }

    playBaglama(freq = 293.66, duration = 0.9) {
        if (this.isMuted || !this.init()) return;

        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();

            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(freq, now);

            filter.type = "lowpass";
            filter.frequency.setValueAtTime(2900, now);
            filter.frequency.exponentialRampToValueAtTime(
                240,
                now + duration
            );

            gain.gain.setValueAtTime(
                Math.max(0.0001, this.masterVolume * 0.75),
                now
            );
            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                now + duration
            );

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + duration);
        } catch (err) {
            console.warn("Bağlama sesi oynatılamadı:", err);
        }
    }

    playKanun(freq = 523.25, duration = 1.0) {
        if (this.isMuted || !this.init()) return;

        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();

            osc.type = "triangle";
            osc.frequency.setValueAtTime(freq, now);

            filter.type = "bandpass";
            filter.frequency.setValueAtTime(freq * 1.8, now);
            filter.Q.setValueAtTime(4, now);

            gain.gain.setValueAtTime(
                Math.max(0.0001, this.masterVolume * 0.7),
                now
            );
            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                now + duration
            );

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + duration);
        } catch (err) {
            console.warn("Kanun sesi oynatılamadı:", err);
        }
    }

    playKudum(isDum = true) {
        this.playTone({
            type: "triangle",
            frequency: isDum ? 85 : 140,
            endFrequency: 35,
            duration: 0.26,
            volume: 0.85
        });
    }

    // Mızraplı teller: tambur (uzun sap, parlak tını)
    playTambur(freq = 220, duration = 1.2) {
        if (this.isMuted || !this.init()) return;

        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const shimmer = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();

            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(freq, now);
            shimmer.type = "triangle";
            shimmer.frequency.setValueAtTime(freq * 2.01, now);

            filter.type = "lowpass";
            filter.Q.value = 2.4;
            filter.frequency.setValueAtTime(3600, now);
            filter.frequency.exponentialRampToValueAtTime(420, now + duration);

            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.linearRampToValueAtTime(this.masterVolume * 0.52, now + 0.012);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

            osc.connect(filter);
            shimmer.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            shimmer.start(now);
            osc.stop(now + duration + 0.02);
            shimmer.stop(now + duration + 0.02);
        } catch (err) {
            console.warn("Tambur sesi oynatılamadı:", err);
        }
    }

    // Ud: yumuşak, yuvarlak mızrap tınısı
    playUd(freq = 293.66, duration = 1.0) {
        if (this.isMuted || !this.init()) return;

        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const body = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();

            osc.type = "triangle";
            osc.frequency.setValueAtTime(freq, now);
            body.type = "sine";
            body.frequency.setValueAtTime(freq / 2, now);

            filter.type = "bandpass";
            filter.frequency.setValueAtTime(freq * 2.4, now);
            filter.Q.value = 1.6;

            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.linearRampToValueAtTime(this.masterVolume * 0.58, now + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

            osc.connect(filter);
            body.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            body.start(now);
            osc.stop(now + duration + 0.02);
            body.stop(now + duration + 0.02);
        } catch (err) {
            console.warn("Ud sesi oynatılamadı:", err);
        }
    }

    // Kemençe: yaylı, buruk ve titrek tını
    playKemence(freq = 392, duration = 1.3) {
        if (this.isMuted || !this.init()) return;

        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();
            const lfo = this.ctx.createOscillator();
            const lfoGain = this.ctx.createGain();

            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(freq, now);
            filter.type = "lowpass";
            filter.frequency.setValueAtTime(2100, now);

            lfo.frequency.setValueAtTime(6.4, now);
            lfoGain.gain.setValueAtTime(freq * 0.012, now);
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);

            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.linearRampToValueAtTime(this.masterVolume * 0.48, now + 0.14);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            lfo.start(now);
            osc.start(now);
            lfo.stop(now + duration);
            osc.stop(now + duration);
        } catch (err) {
            console.warn("Kemençe sesi oynatılamadı:", err);
        }
    }

    // Zurna: keskin, davetkâr nefes
    playZurna(freq = 440, duration = 0.8) {
        if (this.isMuted || !this.init()) return;

        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();
            const lfo = this.ctx.createOscillator();
            const lfoGain = this.ctx.createGain();

            osc.type = "square";
            osc.frequency.setValueAtTime(freq, now);
            filter.type = "bandpass";
            filter.frequency.setValueAtTime(freq * 2.2, now);
            filter.Q.value = 2.2;

            lfo.frequency.setValueAtTime(7.2, now);
            lfoGain.gain.setValueAtTime(freq * 0.015, now);
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);

            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.linearRampToValueAtTime(this.masterVolume * 0.34, now + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            lfo.start(now);
            osc.start(now);
            lfo.stop(now + duration);
            osc.stop(now + duration);
        } catch (err) {
            console.warn("Zurna sesi oynatılamadı:", err);
        }
    }

    // Davul: düm (tok) ve tek (çevik) vuruşları
    playDavul(isDum = true) {
        this.playTone({
            type: "sine",
            frequency: isDum ? 72 : 190,
            endFrequency: isDum ? 32 : 70,
            duration: isDum ? 0.34 : 0.14,
            volume: isDum ? 0.95 : 0.55
        });
        if (!isDum) {
            this.playTone({
                type: "triangle",
                frequency: 520,
                endFrequency: 120,
                duration: 0.09,
                volume: 0.28,
                delay: 0.015
            });
        }
    }

    // Def / bendir: kasnak zili ve deri tıkırtısı
    playDef() {
        this.playTone({
            type: "triangle",
            frequency: 1180,
            endFrequency: 620,
            duration: 0.12,
            volume: 0.3
        });
        this.playTone({
            type: "sine",
            frequency: 180,
            endFrequency: 90,
            duration: 0.18,
            volume: 0.36,
            delay: 0.01
        });
    }

    // Kaval: nefesli, boşluklu çoban tınısı
    playKaval(freq = 440, duration = 1.0) {
        if (this.isMuted || !this.init()) return;

        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();
            const vibrato = this.ctx.createOscillator();
            const vibratoGain = this.ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, now);
            vibrato.frequency.setValueAtTime(4.6, now);
            vibratoGain.gain.setValueAtTime(freq * 0.008, now);
            vibrato.connect(vibratoGain);
            vibratoGain.connect(osc.frequency);

            filter.type = "lowpass";
            filter.frequency.setValueAtTime(2400, now);

            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.linearRampToValueAtTime(this.masterVolume * 0.5, now + 0.09);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            vibrato.start(now);
            osc.start(now);
            vibrato.stop(now + duration);
            osc.stop(now + duration);
        } catch (err) {
            console.warn("Kaval sesi oynatılamadı:", err);
        }
    }

    // Ebru damlası
    playDrop() {
        if (this.isMuted || !this.init()) return;

        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(
                720 + Math.random() * 260,
                now
            );
            osc.frequency.exponentialRampToValueAtTime(
                1450 + Math.random() * 200,
                now + 0.08
            );

            gain.gain.setValueAtTime(
                Math.max(0.0001, this.masterVolume * 0.35),
                now
            );
            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                now + 0.12
            );

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.13);
        } catch (err) {
            console.warn("Ebru sesi oynatılamadı:", err);
        }
    }

    // Ok atışı
    playBowShoot() {
        if (this.isMuted || !this.init()) return;

        try {
            const now = this.ctx.currentTime;
            const bufferSize = Math.floor(
                this.ctx.sampleRate * 0.22
            );
            const buffer = this.ctx.createBuffer(
                1,
                bufferSize,
                this.ctx.sampleRate
            );
            const data = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = this.ctx.createBiquadFilter();
            filter.type = "bandpass";
            filter.frequency.setValueAtTime(420, now);
            filter.frequency.exponentialRampToValueAtTime(
                1900,
                now + 0.11
            );

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(
                Math.max(0.0001, this.masterVolume * 0.6),
                now
            );
            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                now + 0.22
            );

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            noise.start(now);
            noise.stop(now + 0.22);
        } catch (err) {
            console.warn("Ok atışı sesi oynatılamadı:", err);
        }
    }

    playArrowHit(isBullseye = false) {
        this.playTone({
            type: "triangle",
            frequency: isBullseye ? 320 : 190,
            endFrequency: 45,
            duration: 0.16,
            volume: 0.75
        });
    }

    playClick() {
        this.playTone({
            type: "sine",
            frequency: 750,
            endFrequency: 180,
            duration: 0.03,
            volume: 0.25
        });
    }

    // Saray ambiyansı
    toggleAmbientMusic() {
        if (!this.init()) return false;

        if (this.ambientPlaying) {
            this.stopAmbientMusic();
            return false;
        }

        this.startAmbientMusic();
        return this.ambientPlaying;
    }

    startAmbientMusic() {
        if (this.isMuted || !this.init() || this.ambientPlaying) {
            return;
        }

        try {
            this.ambientNodes = [];
            const now = this.ctx.currentTime;

            this.ambientGain = this.ctx.createGain();
            this.ambientGain.gain.setValueAtTime(0.001, now);
            this.ambientGain.gain.linearRampToValueAtTime(
                0.08,
                now + 2
            );
            this.ambientGain.connect(this.ctx.destination);

            [196.00, 293.66, 392.00].forEach(freq => {
                const osc = this.ctx.createOscillator();
                const filter = this.ctx.createBiquadFilter();

                osc.type = "sine";
                osc.frequency.setValueAtTime(freq, now);

                filter.type = "lowpass";
                filter.frequency.setValueAtTime(800, now);

                osc.connect(filter);
                filter.connect(this.ambientGain);

                osc.start(now);
                this.ambientNodes.push(osc);
            });

            this.ambientPlaying = true;
        } catch (err) {
            console.warn("Ambiyans başlatılamadı:", err);
            this.stopAmbientMusic();
        }
    }

    // Düzeltilmiş fonksiyon: kapanış parantezleri tam
    stopAmbientMusic() {
        try {
            if (this.ambientGain && this.ctx) {
                const now = this.ctx.currentTime;
                const gainNode = this.ambientGain;
                const nodes = [...this.ambientNodes];

                gainNode.gain.cancelScheduledValues(now);
                gainNode.gain.setValueAtTime(
                    gainNode.gain.value,
                    now
                );
                gainNode.gain.linearRampToValueAtTime(
                    0.0001,
                    now + 1
                );

                setTimeout(() => {
                    nodes.forEach(node => {
                        try {
                            node.stop();
                            node.disconnect();
                        } catch (err) {
                            // Düğüm zaten durmuş olabilir.
                        }
                    });

                    try {
                        gainNode.disconnect();
                    } catch (err) {
                        // Düğüm zaten ayrılmış olabilir.
                    }
                }, 1050);
            }
        } catch (err) {
            console.warn("Ambiyans durdurulamadı:", err);
        } finally {
            this.ambientNodes = [];
            this.ambientGain = null;
            this.ambientPlaying = false;
        }
    }

    // Mangala ve diğer taş sesleri
    playStoneDrop() {
        this.playTone({
            type: "sine",
            frequency: 520 + Math.random() * 240,
            endFrequency: 140,
            duration: 0.07,
            volume: 0.45
        });
    }

    playWaterSwish() {
        if (this.isMuted || !this.init()) return;

        try {
            const now = this.ctx.currentTime;
            const bufferSize = Math.floor(
                this.ctx.sampleRate * 0.3
            );
            const buffer = this.ctx.createBuffer(
                1,
                bufferSize,
                this.ctx.sampleRate
            );
            const data = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = this.ctx.createBiquadFilter();
            filter.type = "lowpass";
            filter.frequency.setValueAtTime(600, now);
            filter.frequency.exponentialRampToValueAtTime(
                200,
                now + 0.28
            );

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(
                Math.max(0.0001, this.masterVolume * 0.25),
                now
            );
            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                now + 0.28
            );

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            noise.start(now);
            noise.stop(now + 0.3);
        } catch (err) {
            console.warn("Su sesi oynatılamadı:", err);
        }
    }

    playSealStamp() {
        this.playTone({
            type: "triangle",
            frequency: 120,
            endFrequency: 40,
            duration: 0.22,
            volume: 0.8
        });
    }

    playChime() {
        [880, 1318.5, 1760].forEach((freq, i) => {
            this.playTone({
                type: "sine",
                frequency: freq,
                duration: 0.6,
                volume: 0.25,
                delay: i * 0.06
            });
        });
    }

    setMuted(muted) {
        this.isMuted = Boolean(muted);

        if (this.isMuted && this.ambientPlaying) {
            this.stopAmbientMusic();
        }
    }

    setVolume(volume) {
        const parsed = Number(volume);

        if (!Number.isFinite(parsed)) return;

        this.masterVolume = Math.max(
            0,
            Math.min(1, parsed)
        );
    }
}

window.turkishSound = new TurkishSoundEngine();
