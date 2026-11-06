# OTAĞ — Easter Egg'ler

Portalda **27 easter egg** gizlidir. Yazı ile, tuş kombinasyonu ile, tıklama ile, hareketsizlik ile veya oyun sohbeti ile tetiklenirler. Her biri tam ekran, altın çerçeveli bir kart açar; kartta başlık, kısa açıklama, alıntı ve not bulunur.

Motor: `easter-eggs.js` · Stil: `style.css` sonundaki `/* === EASTER EGGS === */` bloğu · Yükleme: `index.html` içinde `app.js`'den sonra.

---

## 1. Tüm Easter Egg'ler ve Tetikleyicileri

| # | ID | Tetikleyici | Tür | Kart başlığı |
|---|----|-------------|-----|--------------|
| 1 | `fethi` | Konami kodu: `↑ ↑ ↓ ↓ ← → ← → B A` | Ciddi / gurur | 1453 — Sur Yıkan |
| 2 | `fetihKodu` | Klavyeden `1453` yazmak | Ciddi / gurur | Fetih Kodu |
| 3 | `atam` | `atatürk` veya `ataturk` yazmak | Ciddi / gurur | Atam İzindeyiz |
| 4 | `kanuni` | `kanuni` yazmak | Ciddi / gurur | Adalet Mülkün Temelidir |
| 5 | `mola` | 60 saniye hiçbir şeye dokunmamak | Sakin | Bir Dakika Sessizlik |
| 6 | `bozkurt` | `bozkurt` yazmak | Epik | Bozkurt Uludu |
| 7 | `cay` | `çay` veya `cay` yazmak | Komik | Çay Demlendi |
| 8 | `arma` | Logo kutusuna 2,5 saniyede 7 kez tıklamak | Komik | Arma Parlatıldı |
| 9 | `okey` | `okey` yazmak | Komik | Okey Benden |
| 10 | `zafer` | `zafer` yazmak | Komik | Kıraathane Şampiyonu |
| 11 | `kalbimizde` | `1283` yazmak veya oyun sohbetine `1283` göndermek | Duygusal | 1283 — Kalbimizde |
| 12 | `osmanli` | `osmanlı` / `osmanli` yazmak | Ciddi / gurur | Söğüt’ten Doğan Devlet |
| 13 | `gokturk` | `göktürk` / `gokturk` yazmak | Ciddi / gurur | Ötüken’den Ses |
| 14 | `simit` | `simit` yazmak | Komik | Çayın Yanına Simit |
| 15 | `nazar` | `nazar` yazmak | Komik | Nazar Değmesin |
| 16 | `kemankes` | `kemankeş` / `kemankes` yazmak | Epik | Ok Yaydan Çıktı |
| 17 | `ebru` | `ebru` yazmak | Sakin | Suya Çizilen Renk |
| 18 | `mesk` | `meşk` / `mesk` yazmak | Sakin | Meşk Başladı |
| 19 | `tavla` | `tavla` yazmak | Komik | Zar Döndü |
| 20 | `mangala` | `mangala` yazmak | Komik | Kuyular Sayıldı |
| 21 | `kahve` | `kahve` yazmak | Sıcak / sohbet | Kahve Pişti |
| 22 | `lokum` | `lokum` yazmak | Komik | Lokum İkramı |
| 23 | `kilim` | `kilim` yazmak | Kültür | Kilim Dokundu |
| 24 | `nevruz` | `nevruz` yazmak | Bayram | Nevruz Ateşi |
| 25 | `yunus` | `yunus` veya `yunus emre` yazmak | Sakin | Yunus’un Dili |
| 26 | `nasreddin` | `nasreddin` / `nasrettin` yazmak | Komik | Hoca’nın Eşeği |
| 27 | `kirkpinar` | `kırkpınar` / `kirkpinar` yazmak | Epik | Kırkpınar’da Er Meydanı |

> Yazı tetikleyicileri yalnızca sayfa gövdesindeyken çalışır. Bir metin kutusuna (sohbet, arama, mangala mesajı) yazarken tetiklenmez. Tek istisna, sohbet gönderiminde ayrıca kontrol edilen `1283`'tür.

---

## 2. Oyun Sohbetlerinde `1283`

Okey, tavla veya mangala sohbet kutusuna **yalnızca `1283`** yazıp gönderince:

1. Oyuncunun mesajı balonda görünür.
2. Masadaki botlar **"Kalbimizde!"** der.
3. Kısa bir tebrik sesi çalar.
4. Araya giren kıraathane muhabbeti 6–8 saniye susturulur ki cevaplar okunabilsin.

| Oyun | Giriş alanı | Bot sayısı | Sıra |
|------|-------------|-----------|------|
| Okey | `#okeyCustomChatInput` | 3 | Üçü aynı anda, kendi balonlarında |
| Tavla | `#tavlaChatInput` | 2 (rakip + seyirci) | 600 ms ve 1600 ms sonra |
| Mangala | `#mangalaChatInput` | 2 | 500 ms ve 1500 ms sonra |

Kontrol `/^1283$/i` ile yapılır; "1283 yılı" gibi ek metinler tetiklemez.

- Okey: `game.js` → `OkeyGame.sendCustomChat`
- Tavla: `game.js` → `TavlaGame.say`
- Mangala: `app.js` → `sendMangalaChat`

---

## 3. Nasıl Çalışır?

### 3.1 Yazı yakalama
`document` üzerindeki `keydown` dinleyicisi tek karakterli tuşları biriktirir:

```js
state.buffer = (state.buffer + e.key).slice(-24);
```

