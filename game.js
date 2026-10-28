// TÜRK KÜLTÜR PORTALI — Oyun Motorları (Tavla, Okey, Kemankeş, Dijital Ebru)

/* ========================================================
   1. TAVLA (BACKGAMMON) MOTORU — BİLGİSAYARA KARŞI
   ======================================================== */
class TavlaGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');

        // Oyun Durumu
        this.points = []; // 24 hane (0..23)
        this.bar = { white: 0, black: 0 }; // Kırık pullar
        this.off = { white: 0, black: 0 }; // Toplanan pullar (15'e ulaşan kazanır)
        this.turn = 'white'; // 'white' (Siz) veya 'black' (Bilgisayar)
        this.dice = []; // Kalan kullanılabilir zar hamleleri
        this.lastRoll = [0, 0];
        this.selectedPoint = null; // Seçilen hane indeksi veya 'bar_white'
        this.validMoves = []; // Seçilen taştan gidilebilecek haneler [{to: number, dieUsed: number, isBearOff: boolean}]
        this.isRolling = false;
        this.isAiPlaying = false;
        this.gameOver = false;

        // Boyutlar
        this.width = 760;
        this.height = 500;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        // Farsça / Osmanlıca Zar İsimleri
        this.diceNames = {
            "1-1": "Hepyek!", "2-2": "Dübârâ!", "3-3": "Dü-se!", "4-4": "Dört-cehar!", "5-5": "Dü-beş!", "6-6": "Dü-şeş!",
            "2-1": "Dü-yek", "3-1": "Se-yek", "3-2": "Seba-i dü", "4-1": "Cihar-ı yek", "4-2": "Cihar-ı dü", "4-3": "Cihar-ı se",
            "5-1": "Penc-ü yek", "5-2": "Penc-ü dü", "5-3": "Penc-ü se", "5-4": "Penc-ü cihar", "6-1": "Şeş-i yek", "6-2": "Şeş-i dü",
            "6-3": "Şeş-i se", "6-4": "Şeş-i cihar", "6-5": "Şeş-beş!"
        };

        this.bindEvents();
        this.resetGame();
    }

    resetGame() {
        // 24 hane başlat
        this.points = Array.from({ length: 24 }, () => null);

        // Geleneksel Tavla Başlangıç Dizilimi (15 Beyaz, 15 Siyah)
        // Beyaz (Siz): 23'ten 0'a doğru ilerler, 0..5 hanesinden toplar
        // Siyah (Rakip): 0'dan 23'e doğru ilerler, 18..23 hanesinden toplar
        this.points[23] = { color: 'white', count: 2 };
        this.points[12] = { color: 'white', count: 5 };
        this.points[7]  = { color: 'white', count: 3 };
        this.points[5]  = { color: 'white', count: 5 };

        this.points[0]  = { color: 'black', count: 2 };
        this.points[11] = { color: 'black', count: 5 };
        this.points[16] = { color: 'black', count: 3 };
        this.points[18] = { color: 'black', count: 5 };

        this.bar = { white: 0, black: 0 };
        this.off = { white: 0, black: 0 };
        this.turn = 'white';
        this.dice = [];
        this.lastRoll = [0, 0];
        this.selectedPoint = null;
        this.validMoves = [];
        this.isRolling = false;
        this.isAiPlaying = false;
        this.gameOver = false;

        this.hideChatBubble();
        this.updateHUD("🎲 Yeni oyun başladı! 'Zar At' butonuna tıklayarak ilk hamlenizi yapın.");
        this.render();
    }

    bindEvents() {
        this.canvas.addEventListener('click', (e) => {
            if (this.turn !== 'white' || this.isRolling || this.isAiPlaying || this.gameOver) return;
            if (this.dice.length === 0) {
                this.updateHUD("Lütfen önce 'Zar At' butonuna tıklayın!");
                return;
            }

            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;

            this.handleCanvasClick(x, y);
        });

        const btnRoll = document.getElementById('btnTavlaRoll');
        if (btnRoll) {
            btnRoll.addEventListener('click', () => {
                if (this.turn === 'white' && this.dice.length === 0 && !this.isRolling && !this.gameOver) {
                    this.rollDice();
                }
            });
        }

        const btnNew = document.getElementById('btnTavlaNew');
        if (btnNew) {
            btnNew.addEventListener('click', () => {
                this.resetGame();
            });
        }
    }

    rollDice() {
        this.isRolling = true;
        if (window.turkishSound) window.turkishSound.playDiceRoll();

        let rollsCount = 0;
        const rollInterval = setInterval(() => {
            const d1 = Math.floor(Math.random() * 6) + 1;
            const d2 = Math.floor(Math.random() * 6) + 1;
            this.lastRoll = [d1, d2];
            this.render();
            rollsCount++;

            if (rollsCount > 8) {
                clearInterval(rollInterval);
                this.isRolling = false;
                const d1Final = Math.floor(Math.random() * 6) + 1;
                const d2Final = Math.floor(Math.random() * 6) + 1;
                this.lastRoll = [d1Final, d2Final];

                if (d1Final === d2Final) {
                    this.dice = [d1Final, d1Final, d1Final, d1Final];
                } else {
                    this.dice = [d1Final, d2Final];
                }

                // Osmanlıca Zar İsmini Bul
                const key1 = `${Math.max(d1Final, d2Final)}-${Math.min(d1Final, d2Final)}`;
                const call = this.diceNames[key1] || `${d1Final} ve ${d2Final}`;

                const callEl = document.getElementById('tavlaDiceCall');
                if (callEl) callEl.textContent = `${d1Final}-${d2Final} : ${call}`;

                if (this.turn === 'white') {
                    // Hamle yapabilir mi kontrol et
                    const hasMoves = this.hasAnyLegalMoves('white');
                    if (!hasMoves) {
                        this.updateHUD(`🎲 ${call}! Oynayabileceğiniz hamle bulunmuyor. Sıra rakibe geçiyor...`);
                        setTimeout(() => this.endTurn(), 1400);
                    } else {
                        this.updateHUD(`🎲 ${call}! Bir pulunuzu seçin ve hedef haneye tıklayın.`);
                    }
                }
                this.render();
            }
        }, 60);
    }

    handleCanvasClick(x, y) {
        // Tıklanan haneyi ya da barı bul
        const clickedTarget = this.getPointFromCoords(x, y);
        if (!clickedTarget) {
            this.selectedPoint = null;
            this.validMoves = [];
            this.render();
            return;
        }

        // Eğer henüz taş seçilmemişse
        if (this.selectedPoint === null) {
            // Eğer kırık taş varsa sadece bar seçilebilir
            if (this.bar.white > 0) {
                if (clickedTarget === 'bar_white') {
                    this.selectedPoint = 'bar_white';
                    this.validMoves = this.getLegalMovesFrom('white', 'bar_white');
                    if (window.turkishSound) window.turkishSound.playClick();
                } else {
                    this.updateHUD("Önce kırık pulunuzu oyuna sokmalısınız! Ortadaki beyaz pula tıklayın.");
                }
            } else if (typeof clickedTarget === 'number') {
                const pt = this.points[clickedTarget];
                if (pt && pt.color === 'white' && pt.count > 0) {
                    this.selectedPoint = clickedTarget;
                    this.validMoves = this.getLegalMovesFrom('white', clickedTarget);
                    if (window.turkishSound) window.turkishSound.playClick();
                }
            }
        } else {
            // Bir taş zaten seçiliydi, hedef hane tıklanmış mı?
            const matchedMove = this.validMoves.find(m => m.to === clickedTarget);
            if (matchedMove) {
                // Hamleyi gerçekleştir!
                this.executeMove('white', this.selectedPoint, matchedMove);
                this.selectedPoint = null;
                this.validMoves = [];

                if (this.off.white >= 15) {
                    this.handleWin('white');
                    return;
                }

                // Kalan zar var mı?
                if (this.dice.length > 0) {
                    if (!this.hasAnyLegalMoves('white')) {
                        this.updateHUD("Kalan zarlarla başka hamle yapılamıyor. Sıra rakibe geçiyor...");
                        setTimeout(() => this.endTurn(), 1000);
                    } else {
                        this.updateHUD(`Hamle yapıldı! Kalan zarlar: [${this.dice.join(', ')}]. Bir sonraki pulunuzu seçin.`);
                    }
                } else {
                    this.updateHUD("Zarlarınız bitti! Sıra rakipte...");
                    setTimeout(() => this.endTurn(), 800);
                }
            } else if (clickedTarget === this.selectedPoint) {
                // Seçimi kaldır
                this.selectedPoint = null;
                this.validMoves = [];
            } else if (this.bar.white === 0 && typeof clickedTarget === 'number' && this.points[clickedTarget] && this.points[clickedTarget].color === 'white') {
                // Başka bir kendi pulunu seç
                this.selectedPoint = clickedTarget;
                this.validMoves = this.getLegalMovesFrom('white', clickedTarget);
                if (window.turkishSound) window.turkishSound.playClick();
            } else {
                this.selectedPoint = null;
                this.validMoves = [];
            }
        }

        this.render();
    }

    getLegalMovesFrom(player, from) {
        const moves = [];
        const uniqueDice = [...new Set(this.dice)];

        uniqueDice.forEach(die => {
            if (from === 'bar_white') {
                // Beyaz bar'dan siyahın ev hanesine (23 - die + 1) yani 24 - die indeksine girer
                const targetPoint = 24 - die;
                if (this.canLandOn(player, targetPoint)) {
                    moves.push({ to: targetPoint, dieUsed: die, isBearOff: false });
                }
            } else if (from === 'bar_black') {
                // Siyah bar'dan beyazın ev hanesine (die - 1) indeksine girer
                const targetPoint = die - 1;
                if (this.canLandOn(player, targetPoint)) {
                    moves.push({ to: targetPoint, dieUsed: die, isBearOff: false });
                }
            } else {
                // Tahta üzerindeki pul
                const dir = player === 'white' ? -1 : 1;
                const targetPoint = from + (dir * die);

                // Pul toplama (Bear off) kontrolü
                if (player === 'white' && targetPoint < 0) {
                    if (this.canBearOff(player)) {
                        // Tam hane mi yoksa arkada taş kalmadığı için büyük zarla mı topluyor?
                        if (targetPoint === -1) {
                            moves.push({ to: 'off_white', dieUsed: die, isBearOff: true });
                        } else {
                            // En yüksek hanedeki taş mı kontrol et
                            let highestWhitePoint = -1;
                            for (let p = 5; p >= 0; p--) {
                                if (this.points[p] && this.points[p].color === 'white' && this.points[p].count > 0) {
                                    highestWhitePoint = p;
                                    break;
                                }
                            }
                            if (from === highestWhitePoint) {
                                moves.push({ to: 'off_white', dieUsed: die, isBearOff: true });
                            }
                        }
                    }
                } else if (player === 'black' && targetPoint > 23) {
                    if (this.canBearOff(player)) {
                        if (targetPoint === 24) {
                            moves.push({ to: 'off_black', dieUsed: die, isBearOff: true });
                        } else {
                            let lowestBlackPoint = 24;
                            for (let p = 18; p <= 23; p++) {
                                if (this.points[p] && this.points[p].color === 'black' && this.points[p].count > 0) {
                                    lowestBlackPoint = p;
                                    break;
                                }
                            }
                            if (from === lowestBlackPoint) {
                                moves.push({ to: 'off_black', dieUsed: die, isBearOff: true });
                            }
                        }
                    }
                } else if (targetPoint >= 0 && targetPoint <= 23) {
                    if (this.canLandOn(player, targetPoint)) {
                        moves.push({ to: targetPoint, dieUsed: die, isBearOff: false });
                    }
                }
            }
        });

        return moves;
    }

    canLandOn(player, pointIndex) {
        if (pointIndex < 0 || pointIndex > 23) return false;
        const pt = this.points[pointIndex];
        if (!pt) return true; // Boş hane
        if (pt.color === player) return true; // Kendi kapısı
        if (pt.count === 1) return true; // Açık taş (kırılabilir)
        return false; // Rakip kapı almış (2 veya daha fazla taş)
    }

    canBearOff(player) {
        if (this.bar[player] > 0) return false;
        if (player === 'white') {
            // Beyazın 6..23 hanelerinde pulu olmamalı
            for (let i = 6; i <= 23; i++) {
                if (this.points[i] && this.points[i].color === 'white' && this.points[i].count > 0) {
                    return false;
                }
            }
            return true;
        } else {
            // Siyahın 0..17 hanelerinde pulu olmamalı
            for (let i = 0; i <= 17; i++) {
                if (this.points[i] && this.points[i].color === 'black' && this.points[i].count > 0) {
                    return false;
                }
            }
            return true;
        }
    }

    hasAnyLegalMoves(player) {
        if (this.bar[player] > 0) {
            return this.getLegalMovesFrom(player, `bar_${player}`).length > 0;
        }
        for (let i = 0; i < 24; i++) {
            if (this.points[i] && this.points[i].color === player && this.points[i].count > 0) {
                if (this.getLegalMovesFrom(player, i).length > 0) return true;
            }
        }
        return false;
    }

    executeMove(player, from, move) {
        // Zarı tüket
        const dieIdx = this.dice.indexOf(move.dieUsed);
        if (dieIdx !== -1) this.dice.splice(dieIdx, 1);

        // Kaynaktan çıkar
        if (from === `bar_${player}`) {
            this.bar[player]--;
        } else {
            this.points[from].count--;
            if (this.points[from].count === 0) this.points[from] = null;
        }

        // Hedefe ekle
        if (move.isBearOff) {
            this.off[player]++;
            if (window.turkishSound) window.turkishSound.playTileClick();
        } else {
            const destPt = this.points[move.to];
            const opponent = player === 'white' ? 'black' : 'white';

            if (destPt && destPt.color === opponent && destPt.count === 1) {
                // Kırma hamlesi!
                this.bar[opponent]++;
                this.points[move.to] = { color: player, count: 1 };
                if (window.turkishSound) window.turkishSound.playCheckerHit();
                const oppName = opponent === 'white' ? 'Beyaz pul' : 'Siyah pul';
                if (player === 'white') {
                    this.updateHUD("💥 ŞAK! Rakibin açık pulunu kırdınız! Rakip bara gitti.");
                }
            } else if (destPt && destPt.color === player) {
                destPt.count++;
                if (window.turkishSound) window.turkishSound.playCheckerMove();
            } else {
                this.points[move.to] = { color: player, count: 1 };
                if (window.turkishSound) window.turkishSound.playCheckerMove();
            }
        }

        this.render();
    }

    endTurn() {
        if (this.turn === 'white') {
            this.turn = 'black';
            this.dice = [];
            this.selectedPoint = null;
            this.validMoves = [];
            this.render();
            this.updateHUD("🤖 Rakip (Bilgisayar) düşünüyor ve zar atıyor...");
            setTimeout(() => this.runAiTurn(), 800);
        } else {
            this.turn = 'white';
            this.dice = [];
            this.selectedPoint = null;
            this.validMoves = [];
            this.render();
            this.updateHUD("🎲 Sıra sizde! 'Zar At' butonuna tıklayın.");
        }
    }

    runAiTurn() {
        if (this.gameOver) return;
        this.isAiPlaying = true;

        if (window.turkishSound) window.turkishSound.playDiceRoll();

        // Yapay Zeka Zar Atar
        const d1 = Math.floor(Math.random() * 6) + 1;
        const d2 = Math.floor(Math.random() * 6) + 1;
        this.lastRoll = [d1, d2];
        if (d1 === d2) this.dice = [d1, d1, d1, d1];
        else this.dice = [d1, d2];

        const key1 = `${Math.max(d1, d2)}-${Math.min(d1, d2)}`;
        const call = this.diceNames[key1] || `${d1}-${d2}`;
        const callEl = document.getElementById('tavlaDiceCall');
        if (callEl) callEl.textContent = `Rakip: ${d1}-${d2} (${call})`;

        this.render();

        const stepAi = () => {
            if (this.dice.length === 0 || this.gameOver) {
                this.isAiPlaying = false;
                setTimeout(() => this.endTurn(), 600);
                return;
            }

            // Olası tüm hamleleri topla
            const allLegalMoves = [];
            if (this.bar.black > 0) {
                const moves = this.getLegalMovesFrom('black', 'bar_black');
                moves.forEach(m => allLegalMoves.push({ from: 'bar_black', move: m }));
            } else {
                for (let i = 0; i < 24; i++) {
                    if (this.points[i] && this.points[i].color === 'black' && this.points[i].count > 0) {
                        const moves = this.getLegalMovesFrom('black', i);
                        moves.forEach(m => allLegalMoves.push({ from: i, move: m }));
                    }
                }
            }

            if (allLegalMoves.length === 0) {
                this.updateHUD(`🤖 Rakip (${call}) için hamle kalmadı.`);
                this.isAiPlaying = false;
                setTimeout(() => this.endTurn(), 800);
                return;
            }

            // Akıllı Strateji: 1) Pul topla, 2) Beyaz açık taş kır, 3) Kapı al, 4) İlerlet
            let bestMove = null;
            for (const item of allLegalMoves) {
                if (item.move.isBearOff) {
                    bestMove = item;
                    break;
                }
                const target = item.move.to;
                if (this.points[target] && this.points[target].color === 'white' && this.points[target].count === 1) {
                    bestMove = item; // Kırma fırsatını kaçırmaz!
                    break;
                }
                if (this.points[target] && this.points[target].color === 'black' && this.points[target].count === 1) {
                    bestMove = item; // Kapı kapatır
                }
            }
            if (!bestMove) {
                bestMove = allLegalMoves[Math.floor(Math.random() * allLegalMoves.length)];
            }

            this.executeMove('black', bestMove.from, bestMove.move);

            if (this.off.black >= 15) {
                this.handleWin('black');
                return;
            }

            setTimeout(stepAi, 650);
        };

        setTimeout(stepAi, 700);
    }

    handleWin(winner) {
        this.gameOver = true;
        if (winner === 'white') {
            this.updateHUD("🎉 TEBRİKLER! Tüm pullarınızı toplayarak tavla maçını kazandınız! Şampiyonsunuz!");
            if (window.turkishSound) window.turkishSound.playOkeyWin();
        } else {
            this.updateHUD("😔 Rakip tüm pullarını önce topladı. Tavla tahtasını koltuğunun altına alma vakti!");
        }
    }

    say(text) {
        const message = (text || '').trim();
        if (!message) return;
        this.showChatBubble(`Siz: "${message}"`, 'player');
        if (window.turkishSound) window.turkishSound.playClick();

        if (this.chatReplyTimeout) clearTimeout(this.chatReplyTimeout);
        this.chatReplyTimeout = setTimeout(() => {
            const replies = [
                "Lafın büyüğü masada değil, zarda konuşulur!",
                "Sen taşını oyna, ben cevabımı zarla veririm.",
                "Bu tavla masasında racon kesilmez, pul kırılır!",
                "Hele bir zar at da görelim bakalım kim konuşuyor.",
                "Kıraathane ahalisi duydu bunu, şimdi oynamak zorundasın!",
                "Lafını aldım, sıra pulunu görmeye geldi.",
                "Zar senden yana dönerse hatırlatırsın bu lafı."
            ];
            const reply = replies[Math.floor(Math.random() * replies.length)];
            this.showChatBubble(`Bilgisayar: "${reply}"`, 'bot');
            if (window.turkishSound) window.turkishSound.playCheckerMove();
        }, 1250);
    }

    showChatBubble(text, who = 'player') {
        const bubble = document.getElementById('tavlaChatBubble');
        if (!bubble) return;
        bubble.textContent = text;
        bubble.className = `tavla-chat-bubble show ${who}`;
    }

    hideChatBubble() {
        const bubble = document.getElementById('tavlaChatBubble');
        if (bubble) bubble.className = 'tavla-chat-bubble';
    }

    updateHUD(msg) {
        const statusEl = document.getElementById('tavlaStatusMsg');
        if (statusEl) statusEl.textContent = msg;

        const whiteOffEl = document.getElementById('tavlaWhiteOff');
        const blackOffEl = document.getElementById('tavlaBlackOff');
        const whiteBarEl = document.getElementById('tavlaWhiteBar');
        const blackBarEl = document.getElementById('tavlaBlackBar');

        if (whiteOffEl) whiteOffEl.textContent = `${this.off.white} / 15`;
        if (blackOffEl) blackOffEl.textContent = `${this.off.black} / 15`;
        if (whiteBarEl) whiteBarEl.textContent = `Kırık: ${this.bar.white}`;
        if (blackBarEl) blackBarEl.textContent = `Kırık: ${this.bar.black}`;
    }

    getPointFromCoords(x, y) {
        // Tahta Geometrisi:
        // Sol blok: Haneler 12..17 (üst) ve 11..6 (alt)
        // Sağ blok: Haneler 18..23 (üst) ve 5..0 (alt)
        // Ortada Bar var (x: 355..405)
        const boardPadding = 30;
        const colWidth = 48;
        const midBarWidth = 50;

        // Bar tıklaması kontrolü
        if (x >= 355 && x <= 405) {
            if (y >= 260 && y <= 450 && this.bar.white > 0) return 'bar_white';
            if (y >= 50 && y <= 240 && this.bar.black > 0) return 'bar_black';
        }

        // Üst Bölge (y < 250): Sol haneler 12..17, Sağ haneler 18..23
        if (y >= 30 && y <= 230) {
            // Sol üst: 12, 13, 14, 15, 16, 17
            for (let i = 0; i < 6; i++) {
                const px = boardPadding + 20 + i * colWidth;
                if (x >= px && x <= px + colWidth) return 12 + i;
            }
            // Sağ üst: 18, 19, 20, 21, 22, 23
            for (let i = 0; i < 6; i++) {
                const px = boardPadding + 20 + 6 * colWidth + midBarWidth + i * colWidth;
                if (x >= px && x <= px + colWidth) return 18 + i;
            }
        }

        // Alt Bölge (y > 270): Sol haneler 11..6, Sağ haneler 5..0
        if (y >= 270 && y <= 470) {
            // Sol alt: 11, 10, 9, 8, 7, 6
            for (let i = 0; i < 6; i++) {
                const px = boardPadding + 20 + i * colWidth;
                if (x >= px && x <= px + colWidth) return 11 - i;
            }
            // Sağ alt: 5, 4, 3, 2, 1, 0
            for (let i = 0; i < 6; i++) {
                const px = boardPadding + 20 + 6 * colWidth + midBarWidth + i * colWidth;
                if (x >= px && x <= px + colWidth) return 5 - i;
            }
        }

        // Sağ yan toplama kutusu (Bear off)
        if (x >= 700 && x <= 750) {
            if (y >= 260) return 'off_white';
            else return 'off_black';
        }

        return null;
    }

    render() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);

        // 1. Zengin Ahşap Çerçeve & Sedef Kakma Arka Plan
        const gradWood = ctx.createLinearGradient(0, 0, this.width, this.height);
        gradWood.addColorStop(0, '#361d10');
        gradWood.addColorStop(0.5, '#4a2817');
        gradWood.addColorStop(1, '#2c150b');
        ctx.fillStyle = gradWood;
        ctx.fillRect(0, 0, this.width, this.height);

        // İç Tahta Zemin
        ctx.fillStyle = '#f3e8d2';
        ctx.fillRect(25, 25, 665, 450);

        // Sedef Kakma / İnce Altın Bordür
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 3;
        ctx.strokeRect(25, 25, 665, 450);

        // Orta Ahşap Ayırıcı (Bar / Menteşe Bölgesi)
        const barGrad = ctx.createLinearGradient(355, 0, 405, 0);
        barGrad.addColorStop(0, '#2e190e');
        barGrad.addColorStop(0.5, '#5c331d');
        barGrad.addColorStop(1, '#2e190e');
        ctx.fillStyle = barGrad;
        ctx.fillRect(355, 25, 50, 450);

        // Pirinç Menteşeler
        ctx.fillStyle = '#d4af37';
        ctx.fillRect(375, 50, 10, 22);
        ctx.fillRect(375, 428, 10, 22);

        // 2. Haneler (Üçgenler / Mızraplar)
        const colWidth = 48;
        const midBarWidth = 50;
        const triHeight = 195;

        // Üst Haneler (12..17 ve 18..23)
        for (let i = 0; i < 6; i++) {
            const pIdx = 12 + i;
            const x = 45 + i * colWidth;
            this.drawTriangle(x, 26, colWidth, triHeight, true, pIdx % 2 === 0, pIdx);
        }
        for (let i = 0; i < 6; i++) {
            const pIdx = 18 + i;
            const x = 45 + 6 * colWidth + midBarWidth + i * colWidth;
            this.drawTriangle(x, 26, colWidth, triHeight, true, pIdx % 2 === 0, pIdx);
        }

        // Alt Haneler (11..6 ve 5..0)
        for (let i = 0; i < 6; i++) {
            const pIdx = 11 - i;
            const x = 45 + i * colWidth;
            this.drawTriangle(x, 474, colWidth, triHeight, false, pIdx % 2 === 0, pIdx);
        }
        for (let i = 0; i < 6; i++) {
            const pIdx = 5 - i;
            const x = 45 + 6 * colWidth + midBarWidth + i * colWidth;
            this.drawTriangle(x, 474, colWidth, triHeight, false, pIdx % 2 === 0, pIdx);
        }

        // 3. Sağ Kısım: Pul Toplama Alanı (Bear off tray)
        ctx.fillStyle = '#26140b';
        ctx.fillRect(695, 25, 55, 450);
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(695, 25, 55, 450);

        // Toplanan Pulların Görseli
        this.renderBorneOffTray();

        // 4. Hanelerdeki Pulları Çiz
        for (let i = 0; i < 24; i++) {
            const pt = this.points[i];
            if (pt && pt.count > 0) {
                this.drawCheckersOnPoint(i, pt.color, pt.count);
            }
        }

        // 5. Kırık Pulları Çiz (Bar)
        this.drawBarCheckers();

        // 6. Zar Görselleri
        this.drawDiceVisuals();
    }

    drawTriangle(x, y, w, h, isTop, isDark, pointIndex) {
        const ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        if (isTop) {
            ctx.moveTo(x, y);
            ctx.lineTo(x + w, y);
            ctx.lineTo(x + w / 2, y + h);
        } else {
            ctx.moveTo(x, y);
            ctx.lineTo(x + w, y);
            ctx.lineTo(x + w / 2, y - h);
        }
        ctx.closePath();

        // Renk: Kırmızı-Bordo veya Kemik-Altın
        ctx.fillStyle = isDark ? '#8d101d' : '#234d3d';
        ctx.fill();

        // Hedef hane vurgusu (Yeşil ışıma)
        const isTarget = this.validMoves.some(m => m.to === pointIndex);
        if (isTarget) {
            ctx.fillStyle = 'rgba(0, 229, 255, 0.4)';
            ctx.fill();
            ctx.strokeStyle = '#00e5ff';
            ctx.lineWidth = 3;
            ctx.stroke();
        } else {
            ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Seçili hane vurgusu (Altın sarısı ışıma)
        if (this.selectedPoint === pointIndex) {
            ctx.fillStyle = 'rgba(212, 175, 55, 0.45)';
            ctx.fill();
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 3;
            ctx.stroke();
        }

        // Hane Numarası (Küçük ve şık)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'center';
        const numY = isTop ? y + 12 : y - 4;
        ctx.fillText(pointIndex + 1, x + w / 2, numY);

        ctx.restore();
    }

    drawCheckersOnPoint(pIdx, color, count) {
        const ctx = this.ctx;
        const colWidth = 48;
        const midBarWidth = 50;
        const radius = 19;

        let cx = 0;
        let isTop = (pIdx >= 12);

        if (isTop) {
            if (pIdx <= 17) cx = 45 + (pIdx - 12) * colWidth + colWidth / 2;
            else cx = 45 + 6 * colWidth + midBarWidth + (pIdx - 18) * colWidth + colWidth / 2;
        } else {
            if (pIdx >= 6) cx = 45 + (11 - pIdx) * colWidth + colWidth / 2;
            else cx = 45 + 6 * colWidth + midBarWidth + (5 - pIdx) * colWidth + colWidth / 2;
        }

        const maxVisible = 5;
        const visibleCount = Math.min(count, maxVisible);
        const spacing = (count > 5) ? 26 : 34;

        for (let i = 0; i < visibleCount; i++) {
            let cy = isTop ? (25 + radius + 4 + i * spacing) : (475 - radius - 4 - i * spacing);
            this.drawSingleChecker(cx, cy, radius, color);

            // 5'ten fazla pul varsa en üsttekine sayıyı yaz
            if (i === visibleCount - 1 && count > 5) {
                ctx.fillStyle = (color === 'white') ? '#111' : '#fff';
                ctx.font = 'bold 12px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`+${count - 4}`, cx, cy);
            }
        }
    }

    drawSingleChecker(cx, cy, r, color) {
        const ctx = this.ctx;
        ctx.save();

        // Gölge
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetY = 3;

        // Gövde Gradyanı (Fildişi veya Abanoz Siyahı)
        const grad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.1, cx, cy, r);
        if (color === 'white') {
            grad.addColorStop(0, '#ffffff');
            grad.addColorStop(0.6, '#f3ece1');
            grad.addColorStop(1, '#d5c4aa');
        } else {
            grad.addColorStop(0, '#4a4a4a');
            grad.addColorStop(0.7, '#1f1f1f');
            grad.addColorStop(1, '#080808');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowColor = 'transparent';

        // İşlemeli İç Halka
        ctx.strokeStyle = (color === 'white') ? 'rgba(160, 130, 90, 0.6)' : 'rgba(212, 175, 55, 0.7)';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.65, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.25, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
    }

    drawBarCheckers() {
        const ctx = this.ctx;
        const bx = 380;
        const radius = 18;

        // Beyaz Kırıklar (Altta)
        if (this.bar.white > 0) {
            for (let i = 0; i < Math.min(this.bar.white, 4); i++) {
                const by = 350 - i * 32;
                this.drawSingleChecker(bx, by, radius, 'white');
            }
            if (this.bar.white > 1) {
                ctx.fillStyle = '#000';
                ctx.font = 'bold 11px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(`x${this.bar.white}`, bx, 350);
            }
            if (this.selectedPoint === 'bar_white') {
                ctx.strokeStyle = '#ffd700';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(bx, 350, radius + 4, 0, Math.PI * 2);
                ctx.stroke();
            }
        }

        // Siyah Kırıklar (Üstte)
        if (this.bar.black > 0) {
            for (let i = 0; i < Math.min(this.bar.black, 4); i++) {
                const by = 130 + i * 32;
                this.drawSingleChecker(bx, by, radius, 'black');
            }
            if (this.bar.black > 1) {
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 11px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(`x${this.bar.black}`, bx, 130);
            }
        }
    }

    renderBorneOffTray() {
        const ctx = this.ctx;
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';

        // Siyah Toplanan (Üstte)
        ctx.fillStyle = 'rgba(212, 175, 55, 0.8)';
        ctx.fillText('RAKİP', 722, 45);
        ctx.fillText(`${this.off.black}/15`, 722, 60);

        for (let i = 0; i < Math.min(this.off.black, 15); i++) {
            ctx.fillStyle = '#111';
            ctx.fillRect(702, 70 + i * 10, 40, 7);
            ctx.strokeStyle = '#d4af37';
            ctx.strokeRect(702, 70 + i * 10, 40, 7);
        }

        // Beyaz Toplanan (Altta)
        ctx.fillStyle = 'rgba(212, 175, 55, 0.8)';
        ctx.fillText('SİZ', 722, 270);
        ctx.fillText(`${this.off.white}/15`, 722, 285);

        for (let i = 0; i < Math.min(this.off.white, 15); i++) {
            ctx.fillStyle = '#f5efe6';
            ctx.fillRect(702, 450 - i * 10, 40, 7);
            ctx.strokeStyle = '#a68042';
            ctx.strokeRect(702, 450 - i * 10, 40, 7);
        }

        // Eğer pul toplama hedefse parlat
        if (this.validMoves.some(m => m.isBearOff)) {
            ctx.strokeStyle = '#00e5ff';
            ctx.lineWidth = 3;
            ctx.strokeRect(698, 255, 49, 215);
        }
    }

    drawDiceVisuals() {
        const ctx = this.ctx;
        if (!this.lastRoll || this.lastRoll[0] === 0) return;

        // Masa Üzerine Şık Fildişi Zarlar Çiz (Sağ boş alanda)
        const dX = (this.turn === 'white') ? 510 : 200;
        const dY = 230;

        this.draw3dDie(dX, dY, this.lastRoll[0]);
        this.draw3dDie(dX + 50, dY, this.lastRoll[1]);
    }

    draw3dDie(x, y, val) {
        const ctx = this.ctx;
        const size = 36;
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 4;

        ctx.fillStyle = '#fffdf7';
        ctx.beginPath();
        ctx.roundRect(x, y, size, size, 8);
        ctx.fill();

        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = '#c5ba9e';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Noktaları Çiz
        ctx.fillStyle = '#1a1a1a';
        const mid = x + size / 2;
        const q1 = x + size * 0.28;
        const q3 = x + size * 0.72;
        const ym = y + size / 2;
        const y1 = y + size * 0.28;
        const y3 = y + size * 0.72;
        const dotR = 3.2;

        const drawDot = (dx, dy) => {
            ctx.beginPath();
            ctx.arc(dx, dy, dotR, 0, Math.PI * 2);
            ctx.fill();
        };

        if (val === 1) { ctx.fillStyle = '#c1121f'; drawDot(mid, ym); }
        else if (val === 2) { drawDot(q1, y1); drawDot(q3, y3); }
        else if (val === 3) { drawDot(q1, y1); drawDot(mid, ym); drawDot(q3, y3); }
        else if (val === 4) { drawDot(q1, y1); drawDot(q3, y1); drawDot(q1, y3); drawDot(q3, y3); }
        else if (val === 5) { drawDot(q1, y1); drawDot(q3, y1); drawDot(mid, ym); drawDot(q1, y3); drawDot(q3, y3); }
        else if (val === 6) { drawDot(q1, y1); drawDot(q3, y1); drawDot(q1, ym); drawDot(q3, ym); drawDot(q1, y3); drawDot(q3, y3); }

        ctx.restore();
    }
}


