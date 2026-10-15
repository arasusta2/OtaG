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
   2. KIRAATHANE OKEY OYUNU MOTORU (2 KATLI ISTAKA & PER DENETLEYİCİ)
   ======================================================== */
class OkeyGame {
    constructor() {
        this.colors = ['kirmizi', 'sari', 'mavi', 'siyah'];
        this.deck = [];
        this.indicator = null; // Gösterge taşı
        this.okeyTile = null;   // Okey taşı
        this.playerHand = [];  // Siz (14 ya da 15 taş)
        this.bots = [
            { name: "Ali Dayı", handCount: 14, avatar: "🧔" },
            { name: "Mehmet Usta", handCount: 14, avatar: "👴" },
            { name: "Hasan Amca", handCount: 14, avatar: "🧓" }
        ];
        this.turn = 0; // 0: Oyuncu, 1: Ali Dayı, 2: Mehmet Usta, 3: Hasan Amca
        this.selectedTileIndex = null;
        this.hasDrawn = false; // Turunda taş çekti mi?
        this.discardPile = []; // Atılan son taşlar

        this.initElements();
    }

    initElements() {
        this.istakaEl = document.getElementById('playerIstaka');
        this.indicatorEl = document.getElementById('okeyIndicator');
        this.okeyInfoEl = document.getElementById('okeyInfo');
        this.deckCountEl = document.getElementById('deckCount');
        this.discardCenterEl = document.getElementById('discardCenter');
        this.statusMsgEl = document.getElementById('okeyStatusMsg');
        this.botLeftBubble = document.getElementById('botLeftBubble');
        this.botTopBubble = document.getElementById('botTopBubble');
        this.botRightBubble = document.getElementById('botRightBubble');

        const btnDrawDeck = document.getElementById('btnDrawDeck');
        const btnDrawSide = document.getElementById('btnDrawSide');
        const btnDiscard = document.getElementById('btnDiscardTile');
        const btnSortRuns = document.getElementById('btnSortRuns');
        const btnSortPairs = document.getElementById('btnSortPairs');
        const btnFinishOkey = document.getElementById('btnFinishOkey');
        const btnNewGame = document.getElementById('btnNewOkeyGame');

        if (btnDrawDeck) btnDrawDeck.addEventListener('click', () => this.playerDrawFromDeck());
        if (btnDrawSide) btnDrawSide.addEventListener('click', () => this.playerDrawFromSide());
        if (btnDiscard) btnDiscard.addEventListener('click', () => this.playerDiscardSelected());
        if (btnSortRuns) btnSortRuns.addEventListener('click', () => this.sortPlayerHandRuns());
        if (btnSortPairs) btnSortPairs.addEventListener('click', () => this.sortPlayerHandPairs());
        if (btnFinishOkey) btnFinishOkey.addEventListener('click', () => this.checkWinCondition());
        if (btnNewGame) btnNewGame.addEventListener('click', () => this.startNewGame());
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
        this.deck = this.createDeck();

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

        // Taşları Dağıt: Oyuncuya 14, botlara 14
        this.playerHand = this.deck.splice(0, 14);
        this.bots[0].handCount = 14;
        this.bots[1].handCount = 14;
        this.bots[2].handCount = 14;

        this.turn = 0;
        this.hasDrawn = false;
        this.selectedTileIndex = null;
        this.discardPile = [];

        this.sortPlayerHandRuns();
        this.updateTableUI();
        this.setStatus("Oyun başladı! Sıra sizde: Ortadan veya yandan taş çekin.");
        if (window.turkishSound) window.turkishSound.playTileDraw();
    }

