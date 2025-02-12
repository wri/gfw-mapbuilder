export const en = {
  title: 'Integrated deforestation alerts',
  subtitle: 'daily, 10m, tropics, UMD/GLAD and WUR',
  download_data: 'https://data.globalforestwatch.org/datasets/gfw::integrated-deforestation-alerts/about',
  lean_more: '',
  content: [
    {
      label: 'Function',
      value: '<p>Monitor forest disturbance in near-real-time using integrated alerts from three alerting systems</p>',
    },
    {
      label: 'Geographic Coverage',
      value: '<p>30°N to 30°S</p>',
    },

    {
      label: 'License',
      value: '<p><a href="https://creativecommons.org/licenses/by/4.0/">CC by 4.0</a></p>',
    },

    {
      label: 'Cautions',
      value:
        '<ul><br><li>Although called ‘deforestation alerts’ these alerts detect forest or tree cover disturbances. This product does not distinguish between human-caused and other disturbance types. Where alerts are detected within plantation forests (more likely to happen in the GLAD-L system), alerts may indicate timber harvesting operations, without a conversion to a non-forest land use. </li><br><li>The term deforestation is used because these are potential deforestation events, and alerts could be further investigated to determine this.  </li><br><li>We do not recommend using deforestation alerts for global or regional trend assessment, nor for area estimates. We recommend using the annual tree cover loss data for a more accurate comparison of the trends in forest change over time, and for area estimates. Recent alerts will include false positives that have yet to raise their confidence level and may eventually be removed. Past alerts may have been removed in error from the database if rapid canopy closure precedes the additional unobscured satellite observations within 6 months. Additionally, updates to the methodologies, differing number of systems (in the case of the integrated alerts), and variation in cloud cover between months and years pose additional risks to using deforestation alerts for inter/intra-annual comparison.</li><br><li>The alerts can be ‘curated’ to identify those alerts of interest to a user, such as those alerts which are likely to be deforestation and might be prioritized for action. A user can do this by overlaying other contextual datasets, such as protected areas, or planted trees. The non-curated data are provided here in order that users can define their own prioritization approaches. Curated alert locations are provided in the Places to Watch data layer.<br>The three alert systems have different definitions of forest/tree cover, and forest/tree cover disturbances: <br /><br><ul><br><li><strong>GLAD-L</strong>: alerts are within “tree cover” which is defined as all vegetation greater than 5 meters in height with greater than 60% canopy cover, and may take the form of natural forests or plantations. “Tree cover loss” indicates the canopy removal of at least half a pixel and can be due to a variety of factors, including mechanical harvesting, fire, disease, or storm damage. As such, “loss” does not equate to deforestation. </li><br><li><strong>GLAD-S2</strong>: alerts are within the primary forest mask of <a href="https://doi.org/10.1088/1748-9326/aacd1c">Turubanova et al (2018)</a> in the Amazon river basin, with 2001-present forest loss from <a href="https://doi.org/10.1126/science.1244693">Hansen et al. (2013)</a> removed. </li><br><li><strong>RADD</strong>: alerts are within primary humid forests. Forest loss is defined as complete or partial removal of tree cover within a pixel, and a minimum-mapping unit of 0.5 ha is used. <br>The input alert systems do not have the same spatial and temporal coverage:</li><br><li><strong>GLAD-L</strong>: Operating in the entire tropics (30°N to 30°S) from January 1, 2018 to the present, and from 2015 to the present (although paused for a period during 2022) for select countries in the Amazon, Congo Basin, and insular Southeast Asia </li><br><li><strong>GLAD-S2</strong>: Operating in the primary humid tropical forest areas of South America from January 2019 to the present </li><br><li><strong>RADD</strong>: Operating in the primary humid tropical forest areas of South America, sub-Saharan Africa and insular Southeast Asia with coverage from January 2019 to the present for Africa and January 2020 to the present for South America and Southeast Asia, with Central America covered from January 2023 (expansion to continental SE Asia and the Pacific is forthcoming by end 2023) </li><br></ul></li><br><li>In order to integrate the three alerting systems on a common grid, GLAD-L is resampled from a 30 m spatial resolution to 10 m to match GLAD-S2 and RADD. As a result, a single 30 m GLAD-L pixel will become multiple 10 m pixels in the integrated layer. Users should use caution when comparing the analysis results of individual systems to the integrated alert layer, as the number of integrated alerts will be much greater than the number of native GLAD-L alerts. In addition, pixels in the integrated layer may not exactly align on the map with pixels in the individual GLAD-L layer as a result of this resampling.  </li><br><li>Each pixel in the integrated layer preserves the earliest date of detection from any alerting system, even if multiple systems have reported an alert in that pixel. In some situations, this may lead to inconsistent visualizations when switching from the integrated layer to individual alerting system layers. It is advisable to use the integrated layer when you are interested in the earliest date of detection by any alerting system. However, it is better to use the individual alerting system layers if you are interested in a specific alert type. </li><br><li>The “Highest confidence: detected by multiple alert systems” level can only be achieved in areas and for time periods where more than one alert system was in operation for that region.  </li><br><li>The confidence level may change retroactively as source data is updated; alerts that have not become high confidence within 180 days are removed from the dataset.</li><br><li>Once an alert pixel reaches high confidence, forest loss will not be detected by the same alert system at that location again</li><br><li>Accuracies vary across the coverage of the integrated alerts, due to different characteristics of the three alert systems – Radar (RADD) alerts for example may have more false detections in swamp forests due to the high sensitivity of short wavelength C-band radar to moisture variation</li><br><li>When zoomed out, this data layer displays some degree of inaccuracy because the data points must be collapsed to be visible on a larger scale. Zoom in for greater detail.   </li><br></ul>',
    },
    {
      label: 'Date of Content',
      value: '<p>January 1st, 2019 – present</p>',
    },
    {
      label: 'Source',
      value:
        '<p><em>GLAD Alerts:</em> Hansen, M.C., A. Krylov, A. Tyukavina, P.V. Potapov, S. Turubanova, B. Zutta, S. Ifo, B. Margono, F. Stolle, and R. Moore. 2016...</p>',
    },
    {
      label: 'Resolution',
      value: '<p>10 × 10 m</p>',
    },
    {
      label: 'Frequency of Updates',
      value: '<p>Daily</p>',
    },
    {
      label: 'Tags',
      value: 'Forest Change',
    },
  ],
  overview: {
    label: 'Overview',
    value: `<p>This dataset, assembled by Global Forest Watch, aggregates deforestation alerts from three alert systems (GLAD-L, GLAD-S2, RADD) into a single, integrated deforestation alert layer. This integration allows users to detect deforestation events faster than any single system alone, as the integrated layer is updated when any of the source alert systems are updated. </p><p>The source alert systems are derived from satellites of varying spectral and spatial resolutions. 30 m <a href="https://gfw.global/2Lv8vVc">GLAD Landsat-based alerts</a> are up-sampled to match the 10 m spatial resolution of Sentinel-based alerts (<a href="https://gfw.global/3vxHe7F">GLAD-S2</a>, <a href="https://gfw.global/3ca04tV">RADD</a>). This avoids the double counting of overlapping alerts, which are instead classified at a higher confidence level, indicated by darker pixels. </p><p>Alerts are classified as _high_ confidence when detected twice by a single alert system. This can occur in areas and at times when only one alert system was operating. Where multiple alert systems are operating, alerts detected by multiple (two or three) of these systems are classified as _highest_ confidence. With multiple sensors picking up change in the same location, we can be more confident that an alert was not a false positive and do not need to wait for additional satellite imagery to increase confidence in detected loss, thus providing more confident alerting faster than with a single system. </p><p>A study conducted by Wageningen University in collaboration with researchers from Global Forest Watch and University of Maryland's GLAD lab found that integrating alert systems results in faster detection of new disturbances by days to months, and also shortens the delay to increase confidence. Combined alerts have a higher producer's accuracy (fewer false negatives), but a lower user's accuracy (more false positives) since the commission errors from each system are combined; however, "highest confidence" alerts, where more than one system detected the change, effectively eliminated false detections. Learn more: <a href="https://iopscience.iop.org/article/10.1088/1748-9326/ad2d82">https://iopscience.iop.org/article/10.1088/1748-9326/ad2d82</a></p>`,
  },
  citation: {
    label: 'Citation',
    value: '<p>Source: "Integrated Deforestation Alerts". UMD/GLAD and WUR, accessed through Global Forest Watch</p>',
  },
};
