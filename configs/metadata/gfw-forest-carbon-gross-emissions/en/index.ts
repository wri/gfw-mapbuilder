export const en = {
  title: 'Forest Carbon Emissions',
  subtitle: '(2001-2023/30m/Harris et al. 2021)',
  download_data: 'https://data.globalforestwatch.org/datasets/753016096c1d49f0977e7b62533375ee',
  lean_more: '',
  content: [
    {
      label: 'Function',
      value: '<p>Displays forest greenhouse gas emissions from stand-replacing disturbances</p>',
    },
    {
      label: 'Geographic Coverage',
      value: '<p>Global</p>',
    },

    {
      label: 'License',
      value: '<p><a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></p>',
    },

    {
      label: 'Cautions',
      value:
        '<ul><br><li>Data are the product of modeling and thus have an inherent degree of error and uncertainty. Users are strongly encouraged to read and fully comprehend the metadata and other available documentation prior to data use.  </li><br><li>Values are applicable to forest areas only (canopy cover &gt;30 percent and &gt;5 m height or areas with tree cover gain). See <a href="https://www.nature.com/articles/s41558-020-00976-6">Harris et al. (2021)</a> for further information on the forest definition used in the analysis. </li><br><li>Although emissions in each pixel are associated with a specific year of disturbance, emissions over an area of interest reflect the total over the model period of 2001-2023. Thus, values must be divided by 23 to calculate average annual removals.   </li><br><li>Emissions reflect stand-replacing disturbances as observed in Landsat satellite imagery and do not include emissions from unobserved forest degradation. </li><br><li>Emissions reflect a gross estimate, i.e., carbon removals from any regrowth that occurs after disturbance are not included. Instead, gross carbon removals are accounted for in the companion forest carbon removals layer. </li><br><li>Emissions data contain temporal inconsistencies. Improvements in the detection of tree cover loss due to the incorporation of new satellite data and methodology changes between 2011 and 2015 may result in higher estimates of emissions in recent years compared to earlier years. Refer <a href="https://www.globalforestwatch.org/blog/data/20-years-global-tree-cover-loss-data-trends/">here</a> for additional information. </li><br><li>Forest carbon emissions do not reflect carbon transfers from ecosystem carbon pools to the harvested wood products (HWP) pool. </li><br><li>This dataset has been updated since its original publication. See Overview for more information.  </li><br></ul>',
    },
    {
      label: 'Date of Content',
      value: '<p>2001-2023</p>',
    },
    {
      label: 'Source',
      value:
        '<p>Harris, N.L., D.A. Gibbs, A. Baccini, R.A. Birdsey, S. de Bruin, M. Farina, L. Fatoyinbo, M.C. Hansen, M. Herold, R.A. Houghton, P.V. Potapov, D. Requena Suarez, R.M. Roman-Cuesta, S.S. Saatchi, C.M. Slay, S.A. Turubanova, A. Tyukavina. 2021. Global maps of twenty-first century forest carbon fluxes. Nature Climate Change. <a href="https://doi.org/10.1038/s41558-020-00976-6">https://doi.org/10.1038/s41558-020-00976-6</a></p>',
    },
    {
      label: 'Resolution',
      value: '<p>30 × 30m</p>',
    },
    {
      label: 'Frequency of Updates',
      value: '<p>Annual</p>',
    },
    {
      label: 'Tags',
      value: 'Forest Change',
    },
  ],
  overview: {
    label: 'Overview',
    value:
      '<p>This emissions layer is part of the forest carbon flux model described in <a href="https://www.nature.com/articles/s41558-020-00976-6">Harris et al. (2021)</a>. This paper introduces a geospatial monitoring framework for estimating global forest carbon fluxes which can assist a variety of actors and organizations with tracking greenhouse gas fluxes from forests and in decreasing emissions or increasing removals by forests. Forest carbon emissions represent the greenhouse gas emissions arising from stand-replacing forest disturbances that occurred in each modeled year (megagrams CO2 emissions/ha, between 2001 and 2023). Emissions include all relevant ecosystem carbon pools (aboveground biomass, belowground biomass, dead wood, litter, soil organic carbon) and greenhouse gases (CO2, CH4, N2O). Emissions estimates for each pixel are calculated following IPCC Guidelines for <a href="https://www.ipcc.ch/report/2019-refinement-to-the-2006-ipcc-guidelines-for-national-greenhouse-gas-inventories/">national greenhouse gas inventories</a> where stand-replacing disturbance occurred, as mapped in the Global Forest Change annual tree cover loss data of  <a href="https://www.science.org/doi/10.1126/science.1244693">Hansen et al. (2013)</a>. The carbon emitted from each pixel is based on carbon densities in 2000, with adjustment for carbon accumulated between 2000 and the year of disturbance.  </p><p>Emissions reflect a gross estimate, i.e., carbon removals from subsequent regrowth are not included. Instead, gross carbon removals resulting from subsequent regrowth after clearing are accounted for in the companion <a href="https://data.globalforestwatch.org/datasets/forest-carbon-removals">forest carbon removals layer</a>. The fraction of carbon emitted from each pixel upon disturbance (emission factor) is affected by several factors, including the direct driver of disturbance, whether fire was observed in the year of or preceding the observed disturbance event, whether the disturbance occurred on peat, and more. All emissions are assumed to occur in the year of disturbance. Emissions can be assigned to a specific year using the Hansen tree cover loss data; separate rasters for emissions for each year are not available from GFW. All input layers were resampled to a common resolution of 0.00025 × 0.00025 degrees each to match Hansen et al. (2013). </p><p>Each year, the tree cover loss, <a href="https://gfw.global/39qbPdC">drivers of tree cover loss</a>, and burned area are updated. In 2023 and 2024, a few model input data sets and constants were changed as well, as described below. Please refer to <a href="https://www.globalforestwatch.org/blog/data/whats-new-carbon-flux-monitoring/">this blog post</a> for more information.  </p><br><ol><br><li>The source of the ratio between belowground biomass carbon and aboveground biomass carbon. Previously used one global constant; now uses map from <a href="https://essd.copernicus.org/articles/13/4263/2021/">Huang et al. 2021</a></li><br><li>The years of tree cover gain. Previously used 2000-2012; now uses 2000-2020 from <a href="https://www.frontiersin.org/articles/10.3389/frsen.2022.856903/full">Potapov et al. 2022</a>. </li><br><li>The source of fire data. Previously used MODIS burned area; now uses tree cover loss from fires from <a href="https://www.frontiersin.org/articles/10.3389/frsen.2022.825190/full">Tyukavina et al. 2022</a>. </li><br><li>The source of peat maps. New tropical data sets have been included and the data set above 40 degrees north has been changed. </li><br><li>Global warming potential (GWP) constants for CH4 and N2O. Previously used GWPs from IPCC Fifth Assessment Report; now uses GWPs from IPCC <a href="https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_Chapter07.pdf">Sixth Assessment Report</a>. </li><br><li>Removal factors for older (&gt;20 years) secondary temperate forests and their associated uncertainties. Previously used removal factors published in <a href="https://www.ipcc-nggip.iges.or.jp/public/2019rf/pdf/4_Volume4/19R_V4_Ch04_Forest%20Land.pdf">Table 4.9</a> of the 2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories; now uses corrected removal factors and uncertainties from the 4th Corrigenda to the 2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories. </li><br><li>Planted tree extent and removal factors. Previously used Spatial Database of Planted Trees (SDPT) <a href="https://www.wri.org/research/spatial-database-planted-trees-sdpt-version-10">Version 1.0</a>; now uses <a href="https://www.wri.org/research/spatial-database-planted-trees-sdpt-version-2">SDPT Version 2.0</a> and associated removal factors.</li><br></ol><br><p>Emissions are available for download in two different area units: 1) megagrams of CO2 emissions/ha, and 2) megagrams of CO2 emissions/pixel. The first is appropriate for visualizing (mapping) emissions because it represents the density of emissions per hectare. The second is appropriate for calculating the emissions in an area of interest (AOI) because the values of the pixels in the AOI can be summed to obtain the total emissions for that area. The values in the latter were calculated by adjusting the emissions per hectare by the size of each pixel, which varies by latitude. Both datasets only include pixels within forests, as defined in the methods of Harris et al. (2021) and updated with tree cover gain through 2020.</p>',
  },
  citation: {
    label: 'Citation',
    value:
      '<p>Harris et al. (2021). Global maps of 21st century forest carbon fluxes. Accessed on [date] from Global Forest Watch.</p>',
  },
};