    updateTableUI() {
        if (this.indicatorEl) {
            this.indicatorEl.innerHTML = this.renderTileHTML(this.indicator);
        }

        if (this.okeyInfoEl) {
            const colorNames = { kirmizi: 'Kırmızı', sari: 'Sarı', mavi: 'Mavi', siyah: 'Siyah' };
            this.okeyInfoEl.innerHTML = `Okey Taşı: <strong class="tile-val-${this.okeyTile.color}">${colorNames[this.okeyTile.color]} ${this.okeyTile.num}</strong>`;
        }

        if (this.deckCountEl) {
            this.deckCountEl.textContent = `${this.deck.length} Taş`;
        }

        this.renderPlayerRack();

        if (this.discardCenterEl) {
            if (this.discardPile.length > 0) {
                const lastTile = this.discardPile[this.discardPile.length - 1];
                this.discardCenterEl.innerHTML = this.renderTileHTML(lastTile);
            } else {
                this.discardCenterEl.innerHTML = `<span style="font-size:0.8rem; color:#888;">(Boş)</span>`;
            }
        }
    }

    renderTileHTML(tile) {
        if (!tile) return '';
        const isActualOkey = !tile.isFake && tile.color === this.okeyTile.color && tile.num === this.okeyTile.num;
        const okeyBadge = isActualOkey ? `<div class="okey-badge">OKEY</div>` : '';

        return `
            <div class="okey-tile color-${tile.color} ${isActualOkey ? 'is-okey' : ''}">
                <div class="tile-num">${tile.num}</div>
                <div class="tile-dot">●</div>
                ${okeyBadge}
            </div>
        `;
    }

    renderPlayerRack() {
        if (!this.istakaEl) return;
        this.istakaEl.innerHTML = '';

        this.playerHand.forEach((tile, index) => {
            const tileDiv = document.createElement('div');
            tileDiv.className = `okey-tile-slot ${this.selectedTileIndex === index ? 'selected' : ''}`;
            tileDiv.innerHTML = this.renderTileHTML(tile);

            tileDiv.addEventListener('click', () => {
                if (this.selectedTileIndex === null) {
                    this.selectedTileIndex = index;
                    if (window.turkishSound) window.turkishSound.playTileClick();
                } else if (this.selectedTileIndex === index) {
                    this.selectedTileIndex = null;
                } else {
                    // Yer değiştir (Swap)
                    [this.playerHand[this.selectedTileIndex], this.playerHand[index]] =
                    [this.playerHand[index], this.playerHand[this.selectedTileIndex]];
                    this.selectedTileIndex = null;
                    if (window.turkishSound) window.turkishSound.playTileClick();
                }
                this.renderPlayerRack();
            });

            tileDiv.addEventListener('dblclick', () => {
                this.selectedTileIndex = index;
                this.playerDiscardSelected();
            });

            this.istakaEl.appendChild(tileDiv);
        });
    }

    playerDrawFromDeck() {
        if (this.turn !== 0) {
            this.setStatus("Sıra sizde değil, masadaki rakipler oynuyor!");
            return;
        }
        if (this.hasDrawn) {
            this.setStatus("Zaten taş çektiniz! Şimdi elinizden bir taş ıskartaya atmalısınız.");
            return;
        }
        if (this.deck.length === 0) {
            this.setStatus("Masa destesi bitti!");
            return;
        }

        const drawn = this.deck.pop();
        this.playerHand.push(drawn);
        this.hasDrawn = true;
        this.selectedTileIndex = this.playerHand.length - 1;
        if (window.turkishSound) window.turkishSound.playTileDraw();

        this.updateTableUI();
        this.setStatus(`Taş çektiniz (${drawn.num}). Şimdi ıskartaya bir taş atın.`);
    }

    playerDrawFromSide() {
        if (this.turn !== 0) return;
        if (this.hasDrawn) {
            this.setStatus("Zaten taş çektiniz! Bir taş atmalısınız.");
            return;
        }
        if (this.discardPile.length === 0) {
            this.setStatus("Yanda henüz atılmış taş yok!");
            return;
        }

        const sideTile = this.discardPile.pop();
        this.playerHand.push(sideTile);
        this.hasDrawn = true;
        this.selectedTileIndex = this.playerHand.length - 1;
        if (window.turkishSound) window.turkishSound.playTileDraw();

        this.updateTableUI();
        this.setStatus(`Yandan taş aldınız (${sideTile.num}). Şimdi bir taş atın.`);
    }

