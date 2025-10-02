export const fr = {
  title: 'Alertes de déforestation GLAD-Landsat (GLAD-L)',
  subtitle: '(hebdomadaire, 30m, tropiques, UMD/GLAD)',
  download_data: 'http://glad-forest-alert.appspot.com/',
  content: [
    {
      label: 'Fonction',
      value: 'Identifie les zones de perte probable de la couverture arborée en temps quasi réel',
    },
    {
      label: 'Résolution',
      value: '30 × 30 mètres',
    },
    {
      label: 'Couverture géographique',
      value: '30 degrés nord à 30 degrés sud',
    },
    {
      label: 'Source',
      value:
        'Hansen, MC, A. Krylov, A. Tyukavina, P.V. Potapov, S. Turubanova, B. Zutta, S. Ifo, B. Margono, F. Stolle et R. Moore. 2016. Alertes de perturbation des forêts tropicales humides utilisant les données Landsat. Lettres de recherche environnementale, 11 (3)',
    },
    {
      label: 'Fréquence des mises à jour',
      value: 'Mis à jour chaque semaine',
    },
    {
      label: 'Date du contenu',
      value:
        "1er janvier 2021 (les alertes GLAD-L fonctionnent depuis 2015 pour certains pays des bassins de l'Amazonie et du Congo et de l'Asie du Sud-Est insulaire, mais les données historiques ne sont pas disponibles sur GFW)",
    },
    {
      label: 'Mises en garde',
      value:
        "Bien qu’appelées « alertes de déforestation », ces alertes détectent des perturbations dans la forêt ou le couvert arboré. Ce produit ne fait pas de distinction entre les perturbations d'origine humaine et les autres types de perturbations. Lorsque des alertes sont détectées dans des forêts de plantation (ce qui est plus probable dans le système GLAD-L), les alertes peuvent indiquer des opérations de récolte de bois, sans conversion vers une utilisation des terres non forestière. \n\nLe terme « déforestation » est utilisé parce qu’il s’agit d’événements de déforestation potentiels, et les alertes pourraient faire l’objet d’une enquête plus approfondie pour le déterminer. \n\nNous ne recommandons pas d'utiliser les alertes de déforestation pour l'évaluation des tendances mondiales ou régionales, ni pour les estimations de superficie. Nous recommandons d'utiliser les données annuelles sur la perte de la couverture forestière pour une comparaison plus précise des tendances de l'évolution des forêts au fil du temps et pour des estimations de superficie. Les alertes récentes incluront des faux positifs qui n’ont pas encore augmenté leur niveau de confiance et pourraient éventuellement être supprimés. Les alertes passées peuvent avoir été supprimées par erreur de la base de données si la fermeture rapide du couvert forestier précède les observations satellite supplémentaires non masquées dans un délai de 6 mois. De plus, les mises à jour des méthodologies, le nombre différent de systèmes (dans le cas des alertes intégrées) et la variation de la couverture nuageuse entre les mois et les années posent des risques supplémentaires liés à l'utilisation des alertes de déforestation à des fins de comparaison inter/intra-annuelle. \n\nLes alertes peuvent être « organisées » pour identifier les alertes qui intéressent un utilisateur, telles que les alertes susceptibles de concerner la déforestation et qui pourraient être prioritaires pour une action. Un utilisateur peut le faire en superposant d'autres ensembles de données contextuelles, tels que des zones protégées ou des arbres plantés. Les données non conservées sont fournies ici afin que les utilisateurs puissent définir leurs propres approches de priorisation. Les emplacements d'alerte sélectionnés sont fournis dans la couche de données Places to Watch. \n\nAlors que les satellites Landsat 8 et 9 (anciennement Landsat 7 et 8) ont ensemble une période de revisite de 8 jours, la couverture nuageuse peut limiter la disponibilité des images, en particulier pendant la saison des pluies. Les dates d’alerte représentent le cas de détection, bien que la perte de la couverture arborée aurait pu avoir lieu plus tôt, voire des semaines plus tôt, en raison de la couverture nuageuse persistante. Notez que les alertes GLAD-L provenaient auparavant des images Landsat 7 qui présentaient un problème de ligne de balayage connu qui entraînait parfois des alertes faussement positives, jusqu'en avril 2023, date à laquelle l'entrée a été basculée vers Landsat 9. \n\n\nDans cet ensemble de données, le « couvert arboré » est défini comme toute végétation de plus de 5 mètres de hauteur avec un couvert forestier supérieur à 60 %, et peut prendre la forme de forêts naturelles ou de plantations. La « perte de couverture forestière » indique la suppression de la canopée d'au moins un demi-pixel et peut être due à divers facteurs, notamment la récolte mécanique, les incendies, les maladies ou les dégâts causés par les tempêtes. En tant que telle, la « perte » n’équivaut pas à la déforestation. \n\nAu Pérou, où le système d'alerte a été développé pour la première fois, les auteurs ont évalué les données à 13,5 % de faux positifs (perte détectée là où aucun ne s'est produit), bien que la majorité de ces faux positifs (9,5 %) se produisent en bordure des clairières. Sur les bords, les pixels Landsat de 30 m affichent un mélange de forêts et d'autres couvertures terrestres, ce qui les rend sujets aux erreurs du système. Le taux de faux positifs chute à 1 % si l’on considère uniquement les alertes de confiance élevée. Les données comportent 33 % de faux négatifs (pertes non détectées là où elles se sont produites), bien que la plupart d’entre elles se produisent dans des forêts secondaires, probablement parce que l’algorithme a été créé pour capturer la perte de forêts primaires. Le taux plus élevé de faux négatifs par rapport aux faux positifs indique également que les alertes constituent une estimation prudente de la perte de couverture arborée qui se produit réellement. \n\nLe niveau de confiance peut changer rétroactivement à mesure que les données sources sont mises à jour ; les alertes qui ne sont pas devenues hautement fiables dans les 180 jours ou après la suppression de 4 observations de l'ensemble de données \n\nUne fois qu’un pixel d’alerte atteint un niveau de confiance élevé, la perte de forêt ne sera plus détectée à cet endroit. \n\nLors d'un zoom arrière, cette couche de données affiche un certain degré d'inexactitude car les points de données doivent être réduits pour être visibles à plus grande échelle. Zoomez pour plus de détails.",
    },
    {
      label: 'Licence',
      value: 'CC PAR 4.0',
    },
  ],
  overview: {
    label: 'Aperçu',
    value:
      "Cet ensemble de données, créé par le laboratoire GLAD (Global Land Analysis & Discovery) de l'Université du Maryland et soutenu par Global Forest Watch, est le premier système d'alerte basé sur Landsat pour la perte de la couverture arborée. Alors que la plupart des produits d'alerte de perte existants utilisent des images MODIS d'une résolution de 250 mètres, ces alertes ont une résolution de 30 mètres et peuvent donc détecter les pertes à une échelle spatiale beaucoup plus fine. Ces alertes ont une résolution de 30 mètres et sont opérationnelles pour les zones terrestres situées entre 30 degrés nord et sud. \n\nLes nouvelles images Landsat 8 et 9 sont téléchargées au fur et à mesure de leur mise en ligne, évaluées en termes de couverture nuageuse ou de mauvaise qualité des données, et comparées aux trois années précédentes de mesures dérivées de Landsat (y compris les classements, les moyennes et les régressions des bandes rouge, infrarouge et ondes courtes, ainsi que les classements NDVI, NBR et NDWI). Les mesures et la dernière image Landsat sont analysées à travers sept arbres de décision pour calculer une probabilité médiane de perturbation de la forêt. Les pixels avec une probabilité >50 % sont signalés comme alertes de perte de couverture arborée. L'ensemble du processus est exécuté dans Google Earth Engine pour garantir des mises à jour et une évolutivité fiables. Pour plus d’informations sur la méthodologie, voir l’article dans Environmental Research Letters. \n\nLes alertes ne sont pas classées comme étant de niveau de confiance élevé tant que deux observations consécutives ou plus sur quatre ne sont pas étiquetées comme une perte de couverture arborée. Les alertes sont supprimées de l'ensemble de données après quatre observations consécutives ou plus de 180 jours si elles ne sont pas classées comme étant de niveau de confiance élevé. Vous pouvez choisir d'afficher uniquement les alertes à niveau de confiance élevé dans le menu, mais gardez à l'esprit que l'utilisation uniquement d'alertes à niveau de confiance élevé ne permet pas de détecter les détections les plus récentes de perte de couverture arborée.",
  },
  citation: {
    label: 'Citation',
    value:
      'Utilisez le crédit suivant lorsque ces données sont affichées : \n\nSource : GLAD/UMD, consulté via Global Forest Watch \n\nUtilisez le crédit suivant lorsque ces données sont citées : \n\nHansen, MC, A. Krylov, A. Tyukavina, P.V. Potapov, S. Turubanova, B. Zutta, S. Ifo, B. Margono, F. Stolle et R. Moore. 2016. Alertes de perturbation des forêts tropicales humides utilisant les données Landsat. Lettres de recherche environnementale, 11 (3). Consulté via Global Forest Watch le [date]. www.globalforestwatch.org',
  },
};
