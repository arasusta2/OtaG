// OTAĞ — KIRAATHANE İSİM HAVUZU (200 İSİM)
// Okey, tavla ve mangala botları her oturumda bu havuzdan rastgele isim alır.
window.TURKISH_BOT_NAMES = [
    "Ali Dayı", "Mehmet Usta", "Hasan Amca", "Kemal Ağa", "Rıza Bey", "Nuri Emmi", "Şükrü Dayı", "Osman Usta", "İsmail Amca", "Hüseyin Ağa",
    "Mustafa Bey", "Ahmet Usta", "Süleyman Dayı", "Recep Amca", "Yaşar Ağa", "Cemal Bey", "Fikret Usta", "Necati Dayı", "Selim Amca", "Kadir Ağa",
    "İbrahim Bey", "Yusuf Usta", "Mahmut Dayı", "Sait Amca", "Rasim Ağa", "Ekrem Bey", "Necip Usta", "Vedat Dayı", "Zeki Amca", "Bülent Ağa",
    "Erdal Bey", "Ferhat Usta", "Gökhan Dayı", "Hakan Amca", "İlker Ağa", "Kaan Bey", "Levent Usta", "Murat Dayı", "Oğuz Amca", "Ömer Ağa",
    "Serdar Bey", "Tolga Usta", "Uğur Dayı", "Volkan Amca", "Yasin Ağa", "Zafer Bey", "Burak Usta", "Cem Dayı", "Çağrı Amca", "Deniz Ağa",
    "Emre Bey", "Efe Usta", "Furkan Dayı", "Kerem Amca", "Mert Ağa", "Ozan Bey", "Özgür Usta", "Sinan Dayı", "Şahin Amca", "Tuncay Ağa",
    "Umut Bey", "Yiğit Usta", "Arda Dayı", "Berk Amca", "Can Ağa", "Doruk Bey", "Ege Usta", "Eray Dayı", "Görkem Amca", "Ilgaz Ağa",
    "Kıvanç Bey", "Metin Usta", "Nihat Dayı", "Orhan Amca", "Önder Ağa", "Polat Bey", "Rıdvan Usta", "Sedat Dayı", "Tarık Amca", "Ufuk Ağa",
    "Yavuz Bey", "Zihni Usta", "Adem Dayı", "Bahri Amca", "Celal Ağa", "Davut Bey", "Engin Usta", "Fevzi Dayı", "Galip Amca", "Hamdi Ağa",
    "İhsan Bey", "Kadri Usta", "Latif Dayı", "Mesut Amca", "Nail Ağa", "Oktay Bey", "Ragıp Usta", "Sabri Dayı", "Tahir Amca", "Ümit Ağa",
    "Veysel Bey", "Yılmaz Usta", "Zübeyr Dayı", "Abdullah Amca", "Bilal Ağa", "Cüneyt Bey", "Dursun Usta", "Ersin Dayı", "Fuat Amca", "Gürbüz Ağa",
    "Hilmi Bey", "İsmet Usta", "Cevdet Dayı", "Kâzım Amca", "Lütfi Ağa", "Mazhar Bey", "Nurettin Usta", "Osman Çavuş", "Pertev Amca", "Remzi Ağa",
    "Salih Bey", "Şaban Usta", "Turan Dayı", "Ulvi Amca", "Vahit Ağa", "Yekta Bey", "Ziya Usta", "Rauf Emmi", "Sami Dayı", "Talat Amca",
    "Berber İlyas", "Bakkal Nuri", "Kahveci Rıza", "Muhtar Kemal", "Hoca Süleyman", "Kaptan Murat", "Şoför Hasan", "Bekçi Osman", "Demirci Yusuf", "Marangoz İsmail",
    "Terzi Hüseyin", "Fırıncı Ahmet", "Kasap Mehmet", "Çoban Ali", "Berber Selim", "Bakkal Kadir", "Kahveci Şükrü", "Muhtar Cemal", "Hoca Necip", "Kaptan Yaşar",
    "Şoför Fikret", "Bekçi Necati", "Demirci Sait", "Marangoz Rasim", "Terzi Ekrem", "Fırıncı Vedat", "Kasap Zeki", "Çoban Bülent", "Berber Erdal", "Bakkal Ferhat",
    "Kahveci Gökhan", "Muhtar Hakan", "Hoca İlker", "Kaptan Kaan", "Şoför Levent", "Bekçi Oğuz", "Demirci Ömer", "Marangoz Serdar", "Terzi Tolga", "Fırıncı Uğur",
    "Kasap Volkan", "Çoban Yasin", "Berber Zafer", "Bakkal Burak", "Kahveci Cem", "Muhtar Çağrı", "Hoca Deniz", "Kaptan Emre", "Şoför Efe", "Bekçi Furkan",
    "Demirci Kerem", "Marangoz Mert", "Terzi Ozan", "Fırıncı Özgür", "Kasap Sinan", "Çoban Şahin", "Berber Tuncay", "Bakkal Umut", "Kahveci Yiğit", "Muhtar Arda",
    "Hoca Berk", "Kaptan Can", "Şoför Doruk", "Bekçi Ege", "Demirci Eray", "Marangoz Görkem", "Terzi Ilgaz", "Fırıncı Kıvanç", "Kasap Metin", "Çoban Nihat",
];

// Havuzdan tekrarsız rastgele isim seçer.
window.pickBotNames = function (count, avoid) {
    const pool = (window.TURKISH_BOT_NAMES || []).slice();
    const blocked = new Set(avoid || []);
    const picked = [];
    while (picked.length < count && pool.length > 0) {
        const index = Math.floor(Math.random() * pool.length);
        const name = pool.splice(index, 1)[0];
        if (!blocked.has(name)) picked.push(name);
    }
    return picked;
};
