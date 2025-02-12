export const en = {
  title: 'Net Forest Carbon Flux',
  subtitle: '(2001-2023/30m/Harris et al. 2021)',
  download_data: 'https://data.globalforestwatch.org/datasets/94871bf57f544ea39e594feb92b06305',
  lean_more: '',
  content: [
    {
      label: 'Function',
      value:
        '<p>Displays the net loss of forest ecosystem carbon, calculated as the difference between forest carbon emissions from stand-replacing forest disturbances and carbon removals from forest growth</p>',
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
        '<ul><br><li>Data are the product of modeling and thus have an inherent degree of error and uncertainty. Users are strongly encouraged to read and fully comprehend the metadata and other available documentation prior to data use.  </li><br><li>Net flux reflects the total over the model period of 2001-2023, not an annual time series from which a trend can be derived. Thus, values must be divided by 23 to calculate average annual net flux. </li><br><li>Uncertainty is higher in gross removals than emissions, particularly driven by uncertainty in removal factors. These uncertainties are propagated to the uncertainty in net flux.  </li><br><li>Values are applicable to forest areas (canopy cover &gt;30 percent and &gt;5 m height). See Harris et al. (2021) for further information on the forest definition used in the analysis. </li><br><li>Emissions reflect stand-replacing disturbances as observed in Landsat satellite imagery and do not include emissions from unobserved forest degradation. </li><br><li>Activity data used as the basis of the estimates contain temporal inconsistencies: </li><br><li>Removals data contain temporal inconsistencies because tree cover gain represents a cumulative total from 2000-2020, rather than annual gains as estimated through 2023. </li><br><li>Improvements in the detection of tree cover loss due to the incorporation of new satellite data and methodology changes between 2011 and 2015 may result in higher estimates of emissions in recent years compared to earlier years. Refer <a href="https://www.globalforestwatch.org/blog/data/20-years-global-tree-cover-loss-data-trends/">here</a> for additional information. </li><br><li>Large jumps in net flux along some boundary are due to the use of ecozone-specific removal factors. The changes in net flux occur at ecozone boundaries, where different removal factors are applied on each side. </li><br><li>This dataset has been updated since its original publication. See Overview for more information.</li><br></ul>',
    },
    {
      label: 'Date of Content',
      value: '<p>2001-2023</p>',
    },
    {
      label: 'Source',
      value:
        '<p>Harris, N.L., D.A. Gibbs, A. Baccini, R.A. Birdsey, S. de Bruin, M. Farina, L. Fatoyinbo, M.C. Hansen, M. Herold, R.A. Houghton, P.V. Potapov, D. Requena Suarez, R.M. Roman-Cuesta, S.S. Saatchi, C.M. Slay, S.A. Turubanova, A. Tyukavina. 2021. Global maps of twenty-first century forest carbon fluxes. Nature Climate Change. https://doi.org/10.1038/s41558-020-00976-6</p>',
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
      '<p>This net flux layer is part of the forest carbon flux model described in Harris et al. (2021). This paper introduces a geospatial monitoring framework for estimating global forest carbon fluxes which can assist a variety of actors and organizations with tracking greenhouse gas fluxes from forests and in decreasing emissions or increasing removals by forests. Net forest carbon flux represents the net loss of forest ecosystem carbon, calculated as the between carbon emitted by forests and removed by (or sequestered by) forests during the model period. Net carbon flux is calculated by subtracting average gross removals from annual gross emissions in each forested pixel; negative values are where forests were net sinks of carbon and positive values are where forests were net sources of carbon between 2001 and 2023. Net fluxes are calculated following IPCC Guidelines for national greenhouse gas inventories in each pixel where forests existed in 2000 or were established between 2000 and 2020 according to <a href="https://www.frontiersin.org/articles/10.3389/frsen.2022.856903/full">Potapov et al. 2022</a>. This layer reflects the cumulative net flux during the model period (2001-2023) and must be divided by 23 to obtain average annual net flux; net flux values cannot be assigned to individual years of the model. All input layers were resampled to a common resolution of 0.00025 x 0.00025 degrees each to match Hansen et al. (2013).  </p><p>Each year, the tree cover loss, <a href="https://gfw.global/39qbPdC">drivers of tree cover loss</a>, and burned area are updated. In 2023 and 2024, a few model input data sets and constants were changed as well, as described below. Please refer to <a href="https://www.globalforestwatch.org/blog/data/whats-new-carbon-flux-monitoring/">this blog post</a> for more information.  </p><br><ol><br><li>The source of the ratio between belowground carbon and aboveground carbon. Previously used one global constant; now uses map from <a href="https://essd.copernicus.org/articles/13/4263/2021/">Huang et al. 2021</a></li><br><li>The years of tree cover gain. Previously used 2000-2012; now uses 2000-2020 from <a href="https://www.frontiersin.org/articles/10.3389/frsen.2022.856903/full">Potapov et al. 2022</a>. </li><br><li>The source of fire data. Previously used MODIS burned area; now uses tree cover loss from fires from <a href="https://www.frontiersin.org/articles/10.3389/frsen.2022.825190/full">Tyukavina et al. 2022</a>. </li><br><li>The source of peat maps. New tropical data sets have been included and the data set above 40 degrees north has been changed. </li><br><li>Global warming potential (GWP) constants for CH4 and N2O. Previously used GWPs from IPCC Fifth Assessment Report; now uses GWPs from IPCC <a href="https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_Chapter07.pdf">Sixth Assessment Report</a>. </li><br><li>Removal factors for older (&gt;20 years) secondary temperate forests and their associated uncertainties. Previously used removal factors published in <a href="https://www.ipcc-nggip.iges.or.jp/public/2019rf/pdf/4_Volume4/19R_V4_Ch04_Forest%20Land.pdf">Table 4.9</a> of the 2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories; now uses corrected removal factors and uncertainties from the 4th Corrigenda to the 2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories. </li><br><li>Planted tree extent and removal factors. Previously used Spatial Database of Planted Trees (SDPT) <a href="https://www.wri.org/research/spatial-database-planted-trees-sdpt-version-10">Version 1.0</a>; now uses <a href="https://www.wri.org/research/spatial-database-planted-trees-sdpt-version-2">SDPT Version 2.0</a> and associated removal factors.</li><br></ol><br><p>Net flux is available for download in two different area units over the model duration: 1) megagrams of CO2 emissions/ha, and 2) megagrams of CO2 emissions/pixel. The first is appropriate for visualizing (mapping) net flux because it represent the density of carbon fluxes per hectare. The second is appropriate for calculating the net flux in an area of interest (AOI) because the values of the pixels in the AOI can be summed to obtain the total carbon flux for that area. The values in the latter were calculated by adjusting the net flux per hectare by the size of each pixel, which varies by latitude. When estimating net flux occurring over a defined number of years between 2001 and 2023, divide the values by the model duration and then multiply by the number of years in the period of interest. Both datasets only include pixels within forests, as defined in the methods of Harris et al. (2021) and updated with tree cover gain through 2020. </p>',
  },
  citation: {
    label: 'Citation',
    value:
      '<p>Harris et al. (2021). Global maps of 21st century forest carbon fluxes. Accessed on [date] from Global Forest Watch.</p>',
  },
};
