export const id = {
  title: 'Kepadatan biomassa kayu hidup di atas permukaan tanah tropis',
  subtitle: 'Tropis, Zarin/WHR',
  download_data: 'http://data.globalforestwatch.org/datasets/8f93a6f94a414f9588ce4657a39c59ff_1',
  content: [
    {
      label: 'Fungsi',
      value: 'Menunjukkan nilai kepadatan karbon biomassa kayu hidup di atas permukaan tanah',
    },
    {
      label: 'Resolusi',
      value: '30 m',
    },
    {
      label: 'Cakupan geografis',
      value: 'Daerah tropis (30 derajat LU, 20 derajat LS)',
    },
    {
      label: 'Sumber',
      value: 'ICEsat GLAS lidar, MODIS, Landsat, pengukuran tanah',
    },
    {
      label: 'Tanggal konten',
      value: 2000,
    },
    {
      label: 'Peringatan',
      value:
        'Direkomendasikan agar nilai kepadatan dan ketidakpastian karbon di atas permukaan tanah digunakan bersama-sama dalam penilaian dan verifikasi karbon. Peta ini akan memberikan perkiraan akurat mengenai stok karbon di atas permukaan tanah dan kepadatan karbon di atas permukaan tanah jika digabungkan ke wilayah yang luas (5.000 hingga 10.000 ha) untuk penilaian tingkat proyek dan regional. Nilai kepadatan biomassa pada satu piksel mungkin memiliki ketidakpastian yang besar bila dibandingkan dengan plot kecil untuk verifikasi.',
    },
    {
      label: 'Lisensi',
      value: 'Creative Commons CC OLEH 4.0',
    },
  ],
  overview: {
    label: 'Ikhtisar',
    value:
      'Ini adalah produk data beresolusi lebih tinggi yang memperluas metodologi yang disajikan dalam Baccini dkk. (2012) untuk menghasilkan peta pan-tropis kepadatan biomassa kayu hidup di atas permukaan tanah dengan resolusi 30 m sekitar tahun 2000. Seiring dengan nilai kepadatan karbon, terdapat peta kesalahan pada resolusi spasial yang sama yang memberikan ketidakpastian dalam estimasi kepadatan karbon di atas permukaan tanah. Peta-peta ini memungkinkan dilakukannya co-location estimasi biomassa dengan Hansen dkk. (2013, v1.0) estimasi kehilangan tutupan pohon pada resolusi spasial yang serupa. Hubungan statistik yang diperoleh antara pengukuran kepadatan biomassa hutan di lapangan dan metrik bentuk gelombang LiDAR Geoscience Laser Altimeter System (GLAS) yang ditempatkan di lokasi yang sama seperti dijelaskan oleh Baccini dkk. (2012) digunakan untuk memperkirakan kepadatan biomassa lebih dari 40.000 jejak kaki GLAS di seluruh wilayah tropis. Kemudian, dengan menggunakan model randomForest, estimasi kepadatan biomassa yang diturunkan dari GLAS dikorelasikan dengan variabel grid yang kontinu termasuk citra dan produk satelit Landsat 7 ETM+ (misalnya, reflektansi), ketinggian, dan variabel biofisik. Dengan menggunakan kumpulan data grid yang berkesinambungan sebagai masukan pada model randomForest, dihasilkan peta resolusi 30 m dari dinding ke dinding mengenai kepadatan biomassa kayu di atas permukaan tanah di seluruh daerah tropis serta lapisan ketidakpastian yang terkait. Lapisan ketidakpastian memperhitungkan kesalahan persamaan alometrik, model berbasis LiDAR, dan model randomForest. Semua kesalahan disebarkan ke estimasi biomassa akhir. Penjelasan rinci tentang pekerjaan ini akan dilaporkan dalam makalah baru yang sedang dipersiapkan.',
  },
  citation: {
    label: 'Rujukan',
    value:
      'Baccini A., W. Walker, L. Carvahlo, M. Farina, D. Sulla-Menashe, R. Houghton (2015). Hutan tropis merupakan sumber karbon bersih berdasarkan pengukuran baru mengenai keuntungan dan kerugian. Dalam ulasan. Diakses melalui Global Forest Watch Climate pada [tanggal]. iklim.globalforestwatch.org.',
  },
};
