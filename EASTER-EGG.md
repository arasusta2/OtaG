# OTAĞ — Easter Egg Rehberi

Bu dosya, portalda gizlenen **27 easter egg**'in nasıl tetiklendiğini, oyun sohbetlerindeki `1283` davranışını, bot isim havuzunu ve yeni bir easter egg eklemek için ne yapılması gerektiğini anlatır.

Dosyalar: `easter-eggs.js` (motor) · `bot-names-data.js` (200 isim) · `style.css` içindeki `/* === EASTER EGGS === */` bloğu · Yükleme sırası `index.html`: `bot-names-data.js` → `game.js` → `app.js` → `easter-eggs.js`.

---

## 1. Tetikleme Tablosu (20)

| # | ID | Tetikleyici | Tür | Başlık |
|---|----|-------------|-----|--------|
| 1 | `fethi` | Konami kodu: `↑ ↑ ↓ ↓ ← → ← → B A` | Ciddi / gurur | 1453 — Sur Yıkan |
| 2 | `fetihKodu` | Klavyeden `1453` yazmak | Ciddi / gurur | Fetih Kodu |
| 3 | `atam` | Klavyeden `atatürk` veya `ataturk` yazmak | Ciddi / gurur | Atam İzindeyiz |
| 4 | `kanuni` | Klavyeden `kanuni` yazmak | Ciddi / gurur | Adalet Mülkün Temelidir |
| 5 | `mola` | 60 saniye boyunca hiçbir şeye dokunmamak | Ciddi / sakin | Bir Dakika Sessizlik |
| 6 | `bozkurt` | Klavyeden `bozkurt` yazmak | Epik / eğlenceli | Bozkurt Uludu |
| 7 | `cay` | Klavyeden `çay` veya `cay` yazmak | Komik | Çay Demlendi |
| 8 | `arma` | Logo kutusuna 2,5 saniye içinde 7 kez tıklamak | Komik | Arma Parlatıldı |
| 9 | `okey` | Klavyeden `okey` yazmak | Komik | Okey Benden |
| 10 | `zafer` | Klavyeden `zafer` yazmak | Komik | Kıraathane Şampiyonu |
| 11 | `kalbimizde` | Klavyeden `1283` yazmak (veya oyun sohbetine `1283` göndermek) | Duygusal | 1283 — Kalbimizde |
| 12 | `osmanli` | Klavyeden `osmanlı` / `osmanli` yazmak | Ciddi / gurur | Söğüt’ten Doğan Devlet |
| 13 | `gokturk` | Klavyeden `göktürk` / `gokturk` yazmak | Ciddi / gurur | Ötüken’den Ses |
| 14 | `simit` | Klavyeden `simit` yazmak | Komik | Çayın Yanına Simit |
| 15 | `nazar` | Klavyeden `nazar` yazmak | Komik | Nazar Değmesin |
| 16 | `kemankes` | Klavyeden `kemankeş` / `kemankes` yazmak | Epik | Ok Yaydan Çıktı |
| 17 | `ebru` | Klavyeden `ebru` yazmak | Sakin | Suya Çizilen Renk |
| 18 | `mesk` | Klavyeden `meşk` / `mesk` yazmak | Sakin | Meşk Başladı |
| 19 | `tavla` | Klavyeden `tavla` yazmak | Komik | Zar Döndü |
| 20 | `mangala` | Klavyeden `mangala` yazmak | Komik | Kuyular Sayıldı |
| 21 | `kahve` | Klavyeden `kahve` yazmak | Sıcak / sohbet | Kahve Pişti |
| 22 | `lokum` | Klavyeden `lokum` yazmak | Komik | Lokum İkramı |
| 23 | `kilim` | Klavyeden `kilim` yazmak | Kültür | Kilim Dokundu |
| 24 | `nevruz` | Klavyeden `nevruz` yazmak | Bayram | Nevruz Ateşi |
| 25 | `yunus` | Klavyeden `yunus` veya `yunus emre` yazmak | Sakin | Yunus’un Dili |
| 26 | `nasreddin` | Klavyeden `nasreddin` / `nasrettin` yazmak | Komik | Hoca’nın Eşeği |
| 27 | `kirkpinar` | Klavyeden `kırkpınar` / `kirkpinar` yazmak | Epik | Kırkpınar’da Er Meydanı |

> Not: Yazı tetikleyicileri yalnızca sayfa gövdesindeyken çalışır. Bir metin kutusuna (sohbet, arama, mangala mesajı) yazarken tetiklenmez; ancak `1283` sohbet tetikleyicisi ayrıca üç oyunun sohbet gönderiminde çalışır.

