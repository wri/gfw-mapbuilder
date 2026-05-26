export const id = {
  title: 'Fluks Karbon Hutan Bersih',
  subtitle: '30 m, global, 2001-2025, Harris et al. 2021',
  download_data: 'https://data.globalforestwatch.org/datasets/94871bf57f544ea39e594feb92b06305',
  learn_more: '',
  content: [
    {
      label: 'Fungsi',
      value:
        'Menampilkan kehilangan bersih karbon ekosistem hutan, dihitung sebagai selisih antara emisi karbon hutan dari gangguan hutan yang menggantikan tegakan dan penghilangan karbon dari pertumbuhan hutan ',
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
      value: '2001-2025',
    },
    {
      label: 'Peringatan',
      value:
        '- Data ini adalah produk dari pemodelan dan dengan demikian secara inheren memiliki tingkat kesalahan dan ketidakpastian. Pengguna sangat dianjurkan untuk membaca dan memahami sepenuhnya metadata dan dokumentasi lain yang tersedia sebelum penggunaan data.\n- Fluks bersih menunjukkan total pada periode model 2001-2025, dan bukan merupakan deret waktu tahunan yang dapat menghasilkan sebuah tren. Karenanya, nilai harus dibagi 23 untuk menghitung rata-rata fluks bersih tahunan.\n- Ketidakpastian lebih tinggi dalam penghilangan kotor daripada emisi, terutama didorong oleh ketidakpastian dalam faktor penghilangan. Ketidakpastian ini diterapkan ke ketidakpastian dalam fluks bersih.\n- Nilai berlaku untuk area hutan (tutupan kanopi >30 persen dan tinggi >5 m). Lihat Harris et al. (2021) untuk informasi lebih lanjut tentang definisi hutan yang digunakan dalam analisis.\n- Emisi mencerminkan kehilangan tutupan menyeluruh seperti yang diamati pada citra satelit Landsat dan tidak termasuk emisi dari degradasi hutan yang tidak teramati.\n -Data aktivitas digunakan sebagai basis dari estimasi yang mengandung inkonsistensi temporal:\n- Data penghilangan mengandung inkonsistensi temporal karena perolehan tutupan pohon merepresentasikan total kumulatif antara tahun 2000-2020, alih-alih perolehan tahunan sebagaimana diestimasikan sepanjang 2025.\n- Peningkatan dalam pendeteksian kehilangan tutupan pohon karena penggunaan data satelit baru dan perubahan metodologi antara tahun 2011 dan 2015 dapat menghasilkan estimasi emisi yang lebih tinggi dalam beberapa tahun terakhir dibandingkan tahun-tahun sebelumnya. Silakan merujuk ke sini untuk informasi lebih lanjut.\n- Lompatan besar dalam fluks bersih di sejumlah perbatasan disebabkan oleh penggunaan faktor penghilangan yang spesifik terhadap wilayah biogeografi. Perubahan dalam fluks bersih terjadi di perbatasan wilayah biogeografi, di mana sejumlah faktor penghilangan diterapkan pada masing-masing sisi.\n- Dataset ini telah diperbarui sejak publikasi awalnya. Lihat Ikhtisar untuk informasi lebih lanjut.',
    },
    {
      label: 'Lisensi',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Ikhtisar',
    value:
      'Lapisan fluks bersih ini adalah bagian dari model fluks karbon hutan yang dijabarkan dalam Harris et al. (2021). Dokumen ini memperkenalkan sebuah kerangka kerja pemantauan geospasial untuk mengestimasi fluks karbon hutan global yang dapat membantu berbagai aktor dan organisasi dalam melacak fluks gas rumah kaca dari hutan dan dalam mengurangi emisi atau menambah penghilangan oleh hutan. Fluks karbon hutan bersih merepresentasikan kehilangan bersih karbon ekosistem hutan, dihitung antara karbon yang dilepas oleh hutan dan dihilangkan oleh (atau disekuestrasikan oleh) hutan selama periode model. Fluks karbon bersih dikalkulasi dengan mengurangi penghilangan kotor rata-rata dari emisi kotor tahunan pada masing-masing piksel berhutan; nilai negatif adalah lokasi hutan yang merupakan penyerap karbon bersih dan nilai positif adalah lokasi hutan yang menjadi sumber karbon bersih antara tahun 2001 dan 2025. Fluks bersih dikalkulasi sesuai Pedoman Inventarisasi Gas Rumah Kaca Nasional IPCC pada tiap piksel tempat hutan ada pada tahun 2000 atau terbentuk antara tahun 2000 dan 2020 menurut Potapov et al. 2022. Lapisan ini menunjukkan fluks bersih kumulatif selama periode model (2001-2025) dan harus dibagi 23 untuk memperoleh fluks bersih tahunan rata-rata; nilai fluks bersih tidak dapat ditetapkan pada tahun model secara satuan. Semua lapisan input disampel ulang ke resolusi umum masing-masing 0,00025 × 0,00025 derajat agar sesuai dengan Hansen et al. (2013).\n\nKehilangan tutupan pohon, pendorong kehilangan tutupan pohon, dan area kebakaran diperbarui tiap tahunnya. Pada tahun 2025 dan 2025, sejumlah dataset dan konstanta input model juga diubah, sebagaimana dijabarkan di bawah. Silakan merujuk kepada postingan blog ini untuk informasi lebih lanjut.\n\n- Sumber rasion antara karbon di bawah permukaan tanah dan karbon di atas permukaan tanah. Sebelumnya menggunakan satu konstanta global; kini menggunakan peta dari Huang et al. 2021\n- Tahun terjadinya perolehan tutupan pohon. Sebelumnya menggunakan 2000-2012; kini menggunakan 2000-2020 dari Potapov et al. 2022.\n- Sumber data kebakaran. Sebelumnya menggunakan area kebakaran dari MODIS; kini menggunakan kehilangan tutupan pohon akibat kebakaran dari Tyukavina et al. 2022.\n- Sumber peta gambut. Dataset tropis baru telah disertakan dan dataset di atas 40 derajat utara telah diubah.\n- Konstanta potensi pemanasan global (global warming potential/GWP) untuk CH4 dan N2O. Sebelumnya menggunakan GWP dari Laporan Asesmen Kelima IPCC; kini menggunakan GWP dari Laporan Asesmen Keenam IPCC.\n- Faktor penghilangan untuk hutan gugur sekunder lama (>20 tahun) dan ketidakpastiannya yang berkaitan. Sebelumnya menggunakan faktor penghilangan yang dipublikasikan dalam Tabel 4.9 Penyempurnaan 2019 untuk Pedoman Inventarisasi Gas Rumah Kaca Nasional IPCC 2006; kini menggunakan faktor penghilangan dan ketidakpastian yang dikoreksi dari Corrigendum ke-4 Penyempurnaan 2019 untuk Pedoman Inventarisasi Gas Rumah Kaca Nasional IPCC 2006.\n- Batas pohon tanam dan faktor penghilangan. Sebelumnya menggunakan Spatial Database of Planted Trees (SDPT) Versi 1.0; kini menggunakan SDPT Versi 2.0 dan faktor penghilangan terkait.\n\nFluks bersih dapat diunduh dalam dua satuan area berbeda pada durasi model: 1) megagram emisi CO2/ha, dan 2) megagram emisi CO2/piksel. Satuan pertama cocok untuk memvisualkan (memetakan) fluks bersih karena merepresentasikan kepadatan fluks karbon per hektar. Satuan kedua cocok untuk menghitung fluks bersih di suatu area minat karena nilai piksel di area minat dapat dijumlahkan guna memperoleh total fluks karbon untuk area tersebut. Nilai pada satuan kedua dihitung dengan menyesuaikan fluks bersih per hektar berdasarkan ukuran masing-masing piksel, yang berbeda tergantung garis lintang. Saat mengestimasi fluks bersih yang terjadi pada sejumlah tahun antara 2001 dan 2025, bagi nilainya dengan durasi model kemudian kalikan dengan jumlah tahun pada periode minat. Kedua dataset hanya berisi piksel dalam hutan, sebagaimana dijabarkan dalam metode Harris et al. (2021) dan diperbarui dengan perolehan tutupan pohon sepanjang tahun 2020. ',
  },
  citation: {
    label: 'Rujukan',
    value:
      'Harris et al. (2021). Global maps of 21st century forest carbon fluxes. Accessed on 14/02/2025 from Global Forest Watch.',
  },
};
