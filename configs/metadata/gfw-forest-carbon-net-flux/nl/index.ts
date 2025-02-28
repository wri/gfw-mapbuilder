export const nl = {
  title: 'Netto koolstofflux in bossen',
  subtitle: '30 m, global, 2001-2023, Harris et al. 2021',
  download_data: 'https://data.globalforestwatch.org/datasets/94871bf57f544ea39e594feb92b06305',
  learn_more: '',
  content: [
    {
      label: 'Functie',
      value:
        'Geeft het nettoverlies van koolstof in het bosecosysteem weer, berekend als het verschil tussen de koolstofemissies van bossen door opstandvervangende bosverstoringen en koolstofverwijderingen door bosgroei',
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
      value: '2001-2023',
    },
    {
      label: 'Waarschuwingen',
      value:
        '- Gegevens zijn het product van modellering en hebben dus een inherente mate van fouten en onzekerheid. Gebruikers worden sterk aangemoedigd om de metadata en andere beschikbare documentatie te lezen en volledig te begrijpen voordat ze de gegevens gebruiken.\n- De netto flux weerspiegelt het totaal over de modelperiode 2001-2023, niet een jaarlijkse tijdreeks waaruit een trend kan worden afgeleid. Waarden moeten dus worden gedeeld door 23 om de gemiddelde jaarlijkse nettoflux te berekenen.\n- De onzekerheid is groter bij brutoverwijderingen dan bij emissies, met name als gevolg van onzekerheid in verwijderingsfactoren. Deze onzekerheden worden doorberekend naar de onzekerheid in de nettoflux.\n- Waarden zijn van toepassing op bosgebieden (bedekking van het bladerdak >30 procent en >5 m hoogte). Zie Harris et al. (2021) voor meer informatie over de bosdefinitie die in de analyse is gebruikt.\n- Emissies weerspiegelen standvervangende verstoringen zoals waargenomen in Landsat-satellietbeelden en omvatten geen emissies van niet-waargenomen bosdegradatie.\n- Activiteitsgegevens die als basis voor de schattingen zijn gebruikt, bevatten inconsistenties in de tijd:\n- Verwijderingsgegevens bevatten tijdelijke inconsistenties omdat de toename van de boombedekking een cumulatief totaal van 2000-2020 vertegenwoordigt, in plaats van de jaarlijkse winst zoals geschat tot en met 2023.\n- Verbeteringen in de detectie van verlies aan boombedekking als gevolg van de integratie van nieuwe satellietgegevens en methodologische wijzigingen tussen 2011 en 2015 kunnen leiden tot hogere schattingen van emissies in de afgelopen jaren in vergelijking met eerdere jaren. Kijk hier voor meer informatie.\n- Grote sprongen in de nettoflux langs een bepaalde grens zijn te wijten aan het gebruik van ecozone-specifieke verwijderingsfactoren. De veranderingen in de netto flux doen zich voor aan de grenzen van de ecozone, waar aan elke kant verschillende verwijderingsfactoren worden toegepast.\n- Deze dataset is bijgewerkt sinds de oorspronkelijke publicatie. Zie Overzicht voor meer informatie.',
    },
    {
      label: 'Licentie',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Overzicht',
    value:
      "Deze netto fluxlaag is onderdeel van het boskoolstoffluxmodel beschreven in Harris et al. (2021). Dit artikel introduceert een georuimtelijk monitoringkader voor het schatten van wereldwijde boskoolstoffluxen, dat verschillende actoren en organisaties kan helpen bij het volgen van broeikasgasfluxen uit bossen en bij het verminderen van emissies of het verhogen van verwijderingen door bossen. Netto boskoolstofflux vertegenwoordigt het nettoverlies van koolstof in bosecosystemen, berekend als de hoeveelheid koolstof die door bossen wordt uitgestoten en door bossen wordt verwijderd (of vastgelegd) tijdens de modelperiode. Netto koolstofflux wordt berekend door gemiddelde bruto verwijderingen af ​​te trekken van jaarlijkse bruto emissies in elke beboste pixel; negatieve waarden zijn waar bossen netto koolstofputten waren en positieve waarden zijn waar bossen netto koolstofbronnen waren tussen 2001 en 2023. Netto fluxen worden berekend volgens de IPCC-richtlijnen voor nationale broeikasgasinventarissen in elke pixel waar bossen bestonden in 2000 of werden gevestigd tussen 2000 en 2020 volgens Potapov et al. 2022. Deze laag weerspiegelt de cumulatieve netto flux tijdens de modelperiode (2001-2023) en moet worden gedeeld door 23 om de gemiddelde jaarlijkse netto flux te verkrijgen; netto fluxwaarden kunnen niet worden toegewezen aan afzonderlijke jaren van het model. Alle invoerlagen werden opnieuw bemonsterd naar een gemeenschappelijke resolutie van 0,00025 x 0,00025 graden elk om overeen te komen met Hansen et al. (2013).\n\n- Elk jaar worden het verlies aan boombedekking, de oorzaken van het verlies aan boombedekking en het verbrande gebied bijgewerkt. In 2023 en 2024 werden ook een paar invoergegevenssets en constanten van het model gewijzigd, zoals hieronder beschreven. Raadpleeg deze blogpost voor meer informatie.\n- De bron van de verhouding tussen ondergrondse koolstof en bovengrondse koolstof. Voorheen werd één globale constante gebruikt; gebruikt nu een kaart van Huang et al. 2021\n- De jaren van toename van boombedekking. Voorheen werd 2000-2012 gebruikt; gebruikt nu 2000-2020 van Potapov et al. 2022.\n- De bron van brandgegevens. Eerder gebruikte MODIS verbrand gebied; gebruikt nu verlies van boombedekking door branden van Tyukavina et al. 2022.\n- De bron van veenkaarten. Nieuwe tropische datasets zijn opgenomen en de dataset boven 40 graden noorderbreedte is gewijzigd.\n- Constanten van het aardopwarmingspotentieel (GWP) voor CH4 en N2O. Eerder gebruikte GWP's van het vijfde beoordelingsrapport van het IPCC; gebruikt nu GWP's van het zesde beoordelingsrapport van het IPCC.\n- Verwijderingsfactoren voor oudere (>20 jaar) secundaire gematigde bossen en de bijbehorende onzekerheden. Eerder gebruikte verwijderingsfactoren gepubliceerd in tabel 4.9 van de verfijning van de IPCC-richtlijnen voor nationale broeikasgasinventarissen uit 2006 uit 2019; gebruikt nu gecorrigeerde verwijderingsfactoren en onzekerheden van de 4e Corrigenda naar de verfijning van 2019 naar de IPCC-richtlijnen voor nationale broeikasgasinventarissen van 2006.\n- Geplante boomomvang en verwijderingsfactoren. Voorheen gebruikte Spatial Database of Planted Trees (SDPT) versie 1.0; gebruikt nu SDPT versie 2.0 en bijbehorende verwijderingsfactoren.\n\nNetto flux is beschikbaar om te downloaden in twee verschillende oppervlakte-eenheden gedurende de modelduur: 1) megagrammen CO2-uitstoot/ha en 2) megagrammen CO2-uitstoot/pixel. De eerste is geschikt voor het visualiseren (in kaart brengen) van netto flux omdat het de dichtheid van koolstoffluxen per hectare weergeeft. De tweede is geschikt voor het berekenen van de netto flux in een interessegebied (AOI) omdat de waarden van de pixels in de AOI kunnen worden opgeteld om de totale koolstofflux voor dat gebied te verkrijgen. De waarden in de laatste werden berekend door de netto flux per hectare aan te passen aan de grootte van elke pixel, die varieert per breedtegraad. Bij het schatten van de netto flux die optreedt over een bepaald aantal jaren tussen 2001 en 2023, deelt u de waarden door de modelduur en vermenigvuldigt u deze vervolgens met het aantal jaren in de periode van interesse. Beide datasets bevatten alleen pixels binnen bossen, zoals gedefinieerd in de methoden van Harris et al. (2021) en bijgewerkt met de toename van boombedekking tot en met 2020.",
  },
  citation: {
    label: 'Aanhaling',
    value:
      'Harris et al. (2021). Global maps of 21st century forest carbon fluxes. Accessed on 14/02/2025 from Global Forest Watch.',
  },
};