---

## 2. Oyun Sohbetlerinde `1283`

Okey, tavla ve mangala sohbet kutularından birine **yalnızca `1283`** yazıp gönderdiğinizde:

1. Sizin mesajınız balonda görünür.
2. Masadaki botlar sırayla **“Kalbimizde!”** der.
3. Kısa bir tebrik sesi (`playOkeyWin`) çalar.

| Oyun | Giriş | Bot sayısı | Davranış |
|------|-------|-----------|----------|
| Okey | `#okeyCustomChatInput` | 3 | Üç bot 500 ms arayla sırayla cevap verir |
| Tavla | `#tavlaChatInput` | 2 (rakip + seyirci) | Rakip 600 ms, seyirci 1600 ms sonra cevap verir |
| Mangala | `#mangalaChatInput` | 2 | Birinci bot 500 ms, ikinci bot 1500 ms sonra cevap verir |

Kod tarafında kontrol `/^1283$/i` ile yapılır; yani başka bir metinle birlikte yazılırsa (ör. “1283 yılı”) tetiklenmez.

- Okey: `game.js` → `OkeyGame.sendCustomChat`
- Tavla: `game.js` → `TavlaGame.say`
- Mangala: `app.js` → `sendMangalaChat`

---

## 3. Bot İsim Havuzu (200 İsim)

`bot-names-data.js` iki global sağlar:

```js
window.TURKISH_BOT_NAMES   // tam 200 tekil isim
window.pickBotNames(count, avoid) // tekrarsız rastgele isim dizisi
```

- Sayfa her yenilendiğinde okey 3, tavla 3 (rakip + kahveci + seyirci), mangala 2 isim alır.
- Aynı masada isimler tekrar etmez (`pickBotNames` havuzdan seçip çıkarır).
- Okeyde `Ali Dayı`, `Mehmet Usta`, `Hasan Amca`; tavlada `Bilgisayar`, `Kahveci Rıza`, `Seyirci Nuri`; mangalada `Bilge Vezir`, `Çırak` rollerinin yerine rastgele isimler geçer.
- `banter-data.js` içindeki sabit konuşmacı adları `banterNameMap` ile rastgele isme çevrilir; cümle içinde geçen eski adlar da `showBotLine` içinde değiştirilir.
- İsimleri değiştirmek için `bot-names-data.js` dizisini düzenleyin; sayının 200 kalmasına gerek yok, yeni isimler otomatik havuza girer.

---

## 4. Nasıl Çalışır?

### 4.1 Yazı yakalama
`document` üzerindeki `keydown` dinleyicisi tek karakterli tuşları bir tamponda toplar:

```js
state.buffer = (state.buffer + e.key).slice(-24);
```

