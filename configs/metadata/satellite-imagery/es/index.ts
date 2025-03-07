export const es = {
  title: 'Landsat-8 / Sentinel-2 Satellite Imagery',
  content: [
    {
      label: 'Función',
      value:
        'Las imágenes satelitales de alta resolución son esenciales para brindar contexto a otras capas de datos disponibles en GFW, como la interpretación de los factores que impulsan el cambio en la cobertura arbórea. Se utilizan comúnmente para identificar posibles causas de alertas de deforestación casi en tiempo real. Las imágenes también se pueden utilizar en protocolos de validación para evaluar la precisión de la cobertura terrestre o forestal y cambiar los productos.',
    },
    {
      label: 'Resolución',
      value: 'Sentinal-2: 10 x 10 meters, Landsat 8: 30 x 30 meters',
    },
    {
      label: 'Cobertura geográfica',
      value: 'Global',
    },
    {
      label: 'Fuente',
      value:
        'Copernicus Sentinel-2. Retrieved from Google Earth Engine. Data processed by the European Space Agency (ESA).',
    },
    {
      label: 'Frecuencia de actualizaciones',
      value:
        'Cada día hay nuevas imágenes disponibles. Tiempo de revisión de la imagen: Sentinel-2A: cada 10 días, Landsat 8: cada 16 días',
    },
    {
      label: 'Fecha del contenido',
      value: 'De enero de 2012 hasta la actualidad',
    },
  ],
  overview: {
    label: 'Descripción',
    value:
      'Estos datos muestran las imágenes satelitales más recientes que cumplen con los criterios de nubosidad seleccionados de los sistemas Sentinel-2 y Landsat 8. Sentinel-2, que está operado por la Agencia Espacial Europea, tiene cobertura mundial con una resolución de diez metros y puede obtener imágenes actualizadas cada diez días. Landsat 8, que está operado por el Servicio Geológico de Estados Unidos, también es un satélite mundial con una resolución de 30 metros y puede obtener imágenes actualizadas cada 16 días. Ambos satélites ofrecen imágenes que representan el color natural y la salud de la vegetación. Las imágenes en color natural utilizan información de la luz visible (roja, verde y azul) para mostrar la superficie de la Tierra tal como la vería el ojo humano. La salud de la vegetación se detecta mediante el índice de vegetación de diferencia normalizada (NDVI, por sus siglas en inglés), que incorpora información sobre la reflectancia del rojo y del infrarrojo cercano. Este método se basa en el hecho de que la vegetación sana absorbe la mayor parte de la luz visible y refleja la mayor parte de la luz infrarroja cercana que incide en su superficie. Al interpretar imágenes que muestran la salud de la vegetación, el rojo indica vegetación en crecimiento saludable, el verde indica suelo desnudo y el negro indica cuerpos de agua.',
  },
};
