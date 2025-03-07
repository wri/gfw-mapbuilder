export const es = {
  title: 'Cobertura arbórea',
  subtitle: '2000/2010, Hansen/UMD/Google/USGS/NASA',
  download_data: 'https://glad.umd.edu/dataset/global-2010-tree-cover-30-m',
  learn_more: 'http://science.sciencemag.org/content/342/6160/850',
  content: [
    {
      label: 'Función',
      value: 'Identifica áreas de cobertura arbórea',
    },
    {
      label: 'Resolución',
      value: '30 × 30 metros',
    },
    {
      label: 'Cobertura geográfica',
      value: 'Tierra global (excluyendo la Antártida y las islas del Ártico)',
    },
    {
      label: 'Fuente',
      value:
        'Hansen, M. C., P. V. Potapov, R. Moore, M. Hancher, S. A. Turubanova, A. Tyukavina, D. Thau, S. V. Stehman, S. J. Goetz, T. R. Loveland, A. Kommareddy, A. Egorov, L. Chini, C. O. Justice, and J. R. G. Townshend. 2013. “High-Resolution Global Maps of 21st-Century Forest Cover Change.” Science 342 (15 November): 850–53. Data available from: https://glad.umd.edu/dataset/global-2010-tree-cover-30-m.',
    },
    {
      label: 'Frecuencia de actualizaciones',
      value: '',
    },
    {
      label: 'Fecha del contenido',
      value: '2000 & 2010',
    },
    {
      label: 'Precauciones',
      value:
        'Para los fines de este estudio, la "cobertura arbórea" fue definida como toda aquella vegetación con una altura mayor a los 5 metros. La "Cobertura arbórea" es la presencia biofísica de árboles y puede adoptar la forma de bosques naturales o plantaciones que existen por encima de un rango de densidades de dosel.',
    },
    {
      label: 'Licencia',
      value: 'CC BY 4.0',
    },
  ],
  overview: {
    label: 'Descripción',
    value:
      'Este conjunto de datos, una colaboración entre el laboratorio GLAD (Global Land Analysis & Discovery) de la Universidad de Maryland, Google, el USGS y la NASA, muestra la cobertura arbórea en todo el mundo (excepto la Antártida y varias islas del Ártico) para el año 2000, en una resolución de 30 × 30 metros. El "porcentaje de cobertura arbórea" se define como la densidad de la cobertura del dosel arbóreo de la superficie terrestre y está codificado por colores según el rango de densidad (ver leyenda).\n\nLos datos de esta capa se generaron usando imágenes satelitales multiespectrales del sensor Thematic Mapper Plus (ETM+) del Landsat 7. Se analizaron las superficies de más de 600 000 imágenes utilizando Google Earth Engine, una plataforma en la nube para la observación y análisis de datos de la Tierra, para determinar la cobertura arbórea por píxel por medio de un algoritmo de aprendizaje supervisado.\n\nLa densidad de dosel de la cobertura arbórea de los datos desplegados varía según la selección. Utilice la leyenda que se encuentra en el mapa para cambiar el umbral mínimo de densidad de dosel de la cobertura arbórea.',
  },
  citation: {
    label: 'Citación',
    value:
      'Use the following credit when these data are displayed:\nSource: Hansen/UMD/Google/USGS/NASA, accessed through Global Forest Watch\n\nUse the following credit when these data are cited:\nHansen, M. C., P. V. Potapov, R. Moore, M. Hancher, S. A. Turubanova, A. Tyukavina, D. Thau, S. V. Stehman, S. J. Goetz, T. R. Loveland, A. Kommareddy, A. Egorov, L. Chini, C. O. Justice, and J. R. G. Townshend. 2013. “High-Resolution Global Maps of 21st-Century Forest Cover Change.” Science 342 (15 November): 850–53. Data available on-line from:https://glad.umd.edu/dataset/global-2010-tree-cover-30-m. Accessed through Global Forest Watch on 11/02/2025. www.globalforestwatch.org',
  },
};
