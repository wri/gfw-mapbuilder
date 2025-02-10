export const en = {
  title: 'Tropical aboveground live woody biomass density',
  subtitle: 'Tropics, Zarin/WHRC',
  download_data: 'http://data.globalforestwatch.org/datasets/8f93a6f94a414f9588ce4657a39c59ff_1',
  lean_more: '',
  content: [
    {
      label: 'Function',
      value: '<p>Shows carbon density values of aboveground live woody biomass</p>',
    },
    {
      label: 'Geographic Coverage',
      value: '<p>Tropics (30 degrees N, 20 degrees S)</p>',
    },

    {
      label: 'License',
      value: '<p>Creative Commons CC BY 4.0</p>',
    },

    {
      label: 'Citation',
      value:
        '<p>Baccini A., W. Walker, L. Carvahlo, M. Farina, D. Sulla-Menashe, R. Houghton (2015). Tropical forests are a net carbon source based on new measurements of gain and loss...</p>',
    },
    {
      label: 'Cautions',
      value:
        '<p>It is recommended that both aboveground carbon density and uncertainty values be used together for carbon assessments and verification. The map will provide accurate estimates of aboveground carbon stock and aboveground carbon density when aggregated to large areas (5,000 to 10,000 ha) for project and regional level assessments. The biomass density value of a single pixel may have large uncertainty when compared with small plots for verification.</p>',
    },
    {
      label: 'Date of Content',
      value: '<p>2000</p>',
    },
    {
      label: 'Source',
      value: '<p>ICEsat GLAS lidar, MODIS, Landsat, ground measurements</p>',
    },
    {
      label: 'Resolution',
      value: '<p>30 m</p>',
    },
    {
      label: 'Frequency of Updates',
      value: '<p>NA</p>',
    },
    {
      label: 'Tags',
      value: 'Biomass density',
    },
  ],
  overview: {
    label: 'Overview',
    value:
      '<p>This is a higher resolution data product that expands upon the methodology presented in Baccini et al. (2012) to generate a pan-tropical map of aboveground live woody biomass density at 30 m resolution for circa the year 2000. Along with the carbon density values, there is an error map at the same spatial resolution providing the uncertainty in aboveground carbon density estimation. These maps allow for the co-location of biomass estimates with Hansen et al. (2013, v1.0) tree cover loss estimates at similar spatial resolution. The statistical relationship derived between ground-based measurements of forest biomass density and co-located Geoscience Laser Altimeter System (GLAS) LiDAR waveform metrics as described by Baccini et al. (2012) were used to estimate the biomass density of more than 40,000 GLAS footprints throughout the tropics. Then, using randomForest models, the GLAS-derived estimates of biomass density were correlated to continuous, gridded variables including Landsat 7 ETM+ satellite imagery and products (e.g., reflectance), elevation, and biophysical variables. By using continuous gridded datasets as inputs to the randomForest models, a wall-to-wall 30 m resolution map of aboveground woody biomass density across the tropics was produced as well as the associated uncertainty layer. The uncertainty layer takes into account the errors from allometric equations, LiDAR based model, and randomForest model. All the errors are propagated to the final biomass estimate. A detailed description of the work will be reported in a new paper under preparation. </p>',
  },
  citation: {
    label: 'Citation',
    value: `<p>Baccini A., W. Walker, L. Carvahlo, M. Farina, D. Sulla-Menashe, R. Houghton (2015). Tropical forests are a net carbon source based on new measurements of gain and loss. In review. Accessed through Global Forest Watch Climate on [date]. climate.globalforestwatch.org. </p>`,
  },
};
