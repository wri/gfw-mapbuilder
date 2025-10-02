export const id = {
  title: 'GLAD-Peringatan Deforestasi Landsat (GLAD-L)',
  subtitle: '(mingguan, 30m, tropis, UMD/SENANG)',
  download_data: 'http://glad-forest-alert.appspot.com/',
  content: [
    {
      label: 'Fungsi',
      value: 'Mengidentifikasi area yang kemungkinan kehilangan tutupan pohon hampir secara real-time',
    },
    {
      label: 'Resolusi',
      value: '30 × 30 meter',
    },
    {
      label: 'Cakupan geografis',
      value: '30 derajat utara hingga 30 derajat selatan',
    },
    {
      label: 'Sumber',
      value:
        'Hansen, M.C., A. Krylov, A. Tyukavina, P.V. Potapov, S. Turbanova, B. Zutta, S. Ifo, B. Margono, F. Stolle, dan R. Moore. 2016. Peringatan gangguan hutan tropis lembab menggunakan data Landsat. Surat Penelitian Lingkungan Hidup, 11 (3)',
    },
    {
      label: 'Frekuensi pembaruan',
      value: 'Diperbarui setiap minggu',
    },
    {
      label: 'Tanggal konten',
      value:
        '1 Januari 2021 (Peringatan GLAD-L telah beroperasi sejak tahun 2015 untuk negara-negara tertentu di Lembah Amazon dan Kongo serta kepulauan Asia Tenggara, namun data historis tidak tersedia di GFW)',
    },
    {
      label: 'Peringatan',
      value:
        'Meskipun disebut ‘peringatan deforestasi’, peringatan ini mendeteksi gangguan hutan atau tutupan pohon. Produk ini tidak membedakan antara jenis gangguan yang disebabkan oleh manusia dan jenis gangguan lainnya. Apabila peringatan terdeteksi di dalam hutan tanaman (lebih mungkin terjadi di sistem GLAD-L), peringatan tersebut mungkin mengindikasikan adanya kegiatan pemanenan kayu, tanpa adanya konversi ke penggunaan lahan non-hutan. \n\nIstilah deforestasi digunakan karena hal ini merupakan potensi terjadinya deforestasi, dan peringatan dapat diselidiki lebih lanjut untuk menentukan hal ini. \n\nKami tidak menyarankan penggunaan peringatan deforestasi untuk penilaian tren global atau regional, maupun untuk perkiraan luas wilayah. Kami merekomendasikan penggunaan data kehilangan tutupan pohon tahunan untuk perbandingan yang lebih akurat mengenai tren perubahan hutan dari waktu ke waktu, dan untuk perkiraan luas. Peringatan terbaru akan mencakup positif palsu yang belum meningkatkan tingkat kepercayaannya dan pada akhirnya mungkin dihapus. Peringatan di masa lalu mungkin telah dihapus karena kesalahan dari database jika penutupan kanopi dilakukan secara cepat sebelum pengamatan satelit tambahan yang tidak terhalang dalam waktu 6 bulan. Selain itu, pembaruan metodologi, perbedaan jumlah sistem (dalam hal peringatan terintegrasi), dan variasi tutupan awan antara bulan dan tahun menimbulkan risiko tambahan dalam penggunaan peringatan deforestasi untuk perbandingan antar/tahunan. \n\nPeringatan dapat ‘dikurasi’ untuk mengidentifikasi peringatan yang menarik bagi pengguna, misalnya peringatan yang kemungkinan besar merupakan deforestasi dan mungkin diprioritaskan untuk ditindaklanjuti. Pengguna dapat melakukan ini dengan melapisi kumpulan data kontekstual lainnya, seperti kawasan lindung, atau pohon yang ditanam. Data yang tidak dikurasi disediakan di sini agar pengguna dapat menentukan pendekatan prioritas mereka sendiri. Lokasi peringatan yang dikurasi disediakan di lapisan data Tempat untuk Ditonton. \n\nMeskipun satelit Landsat 8 dan 9 (sebelumnya Landsat 7 dan 8) memiliki periode kunjungan ulang selama 8 hari, tutupan awan dapat membatasi ketersediaan citra, khususnya pada musim hujan. Tanggal peringatan merupakan contoh deteksi, meskipun hilangnya tutupan pohon bisa saja terjadi lebih awal, mungkin beberapa minggu lebih awal, karena tutupan awan yang terus-menerus. Perlu diperhatikan bahwa peringatan GLAD-L sebelumnya bersumber dari citra Landsat 7 yang diketahui memiliki masalah garis pindai yang terkadang menghasilkan peringatan positif palsu, hingga April 2023 ketika masukan dialihkan ke Landsat 9. \n\n\nDalam kumpulan data ini, “tutupan pohon” didefinisikan sebagai seluruh vegetasi yang tingginya lebih dari 5 meter dengan tutupan kanopi lebih dari 60%, dan dapat berupa hutan alam atau perkebunan. “Hilangnya tutupan pohon” menunjukkan hilangnya kanopi setidaknya setengah piksel dan dapat disebabkan oleh berbagai faktor, termasuk pemanenan secara mekanis, kebakaran, penyakit, atau kerusakan akibat badai. Dengan demikian, “kehilangan” tidak sama dengan deforestasi. \n\nDi Peru, tempat sistem peringatan pertama kali dikembangkan, penulis mengevaluasi data yang menghasilkan 13,5% kesalahan positif (kerugian terdeteksi ketika tidak ada kesalahan yang terjadi), meskipun sebagian besar dari kesalahan positif tersebut (9,5%) terjadi di tepi pembukaan lahan. Pada bagian tepinya, piksel Landsat berukuran 30 m menunjukkan campuran hutan dan tutupan lahan lainnya, sehingga rentan terhadap kesalahan dalam sistem. Tingkat positif palsu turun menjadi 1% jika hanya mempertimbangkan peringatan kepercayaan tinggi. Data tersebut memiliki 33% negatif palsu (kehilangan tidak terdeteksi di tempat terjadinya), meskipun sebagian besar terjadi di hutan sekunder—kemungkinan besar karena algoritme dibuat untuk mencatat hilangnya hutan primer. Tingkat negatif palsu yang lebih tinggi dibandingkan dengan positif palsu juga menunjukkan bahwa peringatan tersebut merupakan perkiraan konservatif mengenai hilangnya tutupan pohon yang sebenarnya terjadi. \n\nTingkat kepercayaan dapat berubah secara surut seiring dengan pemutakhiran data sumber; peringatan yang belum mencapai tingkat keyakinan tinggi dalam 180 hari, atau setelah 4 observasi dihapus dari kumpulan data \n\nKetika piksel peringatan mencapai tingkat keyakinan yang tinggi, kehilangan hutan tidak akan terdeteksi lagi di lokasi tersebut. \n\nSaat diperbesar, lapisan data ini menampilkan beberapa tingkat ketidakakuratan karena titik data harus diciutkan agar dapat terlihat pada skala yang lebih besar. Perbesar untuk detail lebih lanjut.',
    },
    {
      label: 'Lisensi',
      value: 'CC OLEH 4.0',
    },
  ],
  overview: {
    label: 'Ikhtisar',
    value:
      'Kumpulan data ini, yang dibuat oleh laboratorium GLAD (Global Land Analysis & Discovery) di Universitas Maryland dan didukung oleh Global Forest Watch, merupakan sistem peringatan hilangnya tutupan pohon berbasis Landsat yang pertama. Meskipun sebagian besar produk peringatan kehilangan yang ada menggunakan citra MODIS beresolusi 250 meter, peringatan ini memiliki resolusi 30 meter sehingga dapat mendeteksi kehilangan pada skala spasial yang jauh lebih halus. Peringatan ini memiliki resolusi 30 meter dan beroperasi untuk wilayah daratan antara 30 derajat utara dan selatan. \n\nGambar Landsat 8 dan 9 yang baru diunduh saat diposting online, dinilai tutupan awan atau kualitas datanya yang buruk, dan dibandingkan dengan metrik turunan Landsat tiga tahun sebelumnya (termasuk peringkat, rata-rata, dan regresi pita merah, inframerah, dan gelombang pendek, serta peringkat NDVI, NBR, dan NDWI). Metrik dan citra Landsat terbaru dijalankan melalui tujuh pohon keputusan untuk menghitung median kemungkinan gangguan hutan. Piksel dengan probabilitas >50% dilaporkan sebagai peringatan hilangnya tutupan pohon. Seluruh proses dijalankan di Google Earth Engine untuk memastikan pembaruan dan skalabilitas yang andal. Untuk informasi lebih lanjut mengenai metodologi, lihat makalah di Environmental Research Letters. \n\nPeringatan tidak diklasifikasikan sebagai tingkat keyakinan tinggi sampai dua atau lebih dari empat pengamatan berturut-turut diberi label sebagai hilangnya tutupan pohon. Peringatan dihapus dari kumpulan data setelah empat pengamatan berturut-turut atau lebih dari 180 hari jika tidak diklasifikasikan sebagai keyakinan tinggi. Anda dapat memilih untuk hanya melihat peringatan berkeyakinan tinggi di menu, namun perlu diingat bahwa hanya menggunakan peringatan berkeyakinan tinggi akan melewatkan deteksi terbaru hilangnya tutupan pohon.',
  },
  citation: {
    label: 'Rujukan',
    value:
      'Gunakan kredit berikut ketika data ini ditampilkan: \n\nSumber: GLAD/UMD, diakses melalui Global Forest Watch \n\nGunakan kredit berikut ketika data ini dikutip: \n\nHansen, M.C., A. Krylov, A. Tyukavina, P.V. Potapov, S. Turbanova, B. Zutta, S. Ifo, B. Margono, F. Stolle, dan R. Moore. 2016. Peringatan gangguan hutan tropis lembab menggunakan data Landsat. Surat Penelitian Lingkungan Hidup, 11 (3). Diakses melalui Global Forest Watch pada [tanggal]. www.globalforestwatch.org',
  },
};
