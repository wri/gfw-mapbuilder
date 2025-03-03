export const fr = {
  title: 'Gain de couvert forestier',
  subtitle: '(20 ans, 30 m, mondial, UMD/NASA GEDI)',
  content: [
    {
      label: 'Fonction',
      value: 'Identifie les zones qui connaissent un gain dans la couverture arborée',
    },
    {
      label: 'Résolution',
      value: '30 x 30 mètres',
    },
    {
      label: 'Couverture géographique',
      value: 'Global',
    },
    {
      label: 'Source',
      value:
        'Potapov, P., Hansen, M.C., Pickens, A., Hernandez-Serna, A., Tyukavina, A., Turubanova, S., Zalles, V., Li, X., Khan, A., Stolle, F., Harris, N., Song, X-P., Baggett, A., Kommareddy, I., and Kommareddy, A. 2022. The Global 2000-2020 Land Cover and Land Use Change Dataset Derived From the Landsat Archive: First Results. Frontiers in Remote Sensing, 13, April 2022. https://doi.org/10.3389/frsen.2022.856903',
    },
    {
      label: 'Date du contenu',
      value: '2000-2020',
    },
    {
      label: 'Mises en garde',
      value:
        "Dans cet ensemble de données, la « couverture arborée » est définie comme la végétation ligneuse d'une hauteur de 5 m et plus, et peut prendre la forme de bois naturels, de forêts ou de plantations d'arbres dans une gamme de densités de canopée. Le gain de couverture arborée n'équivaut pas directement à la restauration, au boisement ou au reboisement. En raison de la variation de la méthodologie de recherche et de la date du contenu, les ensembles de données relatives à la couverture arborée, au gain et à la perte annuelle ne peuvent être comparés avec précision les uns aux autres. Par conséquent, le « net » ne peut être calculé en soustrayant les chiffres relatifs au gain de couverture arborée de l'ensemble de données sur la perte annuelle de couverture arborée. Il convient plutôt d'utiliser la couche de changement net de la couverture arborée, qui a été calculée exclusivement à partir des données relatives à la hauteur des arbres. L'utilisation intégrée d'autres produits tels que les données concernant la densité de la couverture de canopée, également disponibles sur GFW, doit être effectuée avec précaution. Les auteurs ont évalué la précision du produit. La précision globale s'est avérée être de 99,3 %, l'erreur de commission (faux positifs) de 28,6 % et l'erreur d'omission (faux négatifs) de 42,2 %. La précision varie selon le biome et peut donc être supérieure ou inférieure selon l'endroit. L'erreur d'omission étant plus élevée que l'erreur de commission, cela indique que le produit fournit des estimations conservatrices de la dynamique forestière. Il y avait une confusion entre l'amélioration de la forêt (augmentation de la hauteur de la forêt existante) et le gain de forêt (établissement de forêts dans les terres non forestières de l'an 2000), et ceci était plus important dans les zones de forêt boréale où la hauteur de la forêt (en l'an 2000) était difficile à déterminer.",
    },
    {
      label: 'Licence',
      value: 'CC by 4.0',
    },
  ],
  overview: {
    label: 'Aperçu',
    value:
      "Cet ensemble de données provenant du laboratoire GLAD (Global Land Analysis & Discovery) de l'Université du Maryland mesure les zones de gain de couverture arborée entre 2000 et 2020 sur l'ensemble du globe à une résolution de 30 × 30 mètres, affichées sous forme de couche cumulative sur 20 ans. L'augmentation de la couverture forestière a été déterminée à l'aide des informations relatives à la hauteur des arbres pour les années 2000 et 2020. Cette hauteur a été modélisée par l'intégration des mesures lidar de la structure forestière de la Global Ecosystem Dynamics Investigation (GEDI) et des séries chronologiques de données Landsat prêtes à être analysées. Le GEDI de la NASA est un instrument lidar spatial fonctionnant à bord de la station spatiale internationale depuis avril 2019. Il fournit des mesures ponctuelles de la structure de la végétation, notamment la hauteur de la canopée forestière à des latitudes comprises entre 52°N et 52°S à l'échelle mondiale. Le gain a été identifié lorsque les pixels avaient une hauteur d'arbre ≥ 5 m en 2020 et une hauteur d'arbre de <5 m en 2000.",
  },
  citation: {
    label: 'Citation',
    value:
      'Use the following credit when this data is displayed:\nAccessed through Global Forest Watch on 30/01/2025. www.globalforestwatch.org.',
  },
};
