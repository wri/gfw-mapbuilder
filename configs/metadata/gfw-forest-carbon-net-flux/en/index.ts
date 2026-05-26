export const en = {
  title: 'Net Forest Carbon Flux',
  subtitle: '30 m, global, 2001-2025, Harris et al. 2021',
  download_data: 'https://data.globalforestwatch.org/datasets/94871bf57f544ea39e594feb92b06305',
  learn_more: '',
  content: [
    {
      label: 'Function',
      value:
        'Displays the net loss of forest ecosystem carbon, calculated as the difference between forest carbon emissions from stand-replacing forest disturbances and carbon removals from forest growth ',
    },
    {
      label: 'Resolution',
      value: '30 × 30m',
    },
    {
      label: 'Geographic coverage',
      value: 'Global',
    },
    {
      label: 'Source',
      value:
        'Harris, N.L., D.A. Gibbs, A. Baccini, R.A. Birdsey, S. de Bruin, M. Farina, L. Fatoyinbo, M.C. Hansen, M. Herold, R.A. Houghton, P.V. Potapov, D. Requena Suarez, R.M. Roman-Cuesta, S.S. Saatchi, C.M. Slay, S.A. Turubanova, A. Tyukavina. 2021. Global maps of twenty-first century forest carbon fluxes. Nature Climate Change. https://doi.org/10.1038/s41558-020-00976-6',
    },
    {
      label: 'Frequency',
      value: 'Annual',
    },
    {
      label: 'Date of content',
      value: '2001-2025',
    },
    {
      label: 'Cautions',
      value:
        '- Data are the product of modeling and thus have an inherent degree of error and uncertainty. Users are strongly encouraged to read and fully comprehend the metadata and other available documentation prior to data use.\n- Net flux reflects the total over the model period of 2001-2025, not an annual time series from which a trend can be derived. Thus, values must be divided by 23 to calculate average annual net flux.\n- Uncertainty is higher in gross removals than emissions, particularly driven by uncertainty in removal factors. These uncertainties are propagated to the uncertainty in net flux.\n- Values are applicable to forest areas (canopy cover >30 percent and >5 m height). See Harris et al. (2021) for further information on the forest definition used in the analysis.\n- Emissions reflect stand-replacing disturbances as observed in Landsat satellite imagery and do not include emissions from unobserved forest degradation.\n- Activity data used as the basis of the estimates contain temporal inconsistencies:\n- Removals data contain temporal inconsistencies because tree cover gain represents a cumulative total from 2000-2020, rather than annual gains as estimated through 2025.\n- Improvements in the detection of tree cover loss due to the incorporation of new satellite data and methodology changes between 2011 and 2015 may result in higher estimates of emissions in recent years compared to earlier years. Refer here for additional information.\n- Large jumps in net flux along some boundary are due to the use of ecozone-specific removal factors. The changes in net flux occur at ecozone boundaries, where different removal factors are applied on each side.\n- This dataset has been updated since its original publication. See Overview for more information.',
    },
    {
      label: 'License',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Overview',
    value:
      'This net flux layer is part of the forest carbon flux model described in Harris et al. (2021). This paper introduces a geospatial monitoring framework for estimating global forest carbon fluxes which can assist a variety of actors and organizations with tracking greenhouse gas fluxes from forests and in decreasing emissions or increasing removals by forests. Net forest carbon flux represents the net loss of forest ecosystem carbon, calculated as the between carbon emitted by forests and removed by (or sequestered by) forests during the model period. Net carbon flux is calculated by subtracting average gross removals from annual gross emissions in each forested pixel; negative values are where forests were net sinks of carbon and positive values are where forests were net sources of carbon between 2001 and 2025. Net fluxes are calculated following IPCC Guidelines for national greenhouse gas inventories in each pixel where forests existed in 2000 or were established between 2000 and 2020 according to Potapov et al. 2022. This layer reflects the cumulative net flux during the model period (2001-2025) and must be divided by 23 to obtain average annual net flux; net flux values cannot be assigned to individual years of the model. All input layers were resampled to a common resolution of 0.00025 x 0.00025 degrees each to match Hansen et al. (2013).\n\n- Each year, the tree cover loss, drivers of tree cover loss, and burned area are updated. In 2025 and 2025, a few model input data sets and constants were changed as well, as described below. Please refer to this blog post for more information.\n- The source of the ratio between belowground carbon and aboveground carbon. Previously used one global constant; now uses map from Huang et al. 2021\n- The years of tree cover gain. Previously used 2000-2012; now uses 2000-2020 from Potapov et al. 2022.\n- The source of fire data. Previously used MODIS burned area; now uses tree cover loss from fires from Tyukavina et al. 2022.\n- The source of peat maps. New tropical data sets have been included and the data set above 40 degrees north has been changed.\n- Global warming potential (GWP) constants for CH4 and N2O. Previously used GWPs from IPCC Fifth Assessment Report; now uses GWPs from IPCC Sixth Assessment Report.\n- Removal factors for older (>20 years) secondary temperate forests and their associated uncertainties. Previously used removal factors published in Table 4.9 of the 2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories; now uses corrected removal factors and uncertainties from the 4th Corrigenda to the 2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories.\n- Planted tree extent and removal factors. Previously used Spatial Database of Planted Trees (SDPT) Version 1.0; now uses SDPT Version 2.0 and associated removal factors.\n\nNet flux is available for download in two different area units over the model duration: 1) megagrams of CO2 emissions/ha, and 2) megagrams of CO2 emissions/pixel. The first is appropriate for visualizing (mapping) net flux because it represent the density of carbon fluxes per hectare. The second is appropriate for calculating the net flux in an area of interest (AOI) because the values of the pixels in the AOI can be summed to obtain the total carbon flux for that area. The values in the latter were calculated by adjusting the net flux per hectare by the size of each pixel, which varies by latitude. When estimating net flux occurring over a defined number of years between 2001 and 2025, divide the values by the model duration and then multiply by the number of years in the period of interest. Both datasets only include pixels within forests, as defined in the methods of Harris et al. (2021) and updated with tree cover gain through 2020.',
  },
  citation: {
    label: 'Citation',
    value:
      'Harris et al. (2021). Global maps of 21st century forest carbon fluxes. Accessed on 14/02/2025 from Global Forest Watch.',
  },
};
