# OTAĞ — Site Hakkında

**OTAĞ**, Türk kültürünü, tarihini ve kıraathane geleneğini tek bir tarayıcı portalında buluşturan statik bir web uygulamasıdır. Lacivert gece zemini, varak altın çerçeveler ve turkuaz vurgularla "saray revakı" estetiğini modern bir arayüzle birleştirir.

- **Tür:** Statik HTML / CSS / JavaScript portalı
- **Dil:** Türkçe
- **Derleme adımı:** Yok — harici paket, Node.js veya build aracı gerekmez
- **Çalıştırma:** `index.html` dosyasını tarayıcıda açmak yeterli; pano izinleri için `localhost` üzerinden statik sunucu önerilir

---

## 1. Ne Sunuyor?

Portal üç ana oyun ve sekiz kültür aracını tek sayfada sekme mantığıyla sunar:

| Bölüm | Ne yapar |
|-------|----------|
| 🀄 Kıraathane Okeyi | Klasik (14 taş), 101 Okey (21 taş) ve eşli 101 modları; per açma, ıskarta, skor geçmişi, çay/kahve siparişi ve rakip sohbeti |
| 🎲 Şark Tavlası | Yapay zekâ rakibe karşı tavla; zar, pul toplama, hamle ipuçları ve laf atma |
| 🪨 Mangala | Köçürme/mangala tahtası; kolay–normal–zor seviyeler, hamle ipucu, kurallar ve sonuç ekranı |
| 🕰️ Türk Tarihi | 8 dönem ve 52 olayla kronolojik zaman tüneli |
| 🏹 Kemankeş Okçuluğu | Puta, hareketli hedef, menzil, uçan kuş avı ve fırtına talimleri |
| 🎨 Ebruzen Teknesi | Damla, serpme, biz, tarak ve gelgit araçlarıyla ebru; geri al ve PNG indirme |
| 🎵 Meşkhane | Kemençe, tambur, ud, kaval, zurna, davul ve def ile hazır repertuvar |
| 📜 Göktürkçe Çevirici | Latin harflerinden tamgaya, tamgadan yaklaşık Latin okumaya dönüşüm |
| 🗺️ Anadolu Atlası | Bölge künyeleri, rotalar, el sanatları, müzik ve festival bilgileri |
| 🏛️ Türk Hükümdarları | 139 hükümdar kartı; dönem notları ve üç–beş olaylı saltanat özetleri |
| 📖 Atasözleri | 244 atasözü/deyim, anlamları, kategori ve metin araması; Hikmet Avı oyunu |

---

## 2. Tasarım ve Kimlik

- **Gece teması (varsayılan):** koyu lacivert zemin, altın çerçeve, turkuaz ve kırmızı vurgular.
- **Saray Gündüzü:** açık mermer zemin ve varak altını paleti; sağ üstteki tema düğmesiyle değiştirilir ve tercih `localStorage`'da saklanır.
- **Arayüz katmanı:** `style.css` temel tasarım sistemini, `theme-refresh.css` ise "Saray Revakı" tazelemesini (çini esintili zemin, çift çerçeveli kartlar, parıltılı düğmeler, yumuşak sekme geçişleri) içerir.
- **Hareket:** arka planda Canvas ile çizilen Selçuklu yıldızı ve altın zerrecikler; `prefers-reduced-motion` tercihine saygı duyulur.
- **Erişilebilirlik:** klavye odağı, "İçeriğe geç" bağlantısı, okuma ilerlemesi, başa dön düğmesi, dar ekran düzeni ve azaltılmış hareket desteği.

---

## 3. Teknik Yapı

- Saf HTML, CSS ve JavaScript; framework yok.
- **Canvas 2D:** arka plan efektleri ve oyun tahtaları.
- **Web Audio API:** `audio.js` içindeki ses efektleri ve ambiyans.
- **localStorage:** tema tercihi, okey turnuva/maç durumu ve bazı oyun ayarları.
- **Google Fonts:** Cinzel, Marcellus, Plus Jakarta Sans ve Amiri.
- Veriler JavaScript dosyalarında sabit veri olarak tutulur; sunucu tarafı veya veritabanı yoktur.

### Dosya Haritası

```
index.html               → sayfa iskeleti, 11 bölüm, script sırası
style.css                → temel tasarım sistemi ve easter egg stilleri
theme-refresh.css        → saray revakı arayüz katmanı
app.js                   → sekmeler, mangala, tarih, atlas, hükümdarlar, atasözleri
game.js                  → OkeyGame ve TavlaGame motorları, bot sohbetleri
audio.js                 → ses efektleri ve ambiyans
banter-data.js           → okey/tavla/mangala sohbet replikleri
bot-names-data.js        → 200 isimlik bot havuzu ve rastgele seçici
history-data.js          → Türk tarihi zaman tüneli (8 dönem, 52 olay)
rulers-data.js           → temel hükümdar verisi
rulers-extra-data.js     → 56 ek hükümdar (ID 301–356)
rulers-period-data.js    → hükümdar dönem notları (1. dosya)
rulers-period-data-2.js  → hükümdar dönem notları (2. dosya)
wisdom-data.js           → 254 hikmet damlası
otag-extra-data.js       → atlas, atasözü ve ek içerik verileri
easter-eggs.js           → 27 easter egg motoru ve tetikleyiciler
EASTER-EGG.md            → ayrıntılı easter egg rehberi
```

---

## 4. İçerik Ölçekleri

| İçerik | Sayı |
|--------|------|
| Bölüm / sekme | 11 |
| Okey modu | 3 (klasik, 101, eşli 101) |
| Hükümdar | 139 (tamamında dönem notu) |
| Tarih olayı | 52 olay / 8 dönem |
| Atasözü ve deyim | 244 |
| Hikmet damlası | 254 |
| Bot ismi havuzu | 200 tekil isim |
| Easter egg | 27 |

---

## 5. Bilinen Sınırlar

- Uygulama tamamen istemci tarafındadır; skorlar ve tercihler yalnızca o tarayıcıda saklanır.
- Göktürkçe aracı tarihî dile anlamsal çeviri yapmaz; serbest metin sonuçları yaklaşık harf/ses aktarımıdır.
- Oyun botları kural tabanlı yapay zekâdır; çevrimiçi çok oyunculu mod yoktur.
- Ses ve pano gibi tarayıcı izinleri nedeniyle `file://` yerine yerel sunucu (`http://localhost`) tercih edilmelidir.

---

## 6. İlgili Belgeler

- `güncellemeler.md` — sürüm sürüm değişiklik kaydı
- `easteregg.md` — 27 easter egg'in listesi, tetikleyicileri ve çalışma mantığı
- `EASTER-EGG.md` — easter egg motorunun ayrıntılı geliştirici rehberi
- `README.md` — paket içeriği ve özellik özeti