/* ========================================================
   2. KIRAATHANE OKEY OYUNU MOTORU (2 KATLI ISTAKA & KURALINA UYGUN PER MOTORU)
   ======================================================== */
const OKEY_PHRASES_200 = [
    // 🎯 TAŞ & RACON (45 adet)
    { id: 1, cat: 'tas', icon: '🎯', text: "Attım gitti, işine yarayan alsın hayrını görsün!" },
    { id: 2, cat: 'tas', icon: '🔥', text: "Taş gibi taş attım, alan bayram eder!" },
    { id: 3, cat: 'tas', icon: '⚖️', text: "Bu taşı alan çifte gider, alamayan eve gider!" },
    { id: 4, cat: 'tas', icon: '🗡️', text: "Racon kesmiyoruz, masaya taş kesiyoruz!" },
    { id: 5, cat: 'tas', icon: '💪', text: "Yarasın koçuma, taşın hası geldi!" },
    { id: 6, cat: 'tas', icon: '🎲', text: "Bu taş masanın kaderini değiştirir!" },
    { id: 7, cat: 'tas', icon: '🎁', text: "Al da hayrını gör, bir daha benden bekleme!" },
    { id: 8, cat: 'tas', icon: '⚡', text: "Gözüm kapalı attım, nereye giderse gitsin!" },
    { id: 9, cat: 'tas', icon: '💔', text: "Bunu yere attık ama içim cız etti beyler!" },
    { id: 10, cat: 'tas', icon: '🔥', text: "Taş var taş var, bu taş can yakar!" },
    { id: 11, cat: 'tas', icon: '⏳', text: "Bunu alan iki tura biter, demedi demeyin!" },
    { id: 12, cat: 'tas', icon: '🌹', text: "Al sana gül gibi taş, kıymetini bil!" },
    { id: 13, cat: 'tas', icon: '🍎', text: "Taşı attım nar gibi, alan pişman olmaz!" },
    { id: 14, cat: 'tas', icon: '🚫', text: "Bu el kimse benden taş beklemesin!" },
    { id: 15, cat: 'tas', icon: '🪵', text: "Taşın ağırlığı masayı inletti!" },
    { id: 16, cat: 'tas', icon: '👑', text: "Öyle bir taş attım ki kıraathane ayağa kalkar!" },
    { id: 17, cat: 'tas', icon: '🤨', text: "Bunu attım ama içim hiç rahat değil..." },
    { id: 18, cat: 'tas', icon: '🛡️', text: "Yana taş bırakmak yiğidin şanındandır!" },
    { id: 19, cat: 'tas', icon: '🔨', text: "Taş dediğin böyle masaya oturacak!" },
    { id: 20, cat: 'tas', icon: '📈', text: "Bunu alırsan borcun artar bilesin!" },
    { id: 21, cat: 'tas', icon: '🔄', text: "Elden çıkan taş geri dönmez!" },
    { id: 22, cat: 'tas', icon: '📜', text: "Atılan taşla açılan el bir olmaz!" },
    { id: 23, cat: 'tas', icon: '✨', text: "Bu taşı çeken okeyi unutur!" },
    { id: 24, cat: 'tas', icon: '💎', text: "Taşın hasını seçtim, masaya hediye ettim!" },
    { id: 25, cat: 'tas', icon: '✋', text: "Bunu da almazsan artık oynamayalım!" },
    { id: 26, cat: 'tas', icon: '😬', text: "Atarken elim titredi ama attım gitti!" },
    { id: 27, cat: 'tas', icon: '📜', text: "Taşı fırlattık, ferman padişahın!" },
    { id: 28, cat: 'tas', icon: '🍽️', text: "Günün en lezzetli taşını sana ikram ettim!" },
    { id: 29, cat: 'tas', icon: '🧂', text: "Al kardeş, çorbada bizim de tuzumuz olsun!" },
    { id: 30, cat: 'tas', icon: '🏜️', text: "Masada taş kalmadı, biz hala taş atıyoruz!" },
    { id: 31, cat: 'tas', icon: '🚪', text: "Bunu gören rakip tahtayı kapatır!" },
    { id: 32, cat: 'tas', icon: '🤝', text: "Bu taşla sana kıyak geçtim, unutma!" },
    { id: 33, cat: 'tas', icon: '🎨', text: "Taş değil adeta sanat eseri attım!" },
    { id: 34, cat: 'tas', icon: '🏆', text: "Bunu alan şampiyonluğa oynar!" },
    { id: 35, cat: 'tas', icon: '👀', text: "Kıraathane ahalisi şahittir, tertemiz taş attım!" },
    { id: 36, cat: 'tas', icon: '💬', text: "Taş elden çıktı, söz ağızdan çıktı!" },
    { id: 37, cat: 'tas', icon: '🌟', text: "Bu taşı ıskartada görenin gözü parlar!" },
    { id: 38, cat: 'tas', icon: '🦅', text: "Korkunun ecele faydası yok, attım gitti!" },
    { id: 39, cat: 'tas', icon: '🪵', text: "Bunu da alamazsan istakayı bırak usta!" },
    { id: 40, cat: 'tas', icon: '🔔', text: "Taşın sesi ahşapta çınladı!" },
    { id: 41, cat: 'tas', icon: '💨', text: "Bu taş rüzgar gibi geçti!" },
    { id: 42, cat: 'tas', icon: '🎀', text: "Al bunu, perlerini süsle!" },
    { id: 43, cat: 'tas', icon: '🌾', text: "Taş geldi hanesine, bereket masasına!" },
    { id: 44, cat: 'tas', icon: '🙏', text: "Gözünün yağını yiyeyim bunu bana geri atma!" },
    { id: 45, cat: 'tas', icon: '🎯', text: "Attığımız taş tam yerine oturdu!" },

    // ☕ ÇAY & KIRAATHANE (40 adet)
    { id: 46, cat: 'cay', icon: '☕', text: "Çaycııı! Masaya tavşan kanı açık dört çay çek!" },
    { id: 47, cat: 'cay', icon: '☕', text: "Çaylar şirketten, okeyler benden!" },
    { id: 48, cat: 'cay', icon: '🫖', text: "Boş bardakları al usta, muhabbet soğumasın!" },
    { id: 49, cat: 'cay', icon: '🔥', text: "Okey oynayanın çayı soğumaz, tazele!" },
    { id: 50, cat: 'cay', icon: '💸', text: "Bu elin çayı kaybedene yazar beyler!" },
    { id: 51, cat: 'cay', icon: '🎵', text: "Çay kaşığının sesi okey sesine karıştı!" },
    { id: 52, cat: 'cay', icon: '⏳', text: "Demli bir çay söyleyin, bu el uzun sürecek!" },
    { id: 53, cat: 'cay', icon: '📝', text: "Çaycı hesabı kime yazacağını çok iyi biliyor!" },
    { id: 54, cat: 'cay', icon: '🀄', text: "Çaysız kıraathane, sahte okeysiz deste olmaz!" },
    { id: 55, cat: 'cay', icon: '🫖', text: "Usta bize bir demlik getir, masa alev aldı!" },
    { id: 56, cat: 'cay', icon: '🍬', text: "Şekerli çay içen okeye dönemezmiş!" },
    { id: 57, cat: 'cay', icon: '⌛', text: "Çayım bitti, taşım bitmedi gitti!" },
    { id: 58, cat: 'cay', icon: '⚠️', text: "Çay bardağını ıstakanın üstüne koyma devrilecek!" },
    { id: 59, cat: 'cay', icon: '💡', text: "Açık bir çay çek oradan, kafamız açılsın!" },
    { id: 60, cat: 'cay', icon: '🫖', text: "Bu masa en az beş demlik çay eskitir!" },
    { id: 61, cat: 'cay', icon: '✨', text: "Çaylar taze, taşlar taze, keyfimiz yerinde!" },
    { id: 62, cat: 'cay', icon: '📜', text: "Kaybeden çayları ısmarlar, masanın raconu budur!" },
    { id: 63, cat: 'cay', icon: '🥄', text: "Çay kaşığıyla tempo tutmayın konsantrasyonum dağılıyor!" },
    { id: 64, cat: 'cay', icon: '☕', text: "Bir çay daha içmeden bu el bitmez!" },
    { id: 65, cat: 'cay', icon: '⛽', text: "Okey masasının yakıtı tavşan kanı çaydır!" },
    { id: 66, cat: 'cay', icon: '💰', text: "Çaycıyı zengin ettik bu akşam!" },
    { id: 67, cat: 'cay', icon: '🫖', text: "Taze demlendiyse bir bardak da bana ver usta!" },
    { id: 68, cat: 'cay', icon: '💨', text: "Çayın buharı okey taşlarına değdi!" },
    { id: 69, cat: 'cay', icon: '❤️', text: "Çay koy usta, dertler bitsin eller açılsın!" },
    { id: 70, cat: 'cay', icon: '🏆', text: "Bu masa bugün kıraathanenin rekorunu kırar!" },
    { id: 71, cat: 'cay', icon: '🗣️', text: "Çaylar geldi mi beyler? Muhabbet koyulaşsın!" },
    { id: 72, cat: 'cay', icon: '☕', text: "Bize iki orta Türk kahvesi, iki demli çay çek!" },
    { id: 73, cat: 'cay', icon: '❄️', text: "Çay soğursa oyunun tadı kaçar!" },
    { id: 74, cat: 'cay', icon: '🤲', text: "Her yudumda bir taş atıyoruz maşallah!" },
    { id: 75, cat: 'cay', icon: '🏁', text: "Çay bardağındaki son yudum gibi bittim biteceğim!" },
    { id: 76, cat: 'cay', icon: '💧', text: "Garson kardeş, masaya su da bırak kuru kuruya gitmiyor!" },
    { id: 77, cat: 'cay', icon: '🪵', text: "Çayımız demli, ıstakamız düzenli!" },
    { id: 78, cat: 'cay', icon: '🎯', text: "Çayı yudumladım, taşı fırlattım!" },
    { id: 79, cat: 'cay', icon: '💵', text: "Çay paralarını toplayın, bu el bitiyor!" },
    { id: 80, cat: 'cay', icon: '🏛️', text: "Kıraathane okeysiz, okey çaysız öksüz kalır!" },
    { id: 81, cat: 'cay', icon: '🍋', text: "Çay tabağındaki limon gibi ezildiniz bu el!" },
    { id: 82, cat: 'cay', icon: '🧠', text: "Sıcak çay zihni açar, okeyi buldurur!" },
    { id: 83, cat: 'cay', icon: '👥', text: "Çay parası vermemek için çift açmaya çalışan var!" },
    { id: 84, cat: 'cay', icon: '🍀', text: "Bize bir demlik çay, masaya da bol şans!" },
    { id: 85, cat: 'cay', icon: '🎉', text: "Çaylar benden olsun, galibiyet sizden!" },

    // 🀄 OKEY & ŞÜPHE (40 adet)
    { id: 86, cat: 'okey', icon: '👀', text: "Gözüm okeyde ha, sakın sahte falan atmayın!" },
    { id: 87, cat: 'okey', icon: '📢', text: "Okey kimin elindeyse masaya vursun da bilelim!" },
    { id: 88, cat: 'okey', icon: '🔍', text: "Mavi 7'yi saklayan var masada, kalbim temiz hissediyorum!" },
    { id: 89, cat: 'okey', icon: '⭐', text: "Sahte okey atıp başımıza iş açmayın sakın!" },
    { id: 90, cat: 'okey', icon: '😉', text: "Okey bana göz kırpıyor, hissedebiliyorum!" },
    { id: 91, cat: 'okey', icon: '🎭', text: "Okeyi çeken yüzünü saklayamaz, belli edersiniz!" },
    { id: 92, cat: 'okey', icon: '💥', text: "Bir okey gelse masayı darmadağın edeceğim!" },
    { id: 93, cat: 'okey', icon: '⭐', text: "Sahte okey bile gelse razıyım şu an!" },
    { id: 94, cat: 'okey', icon: '🕳️', text: "Okey yerin dibine mi girdi neredesin mübarek?" },
    { id: 95, cat: 'okey', icon: '📦', text: "İki okey de destenin en altında kaldı kesin!" },
    { id: 96, cat: 'okey', icon: '🗿', text: "Okeyi bana atan adamın heykelini dikerim!" },
    { id: 97, cat: 'okey', icon: '🟡', text: "Gözlerim yollarda kaldı, gel artık sarı okey!" },
    { id: 98, cat: 'okey', icon: '❓', text: "Okeyi çektim mi çekmedim mi, tahmin edin bakalım!" },
    { id: 99, cat: 'okey', icon: '🔒', text: "Okeyi saklayan cebinde saklasın, masaya atamazsınız!" },
    { id: 100, cat: 'okey', icon: '🤫', text: "Okey çıkana kadar kimse nefes almasın!" },
    { id: 101, cat: 'okey', icon: '🚪', text: "Sahte okeyle biteni kıraathaneye almazlar!" },
    { id: 102, cat: 'okey', icon: '🎁', text: "Okey bende ama söylemem, sürpriz olsun!" },
    { id: 103, cat: 'okey', icon: '💔', text: "Göstergeyi görünce içim cız etti zaten!" },
    { id: 104, cat: 'okey', icon: '⚡', text: "Okeyi ortaya vurursam masa ikiye bölünür!" },
    { id: 105, cat: 'okey', icon: '🕊️', text: "Okey taşını gören cennetlik bu el!" },
    { id: 106, cat: 'okey', icon: '🧾', text: "Bana bir okey borcunuz var beyler!" },
    { id: 107, cat: 'okey', icon: '🙏', text: "Okeyi desteden çekenin eli öpülür!" },
    { id: 108, cat: 'okey', icon: '✨', text: "Sahte okey yıldız gibi parlıyor ıstakamda!" },
    { id: 109, cat: 'okey', icon: '🦁', text: "Okeyi yere atan yiğit var mı aranızda?" },
    { id: 110, cat: 'okey', icon: '👃', text: "Okey kokusu alıyorum buralarda!" },
    { id: 111, cat: 'okey', icon: '📌', text: "Gösterge bile okeyden daha çok iş yaptı!" },
    { id: 112, cat: 'okey', icon: '🌙', text: "Okey taşını rüyamda gördüm, bugün bende!" },
    { id: 113, cat: 'okey', icon: '🤔', text: "İki okey de aynı adamda olamaz değil mi?" },
    { id: 114, cat: 'okey', icon: '😏', text: "Okeyi çekenin yüzündeki o sinsi tebessüm..." },
    { id: 115, cat: 'okey', icon: '⚖️', text: "Okeyi saklamak günahtır, atın da oynayalım!" },
    { id: 116, cat: 'okey', icon: '🧭', text: "Okey benim kaderim, kaçamaz benden!" },
    { id: 117, cat: 'okey', icon: '📖', text: "Okeyi ıskartaya atan tarihe geçer!" },
    { id: 118, cat: 'okey', icon: '🧲', text: "Okey nerede ben orada, kaçışın yok!" },
    { id: 119, cat: 'okey', icon: '💔', text: "Sahte okeyle gerçek aşk yaşanmaz!" },
    { id: 120, cat: 'okey', icon: '👴', text: "Okeyi beklerken sakallarımız ağardı!" },
    { id: 121, cat: 'okey', icon: '🔥', text: "Okey dediğin el yakar, dikkatli tutun!" },
    { id: 122, cat: 'okey', icon: '📦', text: "Bu destede okeyi unuttunuz mu ne yaptınız?" },
    { id: 123, cat: 'okey', icon: '💰', text: "Okeyi bulan köşeyi döner!" },
    { id: 124, cat: 'okey', icon: '👑', text: "Okey taşının asaleti yeter be!" },
    { id: 125, cat: 'okey', icon: '🤫', text: "Okeyi çekip çaktırmayanlara selam olsun!" },

    // 🎭 RAKİPLERE TAKILMA & İĞNELEME (40 adet)
    { id: 126, cat: 'takilma', icon: '🧔', text: "Ali Dayı yine kara kara düşünmeye başladı!" },
    { id: 127, cat: 'takilma', icon: '👴', text: "Mehmet Usta gözlerini taştan ayıramıyor maşallah!" },
    { id: 128, cat: 'takilma', icon: '🧓', text: "Hasan Amca hızlı oyna kurban olayım, sabah ezanı okunacak!" },
    { id: 129, cat: 'takilma', icon: '🍂', text: "Sen o taşı atana kadar mevsimler değişti be usta!" },
    { id: 130, cat: 'takilma', icon: '🤲', text: "Taş çekerken niye öyle besmele çekip dua ediyorsun?" },
    { id: 131, cat: 'takilma', icon: '⛵', text: "Bileğine güvenen okeye dönsün, lafla peynir gemisi yürümez!" },
    { id: 132, cat: 'takilma', icon: '🌪️', text: "Masada fırtına öncesi sessizlik var, patlayacak birisi!" },
    { id: 133, cat: 'takilma', icon: '👓', text: "Hasan Amca gözlüğünü tak, taşı yanlış yere atıyorsun!" },
    { id: 134, cat: 'takilma', icon: '🕵️', text: "Mehmet Usta taş çalmaya kalkma, gözüm üstünde!" },
    { id: 135, cat: 'takilma', icon: '🏰', text: "Ali Dayı taşları öyle bir dizdi ki kale duvarı mübarek!" },
    { id: 136, cat: 'takilma', icon: '🗑️', text: "Senin çektiğin taşların hiçbiri işe yaramıyor farkında mısın?" },
    { id: 137, cat: 'takilma', icon: '🎓', text: "Bu masada acemilere yer yok, tecrübe konuşur!" },
    { id: 138, cat: 'takilma', icon: '⏰', text: "Düşün düşün nereye kadar, at artık bir taş!" },
    { id: 139, cat: 'takilma', icon: '♟️', text: "Taş seçerken satranç büyükustası gibi triplere giriyorsun!" },
    { id: 140, cat: 'takilma', icon: '🙈', text: "Istakayı gizleme bizden, ne olduğunu biliyoruz!" },
    { id: 141, cat: 'takilma', icon: '🧊', text: "Bu kadar yavaş oynarsan çaylar buz tutacak!" },
    { id: 142, cat: 'takilma', icon: '🥶', text: "Taş çekerken elin titriyor usta, heyecan yapma!" },
    { id: 143, cat: 'takilma', icon: '🏛️', text: "Bir taş atmak için bakanlar kurulunu topladın resmen!" },
    { id: 144, cat: 'takilma', icon: '⏳', text: "Hasan Amca yine bildiğimiz gibi, tek taşla bekliyor!" },
    { id: 145, cat: 'takilma', icon: '🌩️', text: "Ali Dayı'nın kaşları çatıldı, durumlar vahim galiba!" },
    { id: 146, cat: 'takilma', icon: '❌', text: "O taşı oraya koyarsan sabaha kadar bitemezsin!" },
    { id: 147, cat: 'takilma', icon: '👀', text: "Göz ucuyla bana bakma, elimde sana taş yok!" },
    { id: 148, cat: 'takilma', icon: '🤫', text: "Masanın en sessizi en tehlikelisidir derler!" },
    { id: 149, cat: 'takilma', icon: '📋', text: "Oynayacağın taşı dün geceden mi planladın mübarek?" },
    { id: 150, cat: 'takilma', icon: '🧩', text: "Taşların yerini değiştirmekle perler tamamlanmıyor yalnız!" },
    { id: 151, cat: 'takilma', icon: '😮‍💨', text: "Mehmet Usta derin nefes aldı, eyvahlar olsun!" },
    { id: 152, cat: 'takilma', icon: '🙃', text: "Istakan ters duruyor haberin yok!" },
    { id: 153, cat: 'takilma', icon: '🐢', text: "Kıraathanenin en sabırlı insanı bile senin taş atmanı bekleyemez!" },
    { id: 154, cat: 'takilma', icon: '🗳️', text: "Sen taş atana kadar memleket iki seçim atlattı!" },
    { id: 155, cat: 'takilma', icon: '🃏', text: "Bu masada blöf sökmez dayı, taşını göster!" },
    { id: 156, cat: 'takilma', icon: '👥', text: "Çift açacak adamın hali bir başka oluyor canım!" },
    { id: 157, cat: 'takilma', icon: '⚠️', text: "Bana yandan taş verme, zehir zemberek atıyorsun!" },
    { id: 158, cat: 'takilma', icon: '😶', text: "Gözlerini taştan kaçırma, suçlu gibi bakıyorsun!" },
    { id: 159, cat: 'takilma', icon: '👨‍🏫', text: "Masada üç usta bir acemi var, acemiyi söylemeyeyim!" },
    { id: 160, cat: 'takilma', icon: '💥', text: "Taş çekerken desteyi devireceksin yavaş ol!" },
    { id: 161, cat: 'takilma', icon: '🛡️', text: "Istakanı biraz daha kendine çek de kimse görmesin bari!" },
    { id: 162, cat: 'takilma', icon: '🕵️', text: "Yine ne planlar peşindesin Ali Dayı?" },
    { id: 163, cat: 'takilma', icon: '🍵', text: "Hasan Amca çayından bir yudum al da elin rahatlasın!" },
    { id: 164, cat: 'takilma', icon: '🧘', text: "Sizinle oynamak tam bir sabır imtihanı beyler!" },
    { id: 165, cat: 'takilma', icon: '😄', text: "Gülme komşuna, gelir başına derler!" },

    // 🏆 İDDİA & ZAFER SÖZLERİ (35 adet)
    { id: 166, cat: 'zafer', icon: '👑', text: "Bu el bende beyler, toplanın masanın fatihi geliyor!" },
    { id: 167, cat: 'zafer', icon: '💓', text: "Biteceğim galiba, kalbi olan gözünü kapatsın!" },
    { id: 168, cat: 'zafer', icon: '✌️', text: "İki taşa biterim, demedi demeyin sonra şaşırmayın!" },
    { id: 169, cat: 'zafer', icon: '🏆', text: "Kıraathanenin şampiyonu belli oldu, dağılabilirsiniz!" },
    { id: 170, cat: 'zafer', icon: '🧹', text: "Masayı süpüreceğim bu gidişle, tozunu bile bırakmam!" },
    { id: 171, cat: 'zafer', icon: '💣', text: "Hazır mısınız beyler? Elimi açarsam olay çıkar!" },
    { id: 172, cat: 'zafer', icon: '🎯', text: "Son taşımı bekliyorum, gelirse masayı terk edin!" },
    { id: 173, cat: 'zafer', icon: '🌟', text: "Bugün benim günüm, şans değil tamamen ustalık!" },
    { id: 174, cat: 'zafer', icon: '🔥', text: "Biteceğim taşı elimde tutuyorum, heyecan dorukta!" },
    { id: 175, cat: 'zafer', icon: '☕', text: "Bu eli alırsam çaylar benden, alamazsam yine benden!" },
    { id: 176, cat: 'zafer', icon: '📢', text: "Bitiş taşını öyle bir vuracağım ki yankısı karşı yakadan duyulacak!" },
    { id: 177, cat: 'zafer', icon: '✍️', text: "Perler ip gibi dizildi, geriye bir imza kaldı!" },
    { id: 178, cat: 'zafer', icon: '🏰', text: "Kıraathanenin efendisi kimmiş herkes görecek!" },
    { id: 179, cat: 'zafer', icon: '✨', text: "Elim öyle bir oldu ki okey bile kıskanır!" },
    { id: 180, cat: 'zafer', icon: '💵', text: "Bir sonraki tur çayları söyleyin, hesap benden değil!" },
    { id: 181, cat: 'zafer', icon: '🚀', text: "Çifte gitmiyorum, direkt şampiyonluğa gidiyorum!" },
    { id: 182, cat: 'zafer', icon: '🔮', text: "Taşlar bana fısıldıyor: 'Biteceksin usta!' diyor!" },
    { id: 183, cat: 'zafer', icon: '📜', text: "Bu masada tarih yazılıyor, şahit olun!" },
    { id: 184, cat: 'zafer', icon: '⚖️', text: "Elimi açtığımda itiraz kabul etmiyorum!" },
    { id: 185, cat: 'zafer', icon: '⚡', text: "Okeyi ortaya çarpıp masayı inletmek üzeriyim!" },
    { id: 186, cat: 'zafer', icon: '🌍', text: "Böyle bir dizilim dünya okey tarihinde görülmedi!" },
    { id: 187, cat: 'zafer', icon: '🎖️', text: "Zafer inananlarındır, ben sonuna kadar inanıyorum!" },
    { id: 188, cat: 'zafer', icon: '🌊', text: "Biteceğim taşı saklayamazsınız, bana doğru akıyor!" },
    { id: 189, cat: 'zafer', icon: '👑', text: "Masanın kralı tahtına oturmak üzere!" },
    { id: 190, cat: 'zafer', icon: '🥊', text: "Gözünüzü seveyim erken havlu atmayın, daha yeni başladık!" },
    { id: 191, cat: 'zafer', icon: '🪵', text: "Bu eli ben almazsam ıstakayı kırar bırakırım!" },
    { id: 192, cat: 'zafer', icon: '🏁', text: "Son düzlüğe girdik, şampiyonluk kupasını hazırlayın!" },
    { id: 193, cat: 'zafer', icon: '😎', text: "Bitecek adamın hali belli olur, bana bakın anlarsınız!" },
    { id: 194, cat: 'zafer', icon: '🧱', text: "Perlerim tamam, serilerim sağlam, taşım havada!" },
    { id: 195, cat: 'zafer', icon: '💥', text: "Masaya okeyi vurup 'BİTTİM!' demek paha biçilemez!" },
    { id: 196, cat: 'zafer', icon: '📖', text: "Kıraathane efsaneleri arasına adımı yazdırıyorum!" },
    { id: 197, cat: 'zafer', icon: '🗣️', text: "Bu el biterse bir hafta konuşulur benden söylemesi!" },
    { id: 198, cat: 'zafer', icon: '🎭', text: "Hazır olun, son perde kapanıyor!" },
    { id: 199, cat: 'zafer', icon: '🎺', text: "İşte şampiyonun gelişi böyle olur!" },
    { id: 200, cat: 'zafer', icon: '🎉', text: "BİTTİM BEYLER! Masanın hesabı kimdeyse ödesin!" }
];

