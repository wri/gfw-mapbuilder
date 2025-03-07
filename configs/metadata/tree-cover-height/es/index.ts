export const es = {
  title: 'Altura de la cobertura arbórea',
  subtitle: '2000/2020, 30 m, global, UMD/NASA GEDI',
  download_data: '',
  learn_more: 'https://glad.umd.edu/dataset/gedi/',
  content: [
    {
      label: 'Función',
      value: 'Mostrar la altura del dosel forestal mundial en los años 2000 y 2020.',
    },
    {
      label: 'Resolución',
      value: '30 metros (30 m)',
    },
    {
      label: 'Cobertura geográfica',
      value: 'Mundial, con datos prototipo por encima de 52° N',
    },
    {
      label: 'Fuente',
      value:
        'Potapov, P., Li, X., Hernandez-Serna, A., Tyukavina, A., Hansen, M.C., Kommareddy, A., Pickens, A., Turubanova, S., Tang, H., Silva, C.E. and Armston, J., 2021. Mapping global forest canopy height through integration of GEDI and Landsat data. Remote Sensing of Environment, 253, p.112165. https://doi.org/10.1016/j.rse.2020.112165',
    },
    {
      label: 'Frecuencia de actualizaciones',
      value: '',
    },
    {
      label: 'Fecha del contenido',
      value: '2000 and 2020',
    },
    {
      label: 'Precauciones',
      value:
        'El mapa global de la altura de los bosques es un producto prototipo que tiene problemas conocidos relacionados con la calidad de los datos del GEDI y la disponibilidad de los datos del Landsat. Los datos del GEDI sobrestiman la altura de los bosques en las laderas dentro de las praderas montañosas templadas y subtropicales, por ejemplo, en Nueva Zelanda y Lesoto. La altura de los árboles sobre las ciudades y los suburbios puede confundirse con la altura de los edificios, ya que los datos del GEDI no discriminan entre la altura de la vegetación y la de los objetos fabricados por el hombre. Las incertidumbres de la calibración del GEDI (concretamente, la precisión de la geolocalización y la estimación de la altura de la superficie del terreno) pueden ser responsables de algunos de los errores del mapa. El modelo de altura de los árboles se saturó por encima de los 30 m y puede no representar adecuadamente la altura de los árboles más altos. El producto global se actualizará en el futuro para solucionar la mayoría de los problemas.',
    },
    {
      label: 'Licencia',
      value: '',
    },
  ],
  overview: {
    label: 'Descripción',
    value:
      'Se ha desarrollado un nuevo mapa de altura del dosel forestal global de 30 m de resolución espacial mediante la integración de las mediciones de la estructura forestal del lidar de la Investigación de las dinámicas de los ecosistemas globales (GEDI) y las series temporales de datos listos para el análisis del Landsat. El GEDI de la NASA es un instrumento lidar espacial que opera a bordo de la Estación Espacial Internacional desde abril de 2019. Proporciona mediciones puntuales de la estructura de la vegetación, incluida la altura del dosel forestal entre los 52° N y los 52° S a nivel mundial. El equipo de Global Land Analysis and Discover de la Universidad de Maryland (UMD GLAD) integró los datos del GEDI disponibles hasta la fecha (de abril a octubre de 2019) con los datos de series temporales listos para el análisis del Landsat del año 2019 (Landsat ARD). Se utilizó el parámetro GEDI RH95 (altura relativa al 95 %) para calibrar el modelo. Los parámetros multitemporales de Landsat que representan la fenología de la superficie sirven como variables independientes para la modelización de la altura global de los bosques. Se implementó el modelo de conjunto de árbol de regresión de "ventana móvil" calibrado localmente y aplicado para garantizar la alta calidad de la predicción de la altura del bosque y la coherencia del mapa global. El modelo se extrapoló en las regiones boreales (más allá del rango de datos del GEDI) para crear el mapa prototipo de altura forestal global.',
  },
  citation: {
    label: 'Citación',
    value:
      'Potapov, P., Li, X., Hernandez-Serna, A., Tyukavina, A., Hansen, M.C., Kommareddy, A., Pickens, A., Turubanova, S., Tang, H., Silva, C.E. and Armston, J., 2021. Mapping global forest canopy height through integration of GEDI and Landsat data. Remote Sensing of Environment, 253, p.112165. https://doi.org/10.1016/j.rse.2020.112165. Accessed through Global Forest Watch on 14/02/2025. www.globalforestwatch.org.',
  },
};