Tampon 2 saniye boş kalınca sıfırlanır. Her tuşta `TYPED_TRIGGERS` tablosunda `endsWith` kontrolü yapılır:

```js
'1453': 'fetihKodu',
'atatürk': 'atam',
'bozkurt': 'bozkurt',
'çay': 'cay',
'kanuni': 'kanuni',
'okey': 'okey',
'zafer': 'zafer',
'1283': 'kalbimizde',
'osmanlı': 'osmanli',
'simit': 'simit',
'nazar': 'nazar',
'kemankeş': 'kemankes',
'ebru': 'ebru',
'meşk': 'mesk',
'tavla': 'tavla',
'mangala': 'mangala',
'kahve': 'kahve',
'lokum': 'lokum',
'kilim': 'kilim',
'nevruz': 'nevruz',
'yunus': 'yunus',
'nasreddin': 'nasreddin',
'kırkpınar': 'kirkpinar'
```

### 3.2 Konami kodu
Son 10 tuş `state.keys` dizisinde tutulur ve şu diziyle karşılaştırılır:

```js
['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
```

### 3.3 Logo tıklaması
`.logo-box` üzerinde 2,5 saniyelik sayaç çalışır; 7 tıklamada arma döner ve `arma` egg'i açılır.

### 3.4 Hareketsizlik
`pointermove`, `pointerdown`, `keydown`, `wheel` ve `touchstart` olayları son etkinlik zamanını günceller. 10 saniyede bir kontrol eden zamanlayıcı, 60 saniye sessizlikte `mola` egg'ini **oturumda bir kez** gösterir.

### 3.5 Görsel katman
Her egg tam ekran bir katman açar:

- `.easter-overlay.show` → görünür
- `.easter-card` → altın çerçeveli kart
- `#easterEmoji`, `#easterTitle`, `#easterSub`, `#easterQuote`, `#easterNote` → içerik
- `.easter-spark` → yukarıdan düşen emoji yağmuru
- "Mekâna Dön" düğmesi, `Escape` veya arka plana tıklama katmanı kapatır

Renk varyantları: `gold` (varsayılan), `kirmizi`, `turkuaz`.

### 3.6 Ses
`window.turkishSound` üzerindeki uygun metot çağrılır: `playDavul`, `playOkeyWin`, `playSealStamp`, `playKaval`, `playChime`, `playClick`, `playTileClick`, `playArrowHit`, `playTambur`, `playDiceRoll`, `playStoneDrop`. Metot yoksa sessizce devam edilir.

---

## 4. Üç Dalga

| Dalga | Egg sayısı | Egg'ler |
|-------|-----------|---------|
| 1 | 10 | `fethi`, `fetihKodu`, `atam`, `kanuni`, `mola`, `bozkurt`, `cay`, `arma`, `okey`, `zafer` |
| 2 | 10 | `kalbimizde`, `osmanli`, `gokturk`, `simit`, `nazar`, `kemankes`, `ebru`, `mesk`, `tavla`, `mangala` |
| 3 | 7 | `kahve`, `lokum`, `kilim`, `nevruz`, `yunus`, `nasreddin`, `kirkpinar` |

---

## 5. Yeni Egg Ekleme (Kısa)

1. `easter-eggs.js` içindeki `EGGS` nesnesine veya `Object.assign(EGGS, {...})` bloğuna kayıt ekle:

```js
yeniEgg: {
    emoji: '🐎',
    title: 'BAŞLIK',
    sub: 'Kısa açıklama',
    quote: '“Alıntı.” — Kaynak',
    note: 'Uzun açıklama.',
    variant: 'gold',            // gold | kirmizi | turkuaz
    burst: ['🐎', '🌾', '⚔️'],
    sound: 'playDavul'          // opsiyonel
}
```

2. `TYPED_TRIGGERS` tablosuna `'kelime': 'yeniEgg'` ekle (veya Konami, tıklama, süre, sohbet tetikleyicisi bağla).

3. Sayfayı yenile ve konsoldan dene:

```js
OTAG_EASTER_EGGS.list()            // tüm egg'ler ve tetikleyicileri
OTAG_EASTER_EGGS.trigger('kahve')  // belirli bir egg'i aç
OTAG_EASTER_EGGS.ids.length        // 27 olmalı
```

Ayrıntılı geliştirici rehberi: `EASTER-EGG.md`.

---

## 6. Test Kontrol Listesi

- [ ] `1453`, `atatürk`, `kanuni`, `bozkurt`, `çay`, `okey`, `zafer` yazınca doğru kart açılıyor
- [ ] `1283`, `osmanlı`, `göktürk`, `simit`, `nazar`, `kemankeş`, `ebru`, `meşk`, `tavla`, `mangala` yazınca doğru kart açılıyor
- [ ] `kahve`, `lokum`, `kilim`, `nevruz`, `yunus`, `nasreddin`, `kırkpınar` yazınca doğru kart açılıyor
- [ ] Konami kodu "1453 — Sur Yıkan"ı açıyor
- [ ] Logoya 7 kez tıklayınca "Arma Parlatıldı" açılıyor
- [ ] 60 saniye dokunmayınca "Bir Dakika Sessizlik" bir kez açılıyor
- [ ] Okey sohbetinde üç bot, tavlada rakip + seyirci, mangalada iki bot "Kalbimizde!" diyor
- [ ] Sohbet kutusuna normal metin yazarken egg tetiklenmiyor
- [ ] `Escape`, arka plan ve "Mekâna Dön" katmanı kapatıyor
- [ ] Mobilde kart taşmıyor, düğme erişilebilir
