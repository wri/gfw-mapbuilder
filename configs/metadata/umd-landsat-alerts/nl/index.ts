export const nl = {
  title: 'GLAD-Landsat ontbossing waarschuwingen (GLAD-L)',
  subtitle: '(wekelijks, 30m, tropen, UMD/GLAD)',
  download_data: 'http://glad-forest-alert.appspot.com/',
  content: [
    {
      label: 'Functie',
      value: 'Identificeert vrijwel in realtime gebieden met waarschijnlijk verlies van boombedekking',
    },
    {
      label: 'Resolutie',
      value: '30×30 meter',
    },
    {
      label: 'Geografische dekking',
      value: '30 graden noord tot 30 graden zuid',
    },
    {
      label: 'Bron',
      value:
        'Hansen, MC, A. Krylov, A. Tyukavina, PV Potapov, S. Turubanova, B. Zutta, S. Ifo, B. Margono, F. Stolle en R. Moore. 2016. Waarschuwingen voor verstoring van vochtige tropische bossen met behulp van Landsat-gegevens. Milieuonderzoeksbrieven, 11 (3)',
    },
    {
      label: 'Frequentie',
      value: 'Wekelijks bijgewerkt',
    },
    {
      label: 'Datum van inhoud',
      value:
        '1 januari 2021 (GLAD-L-waarschuwingen zijn sinds 2015 actief voor geselecteerde landen in het Amazone- en Congobekken en insulair Zuidoost-Azië, maar historische gegevens zijn niet beschikbaar op GFW)',
    },
    {
      label: 'Waarschuwingen',
      value:
        "Hoewel ze ‘ontbossingswaarschuwingen’ worden genoemd, detecteren deze waarschuwingen verstoringen van de bos- of boombedekking. Dit product maakt geen onderscheid tussen door de mens veroorzaakte en andere soorten verstoringen. Wanneer waarschuwingen worden gedetecteerd in plantagebossen (de kans is groter dat dit gebeurt in het GLAD-L-systeem), kunnen waarschuwingen duiden op houtkapactiviteiten, zonder een conversie naar niet-boslandgebruik. \n\nDe term ontbossing wordt gebruikt omdat dit potentiële ontbossingsgebeurtenissen zijn, en waarschuwingen kunnen verder worden onderzocht om dit vast te stellen. \n\nWe raden het gebruik van ontbossingswaarschuwingen niet aan voor mondiale of regionale trendbeoordeling, noch voor gebiedsschattingen. We raden aan om de jaarlijkse gegevens over het verlies aan bosbedekking te gebruiken voor een nauwkeurigere vergelijking van de trends in bosverandering in de loop van de tijd, en voor oppervlakteschattingen. Recente waarschuwingen omvatten valse positieven waarvan het betrouwbaarheidsniveau nog moet worden verhoogd en die uiteindelijk kunnen worden verwijderd. Eerdere waarschuwingen kunnen ten onrechte uit de database zijn verwijderd als de snelle sluiting van het bladerdak voorafgaat aan de aanvullende onbelemmerde satellietwaarnemingen binnen zes maanden. Bovendien vormen updates van de methodologieën, een verschillend aantal systemen (in het geval van de geïntegreerde waarschuwingen) en variatie in bewolking tussen maanden en jaren extra risico's voor het gebruik van ontbossingswaarschuwingen voor inter-/intra-jaarlijkse vergelijking. \n\nDe waarschuwingen kunnen worden ‘samengesteld’ om de waarschuwingen te identificeren die van belang zijn voor een gebruiker, zoals waarschuwingen die waarschijnlijk ontbossing betreffen en die prioriteit kunnen krijgen voor actie. Een gebruiker kan dit doen door andere contextuele gegevenssets, zoals beschermde gebieden of geplante bomen, over elkaar heen te leggen. De niet-gecureerde gegevens worden hier verstrekt zodat gebruikers hun eigen prioriteringsaanpak kunnen definiëren. Er zijn samengestelde waarschuwingslocaties beschikbaar in de gegevenslaag Places to Watch. \n\nTerwijl Landsat 8 en 9 satellieten (voorheen Landsat 7 en 8) samen een herbezoekperiode van 8 dagen hebben, kan bewolking de beschikbaarheid van beelden beperken, vooral in het natte seizoen. Alarmdata vertegenwoordigen het moment van detectie, hoewel het verlies aan boombedekking eerder had kunnen plaatsvinden, mogelijk zelfs weken eerder, als gevolg van aanhoudende bewolking. Houd er rekening mee dat de GLAD-L-waarschuwingen voorheen afkomstig waren van Landsat 7-beelden die een bekend scanlijnprobleem hadden dat soms resulteerde in vals-positieve waarschuwingen, tot april 2023, toen de invoer in plaats daarvan werd overgeschakeld naar Landsat 9. \n\n\nIn deze dataset wordt “boombedekking” gedefinieerd als alle vegetatie groter dan 5 meter hoog met meer dan 60% bladerdak, en kan de vorm aannemen van natuurlijke bossen of plantages. 'Verlies van boombedekking' duidt op het verwijderen van het bladerdak van ten minste een halve pixel en kan te wijten zijn aan verschillende factoren, waaronder mechanisch oogsten, brand, ziekte of stormschade. Als zodanig staat ‘verlies’ niet gelijk aan ontbossing. \n\nIn Peru, waar het waarschuwingssysteem voor het eerst werd ontwikkeld, evalueerden de auteurs dat de gegevens 13,5% valse positieven bevatten (verlies gedetecteerd waar er geen sprake was), hoewel de meerderheid van deze valse positieven (9,5%) zich aan de randen van open plekken voordoet. Aan de randen tonen de 30 m lange Landsat-pixels een mix van bos en andere landbedekking, waardoor ze gevoelig zijn voor fouten in het systeem. Het percentage valse positieven daalt tot 1% als alleen naar waarschuwingen met een hoog vertrouwen wordt gekeken. De gegevens bevatten 33% fout-negatieven (niet-gedetecteerd verlies waar dit heeft plaatsgevonden), hoewel de meeste hiervan voorkomen in secundaire bossen – waarschijnlijk omdat het algoritme is gemaakt om primair bosverlies vast te leggen. Het hogere percentage valse negatieven in vergelijking met valse positieven geeft ook aan dat de waarschuwingen een conservatieve schatting zijn van het verlies aan boombedekking dat feitelijk plaatsvindt. \n\nHet betrouwbaarheidsniveau kan met terugwerkende kracht veranderen als de brongegevens worden bijgewerkt; waarschuwingen die niet binnen 180 dagen of na 4 waarnemingen een hoge betrouwbaarheid hebben bereikt, worden uit de dataset verwijderd \n\nZodra een waarschuwingspixel een hoge mate van betrouwbaarheid bereikt, wordt op die locatie geen bosverlies meer gedetecteerd. \n\nBij uitzoomen vertoont deze gegevenslaag een zekere mate van onnauwkeurigheid, omdat de gegevenspunten moeten worden samengevouwen om op grotere schaal zichtbaar te zijn. Zoom in voor meer details.",
    },
    {
      label: 'Licentie',
      value: 'CC BY 4.0',
    },
  ],
  overview: {
    label: 'Overzicht',
    value:
      'Deze dataset, gemaakt door het GLAD-laboratorium (Global Land Analysis & Discovery) van de Universiteit van Maryland en ondersteund door Global Forest Watch, is het eerste op Landsat gebaseerde waarschuwingssysteem voor verlies van boombedekking. Hoewel de meeste bestaande producten voor verlieswaarschuwingen MODIS-beelden met een resolutie van 250 meter gebruiken, hebben deze waarschuwingen een resolutie van 30 meter en kunnen ze dus verlies op een veel fijnere ruimtelijke schaal detecteren. Deze waarschuwingen hebben een resolutie van 30 meter en zijn operationeel voor landgebieden tussen 30 graden noord en zuid. \n\nNieuwe Landsat 8- en 9-afbeeldingen worden gedownload zodra ze online worden geplaatst, beoordeeld op bewolking of slechte gegevenskwaliteit, en vergeleken met de drie voorgaande jaren van Landsat-afgeleide statistieken (inclusief rangen, gemiddelden en regressies van rode, infrarood- en kortegolfbanden, en rangen van NDVI, NBR en NDWI). De statistieken en het nieuwste Landsat-beeld worden door zeven beslissingsbomen gehaald om de mediane waarschijnlijkheid van bosverstoring te berekenen. Pixels met een waarschijnlijkheid >50% worden gerapporteerd als waarschuwingen voor verlies van boombedekking. Het hele proces wordt uitgevoerd in Google Earth Engine om betrouwbare updates en schaalbaarheid te garanderen. Voor meer informatie over de methodologie, zie het artikel in Environmental Research Letters. \n\nWaarschuwingen worden pas als hoogbetrouwbaar geclassificeerd als twee of meer van de vier opeenvolgende waarnemingen als verlies van boombedekking worden bestempeld. Waarschuwingen worden na vier opeenvolgende waarnemingen of na meer dan 180 dagen uit de dataset verwijderd als ze niet als zeer betrouwbaar zijn geclassificeerd. U kunt ervoor kiezen om alleen waarschuwingen met hoge betrouwbaarheid in het menu weer te geven, maar houd er rekening mee dat als u alleen waarschuwingen met hoge betrouwbaarheid gebruikt, u de nieuwste detecties van verlies van boombedekking mist.',
  },
  citation: {
    label: 'Aanhaling',
    value:
      'Gebruik het volgende krediet wanneer deze gegevens worden weergegeven: \n\nBron: GLAD/UMD, toegankelijk via Global Forest Watch \n\nGebruik de volgende credit wanneer deze gegevens worden geciteerd: \n\nHansen, MC, A. Krylov, A. Tyukavina, PV Potapov, S. Turubanova, B. Zutta, S. Ifo, B. Margono, F. Stolle en R. Moore. 2016. Waarschuwingen voor verstoring van vochtige tropische bossen met behulp van Landsat-gegevens. Milieuonderzoeksbrieven, 11 (3). Bereikbaar via Global Forest Watch op [datum]. www.globalforestwatch.org',
  },
};
