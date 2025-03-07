export const nl = {
  title: 'Geïntegreerde ontbossingwaarschuwingen',
  subtitle: 'dagelijks, 10m, tropen, UMD/GLAD en WUR',
  download_data: 'https://data.globalforestwatch.org/datasets/gfw::integrated-deforestation-alerts/about',
  content: [
    {
      label: 'Functie',
      value:
        'Houd bosverstoringen vrijwel in realtime in de gaten met behulp van geïntegreerde waarschuwingen van drie waarschuwingssystemen',
    },
    {
      label: 'Resolutie',
      value: '10 × 10 meter',
    },
    {
      label: 'Geografische dekking',
      value: '30°N tot 30°Z',
    },
    {
      label: 'Bron',
      value:
        'GLAD-waarschuwingen:\nHansen, MC, A. Krylov, A. Tyukavina, PV Potapov, S. Turubanova, B. Zutta, S. Ifo, B. Margono, F. Stolle en R. Moore. 2016. Waarschuwingen voor verstoring van vochtige tropische bossen met behulp van Landsat-gegevens. Milieuonderzoeksbrieven, 11 (3). (https://dx.doi.org/10.1088/1748-9326/11/3/034008)[https://dx.doi.org/10.1088/1748-9326/11/3/034008]',
    },
    {
      label: 'Frequentie',
      value: 'Dagelijks',
    },
    {
      label: 'Datum van inhoud',
      value: '1 januari 2019 – heden',
    },
    {
      label: 'Waarschuwingen',
      value:
        "Hoewel ze ‘ontbossingswaarschuwingen’ worden genoemd, detecteren deze waarschuwingen verstoringen van de bos- of boombedekking. Dit product maakt geen onderscheid tussen door de mens veroorzaakte en andere soorten verstoringen. Wanneer waarschuwingen worden gedetecteerd in plantagebossen (de kans is groter dat dit gebeurt in het GLAD-L-systeem), kunnen waarschuwingen duiden op houtkapactiviteiten, zonder een conversie naar niet-boslandgebruik. \nDe term ontbossing wordt gebruikt omdat dit potentiële ontbossingsgebeurtenissen zijn, en waarschuwingen kunnen verder worden onderzocht om dit vast te stellen. \nWe raden het gebruik van ontbossingswaarschuwingen niet aan voor mondiale of regionale trendbeoordeling, noch voor gebiedsschattingen. We raden aan om de jaarlijkse gegevens over het verlies aan bosbedekking te gebruiken voor een nauwkeurigere vergelijking van de trends in bosverandering in de loop van de tijd, en voor oppervlakteschattingen. Recente waarschuwingen omvatten valse positieven waarvan het betrouwbaarheidsniveau nog moet worden verhoogd en die uiteindelijk kunnen worden verwijderd. Eerdere waarschuwingen kunnen ten onrechte uit de database zijn verwijderd als de snelle sluiting van het bladerdak voorafgaat aan de aanvullende onbelemmerde satellietwaarnemingen binnen zes maanden. Bovendien vormen updates van de methodologieën, een verschillend aantal systemen (in het geval van de geïntegreerde waarschuwingen) en variatie in bewolking tussen maanden en jaren extra risico's voor het gebruik van ontbossingswaarschuwingen voor inter-/intra-jaarlijkse vergelijking.\nDe waarschuwingen kunnen worden ‘samengesteld’ om de waarschuwingen te identificeren die van belang zijn voor een gebruiker, zoals waarschuwingen die waarschijnlijk ontbossing betreffen en die prioriteit kunnen krijgen voor actie. Een gebruiker kan dit doen door andere contextuele gegevenssets, zoals beschermde gebieden of geplante bomen, over elkaar heen te leggen. De niet-gecureerde gegevens worden hier verstrekt zodat gebruikers hun eigen prioriteringsaanpak kunnen definiëren. Er zijn samengestelde waarschuwingslocaties beschikbaar in de gegevenslaag Places to Watch.\nDe drie waarschuwingssystemen hanteren verschillende definities van bos-/boombedekking en verstoringen van de bos-/boombedekking: \n\n\nGLAD-L: waarschuwingen vallen binnen de “boombedekking”, wat wordt gedefinieerd als alle vegetatie groter dan 5 meter hoog met meer dan 60% bladerdak, en kan de vorm aannemen van natuurlijke bossen of plantages. 'Verlies van boombedekking' duidt op het verwijderen van het bladerdak van ten minste een halve pixel en kan te wijten zijn aan verschillende factoren, waaronder mechanisch oogsten, brand, ziekte of stormschade. Als zodanig staat ‘verlies’ niet gelijk aan ontbossing. \nGLAD-S2: waarschuwingen vallen binnen het primaire bosmasker van Turubanova et al (2018) in het stroomgebied van de Amazone, met bosverlies tot en met 2001 door Hansen et al. (2013) verwijderd. \nRADD: waarschuwingen vinden plaats in primaire vochtige bossen. Bosverlies wordt gedefinieerd als het geheel of gedeeltelijk verwijderen van boombedekking binnen een pixel, en er wordt een minimale kaarteenheid van 0,5 ha gebruikt. \nDe invoerwaarschuwingssystemen hebben niet dezelfde ruimtelijke en temporele dekking:\nGLAD-L: Actief in de gehele tropen (30°N tot 30°Z) van 1 januari 2018 tot heden, en van 2015 tot heden (hoewel gedurende een periode in 2022 onderbroken) voor geselecteerde landen in het Amazonegebied, het Congobekken en het insulaire Zuidoost-Azië \nGLAD-S2: Actief in de primaire vochtige tropische bosgebieden van Zuid-Amerika van januari 2019 tot heden \nRADD: Actief in de primaire vochtige tropische bosgebieden van Zuid-Amerika, Afrika bezuiden de Sahara en insulair Zuidoost-Azië met dekking van januari 2019 tot heden voor Afrika en januari 2020 tot heden voor Zuid-Amerika en Zuidoost-Azië, waarbij Midden-Amerika gedekt wordt vanaf januari 2023 (uitbreiding naar continentaal Zuidoost-Azië en de Stille Oceaan is gepland tegen eind 2023) \n\nOm de drie waarschuwingssystemen op een gemeenschappelijk raster te integreren, wordt GLAD-L opnieuw bemonsterd van een ruimtelijke resolutie van 30 m naar 10 m om te passen bij GLAD-S2 en RADD. Als gevolg hiervan wordt een enkele GLAD-L-pixel van 30 m meerdere pixels van 10 m in de geïntegreerde laag. Gebruikers moeten voorzichtig zijn bij het vergelijken van de analyseresultaten van individuele systemen met de geïntegreerde waarschuwingslaag, aangezien het aantal geïntegreerde waarschuwingen veel groter zal zijn dan het aantal native GLAD-L-waarschuwingen. Bovendien zijn pixels in de geïntegreerde laag mogelijk niet precies uitgelijnd op de kaart met pixels in de individuele GLAD-L-laag als gevolg van deze herbemonstering. \nElke pixel in de geïntegreerde laag behoudt de vroegste detectiedatum van elk waarschuwingssysteem, zelfs als meerdere systemen een waarschuwing in die pixel hebben gerapporteerd. In sommige situaties kan dit leiden tot inconsistente visualisaties bij het overschakelen van de geïntegreerde laag naar individuele waarschuwingssysteemlagen. Het is raadzaam om de geïntegreerde laag te gebruiken als u geïnteresseerd bent in de vroegste datum van detectie door een waarschuwingssysteem. Het is echter beter om de afzonderlijke waarschuwingssysteemlagen te gebruiken als u geïnteresseerd bent in een specifiek waarschuwingstype. \nHet niveau “Hoogste betrouwbaarheid: gedetecteerd door meerdere waarschuwingssystemen” kan alleen worden bereikt in gebieden en voor tijdsperioden waar voor die regio meer dan één waarschuwingssysteem in werking was. \nHet betrouwbaarheidsniveau kan met terugwerkende kracht veranderen als de brongegevens worden bijgewerkt; waarschuwingen die niet binnen 180 dagen een hoge mate van betrouwbaarheid hebben gekregen, worden uit de dataset verwijderd.\nZodra een waarschuwingspixel een hoge betrouwbaarheid bereikt, zal bosverlies op die locatie niet meer door hetzelfde waarschuwingssysteem worden gedetecteerd\nDe nauwkeurigheid varieert binnen de dekking van de geïntegreerde waarschuwingen, vanwege de verschillende kenmerken van de drie waarschuwingssystemen. Radarwaarschuwingen (RADD) kunnen bijvoorbeeld meer valse detecties hebben in moerasbossen vanwege de hoge gevoeligheid van de C-bandradar met korte golflengte voor vochtvariatie\nBij uitzoomen vertoont deze gegevenslaag een zekere mate van onnauwkeurigheid, omdat de gegevenspunten moeten worden samengevouwen om op grotere schaal zichtbaar te zijn. Zoom in voor meer details.",
    },
    {
      label: 'Licentie',
      value: 'CC door 4.0',
    },
  ],
  overview: {
    label: 'Overzicht',
    value:
      'Deze dataset, samengesteld door Global Forest Watch, verzamelt ontbossingswaarschuwingen van drie waarschuwingssystemen (GLAD-L, GLAD-S2, RADD) in één enkele, geïntegreerde ontbossingswaarschuwingslaag. Dankzij deze integratie kunnen gebruikers ontbossingsgebeurtenissen sneller detecteren dan welk enkel systeem dan ook, omdat de geïntegreerde laag wordt bijgewerkt wanneer een van de bronwaarschuwingssystemen wordt bijgewerkt.',
  },
  citation: {
    label: 'Aanhaling',
    value: 'Bron: "Geïntegreerde ontbossingwaarschuwingen". UMD/GLAD en WUR, toegankelijk via Global Forest Watch',
  },
};
