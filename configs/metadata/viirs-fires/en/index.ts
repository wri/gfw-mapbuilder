export const en = {
  title: 'VIIRS active fires',
  subtitle: '(daily, 375 m, global, NASA)',
  download_data: 'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/active-fire-data',
  lean_more: 'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/viirs-i-band-active-fire-data',
  content: [
    {
      label: 'Function',
      value: '<p>Displays fire alert data for the past 24 hours, 48 hours, 72 hours, or 7 days</p>',
    },
    {
      label: 'Geographic Coverage',
      value: '<p>Global</p>',
    },

    {
      label: 'License',
      value:
        '<p>We acknowledge the use of data and imagery from LANCE FIRMS operated by the NASA/GSFC/Earth Science Data and Information System (ESDIS) with funding provided by NASA/HQ.</p><p><a href="http://science.nasa.gov/earth-science/earth-science-data/data-information-policy/">NASA Data & Information Policy</a></p>',
    },

    {
      label: 'Cautions',
      value:
        '<p>Not all fires are detected. There are several reasons why VIIRS may not have detected a certain fire. The fire may have started and ended between satellite overpasses. The fire may have been too small or too cool to be detected in the 375-meter pixel. Cloud cover, heavy smoke, or tree canopy may completely obscure a fire.</p><p>It is not recommended to use active fire locations to estimate burned area due to spatial and temporal sampling issues.</p><p>When zoomed out, this data layer displays some degree of inaccuracy because the data points must be collapsed to be visible on a larger scale. Zoom in for greater detail.</p>',
    },
    {
      label: 'Date of Content',
      value: '<p>Near-real time</p>',
    },

    {
      label: 'Source',
      value: '<p>NASA</p>',
    },
    {
      label: 'Resolution',
      value: '<p>375 × 375 meters</p>',
    },
    {
      label: 'Frequency of Updates',
      value: '<p>Two times daily</p>',
    },
    {
      label: 'Tags',
      value: 'Forest Change',
    },
  ],
  overview: {
    label: 'Overview',
    value:
      '<p>The VIIRS active fires data (<a href="https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/v1-vnp14imgt">VNP14IMGT</a>) is the latest fire monitoring product to FIRMS (Fire Information for Resource Management System), which identifies global fire locations in near-real time. Information is collected from the Visible Infrared Imaging Radiometer Suite (VIIRS) sensor, and processed with a <a href="http://www.sciencedirect.com/science/article/pii/S0034425713004483">fire detection algorithm</a> to flag active fires. Each dot on the map represents the center of a 375 meter pixel that has been flagged by the algorithm. </p><p>The VIIRS data replaces the active fires data from MODIS that was previously available on Global Forest Watch. The VIIRS data has higher spatial resolution (375-meter pixels vs. 1-kilometer pixels) which improves detection of smaller fires and provides a more reliable estimate of fire perimeters. The VIIRS data is also better calibrated to detect fires at night.</p><p>The active fires data is available to view and download for the past 24 hours, 48 hours,  or 7 days. Older fire data will be available for download from the <a href="https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms">NASA FIRMS</a> website beginning in mid-2016.</p><p>Each fire alert has a confidence value of low, nominal, or high to help users gauge the quality of individual hotspot /fire pixels.</p>',
  },
  citation: {
    label: 'Citation',
    value:
      '<p>NASA FIRMS. “VIIRS Active Fires.” Accessed through Global Forest Watch on [date]. www.globalforestwatch.org </p>',
  },
};
