export const es = {
  title: 'GLAD-Landsat Alertas de deforestación (GLAD-L)',
  subtitle: '(semanal, 30m, trópico, UMD/GLAD)',
  download_data: 'http://glad-forest-alert.appspot.com/',
  content: [
    {
      label: 'Función',
      value: 'Identifica áreas de posible pérdida de cobertura arbórea casi en tiempo real',
    },
    {
      label: 'Resolución',
      value: '30×30 metros',
    },
    {
      label: 'Cobertura geográfica',
      value: '30 grados norte a 30 grados sur',
    },
    {
      label: 'Fuente',
      value:
        'Hansen, M.C., A. Krylov, A. Tyukavina, P.V. Potapov, S. Turubanova, B. Zutta, S. Ifo, B. Margono, F. Stolle y R. Moore. 2016. Alertas de perturbación de bosques tropicales húmedos utilizando datos Landsat. Cartas de investigación ambiental, 11 (3)',
    },
    {
      label: 'Frecuencia de actualizaciones',
      value: 'Actualizado semanalmente',
    },
    {
      label: 'Fecha del contenido',
      value:
        '1 de enero de 2021 (las alertas GLAD-L han estado activas desde 2015 para países seleccionados de las cuencas del Amazonas y del Congo y del sudeste asiático insular, pero los datos históricos no están disponibles en GFW)',
    },
    {
      label: 'Precauciones',
      value:
        'Aunque se denominan “alertas de deforestación”, estas alertas detectan alteraciones de la cubierta forestal o arbórea. Este producto no distingue entre perturbaciones causadas por humanos y otros tipos de perturbaciones. Cuando se detectan alertas dentro de plantaciones forestales (es más probable que suceda en el sistema GLAD-L), las alertas pueden indicar operaciones de extracción de madera, sin una conversión a un uso de la tierra no forestal. \n\nEl término deforestación se utiliza porque se trata de eventos potenciales de deforestación y las alertas podrían investigarse más a fondo para determinarlo. \n\nNo recomendamos utilizar alertas de deforestación para evaluaciones de tendencias globales o regionales, ni para estimaciones de área. Recomendamos utilizar los datos anuales de pérdida de cobertura arbórea para una comparación más precisa de las tendencias en el cambio forestal a lo largo del tiempo y para estimaciones de área. Las alertas recientes incluirán falsos positivos que aún no han aumentado su nivel de confianza y es posible que eventualmente se eliminen. Es posible que las alertas anteriores se hayan eliminado por error de la base de datos si el cierre rápido del dosel precede a las observaciones satelitales despejadas adicionales dentro de los 6 meses. Además, las actualizaciones de las metodologías, la diferente cantidad de sistemas (en el caso de las alertas integradas) y la variación en la cobertura de nubes entre meses y años plantean riesgos adicionales al uso de alertas de deforestación para la comparación interanual o intraanual. \n\nLas alertas se pueden "curar" para identificar aquellas alertas de interés para un usuario, como aquellas alertas que probablemente sean de deforestación y que podrían priorizarse para tomar medidas. Un usuario puede hacer esto superponiendo otros conjuntos de datos contextuales, como áreas protegidas o árboles plantados. Los datos no seleccionados se proporcionan aquí para que los usuarios puedan definir sus propios enfoques de priorización. Las ubicaciones de alerta seleccionadas se proporcionan en la capa de datos Lugares para observar. \n\nSi bien los satélites Landsat 8 y 9 (anteriormente Landsat 7 y 8) juntos tienen un período de revisita de 8 días, la nubosidad puede limitar la disponibilidad de imágenes, particularmente en la estación húmeda. Las fechas de alerta representan el caso de detección, aunque la pérdida de cobertura arbórea podría haber ocurrido antes, posiblemente semanas antes, debido a la persistencia de la nubosidad. Tenga en cuenta que las alertas GLAD-L se obtenían anteriormente de imágenes de Landsat 7 que tenían un problema conocido en la línea de escaneo que a veces resultaba en alertas de falsos positivos, hasta abril de 2023, cuando la entrada se cambió a Landsat 9. \n\n\nEn este conjunto de datos, la “cobertura arbórea” se define como toda la vegetación de más de 5 metros de altura con más del 60% de cobertura de dosel, y puede tomar la forma de bosques naturales o plantaciones. La “pérdida de cobertura arbórea” indica la eliminación de al menos medio píxel del dosel y puede deberse a una variedad de factores, incluida la cosecha mecánica, incendios, enfermedades o daños por tormentas. Como tal, “pérdida” no equivale a deforestación. \n\nEn Perú, donde se desarrolló por primera vez el sistema de alerta, los autores evaluaron que los datos tenían un 13,5% de falsos positivos (pérdidas detectadas donde no ocurrió ninguna), aunque la mayoría de esos falsos positivos (9,5%) ocurren en los bordes de los claros. En los bordes, los píxeles Landsat de 30 m muestran una mezcla de bosques y otras coberturas terrestres, lo que los hace propensos a errores en el sistema. La tasa de falsos positivos cae al 1% cuando solo se consideran alertas de alta confianza. Los datos tienen un 33% de falsos negativos (pérdidas no detectadas donde ocurrió), aunque la mayoría de ellos ocurren en bosques secundarios, probablemente porque el algoritmo fue creado para capturar la pérdida de bosques primarios. La mayor tasa de falsos negativos en comparación con los falsos positivos también indica que las alertas son una estimación conservadora de la pérdida de cobertura arbórea que realmente está ocurriendo. \n\nEl nivel de confianza puede cambiar retroactivamente a medida que se actualizan los datos de origen; las alertas que no han alcanzado un nivel de confianza alto dentro de 180 días o después de 4 observaciones se eliminan del conjunto de datos \n\nUna vez que un píxel de alerta alcanza un nivel de confianza alto, no se volverá a detectar la pérdida de bosque en esa ubicación. \n\nCuando se aleja, esta capa de datos muestra cierto grado de inexactitud porque los puntos de datos deben contraerse para que sean visibles a mayor escala. Acérquese para obtener más detalles.',
    },
    {
      label: 'Licencia',
      value: 'CC POR 4.0',
    },
  ],
  overview: {
    label: 'Descripción',
    value:
      'Este conjunto de datos, creado por el laboratorio GLAD (Global Land Analysis & Discovery) de la Universidad de Maryland y respaldado por Global Forest Watch, es el primer sistema de alerta basado en Landsat para la pérdida de cobertura arbórea. Si bien la mayoría de los productos de alerta de pérdidas existentes utilizan imágenes MODIS de resolución de 250 metros, estas alertas tienen una resolución de 30 metros y, por lo tanto, pueden detectar pérdidas en una escala espacial mucho más fina. Estas alertas tienen una resolución de 30 metros y están operativas para áreas terrestres entre 30 grados norte y sur. \n\nLas nuevas imágenes de Landsat 8 y 9 se descargan a medida que se publican en línea, se evalúan la cobertura de nubes o la mala calidad de los datos y se comparan con los tres años anteriores de métricas derivadas de Landsat (incluidos rangos, medias y regresiones de bandas rojas, infrarrojas y de onda corta, y rangos de NDVI, NBR y NDWI). Las métricas y la última imagen Landsat se analizan en siete árboles de decisión para calcular una probabilidad media de alteración del bosque. Los píxeles con una probabilidad >50% se informan como alertas de pérdida de cobertura arbórea. Todo el proceso se ejecuta en Google Earth Engine para garantizar escalabilidad y actualizaciones confiables. Para obtener más información sobre metodología, consulte el artículo en Environmental Research Letters. \n\nLas alertas no se clasifican como de confianza alta hasta que dos o más de cuatro observaciones consecutivas estén etiquetadas como pérdida de cobertura arbórea. Las alertas se eliminan del conjunto de datos después de cuatro observaciones consecutivas o más de 180 días si no se clasifican como de confianza alta. Puede elegir ver solo alertas de alta confianza en el menú, aunque tenga en cuenta que al usar solo alertas de alta confianza se pasan por alto las detecciones más recientes de pérdida de cobertura arbórea.',
  },
  citation: {
    label: 'Citación',
    value:
      'Utilice el siguiente crédito cuando se muestren estos datos: \n\nFuente: GLAD/UMD, consultado a través de Global Forest Watch \n\nUtilice el siguiente crédito cuando se cite estos datos: \n\nHansen, M.C., A. Krylov, A. Tyukavina, P.V. Potapov, S. Turubanova, B. Zutta, S. Ifo, B. Margono, F. Stolle y R. Moore. 2016. Alertas de perturbación de bosques tropicales húmedos utilizando datos Landsat. Cartas de investigación ambiental, 11 (3). Consultado a través de Global Forest Watch el [fecha]. www.globalforestwatch.org',
  },
};
