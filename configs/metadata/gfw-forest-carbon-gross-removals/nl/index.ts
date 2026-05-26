export const nl = {
  title: 'Koolstofverwijdering in bossen',
  subtitle: '30 m, global, 2001-2025, Harris et al. 2021',
  download_data: 'https://data.globalforestwatch.org/datasets/94871bf57f544ea39e594feb92b06305',
  learn_more: 'https://www.nature.com/articles/s41558-020-00976-6',
  content: [
    {
      label: 'Functie',
      value: 'Geeft de koolstofverwijdering in bossen weer door bosputten',
    },
    {
      label: 'Resolutie',
      value: '30 × 30m',
    },
    {
      label: 'Geografische dekking',
      value: 'Globaal',
    },
    {
      label: 'Bron',
      value:
        'Harris, N.L., D.A. Gibbs, A. Baccini, R.A. Birdsey, S. de Bruin, M. Farina, L. Fatoyinbo, M.C. Hansen, M. Herold, R.A. Houghton, P.V. Potapov, D. Requena Suarez, R.M. Roman-Cuesta, S.S. Saatchi, C.M. Slay, S.A. Turubanova, A. Tyukavina. 2021. Global maps of twenty-first century forest carbon fluxes. Nature Climate Change. https://doi.org/10.1038/s41558-020-00976-6',
    },
    {
      label: 'Frequentie',
      value: 'Jaarlijks',
    },
    {
      label: 'Datum van inhoud',
      value: '2001-2025',
    },
    {
      label: 'Waarschuwingen',
      value:
        '- Gegevens zijn het product van modellering en hebben dus een inherente mate van fouten en onzekerheid. Gebruikers worden sterk aangemoedigd om de metadata en andere beschikbare documentatie te lezen en volledig te begrijpen voordat ze de gegevens gebruiken.\n- Waarden zijn van toepassing op bosgebieden (bedekking van het bladerdak >30 procent en >5 m hoogte of gebieden met een toename van de boombedekking). Zie Harris et al. (2021) voor meer informatie over de bosdefinitie die in de analyse is gebruikt.\n- Koolstofverwijderingen weerspiegelen de totale verwijderingen over de modelperiode van 2001-2025, niet een jaarlijkse tijdreeks waaruit een trend kan worden afgeleid. Waarden moeten dus worden gedeeld door 23 om de gemiddelde jaarlijkse verwijderingen te berekenen.\n- De onzekerheid is groter bij brutoverwijderingen dan bij emissies, met name als gevolg van onzekerheid in verwijderingsfactoren.\n- Koolstofverwijderingen weerspiegelen een brutoschatting, d.w.z. koolstofemissies van eerder of later verlies van boombedekking zijn niet inbegrepen. In plaats daarvan worden de bruto koolstofemissies verantwoord in de begeleidende koolstofemissielaag van het bos.\n- Verwijderingsgegevens bevatten tijdelijke inconsistenties omdat de toename van de boombedekking een cumulatief totaal van 2000-2020 vertegenwoordigt, in plaats van de jaarlijkse winst zoals geschat tot en met 2025.\n- De koolstofverwijderingen in bossen weerspiegelen de koolstofverwijderingen die alleen plaatsvinden in bosecosystemen en weerspiegelen niet de toename van de koolstofvoorraden in de pool van geoogste houtproducten (HWP).\n- Grote sprongen in verwijderingen langs sommige grenzen zijn te wijten aan het gebruik van ecozone-specifieke verwijderingsfactoren. De veranderingen in verwijderingen vinden plaats aan de grenzen van de ecozone, waar aan elke kant verschillende verwijderingsfactoren worden toegepast.\n- Deze dataset is bijgewerkt sinds de oorspronkelijke publicatie. Zie Overzicht voor meer informatie.',
    },
    {
      label: 'Licentie',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Overzicht',
    value:
      "Deze koolstofverwijderingslaag is onderdeel van het boskoolstoffluxmodel beschreven in Harris et al. (2021). Dit artikel introduceert een georuimtelijk monitoringskader voor het schatten van wereldwijde boskoolstoffluxen, dat verschillende actoren en organisaties kan helpen bij het volgen van broeikasgasfluxen uit bossen en bij het verminderen van emissies of het verhogen van verwijderingen door bossen. Boskoolstofverwijderingen uit de atmosfeer (vastlegging) door bosputten vertegenwoordigen de cumulatieve koolstof die is vastgelegd (megagram CO2/ha) door de groei van gevestigde en nieuw groeiende bossen tijdens de modelperiode tussen 2001-2025. Verwijderingen omvatten de accumulatie van koolstof in zowel bovengrondse als ondergrondse levende boombiomassa. Volgens IPCC Tier 1-aannames voor bossen die bossen blijven, wordt aangenomen dat verwijderingen door dood hout, strooisel en koolstofpoelen in de bodem nul zijn. In elke pixel worden koolstofverwijderingen berekend volgens de IPCC-richtlijnen voor nationale inventarissen van broeikasgassen waar bossen bestonden in 2000 of werden aangelegd tussen 2000 en 2020 volgens Potapov et al. 2022. Atmosferische koolstof die in elke pixel wordt verwijderd, is gebaseerd op kaarten van bostype (bijv. mangrove, plantage), ecozone (bijv. vochtige neotropen), bosleeftijd (bijv. primair, oud secundair) en aantal jaren van koolstofverwijdering. Deze laag weerspiegelt de cumulatieve verwijderingen tijdens de modelperiode (2001-2025) en moet worden gedeeld door 23 om een ​​jaarlijks gemiddelde te verkrijgen tijdens de modelduur; verwijderingssnelheden kunnen niet worden toegewezen aan afzonderlijke jaren van het model. Alle invoerlagen werden opnieuw bemonsterd naar een gemeenschappelijke resolutie van 0,00025 x 0,00025 graden elk om overeen te komen met Hansen et al. (2013).\n\nElk jaar worden het verlies aan boombedekking, de oorzaken van het verlies aan boombedekking en het verbrande gebied bijgewerkt. In 2025 en 2025 zijn ook een paar modelinvoerdatasets en constanten gewijzigd, zoals hieronder beschreven. Raadpleeg deze blogpost voor meer informatie.\n\n- De bron van de verhouding tussen ondergrondse biomassakoolstof en bovengrondse biomassakoolstof. Voorheen één wereldwijde constante gebruikt; gebruikt nu kaart van Huang et al. 2021\n- De jaren van toename van boombedekking. Voorheen 2000-2012 gebruikt; gebruikt nu 2000-2020 van Potapov et al. 2022.\n- De bron van brandgegevens. Voorheen MODIS verbrand gebied gebruikt; gebruikt nu verlies van boombedekking door branden van Tyukavina et al. 2022.\n- De bron van veenkaarten. Nieuwe tropische datasets zijn opgenomen en de dataset boven 40 graden noorderbreedte is gewijzigd.\n- Global warming potential (GWP) constanten voor CH4 en N2O. Voorheen gebruikte GWP's van IPCC Fifth Assessment Report; gebruikt nu GWP's uit het zesde beoordelingsrapport van het IPCC.\n- Verwijderingsfactoren voor oudere (>20 jaar) secundaire gematigde bossen en de bijbehorende onzekerheden. Eerder gebruikte verwijderingsfactoren gepubliceerd in tabel 4.9 van de verfijning van 2019 van de IPCC-richtlijnen voor nationale broeikasgasinventarissen uit 2006; gebruikt nu gecorrigeerde verwijderingsfactoren en onzekerheden van de 4e corrigenda van de verfijning van 2019 van de IPCC-richtlijnen voor nationale broeikasgasinventarissen uit 2006.\n- Omvang van geplante bomen en verwijderingsfactoren. Eerder gebruikte Spatial Database of Planted Trees (SDPT) versie 1.0; gebruikt nu SDPT versie 2.0 en bijbehorende verwijderingsfactoren.\n\nVerwijderingen zijn beschikbaar om te downloaden in twee verschillende oppervlakte-eenheden gedurende de modelduur: 1) megagram verwijderd CO2/ha, en 2) megagram verwijderd CO2/pixel. De eerste is geschikt voor het visualiseren (in kaart brengen) van verwijderingen omdat het de dichtheid van verwijderingen per hectare weergeeft. De tweede is geschikt voor het berekenen van de verwijderingen in een interessegebied (AOI) omdat de waarden van de pixels in de AOI kunnen worden opgeteld om de totale verwijderingen voor dat gebied te verkrijgen. De waarden in de laatste werden berekend door de verwijderingen per hectare aan te passen aan de grootte van elke pixel, die varieert per breedtegraad. Bij het schatten van verwijderingen die plaatsvinden over een bepaald aantal jaren tussen 2001 en 2025 om te vergelijken met emissies, deelt u de totale koolstofverwijderingen door de modelduur en vermenigvuldigt u vervolgens met het aantal jaren in de interesseperiode. Beide datasets bevatten alleen pixels binnen bossen, zoals gedefinieerd in de methoden van Harris et al. (2021) en bijgewerkt met de toename van boombedekking tot en met 2020.",
  },
  citation: {
    label: 'Aanhaling',
    value:
      'Harris et al. (2021). Global maps of 21st century forest carbon fluxes. Accessed on 14/02/2025 from Global Forest Watch.',
  },
};
