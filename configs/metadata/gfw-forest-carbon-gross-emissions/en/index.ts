export const en = {
  title: 'Forest Carbon Emissions',
  subtitle: '30 m, global, 2001-2023, Harris et al. 2021',
  download_data: 'https://data.globalforestwatch.org/datasets/753016096c1d49f0977e7b62533375ee',
  learn_more: '',
  content: [
    {
      label: 'Function',
      value: 'Displays forest greenhouse gas emissions from stand-replacing disturbances',
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
      value: '2001-2023',
    },
    {
      label: 'Cautions',
      value:
        '- Data are the product of modeling and thus have an inherent degree of error and uncertainty. Users are strongly encouraged to read and fully comprehend the metadata and other available documentation prior to data use. \n- Values are applicable to forest areas only (canopy cover >30 percent and >5 m height or areas with tree cover gain). See Harris et al. (2021) for further information on the forest definition used in the analysis.\n- Although emissions in each pixel are associated with a specific year of disturbance, emissions over an area of interest reflect the total over the model period of 2001-2023. Thus, values must be divided by 23 to calculate average annual removals.\n- Emissions reflect stand-replacing disturbances as observed in Landsat satellite imagery and do not include emissions from unobserved forest degradation.\n- Emissions reflect a gross estimate, i.e., carbon removals from any regrowth that occurs after disturbance are not included. Instead, gross carbon removals are accounted for in the companion forest carbon removals layer.\n- Emissions data contain temporal inconsistencies. Improvements in the detection of tree cover loss due to the incorporation of new satellite data and methodology changes between 2011 and 2015 may result in higher estimates of emissions in recent years compared to earlier years. Refer here for additional information.\n- Forest carbon emissions do not reflect carbon transfers from ecosystem carbon pools to the harvested wood products (HWP) pool.\n- This dataset has been updated since its original publication. See Overview for more information.',
    },
    {
      label: 'License',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Overview',
    value:
      'This emissions layer is part of the forest carbon flux model described in Harris et al. (2021). This paper introduces a geospatial monitoring framework for estimating global forest carbon fluxes which can assist a variety of actors and organizations with tracking greenhouse gas fluxes from forests and in decreasing emissions or increasing removals by forests. Forest carbon emissions represent the greenhouse gas emissions arising from stand-replacing forest disturbances that occurred in each modeled year (megagrams CO2 emissions/ha, between 2001 and 2023). Emissions include all relevant ecosystem carbon pools (aboveground biomass, belowground biomass, dead wood, litter, soil organic carbon) and greenhouse gases (CO2, CH4, N2O). Emissions estimates for each pixel are calculated following IPCC Guidelines for national greenhouse gas inventories where stand-replacing disturbance occurred, as mapped in the Global Forest Change annual tree cover loss data of  Hansen et al. (2013). The carbon emitted from each pixel is based on carbon densities in 2000, with adjustment for carbon accumulated between 2000 and the year of disturbance.\n\nEmissions reflect a gross estimate, i.e., carbon removals from subsequent regrowth are not included. Instead, gross carbon removals resulting from subsequent regrowth after clearing are accounted for in the companion forest carbon removals layer. The fraction of carbon emitted from each pixel upon disturbance (emission factor) is affected by several factors, including the direct driver of disturbance, whether fire was observed in the year of or preceding the observed disturbance event, whether the disturbance occurred on peat, and more. All emissions are assumed to occur in the year of disturbance. Emissions can be assigned to a specific year using the Hansen tree cover loss data; separate rasters for emissions for each year are not available from GFW. All input layers were resampled to a common resolution of 0.00025 × 0.00025 degrees each to match Hansen et al. (2013).\n\nEach year, the tree cover loss, drivers of tree cover loss, and burned area are updated. In 2023 and 2024, a few model input data sets and constants were changed as well, as described below. Please refer to this blog post for more information.\n\n- The source of the ratio between belowground biomass carbon and aboveground biomass carbon. Previously used one global constant; now uses map from Huang et al. 2021\n- The years of tree cover gain. Previously used 2000-2012; now uses 2000-2020 from Potapov et al. 2022.\n- The source of fire data. Previously used MODIS burned area; now uses tree cover loss from fires from Tyukavina et al. 2022.\n- The source of peat maps. New tropical data sets have been included and the data set above 40 degrees north has been changed.\n- Global warming potential (GWP) constants for CH4 and N2O. Previously used GWPs from IPCC Fifth Assessment Report; now uses GWPs from IPCC Sixth Assessment Report.\n- Removal factors for older (>20 years) secondary temperate forests and their associated uncertainties. Previously used removal factors published in Table 4.9 of the 2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories; now uses corrected removal factors and uncertainties from the 4th Corrigenda to the 2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories.\n- Planted tree extent and removal factors. Previously used Spatial Database of Planted Trees (SDPT) Version 1.0; now uses SDPT Version 2.0 and associated removal factors.\n\nEmissions are available for download in two different area units: 1) megagrams of CO2 emissions/ha, and 2) megagrams of CO2 emissions/pixel. The first is appropriate for visualizing (mapping) emissions because it represents the density of emissions per hectare. The second is appropriate for calculating the emissions in an area of interest (AOI) because the values of the pixels in the AOI can be summed to obtain the total emissions for that area. The values in the latter were calculated by adjusting the emissions per hectare by the size of each pixel, which varies by latitude. Both datasets only include pixels within forests, as defined in the methods of Harris et al. (2021) and updated with tree cover gain through 2020. ',
  },
  citation: {
    label: 'Citation',
    value:
      'Harris et al. (2021). Global maps of 21st century forest carbon fluxes. Accessed on 14/02/2025 from Global Forest Watch.',
  },
};
