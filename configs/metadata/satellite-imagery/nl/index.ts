export const nl = {
  title: 'Landsat-8 / Sentinel-2 Satellite Imagery',
  content: [
    {
      label: 'Functie',
      value:
        'Satellietbeelden met hoge resolutie zijn essentieel voor het bieden van context aan andere gegevenslagen die beschikbaar zijn op GFW, zoals bij het interpreteren van de factoren achter de verandering van de boombedekking. Het wordt vaak gebruikt om mogelijke oorzaken van bijna realtime ontbossingswaarschuwingen te identificeren. De beelden kunnen ook worden gebruikt in validatieprotocollen om de nauwkeurigheid van land-/bosbedekking te beoordelen en producten te veranderen.',
    },
    {
      label: 'Resolutie',
      value: 'Sentinal-2: 10 x 10 meter, Landsat 8: 30 x 30 meter',
    },
    {
      label: 'Geografische dekking',
      value: 'Globaal',
    },
    {
      label: 'Bron',
      value:
        'Copernicus Sentinel-2. Opgehaald uit Google Earth Engine. Gegevens verwerkt door de European Space Agency (ESA).',
    },
    {
      label: 'Frequentie',
      value:
        'Dagelijks komen er nieuwe afbeeldingen beschikbaar. Tijd voor opnieuw bekijken van afbeeldingen: Sentinel-2A: elke 10 dagen, Landsat 8: elke 16 dagen',
    },
    {
      label: 'Datum van inhoud',
      value: 'Januari 2012 - druk.',
    },
  ],
  overview: {
    label: 'Overzicht',
    value:
      'Deze gegevens tonen de nieuwste satellietbeelden die voldoen aan de geselecteerde criteria voor bewolking van de Sentinel-2- en Landsat 8-systemen. . Sentinel-2, beheerd door de European Space Agency, heeft een wereldwijde dekking met een resolutie van 10 meter en kan elke 10 dagen bijgewerkte beelden verkrijgen. Landsat 8, beheerd door de US Geological Survey, is ook een mondiale satelliet en kan elke 16 dagen bijgewerkte beelden verkrijgen met een resolutie van 30 meter. Beelden die de natuurlijke kleur en de gezondheid van de vegetatie weergeven, zijn beschikbaar via beide satellieten. De afbeeldingen in natuurlijke kleuren gebruiken informatie uit zichtbaar licht (rood, groen en blauw) om het aardoppervlak weer te geven zoals het er voor het menselijk oog uitziet. De gezondheid van de vegetatie wordt gedetecteerd met behulp van de Normalized Difference Vegetation Index (NDVI), die informatie bevat over zowel rode als nabij-infrarode reflectie. Deze methode is gebaseerd op het feit dat gezonde vegetatie het meeste zichtbare licht absorbeert en het meeste nabij-infraroodlicht reflecteert dat op het oppervlak valt. Bij het interpreteren van beelden die de gezondheid van de vegetatie weergeven, duidt rood op een gezonde groeiende vegetatie, groen op kale grond en zwart op waterlichamen.',
  },
};
