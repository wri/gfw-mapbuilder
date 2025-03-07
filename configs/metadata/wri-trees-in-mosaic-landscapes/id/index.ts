export const id = {
  title: 'Tutupan Pohon Tropis',
  subtitle: '2020, 10 m/0.5 ha, tropical, WRI',
  download_data: 'https://data.globalforestwatch.org/datasets/tropical-tree-cover/explore',
  learn_more: '',
  content: [
    {
      label: 'Fungsi',
      value:
        'Menampilkan batas pohon pada skala sepuluh meter dan tutupan pohon pada skala setengah hektar untuk memungkinkan pemantauan pohon yang akurat di wilayah perkotaan, lahan pertanian, serta pada ekosistem kanopi terbuka dan hutan kering',
    },
    {
      label: 'Resolusi',
      value: '10 x 10 meter, setengah hektar',
    },
    {
      label: 'Cakupan geografis',
      value: '4,3 miliar hektar daerah tropis (garis lintang -23,44 sampai 23,44)',
    },
    {
      label: 'Sumber',
      value: 'World Resources Institute',
    },
    {
      label: 'Frekuensi pembaruan',
      value: 'Peta pendeteksian perubahan tahunan yang dimulai tahun 2017 direncanakan akan dirilis pada 2024.',
    },
    {
      label: 'Tanggal konten',
      value: 2020,
    },
    {
      label: 'Peringatan',
      value:
        'Set data ini menggunakan definisi pohon dan definisi tutupan pohon yang berbeda dengan Hansen et al. (2013). Set data ini mendefinisikan sebuah pohon berdasarkan tinggi dan diameter tajuknya. Vegetasi kayu di atas 5 meter tanpa memandang diameter tajuk, atau antara 3 dan 5 meter dengan diameter tajuk minimal 5 meter dianggap sebagai sebuah pohon. Definisi ini berbeda dengan Hansen et al. (2013), yang mendefinisikan pohon sebagai sebuah vegetasi dengan tinggi sedikitnya 5 meter. Set data tutupan pohon tropis tidak menghilangkan ambiguitas antara pohon tanam dan pohon non-tanam.\n\nAnalisis atau statistik yang diturunkan untuk shapefile berukuran di bawah 0,5 ha mungkin tidak akurat.',
    },
    {
      label: 'Lisensi',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Ikhtisar',
    value:
      'Data tutupan pohon tropis memetakan batas pohon pada skala sepuluh meter dan tutupan pohon pada skala setengah hektar untuk memungkinkan pemantauan pohon yang akurat di wilayah perkotaan, lahan pertanian, serta pada ekosistem kanopi terbuka dan hutan kering. Data ini meliputi 4,3 miliar hektar daerah tropis global.\n\nData ini diturunkan dari model jaringan neural konvolusional multitemporal yang diterapkan pada citra optik dan radar Sentinel. Set data berukuran 10 meter ini adalah lapisan batas pohon biner yang serupa dengan peta tutupan lahan, sementara data tutupan pohon merepresentasikan tutupan sebagian pada skala setengah hektar. Info lebih lanjut seputar metodologi dan analisis dapat ditemukan pada laman GitHub.',
  },
  citation: {
    label: 'Rujukan',
    value:
      'Use the following credit when this data is displayed: Source: 14/02/2025, accessed through Global Forest Watch on 14/02/2025\n\nUse the following credit when this data is cited: Brandt,\nBrandt, J., Ertel, J., Spore, J., & Stolle, F. (2023). WALL-to-wall\nmapping of tree extent in the tropics with sentinel-1 and sentinel-2. Remote Sensing of Environment, 292, 113574. https://doi.org/10.1016/j.rse.2023.11357',
  },
};
