export const en = {
  title: 'Air Quality: Nitrogen Dioxide (NO₂) Satellite Measurements',
  subtitle: '',
  /* download_data: 'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/active-fire-data', */
  download_data: '',
  lean_more: 'https://sentinel.esa.int/web/sentinel/missions/sentinel-5p',
  content: [
    {
      label: 'Function',
      value: 'Average monthly density of nitrogen dioxide (NO₂) in the troposphere',
    },
    {
      label: 'Resolution',
      value: '3.5 x 5.5 km',
    },
    {
      label: 'Geographic Coverage',
      value: 'Global',
    },
    {
      label: 'Source',
      value: 'TROPOMI/ESA/KNMI/DLR/SRON/BIRA-IASB/STFC/MPIC/S[&]T/Uni-Bremen',
    },
    {
      label: 'Frequency of Updates',
      value: 'Monthly',
    },
    {
      label: 'Cautions',
      value:
        "The current surface albedo climatology used has a spatial resolution of 0.5° x 0.5° (approximately 55 x 55 km), which affects the NO₂ column products' quality, especially in coastal areas. TROPOMI generally underestimates tropospheric NO₂ densities at polluted sites, with a median negative bias of less than 50%. The correlation coefficient with MAX-DOAS NO₂ datasets is 0.84. For detailed data quality information, refer to the [product readme file](https://sentinel.esa.int/documents/247904/3541451/Sentinel-5P-Nitrogen-Dioxide-Level-2-Product-Readme-File).",
    },
    {
      label: 'License',
      value: '[Attribution required](https://sentinel.esa.int/documents/247904/690755/Sentinel_Data_Legal_Notice)',
    },
    {
      label: 'Tags',
      value: [
        'geospatial',
        'global',
        'air_quality',
        'raster',
        'historical',
        'pollution',
        'health',
        'near_real_time',
        'SDG_11_Sustainable_Cities_and_Communities',
        'SDG_target_11.6',
      ],
    },

    {
      label: 'Date of Content',
      value: '2022-05-18 - 2022-06-17',
    },
    {
      label: 'Content Date Range',
      value: {
        min: '2022-05-18',
        max: '2022-06-17',
      },
    },
  ],
  overview: {
    label: 'Overview',
    value:
      'The Air Quality: NO₂ Satellite Measurements dataset provides global monthly averages of nitrogen dioxide (NO₂) density in the troposphere. Each value shown in the dataset represents the density of NO₂ between Earth’s surface and the top of the troposphere. The NO₂ density is reported with units of moles of NO₂ per square meter of air (mol/m²).Nitrogen dioxide (NO₂) is one of the most common compounds in the nitrogen oxides (NOx) group. Other nitrogen oxides include nitric acid (HNO₃) and nitric oxide (NO). NO₂ is used as the indicator for the larger group of nitrogen oxides, meaning if NO₂ is present it is likely other nitrogen oxides are as well. NO₂ is primarily created by the burning of fuel, which can be from cars, trucks and buses, power plants, and off-road equipment. Breathing air with a high concentration of NO₂ can irritate airways in the human respiratory system. Acute exposures can aggravate respiratory diseases, particularly asthma, leading to respiratory symptoms, like coughing, wheezing or difficulty breathing. Longer chronic exposures to elevated concentrations of NO₂ may contribute to the development of asthma and potentially increase susceptibility to respiratory infections. People with asthma, as well as children and the elderly are generally at greater risk for the health effects of NO₂.The dataset is made up of data collected from the Sentinel-5 Precursor (S5p) mission, a low Earth orbit polar satellite system. The S5p mission is part of the Global Monitoring of the Environment and Security (GMES/COPERNICUS) space component program headed by the European Commission (EC) in partnership with the European Space Agency (ESA). Its goal is to  provide information and services on air quality, climate, and the ozone layer. The S5p mission includes the TROPOspheric Monitoring Instrument (TROPOMI), which takes daily global observations of key atmospheric components, such as NO₂, at a 5.5 x 3.5 kilometer (km) resolution.Resource Watch also shows TROPOMI data for [carbon monoxide (CO)](https://resourcewatch.org/data/explore/Air-Quality-Measurements-TROPOMI-CO), [ozone (O₃)](https://resourcewatch.org/data/explore/Air-Quality-Measurements-TROPOMI-O), and [absorbing aerosol index (AAI)](https://resourcewatch.org/data/explore/Air-Quality-Measurements-TROPOMI-AER-AI).',
  },
  citation: {
    label: 'Citation',
    value:
      'European Space Agency. 2018. ESA Sentinel-5P TROPOMI L3 products. Accessed through Resource Watch, (date). [www.resourcewatch.org](https://www.resourcewatch.org).',
  },
};
