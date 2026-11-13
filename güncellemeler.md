# OTAĞ — Güncellemeler

Bu dosya, OTAĞ portalında yapılan çalışmaların sürüm sürüm kaydıdır. En yeni sürüm en üsttedir.

---

## v3.4 — Osmanlıca sözlük ve aydınlık tema bildirimi

**Yeni bölüm: 📜 Osmanlıca Sözlük**
- 693 kelime; Latin harfli okunuş (â, î, û uzun ünlüleri korunur), bugünkü Türkçe karşılık ve köken etiketi.
- Arapça, Farsça, Türkçe, Rumca, Ermenice, İtalyanca, Fransızca ve Slavca kökenlerini anlatan sekiz bilgi kartı ve sayaçlı köken filtresi.
- Türkçe karakter ve uzun ünlü duyarsız arama (vezir → vezîr, hukumet → hükûmet); temizle düğmesi, sonuç sayacı ve boş durum mesajı.
- Liste kendi içinde kaydırılıyor; mobilde kelime ve köken üstte, anlam altta.
- Sözlük, diğer ağır sekmeler gibi ilk açılışta değil, sekme ilk açıldığında yükleniyor; açılış süresi etkilenmiyor.

**Başlık kısayolları**
- Saatin hemen altına “📖 Günün sözü” ve “🕰️ Günün olayı” bağlantıları eklendi.
- Tıklanınca ilgili bölüm (Atasözleri / Türk Tarihi) açılıyor, günün kartına yumuşak kaydırılıyor ve altın hale ile kısa süre vurgulanıyor.

