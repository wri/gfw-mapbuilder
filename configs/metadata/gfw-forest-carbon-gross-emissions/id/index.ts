export const id = {
  title: 'Emisi Karbon Hutan',
  subtitle: '30 m, global, 2001-2024, Harris et al. 2021',
  download_data: 'https://data.globalforestwatch.org/datasets/753016096c1d49f0977e7b62533375ee',
  learn_more: '',
  content: [
    {
      label: 'Fungsi',
      value: 'Menampilkan emisi gas rumah kaca hutan dari kehilangan tutupan menyeluruh',
    },
    {
      label: 'Resolusi',
      value: '30 × 30m',
    },
    {
      label: 'Cakupan geografis',
      value: 'Global',
    },
    {
      label: 'Sumber',
      value:
        'Harris, N.L., D.A. Gibbs, A. Baccini, R.A. Birdsey, S. de Bruin, M. Farina, L. Fatoyinbo, M.C. Hansen, M. Herold, R.A. Houghton, P.V. Potapov, D. Requena Suarez, R.M. Roman-Cuesta, S.S. Saatchi, C.M. Slay, S.A. Turubanova, A. Tyukavina. 2021. Global maps of twenty-first century forest carbon fluxes. Nature Climate Change. https://doi.org/10.1038/s41558-020-00976-6',
    },
    {
      label: 'Frekuensi pembaruan',
      value: 'Tahunan',
    },
    {
      label: 'Tanggal konten',
      value: '2001-2024',
    },
    {
      label: 'Peringatan',
      value:
        '- Data ini adalah produk dari pemodelan dan dengan demikian secara inheren memiliki tingkat kesalahan dan ketidakpastian. Pengguna sangat dianjurkan untuk membaca dan memahami sepenuhnya metadata dan dokumentasi lain yang tersedia sebelum penggunaan data.\n- Nilai berlaku hanya untuk area hutan (tutupan kanopi >30 persen dan tinggi >5 m atau area dengan perolehan tutupan pohon). Lihat Harris et al. (2021) untuk informasi lebih lanjut tentang definisi hutan yang digunakan dalam analisis.\n- Meski emisi pada masing-masing piksel dikaitkan dengan suatu tahun terjadinya gangguan, emisi pada area minat menunjukkan angka total untuk periode model 2001-2024. Karenanya, nilai harus dibagi 23 untuk menghitung rata-rata penghilangan tahunan.\n- Emisi mencerminkan kehilangan tutupan menyeluruh seperti yang diamati pada citra satelit Landsat dan tidak termasuk emisi dari degradasi hutan yang tidak teramati.\n- Emisi mencerminkan perkiraan bruto, yakni, tidak mencakup penyerapan karbon akibat pertumbuhan kembali yang terjadi setelah gangguan. Sebaliknya, serapan karbon bruto diperhitungkan dalam lapisan pendamping serapan karbon hutan.\n- Data emisi mengandung inkonsistensi temporal. Peningkatan dalam pendeteksian kehilangan tutupan pohon karena penggunaan data satelit baru dan perubahan metodologi antara tahun 2011 dan 2015 dapat menghasilkan estimasi emisi yang lebih tinggi dalam beberapa tahun terakhir dibandingkan tahun-tahun sebelumnya. Baca di sini untuk informasi lebih lanjut.\n- Emisi karbon hutan tidak merepresentasikan transfer karbon dari kantong karbon ekosistem ke kantong produk kayu panen (HWP).\n- Dataset ini telah diperbarui sejak publikasi awalnya. Lihat Ikhtisar untuk informasi lebih lanjut.',
    },
    {
      label: 'Lisensi',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Ikhtisar',
    value:
      'Lapisan emisi ini adalah bagian dari model fluks karbon hutan yang dijabarkan dalam Harris et al. (2021). Dokumen ini memperkenalkan sebuah kerangka kerja pemantauan geospasial untuk mengestimasi fluks karbon hutan global yang dapat membantu berbagai aktor dan organisasi dalam melacak fluks gas rumah kaca dari hutan dan dalam mengurangi emisi atau menambah penghilangan oleh hutan. Emisi karbon hutan merepresentasikan emisi gas rumah kaca yang muncul dari gangguan hutan yang menggantikan tegakan dan terjadi pada tiap tahun yang dimodelkan (megagram emisi CO2/ha, antara tahun 2001 dan 2024). Emisi berisi semua kantong karbon ekosistem yang relevan (biomassa di atas permukaan tanah, biomassa di bawah permukaan tanah, kayu mati, serasah, karbon organik tanah) serta gas rumah kaca (CO2, CH4, N2O). Estimasi emisi untuk masing-masing piksel dikalkulasi sesuai Pedoman Inventarisasi Gas Rumah Kaca Nasional IPCC tempat gangguan yang menggantikan tegakan terjadi, sebagaimana dipetakan dalam data kehilangan tutupan pohon tahunan Global Forest Change dari Hansen et al. (2013). Karbon yang dilepas dari masing-masing piksel didasarkan pada kepadatan karbon pada tahun 2000, dengan penyesuaian untuk karbon yang terakumulasi antara tahun 2000 dan tahun terjadinya gangguan.\n\nEmisi menunjukkan sebuah estimasi kotor, yakni tidak disertakannya penghilangan karbon dari pertumbuhan kembali setelahnya. Alih-alih, penghilangan karbon kotor yang berasal dari pertumbuhan kembali setelahnya setelah pembukaan lahan diperhitungkan pada lapisan penghilangan karbon hutan pendamping. Sebagian kecil karbon yang dihasilkan dari masing-masing piksel saat terjadi gangguan (faktor emisi) dipengaruhi oleh sejumlah faktor, termasuk pendorong langsung gangguan, seperti kebakaran yang diamati pada tahun terjadinya peristiwa gangguan yang diamati atau sebelumnya, ataupun gangguan yang terjadi di lahan gambut, dan sebagainya. Semua emisi diasumsikan terjadi pada tahun terjadinya gangguan. Emisi dapat ditetapkan pada suatu tahun dengan menggunakan data kehilangan tutupan pohon Hansen; raster terpisah untuk emisi untuk masing-masing tahun tidak tersedia dari GFW. Semua lapisan input disampel ulang ke resolusi umum masing-masing 0,00025 × 0,00025 derajat agar sesuai dengan Hansen et al. (2013).\n\nKehilangan tutupan pohon, pendorong kehilangan tutupan pohon, dan area kebakaran diperbarui tiap tahunnya. Pada tahun 2024 dan 2024, sejumlah dataset dan konstanta input model juga diubah, sebagaimana dijabarkan di bawah. Silakan merujuk kepada postingan blog ini untuk informasi lebih lanjut.\n\n- Sumber rasio antara karbon biomassa di bawah permukaan tanah dan karbon biomassa di atas permukaan tanah. Sebelumnya menggunakan satu konstanta global; kini menggunakan peta dari Huang et al. 2021\n- Tahun terjadinya perolehan tutupan pohon. Sebelumnya menggunakan 2000-2012; kini menggunakan 2000-2020 dari Potapov et al. 2022.\n- Sumber data kebakaran. Sebelumnya menggunakan area kebakaran dari MODIS; kini menggunakan kehilangan tutupan pohon akibat kebakaran dari Tyukavina et al. 2022.\n- Sumber peta gambut. Dataset tropis baru telah disertakan dan dataset di atas 40 derajat utara telah diubah.\n- Konstanta potensi pemanasan global (global warming potential/GWP) untuk CH4 dan N2O. Sebelumnya menggunakan GWP dari Laporan Asesmen Kelima IPCC; kini menggunakan GWP dari Laporan Asesmen Keenam IPCC.\n- Faktor penghilangan untuk hutan gugur sekunder lama (>20 tahun) dan ketidakpastiannya yang berkaitan. Sebelumnya menggunakan faktor penghilangan yang dipublikasikan dalam Tabel 4.9 Penyempurnaan 2019 untuk Pedoman Inventarisasi Gas Rumah Kaca Nasional IPCC 2006; kini menggunakan faktor penghilangan dan ketidakpastian yang dikoreksi dari Corrigendum ke-4 Penyempurnaan 2019 untuk Pedoman Inventarisasi Gas Rumah Kaca Nasional IPCC 2006.\n- Batas pohon tanam dan faktor penghilangan. Sebelumnya menggunakan Spatial Database of Planted Trees (SDPT) Versi 1.0; kini menggunakan SDPT Versi 2.0 dan faktor penghilangan terkait.\n\nEmisi dapat diunduh dalam dua satuan area berbeda: 1) megagram emisi CO2/ha, dan 2) megagram emisi CO2/piksel. Satuan pertama cocok untuk memvisualkan (memetakan) emisi karena merepresentasikan kepadatan emisi per hektar. Satuan kedua cocok untuk menghitung emisi di suatu area minat karena nilai piksel di area minat dapat dijumlahkan guna memperoleh total emisi untuk area tersebut. Nilai pada satuan kedua dihitung dengan menyesuaikan emisi per hektar berdasarkan ukuran masing-masing piksel, yang berbeda tergantung garis lintang. Kedua dataset hanya berisi piksel dalam hutan, sebagaimana dijabarkan dalam metode Harris et al. (2021) dan diperbarui dengan perolehan tutupan pohon sepanjang tahun 2020. ',
  },
  citation: {
    label: 'Rujukan',
    value:
      'Harris et al. (2021). Global maps of 21st century forest carbon fluxes. Accessed on 14/02/2025 from Global Forest Watch.',
  },
};
