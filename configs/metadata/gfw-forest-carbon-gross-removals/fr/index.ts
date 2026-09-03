export const fr = {
  title: 'Absorptions de carbone forestier',
  subtitle: '30 m, global, 2001-2025, Harris et al. 2021',
  download_data: 'https://data.globalforestwatch.org/datasets/94871bf57f544ea39e594feb92b06305',
  learn_more: 'https://www.nature.com/articles/s41558-020-00976-6',
  content: [
    {
      label: 'Fonction',
      value: 'Affiche les absorptions de carbone des forêts par les puits forestiers',
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
        "- Les données sont le produit de la modélisation et comportent donc un degré inhérent d'erreur et d'incertitude. Les utilisateurs sont fortement encouragés à lire et à comprendre pleinement les métadonnées et autres documents disponibles avant d'utiliser les données.\n- Les valeurs s'appliquent aux zones forestières (couvert forestier >30 pour cent et >5 m de hauteur ou zones avec gain de couverture arborée). Consultez Harris et al. (2021) pour plus d'informations sur la définition de la forêt utilisée dans l'analyse.\n- Les absorptions de carbone reflètent les absorptions totales au cours de la période de modélisation 2001-2025, et non une série chronologique annuelle à partir de laquelle une tendance peut être dérivée. Les valeurs doivent donc être divisées par 23 pour calculer les absorptions annuelles moyennes.\n- L'incertitude est plus élevée pour les absorptions brutes que pour les émissions, notamment en raison de l'incertitude liée aux facteurs d'absorption.\n- Les absorptions de carbone reflètent une estimation brute, c’est-à-dire que les émissions de carbone dues à la perte antérieure ou ultérieure du couvert végétal ne sont pas incluses. Au lieu de cela, les émissions brutes de carbone sont comptabilisées dans la couche d’accompagnement des émissions de carbone forestier.\n- Les données relatives aux prélèvements présentent des incohérences temporelles car le gain de couverture arborée représente un total cumulé de 2000 à 2020, plutôt que des gains annuels tels qu'estimés jusqu'en 2025.\n- Les absorptions de carbone forestier reflètent celles qui se produisent uniquement dans les écosystèmes forestiers et ne tiennent pas compte de l'augmentation des stocks de carbone dans le bassin des produits ligneux récoltés (PLR).\n- Les grands sauts dans les absorptions le long de certaines frontières sont dus à l’utilisation de facteurs d’absorption spécifiques à l’écozone. Les changements dans les absorptions se produisent aux limites des écozones, où des facteurs d’absorption différents sont appliqués de part et d’autre.\n- Cet ensemble de données a été mis à jour depuis sa publication initiale. Voir l’aperçu pour plus d’informations.",
    },
    {
      label: 'Licence',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Aperçu',
    value:
      "Cette couche d'absorption du carbone fait partie du modèle de flux de carbone forestier présenté dans Harris et al. (2021). Ce document propose un cadre de surveillance géospatiale pour l'estimation des flux mondiaux de carbone forestier, qui peut aider divers acteurs et organisations à suivre les flux de gaz à effet de serre provenant des forêts et à réduire les émissions ou à augmenter les absorptions par les forêts. Les absorptions de carbone forestier de l'atmosphère (séquestration) par les puits forestiers représentent le carbone cumulé capturé (mégagrammes de CO2/ha) par la croissance des forêts établies et nouvellement repoussées au cours de la période de modélisation entre 2001 et 2025. Les prélèvements englobent l'accumulation de carbone dans la biomasse aérienne et souterraine des arbres vivants. Suite aux hypothèses de niveau 1 du GIEC pour les forêts restantes, les absorptions par le bois mort, la litière et les réservoirs de carbone du sol sont supposées être nulles. Dans chaque pixel, les absorptions de carbone sont calculées selon les lignes directrices du GIEC pour les inventaires nationaux de gaz à effet de serre où les forêts existaient en 2000 ou ont été créées entre 2000 et 2020 selon Potapov et al. 2022. Le carbone atmosphérique éliminé dans chaque pixel est basé sur des cartes du type de forêt (par exemple, mangrove, plantation), de l'écozone (par exemple, néotropiques humides), de l'âge de la forêt (par exemple, primaire, vieux secondaire) et du nombre d'années d'élimination du carbone. Cette couche reflète les absorptions cumulées pendant la période du modèle (2001-2025) et doit être divisée par 23 pour atteindre une moyenne annuelle pendant la durée du modèle ; les taux d'absorption ne peuvent pas être affectés à des années individuelles du modèle. Toutes les couches d'entrée ont été rééchantillonnées à une résolution commune de 0,00025 x 0,00025 degrés chacune pour correspondre à Hansen et al. (2013).\n\nChaque année, la perte de couvert végétal, les éléments moteurs de la perte de couvert végétal et la superficie brûlée sont mis à jour. En 2025 et 2025, quelques ensembles de données d'entrée et constantes du modèle ont également été modifiés, comme décrit ci-dessous. Veuillez vous référer à cet article de blog pour de plus amples informations.\n\n- La source du rapport entre le carbone de la biomasse souterraine et le carbone de la biomasse aérienne. Elle utilisait auparavant une constante globale ; elle utilise désormais la carte de Huang et al. 2021\n- Les années de croissance du couvert végétal. Précédemment utilisé de 2000 à 2012 ; maintenant utilisé de 2000 à 2020 à partir de Potapov et al. 2022.\n- La source des données sur les incendies. Utilisait auparavant la zone brûlée du MODIS ; utilise maintenant la perte de couverture arborée due aux incendies de Tyukavina et al. 2022.\n- La source des cartes de tourbe. De nouveaux ensembles de données tropicales ont été inclus et l'ensemble de données au-dessus de 40 degrés nord a été modifié.\n- Constantes du potentiel de réchauffement mondial (PRM) pour le CH4 et le N2O. Les PRM utilisés précédemment étaient ceux du cinquième rapport d'évaluation du GIEC ; les PRM utilisés maintenant sont ceux du sixième rapport d'évaluation du GIEC.\n -Facteurs d'enlèvement pour les forêts tempérées secondaires plus anciennes (>20 ans) et leurs incertitudes associées. On utilisait précédemment les facteurs de suppression publiés dans le Tableau 4.9 de l'Actualisation 2019 des Lignes directrices 2006 du GIEC pour les inventaires nationaux de gaz à effet de serre ; on utilise maintenant les facteurs de suppression corrigés et les incertitudes provenant du 4e rectificatif à l'Actualisation 2019 des Lignes directrices 2006 du GIEC pour les inventaires nationaux de gaz à effet de serre.\n- Étendue des arbres plantés et facteurs de suppression. Elle utilisait auparavant la base de données spatiale des arbres plantés (SDPT) Version 1.0 ; elle utilise désormais la SDPT Version 2.0 et les facteurs de suppression associés.\n\nLes suppressions peuvent être téléchargées dans deux unités de surface différentes pendant la durée du modèle : 1) mégagrammes de CO2 éliminés par hectare et 2) mégagrammes de CO2 éliminés par pixel. La première unité est appropriée pour représenter (cartographier) les absorptions, parce qu'elle représente la densité des absorptions par hectare. La deuxième est appropriée pour calculer les absorptions dans une zone d'intérêt (ZDI) parce que les valeurs des pixels dans la ZDI peuvent être totalisées pour obtenir les absorptions totales pour cette zone. Les valeurs de cette dernière ont été calculées en ajustant les absorptions par hectare selon la taille de chaque pixel, qui varie en fonction de la latitude. Lorsque vous estimez les absorptions sur un nombre défini d'années entre 2001 et 2025 pour les comparer aux émissions, divisez les absorptions totales de carbone par la durée du modèle, puis multipliez par le nombre d'années de la période concernée. Les deux ensembles de données n'incluent que les pixels situés dans les forêts, telles que définies dans les méthodes de Harris et al. (2021) et mises à jour avec l'augmentation du couvert végétal jusqu'en 2020.",
  },
  citation: {
    label: 'Citation',
    value:
      'Harris et al. (2021). Global maps of 21st century forest carbon fluxes. Accessed on 14/02/2025 from Global Forest Watch.',
  },
};
