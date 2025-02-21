export const en = {
  title: 'Carbon accumulation potential from natural forest regrowth in forest and savanna biomes',
  subtitle: '1 km, global, Cook-Patton et al. 2020',
  download_data: 'https://www.arcgis.com/home/item.html?id=2b1e75c7d6274e448954178b3bc31bea',
  lean_more: 'http://science.sciencemag.org/content/342/6160/850',
  content: [
    {
      label: 'Function',
      value:
        '<p>Estimates the rate at which carbon could be sequestered in aboveground live biomass during the first thirty years of natural forest regrowth across all forest and savanna biomes, regardless of the current land cover or potential for reforestation (Mg carbon/ha/yr). </p>',
    },
    { label: 'Geographic Coverage', value: '<p>Global, within forest and savanna biomes</p>' },

    { label: 'License', value: '<p>[CC BY 4.0] (https://creativecommons.org/licenses/by/4.0/)</p>' },

    {
      label: 'Cautions',
      value:
        '<p>• Values represent best estimates but contain uncertainty. Accuracy of results depend on data availability for model training, which is concentrated in ten countries. The uncertainty map associated with this data layer can be downloaded from GFW’s Open Data Portal.<br>• Carbon accumulation rates are applicable to natural forest regrowth only, and do not apply to other active restoration methods (agroforestry, plantations, etc.) <br>• Carbon accumulation rates are linear and averaged over first 30 years of regrowth. Extending beyond 30 years will over-estimate sequestration.<br>• Rates reflect carbon accumulation in aboveground live biomass only. Accumulation in belowground biomass, dead organic matter and soil organic carbon are not included but a belowground carbon accumulation map is available upon request.<br>• In savannas, rates only apply to forested portions of these grassland-forest matrices.<br>• These data are not a substitute for detailed site-level assessments of forest regrowth potential. </p>',
    },
    { label: 'Date of Content', value: '<p>Applicable to the first 30 years of natural forest regrowth.</p>' },
    {
      label: 'Source',
      value:
        '<p>Cook-Patton, S.C., S.M. Leavitt, D. Gibbs, N.L. Harris, K. Lister, K.J. Anderson-Teixeira, R.D. Briggs, R.L. Chazdon, T.W. Crowther, P.W. Ellis, H.P. Griscom, V. Herrmann, K.D. Holl, R.A. Houghton, C. Larrosa, G. Lomax, R. Lucas, P. Madsen, Y. Malhi, A. Paquette, J.D. Parker, K. Paul, D. Routh, S. Roxburgh, S. Saatchi, J.van den Hoogen, W.S. Walker, C.E. Wheeler, S.A. Wood, L. Xu, B.W. Griscom. 2020. Mapping carbon accumulation potential from natural forest regrowth. Nature, in press. https://www.nature.com/articles/s41586-020-2686-x. This work resulted from a collaboration between The Nature Conservancy, World Resources Institute, and 18 other institutions.</p>',
    },
    { label: 'Resolution', value: '<p>1 × 1 km</p>' },
    { label: 'Frequency of Updates', value: '<p>NA</p>' },
    { label: 'Tags', value: 'Forest Change' },
  ],
  overview: {
    label: 'Overview',
    value:
      '<p>This map shows the rate at which forests could capture carbon from the atmosphere and store it in aboveground live biomass over the first 30 years of natural forest regrowth. It was created by combining ground-based measurements at thousands of locations around the world with 66 co-located environmental covariate layers in a machine learning model to produce a wall-to-wall map. Forest plot data used to train the model are sourced from published literature, which can be found in the Forest Carbon database (ForC, maintained by the Smithsonian Institute (https://github.com/forc-db)), as well as georeferenced data from publicly available national forest inventories. Rates were estimated over all forest and savanna biomes globally, regardless of current land cover or potential for reforestation.</p>',
  },
  citation: {
    label: 'Citation',
    value:
      '<p>Cook-Patton, S.C., Leavitt, S.M., Gibbs, D. et al. Mapping carbon accumulation potential from global natural forest regrowth. Nature 585, 545–550 (2020). https://doi.org/10.1038/s41586-020-2686-x</p>',
  },
};
