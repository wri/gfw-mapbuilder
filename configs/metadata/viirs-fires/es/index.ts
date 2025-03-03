export const es = {
  title: 'Incendios activos VIIRS',
  subtitle: '(diario, 375 m, global, NASA)',
  download_data: 'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/active-fire-data',
  learn_more: 'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/viirs-i-band-active-fire-data',
  content: [
    {
      label: 'Función',
      value: 'Despliega datos de alerta de fuego en los últimos 24 horas, 48 horas, 72 horas o 7 días.',
    },
    {
      label: 'Resolución',
      value: '375 × 375 metros',
    },
    {
      label: 'Cobertura geográfica',
      value: 'Global',
    },
    {
      label: 'Fuente',
      value: 'NASA',
    },
    {
      label: 'Frecuencia de actualizaciones',
      value: 'Dos veces al día',
    },
    {
      label: 'Fecha del contenido',
      value: 'Casi en tiempo real',
    },
    {
      label: 'Precauciones',
      value:
        'No se detectan todos los incendios. Hay varias razones por las que VIIRS puede no haber detectado un incendio en particular. El incendio puede haber comenzado y terminado entre pasos superiores de satélite. El incendio puede haber sido demasiado pequeño o demasiado frío para ser detectado en el píxel de 375 metros. La cubierta de nubes, el humo pesado o las copas de los árboles pueden oscurecer completamente un incendio.',
    },
    {
      label: 'Licencia',
      value:
        'Reconocemos el uso de datos e imágenes de LANCE FIRMS explotados por el sistema de datos e información de la NASA/GSFC/Earth Science (ESDIS) con fondos proporcionados por la NASA/HQ.',
    },
  ],
  overview: {
    label: 'Descripción',
    value:
      'Los datos de incendios activos del VIIRS (VNP14IMGT) son el último producto de vigilancia de incendios del FIRMS (Sistema de Información sobre Incendios para la Gestión de Recursos), que identifica la ubicación de los incendios a nivel mundial en tiempo casi real. La información se recoge del sensor del Paquete de Radiómetros de Imágenes Infrarrojas Visibles (VIIRS) y se procesa con un algoritmo de detección de incendios para señalar los incendios activos. Cada punto del mapa representa el centro de un píxel de 375 metros que ha señalado el algoritmo.',
  },
  citation: {
    label: 'Citación',
    value:
      'NASA FIRMS. “VIIRS Active Fires.” Accessed through Global Forest Watch on 30/01/2025. www.globalforestwatch.org',
  },
};
