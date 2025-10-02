export const fr = {
  title: 'Alertes intégrées sur la déforestation',
  subtitle: 'quotidien, 10 m, tropiques, UMD/GLAD et WUR',
  download_data:
    "Surveillez les perturbations forestières en temps quasi réel en utilisant des alertes intégrées provenant de trois systèmes d'alerte.",
  content: [
    {
      label: 'Fonction',
      value: 'https://data.globalforestwatch.org/datasets/gfw::integrated-deforestation-alerts/about',
    },
    {
      label: 'Résolution',
      value: '10 × 10 m',
    },
    {
      label: 'Couverture géographique',
      value: '30°N to 30°S',
    },
    {
      label: 'Source',
      value:
        'GLAD Alerts:\nHansen, M.C., A. Krylov, A. Tyukavina, P.V. Potapov, S. Turubanova, B. Zutta, S. Ifo, B. Margono, F. Stolle, and R. Moore. 2016. Humid tropical forest disturbance alerts using Landsat data. Environmental Research Letters, 11 (3). (https://dx.doi.org/10.1088/1748-9326/11/3/034008)[https://dx.doi.org/10.1088/1748-9326/11/3/034008]',
    },
    {
      label: 'Fréquence des mises à jour',
      value: 'Quotidien',
    },
    {
      label: 'Date du contenu',
      value: "1er janvier 2019 - aujourd'hui",
    },
    {
      label: 'Mises en garde',
      value:
        "Bien qu'elles soient appelées « alertes de déforestation », ces alertes signalent des perturbations du couvert forestier ou du couvert arboré. Aucune distinction n'est faite entre les perturbations causées par l'homme et les autres types de perturbations. Lorsque des alertes sont détectées dans des plantations forestières (ce qui est le plus susceptible de se produire dans le système GLAD-L), les alertes peuvent signaler des activités d'exploitation forestière, sans conversion à une utilisation non forestière des terres. \nLe terme déforestation est employé parce que ce sont de potentiels événements de déforestation. Un examen approfondi des alertes pourrait le déterminer. \nNous ne recommandons pas d'utiliser les alertes à la déforestation pour l'évaluation des tendances mondiales ou régionales, ni pour les estimations de superficie. Nous vous recommandons d'utiliser les données annuelles sur la perte de couvert végétal pour effectuer une comparaison plus précise des tendances de l'évolution des forêts au fil du temps, ainsi que pour les estimations de superficies. Les alertes récentes comprennent des faux positifs dont le niveau de confiance n'a pas encore été augmenté et qui peuvent éventuellement être supprimés. Les alertes antérieures peuvent avoir été supprimées par erreur de la base de données si la fermeture rapide de la canopée précède les observations satellitaires supplémentaires non obscurcies dans les six mois. En outre, les mises à jour des méthodologies, le nombre différent de systèmes (dans le cas des alertes intégrées) et la variation de la couverture nuageuse entre les mois et les années constituent des risques supplémentaires pour l'utilisation des alertes à la déforestation à des fins de comparaison inter/intra-annuelle.\nLes alertes peuvent être « classées » afin d'identifier celles qui intéressent l'utilisateur, par exemple celles qui sont susceptibles d'être liées à la déforestation et qui pourraient faire l'objet d'une action prioritaire. Pour ce faire, l'utilisateur peut superposer d'autres ensembles de données contextuelles, tels que les zones protégées ou les arbres plantés. Les données non classées sont fournies ici afin que les utilisateurs puissent définir leurs propres approches de hiérarchisation.\nLes trois systèmes d'alerte ont des définitions différentes de la forêt/du couvert arboré et des perturbations de la forêt/du couvert arboré : \n\n\nGLAD-L : les alertes se trouvent dans le « couvert arboré », qui désigne toute végétation supérieure à cinq mètres de haut ayant plus de 60 % de couvert forestier et pouvant prendre la forme de forêts naturelles ou de plantations. La « perte de couvert arboré » indique la suppression d'au moins un demi-pixel de couvert forestier et peut être due à une multitude de facteurs, tels que des récoltes mécaniques, des incendies, des maladies ou des dégâts causés par des tempêtes. De ce fait, une « perte » ne signifie pas forcément une déforestation. \nGLAD-S2 : les alertes se trouvent dans le masque de forêt primaire de Turubanova et al (2018) dans le bassin amazonien, avec les pertes forestières de 2001 à aujourd'hui de Hansen et al. (2013) retirées. \nRADD : Les alertes se trouvent dans des forêts primaires humides. La perte de forêt est définie comme la disparition totale ou partielle du couvert arboré à l'intérieur d'un pixel, et une unité de cartographie minimale de 0,5 ha est utilisée. \nLes systèmes d'alerte d'entrée n'ont pas la même couverture spatiale et temporelle :\nGLAD-L : fonctionne dans toute la région intertropicale (de 30° N à 30° S) depuis le 1er janvier 2018 jusqu'à aujourd'hui et depuis 2015 jusqu'à aujourd'hui (bien qu'interrompu pendant une période en 2022) pour les pays sélectionnés en Amazonie, dans le bassin du Congo et dans l'Asie du Sud-Est insulaire \nGLAD-S2 : fonctionne dans les zones de forêts tropicales humides primaires d'Amérique du Sud depuis janvier 2019 jusqu'à aujourd'hui \nRADD : Exploitation dans les zones de forêts tropicales humides primaires d'Amérique du Sud, d'Afrique subsaharienne et d'Asie du Sud-Est insulaire avec une couverture de janvier 2019 à aujourd'hui pour l'Afrique et de janvier 2020 à aujourd'hui pour l'Amérique du Sud et l'Asie du Sud-Est, l'Amérique centrale étant couverte à partir de janvier 2023 (l'extension à l'Asie du Sud-Est continentale et au Pacifique est prévue d'ici la fin 2023). \n\nAfin d'intégrer les trois systèmes d'alerte sur une grille commune, GLAD-L est rééchantillonné d'une résolution spatiale de 30 m à 10 m pour correspondre à GLAD-S2 et RADD. Par conséquent, un pixel GLAD-L de 30 m deviendra plusieurs pixels de 10 m dans la couche intégrée. Les utilisateurs doivent faire preuve de prudence lorsqu'ils comparent les résultats d'analyse de systèmes individuels à la couche d'alerte intégrée, car le nombre d'alertes intégrées sera beaucoup plus élevé que le nombre d'alertes originales de GLAD-L. En outre, les pixels de la couche intégrée sont plus petits que ceux de la couche intégrée. En outre, les pixels de la couche intégrée peuvent ne pas être exactement alignés sur la carte avec les pixels de la couche GLAD-L individuelle en raison de ce rééchantillonnage. \nChaque pixel de la couche intégrée conserve la date de détection par un système d'alerte la plus récente, même si plusieurs systèmes ont rapporté une alerte sur ce pixel. Dans certaines situations, cela peut conduire à des incohérences dans les visualisations lorsque l'on passe de la couche intégrée aux couches individuelles des systèmes d'alerte. Il est conseillé d'utiliser la couche intégrée lorsque vous vous intéressez à la date de détection par un système d'alerte la plus récente. Cependant, il vaut mieux utiliser les couches individuelles des systèmes d'alerte si vous vous intéressez à un type d'alerte en particulier. \nLe niveau « Confiance maximale : détecté par plusieurs systèmes d'alerte » ne peut être atteint que dans les zones et pour les périodes où plus d'un système d'alerte était en service pour cette région. \nLe niveau de confiance peut changer rétroactivement au fur et à mesure que les données sources sont mises à jour ; les alertes qui n'ont pas atteint le niveau de confiance élevé dans les 180 jours sont supprimées de l'ensemble de données.\nUne fois qu'un pixel d'alerte atteint un niveau de confiance élevé, la perte de forêt ne sera plus détectée par le même système d'alerte à cet endroit.\nLa précision varie à travers la couverture des alertes intégrées à cause des caractéristiques différentes des trois systèmes d'alerte. Les alertes Radar (RADD) par exemple, peuvent faire davantage de détections erronées dans les forêts marécageuses à cause de la haute sensibilité des radars en bande C à courtes longueurs d'onde aux variations d'humidité\nLorsqu'elle est rétrécie, cette couche de données affiche un certain degré d'imprécision, car les points de données doivent être agrandis pour être visibles à plus grande échelle. Agrandissez la couche pour voir plus de détails.",
    },
    {
      label: 'Licence',
      value: 'CC by 4.0',
    },
  ],
  overview: {
    label: 'Aperçu',
    value:
      "Cet ensemble de données, assemblé par Global Forest Watch, rassemble des alertes de déforestation de trois systèmes d'alerte (GLAD-L, GLAD-S2, RADD) dans une seule et même couche d'alerte de déforestation intégrée. Cette intégration permet aux utilisateurs de détecter des événements de déforestation plus rapidement que n'importe quel système l'aurait fait seul, car la couche intégrée est mise à jour dès que l'un des systèmes d'alerte source est mis à jour.",
  },
  citation: {
    label: 'Citation',
    value: 'Source: "Integrated Deforestation Alerts". UMD/GLAD and WUR, accessed through Global Forest Watch',
  },
};
