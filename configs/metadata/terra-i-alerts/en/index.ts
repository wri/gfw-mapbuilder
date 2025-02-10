export const en = {
  title: 'Terra-i alerts',
  subtitle: '(monthly, 250m, tropics, CIAT)',
  download_data: 'http://www.terra-i.org/terra-i/data.htm',
  lean_more: 'http://science.sciencemag.org/content/342/6160/850',
  content: [
    {
      label: 'Function',
      value: '<p>Detects areas where tree cover loss is likely to have recently occurred</p>',
    },
    {
      label: 'Geographic Coverage',
      value: '<p>Tropics (turn on the "Geographic Coverage" layer for more information)</p>',
    },

    {
      label: 'License',
      value: '<p><a href="http://www.terra-i.org/terra-i/data.html">Terms of Use</a></p>',
    },

    {
      label: 'Cautions',
      value:
        '<p>The Terra-i algorithm for change detection does not distinguish events that occurred because of wildfires or within secondary forests or oil palm plantations...</p>',
    },
    {
      label: 'Date of Content',
      value: '<p>2004 – present</p>',
    },
    {
      label: 'Learn More',
      value: 'http://www.terra-i.org/terra-i.html',
    },
    {
      label: 'Source',
      value:
        '<p>Reymondin, Louis, Andrew Jarvis, Andres Perez-Uribe, Jerry Touval, Karolina Argote, Julien Rebetez, Edward Guevara, and Mark Mulligan. 2012. “<a href="http://www.terra-i.org/dam/jcr:508a0e27-3c91-4022-93dd-81cf3fe31f42/Terra-i%20Method.pdf">Terra-i: A methodology for near real-time monitoring of habitat change at continental scales using MODIS-NDVI and TRMM</a>”</p>',
    },
    {
      label: 'Carto Table',
      value: '<p>https://wri-01.carto.com/tables/latin_decrease_current_points</p>',
    },
    {
      label: 'Amazon Link',
      value:
        'http://gfw2-data.s3.amazonaws.com/forest_change/terra_i_alerts/zip/latin_decrease_current_111715_subset.zip',
    },
    {
      label: 'Resolution',
      value: '<p>250 × 250 meters</p>',
    },
    {
      label: 'Frequency of Updates',
      value: '<p>Monthly</p>',
    },
    {
      label: 'Tags',
      value: 'Forest Change',
    },
  ],
  overview: {
    label: 'Overview',
    value:
      '<p>Terra-i is a near real-time monitoring system developed by that detects land cover changes in the tropics. It uses satellite data from MODIS vegetation indices (MOD13Q1 and NDVI) and products related to presence of water bodies (MOD35) as well as Tropical Rainfall Measuring Mission (TRMM) precipitation data to detect anthropogenic changes in vegetation cover every 16 days. Terra-i is a collaboration between the <a href="http://ciat.cgiar.org/">International Center for Tropical Agriculture</a> (CIAT - DAPA), CGIAR’s Research Program on Forestry, Trees and Agroforestry (FTA), The Nature Conservancy (TNC), the University of Applied Sciences Western Switzerland (HEIG-VD), and King’s College London (KCL).</p><p>The system is based on the premise that natural vegetation follows a predictable pattern of change in greenness from one date to the next, brought about by site-specific land and climatic conditions over the same period. The model is trained to understand the normal pattern of changes in vegetation greenness in relation to terrain and rainfall for a site, which allows for prediction of what the next vegetation response should be based on the historical data. If the prediction is significantly different from the historical responses in relation to pattern of rainfall and lasts for two 16-day periods in a row, the pixel is marked as potentially having changed by anthropogenic means.</p>',
  },
  citation: {
    label: 'Citation',
    value:
      '<p>CIAT. “Terra-i alerts”. Accessed through Global Forest Watch on [date]. www.globalforestwatch.org   </p>',
  },
};
