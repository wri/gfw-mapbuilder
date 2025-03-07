export const es = {
  title: 'Cubierta arbórea tropical',
  subtitle: '2020, 10 m/0.5 ha, tropical, WRI',
  download_data: 'https://data.globalforestwatch.org/datasets/tropical-tree-cover/explore',
  learn_more: '',
  content: [
    {
      label: 'Función',
      value:
        'Muestra la extensión arbórea en la escala de diez metros, así como la cubierta arbórea en la escala de media hectárea, para permitir un monitoreo preciso de los árboles en áreas urbanas, tierras agrícolas y ecosistemas de dosel abierto y bosque seco',
    },
    {
      label: 'Resolución',
      value: '10 x 10 metros, media hectárea',
    },
    {
      label: 'Cobertura geográfica',
      value: '4,3 mil millones de hectáreas de los trópicos (latitud de -23,44 a 23,44)',
    },
    {
      label: 'Fuente',
      value: 'World Resources Institute',
    },
    {
      label: 'Frecuencia de actualizaciones',
      value:
        'Los mapas de detección de cambios anuales a partir de 2017 están programados para ser publicados en 2024.',
    },
    {
      label: 'Fecha del contenido',
      value: 2020,
    },
    {
      label: 'Precauciones',
      value:
        'Este conjunto de datos utiliza definiciones, tanto de árbol como de cobertura arbórea, distintas a las usadas por Hansen et al. (2013). El conjunto de datos define a un árbol en función de su altura y del diámetro de su corona. Se considera como árbol a toda vegetación leñosa mayor a 5 metros de alto, independientemente del diámetro de su corona, o de entre 3 y 5 metros, pero con un diámetro de corona mínimo de 5 metros. Esta definición es distinta a la de Hansen et al. (2013), la cual define a un árbol como cualquier vegetación de al menos 5 metros de altura. El conjunto de datos de cubierta arbórea tropical no distingue entre árboles de plantación y árboles que no son de plantación.\n\nLas estadísticas o análisis derivados de archivos de formato shapefile menores a 0,5 ha podrían no ser precisos.',
    },
    {
      label: 'Licencia',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Descripción',
    value:
      'Los datos de la cubierta arbórea tropical mapean la extensión arbórea en la escala de diez metros, así como la cubierta arbórea en la escala de media hectárea, para permitir un monitoreo preciso de los árboles en áreas urbanas, tierras agrícolas y ecosistemas de dosel abierto y bosque seco. Los datos cubren más de 4,3 mil millones de hectáreas de los trópicos globales.\n\nLos datos se derivan de modelos de red neuronal convolucional multitemporal aplicados a las imágenes ópticas y de radar de Sentinel. El conjunto de datos de 10 metros es una capa binaria de extensión arbórea similar a un mapa de cobertura terrestre, mientras que los datos de cobertura arbórea representan una cubierta fraccional a escala de media hectárea. En la página de GitHub se pueden encontrar más detalles sobre la metodología y los análisis.',
  },
  citation: {
    label: 'Citación',
    value:
      'Use the following credit when this data is displayed: Source: 14/02/2025, accessed through Global Forest Watch on 14/02/2025\n\nUse the following credit when this data is cited: Brandt,\nBrandt, J., Ertel, J., Spore, J., & Stolle, F. (2023). WALL-to-wall\nmapping of tree extent in the tropics with sentinel-1 and sentinel-2. Remote Sensing of Environment, 292, 113574. https://doi.org/10.1016/j.rse.2023.11357',
  },
};
