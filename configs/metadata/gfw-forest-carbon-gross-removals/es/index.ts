export const es = {
  title: 'Eliminación de carbono forestal',
  subtitle: '30 m, global, 2001-2025, Harris et al. 2021',
  download_data: 'https://data.globalforestwatch.org/datasets/94871bf57f544ea39e594feb92b06305',
  learn_more: 'https://www.nature.com/articles/s41558-020-00976-6',
  content: [
    {
      label: 'Función',
      value: 'Muestra las eliminaciones de carbono forestal por sumideros forestales',
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
        '- Los datos son producto de la modelización y, por tanto, tienen un nivel inherente de error e incertidumbre. Se recomienda encarecidamente a los usuarios que lean y comprendan plenamente los metadatos y demás documentación disponible antes de utilizar los datos.\n- Los valores se aplican a las superficies forestales (cobertura de dosales >30 % y >5 m de altura o superficies con ganancia de cobertura arbórea). Consulte Harris et al. (2021) para leer más información sobre la definición de bosque utilizada en el análisis.\n- Las absorciones de carbono reflejan el total de absorciones a lo largo del periodo modelizado de 2001-2025, no una serie temporal anual de la que se puede derivar una tendencia. Por lo tanto, los valores se deben dividir entre 23 para calcular las absorciones anuales promedio.\n- La incertidumbre es mayor en las absorciones brutas que en las emisiones, causada particularmente por la incertidumbre en los factores de absorción.\n- Las absorciones de carbono reflejan una estimación bruta, es decir, no se incluyen las emisiones de carbono derivadas de la pérdida anterior o posterior de cobertura arbórea. En cambio, las emisiones brutas de carbono se contabilizan en la capa complementaria de emisiones de carbono de los bosques.\n- Los datos de las absorciones contienen inconsistencias temporales porque la ganancia de cobertura arbórea representa un total acumulado entre 2000-2020, en lugar de las ganancias anuales estimadas hasta 2025.\n- Las eliminaciones de carbono forestal reflejan las que se producen solamente dentro de los ecosistemas forestales y no reflejan el aumento de las existencias de carbono en el conjunto de productos de madera recolectada (PMR).\n- Los grandes saltos en las absorciones a lo largo de algunos límites se deben al uso de factores de absorción específicos de la ecozona. Los cambios en las absorciones se producen en los límites de la ecozona, donde se aplican diferentes factores de absorción en cada lado.\n- Este conjunto de datos ha sido actualizado desde su publicación original. Consulte la descripción general para obtener más información.',
    },
    {
      label: 'Licencia',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Descripción',
    value:
      'Esta capa de absorción de carbono forma parte del modelo de flujo de carbono forestal descrito en Harris et al. (2021). Este estudio presenta un marco de monitoreo geoespacial para estimar los flujos globales de carbono forestal que pueden ayudar a diversos participantes y organizaciones con el seguimiento de los flujos de gases de efecto invernadero de los bosques y a disminuir las emisiones o aumentar las absorciones forestales. Las absorciones de carbono forestal de la atmósfera (secuestro) por parte de los sumideros forestales representan el carbono acumulativo capturado (megagramos de CO2/ha) por el crecimiento de los bosques establecidos y de los que acaban de rebrotar durante el periodo modelizado entre 2001-2025. Las absorciones incluyen la acumulación de carbono tanto en la biomasa arbórea viva por encima de la tierra como por debajo de esta. Siguiendo los supuestos del Nivel 1 del IPCC para los bosques que permanecen como tales, se considera que son nulas las absorciones por parte de reservorios de carbono de madera muerta, basura y suelo. En cada píxel, las absorciones de carbono se calculan siguiendo las Directrices del IPCC para los inventarios nacionales de gases de efecto invernadero donde existían bosques en 2000 o se establecieron entre 2000 y 2020 de acuerdo a Potapov et al. (2022). El carbono atmosférico absorbido en cada píxel se basa en los mapas de tipo de bosque (p. ej., manglares, plantaciones), ecozona (p. ej., Neotrópico húmedo), edad del bosque (p. ej., primaria, secundaria antigua) y número de años de absorción de carbono. Esta capa refleja las absorciones acumulativas durante el periodo modelizado (2001-2025) y se debe dividir entre 23 para obtener un promedio anual durante la duración del modelo; las tasas de absorción no se pueden asignar a los años individuales del modelo. Todas las capas de entrada se remuestrearon a una resolución común de 0.00025 × 0.00025 grados cada una para que coincidan con Hansen et al. (2013).\n\nCada año, se actualizan la pérdida de cobertura arbórea, los causantes de la pérdida de cobertura arbórea y la superficie quemada. En 2025 y 2025, también se modificaron unos cuantos conjuntos de datos de entrada y constantes del modelo, como se describe abajo. Para más información, consulte este artículo del blog.\n\n- La fuente de la relación entre carbono de la biomasa por debajo de la tierra y el carbono de la biomasa por encima de la tierra. Anteriormente se utilizó una constante global; ahora se utiliza el mapa de Huang et al. (2021).\n- Los años de la ganancia de cobertura arbórea. Anteriormente se utilizó 2000-2012; ahora se utiliza 2000-2020 de Potapov et al. (2022).\n- La fuente de los datos de los incendios. Anteriormente se utilizó la superficie quemada de MODIS; ahora se utiliza la pérdida de cobertura arbórea por incendios de Tyukavina et al. (2022).\n- La fuente de los mapas de turba. Se incluyeron los nuevos conjuntos de datos tropicales y se modificó el conjunto de datos por encima de los 40 grados norte.\n- Constantes de GWP (potencial de calentamiento global) para CH4 y N2O. Anteriormente se utilizó el GWP del Quinto Informe de Evaluación del IPCC; ahora se utiliza el GWP del Sexto Informe de Evaluación del IPCC.\n- Factores de absorción para bosques templados secundarios antiguos (>20 años) y sus incertidumbres asociadas. Anteriormente se utilizaron los factores de absorción publicados en la Tabla 4.9 del Perfeccionamiento de 2019 de las Directrices del IPCC de 2006 para los Inventarios Nacionales de Gases de Efecto Invernadero; ahora se utilizan los factores de absorción y las incertidumbres corregidos de la 4.ª Rectificación del Perfeccionamiento de 2019 de las Directrices del IPCC de 2006 para los Inventarios Nacionales de Gases de Efecto Invernadero.\n- Extensión de árboles plantados y factores de absorción. Anteriormente se utilizó la Versión 1.0 de la SDPT (Spatial Database of Planted Trees); ahora se utiliza la Versión 2.0 de la SDPT y sus factores de absorción asociados.\n\nLas absorciones están disponibles para su descarga en dos unidades de superficie distintas a lo largo de la duración del modelo: 1) megagramos de CO2 absorbido/ha, y 2) megagramos de CO2 absorbido/píxel. La primera es apropiada para visualizar (cartografiar) las absorciones porque representa la densidad de las absorciones por hectárea. La segunda es apropiada para calcular las absorciones en una AOI (área de interés) porque los valores de los píxeles en la AOI se pueden sumar para obtener el total de absorciones para dicha área. Los valores de esta última se calcularon al ajustar las absorciones por hectárea según el tamaño de cada píxel, el cual varía por latitud. Al estimar las absorciones que se producen a lo largo de un número definido de años entre 2001 y 2025 para compararlas con las emisiones, divida el total de absorciones de carbono entre la duración del modelo y, a continuación, multiplique por el número de años del periodo de interés. Ambos conjuntos de datos solo incluyen píxeles dentro de los bosques, según se definen en los métodos de Harris et al. (2021) y se actualizan con la ganancia de cobertura arbórea a lo largo de 2020.',
  },
  citation: {
    label: 'Citación',
    value:
      'Harris et al. (2021). Global maps of 21st century forest carbon fluxes. Accessed on 14/02/2025 from Global Forest Watch.',
  },
};
