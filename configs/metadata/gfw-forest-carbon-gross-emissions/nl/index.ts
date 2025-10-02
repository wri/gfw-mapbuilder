export const nl = {
  title: 'Koolstofemissies in bossen',
  subtitle: '30 m, global, 2001-2024, Harris et al. 2021',
  download_data: 'https://data.globalforestwatch.org/datasets/753016096c1d49f0977e7b62533375ee',
  learn_more: '',
  content: [
    {
      label: 'Functie',
      value: 'Weergave van de uitstoot van broeikasgassen door bossen als gevolg van verstoringen van opstanden',
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
      value: '2001-2024',
    },
    {
      label: 'Waarschuwingen',
      value:
        '- Gegevens zijn het product van modellering en hebben dus een inherente mate van fout en onzekerheid. Gebruikers worden sterk aangemoedigd om de metadata en andere beschikbare documentatie te lezen en volledig te begrijpen voordat ze de gegevens gebruiken. \n- Waarden zijn alleen van toepassing op bosgebieden (bladerdak >30 procent en >5 m hoogte of gebieden met toename van boombedekking). Zie Harris et al. (2021) voor meer informatie over de bosdefinitie die in de analyse is gebruikt.\n- Hoewel de emissies in elke pixel zijn gekoppeld aan een specifiek jaar van verstoring, weerspiegelen emissies over een interessegebied het totaal over de modelperiode 2001-2024. De waarden moeten dus worden gedeeld door 23 om de gemiddelde jaarlijkse verwijderingen te berekenen.\n- Emissies weerspiegelen standvervangende verstoringen zoals waargenomen in Landsat-satellietbeelden en omvatten geen emissies van niet-waargenomen bosdegradatie.\n- Emissies weerspiegelen een brutoschatting, d.w.z. koolstofverwijderingen van eventuele hergroei die optreedt na verstoring zijn niet inbegrepen. In plaats daarvan worden de bruto koolstofverwijderingen verantwoordd in de bijbehorende koolstofverwijderingslaag in het bos.\n- Emissiegegevens bevatten inconsistenties in de tijd. Verbeteringen in de detectie van verlies aan boombedekking als gevolg van de integratie van nieuwe satellietgegevens en methodologische wijzigingen tussen 2011 en 2015 kunnen leiden tot hogere schattingen van emissies in de afgelopen jaren in vergelijking met eerdere jaren. Kijk hier voor meer informatie.\n- De koolstofemissies van bossen weerspiegelen niet de koolstofoverdrachten van koolstofreservoirs van ecosystemen naar de pool van geoogste houtproducten (HWP).\n- Deze dataset is bijgewerkt sinds de oorspronkelijke publicatie. Zie Overzicht voor meer informatie.',
    },
    {
      label: 'Licentie',
      value: '',
    },
  ],
  overview: {
    label: 'Overzicht',
    value:
      "Deze emissielaag is onderdeel van het boskoolstoffluxmodel beschreven in Harris et al. (2021). Dit artikel introduceert een georuimtelijk monitoringkader voor het schatten van wereldwijde boskoolstoffluxen dat verschillende actoren en organisaties kan helpen bij het volgen van broeikasgasfluxen uit bossen en bij het verminderen van emissies of het verhogen van verwijderingen door bossen. Boskoolstofemissies vertegenwoordigen de broeikasgasemissies die voortvloeien uit verstoringen van bosbestanden die zich in elk gemodelleerd jaar hebben voorgedaan (megagram CO2-emissies/ha, tussen 2001 en 2024). Emissies omvatten alle relevante koolstofpools van ecosystemen (bovengrondse biomassa, ondergrondse biomassa, dood hout, strooisel, organische koolstof in de bodem) en broeikasgassen (CO2, CH4, N2O). Emissieschattingen voor elke pixel worden berekend volgens IPCC-richtlijnen voor nationale broeikasgasinventarissen waar verstoringen van bosbestanden die zich hebben voorgedaan, zoals in kaart gebracht in de jaarlijkse gegevens over het verlies van boombedekking van Global Forest Change van Hansen et al. (2013). De koolstof die door elke pixel wordt uitgestoten, is gebaseerd op koolstofdichtheden in 2000, met aanpassing voor koolstof die is verzameld tussen 2000 en het jaar van verstoring.\n\nEmissies weerspiegelen een bruto schatting, d.w.z. koolstofverwijderingen van daaropvolgende hergroei zijn niet inbegrepen. In plaats daarvan worden bruto koolstofverwijderingen als gevolg van daaropvolgende hergroei na kap in de koolstofverwijderingslaag van het begeleidende bos meegenomen. Het deel van de koolstof dat door elke pixel wordt uitgestoten bij verstoring (emissiefactor) wordt beïnvloed door verschillende factoren, waaronder de directe oorzaak van de verstoring, of er brand werd waargenomen in het jaar van of voorafgaand aan de waargenomen verstoring, of de verstoring plaatsvond op veen, en meer. Alle emissies worden verondersteld plaats te vinden in het jaar van verstoring. Emissies kunnen worden toegewezen aan een specifiek jaar met behulp van de Hansen-gegevens over verlies aan boombedekking; afzonderlijke rasters voor emissies voor elk jaar zijn niet beschikbaar bij GFW. Alle invoerlagen werden opnieuw bemonsterd naar een gemeenschappelijke resolutie van 0,00025 × 0,00025 graden elk om overeen te komen met Hansen et al. (2013).\n\nElk jaar worden het verlies aan boombedekking, de oorzaken van het verlies aan boombedekking en het verbrande gebied bijgewerkt. In 2024 en 2024 zijn ook een paar modelinvoergegevenssets en constanten gewijzigd, zoals hieronder beschreven. Raadpleeg deze blogpost voor meer informatie.\n\n- De bron van de verhouding tussen ondergrondse biomassakoolstof en bovengrondse biomassakoolstof. Voorheen één wereldwijde constante gebruikt; gebruikt nu kaart van Huang et al. 2021\n- De jaren van toename van boombedekking. Voorheen 2000-2012 gebruikt; gebruikt nu 2000-2020 van Potapov et al. 2022.\n- De bron van brandgegevens. Voorheen MODIS verbrand gebied gebruikt; gebruikt nu verlies aan boombedekking door branden van Tyukavina et al. 2022.\n- De bron van veenkaarten. Nieuwe tropische gegevenssets zijn opgenomen en de gegevensset boven 40 graden noorderbreedte is gewijzigd.\n- Global warming potential (GWP) constanten voor CH4 en N2O. Eerder gebruikte GWP's van IPCC Fifth Assessment Report; gebruikt nu GWP's van IPCC Sixth Assessment Report.\n- Verwijderingsfactoren voor oudere (>20 jaar) secundaire gematigde bossen en de bijbehorende onzekerheden. Eerder gebruikte verwijderingsfactoren gepubliceerd in Tabel 4.9 van de 2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories; gebruikt nu gecorrigeerde verwijderingsfactoren en onzekerheden van de 4e Corrigenda van de 2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories.\n- Geplante boomomvang en verwijderingsfactoren. Eerder gebruikte Spatial Database of Planted Trees (SDPT) Versie 1.0; gebruikt nu SDPT Versie 2.0 en bijbehorende verwijderingsfactoren.\n\nEmissies zijn beschikbaar om te downloaden in twee verschillende oppervlakte-eenheden: 1) megagrammen CO2-emissies/ha, en 2) megagrammen CO2-emissies/pixel. De eerste is geschikt voor het visualiseren (in kaart brengen) van emissies omdat het de dichtheid van emissies per hectare weergeeft. De tweede is geschikt voor het berekenen van de emissies in een gebied van belang (AOI) omdat de waarden van de pixels in de AOI kunnen worden opgeteld om de totale emissies voor dat gebied te verkrijgen. De waarden in de laatste werden berekend door de emissies per hectare aan te passen aan de grootte van elke pixel, die varieert per breedtegraad. Beide datasets bevatten alleen pixels binnen bossen, zoals gedefinieerd in de methoden van Harris et al. (2021) en bijgewerkt met de toename van boombedekking tot en met 2020.",
  },
  citation: {
    label: 'Aanhaling',
    value:
      'Harris et al. (2021). Global maps of 21st century forest carbon fluxes. Accessed on 14/02/2025 from Global Forest Watch.',
  },
};
