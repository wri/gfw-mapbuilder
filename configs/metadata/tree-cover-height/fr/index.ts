export const fr = {
  title: 'Hauteur du couvert arboré',
  subtitle: '2000/2020, 30 m, global, UMD/NASA GEDI',
  download_data: '',
  learn_more: 'https://glad.umd.edu/dataset/gedi/',
  content: [
    {
      label: 'Fonction',
      value: 'Indique la hauteur du couvert forestier mondial en 2000 et 2020.',
    },
    {
      label: 'Résolution',
      value: '30 mètres (30 mètres)',
    },
    {
      label: 'Couverture géographique',
      value: 'Mondial, avec des données prototypes au-dessus de 52°N',
    },
    {
      label: 'Source',
      value:
        'Potapov, P., Li, X., Hernandez-Serna, A., Tyukavina, A., Hansen, M.C., Kommareddy, A., Pickens, A., Turubanova, S., Tang, H., Silva, C.E. and Armston, J., 2021. Mapping global forest canopy height through integration of GEDI and Landsat data. Remote Sensing of Environment, 253, p.112165. https://doi.org/10.1016/j.rse.2020.112165',
    },
    {
      label: 'Fréquence des mises à jour',
      value: '',
    },
    {
      label: 'Date du contenu',
      value: '2000 and 2020',
    },
    {
      label: 'Mises en garde',
      value:
        "La carte mondiale de la hauteur des forêts est un produit prototype qui présente des problèmes connus liés à la qualité des données GEDI et à la disponibilité des données Landsat. Les données GEDI surestiment la hauteur des forêts sur les pentes des prairies de montagne tempérées et subtropicales, par exemple en Nouvelle-Zélande et au Lesotho. La hauteur des arbres au-dessus des villes et des banlieues peut être confondue avec la hauteur des bâtiments, car les données de l'IEDG ne font pas de distinction entre la hauteur de la végétation et celle des objets artificiels. Les incertitudes de calibration de l'IEDG (plus précisément, la précision de la géolocalisation et l'estimation de la hauteur de la surface terrestre) peuvent être responsables de certaines erreurs cartographiques. Le modèle de hauteur des arbres est saturé au-dessus de 30 m et peut ne pas représenter adéquatement la hauteur des plus grands arbres. Le produit global sera mis à jour à l'avenir pour résoudre la plupart des problèmes.",
    },
    {
      label: 'Licence',
      value: '',
    },
  ],
  overview: {
    label: 'Aperçu',
    value:
      "Une nouvelle carte mondiale de la hauteur de la canopée, à résolution spatiale de 30 m, a été élaborée grâce à l'intégration du lidar forestier Global Ecosystem Dynamics Investigation (GEDI) et des séries chronologiques de données Landsat prêtes à être analysées. Le GEDI de la NASA est un instrument lidar spatial qui fonctionne à bord de la Station spatiale internationale depuis avril 2019. Il fournit des mesures ponctuelles de la structure de la végétation, notamment la hauteur de la canopée entre 52°N et 52°S à l'échelle mondiale. L'équipe Global Land Analysis and Discover de l'Université du Maryland (UMD GLAD) a intégré les données GEDI disponibles à ce jour (avril-octobre 2019) aux données de séries chronologiques Landsat prêtes à l'analyse de l'année 2019 (Landsat ARD). La métrique GEDI RH95 (hauteur relative à 95 %) a été utilisée pour calibrer le modèle. Les mesures multitemporelles de Landsat qui représentent la phénologie de la surface servent de variables indépendantes pour la modélisation globale de la hauteur des forêts. Le modèle d'ensemble d'arbres de régression à fenêtre mobile, calibré localement et appliqué, a été mis en œuvre pour garantir la haute qualité de la prédiction de la hauteur des forêts et la cohérence globale des cartes. Le modèle a été extrapolé dans les régions boréales (au-delà de la plage de données de l'IEDG) pour créer la carte prototype de la hauteur des forêts mondiales.",
  },
  citation: {
    label: 'Citation',
    value:
      'Potapov, P., Li, X., Hernandez-Serna, A., Tyukavina, A., Hansen, M.C., Kommareddy, A., Pickens, A., Turubanova, S., Tang, H., Silva, C.E. and Armston, J., 2021. Mapping global forest canopy height through integration of GEDI and Landsat data. Remote Sensing of Environment, 253, p.112165. https://doi.org/10.1016/j.rse.2020.112165. Accessed through Global Forest Watch on 14/02/2025. www.globalforestwatch.org.',
  },
};
