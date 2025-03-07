export const fr = {
  title: 'Incendies actifs VIIRS',
  subtitle: '(quotidien, 375 m, global, NASA)',
  download_data: 'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/active-fire-data',
  learn_more: 'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/viirs-i-band-active-fire-data',
  content: [
    {
      label: 'Fonction',
      value: "Affiche les données d'alerte incendie pour les dernières 24 heures, 48 heures, 72 heures ou 7 jours",
    },
    {
      label: 'Résolution',
      value: '375 × 375 mètres',
    },
    {
      label: 'Couverture géographique',
      value: 'Global',
    },
    {
      label: 'Source',
      value: 'NASA',
    },
    {
      label: 'Fréquence des mises à jour',
      value: 'Deux fois par jour',
    },
    {
      label: 'Date du contenu',
      value: 'Temps quasi-réel',
    },
    {
      label: 'Mises en garde',
      value:
        "Tous les feux ne sont pas détectés. Il existe plusieurs raisons pour lesquelles VIIRS peut ne pas avoir détecté un feu en particulier. Le feu peut avoir démarré et s'être terminé entre les passages des satellites. Le feu était peut-être trop petit ou pas assez chaud pour être détecté dans le pixel de 375 mètres. Une couverture nuageuse, une fumée épaisse et la canopée des arbres peuvent complètement masquer un feu.",
    },
    {
      label: 'Licence',
      value:
        "Nous reconnaissons l'utilisation de données et de l'imagerie de LANCE FIRMS, opérée par le Système d'informations et de données de sciences de la Terre NASA/GSFC (ESDIS), avec financement fourni par le quartier général de la NASA.",
    },
  ],
  overview: {
    label: 'Aperçu',
    value:
      "Les données VIIRS sur les feux de forêt actifs (VNP14IMGT) sont le dernier produit de suivi des feux de forêt de FIRMS (Fire Information for Resource Management System), qui identifie les lieux des feux de forêt dans le monde en temps quasi-réel. Les informations sont recueillies par le capteur VIIRS (Visible Infrared Imaging Radiometer Suite) et traitées par un algorithme de détection des feux de forêts pour signaler les feux actifs. Chaque point sur la carte représente le centre d'un pixel de 375 mètres qui a été marqué par l'algorithme.",
  },
  citation: {
    label: 'Citation',
    value:
      'NASA FIRMS. “VIIRS Active Fires.” Accessed through Global Forest Watch on 30/01/2025. www.globalforestwatch.org',
  },
};
