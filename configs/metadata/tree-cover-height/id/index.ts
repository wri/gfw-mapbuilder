export const id = {
  title: 'Tinggi tutupan pohon',
  subtitle: '2000/2020, 30 m, global, UMD/NASA GEDI',
  download_data: '',
  learn_more: 'https://glad.umd.edu/dataset/gedi/',
  content: [
    {
      label: 'Fungsi',
      value: 'Tampilkan tinggi kanopi hutan global pada tahun 2000 dan 2020.',
    },
    {
      label: 'Resolusi',
      value: '30 meter (30 m)',
    },
    {
      label: 'Cakupan geografis',
      value: 'Global, dengan prototipe data di atas 52°LU',
    },
    {
      label: 'Sumber',
      value:
        'Potapov, P., Li, X., Hernandez-Serna, A., Tyukavina, A., Hansen, M.C., Kommareddy, A., Pickens, A., Turubanova, S., Tang, H., Silva, C.E. and Armston, J., 2021. Mapping global forest canopy height through integration of GEDI and Landsat data. Remote Sensing of Environment, 253, p.112165. https://doi.org/10.1016/j.rse.2020.112165',
    },
    {
      label: 'Frekuensi pembaruan',
      value: '',
    },
    {
      label: 'Tanggal konten',
      value: '2000 and 2020',
    },
    {
      label: 'Peringatan',
      value:
        'Peta ketinggian hutan global merupakan produk prototipe yang diketahui memiliki masalah terkait kualitas data GEDI dan ketersediaan data Landsat. Data GEDI melebih-lebihkan ketinggian hutan di lereng di padang rumput pegunungan beriklim sedang dan subtropis, mis. di Selandia Baru dan Lesotho. Ketinggian pohon di kota dan pinggiran kota mungkin terbaurkan dengan tinggi bangunan, karena data GEDI tidak membedakan antara ketinggian vegetasi dan obyek buatan manusia. Ketidakpastian kalibrasi GEDI (khususnya, presisi geolokasi dan estimasi ketinggian permukaan tanah) mungkin merupakan sumber atas sebagian kesalahan peta. Model ketinggian pohon mencapai titik jenuh di atas 30m dan mungkin tidak cukup mewakili ketinggian pohon tertinggi. Produk global akan diperbarui di masa mendatang untuk mengatasi sebagian besar masalah.',
    },
    {
      label: 'Lisensi',
      value: '',
    },
  ],
  overview: {
    label: 'Ikhtisar',
    value:
      'Suatu peta baru ketinggian kanopi hutan global dengan resolusi spasial 30m dikembangkan melalui integrasi pengukuran struktur hutan dengan lidar oleh Global Ecosystem Dynamics Investigation (GEDI) dan deret waktu data siap analisis Landsat. GEDI NASA adalah instrumen lidar antariksa yang beroperasi di International Space Station (ISS) sejak April 2019. Instrumen ini memberikan pengukuran berbasis titik atas struktur vegetasi, termasuk ketinggian kanopi hutan secara global antara 52°LU dan 52°LS. Tim Global Land Analysis and Discover di University of Maryland (UMD GLAD) mengintegrasikan data GEDI yang tersedia hingga saat ini (April-Oktober 2019) dengan deret waktu data siap analisis Landsat tahun 2019 (Landsat ARD). Metrik GEDI RH95 (tinggi relatif pada 95%) digunakan untuk mengkalibrasi model. Metrik multi-temporal Landsat yang merupakan representasi fenologi permukaan berfungsi sebagai variabel independen untuk pemodelan ketinggian hutan global. “Jendela bergerak” dikalibrasi secara lokal dan model ansambel regresi pohon diterapkan untuk memastikan tingginya kualitas prediksi ketinggian hutan dan konsistensi peta global. Model diekstrapolasi di wilayah boreal (di luar rentang data GEDI) untuk membuat peta prototipe ketinggian hutan global.',
  },
  citation: {
    label: 'Rujukan',
    value:
      'Potapov, P., Li, X., Hernandez-Serna, A., Tyukavina, A., Hansen, M.C., Kommareddy, A., Pickens, A., Turubanova, S., Tang, H., Silva, C.E. and Armston, J., 2021. Mapping global forest canopy height through integration of GEDI and Landsat data. Remote Sensing of Environment, 253, p.112165. https://doi.org/10.1016/j.rse.2020.112165. Accessed through Global Forest Watch on 14/02/2025. www.globalforestwatch.org.',
  },
};
