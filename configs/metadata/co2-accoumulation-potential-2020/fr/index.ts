export const fr = {
  title: "Potentiel d'accumulation du carbone issu de la repousse des forêts naturelles dans les zones reboisables",
  subtitle: 'reforestable areas, 1 km, Cook-Patton et al. 2020',
  download_data: '',
  learn_more: '',
  content: [
    {
      label: 'Fonction',
      value:
        'Estime le taux auquel le carbone pourrait être séquestré dans la biomasse vivante aérienne au cours des trente premières années de repousse de la forêt naturelle dans les zones potentiellement reboisables (mg de carbone/ha/an).',
    },
    {
      label: 'Résolution',
      value: '1 × 1 km',
    },
    {
      label: 'Couverture géographique',
      value:
        'Mondial, dans la superficie de reboisement de Griscom et al. 2017 (qui exclut la forêt boréale, les biomes herbeux et les terres cultivées)',
    },
    {
      label: 'Source',
      value:
        'Cook-Patton, S.C., S.M. Leavitt, D. Gibbs, N.L. Harris, K. Lister, K.J. Anderson-Teixeira, R.D. Briggs, R.L. Chazdon, T.W. Crowther, P.W. Ellis, H.P. Griscom, V. Herrmann, K.D. Holl, R.A. Houghton, C. Larrosa, G. Lomax, R. Lucas, P. Madsen, Y. Malhi, A. Paquette, J.D. Parker, K. Paul, D. Routh, S. Roxburgh, S. Saatchi, J.van den Hoogen, W.S. Walker, C.E. Wheeler, S.A. Wood, L. Xu, B.W. Griscom. 2020. Mapping carbon accumulation potential from natural forest regrowth. Nature, in press. https://www.nature.com/articles/s41586-020-2686-x. This work resulted from a collaboration between The Nature Conservancy, World Resources Institute, and 18 other institutions.',
    },
    {
      label: 'Fréquence des mises à jour',
      value: '',
    },
    {
      label: 'Date du contenu',
      value: 'Applicable aux 30 premières années de repousse de la forêt naturelle.',
    },
    {
      label: 'Mises en garde',
      value:
        "- Les valeurs représentent les meilleures estimations mais contiennent des incertitudes. La précision des résultats dépend de la disponibilité des données pour entraîner le modèle, qui sont concentrées dans dix pays. La carte d'incertitude associée à cette couche de données peut être téléchargée depuis l'Open Data Portal de GFW.\n- Les taux d'accumulation de carbone sont applicables à la repousse de la forêt naturelle uniquement, et ne s'appliquent pas aux autres méthodes de restauration active (agroforesterie, plantations, etc.).\n- Les taux d'accumulation de carbone sont linéaires et calculés en moyenne sur les 30 premières années de repousse. Au-delà de 30 ans, la séquestration sera surestimée.\n- Les taux reflètent l'accumulation de carbone dans la biomasse vivante aérienne uniquement. L'accumulation dans la biomasse souterraine, la matière organique morte et le carbone organique du sol n'est pas incluse, mais une carte de l'accumulation du carbone souterrain est disponible sur demande.\n- Dans les savanes, les taux ne s'appliquent qu'aux parties boisées de ces matrices prairie-forêt.\n- Ces données ne remplacent pas les évaluations détaillées du potentiel de repousse des forêts au niveau des sites.",
    },
    {
      label: 'Licence',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Aperçu',
    value:
      "Cette carte affiche le taux auquel les forêts pourraient capter le carbone de l'atmosphère et le stocker dans la biomasse vivante aérienne au cours des 30 premières années de repousse de la forêt naturelle. Elle a été créée en combinant des mesures au sol à des milliers d'endroits dans le monde avec 66 couches de covariables environnementales co-localisées dans un modèle conçu par l'apprentissage automatique pour produire une carte mur à mur. Les données sur les parcelles forestières utilisées pour entraîner le modèle proviennent des publications de recherche, que l'on peut trouver dans la base de données Forest Carbon (ForC, maintenue par le Smithsonian Institute (https://github.com/forc-db)), ainsi que des données géo-référencées provenant des inventaires forestiers nationaux accessibles au public. Bien que les taux aient été estimés sur l'ensemble des biomes forestiers et de savane à l'échelle mondiale, ils sont filtrés ici par les zones « reboisables », telles que définies dans Griscom et al. 2017 (PNAS). Les zones reboisables excluent les zones de prairies et de cultures indigènes afin de préserver la production d'aliments et de fibres ainsi que l'habitat de la biodiversité.",
  },
  citation: {
    label: 'Citation',
    value:
      'Cook-Patton et al. 2020. Carbon accumulation potential from natural forest regrowth in potentially reforestable areas. Accessed through Global Forest Watch 14/02/2025. www.globalforestwatch.org',
  },
};
