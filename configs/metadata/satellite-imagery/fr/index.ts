export const fr = {
  title: 'Landsat-8 / Sentinel-2 Satellite Imagery',
  content: [
    {
      label: 'Fonction',
      value:
        'L’imagerie satellitaire à haute résolution est essentielle pour fournir un contexte aux autres couches de données disponibles sur GFW, notamment pour interpréter les facteurs de changement du couvert végétal. Elle est couramment utilisée pour identifier les causes possibles des alertes à la déforestation en temps quasi réel. L’imagerie peut également être utilisée dans les protocoles de validation, afin d’évaluer la précision de la couverture terrestre/forestière et de modifier les produits.',
    },
    {
      label: 'Résolution',
      value: 'Sentinal-2: 10 x 10 meters, Landsat 8: 30 x 30 meters',
    },
    {
      label: 'Couverture géographique',
      value: 'Global',
    },
    {
      label: 'Source',
      value:
        'Copernicus Sentinel-2. Retrieved from Google Earth Engine. Data processed by the European Space Agency (ESA).',
    },
    {
      label: 'Fréquence des mises à jour',
      value:
        'De nouvelles images sont disponibles quotidiennement. Temps de ré-observation des images : Sentinel-2A : tous les 10 jours, Landsat 8 : tous les 16 jours',
    },
    {
      label: 'Date du contenu',
      value: 'Janvier 2012 – prés.',
    },
  ],
  overview: {
    label: 'Aperçu',
    value:
      'Ces données montrent les dernières images satellites qui répondent aux critères de couverture nuageuse sélectionnés, provenant des systèmes Sentinel-2 et Landsat 8. Sentinel-2, exploité par l’Agence spatiale européenne, offre une couverture mondiale, avec une résolution de 10 mètres, et peut obtenir des images mises à jour tous les 10 jours. Landsat 8, exploité par l’U.S. Geological Survey, est aussi un satellite mondial qui peut obtenir des images actualisées tous les 16 jours, avec une résolution de 30 mètres. Les deux satellites délivrent des images représentant la couleur naturelle et la santé de la végétation. Les images en couleurs naturelles utilisent les informations de la lumière visible (rouge, vert et bleu) pour montrer la surface de la Terre telle qu’elle peut apparaître à l’œil humain. L’état de la végétation est détecté à l’aide de l’indice de végétation par différence normalisée (NDVI), lequel intègre des informations sur la réflectance dans le rouge et le proche infrarouge. Cette méthode repose sur le fait qu’une végétation saine absorbe la majeure partie de la lumière visible et réfléchit la plupart de la lumière proche infrarouge qui frappe sa surface. Lors de l’interprétation d’images montrant la santé de la végétation, le rouge indique une végétation en pleine croissance, le vert, un sol nu, et le noir, des étendues d’eau.',
  },
};