**Düzeltme**
- Saray (aydınlık) temasında bildirim metni beyaz yerine koyu lacivert (#121826) oldu; açık zemin ve altın çerçeveyle okunur kontrast sağlandı.

---

## v3.3 — Baştan aşağı görsel rafinasyon ve performans turu

**Performans**
- `PageLogo.png` 1698×926 / 1,39 MB iken 320×175 / ~12 KB'a indirildi (%99 küçülme); orijinal `PageLogo-source.png` olarak saklandı.
- Arka plan canvas'ı cihaz piksel oranına göre (en fazla 2×) çiziliyor; sekme arka plandayken animasyon duruyor, yeniden boyutlandırma tek karede birleştiriliyor.
- Hareket azaltma tercihinde canvas tek kare çizip duruyor; tema değişiminde yeniden çiziliyor.
- Logoya `width`/`height`, `decoding="async"` ve yüksek yükleme önceliği eklendi; yerleşim kayması (CLS) engellendi.
- Oyun sekmeleri (Tavla, Mangala, Kemankeş, Ebru) artık açılışta değil, ilk açıldıklarında başlatılıyor; açılışta gereksiz tahta ve canvas kurulumu yapılmıyor. İlk sekme olan Okey hemen kurulmaya devam ediyor.

**Görsel**
- Başlıkta yumuşak kırmızı-altın hale, dengeli tipografi ve ince altın alt çizgi.
- Bölüm başlıkları ve açıklamalarında dengeli satır kırma, okunabilir satır uzunluğu ve daha ferah başlık aralığı.
- Alt bilgide ❖ ayraçlı ince altın çizgi ve sadeleştirilmiş tipografi.
- Seçim rengi, klavye odak halkaları ve dokunma vurgusu tüm sitede tutarlı hale getirildi.
- Mobilde başlık halesi ve alt bilgi ölçüleri uyarlandı; azaltılmış hareket tercihinde logo parıltısı kapanıyor.

**Erişilebilirlik**
- Aktif bölüm düğmeleri `aria-current` ile işaretleniyor; sekme değişiminde eski işaret kaldırılıyor.
- Tüm etkileşimli öğelerde görünür altın odak halkası.

---

## v3.2 — Detay katmanı: tarih araması, günün olayı ve favoriler

**Türk Tarihi**
- Zaman tüneli **18 dönem ve 648 olaya** çıkarıldı; Ön Türklerden günümüze ve kültür-medeniyet başlıklarına uzanan yeni dönemler eklendi.
- Dönem düğmelerinde olay sayısı rozetleri; yıl, olay, kişi ve yer adlarında canlı arama ve eşleşme vurgusu.
- Arama sonucuna tıklayınca ilgili döneme atlama; “🎲 Rastgele olay” düğmesi ve hedef olayı vurgulayan animasyon.
- Tarihe göre değişen “📅 Günün olayı” kartı ve “Dönemine git” bağlantısı.

**Atasözleri**
- Tarihe göre seçilen “Günün sözü” şeridi.
- Tarayıcıda saklanan favoriler: yıldızla ekleme/çıkarma, favori sayacı ve “⭐ Favoriler” filtresi.

**Arayüz**
- Başlıkta Türkiye saatine göre canlı tarih ve saat şeridi.
- Alt bilgide tarih olayı, hükümdar, atasözü, hikmet ve easter egg sayılarını gösteren istatistik rozetleri.
- Yeni bileşenler için gece ve Saray Gündüzü temalarına uyumlu stiller, mobil düzen ve azaltılmış hareket desteği.

---

## v3.1 — Saray Revakı arayüzü ve 7 yeni easter egg

**Arayüz**
- `theme-refresh.css` eklendi; mevcut `style.css` değiştirilmeden üzerine binen yeni görsel katman oluşturuldu.
- Çini esintili çapraz altın tarama, köşe ışık halkaları ve altın kaydırma çubuğu.
- Başlıkta üst altın çizgi, geniş harf aralıklı OTAĞ yazısı ve altın alt başlık; logoya hover animasyonu.
- Navigasyon çerçeveli bir şeride dönüştü; aktif sekme varak altını dolgulu.
- Kartlara çift çerçeve, yumuşak köşe, hover'da yükselme ve altın hale; başlık altına altın vurgu çizgisi.
- Düğmelere geçişli varak parıltısı, sohbet kutularına altın odak halkası.
- Sekme geçişlerinde yumuşak yükselme animasyonu; `prefers-reduced-motion` desteği.
- Mobilde başlık, nav ve kart ölçüleri yeniden dengelendi; yatay taşma kontrol edildi.

**Easter egg**
- 7 yeni egg eklendi: `kahve`, `lokum`, `kilim`, `nevruz`, `yunus`, `nasreddin`, `kirkpinar`.
- Toplam egg sayısı **27** oldu.
- `EASTER-EGG.md` yeni tabloya göre güncellendi.

---

## v3.0 — 20 easter egg, sohbet tepkisi ve rastgele bot isimleri

**Easter egg**
- 10 yeni egg eklendi: `kalbimizde` (1283), `osmanli`, `gokturk`, `simit`, `nazar`, `kemankes`, `ebru`, `mesk`, `tavla`, `mangala`.
- Toplam **20** egg; Türkçe ve ASCII yazım varyantları birlikte desteklendi.

**Sohbet**
- Okey, tavla ve mangala sohbetine `1283` yazıldığında botların **"İçimizde!"** demesi sağlandı.
- Okeyde üç bot aynı anda, tavlada rakip ve seyirci, mangalada iki bot sırayla cevap veriyor.
- Cevabın hemen ardından araya giren kıraathane muhabbetinin balonları ezmemesi için 6–8 saniyelik sohbet molası eklendi.

**Bot isimleri**
- `bot-names-data.js` oluşturuldu: **200 tekil isim** ve `pickBotNames(count)` yardımcısı.
- Okey 3, tavla 3 (rakip + kahveci + seyirci), mangala 2 isim alıyor; sayfa yenilendikçe değişiyor, aynı masada tekrar etmiyor.
- Skor tablosu, oyuncu etiketleri, konuşma balonları ve mangala avatarı yeni isimlerle güncellendi.
- `banter-data.js` içindeki sabit adlar rol eşlemesiyle (`banterNameMap`) rastgele isimlere çevrildi.

---

## v2.3 — Hükümdar verisi ve dönem notları

- `rulers-extra-data.js` ile **56 gerçek hükümdar** eklendi (ID 301–356); her birinde 3–5 olaylı dönem özeti.
- `rulers-period-data.js` ve `rulers-period-data-2.js` ile mevcut hükümdarlara dönem notları eklendi.
- `app.js` içinde dönem verileri `window.TURKISH_RULER_PERIODS` altında birleştirildi.
- Doğrulama: **139/139 hükümdarda** dönem verisi var, eksik yok.

---

## v2.2 — Türk Tarihi zaman tüneli

- Kahve falı bölümü kaldırıldı.
- Yerine `history-data.js` ile **8 dönem ve 52 olay** içeren kronolojik zaman tüneli geldi.
- Dönem kartları, olay detayları ve zaman çizgisi arayüzü eklendi.

---

## v2.1 — Laf atma dengesi

- Okeyde laf atma: 7 saniye hareketsizlik sonrası, %82 olasılık.
- Tavlada laf atma: 8 saniye sonrası, %78 olasılık.
- Mangalada laf atma: 8 saniye sonrası, %80 olasılık.
- Kontrol aralıkları 10 saniyeye çekildi; botların oyuncuya laf atması tarayıcıda doğrulandı.

---

## v2.0 — İlk 10 easter egg

- `easter-eggs.js` motoru, `style.css` içindeki easter egg stili ve `EASTER-EGG.md` rehberi eklendi.
- İlk 10 egg: `fethi` (Konami), `fetihKodu` (1453), `atam` (atatürk), `kanuni` (kanuni), `mola` (60 saniye), `bozkurt`, `cay` (çay), `arma` (logoya 7 tık), `okey`, `zafer`.
- Escape, arka plana tıklama ve "Mekâna Dön" ile kapatma; metin kutularında tetiklenmeme; taşma kontrolü.

---

## v1.x — Portalın temel özellikleri

- Klasik, 101 ve eşli 101 okey modları; turnuva puanı, 1010 hedefi ve el geçmişi.
- Tavla ve mangala (kolay/normal/zor) oyunları; laf atma kutuları ve hazırcevap botlar.
- Kemankeş okçuluğu, ebru teknesi, meşkhane, Göktürkçe çevirici, Anadolu Atlası ve atasözleri bölümleri.
- 244 atasözü/deyim, 254 hikmet damlası ve Hikmet Avı oyunu.
- Cam etkili menü, Canvas arka planı, okuma ilerlemesi ve erişilebilirlik desteği.

---

## Doğrulama Notları

- Easter egg sayısı tarayıcıda `OTAG_EASTER_EGGS.ids.length` ile **27** olarak doğrulandı.
- Yedi yeni tetikleyici tek tek yazılarak kart başlıkları kontrol edildi.
- Masaüstü (1280×900) ve mobil (390×844) genişliklerde yatay taşma olmadığı ölçüldü.
- Açık tema paleti renk geçişi kapatılarak doğrulandı; konsol hatası görülmedi.

> Not: Bu kayıt, geliştirme oturumlarında yapılan değişikliklerin özetidir; her sürüm ayrı bir Git etiketi olarak işaretlenmemiştir.
