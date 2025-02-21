export const en = {
  title: 'PROJECTED CHANGE IN DRY SPELLS',
  subtitle: '',
  download_data: 'https://www.wri.org/publications/permissions-licensing',
  lean_more: '',
  content: [
    {
      label: 'Function',
      value: 'Projected change in average annual dry spells',
    },
    {
      label: 'Resolution',
      value: '0.25 degree x 0.25 degree',
    },
    {
      label: 'Geographic Coverage',
      value: 'Global',
    },
    {
      label: 'Source',
      value: 'WRI/Vizzuality',
    },
    {
      label: 'Cautions',
      value:
        '- Some GCM perform better than others in recreating regional climate patterns, such as monsoons, in hindcasts. For specific applications, it may be appropriate to select individual models based on regional performance.\n- The downscaling approaches used to produce these indicators inherently assume that the relative spatial patterns in temperature and precipitation will remain constant under future climate change.\n- The historical data used for downscaling varies in quality across the world. In particular, areas that have short records or sparse coverage of in situ weather observations may have reduced accuracy.\n- GCM are developed by independent research teams and incorporate different assumptions and mechanisms, covering a range of probable futures.',
    },
    {
      label: 'License',
      value: '[Attribution Required](https://www.wri.org/publications/permissions-licensing)',
    },

    {
      label: 'Tags',
      value: ['geospatial', 'global', 'time_period', 'future', 'annual', 'climate', 'climate_change', 'raster'],
    },
  ],
  overview: {
    label: 'Overview',
    value:
      'The Projected Change in Dry Spells dataset shows change in average annual dry spells at ten year intervals between 2000 and 2080, compared to a baseline time period of 1960-1990. A dry spell is a five day period with less than 1 millimeter (mm) of precipitation. The data shown at each ten year interval represents a 31-year average, centered around the indicated year. For example, the number of dry spells in 2000 is actually an average of the annual number of dry spells between the years 1985 and 2015. Precipitation projections are based on the future greenhouse gas emission rates determined by the Intergovernmental Panel on Climate Change’s (IPCC’s) Representative Concentration Pathways (RCP) 8.5. RCP 8.5 is a hypothetical scenario where there is no decrease in greenhouse gas emission rates within the 21st century. Change in dry spells is shown as the multiplicative difference between annual average dry spells during the projected decade and the baseline time period. Values greater than 1 indicate that the number of dry spells is increasing, while values less than one indicate that the number is decreasing. The dataset is shown at a spatial resolution of 0.25°.The increase in global greenhouse gas concentrations, and the resulting change in climate, is set to fundamentally alter our relationship with the planet, impacting agriculture, infrastructure, disaster management, and human conflict. In order to anticipate and adapt to these changes, the Projected Change in Dry Spells dataset provides projections on how precipitation patterns are likely to change in the coming decades. This dataset improves the accessibility of climate data by summarizing global climate information and providing the information as an open dataset in a common geospatial format.This dataset has been processed by Vizzuality and the World Resources Institute using the National Aeronautics and Space Administration (NASA) Earth Exchange Global Daily Downscaled Projections (NEX-GDDP). The NEX-GDDP dataset is intended to assist the scientific community in conducting studies of climate change impacts at local to regional scales, and to enhance public understanding of possible future global climate patterns at the spatial scale of individual towns, cities, and watersheds. A previous version of this dataset was processed and produced by the [Partnership for Resilience and Preparedness (PREP)](https://prepdata.org/), aiding in PREP’s mission to build resilience to climate change by improving access to climate data.',
  },
  citation: {
    label: 'Citation',
    value: `Gassert, F., E. Cornejo, and E. Nilson. 2021. “Making Climate Data Accessible: Methods for Producing NEX-GDDP and LOCA Downscaled Climate Indicators” Technical Note. Washington, DC: World Resources Institute. Available online at https://www.wri.org/research/making-climate-data-accessible. [www.resourcewatch.org](https://www.resourcewatch.org/). We acknowledge the World Climate Research Programme's Working Group on Coupled Modelling, which is responsible for CMIP, and we thank the climate modeling groups for producing and making available their model output. The U.S. Department of Energy's Program for Climate Model Diagnosis and Intercomparison provides coordinating support and development of software infrastructure in partnership with the Global Organization for Earth System Science Portals for CMIP. Climate scenarios used were from the NEX-GDDP dataset, prepared by the Climate Analytics Group and NASA Ames Research Center using the NASA Earth Exchange, and distributed by the NASA Center for Climate Simulation (NCCS).`,
  },
};
