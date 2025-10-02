export const en = {
  title: 'Tree Cover Gain',
  subtitle: '(20 years, 30 m, global, UMD/NASA GEDI)',
  content: [
    {
      label: 'Function',
      value: 'Identifies areas of tree cover gain',
    },
    {
      label: 'Resolution',
      value: '30 × 30 meters',
    },
    {
      label: 'Geographic coverage',
      value: 'Global',
    },
    {
      label: 'Source',
      value:
        'Potapov, P., Hansen, M.C., Pickens, A., Hernandez-Serna, A., Tyukavina, A., Turubanova, S., Zalles, V., Li, X., Khan, A., Stolle, F., Harris, N., Song, X-P., Baggett, A., Kommareddy, I., and Kommareddy, A. 2022. The Global 2000-2020 Land Cover and Land Use Change Dataset Derived From the Landsat Archive: First Results. Frontiers in Remote Sensing, 13, April 2022. https://doi.org/10.3389/frsen.2022.856903',
    },
    {
      label: 'Date of content',
      value: '2000-2020',
    },
    {
      label: 'Cautions',
      value:
        'In this data set, “tree cover” is defined as woody vegetation with the height of 5 m and taller, and may take the form of natural woodlands, forests, or tree plantations across a range of canopy densities. Tree cover gain does not equate directly to restoration, afforestation or reforestation. \n\nDue to variation in research methodology and date of content, tree cover, gain, and annual loss data sets cannot be compared accurately against each other. Accordingly, “net” cannot be calculated by subtracting figures for tree cover gain from the annual tree cover loss data set. Instead, the net tree cover change layer should be used, which was calculated exclusively from tree height data. \n\nIntegrated use of other products such as canopy cover density data also available on GFW should be performed with caution. \n\nThe authors evaluated the accuracy of the product, and the overall accuracy was found to be 99.3%, commission error (false positives) of 28.6%, and omission error (false negatives) of 42.2%. The accuracy does vary by biome and thus may be higher or lower in any particular location. As the omission error is higher than the commission error, this indicates that the product provides conservative estimates of forest dynamics. \n\nThere was confusion between forest enhancement (existing forest height increase) and forest gain (establishment of forests within the year 2000 non-forest land), and this was more prominent in boreal forest areas where forest height in the year 2000 was difficult to determine.',
    },
    {
      label: 'License',
      value: 'CC by 4.0',
    },
  ],
  overview: {
    label: 'Overview',
    value:
      'This data set from the GLAD (Global Land Analysis & Discovery) lab at the University of Maryland measures areas of tree cover gain from the year 2000 to 2020 across the globe at 30 × 30 meter resolution, displayed as a 20-year cumulative layer. Tree cover gain was determined using tree height information from the years 2000 and 2020. Tree height was modeled by the integration of the Global Ecosystem Dynamics Investigation (GEDI) lidar forest structure measurements and Landsat analysis-ready data time-series. The NASA GEDI is a spaceborne lidar instrument operating onboard the International Space Station since April 2019. It provides point-based measurements of vegetation structure, including forest canopy height at latitudes between 52°N and 52°S globally. Gain was identified where pixels had tree height ≥5 m in 2020 and tree height <5 m in 2000. \n\nTree cover gain may indicate a number of potential activities, including natural forest growth, the tree crop rotation cycle, or tree plantation management. \n\nWhen zoomed out (< zoom level 12), pixels of gain are shaded according to the density of gain at the 30 x 30 meter scale. Pixels with darker shading represent areas with a higher concentration of tree cover gain, whereas pixels with lighter shading indicate a lower concentration of tree cover gain. There is no variation in pixel shading when the data is at full resolution (≥ zoom level 12).',
  },
  citation: {
    label: 'Citation',
    value:
      'Use the following credit when this data is displayed: \nAccessed through Global Forest Watch on 29/01/2025. www.globalforestwatch.org. \n\nUse the following credit when this data is cited: \nPotapov, P., Hansen, M.C., Pickens, A., Hernandez-Serna, A., Tyukavina, A., Turubanova, S., Zalles, V., Li, X., Khan, A., Stolle, F., Harris, N., Song, X-P., Baggett, A., Kommareddy, I., and Kommareddy, A. 2022. The Global 2000-2020 Land Cover and Land Use Change Dataset Derived From the Landsat Archive: First Results. Frontiers in Remote Sensing, 13, April 2022. https://doi.org/10.3389/frsen.2022.856903',
  },
};
