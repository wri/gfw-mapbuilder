export const en = {
  title: 'Tree cover height',
  subtitle: '2000/2020, 30 m, global, UMD/NASA GEDI',
  download_data: '',
  learn_more: 'https://glad.umd.edu/dataset/gedi/',
  content: [
    {
      label: 'Function',
      value: 'Show the height of global forest canopy in the years 2000 and 2020.',
    },
    {
      label: 'Resolution',
      value: '30 m',
    },
    {
      label: 'Geographic coverage',
      value: 'Global, with prototype data above 52°N',
    },
    {
      label: 'Source',
      value:
        'Potapov, P., Li, X., Hernandez-Serna, A., Tyukavina, A., Hansen, M.C., Kommareddy, A., Pickens, A., Turubanova, S., Tang, H., Silva, C.E. and Armston, J., 2021. Mapping global forest canopy height through integration of GEDI and Landsat data. Remote Sensing of Environment, 253, p.112165. https://doi.org/10.1016/j.rse.2020.112165',
    },
    {
      label: 'Frequency',
      value: '',
    },
    {
      label: 'Date of content',
      value: '2000 and 2020',
    },
    {
      label: 'Cautions',
      value:
        'The global forest height map is a prototype product that has known issues related to GEDI data quality and Landsat data availability. GEDI data overestimate forest height on slopes within temperate and subtropical mountain grasslands, e.g. in New Zealand and Lesotho. The tree height over cities and suburbs may be confounded with the building height, as GEDI data do not discriminate between the height of vegetation and man-made objects. The GEDI calibration uncertainties (specifically, geolocation precision and land surface height estimation) may be responsible for some of the map errors. The tree height model saturated above 30m and may not adequately represent the height of the tallest trees. The global product will be updated in the future to address most of the issues.',
    },
    {
      label: 'License',
      value: '',
    },
  ],
  overview: {
    label: 'Overview',
    value:
      'A new, 30-m spatial resolution global forest canopy height map was developed through the integration of the Global Ecosystem Dynamics Investigation (GEDI) lidar forest structure measurements and Landsat analysis-ready data time-series. The NASA GEDI is a spaceborne lidar instrument operating onboard the International Space Station since April 2019. It provides point-based measurements of vegetation structure, including forest canopy height between 52°N and 52°S globally. The Global Land Analysis and Discover team at the University of Maryland (UMD GLAD) integrated the GEDI data available to date (April-October 2019) with the year 2019 Landsat analysis-ready time-series data (Landsat ARD). The GEDI RH95 (relative height at 95%) metric was used to calibrate the model. The Landsat multi-temporal metrics that represent the surface phenology serve as the independent variables for global forest height modeling. The “moving window” locally calibrated and applied regression tree ensemble model was implemented to ensure high quality of forest height prediction and global map consistency. The model was extrapolated in the boreal regions (beyond the GEDI data range) to create the global forest height prototype map.',
  },
  citation: {
    label: 'Citation',
    value:
      'Potapov, P., Li, X., Hernandez-Serna, A., Tyukavina, A., Hansen, M.C., Kommareddy, A., Pickens, A., Turubanova, S., Tang, H., Silva, C.E. and Armston, J., 2021. Mapping global forest canopy height through integration of GEDI and Landsat data. Remote Sensing of Environment, 253, p.112165. https://doi.org/10.1016/j.rse.2020.112165. Accessed through Global Forest Watch on 14/02/2025. www.globalforestwatch.org.',
  },
};
