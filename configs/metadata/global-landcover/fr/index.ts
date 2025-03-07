export const fr = {
  title: 'Couvert terrestre 2015',
  subtitle: 'ESA/UCLouvain, 2015',
  download_data: 'http://maps.elie.ucl.ac.be/CCI/viewer/download.php',
  learn_more: 'http://maps.elie.ucl.ac.be/CCI/viewer/download/ESACCI-LC-Ph2-PUGv2_2.0.pdf',
  content: [
    {
      label: 'Fonction',
      value: 'Indique la répartition mondiale de la couverture terrestre en 2015',
    },
    {
      label: 'Résolution',
      value: '300 × 300 meters',
    },
    {
      label: 'Couverture géographique',
      value: 'Global',
    },
    {
      label: 'Source',
      value: '© ESA Climate Change Initiative - Land Cover led by UCLouvain (2017)',
    },
    {
      label: 'Fréquence des mises à jour',
      value: 'Annuel',
    },
    {
      label: 'Date du contenu',
      value: 2015,
    },
    {
      label: 'Mises en garde',
      value:
        "Une évaluation complète de l'exactitude est disponible auprès de l'ICC. En général, les classes de couverture terrestre telles que les cultures pluviales et irriguées, les forêts sempervirentes de feuillus, les zones urbaines, les zones dénudées, les plans d'eau et la neige permanente se trouvent assez précisément représentées sur des cartes. D'autre part, les classes telles que les lichens et les mousses, la végétation clairsemée et les forêts inondées d'eau douce peuvent être affectées par des erreurs.\n\nLa qualité des données varie d'une région à l'autre, particulièrement en ce qui concerne la couverture de l'imagerie MERIS pour la création de la carte de référence. Les zones moins couvertes comprennent la partie occidentale du bassin amazonien, le Chili et la partie méridionale de l'Argentine, la partie occidentale du bassin du Congo ainsi que le golfe de Guinée, la partie orientale de la Russie, la côte orientale de la Chine et l'Indonésie.",
    },
    {
      label: 'Licence',
      value: 'http://maps.elie.ucl.ac.be/CCI/viewer/download.php',
    },
  ],
  overview: {
    label: 'Aperçu',
    value:
      "Cet ensemble de données (version 2.07) a été créé dans le cadre de l'Initiative sur le changement climatique (ICC), une initiative de l'Agence spatiale européenne visant à créer des données mondiales cohérentes et à long terme aux fins de la modélisation climatique. Le projet de l'ICC sur la couverture terrestre fournit des cartes cohérentes de la couverture terrestre mondiale à une résolution spatiale de 300 m sur une base annuelle de 1992 à 2015. La plate-forme Global Forest Watch n'affiche que les données de la couverture terrestre de 2015.\n\nPour assurer l'uniformité d'une année à l'autre, les cartes de couverture du sol pour chaque année sont dérivées d'une seule carte de base de couverture du sol. La carte de référence a été créée à partir de l'enregistrement complet des images MERIS de 2003 à 2012, en utilisant une classification non supervisée ainsi qu'un algorithme d'apprentissage automatique sur plusieurs années d'imagerie. Les changements sont ensuite détectés entre les années individuelles à une résolution de 1 km, en utilisant les données AVHRR de 1992 à 1999, les données SPOT-VGT de 1999 à 2013 et les données PROVA-V de 2014 et 2015. Les changements doivent être constants pendant deux années consécutives pour être comptés, à l'exception des changements forestiers de 2014 et 2015 qui sont supposés être bien détectés. Les changements de 1 km sont ensuite combinés avec le fond cartographique de la couverture terrestre et délimités à 300 mètres pour 2004 et au-delà (lorsque les données MERIS et PROVA-V sont disponibles).\n\nLes données qui en résultent contiennent un total de 22 classes de couverture du sol à l'échelle mondiale. Pour une meilleure visualisation, Global Forest Watch ne présente qu'un ensemble de classes simplifiées, basées sur l'IPCC (agriculture, forêt, prairie, zone humide, peuplement, arbustes, végétation clairsemée, zones nues, eau, glace et neige permanentes). L'ensemble complet des classes ainsi que les cartes annuelles de couverture terrestre remontant à 1992 sont disponibles sur le visualiseur ESA/CCI .",
  },
  citation: {
    label: 'Citation',
    value:
      'ESA Climate Change Initiative, Land Cover - led by UC Louvain. “2015 global land cover.” Land Cover CCI Product User Guide Version 2. Tech. Rep. (2017). Available at: maps.elie.ucl.ac.be/CCI/viewer/download/ESACCI-LC-Ph2-PUGv2_2.0.pdf. Accessed through Global Forest Watch on 14/02/2025. www.globalforestwatch.org.',
  },
};
