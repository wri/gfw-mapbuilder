export const es = {
  title: 'Flujo neto de carbono forestal',
  subtitle: '30 m, global, 2001-2025, Harris et al. 2021',
  download_data: 'https://data.globalforestwatch.org/datasets/94871bf57f544ea39e594feb92b06305',
  learn_more: '',
  content: [
    {
      label: 'Función',
      value:
        'Muestra la pérdida neta de carbono de los ecosistemas forestales, que se calcula como la diferencia entre las emisiones de carbono forestal derivadas de las perturbaciones forestales que reemplazan los rodales y las absorciones de carbono derivadas del crecimiento forestal.',
    },
    {
      label: 'Resolución',
      value: '30 × 30m',
    },
    {
      label: 'Cobertura geográfica',
      value: 'Global',
    },
    {
      label: 'Fuente',
      value:
        'Harris, N.L., D.A. Gibbs, A. Baccini, R.A. Birdsey, S. de Bruin, M. Farina, L. Fatoyinbo, M.C. Hansen, M. Herold, R.A. Houghton, P.V. Potapov, D. Requena Suarez, R.M. Roman-Cuesta, S.S. Saatchi, C.M. Slay, S.A. Turubanova, A. Tyukavina. 2021. Global maps of twenty-first century forest carbon fluxes. Nature Climate Change. https://doi.org/10.1038/s41558-020-00976-6',
    },
    {
      label: 'Frecuencia de actualizaciones',
      value: 'Annual',
    },
    {
      label: 'Fecha del contenido',
      value: '2001-2025',
    },
    {
      label: 'Precauciones',
      value:
        '- Los datos son producto de la modelización y, por tanto, tienen un nivel inherente de error e incertidumbre. Se recomienda encarecidamente a los usuarios que lean y comprendan plenamente los metadatos y demás documentación disponible antes de utilizar los datos.\n- El flujo neto refleja el total a lo largo del periodo modelizado de 2001-2025, no una serie temporal anual de la que se puede derivar una tendencia. Por lo tanto, los valores se deben dividir entre 23 para calcular el flujo neto promedio anual.\n- La incertidumbre es mayor en las absorciones brutas que en las emisiones, causada particularmente por la incertidumbre en los factores de absorción. Estas incertidumbres se propagan a la incertidumbre en el flujo neto.\n- Los valores se aplican a las superficies forestales (cobertura de dosales >30 % y >5 m de altura). Consulte Harris et al. (2021) para leer más información sobre la definición de bosque utilizada en el análisis.\n- Las emisiones reflejan las perturbaciones del rodal tal y como se observan en las imágenes del satélite Landsat y no incluyen las emisiones de la degradación forestal no observada.\n- Los datos de actividad empleados como base de las estimaciones presentan inconsistencias temporales:\n- Los datos de las absorciones contienen inconsistencias temporales porque la ganancia de cobertura arbórea representa un total acumulado entre 2000-2020, en lugar de las ganancias anuales estimadas hasta 2025.\n- Las mejoras en la detección de la pérdida de cobertura arbórea debidas a la incorporación de nuevos datos satelitales y los cambios en la metodología entre 2011 y 2015 podrían traducirse en estimaciones de emisiones más elevadas en los años recientes, en comparación con los años anteriores. Para más información, consulte aquí.\n- Los grandes saltos en el flujo neto a lo largo de algunos límites se deben al uso de factores de absorción específicos de la ecozona. Los cambios en el flujo neto se producen en los límites de la ecozona, donde se aplican diferentes factores de absorción en cada lado.\n- Este conjunto de datos ha sido actualizado desde su publicación original. Consulte la descripción general para obtener más información.',
    },
    {
      label: 'Licencia',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Descripción',
    value:
      'Esta capa de flujo neto forma parte del modelo forestal de flujo de carbono descrito en Harris et al. (2021). Este estudio presenta un marco de monitoreo geoespacial para estimar los flujos globales de carbono forestal que pueden ayudar a diversos participantes y organizaciones con el seguimiento de los flujos de gases de efecto invernadero de los bosques y a disminuir las emisiones o aumentar las absorciones forestales. El flujo neto de carbono forestal representa la pérdida neta de carbono forestal del ecosistema, calculado como el carbono intermedio emitido por los bosques y absorbido (o secuestrado) por los mismos durante el periodo modelizado. El flujo neto de carbono se calcula al restar las absorciones brutas promedio de las emisiones brutas anuales en cada píxel del bosque; los valores negativos son aquellos en que los bosques fueron sumideros netos de carbono y los valores positivos son aquellos en que los bosques fueron fuentes netas de carbono entre 2001 y 2025. Los flujos netos se calculan según las Directrices del IPCC para los inventarios nacionales de gases de efecto invernadero en cada píxel donde existieron bosques en 2000 o estos se establecieron entre 2000 y 2020 según Potapov et al. (2022). Esta capa refleja el flujo neto acumulativo durante el periodo modelizado (2001-2025) y debe dividirse entre 23 para obtener el flujo neto anual promedio; los valores del flujo neto no se pueden asignar a años individuales del modelo. Todas las capas de entrada se remuestrearon a una resolución común de 0.00025 × 0.00025 grados cada una para que coincidan con Hansen et al. (2013).\n\n- Cada año, se actualizan la pérdida de cobertura arbórea, los causantes de la pérdida de cobertura arbórea y la superficie quemada. En 2025 y 2025, también se modificaron unos cuantos conjuntos de datos de entrada y constantes del modelo, como se describe abajo. Para más información, consulte este artículo del blog.\n- La fuente de la relación entre carbono por debajo de la tierra y el carbono por encima de la tierra. Anteriormente se utilizó una constante global; ahora se utiliza el mapa de Huang et al. (2021).\n- Los años de la ganancia de cobertura arbórea. Anteriormente se utilizó 2000-2012; ahora se utiliza 2000-2020 de Potapov et al. (2022).\n- La fuente de los datos de los incendios. Anteriormente se utilizó la superficie quemada de MODIS; ahora se utiliza la pérdida de cobertura arbórea por incendios de Tyukavina et al. (2022).\n- La fuente de los mapas de turba. Se incluyeron los nuevos conjuntos de datos tropicales y se modificó el conjunto de datos por encima de los 40 grados norte.\n- Constantes de GWP (potencial de calentamiento global) para CH4 y N2O. Anteriormente se utilizó el GWP del Quinto Informe de Evaluación del IPCC; ahora se utiliza el GWP del Sexto Informe de Evaluación del IPCC.\n- Factores de absorción para bosques templados secundarios antiguos (>20 años) y sus incertidumbres asociadas. Anteriormente se utilizaron los factores de absorción publicados en la Tabla 4.9 del Perfeccionamiento de 2019 de las Directrices del IPCC de 2006 para los Inventarios Nacionales de Gases de Efecto Invernadero; ahora se utilizan los factores de absorción y las incertidumbres corregidos de la 4.ª Rectificación del Perfeccionamiento de 2019 de las Directrices del IPCC de 2006 para los Inventarios Nacionales de Gases de Efecto Invernadero.\n- Extensión de árboles plantados y factores de absorción. Anteriormente se utilizó la Versión 1.0 de la SDPT (Spatial Database of Planted Trees); ahora se utiliza la Versión 2.0 de la SDPT y sus factores de absorción asociados.\n\nEl flujo neto está disponible para su descarga en dos unidades de superficie distintas a lo largo de la duración del modelo: 1) megagramos de emisiones de CO2/ha, y 2) megagramos de emisiones de CO2/píxel. La primera es apropiada para visualizar (cartografiar) el flujo neto porque representa la densidad de los flujos de carbono por hectárea. La segunda es apropiada para calcular el flujo neto en una AOI (área de interés) porque los valores de los píxeles en la AOI se pueden sumar para obtener el flujo de carbono total para dicha área. Los valores de esta última se calcularon al ajustar el flujo neto por hectárea según el tamaño de cada píxel, el cual varía por latitud. Al estimar el flujo neto que se produce a lo largo de un número definido de años entre 2001 y 2025, divida los valores entre la duración del modelo y, a continuación, multiplique por el número de años del periodo de interés. Ambos conjuntos de datos solo incluyen píxeles dentro de los bosques, según se definen en los métodos de Harris et al. (2021) y se actualizan con la ganancia de cobertura arbórea a lo largo de 2020.',
  },
  citation: {
    label: 'Citación',
    value:
      'Harris et al. (2021). Global maps of 21st century forest carbon fluxes. Accessed on 14/02/2025 from Global Forest Watch.',
  },
};
