export const nl = {
  title: 'Winst aan boombedekking',
  subtitle: '(20 jaar, 30 m, wereldwijd, UMD/NASA GEDI)',
  content: [
    {
      label: 'Functie',
      value: 'Identificeert gebieden waar de boombedekking toeneemt',
    },
    {
      label: 'Resolutie',
      value: '30×30 meter',
    },
    {
      label: 'Geografische dekking',
      value: 'Globaal',
    },
    {
      label: 'Bron',
      value:
        'Potapov, P., Hansen, M.C., Pickens, A., Hernandez-Serna, A., Tyukavina, A., Turubanova, S., Zalles, V., Li, X., Khan, A., Stolle, F., Harris, N., Song, X-P., Baggett, A., Kommareddy, I., en Kommareddy, A. 2022. De mondiale Dataset voor landbedekking en verandering in landgebruik 2000-2020 afgeleid van het Landsat-archief: eerste resultaten. Frontiers in Remote Sensing, 13 april 2022. https://doi.org/10.3389/frsen.2022.856903',
    },
    {
      label: 'Datum van inhoud',
      value: '2000-2020',
    },
    {
      label: 'Waarschuwingen',
      value:
        'In deze dataset wordt “boombedekking” gedefinieerd als houtachtige vegetatie met een hoogte van 5 m en hoger, en kan de vorm aannemen van natuurlijke bossen, bossen of boomplantages met een reeks bladerdakdichtheden. De toename van het bosareaal is niet direct gelijk aan herstel, bebossing of herbebossing. \n\nVanwege variatie in onderzoeksmethodologie en datum van inhoud kunnen gegevenssets over boombedekking, winst en jaarlijks verlies niet nauwkeurig met elkaar worden vergeleken. Dienovereenkomstig kan “netto” niet worden berekend door de cijfers voor de toename van het boomareaal af te trekken van de jaarlijkse gegevensset voor verlies van boombedekking. In plaats daarvan moet de netto veranderingslaag van de boombedekking worden gebruikt, die uitsluitend is berekend op basis van gegevens over de boomhoogte. \n\nGeïntegreerd gebruik van andere producten, zoals gegevens over de dichtheid van het bladerdak, die ook beschikbaar zijn op GFW, moet met voorzichtigheid gebeuren. \n\nDe auteurs evalueerden de nauwkeurigheid van het product en de algehele nauwkeurigheid bleek 99,3% te zijn, een commissiefout (fout-positieven) van 28,6% en een weglatingsfout (fout-negatieven) van 42,2%. De nauwkeurigheid varieert per bioom en kan dus op een bepaalde locatie hoger of lager zijn. Omdat de weglatingsfout groter is dan de commissiefout, geeft dit aan dat het product conservatieve schattingen van de bosdynamiek oplevert. \n\nEr bestond verwarring tussen bosverbetering (bestaande toename van de boshoogte) en bosgroei (aanleg van bossen binnen het jaar 2000 op niet-bosgebied), en dit was prominenter aanwezig in boreale bosgebieden waar de boshoogte in het jaar 2000 moeilijk te bepalen was.',
    },
    {
      label: 'Licentie',
      value: 'CC door 4.0',
    },
  ],
  overview: {
    label: 'Overzicht',
    value:
      'Deze dataset van het GLAD-laboratorium (Global Land Analysis & Discovery) van de Universiteit van Maryland meet de toename van het bosareaal tussen het jaar 2000 en 2020 over de hele wereld met een resolutie van 30 x 30 meter, weergegeven als een cumulatieve laag van 20 jaar. De toename van de boombedekking werd bepaald met behulp van boomhoogte-informatie uit de jaren 2000 en 2020. De boomhoogte werd gemodelleerd door de integratie van de Global Ecosystem Dynamics Investigation (GEDI) lidar bosstructuurmetingen en Landsat-analyse-ready gegevenstijdreeksen. De NASA GEDI is een lidar-instrument in de ruimte dat sinds april 2019 aan boord van het internationale ruimtestation wordt gebruikt. Het biedt puntgebaseerde metingen van de vegetatiestructuur, inclusief de hoogte van het bladerdak op breedtegraden tussen 52 ° N en 52 ° ZB wereldwijd. Er werd winst vastgesteld waar pixels een boomhoogte ≥5 m hadden in 2020 en een boomhoogte <5 m in 2000. \n\nDe toename van het bosareaal kan wijzen op een aantal potentiële activiteiten, waaronder natuurlijke bosgroei, de vruchtwisselingscyclus van bomen of het beheer van boomplantages. \n\nWanneer uitgezoomd (< zoomniveau 12), worden de versterkingspixels gearceerd volgens de versterkingsdichtheid op de schaal van 30 x 30 meter. Pixels met donkerdere arcering vertegenwoordigen gebieden met een hogere concentratie aan boombedekkingswinst, terwijl pixels met lichtere arcering een lagere concentratie aan boombedekkingswinst aangeven. Er is geen variatie in pixelarcering wanneer de gegevens de volledige resolutie hebben (≥ zoomniveau 12).',
  },
  citation: {
    label: 'Aanhaling',
    value:
      'Gebruik het volgende krediet wanneer deze gegevens worden weergegeven: \nToegankelijk via Global Forest Watch op 29/01/2025. www.globalforestwatch.org. \n\nGebruik de volgende credit wanneer deze gegevens worden geciteerd: \nPotapov, P., Hansen, M.C., Pickens, A., Hernandez-Serna, A., Tyukavina, A., Turubanova, S., Zalles, V., Li, X., Khan, A., Stolle, F., Harris, N., Song, X-P., Baggett, A., Kommareddy, I., en Kommareddy, A. 2022. De mondiale Dataset voor landbedekking en verandering in landgebruik 2000-2020 afgeleid van het Landsat-archief: eerste resultaten. Frontiers in Remote Sensing, 13 april 2022. https://doi.org/10.3389/frsen.2022.856903',
  },
};