class OkeyGame {
    constructor() {
        this.colors = ['kirmizi', 'sari', 'mavi', 'siyah'];
        this.deck = [];
        this.indicator = null; // Gösterge taşı
        this.okeyTile = null;   // Okey taşı (göstergenin 1 fazlası)
        
        // 2 Katlı Istaka: 28 Slot (0-13: Üst Kat, 14-27: Alt Kat)
        this.playerRack = new Array(28).fill(null);
        this.selectedSlotIndex = null;
        this.draggedSlotIndex = null;
        this.hasDrawn = false; // Turunda taş çekti mi?
        this.gameOver = false;
        this.botTimeout = null;

        // Iskartalar (4 Oyuncunun Atılan Taşları)
        // Sıra: Siz (0) -> Ali Dayı (1) -> Mehmet Usta (2) -> Hasan Amca (3) -> Siz (0)
        this.discards = {
            player: [], // Sizin sağınıza attığınız taş (Ali Dayı'nın solundaki taş)
            ali: [],    // Ali Dayı'nın Mehmet Usta'ya attığı taş
            mehmet: [], // Mehmet Usta'nın Hasan Amca'ya attığı taş
            hasan: []   // Hasan Amca'nın attığı taş (SİZİN SOLUNUZDAKİ - Yandan alabileceğiniz taş!)
        };

        // Rakipler (Gerçek el tutan yapay zekalar)
        this.bots = [
            { id: 'ali', name: "Ali Dayı", avatar: "🧔", hand: [] },
            { id: 'mehmet', name: "Mehmet Usta", avatar: "👴", hand: [] },
            { id: 'hasan', name: "Hasan Amca", avatar: "🧓", hand: [] }
        ];

        this.turn = 0; // 0: Oyuncu, 1: Ali Dayı, 2: Mehmet Usta, 3: Hasan Amca
        this.currentChatCategory = 'all';

        // Oyun türü: 'klasik' (14 taş) veya '101' (21 taş)
        this.gameMode = 'klasik';
        this.opened101 = false;
        this.openedMelds = [];
        this.lastBill = null;

        // Kıraathane sipariş / hesap defteri
        this.tabItems = [];
        this.tabTotal = 0;

        // Turnuva skoru ve el geçmişi
        this.matchTarget = 1010;
        this.matchScores = { player: 0, ali: 0, mehmet: 0, hasan: 0 };
        this.teamScores = { biz: 0, onlar: 0 };
        this.handHistory = [];
        this.handNumber = 0;
        this.matchChampion = null;
        this.handRecordedForGame = false;
        this.storageKey = 'otag_okey_match_v1';
        this.loadMatchState();

        this.initElements();
    }

