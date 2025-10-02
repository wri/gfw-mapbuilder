export const id = {
  title: 'Tutupan lahan 2015',
  subtitle: 'ESA/UCLouvain, 2015',
  download_data: 'http://maps.elie.ucl.ac.be/CCI/viewer/download.php',
  learn_more: 'http://maps.elie.ucl.ac.be/CCI/viewer/download/ESACCI-LC-Ph2-PUGv2_2.0.pdf',
  content: [
    {
      label: 'Fungsi',
      value: 'Menunjukkan distribusi global dari tutupan lahan pada tahun 2015',
    },
    {
      label: 'Resolusi',
      value: '300 × 300 meters',
    },
    {
      label: 'Cakupan geografis',
      value: 'Global',
    },
    {
      label: 'Sumber',
      value: '© ESA Climate Change Initiative - Land Cover led by UCLouvain (2017)',
    },
    {
      label: 'Frekuensi pembaruan',
      value: 'Tahunan',
    },
    {
      label: 'Tanggal konten',
      value: 2015,
    },
    {
      label: 'Peringatan',
      value:
        'Sebuah penilaian akurasi lengkap tersedia dari CCI. Pada umumnya, kelas tutupan lahan seperti lahan pertanian tadah hujan dan beririgasi, hutan daun lebar abadi, daerah perkotaan, daerah gundul, tubuh air, dan salju permanen ditemukan dapat dipetakan secara cukup akurat. Di sisi lain, kelas seperti lichenes dan lumut, vegetasi jarang, dan hutan berbanjir dengan air tawar dapat dipengaruhi oleh kesalahan.\n\nKualitas Data bervariasi antar wilayah, khususnya berkaitan dengan cakupan citra MERIS untuk pembuatan peta dasar. Daerah-daerah yang cakupannya kurang antara lain bagian barat dari Daerah Aliran Sungai Amazon, Chili dan bagian selatan Argentina, bagian barat dari Daerah Aliran Sungai Kongo serta teluk Guinea, bagian timur Rusia, dan pesisir timur China dan Indonesia.',
    },
    {
      label: 'Lisensi',
      value: 'http://maps.elie.ucl.ac.be/CCI/viewer/download.php',
    },
  ],
  overview: {
    label: 'Ikhtisar',
    value:
      'Set data ini (versi 2.07) dibuat sebagai bagian dari Climate Change Initiative (CCI), gerakan dari European Space Agency untuk menciptakan data jangka panjang, konsisten, dan global untuk tujuan simulasi cuaca. Proyek Selubung Tanah CCI menyampaikan peta selubung tanah global dengan resolusi spasial 300 m setiap tahunnya sejak 1992 hingga 2015. Platform Global Forest Watch hanya menampilkan data selubung tanah 2015.\n\nGuna memastikan konsistensi dari tahun ke tahun, peta tutupan lahan untuk setiap tahun diambil dari satu peta tutupan lahan dasar. Peta dasar dibuat menggunakan rekaman penuh dari citra MERIS sejak 2003 hingga 2012, menggunakan klasifikasi tanpa pengawasan serta algoritma pembelajaran mesin terhadap citra selama beberapa tahun. Perubahan kemudian dideteksi antar tahun tunggal di resolusi 1 km, menggunakan data AVHRR antara 1992 sampai 1999, data SPOT-VGT antara 1999 sampai 2013, serta data PROVA-V antara 2014 sampai 2015. Perubahan harus konsisten selama dua tahun berturut-turut agar dapat dihitung, dengan pengecualian perubahan hutan di 2014 dan 2015, yang diasumsikan terdeteksi dengan baik. Perubahan 1 km kemudian digabungkan dengan peta tutupan lahan dasar dan digambarkan ke 300 meter untuk 2004 ke atas (saat data MERIS dan PROVA-V tersedia).\n\nTotal data yang dihasilkan adalah 22 kelas tutupan lahan global. Untuk visualisasi yang lebih baik, Global Forest Watch hanya menampilkan satu set kelas yang telah disederhanakan, berdasarkan IPCC (pertanian, hutan, padang rumput, lahan basah, pemukiman, lahan bersemak, vegetasi jarang, wilayah gersang, perairan, serta es dan salju permanen). Set kelas lengkap serta peta tutupan lahan tahunan sejak tahun 1992 tersedia di penampil ESA/CCI.',
  },
  citation: {
    label: 'Rujukan',
    value:
      'ESA Climate Change Initiative, Land Cover - led by UC Louvain. “2015 global land cover.” Land Cover CCI Product User Guide Version 2. Tech. Rep. (2017). Available at: maps.elie.ucl.ac.be/CCI/viewer/download/ESACCI-LC-Ph2-PUGv2_2.0.pdf. Accessed through Global Forest Watch on 14/02/2025. www.globalforestwatch.org.',
  },
};
