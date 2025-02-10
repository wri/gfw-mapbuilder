export const en = {
  title: 'Forest Carbon Removals',
  subtitle: '(2001-2023/30m/Harris et al. 2021)',
  download_data: 'https://data.globalforestwatch.org/datasets/94871bf57f544ea39e594feb92b06305',
  lean_more: 'https://www.nature.com/articles/s41558-020-00976-6',
  content: [
    {
      label: 'Function',
      value: '<p>Displays forest carbon removals by forest sinks</p>',
    },
    {
      label: 'Geographic Coverage',
      value: '<p>Global</p>',
    },

    {
      label: 'Cautions',
      value:
        '<ul><li>Data are the product of modeling and thus have an inherent degree of error and uncertainty...</li></ul>',
    },
    {
      label: 'Date of Content',
      value: '<p>2001-2023</p>',
    },

    {
      label: 'Source',
      value:
        '<p>Harris, N.L., D.A. Gibbs, A. Baccini, R.A. Birdsey, S. de Bruin, M. Farina, L. Fatoyinbo, M.C. Hansen, M. Herold, R.A. Houghton, P.V. Potapov, D. Requena Suarez, R.M. Roman-Cuesta, S.S. Saatchi, C.M. Slay, S.A. Turubanova, A. Tyukavina. 2021...</p>',
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
      '<p>This carbon removals layer is part of the forest carbon flux model described in <a href="https://www.nature.com/articles/s41558-020-00976-6">Harris et al. (2021)</a>. This paper introduces a geospatial monitoring framework for estimating global forest carbon fluxes which can assist a variety of actors and organizations with tracking greenhouse gas fluxes from forests and in decreasing emissions or increasing removals by forests. Forest carbon removals from the atmosphere (sequestration) by forest sinks represent the cumulative carbon captured (megagrams CO2/ha) by the growth of established and newly regrowing forests during the model period between 2001-2023. Removals include accumulation of carbon in both aboveground and belowground live tree biomass. Following IPCC Tier 1 assumptions for forests remaining forests, removals by dead wood, litter, and soil carbon pools are assumed to be zero. In each pixel, carbon removals are calculated following IPCC Guidelines for <a href="https://www.ipcc.ch/report/2019-refinement-to-the-2006-ipcc-guidelines-for-national-greenhouse-gas-inventories/">national greenhouse gas inventories</a> where forests existed in 2000 or were established between 2000 and 2020 according to <a href="https://www.frontiersin.org/articles/10.3389/frsen.2022.856903/full">Potapov et al. 2022</a>. Atmospheric carbon removed in each pixel is based on maps of forest type (e.g., mangrove, plantation), ecozone (e.g., humid Neotropics), forest age (e.g., primary, old secondary), and number of years of carbon removal. This layer reflects the cumulative removals during the model period (2001-2023) and must be divided by 23 to obtain an annual average during the model duration; removal rates cannot be assigned to individual years of the model. All input layers were resampled to a common resolution of 0.00025 x 0.00025 degrees each to match <a href="https://www.science.org/doi/10.1126/science.1244693">Hansen et al. (2013)</a>.</p><p>Each year, the tree cover loss, <a href="https://gfw.global/39qbPdC">drivers of tree cover loss</a>, and burned area are updated. In 2023 and 2024, a few model input data sets and constants were changed as well, as described below. Please refer to <a href="https://www.globalforestwatch.org/blog/data/whats-new-carbon-flux-monitoring/">this blog post</a> for more information.  </p><br><ol><br><li>The source of the ratio between belowground biomass carbon and aboveground biomass carbon. Previously used one global constant; now uses map from <a href="https://essd.copernicus.org/articles/13/4263/2021/">Huang et al. 2021</a></li><br><li>The years of tree cover gain. Previously used 2000-2012; now uses 2000-2020 from <a href="https://www.frontiersin.org/articles/10.3389/frsen.2022.856903/full">Potapov et al. 2022</a>. </li><br><li>The source of fire data. Previously used MODIS burned area; now uses tree cover loss from fires from <a href="https://www.frontiersin.org/articles/10.3389/frsen.2022.825190/full">Tyukavina et al. 2022</a>. </li><br><li>The source of peat maps. New tropical data sets have been included and the data set above 40 degrees north has been changed. </li><br><li>Global warming potential (GWP) constants for CH4 and N2O. Previously used GWPs from IPCC Fifth Assessment Report; now uses GWPs from IPCC <a href="https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_Chapter07.pdf">Sixth Assessment Report</a>. </li><br><li>Removal factors for older (&gt;20 years) secondary temperate forests and their associated uncertainties. Previously used removal factors published in <a href="https://www.ipcc-nggip.iges.or.jp/public/2019rf/pdf/4_Volume4/19R_V4_Ch04_Forest%20Land.pdf">Table 4.9</a> of the 2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories; now uses corrected removal factors and uncertainties from the 4th Corrigenda to the 2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories. </li><br><li>Planted tree extent and removal factors. Previously used Spatial Database of Planted Trees (SDPT) <a href="https://www.wri.org/research/spatial-database-planted-trees-sdpt-version-10">Version 1.0</a>; now uses <a href="https://www.wri.org/research/spatial-database-planted-trees-sdpt-version-2">SDPT Version 2.0</a> and associated removal factors. </li><br></ol><br><p>Removals are available for download in two different area units over the model duration: 1) megagrams of CO2 removed/ha, and 2) megagrams of CO2 removed/pixel. The first is appropriate for visualizing (mapping) removals because it represents the density of removals per hectare. The second is appropriate for calculating the removals in an area of interest (AOI) because the values of the pixels in the AOI can be summed to obtain the total removals for that area. The values in the latter were calculated by adjusting the removals per hectare by the size of each pixel, which varies by latitude. When estimating removals occurring over a defined number of years between 2001 and 2023 to compare to emissions, divide total carbon removals by the model duration and then multiply by the number of years in the period of interest. Both datasets only include pixels within forests, as defined in the methods of Harris et al. (2021) and updated with tree cover gain through 2020.   </p>',
  },
  citation: {
    label: 'Citation',
    value: `<p>Harris et al. (2021). Global maps of 21st century forest carbon fluxes. Accessed on [date] from Global Forest Watch.</p>`,
  },
};
