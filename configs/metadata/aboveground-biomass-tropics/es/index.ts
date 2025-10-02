export const es = {
  title: 'Densidad de biomasa leñosa viva aérea tropical',
  subtitle: 'Trópicos, Zarin/WHR',
  download_data: 'http://data.globalforestwatch.org/datasets/8f93a6f94a414f9588ce4657a39c59ff_1',
  content: [
    {
      label: 'Función',
      value: 'Muestra los valores de densidad de carbono de la biomasa leñosa viva aérea.',
    },
    {
      label: 'Resolución',
      value: '30 metros',
    },
    {
      label: 'Cobertura geográfica',
      value: 'Trópicos (30 grados N, 20 grados S)',
    },
    {
      label: 'Fuente',
      value: 'ICEsat GLAS lidar, MODIS, Landsat, mediciones en tierra',
    },
    {
      label: 'Fecha del contenido',
      value: 2000,
    },
    {
      label: 'Precauciones',
      value:
        'Se recomienda que tanto la densidad del carbono sobre el suelo como los valores de incertidumbre se utilicen juntos para las evaluaciones y la verificación del carbono. El mapa proporcionará estimaciones precisas de las existencias de carbono sobre el suelo y de la densidad de carbono sobre el suelo cuando se agreguen a áreas grandes (5.000 a 10.000 ha) para evaluaciones a nivel regional y de proyectos. El valor de densidad de biomasa de un solo píxel puede tener una gran incertidumbre en comparación con parcelas pequeñas para verificación.',
    },
    {
      label: 'Licencia',
      value: 'Creative Commons CC POR 4.0',
    },
  ],
  overview: {
    label: 'Descripción',
    value:
      'Este es un producto de datos de mayor resolución que amplía la metodología presentada en Baccini et al. (2012) para generar un mapa pantropical de densidad de biomasa leñosa viva aérea con una resolución de 30 m para alrededor del año 2000. Junto con los valores de densidad de carbono, hay un mapa de error con la misma resolución espacial que proporciona la incertidumbre en la estimación de la densidad de carbono aérea. Estos mapas permiten la ubicación conjunta de estimaciones de biomasa con Hansen et al. (2013, v1.0) estimaciones de pérdida de cobertura arbórea con resolución espacial similar. La relación estadística derivada entre las mediciones terrestres de la densidad de biomasa forestal y las métricas de forma de onda LiDAR del Sistema de altímetro láser Geoscience (GLAS) ubicado en el mismo lugar, como lo describen Baccini et al. (2012) se utilizaron para estimar la densidad de biomasa de más de 40.000 huellas de GLAS en todos los trópicos. Luego, utilizando modelos aleatorios de Forest, las estimaciones de densidad de biomasa derivadas de GLAS se correlacionaron con variables continuas cuadriculadas, incluidas imágenes y productos satelitales Landsat 7 ETM+ (p. ej., reflectancia), elevación y variables biofísicas. Al utilizar conjuntos de datos cuadriculados continuos como entradas para los modelos de bosque aleatorio, se produjo un mapa de pared a pared con una resolución de 30 m de la densidad de biomasa leñosa aérea en los trópicos, así como la capa de incertidumbre asociada. La capa de incertidumbre tiene en cuenta los errores de las ecuaciones alométricas, el modelo basado en LiDAR y el modelo de bosque aleatorio. Todos los errores se propagan a la estimación final de biomasa. Se informará una descripción detallada del trabajo en un nuevo documento en preparación.',
  },
  citation: {
    label: 'Citación',
    value:
      'Baccini A., W. Walker, L. Carvahlo, M. Farina, D. Sulla-Menashe, R. Houghton (2015). Los bosques tropicales son una fuente neta de carbono según nuevas mediciones de ganancias y pérdidas. En revisión. Consultado a través de Global Forest Watch Climate el [fecha]. clima.globalforestwatch.org.',
  },
};
