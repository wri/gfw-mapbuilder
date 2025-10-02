export const en = {
  title: 'Land Cover 2015',
  subtitle: 'ESA/UCLouvain, 2015',
  download_data: 'http://maps.elie.ucl.ac.be/CCI/viewer/download.php',
  learn_more: 'http://maps.elie.ucl.ac.be/CCI/viewer/download/ESACCI-LC-Ph2-PUGv2_2.0.pdf',
  content: [
    {
      label: 'Function',
      value: 'Shows the global distribution of land cover in 2015',
    },
    {
      label: 'Resolution',
      value: '300 × 300 meters',
    },
    {
      label: 'Geographic coverage',
      value: 'Global',
    },
    {
      label: 'Source',
      value: '© ESA Climate Change Initiative - Land Cover led by UCLouvain (2017)',
    },
    {
      label: 'Frequency',
      value: 'Annual',
    },
    {
      label: 'Date of content',
      value: 2015,
    },
    {
      label: 'Cautions',
      value:
        'A full accuracy assessment is available from the CCI. In general, land cover classes such as rainfed and irrigated croplands, broadleaved evergreen forest, urban areas, bare areas, water bodies and permanent snow are found quite accurately mapped. On the other hand, classes such as lichens and mosses, sparse vegetation and flooded forest with fresh water can be affected by errors.\n\nData quality varies by region, particularly as related to the coverage of MERIS imagery for creation of the baseline map. Areas with less coverage include the western part of the Amazon basin, Chile and the southern part of Argentina, the western part of Congo basin as well as the gulf of Guinea, the eastern part of Russia, and the eastern coast of China and Indonesia.',
    },
    {
      label: 'License',
      value: 'http://maps.elie.ucl.ac.be/CCI/viewer/download.php',
    },
  ],
  overview: {
    label: 'Overview',
    value:
      'This data set (version 2.07) was created as part of the Climate Change Initiative (CCI), an initiative of the European Space Agency to create long-term, consistent, global data for the purposes of climate modelling. The CCI Land Cover project delivers consistent global land cover maps at 300 m spatial resolution on an annual basis from 1992 to 2015. The Global Forest Watch platform only displays the 2015 land cover data.\n\nTo ensure consistency from year to year, land cover maps for each year are derived from a single baseline land cover map. The baseline map was created using the full record of MERIS images from 2003 to 2012, using unsupervised classification as well as a machine learning algorithm over multiple years of imagery. Changes are then detected between individual years at 1 km resolution, using AVHRR data from 1992 to 1999, SPOT-VGT data from 1999 to 2013, and PROVA-V data from 2014 and 2015. Changes must be consistent for two consecutive years in order to be counted, with the exception of forest changes in 2014 and 2015 which are assumed to be well detected. The 1 km changes are then combined with the baseline land cover map and delineated to 300 meters for 2004 onward (when MERIS and PROVA-V data are available).\n\nThe resulting data have a total of 22 global land cover classes. For the sake of better visualization, Global Forest Watch shows only a set of simplified classes, based on the IPCC (agriculture, forest, grassland, wetland, settlement, shrubland, sparse vegetation, bare area, water, and permanent ice and snow). The full set of classes as well as annual land cover maps back to 1992 are available on the ESA/CCI viewer.',
  },
  citation: {
    label: 'Citation',
    value:
      'ESA Climate Change Initiative, Land Cover - led by UC Louvain. “2015 global land cover.” Land Cover CCI Product User Guide Version 2. Tech. Rep. (2017). Available at: maps.elie.ucl.ac.be/CCI/viewer/download/ESACCI-LC-Ph2-PUGv2_2.0.pdf. Accessed through Global Forest Watch on 14/02/2025. www.globalforestwatch.org.',
  },
};
