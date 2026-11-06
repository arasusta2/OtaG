// OTAĞ — EKSTRA TÜRK HÜKÜMDARLARI (1. BÖLÜM: ID 301–328)
// Her hükümdarın "Döneminde Neler Oldu?" verisi ayrıntılı olarak yazılmıştır.

window.TURKISH_RULERS_EXTRA = [
    // ─── AVRUPA HUNLARI ──────────────────────────────────────────────
    {
        id: 301, era: "hun", name: "Oktar Han", dates: "425 – 430", dynasty: "AVRUPA HUN İMPARATORLUĞU",
        icon: "🏹", sortYear: 425, quote: "“İki han bir orduyu paylaşmaz.”",
        bio: "Attila’nın amcası. Kardeşi Rua ile birlikte Hunları yönetti; Ren boyunca Burgundlara karşı sefer düzenledi ve 430’da bu seferde öldü.",
        achievements: ["Ren boyunda Burgund seferi", "Kardeşi Rua ile ortak yönetim", "Batı kanadının savunması"],
        tags: ["Ortak Yönetim", "Burgund Seferi", "Batı Kanadı"],
        period: [
            { year: "425", text: "Attila’nın babası Mundzuk’un ardından kardeşi Rua ile birlikte Hun tahtına ortak oldu." },
            { year: "427", text: "Tuna boyundaki Hun boylarını tek merkezde toplayarak batı kanadını güçlendirdi." },
            { year: "429", text: "Ren nehri boyunca ilerleyerek Burgund krallığına karşı büyük bir akın başlattı." },
            { year: "430", text: "Burgund seferi sırasında hayatını kaybetti; Hun yönetimi kardeşi Rua’ya kaldı." }
        ]
    },
    {
        id: 302, era: "hun", name: "Rua (Rugila) Han", dates: "430 – 434", dynasty: "AVRUPA HUN İMPARATORLUĞU",
        icon: "🐎", sortYear: 430, quote: "“Vergi istemeyen han, han değildir.”",
        bio: "Oktar’ın ölümünden sonra Hunları tek elde topladı. Doğu Roma’ya baskı kurarak vergiyi artırdı ve 434’te öldü; yerine Attila ile Bleda geçti.",
        achievements: ["Hun birliğini tek elde topladı", "Doğu Roma vergisini artırdı", "Attila ve Bleda’nın yolunu açtı"],
        tags: ["Hun Birliği", "Bizans Vergisi", "Merkezî Yönetim"],
        period: [
            { year: "430", text: "Kardeşi Oktar’ın ölümüyle Hunların tek hükümdarı oldu ve boylar arası birliği sağladı." },
            { year: "431", text: "Doğu Roma’ya elçi göndererek Hun askerlerinin ücretini ve sınır ticaretini yeniden düzenledi." },
            { year: "432", text: "Tuna sınırında Roma kalelerine baskı kurdu; Bizans’tan yıllık verginin artırılmasını istedi." },
            { year: "434", text: "Vergi 350 pound altına çıkarıldı; kısa süre sonra öldü ve taht Attila ile Bleda’ya kaldı." }
        ]
    },
    {
        id: 303, era: "hun", name: "Ellak Han", dates: "453 – 454", dynasty: "AVRUPA HUN İMPARATORLUĞU",
        icon: "⚔️", sortYear: 453, quote: "“Babamın gölgesi kılıcımdan uzundur.”",
        bio: "Attila’nın en büyük oğlu. Tuna boyu Hunlarının başına geçti; 454’te Nedao Savaşı’nda Gepidlere karşı savaşırken öldü.",
        achievements: ["Tuna boyu Hunlarının hükümdarı", "Nedao Savaşı’nda ordunun başında", "Hun birliğini koruma çabası"],
        tags: ["Attila’nın Oğlu", "Nedao", "Tuna Boyu"],
        period: [
            { year: "453", text: "Attila’nın ölümüyle Tuna boyundaki Hun ordusunun başına geçti." },
            { year: "453", text: "Kardeşleri Dengizik ve Ernak ile mirası paylaşarak üç ayrı Hun kanadı oluşturdu." },
            { year: "454", text: "Gepid, Ostrogot ve Herul kuvvetlerine karşı Nedao Savaşı’na girdi." },
            { year: "454", text: "Savaşta öldü; Avrupa Hun İmparatorluğu’nun dağılma süreci hızlandı." }
        ]
    },
    {
        id: 304, era: "hun", name: "Dengizik Han", dates: "453 – 469", dynasty: "AVRUPA HUN İMPARATORLUĞU",
        icon: "🛡️", sortYear: 453, quote: "“Bozkırda düşen at, yolunu kaybetmez.”",
        bio: "Attila’nın oğlu. Karadeniz kuzeyindeki Hunları yönetti; Ostrogotlara karşı mücadele etti ve 469’da Trakya’da öldü.",
        achievements: ["Karadeniz Hunlarını yönetti", "Ostrogotlara karşı direniş", "Trakya’ya kadar akınlar"],
        tags: ["Karadeniz Hunları", "Ostrogot Mücadelesi", "Trakya Akınları"],
        period: [
            { year: "453", text: "Attila’nın mirasından Karadeniz kuzeyi ve Dobruca bölgesini aldı." },
            { year: "460", text: "Ostrogotların Tuna boyunda güçlenmesine karşı Hun boylarını yeniden bir araya getirdi." },
            { year: "466", text: "Bizans topraklarına akınlar düzenleyerek Trakya’da baskı oluşturdu." },
            { year: "469", text: "Trakya seferi sırasında öldü; Hun gücü Balkanlar’da etkisini yitirdi." }
        ]
    },

    // ─── GÖKTÜRK KAĞANLIĞI ──────────────────────────────────────────────
    {
        id: 305, era: "gokturk", name: "Tardu Yabgu", dates: "576 – 603", dynasty: "BATI GÖKTÜRK KAĞANLIĞI",
        icon: "🌙", sortYear: 576, quote: "“İpek yolu, kılıçla açılır; akılla korunur.”",
        bio: "Batı Göktürk Kağanlığı’nın en güçlü yabgusu. Sogdiana ve Horasan’a seferler düzenledi, Sasani ve Bizans arasında denge siyaseti yürüttü.",
        achievements: ["Sogdiana ve Horasan seferleri", "Sasani-Bizans dengesi", "Batı Göktürk gücünün zirvesi"],
        tags: ["Yabgu", "İpek Yolu", "Horasan"],
        period: [
            { year: "576", text: "İstemi Yabgu’nun ölümüyle Batı Göktürk tahtına geçti." },
            { year: "585", text: "Sogd tüccarlarını koruyarak İpek Yolu ticaretini Göktürk denetimine aldı." },
            { year: "598", text: "Sasani sınırına sefer düzenledi; Horasan’da Göktürk etkisini genişletti." },
            { year: "603", text: "İç isyanlar ve boy mücadeleleri sonucu gücünü kaybetti; kısa süre sonra öldü." }
        ]
    },
    {
        id: 306, era: "gokturk", name: "Taspar Kağan", dates: "572 – 581", dynasty: "DOĞU GÖKTÜRK KAĞANLIĞI",
        icon: "📜", sortYear: 572, quote: "“Bilge han, kılıcı kınında da taşır.”",
        bio: "Doğu Göktürk kağanı. Budizm’i destekledi, Nirvana Sutra’nın Türkçeye çevrilmesini sağladı ve Çin ile barış siyaseti izledi.",
        achievements: ["Budizm’i destekledi", "Nirvana Sutra’nın Türkçe çevirisi", "Çin ile barış siyaseti"],
        tags: ["Budizm", "Sutra Çevirisi", "Barış Siyaseti"],
        period: [
            { year: "572", text: "Mukan Kağan’ın ölümüyle Doğu Göktürk tahtına çıktı." },
            { year: "575", text: "Budist rahipleri saraya kabul ederek ilk Göktürk manastırının kurulmasına izin verdi." },
            { year: "578", text: "Nirvana Sutra’nın Türkçeye çevrilmesini emretti; bozkırda yazılı kültürü güçlendirdi." },
            { year: "581", text: "Öldü; yerine geçen kağanlar döneminde devlet Çin baskısı altına girdi." }
        ]
    },
    {
        id: 307, era: "gokturk", name: "İşbara Kağan", dates: "581 – 587", dynasty: "DOĞU GÖKTÜRK KAĞANLIĞI",
        icon: "🏹", sortYear: 581, quote: "“Boyun eğmek, atı eyerlemek gibidir; bir kez olursa alışkanlık olur.”",
        bio: "Taspar’ın ardından tahta çıktı. Sui Hanedanı ile mücadele etti; ağır yenilgiler sonrası Çin’e bağlılık antlaşması imzalamak zorunda kaldı.",
        achievements: ["Sui Hanedanı ile mücadele", "Göktürk boylarını koruma", "Çin ile bağlılık antlaşması"],
        tags: ["Sui Mücadelesi", "Boy Birliği", "Antlaşma"],
        period: [
            { year: "581", text: "Taspar’ın ölümüyle tahta çıktı; Çin’de Sui Hanedanı’nın kurulmasıyla dengeler değişti." },
            { year: "583", text: "Sui ordularının kuzey seferlerine karşı Göktürk boylarını savundu." },
            { year: "585", text: "Ağır kayıplar sonrası Çin’e bağlılık antlaşması imzaladı ve vergi ödemeyi kabul etti." },
            { year: "587", text: "Taht mücadeleleri içinde öldü; Doğu Göktürkler bir süre Çin etkisinde kaldı." }
        ]
    },
    {
        id: 308, era: "gokturk", name: "Tong Yabgu Kağan", dates: "618 – 630", dynasty: "BATI GÖKTÜRK KAĞANLIĞI",
        icon: "🦅", sortYear: 618, quote: "“Bozkırın sınırı, atın gittiği yerdir.”",
        bio: "Batı Göktürklerin en parlak döneminin hükümdarı. Sasani ve Bizans ile ittifak kurdu, Kafkasya’ya indi; 630’da iç isyanla öldürüldü.",
        achievements: ["Kafkasya seferleri", "Bizans ile ittifak", "Batı Göktürk zirvesi"],
        tags: ["Kafkasya", "Bizans İttifakı", "Zirve Dönemi"],
        period: [
            { year: "618", text: "Batı Göktürk tahtına geçti; Maveraünnehir ve Kafkasya’ya yöneldi." },
            { year: "626", text: "Bizans ile ittifak kurarak Sasanilere karşı ortak sefer hazırlığı yaptı." },
            { year: "627", text: "Kafkasya’ya girerek Tiflis’i kuşattı; bölgede Göktürk egemenliğini kurdu." },
            { year: "630", text: "Boy isyanı sonucu öldürüldü; Batı Göktürk Kağanlığı dağılma sürecine girdi." }
        ]
    },
    {
        id: 309, era: "gokturk", name: "Bağa Kağan", dates: "587 – 589", dynasty: "DOĞU GÖKTÜRK KAĞANLIĞI",
        icon: "🐺", sortYear: 587, quote: "“Dağılan boy, toplanınca yeniden ordu olur.”",
        bio: "İşbara’nın kardeşi. Kısa saltanatında Çin esaretinden kaçan Türk boylarını topladı; 589’da öldü.",
        achievements: ["Dağılan boyları topladı", "Çin esaretinden dönüşleri düzenledi", "Kısa ama toparlayıcı saltanat"],
        tags: ["Boy Toplama", "Esaret Dönüşü", "Toparlanma"],
        period: [
            { year: "587", text: "İşbara’nın ardından Doğu Göktürk tahtına çıktı." },
            { year: "588", text: "Çin’e giden Türk boylarının bir kısmını geri getirerek orduyu yeniden düzenledi." },
            { year: "589", text: "Kısa saltanatının sonunda öldü; devlet yeniden taht kavgalarına sürüklendi." }
        ]
    },

    // ─── UYGUR KAĞANLIĞI ──────────────────────────────────────────────
    {
        id: 310, era: "uygur", name: "Ay Tengride Kut Bulmış Bilge Kağan", dates: "779 – 789", dynasty: "UYGUR KAĞANLIĞI",
        icon: "☀️", sortYear: 779, quote: "“Gökten kut, yerden bereket; ikisi de emekle gelir.”",
        bio: "Uygur Kağanlığı’nın güçlü hükümdarı. Maniheizm’i devlet dini olarak destekledi ve Tang Hanedanı ile ittifakı sürdürdü.",
        achievements: ["Maniheizm’i devlet dini yaptı", "Tang ile ittifak", "Uygur kültürünün altın çağı"],
        tags: ["Maniheizm", "Tang İttifakı", "Kültür"],
        period: [
            { year: "779", text: "Bögü Kağan’ın ardından Uygur tahtına çıktı." },
            { year: "780", text: "Maniheist tapınakların sayısını artırdı; din adamlarına vergi muafiyeti tanıdı." },
            { year: "783", text: "Tang Hanedanı ile askerî ittifakı yeniledi; İpek Yolu ticaretini güvence altına aldı." },
            { year: "789", text: "Öldü; yerine oğlu Küçlüg Bilge geçti." }
        ]
    },
    {
        id: 311, era: "uygur", name: "Küçlüg Bilge Kağan", dates: "789 – 790", dynasty: "UYGUR KAĞANLIĞI",
        icon: "🏕️", sortYear: 789, quote: "“Taht, sabır ister; sabır da zaman.”",
        bio: "Ay Tengride’nin oğlu. Kısa saltanatında Maniheist kurumları korudu; 790’da tahttan indirildi.",
        achievements: ["Maniheist kurumları korudu", "Saray düzenini sürdürdü", "Kısa saltanat"],
        tags: ["Maniheizm", "Saray Düzeni", "Kısa Saltanat"],
        period: [
            { year: "789", text: "Babasının ardından Uygur tahtına çıktı." },
            { year: "790", text: "Saray içi muhalefet ve boy baskısı sonucu tahttan indirildi." }
        ]
    },
    {
        id: 312, era: "uygur", name: "Külüg Bilge Kağan", dates: "790 – 795", dynasty: "UYGUR KAĞANLIĞI",
        icon: "📜", sortYear: 790, quote: "“Yazı bilen boy, yolunu şaşırmaz.”",
        bio: "Uygur tahtında kısa süre kaldı. Maniheist rahiplerin etkisini dengelemeye çalıştı; 795’te öldü.",
        achievements: ["Maniheist etkiyi dengeledi", "Boylar arası uzlaşı", "Yazılı kültürün korunması"],
        tags: ["Denge Siyaseti", "Boy Uzlaşısı", "Yazılı Kültür"],
        period: [
            { year: "790", text: "Küçlüg Bilge’nin ardından Uygur tahtına çıktı." },
            { year: "793", text: "Maniheist rahiplerin siyasi etkisini sınırlayan düzenlemeler yaptı." },
            { year: "795", text: "Öldü; Uygur Kağanlığı’nda yeni bir hanedan dönemi başladı." }
        ]
    },

    // ─── KARAHANLILAR ──────────────────────────────────────────────
    {
        id: 313, era: "karahanli", name: "Bilge Kül Kadir Han", dates: "840 – 893", dynasty: "KARAHANLILAR",
        icon: "🏰", sortYear: 840, quote: "“Devlet, bir çadırda kurulur; bir töreyle yaşar.”",
        bio: "Karahanlı Devleti’nin kurucusu. Kaşgar ve Balasagun’u merkez yaptı; Türk boylarını tek çatı altında topladı.",
        achievements: ["Karahanlı Devleti’ni kurdu", "Kaşgar ve Balasagun merkezleri", "Türk boylarını birleştirdi"],
        tags: ["Kurucu", "Kaşgar", "Boy Birliği"],
        period: [
            { year: "840", text: "Karluk, Yağma ve Çiğil boylarını birleştirerek Karahanlı Devleti’ni kurdu." },
            { year: "860", text: "Balasagun’u başkent yaparak Maveraünnehir ticaret yollarını denetim altına aldı." },
            { year: "880", text: "Kaşgar’ı ikinci merkez hâline getirdi; Türk-İslam kültürünün temelini attı." },
            { year: "893", text: "Öldü; yerine oğlu Oğulçak Kadir Han geçti." }
        ]
    },
    {
        id: 314, era: "karahanli", name: "Oğulçak Kadir Han", dates: "893 – 910", dynasty: "KARAHANLILAR",
        icon: "⚖️", sortYear: 893, quote: "“Töre olmayan yerde taht da durmaz.”",
        bio: "Bilge Kül’ün oğlu. Kaşgar merkezli yönetimi sürdürdü; İslam ile Türk töresini bir arada tutmaya çalıştı.",
        achievements: ["Kaşgar merkezli yönetim", "Töre ve İslam dengesi", "Ticaret yollarının korunması"],
        tags: ["Kaşgar", "Töre", "Ticaret"],
        period: [
            { year: "893", text: "Babasının ardından Karahanlı tahtına çıktı." },
            { year: "900", text: "Kaşgar’da töre mahkemeleri ile İslam kadılarını bir arada çalıştıran düzen kurdu." },
            { year: "910", text: "Öldü; Karahanlı toprakları doğu ve batı kanatlarına ayrıldı." }
        ]
    },
    {
        id: 315, era: "karahanli", name: "Ali Arslan Han", dates: "970 – 998", dynasty: "KARAHANLILAR",
        icon: "⚔️", sortYear: 970, quote: "“Buhara’nın kapısı, bozkırın anahtarıdır.”",
        bio: "Karahanlı hükümdarı. 992’de Buhara’yı aldı; Maveraünnehir’de Samanoğulları ile uzun süre mücadele etti.",
        achievements: ["Buhara’yı fethetti", "Samanoğulları ile mücadele", "Maveraünnehir egemenliği"],
        tags: ["Buhara", "Samanoğulları", "Maveraünnehir"],
        period: [
            { year: "970", text: "Karahanlı tahtına çıktı; Maveraünnehir’e yönelik seferlere başladı." },
            { year: "992", text: "Buhara’yı ele geçirerek Samanoğulları’nın merkezine girdi." },
            { year: "996", text: "Horasan sınırlarında Samanoğulları ile yeni bir sefer düzenledi." },
            { year: "998", text: "Öldü; Karahanlılar Maveraünnehir’in en güçlü devleti hâline geldi." }
        ]
    },
    {
        id: 316, era: "karahanli", name: "Ahmed Togan Han", dates: "998 – 1017", dynasty: "KARAHANLILAR",
        icon: "📚", sortYear: 998, quote: "“İlim, kılıcın kınıdır; onu korur.”",
        bio: "Karahanlıları yeniden birleştirdi. Kaşgar’da ilim meclisleri kurdu; İslami kurumları güçlendirdi.",
        achievements: ["Karahanlıları birleştirdi", "Kaşgar ilim meclisleri", "İslami kurumların güçlendirilmesi"],
        tags: ["Birleşme", "İlim Meclisi", "Kaşgar"],
        period: [
            { year: "998", text: "Bölünen Karahanlı topraklarını yeniden tek yönetim altında topladı." },
            { year: "1006", text: "Hotan’a sefer düzenleyerek güney ticaret yollarını denetim altına aldı." },
            { year: "1010", text: "Kaşgar’da medrese ve ilim meclisleri kurdu; âlimleri saraya davet etti." },
            { year: "1017", text: "Öldü; Karahanlı Devleti bir süre daha güçlü kaldı." }
        ]
    },
    {
        id: 317, era: "karahanli", name: "İbrahim Tamgaç Buğra Han", dates: "1041 – 1068", dynasty: "BATI KARAHANLILAR",
        icon: "🕌", sortYear: 1041, quote: "“Şehir, camisiyle kurulur; medresesiyle büyür.”",
        bio: "Batı Karahanlı hükümdarı. Meliküşşark ve’s-Sin unvanını aldı; Buhara’da büyük cami ve medrese yaptırdı.",
        achievements: ["Meliküşşark ve’s-Sin unvanı", "Buhara’da büyük cami", "Medrese ve imar faaliyetleri"],
        tags: ["Unvan", "Buhara", "İmar"],
        period: [
            { year: "1041", text: "Batı Karahanlı tahtına çıktı; Maveraünnehir’de düzeni sağladı." },
            { year: "1043", text: "Meliküşşark ve’s-Sin unvanını alarak doğu ve batı Karahanlıları üzerinde üstünlük kurdu." },
            { year: "1050", text: "Buhara’da büyük bir cami ve medrese yaptırdı; şehri yeniden imar etti." },
            { year: "1068", text: "Öldü; geride güçlü bir imar mirası bıraktı." }
        ]
    },

    // ─── GAZNELİLER ──────────────────────────────────────────────
    {
        id: 318, era: "gazneli", name: "İsmail bin Sebüktegin", dates: "997 – 998", dynasty: "GAZNELİLER",
        icon: "💎", sortYear: 997, quote: "“Taht, kardeşten önce sabır ister.”",
        bio: "Sebük Tegin’in oğlu. Kısa saltanatında Gazne’yi korudu; kardeşi Mahmud tarafından tahttan indirildi.",
        achievements: ["Gazne’yi korudu", "Kısa saltanat", "Gazneli taht mücadelesi"],
        tags: ["Gazne", "Taht Mücadelesi", "Kısa Saltanat"],
        period: [
            { year: "997", text: "Babası Sebük Tegin’in ölümüyle Gazneli tahtına çıktı." },
            { year: "998", text: "Kardeşi Mahmud ile giriştiği taht mücadelesini kaybetti ve tahttan indirildi." }
        ]
    },
    {
        id: 319, era: "gazneli", name: "Mevdud", dates: "1041 – 1050", dynasty: "GAZNELİLER",
        icon: "🏹", sortYear: 1041, quote: "“Horasan’da at koşturan, sözünü de koşturur.”",
        bio: "Gazneli sultanı. Selçuklulara karşı seferler düzenledi; 1042’de onları yendi ve Horasan’da denge kurdu.",
        achievements: ["Selçuklulara karşı seferler", "Horasan’da denge", "Gazneli ordusunun güçlendirilmesi"],
        tags: ["Selçuklu Seferi", "Horasan", "Ordu"],
        period: [
            { year: "1041", text: "Gazneli tahtına çıktı; Selçuklu ilerleyişine karşı doğu sınırlarını güçlendirdi." },
            { year: "1042", text: "Selçuklu kuvvetlerine karşı kazandığı zaferle Horasan’da Gazneli etkisini korudu." },
            { year: "1044", text: "Hindistan’a sefer düzenleyerek ganimet ve vergi düzenini yeniledi." },
            { year: "1050", text: "Öldü; yerine geçen sultanlar döneminde Gazneli gücü zayıfladı." }
        ]
    },
    {
        id: 320, era: "gazneli", name: "İbrahim bin Mesud", dates: "1059 – 1099", dynasty: "GAZNELİLER",
        icon: "📜", sortYear: 1059, quote: "“Barış, en uzun seferdir.”",
        bio: "Gaznelilerin en uzun saltanatlarından birini yaptı. İç barışa önem verdi; sarayda edebiyat ve ilmi destekledi.",
        achievements: ["Uzun ve barışçıl saltanat", "Edebiyat ve ilim desteği", "İç barışın sağlanması"],
        tags: ["Barış", "Edebiyat", "Uzun Saltanat"],
        period: [
            { year: "1059", text: "Gazneli tahtına çıktı; iç karışıklıkları bastırarak merkezî otoriteyi kurdu." },
            { year: "1070", text: "Vergi ve adalet düzenlemeleriyle halkın desteğini kazandı." },
            { year: "1080", text: "Sarayda edebiyat meclisleri kurdu; şair ve âlimleri himaye etti." },
            { year: "1099", text: "Uzun saltanatının ardından öldü; Gazneliler son parlak dönemini yaşadı." }
        ]
    },

    // ─── BÜYÜK SELÇUKLULAR ──────────────────────────────────────────────
    {
        id: 321, era: "selcuklu", name: "Mahmud bin Melikşah", dates: "1092 – 1094", dynasty: "BÜYÜK SELÇUKLU",
        icon: "👑", sortYear: 1092, quote: "“Taht kavgası, devletin en pahalı savaşıdır.”",
        bio: "Melikşah’ın oğlu. Taht kavgaları içinde kısa süre hüküm sürdü; 1094’te çiçek hastalığından öldü.",
        achievements: ["Selçuklu tahtına çıktı", "Taht kavgalarıyla mücadele", "Kısa saltanat"],
        tags: ["Taht Kavgası", "Kısa Saltanat", "Melikşah’ın Oğlu"],
        period: [
            { year: "1092", text: "Melikşah’ın ölümüyle Büyük Selçuklu tahtına çıktı." },
            { year: "1093", text: "Kardeşleri ve amcalarıyla taht mücadelesine girdi; devlet iç savaşa sürüklendi." },
            { year: "1094", text: "Çiçek hastalığından öldü; Selçuklu tahtı yeniden boş kaldı." }
        ]
    },
    {
        id: 322, era: "selcuklu", name: "Mesud bin Melikşah", dates: "1134 – 1152", dynasty: "BÜYÜK SELÇUKLU",
        icon: "🦅", sortYear: 1134, quote: "“Irak’ta düzen, hilafetin gölgesinde kurulur.”",
        bio: "Büyük Selçuklu sultanı. Irak ve Batı İran’da otoriteyi yeniden kurdu; Abbasi halifeliğiyle ilişkileri düzenledi.",
        achievements: ["Irak ve Batı İran’da otorite", "Halifelikle ilişkiler", "Selçuklu toparlanması"],
        tags: ["Irak", "Halifelik", "Toparlanma"],
        period: [
            { year: "1134", text: "Büyük Selçuklu tahtına çıktı; dağılan eyaletleri yeniden merkeze bağlamaya çalıştı." },
            { year: "1140", text: "Abbasi halifesiyle anlaşarak Irak’ta Selçuklu otoritesini pekiştirdi." },
            { year: "1148", text: "Musul ve Cezire’ye sefer düzenleyerek yerel beylikleri denetim altına aldı." },
            { year: "1152", text: "Öldü; Büyük Selçuklu Devleti dağılma sürecine girdi." }
        ]
    },
    {
        id: 323, era: "selcuklu", name: "II. Tuğrul", dates: "1194", dynasty: "BÜYÜK SELÇUKLU",
        icon: "🕯️", sortYear: 1194, quote: "“Son kıvılcım da ateşin adını taşır.”",
        bio: "Büyük Selçuklu Devleti’nin son sultanı. Kısa saltanatında Harzemşahlara karşı direndi; 1194’te Rey yakınlarında öldü.",
        achievements: ["Son Büyük Selçuklu sultanı", "Harzemşahlara karşı direniş", "Rey savunması"],
        tags: ["Son Sultan", "Harzemşahlar", "Rey"],
        period: [
            { year: "1194", text: "Büyük Selçuklu tahtına çıktı; devlet artık Irak ve İran’la sınırlıydı." },
            { year: "1194", text: "Harzemşah Tekiş’e karşı Rey yakınlarında savaştı ve hayatını kaybetti." },
            { year: "1194", text: "Ölümüyle Büyük Selçuklu Devleti tarih sahnesinden çekildi." }
        ]
    },

    // ─── ANADOLU BEYLİKLERİ ──────────────────────────────────────────────
    {
        id: 324, era: "beylikler", name: "Karesi Bey", dates: "1300 – 1328", dynasty: "KARESİOĞULLARI",
        icon: "⚓", sortYear: 1300, quote: "“Deniz, atın gidemediği yerde yol olur.”",
        bio: "Karesioğulları Beyliği’nin kurucusu. Balıkesir ve Çanakkale çevresinde donanma kurdu; Rumeli’ye ilk Türk akınlarını başlattı.",
        achievements: ["Karesioğulları’nı kurdu", "İlk Türk donanması", "Rumeli’ye ilk akınlar"],
        tags: ["Kurucu", "Donanma", "Rumeli Akınları"],
        period: [
            { year: "1300", text: "Balıkesir merkezli Karesioğulları Beyliği’ni kurdu." },
            { year: "1310", text: "Çanakkale ve Marmara kıyılarında donanma oluşturdu." },
            { year: "1320", text: "Rumeli’ye ilk Türk akınlarını düzenleyerek beylikler arasında öne çıktı." },
            { year: "1328", text: "Öldü; beyliği kısa süre sonra Osmanlı topraklarına katıldı." }
        ]
    },
    {
        id: 325, era: "beylikler", name: "Saruhan Bey", dates: "1313 – 1346", dynasty: "SARUHANOĞULLARI",
        icon: "🏛️", sortYear: 1313, quote: "“Manisa’yı tutan, Ege’yi dinler.”",
        bio: "Saruhanoğulları Beyliği’nin kurucusu. Manisa’yı alarak beyliğin merkezi yaptı; Ege’de deniz ticaretini geliştirdi.",
        achievements: ["Saruhanoğulları’nı kurdu", "Manisa’yı merkez yaptı", "Ege deniz ticaretini geliştirdi"],
        tags: ["Kurucu", "Manisa", "Deniz Ticareti"],
        period: [
            { year: "1313", text: "Manisa ve çevresinde Saruhanoğulları Beyliği’ni kurdu." },
            { year: "1315", text: "Manisa’yı beyliğin merkezi yaparak imar faaliyetlerine başladı." },
            { year: "1330", text: "Ege kıyılarında deniz ticaretini geliştirdi; limanları beyliğe bağladı." },
            { year: "1346", text: "Öldü; beyliği Osmanlı’nın Rumeli fetihlerine üs oldu." }
        ]
    },
    {
        id: 326, era: "beylikler", name: "Aydınoğlu Umur Bey", dates: "1334 – 1348", dynasty: "AYDINOĞULLARI",
        icon: "🚢", sortYear: 1334, quote: "“Ege’de söz, güvertede söylenir.”",
        bio: "Aydınoğulları’nın en ünlü beyi. İzmir’i üs yaparak güçlü bir donanma kurdu; Bizans ve Venedik ile mücadele etti.",
        achievements: ["İzmir merkezli güçlü donanma", "Ege seferleri", "Bizans ve Venedik ile mücadele"],
        tags: ["İzmir", "Donanma", "Ege Seferleri"],
        period: [
            { year: "1334", text: "Aydınoğulları’nın başına geçti; İzmir’i deniz üssü yaptı." },
            { year: "1335", text: "İzmir limanını donanma merkezi hâline getirerek Ege ticaretini denetledi." },
            { year: "1340", text: "Ege adalarına ve Yunan kıyılarına seferler düzenledi." },
            { year: "1344", text: "Haçlı donanmasının İzmir saldırısına karşı şehri savundu." },
            { year: "1348", text: "İzmir’i geri almak için giriştiği seferde öldü." }
        ]
    },
    {
        id: 327, era: "beylikler", name: "Menteşeoğlu Menteşe Bey", dates: "1261 – 1290", dynasty: "MENTEŞEOĞULLARI",
        icon: "🌊", sortYear: 1261, quote: "“Kıyıyı tutan bey, iki denize hükmeder.”",
        bio: "Menteşeoğulları Beyliği’nin kurucusu. Muğla, Milas ve Bodrum çevresini Türk yönetimine kattı.",
        achievements: ["Menteşeoğulları’nı kurdu", "Muğla ve Milas’ın fethi", "Kıyı kalelerinin düzenlenmesi"],
        tags: ["Kurucu", "Muğla", "Kıyı Kaleleri"],
        period: [
            { year: "1261", text: "Muğla çevresinde Menteşeoğulları Beyliği’ni kurdu." },
            { year: "1270", text: "Milas ve çevresini alarak beyliğin sınırlarını genişletti." },
            { year: "1280", text: "Bodrum ve kıyı kalelerini düzenleyerek deniz güvenliğini sağladı." },
            { year: "1290", text: "Öldü; beyliği Ege’nin önemli denizci beyliklerinden biri oldu." }
        ]
    },
    {
        id: 328, era: "beylikler", name: "Germiyanoğlu Yakub Bey", dates: "1300 – 1340", dynasty: "GERMİYANOĞULLARI",
        icon: "🎨", sortYear: 1300, quote: "“Saray, şairi ağırlarsa taşları da konuşur.”",
        bio: "Germiyanoğulları beyi. Kütahya’yı kültür merkezi yaptı; sarayında şair ve âlimleri ağırladı.",
        achievements: ["Kütahya’yı kültür merkezi yaptı", "Şair ve âlimlerin himayesi", "Germiyan imar faaliyetleri"],
        tags: ["Kütahya", "Kültür", "Himaye"],
        period: [
            { year: "1300", text: "Kütahya merkezli Germiyanoğulları Beyliği’nin başına geçti." },
            { year: "1310", text: "Kütahya’da saray ve medrese yaptırarak şehri kültür merkezine dönüştürdü." },
            { year: "1320", text: "Şair ve âlimleri himaye ederek Germiyan edebiyat çevresini oluşturdu." },
            { year: "1340", text: "Öldü; beyliği Osmanlı ile akrabalık ilişkileri kurdu." }
        ]
    }
,
    // ─── ANADOLU BEYLİKLERİ (devam) ──────────────────────────────────────
    {
        id: 329, era: "beylikler", name: "Candaroğlu İsfendiyar Bey", dates: "1385 – 1440", dynasty: "CANDAROĞULLARI",
        icon: "🏰", sortYear: 1385, quote: "“İki büyük dağ arasında yol, sabırla açılır.”",
        bio: "Candaroğulları beyi. Kastamonu ve Sinop’u yönetti; Osmanlı ile Timur arasında denge siyaseti izledi.",
        achievements: ["Kastamonu ve Sinop yönetimi", "Osmanlı-Timur dengesi", "Karadeniz ticaretinin korunması"],
        tags: ["Kastamonu", "Sinop", "Denge Siyaseti"],
        period: [
            { year: "1385", text: "Candaroğulları beyliğinin başına geçti; Kastamonu’yu merkez yaptı." },
            { year: "1402", text: "Ankara Savaşı sonrası Timur’un Anadolu’dan çekilmesiyle topraklarını genişletti." },
            { year: "1420", text: "Sinop limanını Karadeniz ticaretinin önemli merkezlerinden biri hâline getirdi." },
            { year: "1440", text: "Öldü; beyliği kısa süre sonra Osmanlı topraklarına katıldı." }
        ]
    },
    {
        id: 330, era: "beylikler", name: "Karamanoğlu Alaeddin Ali Bey", dates: "1361 – 1398", dynasty: "KARAMANOĞULLARI",
        icon: "⚔️", sortYear: 1361, quote: "“Konya, Türk’ün eski başkentidir; unutulmaz.”",
        bio: "Karamanoğulları’nın güçlü beyi. Konya’yı ele geçirdi; Osmanlı ile uzun süre mücadele etti.",
        achievements: ["Konya’yı ele geçirdi", "Osmanlı ile mücadele", "Karamanoğlu gücünün zirvesi"],
        tags: ["Konya", "Osmanlı Mücadelesi", "Beylik Gücü"],
        period: [
            { year: "1361", text: "Karamanoğulları’nın başına geçti; Konya üzerinde hak iddia etti." },
            { year: "1367", text: "Konya’yı ele geçirerek Karamanoğlu topraklarını genişletti." },
            { year: "1386", text: "Osmanlı’ya karşı beylikler ittifakı kurmaya çalıştı." },
            { year: "1398", text: "Osmanlı seferi sırasında öldü; beyliği bir süre Osmanlı’ya bağlandı." }
        ]
    },
    {
        id: 331, era: "beylikler", name: "Dulkadiroğlu Alaüddevle Bozkurt Bey", dates: "1479 – 1515", dynasty: "DULKADİROĞULLARI",
        icon: "🛡️", sortYear: 1479, quote: "“Maraş’ta denge, üç büyük gücün gölgesinde kurulur.”",
        bio: "Dulkadir Beyliği’nin son büyük beyi. Maraş merkezli yönetimiyle Osmanlı, Safevi ve Memlük dengesinde rol oynadı.",
        achievements: ["Maraş merkezli güçlü yönetim", "Üç devlet arasında denge", "Dulkadir Beyliği’nin son parlak dönemi"],
        tags: ["Maraş", "Denge", "Son Bey"],
        period: [
            { year: "1479", text: "Dulkadiroğulları’nın başına geçti; Maraş’ı merkez yaptı." },
            { year: "1490", text: "Memlüklerle ilişkileri düzenleyerek beyliğin güney sınırlarını güvence altına aldı." },
            { year: "1500", text: "Safevi ilerleyişine karşı Doğu Anadolu’da denge siyaseti izledi." },
            { year: "1515", text: "Turnadağ Savaşı’nda Osmanlı’ya yenildi ve öldürüldü; beyliği Osmanlı’ya katıldı." }
        ]
    },
    {
        id: 332, era: "beylikler", name: "Akkoyunlu Uzun Hasan", dates: "1453 – 1478", dynasty: "AKKOYUNLULAR",
        icon: "🦅", sortYear: 1453, quote: "“Diyarbakır’dan Tebriz’e bir devlet kurulur.”",
        bio: "Akkoyunlu Devleti’nin en güçlü hükümdarı. Diyarbakır’dan Tebriz’e uzanan geniş bir devlet kurdu; 1473 Otlukbeli’de Osmanlı’ya yenildi.",
        achievements: ["Geniş Akkoyunlu Devleti", "Tebriz’in başkent yapılması", "Doğu Anadolu ve İran’da egemenlik"],
        tags: ["Akkoyunlu", "Tebriz", "Otlukbeli"],
        period: [
            { year: "1453", text: "Akkoyunlu tahtına çıktı; Diyarbakır merkezli gücünü pekiştirdi." },
            { year: "1467", text: "Karakoyunlu Devleti’ni yıkarak Doğu Anadolu ve Azerbaycan’a hâkim oldu." },
            { year: "1468", text: "Tebriz’i başkent yaptı; İran içlerine kadar uzanan bir devlet kurdu." },
            { year: "1473", text: "Otlukbeli Savaşı’nda Fatih’in ordusuna yenildi; Akkoyunlu gücü sarsıldı." },
            { year: "1478", text: "Öldü; yerine geçen hükümdarlar döneminde devlet dağıldı." }
        ]
    },
    {
        id: 333, era: "beylikler", name: "Karakoyunlu Cihan Şah", dates: "1438 – 1467", dynasty: "KARAKOYUNLULAR",
        icon: "📖", sortYear: 1438, quote: "“Şiir de kılıç gibi keser; ama iz bırakır.”",
        bio: "Karakoyunlu hükümdarı. Tebriz’i merkez yaptı; şair ve edebiyatçı kimliğiyle tanındı. 1467’de Akkoyunlulara yenildi.",
        achievements: ["Tebriz’i merkez yaptı", "Edebiyatçı hükümdar kimliği", "Karakoyunlu Devleti’nin genişlemesi"],
        tags: ["Tebriz", "Edebiyat", "Karakoyunlu"],
        period: [
            { year: "1438", text: "Karakoyunlu tahtına çıktı; batı İran’da egemenliğini kurdu." },
            { year: "1447", text: "Tebriz’i başkent yaparak devletin merkezini güçlendirdi." },
            { year: "1450", text: "Sarayında şair ve âlimleri toplayarak edebiyat çevresi oluşturdu." },
            { year: "1467", text: "Uzun Hasan’a karşı giriştiği savaşta yenildi ve öldü." }
        ]
    },

    // ─── TİMURLULAR ──────────────────────────────────────────────
    {
        id: 334, era: "timurlu", name: "Halil Sultan", dates: "1405 – 1409", dynasty: "TİMURLULAR",
        icon: "👑", sortYear: 1405, quote: "“Miras, taht değil; sorumluluktur.”",
        bio: "Timur’un torunu. Semerkant’ta tahta çıktı; Şahruh ile mücadele etti ve 1409’da tahtı bıraktı.",
        achievements: ["Semerkant’ta tahta çıktı", "Şahruh ile mücadele", "Timurlu mirasının korunması"],
        tags: ["Semerkant", "Şahruh", "Miras"],
        period: [
            { year: "1405", text: "Timur’un ölümüyle Semerkant’ta Timurlu tahtına çıktı." },
            { year: "1406", text: "Şahruh ile taht mücadelesine girdi; Maveraünnehir’de otorite kurmaya çalıştı." },
            { year: "1409", text: "Şahruh’un üstünlüğünü kabul ederek tahttan çekildi." }
        ]
    },
    {
        id: 335, era: "timurlu", name: "Abdüllatif Mirza", dates: "1449 – 1450", dynasty: "TİMURLULAR",
        icon: "🕌", sortYear: 1449, quote: "“Rasathane, hanedanın en uzun ömürlü mirasıdır.”",
        bio: "Uluğ Bey’in oğlu. Semerkant’ta kısa süre hüküm sürdü; babasının rasathanesini korumaya çalıştı.",
        achievements: ["Semerkant’ta kısa saltanat", "Uluğ Bey rasathanesinin korunması", "Timurlu kültür mirası"],
        tags: ["Semerkant", "Rasathane", "Kültür Mirası"],
        period: [
            { year: "1449", text: "Babası Uluğ Bey’in ölümüyle Semerkant’ta tahta çıktı." },
            { year: "1450", text: "Kısa saltanatının ardından öldürüldü; Timurlu tahtı yeniden karıştı." }
        ]
    },
    {
        id: 336, era: "timurlu", name: "Ebû Said Mirza", dates: "1451 – 1469", dynasty: "TİMURLULAR",
        icon: "🐎", sortYear: 1451, quote: "“Dağılan toprak, at sırtında toplanır.”",
        bio: "Timurlu topraklarını yeniden birleştirdi. Horasan ve Maveraünnehir’de merkezî otorite kurdu.",
        achievements: ["Timurlu topraklarını birleştirdi", "Horasan ve Maveraünnehir’de otorite", "Merkezî yönetim"],
        tags: ["Birleşme", "Horasan", "Merkezî Yönetim"],
        period: [
            { year: "1451", text: "Semerkant’ta Timurlu tahtına çıktı; dağılan toprakları toplamaya başladı." },
            { year: "1455", text: "Maveraünnehir’deki yerel emirleri denetim altına alarak birliği sağladı." },
            { year: "1460", text: "Horasan’a yönelerek Herat merkezli Timurlu yönetimini güçlendirdi." },
            { year: "1469", text: "Akkoyunlularla giriştiği mücadelede öldü; Timurlu birliği yeniden bozuldu." }
        ]
    },
    {
        id: 337, era: "timurlu", name: "Bediüzzaman Mirza", dates: "1469 – 1497", dynasty: "TİMURLULAR",
        icon: "📜", sortYear: 1469, quote: "“Herat’ın kalemi, kılıçtan uzun yaşar.”",
        bio: "Herat merkezli son önemli Timurlu hükümdarı. Kültür hayatını destekledi; Özbek akınlarına karşı direndi.",
        achievements: ["Herat merkezli yönetim", "Kültür hayatının desteklenmesi", "Özbek akınlarına direniş"],
        tags: ["Herat", "Kültür", "Özbek Akınları"],
        period: [
            { year: "1469", text: "Herat’ta Timurlu tahtına çıktı; Horasan’da otorite kurdu." },
            { year: "1480", text: "Sarayında edebiyat ve sanat meclisleri kurarak Herat kültürünü canlandırdı." },
            { year: "1490", text: "Özbek akınlarına karşı Horasan sınırlarını savundu." },
            { year: "1497", text: "Öldü; Timurlu Devleti kısa süre sonra Şeybanilerin eline geçti." }
        ]
    },
    {
        id: 338, era: "memluk", name: "El-Eşref Halil", dates: "1290 – 1293", dynasty: "MEMLÜKLER",
        icon: "🏰", sortYear: 1290, quote: "“Akka’nın surları, iki yüz yıllık haçlı hayalini gömer.”",
        bio: "Kalavun’un oğlu. 1291’de Akka’yı alarak Haçlı devletlerine son verdi; 1293’te öldürüldü.",
        achievements: ["Akka’nın fethi", "Haçlı devletlerine son", "Suriye’de Memlük düzeni"],
        tags: ["Akka", "Haçlılar", "Suriye"],
        period: [
            { year: "1290", text: "Babası Kalavun’un ardından Memlük tahtına çıktı." },
            { year: "1291", text: "Akka’yı fethederek Haçlıların Doğu Akdeniz’deki son büyük kalesini aldı." },
            { year: "1292", text: "Suriye ve Filistin’de Memlük yönetimini yeniden düzenledi." },
            { year: "1293", text: "Saray içi suikast sonucu öldürüldü." }
        ]
    },
    {
        id: 339, era: "memluk", name: "Nasır Muhammed bin Kalavun", dates: "1293 – 1341", dynasty: "MEMLÜKLER",
        icon: "🕌", sortYear: 1293, quote: "“Nil’e kanal açan sultan, şehre ömür açar.”",
        bio: "Memlük sultanı. Üç dönem saltanatında Mısır’ı bayındırlaştırdı; Nil kanalı ve büyük camiler yaptırdı.",
        achievements: ["Üç dönem saltanat", "Nil kanalı projesi", "Kahire’de büyük imar"],
        tags: ["İmar", "Nil Kanalı", "Kahire"],
        period: [
            { year: "1293", text: "İlk kez Memlük tahtına çıktı; çocuk yaşta olduğu için devlet adamları yönetimi paylaştı." },
            { year: "1310", text: "Üçüncü saltanatında tam yetkiyle yönetimi ele aldı; Memlük gücünü zirveye taşıdı." },
            { year: "1320", text: "Nil Nehri’ne kanal açtırarak Kahire çevresinde tarım ve su düzenini geliştirdi." },
            { year: "1330", text: "Cami, medrese ve hanlar yaptırarak Kahire’yi İslam dünyasının büyük merkezlerinden biri yaptı." },
            { year: "1341", text: "Öldü; ardından Memlük tahtında hızlı değişimler başladı." }
        ]
    },
    {
        id: 340, era: "memluk", name: "Berkuk", dates: "1382 – 1399", dynasty: "MEMLÜKLER (BURCÎ)",
        icon: "🛡️", sortYear: 1382, quote: "“Çerkes atı, Mısır toprağında da bozkırı hatırlar.”",
        bio: "Memlük tahtına geçen ilk Çerkes (Burcî) sultan. Timurlu tehdidine karşı Anadolu beylikleriyle ittifak aradı.",
        achievements: ["İlk Burcî sultan", "Timurlu tehdidine karşı ittifak", "Memlük yönetiminin yeniden düzenlenmesi"],
        tags: ["Burcî Hanedanı", "Timur Tehdidi", "İttifak"],
        period: [
            { year: "1382", text: "Memlük tahtına geçerek Burcî (Çerkes) hanedanını başlattı." },
            { year: "1390", text: "Timur’un doğudan yükselmesi üzerine Suriye sınırlarını güçlendirdi." },
            { year: "1394", text: "Anadolu beylikleri ve Osmanlı ile diplomatik ilişkiler kurarak Timur’a karşı denge aradı." },
            { year: "1399", text: "Öldü; yerine geçen sultanlar Timur tehdidiyle yüzleşti." }
        ]
    },
    {
        id: 341, era: "memluk", name: "Kayıtbay", dates: "1468 – 1496", dynasty: "MEMLÜKLER (BURCÎ)",
        icon: "🏛️", sortYear: 1468, quote: "“Kahire’nin taşı, sultanın adını yüzyıllarca taşır.”",
        bio: "Memlüklerin son büyük sultanı. Osmanlı ile diplomatik denge kurdu; Kahire’de büyük imar faaliyetleri yürüttü.",
        achievements: ["Osmanlı ile diplomatik denge", "Kahire’de büyük imar", "Memlük gücünün son parlak dönemi"],
        tags: ["Diplomasi", "İmar", "Son Büyük Sultan"],
        period: [
            { year: "1468", text: "Memlük tahtına çıktı; iç karışıklıkları bastırarak otoriteyi sağladı." },
            { year: "1480", text: "Kahire’de cami, medrese ve çeşmeler yaptırarak şehri imar etti." },
            { year: "1490", text: "Osmanlı ve Safevi tehditlerine karşı diplomatik denge siyaseti izledi." },
            { year: "1496", text: "Öldü; Memlük Devleti kısa süre sonra Osmanlı ile büyük bir hesaplaşmaya girdi." }
        ]
    },
    {
        id: 342, era: "memluk", name: "Kansu Gavri", dates: "1501 – 1516", dynasty: "MEMLÜKLER (BURCÎ)",
        icon: "⚔️", sortYear: 1501, quote: "“İki büyük gölge arasında kalan, kendi gölgesini kaybeder.”",
        bio: "Memlük sultanı. Safevi ve Osmanlı tehditleri arasında kaldı; 1516 Mercidabık’ta Osmanlı ordusuna yenilerek öldü.",
        achievements: ["Safevi-Osmanlı dengesi", "Memlük ordusunun son seferberliği", "Mercidabık Savunması"],
        tags: ["Mercidabık", "Safevi", "Osmanlı"],
        period: [
            { year: "1501", text: "Memlük tahtına çıktı; Safevi yükselişine karşı doğu sınırlarını güçlendirdi." },
            { year: "1514", text: "Çaldıran sonrası Osmanlı’nın doğuya yönelmesiyle diplomatik çözüm aradı." },
            { year: "1516", text: "Mercidabık Savaşı’nda Osmanlı ordusuna yenildi ve savaş alanında öldü." }
        ]
    },
    {
        id: 343, era: "memluk", name: "Tomanbay", dates: "1516 – 1517", dynasty: "MEMLÜKLER (BURCÎ)",
        icon: "🕯️", sortYear: 1516, quote: "“Son sultan, son sur gibi ayakta ölür.”",
        bio: "Memlük Devleti’nin son sultanı. Kahire’yi savundu; 1517’de Osmanlı’ya esir düştü ve idam edildi.",
        achievements: ["Memlük Devleti’nin son sultanı", "Kahire savunması", "Ridaniye Savaşı"],
        tags: ["Son Sultan", "Kahire", "Ridaniye"],
        period: [
            { year: "1516", text: "Kansu Gavri’nin ölümüyle Memlük tahtına çıktı." },
            { year: "1517", text: "Ridaniye Savaşı’nda Osmanlı ordusuna karşı koydu; Kahire’ye çekildi." },
            { year: "1517", text: "Kahire’nin düşmesiyle esir alındı ve idam edildi; Memlük Devleti sona erdi." }
        ]
    },
    {
        id: 344, era: "bozkir", name: "Bayan Kağan", dates: "562 – 602", dynasty: "AVAR KAĞANLIĞI",
        icon: "🏕️", sortYear: 562, quote: "“Orta Avrupa’da çadır kuran, kışı da yönetir.”",
        bio: "Avar Kağanlığı’nın kurucusu. Orta Avrupa’da güçlü bir bozkır devleti kurdu; Bizans ile anlaşmalar yaptı.",
        achievements: ["Avar Kağanlığı’nı kurdu", "Orta Avrupa yerleşimi", "Bizans ile anlaşmalar"],
        tags: ["Avar Kurucusu", "Orta Avrupa", "Bizans"],
        period: [
            { year: "562", text: "Avar boylarını birleştirerek Avar Kağanlığı’nı kurdu." },
            { year: "570", text: "Orta Avrupa’ya yerleşerek Tuna havzasında güçlü bir bozkır yönetimi oluşturdu." },
            { year: "580", text: "Bizans ile anlaşma yaparak sınır ticaretini ve vergiyi düzenledi." },
            { year: "602", text: "Öldü; Avar Kağanlığı bir süre daha Orta Avrupa’da etkili oldu." }
        ]
    },
    {
        id: 345, era: "bozkir", name: "Bulan Han", dates: "740 – 786", dynasty: "HAZAR KAĞANLIĞI",
        icon: "✡️", sortYear: 740, quote: "“Üç dinin kapısı da bir şehirde açılır.”",
        bio: "Hazar Kağanı. 740’larda Museviliği kabul ederek Hazar sarayında yeni bir dini dönem başlattı.",
        achievements: ["Museviliğin kabulü", "Hazar sarayında dinî dönüşüm", "Ticaret yollarının korunması"],
        tags: ["Musevilik", "Hazar Sarayı", "Ticaret"],
        period: [
            { year: "740", text: "Hazar tahtına çıktı; İdil boyunda devleti güçlendirdi." },
            { year: "750", text: "Museviliği kabul ederek Hazar yönetici sınıfında yeni bir dinî dönem başlattı." },
            { year: "770", text: "Farklı din adamlarını sarayda tartışmaya açarak Hazar’ın dinî çoğulculuğunu korudu." },
            { year: "786", text: "Öldü; Hazar Kağanlığı İdil ticaretinin merkezi olmayı sürdürdü." }
        ]
    },
    {
        id: 346, era: "bozkir", name: "Obadya Han", dates: "786 – 810", dynasty: "HAZAR KAĞANLIĞI",
        icon: "📜", sortYear: 786, quote: "“Kanun, çadırın direğidir.”",
        bio: "Hazar kağanı. Museviliği devlet kurumlarıyla güçlendirdi; sinagog ve okullar açtırdı.",
        achievements: ["Musevi kurumlarının güçlendirilmesi", "Sinagog ve okullar", "Hazar hukuk düzeni"],
        tags: ["Musevi Kurumları", "Sinagog", "Hukuk"],
        period: [
            { year: "786", text: "Bulan Han’ın ardından Hazar tahtına çıktı." },
            { year: "790", text: "Sinagog ve okullar açtırarak Musevi kurumlarını devlet desteğine kavuşturdu." },
            { year: "800", text: "Musevi hukukunu Hazar töresiyle uyumlu hâle getiren düzenlemeler yaptı." },
            { year: "810", text: "Öldü; Hazar Kağanlığı dinî ve ticari merkez olmayı sürdürdü." }
        ]
    },
    {
        id: 347, era: "bozkir", name: "Benjamin Han", dates: "880 – 920", dynasty: "HAZAR KAĞANLIĞI",
        icon: "🛡️", sortYear: 880, quote: "“Kuzey rüzgârı, sınırı ilk önce koklar.”",
        bio: "Hazar kağanı. Peçenek ve Rus akınlarına karşı kuzey sınırlarını savundu.",
        achievements: ["Kuzey sınırlarının savunması", "Peçenek seferleri", "Rus akınlarına direniş"],
        tags: ["Kuzey Savunması", "Peçenekler", "Rus Akınları"],
        period: [
            { year: "880", text: "Hazar tahtına çıktı; kuzey bozkır sınırlarını güçlendirdi." },
            { year: "890", text: "Peçenek akınlarına karşı sefer düzenleyerek İdil boyunu korudu." },
            { year: "900", text: "Rus knezliklerinin Dinyeper üzerinden gelen akınlarına karşı savunma hattı kurdu." },
            { year: "920", text: "Öldü; Hazar Kağanlığı baskı altında küçülmeye başladı." }
        ]
    },
    {
        id: 348, era: "bozkir", name: "Yusuf Han", dates: "920 – 960", dynasty: "HAZAR KAĞANLIĞI",
        icon: "📖", sortYear: 920, quote: "“Uzaktaki dost, yakındaki düşmandan hayırlıdır.”",
        bio: "Hazar kağanı. Endülüs’teki Hasdai ibn Şaprut ile mektuplaştı; Hazar Museviliğinin son büyük temsilcisi oldu.",
        achievements: ["Hasdai ibn Şaprut ile mektuplaşma", "Hazar Museviliğinin son büyük temsili", "Uluslararası diplomasi"],
        tags: ["Diplomasi", "Musevilik", "Endülüs"],
        period: [
            { year: "920", text: "Hazar tahtına çıktı; İdil boyunda devletin son güçlü dönemini yönetti." },
            { year: "930", text: "Endülüs’teki Hasdai ibn Şaprut ile mektuplaşarak Hazar Museviliğini dünyaya tanıttı." },
            { year: "950", text: "Rus saldırıları karşısında Hazar topraklarını savunmaya çalıştı." },
            { year: "960", text: "Döneminin sonunda Hazar Kağanlığı zayıfladı ve tarih sahnesinden çekildi." }
        ]
    },
    {
        id: 349, era: "anadoluselcuklu", name: "I. Gıyaseddin Keyhüsrev", dates: "1192 – 1196, 1205 – 1211", dynasty: "ANADOLU SELÇUKLU",
        icon: "🕌", sortYear: 1192, quote: "“Liman, devletin denize açılan kapısıdır.”",
        bio: "Anadolu Selçuklu sultanı. 1205’te tahtı geri aldı; Antalya’yı fethederek tersane kurdu.",
        achievements: ["Antalya’nın fethi", "İlk Selçuklu tersanesi", "Tahtı geri kazanma"],
        tags: ["Antalya", "Tersane", "Liman"],
        period: [
            { year: "1192", text: "Anadolu Selçuklu tahtına çıktı; beyliklerle denge kurmaya çalıştı." },
            { year: "1196", text: "Tahtı kardeşi II. Süleyman Şah’a bırakmak zorunda kaldı." },
            { year: "1205", text: "Tahtı yeniden ele geçirerek merkezî otoriteyi güçlendirdi." },
            { year: "1207", text: "Antalya’yı fethederek Akdeniz’e açılan ilk büyük Selçuklu limanını kazandı." },
            { year: "1211", text: "Alaşehir yakınlarında Bizans ile giriştiği savaşta öldü." }
        ]
    },
    {
        id: 350, era: "anadoluselcuklu", name: "II. Süleyman Şah", dates: "1196 – 1204", dynasty: "ANADOLU SELÇUKLU",
        icon: "⚔️", sortYear: 1196, quote: "“Doğu kapısı, Anadolu’nun kilididir.”",
        bio: "Anadolu Selçuklu sultanı. Erzurum ve çevresini aldı; Gürcülerle mücadele etti.",
        achievements: ["Erzurum ve çevresinin alınması", "Gürcülerle mücadele", "Doğu sınırlarının güçlendirilmesi"],
        tags: ["Erzurum", "Gürcüler", "Doğu Sınırı"],
        period: [
            { year: "1196", text: "Kardeşi I. Gıyaseddin Keyhüsrev’in yerine Anadolu Selçuklu tahtına çıktı." },
            { year: "1200", text: "Erzurum ve çevresini alarak doğu sınırlarını genişletti." },
            { year: "1202", text: "Gürcü kuvvetlerine karşı sefer düzenledi; Doğu Anadolu’da denge kurdu." },
            { year: "1204", text: "Öldü; taht yeniden I. Gıyaseddin Keyhüsrev’e geçti." }
        ]
    },
    {
        id: 351, era: "anadoluselcuklu", name: "I. İzzeddin Keykavus", dates: "1211 – 1220", dynasty: "ANADOLU SELÇUKLU",
        icon: "⚓", sortYear: 1211, quote: "“Karadeniz’e inen sultan, iki denize söz geçirir.”",
        bio: "Anadolu Selçuklu sultanı. Sinop’u alarak Karadeniz ticaretini açtı; ilk Selçuklu donanmasını kurdu.",
        achievements: ["Sinop’un fethi", "Karadeniz ticareti", "İlk Selçuklu donanması"],
        tags: ["Sinop", "Karadeniz", "Donanma"],
        period: [
            { year: "1211", text: "Babası I. Gıyaseddin Keyhüsrev’in ölümüyle Anadolu Selçuklu tahtına çıktı." },
            { year: "1214", text: "Sinop’u fethederek Karadeniz’e açılan önemli bir liman kazandı." },
            { year: "1216", text: "Sinop’ta tersane kurarak ilk düzenli Selçuklu donanmasını oluşturdu." },
            { year: "1218", text: "Kıbrıs ve Venedik tüccarlarıyla ticaret anlaşmaları yaparak Akdeniz ticaretini canlandırdı." },
            { year: "1220", text: "Öldü; yerine kardeşi I. Alaeddin Keykubad geçti." }
        ]
    },
    {
        id: 352, era: "anadoluselcuklu", name: "II. Gıyaseddin Keyhüsrev", dates: "1237 – 1246", dynasty: "ANADOLU SELÇUKLU",
        icon: "🕯️", sortYear: 1237, quote: "“Dağ ne kadar yüksekse, fırtına o kadar yakındır.”",
        bio: "Anadolu Selçuklu sultanı. 1243 Kösedağ yenilgisiyle Moğol egemenliğini kabul etmek zorunda kaldı.",
        achievements: ["Kösedağ Savaşı", "Moğol egemenliğinin kabulü", "Babai isyanının bastırılması"],
        tags: ["Kösedağ", "Moğollar", "Babai İsyanı"],
        period: [
            { year: "1237", text: "Babası I. Alaeddin Keykubad’ın ölümüyle Anadolu Selçuklu tahtına çıktı." },
            { year: "1240", text: "Babai isyanını bastırarak iç düzeni sağlamaya çalıştı." },
            { year: "1243", text: "Kösedağ Savaşı’nda Moğol ordusuna yenildi; Anadolu Moğol egemenliğine girdi." },
            { year: "1246", text: "Öldü; Anadolu Selçuklu Devleti Moğol vesayeti altında yönetildi." }
        ]
    },
    {
        id: 353, era: "anadoluselcuklu", name: "II. İzzeddin Keykavus", dates: "1246 – 1262", dynasty: "ANADOLU SELÇUKLU",
        icon: "🛡️", sortYear: 1246, quote: "“Kardeş kavgası, kapıdaki düşmandan pahalıdır.”",
        bio: "Anadolu Selçuklu sultanı. Kardeşleriyle taht mücadelesi yaşadı; Moğol baskısı altında yönetimi sürdürdü.",
        achievements: ["Taht mücadelesi", "Moğol baskısı altında yönetim", "Anadolu birliğini koruma çabası"],
        tags: ["Taht Mücadelesi", "Moğol Baskısı", "Anadolu"],
        period: [
            { year: "1246", text: "Kardeşleriyle birlikte Anadolu Selçuklu tahtına ortak oldu." },
            { year: "1254", text: "Kardeşi IV. Kılıçarslan ile taht mücadelesine girdi; devlet üçe bölündü." },
            { year: "1256", text: "Moğol hanına vergi ödeyerek yönetimini sürdürmeye çalıştı." },
            { year: "1262", text: "Moğol baskısı ve iç mücadele sonucu tahtı kaybederek sürgüne gitti." }
        ]
    },
    {
        id: 354, era: "anadoluselcuklu", name: "IV. Kılıçarslan", dates: "1248 – 1265", dynasty: "ANADOLU SELÇUKLU",
        icon: "👑", sortYear: 1248, quote: "“Çocuk taht, gölge sultan demektir.”",
        bio: "Çocuk yaşta tahta çıkan Anadolu Selçuklu sultanı. Saltanatı Moğol valilerinin gölgesinde geçti.",
        achievements: ["Çocuk yaşta tahta çıkış", "Moğol vesayeti dönemi", "Pervane yönetimi"],
        tags: ["Çocuk Sultan", "Moğol Vesayeti", "Pervane"],
        period: [
            { year: "1248", text: "Çocuk yaşta Anadolu Selçuklu tahtına çıktı." },
            { year: "1250", text: "Devlet yönetimi Moğol valileri ve Selçuklu vezirlerinin eline geçti." },
            { year: "1260", text: "Pervane Muineddin Süleyman’ın etkisi altında kaldı; Moğol vergileri arttı." },
            { year: "1265", text: "Öldü; Anadolu Selçuklu Devleti Moğol egemenliğinde küçüldü." }
        ]
    },
    {
        id: 355, era: "anadoluselcuklu", name: "III. Gıyaseddin Keyhüsrev", dates: "1265 – 1284", dynasty: "ANADOLU SELÇUKLU",
        icon: "📜", sortYear: 1265, quote: "“Vezir idam edilir, devlet yarası kalır.”",
        bio: "Anadolu Selçuklu sultanı. Pervane Muineddin’in idamı ve Moğol baskısı döneminde hüküm sürdü.",
        achievements: ["Pervane dönemi", "Moğol baskısı altında yönetim", "Memlük ile ilişkiler"],
        tags: ["Pervane", "Moğol Baskısı", "Memlükler"],
        period: [
            { year: "1265", text: "Anadolu Selçuklu tahtına çıktı; Moğol vesayeti altında yönetimi devraldı." },
            { year: "1277", text: "Memlük Sultanı Baybars’ın Anadolu seferi sırasında Moğol yanında kalmak zorunda kaldı." },
            { year: "1280", text: "Moğol baskısı ve ağır vergiler altında Anadolu’da beylikler güçlendi." },
            { year: "1284", text: "Öldü; Anadolu Selçuklu Devleti fiilen beyliklere bölündü." }
        ]
    },
    {
        id: 356, era: "anadoluselcuklu", name: "II. Mesud", dates: "1284 – 1296, 1303 – 1308", dynasty: "ANADOLU SELÇUKLU",
        icon: "🕯️", sortYear: 1284, quote: "“Son kale de bir gün kapısını açar.”",
        bio: "Anadolu Selçuklu Devleti’nin son etkili sultanı. Moğollar ve beylikler arasında denge kurmaya çalıştı.",
        achievements: ["Son etkili Selçuklu sultanı", "Moğol-beylik dengesi", "Devletin son dönemi"],
        tags: ["Son Sultan", "Denge", "Beylikler"],
        period: [
            { year: "1284", text: "Anadolu Selçuklu tahtına çıktı; Moğol hanlarının onayıyla yönetimi sürdürdü." },
            { year: "1290", text: "Beyliklerin güçlenmesi karşısında merkezî otoriteyi korumaya çalıştı." },
            { year: "1303", text: "İkinci saltanat döneminde Anadolu’daki son Selçuklu egemenliğini sürdürdü." },
            { year: "1308", text: "Öldü; Anadolu Selçuklu Devleti resmen sona erdi." }
        ]
    }
];
