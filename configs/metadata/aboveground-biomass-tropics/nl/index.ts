export const nl = {
  title: 'Dichtheid van tropische bovengrondse levende houtachtige biomassa',
  subtitle: 'Tropen, Zarin/WHR',
  download_data: 'http://data.globalforestwatch.org/datasets/8f93a6f94a414f9588ce4657a39c59ff_1',
  content: [
    {
      label: 'Functie',
      value: 'Toont de koolstofdichtheidswaarden van bovengrondse levende houtachtige biomassa',
    },
    {
      label: 'Resolutie',
      value: '30 m',
    },
    {
      label: 'Geografische dekking',
      value: 'Tropen (30 graden N, 20 graden Z)',
    },
    {
      label: 'Bron',
      value: 'ICEsat GLAS lidar, MODIS, Landsat, grondmetingen',
    },
    {
      label: 'Datum van inhoud',
      value: 2000,
    },
    {
      label: 'Waarschuwingen',
      value:
        'Het wordt aanbevolen om zowel de bovengrondse koolstofdichtheid als de onzekerheidswaarden samen te gebruiken voor koolstofbeoordelingen en -verificatie. De kaart zal nauwkeurige schattingen opleveren van de bovengrondse koolstofvoorraden en de bovengrondse koolstofdichtheid wanneer deze wordt samengevoegd tot grote gebieden (5.000 tot 10.000 ha) voor beoordelingen op project- en regionaal niveau. De biomassadichtheidswaarde van een enkele pixel kan een grote onzekerheid hebben in vergelijking met kleine grafieken voor verificatie.',
    },
    {
      label: 'Licentie',
      value: 'Creative Commons CC BY 4.0',
    },
  ],
  overview: {
    label: 'Overzicht',
    value:
      'Dit is een dataproduct met een hogere resolutie dat voortbouwt op de methodologie gepresenteerd in Baccini et al. (2012) om een ​​pantropische kaart te genereren van bovengrondse levende houtachtige biomassadichtheid met een resolutie van 30 m voor circa het jaar 2000. Naast de waarden voor de koolstofdichtheid is er een foutenkaart met dezelfde ruimtelijke resolutie die de onzekerheid in de schatting van de bovengrondse koolstofdichtheid weergeeft. Deze kaarten maken de co-locatie van biomassaschattingen mogelijk met Hansen et al. (2013, v1.0) schattingen van verlies aan boombedekking bij een vergelijkbare ruimtelijke resolutie. De statistische relatie die is afgeleid tussen metingen op de grond van de dichtheid van bosbiomassa en co-located Geoscience Laser Altimeter System (GLAS) LiDAR-golfvormstatistieken, zoals beschreven door Baccini et al. (2012) werden gebruikt om de biomassadichtheid van meer dan 40.000 GLAS-voetafdrukken in de tropen te schatten. Vervolgens werden met behulp van randomForest-modellen de van GLAS afgeleide schattingen van de biomassadichtheid gecorreleerd met continue, gerasterde variabelen, waaronder Landsat 7 ETM+ satellietbeelden en producten (bijv. reflectie), hoogte en biofysische variabelen. Door gebruik te maken van continue gerasterde datasets als input voor de RandomForest-modellen, werd een kamerbrede kaart met een resolutie van 30 meter van de bovengrondse houtachtige biomassadichtheid in de tropen geproduceerd, evenals de bijbehorende onzekerheidslaag. De onzekerheidslaag houdt rekening met de fouten van allometrische vergelijkingen, op LiDAR gebaseerd model en het randomForest-model. Alle fouten worden doorgegeven aan de uiteindelijke schatting van de biomassa. Een gedetailleerde beschrijving van het werk zal worden gerapporteerd in een nieuw artikel dat in voorbereiding is.',
  },
  citation: {
    label: 'Aanhaling',
    value:
      'Baccini A., W. Walker, L. Carvahlo, M. Farina, D. Sulla-Menashe, R. Houghton (2015). Tropische bossen zijn een netto koolstofbron, gebaseerd op nieuwe metingen van winst en verlies. Wordt beoordeeld. Geraadpleegd via Global Forest Watch Climate op [datum]. klimaat.globalforestwatch.org.',
  },
};
