export const es = {
  title: 'Alertas de deforestación integradas',
  subtitle: 'diariamente, 10 m, trópicos, UMD/GLAD y WUR',
  download_data:
    'Supervise las alteraciones forestales casi en tiempo real mediante alertas integradas procedentes de tres sistemas de alerta',
  content: [
    {
      label: 'Función',
      value: 'https://data.globalforestwatch.org/datasets/gfw::integrated-deforestation-alerts/about',
    },
    {
      label: 'Resolución',
      value: '10 × 10 m',
    },
    {
      label: 'Cobertura geográfica',
      value: '30°N to 30°S',
    },
    {
      label: 'Fuente',
      value:
        'GLAD Alerts:\nHansen, M.C., A. Krylov, A. Tyukavina, P.V. Potapov, S. Turubanova, B. Zutta, S. Ifo, B. Margono, F. Stolle, and R. Moore. 2016. Humid tropical forest disturbance alerts using Landsat data. Environmental Research Letters, 11 (3). (https://dx.doi.org/10.1088/1748-9326/11/3/034008)[https://dx.doi.org/10.1088/1748-9326/11/3/034008]',
    },
    {
      label: 'Frecuencia de actualizaciones',
      value: 'Diariamente',
    },
    {
      label: 'Fecha del contenido',
      value: 'Desde el 1 de enero de 2019 hasta el presente',
    },
    {
      label: 'Precauciones',
      value:
        'Aunque se denominen "alertas de deforestación", estas alertas detectan las alteraciones de la cobertura forestal o arbórea. Este producto no distingue entre alteraciones de origen humano y otros tipos de alteraciones. Cuando se detectan alertas dentro de plantaciones forestales (lo que es más probable que ocurra en el sistema GLAD-L), estas pueden indicar operaciones de extracción de madera sin una conversión a un uso de la tierra no forestal. \nSe utiliza el término "deforestación" porque se trata de posibles fenómenos de deforestación, y las alertas podrían investigarse más a fondo para determinarlo. \nNo recomendamos utilizar las alertas de deforestación para evaluar las tendencias globales o regionales, ni para las estimaciones de superficie. Recomendamos utilizar los datos anuales de pérdida de cubierta arbórea para hacer una comparación más precisa de las tendencias del cambio forestal a lo largo del tiempo, y para las estimaciones de superficie. Las alertas recientes incluirán falsos positivos que todavía tienen que elevar su nivel de confianza y que pueden llegar a eliminarse. Las alertas pasadas pueden haberse eliminado por error de la base de datos si el rápido cierre del dosel precede a las observaciones adicionales por satélite no oscurecidas en un plazo de seis meses. Además, las actualizaciones de las metodologías, el diferente número de sistemas (en el caso de las alertas integradas) y la variación de la nubosidad entre meses y años plantean riesgos adicionales a la hora de utilizar las alertas de deforestación para la comparación inter/intraanual.\nLas alertas se pueden "seleccionar" para identificar las que interesan a un usuario, como las alertas que probablemente sean de deforestación y a las que se podría dar prioridad de actuación. Un usuario puede hacer esto superponiendo otros conjuntos de datos contextuales, como áreas protegidas o árboles plantados. Los datos no seleccionados se proporcionan aquí para que los usuarios puedan definir sus propios criterios de priorización. Las ubicaciones de alerta seleccionadas se proporcionan en la capa de datos de lugares que vigilar.\nLos tres sistemas de alerta tienen definiciones diferentes de la cubierta forestal/arbórea y de las alteraciones de la misma: \n\n\nGLAD-L: las alertas se encuentran dentro de la "cobertura arbórea", que se define como toda la vegetación de más de 5 metros de altura con una cobertura de dosel superior al 60 %, y puede adoptar la forma de bosques naturales o plantaciones. La "pérdida de cobertura arbórea" indica la eliminación del dosel de al menos medio píxel y puede deberse a diversos factores, como la tala mecánica, los incendios, las enfermedades o los daños por tormentas. Por tanto, "pérdida" no equivale a deforestación. \nGLAD-S2: las alertas se encuentran dentro de la máscara de bosque primario de Turubanova et al (2018) en la cuenca del río Amazonas, con la pérdida forestal desde 2001 hasta el presente de Hansen et al. (2013) eliminada. \nRADD: Las alertas se encuentran dentro de bosques húmedos primarios. La pérdida forestal se define como la eliminación total o parcial de la cubierta arbórea dentro de un píxel, y se utiliza una unidad cartográfica mínima de 0,5 ha. \nLos sistemas de alerta de entrada no tienen la misma cobertura espacial y temporal:\nGLAD-L: opera en todo el trópico (30° N a 30° S) desde el 1 de enero de 2018 hasta el presente, y desde 2015 hasta el presente (aunque pausado por un tiempo en 2022) para determinados países del Amazonas, la cuenca del Congo y el sudeste asiático insular \nGLAD-S2: opera en las zonas de bosque húmedo tropical primario de Sudamérica desde enero de 2019 hasta la actualidad \nRADD: En funcionamiento en las zonas de bosque tropical húmedo primario de Sudamérica, África subsahariana y el sudeste asiático insular con cobertura desde enero de 2019 hasta la actualidad para África y desde enero de 2020 hasta la actualidad para Sudamérica y el sudeste asiático, con Centroamérica cubierta a partir de enero de 2023 (la expansión al sudeste asiático continental y al Pacífico está prevista para finales de 2023). \n\nPara integrar los tres sistemas de alerta en una cuadrícula común, GLAD-L se remuestrea de una resolución espacial de 30 m a 10 m para que coincida con GLAD-S2 y RADD. Como consecuencia, un único píxel de 30 m de GLAD-L se convertirá en múltiples píxeles de 10 m en la capa integrada. Los usuarios deben tener cuidado al comparar los resultados de los análisis de los sistemas individuales con la capa de alerta integrada, ya que el número de alertas integradas será mucho mayor que el número de alertas GLAD-L originarias. Además, es posible que los píxeles de la capa integrada no se alineen exactamente en el mapa con los píxeles de la capa GLAD-L individual debido a este remuestreo. \nCada píxel de la capa integrada conserva la fecha más temprana de detección de cualquier sistema de alerta, incluso si varios sistemas han informado de una alerta en ese píxel. En algunas situaciones, esto puede dar lugar a visualizaciones incoherentes al pasar de la capa integrada a las capas de los sistemas de alerta individuales. Es aconsejable utilizar la capa integrada cuando esté interesado en la fecha más temprana de detección por parte de cualquier sistema de alerta. Sin embargo, es mejor utilizar las capas de los sistemas de alerta individuales si está interesado en un tipo de alerta específico. \nEl nivel de "máxima confianza: detectada por varios sistemas de alerta" sólo puede alcanzarse en las zonas y para los periodos de tiempo en los que más de un sistema de alerta estaba en funcionamiento para esa región. \nEl nivel de confianza puede cambiar retroactivamente a medida que se actualicen los datos de origen; las alertas que no hayan alcanzado el nivel de confianza alto en un plazo de 180 días se eliminarán del conjunto de datos.\nUna vez que un píxel de alerta alcanza un nivel de confianza alto, la pérdida de bosque no volverá a ser detectada por el mismo sistema de alerta en ese lugar.\nLas precisiones varían según la cobertura de las alertas integradas debido a las diferentes características de los tres sistemas de alerta: las alertas por radar (RADD), por ejemplo, pueden registrar más detecciones falsas en los bosques pantanosos debido a la alta sensibilidad del radar de banda C de longitud de onda corta a la variación de la humedad\nCuando está alejada, esta capa de datos muestra cierto grado de inexactitud porque los puntos de datos deben contraerse para ser visibles a mayor escala. Amplíe el zum para obtener más detalles.',
    },
    {
      label: 'Licencia',
      value: 'CC by 4.0',
    },
  ],
  overview: {
    label: 'Descripción',
    value:
      'Este conjunto de datos, elaborado por Global Forest Watch, combina alertas de deforestación de tres sistemas de alerta (GLAD-L, GLAD-S2, RADD) en una única capa de alerta de deforestación integrada. Esta integración permite a los usuarios detectar casos de deforestación más rápidamente que cualquier sistema por sí solo, ya que la capa integrada se actualiza cuando lo hace cualquiera de los sistemas de alerta de origen.',
  },
  citation: {
    label: 'Citación',
    value: 'Source: "Integrated Deforestation Alerts". UMD/GLAD and WUR, accessed through Global Forest Watch',
  },
};
