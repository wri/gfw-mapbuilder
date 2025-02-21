export const en = {
  title: 'Deforestation alerts (GLAD-S2)',
  subtitle: '(weekly, 10m, select countries, UMD / GLAD)',
  download_data: 'https://glad.earthengine.app/view/s2-forest-alerts',
  lean_more: 'https://glad.earthengine.app/view/s2-forest-alerts',
  content: [
    {
      label: 'Function',
      value: '<p>Identifies areas of primary forest loss in near real time using Sentinel-2 imagery</p>',
    },
    {
      label: 'Geographic Coverage',
      value: '<p>Amazon basin</p>',
    },
    {
      label: 'License',
      value: '<p><a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></p>',
    },

    {
      label: 'Cautions',
      value:
        '<ul><br><li><p>Results are masked to only within the primary forest mask of <a href="https://iopscience.iop.org/article/10.1088/1748-9326/aacd1c">Turubanova et al (2018)</a> in the Amazon river basin, with 2001-2018 forest loss from <a href="https://science.sciencemag.org/content/342/6160/850">Hansen et al. (2013)</a> removed.</p></li><br><li><p>Alerts that have been detected in two out of four consecutive images are classified as high confidence. Pixels with high confidence alerts cannot be alerted again.</p></li><br><li><p>The accuracy of this product has not been assessed</p></li><br></ul>',
    },
    {
      label: 'Date of Content',
      value: '<p>January 1st, 2019 – present</p>',
    },

    {
      label: 'Source',
      value:
        '<p>Pickens, A.H., Hansen, M.C., Adusei, B., and Potapov P. 2020. Sentinel-2 Forest Loss Alert. Global Land Analysis and Discovery (GLAD), University of Maryland.</p>',
    },
    {
      label: 'Resolution',
      value: '<p>10 x 10m</p>',
    },
    {
      label: 'Frequency of Updates',
      value: '<p>Updated daily, image revisit time every 5 days</p>',
    },
    {
      label: 'Tags',
      value: 'Forest Change',
    },
  ],
  overview: {
    label: 'Overview',
    value:
      '<p>This data set is a forest loss alert product developed by the <a href="https://glad.geog.umd.edu/">GLAD</a> (Global Land Analysis and Discovery) lab at the University of Maryland. GLAD-S2 alerts utilize data from the European Space Agency’s Sentinel-2 mission, which provides optical imagery at a 10m spatial resolution with a 5-day revisit time. The shorter revisit time, when compared to GLAD Landsat alerts, reduces the time to detect forest loss and between the initial detection of forest loss and classification as high confidence. This is particularly advantageous in wet and tropical regions, where persistent cloud cover may delay detections for weeks to months. GLAD-S2 alerts are available for primary forests in the Amazon basin from January 1st 2019 to present, updated daily.</p><p>New Sentinel-2 images are analyzed as soon as they are acquired. Cloud, shadow, and water are filtered out of each new image, and a forest loss algorithm is applied to all remaining clear land observations. The algorithm relies on the spectral data in each new image in combination with spectral metrics from a baseline period of the previous two years.</p><p>Alerts become high confidence when at least two of four subsequent observations are flagged as forest loss (this corresponds to “high,” “medium,” and “low” confidence loss on the GLAD app linked below). The alert date represents the date of forest loss detection. Users can choose to display only high confidence alerts on the map, but keep in mind this will filter out the most recent detections of forest loss. Additionally, forest loss will not be detected again on pixels with high confidence alerts. Alerts that have not become high confidence within 180 days are removed from the data set.</p>',
  },
  citation: {
    label: 'Citation',
    value:
      '<p>Use the following credit when this data is displayed:<br>Source: GLAD/UMD, accessed through Global Forest Watch on [date]</p><p>Use the following credit when this data is cited:<br>Pickens, A.H., Hansen, M.C., Adusei, B., and Potapov P. 2020. Sentinel-2 Forest Loss Alert. Global Land Analysis and Discovery (GLAD), University of Maryland. Accessed through Global Forest Watch on [date]. www.globalforestwatch.org</p>',
  },
};
