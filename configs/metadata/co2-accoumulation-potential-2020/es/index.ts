export const es = {
  title: 'Potencial de acumulación de carbono a partir de la repoblación forestal natural en zonas reforestables',
  subtitle: 'reforestable areas, 1 km, Cook-Patton et al. 2020',
  download_data: '',
  learn_more: '',
  content: [
    {
      label: 'Función',
      value:
        'Estima la tasa a la que podría secuestrarse el carbono en la biomasa viva por encima del suelo durante los primeros treinta años de rebrote del bosque natural en zonas potencialmente reforestables (Mg de carbono/ha/año).',
    },
    {
      label: 'Resolución',
      value: '1 × 1 km',
    },
    {
      label: 'Cobertura geográfica',
      value:
        'Global, dentro de la extensión de reforestación de Griscom et al. 2017 (que excluye los biomas boreales, herbáceos y las tierras de cultivo)',
    },
    {
      label: 'Fuente',
      value:
        'Cook-Patton, S.C., S.M. Leavitt, D. Gibbs, N.L. Harris, K. Lister, K.J. Anderson-Teixeira, R.D. Briggs, R.L. Chazdon, T.W. Crowther, P.W. Ellis, H.P. Griscom, V. Herrmann, K.D. Holl, R.A. Houghton, C. Larrosa, G. Lomax, R. Lucas, P. Madsen, Y. Malhi, A. Paquette, J.D. Parker, K. Paul, D. Routh, S. Roxburgh, S. Saatchi, J.van den Hoogen, W.S. Walker, C.E. Wheeler, S.A. Wood, L. Xu, B.W. Griscom. 2020. Mapping carbon accumulation potential from natural forest regrowth. Nature, in press. https://www.nature.com/articles/s41586-020-2686-x. This work resulted from a collaboration between The Nature Conservancy, World Resources Institute, and 18 other institutions.',
    },
    {
      label: 'Frecuencia de actualizaciones',
      value: '',
    },
    {
      label: 'Fecha del contenido',
      value: 'Aplicable a los primeros 30 años de repoblación forestal natural.',
    },
    {
      label: 'Precauciones',
      value:
        '- Los valores representan las mejores estimaciones, pero contienen incertidumbre. La precisión de los resultados depende de la disponibilidad de datos para el entrenamiento del modelo, que se concentra en diez países. El mapa de incertidumbre asociado a esta capa de datos puede descargarse desde el Portal de Datos Abiertos de GFW.\n- Los índices de acumulación de carbono se aplican únicamente a la regeneración natural de los bosques, y no se aplican a otros métodos de restauración activa (agrosilvicultura, plantaciones, etc.).\n- Las tasas de acumulación de carbono son lineales y se promedian durante los primeros 30 años de rebrote. Si se prolonga más allá de los 30 años, se sobreestimará el secuestro.\n- Los índices reflejan la acumulación de carbono solo en la biomasa viva sobre el suelo. La acumulación en la biomasa subterránea, la materia orgánica muerta y el carbono orgánico del suelo no se incluyen, pero se puede solicitar un mapa de acumulación de carbono subterráneo.\n- En las sabanas, las tasas solo se aplican a las partes boscosas de estas matrices de pastizales y bosques.\n- Estos datos no sustituyen a las evaluaciones detalladas a nivel de sitio del potencial de rebrote de los bosques.',
    },
    {
      label: 'Licencia',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Descripción',
    value:
      'Este mapa muestra la velocidad a la que los bosques pueden capturar carbono de la atmósfera y almacenarlo en la biomasa viva sobre el suelo durante los primeros 30 años de crecimiento natural de los bosques. Se ha creado combinando mediciones terrestres en miles de lugares de todo el mundo con 66 capas de covariables ambientales co-ubicadas en un modelo de aprendizaje automático para producir un mapa de pared a pared. Los datos de las parcelas forestales utilizados para entrenar el modelo proceden de la literatura publicada, que puede encontrarse en la base de datos de carbono forestal (ForC, mantenida por el Instituto Smithsonian (https://github.com/forc-db)), así como de los datos georreferenciados de los inventarios forestales nacionales disponibles públicamente. Aunque las tasas se estimaron en todos los biomas forestales y de sabana a nivel mundial, aquí se filtran por área "reforestable", tal como se define en Griscom et al. 2017 (PNAS). Las áreas reforestables excluyen las áreas de pastizales y tierras de cultivo nativas para salvaguardar la producción de alimentos y fibras y el hábitat para la diversidad biológica.',
  },
  citation: {
    label: 'Citación',
    value:
      'Cook-Patton et al. 2020. Carbon accumulation potential from natural forest regrowth in potentially reforestable areas. Accessed through Global Forest Watch 14/02/2025. www.globalforestwatch.org',
  },
};
