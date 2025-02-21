export const en = {
  title: 'Tropical Tree Cover',
  subtitle: '(2020, 10m / half hectare, Tropics)',
  download_data: 'https://data.globalforestwatch.org/datasets/tropical-tree-cover/explore',
  lean_more: '',
  content: [
    {
      label: 'Function',
      value:
        '<p>Displays tree extent at the ten-meter scale and tree cover at the half hectare scale to enable accurate monitoring of trees in urban areas, agricultural lands, and in open canopy and dry forest ecosystems</p>',
    },
    {
      label: 'Geographic Coverage',
      value: '<p>4.3 billion hectares of the tropics (-23.44 to 23.44 latitude)</p>',
    },
    {
      label: 'License',
      value: '<p><a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></p>',
    },

    {
      label: 'Cautions',
      value:
        '<p>This dataset uses a different definition of a tree and a different definition of tree cover than does Hansen et al. (2013). This dataset defines a tree according to both the height and crown diameter. Woody vegetation higher than 5 meters regardless of crown diameter, or between 3 and 5 meters with a minimum crown diameter of 5 meters is considered a tree. This definition is different from Hansen et al. (2013), which defines a tree as any vegetation at least 5 meters in height. The tropical tree cover dataset does not disambiguate plantation trees from non-plantation trees.</p><p>Analyses or statistics derived for shapefiles smaller than 0.5 ha may not be accurate.</p>',
    },
    {
      label: 'Date of Content',
      value: '<p>2020</p>',
    },
    {
      label: 'Source',
      value: '<p>World Resources Institute</p>',
    },
    {
      label: 'Resolution',
      value: '<p>10 x 10 meters, half hectare</p>',
    },
    {
      label: 'Frequency of Updates',
      value: '<p>Yearly change detection maps starting in 2017 are planned for 2024 release.</p>',
    },
    {
      label: 'Tags',
      value: 'Land Cover',
    },
  ],
  overview: {
    label: 'Overview',
    value:
      '<p>The tropical tree cover data maps tree extent at the ten-meter scale and tree cover at the half hectare scale to enable accurate monitoring of trees in urban areas, agricultural lands, and in open canopy and dry forest ecosystems. The data extends over 4.3 billion hectares of the global tropics.  </p><p>The data is derived from multi-temporal convolutional neural network models applied to Sentinel optical and radar imagery. The 10-meter dataset is a binary tree extent layer that is similar to a land cover map, while the tree cover data represents fractional cover at a half-hectare scale. More details on the methodology and analyses can be found on <a href="https://github.com/wri/sentinel-tree-cover/wiki/Product-Specifications">the GitHub page</a>.</p>',
  },
  citation: {
    label: 'Citation',
    value:
      '<p>Use the following credit when this data is displayed: Source: [date], accessed through Global Forest Watch on [date]  </p><p>Use the following credit when this data is cited: Brandt,<br>Brandt, J., Ertel, J., Spore, J., &amp; Stolle, F. (2023). WALL-to-wall <br>mapping of tree extent in the tropics with sentinel-1 and sentinel-2. Remote Sensing of Environment, 292, 113574. https://doi.org/10.1016/j.rse.2023.11357</p>',
  },
};