Tampon 2 saniye boş kalırsa sıfırlanır. Her tuşta `TYPED_TRIGGERS` tablosunda `endsWith` kontrolü yapılır:

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
'göktürk': 'gokturk',
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
'yunus emre': 'yunus',
'nasreddin': 'nasreddin',
'nasrettin': 'nasreddin',
'kırkpınar': 'kirkpinar',
'kirkpinar': 'kirkpinar'
```

### 4.2 Konami kodu
Son 10 tuş `state.keys` dizisinde tutulur ve şu diziyle karşılaştırılır:

```js
['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
```

### 4.3 Logo tıklaması
`.logo-box` üzerinde 2,5 saniyelik sayaç çalışır; 7 tıklamada arma döner ve `arma` easter egg'i açılır.

### 4.4 Hareketsizlik
`pointermove`, `pointerdown`, `keydown`, `wheel`, `touchstart` olayları `lastActivity` zamanını günceller. 10 saniyede bir kontrol eden zamanlayıcı, 60 saniye sessizlikte `mola` easter egg'ini **oturumda bir kez** gösterir.

### 4.5 Görsel katman
Her easter egg tam ekran bir katman açar:

- `.easter-overlay.show` → görünür
- `.easter-card` → altın çerçeveli kart
- `#easterEmoji`, `#easterTitle`, `#easterSub`, `#easterQuote`, `#easterNote` → içerik
- `.easter-spark` → yukarıdan düşen emoji yağmuru
- `Mekâna Dön` düğmesi, `Escape` veya arka plana tıklama katmanı kapatır

Renk varyantları: `gold` (varsayılan), `kirmizi`, `turkuaz`.

### 4.6 Ses
`window.turkishSound` üzerindeki uygun metod çağrılır (`playDavul`, `playOkeyWin`, `playSealStamp`, `playKaval`, `playChime`, `playClick`, `playTileClick`, `playArrowHit`, `playTambur`, `playDiceRoll`, `playStoneDrop`). Metot yoksa sessizce devam eder.

---

## 5. Yeni Easter Egg Ekleme

1. `easter-eggs.js` içindeki `EGGS` nesnesine (veya dosyadaki `Object.assign(EGGS, {...})` bloğuna) yeni bir kayıt ekle:

```js
yeniEgg: {
    emoji: '🐎',
    title: 'BOZKIRDA BİR AT',
    sub: 'Kısa açıklama',
    quote: '“Alıntı.” — Kaynak',
    note: 'Uzun açıklama.',
    variant: 'gold',            // gold | kirmizi | turkuaz
    burst: ['🐎', '🌾', '⚔️'],  // düşen emojiler
    sound: 'playDavul'          // opsiyonel
}
```

2. Tetikleyiciyi bağla:

- **Yazı ile:** `TYPED_TRIGGERS` tablosuna `'kelime': 'yeniEgg'` ekle.
- **Tuş kombinasyonu ile:** `KONAMI` benzeri bir dizi tanımla ve `initKeyboard` içinde karşılaştır.
- **Tıklama ile:** `initLogo` gibi bir sayaç kur, eşikte `showEgg('yeniEgg')` çağır.
- **Süre ile:** `initIdle` zamanlayıcısına yeni bir koşul ekle.
- **Sohbet ile:** İlgili oyunun sohbet gönderim metoduna `1283` örneğindeki gibi bir kontrol ekle.

3. Renk/anlık görünüm gerekiyorsa `style.css` sonundaki easter egg bloğuna yeni bir `.easter-overlay.<varyant>` kuralı ekle.

4. Sayfayı yenile ve test et. Konsoldan doğrudan denemek için:

```js
OTAG_EASTER_EGGS.list()             // tüm egg'ler ve tetikleyicileri
OTAG_EASTER_EGGS.trigger('atam')    // belirli bir egg'i aç
OTAG_EASTER_EGGS.ids.length         // 20 olmalı
```

---

## 6. Test Kontrol Listesi

- [ ] `1453` yazınca “Fetih Kodu” açılıyor
- [ ] `atatürk` yazınca “Atam İzindeyiz” açılıyor
- [ ] `kanuni` yazınca “Adalet Mülkün Temelidir” açılıyor
- [ ] `bozkurt`, `çay`, `okey`, `zafer` yazınca ilgili egg açılıyor
- [ ] `1283`, `osmanlı`, `göktürk`, `simit`, `nazar`, `kemankeş`, `ebru`, `meşk`, `tavla`, `mangala` yazınca ilgili egg açılıyor
- [ ] `kahve`, `lokum`, `kilim`, `nevruz`, `yunus`, `nasreddin`, `kırkpınar` yazınca ilgili egg açılıyor
- [ ] Konami kodu “1453 — Sur Yıkan”ı açıyor
- [ ] Logoya 7 kez tıklayınca “Arma Parlatıldı” açılıyor
- [ ] 60 saniye dokunmayınca “Bir Dakika Sessizlik” bir kez açılıyor
- [ ] Okey sohbetine `1283` yazınca 3 bot “Kalbimizde!” diyor
- [ ] Tavla sohbetine `1283` yazınca rakip ve seyirci “Kalbimizde!” diyor
- [ ] Mangala sohbetine `1283` yazınca 2 bot “Kalbimizde!” diyor
- [ ] Okey/tavla/mangala bot isimleri sayfa yenilendikçe değişiyor ve aynı masada tekrar etmiyor
- [ ] Sohbet kutusuna normal metin yazarken easter egg tetiklenmiyor
- [ ] `Escape`, arka plan ve “Mekâna Dön” katmanı kapatıyor
- [ ] Mobilde kart taşmıyor, düğme erişilebilir

---

## 7. Dosya Yapısı

```
easter-eggs.js          → 20 egg tanımı, tetikleyiciler, katman
bot-names-data.js       → 200 isimlik havuz + pickBotNames()
game.js                 → okey/tavla bot isimleri, 1283 sohbet tepkisi
app.js                  → mangala bot isimleri, 1283 sohbet tepkisi
style.css               → .easter-overlay / .easter-card / .easter-spark stilleri
theme-refresh.css       → saray revakı arayüz katmanı (style.css'den sonra yüklenir)
index.html              → script sırası: bot-names-data.js → game.js → app.js → easter-eggs.js
EASTER-EGG.md           → bu rehber
```
