// TÜRK KÜLTÜR PORTALI — Ana Uygulama & Arayüz Mantığı

document.addEventListener('DOMContentLoaded', () => {
    initTurkishBackground();
    initThemeAndSound();
    initTabs();
    initScrollTools();
    initOkeyTable();
    initTavlaTable();
    initMangala();
    initKemankesAndEbru();
    initInstruments();
    initGokturkTranslator();
    initAnatoliaAtlas();
    initRulers();
    initAtasozleri();
    initDailyWisdom();
    initHikmetQuiz();
});

// Toast Bildirimi
function showToast(message, icon = '🇹🇷') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerHTML = `<span class="toast-icon">${icon}</span> <span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function initScrollTools() {
    const progress = document.getElementById('scrollProgressBar');
    const backToTop = document.getElementById('backToTop');
    let framePending = false;

    const update = () => {
        const root = document.documentElement;
        const maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
        const progressRatio = Math.min(1, Math.max(0, window.scrollY / maxScroll));
        if (progress) progress.style.transform = `scaleX(${progressRatio})`;
        if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 420);
        framePending = false;
    };

    window.addEventListener('scroll', () => {
        if (framePending) return;
        framePending = true;
        requestAnimationFrame(update);
    }, { passive: true });
    window.addEventListener('resize', update);
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
    }
    update();
}

/* ========================================================
   1. SELÇUKLU YILDIZI & ALTIN ZERRECİKLERİ ARKA PLANI
   ======================================================== */
function initTurkishBackground() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const stars = [];
    const count = 35;

    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 24 + 12,
            angle: Math.random() * Math.PI * 2,
            vRot: (Math.random() - 0.5) * 0.006,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            alpha: Math.random() * 0.12 + 0.05
        });
    }

    function drawSeljukStar(cx, cy, r, angle) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        for (let i = 0; i < 2; i++) {
            ctx.rect(-r / 2, -r / 2, r, r);
            ctx.rotate(Math.PI / 4);
        }
        ctx.stroke();
        ctx.restore();
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        for (const s of stars) {
            s.x += s.vx;
            s.y += s.vy;
            s.angle += s.vRot;

            if (s.x < -60) s.x = width + 60;
            if (s.x > width + 60) s.x = -60;
            if (s.y < -60) s.y = height + 60;
            if (s.y > height + 60) s.y = -60;

            const isLight = document.body.classList.contains('light-theme');
            ctx.strokeStyle = isLight
                ? `rgba(155, 120, 17, ${s.alpha * 1.2})`
                : `rgba(212, 175, 55, ${s.alpha})`;
            ctx.lineWidth = 1.3;
            drawSeljukStar(s.x, s.y, s.size, s.angle);
        }

        requestAnimationFrame(draw);
    }
    draw();
}

/* ========================================================
   2. TEMA VE SES YÖNETİMİ (GECE / GÜNDÜZ MODU)
   ======================================================== */
function initThemeAndSound() {
    const themeToggle = document.getElementById('themeToggle');
    const soundToggle = document.getElementById('soundToggle');
    const ambientToggle = document.getElementById('ambientToggle');

    // Kayıtlı Temayı Yükle
    const savedTheme = localStorage.getItem('otag_theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeToggle) themeToggle.innerHTML = '☀️ Saray Gündüzü';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            const themeName = isLight ? 'light' : 'dark';
            localStorage.setItem('otag_theme', themeName);

            themeToggle.innerHTML = isLight ? '☀️ Saray Gündüzü' : '🌙 Gece Modu';
            showToast(isLight ? 'Saray Gündüzü Moduna geçildi (Aydınlık Mermer)' : 'Gece Moduna geçildi (Lacivert ve Altın)', isLight ? '☀️' : '🌙');
            if (window.turkishSound) window.turkishSound.playClick();
        });
    }

    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            if (!window.turkishSound) return;
            window.turkishSound.isMuted = !window.turkishSound.isMuted;
            soundToggle.innerHTML = window.turkishSound.isMuted ? '🔇 Ses Kapalı' : '🔊 Ses Açık';
            showToast(window.turkishSound.isMuted ? 'Ses efektleri kapatıldı' : 'Ses efektleri açıldı', window.turkishSound.isMuted ? '🔇' : '🔊');
        });
    }

    if (ambientToggle) {
        ambientToggle.addEventListener('click', () => {
            if (!window.turkishSound) return;
            const isPlaying = window.turkishSound.toggleAmbientMusic();
            ambientToggle.innerHTML = isPlaying ? '🪕 Ambiyans: Açık' : '🪕 Ambiyans: Kapalı';
            ambientToggle.classList.toggle('active', isPlaying);
            showToast(isPlaying ? 'Saray dinletisi (Huzur veren tanbur dem sesi) başlatıldı' : 'Ambiyans müziği durduruldu', isPlaying ? '🪕' : '🔇');
        });
    }
}

/* ========================================================
   3. SEKME VE SAYFA YÖNETİMİ
   ======================================================== */
function initTabs() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.app-section');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            if (window.turkishSound) window.turkishSound.playClick();

            navButtons.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            btn.classList.add('active');
            const targetSection = document.getElementById(target);
            if (targetSection) targetSection.classList.add('active');

            if (target === 'tab-tavla' && window.tavlaInstance) {
                setTimeout(() => window.tavlaInstance.render(), 40);
            }
            if (target === 'tab-ebru' && window.ebruInstance) {
                setTimeout(() => window.ebruInstance.resize(), 40);
            }
            if (target === 'tab-kemankes' && window.kemankesInstance) {
                setTimeout(() => window.kemankesInstance.resize(), 40);
            }
        });
    });
}

/* ========================================================
   4. KIRAATHANE OKEY MASASI
   ======================================================== */
function initOkeyTable() {
    window.okeyInstance = new window.OkeyGame();
    window.okeyInstance.startNewGame();

    // Klasik Okey / 101 Okey geçişi
    document.querySelectorAll('[data-okey-mode]').forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.okeyMode;
            if (window.okeyInstance.gameMode === mode) return;
            window.okeyInstance.setGameMode(mode);
            if (mode === '101-esli') {
                showToast('Eşli 101 masası kuruldu: ortağınız Mehmet Usta, takım puanı 1010 hedefinde!', '🤝');
            } else {
                showToast(mode === '101'
                    ? '101 Okey masası kuruldu: 21 taş, 101 puan açılışı ve animasyonlu el açma!'
                    : 'Klasik Okey masası kuruldu: 14 taşla perleri tamamla.', '🀄');
            }
        });
    });

    const closeModalBtn = document.getElementById('btnCloseOkeyWin');
    const okeyModal = document.getElementById('okeyWinModal');
    if (closeModalBtn && okeyModal) {
        closeModalBtn.addEventListener('click', () => {
            okeyModal.classList.remove('show');
            window.okeyInstance.startNewGame();
        });
    }
}

/* ========================================================
   5. TAVLA OYUNU MASASI
   ======================================================== */
function initTavlaTable() {
    window.tavlaInstance = new window.TavlaGame('tavlaCanvas');

    const btnRules = document.getElementById('btnTavlaRules');
    if (btnRules) {
        btnRules.addEventListener('click', () => {
            alert(
                "🎲 GELENEKSEL ŞARK TAVLALARI KURALLARI:\n\n" +
                "1. Beyaz pullar sizindir ve saat yönünün tersine 23'ten 0'a doğru ilerler.\n" +
                "2. Siyah pullar bilgisayara aittir ve 0'dan 23'e doğru ilerler.\n" +
                "3. Çift zarlar (ör: 5-5) 4 kez oynanır.\n" +
                "4. Rakibin tek kalan puluna basarsanız pul 'kırılır' ve ortaya (bara) gider.\n" +
                "5. Kırık pulunuz varsa oyuna girmeden diğer pulları oynayamazsınız.\n" +
                "6. Tüm 15 pulunuzu kendi ev hanenize (Beyaz için 0..5) topladığınızda dışarı toplamaya (bear off) başlayabilirsiniz.\n" +
                "7. Tüm pullarını ilk toplayan maçı kazanır!"
            );
        });
    }

    // Tavlada kendi lafını yazma
    const chatInput = document.getElementById('tavlaChatInput');
    const btnChat = document.getElementById('btnTavlaChat');
    const btnRandomChat = document.getElementById('btnTavlaChatRandom');
    const randomTavlaLines = [
        "Zar senden yana dönerse hatırlatırsın bu lafı!",
        "Bu masada pul kırılır, laf kırılmaz!",
        "Hele bir zar at da görelim kim konuşuyor.",
        "Kıraathane ahalisi duydu, artık oynamak zorundasın!",
        "Lafın büyüğü masada değil, zarda konuşulur.",
        "Bakalım senin zarın mı, benim pulum mu güçlü?"
    ];

    const sendTavlaChat = () => {
        if (!chatInput || !window.tavlaInstance) return;
        const text = chatInput.value.trim();
        if (!text) {
            showToast('Laf atmak için önce bir şey yaz.', '💬');
            return;
        }
        window.tavlaInstance.say(text);
        chatInput.value = '';
    };

    if (btnChat) btnChat.addEventListener('click', sendTavlaChat);
    if (chatInput) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendTavlaChat();
            }
        });
    }
    if (btnRandomChat && chatInput) {
        btnRandomChat.addEventListener('click', () => {
            chatInput.value = randomTavlaLines[Math.floor(Math.random() * randomTavlaLines.length)];
            chatInput.focus();
        });
    }
}

/* ========================================================
   5B. MANGALA MASASI (UNESCO KÖÇÜRME)
   ======================================================== */
function initMangala() {
    window.mangalaInstance = new window.MangalaGame('mangalaContainer');

    const modal = document.getElementById('mangalaRulesModal');
    const openRules = () => {
        if (modal) modal.classList.add('show');
    };
    const closeRules = () => {
        if (modal) modal.classList.remove('show');
    };

    const btnTop = document.getElementById('btnMangalaRulesTop');
    if (btnTop) btnTop.addEventListener('click', openRules);

    ['btnCloseMangalaRules', 'btnCloseMangalaRulesBottom'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', closeRules);
    });
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeRules();
        });
    }

    const resultModal = document.getElementById('mangalaResultModal');
    if (resultModal) {
        resultModal.addEventListener('click', (e) => {
            if (e.target === resultModal) resultModal.classList.remove('show');
        });
    }
}

/* ========================================================
   6. KEMANKEŞ OKÇULUĞU VE EBRU ATÖLYESİ
   ======================================================== */
function initKemankesAndEbru() {
    window.kemankesInstance = new window.KemankesGame('kemankesCanvas');
    window.ebruInstance = new window.EbruStudio('ebruCanvas');

    const kemankesModeInfo = {
        puta: '🎯 Puta talimi: Sabit hedefin gözünü vur, komboyu büyüt.',
        hareketli: '🌀 Hareketli hedef: Puta aşağı yukarı salınır; zamanlamayı yakala.',
        menzil: '📏 Menzil atışı: 5 okla en uzağa at; Tozkoparan’ın 846 m rekorunu geç.',
        kus: '🕊️ Uçan kuş avı: 8 okla soldan süzülen kuşu vur; göğüsten vuruş çift puan.',
        firtina: '🌪️ Fırtına talimi: Rüzgâr sertleşir ve ani yön değiştirir; kuvveti ona göre ayarla.'
    };

    document.querySelectorAll('[data-kemankes-mode]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-kemankes-mode]').forEach(x => x.classList.remove('active'));
            btn.classList.add('active');
            const mode = btn.dataset.kemankesMode;
            if (window.kemankesInstance) window.kemankesInstance.setMode(mode);
            const desc = document.getElementById('kemankesModeDesc');
            if (desc) desc.textContent = kemankesModeInfo[mode] || '';
            showToast(`${btn.textContent.trim()} başladı. Rüzgârı ve kuvveti hesaba kat!`, '🏹');
        });
    });

    const startKemankesBtn = document.getElementById('btnStartKemankes');
    if (startKemankesBtn) {
        startKemankesBtn.addEventListener('click', () => {
            window.kemankesInstance.start();
            const mode = window.kemankesInstance.mode;
            const label = (kemankesModeInfo[mode] || 'Talim').split(':')[0];
            showToast(`Ya Hak! ${label} başladı!`, '🏹');
        });
    }

    const ebruToolNames = {
        drop: 'Damla', spray: 'Serpme', biz: 'Biz', comb: 'Tarak',
        tulip: 'Lale', rose: 'Gül', carnation: 'Karanfil', bulbul: 'Bülbül yuvası',
        ring: 'Halka', daisy: 'Papatya'
    };

    const refreshEbruTip = () => {
        const tip = document.getElementById('ebruTip');
        if (!tip || !window.ebruInstance) return;
        const studio = window.ebruInstance;
        const colorName = (document.querySelector('.ebru-color-btn.active') || {}).title || 'Renk';
        tip.textContent = `Araç: ${ebruToolNames[studio.currentTool] || studio.currentTool} · Fırça: ${studio.brushSize} · ${colorName}`;
    };

    const ebruColors = document.querySelectorAll('.ebru-color-btn');
    ebruColors.forEach(c => {
        c.addEventListener('click', () => {
            ebruColors.forEach(x => x.classList.remove('active'));
            c.classList.add('active');
            window.ebruInstance.currentColor = c.dataset.color;
            refreshEbruTip();
        });
    });

    const ebruTools = document.querySelectorAll('[data-ebru-tool]');
    ebruTools.forEach(btn => {
        btn.addEventListener('click', () => {
            const studio = window.ebruInstance;
            if (!studio) return;
            ebruTools.forEach(x => x.classList.remove('active'));
            btn.classList.add('active');
            studio.currentTool = btn.dataset.ebruTool;
            studio.isCombing = studio.currentTool === 'biz';
            const motifs = ['tulip', 'rose', 'carnation', 'bulbul', 'ring', 'daisy'];
            if (motifs.includes(studio.currentTool)) {
                studio.applyTool(studio.canvas.width / 2, studio.canvas.height / 2);
                studio.saveState();
                showToast(`${btn.textContent.trim()} motifi tekneye işlendi.`, '🎨');
            }
            refreshEbruTip();
        });
    });

    const ebruBrush = document.getElementById('ebruBrushSize');
    const ebruBrushValue = document.getElementById('ebruBrushValue');
    if (ebruBrush) {
        ebruBrush.addEventListener('input', () => {
            window.ebruInstance.brushSize = Number(ebruBrush.value);
            if (ebruBrushValue) ebruBrushValue.textContent = ebruBrush.value;
            refreshEbruTip();
        });
    }
    const gallSlider = document.getElementById('ebruGallRatio');
    const gallValue = document.getElementById('ebruGallValue');
    if (gallSlider) {
        gallSlider.addEventListener('input', () => {
            window.ebruInstance.gallRatio = Number(gallSlider.value);
            if (gallValue) gallValue.textContent = `${Number(gallSlider.value).toFixed(1)}×`;
        });
    }

    const ebruActions = {
        btnEbruUndo: () => window.ebruInstance.undo(),
        btnEbruGelgit: () => window.ebruInstance.applyGelgit(),
        btnEbruSal: () => window.ebruInstance.applySalPattern(),
        btnEbruBattal: () => window.ebruInstance.createRandomBattal()
    };
    Object.entries(ebruActions).forEach(([id, action]) => {
        const button = document.getElementById(id);
        if (button) button.addEventListener('click', action);
    });

    const btnClearEbru = document.getElementById('btnClearEbru');
    if (btnClearEbru) {
        btnClearEbru.addEventListener('click', () => {
            window.ebruInstance.clear();
            showToast('Tekne temizlendi, taze kitreli su hazır.', '💧');
        });
    }

    const btnPrintEbru = document.getElementById('btnPrintEbru');
    if (btnPrintEbru) {
        btnPrintEbru.addEventListener('click', () => {
            window.ebruInstance.printOnPaper();
            showToast('Ebru kağıdı mühürlenip cihazınıza indirildi!', '📜');
        });
    }

    refreshEbruTip();
}

/* ========================================================
   7. MEŞKHANE: GELENEKSEL ENSTRÜMANLAR VE MAKAM TAKSİMLERİ
   ======================================================== */
function initInstruments() {
    // Ney Perdeleri
    const neyKeys = document.querySelectorAll('.ney-key');
    const neyNotes = {
        'Rast': 392.00, 'Dügah': 440.00, 'Segah': 466.16,
        'Çargah': 523.25, 'Neva': 587.33, 'Hüseyni': 659.25, 'Gerdaniye': 783.99
    };

    neyKeys.forEach(k => {
        k.addEventListener('click', () => {
            const note = k.dataset.note;
            if (neyNotes[note] && window.turkishSound) {
                window.turkishSound.playNey(neyNotes[note], 1.3);
                k.classList.add('active');
                setTimeout(() => k.classList.remove('active'), 250);
            }
        });
    });

    // Bağlama Telleri
    const sazStrings = document.querySelectorAll('.saz-string');
    const sazNotes = { 'Alt': 293.66, 'Orta': 220.00, 'Üst': 146.83 };

    sazStrings.forEach(s => {
        s.addEventListener('click', () => {
            const str = s.dataset.string;
            if (sazNotes[str] && window.turkishSound) {
                window.turkishSound.playBaglama(sazNotes[str], 1.1);
                s.classList.add('vibrating');
                setTimeout(() => s.classList.remove('vibrating'), 200);
            }
        });
    });

    // Kanun Mandalları
    const kanunKeys = document.querySelectorAll('.kanun-key');
    const kanunNotes = {
        'Re': 293.66, 'Mi': 329.63, 'Fa#': 369.99, 'Sol': 392.00, 'La': 440.00, 'Si': 493.88, 'Do2': 523.25
    };

    kanunKeys.forEach(k => {
        k.addEventListener('click', () => {
            const note = k.dataset.note;
            if (kanunNotes[note] && window.turkishSound) {
                window.turkishSound.playKanun(kanunNotes[note], 1.2);
                k.classList.add('active');
                setTimeout(() => k.classList.remove('active'), 200);
            }
        });
    });

    // Kudüm
    const btnKudumDüm = document.getElementById('btnKudumDum');
    const btnKudumTek = document.getElementById('btnKudumTek');

    if (btnKudumDüm) {
        btnKudumDüm.addEventListener('click', () => {
            if (window.turkishSound) window.turkishSound.playKudum(true);
        });
    }
    if (btnKudumTek) {
        btnKudumTek.addEventListener('click', () => {
            if (window.turkishSound) window.turkishSound.playKudum(false);
        });
    }

    // Makam Taksimi Dinletisi
    const btnHicaz = document.getElementById('btnPlayHicaz');
    if (btnHicaz) {
        btnHicaz.addEventListener('click', () => {
            const hicazMelody = [
                { f: 440.00, d: 380 }, { f: 466.16, d: 350 }, { f: 554.37, d: 450 },
                { f: 587.33, d: 450 }, { f: 659.25, d: 600 }, { f: 554.37, d: 350 },
                { f: 466.16, d: 400 }, { f: 440.00, d: 900 }
            ];
            let elapsed = 0;
            hicazMelody.forEach(item => {
                setTimeout(() => {
                    if (window.turkishSound) window.turkishSound.playNey(item.f, item.d / 1000 * 1.5);
                }, elapsed);
                elapsed += item.d;
            });
            showToast('Hicaz Makamı Ney Taksimi İcra Ediliyor...', '🎶');
        });
    }

    const btnNihavend = document.getElementById('btnPlayNihavend');
    if (btnNihavend) {
        btnNihavend.addEventListener('click', () => {
            const nihavendNotes = [
                { f: 293.66, d: 250 }, { f: 329.63, d: 250 }, { f: 349.23, d: 300 },
                { f: 392.00, d: 300 }, { f: 440.00, d: 350 }, { f: 466.16, d: 350 },
                { f: 554.37, d: 400 }, { f: 587.33, d: 800 }
            ];
            let elapsed = 0;
            nihavendNotes.forEach(item => {
                setTimeout(() => {
                    if (window.turkishSound) window.turkishSound.playKanun(item.f, 0.9);
                }, elapsed);
                elapsed += item.d;
            });
            showToast('Nihavend Longa Tınıları Çalınıyor...', '🪕');
        });
    }

    /* ---- Yeni çalgılar: kemençe, tambur, ud, kaval, zurna ---- */
    const instrumentNotes = {
        kemence: { 'Sol': 392.00, 'La': 440.00, 'Si': 493.88, 'Do': 523.25, 'Re': 587.33 },
        tambur: { 'Alt': 293.66, 'Orta': 220.00, 'Üst': 146.83 },
        ud: { 'Re': 293.66, 'Mi': 329.63, 'Sol': 392.00, 'La': 440.00 },
        zurna: { 'La': 440.00, 'Si': 493.88, 'Do#': 554.37, 'Re': 587.33, 'Mi': 659.25 },
        kaval: { 'Re': 293.66, 'Mi': 329.63, 'Fa': 349.23, 'Sol': 392.00, 'La': 440.00, 'Si♭': 466.16 }
    };

    document.querySelectorAll('[data-inst]').forEach(btn => {
        btn.addEventListener('click', () => {
            const inst = btn.dataset.inst;
            const note = btn.dataset.note;
            const freq = instrumentNotes[inst] && instrumentNotes[inst][note];
            if (!freq || !window.turkishSound) return;

            if (inst === 'kemence') window.turkishSound.playKemence(freq, 1.4);
            else if (inst === 'tambur') window.turkishSound.playTambur(freq, 1.5);
            else if (inst === 'ud') window.turkishSound.playUd(freq, 1.2);
            else if (inst === 'zurna') window.turkishSound.playZurna(freq, 0.9);
            else if (inst === 'kaval') window.turkishSound.playKaval(freq, 1.1);

            btn.classList.add('active');
            setTimeout(() => btn.classList.remove('active'), 220);
        });
    });

    const btnDavulDum = document.getElementById('btnDavulDum');
    const btnDavulTek = document.getElementById('btnDavulTek');
    const btnDefZil = document.getElementById('btnDefZil');
    if (btnDavulDum) btnDavulDum.addEventListener('click', () => window.turkishSound && window.turkishSound.playDavul(true));
    if (btnDavulTek) btnDavulTek.addEventListener('click', () => window.turkishSound && window.turkishSound.playDavul(false));
    if (btnDefZil) btnDefZil.addEventListener('click', () => window.turkishSound && window.turkishSound.playDef());

    /* ---- Hazır repertuvar: kısa taksim ve türkü icraları ---- */
    const repertoire = {
        segah: {
            title: 'Segah Taksim',
            notes: [
                { f: 440, d: 520, i: 'ney' }, { f: 466, d: 340, i: 'ney' }, { f: 493, d: 600, i: 'ney' },
                { f: 523, d: 380, i: 'ney' }, { f: 587, d: 520, i: 'ney' }, { f: 622, d: 340, i: 'kanun' },
                { f: 587, d: 320, i: 'kanun' }, { f: 523, d: 520, i: 'ney' }, { f: 493, d: 340, i: 'ney' },
                { f: 466, d: 380, i: 'ney' }, { f: 440, d: 900, i: 'ney' }
            ]
        },
        hicaz: {
            title: 'Hicaz Saz Semaisi',
            notes: [
                { f: 440, d: 260, i: 'tambur' }, { f: 466, d: 260, i: 'tambur' }, { f: 554, d: 380, i: 'kemence' },
                { f: 587, d: 300, i: 'kemence' }, { f: 659, d: 460, i: 'kemence' }, { f: 698, d: 260, i: 'tambur' },
                { f: 659, d: 260, i: 'tambur' }, { f: 587, d: 360, i: 'ud' }, { f: 554, d: 360, i: 'ud' },
                { f: 466, d: 300, i: 'kemence' }, { f: 440, d: 780, i: 'kemence' }
            ]
        },
        nihavend: {
            title: 'Nihavend Longa',
            notes: [
                { f: 293, d: 220, i: 'kanun' }, { f: 329, d: 220, i: 'kanun' }, { f: 349, d: 260, i: 'ud' },
                { f: 392, d: 260, i: 'ud' }, { f: 440, d: 300, i: 'kanun' }, { f: 466, d: 260, i: 'kanun' },
                { f: 523, d: 320, i: 'kanun' }, { f: 587, d: 420, i: 'ud' }, { f: 523, d: 220, i: 'ud' },
                { f: 466, d: 240, i: 'kanun' }, { f: 440, d: 300, i: 'kanun' }, { f: 392, d: 260, i: 'ud' },
                { f: 349, d: 640, i: 'ud' }
            ]
        },
        rumeli: {
            title: 'Rumeli Horonu',
            notes: [
                { f: 587, d: 180, i: 'zurna' }, { f: 659, d: 180, i: 'zurna' }, { f: 698, d: 220, i: 'zurna' },
                { f: 784, d: 260, i: 'zurna' }, { f: 698, d: 160, i: 'zurna' }, { f: 659, d: 180, i: 'zurna' },
                { f: 587, d: 300, i: 'zurna' }, { f: 523, d: 180, i: 'zurna' }, { f: 587, d: 180, i: 'zurna' },
                { f: 659, d: 360, i: 'zurna' }, { f: 784, d: 420, i: 'zurna' }
            ],
            drums: [0, 360, 720, 1080, 1440, 1800, 2160, 2520]
        },
        anadolu: {
            title: 'Anadolu Oyun Havası',
            notes: [
                { f: 392, d: 260, i: 'kaval' }, { f: 440, d: 220, i: 'kaval' }, { f: 494, d: 260, i: 'baglama' },
                { f: 523, d: 220, i: 'baglama' }, { f: 587, d: 300, i: 'kaval' }, { f: 523, d: 220, i: 'kaval' },
                { f: 494, d: 240, i: 'baglama' }, { f: 440, d: 220, i: 'baglama' }, { f: 392, d: 320, i: 'kaval' },
                { f: 440, d: 220, i: 'kaval' }, { f: 494, d: 260, i: 'baglama' }, { f: 587, d: 500, i: 'kaval' }
            ],
            drums: [0, 480, 960, 1440, 1920, 2400]
        },
        mevlevi: {
            title: 'Mevlevi Peşrevi',
            notes: [
                { f: 196, d: 700, i: 'ney' }, { f: 220, d: 520, i: 'ney' }, { f: 261, d: 620, i: 'ney' },
                { f: 293, d: 520, i: 'ney' }, { f: 349, d: 700, i: 'ney' }, { f: 329, d: 420, i: 'ney' },
                { f: 293, d: 620, i: 'ney' }, { f: 261, d: 420, i: 'ney' }, { f: 220, d: 900, i: 'ney' }
            ],
            drums: [0, 900, 1800, 2700]
        },
        cankkale: {
            title: 'Çanakkale Türküsü',
            notes: [
                { f: 392, d: 420, i: 'kemence' }, { f: 440, d: 300, i: 'kemence' }, { f: 494, d: 420, i: 'kemence' },
                { f: 523, d: 300, i: 'ud' }, { f: 494, d: 360, i: 'ud' }, { f: 440, d: 420, i: 'kemence' },
                { f: 392, d: 300, i: 'kemence' }, { f: 349, d: 380, i: 'ud' }, { f: 392, d: 360, i: 'ud' },
                { f: 440, d: 700, i: 'kemence' }
            ]
        },
        uzunince: {
            title: 'Uzun İnce Bir Yoldayım',
            notes: [
                { f: 220, d: 420, i: 'baglama' }, { f: 247, d: 260, i: 'baglama' }, { f: 262, d: 320, i: 'baglama' },
                { f: 294, d: 420, i: 'baglama' }, { f: 330, d: 300, i: 'kaval' }, { f: 349, d: 380, i: 'kaval' },
                { f: 392, d: 420, i: 'baglama' }, { f: 349, d: 300, i: 'baglama' }, { f: 330, d: 300, i: 'kaval' },
                { f: 294, d: 340, i: 'kaval' }, { f: 262, d: 360, i: 'baglama' }, { f: 220, d: 760, i: 'baglama' }
            ]
        }
    };

    let repertoireTimers = [];
    let activePieceBtn = null;
    const nowEl = document.getElementById('repertoireNow');

    const stopRepertoire = (silent = false) => {
        repertoireTimers.forEach(id => clearTimeout(id));
        repertoireTimers = [];
        if (activePieceBtn) activePieceBtn.classList.remove('playing');
        activePieceBtn = null;
        if (nowEl) {
            nowEl.textContent = silent ? 'Bir eser seçin; meşkhane kürsüsü sizin.' : 'İcra durduruldu. Sazlar kılıfına girdi.';
        }
    };

    const playInstrumentNote = (note) => {
        const s = window.turkishSound;
        if (!s) return;
        if (note.i === 'ney') s.playNey(note.f, Math.max(0.35, note.d / 1000 * 1.25));
        else if (note.i === 'kanun') s.playKanun(note.f, note.d / 1000);
        else if (note.i === 'baglama') s.playBaglama(note.f, note.d / 1000 * 1.1);
        else if (note.i === 'tambur') s.playTambur(note.f, note.d / 1000 * 1.25);
        else if (note.i === 'kemence') s.playKemence(note.f, note.d / 1000 * 1.3);
        else if (note.i === 'ud') s.playUd(note.f, note.d / 1000);
        else if (note.i === 'zurna') s.playZurna(note.f, note.d / 1000);
        else if (note.i === 'kaval') s.playKaval(note.f, note.d / 1000 * 1.1);
    };

    const playPiece = (id) => {
        const piece = repertoire[id];
        if (!piece) return;
        stopRepertoire(true);

        const btn = document.querySelector(`[data-piece="${id}"]`);
        if (btn) {
            activePieceBtn = btn;
            btn.classList.add('playing');
        }
        if (nowEl) nowEl.textContent = `🎶 ${piece.title} icra ediliyor…`;

        let elapsed = 0;
        piece.notes.forEach(note => {
            const timer = setTimeout(() => playInstrumentNote(note), elapsed);
            repertoireTimers.push(timer);
            elapsed += note.d;
        });

        if (piece.drums) {
            piece.drums.forEach((t, idx) => {
                const timer = setTimeout(() => {
                    if (!window.turkishSound) return;
                    if (idx % 2 === 0) window.turkishSound.playDavul(true);
                    else window.turkishSound.playDef();
                }, t);
                repertoireTimers.push(timer);
            });
        }

        const endTimer = setTimeout(() => {
            if (nowEl) nowEl.textContent = `✅ ${piece.title} tamamlandı. Bir başka eser seçebilirsiniz.`;
            if (activePieceBtn) activePieceBtn.classList.remove('playing');
            activePieceBtn = null;
        }, elapsed + 400);
        repertoireTimers.push(endTimer);
        showToast(`${piece.title} icra ediliyor...`, '🎼');
    };

    document.querySelectorAll('[data-piece]').forEach(btn => {
        btn.addEventListener('click', () => playPiece(btn.dataset.piece));
    });
    const btnStop = document.getElementById('btnStopRepertoire');
    if (btnStop) btnStop.addEventListener('click', () => stopRepertoire(false));
}

/* ========================================================
   8. GÖKTÜRKÇE ÇEVİRİCİ (ORHUN YAZITLARI ALFABESİ)
   ======================================================== */
function initGokturkTranslator() {
    const textInput = document.getElementById('gokturkInput');
    const textOutput = document.getElementById('gokturkOutput');
    const btnCopy = document.getElementById('btnCopyGokturk');
    const direction = document.getElementById('gokturkDirection');
    const inputLabel = document.getElementById('gokturkInputLabel');
    const outputLabel = document.getElementById('gokturkOutputLabel');

    const runicToLatin = {
        '𐰀': 'a/e', '𐰃': 'ı/i', '𐰆': 'o/u', '𐰇': 'ö/ü',
        '𐰉': 'b', '𐰋': 'b', '𐰑': 'd', '𐰓': 'd',
        '𐰍': 'g/ğ', '𐰏': 'g', '𐰴': 'k/h', '𐰚': 'k',
        '𐰞': 'l', '𐰠': 'l', '𐰣': 'n', '𐰤': 'n',
        '𐰺': 'r', '𐰼': 'r', '𐰽': 's', '𐰾': 's',
        '𐱃': 't', '𐱅': 't', '𐰲': 'ç/c', '𐰢': 'm',
        '𐰯': 'p/f', '𐱁': 'ş', '𐰔': 'z', '𐰖': 'y',
        '𐰘': 'y', '𐰶': 'k/h', '𐰸': 'ok/uk',
        '𐰵': 'ök/ük', '𐰰': 'k', '𐰨': 'nç', '𐰪': 'ny',
        '𐰡': 'lt/ld', '𐰦': 'nt/nd', '𐰭': 'ng'
    };

    function toRunes(str) {
        const historicalPhrase = (window.gokturkHistoricPhrases || []).find(item =>
            item.tr.toLocaleUpperCase('tr-TR') === str.trim().toLocaleUpperCase('tr-TR')
        );
        if (historicalPhrase) return historicalPhrase.gokturk;
        return str.toLocaleLowerCase('tr-TR').split(/(\s+)/u).map(word => {
            if (/^\s+$/u.test(word)) return ' : ';
            const isFront = /[eiöü]/u.test(word);
            const consonants = {
                b: isFront ? '𐰋' : '𐰉',
                d: isFront ? '𐰓' : '𐰑',
                g: isFront ? '𐰏' : '𐰍',
                ğ: isFront ? '𐰏' : '𐰍',
                k: isFront ? '𐰚' : '𐰴',
                l: isFront ? '𐰠' : '𐰞',
                n: isFront ? '𐰤' : '𐰣',
                r: isFront ? '𐰼' : '𐰺',
                s: isFront ? '𐰾' : '𐰽',
                t: isFront ? '𐱅' : '𐱃'
            };
            const letters = {
                a: '𐰀', e: '𐰀', ı: '𐰃', i: '𐰃',
                o: '𐰆', u: '𐰆', ö: '𐰇', ü: '𐰇',
                c: '𐰲', ç: '𐰲', f: '𐰯', h: isFront ? '𐰶' : '𐰴',
                j: '𐰘', m: '𐰢', p: '𐰯', ş: '𐱁',
                v: isFront ? '𐰋' : '𐰉', y: '𐰘', z: '𐰔'
            };
            return [...word].map(ch => consonants[ch] || letters[ch] || ch).join('');
        }).join('');
    }

    function toLatin(str) {
        const historicalPhrase = (window.gokturkHistoricPhrases || []).find(item =>
            item.gokturk.trim() === str.trim()
        );
        if (historicalPhrase) return historicalPhrase.tr;
        return [...str].map(ch => {
            if (ch === ':') return ' ';
            if (ch === '𐰼' || ch === '𐰶') return runicToLatin[ch];
            return runicToLatin[ch] || ch;
        }).join('').replace(/\s+/gu, ' ').trim();
    }

    function translate(str) {
        if (!str.trim()) return '';
        return direction && direction.value === 'to-latin' ? toLatin(str) : toRunes(str);
    }

    function render() {
        if (!textInput || !textOutput) return;
        const reverse = direction && direction.value === 'to-latin';
        textOutput.textContent = translate(textInput.value);
        textOutput.dir = reverse ? 'ltr' : 'rtl';
        if (inputLabel) inputLabel.textContent = reverse ? 'Göktürk tamgalarını yazın:' : 'Türkçe metin yazın:';
        if (outputLabel) outputLabel.textContent = reverse ? 'Yaklaşık Latin okuma:' : 'Tamga karşılığı (yaklaşık):';
    }

    if (textInput && textOutput) {
        textInput.addEventListener('input', render);
        if (direction) direction.addEventListener('change', render);
        render();
    }

    if (btnCopy && textOutput) {
        btnCopy.addEventListener('click', () => {
            const copy = navigator.clipboard && navigator.clipboard.writeText
                ? navigator.clipboard.writeText(textOutput.textContent)
                : Promise.reject(new Error('Clipboard API unavailable'));
            copy.then(() => {
                showToast('Metin panoya kopyalandı.', '📋');
                if (window.turkishSound) window.turkishSound.playClick();
            }).catch(() => showToast('Kopyalama desteklenmedi; metni seçip kopyalayabilirsiniz.', '📋'));
        });
    }

    document.querySelectorAll('.gokturk-preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const phrase = btn.dataset.phrase;
            if (textInput && phrase) {
                if (direction && direction.value === 'to-latin') direction.value = 'to-runes';
                textInput.value = phrase;
                render();
                if (window.turkishSound) window.turkishSound.playClick();
            }
        });
    });
}

/* ========================================================
   9. ANADOLU ATLASI & 7 BÖLGE REHBERİ
   ======================================================== */
function initAnatoliaAtlas() {
    const regionButtons = document.querySelectorAll('.region-btn');
    const regionTitle = document.getElementById('regionTitle');
    const regionDesc = document.getElementById('regionDesc');
    const regionSites = document.getElementById('regionSites');
    const regionFood = document.getElementById('regionFood');
    const regionCulture = document.getElementById('regionCulture');
    const regionStats = document.getElementById('regionStats');
    const regionRoutes = document.getElementById('regionRoutes');
    const regionCrafts = document.getElementById('regionCrafts');
    const regionMusic = document.getElementById('regionMusic');
    const regionFestivals = document.getElementById('regionFestivals');

    const regionsData = {
        marmara: {
            title: "Marmara Bölgesi — Tarihin ve Medeniyetlerin Başkenti",
            desc: "Üç imparatorluğa başkentlik yapmış payitaht İstanbul, Osmanlı'nın ilk başkentleri Bursa ve Edirne ile kadim bir tarih beşiği. Boğaz'ın iki yakasını birleştiren bu coğrafya, sanayi ve ticaretin de kalbidir.",
            stats: [{ label: 'Yüzölçümü', value: '67.000 km²' }, { label: 'Nüfus', value: '~24 milyon' }, { label: 'İl', value: '11' }, { label: 'İklim', value: 'Geçiş iklimi' }],
            sites: "Ayasofya-i Kebir Camii, Topkapı Sarayı, Selimiye Camii, Bursa Ulu Camii, Truva Antik Kenti, Galata Kulesi, Süleymaniye",
            food: "Bursa İskender Kebabı, Edirne Ciğeri, Çanakkale Peynir Helvası, Tekirdağ Köftesi, Kemalpaşa Tatlısı, İnegöl Köftesi",
            culture: "Kırkpınar Yağlı Güreşleri, İznik Çinisi, Karagöz & Hacivat Gölge Oyunu, Boğaz Kültürü, Yahya Kemal'in İstanbul'u",
            routes: "İstanbul Tarihi Yarımada → Bursa Cumalıkızık → Edirne Selimiye → Gelibolu Yarımadası → Bozcaada",
            crafts: "İznik Çinisi, Hereke Halısı, Edirnekâri, Sedefkârlık, Bursa ipek dokuma",
            music: "Karagöz & Hacivat, Kanto, Roman Havası, Boğaz Faslı, Mehter geleneği",
            festivals: "Kırkpınar Yağlı Güreşleri (Haziran), İstanbul Caz Festivali, Bursa Festivali, Bozcaada Bağbozumu"
        },
        ege: {
            title: "Ege Bölgesi — Zeytin Dalı ve Antik Bilgeliğin Diyarı",
            desc: "Efes'ten Hierapolis'e uzanan felsefe ve mimarlık mirası, masmavi koylar ve bin yıllık asırlık zeytin ağaçları. Ege, aynı zamanda zeytinyağı, bağ ve efe kültürünün toprağıdır.",
            stats: [{ label: 'Yüzölçümü', value: '85.000 km²' }, { label: 'Nüfus', value: '~10,5 milyon' }, { label: 'İl', value: '8' }, { label: 'İklim', value: 'Akdeniz iklimi' }],
            sites: "Efes Antik Kenti, Pamukkale Travertenleri, Meryem Ana Evi, Bergama Akropolü, Şirince, Sardes, Assos, Aphrodisias",
            food: "İzmir Boyozu & Kumrusu, Ege Ot Kavurmaları, Aydın İnciri, Zeytinyağlı Enginar, Çökertme Kebabı, Tire Köftesi",
            culture: "Zeybek & Efe Kültürü, Çömlekçilik (Menemen), Yörük Şenlikleri, Bağbozumu, Ege türküleri",
            routes: "İzmir Kemeraltı → Efes → Şirince → Pamukkale → Bergama → Assos → Alaçatı",
            crafts: "Menemen çömleği, Tire işi, Kula halısı, zeytinyağı sabunu, Bergama dokuma",
            music: "Zeybek, Efe oyunu, semah, Ege türküleri, İzmir kanto geleneği",
            festivals: "Alaçatı Ot Festivali (Nisan), Bergama Kermesi, İzmir Enternasyonal Fuarı, Pamukkale Festivali"
        },
        akdeniz: {
            title: "Akdeniz Bölgesi — Torosların Heybeti ve Turkuaz Sahiller",
            desc: "Likya Yolu, Aspendos Tiyatrosu ve Toros Dağları'nın yayla kültürüyle harmanlanan narenciye ve turkuaz diyarı. Antakya'nın mutfağı, Adana'nın kebap kültürü ve Maraş'ın dondurması bu bölgenin imzasıdır.",
            stats: [{ label: 'Yüzölçümü', value: '122.000 km²' }, { label: 'Nüfus', value: '~10,8 milyon' }, { label: 'İl', value: '8' }, { label: 'İklim', value: 'Akdeniz iklimi' }],
            sites: "Aspendos Antik Tiyatrosu, Alanya Kalesi, Cennet-Cehennem Obrukları, Patara Meclis Binası, Olympos, Antakya Mozaik Müzesi, Anemurium",
            food: "Antakya Künefesi & Tepsi Kebabı, Adana Kebabı, Mersin Tantunisi, Maraş Dondurması, Piyaz, Hatay sürkü",
            culture: "Yörük Yaylacılığı, Taş İşçiliği, Toros Türkmen Ağıtları, Narenciye Hasadı, Likya yürüyüş kültürü",
            routes: "Antalya Kaleiçi → Aspendos → Olympos → Patara → Kaş → Antakya → Adana",
            crafts: "Antakya ipeği, Silifke el dokuması, Burdur bakır işi, Hatay mozaik, Alanya kestane sepeti",
            music: "Teke zortlatması, Antalya türküleri, Hatay gazelleri, Toros ağıtları, Adana şarkıları",
            festivals: "Antalya Altın Portakal Film Festivali, Adana Portakal Çiçeği, Hatay Medeniyetler Korosu, Kaş Festivali"
        },
        icanadolu: {
            title: "İç Anadolu Bölgesi — Bozkırın Kalbi ve Selçuklu Payitahtı",
            desc: "Mevlana'nın hoşgörü çağrısı, peri bacalarıyla Kapadokya, Çatalhöyük ve Cumhuriyet'in temellerinin atıldığı Ankara. Bozkır, buğday ve bozlak; İç Anadolu'nun üç kelimelik hikâyesidir.",
            stats: [{ label: 'Yüzölçümü', value: '151.000 km²' }, { label: 'Nüfus', value: '~13 milyon' }, { label: 'İl', value: '13' }, { label: 'İklim', value: 'Karasal iklim' }],
            sites: "Anıtkabir, Mevlana Türbesi, Kapadokya & Göreme, Çatalhöyük, Divriği Ulu Camii, Hacı Bektaş Dergahı, Ahlat Selçuklu Mezarlığı",
            food: "Kayseri Mantısı & Pastırması, Konya Etliekmeği, Ankara Tavası, Sivrihisar Sarması, Yozgat Testi Kebabı, Kırşehir Çullama",
            culture: "Sema Törenleri (Mevlevi), Aşık Veysel Geleneği, Seğmen Alayı, Çini ve Kilim Dokuma, bozlak",
            routes: "Ankara Anıtkabir → Konya Mevlana → Kapadokya → Kayseri → Sivas → Divriği",
            crafts: "Kırşehir onyx taşı, Konya çinisi, Sivas halısı, Kayseri bakırcılığı, Yozgat kilimi",
            music: "Mevlevi sema musikisi, bozlak, aşık geleneği, seğmen havası, Konya türküleri",
            festivals: "Mevlana Şeb-i Arus (Aralık), Hacı Bektaş Anma, Kayseri Pastırma Festivali, Kapadokya Balon Şenliği"
        },
        karadeniz: {
            title: "Karadeniz Bölgesi — Zümrüt Yaylalar ve Dalgaların Şarkısı",
            desc: "Kaçkar Dağları, yeşilin binbir tonu, horon ritmi ve sarp kayalıklara kurulu asırlık Sümela Manastırı. Çay, fındık ve yayla göçleri bölgenin hayat damarıdır.",
            stats: [{ label: 'Yüzölçümü', value: '143.000 km²' }, { label: 'Nüfus', value: '~8 milyon' }, { label: 'İl', value: '18' }, { label: 'İklim', value: 'Karadeniz iklimi' }],
            sites: "Sümela Manastırı, Safranbolu Evleri, Ayder Yaylası, Bandırma Vapuru (Samsun), Amasya Kral Kaya Mezarları, Uzungöl, Zilkale",
            food: "Karadeniz Pidesi, Muhlama / Kuymak, Hamsi Buğulama, Akçaabat Köftesi, Laz Böreği, Karalahana Sarması, fındık",
            culture: "Kemençe & Tulum Eşliğinde Horon, Yayla Göçleri, Ahşap Konak Mimarisi, Çay & Fındık İmecesi, atma türkü",
            routes: "Samsun → Amasya → Safranbolu → Kastamonu → Trabzon → Ayder → Sümela → Uzungöl",
            crafts: "Trabzon telkârisi, keşan dokuma, bakırcılık, ahşap oymacılığı, sepet örücülüğü",
            music: "Horon, kemençe, tulum, atma türkü, Karadeniz ağıtları",
            festivals: "Ayder Yayla Şenliği (Haziran), Kadırga Yayla Festivali, Altın Fındık, Sümela Ayinleri"
        },
        dogu: {
            title: "Doğu Anadolu Bölgesi — Anadolu'nun Zirvesi ve İpek Yolu Kapısı",
            desc: "Ani Harabeleri, İshak Paşa Sarayı ve heybetli Ağrı Dağı ile bin yıldır Anadolu'ya açılan ulu kapımız. Sert kışlar, yayla kültürü ve aşıklık geleneği bölgenin karakteridir.",
            stats: [{ label: 'Yüzölçümü', value: '165.000 km²' }, { label: 'Nüfus', value: '~6 milyon' }, { label: 'İl', value: '14' }, { label: 'İklim', value: 'Sert karasal' }],
            sites: "İshak Paşa Sarayı, Ani Ören Yeri, Akdamar Kilisesi, Erzurum Çifte Minareli Medrese, Nemrut Krater Gölü, Harput Kalesi, Ağrı Dağı",
            food: "Erzurum Cağ Kebabı, Van Kahvaltısı & Otlu Peynir, Kars Kaşarı & Kaz Eti, Malatya Kayısısı, Ağrı Abdigör, Kemah Tuzlaması",
            culture: "Dadaş Barı Oyunu, Aşıklık ve Atışma Geleneği, Kars Gravyeri Üretimi, Cirit Sporu, dengbêj",
            routes: "Erzurum → Kars Ani → Van Akdamar → Ağrı Dağı → Malatya → Elazığ Harput",
            crafts: "Erzurum oltu taşı, Van kilimi, Kars halısı, Malatya bakırcılığı, Ağrı dokuma",
            music: "Dadaş barı, aşık atışması, dengbêj, cirit havası, Erzurum türküleri",
            festivals: "Erzurum Kış Festivali (Ocak), Van Akdamar Ayini, Kars Kaşar Festivali, Malatya Kayısı Festivali"
        },
        guneydogu: {
            title: "Güneydoğu Anadolu Bölgesi — Medeniyetin Sıfır Noktası ve Mezopotamya",
            desc: "Tarihin yeniden yazıldığı Göbeklitepe, Nemrut Dağı'nın dev heykelleri ve kadim sarı kalker taş konaklar. Fırat boyunca uzanan bu topraklar, mutfağı ve sıra geceleriyle ünlüdür.",
            stats: [{ label: 'Yüzölçümü', value: '76.000 km²' }, { label: 'Nüfus', value: '~8,5 milyon' }, { label: 'İl', value: '9' }, { label: 'İklim', value: 'Karasal / Akdeniz' }],
            sites: "Göbeklitepe, Nemrut Dağı Tümülüsü, Mardin Taş Konakları & Deyrulzafaran, Halfeti, Balıklıgöl, Zeugma, Diyarbakır Surları",
            food: "Gaziantep Baklavası & Ali Nazik, Urfa Sıra Gecesi Çiğ Köftesi, Diyarbakır Ciğeri, Mardin İrok & Semsek, Antep fıstığı",
            culture: "Sıra Geceleri, Bakırcılık & Sedefkarlık Sanatı, Dengbêjlik Geleneği, Halay Ritmi, iğne oyası",
            routes: "Gaziantep → Halfeti → Göbeklitepe → Mardin → Deyrulzafaran → Diyarbakır → Nemrut Dağı",
            crafts: "Gaziantep bakırcılığı, Mardin telkârisi, Urfa iğne oyası, Diyarbakır dokuması, Antep fıstığı işleme",
            music: "Sıra gecesi, dengbêj, halay, gazel, Urfa türküleri",
            festivals: "Gaziantep Gastronomi Festivali, Göbeklitepe Şenlikleri, Mardin Kültür Sanat Festivali, Diyarbakır Sur Festivali"
        }
    };

    regionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const regKey = btn.dataset.region;
            regionButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const data = regionsData[regKey];
            if (data) {
                if (regionTitle) regionTitle.textContent = data.title;
                if (regionDesc) regionDesc.textContent = data.desc;
                if (regionSites) regionSites.textContent = data.sites;
                if (regionFood) regionFood.textContent = data.food;
                if (regionCulture) regionCulture.textContent = data.culture;
                if (regionRoutes) regionRoutes.textContent = data.routes;
                if (regionCrafts) regionCrafts.textContent = data.crafts;
                if (regionMusic) regionMusic.textContent = data.music;
                if (regionFestivals) regionFestivals.textContent = data.festivals;
                if (regionStats && data.stats) {
                    regionStats.innerHTML = data.stats
                        .map(stat => `<span class="region-stat-chip"><strong>${stat.label}</strong> ${stat.value}</span>`)
                        .join('');
                }
            }

            if (window.turkishSound) window.turkishSound.playClick();
        });
    });
}

/* ========================================================
   10. TÜRK HÜKÜMDARLARI — GELİŞMİŞ SİSTEM (50+ Hükümdar)
   ======================================================== */
function initRulers() {
    const fallbackRulers = [
        // ─── HUN İMPARATORLUĞU ───────────────────────────────────
        {
            id: 1, era: 'hun', name: 'Mete Han', dates: 'MÖ 209 – MÖ 174',
            dynasty: 'ASYA HUN İMPARATORLUĞU',
            icon: '🐎', sortYear: -209,
            quote: '"Toprak devletin temelidir, onu kimse veremez."',
            bio: 'Asya Hun İmparatorluğu\'nun kurucusu ve en büyük hakanı. Onlu askeri sistemi (Tümen) kurarak Türk kara kuvvetlerinin temellerini attı. Çin\'i her yönden kuşatarak büyük siyasi kazanımlar elde etti.',
            achievements: ['⚔️ Onluk askeri sistemin (Tümen) kurucusu', '🗺️ Hunları üç milyonu aşkın km²ye hükmeden imparatorluğa dönüştürdü', '📜 Çin ile ilk eşit hükümlü anlaşmaları imzalattı', '🏹 İlk Türk devlet teşkilatını kurdu'],
            tags: ['Askeri Deha', 'İmparatorluk Kurucusu', 'Stratejist']
        },
        {
            id: 2, era: 'hun', name: 'Attila', dates: '434 – 453',
            dynasty: 'AVRUPA HUN İMPARATORLUĞU',
            icon: '⚡', sortYear: 434,
            quote: '"Ben, Tanrı\'nın yeryüzündeki kılıcıyım."',
            bio: 'Avrupa Hun İmparatorluğu\'nun en güçlü hakanı. "Tanrı\'nın kılıcı" olarak tanınan Attila, Batı ve Doğu Roma imparatorluklarını defalarca yenerek Avrupa\'yı titretti.',
            achievements: ['⚔️ Roma İmparatorluğu\'nu iki kez vergi ödemeye mecbur bıraktı', '🗺️ Ren\'den Hazar\'a uzanan dev bir imparatorluk kurdu', '🏰 Galya, İtalya ve Balkan seferlerinde büyük başarılar elde etti', '📜 "Tanrının Kılıcı" unvanıyla Orta Çağ Avrupasını şekillendirdi'],
            tags: ['Batı Fatihi', 'Roma Korkusu', 'Büyük Han']
        },
        {
            id: 3, era: 'hun', name: 'Balamir Han', dates: '360 – 376',
            dynasty: 'AVRUPA HUN İMPARATORLUĞU',
            icon: '🔱', sortYear: 360,
            quote: '"Bozkırın sesi, kılıcın dilidir."',
            bio: 'Hunları Volga\'dan geçirerek Avrupa\'ya sokan ilk Hun hakanı. Ostrogotlar ve Vizigotları yenerek Kavimler Göçü\'nü başlattı; bu süreç Roma\'nın çöküşünü hızlandırdı.',
            achievements: ['🌍 Kavimler Göçünü başlattı (375)', '⚔️ Ostrogotları ve Vizigotları mağlup etti', '🗺️ Hunların Avrupa\'ya yerleşmesini sağladı'],
            tags: ['Kavimler Göçü', 'Avrupa Fatihi', 'Stratejist']
        },
        // ─── GÖKTÜRK KAGANLIĞI ────────────────────────────────────
        {
            id: 4, era: 'gokturk', name: 'Bumin Kağan', dates: '552 – 552',
            dynasty: 'GÖKTÜRK KAGANLIĞI (I. Türk Devleti)',
            icon: '🌙', sortYear: 552,
            quote: '"Türk adını dünyaya ben tanıttım."',
            bio: '"Türk" adını taşıyan ilk siyasi devletin — Göktürk Kağanlığı\'nın — kurucusu. Avar Kağanlığı\'nı yıkarak Altay\'dan Karadeniz\'e uzanan dev devleti kurdu.',
            achievements: ['📜 "Türk" adını taşıyan ilk bağımsız devletin kurucusu', '⚔️ Avar Kağanlığı\'nı 552\'de yıktı', '🗺️ Altay\'dan Karadeniz\'e uzanan imparatorluk kurdu'],
            tags: ['Türk Devletinin Kurucusu', 'Kağan', 'Göktürk']
        },
        {
            id: 5, era: 'gokturk', name: 'İstemi Kağan', dates: '552 – 576',
            dynasty: 'GÖKTÜRK KAGANLIĞI (Batı Kolu)',
            icon: '🌟', sortYear: 553,
            quote: '"İpek Yolu\'nu kaybetmek, cihana gözü kapatmaktır."',
            bio: 'Göktürk Kağanlığı\'nın Batı kolunu yöneten kudretli yabgu. İpek Yolu\'nun kontrolünü ele geçirerek Bizans ile diplomatik ilişkiler kurdu; Türk tarihindeki ilk büyük Batı açılımını gerçekleştirdi.',
            achievements: ['🛣️ İpek Yolu\'nu Türk kontrolüne aldı', '🤝 Bizans ile ilk Türk-Bizans diplomatik ittifakını kurdu', '⚔️ Eftalitleri Sasanilerle ortak hareketle yıktı'],
            tags: ['Diplomat', 'İpek Yolu', 'Batı Türkleri']
        },
        {
            id: 6, era: 'gokturk', name: 'Bilge Kağan', dates: '716 – 734',
            dynasty: 'II. GÖKTÜRK KAGANLIĞI (Kutluk)',
            icon: '📜', sortYear: 716,
            quote: '"Ey Türk! Üstte mavi gök çökmedikçe, altta yağız yer delinmedikçe senin ilini ve töreni kim bozabilir?"',
            bio: 'II. Göktürk Kağanlığı\'nın en güçlü hükümdarı. Devleti yıkılmaktan kurtarıp yeniden güçlendirdi. Orhun Abideleri\'ni diktirerek Türk tarihine kalıcı bir miras bıraktı.',
            achievements: ['📖 Orhun Abideleri\'ni diktirdi (732–735)', '🏹 Çin akınlarını püskürterek bağımsızlığı korudu', '📜 Türk adının geçtiği en eski yazılı belgelerin sahibi', '⚖️ Toygun ve Bilge unvanlarıyla siyasi bilgeliği simgeledi'],
            tags: ['Orhun Abideleri', 'Devlet Adamı', 'Bilge']
        },
        {
            id: 7, era: 'gokturk', name: 'Tonyukuk', dates: '646 – 731',
            dynasty: 'II. GÖKTÜRK KAGANLIĞI',
            icon: '🦉', sortYear: 680,
            quote: '"Bilgisiz kağan, kılıçsız savaşçıdan tehlikelidir."',
            bio: 'Göktürk Kağanlığı\'nın efsanevi devlet adamı ve komutanı. Kutluk Kağan ve Bilge Kağan dönemlerinde baş vezir olarak Türk devletini ayakta tutan strateji dehası.',
            achievements: ['🧠 II. Göktürk Kağanlığı\'nın yeniden kuruluşunun mimarı', '⚔️ 40 yıl boyunca Türk ordusunu komuta etti', '📜 Tonyukuk Yazıtları\'nı diktirerek tarihe geçti'],
            tags: ['Vezir', 'Strateji Dehası', 'Orhun']
        },
        // ─── UYGUR DEVLETLERİ ─────────────────────────────────────
        {
            id: 8, era: 'uygur', name: 'Kutlug Bilge Kül Kağan', dates: '744 – 747',
            dynasty: 'UYGUR KAGANLIĞI',
            icon: '📚', sortYear: 744,
            quote: '"İlim, kılıçtan keskin bir silahtır."',
            bio: 'Uygur Kağanlığı\'nın kurucusu. Göktürkleri yıkarak Orta Asya\'nın hâkimiyetini Uygurlara devretti. Yerleşik kent kültürünü ve ticareti ön plana çıkardı.',
            achievements: ['🏛️ Uygur Kağanlığı\'nı kurdu (744)', '📜 Uygur alfabesinin gelişimini destekledi', '🏙️ Ordu-Balık (Karabalgasun) şehrini başkent yaptı'],
            tags: ['Kağanlık Kurucusu', 'Kültür', 'Uygur']
        },
        {
            id: 9, era: 'uygur', name: 'Börü Kağan (Moyanchur)', dates: '747 – 759',
            dynasty: 'UYGUR KAGANLIĞI',
            icon: '🌾', sortYear: 747,
            quote: '"Güçlü bir devlet, güçlü bir halktan doğar."',
            bio: 'Uygur Kağanlığı\'nı genişleten kudretli kağan. Tang Hanedanı ile ittifak kurarak Çin\'in iç savaşlarını kontrol altına aldı; Maniheizmi devlet dini ilan etti.',
            achievements: ['🤝 Tang Çin\'i ile stratejik ittifak kurdu', '☯️ Maniheizmi kabul ederek Orta Asya\'da kültürel dönüşümü başlattı', '⚔️ Kırgızları yenerek hakimiyeti pekiştirdi'],
            tags: ['Maniheizm', 'Çin İttifakı', 'Genişleme']
        },
        // ─── KARAHANLILAR ─────────────────────────────────────────
        {
            id: 10, era: 'karahanli', name: 'Satuk Buğra Han', dates: '920 – 955',
            dynasty: 'KARAHANLILAR',
            icon: '☪️', sortYear: 920,
            quote: '"İslam, milletimizin kalkan ve kılıcıdır."',
            bio: 'İlk Müslüman Türk hükümdarı. İslamiyeti kabul eden ve Karahanlı Devleti\'ni Müslüman Türk dünyasının öncüsü yapan kudretli han.',
            achievements: ['☪️ İlk Müslüman Türk hükümdarı oldu', '🏰 İslamiyetin Orta Asya Türkleri arasında yayılmasını sağladı', '🤝 Abbasi Halifeliği ile ilişkileri güçlendirdi'],
            tags: ['İlk Müslüman Türk', 'İslam', 'Karahanlı']
        },
        {
            id: 11, era: 'karahanli', name: 'Yusuf Has Hacib', dates: '1019 – 1085',
            dynasty: 'KARAHANLILAR',
            icon: '📖', sortYear: 1069,
            quote: '"Bilgi olmayan yerde hükümet olmaz."',
            bio: 'Kaşgar Karahanlı sarayında yaşayan büyük Türk düşünürü ve yazar. "Kutadgu Bilig" adlı eseriyle devlet yönetimi felsefesinin temellerini attı.',
            achievements: ['📚 Kutadgu Bilig\'i kaleme aldı (1069)', '🧠 Türk siyaset felsefesinin kurucusu sayılır', '📜 İlk büyük Türkçe edebi eserin yazarı'],
            tags: ['Düşünür', 'Yazar', 'Kutadgu Bilig']
        },
        {
            id: 12, era: 'karahanli', name: 'Kaşgarlı Mahmud', dates: '1008 – 1102',
            dynasty: 'KARAHANLILAR',
            icon: '🗺️', sortYear: 1072,
            quote: '"Türkçe öğren; zira Türk\'ün egemenliği uzun sürecektir."',
            bio: 'Türk dilinin ve coğrafyasının en büyük ansiklopedisti. "Divanü Lügati\'t-Türk" adlı dev eserinde Türk boylarının dillerini, coğrafyasını ve kültürünü derledi.',
            achievements: ['📚 Divanü Lügati\'t-Türk\'ü kaleme aldı (1072–1074)', '🗺️ Dünyanın bilinen en eski Türk haritasını çizdi', '🌍 11 Türk lehçesini kayıt altına aldı'],
            tags: ['Dilbilimci', 'Coğrafyacı', 'Divan-ı Lügat']
        },
        // ─── GAZNELİLER ───────────────────────────────────────────
        {
            id: 13, era: 'gazneli', name: 'Sultan Mahmud Gaznevî', dates: '998 – 1030',
            dynasty: 'GAZNELİ DEVLET',
            icon: '💎', sortYear: 998,
            quote: '"Hindistan\'a 17 kez girdim, 17 kez zaferle döndüm."',
            bio: 'Gazneli Devleti\'nin en büyük sultanı. Hindistan\'a 17 sefer düzenleyerek Türk fethinin öncüsü oldu. Birûnî ve Firdevsî gibi bilim insanlarını sarayında himaye etti.',
            achievements: ['⚔️ Hindistan\'a 17 büyük sefer düzenledi', '📚 Birûnî ve Firdevsî\'yi himaye etti', '🏛️ Gazne\'yi dünya kültür merkezine dönüştürdü', '💎 En büyük Müslüman Türk sultanları arasına girdi'],
            tags: ['Hindistan Seferleri', 'Kültür Hamisi', 'Sultan']
        },
        // ─── BÜYÜK SELÇUKLU ───────────────────────────────────────
        {
            id: 14, era: 'selcuklu', name: 'Tuğrul Bey', dates: '1037 – 1063',
            dynasty: 'BÜYÜK SELÇUKLU İMPARATORLUĞU',
            icon: '🦅', sortYear: 1037,
            quote: '"Adaleti olmayan bir hükümdar, rüzgarsız bir değirmene benzer."',
            bio: 'Büyük Selçuklu İmparatorluğu\'nun kurucusu. Gaznelileri Dandanakan\'da yenerek Selçuklu devletini kurdu ve Abbasi halifesini Büveyhî baskısından kurtararak "Doğu ve Batı\'nın Sultanı" unvanını aldı.',
            achievements: ['🏰 Büyük Selçuklu Devleti\'ni kurdu (1037)', '⚔️ Dandanakan Savaşı\'nda Gaznelileri yendi (1040)', '🤝 Bağdat\'ı Büveyhilerden kurtararak "Sultan" unvanını aldı', '🕌 Sünni İslam\'ın hâmisi oldu'],
            tags: ['Devlet Kurucusu', 'Sultan', 'Selçuklu']
        },
        {
            id: 15, era: 'selcuklu', name: 'Sultan Alparslan', dates: '1063 – 1072',
            dynasty: 'BÜYÜK SELÇUKLU İMPARATORLUĞU',
            icon: '⚔️', sortYear: 1063,
            quote: '"Bütün Müslümanların dua ettiği bu kutlu saatte düşmanın üzerine atılacağım."',
            bio: 'Büyük Selçuklu\'nun en parlak hakanı. 1071\'deki Malazgirt Zaferi ile Türklere Anadolu\'nun kapılarını ebediyen açtı. İslam dünyasının kurtarıcısı olarak tarihe geçti.',
            achievements: ['⚔️ Malazgirt Zaferi ile Anadolu\'nun kapılarını açtı (1071)', '🗺️ Bizans imparatoru Romanos IV\'ü esir aldı', '🏛️ Vezir Nizamülmülk ile büyük medreseler kurdu', '☮️ Esir imparatora karşı yüksek ahlak göstererek dünyayı hayrete düşürdü'],
            tags: ['Malazgirt', 'Anadolu Fatihi', 'Sultan']
        },
        {
            id: 16, era: 'selcuklu', name: 'Sultan Melikşah', dates: '1072 – 1092',
            dynasty: 'BÜYÜK SELÇUKLU İMPARATORLUĞU',
            icon: '👑', sortYear: 1072,
            quote: '"Adalet mülkün temelidir."',
            bio: 'Büyük Selçuklu\'nun en geniş sınırlara ulaştığı döneminin sultanı. Vezir Nizamülmülk ile birlikte "Nizamiye" medreselerini kurarak İslam eğitim sistemini dönüştürdü.',
            achievements: ['📏 Selçuklu sınırlarını en geniş haline getirdi', '🏫 Bağdat Nizamiye Medresesi\'ni kurdu', '📅 Omar Hayyam ile birlikte Celali takvimini hazırlattı', '🏗️ Büyük imar faaliyetleri yürüttü'],
            tags: ['Zirve Dönemi', 'Nizamiye', 'Büyük Selçuklu']
        },
        {
            id: 17, era: 'selcuklu', name: 'Nizamülmülk', dates: '1018 – 1092',
            dynasty: 'BÜYÜK SELÇUKLU VEZİRİ',
            icon: '🏫', sortYear: 1063,
            quote: '"İlim sahibi olmak, mülke sahip olmaktan üstündür."',
            bio: 'Büyük Selçuklu\'nun en büyük veziri ve devlet adamı. "Siyasetname" eseriyle Türk-İslam devlet felsefesini yazdı. Nizamiye medreseleriyle İslam dünyasının eğitim altyapısını kurdu.',
            achievements: ['🏫 Nizamiye Medreselerini kurdu (Bağdat, Nişabur, İsfahan)', '📚 Siyasetname\'yi kaleme aldı', '⚖️ İkta sistemiyle idari-mali reformlar yaptı', '🧠 İmam Gazali\'yi Bağdat Nizamiye\'ye davet etti'],
            tags: ['Vezir', 'Eğitim', 'Siyasetname']
        },
        // ─── ANADOLU SELÇUKLU ─────────────────────────────────────
        {
            id: 18, era: 'anadoluselcuklu', name: 'Kutalmışoğlu Süleyman Şah', dates: '1077 – 1086',
            dynasty: 'ANADOLU SELÇUKLU DEVLETİ',
            icon: '🕌', sortYear: 1077,
            quote: '"Anadolu\'yu Türk yurdu yapacağım."',
            bio: 'Anadolu Selçuklu Devleti\'nin kurucusu. İznik\'i başkent yaparak Anadolu\'nun Türkleşmesinin temellerini attı.',
            achievements: ['🏰 Anadolu Selçuklu Devleti\'ni kurdu (1077)', '🏛️ İznik\'i başkent yaparak devleti örgütledi', '🗺️ Anadolu\'nun Türkleşmesinde öncü rol oynadı'],
            tags: ['Devlet Kurucusu', 'Anadolu', 'Selçuklu']
        },
        {
            id: 19, era: 'anadoluselcuklu', name: 'Sultan I. Kılıçarslan', dates: '1092 – 1107',
            dynasty: 'ANADOLU SELÇUKLU DEVLETİ',
            icon: '⚔️', sortYear: 1092,
            quote: '"Haçlılar geçemez; bu toprak bizimdir."',
            bio: 'Haçlı Seferlerine karşı savaşan ilk Anadolu sultanı. I. Haçlı Seferi\'ni Dorylaion\'da durdurmaya çalıştı.',
            achievements: ['⚔️ I. Haçlı Seferi\'ne karşı savaştı', '🏙️ Konya\'yı başkent yaptı', '🗺️ Doğu Anadolu\'ya doğru toprakları genişletti'],
            tags: ['Haçlı Karşıtı', 'Konya', 'Sultan']
        },
        {
            id: 20, era: 'anadoluselcuklu', name: 'Sultan I. Alaeddin Keykubad', dates: '1220 – 1237',
            dynasty: 'ANADOLU SELÇUKLU DEVLETİ',
            icon: '✨', sortYear: 1220,
            quote: '"Güzellik, gönlü zengin olanlara aittir."',
            bio: 'Anadolu Selçuklu\'nun altın çağının sultanı. Alanya ve Sinop fatihi, Karatay ve İnce Minareli medreselerin banisi. Sanatı ve ticareti zirveye taşıdı.',
            achievements: ['🏰 Alanya\'yı ve Sinop\'u fethetti', '🏫 Karatay Medresesi\'ni kurdu', '🛣️ Anadolu\'da kervansaray ağını geliştirdi', '🎨 Selçuklu sanatı ve mimarisini altın çağına taşıdı'],
            tags: ['Altın Çağ', 'Mimar', 'Alanya Fatihi']
        },
        // ─── ANADOLU BEYLİKLERİ ──────────────────────────────────
        {
            id: 21, era: 'beylikler', name: 'Osman Gazi', dates: '1299 – 1326',
            dynasty: 'OSMANLI BEYLİĞİ (Kurucu)',
            icon: '🗡️', sortYear: 1299,
            quote: '"Hak\'tan korkan halktan korkmaz."',
            bio: 'Osmanlı Devleti\'nin kurucusu. Küçük bir beylik olarak başladığı devleti, döneminin en güçlü yapılarından birine dönüştürecek temelleri attı. Şeyh Edebali\'nin damadı.',
            achievements: ['🏰 Osmanlı Devleti\'ni kurdu (1299)', '⚔️ Koyunhisar Savaşı\'nda Bizans\'ı yendi (1302)', '📜 Şeyh Edebali\'nin öğütleriyle adil bir düzen kurdu', '🌱 Osmanlı hanedanının kurucusu oldu'],
            tags: ['Devlet Kurucusu', 'Osmanlı', 'Kurucu']
        },
        {
            id: 22, era: 'beylikler', name: 'Germiyanoğlu I. Yakup Bey', dates: '1299 – 1340',
            dynasty: 'GERMİYAN BEYLİĞİ',
            icon: '🏺', sortYear: 1299,
            quote: '"Kuvvet adaletten gelir."',
            bio: 'Kütahya merkezli Germiyan Beyliği\'nin kurucusu. Kültür ve sanat alanında önemli eserler bıraktı.',
            achievements: ['🏛️ Germiyân Beyliği\'ni kurdu', '🏙️ Kütahya\'yı kültür merkezi yaptı', '📜 Türkçe şiir ve edebiyatı destekledi'],
            tags: ['Beylik', 'Kültür', 'Germiyân']
        },
        {
            id: 23, era: 'beylikler', name: 'Karamanoğlu Mehmed Bey', dates: '1256 – 1277',
            dynasty: 'KARAMANOĞULLARI BEYLİĞİ',
            icon: '📜', sortYear: 1256,
            quote: '"Bundan sonra divan\'da, dergah\'ta, barg\'ahta Türkçeden başka dil kullanılmaya."',
            bio: 'Türkçeyi resmi devlet dili ilan eden tarihi karar almasıyla tanınan Karamanoğlu hükümdarı. Bu ferman, Türk dil tarihinin en önemli belgelerinden biridir.',
            achievements: ['📜 Türkçeyi resmi devlet dili ilan etti (1277)', '⚔️ Selçuklu iktidarına karşı başarılı ayaklanmalar yürüttü', '🗺️ Karamanoğulları\'nı güçlü bir beyliğe dönüştürdü'],
            tags: ['Türkçe', 'Dil Fermanı', 'Karamanoğlu']
        },
        // ─── OSMANLI İMPARATORLUĞU ────────────────────────────────
        {
            id: 24, era: 'osmanli', name: 'Orhan Gazi', dates: '1326 – 1362',
            dynasty: 'OSMANLI SULTANLARI',
            icon: '⚡', sortYear: 1326,
            quote: '"Bir devletin gücü, ordusunun disipliniyle ölçülür."',
            bio: 'Osmanlı Devleti\'ni gerçek anlamda kurumsallaştıran sultan. Yeniçeri ocağının temellerini attı; Bursa, İzmit ve Üsküdar\'ı alarak Avrupa\'ya geçişin kapısını açtı.',
            achievements: ['🏙️ Bursa\'yı başkent yaptı (1326)', '⚔️ İzmit ve İznik\'i fethetti', '🪖 Yeniçeri Ocağı\'nın temellerini attı', '🌉 Avrupa\'ya ilk geçiş adımını attı'],
            tags: ['Kurumsallaşma', 'Bursa', 'Yeniçeri']
        },
        {
            id: 25, era: 'osmanli', name: 'I. Murad (Hüdavendigâr)', dates: '1362 – 1389',
            dynasty: 'OSMANLI SULTANLARI',
            icon: '🏹', sortYear: 1362,
            quote: '"Savaş alanından kaçmak hâinliktir; düşmanla yüz yüze ölmek şereftir."',
            bio: '"Sultan" unvanını ilk kez kullanan Osmanlı hükümdarı. Edirne\'yi fethederek Avrupa\'ya kapı araladı. Kosova Meydan Muharebesi\'nde şehit düşerek tarihe efsane bir hükümdar olarak geçti.',
            achievements: ['👑 "Sultan" unvanını ilk kullanan Osmanlı', '🏙️ Edirne\'yi fethetti ve başkent yaptı', '⚔️ Kosova Savaşı\'nda Balkan haçlı ittifakını yıktı (1389)', '🪖 Devşirme sistemini geliştirdi'],
            tags: ['Sultan Unvanı', 'Edirne', 'Kosova Şehidi']
        },
        {
            id: 26, era: 'osmanli', name: 'I. Bayezid (Yıldırım)', dates: '1389 – 1402',
            dynasty: 'OSMANLI SULTANLARI',
            icon: '⚡', sortYear: 1389,
            quote: '"Şimşek gibi çarparım, yıldırım gibi geçerim."',
            bio: '"Yıldırım" lakabıyla tarihe geçen hükümdar. Niğbolu\'da birleşik Haçlı ordusunu yendi; ancak Timur\'a Ankara Savaşı\'nda yenilerek tarihte esir düşen üçüncü Osmanlı sultanı oldu.',
            achievements: ['⚔️ Niğbolu Zaferi\'nde Avrupa Haçlı kuvvetlerini yendi (1396)', '🏰 İstanbul\'u ilk uzun süreli kuşatan Osmanlı', '🌍 Anadolu\'yu büyük ölçüde birleştirdi'],
            tags: ['Niğbolu', 'Yıldırım', 'Haçlı Fatih']
        },
        {
            id: 27, era: 'osmanli', name: 'I. Mehmed (Çelebi)', dates: '1413 – 1421',
            dynasty: 'OSMANLI SULTANLARI',
            icon: '🕊️', sortYear: 1413,
            quote: '"Birlik olmadan devlet olmaz."',
            bio: 'Osmanlı İnterregnum döneminde (Fetret Devri) kardeşleriyle mücadele ederek devleti yeniden birleştiren sultan. "Osmanlı\'nın ikinci kurucusu" olarak anılır.',
            achievements: ['🏛️ Fetret Devri\'ni sona erdirerek devleti yeniden birleştirdi', '⚔️ Kardeşleriyle yaşanan taht mücadelesini kazandı', '🕊️ "Osmanlı\'nın İkinci Kurucusu" unvanı aldı'],
            tags: ['Yeniden Kurucu', 'Birleştirici', 'Fetret Devri']
        },
        {
            id: 28, era: 'osmanli', name: 'II. Murad', dates: '1421 – 1451',
            dynasty: 'OSMANLI SULTANLARI',
            icon: '🏛️', sortYear: 1421,
            quote: '"Güç kazanmak kolaydır; gücü akılla yönetmek sanat ister."',
            bio: 'Osmanlı\'yı Avrupa\'da güçlendiren ve Haçlı ittifaklarına karşı kesin zaferler kazanan sultan. Varna (1444) ve II. Kosova (1448) zaferlerini kazandı.',
            achievements: ['⚔️ Varna Zaferi\'nde Haçlı ordusunu imha etti (1444)', '⚔️ II. Kosova Meydan Muharebesi\'ni kazandı (1448)', '🎓 Edirne\'de büyük eğitim ve kültür hamleleri yaptı', '🧩 Fatih\'i en iyi eğitimle yetiştirdi'],
            tags: ['Varna', 'Kosova', 'Haçlı Fatih']
        },
        {
            id: 29, era: 'osmanli', name: 'Fatih Sultan Mehmed II', dates: '1451 – 1481',
            dynasty: 'OSMANLI SULTANLARI',
            icon: '🏰', sortYear: 1451,
            quote: '"İmkânın sınırını görmek için imkânsızı denemek lâzım."',
            bio: '21 yaşında Konstantinopolis\'i fethederek Orta Çağ\'ı kapatıp Yeni Çağ\'ı başlatan deha hükümdar. 8 dil bilen, matematikten coğrafyaya kadar pek çok alanda esere sahip bilgedir.',
            achievements: ['🏙️ İstanbul\'u fethetti; Orta Çağ\'ı kapatıp Yeni Çağ\'ı açtı (1453)', '📚 8 dil bilen polimad bir hükümdar', '⚓ Osmanlı donanmasını Haliç\'e karadan taşıttı', '🏛️ İstanbul\'u yeniden inşa ederek imparatorluk başkenti yaptı'],
            tags: ['İstanbul Fatihi', 'Çağ Açan', 'Polimad']
        },
        {
            id: 30, era: 'osmanli', name: 'II. Bayezid', dates: '1481 – 1512',
            dynasty: 'OSMANLI SULTANLARI',
            icon: '📿', sortYear: 1481,
            quote: '"Kalbin sükûneti, kelamın hikmetinden gelir."',
            bio: '"Veli" lakabıyla tanınan dindar ve barışsever sultan. İspanya\'dan sürgün edilen Yahudilere kucak açarak önemli bir insani karar aldı.',
            achievements: ['🤝 İspanya\'dan sürgün edilen Yahudileri Osmanlı\'ya kabul etti', '🎨 Osmanlı sanat ve edebiyatını destekledi', '⚓ Denizcilik alanında önemli gelişmeler yaşandı'],
            tags: ['Veli', 'Hoşgörü', 'Kültür']
        },
        {
            id: 31, era: 'osmanli', name: 'Yavuz Sultan Selim I', dates: '1512 – 1520',
            dynasty: 'OSMANLI SULTANLARI',
            icon: '⚔️', sortYear: 1512,
            quote: '"Eğer âlimler hükümdar olsaydı, ülkeler mamur olurdu."',
            bio: 'Sekiz yılda Osmanlı topraklarını iki katına çıkaran kudretli sultan. Mısır\'ı ve Hicaz\'ı alarak Osmanlı sultanlarına "Halifelik" unvanını kazandırdı.',
            achievements: ['⚔️ Çaldıran\'da Safevi Şah İsmail\'i yendi (1514)', '⚔️ Mercidabık ve Ridaniye\'de Memlüklüleri çökertti', '🌍 Hicaz\'ı alarak "Hâdimü\'l-Haremeyn" unvanını kazandı', '📜 Osmanlı sınırlarını 8 yılda 2 katına çıkardı'],
            tags: ['Yavuz', 'Halifelik', 'Mısır Fatihi']
        },
        {
            id: 32, era: 'osmanli', name: 'Kanuni Sultan Süleyman I', dates: '1520 – 1566',
            dynasty: 'OSMANLI SULTANLARI',
            icon: '👑', sortYear: 1520,
            quote: '"Halk içinde muteber bir nesne yok devlet gibi, olmaya devlet cihanda bir nefes sıhhat gibi."',
            bio: 'Osmanlı\'nın en uzun süre hüküm süren ve en parlak döneminin sultanı. 46 yıl boyunca üç kıtada hüküm sürdü. "Kanunî" lakabı adaletli kanunlar çıkarmasından, "Magnificent" lakabı ise Avrupa\'nın ona duyduğu hayranlıktan kaynaklanır.',
            achievements: ['⚔️ Mohaç Zaferi\'nde Macaristan\'ı devirdi (1526)', '🏰 Rodos\'u Şövalyelerden aldı (1522)', '📜 Kanunname-i Âl-i Osman\'ı hazırladı', '🏗️ Mimar Sinan ile birlikte Süleymaniye gibi başyapıtlar inşa ettirdi'],
            tags: ['Kanuni', 'Zirve Dönemi', 'Mohaç']
        },
        {
            id: 33, era: 'osmanli', name: 'Mimar Sinan', dates: '1489 – 1588',
            dynasty: 'OSMANLI MİMARI',
            icon: '🏗️', sortYear: 1555,
            quote: '"Süleymaniye\'de çıraklık, Selimiye\'de kalfalık, Süleymaniye\'de ustalık eserim."',
            bio: 'Osmanlı\'nın ve tüm zamanların en büyük mimarlarından biri. 375\'den fazla yapı tasarladı. Selimiye Camii ile mimarlık tarihinin zirvesine ulaştı.',
            achievements: ['🏛️ 375+ eser tasarladı (cami, köprü, medrese, hamam)', '🕌 Selimiye Camii\'ni inşa etti (1575)', '🕌 Süleymaniye Camii\'ni inşa etti (1557)', '🌍 Osmanlı mimarisini dünya mirasına kazandırdı'],
            tags: ['Mimar', 'Selimiye', 'Süleymaniye']
        },
        {
            id: 34, era: 'osmanli', name: 'IV. Murad', dates: '1623 – 1640',
            dynasty: 'OSMANLI SULTANLARI',
            icon: '⚔️', sortYear: 1623,
            quote: '"Bir devletin gücü, kanunlarına saygısıyla ölçülür."',
            bio: 'Osmanlı\'nın yenilenme çabasının son güçlü sultanı. Bağdat\'ı Safevilerden geri aldı. Disiplinli ordusu ve kişisel cesareti ile tanınır.',
            achievements: ['⚔️ Bağdat\'ı Safevilerden geri aldı (1638)', '⚖️ Divan toplantılarını bizzat yönetti', '🪖 Ordu disiplinini yeniden sağladı'],
            tags: ['Bağdat Fatihi', 'Disiplin', 'Sultan']
        },
        {
            id: 35, era: 'osmanli', name: 'IV. Mehmed (Avcı)', dates: '1648 – 1687',
            dynasty: 'OSMANLI SULTANLARI',
            icon: '🏹', sortYear: 1648,
            quote: '"Devlet av peşinde koşan hükümdar ile değil; memleket peşinde koşan vezir ile ayakta durur."',
            bio: '"Avcı" lakabıyla tanınan sultan. Veziri Fazıl Ahmed Paşa ile birlikte Girit\'i fethetti (1669). Viyana kuşatmasının (1683) altında imzası vardır.',
            achievements: ['🏝️ Girit\'i Venedik\'ten aldı (1669)', '🏰 Viyana\'yı ikinci kez kuşattı (1683)', '⚔️ Uyvar ve Kamaniçe\'yi aldı'],
            tags: ['Girit Fatihi', 'Viyana', 'Avcı']
        },
        {
            id: 36, era: 'osmanli', name: 'II. Abdülhamid', dates: '1876 – 1909',
            dynasty: 'OSMANLI SULTANLARI',
            icon: '🌹', sortYear: 1876,
            quote: '"İstiklal, her milletin en mukaddes hakkıdır."',
            bio: '33 yıl tahtta kalan son güçlü Osmanlı padişahı. Hicaz Demiryolu\'nu inşa ettirerek İslam dünyasıyla bağları güçlendirdi. Ajan ağı ve siyasi zekâsıyla "Ulu Hakan" olarak anılır.',
            achievements: ['🚂 Hicaz Demiryolu\'nu inşa ettirdi', '📡 Telgraf ve haberleşme altyapısını geliştirdi', '🏫 Binlerce okul açtı', '🌍 Pan-İslamizm politikasıyla uluslararası etki kurdu'],
            tags: ['Ulu Hakan', 'Hicaz Demiryolu', 'Pan-İslamizm']
        },
        // ─── TÜRKİYE CUMHURİYETİ ─────────────────────────────────
        {
            id: 37, era: 'cumhuriyet', name: 'Gazi Mustafa Kemal Atatürk', dates: '1923 – 1938',
            dynasty: 'TÜRKİYE CUMHURİYETİ — 1. Cumhurbaşkanı',
            icon: '🇹🇷', sortYear: 1923,
            quote: '"Egemenlik, kayıtsız şartsız milletindir. Ne mutlu Türk\'üm diyene!"',
            bio: 'Türkiye Cumhuriyeti\'nin kurucusu. Kurtuluş Savaşı\'nı zafere ulaştırdıktan sonra köklü devrimlerle Türkiye\'yi çağdaş bir devlete dönüştürdü. 20. yüzyılın en büyük devlet adamları arasında gösterilir.',
            achievements: ['🏆 Kurtuluş Savaşı\'nı zafere ulaştırdı (1923)', '🏛️ Türkiye Cumhuriyeti\'ni kurdu (29 Ekim 1923)', '📚 Harf Devrimi ile Latin alfabesini kabul ettirdi (1928)', '⚖️ Medeni Kanun, kadın hakları ve laiklik devrimlerini gerçekleştirdi'],
            tags: ['Cumhurbaşkanı', 'Kurtuluş Savaşı', 'Devrimci']
        },
        {
            id: 38, era: 'cumhuriyet', name: 'İsmet İnönü', dates: '1938 – 1950',
            dynasty: 'TÜRKİYE CUMHURİYETİ — 2. Cumhurbaşkanı',
            icon: '🕊️', sortYear: 1938,
            quote: '"Türkiye, Türk milletinin kendi kendini idare ettiği devlettir."',
            bio: 'İkinci Cumhurbaşkanı. İki İnönü Zaferi\'nin kahramanı olan İnönü, II. Dünya Savaşı\'nda Türkiye\'yi tarafsız tutarak büyük bir savaşın dışında tuttu.',
            achievements: ['⚔️ İki İnönü Savaşı\'nı kazandı (Kurtuluş Savaşı)', '🕊️ Türkiye\'yi II. Dünya Savaşı\'nın dışında tuttu', '🗳️ Çok partili demokratik sisteme geçişi sağladı'],
            tags: ['İnönü Kahramanı', 'Tarafsızlık', 'Demokrasi']
        },
        {
            id: 39, era: 'cumhuriyet', name: 'Celal Bayar', dates: '1950 – 1960',
            dynasty: 'TÜRKİYE CUMHURİYETİ — 3. Cumhurbaşkanı',
            icon: '📊', sortYear: 1950,
            quote: '"Milli irade her şeyin üzerindedir."',
            bio: 'Demokrat Parti\'nin kurucularından ve Türkiye\'nin üçüncü Cumhurbaşkanı. Çok partili sistemin ilk iktidar değişimini sağlayan tarihi seçimin ardından göreve gelen önemli devlet adamı.',
            achievements: ['🗳️ Türkiye\'nin ilk iktidar değişiminin cumhurbaşkanı oldu (1950)', '💰 Ekonomik kalkınma politikaları uyguladı', '🤝 NATO üyeliğini gerçekleştirdi (1952)'],
            tags: ['Demokrat Parti', 'NATO', 'İktidar Değişimi']
        },
        {
            id: 40, era: 'cumhuriyet', name: 'Süleyman Demirel', dates: '1993 – 2000',
            dynasty: 'TÜRKİYE CUMHURİYETİ — 9. Cumhurbaşkanı',
            icon: '⚡', sortYear: 1993,
            quote: '"Dün dündür, bugün bugündür."',
            bio: 'Hem başbakan hem cumhurbaşkanı olarak Türk siyasetinin uzun soluklu lideri. 7 kez başbakanlık yapan Demirel, "Demir Baba" olarak bilinir.',
            achievements: ['💧 GAP Projesi\'ni başlattı', '🤝 Atatürk Barajı\'nın tamamlanmasını sağladı', '⚡ "Köylere elektrik" kampanyalarını hayata geçirdi'],
            tags: ['GAP', 'Demir Baba', 'Kalkınma']
        },
        {
            id: 41, era: 'cumhuriyet', name: 'Turgut Özal', dates: '1989 – 1993',
            dynasty: 'TÜRKİYE CUMHURİYETİ — 8. Cumhurbaşkanı',
            icon: '📈', sortYear: 1989,
            quote: '"Türkiye büyük bir ülkedir, büyük düşünmek zorundadır."',
            bio: 'Türkiye\'yi dışa açık piyasa ekonomisine geçiren lider. Başbakanlık döneminde (1983–1989) ekonomik liberalleşmeyi sağlayarak ihracatı ve özelleştirmeyi hızlandırdı.',
            achievements: ['📈 Türkiye\'yi serbest piyasa ekonomisine açtı', '🏦 Özelleştirme politikalarını başlattı', '🌍 Türkiye\'nin dış ticaretini katladı'],
            tags: ['Serbest Piyasa', 'Liberalleşme', 'Kalkınma']
        }
    ];
    const rulersData = (window.TURKISH_RULERS_DATA && window.TURKISH_RULERS_DATA.length) ? window.TURKISH_RULERS_DATA : fallbackRulers;

    const rulerGrid = document.getElementById('rulerGrid');
    const rulerTimeline = document.getElementById('rulerTimeline');
    const filterBtns = document.querySelectorAll('.ruler-filter-btn');
    const searchInput = document.getElementById('rulerSearch');
    const searchClear = document.getElementById('rulerSearchClear');
    const notFound = document.getElementById('rulerNotFound');
    const totalCount = document.getElementById('rulerTotalCount');
    const visibleCount = document.getElementById('rulerVisibleCount');
    const sortSelect = document.getElementById('rulerSortSelect');
    const viewGridBtn = document.getElementById('viewGrid');
    const viewTimelineBtn = document.getElementById('viewTimeline');
    const viewListBtn = document.getElementById('viewList');

    // Modal elements
    const modal = document.getElementById('rulerModal');
    const modalOverlay = document.getElementById('rulerModalOverlay');
    const modalClose = document.getElementById('rulerModalClose');

    let currentEra = 'all';
    let currentQuery = '';
    let currentSort = 'default';
    let currentView = 'grid';

    if (totalCount) totalCount.textContent = rulersData.length;

    const eraColors = {
        hun: '#e74c3c', gokturk: '#3498db', uygur: '#9b59b6',
        karahanli: '#1abc9c', gazneli: '#f39c12', selcuklu: '#e67e22',
        anadoluselcuklu: '#27ae60', beylikler: '#d4af37', osmanli: '#8e44ad',
        cumhuriyet: '#c0392b'
    };
    const eraLabels = {
        hun: 'Hun İmparatorluğu', gokturk: 'Göktürk Kağanlığı', uygur: 'Uygur Devletleri',
        karahanli: 'Karahanlılar', gazneli: 'Gazneliler', selcuklu: 'Büyük Selçuklu',
        anadoluselcuklu: 'Anadolu Selçuklu', beylikler: 'Anadolu Beylikleri',
        osmanli: 'Osmanlı İmparatorluğu', cumhuriyet: 'Türkiye Cumhuriyeti'
    };

    function getFiltered() {
        let data = rulersData.filter(r => {
            const matchEra = currentEra === 'all' || r.era === currentEra;
            const haystack = (r.name + r.dynasty + r.quote + r.bio + (r.tags || []).join(' ')).toLowerCase();
            const matchSearch = currentQuery === '' || haystack.includes(currentQuery);
            return matchEra && matchSearch;
        });
        if (currentSort === 'name') data.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
        else if (currentSort === 'era') data.sort((a, b) => a.era.localeCompare(b.era));
        else data.sort((a, b) => a.sortYear - b.sortYear);
        return data;
    }

    function renderGrid(data) {
        if (!rulerGrid) return;
        rulerGrid.innerHTML = '';
        rulerGrid.className = 'ruler-grid' + (currentView === 'list' ? ' ruler-list-view' : '');
        data.forEach((r, idx) => {
            const color = eraColors[r.era] || '#d4af37';
            const card = document.createElement('div');
            card.className = 'ruler-card ruler-card-dynamic';
            card.dataset.era = r.era;
            card.dataset.id = r.id;
            card.style.setProperty('--era-color', color);
            card.style.animationDelay = `${idx * 0.05}s`;
            card.innerHTML = `
                <div class="ruler-card-top">
                    <div class="ruler-era-badge" style="background:${color}20;color:${color};border-color:${color}40">${r.dynasty}</div>
                    <div class="ruler-icon-large">${r.icon}</div>
                </div>
                <div class="ruler-name">${r.name}</div>
                <div class="ruler-dates">${r.dates}</div>
                <p class="ruler-quote">${r.quote}</p>
                <div class="ruler-tags-row">${(r.tags||[]).slice(0,3).map(t=>`<span class="ruler-tag">${t}</span>`).join('')}</div>
                <div class="ruler-card-footer">
                    <button class="ruler-detail-btn" data-id="${r.id}">📖 Detaylı Bilgi</button>
                </div>
            `;
            rulerGrid.appendChild(card);
        });
        // Bind detail buttons
        rulerGrid.querySelectorAll('.ruler-detail-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal(parseInt(btn.dataset.id));
            });
        });
        rulerGrid.querySelectorAll('.ruler-card-dynamic').forEach(card => {
            card.addEventListener('click', () => openModal(parseInt(card.dataset.id)));
        });
    }

    function renderTimeline(data) {
        if (!rulerTimeline) return;
        rulerTimeline.innerHTML = '';
        data.forEach((r, idx) => {
            const color = eraColors[r.era] || '#d4af37';
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.innerHTML = `
                <div class="timeline-line" style="background:${color}"></div>
                <div class="timeline-dot" style="background:${color};border-color:${color}"></div>
                <div class="timeline-content" data-id="${r.id}" style="border-color:${color}40">
                    <div class="timeline-year">${r.dates}</div>
                    <div class="timeline-name" style="color:${color}">${r.icon} ${r.name}</div>
                    <div class="timeline-dynasty">${r.dynasty}</div>
                    <div class="timeline-quote">${r.quote}</div>
                    <button class="ruler-detail-btn" data-id="${r.id}" style="margin-top:10px;">📖 Detaylı Bilgi</button>
                </div>
            `;
            rulerTimeline.appendChild(item);
        });
        rulerTimeline.querySelectorAll('.ruler-detail-btn').forEach(btn => {
            btn.addEventListener('click', () => openModal(parseInt(btn.dataset.id)));
        });
    }

    function render() {
        const data = getFiltered();
        if (visibleCount) visibleCount.textContent = data.length;
        const hasData = data.length > 0;
        if (notFound) notFound.style.display = hasData ? 'none' : 'flex';

        if (currentView === 'timeline') {
            if (rulerGrid) rulerGrid.style.display = 'none';
            if (rulerTimeline) rulerTimeline.style.display = 'block';
            renderTimeline(data);
        } else {
            if (rulerTimeline) rulerTimeline.style.display = 'none';
            if (rulerGrid) rulerGrid.style.display = 'grid';
            renderGrid(data);
        }
    }

    function openModal(id) {
        const r = rulersData.find(x => x.id === id);
        if (!r || !modal) return;
        const color = eraColors[r.era] || '#d4af37';
        document.getElementById('rModalEra').innerHTML = `<span style="background:${color}20;color:${color};border:1px solid ${color}40;padding:4px 14px;border-radius:20px;font-size:0.8rem;font-weight:700;">${r.dynasty}</span>`;
        document.getElementById('rModalName').textContent = r.name;
        document.getElementById('rModalDates').textContent = `📅 ${r.dates}`;
        document.getElementById('rModalPortrait').textContent = r.icon;
        document.getElementById('rModalQuote').textContent = r.quote;
        document.getElementById('rModalBio').textContent = r.bio;
        document.getElementById('rModalAchievements').innerHTML = `<h4 class="modal-achieve-title">🏅 Başlıca Başarılar</h4><ul class="modal-achieve-list">${(r.achievements||[]).map(a=>`<li>${a}</li>`).join('')}</ul>`;
        document.getElementById('rModalTags').innerHTML = (r.tags||[]).map(t=>`<span class="ruler-tag" style="border-color:${color};color:${color}">${t}</span>`).join('');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        if (window.turkishSound) window.turkishSound.playClick();
    }

    function closeModal() {
        if (modal) modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentEra = btn.dataset.era || 'all';
            render();
            if (window.turkishSound) window.turkishSound.playClick();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            currentQuery = searchInput.value.toLowerCase().trim();
            if (searchClear) searchClear.style.display = currentQuery ? 'flex' : 'none';
            render();
        });
    }
    if (searchClear) {
        searchClear.style.display = 'none';
        searchClear.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            currentQuery = '';
            searchClear.style.display = 'none';
            render();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            currentSort = sortSelect.value;
            render();
        });
    }

    function setView(v) {
        currentView = v;
        [viewGridBtn, viewTimelineBtn, viewListBtn].forEach(b => b && b.classList.remove('active'));
        if (v === 'grid' && viewGridBtn) viewGridBtn.classList.add('active');
        if (v === 'timeline' && viewTimelineBtn) viewTimelineBtn.classList.add('active');
        if (v === 'list' && viewListBtn) viewListBtn.classList.add('active');
        render();
    }
    if (viewGridBtn) viewGridBtn.addEventListener('click', () => setView('grid'));
    if (viewTimelineBtn) viewTimelineBtn.addEventListener('click', () => setView('timeline'));
    if (viewListBtn) viewListBtn.addEventListener('click', () => setView('list'));

    render();
}

/* ========================================================
   11. TÜRK ATASÖZLERİ & DEYİMLER MODÜLÜ
   ======================================================== */
function initAtasozleri() {
    const atsozuData = window.atasozleriData || [];

    const card = document.getElementById('atsozuCard');
    const textEl = document.getElementById('atsozuText');
    const meaningEl = document.getElementById('atsozuMeaning');
    const catEl = document.getElementById('atsozuCategory');
    const btnNew = document.getElementById('btnNewAtsozu');
    const filters = document.getElementById('atsozuFilters');
    const searchInput = document.getElementById('atsozuSearch');
    const copyButton = document.getElementById('btnCopyAtsozu');
    const countEl = document.getElementById('atsozuCount');
    let currentCategory = 'all';
    let lastItem = null;
    const catLabels = {
        all: '🌟 Tümü', sabir: '⏳ Sabır & Metanet', emek: '💪 Emek & Alın Teri',
        birlik: '🤝 Birlik & Dayanışma', bilgi: '📚 İlim & Hikmet',
        mertlik: '🛡️ Mertlik', tedbir: '🧭 Tedbir & Kanaat',
        aile: '🏡 Aile', dostluk: '🫱🏼‍🫲🏽 Dostluk', iyilik: '💛 İyilik',
        adalet: '⚖️ Adalet'
    };

    if (filters) {
        const categories = [...new Set(atsozuData.map(item => item.cat).filter(Boolean))];
        filters.innerHTML = `<button class="atsozu-cat-btn active" data-cat="all">${catLabels.all}</button>` +
            categories.map(cat => `<button class="atsozu-cat-btn" data-cat="${cat}">${catLabels[cat] || `📖 ${cat}`}</button>`).join('');
    }
    const catButtons = document.querySelectorAll('.atsozu-cat-btn');
    if (countEl) countEl.textContent = `${atsozuData.length} atasözü ve deyim`;

    function displayProverb(item) {
        if (!item || !textEl || !meaningEl || !catEl) return;
        lastItem = item;
        if (card) {
            card.classList.add('switching');
            setTimeout(() => {
                textEl.textContent = `"${item.text}"`;
                meaningEl.textContent = item.meaning || 'Bu söz, günlük hayatta edinilmiş ortak tecrübeyi kısa ve akılda kalıcı biçimde aktarır.';
                catEl.textContent = catLabels[item.cat] || '📖 Bilgelik';
                card.classList.remove('switching');
            }, 180);
        }
    }

    function getPool() {
        const query = (searchInput && searchInput.value || '').trim().toLocaleLowerCase('tr-TR');
        return atsozuData.filter(item =>
            (currentCategory === 'all' || item.cat === currentCategory) &&
            (!query || `${item.text} ${item.meaning || ''}`.toLocaleLowerCase('tr-TR').includes(query))
        );
    }

    function showRandom() {
        const pool = getPool();
        if (!pool.length) {
            if (countEl) countEl.textContent = 'Bu aramayla eşleşen söz bulunamadı.';
            return;
        }
        const candidates = pool.length > 1 ? pool.filter(item => item !== lastItem) : pool;
        displayProverb(candidates[Math.floor(Math.random() * candidates.length)]);
        if (countEl) countEl.textContent = `${pool.length} eşleşme · arşivde ${atsozuData.length} söz`;
    }

    if (btnNew) {
        btnNew.addEventListener('click', () => {
            showRandom();
            if (window.turkishSound) window.turkishSound.playClick();
        });
    }

    catButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            catButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.cat || 'all';
            showRandom();
            if (window.turkishSound) window.turkishSound.playClick();
        });
    });
    if (searchInput) searchInput.addEventListener('input', () => {
        const pool = getPool();
        if (countEl) countEl.textContent = `${pool.length} eşleşme · arşivde ${atsozuData.length} söz`;
    });
    if (copyButton) copyButton.addEventListener('click', () => {
        if (!lastItem) return;
        const copyText = `"${lastItem.text}" — ${lastItem.meaning}`;
        const copy = navigator.clipboard && navigator.clipboard.writeText
            ? navigator.clipboard.writeText(copyText)
            : Promise.reject(new Error('Clipboard API unavailable'));
        copy
            .then(() => showToast('Atasözü panoya kopyalandı.', '📋'))
            .catch(() => showToast('Kopyalama desteklenmedi; sözü seçip kopyalayabilirsiniz.', '📋'));
    });
    if (atsozuData.length) displayProverb(atsozuData[0]);
}

/* ========================================================
   12. GÜNÜN BİLGELİĞİ & YUNUS EMRE HİKMETLERİ
   ======================================================== */
function initDailyWisdom() {
    const wisdomQuotes = window.hikmetData || [];
    const wisdomBtn = document.getElementById('btnNewWisdom');
    const wisdomText = document.getElementById('wisdomText');
    const wisdomMeta = document.getElementById('wisdomMeta');
    const wisdomCount = document.getElementById('wisdomCount');
    let deck = [];

    function refillDeck() {
        deck = [...wisdomQuotes];
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    function showWisdom(item) {
        if (!item || !wisdomText) return;
        wisdomText.textContent = `“${item.quote}”`;
        if (wisdomMeta) wisdomMeta.textContent = `— ${item.author}${item.source ? ` · ${item.source}` : ''}`;
    }

    if (wisdomCount) wisdomCount.textContent = `${wisdomQuotes.length} hikmet damlası`;
    if (wisdomQuotes.length) {
        refillDeck();
        showWisdom(deck.pop());
    }
    if (wisdomBtn && wisdomText) {
        wisdomBtn.addEventListener('click', () => {
            if (!deck.length) refillDeck();
            showWisdom(deck.pop());
            if (window.turkishSound) window.turkishSound.playNey(493.88, 1.2);
            showToast('Hikmet damlası yenilendi!', '✨');
        });
    }
}

/* ========================================================
   13. HİKMET AVI — ATASÖZÜ ANLAM EŞLEŞTİRME OYUNU
   ======================================================== */
function initHikmetQuiz() {
    const data = window.atasozleriData || [];
    const prompt = document.getElementById('quizPrompt');
    const options = document.getElementById('quizOptions');
    const feedback = document.getElementById('quizFeedback');
    const scoreEl = document.getElementById('quizScore');
    const streakEl = document.getElementById('quizStreak');
    const bestEl = document.getElementById('quizBest');
    const startButton = document.getElementById('btnStartQuiz');
    const nextButton = document.getElementById('btnNextQuiz');
    if (!prompt || !options || !startButton || !nextButton || data.length < 3) return;

    const bestKey = 'otag_hikmet_avi_best';
    let score = 0;
    let streak = 0;
    let best = Number(localStorage.getItem(bestKey) || 0);
    let answer = null;
    let answered = false;
    if (bestEl) bestEl.textContent = best;

    function updateScore() {
        if (scoreEl) scoreEl.textContent = score;
        if (streakEl) streakEl.textContent = streak;
        if (bestEl) bestEl.textContent = best;
    }

    function nextQuestion() {
        const pool = data.filter(item => item.meaning);
        answer = pool[Math.floor(Math.random() * pool.length)];
        const distractors = pool.filter(item => item !== answer);
        for (let i = distractors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [distractors[i], distractors[j]] = [distractors[j], distractors[i]];
        }
        const choices = [answer, distractors[0], distractors[1]]
            .sort(() => Math.random() - 0.5);
        answered = false;
        prompt.textContent = `“${answer.text}” sözünün anlamı nedir?`;
        feedback.textContent = '';
        options.replaceChildren();
        choices.forEach(item => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'quiz-option';
            button.textContent = item.meaning;
            button.addEventListener('click', () => {
                if (answered) return;
                answered = true;
                options.querySelectorAll('button').forEach(option => { option.disabled = true; });
                if (item === answer) {
                    score += 10;
                    streak += 1;
                    feedback.textContent = 'Doğru cevap! Sözün anlamını yakaladın. +10 puan';
                    button.classList.add('correct');
                    if (score > best) {
                        best = score;
                        localStorage.setItem(bestKey, String(best));
                    }
                } else {
                    streak = 0;
                    feedback.textContent = `Bu kez olmadı. Doğru anlam: ${answer.meaning}`;
                    button.classList.add('incorrect');
                    options.querySelectorAll('button').forEach(option => {
                        if (option.textContent === answer.meaning) option.classList.add('correct');
                    });
                }
                updateScore();
                nextButton.hidden = false;
            });
            options.appendChild(button);
        });
        nextButton.hidden = true;
    }

    startButton.addEventListener('click', () => {
        score = 0;
        streak = 0;
        updateScore();
        startButton.textContent = '🔄 Oyunu baştan başlat';
        nextQuestion();
    });
    nextButton.addEventListener('click', nextQuestion);
}
