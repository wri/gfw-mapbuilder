export const es = {
  title: 'Cubierta terrestre 2015',
  subtitle: 'ESA/UCLouvain, 2015',
  download_data: 'http://maps.elie.ucl.ac.be/CCI/viewer/download.php',
  learn_more: 'http://maps.elie.ucl.ac.be/CCI/viewer/download/ESACCI-LC-Ph2-PUGv2_2.0.pdf',
  content: [
    {
      label: 'Función',
      value: 'Muestra la distribución global de cobertura terrestre en 2015.',
    },
    {
      label: 'Resolución',
      value: '300 × 300 meters',
    },
    {
      label: 'Cobertura geográfica',
      value: 'Global',
    },
    {
      label: 'Fuente',
      value: '© ESA Climate Change Initiative - Land Cover led by UCLouvain (2017)',
    },
    {
      label: 'Frecuencia de actualizaciones',
      value: 'Annual',
    },
    {
      label: 'Fecha del contenido',
      value: 2015,
    },
    {
      label: 'Precauciones',
      value:
        'En el CCI se puede obtener una evaluación completa de la precisión. En general, las clases de cobertura de la tierra, como las tierras de secano y los cultivos de regadío, el bosque latifoliado perennifolio, las zonas urbanas, las zonas desnudas, las masas de agua y la nieve permanente, se encuentran cartografiadas con bastante precisión. Por otro lado, clases como líquenes y musgos, vegetación escasa y bosques inundados de agua dulce pueden verse afectados por errores.\n\nLa calidad de la información varía por región, en particular con respecto a la cobertura de la imagen MERIS para la creación del mapa base. Las áreas con menor cobertura incluyen el oeste de la Cuenca del Amazonas, Chile y el sur de Argentina, el oeste de la Cuenca del Congo al igual que el golfo de Guinea, el este de Rusia y la costa este de China e Indonesia.',
    },
    {
      label: 'Licencia',
      value: 'http://maps.elie.ucl.ac.be/CCI/viewer/download.php',
    },
  ],
  overview: {
    label: 'Descripción',
    value:
      'Este conjunto de datos (versión 2.07) se creó como parte de la Iniciativa sobre el Cambio Climático (CCI por sus siglas en inglés), una iniciativa de la Agencia Espacial Europea para crear datos globales consistentes a largo plazo con el propósito de crear modelos climáticos. El proyecto de Cobertura del Suelo de la CCI ofrece mapas consistentes de la cobertura del suelo global a una resolución espacial de 300 m cada año desde 1992 hasta 2015. La plataforma Global Forest Watch solo muestra los datos de cobertura del suelo de 2015.\n\nPara asegurar la coherencia año a año, los mapas de cobertura terrestre de cada año se derivan de un único mapa de cobertura terrestre de referencia. El mapa de referencia fue creado utilizando el registro completo de imágenes MERIS de 2003 a 2012, utilizando clasificación sin supervisión así como también un algoritmo de aprendizaje automático a lo largo de múltiples años de imágenes. Luego se detectan los cambios entre años individuales a una resolución de 1 km, utilizando información AVHRR que abarca desde 1992 a 1999, información SPOT-VGT de 1999 a 2013, e información PROVA-V desde 2014 a 2015. Los cambios deben ser constantes por dos años consecutivos para ser tenidos en cuenta, con la excepción de cambios arbóreos en 2014 y 2015, que se supone fueron bien detectados. Las cambios de 1 km se combinan luego con el mapa de cobertura terrestre de referencia y se delinean a 300 metros para el año 2004 en adelante (cuando se dispone de información de MERIS y PROVA-V).\n\nLos datos obtenidos tienen un total de 22 clases de cobertura terrestre global. En aras de una mejor visualización, Global Forest Watch muestra solamente un conjunto de clases simplificadas, basadas en el IPCC (agricultura, bosques, pastizales, humedales, asentamientos, matorrales, vegetación escasa, zonas desprovistas de vegetación, agua, hielo y nieve permanentes). El conjunto completo de clases, así como los mapas anuales de la cobertura terrestre desde 1992, están disponibles en el visor ESA/CCI.\n',
  },
  citation: {
    label: 'Citación',
    value:
      'ESA Climate Change Initiative, Land Cover - led by UC Louvain. “2015 global land cover.” Land Cover CCI Product User Guide Version 2. Tech. Rep. (2017). Available at: maps.elie.ucl.ac.be/CCI/viewer/download/ESACCI-LC-Ph2-PUGv2_2.0.pdf. Accessed through Global Forest Watch on 14/02/2025. www.globalforestwatch.org.',
  },
};
