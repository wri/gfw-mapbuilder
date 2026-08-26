export const fr = {
  title: 'Flux net de carbone forestier',
  subtitle: '30 m, global, 2001-2025, Harris et al. 2021',
  download_data: 'https://data.globalforestwatch.org/datasets/94871bf57f544ea39e594feb92b06305',
  learn_more: '',
  content: [
    {
      label: 'Fonction',
      value:
        'Affiche la perte nette de carbone de l’écosystème forestier, calculée comme la différence entre les émissions de carbone forestier provenant des perturbations forestières qui remplacent les peuplements et les absorptions de carbone provenant de la croissance de la forêt.',
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
        'Harris, N.L., D.A. Gibbs, A. Baccini, R.A. Birdsey, S. de Bruin, M. Farina, L. Fatoyinbo, M.C. Hansen, M. Herold, R.A. Houghton, P.V. Potapov, D. Requena Suarez, R.M. Roman-Cuesta, S.S. Saatchi, C.M. Slay, S.A. Turubanova, A. Tyukavina. 2021. Global maps of twenty-first century forest carbon fluxes. Nature Climate Change. https://doi.org/10.1038/s41558-020-00976-6<br /><br />Gibbs, D. A., Rose, M., Grassi, G., Melo, J., Rossi, S., Heinrich, V., &amp; Harris, N. L. 2025. Revised and updated geospatial monitoring of 21st century forest carbon fluxes. Earth System Science Data. https://essd.copernicus.org/articles/17/1217/2025/',
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
        "- Les données sont le produit de la modélisation et comportent donc un degré inhérent d'erreur et d'incertitude. Les utilisateurs sont fortement encouragés à lire et à comprendre pleinement les métadonnées et autres documents disponibles avant d'utiliser les données.\n- Le flux net reflète le total sur la période de modélisation de 2001 à 2025, et non une série temporelle annuelle à partir de laquelle une tendance peut être dérivée. Les valeurs doivent donc être divisées par 23 pour calculer le flux net annuel moyen.\n- L'incertitude est plus élevée pour les absorptions brutes que pour les émissions, notamment en raison de l'incertitude liée aux facteurs d'absorption. Ces incertitudes se propagent à l'incertitude du flux net.\n- Les valeurs s'appliquent aux zones forestières (couverture du couvert >30 pour cent et >5 m de hauteur). Consultez Harris et al. (2021) pour plus d'informations sur la définition de la forêt utilisée dans l'analyse.\n- Les émissions reflètent les perturbations qui remplacent les peuplements, telles qu'elles sont observées sur les images satellite Landsat, et ne comprennent pas les émissions dues à la dégradation forestière non observée.\n- Les données d'activité utilisées comme base des estimations contiennent des incohérences temporelles :\n- Les données relatives aux prélèvements présentent des incohérences temporelles car le gain de couverture arborée représente un total cumulé de 2000 à 2020, plutôt que des gains annuels tels qu'estimés jusqu'en 2025.\n- Les perfectionnements apportés à la détection de la perte du couvert végétal grâce à l'incorporation de nouvelles données satellitaires et aux modifications apportées à la méthodologie entre 2011 et 2015 peuvent se traduire par des estimations plus élevées des émissions au cours des dernières années par rapport aux années antérieures. Reportez-vous ici pour plus d'informations.\n- Les grands sauts dans le flux net le long de certaines frontières sont dus à l’utilisation de facteurs d’élimination spécifiques à l’écozone. Les changements dans le flux net se produisent aux frontières des écozones, où des facteurs d’élimination différents sont appliqués de part et d’autre.\n- Cet ensemble de données a été mis à jour depuis sa publication initiale. Voir l’aperçu pour plus d’informations.",
    },
    {
      label: 'Licence',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Aperçu',
    value:
      "Cette couche de flux net fait partie du modèle de flux de carbone forestier décrit dans Harris et al. (2021). Cet article propose un cadre de surveillance géospatiale pour l'estimation des flux de carbone forestier à l'échelle mondiale, qui peut aider différents acteurs et organisations à suivre les flux de gaz à effet de serre en provenance des forêts et à réduire les émissions ou à augmenter les absorptions par les forêts. Le flux net de carbone forestier correspond à la perte nette de carbone de l'écosystème forestier, calculée comme la différence entre le carbone émis par les forêts et le carbone absorbé (ou séquestré) par les forêts au cours de la période couverte par le modèle. Le flux net de carbone est calculé en soustrayant les absorptions brutes moyennes des émissions brutes annuelles dans chaque pixel forestier ; les valeurs négatives correspondent à des puits nets de carbone et les valeurs positives à des sources nettes de carbone entre 2001 et 2025. Les flux nets sont calculés sur la base des lignes directrices du GIEC pour les inventaires nationaux de gaz à effet de serre dans chaque pixel où des forêts existaient en 2000 ou ont été créées entre 2000 et 2020, conformément à Potapov et al. 2022. Cette couche reflète le flux net cumulé pendant la période du modèle (2001-2025) et doit être divisée par 23 pour obtenir le flux net annuel moyen ; les valeurs du flux net ne peuvent pas être attribuées à des années individuelles du modèle. Toutes les couches d'entrée ont été rééchantillonnées à une résolution commune de 0,00025 x 0,00025 degrés chacune pour correspondre à Hansen et al. (2013).\n\nChaque année, la perte de couvert végétal, les éléments moteurs de la perte de couvert végétal et la superficie brûlée sont mis à jour. En 2025 et 2025, quelques ensembles de données d'entrée et constantes du modèle ont également été modifiés, comme décrit ci-dessous. Veuillez vous référer à cet article de blog pour de plus amples informations.\n\n- La source du rapport entre le carbone souterrain et le carbone aérien. Utilisait auparavant une constante globale ; utilise maintenant la carte de Huang et al. 2021\n- Les années de croissance du couvert végétal. Précédemment utilisé de 2000 à 2012 ; maintenant utilisé de 2000 à 2020 à partir de Potapov et al. 2022.\n- La source des données sur les incendies. Utilisait auparavant la zone brûlée du MODIS ; utilise maintenant la perte de couverture arborée due aux incendies de Tyukavina et al. 2022.\n- La source des cartes de tourbe. De nouveaux ensembles de données tropicales ont été inclus et l'ensemble de données au-dessus de 40 degrés nord a été modifié.\n- Constantes du potentiel de réchauffement mondial (PRM) pour le CH4 et le N2O. Les PRM utilisés précédemment étaient ceux du cinquième rapport d'évaluation du GIEC ; les PRM utilisés maintenant sont ceux du sixième rapport d'évaluation du GIEC.\n- Facteurs d'enlèvement pour les forêts tempérées secondaires plus anciennes (>20 ans) et leurs incertitudes associées. On utilisait précédemment les facteurs de suppression publiés dans le Tableau 4.9 de l'Actualisation 2019 des Lignes directrices 2006 du GIEC pour les inventaires nationaux de gaz à effet de serre ; on utilise maintenant les facteurs de suppression corrigés et les incertitudes provenant du 4e rectificatif à l'Actualisation 2019 des Lignes directrices 2006 du GIEC pour les inventaires nationaux de gaz à effet de serre.\n- Étendue des arbres plantés et facteurs de suppression. Elle utilisait auparavant la base de données spatiale des arbres plantés (SDPT) Version 1.0 ; elle utilise désormais la SDPT Version 2.0 et les facteurs de suppression associés.\n\nLe flux net peut être téléchargé dans deux unités de surface différentes pendant la durée du modèle : 1) mégagrammes d'émissions de CO2 par hectare et 2) mégagrammes d'émissions de CO2 par pixel. La première unité est utile pour visualiser (cartographier) le flux net, puisqu'elle représente la densité des flux de carbone par hectare. La deuxième est appropriée pour calculer le flux net dans une zone d'intérêt (ZDI) parce que les valeurs des pixels dans la ZDI peuvent être totalisées pour obtenir le flux de carbone total pour cette zone. Les valeurs de la deuxième ont été calculées en ajustant le flux net par hectare en fonction de la taille de chaque pixel, qui varie en fonction de la latitude. Lors de l'estimation du flux net sur un nombre défini d'années entre 2001 et 2025, divisez les valeurs par la durée du modèle et multipliez ensuite par le nombre d'années de la période d'intérêt. Les deux ensembles de données ne comprennent que les pixels situés dans les forêts, telles que définies dans les méthodes de Harris et al. (2021) et mises à jour avec le gain de couverture arborée jusqu'en 2020.",
  },
  citation: {
    label: 'Citation',
    value:
      'Harris et al. (2021). Global maps of 21st century forest carbon fluxes. Accessed on 14/02/2025 from Global Forest Watch.',
  },
};
