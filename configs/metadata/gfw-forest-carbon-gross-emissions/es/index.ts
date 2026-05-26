export const es = {
  title: 'Emisiones de carbono forestal',
  subtitle: '30 m, global, 2001-2025, Harris et al. 2021',
  download_data: 'https://data.globalforestwatch.org/datasets/753016096c1d49f0977e7b62533375ee',
  learn_more: '',
  content: [
    {
      label: 'Función',
      value:
        'Muestra las emisiones forestales de gases de efecto invernadero procedentes de las perturbaciones que sustituyen al rodal',
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
        '- Los datos son producto de la modelización y, por tanto, tienen un nivel inherente de error e incertidumbre. Se recomienda encarecidamente a los usuarios que lean y comprendan plenamente los metadatos y demás documentación disponible antes de utilizar los datos.\n- Los valores solo se aplican a las superficies forestales (cobertura de dosales >30 % y >5 m de altura o superficies con ganancia de cobertura arbórea). Consulte Harris et al. (2021) para leer más información sobre la definición de bosque utilizada en el análisis.\n- Si bien las emisiones en cada píxel se relacionan con un año de perturbación específico, las emisiones en un área de interés reflejan el total a lo largo del periodo modelizado de 2001-2025. Por lo tanto, los valores se deben dividir entre 23 para calcular las absorciones anuales promedio.\n- Las emisiones reflejan las perturbaciones del rodal tal y como se observan en las imágenes del satélite Landsat y no incluyen las emisiones de la degradación forestal no observada.\n- Las emisiones reflejan una estimación bruta, es decir, no se incluyen las eliminaciones de carbono de cualquier rebrote que se produzca tras la perturbación. En su lugar, las eliminaciones brutas de carbono se contabilizan en la capa complementaria de eliminaciones de carbono forestal.\n- Los datos de las emisiones contienen inconsistencias temporales. Las mejoras en la detección de la pérdida de cobertura arbórea debidas a la incorporación de nuevos datos satelitales y los cambios en la metodología entre 2011 y 2015 podrían traducirse en estimaciones de emisiones más elevadas en los años recientes en comparación con los años anteriores. Para más información, consulte aquí.\n- Las emisiones de carbono forestal no reflejan las transferencias de carbono desde los reservorios de carbono de los ecosistemas al reservorio de productos de madera recolectada (PMR).\n- Este conjunto de datos ha sido actualizado desde su publicación original. Consulte la descripción general para obtener más información.',
    },
    {
      label: 'Licencia',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Descripción',
    value:
      'Esta capa de emisiones forma parte del modelo de flujo de carbono forestal descrito en Harris et al. (2021). Este estudio presenta un marco de monitoreo geoespacial para estimar los flujos globales de carbono forestal que pueden ayudar a diversos participantes y organizaciones con el seguimiento de los flujos de gases de efecto invernadero de los bosques y a disminuir las emisiones o aumentar las absorciones forestales. Las emisiones de carbono forestal representan las emisiones de gases de efecto invernadero procedentes de las perturbaciones forestales de reemplazo de rodales que se produjeron en cada año modelizado (megagramos de emisiones de CO2/ha, entre 2001 y 2025). Las emisiones incluyen todos los reservorios relevantes de carbono del ecosistema (biomasa por encima de la tierra, biomasa por debajo de la tierra, madera muerta, basura, carbono orgánico del suelo) y los gases de efecto invernadero (CO2, CH4, N2O). Las estimaciones de las emisiones para cada píxel se calculan siguiendo las Directrices del IPCC para los inventarios nacionales de gases de efecto invernadero donde se produjo la perturbación de reemplazo de rodales, como se indica en los datos de pérdida de cobertura arbórea anual del Global Forest Change de Hansen et al. (2013). El carbono emitido por cada píxel se basa en las densidades de carbono en el año 2000, con un ajuste para el carbono acumulados entre 2000 y el año de la perturbación.\n\nLas emisiones reflejan una estimación bruta, es decir, no se incluyen las absorciones de carbono del rebrote posterior. En su lugar, las absorciones de carbono brutas que resulten del rebrote posterior a la eliminación se contabilizan en la capa de absorción de carbono forestal complementaria. La fracción del carbono emitido por cada píxel tras la perturbación (factor de emisión) se ve afectada por diversos factores, incluido el causante directo de la perturbación, independientemente de si se constató un incendio en el año de la perturbación observada o en el anterior, de si la perturbación se produjo en turba, etc. Se considera que todas las emisiones se producen en el año de la perturbación. Las emisiones se pueden asignar a un año específico utilizando los datos de pérdida de cobertura arbórea de Hansen; la GFW no dispone de rásters separados de las emisiones para cada año. Todas las capas de entrada se remuestrearon a una resolución común de 0.00025 × 0.00025 grados cada una para que coincidan con Hansen et al. (2013).\n\nCada año, se actualizan la pérdida de cobertura arbórea, los causantes de la pérdida de cobertura arbórea y la superficie quemada. En 2025 y 2025, también se modificaron unos cuantos conjuntos de datos de entrada y constantes del modelo, como se describe abajo. Para más información, consulte este artículo del blog.\n\n- La fuente de la relación entre carbono de la biomasa por debajo de la tierra y el carbono de la biomasa por encima de la tierra. Anteriormente se utilizó una constante global; ahora se utiliza el mapa de Huang et al. (2021).\n- Los años de la ganancia de cobertura arbórea. Anteriormente se utilizó 2000-2012; ahora se utiliza 2000-2020 de Potapov et al. (2022).\n- La fuente de los datos de los incendios. Anteriormente se utilizó la superficie quemada de MODIS; ahora se utiliza la pérdida de cobertura arbórea por incendios de Tyukavina et al. (2022).\n- La fuente de los mapas de turba. Se incluyeron los nuevos conjuntos de datos tropicales y se modificó el conjunto de datos por encima de los 40 grados norte.\n- Constantes de GWP (potencial de calentamiento global) para CH4 y N2O. Anteriormente se utilizó el GWP del Quinto Informe de Evaluación del IPCC; ahora se utiliza el GWP del Sexto Informe de Evaluación del IPCC.\n- Factores de absorción para bosques templados secundarios antiguos (>20 años) y sus incertidumbres asociadas. Anteriormente se utilizaron los factores de absorción publicados en la Tabla 4.9 del Perfeccionamiento de 2019 de las Directrices del IPCC de 2006 para los Inventarios Nacionales de Gases de Efecto Invernadero; ahora se utilizan los factores de absorción y las incertidumbres corregidos de la 4.ª Rectificación del Perfeccionamiento de 2019 de las Directrices del IPCC de 2006 para los Inventarios Nacionales de Gases de Efecto Invernadero.\n- Extensión de árboles plantados y factores de absorción. Anteriormente se utilizó la Versión 1.0 de la SDPT (Spatial Database of Planted Trees); ahora se utiliza la Versión 2.0 de la SDPT y sus factores de absorción asociados.\n\nLas emisiones están disponibles para su descarga en dos unidades de superficie distintas: 1) megagramos de emisiones de CO2/ha, y 2) megagramos de emisiones de CO2/píxel. La primera es apropiada para visualizar (cartografiar) las emisiones porque representa la densidad de las emisiones por hectárea. La segunda es apropiada para calcular las emisiones en una AOI (área de interés) porque los valores de los píxeles en la AOI se pueden sumar para obtener las emisiones totales para dicha área. Los valores de esta última se calcularon al ajustar las emisiones por hectárea según el tamaño de cada píxel, el cual varía por latitud. Ambos conjuntos de datos solo incluyen píxeles dentro de los bosques, según se definen en los métodos de Harris et al. (2021) y se actualizan con la ganancia de cobertura arbórea a lo largo de 2020. ',
  },
  citation: {
    label: 'Citación',
    value:
      'Harris et al. (2021). Global maps of 21st century forest carbon fluxes. Accessed on 14/02/2025 from Global Forest Watch.',
  },
};
