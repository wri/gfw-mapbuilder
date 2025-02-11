export const en = {
  title: 'Tree cover',
  subtitle: '(2000/2010, Hansen/UMD/Google/USGS/NASA)',
  download_data: 'https://glad.umd.edu/dataset/global-2010-tree-cover-30-m',
  lean_more: 'http://science.sciencemag.org/content/342/6160/850',
  content: [
    {
      label: 'Function',
      value: '<p>Identifies areas of tree cover</p>',
    },
    {
      label: 'Geographic Coverage',
      value: '<p>Global land (excluding Antarctica and Arctic islands)</p>',
    },

    {
      label: 'License',
      value: '<p><a href="http://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></p>',
    },

    {
      label: 'Cautions',
      value:
        '<p>For the purpose of this study, “tree cover” was defined as all vegetation taller than 5 meters in height. “Tree cover” is the biophysical presence of trees and may take the form of natural forests or plantations existing over a range of canopy densities.</p>',
    },
    {
      label: 'Date of Content',
      value: '<p>2000 & 2010</p>',
    },

    {
      label: 'Source',
      value:
        '<p>Hansen, M. C., P. V. Potapov, R. Moore, M. Hancher, S. A. Turubanova, A. Tyukavina, D. Thau, S. V. Stehman, S. J. Goetz, T. R. Loveland, A. Kommareddy, A. Egorov, L. Chini, C. O. Justice, and J. R. G. Townshend. 2013. “High-Resolution Global Maps of 21st-Century Forest Cover Change.” Science 342 (15 November): 850–53. Data available from: <a href="https://glad.umd.edu/dataset/global-2010-tree-cover-30-m">https://glad.umd.edu/dataset/global-2010-tree-cover-30-m</a>.</p>',
    },
    {
      label: 'Resolution',
      value: '<p>30 × 30 meters</p>',
    },
    {
      label: 'Tags',
      value: 'Land Cover',
    },
  ],
  overview: {
    label: 'Overview',
    value:
      '<p>This data set, a collaboration between the <a href="http://glad.geog.umd.edu/">GLAD</a> (Global Land Analysis &amp; Discovery) lab at the University of Maryland, Google, USGS, and NASA, displays tree cover over all global land (except for Antarctica and a number of Arctic islands) for the years 2000 and 2010 at 30 × 30 meter resolution. “Percent tree cover” is defined as the density of tree canopy coverage of the land surface and is color-coded by density bracket (see legend).</p><p>Data in this layer were generated using multispectral satellite imagery from the <a href="http://landsat.usgs.gov/">Landsat 7</a> thematic mapper plus (ETM+) sensor. The clear surface observations from over 600,000 images were analyzed using Google Earth Engine, a cloud platform for earth observation and data analysis, to determine per pixel tree cover using a supervised learning algorithm.</p><p>The tree cover canopy density of the displayed data varies according to the selection - use the legend on the map to change the minimum tree cover canopy density threshold.</p>',
  },
  citation: {
    label: 'Citation',
    value:
      '<p>Use the following credit when these data are displayed:<br>Source: Hansen/UMD/Google/USGS/NASA, accessed through Global Forest Watch</p><p>Use the following credit when these data are cited:<br>Hansen, M. C., P. V. Potapov, R. Moore, M. Hancher, S. A. Turubanova, A. Tyukavina, D. Thau, S. V. Stehman, S. J. Goetz, T. R. Loveland, A. Kommareddy, A. Egorov, L. Chini, C. O. Justice, and J. R. G. Townshend. 2013. “High-Resolution Global Maps of 21st-Century Forest Cover Change.” Science 342 (15 November): 850–53. Data available on-line from:https://glad.umd.edu/dataset/global-2010-tree-cover-30-m. Accessed through Global Forest Watch on [date]. www.globalforestwatch.org </p>',
  },
};
