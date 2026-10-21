/**
 * OtaG - Türk Hükümdarları Veritabanı
 * Tüm 36 Osmanlı Padişahı, Tüm 12 Türkiye Cumhuriyeti Cumhurbaşkanı
 * ve Hun, Göktürk, Uygur, Karahanlı, Gazneli, Selçuklu Hakanları
 */

window.TURKISH_RULERS_DATA = [
    // ══════════════════════════════════════════════════════════════════════
    // 1. HUN İMPARATORLUĞU
    // ══════════════════════════════════════════════════════════════════════
    {
        id: 1, era: 'hun', name: 'Teoman', dates: 'MÖ 220 – MÖ 209',
        dynasty: 'ASYA HUN İMPARATORLUĞU',
        icon: '🏹', sortYear: -220,
        quote: '"Turan ellerinin birliği bozkırın kaderidir."',
        bio: 'Tarihte bilinen ilk Türk devleti olan Asya Hun İmparatorluğu\'nun kurucusu ve bilinen ilk Türk hükümdarıdır. Dağınık Türk boylarını bir araya toplayarak büyük bir güç merkezi oluşturmuştur.',
        achievements: ['🏛️ Tarihte bilinen ilk Türk devletinin kurucusu', '🤝 Orta Asya Türk boylarını tek bayrak altında topladı', '🛡️ Çin Seddi\'nin inşasına sebep olan akınları başlattı'],
        tags: ['İlk Hakan', 'Turan Kurucusu', 'Bozkırın Öncüsü']
    },
    {
        id: 2, era: 'hun', name: 'Mete Han', dates: 'MÖ 209 – MÖ 174',
        dynasty: 'ASYA HUN İMPARATORLUĞU',
        icon: '🐎', sortYear: -209,
        quote: '"Toprak devletin temelidir, onu kimse veremez."',
        bio: 'Asya Hun İmparatorluğu\'nun en parlak dönemini yaşatan büyük hakan. Onlu askeri teşkilatlanmayı (Onbaşı, Yüzbaşı, Binbaşı, Tümenbaşı) kurarak Türk Silahlı Kuvvetleri\'nin MÖ 209 kuruluş tarihine adını yazdırmıştır.',
        achievements: ['⚔️ Onluk askeri sistemin (Tümen) mucidi ve kurucusu', '🗺️ Hunları 3 milyon km²yi aşan dev imparatorluğa dönüştürdü', '📜 Çin\'i vergiye bağlayan Baideng Kuşatması zaferi', '🏹 Islıklı okun mucidi'],
        tags: ['TSK Kurucusu', 'Askeri Deha', 'Büyük Bozkır Fatihi']
    },
    {
        id: 3, era: 'hun', name: 'Ki-Ok Han', dates: 'MÖ 174 – MÖ 160',
        dynasty: 'ASYA HUN İMPARATORLUĞU',
        icon: '🦅', sortYear: -174,
        quote: '"Bozkırın kanunu töredir, töreye uyan payidar kalır."',
        bio: 'Mete Han\'ın oğlu. Babasının başlattığı yayılma politikasını sürdürmüş, Yüeçileri yenilgiye uğratarak İpek Yolu hakimiyetini pekiştirmiştir.',
        achievements: ['🛣️ İpek Yolu ticaretini güvence altına aldı', '🏹 Hun askeri üstünlüğünü sürdürdü', '📜 Çin ile dengeli ticaret anlaşmaları yaptı'],
        tags: ['İpek Yolu', 'Gelenekçi Han', 'Hun Gücü']
    },
    {
        id: 4, era: 'hun', name: 'Çiçi Han', dates: 'MÖ 56 – MÖ 36',
        dynasty: 'BATI HUN DEVLETİ',
        icon: '🛡️', sortYear: -56,
        quote: '"Boyun eğmeyeceğiz! İstiklalimizi feda etmektense savaşarak ölürüz!"',
        bio: 'Çin egemenliğini kabul etmek isteyen kardeşi Hohanyeh\'e karşı çıkarak Türk milliyetçiliğinin ve bağımsızlık ruhunun ilk büyük savunucusu oldu. Bağımsızlığı uğruna son neferine dek savaştı.',
        achievements: ['✊ Türk tarihinde ilk yazılı bağımsızlık manifestosu', '🏰 Talas Savaşı\'nda kale savunması yaptı', '⚔️ Boyun eğmeyi reddeden onurlu direniş'],
        tags: ['İstiklal Sembolü', 'Asi Hakan', 'Talas Direnişi']
    },
    {
        id: 5, era: 'hun', name: 'Balamir Han', dates: '374 – 378',
        dynasty: 'AVRUPA HUN İMPARATORLUĞU',
        icon: '⚡', sortYear: 374,
        quote: '"Güneşin doğduğu yerden battığı yere kadar her yer atlarımızın çiğneyeceği topraktır."',
        bio: 'Kavimler Göçü\'nü başlatan Hun hakanı. İdil (Volga) nehrini geçerek Gotları mağlup etmiş ve Avrupa kıtasının çehresini tamamen değiştirmiştir.',
        achievements: ['🌍 Kavimler Göçü\'nü tetikleyerek İlk Çağ\'ı kapattı', '🌊 Volga Nehrini aşıp Avrupa\'ya Türk akınını başlattı', '🛡️ Got Krallıklarını bozguna uğrattı'],
        tags: ['Kavimler Göçü', 'Batı Akıncısı', 'Avrupa Fatihi']
    },
    {
        id: 6, era: 'hun', name: 'Uldız Han', dates: '395 – 410',
        dynasty: 'AVRUPA HUN İMPARATORLUĞU',
        icon: '☀️', sortYear: 395,
        quote: '"Güneşin battığı yere kadar her yeri fethedebilirim."',
        bio: 'Avrupa Hunlarının dış politikasının temellerini atan lider. Doğu Roma\'yı baskı altına alıp Batı Roma ile müttefiklik kurma stratejisini başarıyla uyguladı.',
        achievements: ['🗺️ Hun sınırlarını Tuna nehrinin ötesine genişletti', '🏛️ Trakya üzerine başarılı seferler düzenledi', '🤝 Roma diplomasisine yön verdi'],
        tags: ['Dış Politika Ustası', 'Tuna Hükümdarı', 'Büyük Bozkır']
    },
    {
        id: 7, era: 'hun', name: 'Attila', dates: '434 – 453',
        dynasty: 'AVRUPA HUN İMPARATORLUĞU',
        icon: '⚔️', sortYear: 434,
        quote: '"Ben Tanrı\'nın kırbacıyım; günahkar kulları cezalandırmak için gönderildim."',
        bio: 'Avrupa Hun İmparatorluğu\'nun en kudretli hükümdarı. Hem Doğu hem Batı Roma İmparatorluklarına diz çöktürmüş, Avrupa\'yı baştan başa fethederek Orta Çağ tarihine yön vermiştir.',
        achievements: ['⚡ "Tanrı\'nın Kırbacı" unvanıyla anıldı', '🏰 Katalon (Catalaunian) Meydan Muharebesi\'nde dev Roma ordusunu durdurdu', '📜 Doğu Roma\'yı ağır yıllık vergilere bağladı', '👑 Roma kapılarına kadar dayandı (Papa I. Leo ile müzakere)'],
        tags: ['Tanrı\'nın Kırbacı', 'Avrupa Titreten', 'Efsanevi Hakan']
    },

    // ══════════════════════════════════════════════════════════════════════
    // 2. GÖKTÜRK KAĞANLIĞI
    // ══════════════════════════════════════════════════════════════════════
    {
        id: 8, era: 'gokturk', name: 'Bumin Kağan', dates: '552 – 552',
        dynasty: 'I. GÖKTÜRK KAĞANLIĞI',
        icon: '🐺', sortYear: 552,
        quote: '"Üstte mavi gök, altta yağız yer kılındıkta, ikisi arasında insan oğlu kılınmış."',
        bio: 'Türk adını ilk defa resmi devlet adı olarak kullanan I. Göktürk Devleti\'nin kurucusudur. Juan-juan (Avar) boyunduruğunu kırarak Ötüken merkezli muazzam bir kağanlık kurmuştur.',
        achievements: ['🐺 "Türk" adını taşıyan ilk bağımsız devleti kurdu', '🛡️ Avar egemenliğini yıktı', '🏔️ Ötüken\'i başkent ilan etti'],
        tags: ['Devlet Kuran', 'İl Kağan', 'Ötüken Aslanı']
    },
    {
        id: 9, era: 'gokturk', name: 'İstemi Yabgu', dates: '552 – 576',
        dynasty: 'I. GÖKTÜRK KAĞANLIĞI (BATI)',
        icon: '🏹', sortYear: 553,
        quote: '"Gözümün gördüğü, atımın ayak bastığı her toprak Türk\'ündür."',
        bio: 'Bumin Kağan\'ın kardeşi ve Göktürk Devleti\'nin batı kanadı yöneticisi. Sasani ve Bizans imparatorluklarıyla diplomatik elçilikler kurarak İpek Yolu\'nu kontrol altına almıştır.',
        achievements: ['🏛️ Bizans ile ilk resmi Türk diplomatik ilişkisini başlattı (Maniakh Elçiliği)', '🗺️ İpek Yolu\'nun batı kolunu fethetti', '🛡️ Ak Hun devletine son verdi'],
        tags: ['Diplomasi Ustası', 'Batı Hakanı', 'Büyük Teşkilatçı']
    },
    {
        id: 10, era: 'gokturk', name: 'Mukan Kağan', dates: '553 – 572',
        dynasty: 'I. GÖKTÜRK KAĞANLIĞI',
        icon: '🌙', sortYear: 554,
        quote: '"Gök Tengri Türk milletini korusun ve yüceltsin."',
        bio: 'Göktürk Devleti\'ne en parlak dönemini yaşatan fatih kağan. Doğuda Kıtayları, kuzeyde Kırgızları mağlup ederek sınırları Büyük Okyanus\'a kadar uzatmıştır.',
        achievements: ['🌊 Sınırları Pasifik Okyanusu\'ndan Hazar\'a genişletti', '⚔️ Kırgız ve Kıtay seferlerinde kesin zaferler kazandı', '📜 Göktürk birliğini zirveye taşıdı'],
        tags: ['Büyük Fatih', 'Bozkırın Altın Çağı', 'Yenilmez Kağan']
    },
    {
        id: 11, era: 'gokturk', name: 'Kutluk (İlteriş) Kağan', dates: '682 – 691',
        dynasty: 'II. GÖKTÜRK (KUTLUK) KAĞANLIĞI',
        icon: '🛡️', sortYear: 682,
        quote: '"Gök Tengri güç verdi, Türk milleti yok olmaktan kurtuldu."',
        bio: '50 yıllık Çin esaretine son vererek Göktürk Devleti\'ni yeniden dirilten kurtarıcı hakan. "Devleti derleyip toplayan" anlamına gelen "İlteriş" unvanını almıştır.',
        achievements: ['✊ Çin esaretine son verip II. Göktürk Devleti\'ni kurdu', '⚔️ 47 başarılı sefer düzenledi', '📜 Bilge Tonyukuk ile bağımsızlık mücadelesini ördü'],
        tags: ['İlteriş (Derleyen)', 'Kurtarıcı Kağan', 'İkinci Diriliş']
    },
    {
        id: 12, era: 'gokturk', name: 'Kapgan Kağan', dates: '691 – 716',
        dynasty: 'II. GÖKTÜRK KAĞANLIĞI',
        icon: '⚡', sortYear: 691,
        quote: '"Gündüz oturmadım, gece uyumadım; aç milleti doyurdum, çıplak milleti giydirdim."',
        bio: 'İlteriş Kağan\'ın kardeşi. "Devlet fetheden, toplayan" manasındaki Kapgan adını almış; Orta Asya\'daki bütün Türk boylarını tek bayrak altında birleştirmiştir.',
        achievements: ['🗺️ Bütün Orta Asya Türk boylarını tek idareye bağladı', '🌾 Çin\'den yüz binlerce kile tohumluk buğday ve tarım aleti tazminatı aldı', '🐎 25 büyük askeri sefer kazandı'],
        tags: ['Kapgan (Fatih)', 'Kudretli Hakan', 'Birlik Mimarı']
    },
    {
        id: 13, era: 'gokturk', name: 'Bilge Kağan', dates: '716 – 734',
        dynasty: 'II. GÖKTÜRK KAĞANLIĞI',
        icon: '📜', sortYear: 716,
        quote: '"Ey Türk, titre ve kendine dön! Üstte mavi gök çökmedikçe, altta yağız yer delinmedikçe senin ilini ve töreni kim bozabilir?"',
        bio: 'Kardeşi Kül Tigin ve vezir Tonyukuk ile birlikte Göktürklerin altın çağını yöneten bilge hükümdar. Orhun Abideleri\'ne kazınan eşsiz vasiyetiyle Türk milletinin ebedi meşalesi olmuştur.',
        achievements: ['🏛️ Orhun Abideleri\'ni (Bengü Taşlar) diktirdi', '🤝 Kardeşi Kül Tigin ile tarihe geçen kardeşlik ve devlet aklı sergiledi', '🛡️ Türk töresini ve millet bilincini yazılı abideleştirdi'],
        tags: ['Orhun Abideleri', 'Bilge Hakan', 'Töre Koruyucusu']
    },
    {
        id: 14, era: 'gokturk', name: 'Kül Tigin', dates: '684 – 731',
        dynasty: 'II. GÖKTÜRK KAĞANLIĞI (BAŞKOMUTAN)',
        icon: '🗡️', sortYear: 717,
        quote: '"Kardeşim Bilge Kağan ile gece uyumadık, gündüz oturmadık; Türk milleti için can verdik."',
        bio: 'Göktürk ordularının efsanevi başkomutanı ve kahramanı. Bilge Kağan\'ın kardeşi olan Kül Tigin, hayatı boyunca girdiği tüm savaşlarda ön safta vuruşmuş, sadakati ve cesaretiyle destanlaşmıştır.',
        achievements: ['⚔️ Göktürk ordularını zaferden zafere taşıyan başkumandan', '🛡️ İsyanları bastırıp devletin birliğini sağladı', '📜 Adına dikilen Kül Tigin Yazıtı Türk edebiyatının başyapıtıdır'],
        tags: ['Efsane Komutan', 'Sadakat Timasli', 'Bozkır Aslanı']
    },
    {
        id: 15, era: 'gokturk', name: 'Bilge Tonyukuk', dates: '646 – 726',
        dynasty: 'II. GÖKTÜRK KAĞANLIĞI (BİLGE VEZİR)',
        icon: '🧠', sortYear: 720,
        quote: '"Ben Bilge Tonyukuk; Çin ülkesinde doğdum, Türk milletini hürriyete kavuşturmak için düşündüm, kurdum, başardım."',
        bio: 'Türk tarihinin ilk veziri, ilk stratejisti ve ilk tarih yazarı. Üç kağana (İlteriş, Kapgan, Bilge) vezirlik yapmış, bilgeliği ve siyasi dehasıyla Göktürklerin kurtuluş beyni olmuştur.',
        achievements: ['🧠 Türk tarihinin ilk büyük başveziri ve strateji dehası', '📜 Kendi adına diktiği yazıtla ilk Türk anı yazarı oldu', '⚔️ Çin ordularını taktik baskınlarla alt etti'],
        tags: ['İlk Türk Veziri', 'Bozkırın Aklı', 'Büyük Düşünür']
    },

    // ══════════════════════════════════════════════════════════════════════
    // 3. UYGUR DEVLETLERİ
    // ══════════════════════════════════════════════════════════════════════
    {
        id: 16, era: 'uygur', name: 'Kutluk Bilge Kül Kağan', dates: '744 – 747',
        dynasty: 'UYGUR KAĞANLIĞI',
        icon: '🏙️', sortYear: 744,
        quote: '"Şehirler kuralım, kütüphaneler açalım; milletimiz ilimle yükselsin."',
        bio: 'Göktürk Devleti\'nin ardından Ötüken merkezli Uygur Kağanlığı\'nı kuran bilge hakan. Türklerin yerleşik hayata, şehirciliğe ve tarıma geçişinin temellerini atmıştır.',
        achievements: ['🏛️ Ötüken ve Ordubalık merkezli Uygur Devleti\'ni kurdu', '🌾 Türk bozkır kültüründe şehirleşmenin önünü açtı', '📜 Uygur alfabesi ve kültürünün doğuşunu sağladı'],
        tags: ['Uygur Kurucusu', 'Medeniyet Mimarı', 'Şehir Kuran']
    },
    {
        id: 17, era: 'uygur', name: 'Moyen-Çur (Bayançur)', dates: '747 – 759',
        dynasty: 'UYGUR KAĞANLIĞI',
        icon: '🏰', sortYear: 747,
        quote: '"Ordubalık şehrini kurduk, saraylar yükselttik; töremiz daim kalsın."',
        bio: 'Uygur Kağanlığı\'nın sınırlarını genişleten ve devleti imparatorluğa dönüştüren hükümdar. Çin\'deki An Luşan isyanını bastırarak Çin hanedanını koruma altına almış ve vergiye bağlamıştır.',
        achievements: ['🏙️ Başkent Ordubalık (Karabalgasun) şehrini kurdu', '⚔️ Şine-Usu Yazıtı\'nı diktirerek zaferlerini belgeledi', '📜 Çin İmparatorluğu\'na siyasi üstünlük kurdu'],
        tags: ['Bayançur', 'İmparatorluk Çağı', 'Ordubalık']
    },
    {
        id: 18, era: 'uygur', name: 'Bögü Kağan', dates: '759 – 779',
        dynasty: 'UYGUR KAĞANLIĞI',
        icon: '🎨', sortYear: 759,
        quote: '"Karanlıktan aydınlığa ilim ve sanat meşalesiyle yürünür."',
        bio: 'Maniheizm dinini kabul ederek Uygurlarda matbaa, kitap basımı, mimari ve fresk sanatlarının muazzam bir atılım yapmasını sağlayan kültür kağanı.',
        achievements: ['📚 Maniheizm etkisiyle matbaacılık ve çeviri faaliyetlerini başlattı', '🎨 Fresk, heykel ve yazma eserler çağını açtı', '🏛️ İpek Yolu kültür sentezini zirveye taşıdı'],
        tags: ['Kültür Devrimi', 'Matbaacı Hakan', 'Sanat Çağı']
    },

    // ══════════════════════════════════════════════════════════════════════
    // 4. KARAHANLILAR
    // ══════════════════════════════════════════════════════════════════════
    {
        id: 19, era: 'karahanli', name: 'Satuk Buğra Han', dates: '920 – 955',
        dynasty: 'KARAHANLI DEVLETİ',
        icon: '🕌', sortYear: 920,
        quote: '"İslam\'ın nuruyla Türk töresini birleştirdik, adalet kıyamete dek sürsün."',
        bio: 'İslamiyet\'i kabul eden ilk Türk hükümdarlarından biri. "Abdülkerim" adını alarak Karahanlı Devleti\'ni ilk Müslüman Türk devleti yapmış ve Türk-İslam medeniyetinin kapısını aralamıştır.',
        achievements: ['🕌 İslamiyet\'i resmi devlet dini olarak kabul etti', '🤝 Türk töresi ile İslam ahlakını kaynaştırdı', '🏰 Kaşgar ve Balasagun\'u İslam kültür merkezine dönüştürdü'],
        tags: ['İlk Müslüman Hakan', 'Kutlu Dönüşüm', 'Kaşgar Güneşi']
    },
    {
        id: 20, era: 'karahanli', name: 'Yusuf Kadir Han', dates: '1026 – 1032',
        dynasty: 'KARAHANLI DEVLETİ',
        icon: '👑', sortYear: 1026,
        quote: '"Kutadgu Bilig der ki: Memleket kılıçla alınır, adaletle tutulur."',
        bio: 'Karahanlı Devleti\'nin en güçlü döneminin hükümdarı. Gazneli Mahmud ile tarihi Maveraünnehir görüşmesini yaparak iki büyük Türk devletinin sınırlarını ve barışını belirlemiştir.',
        achievements: ['🤝 Gazneli Mahmud ile tarihi ittifak zirvesi yaptı', '📚 Kutadgu Bilig ve Divânu Lugâti\'t-Türk\'ün yeşereceği ilim zeminini hazırladı', '🏛️ Maveraünnehir\'de refahı sağladı'],
        tags: ['Büyük Karahanlı', 'Maveraünnehir', 'İlim Hamisi']
    },

    // ══════════════════════════════════════════════════════════════════════
    // 5. GAZNELİLER
    // ══════════════════════════════════════════════════════════════════════
    {
        id: 21, era: 'gazneli', name: 'Sebük Tegin', dates: '977 – 997',
        dynasty: 'GAZNELİ DEVLETİ',
        icon: '💎', sortYear: 977,
        quote: '"Adalet hükümdarın ziyneti, tebaanın sığınağıdır."',
        bio: 'Gazneli Devleti\'nin gerçek kurucusu kabul edilen büyük hükümdar. Oğlu Mahmud\'a miras bıraktığı "Pendname" (Öğütler Kitabı) ile Türk devlet yönetim felsefesine derin katkı sunmuştur.',
        achievements: ['🏛️ Gazne merkezli bağımsız Türk devletini kurdu', '📜 Devlet ahlakı üzerine "Pendname" eserini yazdı', '🛡️ Hindistan yönündeki ilk başarılı seferleri başlattı'],
        tags: ['Gazne Kurucusu', 'Pendname Müellifi', 'Adaletli Hükümdar']
    },
    {
        id: 22, era: 'gazneli', name: 'Sultan Mahmud Gaznevi', dates: '998 – 1030',
        dynasty: 'GAZNELİ DEVLETİ',
        icon: '🐘', sortYear: 998,
        quote: '"Tarihte Sultan unvanını taşıyan ilk hükümdar olmaktan onur duyarım."',
        bio: 'Tarihte "Sultan" unvanını kullanan ilk Türk hükümdarı. Hindistan\'a düzenlediği 17 büyük seferle İslamiyet\'i Hindistan alt kıtasına yaymış, sarayında Biruni gibi 400\'e yakın bilim insanını himaye etmiştir.',
        achievements: ['👑 "Sultan" unvanını alan ilk hükümdar', '🐘 Hindistan\'a 17 büyük sefer yaparak bölgenin çehresini değiştirdi', '🔬 Sarayını "Sarayımın en değerli hazinesi" dediği Biruni ile bilim merkezine dönüştürdü'],
        tags: ['İlk Sultan', '17 Hindistan Seferi', 'Bilim Hamisi']
    },

    // ══════════════════════════════════════════════════════════════════════
    // 6. BÜYÜK SELÇUKLU İMPARATORLUĞU
    // ══════════════════════════════════════════════════════════════════════
    {
        id: 23, era: 'selcuklu', name: 'Tuğrul Bey', dates: '1038 – 1063',
        dynasty: 'BÜYÜK SELÇUKLU İMPARATORLUĞU',
        icon: '🦅', sortYear: 1038,
        quote: '"Kendime bir saray yapıp da etrafında mescit yapmamaktan haya ederim."',
        bio: 'Büyük Selçuklu İmparatorluğu\'nun kurucusu. 1040 Dandanakan Savaşı ile devleti resmen kurmuş, Bağdat\'ı koruyarak Abbasi Halifesi tarafından "Doğunun ve Batının Hükümdarı" ilan edilmiştir.',
        achievements: ['⚔️ 1040 Dandanakan Savaşı ile Selçuklu Devleti\'ni kurdu', '🕌 Bağdat Seferi ile İslam aleminin liderliğini üstlendi', '👑 "Doğunun ve Batının Sultanı" unvanını kazandı'],
        tags: ['İmparatorluk Kurucusu', 'Dandanakan Zaferi', 'Doğu ve Batı Sultanı']
    },
    {
        id: 24, era: 'selcuklu', name: 'Sultan Alparslan', dates: '1064 – 1072',
        dynasty: 'BÜYÜK SELÇUKLU İMPARATORLUĞU',
        icon: '⚔️', sortYear: 1064,
        quote: '"Size öyle bir vatan aldım ki, ebediyen sizin olacaktır."',
        bio: '26 Ağustos 1071 Malazgirt Zaferi ile Anadolu\'nun kapılarını Türklere ebediyen açan efsanevi sultan. Beyaz kefen niyetine giydiği elbisesiyle 50 bin kişilik ordusuyla 200 bin kişilik Bizans ordusunu dize getirmiştir.',
        achievements: ['🏰 1071 Malazgirt Zaferi ile Anadolu\'yu Türk yurdu yaptı', '🤝 Mağlup Bizans İmparatoru Romanos Diogenes\'e örnek alicenaplık sergiledi', '🏛️ Kafkasya ve Ani kalesini fethederek "Ebü\'l-Feth" unvanını aldı'],
        tags: ['Malazgirt Fatihi', 'Anadolu\'nun Kapısı', 'Ebü\'l-Feth']
    },
    {
        id: 25, era: 'selcuklu', name: 'Sultan Melikşah', dates: '1072 – 1092',
        dynasty: 'BÜYÜK SELÇUKLU İMPARATORLUĞU',
        icon: '🌟', sortYear: 1072,
        quote: '"Devlet adaletle yönetilir; vezirim Nizamülmülk benim gözüm ve aklımdır."',
        bio: 'Büyük Selçuklu İmparatorluğu\'nu en geniş sınırlarına ulaştıran altın çağ sultanı. Veziri Nizamülmülk ile Nizamiye Medreseleri\'ni kurmuş, Ömer Hayyam\'a Celali Takvimi\'ni hazırlatmıştır.',
        achievements: ['🗺️ Sınırları Çin Seddi\'nden Akdeniz\'e, Aral\'dan Yemen\'e genişletti', '🏫 Dünyanın ilk organize üniversiteleri sayılan Nizamiye Medreselerini kurdu', '📅 Güneş yılına dayalı modern Celali Takvimi\'ni hazırlattı'],
        tags: ['Altın Çağ Sultanı', 'Nizamiye Medreseleri', 'Cihan Hükümdarı']
    },
    {
        id: 26, era: 'selcuklu', name: 'Sultan Sancar', dates: '1118 – 1157',
        dynasty: 'BÜYÜK SELÇUKLU İMPARATORLUĞU',
        icon: '🕊️', sortYear: 1118,
        quote: '"Devlet-i Aliyye-i Selçukiyye\'nin son ulu çınarıyız."',
        bio: '"Sultan-ı Azam" (En Büyük Sultan) unvanını taşıyan son büyük Selçuklu sultanı. 40 yıla yakın hüküm sürmüş, Horasan ve Merv merkezli ilim ve medeniyet hamlelerini yönetmiştir.',
        achievements: ['🏛️ Merv şehrini dünyanın en zengin kütüphaneler başkenti yaptı', '👑 40 yıla yakın hükümranlıkla "Sultan-ı Azam" olarak anıldı', '🛡️ Gazneliler ve Karahanlıları vassallıkta tuttu'],
        tags: ['Sultan-ı Azam', 'Son Ulu Çınar', 'Merv Rönesansı']
    },

    // ══════════════════════════════════════════════════════════════════════
    // 7. ANADOLU SELÇUKLU DEVLETİ & BEYLİKLER
    // ══════════════════════════════════════════════════════════════════════
    {
        id: 27, era: 'anadoluselcuklu', name: 'Kutalmışoğlu Süleyman Şah', dates: '1077 – 1086',
        dynasty: 'ANADOLU SELÇUKLU DEVLETİ',
        icon: '🏰', sortYear: 1077,
        quote: '"İznik bizim tahtımız, Marmara bizim denizimizdir."',
        bio: 'Anadolu Selçuklu Devleti\'nin kurucusu. İznik\'i fethederek başkent yapmış, Boğaziçi kıyılarına kadar uzanarak Anadolu\'da bağımsız bir Türk devletinin temellerini atmıştır.',
        achievements: ['🏛️ Anadolu Selçuklu Devleti\'ni kurdu', '🏰 İznik ve Antakya\'yı fethetti', '🛡️ Bizans\'ı vergiye bağladı'],
        tags: ['Anadolu Kurucusu', 'İznik Fatihi', 'Kutalmışoğlu']
    },
    {
        id: 28, era: 'anadoluselcuklu', name: 'I. Kılıçarslan', dates: '1092 – 1107',
        dynasty: 'ANADOLU SELÇUKLU DEVLETİ',
        icon: '⚔️', sortYear: 1092,
        quote: '"Haçlı selleri Anadolu dağlarında parçalanmaya mahkumdur."',
        bio: 'I. Haçlı Seferi\'nin devasa ordularına karşı Anadolu bozkırlarında destansı gerilla ve yıpratma savaşları veren kahraman sultan. Başkenti Konya\'ya taşıyarak devleti ayakta tutmuştur.',
        achievements: ['🛡️ Yüz binlerce kişilik I. Haçlı Seferi dalgalarını durdurdu ve yıprattı', '🏛️ Konya\'yı ebedi Türk başkenti ve kültür ocağı yaptı', '⚔️ Anadolu Türk birliğini korudu'],
        tags: ['Haçlı Bükücü', 'Konya Fatihi', 'Bozkır Aslanı']
    },
    {
        id: 29, era: 'anadoluselcuklu', name: 'II. Kılıçarslan', dates: '1155 – 1192',
        dynasty: 'ANADOLU SELÇUKLU DEVLETİ',
        icon: '🛡️', sortYear: 1155,
        quote: '"Miryokefalon ile tescillendi ki, bu topraklar ilelebet Türk yurdudur."',
        bio: '1176 Miryokefalon Zaferi ile Bizans\'ın Anadolu\'yu geri alma ümitlerini tamamen yok eden büyük hükümdar. Bu zaferle birlikte Avrupalı tarihçiler Anadolu\'ya resmen "Turchia" (Türkiye) demeye başlamıştır.',
        achievements: ['⚔️ 1176 Miryokefalon Zaferi ile Anadolu\'nun tapusunu tescil etti', '🌍 Avrupalıların Anadolu\'ya "Türkiye" demesini sağladı', '🪙 Anadolu Selçukluları adına ilk altın parayı bastırdı'],
        tags: ['Miryokefalon Fatihi', 'Tapu Tescili', 'Türkiye Mimarı']
    },
    {
        id: 30, era: 'anadoluselcuklu', name: 'I. Alaeddin Keykubad', dates: '1220 – 1237',
        dynasty: 'ANADOLU SELÇUKLU DEVLETİ',
        icon: '🕌', sortYear: 1220,
        quote: '"Adalet mülkün esası, kervansaraylar ticaretin can damarıdır."',
        bio: 'Anadolu Selçuklu Devleti\'nin en parlak hükümdarı. Alanya\'yı fethedip tersane kurmuş, Kırım\'ın Suğdak limanına deniz aşırı sefer düzenlemiş, Anadolu\'yu baştan başa kervansaraylar ve kalelerle donatmıştır.',
        achievements: ['🚢 Alanya\'yı fethedip Selçuklu denizciliğini başlattı', '🌊 Kırım Suğdak seferiyle ilk denizaşırı Türk fethini yaptı', '🏰 Kervansaraylar ağı ve devlet sigorta sistemiyle küresel ticareti canlandırdı'],
        tags: ['Altın Çağ', 'Alanya Fatihi', 'İmar ve Ticaret']
    },
    {
        id: 31, era: 'beylikler', name: 'Ertuğrul Gazi', dates: '1230 – 1281',
        dynasty: 'KAYI BOYU / OSMANLI KÖKLERİ',
        icon: '⛺', sortYear: 1230,
        quote: '"Tohum toprağa, insan töreye emanettir; sabırla korursan cihan devleti yeşerir."',
        bio: 'Kayı boyunun lideri ve Osmanlı Devleti\'nin kurucusu Osman Gazi\'nin babası. Söğüt ve Domaniç\'i kışlak ve yaylak tutarak cihan imparatorluğu olacak fidanı dikmiştir.',
        achievements: ['⛺ Kayı boyunu Söğüt ve Domaniç\'e yerleştirdi', '🤝 Şeyh Edebali ve Ahiyan-ı Rum ile sağlam manevi bağlar kurdu', '🌱 600 yıllık Osmanlı Devleti\'nin köklerini hazırladı'],
        tags: ['Kayı Beyi', 'Osmanlı\'nın Babası', 'Söğüt Ereni']
    },
    {
        id: 32, era: 'beylikler', name: 'Karamanoğlu Mehmed Bey', dates: '1277 – 1277',
        dynasty: 'KARAMANOĞULLARI BEYLİĞİ',
        icon: '🗣️', sortYear: 1277,
        quote: '"Şimden girü hiç kimesne kapuda ve divânda ve mecâlis ve seyrânda Türkî dilinden gayri dil söylemeye!"',
        bio: '13 Mayıs 1277\'de yayınladığı fermanla Türkçeyi resmi devlet dili ilan eden tarihi devlet adamı. Her yıl 13 Mayıs\'ın "Türk Dil Bayramı" olarak kutlanmasının ilham kaynağıdır.',
        achievements: ['📜 13 Mayıs 1277 Fermanı ile Türkçeyi resmi devlet dili ilan etti', '🗣️ Türk dilinin devlet yazışmalarında ve sokakta korunmasını emretti', '🇹🇷 Türk Dil Bayramı\'nın tarihi öncüsüdür'],
        tags: ['Türkçe Aşığı', 'Dil Fermanı', 'Türkçenin Muhafızı']
    },
    {
        id: 33, era: 'beylikler', name: 'Emir Timur', dates: '1370 – 1405',
        dynasty: 'TİMURLU İMPARATORLUĞU',
        icon: '👑', sortYear: 1370,
        quote: '"Dünya iki hükümdara yetmeyecek kadar küçüktür."',
        bio: 'Hiçbir meydan savaşını kaybetmemiş efsanevi fatih. Semerkant\'ı başkent yaparak bilim, astronomi ve mimarinin altın çağını başlatmış; Uluğ Bey ve Ali Kuşçu gibi dehaların yetişeceği rönesans ortamını kurmuştur.',
        achievements: ['⚔️ Hayatı boyunca katıldığı hiçbir savaşı kaybetmedi', '✨ Semerkant\'ı dünyanın en güzel ve görkemli ilim şehrine dönüştürdü', '🔭 Timurlu Rönesansı ile astronomi ve matematikte çığır açtı'],
        tags: ['Yenilmez Cihangir', 'Semerkant Şahı', 'Timurlu Rönesansı']
    },
    {
        id: 34, era: 'beylikler', name: 'Babür Şah', dates: '1526 – 1530',
        dynasty: 'BABÜR İMPARATORLUĞU (GÜRGANİYE)',
        icon: '📖', sortYear: 1526,
        quote: '"Cihan bir imtihan meydanıdır; geriye kalan hoş bir seda ve adaletle yazılmış satırlardır."',
        bio: 'Hindistan\'da 300 yılı aşkın hüküm sürecek olan Babür İmparatorluğu\'nu kuran şair, komutan ve yazar sultan. Kendi hayatını samimiyetle kaleme aldığı "Babürnâme" Türk edebiyatının başyapıtıdır.',
        achievements: ['🏰 Hindistan\'da Babür (Hint-Türk) İmparatorluğu\'nu kurdu (Tac Mahal\'in mimarları)', '📖 Edebi şaheseri "Babürnâme"yi yazdı', '🌸 Bahçeler, köprüler ve mimari eserlerle Hindistan\'ı donattı'],
        tags: ['Şair Hükümdar', 'Babürnâme', 'Hindistan Fatihi']
    },
    {
        id: 35, era: 'beylikler', name: 'Sultan Baybars', dates: '1260 – 1277',
        dynasty: 'MEMLÜK TÜRK SULTANLIĞI',
        icon: '🐆', sortYear: 1260,
        quote: '"Ayn Calut\'ta Moğol rüzgarını kıran Allah\'a hamdolsun."',
        bio: 'Kıpçak Türkü olan Memlük Sultanı. 1260 Ayn Calut Savaşı\'nda o güne kadar yenilmez kabul edilen Moğolları tarihte ilk kez durduran ve Haçlı kalıntılarını Doğu Akdeniz\'den temizleyen efsane hükümdar.',
        achievements: ['⚔️ 1260 Ayn Calut Zaferi ile Moğol istilasını durduran ilk lider', '🛡️ Haçlı prensliklerini Akdeniz kıyılarından sildi', '🐎 Kahire\'yi İslam dünyasının kalbi yaptı'],
        tags: ['Moğol Bükücü', 'Ayn Calut', 'Memlük Aslanı']
    },

    // ══════════════════════════════════════════════════════════════════════
    // 8. OSMANLI İMPARATORLUĞU — TÜM 36 PADİŞAH (1'DEN 36'YA EKSİKSİZ)
    // ══════════════════════════════════════════════════════════════════════
    {
        id: 101, era: 'osmanli', name: '1. Osman Gazi', dates: '1299 – 1326',
        dynasty: 'OSMANLI İMPARATORLUĞU — 1. Padişah',
        icon: '🏹', sortYear: 1299,
        quote: '"Ey oğul! Ananı, atanı say; bereket büyüklerle beraberdir."',
        bio: 'Osmanlı Devleti\'nin kurucusu ve hanedanın isim babası. Şeyh Edebali\'nin damadı olmuş; adalet, cömertlik ve gaza ruhu ile 6 asır sürecek imparatorluğun temeline ilk harcı koymuştur.',
        achievements: ['🏛️ 1299\'da Osmanlı Beyliği\'ni kurdu', '⚔️ 1302 Koyunhisar (Bafeus) Savaşı ile Bizans\'a ilk büyük darbeyi vurdu', '📜 Bursa kuşatmasını başlattı'],
        tags: ['Devlet Kurucusu', 'Gazi Hükümdar', 'Kayı Önderi']
    },
    {
        id: 102, era: 'osmanli', name: '2. Orhan Gazi', dates: '1326 – 1362',
        dynasty: 'OSMANLI İMPARATORLUĞU — 2. Padişah',
        icon: '🏰', sortYear: 1326,
        quote: '"Bursa fethedildi, Rumeli kapıları aralandı."',
        bio: 'Osman Gazi\'nin oğlu. Bursa\'yı fethedip başkent yapmış, Çimpe Kalesi\'ni alarak Rumeli\'ye ilk defa ayak basmış; ilk düzenli orduyu (Yaya ve Müsellem), ilk medreseyi ve divan teşkilatını kurmuştur.',
        achievements: ['🏰 Bursa, İznik ve İzmit\'i fethetti', '🌊 Çimpe Kalesi ile Rumeli\'ye (Balkanlara) ilk geçişi gerçekleştirdi', '🏫 İznik\'te ilk Osmanlı medresesini ve ilk düzenli orduyu kurdu'],
        tags: ['Bursa Fatihi', 'Rumeli Fatihi', 'Teşkilatçı Padişah']
    },
    {
        id: 103, era: 'osmanli', name: '3. I. Murad (Hüdavendigâr)', dates: '1362 – 1389',
        dynasty: 'OSMANLI İMPARATORLUĞU — 3. Padişah',
        icon: '🛡️', sortYear: 1362,
        quote: '"Allah\'ım! Beni bu gazada şehit eyle, İslam askerini muzaffer kıl!"',
        bio: 'Devleti beylikten imparatorluğa taşıyan hükümdar. Edirne\'yi fethedip başkent yaptı; Yeniçeri Ocağı\'nı ve Tımar sistemini kurdu. I. Kosova Savaşı zaferinden sonra savaş meydanını gezerken şehit düştü.',
        achievements: ['🏰 Edirne\'yi fethedip payitaht yaptı (1363)', '⚔️ Sırpsındığı, Çirmen ve I. Kosova meydan muharebelerini kazandı', '🎖️ Yeniçeri Ocağı\'nı ve Acemi Ocağı sistemini kurdu'],
        tags: ['Hüdavendigâr', 'Şehit Sultan', 'Kosova Zaferi']
    },
    {
        id: 104, era: 'osmanli', name: '4. I. Bayezid (Yıldırım Bayezid)', dates: '1389 – 1402',
        dynasty: 'OSMANLI İMPARATORLUĞU — 4. Padişah',
        icon: '⚡', sortYear: 1389,
        quote: '"Yıldırım gibi bir kaleden diğerine yetişiriz."',
        bio: 'Hızlı hareket kabiliyeti sebebiyle "Yıldırım" lakabını aldı. 1396 Niğbolu Savaşı\'nda birleşik Haçlı ordusunu yok etti; İstanbul\'u ilk defa muhasara etti ve Anadolu Türk siyasi birliğini büyük ölçüde sağladı.',
        achievements: ['⚡ 1396 Niğbolu Zaferi ile Avrupa Haçlı ordusunu imha etti', '🏰 İstanbul\'u dört kez kuşattı ve Anadolu Hisarı\'nı yaptırdı', '🕌 Bursa Ulu Camii\'ni inşa ettirdi'],
        tags: ['Yıldırım', 'Niğbolu Fatihi', 'Anadolu Birliği']
    },
    {
        id: 105, era: 'osmanli', name: '5. I. Mehmed (Çelebi Mehmed)', dates: '1413 – 1421',
        dynasty: 'OSMANLI İMPARATORLUĞU — 5. Padişah',
        icon: '🕊️', sortYear: 1413,
        quote: '"Bozulan düzeni kurduk, devleti yeniden dirilttik."',
        bio: 'Osmanlı Devleti\'nin "ikinci kurucusu" kabul edilir. Ankara Savaşı sonrası yaşanan 11 yıllık Fetret Devri kargaşasına son verip taht kavgalarını bitirmiş ve devleti tekrar ayağa kaldırmıştır.',
        achievements: ['👑 11 yıllık Fetret Devri\'ne son vererek devleti ikinci kez kurdu', '🤝 Dağılan Anadolu beyliklerini tekrar merkezi idareye bağladı', '🚢 Osmanlı tarihindeki ilk deniz savaşını Venedik\'e karşı yönetti'],
        tags: ['İkinci Kurucu', 'Çelebi', 'Birlik ve Dirlik']
    },
    {
        id: 106, era: 'osmanli', name: '6. II. Murad', dates: '1421 – 1451',
        dynasty: 'OSMANLI İMPARATORLUĞU — 6. Padişah',
        icon: '📖', sortYear: 1421,
        quote: '"Gaza yolunda nefsimizi değil, hak rızasını güderiz."',
        bio: 'Fatih Sultan Mehmed\'in babası. Tahtı iki kez oğluna bırakacak kadar feragat sahibi olan kültür ve gaza sultanı. Varna (1444) ve II. Kosova (1448) savaşlarıyla Haçlıların Balkanlardaki ümidini tamamen kırdı.',
        achievements: ['⚔️ 1444 Varna ve 1448 II. Kosova zaferleriyle Balkan hakimiyetini perçinledi', '📚 Şiire, sanata ve tasavvufa büyük destek vererek Edirne\'yi ilim merkezi yaptı', '👑 Tahtı kendi isteğiyle genç oğlu Mehmed\'e bırakan tek padişah'],
        tags: ['Koca Murad', 'Varna Zaferi', 'Alperen Sultan']
    },
    {
        id: 107, era: 'osmanli', name: '7. II. Mehmed (Fatih Sultan Mehmed)', dates: '1451 – 1481',
        dynasty: 'OSMANLI İMPARATORLUĞU — 7. Padişah',
        icon: '👑', sortYear: 1451,
        quote: '"İmkanın sınırını görmek için imkansızı denemek lazım. Ya ben İstanbul\'u alırım, ya İstanbul beni!"',
        bio: '21 yaşında 1453\'te İstanbul\'u fethederek Orta Çağ\'ı kapatıp Yeni Çağ\'ı açan cihan fatihi. Gemileri karadan yürüten askeri ve mühendislik dehası, 6 dil bilen büyük entelektüel ve kanun koyucudur.',
        achievements: ['🏰 29 Mayıs 1453\'te İstanbul\'u fethederek bir çağı kapattı, yeni çağ açtı', '📜 Fatih Kanunnamesi ile devlet teşkilatını modernleştirdi', '🗺️ Trabzon Rum, Mora, Sırbistan, Bosna ve Kırım\'ı imparatorluğa kattı', '🚢 Karadeniz\'i Türk gölü haline getirdi'],
        tags: ['Fatih', 'Çağ Açan Hükümdar', 'İstanbul Fatihi']
    },
    {
        id: 108, era: 'osmanli', name: '8. II. Bayezid (Bayezid-i Veli)', dates: '1481 – 1512',
        dynasty: 'OSMANLI İMPARATORLUĞU — 8. Padişah',
        icon: '🕊️', sortYear: 1481,
        quote: '"Merhamet devletin canıdır; mazluma kucak açmak şerefimizdir."',
        bio: 'Fatih\'in oğlu; takvası ve barışçıl siyaseti sebebiyle "Veli" olarak anıldı. İspanya\'da engizisyon zulmü gören yüz binlerce Musevi ve Müslümanı Osmanlı gemileriyle kurtarıp Selanik ve İstanbul\'a yerleştirmiştir.',
        achievements: ['🚢 1492\'de İspanya\'dan kaçan mazlum Musevi ve Müslümanları kurtardı', '🏥 Edirne\'de musiki ile akıl hastalarını tedavi eden tarihi Şifahaneyi kurdu', '🛡️ Cem Sultan olayı krizini diplomasiyle yönetti'],
        tags: ['Bayezid-i Veli', 'İnsani Diplomasi', 'Edirne Şifahanesi']
    },
    {
        id: 109, era: 'osmanli', name: '9. I. Selim (Yavuz Sultan Selim)', dates: '1512 – 1520',
        dynasty: 'OSMANLI İMPARATORLUĞU — 9. Padişah',
        icon: '⚡', sortYear: 1512,
        quote: '"Cesaret insanı zafere, kararsızlık tehlikeye, korkaklık ölüme götürür."',
        bio: '8 yıllık saltanatına 80 yıllık fetihler sığdıran azametli cihan hükümdarı. Çaldıran, Mercidabık ve Ridaniye zaferleriyle Memlük Devleti\'ne son vermiş; kutsal emanetleri İstanbul\'a getirerek ilk Osmanlı Halifesi olmuştur.',
        achievements: ['🕋 İlk Osmanlı Halifesi oldu ve Kutsal Emanetleri İstanbul\'a getirdi', '⚔️ Çaldıran (1514) ve Ridaniye (1517) zaferleriyle devleti 2.5 kat büyüttü', '💰 Osmanlı hazinesini ağzına kadar altınla doldurup kendi mührüyle mühürletti'],
        tags: ['Yavuz', 'İlk Halife', 'Hazineyi Dolduran']
    },
    {
        id: 110, era: 'osmanli', name: '10. I. Süleyman (Kanuni Sultan Süleyman)', dates: '1520 – 1566',
        dynasty: 'OSMANLI İMPARATORLUĞU — 10. Padişah',
        icon: '⚖️', sortYear: 1520,
        quote: '"Halk içinde muteber bir nesne yok devlet gibi, olmaya devlet cihanda bir nefes sıhhat gibi."',
        bio: 'Osmanlı tahtında 46 yıl ile en uzun süre kalan cihan padişahı. Batı\'da "Muhteşem Süleyman", Doğu\'da adaletli kanunları sebebiyle "Kanuni" olarak anılır. İmparatorluğu üç kıtada siyasi, askeri ve kültürel zirveye ulaştırmıştır.',
        achievements: ['⚖️ Kanunname-i Âl-i Osman ile adaleti kurumsallaştırdı', '⚔️ 1526 Mohaç Zaferi ile Macar Krallığı\'nı 2 saatte tarihten sildi', '🚢 Barbaros Hayreddin Paşa ile Preveze Zaferi\'ni kazanıp Akdeniz\'i Türk gölü yaptı', '🕌 Mimar Sinan\'a Süleymaniye Külliyesi\'ni inşa ettirdi'],
        tags: ['Muhteşem Süleyman', 'Kanuni', 'İmparatorluğun Zirvesi']
    },
    {
        id: 111, era: 'osmanli', name: '11. II. Selim (Sarı Selim)', dates: '1566 – 1574',
        dynasty: 'OSMANLI İMPARATORLUĞU — 11. Padişah',
        icon: '🕌', sortYear: 1566,
        quote: '"Mimar Sinan\'ın eliyle Edirne\'de göğe yükselen Selimiye, şükrümüzün nişanesidir."',
        bio: 'Kanuni\'nin oğlu. Sadrazam Sokullu Mehmed Paşa ile devleti yönetti; Kıbrıs adasını fethederek Doğu Akdeniz ticaretini emniyete aldı. Mimar Sinan\'a başyapıtı Selimiye Camii\'ni yaptırdı.',
        achievements: ['🏝️ 1571\'de stratejik Kıbrıs adasını fethetti', '🕌 Mimar Sinan\'ın "Ustalık eserim" dediği Edirne Selimiye Camii\'ni yaptırdı', '🌊 Tunus\'u İspanyollardan kesin olarak geri aldı'],
        tags: ['Selimiye Hamisi', 'Kıbrıs Fatihi', 'Sokullu Dönemi']
    },
    {
        id: 112, era: 'osmanli', name: '12. III. Murad', dates: '1574 – 1595',
        dynasty: 'OSMANLI İMPARATORLUĞU — 12. Padişah',
        icon: '📜', sortYear: 1574,
        quote: '"Uyan ey gözlerim gafletten uyan, uyan uykusu çok gözlerim uyan."',
        bio: 'Sanata, edebiyata ve tasavvufa düşkün padişah. Yazdığı ilahilerle divan edebiyatında "Muradî" mahlasıyla anıldı. Döneminde Osmanlı Devleti doğuda Hazar Denizi\'ne kadar genişleyerek en geniş sınırlarına ulaştı.',
        achievements: ['🗺️ Osmanlı sınırları doğuda Hazar Denizi ve Kafkasya\'ya kadar genişledi', '🔭 Takiyüddin\'in İstanbul Rasathanesi\'ni kurmasına öncülük etti', '✍️ "Muradî" mahlasıyla derin tasavvufi şiirler ve ilahiler yazdı'],
        tags: ['Şair Sultan', 'Hazar Seferleri', 'Muradî']
    },
    {
        id: 113, era: 'osmanli', name: '13. III. Mehmed', dates: '1595 – 1603',
        dynasty: 'OSMANLI İMPARATORLUĞU — 13. Padişah',
        icon: '⚔️', sortYear: 1595,
        quote: '"Ecdadımız gibi ordunun başında sefere çıkmak boynumuzun borcudur."',
        bio: 'Kanuni\'den sonra ordunun başında sefere çıkan ilk padişah. 1596 Haçova Meydan Muharebesi\'nde Avusturya ve müttefik ordularını mağlup etti; Eğri Kalesi fethi sebebiyle "Eğri Fatihi" unvanını aldı.',
        achievements: ['🏰 Eğri Kalesi\'ni fethedip "Eğri Fatihi" unvanını kazandı', '⚔️ 1596 Haçova Zaferi ile büyük Avusturya-Haçlı ordusunu yendi', '🎖️ Padişahların bizzat ordu başında sefere çıkma geleneğini canlandırdı'],
        tags: ['Eğri Fatihi', 'Haçova Zaferi', 'Gazi Padişah']
    },
    {
        id: 114, era: 'osmanli', name: '14. I. Ahmed', dates: '1603 – 1617',
        dynasty: 'OSMANLI İMPARATORLUĞU — 14. Padişah',
        icon: '🕌', sortYear: 1603,
        quote: '"Bahtî mahlasıyla söylerim: Kuluna merhamet eyle yarabbi."',
        bio: 'İstanbul\'un simgelerinden Sultanahmet Camii\'ni (Blue Mosque) Mimar Sedefkar Mehmed Ağa\'ya inşa ettiren padişah. Taht verasetinde kardeş katlini önleyen "Ekber ve Erşed" (en yaşlı ve olgun hanedan üyesi) sistemini getirdi.',
        achievements: ['🕌 6 minareli muazzam Sultanahmet Camii\'ni inşa ettirdi', '📜 Kardeş katlini bitiren "Ekber ve Erşed" veraset sistemini getirdi', '🕋 Kabe örtülerini yenileyip kutsal topraklara büyük hizmetler sundu'],
        tags: ['Sultanahmet Camii', 'Ekber ve Erşed', 'Bahtî']
    },
    {
        id: 115, era: 'osmanli', name: '15. I. Mustafa', dates: '1617 – 1618, 1622 – 1623',
        dynasty: 'OSMANLI İMPARATORLUĞU — 15. Padişah',
        icon: '🕊️', sortYear: 1617,
        quote: '"Dünya malında gözümüz yoktur."',
        bio: 'Ekber ve Erşed sistemiyle tahta geçen ilk padişah. Dervişmeşrep ve zahit bir kişiliğe sahipti; devlet işlerinden uzak durmayı tercih ederek iki kez tahttan feragat etmiştir.',
        achievements: ['📜 Ekber ve Erşed sistemi uyarınca tahta çıkan ilk sultan oldu', '🕊️ Şiddetten uzak, zahit ve tasavvufi bir hayat sürdü'],
        tags: ['Ekber Sistemi', 'Zahit Padişah', 'Sükunet']
    },
    {
        id: 116, era: 'osmanli', name: '16. II. Osman (Genç Osman)', dates: '1618 – 1622',
        dynasty: 'OSMANLI İMPARATORLUĞU — 16. Padişah',
        icon: '🌱', sortYear: 1618,
        quote: '"Gözümden dökülen yaşlar vatanın ve milletin ıstırabındandır."',
        bio: 'Osmanlı tarihindeki ilk büyük reformcu padişah. Genç yaşta Yeniçeri Ocağı\'nı kaldırıp disiplinli milli bir ordu kurmayı, başkenti Anadolu\'ya taşımayı ve saray içi taassubu kırmayı planladı; feci bir isyanla şehit edildi.',
        achievements: ['🌱 Osmanlı\'da ilk köklü reform ve modernleşme hareketini başlattı', '⚔️ Hotin Seferi\'ne bizzat katıldı', '💡 Saray dışından evlenerek saray vesayetini kırmaya çalıştı'],
        tags: ['Genç Osman', 'İlk Reformcu', 'Şehit Padişah']
    },
    {
        id: 117, era: 'osmanli', name: '17. IV. Murad', dates: '1623 – 1640',
        dynasty: 'OSMANLI İMPARATORLUĞU — 17. Padişah',
        icon: '⚡', sortYear: 1623,
        quote: '"Bağdat\'ı almaya çalışmak, Bağdat\'ın kendisinden daha mı güzeldi ne!"',
        bio: 'Fiziki kuvveti, sert disiplini ve sarsılmaz iradesiyle anılan güçlü padişah. İstanbul\'da asayişi tesis etmiş, tütün ve gece sokağa çıkma yasaklarıyla düzeni sağlamış; Revan ve Bağdat\'ı fethederek "Bağdat Fatihi" olmuştur.',
        achievements: ['🏰 1638\'de Bağdat\'ı fethederek "Bağdat Fatihi" unvanını kazandı', '📜 Kasr-ı Şirin Antlaşması ile günümüz Türkiye-İran sınırını belirledi', '🛡️ Şiddetli disiplinle iç isyanları bastırıp devlet otoritesini yeniden kurdu'],
        tags: ['Bağdat Fatihi', 'Demir İrade', 'Kasr-ı Şirin']
    },
    {
        id: 118, era: 'osmanli', name: '18. İbrahim (Sultan İbrahim)', dates: '1640 – 1648',
        dynasty: 'OSMANLI İMPARATORLUĞU — 18. Padişah',
        icon: '🌊', sortYear: 1640,
        quote: '"Girit Adası Akdeniz\'in kilididir, fethi başlasın."',
        bio: 'IV. Murad\'ın kardeşi. Saltanatında 24 yıl sürecek olan tarihi Girit Seferi başlatılmış; Hanya Kalesi fethedilerek Venedik\'in Doğu Akdeniz\'deki hegemonyasına son darbe indirilmiştir.',
        achievements: ['🚢 Tarihi Girit Seferi\'ni başlattı ve Hanya\'yı fethettirdi', '💰 Mali dengeleri korumak için yeni sikke reformları yaptırdı', '👑 Hanedanın devamını sağlayan şehzadelerin babası oldu'],
        tags: ['Girit Seferi', 'Hanya Fethi', 'Hanedan Koruyucusu']
    },
    {
        id: 119, era: 'osmanli', name: '19. IV. Mehmed (Avcı Mehmed)', dates: '1648 – 1687',
        dynasty: 'OSMANLI İMPARATORLUĞU — 19. Padişah',
        icon: '🏹', sortYear: 1648,
        quote: '"Köprülüler ile devlet yeniden can buldu."',
        bio: 'Tahta 7 yaşında çıktı ve 39 yıl hüküm sürdü. Sadrazamlığa Köprülü Mehmed Paşa ve Fazıl Ahmed Paşa\'yı getirerek "Köprülüler Devri" istikrarını sağladı. Girit\'in fethi tamamlandı, Podolya ve Uyvar fethedildi.',
        achievements: ['🏰 24 yıllık Girit fethini (Kandiye) başarıyla tamamladı', '🗺️ Uyvar ve Kamaniçe\'yi fethederek Osmanlı\'yı Avrupa\'da en geniş sınırlarına ulaştırdı', '⚖️ Köprülüler ailesiyle güçlü bir liyakat dönemi kurdu'],
        tags: ['Avcı Mehmed', 'Köprülüler Devri', 'Girit Zaferi']
    },
    {
        id: 120, era: 'osmanli', name: '20. II. Süleyman', dates: '1687 – 1691',
        dynasty: 'OSMANLI İMPARATORLUĞU — 20. Padişah',
        icon: '🛡️', sortYear: 1687,
        quote: '"Gaza meydanında askerimizle omuz omuza dururuz."',
        bio: '40 yıl sarayda ilimle meşgul olduktan sonra tahta geçti. Sadrazamlığa Fazıl Mustafa Paşa\'yı getirerek Belgrad\'ı Avusturya\'dan geri almış ve orduyu toparlamıştır.',
        achievements: ['🏰 Stratejik Belgrad Kalesi\'ni Avusturya\'dan geri fethetti', '🪙 Sikke reformu yaparak piyasayı rahatlattı', '🛡️ Kutsal İttifak karşısında dirençli savunma hattı kurdu'],
        tags: ['Belgrad Gazisi', 'Fazıl Mustafa Paşa', 'Sabır Sultanı']
    },
    {
        id: 121, era: 'osmanli', name: '21. II. Ahmed', dates: '1691 – 1695',
        dynasty: 'OSMANLI İMPARATORLUĞU — 21. Padişah',
        icon: '📜', sortYear: 1691,
        quote: '"Hattatlığımız ve dualarımız milletimizin selameti içindir."',
        bio: 'Hattatlıkta ve divan edebiyatında mahir, ince ruhlu bir padişah. Dört yıllık saltanatı boyunca Kutsal İttifak savaşlarına karşı orduyu ve maliyeyi ayakta tutmaya gayret etti.',
        achievements: ['✍️ Usta bir hattat olarak Kur\'an-ı Kerimler yazdı', '🛡️ Salankamen Savaşı sonrası sınır hatlarını tahkim etti', '💰 Bütçe düzenlemeleri gerçekleştirdi'],
        tags: ['Hattat Padişah', 'Salankamen Devri', 'Derviş Ruhlu']
    },
    {
        id: 122, era: 'osmanli', name: '22. II. Mustafa', dates: '1695 – 1703',
        dynasty: 'OSMANLI İMPARATORLUĞU — 22. Padişah',
        icon: '⚔️', sortYear: 1695,
        quote: '"Gerektiğinde kanımızı bu vatan için dökmekten kaçınmayız."',
        bio: 'Ordu başında bizzat 3 kez Avusturya seferine çıkan cesur padişah. 1699 Karlofça Antlaşması ile sonuçlanan zorlu dönemde devletin toparlanması için canla başla çalıştı.',
        achievements: ['⚔️ Bizzat ordunun başında üç büyük Avusturya seferi icra etti', '⚓ Amcazade Hüseyin Paşa ile donanmayı modernleştirdi', '📜 Karlofça sonrası diplomasi çağını başlattı'],
        tags: ['Sefer Sultanı', 'Karlofça Dönemi', 'Cesur İrade']
    },
    {
        id: 123, era: 'osmanli', name: '23. III. Ahmed', dates: '1703 – 1730',
        dynasty: 'OSMANLI İMPARATORLUĞU — 23. Padişah',
        icon: '🌷', sortYear: 1703,
        quote: '"Sanat ve imarla mamur bir payitaht, medeniyetin aynasıdır."',
        bio: 'Tarihe "Lale Devri" olarak geçen barış, sanat ve imar döneminin padişahı. Sadrazam Nevşehirli Damat İbrahim Paşa ile ilk matbaayı (İbrahim Müteferrika), çiçek aşısını ve tulumbacılar ocağını kurdurdu.',
        achievements: ['📚 İbrahim Müteferrika ile Osmanlı\'da ilk Türk matbaasını açtırdı', '⛲ Ünlü III. Ahmed Çeşmesi gibi şaheser mimari eserler kazandırdı', '💉 Çiçek aşısını uygulattı ve ilk itfaiye teşkilatını (Tulumbacılar) kurdu', '⚔️ 1711 Prut Zaferi ile Azak kalesini Ruslardan geri aldı'],
        tags: ['Lale Devri', 'İlk Matbaa', 'İmar ve Sanat']
    },
    {
        id: 124, era: 'osmanli', name: '24. I. Mahmud', dates: '1730 – 1754',
        dynasty: 'OSMANLI İMPARATORLUĞU — 24. Padişah',
        icon: '📚', sortYear: 1730,
        quote: '"Avrupa ilmini hendese ile birleştirip ordumuzu güçlendireceğiz."',
        bio: 'Patrona Halil isyanını bastırıp istikrarı sağladı. Osmanlı ordusunda Batı tarzı ilk askeri okulu (Hendesehane / Humbaracı Ocağı) Kont de Bonneval ile kurdu; 1739 Belgrad Antlaşması ile Osmanlı\'nın 18. yüzyıldaki en karlı barışını imzaladı.',
        achievements: ['🏰 1739 Belgrad Antlaşması ile Belgrad\'ı kalıcı olarak geri aldı', '📐 İlk Batı tarzı askeri mühendislik okulu Hendesehane\'yi kurdu', '📚 Ayasofya, Fatih ve Galatasaray kütüphanelerini inşa ettirdi'],
        tags: ['Hendesehane', 'Belgrad Zaferi', 'Kütüphaneler Sultanı']
    },
    {
        id: 125, era: 'osmanli', name: '25. III. Osman', dates: '1754 – 1757',
        dynasty: 'OSMANLI İMPARATORLUĞU — 25. Padişah',
        icon: '🕌', sortYear: 1754,
        quote: '"Nuruosmaniye Camii İslam mimarisinin parlayan nurudur."',
        bio: 'Barok üslubunun ilk anıtsal örneği olan Nuruosmaniye Camii\'ni tamamlayan padişah. Halkın arasına tebdil-i kıyafetle karışarak adaleti bizzat denetlemesiyle tanındı.',
        achievements: ['🕌 İstanbul\'un ilk barok başyapıtı Nuruosmaniye Camii\'ni tamamladı', '🚢 Ahırkapı Feneri\'ni inşa ettirerek deniz feneri ağını başlattı'],
        tags: ['Nuruosmaniye', 'Adalet Denetimi', 'Barok Mimari']
    },
    {
        id: 126, era: 'osmanli', name: '26. III. Mustafa', dates: '1757 – 1774',
        dynasty: 'OSMANLI İMPARATORLUĞU — 26. Padişah',
        icon: '📐', sortYear: 1757,
        quote: '"Yıkılsa alem, adalet ayakta kalmalıdır."',
        bio: 'Mühendishane-i Bahr-i Hümayun\'un (Deniz Harp Okulu ve İTÜ\'nün temeli) temellerini atan vizyoner hükümdar. Laleli Camii\'ni yaptırmış, maliyeyi ıslah etmiş ve modern topçuluk reformlarını başlatmıştır.',
        achievements: ['⚓ Mühendishane-i Bahr-i Hümayun\'un temelini attı (Bugünkü İTÜ ve Deniz Harp Okulu)', '🕌 Muhteşem Laleli Camii ve Külliyesi\'ni inşa ettirdi', '🪙 Esham (iç borçlanma senedi) sistemini kurarak maliyeyi rahatlattı'],
        tags: ['Mühendishane', 'Laleli Camii', 'İlim Hamisi']
    },
    {
        id: 127, era: 'osmanli', name: '27. I. Abdülhamid', dates: '1774 – 1789',
        dynasty: 'OSMANLI İMPARATORLUĞU — 27. Padişah',
        icon: '🕊️', sortYear: 1774,
        quote: '"Milletimin derdi benim derdimdir, acısı yüreğimi yakar."',
        bio: 'Merhameti ve halk sevgisiyle tanınan padişah. Yeniçerilerin esame ticaretini yasakladı; İstihkam Okulu\'nu açtı. 1788 Özi Kalesi faciası haberini alınca kederinden felç geçirerek vefat etmiştir.',
        achievements: ['🏫 Yerli ve yabancı uzmanlarla İstihkam Okulu\'nu kurdu', '🛡️ Yeniçeri esame alım-satım yolsuzluğuna son verdi', '📜 Beylerbeyi Camii ve Emirgan Camii\'ni inşa ettirdi'],
        tags: ['Merhametli Sultan', 'İstihkam Mektebi', 'Halk Adamı']
    },
    {
        id: 128, era: 'osmanli', name: '28. III. Selim', dates: '1789 – 1807',
        dynasty: 'OSMANLI İMPARATORLUĞU — 28. Padişah',
        icon: '🎵', sortYear: 1789,
        quote: '"Nizam-ı Cedid ile devlet-i aliyyeyi yeniden ihya edeceğiz."',
        bio: 'Büyük bestekar ve reformcu padişah. Türk musikisinde Suzidilara makamını icat etti. "Nizam-ı Cedid" hareketiyle Batı tarzında modern bir ordu kurdu, Avrupa başkentlerinde daimi elçilikler açtı; Kabakçı Mustafa isyanıyla tahttan indirildi.',
        achievements: ['🎖️ Modern Nizam-ı Cedid ordusunu ve İrad-ı Cedid hazinesini kurdu', '🎼 Suzidilara makamını keşfedip onlarca klasik müzik şaheseri besteledi', '🌍 Londra, Paris, Viyana ve Berlin\'de ilk daimi elçilikleri açtı', '📐 Mühendishane-i Berr-i Hümayun\'u (Kara Harp Okulu) kurdu'],
        tags: ['Nizam-ı Cedid', 'Suzidilara', 'Büyük Reformcu']
    },
    {
        id: 129, era: 'osmanli', name: '29. IV. Mustafa', dates: '1807 – 1808',
        dynasty: 'OSMANLI İMPARATORLUĞU — 29. Padişah',
        icon: '📜', sortYear: 1807,
        quote: '"Taht kaderin cilvesidir."',
        bio: 'Kabakçı Mustafa isyanı sonrası 14 ay tahtta kaldı. Alemdar Mustafa Paşa\'nın ordusuyla İstanbul\'a gelmesi üzerine tahttan indirildi.',
        achievements: ['📜 Kısa saltanatında Rusya ile ateşkes müzakereleri yürütüldü'],
        tags: ['Kısa Saltanat', 'Geçiş Dönemi', 'Kabakçı İsyanı']
    },
    {
        id: 130, era: 'osmanli', name: '30. II. Mahmud', dates: '1808 – 1839',
        dynasty: 'OSMANLI İMPARATORLUĞU — 30. Padişah',
        icon: '🎩', sortYear: 1808,
        quote: '"Ben tebaamdan Müslümanı camide, Hristiyanı kilisede, Museviyi havrada görmek isterim."',
        bio: 'Osmanlı modernleşmesinin mimarı. 1826\'da bozulmuş olan Yeniçeri Ocağı\'nı kaldırarak (Vaka-i Hayriye) Asakir-i Mansure-i Muhammediye ordusunu kurdu. Bakanlıkları (Nezaretleri), ilk resmi gazeteyi (Takvim-i Vekayi), ilk nüfus sayımını ve modern bürokrasiyi kurdu.',
        achievements: ['⚡ 1826 Vaka-i Hayriye ile Yeniçeri Ocağı\'nı kaldırdı', '🏛️ Divan-ı Hümayun yerine modern Bakanlıkları (Nezaretler) kurdu', '📰 İlk resmi Türkçe gazete "Takvim-i Vekayi"yi çıkarttı', '📮 İlk modern Posta Teşkilatı ve Mekteb-i Tıbbiye-i Şahane\'yi kurdu'],
        tags: ['Vaka-i Hayriye', 'Modernleşme Mimarı', 'İnkılapçı Padişah']
    },
    {
        id: 131, era: 'osmanli', name: '31. Abdülmecid', dates: '1839 – 1861',
        dynasty: 'OSMANLI İMPARATORLUĞU — 31. Padişah',
        icon: '📜', sortYear: 1839,
        quote: '"Kanun önünde bütün tebaamız din ve ırk ayrımı olmaksızın eşittir."',
        bio: 'Tanzimat Fermanı (1839) ve Islahat Fermanı (1856) ile Osmanlı hukuk devleti anlayışını başlatan padişah. Dolmabahçe Sarayı\'nı, Ortaköy Camii\'ni yaptırdı; ilk kağıt parayı (Kaime), ilk demiryolunu ve telgraf hattını hizmete soktu.',
        achievements: ['📜 1839 Tanzimat Fermanı ile kanunun üstünlüğü ilkesini getirdi', '🏰 Muhteşem Dolmabahçe Sarayı ve Ortaköy Camii\'ni inşa ettirdi', '🚂 İlk demiryolu hattı (İzmir-Aydın) ve telgraf şebekesini kurdu', '💵 İlk Osmanlı kağıt parası Kaime\'yi bastırdı'],
        tags: ['Tanzimat Sultanı', 'Dolmabahçe', 'Hukuk Devleti']
    },
    {
        id: 132, era: 'osmanli', name: '32. Abdülaziz', dates: '1861 – 1876',
        dynasty: 'OSMANLI İMPARATORLUĞU — 32. Padişah',
        icon: '⚓', sortYear: 1861,
        quote: '"Güçlü bir donanma devletin Akdeniz\'deki mührüdür."',
        bio: 'Avrupa başkentlerine barışçıl seyahat düzenleyen ilk ve tek Osmanlı padişahı. Osmanlı donanmasını dünyanın 3. büyük zırhlı donanması haline getirdi. Beylerbeyi ve Çırağan Saraylarını yaptırdı; Şura-yı Devlet (Danıştay) ve modern yargıtay temellerini attı.',
        achievements: ['⚓ Osmanlı donanmasını dünyanın en büyük 3. zırhlı filosu yaptı', '🌍 Avrupa\'ya resmi dostluk seyahatine çıkan ilk padişah oldu', '🏰 Beylerbeyi ve Çırağan saraylarını inşa ettirdi', '⚖️ Şura-yı Devlet (Danıştay) ve Mecelle\'nin hazırlanmasını başlattı'],
        tags: ['Donanma Sultanı', 'Avrupa Seyahati', 'Çırağan']
    },
    {
        id: 133, era: 'osmanli', name: '33. V. Murad', dates: '1876 – 1876',
        dynasty: 'OSMANLI İMPARATORLUĞU — 33. Padişah',
        icon: '🎹', sortYear: 1876,
        quote: '"Müzik ve hürriyet ruhun gıdasıdır."',
        bio: 'Osmanlı tahtında 93 gün ile en kısa süre kalan padişah. İleri derecede Fransızca bilen, piyano çalıp valsler ve marşlar besteleyen bir entelektüeldi.',
        achievements: ['🎼 Piyano eserleri ve klasik batı müziği besteleri üretti', '🕊️ Aydınlar ve Genç Osmanlılar ile yakın fikri temas kurdu'],
        tags: ['En Kısa Saltanat', 'Piyano Virtüözü', 'Aydın Sultan']
    },
    {
        id: 134, era: 'osmanli', name: '34. II. Abdülhamid', dates: '1876 – 1909',
        dynasty: 'OSMANLI İMPARATORLUĞU — 34. Padişah',
        icon: '🚂', sortYear: 1876,
        quote: '"Tarih değil, hatalar tekerrür eder. Hak arayan varsa hakkını verin, baş kaldıran varsa başını kesin."',
        bio: '33 yıl boyunca devleti büyük bir diplomasi dengesi ve eğitim-demiryolu hamlesiyle yöneten padişah. I. Meşrutiyet\'i ve Kanun-i Esasi\'yi ilan etti. Hicaz Demiryolu\'nu inşa ettirdi; Darülaceze, Dârülfünun, yüzlerce lise ve fakülte açarak Türkiye\'nin kurucu kadrolarını yetiştirdi.',
        achievements: ['🚂 Şam-Medine arası efsanevi Hicaz Demiryolu\'nu inşa ettirdi', '🏫 Yüzlerce idadi, rüştiye, Mülkiye ve Darülfünun (İstanbul Üniversitesi) açtı', '🏥 Darülaceze, Şişli Etfal Hastanesi ve Hamidiye Su ağını kurdu', '📜 İlk Türk anayasası Kanun-i Esasi\'yi (1876) ilan etti'],
        tags: ['Ulu Hakan', 'Hicaz Demiryolu', 'Eğitim Hamlesi']
    },
    {
        id: 135, era: 'osmanli', name: '35. V. Mehmed Reşad', dates: '1909 – 1918',
        dynasty: 'OSMANLI İMPARATORLUĞU — 35. Padişah',
        icon: '🕊️', sortYear: 1909,
        quote: '"Çanakkale şehitlerimizin kanı bu aziz vatanın tapusudur."',
        bio: 'II. Meşrutiyet döneminde anayasal monarşiyle tahta geçti. Trablusgarp, Balkan Savaşları ve I. Dünya Savaşı (Çanakkale Zaferi, Kut\'ül Amare) yıllarında hüküm sürdü. Çanakkale gazileri için yazdığı şiirler ve samimiyetiyle tanındı.',
        achievements: ['🛡️ 18 Mart 1915 Çanakkale Zaferi ve Kut\'ül Amare zaferleri döneminde tahtta bulundu', '📜 Meclis-i Mebusan ile meşruti idareyi yürüttü', '🕌 Rumeli seyahatine çıkarak Balkanlardaki Müslümanları kucakladı'],
        tags: ['Çanakkale Dönemi', 'Meşrutiyet', 'Halife Sultan']
    },
    {
        id: 136, era: 'osmanli', name: '36. VI. Mehmed (Vahdettin)', dates: '1918 – 1922',
        dynasty: 'OSMANLI İMPARATORLUĞU — 36. Padişah (Son Padişah)',
        icon: '📜', sortYear: 1918,
        quote: '"Milletin istiklalini yine milletin azim ve kararı kurtaracaktır."',
        bio: 'Osmanlı İmparatorluğu\'nun 36. ve son padişahı. Mondros Mütarekesi sonrası işgal altındaki payitahtta tahta geçti. 1919\'da Mustafa Kemal Paşa\'yı 9. Ordu Müfettişi olarak geniş yetkilerle Samsun\'a gönderen fermanı imzaladı. 1 Kasım 1922\'de saltanatın kaldırılmasıyla son buldu.',
        achievements: ['🚢 Mustafa Kemal Paşa\'yı Anadolu\'ya müfettiş olarak gönderen resmi iradeyi imzaladı', '📜 623 yıllık Osmanlı hanedanının son padişahı olarak tarihteki yerini aldı'],
        tags: ['Son Padişah', 'Mütareke Yılları', 'Osmanlı\'nın Sonu']
    },

    // ══════════════════════════════════════════════════════════════════════
    // 9. TÜRKİYE CUMHURİYETİ — TÜM 12 CUMHURBAŞKANI (1'DEN 12'YE EKSİKSİZ)
    // ══════════════════════════════════════════════════════════════════════
    {
        id: 201, era: 'cumhuriyet', name: '1. Mustafa Kemal Atatürk', dates: '1923 – 1938',
        dynasty: 'TÜRKİYE CUMHURİYETİ — 1. Cumhurbaşkanı (Kurucu Lider)',
        icon: '🇹🇷', sortYear: 1923,
        quote: '"Egemenlik, kayıtsız şartsız milletindir. Ne mutlu Türk\'üm diyene!"',
        bio: 'Türkiye Cumhuriyeti\'nin kurucusu, kurtarıcısı ve ilk Cumhurbaşkanı. Çanakkale kahramanı, Kurtuluş Savaşı\'nın Başkomutanı, dahi mareşal ve yüzyılın en büyük devlet adamı. Harf inkılabı, cumhuriyetin ilanı, laiklik, kadın hakları ve sanayileşme hamleleriyle modern Türkiye\'yi inşa etmiştir.',
        achievements: ['🇹🇷 29 Ekim 1923\'te Türkiye Cumhuriyeti\'ni kurdu', '⚔️ Kurtuluş Savaşı\'nı Başkomutan olarak zafere ulaştırdı (Sakarya, Başkomutanlık Meydan Muharebesi)', '📚 Harf İnkılabı, Türk Tarih ve Dil Kurumları, Tevhid-i Tedrisat ile eğitim devrimi yaptı', '🗳️ Kadınlara seçme ve seçilme hakkını Avrupa\'dan çok önce tanıdı', '🕊️ "Yurtta sulh, cihanda sulh" ilkesiyle dünya barışına rehber oldu'],
        tags: ['Gazi Mustafa Kemal', 'Ulu Önder', 'Ebedi Başkomutan', 'Cumhuriyet Kurucusu']
    },
    {
        id: 202, era: 'cumhuriyet', name: '2. İsmet İnönü', dates: '1938 – 1950',
        dynasty: 'TÜRKİYE CUMHURİYETİ — 2. Cumhurbaşkanı',
        icon: '🎖️', sortYear: 1938,
        quote: '"Bir memlekette namuslular da en az namussuzlar kadar cesur olmalıdır."',
        bio: 'Kurtuluş Savaşı\'nın Batı Cephesi Komutanı, I. ve II. İnönü zaferlerinin muzaffer generali, Lozan Barış Antlaşması\'nın tarihi başdelegesi. II. Dünya Savaşı\'nın yıkımından Türkiye\'yi ustaca diplomasiyle korumuş ve 1946-1950\'de çok partili demokratik hayata geçişi bizzat sağlamıştır.',
        achievements: ['📜 1923 Lozan Barış Antlaşması\'nı imzalayarak Türkiye\'nin bağımsızlığını tescil ettirdi', '🛡️ II. Dünya Savaşı\'nda Türkiye\'yi harbe sokmayarak yüz binlerce canı kurtardı', '🗳️ 1950 seçimleriyle iktidarı barışçıl devrederek Türk demokrasisini taçlandırdı', '⚔️ I. ve II. İnönü Muharebeleri kahramanı'],
        tags: ['Milli Şef', 'Lozan Fatihi', 'Demokrasiye Geçiş', 'İnönü Kahramanı']
    },
    {
        id: 203, era: 'cumhuriyet', name: '3. Celâl Bayar', dates: '1950 – 1960',
        dynasty: 'TÜRKİYE CUMHURİYETİ — 3. Cumhurbaşkanı',
        icon: '👔', sortYear: 1950,
        quote: '"Bu millet hizmet edenleri asla unutmaz."',
        bio: 'Milli Mücadele\'de "Galip Hoca" takma adıyla Ege direnişini örgütleyen sivil kahraman. Türkiye İş Bankası\'nın ilk genel müdürü ve kurucusu, Atatürk\'ün son başbakanı ve Demokrat Parti ile 1950\'de halkın oylarıyla seçilen ilk sivil cumhurbaşkanı.',
        achievements: ['🏦 Türkiye İş Bankası\'nın kurucu ilk genel müdürlüğünü yaptı', '🤠 "Galip Hoca" kimliğiyle Kuva-yi Milliye direnişini organize etti', '🗳️ Türkiye\'nin halk oyuyla iktidara gelen ilk sivil cumhurbaşkanı oldu', '🌐 Türkiye\'nin NATO\'ya üyeliğini (1952) gerçekleştirdi'],
        tags: ['Galip Hoca', 'İlk Sivil Cumhurbaşkanı', 'İş Bankası Kurucusu', 'Demokrat Parti']
    },
    {
        id: 204, era: 'cumhuriyet', name: '4. Cemal Gürsel', dates: '1960 – 1966',
        dynasty: 'TÜRKİYE CUMHURİYETİ — 4. Cumhurbaşkanı',
        icon: '🚗', sortYear: 1960,
        quote: '"Milletimizin kendi otomobilini, kendi sanayisini yapacak kudreti vardır."',
        bio: '"Cemal Ağa" olarak bilinen Kara Kuvvetleri Komutanı ve 4. Cumhurbaşkanı. 1961 Anayasası döneminde görev yaptı; Türkiye\'nin ilk yerli otomobili "Devrim Arabaları"nın üretilmesine bizzat talimat verdi ve TÜBİTAK\'ın kurulmasını sağladı.',
        achievements: ['🚗 Türkiye\'nin ilk yerli otomobili Devrim Arabaları projesini başlattı', '🔬 TÜBİTAK\'ın (Türkiye Bilimsel ve Teknolojik Araştırma Kurumu) kurulmasını emretti', '📜 1961 Anayasası ile anayasal kurumların oluşumuna öncülük etti'],
        tags: ['Cemal Ağa', 'Devrim Arabaları', 'TÜBİTAK Kurucusu']
    },
    {
        id: 205, era: 'cumhuriyet', name: '5. Cevdet Sunay', dates: '1966 – 1973',
        dynasty: 'TÜRKİYE CUMHURİYETİ — 5. Cumhurbaşkanı',
        icon: '🎖️', sortYear: 1966,
        quote: '"Devletin bekası her şeyin üstündedir."',
        bio: 'Genelkurmay Başkanlığı görevinden sonra Cumhurbaşkanı seçildi. Kuleli Askeri Lisesi ve I. Dünya Savaşı gazisi olan Sunay, 1960\'ların sonundaki siyasi çalkantılarda devlet kurumları arasında denge unsuru olmaya çalıştı.',
        achievements: ['🎖️ I. Dünya Savaşı ve Kurtuluş Savaşı gazisi komutan', '🌉 Boğaziçi Köprüsü\'nün temelinin atıldığı dönemin cumhurbaşkanı', '🛡️ Kıbrıs Türklerinin haklarının korunmasında diplomatik hat yürüttü'],
        tags: ['Asker Cumhurbaşkanı', 'Denge Dönemi', 'Boğaziçi Temeli']
    },
    {
        id: 206, era: 'cumhuriyet', name: '6. Fahri Korutürk', dates: '1973 – 1980',
        dynasty: 'TÜRKİYE CUMHURİYETİ — 6. Cumhurbaşkanı',
        icon: '⚓', sortYear: 1973,
        quote: '"Soyadımı Atatürk verdi; milletime sadakatle hizmet etmek en büyük şerefimdir."',
        bio: 'Eski Deniz Kuvvetleri Komutanı, Moskova Büyükelçisi ve Oramiral. Soyadını bizzat Mustafa Kemal Atatürk vermiştir. 1974 Kıbrıs Barış Harekatı döneminde Cumhurbaşkanlığı makamında bulundu.',
        achievements: ['🏝️ 1974 Kıbrıs Barış Harekâtı\'nda devletin başı olarak tarihi kararları onayladı', '🌉 1973\'te Boğaziçi Köprüsü\'nün açılışını gerçekleştirdi', '⚓ Modern Türk Deniz Kuvvetleri\'nin gelişimine büyük katkılar sundu'],
        tags: ['Kıbrıs Barış Harekâtı', 'Oramiral', 'Boğaziçi Açılışı', 'Atatürk\'ün İsmi']
    },
    {
        id: 207, era: 'cumhuriyet', name: '7. Kenan Evren', dates: '1980 – 1989',
        dynasty: 'TÜRKİYE CUMHURİYETİ — 7. Cumhurbaşkanı',
        icon: '📜', sortYear: 1980,
        quote: '"Devletin birliği ve vatanın bütünlüğü esastır."',
        bio: 'Genelkurmay Başkanlığı görevini yürütürken 12 Eylül 1980 askeri müdahalesini gerçekleştiren Milli Güvenlik Konseyi Başkanı. 1982 Anayasası\'nın kabul edilmesiyle 7. Cumhurbaşkanı oldu.',
        achievements: ['📜 1982 Anayasası\'nın yürürlüğe girmesiyle cumhurbaşkanlığı yaptı', '🏛️ GAP projesinin hızlandırılmasına destek verdi'],
        tags: ['1982 Anayasası', '12 Eylül', 'Geçiş Süreci']
    },
    {
        id: 208, era: 'cumhuriyet', name: '8. Turgut Özal', dates: '1989 – 1993',
        dynasty: 'TÜRKİYE CUMHURİYETİ — 8. Cumhurbaşkanı',
        icon: '📈', sortYear: 1989,
        quote: '"Türkiye büyük bir ülkedir, büyük düşünmek zorundadır. Hedefimiz 21. yüzyıl Türk asrı olmalıdır."',
        bio: 'Türkiye\'yi kapalı ekonomiden serbest piyasa ekonomisine ve küresel dünyaya açan vizyoner lider. Otoyollar, renkli televizyon, telekomünikasyon devrimi ve ihracat patlamasını başlattı; Sovyetler dağıldığında Türk Cumhuriyetleri ile tarihi köprüleri ilk o kurdu.',
        achievements: ['📈 Türkiye\'yi serbest piyasa ekonomisine, ihracata ve döviz serbestisine geçirdi', '🛣️ Otoyol ağları, dijital telekomünikasyon ve F-16 üretim tesislerini kurdu', '🤝 Bağımsızlığını kazanan Orta Asya Türk Cumhuriyetlerini tanıyan ilk lider oldu', '💧 GAP Projesi ve Atatürk Barajı\'nın dev hamlelerini yönetti'],
        tags: ['Vizyoner Lider', 'Serbest Piyasa', 'Türk Dünyası Öncüsü', 'GAP']
    },
    {
        id: 209, era: 'cumhuriyet', name: '9. Süleyman Demirel', dates: '1993 – 2000',
        dynasty: 'TÜRKİYE CUMHURİYETİ — 9. Cumhurbaşkanı',
        icon: '💧', sortYear: 1993,
        quote: '"GAP\'ı gaptırmam! Barajlar, yollar, fabrikalar bu milletin alın teridir."',
        bio: 'Türkiye\'nin "Barajlar Kralı" ve "Baba" lakaplı devlet adamı. 7 kez başbakanlık ve 1 kez cumhurbaşkanlığı yaparak Türk siyasi tarihine yarım asır damga vurdu. Keban ve Atatürk Barajları, Boğaziçi ve Fatih Sultan Mehmet köprülerinde büyük emeği vardır.',
        achievements: ['💧 Keban, Karakaya ve Atatürk Barajları ile Türkiye\'nin su ve enerji devrimini yaptı', '🌾 "Barajlar Kralı" olarak kırsal kalkınmayı ve sanayiyi büyüttü', '🤝 Türk Dili Konuşan Ülkeler Zirvelerini kurumsallaştırdı', '🏛️ Devlet tecrübesiyle çalkantılı 90\'lı yıllarda anayasal dengeyi korudu'],
        tags: ['Barajlar Kralı', 'Baba Demirel', 'Kalkınma Hamlesi', 'Yarım Asırlık Siyaset']
    },
    {
        id: 210, era: 'cumhuriyet', name: '10. Ahmet Necdet Sezer', dates: '2000 – 2007',
        dynasty: 'TÜRKİYE CUMHURİYETİ — 10. Cumhurbaşkanı',
        icon: '⚖️', sortYear: 2000,
        quote: '"Hukukun üstünlüğü ve anayasal meşruiyet devletin namusudur."',
        bio: 'Anayasa Mahkemesi Başkanlığı görevinden Cumhurbaşkanlığına oy birliğine yakın mutabakatla seçilen ilk yüksek yargıç. Görev süresi boyunca tasarruf tedbirleri, kanunlara ve anayasaya harfiyen bağlılığıyla anıldı.',
        achievements: ['⚖️ Anayasa Mahkemesi Başkanlığı\'ndan seçilen ilk hukukçu cumhurbaşkanı', '🏛️ Devlet harcamalarında rekor tasarruf uyguladı, bütçeyi devlete iade etti', '📜 Kanunların anayasaya uygunluğunu titizlikle denetledi'],
        tags: ['Hukukun Üstünlüğü', 'Hukukçu Cumhurbaşkanı', 'Tasarruf ve Disiplin']
    },
    {
        id: 211, era: 'cumhuriyet', name: '11. Abdullah Gül', dates: '2007 – 2014',
        dynasty: 'TÜRKİYE CUMHURİYETİ — 11. Cumhurbaşkanı',
        icon: '🌍', sortYear: 2007,
        quote: '"Türkiye yumuşak gücü, diplomasisi ve demokrasisiyle küresel bir cazibe merkezidir."',
        bio: 'Dışişleri Bakanlığı ve Başbakanlık görevlerinin ardından 11. Cumhurbaşkanı seçildi. Türkiye\'nin Avrupa Birliği müzakerelerinin başlamasında başmüzakereci oldu; aktif dış politika, Kafkas Barış Platformu ve Türk Keneşi\'nin (Türk Devletleri Teşkilatı) kuruluşuna öncülük etti.',
        achievements: ['🌐 Türk Devletleri Teşkilatı\'nın (Nahçıvan Anlaşması 2009) kuruluşuna imza attı', '🇪🇺 AB katılım müzakerelerinin resmi açılışını Dışişleri Bakanı ve Cumhurbaşkanı olarak yürüttü', '🤝 Kafkas İstikrar ve İşbirliği Platformu gibi aktif diplomasi hamleleri başlattı'],
        tags: ['Aktif Diplomasi', 'Türk Keneşi', 'Nahçıvan Anlaşması', 'Avrupa Süreci']
    },
    {
        id: 212, era: 'cumhuriyet', name: '12. Recep Tayyip Erdoğan', dates: '2014 – Günümüz',
        dynasty: 'TÜRKİYE CUMHURİYETİ — 12. Cumhurbaşkanı',
        icon: '🇹🇷', sortYear: 2014,
        quote: '"Dünya beşten büyüktür. Türkiye Yüzyılı milletimizin asırlık hayallerinin gerçeğe dönüşmesidir."',
        bio: 'Halkın doğrudan oylarıyla seçilen ilk Cumhurbaşkanı ve Cumhurbaşkanlığı Hükümet Sistemi\'nin ilk başkanı. Savunma sanayiinde yerlilik oranını %20\'lerden %80\'in üzerine çıkarmış; İHA/SİHA devrimi (Bayraktar, Kızılelma, KAAN), Togg, şehir hastaneleri, Marmaray, Avrasya Tüneli, Yavuz Sultan Selim ve 1915 Çanakkale köprüleri, İHA donanma gemisi TCG Anadolu gibi devasa altyapı projelerini hayata geçirmiştir.',
        achievements: ['🗳️ Türk tarihinde halkın doğrudan oyuyla seçilen ilk Cumhurbaşkanı', '🛡️ Savunma sanayiinde tarihi atılım (Bayraktar TB2/Akıncı, KAAN, Kızılelma, TCG Anadolu, Altay)', '🚗 Türkiye\'nin ilk yerli elektrikli akıllı otomobili Togg\'u yollara çıkardı', '🌉 1915 Çanakkale Köprüsü, Marmaray, Avrasya Tüneli, YSS Köprüsü ve Şehir Hastaneleri gibi mega projeler', '🌐 Karabağ Zaferi\'ne tam askeri ve siyasi destek vererek 30 yıllık işgali sonlandırdı', '🌍 "Dünya 5\'ten Büyüktür" doktriniyle BM reformu ve tahıl koridoru diplomasisine liderlik etti'],
        tags: ['Doğrudan Seçilen İlk Başkan', 'Savunma Sanayii', 'Togg & Mega Projeler', 'Karabağ Zaferi', 'Türkiye Yüzyılı']
    }
];
