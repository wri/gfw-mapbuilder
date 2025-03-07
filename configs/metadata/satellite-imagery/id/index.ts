export const id = {
  title: 'Landsat-8 / Sentinel-2 Satellite Imagery',
  content: [
    {
      label: 'Fungsi',
      value:
        'Citra satelit beresolusi tinggi sangat penting guna menyediakan konteks untuk lapisan data lainnya yang tersedia di GFW, seperti menginterpretasi pendorong perubahan tutupan pohon. Itu umumnya digunakan untuk mengidentifikasi kemungkinan penyebab peringatan deforestasi yang mendekati waktu nyata. Citra juga dapat digunakan dalam protokol validasi, untuk menilai keakuratan produk tutupan dan perubahan lahan/hutan.',
    },
    {
      label: 'Resolusi',
      value: 'Sentinal-2: 10 x 10 meters, Landsat 8: 30 x 30 meters',
    },
    {
      label: 'Cakupan geografis',
      value: 'Global',
    },
    {
      label: 'Sumber',
      value:
        'Copernicus Sentinel-2. Retrieved from Google Earth Engine. Data processed by the European Space Agency (ESA).',
    },
    {
      label: 'Frekuensi pembaruan',
      value:
        'Citra baru tersedia setiap hari. Waktu kunjungan ulang citra: Sentinel-2A: Setiap 10 hari, Landsat 8: Setiap 16 hari',
    },
    {
      label: 'Tanggal konten',
      value: 'Januari 2012 - pres.',
    },
  ],
  overview: {
    label: 'Ikhtisar',
    value:
      'Data ini menampilkan citra satelit terkini yang memenuhi kriteria tutupan awan yang terpilih dari sistem Sentinel-2 dan Landsat 8. Sentinel-2, yang dioperasikan oleh Badan Antariksa Eropa (ESA), memiliki cakupan global dalam resolusi 10 meter, dan mampu memperoleh citra yang diperbarui tiap 10 hari. Landsat 8, yang dioperasikan oleh Survei Geologi Amerika Serikat (USGS), yang juga merupakan satelit global dan mampu memperoleh citra yang diperbarui dalam resolusi 30 meter tiap 16 hari. Citra yang menampilkan warna natural dan kesehatan vegetasi tersedia dari kedua satelit. Gambar berwarna natural menggunakan informasi dari cahaya yang tampak (merah, hijau, dan biru) untuk menampilkan permukaan Bumi sebagaimana terlihat oleh mata manusia. Kesehatan vegetasi dideteksi menggunakan Normalized Difference Vegetation Index (NDVI), yang menyertakan informasi tentang baik reflektivitas merah dan mendekati inframerah. Metode ini bergantung pada fakta bahwa vegetasi yang sehat menyerap cahaya yang paling tampak dan memantulkan sebagian besar cahaya mendekati inframerah yang jatuh di atas permukaannya. Saat menginterpretasikan citra yang menampilkan kesehatan vegetasi, warna merah menunjukkan vegetasi yang tumbuh sehat, hijau menunjukkan tanah kosong, dan hitam menunjukkan perairan.',
  },
};
