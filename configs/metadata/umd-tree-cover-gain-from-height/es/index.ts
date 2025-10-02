export const es = {
  title: 'Aumento de la cobertura arbórea',
  subtitle: '(20 años, 30 m, global, UMD/NASA GEDI)',
  content: [
    {
      label: 'Función',
      value: 'Identifica las áreas de aumento de cobertura arbórea',
    },
    {
      label: 'Resolución',
      value: '30 × 30 metros',
    },
    {
      label: 'Cobertura geográfica',
      value: 'Global',
    },
    {
      label: 'Fuente',
      value:
        'Potapov, P., Hansen, M.C., Pickens, A., Hernandez-Serna, A., Tyukavina, A., Turubanova, S., Zalles, V., Li, X., Khan, A., Stolle, F., Harris, N., Song, X-P., Baggett, A., Kommareddy, I., and Kommareddy, A. 2022. The Global 2000-2020 Land Cover and Land Use Change Dataset Derived From the Landsat Archive: First Results. Frontiers in Remote Sensing, 13, April 2022. https://doi.org/10.3389/frsen.2022.856903',
    },
    {
      label: 'Fecha del contenido',
      value: '2000-2020',
    },
    {
      label: 'Precauciones',
      value:
        'En este conjunto de datos, se define "cubierta arbórea" como la vegetación leñosa con una altura de 5 metros y más que puede adoptar la forma de tierras boscosas naturales, bosques o plantaciones de árboles con distintas densidades de dosel. La ganancia de cobertura arbórea no equivale directamente a la restauración, la repoblación forestal o la reforestación. Debido a variaciones en la metodología de investigación y la fecha del contenido, los conjuntos de datos de cobertura arbórea, ganancia y pérdida anual no se pueden comparar de manera precisa unos con otros. En consecuencia, el "neto" no se puede calcular al restar las cifras de ganancia de cobertura arbórea del conjunto de datos de pérdida anual de cobertura arbórea. En lugar de ello, se debe utilizar la capa de cambio neto de la cobertura arbórea, la cual se calculaba exclusivamente a partir de los datos de altura de los árboles. El uso integrado de otros productos como los datos de densidad de la cobertura del dosel también disponible en GFW, se debe realizar con precaución. Los autores evaluaron la precisión del producto y se comprobó que la precisión general era del 99,3 %, el error de comisión (falsos positivos) de 28,6 % y el error de omisión (falsos negativos) de 42,2 %. La precisión varía según el bioma y por lo tanto, puede ser mayor o menor en algún lugar en particular. Dado que el error de omisión es mayor que el error de comisión, esto indica que el producto proporciona estimaciones conservadoras de la dinámica forestal. Hubo confusión entre la mejora forestal (aumento de altura del bosque existente) y la ganancia forestal (establecimiento de bosques dentro de la tierra no forestal del año 2000) y esto fue más evidente en las zonas de bosque boreal donde fue difícil determinar la altura forestal en el año 2000.',
    },
    {
      label: 'Licencia',
      value: 'CC by 4.0',
    },
  ],
  overview: {
    label: 'Descripción',
    value:
      'Este conjunto de datos del laboratorio GLAD (Global Land Analysis & Discovery) de la Universidad de Maryland mide zonas de ganancia de cobertura arbórea desde el año 2000 al 2020 en todo el mundo con una resolución de 30 × 30 metros, la cual se muestra como una capa acumulativa de 20 años. La ganancia de cobertura arbórea se determinó utilizando la información de la altura de los árboles de los años 2000 y 2020. La altura de los árboles se modeló mediante la integración de las medidas lidar de estructura forestal de la GEDI (Global Ecosystem Dynamics Investigation) y las series temporales de datos Landsat listos para el análisis. La GEDI de la NASA es un instrumento lidar espacial que funciona a bordo de la Estación Espacial Internacional desde abril de 2019. Proporciona mediciones puntuales de la estructura de la vegetación, incluida la altura del dosel forestal en latitudes comprendidas entre 52°N y 52°S a nivel mundial. Se identificó ganancia en los píxeles que mostraban árboles de ≥5 m de alto en 2020 y árboles de <5 m de alto en 2000.',
  },
  citation: {
    label: 'Citación',
    value:
      'Use the following credit when this data is displayed:\nAccessed through Global Forest Watch on 29/01/2025. www.globalforestwatch.org. Use the following credit when this data is cited:\nPotapov, P., Hansen, M.C., Pickens, A., Hernandez-Serna, A., Tyukavina, A., Turubanova, S., Zalles, V., Li, X., Khan, A., Stolle, F., Harris, N., Song, X-P., Baggett, A., Kommareddy, I., and Kommareddy, A. 2022. The Global 2000-2020 Land Cover and Land Use Change Dataset Derived From the Landsat Archive: First Results. Frontiers in Remote Sensing, 13, April 2022. https://doi.org/10.3389/frsen.2022.856903',
  },
};
