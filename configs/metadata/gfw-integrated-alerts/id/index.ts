export const id = {
  title: 'Peringatan deforestasi terpadu',
  subtitle: 'harian, 10 m, daerah tropis, UMD/GLAD dan WUR',
  download_data:
    'Pantau gangguan hutan hampir secara waktu nyata menggunakan peringatan terintegrasi dari ketiga sistem peringatan',
  content: [
    {
      label: 'Fungsi',
      value: 'https://data.globalforestwatch.org/datasets/gfw::integrated-deforestation-alerts/about',
    },
    {
      label: 'Resolusi',
      value: '10 × 10 m',
    },
    {
      label: 'Cakupan geografis',
      value: '30°N to 30°S',
    },
    {
      label: 'Sumber',
      value:
        'GLAD Alerts:\nHansen, M.C., A. Krylov, A. Tyukavina, P.V. Potapov, S. Turubanova, B. Zutta, S. Ifo, B. Margono, F. Stolle, and R. Moore. 2016. Humid tropical forest disturbance alerts using Landsat data. Environmental Research Letters, 11 (3). (https://dx.doi.org/10.1088/1748-9326/11/3/034008)[https://dx.doi.org/10.1088/1748-9326/11/3/034008]',
    },
    {
      label: 'Frekuensi pembaruan',
      value: 'Harian',
    },
    {
      label: 'Tanggal konten',
      value: '1 Januari 2019—sekarang',
    },
    {
      label: 'Peringatan',
      value:
        'Meski disebut "peringatan deforestasi", peringatan-peringatan ini mendeteksi gangguan tutupan hutan atau pohon. Produk ini tidak membedakan antara gangguan yang disebabkan oleh manusia dan jenis gangguan lainnya. Ketika peringatan dideteksi dalam hutan tanaman (lebih mungkin terjadi dalam sistem GLAD-L), peringatan dapat mengindikasikan operasi pemanenan kayu, tanpa konversi ke penggunaan lahan nonhutan. \nIstilah deforestasi digunakan karena ini mungkin merupakan peristiwa deforestasi, dan peringatan dapat diselidiki lebih lanjut untuk memastikan hal ini. \nKami tidak menyarankan penggunaan peringatan deforestasi untuk penilaian tren global atau regional, atau untuk perkiraan area. Sebaiknya gunakan data kehilangan tutupan pohon tahunan untuk perbandingan yang lebih akurat tentang tren perubahan hutan dari dari waktu ke waktu, dan untuk perkiraan luas. Peringatan terbaru akan juga mencakup isyarat positif palsu yang tingkat kepercayaannya belum ditingkatkan dan pada akhirnya mungkin dihapus. Peringatan lampau dapat saja keliru dihapus dari basis data jika kanopi menutup cepat mendahului pengamatan satelit tambahan yang tidak terhalang dalam waktu 6 bulan. Selain itu, pembaruan metodologi, jumlah sistem yang berbeda (dalam hal peringatan terintegrasi), dan variasi tutupan awan antara bulan dan tahun yang berbeda menimbulkan risiko tambahan dalam menggunakan peringatan deforestasi untuk perbandingan antar/intra-tahunan.\nPeringatan dapat ‘dikurasi’ untuk mengidentifikasi peringatan-peringatan yang menarik bagi pengguna, seperti peringatan yang kemungkinan besar merupakan deforestasi dan mungkin diprioritaskan untuk diambil tindakan. Pengguna dapat melakukan hal ini dengan menumpukkan himpunan data kontekstual lainnya, seperti kawasan lindung, atau pohon yang ditanam. Data non-kurasi disediakan di sini agar pengguna dapat menentukan sendiri pendekatan mereka dalam penetapan prioritas. Lokasi peringatan yang dikurasi disediakan di lapisan data Tempat untuk Diamati. \nKetiga sistem peringatan tersebut memiliki perbedaan dalam definisi tutupan hutan/pohon, dan gangguan tutupan hutan/pohon: \n\n\nGLAD-L: peringatan berada dalam "tutupan pohon", yang didefinisikan sebagai semua vegetasi dengan tinggi di atas 5 meter dengan lebih dari 60% tutupan kanopi, dan dapat berwujud hutan alam atau perkebunan. "Kehilangan tutupan pohon" mengindikasikan lenyapnya kanopi sebesar sedikitnya setengah piksel dan dapat disebabkan oleh berbagai faktor, termasuk pemanenan mekanis, kebakaran, penyakit, atau kerusakan akibat badai. Karenanya, "kehilangan" tidak sama dengan deforestasi. \nGLAD-S2: peringatan berada dalam mask hutan primer Turubanova et al (2018) di daerah aliran sungai Amazon, dengan menghapus kehilangan hutan 2001-sekarang dari Hansen et al. (2013). \nRADD: peringatan berada di dalam hutan primer lembap. Kehilangan hutan didefinisikan sebagai hilangnya seluruh atau sebagian tutupan pohon dalam satu piksel, dengan menggunakan unit pemetaan minimum seluas 0,5 ha. \nSistem peringatan masukan tidak memiliki cakupan spasial dan temporal yang sama:\nGLAD-L: Beroperasi di seluruh tropika (30°N sampai 30°S) dari 1 Januari 2018 hingga sekarang, dan dari 2015 hingga sekarang (meski dihentikan beberapa waktu pada 2022) untuk beberapa negara tertentu di Amazon, Cekungan Kongo, dan Asia Tenggara Maritim \nGLAD-S2: Beroperasi di area-area hutan tropis lembap primer di Amerika Selatan dari Januari 2019 hingga sekarang \nRADD : Beroperasi di kawasan hutan tropis lembap primer di Amerika Selatan, Afrika sub-Sahara, dan Asia Tenggara kepulauan dengan cakupan dari Januari 2019 hingga sekarang untuk Afrika dan Januari 2020 hingga sekarang untuk Amerika Selatan dan Asia Tenggara, dengan Amerika Tengah tercakup mulai Januari 2023 (ekspansi ke Asia Tenggara daratan dan Pasifik akan dilakukan pada akhir 2023) \n\nUntuk mengintegrasikan ketiga sistem peringatan pada kisi yang sama, dilakukan GLAD-L pengambilan ulang sampel dari resolusi spasial 30 m menjadi 10 m agar sesuai dengan GLAD-S2 dan RADD. Akibatnya, di dalam lapisan terintegrasi, satu piksel GLAD-L 30 m akan menjadi beberapa piksel 10 m. Pengguna harus berhati-hati saat membandingkan hasil analisis pada masing-masing sistem dengan lapisan peringatan terintegrasi, karena jumlah peringatan terintegrasi akan jauh lebih banyak daripada jumlah peringatan GLAD-L aslinya. Selain itu, pada peta, piksel dalam lapisan terintegrasi mungkin tidak benar-benar sejajar dengan piksel pada masing-masing lapisan GLAD-L akibat dari pengambilan ulang sampel ini. \nMasing-masing piksel pada lapisan terintegrasi mempertahankan tanggal pendeteksian paling awal dari sistem peringatan apa pun, bahkan meski beberapa sistem telah melaporkan sebuah peringatan pada piksel tersebut. Dalam beberapa situasi, ini dapat menyebabkan visualisasi yang tidak konsisten saat beralih dari lapisan terintegrasi ke lapisan sistem peringatan individu. Disarankan menggunakan lapisan terintegrasi saat Anda tertarik dengan tanggal pendeteksian paling awal oleh sistem peringatan apa pun. Hanya saja, akan lebih baik menggunakan lapisan sistem peringatan individu jika Anda tertarik dengan jenis peringatan tertentu. \nTingkat “Keyakinan tertinggi: terdeteksi oleh beberapa sistem peringatan” hanya dapat dicapai di wilayah dan untuk periode waktu di mana lebih dari satu sistem peringatan beroperasi untuk wilayah tersebut. \nTingkat kepercayaan dapat berubah secara surut saat data sumber diperbarui; peringatan yang tidak meningkat menjadi keyakinan tinggi dalam waktu 180 hari akan dihapus dari himpunan data.\nSetelah piksel peringatan mencapai tingkat keyakinan tinggi, kehilangan hutan tidak akan terdeteksi lagi oleh sistem peringatan yang sama di lokasi tersebut\nKeakuratan bervariasi pada cakupan peringatan terintegrasi, karena perbedaan karakteristik dari ketiga sistem peringatan—sebagai contoh, peringatan radar (RADD) mungkin memiliki lebih banyak pendeteksian palsu di hutan-hutan rawa akibat tingginya sensitivitas radar pita C panjang gelombang pendek terhadap variasi kelembapan\nSaat memperkecil gambar, lapisan data ini menampilkan ketidakakuratan dalam tingkat tertentu karena titik data harus diciutkan agar tampak pada skala lebih besar. Perbesar gambar untuk melihat dengan lebih terperinci.',
    },
    {
      label: 'Lisensi',
      value: 'CC by 4.0',
    },
  ],
  overview: {
    label: 'Ikhtisar',
    value:
      'Dataset yang dikumpulkan oleh Global Forest Watch ini mengagregasi peringatan-peringatan deforestasi dari ketiga sistem peringatan (GLAD-L, GLAD-S2, RADD) menjadi satu lapisan peringatan deforestasi terintegrasi. Integrasi ini memungkinkan pengguna mendeteksi peristiwa deforestasi lebih cepat dibandingkan sebuah sistem tunggal, karena lapisan terintegrasi diperbarui saat ada sistem peringatan sumber yang diperbarui.',
  },
  citation: {
    label: 'Rujukan',
    value: 'Source: "Integrated Deforestation Alerts". UMD/GLAD and WUR, accessed through Global Forest Watch',
  },
};
