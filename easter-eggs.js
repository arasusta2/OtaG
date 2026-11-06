// OTAĞ — EASTER EGG MOTORU
// 10 gizli sürpriz: bazıları eğlenceli, bazıları ciddi ve gurur verici.
// Dokümantasyon: EASTER-EGG.md
(() => {
    'use strict';

    const EGGS = {
        fethi: {
            emoji: '🏰',
            title: '1453 — SUR YIKAN',
            sub: 'Konami muhafızları çekildi, surlar açıldı.',
            quote: '“Ya ben İstanbul’u alırım, ya İstanbul beni.” — Fatih Sultan Mehmet',
            note: '29 Mayıs 1453 sabahı Şahi topları surları dövdü, gemiler karadan yürütüldü. Bir çağ kapandı, yeni bir çağ açıldı.',
            variant: 'gold',
            burst: ['⚔️', '🔥', '🌙', '🏰'],
            sound: 'playDavul'
        },
        fetihKodu: {
            emoji: '🗝️',
            title: 'FETİH KODU',
            sub: 'Bu sayı sadece bir yıl değil, bir kapının anahtarı.',
            quote: '“İstanbul elbette fethedilecektir. Onu fetheden komutan ne güzel komutandır.”',
            note: 'Fatih, 21 yaşında surları aştı; Bizans’a son verdi ve Osmanlı’yı imparatorluğa taşıdı.',
            variant: 'gold',
            burst: ['🗝️', '🏰', '⚔️'],
            sound: 'playSealStamp'
        },
        atam: {
            emoji: '🇹🇷',
            title: 'ATAM İZİNDEYİZ',
            sub: 'Bu portal, bir milletin uyanışının izinde.',
            quote: '“Az zamanda çok ve büyük işler yaptık.” — Mustafa Kemal Atatürk, 10. Yıl Nutku',
            note: 'Cumhuriyet’in kurucusu, bağımsızlığın mimarı. Ne mutlu Türküm diyene!',
            variant: 'kirmizi',
            burst: ['🇹🇷', '⭐', '🌙'],
            sound: 'playOkeyWin'
        },
        bozkurt: {
            emoji: '🐺',
            title: 'BOZKURT ULUDU',
            sub: 'Sürü dağılmaz; sadece çağrıyı bekler.',
            quote: '“Türk, töresinden ayrılırsa yok olur.” — Orhun Yazıtları’ndan',
            note: 'Göktürklerden bugüne bozkırın sesi aynı: bağımsızlık ve töre.',
            variant: 'gold',
            burst: ['🐺', '🌙', '⚔️'],
            sound: 'playKaval'
        },
        cay: {
            emoji: '☕',
            title: 'ÇAY DEMLENDİ',
            sub: 'Kıraathane protokolü: önce çay, sonra okey, en son iddia.',
            quote: '“Bir çay molası, bin lafın ilacıdır.” — Kıraathane âdeti',
            note: 'Bardaklar tavşan kanı, taşlar karışık; masa hazır. Afiyet olsun!',
            variant: 'turkuaz',
            burst: ['☕', '🫖', '🍬'],
            sound: 'playClick'
        },
        arma: {
            emoji: '🛡️',
            title: 'ARMA PARLATILDI',
            sub: 'Yedi tıklama, yedi padişah mührü.',
            quote: '“Her armanın bir hikâyesi, her çadırın bir direği vardır.”',
            note: 'Armayı bu kadar çok sevdiysen, bir çay söyle de masaya otur.',
            variant: 'turkuaz',
            burst: ['🛡️', '✨', '☕'],
            sound: 'playSealStamp'
        },
        mola: {
            emoji: '⏳',
            title: 'BİR DAKİKA SESSİZLİK',
            sub: 'Masa seni bekliyor, tarih de öyle.',
            quote: '“Türkiye Cumhuriyeti’nin temeli kültürdür.” — Mustafa Kemal Atatürk',
            note: 'Bir çay al, bir hükümdar aç, bir destan oku. Mola da yolculuğun parçasıdır.',
            variant: 'gold',
            burst: ['⏳', '📖', '☕'],
            sound: 'playChime'
        },
        kanuni: {
            emoji: '⚖️',
            title: 'ADALET MÜLKÜN TEMELİDİR',
            sub: 'Kanuni Sultan Süleyman’ın kanunnamesi hâlâ konuşuluyor.',
            quote: '“Adalet mülkün temelidir.” — Kanuni Sultan Süleyman’a atfedilir',
            note: '46 yıl tahtta kaldı; kanunları, Süleymaniye’si ve denizlerdeki gücüyle iz bıraktı.',
            variant: 'gold',
            burst: ['⚖️', '📜', '🕌'],
            sound: 'playSealStamp'
        },
        okey: {
            emoji: '🀄',
            title: 'OKEY BENDEN',
            sub: 'Gösterge taşı döndü, masanın havası değişti.',
            quote: '“Laf değil, taş konuşur.” — Ali Dayı',
            note: 'Bu saatten sonra perler dizilir, çaylar tazelenir. Sıra sende!',
            variant: 'turkuaz',
            burst: ['🀄', '💬', '☕'],
            sound: 'playTileClick'
        },
        zafer: {
            emoji: '🏆',
            title: 'KIRAATHANE ŞAMPİYONU',
            sub: 'Masa efsaneleri listesine adını yazdırdın.',
            quote: '“BİTTİM BEYLER!” — Hasan Amca',
            note: 'Çay benden, iddia senden. Bir el daha?',
            variant: 'kirmizi',
            burst: ['🏆', '🎉', '☕'],
            sound: 'playOkeyWin'
        }
    };

    // ─── 2. DALGA: TOPLAM 20 EASTER EGG ─────────────────────────────
    Object.assign(EGGS, {
        kalbimizde: {
            emoji: '💛',
            title: '1283 — KALBİMİZDE',
            sub: 'Bu sayı bir tarih değil, bir bağ.',
            quote: '“Kalbimizde!” — Kıraathane masası',
            note: 'Okey, tavla ve mangala sohbetine 1283 yaz; masadaki botlar hep bir ağızdan cevap verir.',
            variant: 'kirmizi',
            burst: ['💛', '🇹🇷', '🀄'],
            sound: 'playOkeyWin'
        },
        osmanli: {
            emoji: '🏹',
            title: 'SÖĞÜT’TEN DOĞAN DEVLET',
            sub: '1299 — Küçük bir beyliğin altı yüzyıllık hikâyesi.',
            quote: '“Devlet, adaletle ayakta durur.” — Osmanlı töresi',
            note: 'Osman Gazi’nin Söğüt’te attığı adım, üç kıtaya yayılan bir imparatorluğa dönüştü.',
            variant: 'gold',
            burst: ['🏹', '🌙', '🏰'],
            sound: 'playSealStamp'
        },
        gokturk: {
            emoji: '📜',
            title: 'ÖTÜKEN’DEN SES',
            sub: 'Taşlara yazılan ilk Türk devlet hafızası.',
            quote: '“Türk milleti, töreni bırakma!” — Orhun Yazıtları',
            note: 'Bilge Kağan ve Kül Tigin adına dikilen yazıtlar, bağımsızlığın en eski yazılı belgeleridir.',
            variant: 'gold',
            burst: ['📜', '🐺', '🌙'],
            sound: 'playDavul'
        },
        simit: {
            emoji: '🥨',
            title: 'ÇAYIN YANINA SİMİT',
            sub: 'Kıraathane ekonomisinin temel taşı.',
            quote: '“Simitsiz çay, taşsız okey gibidir.”',
            note: 'Sıcak simit, tavşan kanı çay ve bitmeyen bir el. Masanın mutluluk formülü budur.',
            variant: 'turkuaz',
            burst: ['🥨', '☕', '🧿'],
            sound: 'playClick'
        },
        nazar: {
            emoji: '🧿',
            title: 'NAZAR DEĞMESİN',
            sub: 'Maşallah, barekallah!',
            quote: '“Göz değmesin, taşlar dağılmasın.”',
            note: 'Mavi boncuk takıldı, masa koruma altına alındı. Artık iddialı konuşabilirsin.',
            variant: 'turkuaz',
            burst: ['🧿', '✨', '🀄'],
            sound: 'playChime'
        },
        kemankes: {
            emoji: '🏹',
            title: 'OK YAYDAN ÇIKTI',
            sub: 'Nefesini tut, hedefe odaklan.',
            quote: '“Kemankeş, hedefi değil nefesini terbiye eder.”',
            note: 'Türk okçuluğu sabır, denge ve disiplin sanatıdır; menzil rekorları yüzyıllarca konuşuldu.',
            variant: 'gold',
            burst: ['🏹', '🎯', '🌙'],
            sound: 'playArrowHit'
        },
        ebru: {
            emoji: '🎨',
            title: 'SUYA ÇİZİLEN RENK',
            sub: 'Sabır, suyun üstünde desen olur.',
            quote: '“Ebru, acele edenin değil bekleyenin sanatıdır.”',
            note: 'Kitreli suya serpilen boyalar, kâğıda çekildiğinde tekrar edilemez bir desene dönüşür.',
            variant: 'turkuaz',
            burst: ['🎨', '💧', '🌸'],
            sound: 'playChime'
        },
        mesk: {
            emoji: '🎵',
            title: 'MEŞK BAŞLADI',
            sub: 'Makam, gönülden gönüle geçer.',
            quote: '“Nota yazılır, ama meşk yaşanır.”',
            note: 'Hoca ile talebe arasında geçen meşk, Türk musikisinin en eski öğretim biçimidir.',
            variant: 'gold',
            burst: ['🎵', '🪕', '🎶'],
            sound: 'playTambur'
        },
        tavla: {
            emoji: '🎲',
            title: 'ZAR DÖNDÜ',
            sub: 'Şeş-beş geldiyse masayı bırakma.',
            quote: '“Zar senden yana dönerse hatırlatırsın bu lafı.”',
            note: 'Tavla sabır ve hesap oyunudur; kapıyı tutan, pulları sayan kazanır.',
            variant: 'turkuaz',
            burst: ['🎲', '⚫', '☕'],
            sound: 'playDiceRoll'
        },
        mangala: {
            emoji: '🪨',
            title: 'KUYULAR SAYILDI',
            sub: 'UNESCO tescilli sabır oyunu.',
            quote: '“Mangala sabır işi, çay demlik işi.”',
            note: 'Taşı doğru kuyuya bırakan hazineyi toplar; acele eden rakibe kuyu verir.',
            variant: 'turkuaz',
            burst: ['🪨', '🏺', '☕'],
            sound: 'playStoneDrop'
        }
    });

    // ─── 3. DALGA: TOPLAM 27 EASTER EGG ─────────────────────────────
    Object.assign(EGGS, {
        kahve: {
            emoji: '☕',
            title: 'KAHVE PİŞTİ',
            sub: 'Bir fincan kahvenin kırk yıl hatırı var.',
            quote: '“Gönül ne kahve ister ne kahvehane; gönül sohbet ister, kahve bahane.”',
            note: 'Cezve ocakta, sohbet masada. Kıraathanenin en eski ritüeli başladı.',
            variant: 'gold',
            burst: ['☕', '🫘', '✨'],
            sound: 'playClick'
        },
        lokum: {
            emoji: '🍬',
            title: 'LOKUM İKRAMI',
            sub: 'Tatlı yiyelim, tatlı konuşalım.',
            quote: '“Gönül almak, lokum dağıtmaktan kolaydır.”',
            note: 'Gül lokumu, çifte kavrulmuş kahve ve bir tutam sohbet. Masa tamamlandı.',
            variant: 'turkuaz',
            burst: ['🍬', '🌹', '☕'],
            sound: 'playChime'
        },
        kilim: {
            emoji: '🧶',
            title: 'KİLİM DOKUNDU',
            sub: 'Her motif bir dua, her ilmek bir hikâye.',
            quote: '“Kilimin dili olsa, göçü anlatırdı.”',
            note: 'Anadolu kiliminde her desen bir olayı, bir inancı ya da bir yolu anlatır.',
            variant: 'kirmizi',
            burst: ['🧶', '🪡', '🔥'],
            sound: 'playClick'
        },
        nevruz: {
            emoji: '🔥',
            title: 'NEVRUZ ATEŞİ',
            sub: 'Baharın ilk kıvılcımı.',
            quote: '“Ateşten atla, kıştan kurtul.”',
            note: 'Nevruz, doğanın uyanışını ateş, su ve bereket dualarıyla karşılayan ortak bayramdır.',
            variant: 'kirmizi',
            burst: ['🔥', '🌱', '🌷'],
            sound: 'playDavul'
        },
        yunus: {
            emoji: '🕊️',
            title: 'YUNUS’UN DİLİ',
            sub: 'Sevelim, sevilelim; dünya kimseye kalmaz.',
            quote: '“Sevelim, sevilelim; dünya kimseye kalmaz.” — Yunus Emre',
            note: 'Yunus Emre’nin dili, yedi yüzyıldır aynı sade gönül diliyle konuşuyor.',
            variant: 'gold',
            burst: ['🕊️', '🌿', '📜'],
            sound: 'playKaval'
        },
        nasreddin: {
            emoji: '🫏',
            title: 'HOCA’NIN EŞEĞİ',
            sub: 'Ya param ya eşeğim.',
            quote: '“Parayı veren düdüğü çalar.” — Nasreddin Hoca',
            note: 'Akşehir’in bilgesi, her fıkrada gülümsetirken bir ders bırakır.',
            variant: 'turkuaz',
            burst: ['🫏', '😂', '🪙'],
            sound: 'playClick'
        },
        kirkpinar: {
            emoji: '🤼',
            title: 'KIRKPINAR’DA ER MEYDANI',
            sub: 'Altı yüzyıllık yağlı güreş geleneği.',
            quote: '“Pehlivan, rakibini değil öfkesini yener.”',
            note: 'Edirne’de her yaz kurulan er meydanı, ustalık ve saygı üzerine kurulu bir yarışmadır.',
            variant: 'kirmizi',
            burst: ['🤼', '🏆', '🥁'],
            sound: 'playDavul'
        }
    });

    const TYPED_TRIGGERS = {
        '1453': 'fetihKodu',
        'atatürk': 'atam',
        'ataturk': 'atam',
        'bozkurt': 'bozkurt',
        'çay': 'cay',
        'cay': 'cay',
        'kanuni': 'kanuni',
        'okey': 'okey',
        'zafer': 'zafer',
        '1283': 'kalbimizde',
        'osmanlı': 'osmanli',
        'osmanli': 'osmanli',
        'göktürk': 'gokturk',
        'gokturk': 'gokturk',
        'simit': 'simit',
        'nazar': 'nazar',
        'kemankeş': 'kemankes',
        'kemankes': 'kemankes',
        'ebru': 'ebru',
        'meşk': 'mesk',
        'mesk': 'mesk',
        'tavla': 'tavla',
        'mangala': 'mangala',
        'kahve': 'kahve',
        'lokum': 'lokum',
        'kilim': 'kilim',
        'nevruz': 'nevruz',
        'yunus': 'yunus',
        'yunus emre': 'yunus',
        'nasreddin': 'nasreddin',
        'nasrettin': 'nasreddin',
        'kırkpınar': 'kirkpinar',
        'kirkpinar': 'kirkpinar'
    };

    const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    const state = {
        buffer: '',
        bufferTimer: null,
        keys: [],
        logoClicks: 0,
        logoTimer: null,
        lastActivity: Date.now(),
        idleShown: false,
        idleTimer: null
    };

    const $ = (id) => document.getElementById(id);

    function playSound(name) {
        const s = window.turkishSound;
        if (s && typeof s[name] === 'function') {
            try { s[name](); } catch (_) { /* ses kritik değil */ }
        }
    }

    function buildOverlay() {
        if ($('easterOverlay')) return;
        const overlay = document.createElement('div');
        overlay.id = 'easterOverlay';
        overlay.className = 'easter-overlay';
        overlay.innerHTML = `
            <div class="easter-card" role="dialog" aria-modal="true" aria-labelledby="easterTitle">
                <div class="easter-emblem" id="easterEmoji">🏛️</div>
                <h2 class="easter-title" id="easterTitle"></h2>
                <p class="easter-sub" id="easterSub"></p>
                <blockquote class="easter-quote" id="easterQuote"></blockquote>
                <p class="easter-note" id="easterNote"></p>
                <button class="easter-close btn-ottoman" id="easterClose" type="button">Mekâna Dön</button>
                <div class="easter-sparkles" id="easterSparkles" aria-hidden="true"></div>
            </div>`;
        document.body.appendChild(overlay);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeOverlay();
        });
        $('easterClose').addEventListener('click', closeOverlay);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('show')) closeOverlay();
        });
    }

    function closeOverlay() {
        const overlay = $('easterOverlay');
        if (overlay) overlay.classList.remove('show');
    }

    function spawnBurst(emojis) {
        const box = $('easterSparkles');
        if (!box) return;
        box.innerHTML = '';
        if (!emojis.length) return;
        for (let i = 0; i < 18; i++) {
            const span = document.createElement('span');
            span.className = 'easter-spark';
            span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            span.style.left = (4 + Math.random() * 92) + '%';
            span.style.animationDelay = (Math.random() * 0.7) + 's';
            span.style.animationDuration = (1.7 + Math.random() * 0.9) + 's';
            box.appendChild(span);
        }
        setTimeout(() => { box.innerHTML = ''; }, 2800);
    }

    function showEgg(id) {
        const egg = EGGS[id];
        if (!egg) return;
        buildOverlay();
        const overlay = $('easterOverlay');
        overlay.className = 'easter-overlay show ' + (egg.variant || 'gold');
        $('easterEmoji').textContent = egg.emoji;
        $('easterTitle').textContent = egg.title;
        $('easterSub').textContent = egg.sub || '';
        $('easterQuote').textContent = egg.quote || '';
        $('easterNote').textContent = egg.note || '';
        spawnBurst(egg.burst || []);
        if (typeof window.showToast === 'function') window.showToast(egg.title, egg.emoji);
        playSound(egg.sound);
    }

    function triggerFromTyping(text) {
        const key = text.toLocaleLowerCase('tr');
        for (const trigger of Object.keys(TYPED_TRIGGERS)) {
            if (key.endsWith(trigger)) {
                state.buffer = '';
                showEgg(TYPED_TRIGGERS[trigger]);
                return true;
            }
        }
        return false;
    }

    function isTypingTarget(target) {
        if (!target) return false;
        const tag = target.tagName;
        return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
    }

    function initKeyboard() {
        document.addEventListener('keydown', (e) => {
            state.lastActivity = Date.now();
            state.idleShown = false;
            if (isTypingTarget(e.target)) return;

            // Konami kodu
            state.keys.push(e.key);
            if (state.keys.length > KONAMI.length) state.keys.shift();
            if (state.keys.join('|').toLowerCase() === KONAMI.join('|').toLowerCase()) {
                state.keys = [];
                showEgg('fethi');
                return;
            }

            // Yazılan kelimeler
            if (e.key.length === 1 && /[a-z0-9çğıöşü]/i.test(e.key)) {
                state.buffer = (state.buffer + e.key).slice(-24);
                clearTimeout(state.bufferTimer);
                state.bufferTimer = setTimeout(() => { state.buffer = ''; }, 2000);
                triggerFromTyping(state.buffer);
            }
        });
    }

    function initLogo() {
        const logo = document.querySelector('.logo-box');
        if (!logo) return;
        logo.addEventListener('click', () => {
            state.lastActivity = Date.now();
            state.logoClicks++;
            clearTimeout(state.logoTimer);
            state.logoTimer = setTimeout(() => { state.logoClicks = 0; }, 2500);
            if (state.logoClicks >= 7) {
                state.logoClicks = 0;
                logo.classList.add('easter-spin');
                setTimeout(() => logo.classList.remove('easter-spin'), 1000);
                showEgg('arma');
            }
        });
    }

    function initIdle() {
        ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(evt => {
            window.addEventListener(evt, () => {
                state.lastActivity = Date.now();
                state.idleShown = false;
            }, { passive: true });
        });
        state.idleTimer = setInterval(() => {
            if (state.idleShown) return;
            if (Date.now() - state.lastActivity >= 60000) {
                state.idleShown = true;
                showEgg('mola');
            }
        }, 10000);
    }

    function init() {
        buildOverlay();
        initKeyboard();
        initLogo();
        initIdle();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Test / dokümantasyon için dışa açık API
    window.OTAG_EASTER_EGGS = {
        ids: Object.keys(EGGS),
        list: () => Object.keys(EGGS).map(id => ({ id, title: EGGS[id].title, trigger: findTrigger(id) })),
        trigger: (id) => { showEgg(id); return id; }
    };

    function findTrigger(id) {
        if (id === 'fethi') return 'Konami kodu (↑↑↓↓←→←→BA)';
        if (id === 'arma') return 'Logo’ya 2,5 sn içinde 7 tıklama';
        if (id === 'mola') return '60 saniye hareketsizlik';
        const typed = Object.keys(TYPED_TRIGGERS).find(k => TYPED_TRIGGERS[k] === id);
        return typed ? `“${typed}” yazmak` : 'API';
    }
})();
