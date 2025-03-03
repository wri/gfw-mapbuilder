export const en = {
  title: 'Carbon accumulation potential from natural forest regrowth in reforestable areas',
  subtitle: 'reforestable areas, 1 km, Cook-Patton et al. 2020',
  download_data: '',
  learn_more: '',
  content: [
    {
      label: 'Function',
      value:
        'Estimates the rate at which carbon could be sequestered in aboveground live biomass during the first thirty years of natural forest regrowth in potentially reforestable areas (Mg carbon/ha/yr).',
    },
    {
      label: 'Resolution',
      value: '1 × 1 km',
    },
    {
      label: 'Geographic coverage',
      value:
        'Global, within reforestation extent of Griscom et al. 2017 (which excludes the boreal, grassy biomes, and croplands)',
    },
    {
      label: 'Source',
      value:
        'Cook-Patton, S.C., S.M. Leavitt, D. Gibbs, N.L. Harris, K. Lister, K.J. Anderson-Teixeira, R.D. Briggs, R.L. Chazdon, T.W. Crowther, P.W. Ellis, H.P. Griscom, V. Herrmann, K.D. Holl, R.A. Houghton, C. Larrosa, G. Lomax, R. Lucas, P. Madsen, Y. Malhi, A. Paquette, J.D. Parker, K. Paul, D. Routh, S. Roxburgh, S. Saatchi, J.van den Hoogen, W.S. Walker, C.E. Wheeler, S.A. Wood, L. Xu, B.W. Griscom. 2020. Mapping carbon accumulation potential from natural forest regrowth. Nature, in press. https://www.nature.com/articles/s41586-020-2686-x. This work resulted from a collaboration between The Nature Conservancy, World Resources Institute, and 18 other institutions.',
    },
    {
      label: 'Frequency',
      value: '',
    },
    {
      label: 'Date of content',
      value: 'Applicable to the first 30 years of natural forest regrowth.',
    },
    {
      label: 'Cautions',
      value:
        '- Values represent best estimates but contain uncertainty. Accuracy of results depend on data availability for model training, which is concentrated in ten countries. The uncertainty map associated with this data layer can be downloaded from GFW’s Open Data Portal.\n- Carbon accumulation rates are applicable to natural forest regrowth only, and do not apply to other active restoration methods (agroforestry, plantations, etc.).\n- Carbon accumulation rates are linear and averaged over first 30 years of regrowth. Extending beyond 30 years will over-estimate sequestration.\n- Rates reflect carbon accumulation in aboveground live biomass only. Accumulation in belowground biomass, dead organic matter and soil organic carbon are not included but a belowground carbon accumulation map is available upon request.\n- In savannas, rates only apply to forested portions of these grassland-forest matrices.\n- These data are not a substitute for detailed site-level assessments of forest regrowth potential.',
    },
    {
      label: 'License',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Overview',
    value:
      'This map shows the rate at which forests could capture carbon from the atmosphere and store it in aboveground live biomass over the first 30 years of natural forest regrowth. It was created by combining ground-based measurements at thousands of locations around the world with 66 co-located environmental covariate layers in a machine learning model to produce a wall-to-wall map. Forest plot data used to train the model are sourced from published literature, which can be found in the Forest Carbon database (ForC, maintained by the Smithsonian Institute (https://github.com/forc-db)), as well as georeferenced data from publicly available national forest inventories. Although rates were estimated over all forest and savanna biomes globally, they are filtered here by “reforestable” area, as defined in Griscom et al. 2017 (PNAS). Reforestable areas exclude areas of native grasslands and croplands to safeguard the production of food and fiber and habitat for biological diversity.',
  },
  citation: {
    label: 'Citation',
    value:
      'Cook-Patton et al. 2020. Carbon accumulation potential from natural forest regrowth in potentially reforestable areas. Accessed through Global Forest Watch 14/02/2025. www.globalforestwatch.org',
  },
};
