export const en = {
  title: 'Deforestation alerts (RADD)',
  subtitle: '(every 6-12 days, 10m, select countries, WUR)',
  download_data: 'http://radd-alert.wur.nl',
  lean_more: 'http://radd-alert.wur.nl',
  content: [
    {
      label: 'Function',
      value:
        '<p>Near-real-time forest disturbance alerts in primary humid tropical forests using Sentinel-1’s cloud-penetrating radar sensors</p>',
    },
    {
      label: 'Geographic Coverage',
      value:
        '<p>Humid tropical forest in South America, Central America, sub-Saharan Africa and insular Southeast Asia (expansion to continental SE Asia and the Pacific is forthcoming by end 2023)</p>',
    },

    {
      label: 'License',
      value: '',
    },

    {
      label: 'Cautions',
      value:
        '<ul><li>Although called ‘deforestation alerts’ these alerts detect forest or tree cover disturbances. This product does not distinguish between human-caused and other disturbance types.</li><li>The term deforestation is used because these are potential deforestation events, and alerts could be further investigated to determine this.</li><li>We do not recommend using deforestation alerts for global or regional trend assessment, nor for area estimates. For accurate trend analysis, use the annual tree cover loss data.</li><li>False detections may occur in swamp forests due to the high sensitivity of short wavelength C-band radar to moisture variations.</li><li>Small-scale changes are typically detected in a timely manner, while large-scale patches may take longer to reach a high probability.</li><li>In areas incorrectly labeled as primary forest in the baseline, some commission errors in the alerts may occur.</li><li>Alerts that have not become high confidence within 90 days are removed from the dataset.</li><li>Once an alert pixel reaches high confidence, forest loss will not be detected at that location again.</li><li>A validation of confirmed alerts in the Congo Basin indicated a high level of accuracy (2% false positives, 5% false negatives) for disturbances greater than 0.2 ha.</li></ul>',
    },
    {
      label: 'Date of Content',
      value:
        '<p>Africa: January 2019 – present<br>South America, Central America, and Southeast Asia: January 2020 – present</p>',
    },

    {
      label: 'Source',
      value:
        '<p>Reiche, J., Mullissa, A., Slagter, B., Gou, Y., Tsendbazar, N.E., Braun, C., Vollrath, A., Weisse, M.J., Stolle, F., Pickens, A., Donchyts, G., Clinton, N., Gorelick, N., Herold, M. 2021. Forest disturbance alerts for the Congo Basin using Sentinel-1. Environmental Research Letters. <a href="https://doi.org/10.1088/1748-9326/abd0a8">https://doi.org/10.1088/1748-9326/abd0a8</a></p>',
    },
    {
      label: 'Resolution',
      value: '<p>10 x 10m, with a minimum mapping unit of 0.1ha</p>',
    },
    {
      label: 'Frequency of Updates',
      value: '<p>Every 6-12 days</p>',
    },
    {
      label: 'Tags',
      value: 'Forest Change',
    },
  ],
  overview: {
    label: 'Overview',
    value:
      '<p>RAdar for Detecting Deforestation (RADD) is a deforestation alert product that uses data from the European Space Agency’s Sentinel-1 satellites to detect forest disturbances in near-real-time and to confirm alerts within weeks. The RADD  alerts use a detection methodology produced by Wageningen University and Research (WUR), Laboratory of Geo-information Science and Remote Sensing. These alerts are particularly advantageous in monitoring tropical forests, as Sentinel-1’s cloud-penetrating radar and frequent revisit times (6-12 days) allow for more consistent monitoring than alert products based on optical satellite images. Alerts are available for the primary humid tropical forest areas of South America, sub-Saharan Africa and insular Southeast Asia at a 10m spatial resolution, with coverage from January 2019 to the present for Africa and January 2020 to the present for South America and Southeast Asia. Central America is covered from January 2023, and expansion to continental SE Asia and Pacific is forthcoming by end 2023. Pre-processed Sentinel-1 images are collected from Google Earth Engine, then quality controlled and normalized using historical time-series metrics. Forest disturbance alerts are then detected using a probabilistic algorithm. Each disturbance alert is detected from a single observation in the latest image, and then marked as high confidence with subsequent imagery within a maximum 90-day period if the forest disturbance probability is above 97.5%. Unconfirmed alerts are provided for forest disturbance probabilities above 85%. The product has a minimum mapping unit of 0.1 ha (equivalent to 10 Sentinel-1 pixels) to minimize false detections. Alerts are detected within areas of primary humid tropical forest, defined by <a href="https://iopscience.iop.org/article/10.1088/1748-9326/aacd1c/meta">Turubanova et al. (2018)</a> and with 2001-2018 forest loss <a href="https://www.science.org/doi/10.1126/science.1244693">(Hansen et al. 2013)</a> and mangrove <a href="https://www.mdpi.com/2072-4292/10/10/1669">(Bunting et al. 2018)</a> removed. For more information on methodology and validation, please refer to <a href="https://doi.org/10.1088/1748-9326/abd0a8">Reiche et. al. (2021)</a>. The version presented here (v1) has been updated from that described in the paper (v0), with changes to the forest mask and a reduction of the minimum mapping unit. </p><p>The RADD alerts were made possible thanks to the support of a coalition of <a href="https://www.wri.org/news/2019/10/release-palm-oil-industry-jointly-develop-radar-monitoring-technology-detect">ten major palm oil producers and buyers</a>. Under the project, Wageningen University and Research (WUR) developed the detection method and Satelligence first scaled the system in Indonesia and Malaysia and provided additional prioritization of alerts for on-the-ground follow up. Additional support was provided by the US Forest Service and Norway’s International Climate and Forest Initiative. The alerts are currently operated by WUR using Google Earth Engine. </p>',
  },
  citation: {
    label: 'Citation',
    value: '<p>Source: "RADD alerts". WUR, accessed through Global Forest Watch</p>',
  },
};