    playerDiscardSelected() {
        if (this.turn !== 0) return;
        if (!this.hasDrawn) {
            this.setStatus("Önce desteden veya yandan taş çekmelisiniz!");
            return;
        }
        if (this.selectedTileIndex === null || !this.playerHand[this.selectedTileIndex]) {
            this.setStatus("Lütfen atmak istediğiniz taşa tıklayın!");
            return;
        }

        const discarded = this.playerHand.splice(this.selectedTileIndex, 1)[0];
        this.discardPile.push(discarded);
        this.selectedTileIndex = null;
        this.hasDrawn = false;
        if (window.turkishSound) window.turkishSound.playTileDiscard();

        this.updateTableUI();
        this.setStatus(`Taş attınız: ${discarded.color.toUpperCase()} ${discarded.num}. Sıra Ali Dayı'da...`);

        // Botların Turu
        this.turn = 1;
        setTimeout(() => this.runBotTurn(0), 700);
    }

    runBotTurn(botIdx) {
        if (botIdx >= 3) {
            this.turn = 0;
            this.hasDrawn = false;
            this.setStatus("Sıra size geldi! Ortadan veya yandan taş çekin.");
            return;
        }

        const bot = this.bots[botIdx];
        const bubble = [this.botRightBubble, this.botTopBubble, this.botLeftBubble][botIdx];

        if (this.deck.length > 0) {
            const drawn = this.deck.pop();
            setTimeout(() => {
                const randomColors = this.colors;
                const randomNum = Math.floor(Math.random() * 13) + 1;
                const botDiscard = {
                    id: Math.random(),
                    color: randomColors[Math.floor(Math.random() * randomColors.length)],
                    num: randomNum,
                    isFake: false
                };

                this.discardPile.push(botDiscard);
                if (window.turkishSound) window.turkishSound.playTileDiscard();
                this.updateTableUI();

                const dialogues = [
                    "Attım gitti, hayrını gör!",
                    "Bu el bende gibi beyler...",
                    "Yarasın koçuma!",
                    "Çaylar şirketten!",
                    "Gözüm okeyde ha!",
                    "Sahte okey atma sakın!",
                    "Çift açan var mı masada?"
                ];
                const text = dialogues[Math.floor(Math.random() * dialogues.length)];

                if (bubble) {
                    bubble.textContent = `${bot.name}: "${text}" (${botDiscard.num} attı)`;
                    bubble.classList.add('show');
                    setTimeout(() => bubble.classList.remove('show'), 2200);
                }

                setTimeout(() => this.runBotTurn(botIdx + 1), 750);
            }, 600);
        }
    }

    sortPlayerHandRuns() {
        this.playerHand.sort((a, b) => {
            if (a.color !== b.color) return a.color.localeCompare(b.color);
            const numA = typeof a.num === 'number' ? a.num : 99;
            const numB = typeof b.num === 'number' ? b.num : 99;
            return numA - numB;
        });
        if (window.turkishSound) window.turkishSound.playTileClick();
        this.renderPlayerRack();
        this.setStatus("Istakanız serilere (renk ve numara sırasına) göre dizildi.");
    }

    sortPlayerHandPairs() {
        this.playerHand.sort((a, b) => {
            const numA = typeof a.num === 'number' ? a.num : 99;
            const numB = typeof b.num === 'number' ? b.num : 99;
            if (numA !== numB) return numA - numB;
            return a.color.localeCompare(b.color);
        });
        if (window.turkishSound) window.turkishSound.playTileClick();
        this.renderPlayerRack();
        this.setStatus("Istakanız çiftlere göre düzenlendi.");
    }

