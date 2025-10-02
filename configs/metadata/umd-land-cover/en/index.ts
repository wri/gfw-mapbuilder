export const en = {
  title: 'Land Cover 2000-2020',
  subtitle: 'UMD',
  download_data: '',
  learn_more: '',
  content: [
    {
      label: 'Function',
      value: 'Global land use and land cover map for 2000 and 2020',
    },
    {
      label: 'Resolution',
      value: '30 meters',
    },
    {
      label: 'Geographic coverage',
      value: 'Global',
    },
    {
      label: 'Source',
      value: 'UMD',
    },
    {
      label: 'Frequency',
      value: '',
    },
    {
      label: 'Date of content',
      value: '',
    },
    {
      label: 'Cautions',
      value:
        '- Land cover mapping was limited by the Landsat clear-sky data availability. The incompleteness of the Landsat observation time series decreases the map accuracy in regions with persistent cloud cover. \n- Discrete land cover classes mapping in heterogeneous landscapes was constrained by the high proportion of mixed pixels at the Landsat spatial resolution. Most LULC classes have higher map accuracy over large homogeneous areas compared to fragmented landscapes and class patch edges. \n- The spectral similarity between different LCLU classes may preclude class discrimination.\n- The forest height product has issues related to GEDI data quality and Landsat data availability. Small changes in forest height between the years 2000 and 2020 may not indicate the actual forest structure change but represent the noise in the model outputs. \n- Dynamic classes (LCLU class loss and gain) have lower accuracies compared to static maps. \n- Map-based estimates are not adequate for national and international reporting due to unknown spatial and temporal variability of map uncertainty.',
    },
    {
      label: 'License',
      value: 'Creative Commons Attribution License (https://glad.umd.edu/dataset/GLCLUC2020)',
    },
  ],
  overview: {
    label: 'Overview',
    value:
      'The global land use and land cover maps were created by the Global Land Analysis and Discovery Lab (GLAD) laboratory, and the data is available at 30 m spatial resolution for 2000 and 2020. The GLAD laboratory used the spatiotemporally consistent [Landsat Analysis Ready Data (GLAD ARD)](https://glad.umd.edu/ard) to quantify changes in forest extent and height, cropland, built-up lands, surface water, and perennial snow and ice extent over the twenty year period. Each thematic product was independently derived using state-of-the-art, locally and regionally calibrated machine learning tools. The dataset was validated using a statistical sampling which confirms its high accuracy. The Global Land Analysis and Discovery Lab (GLAD) laboratory in the Department of Geographical Sciences at UMD investigates methods, causes, and impacts of global land surface change. Earth observation imagery is the primary data source, and the land cover extent and change is the primary topic of interest. GLAD aspires to generate new science insights concerning land resources, educate the next generation of remote sensing-based land change scientists, and disseminate land monitoring capabilities to operational settings nationally and internationally.',
  },
  citation: {
    label: 'Citation',
    value:
      'Potapov P., Hansen M.C., Pickens A., Hernandez-Serna A., Tyukavina A., Turubanova S., Zalles V., Li X., Khan A., Stolle F., Harris N., Song X.-P., Baggett A., Kommareddy I., Kommareddy A. (2022) The global 2000-2020 land cover and land use change dataset derived from the Landsat archive: first results. Frontiers in Remote Sensing. [https://doi.org/10.3389/frsen.2022.856903](https://doi.org/10.3389/frsen.2022.856903). Accessed through Resource Watch, (date). [www.resourcewatch.org](https://www.resourcewatch.org).',
  },
};
