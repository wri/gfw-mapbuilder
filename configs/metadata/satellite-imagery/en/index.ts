export const en = {
  title: 'Landsat-8 / Sentinel-2 Satellite Imagery',
  subtitle: '',
  download_data: '',
  lean_more: '',
  content: [
    {
      label: 'Function',
      value:
        'High-resolution satellite imagery is essential for providing context to other data layers available on GFW, such as in interpreting drivers of tree cover change. It is commonly used to identify possible causes of near-real-time deforestation alerts. The imagery can also be used in validation protocols, to assess accuracy of land/forest cover and change products.',
    },
    {
      label: 'Resolution',
      value: 'Sentinel-2: 10 x 10 meters, Landsat 8: 30 x 30 meters',
    },
    {
      label: 'Geographic Coverage',
      value: 'Global',
    },
    {
      label: 'Source',
      value:
        'Copernicus Sentinel-2. Retrieved from Google Earth Engine. Data processed by the European Space Agency (ESA). Landsat 8 OLI, USGS Earth Observation and Science Center. Retrieved from Google Earth Engine. Data processed by the U.S. Geological Survey.',
    },
    {
      label: 'Frequency of Updates',
      value:
        'New images become available daily. Image revisit time: Sentinel-2A: Every 10 days, Landsat 8: Every 16 days',
    },
    {
      label: 'Date of Content',
      value: 'January 2012 - present',
    },

    {
      label: 'Citation',
      value: '',
    },

    {
      label: 'Tags',
      value: 'Imagery',
    },
  ],
  overview: {
    label: 'Overview',
    value:
      '<p>This data shows the latest satellite imagery that meets the selected cloud cover criteria from the Sentinel-2 and Landsat 8 systems. . Sentinel-2, operated by the European Space Agency, has global coverage in 10-meter resolution, and can obtain updated imagery every 10 days. Landsat 8, operated by the U.S. Geological Survey, is also a global satellite and can obtain updated imagery, with a 30-meter resolution, every 16 days. Imagery that depicts natural color and vegetation health is available from both satellites. The natural color images use information from visible light (red, green and blue) to show Earth’s surface as it would appear to the human eye. Vegetation health is detected using the Normalized Difference Vegetation Index (NDVI), which incorporates information on both red and near-infrared reflectance. This method relies on the fact that healthy vegetation absorbs most visible light and reflects most near-infrared light that strikes its surface. When interpreting imagery that shows vegetation health, red indicates healthy growing vegetation, green indicates bare ground and black indicates water bodies. </p>',
  },
  citation: {
    label: 'Citation',
    value: '',
  },
};