    initElements() {
        this.istakaTopEl = document.getElementById('istakaTopRow');
        this.istakaBottomEl = document.getElementById('istakaBottomRow');
        this.indicatorEl = document.getElementById('okeyIndicator');
        this.okeyInfoEl = document.getElementById('okeyInfo');
        this.deckCountEl = document.getElementById('deckCount');
        this.centerDeckEl = document.getElementById('centerDeck');
        this.statusMsgEl = document.getElementById('okeyStatusMsg');
        this.turnLabelEl = document.getElementById('turnLabel');
        this.playerBubbleEl = document.getElementById('playerBubble');

        // Iskarta Alanları
        this.discardHasanEl = document.getElementById('discardHasan');
        this.discardPlayerEl = document.getElementById('discardPlayer');
        this.discardMehmetEl = document.getElementById('discardMehmet');
        this.discardAliEl = document.getElementById('discardAli');

        this.zoneDiscardHasanEl = document.getElementById('zoneDiscardHasan');
        this.zoneDiscardPlayerEl = document.getElementById('zoneDiscardPlayer');

        // Avatar Kutuları & Balonlar
        this.botLeftContainer = document.getElementById('botLeftContainer');
        this.botTopContainer = document.getElementById('botTopContainer');
        this.botRightContainer = document.getElementById('botRightContainer');

        this.botLeftAvatarBox = document.getElementById('botLeftAvatarBox');
        this.botTopAvatarBox = document.getElementById('botTopAvatarBox');
        this.botRightAvatarBox = document.getElementById('botRightAvatarBox');

        this.botLeftCount = document.getElementById('botLeftCount');
        this.botTopCount = document.getElementById('botTopCount');
        this.botRightCount = document.getElementById('botRightCount');

        this.botLeftBubble = document.getElementById('botLeftBubble');
        this.botTopBubble = document.getElementById('botTopBubble');
        this.botRightBubble = document.getElementById('botRightBubble');

        // Chat Elemanları
        this.chatModal = document.getElementById('okeyChatModal');
        this.chatPhrasesList = document.getElementById('chatPhrasesList');
        this.chatSearchInput = document.getElementById('chatSearchInput');

        // Sipariş & hesap elemanları
        this.tabItemsEl = document.getElementById('okeyTabItems');
        this.tabTotalEl = document.getElementById('okeyTabTotal');
        this.menuEl = document.getElementById('okeyMenu');

        // Skor geçmişi elemanları
        this.scoreCardsEl = document.getElementById('okeyScoreCards');
        this.scoreHistoryEl = document.getElementById('okeyScoreHistory');
        this.scoreNoteEl = document.getElementById('okeyScoreNote');
        this.matchTargetEl = document.getElementById('okeyMatchTarget');
        this.dockHandValueEl = document.getElementById('okeyDockHandValue');
        this.dockTargetEl = document.getElementById('okeyDockTarget');
        this.dockScoreEl = document.getElementById('okeyDockScore');
        this.openBoardEl = document.getElementById('okeyOpenBoard');
        this.openedMeldsEl = document.getElementById('okeyOpenedMelds');
        this.lastDiscardEl = document.getElementById('okeyLastDiscard');
        this.selectedPreviewEl = document.getElementById('okeySelectedPreview');
        this.selectedPreviewTileEl = document.getElementById('okeySelectedTile');
        this.selectedPreviewTextEl = document.getElementById('okeySelectedText');

        // 101 açılış modalı
        this.openModal = document.getElementById('okeyOpenModal');
        this.openMeldsEl = document.getElementById('okeyOpenMelds');
        this.openTitleEl = document.getElementById('okeyOpenTitle');
        this.openDescEl = document.getElementById('okeyOpenDesc');

        // Düğmeler
        const btnDrawDeck = document.getElementById('btnDrawDeck');
        const btnDrawSide = document.getElementById('btnDrawSide');
        const btnDiscard = document.getElementById('btnDiscardTile');
        const btnSortRuns = document.getElementById('btnSortRuns');
        const btnSortPairs = document.getElementById('btnSortPairs');
        const btnFinishOkey = document.getElementById('btnFinishOkey');
        const btnNewGame = document.getElementById('btnNewOkeyGame');
        const btnPlayerChat = document.getElementById('btnPlayerChat');
        const btnRandomShout = document.getElementById('btnRandomShout');
        const btnCloseOkeyChat = document.getElementById('btnCloseOkeyChat');
        const btnChatRandom = document.getElementById('btnChatRandom');
        const btnOpen101 = document.getElementById('btnOpen101');
        const btnOpenPairs101 = document.getElementById('btnOpenPairs101');
        const btnCloseOkeyOpen = document.getElementById('btnCloseOkeyOpen');
        const btnOkeyCustomChat = document.getElementById('btnOkeyCustomChat');
        const btnOkeyCustomRandom = document.getElementById('btnOkeyCustomRandom');
        const customChatInput = document.getElementById('okeyCustomChatInput');
        this.customChatInput = customChatInput;

        if (btnDrawDeck) btnDrawDeck.addEventListener('click', () => this.playerDrawFromDeck());
        if (this.centerDeckEl) this.centerDeckEl.addEventListener('click', (e) => {
            if (e.target.id !== 'btnDrawDeck') this.playerDrawFromDeck();
        });

        if (btnDrawSide) btnDrawSide.addEventListener('click', () => this.playerDrawFromSide());
        if (this.zoneDiscardHasanEl) {
            this.zoneDiscardHasanEl.addEventListener('click', (e) => {
                if (e.target.id !== 'btnDrawSide') this.playerDrawFromSide();
            });
        }

        if (btnDiscard) btnDiscard.addEventListener('click', () => this.playerDiscardSelected());
        if (this.zoneDiscardPlayerEl) {
            this.zoneDiscardPlayerEl.addEventListener('click', () => {
                if (this.hasDrawn && this.selectedSlotIndex !== null) {
                    this.playerDiscardSelected();
                }
            });
            // Drag and Drop hedefini destekle
            this.zoneDiscardPlayerEl.addEventListener('dragover', (e) => {
                e.preventDefault();
                this.zoneDiscardPlayerEl.classList.add('drag-over');
            });
            this.zoneDiscardPlayerEl.addEventListener('dragleave', () => {
                this.zoneDiscardPlayerEl.classList.remove('drag-over');
            });
            this.zoneDiscardPlayerEl.addEventListener('drop', (e) => {
                e.preventDefault();
                this.zoneDiscardPlayerEl.classList.remove('drag-over');
                if (this.draggedSlotIndex !== null) {
                    this.selectedSlotIndex = this.draggedSlotIndex;
                    this.playerDiscardSelected();
                }
            });
        }

        if (btnSortRuns) btnSortRuns.addEventListener('click', () => this.sortPlayerHandRuns());
        if (btnSortPairs) btnSortPairs.addEventListener('click', () => this.sortPlayerHandPairs());
        if (btnFinishOkey) btnFinishOkey.addEventListener('click', () => this.checkWinCondition());
        if (btnNewGame) btnNewGame.addEventListener('click', () => this.startNewGame());

        // Laf Atma / Chat Olayları
        if (btnPlayerChat) btnPlayerChat.addEventListener('click', () => this.openChatModal());
        if (btnRandomShout) btnRandomShout.addEventListener('click', () => this.playerRandomShout());
        if (btnCloseOkeyChat) btnCloseOkeyChat.addEventListener('click', () => this.closeChatModal());
        if (btnChatRandom) btnChatRandom.addEventListener('click', () => {
            this.playerRandomShout();
            this.closeChatModal();
        });

        if (this.chatSearchInput) {
            this.chatSearchInput.addEventListener('input', () => {
                this.renderChatPhrases(this.chatSearchInput.value, this.currentChatCategory);
            });
        }

        const catBtns = document.querySelectorAll('.chat-cat-btn');
        catBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                catBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentChatCategory = btn.dataset.cat;
                const query = this.chatSearchInput ? this.chatSearchInput.value : '';
                this.renderChatPhrases(query, this.currentChatCategory);
            });
        });

        // 101 Okey düğmeleri ve açılış modalı
        if (btnOpen101) btnOpen101.addEventListener('click', () => this.openHand101(false));
        if (btnOpenPairs101) btnOpenPairs101.addEventListener('click', () => this.openHand101(true));
        if (btnCloseOkeyOpen && this.openModal) {
            btnCloseOkeyOpen.addEventListener('click', () => this.openModal.classList.remove('show'));
        }

        // Serbest laf yazma kutusu (klasik ve 101'de aynı)
        const sendCustomChat = () => {
            if (!customChatInput) return;
            const text = customChatInput.value.trim();
            if (!text) {
                this.setStatus('Laf atmak için önce kutuya bir şey yazın.');
                return;
            }
            this.playerSay(text);
            customChatInput.value = '';
        };
        if (btnOkeyCustomChat) btnOkeyCustomChat.addEventListener('click', sendCustomChat);
        if (customChatInput) {
            customChatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    sendCustomChat();
                }
            });
        }
        if (btnOkeyCustomRandom && customChatInput) {
            btnOkeyCustomRandom.addEventListener('click', () => {
                const item = OKEY_PHRASES_200[Math.floor(Math.random() * OKEY_PHRASES_200.length)];
                customChatInput.value = item.text;
                customChatInput.focus();
                if (window.turkishSound) window.turkishSound.playTileClick();
            });
        }

        const btnClearSelected = document.getElementById('btnClearSelected');
        if (btnClearSelected) {
            btnClearSelected.addEventListener('click', () => {
                this.selectedSlotIndex = null;
                this.renderPlayerRack();
                this.setStatus('Taş seçimi temizlendi. Yeni bir taşa dokunabilirsiniz.');
            });
        }

        // Menüden sipariş verme
        if (this.menuEl) {
            this.menuEl.querySelectorAll('[data-order]').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.orderItem(btn.dataset.order, Number(btn.dataset.price), 'Siz');
                });
            });
        }

        // Skor sıfırlama
        const btnResetScore = document.getElementById('btnResetOkeyScore');
        if (btnResetScore) {
            btnResetScore.addEventListener('click', () => {
                this.resetMatch();
                if (window.showToast) window.showToast('Turnuva skoru ve el geçmişi sıfırlandı.', '🧹');
            });
        }

        this.updateModeUI();
        this.renderScoreboard();
    }

    /* ========================================================
       OYUN TÜRÜ: KLASİK OKEY / 101 OKEY
       ======================================================== */
    setGameMode(mode) {
        if (!['klasik', '101', '101-esli'].includes(mode)) return;
        const changed = this.gameMode !== mode;
        this.gameMode = mode;
        if (changed) this.resetMatch();
        this.updateModeUI();
        this.startNewGame();
    }

    is101Mode() {
        return this.gameMode === '101' || this.gameMode === '101-esli';
    }

    isTeamMode() {
        return this.gameMode === '101-esli';
    }

    teamKey(key) {
        return (key === 'player' || key === 'mehmet') ? 'biz' : 'onlar';
    }

    getTeamLabel(team) {
        return team === 'biz'
            ? 'Biz (Siz + Mehmet Usta)'
            : 'Onlar (Ali Dayı + Hasan Amca)';
    }

    updateModeUI() {
        const is101 = this.is101Mode();
        const isTeam = this.isTeamMode();
        document.querySelectorAll('[data-okey-mode]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.okeyMode === this.gameMode);
        });
        const note = document.getElementById('okeyModeNote');
        if (note) {
            if (isTeam) {
                note.textContent = '101 Eşli: Mehmet Usta ortağınız, Ali Dayı ve Hasan Amca rakip takım. Açılış 101 puan / 7 çift; takım puanları 1010 hedefine kadar birikir.';
            } else if (is101) {
                note.textContent = '101 Okey: 21 taşla perleri kur; açılış 101 puan veya 7 çift. Bitişte kalan 21 taşın tamamı per olmalı; el açılırken perler animasyonla serilir.';
            } else {
                note.textContent = 'Klasik kıraathane okeyi: 14 taşla perleri tamamla, 15. taşı atarak bitir.';
            }
        }
        const finishBtn = document.getElementById('btnFinishOkey');
        if (finishBtn) {
            finishBtn.textContent = isTeam
                ? '🏆 BİTTİM! (Eşli 101\'i Bitir)'
                : (is101 ? '🏆 BİTTİM! (101 Elini Bitir)' : '🏆 BİTTİM! (Okey Aç)');
        }
        const openBtn = document.getElementById('btnOpen101');
        if (openBtn) {
            openBtn.hidden = !is101;
            openBtn.disabled = this.opened101;
            openBtn.textContent = this.opened101 ? '✅ Açıldı' : (isTeam ? '🤝 Seri Aç' : '🀄 Seri Aç');
        }
        const openPairsBtn = document.getElementById('btnOpenPairs101');
        if (openPairsBtn) {
            openPairsBtn.hidden = !is101;
            openPairsBtn.disabled = this.opened101;
            openPairsBtn.textContent = this.opened101 ? '✅ Açıldı' : '👥 Çift Aç';
        }
        const railNote = document.getElementById('okeyRailNote');
        if (railNote) {
            railNote.textContent = isTeam
                ? 'Eşli 101: Seri Aç (101 puan) veya Çift Aç (7 çift) ile takımına kapı aç.'
                : (is101
                    ? '101: Seri Aç (101 puan) veya Çift Aç (7 çift). Taş İşle ile seçili taşı at.'
                    : 'Klasik oyunda 14 taşı perle ve 15. taşı atarak bitir.');
        }
        if (this.scoreNoteEl) {
            this.scoreNoteEl.textContent = isTeam
                ? 'Ortaklı 101 turnuvası: el kazanan takım 101 + rakip takımın kalan taş puanını alır. İlk 1010 puana ulaşan takım şampiyon olur.'
                : (is101
                    ? '101 turnuvası: kazanan 101 + rakiplerin kalan taş puanını alır; her el geçmişe kaydedilir. İlk 1010 puana ulaşan şampiyon olur.'
                    : 'Klasik masada her el bir galibiyet olarak geçmişe yazılır. Skoru sıfırlayıp yeni bir seri başlatabilirsiniz.');
        }
        if (this.matchTargetEl) {
            this.matchTargetEl.textContent = is101 ? '1010 puan' : 'El sayısı';
        }
        this.renderScoreboard();
        this.updateDockStats();
    }

    updateDockStats() {
        if (!this.dockHandValueEl && !this.dockTargetEl && !this.dockScoreEl) return;
        const is101 = this.is101Mode();
        if (this.dockHandValueEl) {
            const handValue = this.playerRack
                .filter(Boolean)
                .reduce((sum, tile) => sum + this.tileScore(tile), 0);
            this.dockHandValueEl.textContent = handValue;
        }
        if (this.dockTargetEl) {
            const myScore = this.isTeamMode() ? this.teamScores.biz : this.matchScores.player;
            this.dockTargetEl.textContent = is101 ? Math.max(0, this.matchTarget - myScore) : '';
            const targetWrap = this.dockTargetEl.closest('.okey-dock-target');
            if (targetWrap) targetWrap.style.display = is101 ? '' : 'none';
        }
        if (this.dockScoreEl) {
            this.dockScoreEl.textContent = this.isTeamMode() ? this.teamScores.biz : this.matchScores.player;
        }
    }

    openChatModal() {
        if (!this.chatModal) return;
        this.chatModal.classList.add('show');
        if (this.chatSearchInput) this.chatSearchInput.value = '';
        this.renderChatPhrases('', this.currentChatCategory);
    }

    closeChatModal() {
        if (!this.chatModal) return;
        this.chatModal.classList.remove('show');
    }

    renderChatPhrases(filterQuery = '', category = 'all') {
        if (!this.chatPhrasesList) return;
        this.chatPhrasesList.innerHTML = '';

        const q = filterQuery.toLowerCase().trim();
        const filtered = OKEY_PHRASES_200.filter(p => {
            const matchCat = category === 'all' || p.cat === category;
            const matchSearch = q === '' || p.text.toLowerCase().includes(q);
            return matchCat && matchSearch;
        });

        if (filtered.length === 0) {
            this.chatPhrasesList.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #888; padding: 20px;">Aradığınız laf bulunamadı.</div>`;
            return;
        }

        filtered.forEach(p => {
            const item = document.createElement('div');
            item.className = 'chat-phrase-item';
            item.innerHTML = `<span class="phrase-icon">${p.icon}</span> <span>${p.text}</span>`;
            item.addEventListener('click', () => {
                this.playerSay(p.text);
                this.closeChatModal();
            });
            this.chatPhrasesList.appendChild(item);
        });
    }

    playerRandomShout() {
        const item = OKEY_PHRASES_200[Math.floor(Math.random() * OKEY_PHRASES_200.length)];
        this.playerSay(item.text);
    }

    playerSay(text) {
        if (this.playerBubbleEl) {
            this.playerBubbleEl.textContent = `Siz: "${text}"`;
            this.playerBubbleEl.classList.add('show');
            if (this.playerBubbleTimeout) clearTimeout(this.playerBubbleTimeout);
            this.playerBubbleTimeout = setTimeout(() => {
                this.playerBubbleEl.classList.remove('show');
            }, 3400);
        }
        if (window.turkishSound) window.turkishSound.playTileClick();
        this.setStatus(`💬 Siz masaya laf attınız: "${text}"`);

        // Botların %40 ihtimalle oyuncuya hazırcevap karşılık vermesi!
        if (Math.random() < 0.45) {
            setTimeout(() => {
                const botIdx = Math.floor(Math.random() * 3);
                const bot = this.bots[botIdx];
                const bubbles = [this.botRightBubble, this.botTopBubble, this.botLeftBubble];
                const bubble = bubbles[botIdx];

                const retorts = [
                    "Laf yetiştireceğine taşını oyna koçum!",
                    "Biz bu masalarda saç ağarttık, lafla okey bitmez!",
                    "Sen önce önündeki çayı bitir de konuş!",
                    "Hasan Amca'nı hafife alma, bu el bende bilesin!",
                    "Taşın konuşsun, dilin değil usta!",
                    "Ali Dayı'ya racon kesilmez, taş kesilir!",
                    "İddialı laflar bunlar, masada göreceğiz!"
                ];
                const retort = retorts[Math.floor(Math.random() * retorts.length)];
                if (bubble) {
                    bubble.textContent = `${bot.name}: "${retort}"`;
                    bubble.classList.add('show');
                    setTimeout(() => bubble.classList.remove('show'), 2800);
                }
            }, 1100);
        }
    }

    createDeck() {
        const deck = [];
        let idCounter = 1;

        // 4 renk, 1-13 arası sayılar, 2'şer adet = 104 taş
        for (let set = 0; set < 2; set++) {
            for (const color of this.colors) {
                for (let num = 1; num <= 13; num++) {
                    deck.push({
                        id: idCounter++,
                        color: color,
                        num: num,
                        isFake: false
                    });
                }
            }
        }

        // 2 adet Sahte Okey (Yıldızlı)
        deck.push({ id: idCounter++, color: 'sahte', num: '★', isFake: true });
        deck.push({ id: idCounter++, color: 'sahte', num: '★', isFake: true });

        // Fisher-Yates Karıştırma
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }

        return deck;
    }

    startNewGame() {
        if (this.botTimeout) clearTimeout(this.botTimeout);
        this.gameOver = false;
        this.deck = this.createDeck();
        const is101 = this.is101Mode();
        const isTeam = this.isTeamMode();
        const handSize = is101 ? 21 : 14;

        // Gösterge Taşı Belirle (Sahte okey gösterge olamaz)
        let indIdx = 0;
        while (this.deck[indIdx].isFake) indIdx++;
        this.indicator = this.deck.splice(indIdx, 1)[0];

        // Okey Taşı: Gösterge ile aynı renk, 1 fazlası (13 ise 1 olur)
        const okeyNum = this.indicator.num === 13 ? 1 : this.indicator.num + 1;
        this.okeyTile = {
            color: this.indicator.color,
            num: okeyNum
        };

        // 2 Katlı Istakayı sıfırla
        this.playerRack = new Array(28).fill(null);

        // Taşları Dağıt
        const dealt = this.deck.splice(0, handSize);
        for (let i = 0; i < handSize; i++) {
            this.playerRack[i] = dealt[i];
        }

        // Botlara gerçek taş dağıt
        this.bots[0].hand = this.deck.splice(0, handSize); // Ali Dayı
        this.bots[1].hand = this.deck.splice(0, handSize); // Mehmet Usta
        this.bots[2].hand = this.deck.splice(0, handSize); // Hasan Amca
        this.bots.forEach(bot => { bot.opened101 = false; });

        // 101 Okey'de başlayan oyuncu 22. taşı çeker
        if (is101 && this.deck.length > 0) {
            this.playerRack[handSize] = this.deck.pop();
        }

        // Iskartaları Temizle
        this.discards = { player: [], ali: [], mehmet: [], hasan: [] };

        this.turn = 0;
        this.hasDrawn = is101;
        this.selectedSlotIndex = null;
        this.draggedSlotIndex = null;
        this.opened101 = false;
        this.openedMelds = [];
        this.lastDiscard = null;
        this.renderOpenedMelds();
        this.renderLastDiscard();
        this.handRecordedForGame = false;
        this.tabItems = [];
        this.tabTotal = 0;
        this.renderTab();
        this.clearBill();
        this.updateModeUI();
        if (this.openModal) this.openModal.classList.remove('show');

        // Oyuncu elini serilere göre şık bir şekilde diz
        this.sortPlayerHandRuns();
        this.updateAllUI();
        this.renderScoreboard();
        this.setStatus(isTeam
            ? 'Eşli 101 başladı! Ortağınız Mehmet Usta. 22 taşınız var; “Eli Aç (Eşli 101)” ile perleri açıp takımınıza puan kazandırın.'
            : (is101
                ? '101 Okey başladı! 22 taşınız var. Perleri kurup “Eli Aç (101)” ile açabilir veya bir taş atabilirsiniz.'
                : "Oyun başladı! Sıra sizde: Desteden veya Hasan Amca'nın attığı taşa tıklayarak taş çekin."));
        if (window.turkishSound) window.turkishSound.playTileDraw();
    }

    /* ========================================================
       KIRAATHANE SİPARİŞ & HESAP DEFTERİ
       ======================================================== */
    orderItem(name, price, by, options = {}) {
        if (!name || !Number.isFinite(price)) return;
        const item = {
            name,
            price,
            by: by || 'Siz',
            forPlayer: Boolean(options.forPlayer),
            note: options.note || ''
        };
        this.tabItems.push(item);
        this.tabTotal += price;
        this.renderTab();

        if (by === 'Siz') {
            if (this.playerBubbleEl) {
                this.playerBubbleEl.textContent = `Siz: "Çaycı! ${name} söyledim, masaya gelsin!"`;
                this.playerBubbleEl.classList.add('show');
                if (this.playerBubbleTimeout) clearTimeout(this.playerBubbleTimeout);
                this.playerBubbleTimeout = setTimeout(() => this.playerBubbleEl.classList.remove('show'), 3000);
            }
            this.setStatus(`☕ Masaya ${name} söylediniz (${price} ₺). Afiyet olsun!`);
        }
        if (window.turkishSound) window.turkishSound.playTileClick();
    }

    botMaybeOrder(bot, bubble) {
        if (Math.random() > 0.3) return;
        const menu = [
            { name: 'Çay', price: 15 },
            { name: 'Türk Kahvesi', price: 40 },
            { name: 'Ihlamur', price: 20 },
            { name: 'Simit', price: 12 },
            { name: 'Gazoz', price: 25 },
            { name: 'Kurabiye', price: 18 }
        ];
        const item = menu[Math.floor(Math.random() * menu.length)];
        const treatsPlayer = Math.random() < 0.42;
        this.orderItem(item.name, item.price, bot.name, { forPlayer: treatsPlayer });

        const text = treatsPlayer
            ? `Bu ${item.name} benden sana, afiyet olsun!`
            : `Çaycı, bize bir ${item.name} söyle!`;
        if (bubble) {
            bubble.textContent = `${bot.name}: "${text}"`;
            bubble.classList.add('show');
            setTimeout(() => bubble.classList.remove('show'), 2600);
        }
        if (window.showToast) {
            window.showToast(`${bot.name} ${treatsPlayer ? 'size' : 'masaya'} ${item.name} ısmarladı! (${item.price} ₺)`, treatsPlayer ? '🎁' : '☕');
        }
    }

    renderTab() {
        if (this.tabTotalEl) this.tabTotalEl.textContent = `${this.tabTotal} ₺`;
        if (!this.tabItemsEl) return;

        if (this.tabItems.length === 0) {
            this.tabItemsEl.innerHTML = '<span class="service-empty">Henüz sipariş yok. Masaya ilk çayı siz söyleyin!</span>';
            return;
        }

        const groups = new Map();
        for (const item of this.tabItems) {
            const key = `${item.name}|${item.price}`;
            if (!groups.has(key)) {
                groups.set(key, { name: item.name, price: item.price, count: 0, by: new Set(), treats: 0 });
            }
            const group = groups.get(key);
            group.count += 1;
            group.by.add(item.by);
            if (item.forPlayer) group.treats += 1;
        }

        this.tabItemsEl.innerHTML = Array.from(groups.values()).map(group => {
            const byText = Array.from(group.by).join(', ');
            const treatText = group.treats > 0 ? ` · ${group.treats} ikram` : '';
            return `<div class="service-tab-line">
                <span class="service-line-name">${group.count}× ${group.name}<small>${byText}${treatText}</small></span>
                <span class="service-line-price">${group.count * group.price} ₺</span>
            </div>`;
        }).join('');
    }

    renderBill(winnerName, winnerAvatar, playerWon) {
        const billEl = document.getElementById('okeyModalBill');
        this.lastBill = { winnerName, winnerAvatar, playerWon, total: this.tabTotal, items: this.tabItems.slice() };
        if (!billEl) return;

        const groups = new Map();
        for (const item of this.tabItems) {
            const key = `${item.name}|${item.price}`;
            if (!groups.has(key)) groups.set(key, { name: item.name, price: item.price, count: 0 });
            groups.get(key).count += 1;
        }
        const lines = Array.from(groups.values())
            .map(g => `<span class="bill-line">${g.count}× ${g.name} <strong>${g.count * g.price} ₺</strong></span>`)
            .join('');

        const payText = this.tabTotal > 0
            ? (playerWon
                ? (this.isTeamMode()
                    ? 'Hesabı kazanan takım (siz ve ortağınız) ödedi. Kıraathane raconu budur!'
                    : 'Hesabı kazanan olarak siz ödediniz. Kıraathane raconu budur!')
                : `Hesabı kazanan ${winnerName} ödedi. Çaylar onlardan!`)
            : 'Bu elde hesap kabarmadı; masa temiz.';

        billEl.innerHTML = `
            <div class="bill-head">
                <span class="bill-winner-icon">${winnerAvatar || '🏆'}</span>
                <div>
                    <span class="bill-kicker">KAZANANIN MASASI</span>
                    <strong class="bill-winner-name">${winnerName}</strong>
                </div>
                <span class="bill-total">${this.tabTotal} ₺</span>
            </div>
            <div class="bill-lines">${lines || '<span class="bill-empty">Sipariş yok</span>'}</div>
            <div class="bill-pay-note">🧾 ${payText}</div>
        `;
        billEl.classList.add('show');
    }

    clearBill() {
        const billEl = document.getElementById('okeyModalBill');
        if (billEl) {
            billEl.classList.remove('show');
            billEl.innerHTML = '';
        }
        this.lastBill = null;
    }

    /* ========================================================
       TURNUVA SKORU, EŞLİ TAKIM PUANI VE EL GEÇMİŞİ
       ======================================================== */
    resetMatch() {
        this.matchScores = { player: 0, ali: 0, mehmet: 0, hasan: 0 };
        this.teamScores = { biz: 0, onlar: 0 };
        this.handHistory = [];
        this.handNumber = 0;
        this.matchChampion = null;
        this.updateModeUI();
        this.saveMatchState();
    }

    saveMatchState() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify({
                mode: this.gameMode,
                matchScores: this.matchScores,
                teamScores: this.teamScores,
                handHistory: this.handHistory,
                handNumber: this.handNumber,
                matchChampion: this.matchChampion
            }));
        } catch (err) {
            // Yerel kayıt kapalıysa oyun akışı devam eder.
        }
    }

    loadMatchState() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            if (!raw) return;
            const saved = JSON.parse(raw);
            if (!saved || typeof saved !== 'object') return;

            if (['klasik', '101', '101-esli'].includes(saved.mode)) {
                this.gameMode = saved.mode;
            }
            if (saved.matchScores) {
                for (const key of ['player', 'ali', 'mehmet', 'hasan']) {
                    if (Number.isFinite(saved.matchScores[key])) this.matchScores[key] = saved.matchScores[key];
                }
            }
            if (saved.teamScores) {
                for (const key of ['biz', 'onlar']) {
                    if (Number.isFinite(saved.teamScores[key])) this.teamScores[key] = saved.teamScores[key];
                }
            }
            if (Array.isArray(saved.handHistory)) {
                this.handHistory = saved.handHistory.slice(0, 12);
            }
            if (Number.isFinite(saved.handNumber)) this.handNumber = saved.handNumber;
            if (typeof saved.matchChampion === 'string') this.matchChampion = saved.matchChampion;
        } catch (err) {
            // Bozuk yerel kayıt oyunu engellemesin.
        }
    }

    remainingPoints(key) {
        if (key === 'player') {
            return this.playerRack.filter(Boolean).reduce((sum, tile) => sum + this.tileScore(tile), 0);
        }
        const bot = this.bots.find(item => item.id === key);
        if (!bot) return 0;
        return bot.hand.reduce((sum, tile) => sum + this.tileScore(tile), 0);
    }

    recordHandResult(winnerKey, winResult = {}) {
        if (this.handRecordedForGame) return;
        this.handRecordedForGame = true;
        this.handNumber++;

        const isTeam = this.isTeamMode();
        const is101 = this.is101Mode();
        const allKeys = ['player', 'ali', 'mehmet', 'hasan'];
        const winnerTeam = this.teamKey(winnerKey);
        const loserKeys = isTeam
            ? allKeys.filter(key => this.teamKey(key) !== winnerTeam)
            : allKeys.filter(key => key !== winnerKey);

        const remaining = loserKeys.map(key => ({ key, points: this.remainingPoints(key) }));
        const totalLoss = remaining.reduce((sum, item) => sum + item.points, 0);
        const bot = this.bots.find(item => item.id === winnerKey);
        const winnerLabel = isTeam
            ? this.getTeamLabel(winnerTeam)
            : (winnerKey === 'player' ? 'Siz' : (bot ? bot.name : winnerKey));

        let gained = 1;
        if (is101) {
            gained = 101 + totalLoss;
            if (isTeam) {
                this.teamScores[winnerTeam] += gained;
                const otherTeam = winnerTeam === 'biz' ? 'onlar' : 'biz';
                this.teamScores[otherTeam] -= totalLoss;
            } else {
                this.matchScores[winnerKey] += gained;
                for (const item of remaining) {
                    this.matchScores[item.key] -= item.points;
                }
            }
        } else {
            this.matchScores[winnerKey] += 1;
        }

        const leaderScore = isTeam ? this.teamScores[winnerTeam] : this.matchScores[winnerKey];
        if (is101 && leaderScore >= this.matchTarget && !this.matchChampion) {
            this.matchChampion = winnerLabel;
            if (window.showToast) window.showToast(`🏆 ${winnerLabel} ${this.matchTarget} puana ulaşıp turnuvayı kazandı!`, '🏆');
        }

        this.handHistory.unshift({
            no: this.handNumber,
            winner: winnerLabel,
            mode: isTeam ? 'Eşli 101' : (is101 ? '101 Okey' : 'Klasik'),
            points: gained,
            remaining: totalLoss,
            bill: this.tabTotal,
            at: Date.now()
        });
        if (this.handHistory.length > 12) this.handHistory.pop();
        this.renderScoreboard();
        this.updateDockStats();
        this.saveMatchState();
    }

    renderScoreboard() {
        if (!this.scoreCardsEl && !this.scoreHistoryEl) return;
        const isTeam = this.isTeamMode();
        const is101 = this.is101Mode();

        if (this.matchTargetEl) this.matchTargetEl.textContent = is101 ? `${this.matchTarget} puan` : 'El sayısı';

        let cards = [];
        if (isTeam) {
            cards = [
                { key: 'biz', name: 'Biz', sub: 'Siz + Mehmet Usta', value: this.teamScores.biz, icon: '🤝' },
                { key: 'onlar', name: 'Onlar', sub: 'Ali Dayı + Hasan Amca', value: this.teamScores.onlar, icon: '🛡️' }
            ];
        } else {
            cards = [
                { key: 'player', name: 'Siz', sub: 'Güney', value: this.matchScores.player, icon: '🏹' },
                { key: 'ali', name: 'Ali Dayı', sub: 'Doğu', value: this.matchScores.ali, icon: '🧔' },
                { key: 'mehmet', name: 'Mehmet Usta', sub: 'Kuzey', value: this.matchScores.mehmet, icon: '👴' },
                { key: 'hasan', name: 'Hasan Amca', sub: 'Batı', value: this.matchScores.hasan, icon: '🧓' }
            ];
        }

        const maxValue = Math.max(...cards.map(card => card.value), 0);
        if (this.scoreCardsEl) {
            this.scoreCardsEl.innerHTML = cards.map(card => {
                const leader = maxValue > 0 && card.value === maxValue;
                const progress = is101
                    ? Math.max(0, Math.min(100, (card.value / this.matchTarget) * 100))
                    : Math.max(0, Math.min(100, card.value * 10));
                return `<div class="score-card ${leader ? 'leader' : ''} ${card.value < 0 ? 'negative' : ''}">
                    <span class="score-card-icon">${card.icon}</span>
                    <div class="score-card-main">
                        <span class="score-card-name">${card.name}</span>
                        <span class="score-card-sub">${card.sub}</span>
                    </div>
                    <strong class="score-card-value">${card.value}</strong>
                    <span class="score-card-unit">${is101 ? 'puan' : 'el'}</span>
                    <div class="score-bar"><span style="width:${progress}%"></span></div>
                </div>`;
            }).join('');
        }

        if (this.scoreHistoryEl) {
            if (this.handHistory.length === 0) {
                this.scoreHistoryEl.innerHTML = '<span class="service-empty">Henüz oynanmış el yok. İlk elin kazananı buraya yazılacak.</span>';
            } else {
                this.scoreHistoryEl.innerHTML = this.handHistory.map(item => {
                    const detail = is101
                        ? `+${item.points} puan · rakip kalanı ${item.remaining}`
                        : 'el galibiyeti';
                    const bill = item.bill > 0 ? `<span class="history-bill">${item.bill} ₺</span>` : '';
                    return `<div class="score-history-item">
                        <span class="history-no">#${item.no}</span>
                        <div class="history-main">
                            <strong>${item.winner}</strong>
                            <small>${item.mode} · ${detail}</small>
                        </div>
                        ${bill}
                    </div>`;
                }).join('');
            }
        }

        if (this.scoreNoteEl && this.matchChampion) {
            this.scoreNoteEl.textContent = `🏆 Turnuva şampiyonu: ${this.matchChampion}. Skoru sıfırlayarak yeni bir seri başlatabilirsiniz.`;
        }
    }

    isRealOkey(tile) {
        if (!tile || tile.isFake) return false;
        return tile.color === this.okeyTile.color && tile.num === this.okeyTile.num;
    }

    renderTileHTML(tile) {
        if (!tile) return '';
        const isActualOkey = this.isRealOkey(tile);
        const okeyBadge = isActualOkey ? `<div class="okey-badge">OKEY</div>` : '';

        return `
            <div class="okey-tile color-${tile.color} ${isActualOkey ? 'is-okey' : ''}" draggable="false">
                <div class="tile-num">${tile.num}</div>
                <div class="tile-dot">●</div>
                ${okeyBadge}
            </div>
        `;
    }

    updateAllUI() {
        // Gösterge ve Okey bilgisi
        if (this.indicatorEl) {
            this.indicatorEl.innerHTML = this.renderTileHTML(this.indicator);
        }
        if (this.okeyInfoEl) {
            const colorNames = { kirmizi: 'Kırmızı', sari: 'Sarı', mavi: 'Mavi', siyah: 'Siyah' };
            let info = `Okey Taşı: <strong class="tile-val-${this.okeyTile.color}">${colorNames[this.okeyTile.color]} ${this.okeyTile.num}</strong>`;
            if (this.is101Mode()) {
                info += `<br><span class="okey-mode-chip ${this.opened101 ? 'is-open' : ''}">${this.opened101 ? '🀄 El açık · 101' : (this.isTeamMode() ? '🤝 Eşli 101 · açılış 101 puan' : '💯 101 modu · açılış 101 puan')}</span>`;
            }
            this.okeyInfoEl.innerHTML = info;
        }

        // Deste Sayısı
        if (this.deckCountEl) {
            this.deckCountEl.textContent = `${this.deck.length} Taş`;
        }

        // Bot taş sayıları
        if (this.botRightCount) this.botRightCount.textContent = `${this.bots[0].hand.length} taş`;
        if (this.botTopCount) this.botTopCount.textContent = `${this.bots[1].hand.length} taş`;
        if (this.botLeftCount) this.botLeftCount.textContent = `${this.bots[2].hand.length} taş`;

        // Sıra göstergesi
        this.updateTurnVisuals();

        // Iskartaları güncelle
        this.renderDiscards();

        // 2 Katlı Istakayı güncelle
        this.renderPlayerRack();
        this.updateDockStats();
    }

    updateTurnVisuals() {
        // Avatar highlight
        if (this.botRightAvatarBox) this.botRightAvatarBox.classList.toggle('active-turn', this.turn === 1);
        if (this.botTopAvatarBox) this.botTopAvatarBox.classList.toggle('active-turn', this.turn === 2);
        if (this.botLeftAvatarBox) this.botLeftAvatarBox.classList.toggle('active-turn', this.turn === 3);

        const names = ["SİZDE", "Ali Dayı'da", "Mehmet Usta'da", "Hasan Amca'da"];
        if (this.turnLabelEl) {
            this.turnLabelEl.textContent = `Sıra: ${names[this.turn]}`;
        }

        // Oyuncunun taş çekme/atma rehber vurguları
        const canDrawSide = (this.turn === 0 && !this.hasDrawn && this.discards.hasan.length > 0);
        const canDiscard = (this.turn === 0 && this.hasDrawn);

        if (this.zoneDiscardHasanEl) {
            this.zoneDiscardHasanEl.classList.toggle('can-draw', canDrawSide);
        }
        if (this.zoneDiscardPlayerEl) {
            this.zoneDiscardPlayerEl.classList.toggle('can-discard', canDiscard);
        }
    }

    renderDiscards() {
        const renderSlot = (el, pile) => {
            if (!el) return;
            if (pile && pile.length > 0) {
                const lastTile = pile[pile.length - 1];
                el.innerHTML = this.renderTileHTML(lastTile);
            } else {
                el.innerHTML = `<span style="font-size:0.75rem; color:#888;">(Boş)</span>`;
            }
        };

        renderSlot(this.discardHasanEl, this.discards.hasan);
        renderSlot(this.discardPlayerEl, this.discards.player);
        renderSlot(this.discardMehmetEl, this.discards.mehmet);
        renderSlot(this.discardAliEl, this.discards.ali);
    }

    renderPlayerRack() {
        if (!this.istakaTopEl || !this.istakaBottomEl) return;
        this.istakaTopEl.innerHTML = '';
        this.istakaBottomEl.innerHTML = '';

        for (let i = 0; i < 28; i++) {
            const tile = this.playerRack[i];
            const slotEl = document.createElement('div');
            slotEl.className = `okey-tile-slot ${this.selectedSlotIndex === i ? 'selected' : ''}`;
            slotEl.dataset.slotIndex = i;

            if (tile) {
                slotEl.innerHTML = this.renderTileHTML(tile);
                slotEl.draggable = true;
            } else {
                slotEl.innerHTML = '';
                slotEl.draggable = false;
            }

            // Tıklama ile Seçme & İstediğin Boş Yere Taşıma / Yer Değiştirme
            slotEl.addEventListener('click', () => this.handleSlotClick(i));

            // Çift tıklama ile hızlı ıskartaya atma
            slotEl.addEventListener('dblclick', () => {
                if (this.playerRack[i]) {
                    this.selectedSlotIndex = i;
                    this.playerDiscardSelected();
                }
            });

            // Sürükle ve Bırak (HTML5 Drag & Drop)
            slotEl.addEventListener('dragstart', (e) => {
                if (!this.playerRack[i]) {
                    e.preventDefault();
                    return;
                }
                this.draggedSlotIndex = i;
                slotEl.classList.add('dragging');
                e.dataTransfer.setData('text/plain', i);
            });

            slotEl.addEventListener('dragend', () => {
                slotEl.classList.remove('dragging');
                this.draggedSlotIndex = null;
            });

            slotEl.addEventListener('dragover', (e) => {
                e.preventDefault();
                slotEl.classList.add('drag-over');
            });

            slotEl.addEventListener('dragleave', () => {
                slotEl.classList.remove('drag-over');
            });

            slotEl.addEventListener('drop', (e) => {
                e.preventDefault();
                slotEl.classList.remove('drag-over');
                if (this.draggedSlotIndex !== null && this.draggedSlotIndex !== i) {
                    // Yer değiştir (Swap) veya Boşluğa Taşı
                    [this.playerRack[this.draggedSlotIndex], this.playerRack[i]] =
                    [this.playerRack[i], this.playerRack[this.draggedSlotIndex]];
                    this.selectedSlotIndex = null;
                    if (window.turkishSound) window.turkishSound.playTileClick();
                    this.renderPlayerRack();
                }
            });

            // 0-13 arası Üst Kat, 14-27 arası Alt Kat
            if (i < 14) {
                this.istakaTopEl.appendChild(slotEl);
            } else {
                this.istakaBottomEl.appendChild(slotEl);
            }
        }

        this.updateSelectedPreview();
    }

    updateSelectedPreview() {
        if (!this.selectedPreviewEl) return;
        const tile = this.selectedSlotIndex !== null ? this.playerRack[this.selectedSlotIndex] : null;
        if (!tile) {
            this.selectedPreviewEl.hidden = true;
            return;
        }

        const colorNames = { kirmizi: 'Kırmızı', sari: 'Sarı', mavi: 'Mavi', siyah: 'Siyah', sahte: 'Sahte Okey' };
        const colorName = colorNames[tile.color] || 'Taş';
        const isOkey = this.isRealOkey(tile);
        this.selectedPreviewEl.hidden = false;
        if (this.selectedPreviewTileEl) {
            this.selectedPreviewTileEl.className = `selected-preview-tile color-${tile.color} ${isOkey ? 'is-okey' : ''}`;
            this.selectedPreviewTileEl.textContent = tile.num;
        }
        if (this.selectedPreviewTextEl) {
            const suffix = this.is101Mode() ? 'bitiş taşı' : 'atılacak taş';
            this.selectedPreviewTextEl.textContent = `${colorName} ${tile.num} · ${suffix}`;
        }
    }

    handleSlotClick(index) {
        if (this.selectedSlotIndex === null) {
            // İlk tıklama: Eğer slot doluysa taşı seç
            if (this.playerRack[index]) {
                this.selectedSlotIndex = index;
                if (window.turkishSound) window.turkishSound.playTileClick();
                this.renderPlayerRack();
            }
        } else if (this.selectedSlotIndex === index) {
            // Aynı taşa tıklandı: Seçimi kaldır
            this.selectedSlotIndex = null;
            this.renderPlayerRack();
        } else {
            // Başka bir slota tıklandı: İster boş olsun ister dolu, yer değiştir/taşı!
            [this.playerRack[this.selectedSlotIndex], this.playerRack[index]] =
            [this.playerRack[index], this.playerRack[this.selectedSlotIndex]];
            this.selectedSlotIndex = null;
            if (window.turkishSound) window.turkishSound.playTileClick();
            this.renderPlayerRack();
        }
    }

    findFirstEmptySlot() {
        for (let i = 0; i < 28; i++) {
            if (this.playerRack[i] === null) return i;
        }
        return -1;
    }

    playerDrawFromDeck() {
        if (this.gameOver) return;
        if (this.turn !== 0) {
            this.setStatus("Sıra sizde değil, masadaki rakipler oynuyor!");
            return;
        }
        if (this.hasDrawn) {
            this.setStatus("Zaten taş çektiniz! Şimdi elinizden bir taş seçip sağınızdaki ıskartaya atın.");
            return;
        }
        if (this.deck.length === 0) {
            this.handleDeckEmpty();
            return;
        }

        const emptySlot = this.findFirstEmptySlot();
        if (emptySlot === -1) {
            this.setStatus("Istakanızda boş yer yok!");
            return;
        }

        const drawn = this.deck.pop();
        this.playerRack[emptySlot] = drawn;
        this.hasDrawn = true;
        this.selectedSlotIndex = emptySlot;
        if (window.turkishSound) window.turkishSound.playTileDraw();

        this.updateAllUI();
        this.setStatus(`Desteden taş çektiniz (${drawn.num}). Şimdi atmak istediğiniz taşı seçip sağdaki ıskartaya atın.`);
    }

    playerDrawFromSide() {
        if (this.gameOver) return;
        if (this.turn !== 0) return;
        if (this.hasDrawn) {
            this.setStatus("Zaten taş çektiniz! Bir taş atmalısınız.");
            return;
        }
        if (this.discards.hasan.length === 0) {
            this.setStatus("Solunuzda (Hasan Amca) henüz atılmış taş yok!");
            return;
        }

        const emptySlot = this.findFirstEmptySlot();
        if (emptySlot === -1) {
            this.setStatus("Istakanızda boş yer yok!");
            return;
        }

        // Solunuzdaki oyuncu Hasan Amca'nın attığı son taşı alırsınız!
        const sideTile = this.discards.hasan.pop();
        this.playerRack[emptySlot] = sideTile;
        this.hasDrawn = true;
        this.selectedSlotIndex = emptySlot;
        if (window.turkishSound) window.turkishSound.playTileDraw();

        this.updateAllUI();
        this.setStatus(`Hasan Amca'nın attığı taşı aldınız (${sideTile.num}). Şimdi bir taş atın.`);
    }

    playerDiscardSelected() {
        if (this.gameOver || this.turn !== 0) return;
        if (!this.hasDrawn) {
            this.setStatus("Önce desteden veya Hasan Amca'dan taş çekmelisiniz!");
            return;
        }
        if (this.selectedSlotIndex === null || !this.playerRack[this.selectedSlotIndex]) {
            this.setStatus("Lütfen atmak istediğiniz taşa tıklayın!");
            return;
        }

        const discarded = this.playerRack[this.selectedSlotIndex];
        this.playerRack[this.selectedSlotIndex] = null;
        this.selectedSlotIndex = null;
        this.hasDrawn = false;

        // Taş SİZİN ıskartanıza (sağınıza) düşer
        this.discards.player.push(discarded);
        this.lastDiscard = { name: 'Siz', tile: discarded };
        this.renderLastDiscard();
        if (window.turkishSound) window.turkishSound.playTileDiscard();

        this.updateAllUI();
        this.setStatus(`Taş attınız: ${discarded.color.toUpperCase()} ${discarded.num}. Sıra Ali Dayı'da...`);

        // Sıra Ali Dayı'ya geçer
        this.turn = 1;
        this.updateTurnVisuals();
        this.botTimeout = setTimeout(() => this.runBotTurn(0), 900);
    }

    /* ========================================================
       BOT ZEKA MOTORU: GERÇEK OYNAYIŞ, TAŞ TOPLAMA & KAZANABİLME
       ======================================================== */
    runBotTurn(botIdx) {
        if (this.gameOver) return;

        if (botIdx >= 3) {
            // Hasan Amca da oynadı, sıra tekrar Oyuncuya geldi!
            this.turn = 0;
            this.hasDrawn = false;
            this.updateAllUI();
            this.setStatus("Sıra size geldi! Ortadan veya Hasan Amca'nın attığı taşa tıklayarak taş çekin.");
            return;
        }

        const bot = this.bots[botIdx];
        this.turn = botIdx + 1;
        this.updateTurnVisuals();

        const bubbles = [this.botRightBubble, this.botTopBubble, this.botLeftBubble];
        const bubble = bubbles[botIdx];

        // 1. Taş Çekme:
        // Bot solundaki oyuncunun attığı taşa bakar.
        // Ali Dayı solundaki (Oyuncu) taşa bakar.
        // Mehmet Usta Ali Dayı'nın taşına bakar.
        // Hasan Amca Mehmet Usta'nın taşına bakar.
        let leftPile = null;
        if (botIdx === 0) leftPile = this.discards.player;
        else if (botIdx === 1) leftPile = this.discards.ali;
        else if (botIdx === 2) leftPile = this.discards.mehmet;

        const sideTile = (leftPile && leftPile.length > 0) ? leftPile[leftPile.length - 1] : null;

        // Bot yandan çekmeli mi?
        const wantsSide = sideTile && this.botEvaluatesSideTile(bot.hand, sideTile);
        let drawnTile = null;

        if (wantsSide) {
            drawnTile = leftPile.pop();
            bot.hand.push(drawnTile);
            if (bubble) {
                bubble.textContent = `${bot.name}: "Tam aradığım taştı, aldım!"`;
                bubble.classList.add('show');
                setTimeout(() => bubble.classList.remove('show'), 1800);
            }
        } else {
            if (this.deck.length === 0) {
                this.handleDeckEmpty();
                return;
            }
            drawnTile = this.deck.pop();
            bot.hand.push(drawnTile);
        }

        if (window.turkishSound) window.turkishSound.playTileDraw();
        this.updateAllUI();

        // 101 Okey: bot elini açabiliyor mu?
        if (this.is101Mode() && !bot.opened101) {
            const opening = this.findOpeningMelds(bot.hand);
            if (opening) {
                bot.opened101 = true;
                if (bubble) {
                    bubble.textContent = `${bot.name}: "Elimi açtım, ${opening.score} puan!"`;
                    bubble.classList.add('show');
                    setTimeout(() => bubble.classList.remove('show'), 2400);
                }
                if (window.showToast) window.showToast(`${bot.name} 101 puanla elini açtı!`, '🀄');
            }
        }

        // 2. Taş çektikten sonra: BOT KAZANDI MI KONTROL ET!
        this.botTimeout = setTimeout(() => {
            if (this.gameOver) return;

            const winResult = this.checkWinningHand(bot.hand);
            if (winResult.canWin) {
                // BOT KAZANDI! Masada elini açar ve zafer ilan edilir!
                this.handleBotWin(bot, winResult);
                return;
            }

            // 3. Kazanmadıysa elindeki en işe yaramaz taşı ıskartaya at!
            const worstIndex = this.botChooseDiscardIndex(bot.hand);
            const discarded = bot.hand.splice(worstIndex, 1)[0];

            // Botun kendi ıskartasına koy
            if (botIdx === 0) this.discards.ali.push(discarded);
            else if (botIdx === 1) this.discards.mehmet.push(discarded);
            else if (botIdx === 2) this.discards.hasan.push(discarded);

            this.lastDiscard = { name: bot.name, tile: discarded };
            this.renderLastDiscard();

            if (window.turkishSound) window.turkishSound.playTileDiscard();
            this.updateAllUI();

            const phraseObj = OKEY_PHRASES_200[Math.floor(Math.random() * OKEY_PHRASES_200.length)];
            const text = phraseObj.text;
            if (bubble) {
                bubble.textContent = `${bot.name}: "${text}" (${discarded.color[0].toUpperCase()}${discarded.num})`;
                bubble.classList.add('show');
                setTimeout(() => bubble.classList.remove('show'), 2600);
            }

            // Ara sıra masaya sipariş ver / oyuncuya ikram et
            setTimeout(() => this.botMaybeOrder(bot, bubble), 700);

            // Bir sonraki bota veya oyuncuya geç
            this.botTimeout = setTimeout(() => this.runBotTurn(botIdx + 1), 1150);
        }, 750);
    }

    botEvaluatesSideTile(hand, tile) {
        if (!tile) return false;
        if (this.isRealOkey(tile)) return true; // Okey ise her zaman al!

        // Taş eldeki bir sayıyla per veya seri oluşturmaya yakın mı?
        let matchCount = 0;
        for (const t of hand) {
            if (t.num === tile.num && t.color !== tile.color) matchCount++;
            if (t.color === tile.color && Math.abs(t.num - tile.num) === 1) matchCount++;
        }
        return matchCount >= 2;
    }

    botChooseDiscardIndex(hand) {
        // En düşük faydaya sahip taşı seç
        let worstIdx = 0;
        let minScore = 999999;

        for (let i = 0; i < hand.length; i++) {
            const tile = hand[i];
            if (this.isRealOkey(tile)) continue; // Okey asla atılmaz!

            let score = 0;
            for (let j = 0; j < hand.length; j++) {
                if (i === j) continue;
                const other = hand[j];
                // Aynı renk seri yakınlığı
                if (tile.color === other.color) {
                    const diff = Math.abs(tile.num - other.num);
                    if (diff === 1) score += 30;
                    else if (diff === 2) score += 15;
                }
                // Farklı renk aynı numara grubu
                if (tile.num === other.num && tile.color !== other.color) {
                    score += 25;
                }
                // Çift olma
                if (tile.num === other.num && tile.color === other.color) {
                    score += 35;
                }
            }

            if (score < minScore) {
                minScore = score;
                worstIdx = i;
            }
        }
        return worstIdx;
    }

    handleBotWin(bot, winResult) {
        this.gameOver = true;
        if (window.turkishSound) window.turkishSound.playOkeyWin();

        const modal = document.getElementById('okeyWinModal');
        const titleEl = document.getElementById('okeyModalTitle');
        const descEl = document.getElementById('okeyModalDesc');
        const trophyEl = document.getElementById('okeyModalTrophy');
        const handEl = document.getElementById('okeyModalWinningHand');

        const isTeam = this.isTeamMode();
        const winnerTeam = this.teamKey(bot.id);
        const teamWon = isTeam && winnerTeam === 'biz';
        const displayName = isTeam ? this.getTeamLabel(winnerTeam) : bot.name;
        const displayAvatar = isTeam ? (teamWon ? '🤝' : '🛡️') : bot.avatar;

        this.recordHandResult(bot.id, winResult);

        if (trophyEl) trophyEl.textContent = displayAvatar;
        if (titleEl) {
            titleEl.textContent = isTeam
                ? (teamWon ? `ORTAĞINIZ ${bot.name.toUpperCase()} BİTTİ — TAKIMINIZ KAZANDI!` : 'RAKİP TAKIM KAZANDI!')
                : `${bot.name.toUpperCase()} KAZANDI!`;
        }
        if (descEl) {
            if (isTeam) {
                descEl.textContent = teamWon
                    ? `Ortağınız ${bot.name} elini açtı; takımınız 101 puanı ve rakip kalanını hanesine yazdırdı. Hesap sizin tarafta. ☕🎉`
                    : `${bot.name} ve ortağı Hasan Amca/Ali Dayı tarafı elini bitirdi. Bu elin hesabı rakip takımın hanesine yazıldı.`;
            } else {
                descEl.textContent = this.is101Mode()
                    ? `${bot.name}: "Elimi açtım, ${winResult.score || 101} puan! Hesap da benden!" diyerek 101 okeyi bitirdi. ☕🎉`
                    : `${bot.name}: "BİTTİM BEYLER! Masanın galibi benim, çayları söyleyin!" diyerek elini açtı ve kazandı! ☕🎉`;
            }
        }

        if (handEl && winResult.melds) {
            handEl.innerHTML = this.renderMeldsHTML(winResult.melds);
        }
        this.renderBill(displayName, displayAvatar, teamWon);

        if (modal) modal.classList.add('show');
        this.setStatus(`🏁 ${displayName} elini tamamlayarak OKEYLE BİTTİ!`);
    }

    handleDeckEmpty() {
        this.gameOver = true;
        this.setStatus("Masa destesinde taş bitti! Bu el berabere bitti.");
        alert("Masa destesinde taş kalmadı! Bu el berabere sonuçlandı.");
    }

    /* ========================================================
       101 OKEY: AÇILIŞ, PER PUANI VE BİTİŞ DENETİMİ
       ======================================================== */
    tileScore(tile) {
        if (!tile) return 0;
        if (this.isRealOkey(tile)) return 13;
        if (tile.isFake) return this.okeyTile.num;
        return typeof tile.num === 'number' ? tile.num : 0;
    }

    tileBaseValue(tile) {
        if (!tile) return 0;
        if (tile.isFake) return this.okeyTile.num;
        return typeof tile.num === 'number' ? tile.num : 0;
    }

    meldTileValues(meld) {
        if (!meld || meld.length === 0) return [];
        const wildcardFlags = meld.map(tile => this.isRealOkey(tile));
        const regularValues = meld.map((tile, index) => wildcardFlags[index] ? null : this.tileBaseValue(tile));
        const regularNums = regularValues.filter(value => value !== null);

        if (meld.length === 2) {
            const base = regularNums.length > 0 ? regularNums[0] : 13;
            return meld.map((tile, index) => wildcardFlags[index] ? base : regularValues[index]);
        }

        // Aynı sayıdan oluşan per: okeyler de bu sayıyı temsil eder.
        if (regularNums.length > 0 && regularNums.every(num => num === regularNums[0])) {
            return meld.map(() => regularNums[0]);
        }

        // Seri: okey, durduğu sıradaki eksik sayıyı temsil eder.
        const firstRegularIndex = regularValues.findIndex(value => value !== null);
        if (firstRegularIndex === -1) return meld.map(() => 13);
        const anchor = regularValues[firstRegularIndex];
        return regularValues.map((value, index) => {
            if (value !== null) return value;
            return anchor + (index - firstRegularIndex);
        });
    }

    meldValue(meld) {
        return this.meldTileValues(meld).reduce((sum, value) => sum + value, 0);
    }

    meldScore(melds) {
        return (melds || []).reduce((sum, meld) => sum + this.meldValue(meld), 0);
    }

    checkPairsCount(tiles, targetPairs = 7) {
        const wildcards = tiles.filter(t => this.isRealOkey(t));
        const regularMap = new Map();

        for (const t of tiles) {
            if (this.isRealOkey(t)) continue;
            const eff = t.isFake ? { color: this.okeyTile.color, num: this.okeyTile.num } : t;
            const key = `${eff.color}-${eff.num}`;
            if (!regularMap.has(key)) regularMap.set(key, []);
            regularMap.get(key).push(t);
        }

        const pairs = [];
        const singles = [];
        for (const [, group] of regularMap.entries()) {
            for (let i = 0; i + 1 < group.length; i += 2) {
                pairs.push([group[i], group[i + 1]]);
            }
            if (group.length % 2 === 1) singles.push(group[group.length - 1]);
        }

        if (wildcards.length < singles.length) return { valid: false, pairs: [] };
        let wildIndex = 0;
        for (const single of singles) {
            pairs.push([single, wildcards[wildIndex++]]);
        }
        while (wildcards.length - wildIndex >= 2) {
            pairs.push([wildcards[wildIndex], wildcards[wildIndex + 1]]);
            wildIndex += 2;
        }

        if (pairs.length >= targetPairs) {
            return { valid: true, pairs: pairs.slice(0, targetPairs) };
        }
        return { valid: false, pairs: [] };
    }

    findOpeningMelds(tiles, allowPairs = true) {
        // 7 çift ile açılış 101 sayılır (klasik 101 kuralı)
        if (allowPairs) {
            const pairResult = this.checkPairsCount(tiles, 7);
            if (pairResult.valid) {
                return { melds: pairResult.pairs, score: 101, isPairs: true };
            }
        }

        const standardized = tiles.map(t => {
            const wildcard = this.isRealOkey(t);
            if (t.isFake) {
                return { id: t.id, color: this.okeyTile.color, num: this.okeyTile.num, isWildcard: false, raw: t };
            }
            return { id: t.id, color: t.color, num: t.num, isWildcard: wildcard, raw: t };
        });
        standardized.sort((a, b) => {
            if (a.isWildcard !== b.isWildcard) return a.isWildcard ? 1 : -1;
            if (a.color !== b.color) return a.color.localeCompare(b.color);
            return a.num - b.num;
        });

        let best = null;
        let fallback = null;
        let nodes = 0;
        const search = (pool, chosen, score) => {
            if (nodes++ > 12000) return;
            const tileCount = chosen.reduce((sum, group) => sum + group.length, 0);

            if (score >= 101 && chosen.length > 0) {
                const candidate = {
                    melds: chosen.map(group => group.map(t => t.raw)),
                    score,
                    isPairs: false,
                    tileCount
                };
                if (!fallback || score > fallback.score) fallback = candidate;

                // Açılışta masaya inen taş sayısı 3'ün katı olmalı ki kalan el
                // bir bitiş taşı + tam perler halinde tamamlanabilsin.
                if (tileCount % 3 === 0) {
                    if (!best || tileCount < best.tileCount || (tileCount === best.tileCount && score > best.score)) {
                        best = candidate;
                    }
                }

                if (best && tileCount >= best.tileCount) return;
            }

            if (pool.length < 3) return;

            const first = pool[0];
            const candidates = [
                ...this.findCandidateColorGroups(pool, first),
                ...this.findCandidateRuns(pool, first)
            ];

            const seen = new Set();
            for (const candidate of candidates) {
                if (!candidate.length) continue;
                if (best && tileCount + candidate.length >= best.tileCount) continue;
                const key = candidate.map(t => t.id).sort((a, b) => a - b).join('-');
                if (seen.has(key)) continue;
                seen.add(key);

                const remaining = this.removeItemsFromPool(pool, candidate);
                const gained = this.meldValue(candidate.map(t => t.raw));
                search(remaining, [...chosen, candidate], score + gained);
            }

            // İlk taşı açılış dışında bırakma seçeneği (açılışta elin tamamı gerekmez)
            if (!best || tileCount < best.tileCount) {
                search(pool.slice(1), chosen, score);
            }
        };

        search(standardized, [], 0);
        return best || fallback;
    }

    validate101Tiles(tiles) {
        if (!Array.isArray(tiles) || tiles.length === 0 || tiles.length % 3 !== 0) {
            return { valid: false, melds: [], score: 0 };
        }
        const result = this.solvePartition(tiles);
        if (!result.valid) return { valid: false, melds: [], score: 0 };
        return { valid: true, melds: result.melds, score: this.meldScore(result.melds) };
    }

    check101Win(tiles) {
        if (this.opened101) {
            const openedTiles = this.openedMelds.flat();
            if (tiles.length < 2) return { canWin: false };

            for (let i = 0; i < tiles.length; i++) {
                const discardCandidate = tiles[i];
                const remaining = tiles.filter((_, idx) => idx !== i);
                const allTiles = [...openedTiles, ...remaining];
                if (allTiles.length !== 21) continue;

                const result = this.validate101Tiles(allTiles);
                if (!result.valid) continue;
                return {
                    canWin: true,
                    discardTile: discardCandidate,
                    melds: result.melds,
                    score: result.score,
                    isPairs: false
                };
            }
            return { canWin: false };
        }

        if (tiles.length !== 22) return { canWin: false };

        for (let i = 0; i < tiles.length; i++) {
            const discardCandidate = tiles[i];
            const remaining21 = tiles.filter((_, idx) => idx !== i);
            const result = this.validate101Tiles(remaining21);
            if (!result.valid) continue;
            if (result.score >= 101) {
                return {
                    canWin: true,
                    discardTile: discardCandidate,
                    melds: result.melds,
                    score: result.score,
                    isPairs: false
                };
            }
        }
        return { canWin: false };
    }

    openHand101(onlyPairs = false) {
        if (!this.is101Mode()) return;
        if (this.gameOver) return;
        if (this.turn !== 0) {
            this.setStatus('Sıra sizde değilken el açamazsınız.');
            return;
        }
        if (this.opened101) {
            this.setStatus('Elinizi zaten açtınız. Şimdi bitiş taşını atın!');
            return;
        }

        const tiles = this.playerRack.filter(t => t !== null);
        if (tiles.length !== 22) {
            this.setStatus('101 açılışı için 22 taşınız olmalı. Önce desteden taş çekin.');
            return;
        }

        let opening = null;
        if (onlyPairs) {
            const pairResult = this.checkPairsCount(tiles, 7);
            if (pairResult.valid) {
                opening = { melds: pairResult.pairs, score: 101, isPairs: true };
            }
        } else {
            opening = this.findOpeningMelds(tiles, false);
        }
        if (!opening) {
            this.setStatus(onlyPairs
                ? '❌ Çift açılışı için 7 geçerli çift gerekiyor.'
                : '❌ Seri açılışı için 101 puanlık geçerli per yok. Perleri güçlendirip tekrar deneyin.');
            if (window.showToast) {
                window.showToast(onlyPairs
                    ? 'Çift açılışı tutmadı: 7 çift gerekli.'
                    : '101 açılışı tutmadı: 101 puanlık seri gerekli.', '🀄');
            }
            if (window.turkishSound) window.turkishSound.playTileDiscard();
            return;
        }

        this.opened101 = true;
        this.openedMelds = opening.melds;
        this.removeMeldsFromRack(this.openedMelds);
        this.compactPlayerRack();
        this.renderOpenedMelds();
        this.updateModeUI();
        this.showOpeningModal(opening);
        this.updateAllUI();
        this.setStatus(`🀄 Elinizi açtınız! Açılış puanı: ${opening.score}${opening.isPairs ? ' (7 çift)' : ''}. Perler masada; şimdi bitiş taşını atın.`);
        if (window.turkishSound) window.turkishSound.playOkeyWin();
    }

    showOpeningModal(opening) {
        if (!this.openModal) return;
        if (this.openTitleEl) this.openTitleEl.textContent = opening.isPairs ? '7 ÇİFT İLE EL AÇILDI!' : '101 PUANLA EL AÇILDI!';
        if (this.openDescEl) {
            this.openDescEl.textContent = opening.isPairs
                ? 'Yedi çiftinizi masaya serdiniz. Şimdi kalan taşları perleyip bitiş taşını atın!'
                : `Perleriniz masaya serildi. Açılış puanınız ${opening.score}. Şimdi bitiş taşını atın!`;
        }
        if (this.openMeldsEl) this.openMeldsEl.innerHTML = this.renderMeldsHTML(opening.melds);
        this.openModal.classList.add('show');
        if (window.showToast) window.showToast('Eli açtınız! Perler masaya serildi.', '🀄');
    }

    /* ========================================================
       GERÇEK PER DENETLEYİCİ VE EL BİTME ALGORİTMASI
       ======================================================== */
    checkWinCondition() {
        const is101 = this.is101Mode();
        if (!this.hasDrawn) {
            this.setStatus(is101
                ? 'Bitebilmek için önce desteden veya yandan taş çekip 22 taşa ulaşmalısınız!'
                : 'Bitebilmek için önce desteden veya yandan taş çekip 15 taşa ulaşmalı ve bitiş taşını belirlemelisiniz!');
            alert(is101
                ? '101 okeyde bitebilmek için önce bir taş çekmeli (22 taşa ulaşmalı) ve bitiş taşını belirlemelisiniz!'
                : 'Bitebilmek için önce bir taş çekmeli (15 taşa ulaşmalı) ve elinizi açmalısınız!');
            return;
        }

        const tilesOnRack = this.playerRack.filter(t => t !== null);
        const openedTileCount = this.opened101 ? this.openedMelds.flat().length : 0;
        if (is101 && tilesOnRack.length + openedTileCount < 22) {
            this.setStatus('101 okeyde bitebilmek için elinizde çekilmiş taşla birlikte 22 taş olmalıdır!');
            return;
        }
        if (!is101 && tilesOnRack.length < 15) {
            this.setStatus("Bitebilmek için elinizde çekilmiş taşla birlikte 15 taş olmalıdır!");
            return;
        }

        // Seçili bir taş varsa onu ıskartaya atılacak bitiş taşı olarak dene
        let winResult = null;
        if (this.selectedSlotIndex !== null && this.playerRack[this.selectedSlotIndex]) {
            const candidateDiscard = this.playerRack[this.selectedSlotIndex];
            const remaining14 = [];
            for (let i = 0; i < 28; i++) {
                if (this.playerRack[i] && i !== this.selectedSlotIndex) {
                    remaining14.push(this.playerRack[i]);
                }
            }
            if (remaining14.length === 14) {
                const subCheck = this.validate14Tiles(remaining14);
                if (subCheck.valid) {
                    winResult = {
                        canWin: true,
                        discardTile: candidateDiscard,
                        melds: subCheck.melds,
                        isPairs: subCheck.isPairs
                    };
                }
            }
        }

        // Eğer seçili taşla olmadıysa, eldeki 15 taştan HERHANGİ birinin bitiş taşı olup olamayacağını tara
        if (!winResult || !winResult.canWin) {
            winResult = this.checkWinningHand(tilesOnRack);
        }

        if (winResult && winResult.canWin) {
            // GERÇEK ZAFER!
            this.gameOver = true;
            if (window.turkishSound) window.turkishSound.playOkeyWin();

            const modal = document.getElementById('okeyWinModal');
            const titleEl = document.getElementById('okeyModalTitle');
            const descEl = document.getElementById('okeyModalDesc');
            const trophyEl = document.getElementById('okeyModalTrophy');
            const handEl = document.getElementById('okeyModalWinningHand');

            const isOkeyDiscard = this.isRealOkey(winResult.discardTile);
            const isTeam = this.isTeamMode();
            const winnerLabel = isTeam ? this.getTeamLabel('biz') : 'Siz';
            const winTypeText = isTeam
                ? `EŞLİ 101! ${winResult.score} PUANLA TAKIMINIZ BİTTİ!`
                : (this.is101Mode()
                    ? `101 OKEY! ${winResult.score} PUANLA BİTTİNİZ!`
                    : (winResult.isPairs ? "7 ÇİFT İLE BİTTİNİZ!" : (isOkeyDiscard ? "OKEY ATARAK BİTTİNİZ! (ÇİFTE ZAFER)" : "BİTTİNİZ! (PERLER TAM)")));

            this.recordHandResult('player', winResult);

            if (trophyEl) trophyEl.textContent = isTeam ? '🤝' : "🏆";
            if (titleEl) titleEl.textContent = `TEBRİKLER! ${winTypeText}`;
            if (descEl) descEl.textContent = isTeam
                ? `Ortağınız Mehmet Usta ile birlikte ${winResult.score} puanla eli bitirdiniz. Takım puanı ve hesap sizin hanenize yazıldı! ☕🎉`
                : (this.is101Mode()
                    ? `Muazzam bir 101 okey! 21 taşınızı perlere ayırıp ${winResult.score} puanla bitirdiniz. Hesap kazananın yanında! ☕🎉`
                    : `Muazzam bir oyun! 14 taşınızı kurallara uygun perlerle tamamladınız ve son taşı (${winResult.discardTile.num}) attınız! Ali Dayı, Mehmet Usta ve Hasan Amca çayları ısmarlıyor! ☕🎉`);

            if (handEl && winResult.melds) {
                handEl.innerHTML = this.renderMeldsHTML(winResult.melds);
            }
            this.renderBill(winnerLabel, isTeam ? '🤝' : '🏆', true);

            if (modal) modal.classList.add('show');
            this.setStatus("🎉 TEBRİKLER! Kurallara uygun perlerle elinizi bitirdiniz!");
        } else {
            // KAZANILMADI! Kullanıcıya doğru kural anlatımı yapılır
            if (is101) {
                this.setStatus("❌ Eliniz henüz 101 bitişine uygun değil! 21 taşınızın tamamı geçerli perler oluşturmalı; el açılmadıysa toplam en az 101 puan olmalı.");
                alert("❌ Eliniz henüz 101 okey bitişine uygun değil!\n\n101 okeyde 22 taştan birini bitiş taşı olarak attığınızda kalan 21 taşın tamamı geçerli perler (en az 3'lü seriler veya aynı sayı farklı renkler) oluşturmalıdır. Elinizi henüz açmadıysanız perlerin toplamı en az 101 puan olmalıdır.\n\nİpucu: Önce “Eli Aç (101)” ile perlerinizi masaya gösterin.");
            } else {
                this.setStatus("❌ Eliniz henüz bitmeye uygun değil! 14 taşınızın tamamı geçerli perler (en az 3'lü seriler / aynı sayı farklı renkler) veya 7 çift oluşturmalıdır.");
                alert("❌ Eliniz henüz bitmeye uygun değil!\n\nOkeyde bitebilmek için 14 taşınızın tamamı eksiksiz perler (en az 3'lü seriler veya aynı sayı farklı renkler) ya da 7 çift oluşturmalı, 15. taş da bitiş taşı olarak ortaya atılmalıdır.\n\nLütfen taşlarınızı seriye veya çifte dizip kontrol edin.");
            }
        }
    }

    renderMeldsHTML(melds) {
        if (!melds || melds.length === 0) return '';
        let html = '';
        melds.forEach((meld, index) => {
            html += `<div class="okey-meld-group meld-anim" style="--meld-index:${index}">`;
            for (const tile of meld) {
                html += this.renderTileHTML(tile);
            }
            html += `</div>`;
        });
        return html;
    }

    renderOpenedMelds() {
        if (!this.openBoardEl || !this.openedMeldsEl) return;
        const melds = this.openedMelds || [];
        if (melds.length === 0) {
            this.openBoardEl.hidden = true;
            this.openedMeldsEl.innerHTML = '';
            return;
        }
        this.openBoardEl.hidden = false;
        const meldScores = melds.map(meld => this.meldValue(meld));
        const totalScore = meldScores.reduce((sum, value) => sum + value, 0);
        const head = this.openBoardEl.querySelector('.okey-open-board-head');
        if (head) {
            head.innerHTML = `<span>AÇIK PERLER</span><strong>${meldScores.join(' + ')} = ${totalScore} PUAN</strong>`;
            head.title = `${meldScores.join(' + ')} = ${totalScore}`;
        }
        this.openedMeldsEl.innerHTML = melds.map((meld, index) => {
            const tiles = meld.map(tile => this.renderTileHTML(tile)).join('');
            const values = this.meldTileValues(meld);
            const score = values.reduce((sum, value) => sum + value, 0);
            return `<div class="okey-meld-group meld-anim" style="--meld-index:${index}">
                ${tiles}
                <span class="opened-meld-score" title="${values.join(' + ')} = ${score}">${score}</span>
            </div>`;
        }).join('');
    }

    renderLastDiscard() {
        if (!this.lastDiscardEl) return;
        if (!this.lastDiscard || !this.lastDiscard.tile) {
            this.lastDiscardEl.hidden = true;
            this.lastDiscardEl.innerHTML = '';
            return;
        }
        const { name, tile } = this.lastDiscard;
        this.lastDiscardEl.hidden = false;
        this.lastDiscardEl.innerHTML = `
            <span class="last-discard-label">SON ATILAN</span>
            <span class="last-discard-name">${name}</span>
            <span class="last-discard-tile color-${tile.color}">${tile.num}</span>
        `;
    }

    removeMeldsFromRack(melds) {
        const ids = new Set(melds.flat().map(tile => tile.id).filter(id => id !== undefined));
        for (let i = 0; i < this.playerRack.length; i++) {
            const tile = this.playerRack[i];
            if (tile && ids.has(tile.id)) this.playerRack[i] = null;
        }
    }

    compactPlayerRack() {
        const remaining = this.playerRack.filter(Boolean);
        this.playerRack = new Array(28).fill(null);
        remaining.forEach((tile, index) => { this.playerRack[index] = tile; });
        this.selectedSlotIndex = null;
    }

    // 15 taştan 1 tanesini ıskartaya ayırıp kalan 14 taşın bitip bitmediğini denetler
    checkWinningHand(tiles15) {
        if (this.is101Mode()) return this.check101Win(tiles15);
        if (tiles15.length !== 15) return { canWin: false };

        for (let i = 0; i < 15; i++) {
            const discardCandidate = tiles15[i];
            const remaining14 = tiles15.filter((_, idx) => idx !== i);
            const val = this.validate14Tiles(remaining14);
            if (val.valid) {
                return {
                    canWin: true,
                    discardTile: discardCandidate,
                    melds: val.melds,
                    isPairs: val.isPairs
                };
            }
        }
        return { canWin: false };
    }

    validate14Tiles(tiles14) {
        if (tiles14.length !== 14) return { valid: false };

        // 1. Durum: 7 Çift ile Bitiş
        const pairsResult = this.check7Pairs(tiles14);
        if (pairsResult.valid) {
            return { valid: true, melds: pairsResult.pairs, isPairs: true };
        }

        // 2. Durum: Seri ve Renk Grupları (Perler) ile Bitiş (Toplam 14 Taş, her per >= 3)
        const meldResult = this.solvePartition(tiles14);
        if (meldResult.valid) {
            return { valid: true, melds: meldResult.melds, isPairs: false };
        }

        return { valid: false };
    }

    check7Pairs(tiles14) {
        const regularMap = new Map();
        let wildcards = 0;

        for (const t of tiles14) {
            if (this.isRealOkey(t)) {
                wildcards++;
            } else {
                const eff = t.isFake ? { color: this.okeyTile.color, num: this.okeyTile.num } : t;
                const key = `${eff.color}-${eff.num}`;
                regularMap.set(key, (regularMap.get(key) || 0) + 1);
            }
        }

        const pairs = [];
        let singles = [];

        for (const [key, count] of regularMap.entries()) {
            const naturalPairs = Math.floor(count / 2);
            const parts = key.split('-');
            const col = parts[0];
            const n = isNaN(parts[1]) ? parts[1] : parseInt(parts[1]);

            for (let p = 0; p < naturalPairs; p++) {
                pairs.push([
                    { color: col, num: n, isFake: false },
                    { color: col, num: n, isFake: false }
                ]);
            }
            if (count % 2 === 1) {
                singles.push({ color: col, num: n, isFake: false });
            }
        }

        if (wildcards < singles.length) return { valid: false };

        // Tek kalan taşları joker ile eşleştir
        for (const s of singles) {
            pairs.push([s, { color: this.okeyTile.color, num: this.okeyTile.num, isFake: false, isOkeyJoker: true }]);
            wildcards--;
        }

        // Kalan jokerler de kendi aralarında çift olmalı
        if (wildcards % 2 !== 0) return { valid: false };
        for (let w = 0; w < wildcards; w += 2) {
            pairs.push([
                { color: this.okeyTile.color, num: this.okeyTile.num, isFake: false, isOkeyJoker: true },
                { color: this.okeyTile.color, num: this.okeyTile.num, isFake: false, isOkeyJoker: true }
            ]);
        }

        if (pairs.length === 7) return { valid: true, pairs: pairs };
        return { valid: false };
    }

    // 14 taşı geçerli perlere (seri veya aynı sayı farklı renk gruplarına) bölen kesin geri-izlemeli çözücü
    solvePartition(tiles14) {
        // Taşları standartlaştır
        const standardized = tiles14.map(t => {
            const isOkey = this.isRealOkey(t);
            if (t.isFake) {
                return { id: t.id, color: this.okeyTile.color, num: this.okeyTile.num, isWildcard: false, raw: t };
            }
            return { id: t.id, color: t.color, num: t.num, isWildcard: isOkey, raw: t };
        });

        const wildcards = standardized.filter(t => t.isWildcard);
        const regulars = standardized.filter(t => !t.isWildcard);

        // Düzenli taşları renge ve numaraya göre sırala
        regulars.sort((a, b) => {
            if (a.color !== b.color) return a.color.localeCompare(b.color);
            return a.num - b.num;
        });

        const pool = [...regulars, ...wildcards];
        const memo = new Map();

        const searchRaw = (currentPool) => {
            if (currentPool.length === 0) return [];
            if (currentPool.length < 3) return null;

            // Eğer kalanların hepsi jokeyse ve >= 3 ise grup oluşturabilirler
            if (currentPool.every(t => t.isWildcard)) {
                if (currentPool.length % 3 === 0 || currentPool.length >= 3) {
                    return [currentPool.map(t => t.raw)];
                }
                return null;
            }

            const first = currentPool[0]; // Sıradaki ilk taş bir pere girmek zorundadır!

            // 1. Birinci Seçenek: Birinci taş ile aynı sayı, farklı renk grupları (Per) ara
            const candGroups = this.findCandidateColorGroups(currentPool, first);
            for (const grp of candGroups) {
                const remaining = this.removeItemsFromPool(currentPool, grp);
                const sub = search(remaining);
                if (sub !== null) {
                    return [grp.map(t => t.raw), ...sub];
                }
            }

            // 2. İkinci Seçenek: Birinci taş ile aynı renk sıralı seriler (Run) ara
            const candRuns = this.findCandidateRuns(currentPool, first);
            for (const run of candRuns) {
                const remaining = this.removeItemsFromPool(currentPool, run);
                const sub = search(remaining);
                if (sub !== null) {
                    return [run.map(t => t.raw), ...sub];
                }
            }

            return null;
        };

        const search = (currentPool) => {
            const memoKey = currentPool.map(t => t.id).sort((a, b) => a - b).join(',');
            if (memo.has(memoKey)) return memo.get(memoKey);
            const result = searchRaw(currentPool);
            memo.set(memoKey, result);
            return result;
        };

        const result = search(pool);
        if (result !== null) {
            return { valid: true, melds: result };
        }
        return { valid: false };
    }

    findCandidateColorGroups(pool, first) {
        const groups = [];
        const num = first.num;
        // Farklı renkteki aynı numaralı taşları topla
        const availableColors = new Map();
        const availableWildcards = pool.filter(t => t.isWildcard);

        for (const t of pool) {
            if (!t.isWildcard && t.num === num) {
                if (!availableColors.has(t.color)) {
                    availableColors.set(t.color, t);
                }
            }
        }

        const distinctTiles = Array.from(availableColors.values());
        const totalDistinct = distinctTiles.length;
        const totalWild = availableWildcards.length;

        // Boyut 4 grup dene
        if (totalDistinct + totalWild >= 4 && totalDistinct <= 4) {
            const wildNeeded = 4 - totalDistinct;
            if (wildNeeded <= totalWild) {
                groups.push([...distinctTiles, ...availableWildcards.slice(0, wildNeeded)]);
            }
        }

        // Boyut 3 grup dene
        if (totalDistinct + totalWild >= 3) {
            if (totalDistinct >= 3) {
                // Sadece gerçek taşlarla 3'lü kombinasyon
                if (distinctTiles.includes(first)) {
                    const others = distinctTiles.filter(t => t !== first);
                    if (others.length >= 2) {
                        for (let a = 0; a < others.length; a++) {
                            for (let b = a + 1; b < others.length; b++) {
                                groups.push([first, others[a], others[b]]);
                            }
                        }
                    }
                }
            }
            // 2 gerçek + 1 joker
            if (totalDistinct >= 2 && totalWild >= 1) {
                const others = distinctTiles.filter(t => t !== first);
                for (const o of others) {
                    groups.push([first, o, availableWildcards[0]]);
                }
            }
            // 1 gerçek (first) + 2 joker
            if (totalWild >= 2) {
                groups.push([first, availableWildcards[0], availableWildcards[1]]);
            }
        }

        return groups;
    }

    findCandidateRuns(pool, first) {
        const runs = [];
        const col = first.color;
        const wildcards = pool.filter(t => t.isWildcard);

        // Sıralı seri 3 ile 13 arasında olabilir
        // first.num'dan başlayan seriler
        for (let len = 3; len <= 8; len++) {
            // Normal seri (startNum ... startNum + len - 1)
            const matched = this.matchSequence(pool, col, first.num, len, wildcards);
            if (matched && matched.includes(first)) {
                runs.push(matched);
            }
        }

        // 101 okeyde 13'ten sonra 1 gelmez; 12-13-1 serisi geçerli değildir.
        return runs;
    }

    matchSequence(pool, color, startNum, len, availableWildcards) {
        if (startNum + len - 1 > 13) return null;
        const seq = [];
        for (let i = 0; i < len; i++) seq.push(startNum + i);
        return this.matchExplicitSequence(pool, color, seq, availableWildcards);
    }

    matchExplicitSequence(pool, color, seq, availableWildcards) {
        const result = [];
        const usedWildcardIndices = new Set();
        const usedPoolIds = new Set();

        for (const num of seq) {
            // Havuzda bu renkte ve bu numarada taş var mı?
            const tile = pool.find(t => !t.isWildcard && t.color === color && t.num === num && !usedPoolIds.has(t.id));
            if (tile) {
                result.push(tile);
                usedPoolIds.add(tile.id);
            } else {
                // Yoksa joker kullan
                let foundWild = null;
                for (let w = 0; w < availableWildcards.length; w++) {
                    if (!usedWildcardIndices.has(w) && !usedPoolIds.has(availableWildcards[w].id)) {
                        foundWild = availableWildcards[w];
                        usedWildcardIndices.add(w);
                        usedPoolIds.add(foundWild.id);
                        break;
                    }
                }
                if (foundWild) {
                    result.push(foundWild);
                } else {
                    return null; // Tamamlanamadı
                }
            }
        }
        return result;
    }

    removeItemsFromPool(pool, itemsToRemove) {
        const removeIds = new Set(itemsToRemove.map(t => t.id));
        return pool.filter(t => !removeIds.has(t.id));
    }

    /* ========================================================
       ISTAKA DÜZENLEME (SERİYE DİZ & ÇİFTLERE DİZ)
       2 Katlı ıstakada perler arasına boşluk bırakarak yerleştirir!
       ======================================================== */
    sortPlayerHandRuns() {
        const tiles = this.playerRack.filter(t => t !== null);
        if (tiles.length === 0) return;

        // Taşları renge ve numaraya göre sırala
        tiles.sort((a, b) => {
            if (a.isFake && !b.isFake) return 1;
            if (!a.isFake && b.isFake) return -1;
            if (a.color !== b.color) return a.color.localeCompare(b.color);
            return (typeof a.num === 'number' ? a.num : 99) - (typeof b.num === 'number' ? b.num : 99);
        });

        const newRack = new Array(28).fill(null);
        let currentSlot = 0;
        let lastColor = null;

        for (let i = 0; i < tiles.length; i++) {
            const t = tiles[i];
            const remaining = tiles.length - i;

            if (currentSlot === 13) currentSlot = 14; // Üst kat 13 taş taşır, alta geç
            // Renk değişiminde, sığdığı sürece bir boşluk bırak
            if (lastColor && lastColor !== t.color && currentSlot < 27 && (28 - currentSlot) > remaining) {
                currentSlot++;
            }
            if (currentSlot >= 28) {
                const fallback = newRack.indexOf(null);
                if (fallback === -1) break;
                currentSlot = fallback;
            }

            newRack[currentSlot] = t;
            lastColor = t.color;
            currentSlot++;
        }

        this.playerRack = newRack;
        this.selectedSlotIndex = null;
        if (window.turkishSound) window.turkishSound.playTileClick();
        this.renderPlayerRack();
        this.setStatus("Istakanız 2 kata serilere göre şık bir şekilde dizildi.");
    }

    sortPlayerHandPairs() {
        const tiles = this.playerRack.filter(t => t !== null);
        if (tiles.length === 0) return;

        tiles.sort((a, b) => {
            const numA = typeof a.num === 'number' ? a.num : 99;
            const numB = typeof b.num === 'number' ? b.num : 99;
            if (numA !== numB) return numA - numB;
            return a.color.localeCompare(b.color);
        });

        const newRack = new Array(28).fill(null);
        let currentSlot = 0;

        for (let i = 0; i < tiles.length; i++) {
            if (currentSlot === 13) currentSlot = 14;
            if (currentSlot >= 28) {
                const fallback = newRack.indexOf(null);
                if (fallback === -1) break;
                currentSlot = fallback;
            }

            newRack[currentSlot] = tiles[i];
            currentSlot++;

            // Her 2 taşta bir (çift) 1 boşluk bırak; yer varsa
            const remaining = tiles.length - i - 1;
            if (i % 2 === 1 && currentSlot < 27 && (28 - currentSlot) > remaining) {
                currentSlot++;
            }
        }

        this.playerRack = newRack;
        this.selectedSlotIndex = null;
        if (window.turkishSound) window.turkishSound.playTileClick();
        this.renderPlayerRack();
        this.setStatus("Istakanız 2 kata çiftlere göre düzenlendi.");
    }

    setStatus(msg) {
        if (this.statusMsgEl) this.statusMsgEl.textContent = msg;
    }
}


