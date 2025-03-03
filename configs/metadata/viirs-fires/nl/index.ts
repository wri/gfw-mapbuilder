export const nl = {
  title: 'VIIRS actieve branden',
  subtitle: '(dagelijks, 375 m, wereldwijd, NASA)',
  download_data: 'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/active-fire-data',
  learn_more: 'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/viirs-i-band-active-fire-data',
  content: [
    {
      label: 'Functie',
      value: 'Geeft brandalarmgegevens weer van de afgelopen 24 uur, 48 uur, 72 uur of 7 dagen',
    },
    {
      label: 'Resolutie',
      value: '375×375 meter',
    },
    {
      label: 'Geografische dekking',
      value: 'Globaal',
    },
    {
      label: 'Bron',
      value: 'NASA',
    },
    {
      label: 'Frequentie',
      value: 'Twee keer per dag',
    },
    {
      label: 'Datum van inhoud',
      value: 'Bijna realtime',
    },
    {
      label: 'Waarschuwingen',
      value:
        'Niet alle branden worden gedetecteerd. Er zijn verschillende redenen waarom VIIRS een bepaalde brand mogelijk niet heeft gedetecteerd. De brand is mogelijk begonnen en geëindigd tussen satellietviaducten. Het vuur was mogelijk te klein of te koud om te worden gedetecteerd in de pixel van 375 meter. Bewolking, zware rook of boomkruinen kunnen een brand volledig verdoezelen.',
    },
    {
      label: 'Licentie',
      value:
        'We erkennen het gebruik van gegevens en beelden van LANCE FIRMS beheerd door het NASA/GSFC/Earth Science Data and Information System (ESDIS) met financiering verstrekt door NASA/HQ. \n\nNASA-gegevens- en informatiebeleid',
    },
  ],
  overview: {
    label: 'Overzicht',
    value:
      'De VIIRS actieve brandgegevens (VNP14IMGT) zijn het nieuwste brandmonitoringproduct van FIRMS (Fire Information for Resource Management System), dat wereldwijde brandlocaties in bijna realtime identificeert. Informatie wordt verzameld van de Visible Infrared Imaging Radiometer Suite (VIIRS)-sensor en verwerkt met een branddetectiealgoritme om actieve branden te signaleren. Elke stip op de kaart vertegenwoordigt het midden van een pixel van 375 meter die door het algoritme is gemarkeerd.',
  },
  citation: {
    label: 'Aanhaling',
    value:
      'NASA-BEDRIJVEN. “VIIRS Actieve branden.” Toegankelijk via Global Forest Watch op 29/01/2025. www.globalforestwatch.org',
  },
};
