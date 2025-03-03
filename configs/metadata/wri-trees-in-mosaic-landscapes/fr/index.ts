export const fr = {
  title: 'Couvert végétal tropical',
  subtitle: '2020, 10 m/0.5 ha, tropical, WRI',
  download_data: 'https://data.globalforestwatch.org/datasets/tropical-tree-cover/explore',
  learn_more: '',
  content: [
    {
      label: 'Fonction',
      value:
        "Affiche l'étendue des arbres à l'échelle de dix mètres et le couvert végétal à l'échelle d'un demi-hectare pour permettre un suivi précis des arbres dans les zones urbaines, les terres agricoles et dans les écosystèmes de forêts sèches et à canopée ouverte.",
    },
    {
      label: 'Résolution',
      value: '10 x 10 mètres, demi-hectare',
    },
    {
      label: 'Couverture géographique',
      value: "4,3 milliards d'hectares des tropiques (-23,44 à 23,44 de latitude)",
    },
    {
      label: 'Source',
      value: 'World Resources Institute',
    },
    {
      label: 'Fréquence des mises à jour',
      value:
        'La publication des cartes annuelles de détection des changements commençant en 2017 est prévue pour 2024.',
    },
    {
      label: 'Date du contenu',
      value: 2020,
    },
    {
      label: 'Mises en garde',
      value:
        "Cet ensemble de données utilise une définition différente d'un arbre et une définition différente du couvert végétal que Hansen et al. (2013). Cet ensemble de données définit un arbre en fonction de la hauteur et du diamètre de la couronne. La végétation ligneuse d'une hauteur supérieure à 5 mètres, quel que soit le diamètre de la couronne, ou d'une hauteur comprise entre 3 et 5 mètres, avec un diamètre de couronne minimal de 5 mètres, est considérée comme un arbre. Cette définition est différente de celle de Hansen et al. (2013) qui définit un arbre comme toute végétation d'au moins 5 mètres de hauteur. L'ensemble de données sur le couvert végétal tropical ne permet pas de distinguer les arbres plantés des arbres non plantés.\n\nLes analyses ou les statistiques dérivées des fichiers de forme inférieurs à 0,5 ha peuvent ne pas être exactes.",
    },
    {
      label: 'Licence',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Aperçu',
    value:
      "Les données sur le couvert végétal tropical cartographient l'étendue des arbres à l'échelle de dix mètres et le couvert végétal à l'échelle d'un demi-hectare afin de permettre un suivi précis des arbres dans les zones urbaines, les terres agricoles et les écosystèmes de forêts sèches et à canopée ouverte. Les données couvrent 4,3 milliards d'hectares des tropiques mondiaux.\n\nLes données sont dérivées de modèles de réseaux neuronaux convolutifs multitemporels appliqués aux images optiques et radars Sentinel. L'ensemble de données à 10 mètres est une couche binaire sur l'étendue des arbres qui est similaire à une carte de l'occupation des sols, tandis que les données sur la couverture des arbres représentent une couverture fractionnée à l'échelle d'un demi-hectare. Plus de détails sur la méthodologie et les analyses peuvent être consultés sur la page GitHub.",
  },
  citation: {
    label: 'Citation',
    value:
      'Use the following credit when this data is displayed: Source: 14/02/2025, accessed through Global Forest Watch on 14/02/2025\n\nUse the following credit when this data is cited: Brandt,\nBrandt, J., Ertel, J., Spore, J., & Stolle, F. (2023). WALL-to-wall\nmapping of tree extent in the tropics with sentinel-1 and sentinel-2. Remote Sensing of Environment, 292, 113574. https://doi.org/10.1016/j.rse.2023.11357',
  },
};