/* ========================================================
   3. KEMANKEŞ: GELENEKSEL OSMANLI OKÇULUĞU (GELİŞMİŞ MOTOR)
   ======================================================== */
class KemankesGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.running = false;
        this.loopToken = 0;
        this.mode = 'puta'; // 'puta', 'menzil', 'hareketli', 'kus', 'firtina'
        this.score = 0;
        this.arrowsLeft = 10;
        this.combo = 1;
        this.highScore = parseInt(localStorage.getItem('kemankes_highscore') || '0');
        this.menzilRecord = parseInt(localStorage.getItem('kemankes_menzil_record') || '0');

        this.wind = 0; // -8 to +8 m/s
        this.power = 0; // 0 - 100
        this.isPulling = false;
        this.pullStartTime = 0;
        this.pullDir = 1;
        this.bowAngle = -0.32; // rad
        this.mousePos = { x: 300, y: 200 };

        this.arrow = null;
        this.cameraX = 0;
        this.distanceMeters = 0;
        this.target = { x: 580, y: 200, radius: 95, vy: 65, dir: 1 };
        this.hits = [];
        this.particles = [];
        this.bannerWave = 0;
        this.bird = null;
        this.stormTimer = 0;
        this.lightning = 0;

        this.bindEvents();
        this.resize();
        this.resetWind();
    }

    resize() {
        if (!this.canvas) return;
        const rect = this.canvas.parentElement ? this.canvas.parentElement.getBoundingClientRect() : null;
        this.canvas.width = Math.min((rect && rect.width > 200 ? rect.width : 760), 760);
        this.canvas.height = 420;
        this.target.x = this.canvas.width - 95;
        this.target.y = this.canvas.height / 2;
    }

    setMode(mode) {
        this.mode = mode;
        this.start();
    }

    resetWind() {
        const strength = this.mode === 'firtina' ? 13 : 6;
        this.wind = Math.round((Math.random() * strength * 2 - strength) * 10) / 10;
        const windEl = document.getElementById('kemankesWind');
        const compassEl = document.getElementById('kemankesCompass');
        if (windEl) {
            let label = 'Sakin';
            if (this.wind > 0) label = `➡️ ${this.wind} m/s Doğu (Arka Rüzgarı)`;
            else if (this.wind < 0) label = `⬅️ ${Math.abs(this.wind)} m/s Batı (Karşı Rüzgarı)`;
            windEl.textContent = label;
        }
        if (compassEl) {
            compassEl.style.transform = `rotate(${this.wind * 10}deg)`;
        }
    }

    bindEvents() {
        const updateAim = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const cx = (clientX - rect.left) * (this.canvas.width / rect.width);
            const cy = (clientY - rect.top) * (this.canvas.height / rect.height);
            this.mousePos = { x: cx, y: cy };

            const bowX = 85;
            const bowY = this.canvas.height / 2 + 35;
            const dx = cx - bowX;
            const dy = cy - bowY;
            if (dx > 20) {
                let ang = Math.atan2(dy, dx);
                this.bowAngle = Math.max(-0.95, Math.min(0.35, ang));
            }
        };

        const startPull = (e) => {
            if (!this.running || this.arrow || this.arrowsLeft <= 0) return;
            if (e.target === this.canvas) e.preventDefault();
            this.isPulling = true;
            this.pullStartTime = performance.now();
            this.power = 15;
            this.pullDir = 1;
            if (window.turkishSound) window.turkishSound.playTileClick();
        };

        const releasePull = () => {
            if (!this.isPulling) return;
            this.isPulling = false;
            this.shoot();
        };

        this.canvas.addEventListener('mousemove', updateAim);
        this.canvas.addEventListener('touchmove', (e) => { e.preventDefault(); updateAim(e); }, { passive: false });

        this.canvas.addEventListener('mousedown', startPull);
        window.addEventListener('mouseup', releasePull);

        this.canvas.addEventListener('touchstart', (e) => { startPull(e); }, { passive: false });
        window.addEventListener('touchend', releasePull);

        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !e.repeat) {
                const kemankesTab = document.getElementById('tab-kemankes');
                if (kemankesTab && kemankesTab.classList.contains('active')) {
                    e.preventDefault();
                    startPull(e);
                }
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.code === 'Space') {
                const kemankesTab = document.getElementById('tab-kemankes');
                if (kemankesTab && kemankesTab.classList.contains('active')) {
                    e.preventDefault();
                    releasePull();
                }
            }
        });
    }

    start() {
        this.loopToken++;
        const token = this.loopToken;
        this.resize();
        this.score = 0;
        this.arrowsLeft = this.mode === 'menzil' ? 5 : (this.mode === 'kus' ? 8 : 10);
        this.combo = 1;
        this.power = 0;
        this.isPulling = false;
        this.hits = [];
        this.particles = [];
        this.arrow = null;
        this.cameraX = 0;
        this.distanceMeters = 0;
        this.stormTimer = 0;
        this.lightning = 0;
        this.bird = this.mode === 'kus' ? this.createBird() : null;
        this.running = true;
        this.resetWind();
        this.updateUI();
        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.loop(t, token));
        if (window.turkishSound) window.turkishSound.playKudum(true);
    }

    stop() {
        this.running = false;
        this.loopToken++;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('kemankes_highscore', this.highScore);
        }
        if (this.distanceMeters > this.menzilRecord) {
            this.menzilRecord = Math.round(this.distanceMeters);
            localStorage.setItem('kemankes_menzil_record', this.menzilRecord);
        }
        this.updateUI();
        this.renderGameOver();
    }

    createBird() {
        return {
            x: this.canvas.width - 90,
            y: 110 + Math.random() * (this.canvas.height - 280),
            vx: -(48 + Math.random() * 34),
            wing: 0,
            radius: 24,
            flash: 0
        };
    }

    resetBird() {
        this.bird = this.createBird();
    }

    shoot() {
        if (this.arrowsLeft <= 0) return;
        this.arrowsLeft--;
        this.updateUI();

        // Fazla gerilme titremesi (tremor)
        let aimSpread = 0;
        const holdTime = (performance.now() - this.pullStartTime) / 1000;
        if (holdTime > 2.2) {
            aimSpread = (Math.random() - 0.5) * 0.16;
        }

        const angle = this.bowAngle + aimSpread;
        const baseSpeed = this.mode === 'menzil' ? 440 : 310;
        const speed = baseSpeed + (this.power / 100) * (this.mode === 'menzil' ? 380 : 260);

        this.arrow = {
            x: 88,
            y: this.canvas.height / 2 + 35,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            length: 46,
            tailAngle: angle,
            wobble: 0,
            trail: []
        };

        if (window.turkishSound) {
            window.turkishSound.playBowShoot();
        }
    }

    createParticles(x, y, color, count = 18) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 140 + 30;
            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 20,
                color,
                size: Math.random() * 4 + 2,
                alpha: 1.0,
                life: 0.8
            });
        }
    }

    updateUI() {
        const scoreEl = document.getElementById('kemankesScore');
        const arrowsEl = document.getElementById('kemankesArrows');
        const rankEl = document.getElementById('kemankesRank');
        const highEl = document.getElementById('kemankesHighScore');
        const comboEl = document.getElementById('kemankesCombo');
        const powerEl = document.getElementById('kemankesPower');

        if (scoreEl) scoreEl.textContent = this.score;
        if (arrowsEl) arrowsEl.textContent = '🏹'.repeat(Math.max(0, this.arrowsLeft));
        if (powerEl) powerEl.textContent = `%${Math.round(this.power)}`;
        if (highEl) {
            highEl.textContent = this.mode === 'menzil' ? `${this.menzilRecord} m` : this.highScore;
        }
        if (comboEl) {
            comboEl.textContent = this.combo > 1 ? `🔥 ${this.combo}x Kombo!` : '';
        }

        let rank = "Acemi Talimci";
        if (this.mode === 'menzil') {
            if (this.distanceMeters >= 846) rank = "🏆 Efsanevi Tozkoparan (846m)";
            else if (this.distanceMeters >= 600) rank = "🎖️ Menzil Sahibi Kemankeş";
            else if (this.distanceMeters >= 400) rank = "🎯 Yiğit Nişancı";
            else rank = "Acemi Menzilci";
        } else if (this.mode === 'kus') {
            if (this.score >= 700) rank = "🦅 Şahin Gözlü Avcı";
            else if (this.score >= 400) rank = "🕊️ Usta Kuşçu";
            else if (this.score >= 180) rank = "🏹 Çırak Avcı";
            else rank = "Acemi Avcı";
        } else if (this.mode === 'firtina') {
            if (this.score >= 800) rank = "🌩️ Fırtına Kahramanı";
            else if (this.score >= 500) rank = "🌪️ Rüzgâr Ustası";
            else if (this.score >= 250) rank = "🎯 Sert Nişancı";
            else rank = "Acemi Fırtınacı";
        } else {
            if (this.score >= 800) rank = "🏆 Tozkoparan İskender";
            else if (this.score >= 500) rank = "🎖️ Kabza Sahibi Kemankeş";
            else if (this.score >= 300) rank = "🎯 Usta Nişancı";
            else if (this.score >= 150) rank = "🏹 Yiğit Pehlivan";
        }

        if (rankEl) rankEl.textContent = rank;
    }

    loop(timestamp, token = this.loopToken) {
        if (!this.running || token !== this.loopToken) return;
        const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
        this.lastTime = timestamp;

        this.update(dt);
        this.draw();

        requestAnimationFrame((t) => this.loop(t, token));
    }

    update(dt) {
        this.bannerWave += dt * 5;

        // Gerilme kuvveti salınımı
        if (this.isPulling) {
            this.power += 140 * dt * this.pullDir;
            if (this.power >= 100) { this.power = 100; this.pullDir = -1; }
            if (this.power <= 20) { this.power = 20; this.pullDir = 1; }
            this.updateUI();
        }

        // Hareketli hedef modu
        if (this.mode === 'hareketli') {
            this.target.y += this.target.vy * this.target.dir * dt;
            if (this.target.y < 110) { this.target.y = 110; this.target.dir = 1; }
            if (this.target.y > this.canvas.height - 110) { this.target.y = this.canvas.height - 110; this.target.dir = -1; }
        }

        // Fırtına modu: ani rüzgâr değişimleri ve şimşek
        if (this.mode === 'firtina') {
            this.stormTimer += dt;
            this.lightning = Math.max(0, this.lightning - dt * 2.2);
            if (this.stormTimer > 2.4) {
                this.stormTimer = 0;
                this.resetWind();
                this.lightning = 0.35;
            }
        }

        // Uçan kuş modu
        if (this.mode === 'kus' && this.bird) {
            const bird = this.bird;
            bird.x += bird.vx * dt;
            bird.y += Math.sin(performance.now() * 0.0028) * 16 * dt;
            bird.wing += dt * 11;
            if (bird.flash > 0) bird.flash -= dt;

            if (bird.x < 165) this.resetBird();

            if (this.arrow) {
                const dist = Math.hypot(this.arrow.x - bird.x, this.arrow.y - bird.y);
                if (dist < bird.radius + 7) {
                    const isBull = dist < 10;
                    const pts = (isBull ? 120 : 70) * this.combo;
                    this.score += pts;
                    if (isBull) this.combo = Math.min(4, this.combo + 1);
                    else this.combo = 1;
                    this.createParticles(bird.x, bird.y, isBull ? '#ffd700' : '#f4a261', isBull ? 30 : 18);
                    if (window.turkishSound) {
                        window.turkishSound.playArrowHit(true);
                        if (window.turkishSound.playChime) window.turkishSound.playChime();
                    }
                    if (window.showToast) window.showToast(isBull ? `🎯 KUŞU TAM GÖĞSÜNDEN VURDUN! (+${pts})` : `🕊️ Kuşu kanadından vurdun! (+${pts})`, '🏹');
                    this.arrow = null;
                    this.resetBird();
                    this.updateUI();
                    if (this.arrowsLeft <= 0) setTimeout(() => this.stop(), 900);
                } else if (this.arrow.x > this.canvas.width + 80 || this.arrow.y > this.canvas.height + 80) {
                    this.combo = 1;
                    this.arrow = null;
                    this.updateUI();
                    if (this.arrowsLeft <= 0) setTimeout(() => this.stop(), 900);
                }
            }
        }

        // Parçacıklar
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.vy += 200 * dt;
            p.alpha -= dt / p.life;
            if (p.alpha <= 0) this.particles.splice(i, 1);
        }

        // Saplı okların titreşimi
        for (const hit of this.hits) {
            if (hit.wobble > 0) {
                hit.wobble -= dt * 6;
                hit.currAngle = hit.angle + Math.sin(hit.wobble * 22) * (hit.wobble * 0.15);
            }
        }

        // Uçan ok
        if (this.arrow) {
            this.arrow.trail.push({ x: this.arrow.x, y: this.arrow.y });
            if (this.arrow.trail.length > 8) this.arrow.trail.shift();

            this.arrow.x += this.arrow.vx * dt;
            this.arrow.y += this.arrow.vy * dt;

            // Yerçekimi & rüzgar fiziği
            const grav = this.mode === 'menzil' ? 140 : 210;
            this.arrow.vy += grav * dt;
            this.arrow.vx += this.wind * 4.8 * dt;
            this.arrow.tailAngle = Math.atan2(this.arrow.vy, this.arrow.vx);

            if (this.mode === 'menzil') {
                // Menzil atışında kamera takip eder
                this.distanceMeters = Math.max(0, (this.arrow.x - 88) * 1.35);
                this.cameraX = Math.max(0, this.arrow.x - 250);

                // Yere düşüş
                if (this.arrow.y >= this.canvas.height - 50) {
                    this.arrow.y = this.canvas.height - 50;
                    this.score = Math.round(this.distanceMeters);
                    this.createParticles(this.arrow.x, this.arrow.y, '#d4af37', 24);
                    if (window.turkishSound) window.turkishSound.playArrowHit(this.distanceMeters >= 800);
                    this.arrow = null;
                    this.updateUI();
                    if (this.arrowsLeft <= 0) setTimeout(() => this.stop(), 1000);
                }
            } else {
                // Puta veya Hareketli Mod
                const tx = this.target.x;
                const ty = this.target.y;

                if (this.arrow.x >= tx - 22) {
                    const dy = Math.abs(this.arrow.y - ty);
                    if (dy <= this.target.radius) {
                        let pts = 0;
                        let isBullseye = false;
                        let pColor = '#d4af37';

                        if (dy < 18) {
                            pts = 100 * this.combo;
                            isBullseye = true;
                            this.combo = Math.min(4, this.combo + 1);
                            pColor = '#ffd700';
                            if (window.showToast) window.showToast(`🎯 TAM 12'DEN! GÖZ VURULDU! (+${pts} Puan)`, '🏹');
                        } else if (dy < 42) {
                            pts = 70 * this.combo;
                            pColor = '#ffffff';
                        } else if (dy < 70) {
                            pts = 40;
                            this.combo = 1;
                            pColor = '#c1121f';
                        } else {
                            pts = 20;
                            this.combo = 1;
                            pColor = '#028090';
                        }

                        this.score += pts;
                        this.createParticles(tx, this.arrow.y, pColor, isBullseye ? 30 : 16);

                        this.hits.push({
                            x: tx + (Math.random() * 8 - 4),
                            y: this.arrow.y,
                            offsetY: this.arrow.y - ty,
                            angle: this.arrow.tailAngle,
                            currAngle: this.arrow.tailAngle,
                            wobble: 1.0,
                            points: pts,
                            isBullseye
                        });

                        if (window.turkishSound) {
                            window.turkishSound.playArrowHit(isBullseye);
                            if (isBullseye && window.turkishSound.playChime) window.turkishSound.playChime();
                        }

                        this.arrow = null;
                        this.resetWind();
                        this.updateUI();

                        if (this.arrowsLeft <= 0) setTimeout(() => this.stop(), 900);
                    } else if (this.arrow.x > this.canvas.width + 60 || this.arrow.y > this.canvas.height + 60) {
                        this.combo = 1;
                        this.arrow = null;
                        this.resetWind();
                        this.updateUI();
                        if (this.arrowsLeft <= 0) setTimeout(() => this.stop(), 900);
                    }
                }
            }
        }
    }

    draw() {
        const ctx = this.ctx;
        ctx.save();

        if (this.mode === 'menzil') {
            ctx.translate(-this.cameraX, 0);
        }

        // Gökyüzü (Okmeydanı Gün Batımı & Bozkır)
        const skyGrad = ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        skyGrad.addColorStop(0, this.mode === 'firtina' ? '#050912' : '#0c1626');
        skyGrad.addColorStop(0.65, this.mode === 'firtina' ? '#18253b' : '#203a5e');
        skyGrad.addColorStop(1, this.mode === 'firtina' ? '#3b3326' : '#664228');
        ctx.fillStyle = skyGrad;
        // Kamera ne kadar kayarsa kaysın gökyüzü ekranı tamamen doldurur
        ctx.fillRect(this.cameraX - 30, 0, this.canvas.width + 60, this.canvas.height);

        // Uzak Selçuklu Kümbetleri & Dağ Silüeti
        this.drawBackgroundScenery(ctx);

        // Okmeydanı Çimeni & Toprağı
        const groundY = this.canvas.height - 65;
        const grassGrad = ctx.createLinearGradient(0, groundY, 0, this.canvas.height);
        grassGrad.addColorStop(0, '#2d5a3c');
        grassGrad.addColorStop(0.35, '#1e3d28');
        grassGrad.addColorStop(1, '#0e2014');
        ctx.fillStyle = grassGrad;
        // Çim, kamerayla birlikte sonsuzmuş gibi kayar; uzak atışta kaybolmaz
        ctx.fillRect(this.cameraX - 120, groundY, this.canvas.width + 240, 90);
        this.drawGrassTufts(ctx, groundY);

        // Tarihi Menzil Taşı
        this.drawMenzilStone(ctx, 360, groundY);
        if (this.mode === 'menzil') {
            for (let stoneX = 960; stoneX < this.cameraX + this.canvas.width + 400; stoneX += 620) {
                this.drawMenzilStone(ctx, stoneX, groundY);
            }
        }

        // Rüzgar Sancağı (Hilal ve Yıldızlı Al Bayrak)
        this.drawWindFlag(ctx, 280, 40);

        if (this.mode === 'kus') {
            this.drawBird(ctx);
        } else if (this.mode === 'menzil') {
            // Menzil Direkleri ve Metre İşaretleri
            this.drawDistanceMarkers(ctx, groundY);
        } else {
            // Puta Hedefi
            this.drawPuta(ctx);
        }

        // Kemankeş Yayı ve Okçu
        this.drawBowman(ctx);

        // Uçan Ok
        this.drawArrow(ctx);

        // Parçacıklar
        this.drawParticles(ctx);

        ctx.restore();

        // Arayüz Göstergeleri (Kamera Bağımsız)
        this.drawHUD(ctx);
    }

    drawBackgroundScenery(ctx) {
        const h = this.canvas.height;
        const width = this.canvas.width;
        const tile = 780;
        const start = Math.floor((this.cameraX - 40) / tile) * tile;

        // Uzak tepeler: kamera kaydıkça tekrar eder, ufuk boş kalmaz
        for (let base = start - tile; base < this.cameraX + width + tile; base += tile) {
            ctx.fillStyle = 'rgba(15, 25, 45, 0.55)';
            ctx.beginPath();
            ctx.moveTo(base, h - 65);
            ctx.lineTo(base + 90, h - 155);
            ctx.lineTo(base + 210, h - 92);
            ctx.lineTo(base + 330, h - 168);
            ctx.lineTo(base + 470, h - 82);
            ctx.lineTo(base + 610, h - 148);
            ctx.lineTo(base + 780, h - 65);
            ctx.fill();

            // Kümbet ve servi silüetleri
            ctx.fillStyle = 'rgba(212, 175, 55, 0.16)';
            ctx.beginPath();
            ctx.arc(base + 250, h - 120, 18, Math.PI, 0);
            ctx.fill();
            ctx.fillRect(base + 232, h - 120, 36, 56);
            ctx.beginPath();
            ctx.moveTo(base + 560, h - 62);
            ctx.lineTo(base + 568, h - 142);
            ctx.lineTo(base + 576, h - 62);
            ctx.fill();
        }
    }

    drawGrassTufts(ctx, groundY) {
        const width = this.canvas.width;
        const start = Math.floor((this.cameraX - 80) / 24) * 24;
        ctx.save();
        ctx.lineWidth = 1.2;
        for (let x = start; x < this.cameraX + width + 100; x += 24) {
            const seed = Math.sin(x * 12.9898) * 43758.5453;
            const r = seed - Math.floor(seed);
            const height = 4 + r * 9;
            const sway = Math.sin(x * 0.03 + performance.now() * 0.0015) * 2;
            ctx.strokeStyle = r > 0.5 ? 'rgba(122, 168, 116, 0.55)' : 'rgba(74, 122, 80, 0.6)';
            ctx.beginPath();
            ctx.moveTo(x, groundY + 10 + r * 12);
            ctx.quadraticCurveTo(x + sway, groundY + 2, x + sway * 1.6, groundY - height);
            ctx.stroke();
        }
        ctx.restore();
    }

    drawBird(ctx) {
        if (!this.bird) return;
        const b = this.bird;
        const wing = Math.sin(b.wing) * 12;
        ctx.save();
        ctx.translate(b.x, b.y);

        // Kanatlar
        ctx.fillStyle = '#e9e2d0';
        ctx.beginPath();
        ctx.moveTo(-2, 0);
        ctx.quadraticCurveTo(-20, -18 - wing, -40, -2 - wing * 0.4);
        ctx.quadraticCurveTo(-20, 2, -2, 4);
        ctx.fill();

        // Gövde
        ctx.fillStyle = '#f7f3e8';
        ctx.beginPath();
        ctx.ellipse(0, 0, 24, 13, -0.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(74, 60, 35, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Baş ve gaga
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(22, -7, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#d4af37';
        ctx.beginPath();
        ctx.moveTo(29, -8);
        ctx.lineTo(40, -4);
        ctx.lineTo(29, -1);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath();
        ctx.arc(24, -10, 1.7, 0, Math.PI * 2);
        ctx.fill();

        // Kuyruk
        ctx.fillStyle = '#d8cfbb';
        ctx.beginPath();
        ctx.moveTo(-20, 0);
        ctx.lineTo(-42, 7);
        ctx.lineTo(-38, -3);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    drawMenzilStone(ctx, x, y) {
        ctx.save();
        ctx.fillStyle = '#6e6255';
        ctx.fillRect(x - 12, y - 55, 24, 60);

        // Kitabe Tepesi
        ctx.beginPath();
        ctx.arc(x, y - 55, 12, Math.PI, 0);
        ctx.fill();

        // Altın Hat Yazısı Efekti
        ctx.fillStyle = '#d4af37';
        ctx.fillRect(x - 8, y - 48, 16, 3);
        ctx.fillRect(x - 6, y - 40, 12, 3);
        ctx.fillRect(x - 7, y - 32, 14, 3);
        ctx.restore();
    }

    drawWindFlag(ctx, fx, fy) {
        ctx.save();
        // Direk
        ctx.fillStyle = '#999999';
        ctx.fillRect(fx, fy, 4, 52);

        // Al Bayrak & Hilal
        const wave = Math.sin(this.bannerWave) * 4;
        const windShift = this.wind * 4.5;
        const flagLen = 34 + Math.abs(windShift);
        const dirSign = this.wind >= 0 ? 1 : -1;

        ctx.fillStyle = '#c1121f';
        ctx.beginPath();
        ctx.moveTo(fx + 4, fy);
        ctx.quadraticCurveTo(fx + 4 + (flagLen / 2) * dirSign, fy + wave, fx + 4 + flagLen * dirSign, fy + 8);
        ctx.lineTo(fx + 4, fy + 22);
        ctx.closePath();
        ctx.fill();

        // Küçük Hilal
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(fx + 4 + 14 * dirSign, fy + 10, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#c1121f';
        ctx.beginPath();
        ctx.arc(fx + 4 + (14 + 1.5) * dirSign, fy + 10, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    drawPuta(ctx) {
        const tx = this.target.x;
        const ty = this.target.y;
        const r = this.target.radius;

        // Puta Ahşap Ayakları & Sehpası
        ctx.fillStyle = '#3a2010';
        ctx.fillRect(tx - 8, ty + 20, 16, this.canvas.height - ty - 20);

        // Puta Arkalığı (Geleneksel Deri Şekli - Armudi / Oval)
        ctx.save();
        ctx.translate(tx, ty);

        // Puta Halkaları
        const rings = [
            { r: r, color: '#f8f9fa', border: '#111' },
            { r: r * 0.72, color: '#028090', border: '#014f59' },
            { r: r * 0.44, color: '#c1121f', border: '#780000' },
            { r: r * 0.20, color: '#d4af37', border: '#ffd700' } // GÖZ
        ];

        rings.forEach(ring => {
            ctx.beginPath();
            ctx.fillStyle = ring.color;
            ctx.ellipse(0, 0, ring.r * 0.85, ring.r, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = ring.border;
            ctx.lineWidth = 1.8;
            ctx.stroke();
        });

        // "GÖZ" Parıltısı
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Saplanan Oklar
        for (const hit of this.hits) {
            ctx.save();
            const currY = this.mode === 'hareketli' ? ty + hit.offsetY : hit.y;
            ctx.translate(hit.x, currY);
            ctx.rotate(hit.currAngle);

            ctx.strokeStyle = '#d4af37';
            ctx.lineWidth = 2.8;
            ctx.beginPath();
            ctx.moveTo(-40, 0);
            ctx.lineTo(0, 0);
            ctx.stroke();

            // Ok Yeleği
            ctx.fillStyle = hit.isBullseye ? '#ffd700' : '#c1121f';
            ctx.fillRect(-40, -4, 10, 8);
            ctx.restore();
        }
    }

    drawDistanceMarkers(ctx, groundY) {
        for (let m = 100; m <= 4500; m += 100) {
            const x = 88 + (m / 1.35);
            ctx.fillStyle = '#d4af37';
            ctx.fillRect(x - 2, groundY - 25, 4, 30);
            ctx.font = 'bold 11px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(`${m}m`, x, groundY - 30);

            if (m === 846) {
                // Tozkoparan Taşı
                ctx.fillStyle = '#ff4d4d';
                ctx.fillRect(x - 6, groundY - 45, 12, 50);
                ctx.fillStyle = '#ffd700';
                ctx.fillText('Tozkoparan Rekoru (846m)', x, groundY - 52);
            }
        }
    }

    drawBowman(ctx) {
        const bowX = 85;
        const bowY = this.canvas.height / 2 + 35;

        ctx.save();
        ctx.translate(bowX, bowY);
        ctx.rotate(this.bowAngle);

        // Titreme (Tremor) efekti
        const holdTime = this.isPulling ? (performance.now() - this.pullStartTime) / 1000 : 0;
        if (holdTime > 2.2) {
            const shake = Math.sin(performance.now() * 0.04) * 3.5;
            ctx.translate(0, shake);
        }

        // Osmanlı Kompozit Yayı (Akçaağaç, Boynuz, Sinir)
        ctx.strokeStyle = '#8a4b2d';
        ctx.lineWidth = 5.2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(0, 0, 36, -Math.PI / 2.3, Math.PI / 2.3);
        ctx.stroke();

        // Kiriş İpi (Çile)
        const pullDist = this.isPulling ? (this.power / 100) * 28 : 0;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(16, -34);
        ctx.lineTo(-pullDist, 0);
        ctx.lineTo(16, 34);
        ctx.stroke();

        // Kirişteki Ok
        if (this.isPulling) {
            ctx.strokeStyle = '#e9c46a';
            ctx.lineWidth = 2.6;
            ctx.beginPath();
            ctx.moveTo(-pullDist, 0);
            ctx.lineTo(46 - pullDist, 0);
            ctx.stroke();

            // Temren (Demir uç)
            ctx.fillStyle = '#e2e8f0';
            ctx.beginPath();
            ctx.moveTo(46 - pullDist, -3.5);
            ctx.lineTo(54 - pullDist, 0);
            ctx.lineTo(46 - pullDist, 3.5);
            ctx.closePath();
            ctx.fill();
        }

        // Nişangah Kılavuzu (Hafif kesikli rehber)
        if (this.isPulling) {
            ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
            ctx.setLineDash([4, 6]);
            ctx.beginPath();
            ctx.moveTo(50, 0);
            ctx.lineTo(180, 0);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        ctx.restore();
    }

    drawArrow(ctx) {
        if (!this.arrow) return;
        ctx.save();
        ctx.translate(this.arrow.x, this.arrow.y);
        ctx.rotate(this.arrow.tailAngle);

        // Ok Şaftı
        ctx.strokeStyle = '#e9c46a';
        ctx.lineWidth = 2.8;
        ctx.beginPath();
        ctx.moveTo(-this.arrow.length, 0);
        ctx.lineTo(0, 0);
        ctx.stroke();

        // Temren
        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.moveTo(0, -4);
        ctx.lineTo(8, 0);
        ctx.lineTo(0, 4);
        ctx.closePath();
        ctx.fill();

        // Yelek
        ctx.fillStyle = '#c1121f';
        ctx.fillRect(-this.arrow.length, -4.5, 11, 9);

        ctx.restore();
    }

    drawParticles(ctx) {
        for (const p of this.particles) {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    drawHUD(ctx) {
        // Mod ve mesafe rozeti
        const modeLabels = {
            puta: '🎯 Puta talimi',
            hareketli: '🌀 Hareketli hedef',
            menzil: '📏 Menzil atışı',
            kus: '🕊️ Uçan kuş avı',
            firtina: '🌪️ Fırtına talimi'
        };
        ctx.save();
        ctx.textAlign = 'right';
        ctx.fillStyle = 'rgba(10, 15, 25, 0.72)';
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.55)';
        ctx.lineWidth = 1;
        const badgeW = 212;
        ctx.fillRect(this.canvas.width - badgeW - 18, 18, badgeW, 48);
        ctx.strokeRect(this.canvas.width - badgeW - 18, 18, badgeW, 48);
        ctx.fillStyle = '#f7ebba';
        ctx.font = 'bold 13px "Segoe UI", sans-serif';
        ctx.fillText(modeLabels[this.mode] || 'Talim', this.canvas.width - 30, 38);
        ctx.font = '12px "Segoe UI", sans-serif';
        ctx.fillStyle = '#ffffff';
        if (this.mode === 'menzil') {
            ctx.fillText(`Menzil: ${Math.round(this.distanceMeters)} m · Rekor: ${this.menzilRecord} m`, this.canvas.width - 30, 56);
        } else if (this.mode === 'kus') {
            ctx.fillText(`Kalan ok: ${this.arrowsLeft} / 8 · Puan: ${this.score}`, this.canvas.width - 30, 56);
        } else if (this.mode === 'firtina') {
            ctx.fillText(`Rüzgâr: ${this.wind} m/s · ani değişim`, this.canvas.width - 30, 56);
        } else {
            ctx.fillText(`Puan: ${this.score} · Kombo: ${this.combo}x`, this.canvas.width - 30, 56);
        }
        ctx.restore();

        // Fırtına yağmuru ve şimşek
        if (this.mode === 'firtina') {
            ctx.save();
            ctx.strokeStyle = 'rgba(180, 210, 255, 0.28)';
            ctx.lineWidth = 1;
            const time = performance.now() * 0.001;
            for (let i = 0; i < 46; i++) {
                const x = (i * 137 + time * 480) % (this.canvas.width + 200) - 100;
                const y = ((i * 83 + time * 720) % this.canvas.height);
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x - 9, y + 22);
                ctx.stroke();
            }
            if (this.lightning > 0) {
                ctx.fillStyle = `rgba(220, 235, 255, ${this.lightning * 0.55})`;
                ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            }
            ctx.restore();
        }

        // Gerilme Çubuğu & Titreme Uyarısı
        if (this.isPulling) {
            const holdTime = (performance.now() - this.pullStartTime) / 1000;
            const barW = 180;
            const barH = 18;
            const bx = 30;
            const by = 26;

            ctx.fillStyle = 'rgba(10, 15, 25, 0.85)';
            ctx.fillRect(bx, by, barW, barH);
            ctx.strokeStyle = '#d4af37';
            ctx.lineWidth = 1.2;
            ctx.strokeRect(bx, by, barW, barH);

            const fillW = (this.power / 100) * (barW - 4);
            const fillGrad = ctx.createLinearGradient(bx, 0, bx + barW, 0);
            fillGrad.addColorStop(0, '#028090');
            fillGrad.addColorStop(0.7, '#d4af37');
            fillGrad.addColorStop(1, '#c1121f');
            ctx.fillStyle = fillGrad;
            ctx.fillRect(bx + 2, by + 2, fillW, barH - 4);

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 10px sans-serif';
            ctx.fillText(`KUVVET: %${Math.round(this.power)}`, bx + 8, by + 13);

            if (holdTime > 2.2) {
                ctx.fillStyle = '#ff4d4d';
                ctx.fillText('⚠️ EL TİTRİYOR!', bx + barW + 10, by + 13);
            }
        }
    }

    renderGameOver() {
        const ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = 'rgba(12, 18, 30, 0.94)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.font = 'bold 28px "Georgia", serif';
        ctx.fillStyle = '#d4af37';
        ctx.textAlign = 'center';
        ctx.fillText('TALİM İKMAL EDİLDİ!', this.canvas.width / 2, this.canvas.height / 2 - 40);

        ctx.font = '18px "Segoe UI", sans-serif';
        ctx.fillStyle = '#ffffff';
        if (this.mode === 'menzil') {
            ctx.fillText(`En Uzak Menzil: ${Math.round(this.distanceMeters)} Metre`, this.canvas.width / 2, this.canvas.height / 2 + 5);
            ctx.fillText(`Menzil Rekoru: ${this.menzilRecord} Metre`, this.canvas.width / 2, this.canvas.height / 2 + 35);
        } else if (this.mode === 'kus') {
            ctx.fillText(`Kuş Avı Puanı: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 5);
            ctx.fillText(`En İyi Talim: ${this.highScore}`, this.canvas.width / 2, this.canvas.height / 2 + 35);
        } else if (this.mode === 'firtina') {
            ctx.fillText(`Fırtına Puanı: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 5);
            ctx.fillText(`En İyi Talim: ${this.highScore}`, this.canvas.width / 2, this.canvas.height / 2 + 35);
        } else {
            ctx.fillText(`Toplam Puan: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 5);
            ctx.fillText(`Menzil Rekoru: ${this.highScore}`, this.canvas.width / 2, this.canvas.height / 2 + 35);
        }

        ctx.font = '14px sans-serif';
        ctx.fillStyle = '#028090';
        ctx.fillText('"Ya Hak!" diyerek yeniden talime başlayabilirsiniz.', this.canvas.width / 2, this.canvas.height / 2 + 75);
        ctx.restore();
    }
}


/* ========================================================
   4. DİJİTAL EBRU SANATI ATÖLYESİ (EBRUZEN — MATEMATİKSEL SIVI MOTORU)
   ======================================================== */
class EbruStudio {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.drops = [];
        this.history = [];
        this.currentColor = '#028090';
        this.currentTool = 'drop'; // 'drop', 'spray', 'biz', 'comb', 'tulip', 'rose', 'carnation', 'bulbul'
        this.brushSize = 28;
        this.gallRatio = 1.0; // Öd miktarı (Yayılma çarpanı)
        this.isCombing = false;

        this.bindEvents();
        this.resize();
        this.initLiquidWater();
    }

    resize() {
        if (!this.canvas) return;
        const rect = this.canvas.parentElement ? this.canvas.parentElement.getBoundingClientRect() : null;
        this.canvas.width = Math.min((rect && rect.width > 200 ? rect.width : 720), 720);
        this.canvas.height = 420;
        this.redraw();
    }

    initLiquidWater() {
        this.drops = [];
        this.history = [];
        this.saveState();
        this.redraw();
    }

    saveState() {
        if (this.history.length > 15) this.history.shift();
        this.history.push(JSON.parse(JSON.stringify(this.drops)));
    }

    undo() {
        if (this.history.length > 1) {
            this.history.pop();
            this.drops = JSON.parse(JSON.stringify(this.history[this.history.length - 1]));
            this.redraw();
            if (window.showToast) window.showToast('Son nakış geri alındı.', '↩️');
        }
    }

    bindEvents() {
        let isMouseDown = false;
        let lastPos = null;

        const handleStart = (e) => {
            isMouseDown = true;
            const pos = this.getPos(e);
            lastPos = pos;
            this.applyTool(pos.x, pos.y);
        };

        const handleMove = (e) => {
            if (!isMouseDown) return;
            const pos = this.getPos(e);
            if (this.currentTool === 'biz' && lastPos) {
                this.dragStylus(lastPos.x, lastPos.y, pos.x, pos.y);
            } else if (this.currentTool === 'spray') {
                this.addSpray(pos.x, pos.y);
            } else if (this.currentTool === 'drop' && lastPos) {
                const distance = Math.hypot(pos.x - lastPos.x, pos.y - lastPos.y);
                const spacing = Math.max(5, this.brushSize * 0.55);
                const steps = Math.max(1, Math.ceil(distance / spacing));
                for (let i = 1; i <= steps; i++) {
                    const t = i / steps;
                    this.addMathematicalDrop(
                        lastPos.x + (pos.x - lastPos.x) * t,
                        lastPos.y + (pos.y - lastPos.y) * t,
                        this.brushSize * this.gallRatio,
                        this.currentColor
                    );
                }
                if (window.turkishSound) window.turkishSound.playDrop();
            }
            lastPos = pos;
            if (this.currentTool !== 'biz') this.redraw();
        };

        const handleEnd = () => {
            if (isMouseDown) {
                isMouseDown = false;
                lastPos = null;
                this.saveState();
            }
        };

        this.canvas.addEventListener('mousedown', handleStart);
        this.canvas.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleEnd);

        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleStart(e);
        }, { passive: false });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            handleMove(e);
        }, { passive: false });

        window.addEventListener('touchend', handleEnd);

        // Fırça önizlemesi: teknenin üzerinde canlı boyut/araç göstergesi
        const preview = document.getElementById('ebruBrushPreview');
        const movePreview = (e) => {
            if (!preview) return;
            const frame = this.canvas.parentElement;
            if (!frame) return;
            const frameRect = frame.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const scale = frameRect.width / this.canvas.width;
            const size = Math.max(12, this.brushSize * 2 * scale);
            preview.style.width = `${size}px`;
            preview.style.height = `${size}px`;
            preview.style.left = `${clientX - frameRect.left - size / 2}px`;
            preview.style.top = `${clientY - frameRect.top - size / 2}px`;
            preview.dataset.tool = this.currentTool;
            preview.classList.add('show');
        };
        this.canvas.addEventListener('pointermove', movePreview);
        this.canvas.addEventListener('pointerdown', movePreview);
        this.canvas.addEventListener('pointerleave', () => {
            if (preview) preview.classList.remove('show');
        });
    }

    getPos(e) {
        const rect = this.canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const cx = (clientX - rect.left) * (this.canvas.width / rect.width);
        const cy = (clientY - rect.top) * (this.canvas.height / rect.height);
        return { x: cx, y: cy };
    }

    applyTool(cx, cy) {
        switch (this.currentTool) {
            case 'drop':
                this.addMathematicalDrop(cx, cy, this.brushSize * this.gallRatio, this.currentColor);
                if (window.turkishSound) window.turkishSound.playDrop();
                break;
            case 'spray':
                this.addSpray(cx, cy);
                break;
            case 'biz':
                // Tek tıkta hafif çukur
                this.combWater(cx, cy);
                break;
            case 'comb':
                this.applyCombHorizontal();
                break;
            case 'tulip':
                this.createOsmanliTulip(cx, cy);
                break;
            case 'rose':
                this.createGülMotif(cx, cy);
                break;
            case 'carnation':
                this.createKaranfilMotif(cx, cy);
                break;
            case 'bulbul':
                this.createBulbulYuvasi(cx, cy);
                break;
            case 'ring':
                this.createRingMotif(cx, cy);
                break;
            case 'daisy':
                this.createDaisyMotif(cx, cy);
                break;
            default:
                this.addMathematicalDrop(cx, cy, this.brushSize, this.currentColor);
        }
        this.redraw();
    }

    // Gerçek Ebru Sıvı Matematiği (Radial Fluid Displacement)
    addMathematicalDrop(cx, cy, r, color) {
        const r2 = r * r;
        // Mevcut tüm damlaların çevresel noktalarını dışa doğru radyal iter
        for (const drop of this.drops) {
            for (const v of drop.vertices) {
                const dx = v.x - cx;
                const dy = v.y - cy;
                const dist2 = dx * dx + dy * dy;
                if (dist2 > 0.0001) {
                    const factor = Math.sqrt(1 + r2 / dist2);
                    v.x = cx + dx * factor;
                    v.y = cy + dy * factor;
                }
            }
            // Merkez de ötelenir
            const cdx = drop.x - cx;
            const cdy = drop.y - cy;
            const cdist2 = cdx * cdx + cdy * cdy;
            if (cdist2 > 0.0001) {
                const cfactor = Math.sqrt(1 + r2 / cdist2);
                drop.x = cx + cdx * cfactor;
                drop.y = cy + cdy * cfactor;
            }
        }

        // Yeni damlayı düzgün çokgen halka (polygon) olarak oluştur
        const vertexCount = 44;
        const vertices = [];
        for (let i = 0; i < vertexCount; i++) {
            const angle = (i / vertexCount) * Math.PI * 2;
            vertices.push({
                x: cx + Math.cos(angle) * r,
                y: cy + Math.sin(angle) * r
            });
        }

        this.drops.push({
            x: cx,
            y: cy,
            radius: r,
            color: color,
            vertices: vertices
        });
    }

    // Battal Ebru: Serpme Fırçası (At Kılı & Gül Dalı ile püskürtme)
    addSpray(cx, cy) {
        const count = 18;
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 85;
            const px = cx + Math.cos(angle) * dist;
            const py = cy + Math.sin(angle) * dist;
            const r = Math.random() * 8 + 3;
            if (px > 0 && px < this.canvas.width && py > 0 && py < this.canvas.height) {
                this.addMathematicalDrop(px, py, r, this.currentColor);
            }
        }
        if (window.turkishSound) window.turkishSound.playDrop();
    }

    // Biz (İğne) ile sıvıyı sürükleme
    dragStylus(x1, y1, x2, y2) {
        const vx = x2 - x1;
        const vy = y2 - y1;
        const mag = Math.hypot(vx, vy);
        if (mag < 1) return;

        const radius = 45;
        for (const drop of this.drops) {
            for (const v of drop.vertices) {
                const dist = Math.hypot(v.x - x1, v.y - y1);
                if (dist < radius) {
                    const factor = Math.pow(1 - dist / radius, 1.8) * 0.75;
                    v.x += vx * factor;
                    v.y += vy * factor;
                }
            }
        }
        this.redraw();
        if (window.turkishSound && window.turkishSound.playWaterSwish) {
            window.turkishSound.playWaterSwish();
        }
    }

    // Ebru Tarağı: Yatay Taraklı Ebru
    applyCombHorizontal() {
        const teethGap = 32;
        for (let y = teethGap; y < this.canvas.height; y += teethGap) {
            const dir = (Math.floor(y / teethGap) % 2 === 0) ? 1 : -1;
            for (const drop of this.drops) {
                for (const v of drop.vertices) {
                    const dy = Math.abs(v.y - y);
                    if (dy < teethGap) {
                        const factor = Math.pow(1 - dy / teethGap, 2) * 24 * dir;
                        v.x += factor;
                    }
                }
            }
        }
        this.saveState();
        this.redraw();
        if (window.turkishSound && window.turkishSound.playWaterSwish) window.turkishSound.playWaterSwish();
        if (window.showToast) window.showToast('Taraklı Ebru motifi icra edildi!', '〰️');
    }

    // Gelgit Ebru Motifi
    applyGelgit() {
        const teethGap = 40;
        for (let x = teethGap; x < this.canvas.width; x += teethGap) {
            const dir = (Math.floor(x / teethGap) % 2 === 0) ? 1 : -1;
            for (const drop of this.drops) {
                for (const v of drop.vertices) {
                    const dx = Math.abs(v.x - x);
                    if (dx < teethGap) {
                        const factor = Math.pow(1 - dx / teethGap, 2) * 35 * dir;
                        v.y += factor;
                    }
                }
            }
        }
        this.saveState();
        this.redraw();
        if (window.turkishSound && window.turkishSound.playWaterSwish) window.turkishSound.playWaterSwish();
        if (window.showToast) window.showToast('Gelgit dalgası teknede canlandırıldı!', '🌊');
    }

    // Şal Deseni (Wavy Paisley Ebru)
    applySalPattern() {
        this.applyGelgit();
        setTimeout(() => {
            this.applyCombHorizontal();
            this.saveState();
            this.redraw();
            if (window.showToast) window.showToast('Osmanlı Şal deseni nakşedildi!', '🧣');
        }, 300);
    }

    // Klasik Osmanlı Lalesi (Hatip & Çiçekli Ebru)
    createOsmanliTulip(cx = this.canvas.width / 2, cy = this.canvas.height / 2 + 10) {
        // Yeşil Dal ve Yaprak
        this.addMathematicalDrop(cx, cy + 60, 24, '#2d6a4f');
        this.addMathematicalDrop(cx - 15, cy + 35, 14, '#1b4332');
        this.addMathematicalDrop(cx + 15, cy + 35, 14, '#1b4332');

        // Lale Gövdesi ve Taç Yaprakları
        this.addMathematicalDrop(cx, cy - 10, 36, '#c1121f');
        this.addMathematicalDrop(cx - 24, cy - 30, 22, '#c1121f');
        this.addMathematicalDrop(cx + 24, cy - 30, 22, '#c1121f');

        // İç Varak Altın ve Damla
        this.addMathematicalDrop(cx, cy - 25, 16, '#d4af37');
        this.addMathematicalDrop(cx, cy - 45, 10, '#ffffff');

        // Biz ile sivrilterek lale ucunu çek
        this.dragStylus(cx, cy - 25, cx, cy - 75);
        this.dragStylus(cx - 20, cy - 30, cx - 28, cy - 65);
        this.dragStylus(cx + 20, cy - 30, cx + 28, cy - 65);

        this.saveState();
        this.redraw();
        if (window.turkishSound) window.turkishSound.playNey(523.25, 1.2);
        if (window.showToast) window.showToast('Osmanlı Lalesi teknede nakşedildi!', '🌷');
    }

    // Halka (Battal halkası) Motifi
    createRingMotif(cx = this.canvas.width / 2, cy = this.canvas.height / 2) {
        this.addMathematicalDrop(cx, cy, 54, this.currentColor);
        this.addMathematicalDrop(cx, cy, 44, '#f8f4eb');
        this.addMathematicalDrop(cx, cy, 34, this.currentColor);
        this.addMathematicalDrop(cx, cy, 24, '#d4af37');
        this.addMathematicalDrop(cx, cy, 14, '#f8f4eb');
        this.addMathematicalDrop(cx, cy, 7, this.currentColor);

        // Biz ile halkaları hafifçe dışa çek
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            this.dragStylus(cx + Math.cos(angle) * 30, cy + Math.sin(angle) * 30,
                cx + Math.cos(angle) * 58, cy + Math.sin(angle) * 58);
        }
        this.saveState();
        this.redraw();
        if (window.turkishSound) window.turkishSound.playNey(659.25, 1.1);
        if (window.showToast) window.showToast('Battal halkası teknede açıldı!', '⭕');
    }

    // Papatya Motifi
    createDaisyMotif(cx = this.canvas.width / 2, cy = this.canvas.height / 2) {
        this.addMathematicalDrop(cx, cy + 40, 16, '#2d6a4f');
        this.addMathematicalDrop(cx, cy, 22, '#d4af37');
        for (let i = 0; i < 10; i++) {
            const angle = (i / 10) * Math.PI * 2;
            const px = cx + Math.cos(angle) * 34;
            const py = cy + Math.sin(angle) * 34;
            this.addMathematicalDrop(px, py, 13, '#f8f4eb');
            this.addMathematicalDrop(px, py, 7, this.currentColor);
        }
        this.saveState();
        this.redraw();
        if (window.turkishSound) window.turkishSound.playNey(587.33, 1.0);
        if (window.showToast) window.showToast('Papatya motifi nakşedildi!', '🌼');
    }

    // Klasik Gül Motifi
    createGülMotif(cx = this.canvas.width / 2, cy = this.canvas.height / 2) {
        this.addMathematicalDrop(cx, cy, 45, '#c1121f');
        this.addMathematicalDrop(cx, cy, 34, '#e76f51');
        this.addMathematicalDrop(cx, cy, 24, '#c1121f');
        this.addMathematicalDrop(cx, cy, 14, '#d4af37');

        // Gül helezonu (spiral biz hareketi)
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const x1 = cx + Math.cos(angle) * 35;
            const y1 = cy + Math.sin(angle) * 35;
            this.dragStylus(x1, y1, cx, cy);
        }

        this.saveState();
        this.redraw();
        if (window.turkishSound) window.turkishSound.playNey(440, 1.0);
        if (window.showToast) window.showToast('Gül motifi teknede açıldı!', '🌹');
    }

    // Klasik Karanfil Motifi
    createKaranfilMotif(cx = this.canvas.width / 2, cy = this.canvas.height / 2) {
        // Çanak
        this.addMathematicalDrop(cx, cy + 45, 20, '#2d6a4f');
        // Taç
        this.addMathematicalDrop(cx, cy, 40, '#c1121f');
        this.addMathematicalDrop(cx, cy - 10, 28, '#ffffff');
        this.addMathematicalDrop(cx, cy - 15, 18, '#c1121f');

        // Karanfil tırtıkları
        for (let x = cx - 30; x <= cx + 30; x += 12) {
            this.dragStylus(x, cy - 10, x, cy - 45);
        }

        this.saveState();
        this.redraw();
        if (window.turkishSound) window.turkishSound.playNey(493.88, 1.0);
        if (window.showToast) window.showToast('Karanfil motifi nakşedildi!', '🌺');
    }

    // Bülbül Yuvası Motifi
    createBulbulYuvasi(cx = this.canvas.width / 2, cy = this.canvas.height / 2) {
        // İçe doğru dönen helezon
        for (const drop of this.drops) {
            for (const v of drop.vertices) {
                const dx = v.x - cx;
                const dy = v.y - cy;
                const dist = Math.hypot(dx, dy);
                if (dist < 180) {
                    const ang = Math.atan2(dy, dx) + (1 - dist / 180) * 1.5;
                    v.x = cx + Math.cos(ang) * dist;
                    v.y = cy + Math.sin(ang) * dist;
                }
            }
        }
        this.saveState();
        this.redraw();
        if (window.turkishSound) window.turkishSound.playWaterSwish();
        if (window.showToast) window.showToast('Bülbül Yuvası helezonu çekildi!', '🌀');
    }

    // Rastgele Battal Zemin
    createRandomBattal() {
        this.initLiquidWater();
        const colors = ['#028090', '#c1121f', '#d4af37', '#1c2541', '#2d6a4f', '#e76f51'];
        for (let i = 0; i < 35; i++) {
            const rx = Math.random() * this.canvas.width;
            const ry = Math.random() * this.canvas.height;
            const rColor = colors[Math.floor(Math.random() * colors.length)];
            const rSize = Math.random() * 26 + 10;
            this.addMathematicalDrop(rx, ry, rSize, rColor);
        }
        this.saveState();
        this.redraw();
        if (window.showToast) window.showToast('Kadim Battal Ebru zemini döşendi!', '🎨');
    }

    redraw() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;

        // Kitreli suyun parşömen zemini: hafif ışık ve derinlik
        const water = ctx.createRadialGradient(w * 0.5, h * 0.42, 40, w * 0.5, h * 0.5, Math.max(w, h) * 0.75);
        water.addColorStop(0, '#fdfaf3');
        water.addColorStop(0.62, '#f6efe0');
        water.addColorStop(1, '#eadfc8');
        ctx.fillStyle = water;
        ctx.fillRect(0, 0, w, h);

        // Su damarı dokusu (yatay çizgiler)
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.08)';
        ctx.lineWidth = 1;
        for (let y = 10; y < h; y += 20) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }

        // Hafif altın zerreleri (deterministik)
        for (let i = 0; i < 28; i++) {
            const sx = ((i * 137.5) % w);
            const sy = ((i * 83.7) % h);
            ctx.fillStyle = `rgba(212, 175, 55, ${0.035 + (i % 5) * 0.012})`;
            ctx.beginPath();
            ctx.arc(sx, sy, 1 + (i % 3), 0, Math.PI * 2);
            ctx.fill();
        }

        // Damlaların çizimi (Polygon rendering)
        for (const d of this.drops) {
            ctx.save();
            ctx.fillStyle = d.color;
            ctx.strokeStyle = 'rgba(60, 42, 18, 0.12)';
            ctx.lineWidth = 0.6;
            ctx.shadowColor = 'rgba(80, 55, 20, 0.14)';
            ctx.shadowBlur = 5;
            ctx.shadowOffsetY = 1.5;

            ctx.beginPath();
            if (d.vertices && d.vertices.length > 0) {
                ctx.moveTo(d.vertices[0].x, d.vertices[0].y);
                for (let i = 1; i < d.vertices.length; i++) {
                    ctx.lineTo(d.vertices[i].x, d.vertices[i].y);
                }
                ctx.closePath();
            } else {
                ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
            }
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }

        // Kenar vinyeti ve altın çerçeve hissi
        const vignette = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.72);
        vignette.addColorStop(0, 'rgba(60, 42, 18, 0)');
        vignette.addColorStop(1, 'rgba(60, 42, 18, 0.12)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
        ctx.lineWidth = 2;
        ctx.strokeRect(5, 5, w - 10, h - 10);
    }

    clear() {
        this.initLiquidWater();
        if (window.turkishSound) window.turkishSound.playDrop();
    }

    // Kağıda Bas & Osmanlı Mührü ile İndir
    printOnPaper(callback) {
        // Mühürlü ve parşömen kenarlı yüksek çözünürlüklü çıktı
        const offCanvas = document.createElement('canvas');
        offCanvas.width = this.canvas.width;
        offCanvas.height = this.canvas.height;
        const octx = offCanvas.getContext('2d');

        // Orijinal ebruyu aktar
        octx.drawImage(this.canvas, 0, 0);

        // Parşömen kenarlık ve altın paspartu
        octx.strokeStyle = '#d4af37';
        octx.lineWidth = 8;
        octx.strokeRect(10, 10, offCanvas.width - 20, offCanvas.height - 20);

        octx.strokeStyle = '#4a2c11';
        octx.lineWidth = 2;
        octx.strokeRect(16, 16, offCanvas.width - 32, offCanvas.height - 32);

        // Kırmızı Osmanlı Ketebe Mührü (Ebruzen Mührü)
        const sealX = offCanvas.width - 80;
        const sealY = offCanvas.height - 70;

        octx.save();
        octx.fillStyle = '#a61c1c';
        octx.beginPath();
        octx.arc(sealX, sealY, 32, 0, Math.PI * 2);
        octx.fill();

        octx.strokeStyle = '#ffd700';
        octx.lineWidth = 2;
        octx.stroke();

        octx.font = 'bold 9px "Georgia", serif';
        octx.fillStyle = '#ffd700';
        octx.textAlign = 'center';
        octx.fillText('EBRUZEN', sealX, sealY - 8);
        octx.fillText('KETEBE-İ', sealX, sealY + 4);
        octx.fillText('OTAĞ', sealX, sealY + 16);
        octx.restore();

        if (window.turkishSound && window.turkishSound.playSealStamp) {
            window.turkishSound.playSealStamp();
        }

        const dataUrl = offCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `otağ-ebru-sanati-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();

        if (callback) callback();
    }
}


/* ========================================================
   5. UNESCO TESCİLLİ KADİM TÜRK OYUNU: MANGALA (KÖÇÜRME)
   ======================================================== */
class MangalaGame {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        // Tahta: 14 Göz
        // 0-5: Oyuncu Kuyuları (1'den 6'ya soldan sağa)
        // 6: Oyuncu Hazinesi (Sağ taraf)
        // 7-12: Bilge Vezir / AI Kuyuları (1'den 6'ya sağdan sola)
        // 13: AI Hazinesi (Sol taraf)
        this.board = Array(14).fill(4);
        this.board[6] = 0;  // Oyuncu Hazinesi
        this.board[13] = 0; // AI Hazinesi

        this.turn = 'player'; // 'player' | 'ai'
        this.isAnimating = false;
        this.gameOver = false;
        this.difficulty = 'normal';
        this.statusText = "Sıra sizde! Başlamak için kendi bölgenizdeki (alttaki) bir kuyuya tıklayın.";

        this.initDOM();
        this.render();
    }

    initDOM() {
        if (!this.container) return;
        this.container.innerHTML = `
            <div class="mangala-board-frame">
                <!-- Üst Bölüm: Bilge Vezir (AI) Bilgisi -->
                <div class="mangala-player-bar ai-bar">
                    <div class="mangala-avatar">🧙‍♂️ Bilge Vezir (Yapay Zeka)</div>
                    <div class="mangala-turn-indicator" id="aiTurnBadge">Bekliyor</div>
                </div>

                <!-- Ahşap Sedef Kakmalı Mangala Tahtası -->
                <div class="mangala-wood-board">
                    <!-- Sol Hazine (AI Hazinesi: 13) -->
                    <div class="mangala-treasury ai-treasury" id="pit-13" title="Bilge Vezir Hazinesi">
                        <span class="treasury-label">Vezir Hazinesi</span>
                        <div class="treasury-count" id="count-13">0</div>
                        <div class="treasury-stones" id="stones-13"></div>
                    </div>

                    <!-- Orta Bölüm: 2 Sıra 6'şar Kuyu -->
                    <div class="mangala-wells-center">
                        <!-- Üst Sıra: AI Kuyuları (12'den 7'ye) -->
                        <div class="mangala-row ai-row">
                            ${[12, 11, 10, 9, 8, 7].map(idx => `
                                <div class="mangala-well ai-well" id="pit-${idx}" data-idx="${idx}">
                                    <span class="well-num">${idx - 6}</span>
                                    <div class="well-stone-count" id="count-${idx}">4</div>
                                    <div class="well-stones" id="stones-${idx}"></div>
                                </div>
                            `).join('')}
                        </div>

                        <!-- Alt Sıra: Oyuncu Kuyuları (0'dan 5'e) -->
                        <div class="mangala-row player-row">
                            ${[0, 1, 2, 3, 4, 5].map(idx => `
                                <div class="mangala-well player-well" id="pit-${idx}" data-idx="${idx}">
                                    <span class="well-num">${idx + 1}</span>
                                    <div class="well-stone-count" id="count-${idx}">4</div>
                                    <div class="well-stones" id="stones-${idx}"></div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Sağ Hazine (Oyuncu Hazinesi: 6) -->
                    <div class="mangala-treasury player-treasury" id="pit-6" title="Sizin Hazineniz">
                        <span class="treasury-label">Sizin Hazineniz</span>
                        <div class="treasury-count" id="count-6">0</div>
                        <div class="treasury-stones" id="stones-6"></div>
                    </div>
                </div>

                <!-- Alt Bölüm: Oyuncu Bilgisi & Durum Şeridi -->
                <div class="mangala-player-bar player-bar">
                    <div class="mangala-avatar">🏹 Siz (Alp / Kemankeş)</div>
                    <div class="mangala-turn-indicator active" id="playerTurnBadge">Sıra Sizde</div>
                </div>

                <div class="mangala-status-box" id="mangalaStatusText">
                    ${this.statusText}
                </div>

                <!-- Mangala Zorluk & Yardım -->
                <div class="mangala-toolbar">
                    <div class="mangala-difficulty" role="group" aria-label="Mangala zorluk seviyesi">
                        <span class="mangala-toolbar-label">Zorluk:</span>
                        <button class="mangala-diff-btn" data-mangala-difficulty="kolay">🌱 Kolay</button>
                        <button class="mangala-diff-btn active" data-mangala-difficulty="normal">⚖️ Normal</button>
                        <button class="mangala-diff-btn" data-mangala-difficulty="zor">🔥 Zor</button>
                    </div>
                    <button id="btnMangalaHint" class="btn-ottoman btn-sm">💡 Hamle İpucu</button>
                </div>

                <!-- Mangala Düğmeleri -->
                <div class="mangala-actions">
                    <button id="btnNewMangala" class="btn-ottoman">🔄 Yeni Mangala Oyunu</button>
                    <button id="btnMangalaRules" class="btn-action-turk">📜 Mangala Kuralları (UNESCO)</button>
                </div>
            </div>
        `;

        // Kuyu Tıklamaları
        for (let i = 0; i <= 5; i++) {
            const well = this.container.querySelector(`#pit-${i}`);
            if (well) {
                well.addEventListener('click', () => {
                    if (this.turn === 'player' && !this.isAnimating && !this.gameOver) {
                        this.playMove(i);
                    }
                });
            }
        }

        const btnNew = this.container.querySelector('#btnNewMangala');
        if (btnNew) btnNew.addEventListener('click', () => this.resetGame());

        const btnRules = this.container.querySelector('#btnMangalaRules');
        if (btnRules) {
            btnRules.addEventListener('click', () => {
                const rulesModal = document.getElementById('mangalaRulesModal');
                if (rulesModal) rulesModal.classList.add('show');
            });
        }

        this.container.querySelectorAll('[data-mangala-difficulty]').forEach(btn => {
            btn.addEventListener('click', () => this.setDifficulty(btn.dataset.mangalaDifficulty));
        });

        const btnHint = this.container.querySelector('#btnMangalaHint');
        if (btnHint) btnHint.addEventListener('click', () => this.hintMove());

        const btnAgain = document.getElementById('btnMangalaPlayAgain');
        if (btnAgain) {
            btnAgain.addEventListener('click', () => {
                const modal = document.getElementById('mangalaResultModal');
                if (modal) modal.classList.remove('show');
                this.resetGame();
            });
        }
        const btnCloseResult = document.getElementById('btnMangalaCloseResult');
        if (btnCloseResult) {
            btnCloseResult.addEventListener('click', () => {
                const modal = document.getElementById('mangalaResultModal');
                if (modal) modal.classList.remove('show');
            });
        }
    }

    setDifficulty(level) {
        if (!['kolay', 'normal', 'zor'].includes(level)) return;
        this.difficulty = level;
        if (!this.container) return;
        this.container.querySelectorAll('[data-mangala-difficulty]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mangalaDifficulty === level);
        });
        const labels = { kolay: 'Kolay', normal: 'Normal', zor: 'Zor' };
        this.statusText = `Zorluk <strong>${labels[level]}</strong> olarak ayarlandı. Sıra sizde; bir kuyuya tıklayın.`;
        this.render();
        if (window.showToast) window.showToast(`Bilge Vezir zorluğu: ${labels[level]}`, level === 'zor' ? '🔥' : (level === 'kolay' ? '🌱' : '⚖️'));
    }

    hintMove() {
        if (!this.container || this.gameOver) return;
        if (this.turn !== 'player' || this.isAnimating) {
            this.statusText = '💡 İpucu için sıranızı ve hamlenizin bitmesini bekleyin.';
            this.render();
            return;
        }

        const best = this.findBestMove('player');
        if (best.move === null) {
            this.statusText = '💡 Oynanabilecek boş kuyu yok; taşlar dağıtıldı.';
            this.render();
            return;
        }

        this.container.querySelectorAll('.mangala-well').forEach(well => well.classList.remove('hint-pit'));
        const well = this.container.querySelector(`#pit-${best.move}`);
        if (well) {
            well.classList.add('hint-pit');
            setTimeout(() => well.classList.remove('hint-pit'), 2800);
        }
        const reason = best.reason ? ` ${best.reason}` : '';
        this.statusText = `💡 Bilge Vezir fısıldıyor: <strong>${best.move + 1} numaralı kuyuyu</strong> dene.${reason}`;
        this.render();
        if (window.showToast) window.showToast(`İpucu: ${best.move + 1} numaralı kuyu`, '💡');
    }

    resetGame() {
        this.board = Array(14).fill(4);
        this.board[6] = 0;
        this.board[13] = 0;
        this.turn = 'player';
        this.isAnimating = false;
        this.gameOver = false;
        if (this.resultTimer) clearTimeout(this.resultTimer);
        this.statusText = "Yeni el başladı! Başlamak için kendi bölgenizdeki bir kuyuya tıklayın.";
        const resultModal = document.getElementById('mangalaResultModal');
        if (resultModal) resultModal.classList.remove('show');
        if (this.container) {
            this.container.querySelectorAll('.mangala-well').forEach(well => well.classList.remove('hint-pit'));
        }
        this.render();
        if (window.showToast) window.showToast('Mangala masası taze taşlarla kuruldu!', '🪨');
    }

    render() {
        if (!this.container) return;

        // Sayı ve taşları güncelle
        for (let i = 0; i < 14; i++) {
            const countEl = this.container.querySelector(`#count-${i}`);
            const stonesEl = this.container.querySelector(`#stones-${i}`);
            const count = this.board[i];

            if (countEl) countEl.textContent = count;
            if (stonesEl) {
                stonesEl.innerHTML = '';
                const maxVisual = Math.min(count, 14);
                for (let k = 0; k < maxVisual; k++) {
                    const stone = document.createElement('span');
                    stone.className = 'mangala-marble';
                    stonesEl.appendChild(stone);
                }
            }
        }

        const pBadge = this.container.querySelector('#playerTurnBadge');
        const aBadge = this.container.querySelector('#aiTurnBadge');
        const statusEl = this.container.querySelector('#mangalaStatusText');

        if (pBadge && aBadge) {
            if (this.turn === 'player') {
                pBadge.className = 'mangala-turn-indicator active';
                pBadge.textContent = 'Sıra Sizde';
                aBadge.className = 'mangala-turn-indicator';
                aBadge.textContent = 'Bekliyor';
            } else {
                pBadge.className = 'mangala-turn-indicator';
                pBadge.textContent = 'Bekliyor';
                aBadge.className = 'mangala-turn-indicator active';
                aBadge.textContent = 'Düşünüyor...';
            }
        }

        if (statusEl) statusEl.innerHTML = this.statusText;
    }

    async playMove(pitIndex) {
        if (this.board[pitIndex] === 0) {
            if (window.showToast) window.showToast('Bu kuyu boş! Başka bir kuyu seçin.', '⚠️');
            return;
        }

        this.isAnimating = true;
        if (this.container) {
            this.container.querySelectorAll('.mangala-well').forEach(well => well.classList.remove('hint-pit'));
        }
        let stones = this.board[pitIndex];
        const isPlayer = this.turn === 'player';
        const ownTreasury = isPlayer ? 6 : 13;
        const oppTreasury = isPlayer ? 13 : 6;

        let curr = pitIndex;

        // Kural 1: Dağıtım
        if (stones === 1) {
            this.board[pitIndex] = 0;
            curr = (curr + 1) % 14;
            if (curr === oppTreasury) curr = (curr + 1) % 14;
            this.board[curr]++;
            stones = 0;
            if (window.turkishSound && window.turkishSound.playStoneDrop) window.turkishSound.playStoneDrop();
            this.render();
            await this.sleep(280);
        } else {
            this.board[pitIndex] = 1;
            stones--;
            this.render();
            await this.sleep(240);

            while (stones > 0) {
                curr = (curr + 1) % 14;
                if (curr === oppTreasury) continue; // Rakip hazinesine taş atılmaz!

                this.board[curr]++;
                stones--;
                if (window.turkishSound && window.turkishSound.playStoneDrop) window.turkishSound.playStoneDrop();
                this.render();
                await this.sleep(190);
            }
        }

        const lastPit = curr;

        // Kural 2: Son taş kendi hazinesine düşerse tekrar oynar
        if (lastPit === ownTreasury) {
            this.statusText = isPlayer
                ? "✨ Son taşınız kendi hazinenize düştü! <strong>Bir hamle daha kazandınız!</strong>"
                : "🧙‍♂️ Bilge Vezir son taşı hazinesine düşürdü ve tekrar oynuyor!";
            this.render();
            this.isAnimating = false;
            this.checkGameOver();
            if (!this.gameOver && !isPlayer) {
                setTimeout(() => this.aiMove(), 800);
            }
            return;
        }

        // Kural 3: Çift Yapma Kuralı
        // Son taş rakibin bölgesine denk gelir ve oradaki taş sayısını ÇİFT (2, 4, 6...) yaparsa
        const isOpponentWell = isPlayer
            ? (lastPit >= 7 && lastPit <= 12)
            : (lastPit >= 0 && lastPit <= 5);

        if (isOpponentWell && this.board[lastPit] % 2 === 0) {
            const captured = this.board[lastPit];
            this.board[lastPit] = 0;
            this.board[ownTreasury] += captured;
            this.statusText = isPlayer
                ? `🎯 <strong>ÇİFT YAPTINIZ!</strong> Rakip kuyudaki ${captured} taşı hazinenize aldınız!`
                : `🧙‍♂️ Bilge Vezir kuyunuzu çift yaptı ve ${captured} taşı hazinesine aldı!`;
            if (window.turkishSound) window.turkishSound.playKudum(true);
            this.render();
            await this.sleep(400);
        }

        // Kural 4: Kendi Boş Kuyuna Düşme (Göz Alma / Tilki Kuralı)
        // Son taş kendi boş kuyusuna (önceden boş, şimdi 1 olan) düşerse:
        // O taş + tam karşısındaki rakip kuyudaki taşları hazinesine alır!
        const isOwnWell = isPlayer
            ? (lastPit >= 0 && lastPit <= 5)
            : (lastPit >= 7 && lastPit <= 12);

        if (isOwnWell && this.board[lastPit] === 1) {
            const oppositePit = 12 - lastPit;
            if (this.board[oppositePit] > 0) {
                const captured = this.board[oppositePit] + 1;
                this.board[lastPit] = 0;
                this.board[oppositePit] = 0;
                this.board[ownTreasury] += captured;
                this.statusText = isPlayer
                    ? `🦊 <strong>GÖZ ALMA (TİLKİ KURALI)!</strong> Boş kuyuya düştünüz, karşıdaki taşlarla birlikte ${captured} taşı hazinenize çektiniz!`
                    : `🧙‍♂️ Bilge Vezir tilki kuralıyla ${captured} taşı hazinesine kattı!`;
                if (window.turkishSound) window.turkishSound.playKudum(false);
                this.render();
                await this.sleep(400);
            }
        }

        // Sıra değişimi
        this.turn = isPlayer ? 'ai' : 'player';
        this.statusText = isPlayer
            ? "Bilge Vezir hamlesini düşünüyor..."
            : "Sıra sizde! Kendi bölgenizdeki bir kuyuya tıklayın.";

        this.isAnimating = false;
        this.render();

        if (!this.checkGameOver()) {
            if (this.turn === 'ai') {
                setTimeout(() => this.aiMove(), 750);
            }
        }
    }

    evaluateMove(move, side, board = this.board) {
        const isPlayer = side === 'player';
        const ownTreasury = isPlayer ? 6 : 13;
        const oppTreasury = isPlayer ? 13 : 6;
        const count = board[move];
        let curr = move;
        let stones = count;

        if (count <= 0) return { move, score: -Infinity, end: move, reason: '' };

        if (count === 1) {
            curr = (curr + 1) % 14;
            if (curr === oppTreasury) curr = (curr + 1) % 14;
        } else {
            stones = count - 1;
            while (stones > 0) {
                curr = (curr + 1) % 14;
                if (curr === oppTreasury) continue;
                stones--;
            }
        }

        const end = curr;
        let score = 0;
        let reason = '';

        if (end === ownTreasury) {
            score += 50;
            reason = 'Son taş hazineye düşüyor, tekrar oynuyorsunuz.';
        }

        const isOpponentWell = isPlayer ? (end >= 7 && end <= 12) : (end >= 0 && end <= 5);
        const finalCount = board[end] + 1;
        if (isOpponentWell && finalCount % 2 === 0) {
            score += 30 + finalCount;
            reason = `Rakip kuyuyu çift yapıp ${finalCount} taş kazanıyorsunuz.`;
        }

        const isOwnWell = isPlayer ? (end >= 0 && end <= 5) : (end >= 7 && end <= 12);
        if (isOwnWell && board[end] === 0) {
            const opposite = 12 - end;
            if (board[opposite] > 0) {
                score += 25 + board[opposite];
                reason = `Tilki kuralıyla ${board[opposite] + 1} taş alıyorsunuz.`;
            }
        }

        return { move, score, end, reason };
    }

    simulateMove(move, side, board = this.board) {
        const isPlayer = side === 'player';
        const ownTreasury = isPlayer ? 6 : 13;
        const oppTreasury = isPlayer ? 13 : 6;
        const nextBoard = [...board];
        const count = nextBoard[move];
        let stones = count === 1 ? 1 : count - 1;
        let curr = move;
        nextBoard[move] = count === 1 ? 0 : 1;

        while (stones > 0) {
            curr = (curr + 1) % 14;
            if (curr === oppTreasury) continue;
            nextBoard[curr]++;
            stones--;
        }

        // Yaklaşık yakalama simülasyonu (ipucu/zorluk değerlendirmesi için)
        const isOpponentWell = isPlayer ? (curr >= 7 && curr <= 12) : (curr >= 0 && curr <= 5);
        if (isOpponentWell && nextBoard[curr] % 2 === 0) {
            nextBoard[ownTreasury] += nextBoard[curr];
            nextBoard[curr] = 0;
        }
        const isOwnWell = isPlayer ? (curr >= 0 && curr <= 5) : (curr >= 7 && curr <= 12);
        if (isOwnWell && nextBoard[curr] === 1) {
            const opposite = 12 - curr;
            if (nextBoard[opposite] > 0) {
                nextBoard[ownTreasury] += nextBoard[opposite] + 1;
                nextBoard[curr] = 0;
                nextBoard[opposite] = 0;
            }
        }

        return nextBoard;
    }

    findBestMove(side, board = this.board, withLookahead = this.difficulty === 'zor') {
        const isPlayer = side === 'player';
        const pits = isPlayer ? [0, 1, 2, 3, 4, 5] : [7, 8, 9, 10, 11, 12];
        let best = { move: null, score: -Infinity, reason: '' };

        for (const move of pits) {
            if (board[move] <= 0) continue;
            const evaluation = this.evaluateMove(move, side, board);
            let score = evaluation.score;

            if (withLookahead) {
                const nextBoard = this.simulateMove(move, side, board);
                const opponent = isPlayer ? 'ai' : 'player';
                const opponentBest = this.findBestMove(opponent, nextBoard, false);
                if (opponentBest.move !== null) {
                    score -= Math.max(0, opponentBest.score) * 0.45;
                }
            }

            if (score > best.score) {
                best = { move, score, reason: evaluation.reason };
            }
        }

        return best;
    }

    aiMove() {
        if (this.turn !== 'ai' || this.isAnimating || this.gameOver) return;

        const validMoves = [];
        for (let i = 7; i <= 12; i++) {
            if (this.board[i] > 0) validMoves.push(i);
        }

        if (validMoves.length === 0) {
            this.checkGameOver();
            return;
        }

        const best = this.findBestMove('ai');
        let move = best.move !== null ? best.move : validMoves[0];

        // Kolay seviyede Vezir bazen içgüdüsel/rastgele oynar.
        if (this.difficulty === 'kolay' && Math.random() < 0.55) {
            move = validMoves[Math.floor(Math.random() * validMoves.length)];
        }

        this.playMove(move);
    }

    checkGameOver() {
        const playerSideEmpty = this.board.slice(0, 6).every(v => v === 0);
        const aiSideEmpty = this.board.slice(7, 13).every(v => v === 0);

        if (playerSideEmpty || aiSideEmpty) {
            this.gameOver = true;

            // Kural: Kendi bölgesindeki taşları ilk bitiren oyuncu, rakibin kuyularında kalan tüm taşları da kazanır!
            if (playerSideEmpty) {
                let remaining = 0;
                for (let i = 7; i <= 12; i++) {
                    remaining += this.board[i];
                    this.board[i] = 0;
                }
                this.board[6] += remaining;
                this.statusText = `🏆 <strong>KUYULARINIZI İLK SİZ BİTİRDİNİZ!</strong> Rakipte kalan ${remaining} taşı da hazinenize kattınız!`;
            } else if (aiSideEmpty) {
                let remaining = 0;
                for (let i = 0; i <= 5; i++) {
                    remaining += this.board[i];
                    this.board[i] = 0;
                }
                this.board[13] += remaining;
                this.statusText = `🧙‍♂️ Bilge Vezir kuyularını ilk bitirdi ve sizdeki kalan ${remaining} taşı hazinesine aldı!`;
            }

            this.render();

            const playerScore = this.board[6];
            const aiScore = this.board[13];

            this.resultTimer = setTimeout(() => {
                let title = "OYUN BİTTİ!";
                let desc = `Siz: ${playerScore} Taş | Bilge Vezir: ${aiScore} Taş`;
                if (playerScore > aiScore) {
                    title = "🏆 TEBRİKLER! MANGALA GALİBİ OLDUNUZ!";
                    desc += " — Türk zeka oyunu Mangala'da üstün taktiklerinizle zafer kazandınız!";
                } else if (aiScore > playerScore) {
                    title = "🧙‍♂️ BİLGE VEZİR KAZANDI!";
                    desc += " — Vezir bu elde stratejik üstünlük sağladı. Tekrar deneyin!";
                } else {
                    title = "🤝 BERABERE!";
                    desc += " — Her iki taraf da 24'er taş topladı, dostluk kazandı!";
                }

                this.showResultModal(title, desc, playerScore, aiScore);
                if (window.showToast) window.showToast(title, '🏆');
            }, 500);

            return true;
        }
        return false;
    }

    showResultModal(title, desc, playerScore, aiScore) {
        const modal = document.getElementById('mangalaResultModal');
        const trophyEl = document.getElementById('mangalaResultTrophy');
        const titleEl = document.getElementById('mangalaResultTitle');
        const descEl = document.getElementById('mangalaResultDesc');
        const scoreEl = document.getElementById('mangalaResultScore');

        if (trophyEl) trophyEl.textContent = playerScore > aiScore ? '🏆' : (aiScore > playerScore ? '🧙‍♂️' : '🤝');
        if (titleEl) titleEl.textContent = title;
        if (descEl) descEl.textContent = desc;
        if (scoreEl) {
            const diffLabels = { kolay: 'Kolay', normal: 'Normal', zor: 'Zor' };
            scoreEl.innerHTML = `
                <div class="mangala-result-side player">
                    <span>Siz</span>
                    <strong>${playerScore}</strong>
                    <small>taş</small>
                </div>
                <div class="mangala-result-vs">—</div>
                <div class="mangala-result-side ai">
                    <span>Bilge Vezir</span>
                    <strong>${aiScore}</strong>
                    <small>taş</small>
                </div>
                <div class="mangala-result-diff">Zorluk: ${diffLabels[this.difficulty] || 'Normal'}</div>
            `;
        }
        if (modal) modal.classList.add('show');
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}


// Global olarak dışa aktar
window.TavlaGame = TavlaGame;
window.OkeyGame = OkeyGame;
window.KemankesGame = KemankesGame;
window.EbruStudio = EbruStudio;
window.MangalaGame = MangalaGame;

