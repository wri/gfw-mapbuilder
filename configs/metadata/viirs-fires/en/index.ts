export const en = {
  title: 'VIIRS active fires',
  subtitle: '(daily, 375 m, global, NASA)',
  download_data: 'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/active-fire-data',
  learn_more: 'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/viirs-i-band-active-fire-data',
  content: [
    {
      label: 'Function',
      value: 'Displays fire alert data for the past 24 hours, 48 hours, 72 hours, or 7 days',
    },
    {
      label: 'Resolution',
      value: '375 × 375 meters',
    },
    {
      label: 'Geographic coverage',
      value: 'Global',
    },
    {
      label: 'Source',
      value: 'NASA',
    },
    {
      label: 'Frequency',
      value: 'Two times daily',
    },
    {
      label: 'Date of content',
      value: 'Near-real time',
    },
    {
      label: 'Cautions',
      value:
        'Not all fires are detected. There are several reasons why VIIRS may not have detected a certain fire. The fire may have started and ended between satellite overpasses. The fire may have been too small or too cool to be detected in the 375-meter pixel. Cloud cover, heavy smoke, or tree canopy may completely obscure a fire.',
    },
    {
      label: 'License',
      value:
        'We acknowledge the use of data and imagery from LANCE FIRMS operated by the NASA/GSFC/Earth Science Data and Information System (ESDIS) with funding provided by NASA/HQ. \n\nNASA Data & Information Policy',
    },
  ],
  overview: {
    label: 'Overview',
    value:
      'The VIIRS active fires data (VNP14IMGT) is the latest fire monitoring product to FIRMS (Fire Information for Resource Management System), which identifies global fire locations in near-real time. Information is collected from the Visible Infrared Imaging Radiometer Suite (VIIRS) sensor, and processed with a fire detection algorithm to flag active fires. Each dot on the map represents the center of a 375 meter pixel that has been flagged by the algorithm.',
  },
  citation: {
    label: 'Citation',
    value:
      'NASA FIRMS. “VIIRS Active Fires.” Accessed through Global Forest Watch on 29/01/2025. www.globalforestwatch.org',
  },
};
