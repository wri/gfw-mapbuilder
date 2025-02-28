export const en = {
  title: 'PRODES (Legal Amazon)',
  subtitle: 'annual, 6.25ha, Legal Amazon, INPE',
  content: [
    {
      label: 'Function',
      value:
        'Deforestation monitoring system for the Brazilian Legal Amazon, used by the Brazilian government to establish public policy',
    },
    {
      label: 'Resolution',
      value: '6.25ha',
    },
    {
      label: 'Geographic coverage',
      value: 'Brazilian Legal Amazon',
    },
    {
      label: 'Source',
      value: 'INPE',
    },
    {
      label: 'Frequency',
      value: 'Annually',
    },
    {
      label: 'Date of content',
      value: '2008-2021',
    },
    {
      label: 'Cautions',
      value:
        'PRODES only identifies forest clearings of 6.25 hectares or larger, so forest degradation or smaller clearings from fire or selective logging are not detected. Frequent cloud cover over areas of the areas of coverage may change the reported year of deforestation. The year reported is the first year deforestation is identified by analysts, but this does not necessarily correspond to the year of deforestation if the landscape has been covered by clouds in previous years.',
    },
    {
      label: 'License',
      value: 'Creative Commons BY SA 3.0',
    },
  ],
  overview: {
    label: 'Overview',
    value:
      "The PRODES project monitors clear cut deforestation in the Brazilian Amazon and Cerrado biomes, and has produced annual deforestation rates for the region since 1988. The Brazilian government uses these figures to establish public policy, including defining access to credit in the Amazon biome, establishing deforestation reduction goals, and soliciting funds to reduce deforestation. PRODES historically used Landsat 5 images, but now also incorporates imagery from Landsat 7 and 8, CBERS-2, CBERS-2B, Resourcesat-1, and UK2-DMC. PRODES is operated by the National Institute of Space Research (INPE) in collaboration with the Ministry of the Environment (MMA) and the Brazilian Institute of Environment and Renewable Natural Resources (IBAMA). Since 2002, all PRODES data is publicly available online. Input images for each of the 220 Landsat footprints that cover the Brazilian Amazon and Cerrado are selected based on their lack of cloud cover and their capture date. The PRODES system uses the seasonal year, starting on August 1st, to calculate annual deforestation, so images are selected as near to this date as possible (generally from July, August, and September). From 2003 to 2005, analysts used image transformation to determine the components of vegetation, soil, and shadow using the program SPRING. These components were segmented and classified into the classes of forest, non-forest, deforestation in the target year, previous deforestation, clouds, and water, which are then manually corrected by experts. Starting in 2005, a new methodology was implemented which makes use of the open source TerraAmazon platform. The platform allows the PRODES analysis to be more uniform and can incorporate imagery from a variety of satellites. As before, images are selected to be as cloud free as possible. The images are then masked to exclude non-forest, previous deforestation, and water using the previous year's analysis. Analysts then delineate deforested polygons in the intact forest of the previous year. This data set shows annual deforestation in 2008-2020 in the Nrazilian Legal Amazon.",
  },
  citation: {
    label: 'Citation',
    value:
      "National Institute of Space Research (INPE). 'PRODES deforestation.' Accessed through Global Forest Watch on [date]. www.globalforestwatch.org",
  },
};
