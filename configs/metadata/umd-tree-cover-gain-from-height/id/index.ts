export const id = {
  title: 'Perolehan Tutupan Pohon',
  subtitle: '(20 tahun, 30 m, global, UMD/NASA GEDI)',
  content: [
    {
      label: 'Fungsi',
      value: 'Mengidentifikasi area perolehan tutupan pohon',
    },
    {
      label: 'Resolusi',
      value: '30×30 meter',
    },
    {
      label: 'Cakupan geografis',
      value: 'Global',
    },
    {
      label: 'Sumber',
      value:
        'Potapov, P., Hansen, M.C., Pickens, A., Hernandez-Serna, A., Tyukavina, A., Turubanova, S., Zalles, V., Li, X., Khan, A., Stolle, F., Harris, N., Song, X-P., Baggett, A., Kommareddy, I., and Kommareddy, A. 2022. The Global 2000-2020 Land Cover and Land Use Change Dataset Derived From the Landsat Archive: First Results. Frontiers in Remote Sensing, 13, April 2022. https://doi.org/10.3389/frsen.2022.856903',
    },
    {
      label: 'Tanggal konten',
      value: '2000-2020',
    },
    {
      label: 'Peringatan',
      value:
        'Dalam set data ini, “tutupan pohon” didefinisikan sebagai vegetasi berkayu dengan tinggi 5 m atau lebih, dan dapat berbentuk hutan, rimba, atau perkebunan pohon alami dalam berbagai kerapatan kanopi. Perolehan tutupan pohon tidak sama secara langsung dengan restorasi, aforestasi, atau reboisasi. Karena keberagaman dalam metodologi penelitian dan tanggal dari konten, set data tutupan pohon, perolehan, dan kehilangan tahunan tidak dapat dibandingkan secara akurat satu sama lain. Oleh karena itu, “nilai bersih” tidak dapat dihitung dengan mengurangkan angka perolehan tutupan pohon dari set data kehilangan tutupan pohon tahunan. Sebaliknya, lapisan perubahan tutupan pohon bersih harus digunakan, yang dihitung secara eksklusif dari data tinggi pohon. Penggunaan produk lain secara terpadu seperti data kerapatan tutupan kanopi yang juga tersedia di GFW harus dilakukan dengan hati-hati. Para penulis mengevaluasi keakuratan produk, dan akurasi keseluruhannya adalah sebesar 99,3%, kesalahan komisi (positif palsu) sebesar 28,6%, dan kesalahan penghilangan (negatif palsu) sebesar 42,2%. Keakuratannya bervariasi menurut bioma dan dengan demikian mungkin lebih tinggi atau lebih rendah di lokasi tertentu. Karena kesalahan penghilangan lebih tinggi daripada kesalahan komisi, ini menunjukkan bahwa produk memberikan perkiraan konservatif mengenai dinamika hutan. Terdapat kerancuan antara penguatan hutan (peningkatan tinggi hutan yang ada) dan perolehan hutan (pembentukan hutan dalam lahan nonhutan tahun 2000), dan ini lebih menonjol di kawasan hutan boreal di mana tinggi hutan pada tahun 2000 sulit ditentukan.',
    },
    {
      label: 'Lisensi',
      value: 'CC by 4.0',
    },
  ],
  overview: {
    label: 'Ikhtisar',
    value:
      'Set data dari lab GLAD (Global Land Analysis & Discovery) di University of Maryland ini mengukur area peningkatan tutupan pohon dari tahun 2000 hingga 2020 di seluruh dunia dengan resolusi 30 × 30 meter, ditampilkan sebagai lapisan kumulatif 20 tahun. Perolehan tutupan pohon ditentukan dengan menggunakan informasi tinggi pohon dari tahun 2000 dan 2020. Tinggi pohon dimodelkan dengan integrasi pengukuran struktur hutan lidar Global Ecosystem Dynamics Investigation (GEDI) dan deret waktu data siap analisis Landsat. NASA GEDI adalah instrumen lidar antariksa yang beroperasi di Stasiun Luar Angkasa Internasional sejak April 2019. Alat ini memberikan pengukuran struktur vegetasi berbasis titik, termasuk ketinggian kanopi hutan pada garis lintang antara 52°LU dan 52°LS secara global. Perolehan diidentifikasi di mana piksel memiliki tinggi pohon ≥5 m pada tahun 2020 dan tinggi pohon <5 <5 m pada tahun 2000.',
  },
  citation: {
    label: 'Rujukan',
    value:
      'Use the following credit when this data is displayed:\nAccessed through Global Forest Watch on 29/01/2025. www.globalforestwatch.org. Use the following credit when this data is cited:\nPotapov, P., Hansen, M.C., Pickens, A., Hernandez-Serna, A., Tyukavina, A., Turubanova, S., Zalles, V., Li, X., Khan, A., Stolle, F., Harris, N., Song, X-P., Baggett, A., Kommareddy, I., and Kommareddy, A. 2022. The Global 2000-2020 Land Cover and Land Use Change Dataset Derived From the Landsat Archive: First Results. Frontiers in Remote Sensing, 13, April 2022. https://doi.org/10.3389/frsen.2022.856903',
  },
};
