export const en = {
  title: 'GLAD-Landsat Deforestation alerts (GLAD-L)',
  subtitle: '(weekly, 30m, tropics, UMD/GLAD)',
  download_data: 'http://glad-forest-alert.appspot.com/',
  content: [
    {
      label: 'Function',
      value: 'Identifies areas of likely tree cover loss in near-real time',
    },
    {
      label: 'Resolution',
      value: '30 × 30 meters',
    },
    {
      label: 'Geographic coverage',
      value: '30 degrees north to 30 degrees south',
    },
    {
      label: 'Source',
      value:
        'Hansen, M.C., A. Krylov, A. Tyukavina, P.V. Potapov, S. Turubanova, B. Zutta, S. Ifo, B. Margono, F. Stolle, and R. Moore. 2016. Humid tropical forest disturbance alerts using Landsat data. Environmental Research Letters, 11 (3)',
    },
    {
      label: 'Frequency',
      value: 'Updated weekly',
    },
    {
      label: 'Date of content',
      value:
        'January 1, 2021 (GLAD-L alerts have been operating since 2015 for select countries in the Amazon and Congo Basins and insular Southeast Asia, but historical data are not available on GFW)',
    },
    {
      label: 'Cautions',
      value:
        'Although called ‘deforestation alerts’ these alerts detect forest or tree cover disturbances. This product does not distinguish between human-caused and other disturbance types. Where alerts are detected within plantation forests (more likely to happen in the GLAD-L system), alerts may indicate timber harvesting operations, without a conversion to a non-forest land use. \n\nThe term deforestation is used because these are potential deforestation events, and alerts could be further investigated to determine this. \n\nWe do not recommend using deforestation alerts for global or regional trend assessment, nor for area estimates. We recommend using the annual tree cover loss data for a more accurate comparison of the trends in forest change over time, and for area estimates. Recent alerts will include false positives that have yet to raise their confidence level and may eventually be removed. Past alerts may have been removed in error from the database if rapid canopy closure precedes the additional unobscured satellite observations within 6 months. Additionally, updates to the methodologies, differing number of systems (in the case of the integrated alerts), and variation in cloud cover between months and years pose additional risks to using deforestation alerts for inter/intra-annual comparison. \n\nThe alerts can be ‘curated’ to identify those alerts of interest to a user, such as those alerts which are likely to be deforestation and might be prioritized for action. A user can do this by overlaying other contextual datasets, such as protected areas, or planted trees. The non-curated data are provided here in order that users can define their own prioritization approaches. Curated alert locations are provided in the Places to Watch data layer. \n\nWhile Landsat 8 and 9 satellites (formerly Landsat 7 and 8) together have a revisit period of 8 days, cloud cover can limit the availability of imagery, particularly in the wet season. Alert dates represent the instance of detection, though tree cover loss could have taken place earlier, possibly weeks earlier, due to persistent cloud cover. Note that the GLAD-L alerts were formerly sourced from Landsat 7 imagery which had a known scan line issue that sometimes resulted in false positive alerts, until April 2023 when the input was switched to Landsat 9 instead. \n\n\nIn this data set, “tree cover” is defined as all vegetation greater than 5 meters in height with greater than 60% canopy cover, and may take the form of natural forests or plantations. “Tree cover loss” indicates the canopy removal of at least half a pixel and can be due to a variety of factors, including mechanical harvesting, fire, disease, or storm damage. As such, “loss” does not equate to deforestation. \n\nIn Peru, where the alert system was first developed, the authors evaluated the data to have 13.5% false positives (loss detected where none occurred), though the majority of those false positives (9.5%) occur on the edges of clearings. On edges, the 30 m Landsat pixels show a mix of forest and other land cover, which makes them prone to error in the system. The rate of false positives drops to 1% when only considering high confidence alerts. The data has 33% false negatives (undetected loss where it has occurred), though most of these occur in secondary forests—likely because the algorithm was created to capture primary forest loss. The higher rate of false negatives compared to false positives also indicates that the alerts are a conservative estimate of the tree cover loss that is actually occurring. \n\nThe confidence level may change retroactively as source data is updated; alerts that have not become high confidence within 180 days, or after 4 observations are removed from the dataset \n\nOnce an alert pixel reaches high confidence, forest loss will not be detected at that location again. \n\nWhen zoomed out, this data layer displays some degree of inaccuracy because the data points must be collapsed to be visible on a larger scale. Zoom in for greater detail.',
    },
    {
      label: 'License',
      value: 'CC BY 4.0',
    },
  ],
  overview: {
    label: 'Overview',
    value:
      'This data set, created by the GLAD (Global Land Analysis & Discovery) lab at the University of Maryland and supported by Global Forest Watch, is the first Landsat-based alert system for tree cover loss. While most existing loss alert products use 250-meter resolution MODIS imagery, these alerts have a 30-meter resolution and thus can detect loss at a much finer spatial scale. These alerts have a 30-meter resolution and are operational for land areas between 30 degrees north and south. \n\nNew Landsat 8 and 9 images are downloaded as they are posted online, assessed for cloud cover or poor data quality, and compared to the three previous years of Landsat-derived metrics (including ranks, means, and regressions of red, infrared and shortwave bands, and ranks of NDVI, NBR, and NDWI). The metrics and the latest Landsat image are run through seven decision trees to calculate a median probability of forest disturbance. Pixels with probability >50% are reported as tree cover loss alerts. The entire process is run in Google Earth Engine to ensure reliable updates and scalability. For more information on methodology, see the paper in Environmental Research Letters. \n\nAlerts are not classified as high confidence until two or more out of four consecutive observations are labelled as tree cover loss. Alerts are removed from the dataset after four consecutive observations or more than 180 days if they are not classified as high confidence. You can choose to view only high confidence alerts in the menu, though keep in mind that using only high confidence alerts misses the newest detections of tree cover loss.',
  },
  citation: {
    label: 'Citation',
    value:
      'Use the following credit when these data are displayed: \n\nSource: GLAD/UMD, accessed through Global Forest Watch \n\nUse the following credit when these data are cited: \n\nHansen, M.C., A. Krylov, A. Tyukavina, P.V. Potapov, S. Turubanova, B. Zutta, S. Ifo, B. Margono, F. Stolle, and R. Moore. 2016. Humid tropical forest disturbance alerts using Landsat data. Environmental Research Letters, 11 (3). Accessed through Global Forest Watch on [date]. www.globalforestwatch.org',
  },
};