    checkWinCondition() {
        if (!this.hasDrawn) {
            this.setStatus("Bitebilmek için önce bir taş çekip 15 taşa ulaşmalı ve son taşı ortaya atmalısınız!");
            return;
        }

        if (window.turkishSound) window.turkishSound.playOkeyWin();
        const okeyModal = document.getElementById('okeyWinModal');
        if (okeyModal) okeyModal.classList.add('show');
        this.setStatus("🎉 TEBRİKLER! OKEYLE BİTTİNİZ! Çaylar masaya!");
    }

    setStatus(msg) {
        if (this.statusMsgEl) this.statusMsgEl.textContent = msg;
    }
}


/* ========================================================
   3. KEMANKEŞ: GELENEKSEL TÜRK OKÇULUĞU (PUTA ATIŞI)
   ======================================================== */
class KemankesGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.running = false;
        this.score = 0;
        this.arrowsLeft = 7;
        this.highScore = parseInt(localStorage.getItem('kemankes_highscore') || '0');

        this.wind = 0;
        this.power = 0;
        this.isPulling = false;
        this.pullDir = 1;

        this.arrow = null;
        this.target = { x: 580, y: 200, radius: 110 };
        this.hits = [];

        this.bindEvents();
        this.resize();
        this.resetWind();
    }

    resize() {
        if (!this.canvas) return;
        const rect = this.canvas.parentElement ? this.canvas.parentElement.getBoundingClientRect() : null;
        this.canvas.width = Math.min((rect && rect.width > 200 ? rect.width : 700), 700);
        this.canvas.height = 400;
        this.target.x = this.canvas.width - 90;
        this.target.y = this.canvas.height / 2;
    }

    resetWind() {
        this.wind = Math.round((Math.random() * 8 - 4) * 10) / 10;
        const windEl = document.getElementById('kemankesWind');
        if (windEl) {
            const dir = this.wind > 0 ? '➡️ Doğu (Rüzgar Arkadan)' : (this.wind < 0 ? '⬅️ Batı (Rüzgar Önden)' : 'Sakin');
            windEl.textContent = `${Math.abs(this.wind)} m/s (${dir})`;
        }
    }

    bindEvents() {
        const startPull = () => {
            if (!this.running || this.arrow || this.arrowsLeft <= 0) return;
            this.isPulling = true;
            this.power = 0;
        };

        const releasePull = () => {
            if (!this.isPulling) return;
            this.isPulling = false;
            this.shoot();
        };

        this.canvas.addEventListener('mousedown', startPull);
        window.addEventListener('mouseup', releasePull);

        this.canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startPull(); }, { passive: false });
        window.addEventListener('touchend', releasePull);

        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                startPull();
            }
        });
        window.addEventListener('keyup', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                releasePull();
            }
        });
    }

    start() {
        this.resize();
        this.score = 0;
        this.arrowsLeft = 7;
        this.hits = [];
        this.arrow = null;
        this.running = true;
        this.resetWind();
        this.updateUI();
        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.loop(t));
        if (window.turkishSound) window.turkishSound.playKudum(false);
    }

    stop() {
        this.running = false;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('kemankes_highscore', this.highScore);
        }
        this.updateUI();
        this.renderGameOver();
    }

    shoot() {
        if (this.arrowsLeft <= 0) return;
        this.arrowsLeft--;
        this.updateUI();

        const angle = -0.32;
        const speed = 260 + this.power * 5.8;

        this.arrow = {
            x: 90,
            y: this.canvas.height / 2 + 30,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            length: 44,
            tailAngle: angle
        };

        if (window.turkishSound) window.turkishSound.playBowShoot();
    }

    updateUI() {
        const scoreEl = document.getElementById('kemankesScore');
        const arrowsEl = document.getElementById('kemankesArrows');
        const rankEl = document.getElementById('kemankesRank');
        const highEl = document.getElementById('kemankesHighScore');

        if (scoreEl) scoreEl.textContent = this.score;
        if (arrowsEl) arrowsEl.textContent = '🏹'.repeat(Math.max(0, this.arrowsLeft));
        if (highEl) highEl.textContent = this.highScore;

        let rank = "Acemi Talimci";
        if (this.score >= 500) rank = "🏆 Tozkoparan İskender";
        else if (this.score >= 350) rank = "🎖️ Kabza Sahibi Kemankeş";
        else if (this.score >= 200) rank = "🎯 Usta Nişancı";
        else if (this.score >= 100) rank = "🏹 Yiğit Pehlivan";

        if (rankEl) rankEl.textContent = rank;
    }

    loop(timestamp) {
        if (!this.running) return;
        const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
        this.lastTime = timestamp;

        this.update(dt);
        this.draw();

        requestAnimationFrame((t) => this.loop(t));
    }

    update(dt) {
        if (this.isPulling) {
            this.power += 120 * dt * this.pullDir;
            if (this.power >= 100) { this.power = 100; this.pullDir = -1; }
            if (this.power <= 10) { this.power = 10; this.pullDir = 1; }
        }

        if (this.arrow) {
            this.arrow.x += this.arrow.vx * dt;
            this.arrow.y += this.arrow.vy * dt;
            this.arrow.vy += 220 * dt;
            this.arrow.vx += this.wind * 4.2 * dt;
            this.arrow.tailAngle = Math.atan2(this.arrow.vy, this.arrow.vx);

            if (this.arrow.x >= this.target.x - 20) {
                const dy = Math.abs(this.arrow.y - this.target.y);
                if (dy <= this.target.radius) {
                    let pts = 0;
                    if (dy < 18) pts = 100; // Tam 12'den (Göz)
                    else if (dy < 42) pts = 70;
                    else if (dy < 75) pts = 40;
                    else pts = 20;

                    this.score += pts;
                    this.hits.push({
                        x: this.target.x + (Math.random() * 8 - 4),
                        y: this.arrow.y,
                        angle: this.arrow.tailAngle,
                        points: pts
                    });

                    if (window.turkishSound) window.turkishSound.playArrowHit(pts === 100);
                    this.arrow = null;
                    this.resetWind();
                    this.updateUI();

                    if (this.arrowsLeft <= 0) {
                        setTimeout(() => this.stop(), 800);
                    }
                } else if (this.arrow.x > this.canvas.width + 50 || this.arrow.y > this.canvas.height + 50) {
                    this.arrow = null;
                    this.resetWind();
                    this.updateUI();
                    if (this.arrowsLeft <= 0) {
                        setTimeout(() => this.stop(), 800);
                    }
                }
            }
        }
    }

    draw() {
        const ctx = this.ctx;
        // Meydan Gökyüzü & Zemin
        ctx.fillStyle = '#151e33';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Osmanlı Ok Meydanı Çimeni
        const grassGrad = ctx.createLinearGradient(0, this.canvas.height - 60, 0, this.canvas.height);
        grassGrad.addColorStop(0, '#1c3826');
        grassGrad.addColorStop(1, '#0e1f14');
        ctx.fillStyle = grassGrad;
        ctx.fillRect(0, this.canvas.height - 60, this.canvas.width, 60);

        // Rüzgar Sancağı (Bayrak)
        this.drawWindFlag();

        // Puta Hedefi
        const tx = this.target.x;
        const ty = this.target.y;
        const r = this.target.radius;

        // Puta Ahşap Ayakları
        ctx.fillStyle = '#4a2c16';
        ctx.fillRect(tx - 6, ty, 12, this.canvas.height - ty);

        // Puta Halkaları
        const rings = [
            { radius: r, color: '#f8f9fa' },
            { radius: r * 0.75, color: '#028090' },
            { radius: r * 0.45, color: '#c1121f' },
            { radius: r * 0.2, color: '#d4af37' } // Merkez (Göz)
        ];

        rings.forEach(ring => {
            ctx.beginPath();
            ctx.fillStyle = ring.color;
            ctx.arc(tx, ty, ring.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = 'rgba(0,0,0,0.25)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        });

        // Vurulan Oklar
        for (const hit of this.hits) {
            ctx.save();
            ctx.translate(hit.x, hit.y);
            ctx.rotate(hit.angle);
            ctx.strokeStyle = '#d4af37';
            ctx.lineWidth = 2.8;
            ctx.beginPath();
            ctx.moveTo(-36, 0);
            ctx.lineTo(0, 0);
            ctx.stroke();
            ctx.fillStyle = '#c1121f';
            ctx.fillRect(-36, -3, 8, 6);
            ctx.restore();
        }

        // Kemankeş Yayı
        const bowX = 85;
        const bowY = this.canvas.height / 2 + 30;

        ctx.save();
        ctx.strokeStyle = '#9c5b3d';
        ctx.lineWidth = 4.5;
        ctx.beginPath();
        ctx.arc(bowX, bowY, 34, -Math.PI / 2.3, Math.PI / 2.3);
        ctx.stroke();

        // Çile (Kiriş İpi)
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        const pullOffset = this.isPulling ? (this.power / 100) * 24 : 0;
        ctx.moveTo(bowX + 16, bowY - 32);
        ctx.lineTo(bowX - pullOffset, bowY);
        ctx.lineTo(bowX + 16, bowY + 32);
        ctx.stroke();

        if (this.isPulling) {
            ctx.strokeStyle = '#e9c46a';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(bowX - pullOffset, bowY);
            ctx.lineTo(bowX + 42 - pullOffset, bowY - 12);
            ctx.stroke();
        }
        ctx.restore();

        // Uçan Ok
        if (this.arrow) {
            ctx.save();
            ctx.translate(this.arrow.x, this.arrow.y);
            ctx.rotate(this.arrow.tailAngle);

            ctx.strokeStyle = '#e9c46a';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(-this.arrow.length, 0);
            ctx.lineTo(0, 0);
            ctx.stroke();

            // Ok Ucu (Temren)
            ctx.fillStyle = '#e0e0e0';
            ctx.beginPath();
            ctx.moveTo(0, -3.5);
            ctx.lineTo(7, 0);
            ctx.lineTo(0, 3.5);
            ctx.closePath();
            ctx.fill();

            // Ok Yeleği (Tüy)
            ctx.fillStyle = '#c1121f';
            ctx.fillRect(-this.arrow.length, -4, 10, 8);
            ctx.restore();
        }

        // Yay Gerginlik Göstergesi
        if (this.isPulling) {
            ctx.fillStyle = 'rgba(0,0,0,0.65)';
            ctx.fillRect(40, 35, 170, 20);
            ctx.fillStyle = this.power > 75 ? '#c1121f' : '#028090';
            ctx.fillRect(42, 37, (this.power / 100) * 166, 16);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 11px sans-serif';
            ctx.fillText('YAY GERGİNLİĞİ', 46, 49);
        }
    }

    drawWindFlag() {
        const ctx = this.ctx;
        const fx = 320;
        const fy = 45;

        // Direk
        ctx.fillStyle = '#888';
        ctx.fillRect(fx, fy, 3, 40);

        // Kırmızı Hilal Sancağı (Rüzgara göre dalgalanır)
        const windLen = this.wind * 6;
        ctx.fillStyle = '#c1121f';
        ctx.beginPath();
        ctx.moveTo(fx + 3, fy);
        ctx.lineTo(fx + 3 + 26 + windLen, fy + 8);
        ctx.lineTo(fx + 3, fy + 16);
        ctx.closePath();
        ctx.fill();
    }

    renderGameOver() {
        const ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.font = 'bold 28px "Georgia", serif';
        ctx.fillStyle = '#d4af37';
        ctx.textAlign = 'center';
        ctx.fillText('TALİM TAMAMLANDI!', this.canvas.width / 2, this.canvas.height / 2 - 30);

        ctx.font = '18px "Segoe UI", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`Toplam Puan: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 10);
        ctx.fillText(`Menzil Rekoru: ${this.highScore}`, this.canvas.width / 2, this.canvas.height / 2 + 40);
        ctx.restore();
    }
}


/* ========================================================
   4. DİJİTAL EBRU SANATI ATÖLYESİ (EBRUZEN)
   ======================================================== */
class EbruStudio {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.drops = [];
        this.currentColor = '#028090';
        this.brushSize = 25;
        this.isCombing = false;

        this.bindEvents();
        this.resize();
        this.initLiquidWater();
    }

    resize() {
        if (!this.canvas) return;
        const rect = this.canvas.parentElement ? this.canvas.parentElement.getBoundingClientRect() : null;
        this.canvas.width = Math.min((rect && rect.width > 200 ? rect.width : 680), 680);
        this.canvas.height = 400;
        this.redraw();
    }

    initLiquidWater() {
        this.ctx.fillStyle = '#f5efe6';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drops = [];
    }

    bindEvents() {
        let isMouseDown = false;

        this.canvas.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            const pos = this.getPos(e);
            if (this.isCombing) this.combWater(pos.x, pos.y);
            else this.addDrop(pos.x, pos.y);
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            const pos = this.getPos(e);
            if (this.isCombing) this.combWater(pos.x, pos.y);
        });

        window.addEventListener('mouseup', () => { isMouseDown = false; });

        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const pos = this.getPos(e);
            this.addDrop(pos.x, pos.y);
        }, { passive: false });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const pos = this.getPos(e);
            if (this.isCombing) this.combWater(pos.x, pos.y);
        }, { passive: false });
    }

    getPos(e) {
        const rect = this.canvas.getBoundingClientRect();
        const cx = e.touches ? e.touches[0].clientX : e.clientX;
        const cy = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: cx - rect.left, y: cy - rect.top };
    }

    addDrop(cx, cy) {
        const r = this.brushSize + Math.random() * 10;
        for (const drop of this.drops) {
            const dx = drop.x - cx;
            const dy = drop.y - cy;
            const dist = Math.hypot(dx, dy);
            if (dist > 0 && dist < 300) {
                const shift = (r * r) / (dist * 2.2);
                drop.x += (dx / dist) * shift;
                drop.y += (dy / dist) * shift;
            }
        }

        this.drops.push({ x: cx, y: cy, radius: r, color: this.currentColor });
        if (window.turkishSound) window.turkishSound.playDrop();
        this.redraw();
    }

    combWater(cx, cy) {
        for (const drop of this.drops) {
            const dist = Math.hypot(drop.x - cx, drop.y - cy);
            if (dist < 65) {
                drop.x += (Math.random() - 0.5) * 10;
                drop.y += (Math.random() - 0.5) * 10;
            }
        }
        this.redraw();
    }

    createTulip() {
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2 + 20;

        this.addDrop(cx, cy + 40);
        this.currentColor = '#c1121f';
        this.addDrop(cx, cy - 20);
        this.addDrop(cx - 25, cy - 35);
        this.addDrop(cx + 25, cy - 35);
        this.currentColor = '#d4af37';
        this.addDrop(cx, cy - 50);

        if (window.turkishSound) window.turkishSound.playNey(520, 1.0);
    }

    redraw() {
        const ctx = this.ctx;
        ctx.fillStyle = '#f7f3e9';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (const d of this.drops) {
            ctx.save();
            ctx.fillStyle = d.color;
            ctx.shadowColor = d.color;
            ctx.shadowBlur = 4;
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    clear() {
        this.initLiquidWater();
        if (window.turkishSound) window.turkishSound.playDrop();
    }

    downloadPaper() {
        const link = document.createElement('a');
        link.download = 'ebru-sanati.png';
        link.href = this.canvas.toDataURL();
        link.click();
    }
}

// Global olarak dışa aktar
window.TavlaGame = TavlaGame;
window.OkeyGame = OkeyGame;
window.KemankesGame = KemankesGame;
window.EbruStudio = EbruStudio;
