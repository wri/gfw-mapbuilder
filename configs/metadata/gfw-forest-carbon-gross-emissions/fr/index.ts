export const fr = {
  title: 'Émissions de carbone forestier',
  subtitle: '30 m, global, 2001-2025, Harris et al. 2021',
  download_data: 'https://data.globalforestwatch.org/datasets/753016096c1d49f0977e7b62533375ee',
  learn_more: '',
  content: [
    {
      label: 'Fonction',
      value:
        'Affiche les émissions de gaz à effet de serre des forêts dues aux perturbations qui remplacent les peuplements',
    },
    {
      label: 'Résolution',
      value: '30 × 30m',
    },
    {
      label: 'Couverture géographique',
      value: 'Global',
    },
    {
      label: 'Source',
      value:
        'Harris, N.L., D.A. Gibbs, A. Baccini, R.A. Birdsey, S. de Bruin, M. Farina, L. Fatoyinbo, M.C. Hansen, M. Herold, R.A. Houghton, P.V. Potapov, D. Requena Suarez, R.M. Roman-Cuesta, S.S. Saatchi, C.M. Slay, S.A. Turubanova, A. Tyukavina. 2021. Global maps of twenty-first century forest carbon fluxes. Nature Climate Change. https://doi.org/10.1038/s41558-020-00976-6',
    },
    {
      label: 'Fréquence des mises à jour',
      value: 'Annuel',
    },
    {
      label: 'Date du contenu',
      value: '2001-2025',
    },
    {
      label: 'Mises en garde',
      value:
        "- Les données sont le produit de la modélisation et comportent donc un degré inhérent d'erreur et d'incertitude. Les utilisateurs sont fortement encouragés à lire et à comprendre pleinement les métadonnées et autres documents disponibles avant d'utiliser les données.\n- Les valeurs s'appliquent uniquement aux zones forestières (couverture du couvert >30 pour cent et >5 m de hauteur ou zones avec gain de couverture arborée). Consultez Harris et al. (2021) pour plus d'informations sur la définition de la forêt utilisée dans l'analyse.\n- Même si les émissions dans chaque pixel sont associées à une année spécifique de perturbation, les émissions sur une zone d'intérêt reflètent le total sur la période du modèle de 2001 à 2025. Les valeurs doivent donc être divisées par 23 pour calculer les absorptions annuelles moyennes.\n- Les émissions reflètent les perturbations qui remplacent les peuplements, telles qu'elles sont observées sur les images satellite Landsat, et ne comprennent pas les émissions dues à la dégradation forestière non observée.\n- Les émissions reflètent une estimation brute, c'est-à-dire que les absorptions de carbone de toute repousse qui se produit après une perturbation ne sont pas incluses. Au lieu de cela, les absorptions brutes de carbone sont prises en compte dans la couche complémentaire d'absorption du carbone forestier.\n- Les données sur les émissions présentent des incohérences temporelles. Les changements apportés à la détection de la perte du couvert végétal grâce à l'intégration de nouvelles données satellitaires et aux changements de méthodologie entre 2011 et 2015 peuvent entraîner des estimations d'émissions plus élevées pour les années récentes que pour les années antérieures. Veuillez consulter ici pour de plus amples informations.\n- Les émissions de carbone forestier ne reflètent pas les transferts de carbone des réservoirs de carbone des écosystèmes vers le réservoir des produits du bois récoltés (PBR).\n- Cet ensemble de données a été mis à jour depuis sa publication initiale. Voir l’aperçu pour plus d’informations.",
    },
    {
      label: 'Licence',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Aperçu',
    value:
      "Cette couche d'émissions est une partie du modèle de flux de carbone forestier décrit dans Harris et al. (2021). Ce document présente un cadre de surveillance géospatiale pour l'estimation des flux mondiaux de carbone forestier, qui peut aider divers acteurs et organisations à suivre les flux de gaz à effet de serre issus des forêts et à réduire les émissions ou à augmenter les absorptions par les forêts. Les émissions de carbone forestier correspondent aux émissions de gaz à effet de serre provenant des perturbations forestières qui ont remplacé les peuplements et qui se sont produites au cours de chaque année modélisée (mégagrammes d'émissions de CO2/ha, entre 2001 et 2025). Les émissions englobent tous les réservoirs de carbone pertinents de l'écosystème (biomasse aérienne, biomasse souterraine, bois mort, litière, carbone organique du sol) et les gaz à effet de serre (CO2, CH4, N2O). Les estimations des émissions pour chaque pixel sont calculées selon les lignes directrices du GIEC pour les inventaires nationaux de gaz à effet de serre où des perturbations ont remplacé les peuplements, comme indiqué dans les données sur la perte annuelle du couvert forestier de Global Forest Change de Hansen et al. (2013). Le carbone émis par chaque pixel est basé sur les densités de carbone en 2000, avec un ajustement pour le carbone accumulé entre 2000 et l'année de la perturbation.\n\nLes émissions indiquent une estimation brute, ce qui signifie que les absorptions de carbone résultant d'une repousse ultérieure ne sont pas incluses. En revanche, les absorptions brutes de carbone résultant de la repousse après le défrichement sont prises en compte dans la couche d'accompagnement des absorptions de carbone forestier. Le pourcentage de carbone émis par chaque pixel lors d'une perturbation (facteur d'émission) est influencé par plusieurs facteurs, y compris le facteur direct de la perturbation, le fait que les incendies aient été observés au cours de l'année ou avant l'événement de perturbation observé, le fait que la perturbation ait eu lieu sur de la tourbe, etc. Il est supposé que toutes les émissions se produisent au cours de l'année de la perturbation. Les émissions peuvent être attribuées à une année spécifique en utilisant les données de Hansen sur la perte de couverture arborée ; des rasters indépendants pour les émissions de chaque année ne sont pas disponibles auprès de GFW. Toutes les couches d'entrée ont été rééchantillonnées à une résolution commune de 0,00025 × 0,00025 degrés chacune pour correspondre à Hansen et al. (2013).\n\nChaque année, la perte de couvert végétal, les éléments moteurs de la perte de couvert végétal et la superficie brûlée sont mis à jour. En 2025 et 2025, quelques ensembles de données d'entrée et constantes du modèle ont également été modifiés, comme décrit ci-dessous. Veuillez vous référer à cet article de blog pour de plus amples informations.\n\n- La source du rapport entre le carbone de la biomasse souterraine et le carbone de la biomasse aérienne. Elle utilisait auparavant une constante globale ; elle utilise désormais la carte de Huang et al. 2021\n- Les années de croissance du couvert végétal. Précédemment utilisé de 2000 à 2012 ; maintenant utilisé de 2000 à 2020 à partir de Potapov et al. 2022.\n- La source des données sur les incendies. Utilisait auparavant la zone brûlée du MODIS ; utilise maintenant la perte de couverture arborée due aux incendies de Tyukavina et al. 2022.\n- La source des cartes de tourbe. De nouveaux ensembles de données tropicales ont été inclus et l'ensemble de données au-dessus de 40 degrés nord a été modifié.\n- Constantes du potentiel de réchauffement mondial (PRM) pour le CH4 et le N2O. Les PRM utilisés précédemment étaient ceux du cinquième rapport d'évaluation du GIEC ; les PRM utilisés maintenant sont ceux du sixième rapport d'évaluation du GIEC.\n- Facteurs d'enlèvement pour les forêts tempérées secondaires plus anciennes (>20 ans) et leurs incertitudes associées. On utilisait précédemment les facteurs de suppression publiés dans le Tableau 4.9 de l'Actualisation 2019 des Lignes directrices 2006 du GIEC pour les inventaires nationaux de gaz à effet de serre ; on utilise maintenant les facteurs de suppression corrigés et les incertitudes provenant du 4e rectificatif à l'Actualisation 2019 des Lignes directrices 2006 du GIEC pour les inventaires nationaux de gaz à effet de serre.\n- Étendue des arbres plantés et facteurs de suppression. Elle utilisait auparavant la base de données spatiale des arbres plantés (SDPT) Version 1.0 ; elle utilise désormais la SDPT Version 2.0 et les facteurs de suppression associés.\n\nLes émissions peuvent être téléchargées dans deux unités de surface différentes : 1) mégagrammes d'émissions de CO2/ha et 2) mégagrammes d'émissions de CO2/pixel. La première unité est appropriée pour visualiser (cartographier) les émissions, car elle représente la densité des émissions par hectare. La deuxième est utile pour calculer les émissions dans une zone d'intérêt (ZDI), car les valeurs des pixels de la ZDI peuvent être agrégées pour obtenir les émissions totales de cette zone. Les valeurs de la deuxième ont été calculées en adaptant les émissions par hectare à la taille de chaque pixel, qui varie en fonction de la latitude. Les deux ensembles de données n'incluent que les pixels situés dans les forêts, telles que définies dans les méthodes de Harris et al. (2021) et mises à jour avec le gain de couverture arborée jusqu'en 2020. ",
  },
  citation: {
    label: 'Citation',
    value:
      'Harris et al. (2021). Global maps of 21st century forest carbon fluxes. Accessed on 14/02/2025 from Global Forest Watch.',
  },
};
