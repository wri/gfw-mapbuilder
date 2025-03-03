export const id = {
  title: 'Kebakaran aktif VIIRS',
  subtitle: '(harian, 375 m, global, NASA)',
  download_data: 'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/active-fire-data',
  learn_more: 'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/viirs-i-band-active-fire-data',
  content: [
    {
      label: 'Fungsi',
      value: 'Menampilkan data peringatan kebakaran untuk 24 jam, 48 jam, 72 jam, atau 7 hari terakhir',
    },
    {
      label: 'Resolusi',
      value: '375 x 375 meter',
    },
    {
      label: 'Cakupan geografis',
      value: 'Global',
    },
    {
      label: 'Sumber',
      value: 'NASA',
    },
    {
      label: 'Frekuensi pembaruan',
      value: 'Dua kali sehari',
    },
    {
      label: 'Tanggal konten',
      value: 'Hampir waktu nyata',
    },
    {
      label: 'Peringatan',
      value:
        'Tidak semua kebakaran terdeteksi. Terdapat sejumlah alasan mengapa VIIRS mungkin tidak mendeteksi kebakaran tertentu. Kebakaran mungkin telah dimulai dan berakhir antara overpass satelit. Kebakaran mungkin terlalu kecil atau terlalu dingin untuk dideteksi dalam piksel 375 meter. Tutupan awan, asap tebal, atau kanopi pohon dapat menyembunyikan kebakaran sepenuhnya.',
    },
    {
      label: 'Lisensi',
      value:
        'Kami mengakui penggunaan data dan pencitraan dari LANCE FIRMS yang dioperasikan oleh NASA/GSFC/Earth Science Data and Information System (ESDIS) dengan pendanaan yang diberikan oleh NASA/HQ.',
    },
  ],
  overview: {
    label: 'Ikhtisar',
    value:
      'Data kebakaran aktif VIIRS (VNP14IMGT) adalah produk pemantauan kebakaran terbaru untuk FIRMS (Fire Information for Resource Management System), yang mengidentifikasi lokasi kebakaran global dalam hampir waktu nyata. Informasi dikumpulkan dari sensor Visible Infrared Imaging Radiometer Suite (VIIRS), dan diproses dengan algoritme deteksi kebakaran untuk menandai kebakaran aktif. Setiap titik pada peta mewakili pusat piksel seluas 375 meter yang telah ditandai oleh algoritme.',
  },
  citation: {
    label: 'Rujukan',
    value:
      'NASA FIRMS. “VIIRS Active Fires.” Accessed through Global Forest Watch on 30/01/2025. www.globalforestwatch.org',
  },
};
