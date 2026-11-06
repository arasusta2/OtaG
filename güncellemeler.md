# OTAĞ — Güncellemeler

Bu dosya, OTAĞ portalında yapılan çalışmaların sürüm sürüm kaydıdır. En yeni sürüm en üsttedir.

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
- Okey, tavla ve mangala sohbetine `1283` yazıldığında botların **"Kalbimizde!"** demesi sağlandı.
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
