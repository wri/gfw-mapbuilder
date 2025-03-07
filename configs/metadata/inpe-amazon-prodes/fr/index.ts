export const fr = {
  title: 'PRODES (Amazon légal)',
  subtitle: 'annuel, 6,25ha, Amazonie Légale, INPE',
  content: [
    {
      label: 'Fonction',
      value:
        "Système de surveillance de la déforestation pour l'Amazonie légale brésilienne, utilisé par le gouvernement brésilien pour établir une politique publique",
    },
    {
      label: 'Résolution',
      value: '6,25ha',
    },
    {
      label: 'Couverture géographique',
      value: 'Amazon légal brésilien',
    },
    {
      label: 'Source',
      value: 'INPE',
    },
    {
      label: 'Fréquence des mises à jour',
      value: 'Annuellement',
    },
    {
      label: 'Date du contenu',
      value: '2008-2021',
    },
    {
      label: 'Mises en garde',
      value:
        "PRODES identifie uniquement les clairières forestières de 6,25 hectares ou plus, de sorte que la dégradation des forêts ou les clairières plus petites dues au feu ou à l'exploitation forestière sélective ne sont pas détectées. Une couverture nuageuse fréquente sur certaines zones de couverture peut modifier l'année de déforestation signalée. L’année rapportée est la première année où la déforestation est identifiée par les analystes, mais cela ne correspond pas nécessairement à l’année de la déforestation si le paysage a été couvert de nuages ​​les années précédentes.",
    },
    {
      label: 'Licence',
      value: 'Creative Commons PAR SA 3.0',
    },
  ],
  overview: {
    label: 'Aperçu',
    value:
      "Le projet PRODES surveille la déforestation dans les biomes brésiliens de l'Amazonie et du Cerrado et produit des taux de déforestation annuels pour la région depuis 1988. Le gouvernement brésilien utilise ces chiffres pour établir des politiques publiques, notamment en définissant l'accès au crédit dans le biome amazonien, en établissant des objectifs de réduction de la déforestation et en sollicitant des fonds pour réduire la déforestation. PRODES utilisait historiquement les images Landsat 5, mais intègre désormais également les images de Landsat 7 et 8, CBERS-2, CBERS-2B, Resourcesat-1 et UK2-DMC. PRODES est géré par l'Institut national de recherche spatiale (INPE) en collaboration avec le ministère de l'Environnement (MMA) et l'Institut brésilien de l'environnement et des ressources naturelles renouvelables (IBAMA). Depuis 2002, toutes les données du PRODES sont accessibles au public en ligne. Les images d'entrée pour chacune des 220 empreintes Landsat qui couvrent l'Amazonie brésilienne et le Cerrado sont sélectionnées en fonction de leur manque de couverture nuageuse et de leur date de capture. Le système PRODES utilise l'année saisonnière, commençant le 1er août, pour calculer la déforestation annuelle, les images sont donc sélectionnées le plus près possible de cette date (généralement juillet, août et septembre). De 2003 à 2005, les analystes ont utilisé la transformation d'images pour déterminer les composantes de la végétation, du sol et de l'ombre à l'aide du programme SPRING. Ces composants ont été segmentés et classés en classes forestières, non forestières, déforestation au cours de l'année cible, déforestation précédente, nuages ​​et eau, qui sont ensuite corrigées manuellement par des experts. À partir de 2005, une nouvelle méthodologie a été mise en œuvre qui utilise la plateforme open source TerraAmazon. La plateforme permet à l'analyse PRODES d'être plus uniforme et peut intégrer des images provenant d'une variété de satellites. Comme auparavant, les images sont sélectionnées pour être aussi exemptes de nuages ​​que possible. Les images sont ensuite masquées pour exclure les éléments non forestiers, la déforestation antérieure et l'eau en utilisant l'analyse de l'année précédente. Les analystes délimitent ensuite des polygones déboisés dans la forêt intacte de l'année précédente. Cet ensemble de données montre la déforestation annuelle entre 2008 et 2020 dans l'Amazonie légale du Brésil.",
  },
  citation: {
    label: 'Citation',
    value:
      "Institut National de Recherche Spatiale (INPE). 'PRODES déforestation.' Consulté via Global Forest Watch le [date]. www.globalforestwatch.org",
  },
};
