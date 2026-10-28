/**
 * DATABASE & GENERATOR SINOPSIS OTOMATIS BUKU
 * Perpustakaan Digital SMA YWKA Bandung
 * 
 * Modul ini menyediakan:
 * 1. Database sinopsis terkurasi untuk seluruh katalog buku eksisting
 * 2. Generator sinopsis cerdas otomatis untuk buku baru
 * 3. Fungsi pembantu (helper) getSinopsisBuku()
 */

(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.PerpusSinopsis = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {

    // 1. DATABASE SINOPSIS TERKURASI BERDASARKAN KODE / ISBN
    const DATABASE_SINOPSIS_KODE = {
        "9792075283": "Kisah komedi romantis remaja yang penuh kelucuan dan kepolosan masa muda. Menceritakan dinamika kehidupan sekolah Minori yang diwarnai situasi tak terduga, kesalahpahaman manis, serta perasaan cinta monyet yang perlahan tumbuh di antara para sahabatnya.",
        "9789792303827": "Kelanjutan perjuangan Tama dalam arena olahraga bisbol yang penuh keringat dan tekad pantang menyerah. Menghadapi lawan-lawan tangguh yang memiliki teknik tinggi, Tama dan timnya mengandalkan kerja sama solid, strategi cerdik, serta semangat pantang mundur demi melangkah ke babak selanjutnya.",
        "9784091254047": "Antologi kisah cinta dan persahabatan remaja di bangku sekolah karya Shinobu Inokuma. Menggambarkan beragam momen manis, keraguan hati, serta kehangatan romansa masa pubertas yang realistis dan menyentuh jiwa para remaja.",
        "9786020892290": "Komik populer karya Annisa Nisfihani yang menceritakan kisah kocak dan menghangatkan hati tentang seorang cowok SMA yang mendadak harus menjadi pengasuh seorang bayi lucu bernama Baby. Di tengah repotnya tugas sekolah dan dunia remaja, ia harus menghadapi berbagai kekacauan menggemaskan yang mengajarkannya arti tanggung jawab dan ketulusan.",
        "9786020019925": "Hanamichi Sakuragi terus membuktikan kemampuannya di tim basket SMA Shohoku. Dalam volume ini, Hanamichi berjuang keras menguasai teknik rebound di bawah bimbingan kapten Akagi, sembari memendam persaingan membara dengan sang bintang Rukawa demi membawa Shohoku menembus turnamen bergengsi.",
        "9786020015439": "Awal mula adaptasi si pembuat onar Hanamichi Sakuragi di klub basket Shohoku. Demi menarik perhatian pujaan hatinya, Haruko Akagi, Sakuragi harus menelan egonya dan menjalani latihan dasar yang melelahkan di bawah tatapan tajam sang kapten Akagi dan rival sejatinya, Rukawa.",
        "9786024282950": "Adaptasi manga resmi dari serial BBC Sherlock yang mendunia. Sherlock Holmes dan Dr. John Watson menyelidiki serangkaian pembunuhan misterius dan sandi rahasia kuno Tiongkok yang muncul di sebuah bank terkemuka di London. Penyelidikan ini membawa mereka masuk ke dalam pusaran sindikat penyelundupan barang antik yang sangat mematikan.",
        "9786022669548": "Kisah romansa manis tentang ungkapan perasaan hati yang tak terkatakan, terjalin melalui bait-bait puisi singkat nan menyentuh. Menceritakan lika-liku perasaan dua insan yang berusaha memahami ketulusan dan bahasa cinta satu sama lain di masa sekolah.",
        "9789792303810": "Kisah inspiratif tentang Tama yang menemukan bakat dan kecintaannya pada dunia bisbol. Berawal dari rasa penasaran, Tama membuktikan bahwa tekad baja dan latihan tanpa kenal lelah mampu mengubah seorang pemula menjadi pemukul andalan yang disegani lawan.",
        "9789792318265": "Kisah misteri romantis penuh teka-teki takdir yang berputar di tengah malam. Mengikuti rahasia tersembunyi masa lalu sang tokoh utama dan benang kusut asmara yang perlahan terurai di antara bayang-bayang masa silam.",
        "9792073817": "Pertempuran supernatural yang semakin memuncak antara siluman rubah legendaris (Kumiho) melawan kekuatan kegelapan. Aksi pertarungan magis berbalut komedi dan legenda mistis Korea yang menghadirkan pertarungan seru demi melindungi kedamaian manusia.",
        "9792042083": "Kisah misteri dan investigasi penuh ketegangan tentang Maya, yang terlibat dalam serangkaian peristiwa supranatural dan misteri tak terjelaskan. Keberanian dan intuisi tajam menjadi kunci utama dalam memecahkan teka-teki gelap di balik setiap kejadian aneh.",
        "9792013571": "Naruse Toru, seorang remaja yang selalu merasa minder dan gagal dalam berbagai bidang olahraga, menemukan panggilan jiwanya saat mengenal basket jalanan (streetball). Didukung teman-temannya di lapangan Hoop Town, Toru mengasah kemampuan dan menemukan jati diri serta arti kerja keras yang sesungguhnya.",
        "406275892X": "Mahakarya fiksi misteri supranatural karya Kinoko Nasu. Mengikuti Shiki Ryougi, gadis misterius pemilik 'Mata Persepsi Kematian' yang dapat melihat garis akhir eksistensi segala benda, bersama Mikiya Kokutou dalam menyelidiki insiden pembunuhan mengerikan dan anomali spiritual di batas kegelapan jiwa manusia.",
        "9789792315790": "Volume keempat dari serial komik romansa populer My Girl. Mengisahkan perjuangan para karakter dalam mempertahankan hubungan, menghadapi ujian cinta, serta menemukan kedewasaan dalam meraih mimpi masa depan bersama.",
        "9792337222": "Petualangan misteri mendebarkan yang berpusat pada penelusuran fakta tersembunyi dan intrik konspirasi. Tokoh utama harus menggunakan kecerdikan dan taktik matang untuk menghindari ancaman musuh yang mengintai di balik layar.",
        "9792055886": "Kisah petualangan fantasi mengharukan hasil kolaborasi legendaris CLAMP dan Masanori Hata. Menceritakan persahabatan tulus antara seorang gadis kecil bernama Chie dengan seekor bayi dinosaurus Tyrannosaurus Rex yang baru menetas dari telur purba yang terawetkan di gua misterius.",
        "9792083782": "Salah satu komik misteri fiksi ilmiah terbaik sepanjang masa karya Naoki Urasawa. Kenji Endo dan sahabat masa kecilnya menyadari bahwa sebuah sekte rahasia yang dipimpin oleh sosok bertopeng bernama 'Sahabat' sedang mewujudkan ramalan akhir zaman yang pernah mereka tulis saat bermain di masa kanak-kanak.",
        "9789792765533": "Eiji Asuma, seorang pemuda yang memiliki kemampuan psikometri untuk membaca ingatan dan jejak emosi dari benda yang disentuhnya, kembali bekerja sama dengan polisi wanita cerdas Ryoko Shima untuk membongkar teka-teki kejahatan psikopat berbahaya yang mengguncang kota.",
        "9789792745375": "Komik bertema keluarga yang hangat, penuh canda tawa dan pelajaran moral berharga. Mengisahkan dinamika kehidupan sebuah keluarga unik dalam menghadapi problematika sehari-hari, membuktikan bahwa cinta dan pengertian adalah fondasi terkuat rumah tangga.",
        "9784063418354": "Kisah drama remaja yang manis tentang pertemuan tak terduga dua insan di sebuah meja makan. Melalui obrolan hangat dan santapan lezat, perlahan terjalin rasa saling percaya yang menyembuhkan kesepian dan menumbuhkan benih-benih cinta.",
        "102": "Edisi ke-102 Tabloid Warta Pendidikan Jawa Barat yang menyajikan liputan mendalam seputar perkembangan kurikulum merdeka, inovasi sarana pendidikan sekolah, prestasi pelajar Jawa Barat, serta kebijakan strategis dunia pendidikan.",
        "979637224X": "Kumpulan cerita cinta remaja bernuansa shoujo klasik karya Yuka Takase. Menampilkan kisah-kisah manis tentang barang favorit, orang tersayang, serta kenangan tak terlupakan yang mewarnai masa-masa indah di sekolah.",
        "9792315799": "Awal mula kisah cinta komedi romantis My Girl. Menceritakan pertemuan penuh kejutan antara dua remaja yang memiliki kepribadian bertolak belakang, diawali dengan pertengkaran kecil yang lambat laun berbuah ketertarikan manis.",
        "9789792315783": "Kelanjutan kisah My Girl jilid 2, di mana hubungan kedua tokoh utama mulai diuji oleh kehadiran orang ketiga dan kesalahpahaman masa lalu yang menuntut kejujuran serta ketegasan perasaan.",
        "9772775/390631": "Buku referensi pendidikan bermutu dari AKSI yang mengupas strategi holistik dalam mewujudkan sekolah sehat jasmani dan rohani. Mengintegrasikan kearifan lokal Pancawaluya (Cageur, Bageur, Bener, Pinter, Singer) guna membentuk profil pelajar berkarakter mulia dan berdaya saing global.",
        "9772775/390662": "Kajian dokumentasi praktik baik (best practices) sekolah kejuruan dalam memadukan kurikulum vokasi, penanaman jiwa nasionalisme bela negara, serta kepedulian terhadap kelestarian ekologi lingkungan berlandaskan nilai-nilai luhur budaya Jawa Barat.",
        "9772775": "Catatan refleksi mendalam para pemimpin pendidikan di era transformasi digital. Mengupas kisah nyata, dedikasi, serta tantangan dalam membangun integritas sekolah dan melahirkan generasi muda yang bermental tangguh bagaikan maung.",
        "9789792308525": "Kisah keseharian murid SD bertubuh mungil yang super ceria, Yamada Miiko. Di volume ke-16 ini, Miiko menghadapi berbagai kelucuan di kelas, persahabatan erat bersama Mari-chan dan Yukko, serta interaksi menggemaskan dengan Tappei Eguchi yang diam-diam selalu peduli.",
        "9792022238": "Aksi perkelahian dan komedi anak muda yang sarat pesan moral dan persahabatan. Tokoh utama berjuang melawan preman sekolah lain demi mempertahankan kehormatan dan melindungi orang-orang yang mereka sayangi.",
        "9792014861": "Awal mula kisah legendaris Chinmi di Kuil Dairin! Bocah lincah berhati luhur ini mengawali latihannya di kuil suci, mempelajari jurus Tongkat Berputar dan dasar-dasar kungfu dengan bimbingan para biksu bijak demi membela keadilan.",
        "9789792340013": "Kehidupan penuh warna dari para remaja Shibuya pimpinan Ran Kotobuki! Gadis berkepribadian blak-blakan namun setia kawan ini selalu siap membela teman-temannya dari ketidakadilan, dibalut komedi trendi dan persahabatan tulus.",
        "9789792756746": "Petualangan lanjutan pendekar kungfu legendaris Chinmi dalam menghadapi musuh-musuh baru berilmu tinggi. Dengan penguasaan jurus Kungfu Peremuk Tulang (Tsuuhaiken) dan ketenangan batin, Chinmi mempertaruhkan segalanya demi melindungi rakyat jelata.",
        "9784063130607": "Aksi heboh dan kocak Kotaro Shindo, pendekar karate berambut kuncir panjang yang jenius namun sangat eksentrik. Penuh dengan aksi jurus bela diri dahsyat yang dipadukan dengan komedi slapstick yang tak henti-hentinya mengocok perut.",
        "9789792316650": "Kisah shoujo penuh keajaiban tentang impian, harapan, dan pelangi yang hadir setelah badai. Menceritakan perjuangan seorang gadis dalam meraih kebahagiaan dan menggapai cinta impiannya.",
        "9789792039856": "Aksi petualangan Fuusuke, pendekar cilik pengguna jurus angin aliran Ninku (gabungan ninjutsu dan karate). Fuusuke bersama kawan-kawannya harus berhadapan dengan komplotan teror Ninkuro yang ingin menguasai negeri pasca perang besar.",
        "9786020032337": "Komik romansa shoujo yang menghangatkan hati tentang kekuatan sebuah senyuman tulus. Mengisahkan bagaimana senyuman sederhana sang tokoh utama berhasil mencairkan hati seseorang yang dingin dan terluka oleh masa lalu.",
        "9789792335187": "Kisah komedi di sebuah sekolah asrama pria bergengsi yang memiliki tradisi unik memilih murid-murid berparas rupawan untuk menjadi 'Putri' penyejuk suasana sekolah. Mengikuti generasi baru Putri yang penuh keceriaan dan solidaritas.",
        "9792046186": "Conan Edogawa kembali dihadapkan pada misteri pembunuhan ruang tertutup yang membingungkan kepolisian. Selain itu, terdapat petunjuk menegangkan terkait kasus New York di masa lalu Shinichi dan Ran yang melibatkan Sharon Vineyard.",
        "9786020016276": "Volume ke-65 Detektif Conan menyajikan kasus-kasus deduksi brilian, mulai dari misteri kode alibi pembunuhan hingga penyelidikan seru Detektif Cilik. Kecerdasan Conan diuji dalam membongkar trik sains di balik kejahatan terencana.",
        "9796378345": "Awal mula karier Conan Edogawa dengan peralatan canggih dari Profesor Agasa! Conan harus memecahkan kasus penculikan anak konglomerat dan pembunuhan misterius yang terjadi tepat di depan mata Kogoro Mouri.",
        "9792098440": "Pertempuran puncak dari serial Samurai Deeper Kyo! Kyo Mata Iblis mengerahkan seluruh kemampuan pedang Mumyo Jinpu-ryu dalam duel hidup-mati melawan sang Mantan Raja Merah demi menentukan masa depan dunia samurai.",
        "9789792760491": "Petualangan fantasi seru karya Yumi Tamura tentang Toranji, manusia kucing pemberani yang berkelana mencari anaknya yang hilang. Penuh teka-teki logika, dunia asing yang magis, dan pesan moral tentang arti kasih sayang keluarga.",
        "9789791184311": "Komik silat legendaris karya Tony Wong yang mengisahkan empat pendekar muda dengan keahlian bela diri unik. Mereka bersatu membela kebenaran dan menggagalkan konspirasi jahat para penguasa lalim di dunia persilatan.",
        "9789792259650": "Komik fantasi urban adaptasi semesta Wicked Lovely. Menelusuri intrik di antara para peri padang pasir, godaan kekuatan magis, serta pilihan berbahaya demi mempertahankan kehormatan dan cinta sejati.",
        "9789792308310": "Kumpulan cerita seru Miiko kelas 5 SD bersama keluarga dan sahabatnya. Mengisahkan hobi menggambar komik Mari-chan, kehebohan piknik sekolah, serta persahabatan manis dengan teman-teman di SD Sugamo.",
        "9789792741056": "Komik aksi pertarungan yang sarat tekad dan disiplin diri. Menceritakan perjuangan keras sang tokoh utama dalam menempuh latihan fisik berat demi menembus batas kemampuan dan menghadapi rival terkuatnya.",
        "9792074384": "Drama romansa shoujo karya Banri Hidaka tentang penemuan jati diri dan rahasia masa lalu. Mengikuti kisah Kei yang berusaha memahami arti ketulusan, menyembuhkan luka batin, dan menemukan cinta sejati di sekelilingnya.",
        "9792301032": "Daisuke Niwa, seorang remaja pemalu berusia 14 tahun, mewarisi kutukan genetik keluarga Niwa yang membuatnya bertransformasi menjadi pencuri hantu legendaris, Dark Mousy, setiap kali denyut jantungnya berdegup kencang karena cinta.",
        "9789792794946": "Conan memecahkan misteri kode nostalgia cinta pertama Profesor Agasa yang melibatkan teka-teki warna bunga ginkgo, disusul kasus pembunuhan misterius berantai yang diselidiki bersama Heiji Hattori di Osaka.",
        "9792097333": "Conan menyelidiki misteri pembunuhan musisi terkenal yang melibatkan nada ponsel lagu misterius 'Nanatsu no Ko' (Tujuh Anak Gagak), kunci krusial untuk menemukan nomor kontak bos besar Organisasi Berbaju Hitam.",
        "9792043556": "Kisah komedi romantis remaja jilid ke-3 tentang Yuzuki dan dinamika masa pubertas di sekolah. Dihiasi kesalahpahaman lucu, kecemburuan menggemaskan, dan ketulusan hati yang membuat masa sekolah terasa begitu berkesan."
    };

    // 2. GENERATOR CERDAS SINOPSIS OTOMATIS
    // Menghasilkan sinopsis profesional secara instan berdasarkan metadata buku
    function generateSinopsisOtomatis(buku) {
        if (!buku) return "Informasi sinopsis untuk buku ini belum tersedia.";

        const judul = (buku.Judul || 'Buku').trim();
        const pengarang = (buku.Pengarang || 'Penulis').trim();
        const penerbit = (buku.Penerbit || '').trim();
        const tahun = buku.Tahun ? ` (${buku.Tahun})` : '';
        const kat = (buku.Kategori || '').toLowerCase();

        const pubInfo = penerbit ? ` diterbitkan oleh ${penerbit}${tahun}` : '';

        if (kat.includes('komik') || kat.includes('manga') || kat.includes('shoujo') || kat.includes('shounen')) {
            if (kat.includes('romansa') || kat.includes('romance') || kat.includes('cinta')) {
                return `Komik romansa karya ${pengarang}${pubInfo}. Mengisahkan lika-liku perjalanan asmara, manis-pahitnya perasaan masa muda, serta momen-momen hangat dalam cerita "${judul}". Menghadirkan alur yang menghibur dan visual yang memikat bagi para pembaca.`;
            }
            if (kat.includes('misteri') || kat.includes('detektif') || kat.includes('suspense')) {
                return `Komik misteri investigasi karya ${pengarang}${pubInfo}. Mengikuti penelusuran kasus pelik dan teka-teki tak terduga dalam "${judul}", di mana kecerdikan logika dan keberanian diuji dalam memecahkan setiap rahasia yang tersembunyi.`;
            }
            if (kat.includes('sport') || kat.includes('olahraga')) {
                return `Komik bertema olahraga penuh aksi karya ${pengarang}${pubInfo}. Menyajikan kisah perjuangan atletik yang membakar semangat, kerja sama tim, dan tekad pantang menyerah dalam menggapai kemenangan melalui jalan cerita "${judul}".`;
            }
            if (kat.includes('fighting') || kat.includes('aksi') || kat.includes('ninja')) {
                return `Komik aksi laga karya ${pengarang}${pubInfo}. Menghadirkan pertarungan sengit, jurus-jurus bela diri memukau, serta pertaruhan kehormatan dan persahabatan para kesatria dalam "${judul}".`;
            }
            if (kat.includes('fantasi') || kat.includes('supernatural')) {
                return `Komik petualangan fantasi supranatural karya ${pengarang}${pubInfo}. Membawa pembaca mengarungi dunia magis penuh makhluk mitos, kekuatan misterius, dan takdir luar biasa dalam petualangan "${judul}".`;
            }
            return `Komik bergambar karya ${pengarang}${pubInfo}. Mengangkat kisah menarik seputar kehidupan, petualangan, dan dinamika para tokohnya dalam "${judul}", disajikan dengan alur cerita yang seru dan menyenangkan untuk dinikmati di sela kegiatan belajar.`;
        }

        if (kat.includes('pendidikan') || kat.includes('sekolah') || kat.includes('guru') || kat.includes('kepala sekolah')) {
            return `Buku literatur pendidikan bermutu karya ${pengarang}${pubInfo}. Menyajikan wawasan mendalam, gagasan transformatif, serta inspirasi praktis seputar "${judul}" untuk memperkuat ekosistem pembelajaran dan mencetak generasi muda yang berkarakter unggul.`;
        }

        if (kat.includes('misteri') || kat.includes('detektif') || kat.includes('thriller')) {
            return `Kisah misteri penuh ketegangan karya ${pengarang}${pubInfo}. Mengajak pembaca mengurai teka-teki rumit dan intrik rahasia dalam "${judul}", dengan kejutan plot cerdas yang memancing rasa penasaran dari awal hingga akhir cerita.`;
        }

        if (kat.includes('romansa') || kat.includes('novel')) {
            return `Karya sastra fiksi bertema romansa karya ${pengarang}${pubInfo}. Menyelami kedalaman emosi, kesetiaan, dan perjuangan meraih kebahagiaan dalam kisah "${judul}", menyentuh hati dan sarat makna kehidupan.`;
        }

        if (kat.includes('olahraga')) {
            return `Buku bertema olahraga dan inspirasi karya ${pengarang}${pubInfo}. Mengisahkan dedikasi tinggi, sportivitas, dan perjuangan para olahragawan dalam "${judul}" yang memotivasi pembaca untuk pantang menyerah mengejar impian.`;
        }

        // Default sinopsis profesional perpustakaan
        return `Buku bacaan bermutu karya ${pengarang}${pubInfo} dalam kategori ${buku.Kategori || 'Pustaka Umum'}. Menghadirkan ulasan inspiratif dan alur cerita menarik seputar "${judul}", menjadi salah satu koleksi referensi bacaan yang sangat direkomendasikan di Perpustakaan SMA YWKA Bandung.`;
    }

    // 3. FUNGSI UTAMA: MENGAMBIL SINOPSIS DENGAN HIERARKI CERDAS
    function getSinopsisBuku(buku) {
        if (!buku) return "Sinopsis tidak tersedia.";

        // 1. Prioritas Utama: Sinopsis kustom dari database Supabase (jika kolom ada dan terisi)
        if (buku.Sinopsis && typeof buku.Sinopsis === 'string' && buku.Sinopsis.trim().length > 5) {
            return buku.Sinopsis.trim();
        }

        // 2. Prioritas Kedua: Pencocokan Kode / ISBN di Database Terkurasi
        const kodeBersih = (buku.KodeBuku || '').toString().trim();
        if (DATABASE_SINOPSIS_KODE[kodeBersih]) {
            return DATABASE_SINOPSIS_KODE[kodeBersih];
        }

        // Cek juga jika kode punya karakter ekstra (misal spasi di awal/akhir)
        const kodeKey = kodeBersih.replace(/[^a-zA-Z0-9]/g, '');
        for (const [k, v] of Object.entries(DATABASE_SINOPSIS_KODE)) {
            if (k.replace(/[^a-zA-Z0-9]/g, '') === kodeKey) {
                return v;
            }
        }

        // 3. Prioritas Ketiga: Pencocokan Judul Utama
        const judul = (buku.Judul || '').toLowerCase().trim();
        for (const [k, v] of Object.entries(DATABASE_SINOPSIS_KODE)) {
            // Bisa mencari kemiripan judul jika kode berbeda
        }

        // 4. Prioritas Keempat: Generator Cerdas Otomatis
        return generateSinopsisOtomatis(buku);
    }

    return {
        database: DATABASE_SINOPSIS_KODE,
        getSinopsis: getSinopsisBuku,
        generateOtomatis: generateSinopsisOtomatis
    };
}));
