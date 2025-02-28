export const es = {
  title: 'PRODES (Amazonía Legal)',
  subtitle: 'anual, 6,25ha, Amazonía Legal, INPE',
  content: [
    {
      label: 'Función',
      value:
        'Sistema de monitoreo de deforestación para la Amazonía Legal Brasileña, utilizado por el gobierno brasileño para establecer políticas públicas',
    },
    {
      label: 'Resolución',
      value: '6,25 hectáreas',
    },
    {
      label: 'Cobertura geográfica',
      value: 'Amazonía Legal Brasileña',
    },
    {
      label: 'Fuente',
      value: 'INPE',
    },
    {
      label: 'Frecuencia de actualizaciones',
      value: 'Anualmente',
    },
    {
      label: 'Fecha del contenido',
      value: '2008-2021',
    },
    {
      label: 'Precauciones',
      value:
        'PRODES sólo identifica claros de bosque de 6,25 hectáreas o más, por lo que no se detecta degradación forestal ni claros más pequeños por incendios o tala selectiva. La nubosidad frecuente sobre áreas de cobertura puede cambiar el año de deforestación reportado. El año informado es el primer año en que los analistas identifican la deforestación, pero esto no corresponde necesariamente al año de la deforestación si el paisaje ha estado cubierto de nubes en años anteriores.',
    },
    {
      label: 'Licencia',
      value: 'Creative Commons POR SA 3.0',
    },
  ],
  overview: {
    label: 'Descripción',
    value:
      'El proyecto PRODES monitorea la deforestación en los biomas de la Amazonía brasileña y del Cerrado, y ha producido tasas anuales de deforestación para la región desde 1988. El gobierno brasileño utiliza estas cifras para establecer políticas públicas, incluida la definición del acceso al crédito en el bioma amazónico, el establecimiento de objetivos de reducción de la deforestación y la solicitud de fondos para reducir la deforestación. PRODES históricamente utilizó imágenes de Landsat 5, pero ahora también incorpora imágenes de Landsat 7 y 8, CBERS-2, CBERS-2B, Resourcesat-1 y UK2-DMC. PRODES es operado por el Instituto Nacional de Investigaciones Espaciales (INPE) en colaboración con el Ministerio de Medio Ambiente (MMA) y el Instituto Brasileño de Medio Ambiente y Recursos Naturales Renovables (IBAMA). Desde 2002, todos los datos de PRODES están disponibles públicamente en línea. Las imágenes de entrada para cada una de las 220 huellas del Landsat que cubren la Amazonía brasileña y el Cerrado se seleccionan en función de su falta de nubosidad y su fecha de captura. El sistema PRODES utiliza el año estacional, que comienza el 1 de agosto, para calcular la deforestación anual, por lo que se seleccionan imágenes lo más cercanas posible a esta fecha (generalmente de julio, agosto y septiembre). De 2003 a 2005, los analistas utilizaron la transformación de imágenes para determinar los componentes de la vegetación, el suelo y la sombra utilizando el programa SPRING. Estos componentes se segmentaron y clasificaron en clases de bosque, no bosque, deforestación en el año objetivo, deforestación previa, nubes y agua, que luego son corregidos manualmente por expertos. A partir de 2005 se implementó una nueva metodología que hace uso de la plataforma de código abierto TerraAmazon. La plataforma permite que el análisis PRODES sea más uniforme y pueda incorporar imágenes de una variedad de satélites. Como antes, las imágenes se seleccionan para que estén lo más libres de nubes posible. Luego, las imágenes se enmascaran para excluir elementos no forestales, deforestación previa y agua utilizando el análisis del año anterior. Luego, los analistas delinean los polígonos deforestados en el bosque intacto del año anterior. Este conjunto de datos muestra la deforestación anual en 2008-2020 en la Amazonia legal de Nrazil.',
  },
  citation: {
    label: 'Citación',
    value:
      "Instituto Nacional de Investigaciones Espaciales (INPE). 'PRODES deforestación.' Consultado a través de Global Forest Watch el [fecha]. www.globalforestwatch.org",
  },
};
