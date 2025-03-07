export const nl = {
  title: 'Hoogte boombedekking',
  subtitle: '2000/2020, 30 m, global, UMD/NASA GEDI',
  download_data: '',
  learn_more: 'https://glad.umd.edu/dataset/gedi/',
  content: [
    {
      label: 'Functie',
      value: 'Toon de hoogte van het wereldwijde bladerdak in de jaren 2000 en 2020.',
    },
    {
      label: 'Resolutie',
      value: '30 m boven NN',
    },
    {
      label: 'Geografische dekking',
      value: 'Wereldwijd, met prototypegegevens boven 52 ° N',
    },
    {
      label: 'Bron',
      value:
        'Potapov, P., Li, X., Hernandez-Serna, A., Tyukavina, A., Hansen, M.C., Kommareddy, A., Pickens, A., Turubanova, S., Tang, H., Silva, C.E. and Armston, J., 2021. Mapping global forest canopy height through integration of GEDI and Landsat data. Remote Sensing of Environment, 253, p.112165. https://doi.org/10.1016/j.rse.2020.112165',
    },
    {
      label: 'Frequentie',
      value: '',
    },
    {
      label: 'Datum van inhoud',
      value: '2000 en 2020',
    },
    {
      label: 'Waarschuwingen',
      value:
        'De wereldwijde boshoogtekaart is een prototypeproduct met bekende problemen met betrekking tot de kwaliteit van GEDI-gegevens en de beschikbaarheid van Landsat-gegevens. GEDI-gegevens overschatten de boshoogte op hellingen in gematigde en subtropische berggraslanden, bijvoorbeeld in Nieuw-Zeeland en Lesotho. De hoogte van de bomen boven steden en voorsteden kan worden verward met de hoogte van het gebouw, aangezien GEDI-gegevens geen onderscheid maken tussen de hoogte van de vegetatie en door de mens gemaakte objecten. De onzekerheden in de GEDI-kalibratie (met name geolocatieprecisie en schatting van de hoogte van het landoppervlak) kunnen verantwoordelijk zijn voor sommige van de kaartfouten. Het boomhoogtemodel is verzadigd boven de 30 m en geeft mogelijk niet adequaat de hoogte van de hoogste bomen weer. Het wereldwijde product zal in de toekomst worden bijgewerkt om de meeste problemen aan te pakken.',
    },
    {
      label: 'Licentie',
      value: '',
    },
  ],
  overview: {
    label: 'Overzicht',
    value:
      'Een nieuwe kaart met een ruimtelijke resolutie van 30 m voor de hoogte van het bladerdak van bossen werd ontwikkeld door de integratie van de Global Ecosystem Dynamics Investigation (GEDI) lidar-bosstructuurmetingen en Landsat-analyseklare gegevenstijdreeksen. De NASA GEDI is een lidar-instrument in de ruimte dat sinds april 2019 aan boord van het internationale ruimtestation ISS werkt. Het biedt puntgebaseerde metingen van de vegetatiestructuur, inclusief de hoogte van het bladerdak tussen 52°N en 52°S wereldwijd. Het Global Land Analysis and Discover-team van de Universiteit van Maryland (UMD GLAD) heeft de tot nu toe beschikbare GEDI-gegevens (april-oktober 2019) geïntegreerd met de Landsat analysis-ready tijdreeksgegevens van het jaar 2019 (Landsat ARD). De GEDI RH95 (relatieve hoogte op 95%) metriek werd gebruikt om het model te kalibreren. De multi-temporele metrieken van Landsat die de oppervlaktefenologie vertegenwoordigen, dienen als de onafhankelijke variabelen voor het modelleren van de wereldwijde boshoogte. Het lokaal gekalibreerde en toegepaste regressieboomensemblemodel "bewegend venster" werd geïmplementeerd om een hoge kwaliteit van de voorspelling van de boshoogte en de consistentie van de wereldwijde kaart te garanderen. Het model werd geëxtrapoleerd naar de boreale regio\'s (buiten het GEDI-gegevensbereik) om de prototypekaart van de wereldwijde boshoogte te maken.',
  },
  citation: {
    label: 'Aanhaling',
    value:
      'Potapov, P., Li, X., Hernandez-Serna, A., Tyukavina, A., Hansen, M.C., Kommareddy, A., Pickens, A., Turubanova, S., Tang, H., Silva, C.E. and Armston, J., 2021. Mapping global forest canopy height through integration of GEDI and Landsat data. Remote Sensing of Environment, 253, p.112165. https://doi.org/10.1016/j.rse.2020.112165. Accessed through Global Forest Watch on 14/02/2025. www.globalforestwatch.org.',
  },
};
