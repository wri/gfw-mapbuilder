export const fr = {
  title: 'Densité de la biomasse ligneuse vivante aérienne tropicale',
  subtitle: 'Tropiques, Zarin/WHR',
  download_data: 'http://data.globalforestwatch.org/datasets/8f93a6f94a414f9588ce4657a39c59ff_1',
  content: [
    {
      label: 'Fonction',
      value: 'Affiche les valeurs de densité de carbone de la biomasse ligneuse vivante aérienne',
    },
    {
      label: 'Résolution',
      value: '30 m',
    },
    {
      label: 'Couverture géographique',
      value: 'Tropiques (30 degrés N, 20 degrés S)',
    },
    {
      label: 'Source',
      value: 'Lidar ICEsat GLAS, MODIS, Landsat, mesures au sol',
    },
    {
      label: 'Date du contenu',
      value: 2000,
    },
    {
      label: 'Mises en garde',
      value:
        "Il est recommandé d’utiliser ensemble les valeurs de densité du carbone aérien et les valeurs d’incertitude pour les évaluations et la vérification du carbone. La carte fournira des estimations précises des stocks de carbone aérien et de la densité du carbone aérien lorsqu'elles sont regroupées sur de grandes zones (5 000 à 10 000 ha) pour les évaluations au niveau du projet et au niveau régional. La valeur de densité de biomasse d'un seul pixel peut présenter une grande incertitude par rapport aux petites parcelles de vérification.",
    },
    {
      label: 'Licence',
      value: 'Creative Commons CC PAR 4.0',
    },
  ],
  overview: {
    label: 'Aperçu',
    value:
      "Il s'agit d'un produit de données à plus haute résolution qui développe la méthodologie présentée dans Baccini et al. (2012) pour générer une carte pantropicale de la densité de la biomasse ligneuse vivante aérienne à une résolution de 30 m pour environ l'année 2000. Parallèlement aux valeurs de densité de carbone, il existe une carte d'erreur à la même résolution spatiale fournissant l'incertitude dans l'estimation de la densité de carbone aérienne. Ces cartes permettent de colocaliser les estimations de la biomasse avec celles de Hansen et al. (2013, v1.0) estiment la perte de couverture arborée à une résolution spatiale similaire. La relation statistique dérivée entre les mesures au sol de la densité de la biomasse forestière et les mesures de forme d'onde LiDAR du système d'altimètre laser géoscientifique (GLAS) colocalisées, telles que décrites par Baccini et al. (2012) ont été utilisés pour estimer la densité de biomasse de plus de 40 000 empreintes GLAS à travers les tropiques. Ensuite, à l'aide de modèles randomForest, les estimations de la densité de la biomasse dérivées de GLAS ont été corrélées à des variables continues et maillées, notamment l'imagerie et les produits satellite Landsat 7 ETM+ (par exemple, la réflectance), l'altitude et les variables biophysiques. En utilisant des ensembles de données maillées continues comme entrées dans les modèles randomForest, une carte de résolution mur à mur de 30 m de la densité de la biomasse ligneuse aérienne à travers les tropiques a été produite ainsi que la couche d'incertitude associée. La couche d'incertitude prend en compte les erreurs des équations allométriques, du modèle basé sur LiDAR et du modèle randomForest. Toutes les erreurs se propagent à l’estimation finale de la biomasse. Une description détaillée des travaux sera rapportée dans un nouvel article en préparation.",
  },
  citation: {
    label: 'Citation',
    value:
      'Baccini A., W. Walker, L. Carvahlo, M. Farina, D. Sulla-Menashe, R. Houghton (2015). Les forêts tropicales sont une source nette de carbone, selon de nouvelles mesures des gains et des pertes. En revue. Consulté via Global Forest Watch Climate le [date]. climat.globalforestwatch.org.',
  },
};
