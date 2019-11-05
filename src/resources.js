// export default {
//   "webmap": "6c64177abcc74dbc80227c09635907ef",
//   "title": "Tierras Indígenas",
//   "subtitle": "",
//   "webmapMenuName": "CAPAS",
//   "logoUrl": "https://www.tierrasindigenas.org/system/site_settings/images/000/000/614/original/tierras2.png?1510952832",
//   "logoLinkUrl": "https://www.tierrasindigenas.org",
//   "printServiceUrl": "https://gis.forest-atlas.org/server/rest/services/print/ExportWebMap/GPServer/Export%20Web%20Map",
//   "narrative": "\u003cp\u003eEl compendio de datos presentados en esta Plataforma fue colectado gracias a la colaboración de Instituciones Gubernamentales, Organizaciones no Gubernamentales, Investigadores Independientes, Comunidades y Organizaciones Indígenas. Las informaciones fueron depuradas e integradas, dicho proceso es continuo y abierto a nuevos aportes.\u003c/p\u003e",
//   "includeSubscribeButton": true,
//   "sharinghost": "https://www.arcgis.com",
//   "analyticsCode": "UA-62288390-21",
//   "iso": "PRY",
//   "language": "es",
//   "useAlternativeLanguage": false,
//   "alternativeLanguage": "en",
//   "alternativeWebmap": "",
//   "alternativeLanguageTitle": "",
//   "alternativeLanguageSubtitle": "",
//   "alternativeNarrative": "",
//   "alternativeWebmapMenuName": "Land Use",
//   "includeDocumentsTab": false,
//   "includeMeasurementTab": false,
//   "viirsFires": true,
//   "modisFires": true,
//   "intactForests": true,
//   "aboveGroundBiomass": true,
//   "landCover": true,
//   "mangroves": false,
//   "sadAlerts": false,
//   "gladAlerts": true,
//   "terraIAlerts": true,
//   "forma": true,
//   "primaryForests": true,
//   "recentImagery": true,
//   "analysisModules": [{
//       "analysisId": "TC_LOSS_GAIN",
//       "chartType": "badge",
//       "label": {
//         "en": "Total tree cover loss/ gain",
//         "fr": "Perte/gain total de la couverture arborée",
//         "es": "Pérdida/ganancia de cobertura arbórea total",
//         "pt": "Perda/ganho total de cobertura arbórea",
//         "id": "Total kehilangan/perolehan tutupan pohon",
//         "zh": "总森林覆盖减少/增加面积量",
//         "ka": "ხის ვარჯის საერთო კარგვა / მატება"
//       },
//       "title": {
//         "en": "Total tree cover loss/ gain",
//         "fr": "Perte/gain total de la couverture arborée",
//         "es": "Pérdida/ganancia de cobertura arbórea total",
//         "pt": "Perda/ganho total de cobertura arbórea",
//         "id": "Total kehilangan/perolehan tutupan pohon ",
//         "zh": "总森林覆盖减少/增加面积量",
//         "ka": "ხის ვარჯის საერთო კარგვა / მატება"
//       },
//       "description": {
//         "en": "Select range and tree cover density for loss data then click the run analysis button to see results. Gain data is currently only available for 2000 – 2012 and the gain analysis will always reflect the full 12-year time-period.",
//         "fr": "Sélectionner la plage et la densité de couverture arborée pour les données de perte, puis cliquer sur le bouton « Exécuter l’analyse » pour voir les résultats. Les données de gain ne sont actuellement disponibles que pour 2000 – 2012 et l’analyse de gain reflétera toujours la plage de 12 ans entière.",
//         "es": "Para obtener los datos sobre pérdida, seleccione el rango y la densidad de la cobertura arbórea, después haga clic en el botón ejecutar análisis para ver los resultados. Los datos sobre ganancia actualmente solo están disponibles para los años 2000 a 2012 y el análisis de la ganancia siempre reflejará el periodo de 12 años completo.",
//         "pt": "Selecione o período e a densidade de cobertura arbórea para dados de perda; em seguida, clique no botão para executar a análise e ver os resultados. Os dados de ganho estão disponíveis atualmente apenas para o período 2000 – 2012 e a análise de ganho sempre refletirá o período completo de 12 anos.",
//         "id": "Pilih rentang dan kerapatan tutupan pohon untuk data yang hilang, kemudian klik tombol mulai analisis untuk melihat hasilnya. Data perolehan saat ini hanya tersedia untuk periode 2000 – 2012 dan analisis perolehan akan selalu mencerminkan periode waktu 12 tahun penuh.",
//         "zh": "选择要考察减少量数据的范围和森林覆盖密度，然后点击“运行分析”按钮查看结果。目前仅有 2000 – 2012 年的增加量数据，增加分析始终反映这 12 年的完整情况。",
//         "ka": "შეარჩიეთ საზღვრები და ხის ვარჯის სიხშირე კარგვის მონაცემებისთვის, შემდეგ დააჭირეთ ღილაკს ანალიზის ჩატარება შედეგების სანახავად. მატების მონაცემები ამჟამად ხელმისაწვდომია 2000-2012 წლებისთვის და მატების ანალიზი ყოველთვის ასახავს სრულ 12-წლიან დროის პერიოდს."
//       },
//       "useGfwWidget": true,
//       "widgetId": "95c2c559-ca78-4b7a-b18b-7b2bca14ce83",
//       "uiParams": [{
//           "inputType": "rangeSlider",
//           "startParamName": "period",
//           "combineParams": true,
//           "valueSeparator": ",",
//           "bounds": [2001,
//             2018
//           ],
//           "valueType": "date",
//           "label": {
//             "en": "Select range for analysis:",
//             "fr": "Sélectionner une plage pour l’analyse:",
//             "es": "Seleccione un rango para el análisis:",
//             "pt": "Selecione o período para análise:",
//             "id": "Pilih rentang untuk analisis:",
//             "zh": "选择分析范围:",
//             "ka": "საზღვრების შერჩევა ანალიზისთვის:"
//           }
//         },
//         {
//           name: 'thresh',
//           inputType: 'tcd',
//           label: {
//             en: 'Select tree cover density: ',
//             fr: 'Sélectionner la densité de couverture arborée: ',
//             es: 'Seleccione la densidad de la cobertura arbórea: ',
//             pt: 'Selecione a densidade de cobertura arbórea: ',
//             id: 'Pilih kerapatan tutupan pohon: ',
//             zh: '选择森林覆盖密度: ',
//             ka: 'ხის ვარჯის სიხშირის შერჩევა: '
//           }
//         }
//       ]
//     },
//     {
//       "analysisId": "TC_LOSS",
//       "chartType": "bar",
//       "label": {
//         "en": "Annual Tree cover loss",
//         "fr": "Pertes de la couverture arborée annuelles",
//         "es": "Pérdida de cobertura arbórea anual",
//         "pt": "Perda anual de cobertura arbórea",
//         "id": "Kehilangan tutupan pohon tahunan",
//         "zh": "年度森林覆盖减少量面积",
//         "ka": "წლიური ხის ვარჯის კარგვა"
//       },
//       "title": {
//         "en": "Annual Tree cover loss",
//         "fr": "Pertes de la couverture arborée annuelles",
//         "es": "Pérdida de cobertura arbórea anual",
//         "pt": "Perda anual de cobertura arbórea",
//         "id": "Kehilangan tutupan pohon tahunan",
//         "zh": "年度森林覆盖减少量面积",
//         "ka": "წლიური ხის ვარჯის კარგვა"
//       },
//       "description": {
//         "en": "Select range and tree cover density then click the run analysis button to see results.",
//         "fr": "Sélectionner la plage et la densité de couverture arborée, puis cliquer sur le bouton « Exécuter l’analyse » pour voir les résultats.",
//         "es": "Para ver los resultados, seleccione el rango y la densidad de la cobertura arbórea, después haga clic en el botón ejecutar análisis.",
//         "pt": "Para ver os resultados, selecione o período e a densidade de cobertura arbórea; em seguida, clique no botão para executar a análise.",
//         "id": "Pilih rentang dan kerapatan tutupan pohon kemudian klik tombol mulai analisis untuk melihat hasil.",
//         "zh": "选择范围和森林覆盖密度，然后点击“运行分析”按钮查看结果。",
//         "ka": "შეარჩიეთ საზღვრები და ხის ვარჯის სიხშირე, შემდეგ დააჭირეთ ღილაკს ანალიზის ჩატარება შედეგებს სანახავად."
//       },
//       "useGfwWidget": true,
//       "widgetId": "e53e541c-92cd-4b00-9aa7-2c7bb36d4697",
//       "uiParams": [{
//           "inputType": "rangeSlider",
//           "startParamName": "period",
//           "combineParams": true,
//           "valueSeparator": ",",
//           "bounds": [2001,
//             2018
//           ],
//           "valueType": "date",
//           "label": {
//             "en": "Select range for analysis",
//             "fr": "Sélectionner une plage pour l’analyse:",
//             "es": "Seleccione un rango para el análisis:",
//             "pt": "Selecione o período para análise:",
//             "id": "Pilih rentang untuk analisis:",
//             "zh": "选择分析范围:",
//             "ka": "საზღვრების შერჩევა ანალიზისთვის:"
//           }
//         },
//         {
//           name: 'thresh',
//           inputType: 'tcd',
//           label: {
//             en: 'Select tree cover density: ',
//             fr: 'Sélectionner la densité de couverture arborée: ',
//             es: 'Seleccione la densidad de la cobertura arbórea: ',
//             pt: 'Selecione a densidade de cobertura arbórea: ',
//             id: 'Pilih kerapatan tutupan pohon: ',
//             zh: '选择森林覆盖密度: ',
//             ka: 'ხის ვარჯის სიხშირის შერჩევა: '
//           }
//         }
//       ],
//     },
//     {
//       "analysisId": "IFL",
//       "chartType": "bar",
//       "label": {
//         "en": "Annual tree cover loss in IFL",
//         "fr": "Perte annuelle de la couverture arborée en PFI",
//         "es": "Pérdida de cobertura arbórea anual en IFL",
//         "pt": "Perda anual de cobertura arbórea em IFL",
//         "id": "Kehilangan tutupan pohon tahunan di IFL",
//         "zh": "年度原生森林（IFL）覆盖减面积",
//         "ka": "ყოველწლიური ხის ვარჯის კარგვა ხტლ-ში"
//       },
//       "title": {
//         "en": "Annual Tree Cover Loss in Intact Forest Landscapes (IFL)",
//         "fr": "Perte annuelle de la couverture arborée en Paysage Forestier Intact (PFI)",
//         "es": "Pérdida de cobertura arbórea anual en Paisajes Forestales Intactos (Intact Forest Landscapes, IFL)",
//         "pt": "Perda anual de cobertura arbórea em paisagens florestais intactas (IFL)",
//         "id": "Kehilangan Tutupan Pohon Tahunan di Lanskap Hutan Utuh (IFL)",
//         "zh": "年度原生森林（IFL）树木覆盖减面积",
//         "ka": "ყოველწლიური ხის ვარჯის კარგვა ხელუხლებელი ტყის ლანდშაფტებში (ხტლ)"
//       },
//       "description": {
//         "en": "Results will not be available if the area you selected does not include IFL. Select range and tree cover density then click the run analysis button to see results.",
//         "fr": "Les résultats ne seront pas disponibles si la zone que vous avez sélectionnée n’inclut pas de PFI. Sélectionner la plage et la densité de couverture arborée, puis cliquer sur le bouton « Exécuter l’analyse » pour voir les résultats.",
//         "es": "Los resultados no estarán disponibles si el área que seleccionó no incluye IFL. Para ver los resultados, seleccione el rango y la densidad de la cobertura arbórea, después haga clic en el botón ejecutar análisis.",
//         "pt": "Os resultados não estarão disponíveis se a área selecionada não for considerada IFL. Para ver os resultados, selecione o período e a densidade de cobertura arbórea; em seguida, clique no botão para executar a análise.",
//         "id": "Hasil tidak akan tersedia jika kawasan yang Anda pilih tidak mencakup Lanskap Hutan Utuh (IFL). Pilih rentang dan kerapatan tutupan pohon kemudian klik tombol mulai analisis untuk melihat hasil.",
//         "zh": "如果您选择的区域不包括原生森林，将不会提供结果。选择范围和森林覆盖密度，然后点击“运行分析”按钮查看结果。",
//         "ka": "შედეგები არ იქნება ხელმისაწვდომი, თუკი თქვენ მიერ შერჩეული ფართობი არ შეიცავს ხტლ-ს. შეარჩიეთ საზღვრები და ხის ვარჯის სიხშირე, შემდეგ დააჭირეთ ღილაკს ანალიზის ჩატარება შედეგების სანახავად."
//       },
//       "useGfwWidget": true,
//       "widgetId": "2083a1bc-440d-43fe-8b50-ff9918a37c57",
//       params: [{
//         name: 'layer',
//         value: 'ifl2000'
//       }],
//       uiParams: [{
//           inputType: 'rangeSlider',
//           startParamName: 'period',
//           combineParams: true,
//           valueSeparator: ',',
//           bounds: [2001, 2018],
//           valueType: 'date',
//           label: {
//             en: 'Select range for analysis',
//             fr: 'Sélectionner une plage pour l’analyse:',
//             es: 'Seleccione un rango para el análisis:',
//             pt: 'Selecione o período para análise:',
//             id: 'Pilih rentang untuk analisis:',
//             zh: '选择分析范围:',
//             ka: 'საზღვრების შერჩევა ანალიზისთვის:'
//           }
//         },
//         {
//           name: 'thresh',
//           inputType: 'tcd',
//           label: {
//             en: 'Select tree cover density: ',
//             fr: 'Sélectionner la densité de couverture arborée: ',
//             es: 'Seleccione la densidad de la cobertura arbórea: ',
//             pt: 'Selecione a densidade de cobertura arbórea: ',
//             id: 'Pilih kerapatan tutupan pohon: ',
//             zh: '选择森林覆盖密度: ',
//             ka: 'ხის ვარჯის სიხშირის შერჩევა: '
//           }
//         }
//       ]
//     },
//     {
//       "analysisId": "Loss_LandCover",
//       "chartType": "bar",
//       "label": {
//         "en": "Annual tree cover loss by land cover class",
//         "fr": "Perte annuelle de la couverture arborée par catégorie de couverture terrestre",
//         "es": "Pérdida de cobertura arbórea anual por clase de cobertura de tierra",
//         "pt": "Perda anual de cobertura arbórea por classe de cobertura de terra",
//         "id": "Kehilangan tutupan pohon tahunan berdasarkan kelas tutupan lahan",
//         "zh": "年度森林覆盖减少量（按土地覆盖分类）",
//         "ka": "ყოველწლიური ხის ვარჯის კარგვა მიწის საფარის კლასის მიხედვით"
//       },
//       "title": {
//         "en": "Annual tree cover loss by land cover class",
//         "fr": "Perte annuelle de la couverture arborée par catégorie de couverture terrestre",
//         "es": "Pérdida de cobertura arbórea anual por clase de cobertura de tierra",
//         "pt": "Perda anual de cobertura arbórea por classe de cobertura de terra",
//         "id": "Kehilangan tutupan pohon tahunan berdasarkan kelas tutupan lahan",
//         "zh": "年度森林覆盖减少量（按土地覆盖分类）",
//         "ka": "ყოველწლიური ხის ვარჯის კარგვა მიწის საფარის კლასის მიხედვით"
//       },
//       "description": {
//         "en": "Land cover data from 2000 and provided by the European Space Agency (ESA) and UCLouvain. Select range and tree cover density then click the run analysis button to see results.",
//         "fr": "Données de couverture du sol datant de 2000 et fournies par l’Agence Spatiale Européenne (European Space Agency, ESA) et UCLouvain. Sélectionner la plage et la densité de couverture arborée, puis cliquer sur le bouton « Exécuter l’analyse » pour voir les résultats.",
//         "es": "Los datos de la cobertura de tierra son de 2000 y fueron proporcionados por la Agencia Espacial Europea (European Space Agency, ESA) y UCLouvain. Para ver los resultados, seleccione el rango y la densidad de la cobertura arbórea, después haga clic en el botón ejecutar análisis.",
//         "pt": "Dados de cobertura de terra relativos ao período posterior a 2000 e fornecidos pela Agência Espacial Europeia (ESA) e pela Universidade Católica da Lovaina (UCLouvain). Para ver os resultados, selecione o período e a densidade de cobertura arbórea; em seguida, clique no botão para executar a análise.",
//         "id": "Data tutupan lahan dari tahun 2000 dan disediakan oleh Badan Antariksa Eropa –(ESA) dan UCLouvain. Pilih rentang dan kerapatan tutupan pohon kemudian klik tombol mulai analisis untuk melihat hasil.",
//         "zh": "自 2000 年以来的土地覆盖数据，由欧洲空间局 (ESA) 和 UCLouvain 提供。选择范围和森林覆盖密度，然后点击“运行分析”按钮查看结果。",
//         "ka": "მიწის საფარის მონაცემები 2000 წლიდან მოწოდებულია ევროპული კოსმოსური სააგენტოს (ESA) და ლუვენის კათოლიკური უნივერსიტეტის (UCLouvain) მიერ. შეარჩიეთ საზღვრები და ხის ვარჯის სიხშირე, შემდეგ დააჭირეთ ღილაკს ანალიზის ჩატარება შედეგების სანახავად."
//       },
//       "useGfwWidget": true,
//       "widgetId": "31f78466-fc0b-42f9-a7ae-bea8559740d8",
//       "params": [{
//         "name": "layer",
//         "value": "gfw-landcover-2000"
//       }],
//       uiParams: [{
//           inputType: 'rangeSlider',
//           startParamName: 'period',
//           combineParams: true,
//           valueSeparator: ',',
//           bounds: [2001, 2018],
//           valueType: 'date',
//           label: {
//             en: 'Select range for analysis',
//             fr: 'Sélectionner une plage pour l’analyse:',
//             es: 'Seleccione un rango para el análisis:',
//             pt: 'Selecione o período para análise:',
//             id: 'Pilih rentang untuk analisis:',
//             zh: '选择分析范围:',
//             ka: 'საზღვრების შერჩევა ანალიზისთვის:'
//           }
//         },
//         {
//           name: 'thresh',
//           inputType: 'tcd',
//           label: {
//             en: 'Select tree cover density: ',
//             fr: 'Sélectionner la densité de couverture arborée: ',
//             es: 'Seleccione la densidad de la cobertura arbórea: ',
//             pt: 'Selecione a densidade de cobertura arbórea: ',
//             id: 'Pilih kerapatan tutupan pohon: ',
//             zh: '选择森林覆盖密度: ',
//             ka: 'ხის ვარჯის სიხშირის შერჩევა: '
//           }
//         }
//       ]
//     },
//     {
//       "analysisId": "BIO_LOSS",
//       "chartType": "bar",
//       "label": {
//         "en": "CO2 emissions from biomass loss",
//         "fr": "Émissions de Co2 de la perte de biomasse",
//         "es": "Emisiones de CO2 provenientes de la pérdida de biomasa",
//         "pt": "Emissões de CO₂ por perda de biomassa",
//         "id": "Emisi CO2 dari kehilangan biomassa",
//         "zh": "生物量损失导致的二氧化碳排放量",
//         "ka": "CO2 ემისია ბიომასის კარგვის გამო"
//       },
//       "title": {
//         "en": "Carbon Dioxide Emissions from Above Ground Live Woody Biomass Loss",
//         "fr": "Émissions de dioxyde de carbone de la perte de biomasse ligneuse vivante aérienne",
//         "es": "Emisiones de dióxido de carbono provenientes de la pérdida de biomasa leñosa viva en superficie",
//         "pt": "Emissões de dióxido de carbono por perda de biomassa de vegetação lenhosa viva acima do solo",
//         "id": "Emisi Karbon Dioksida dari kehilangan biomassa vegetasi berkayu di atas permukaan tanah",
//         "zh": "地上活木生物量损失导致的二氧化碳排放",
//         "ka": "ნახშირორჟანგის ემისია მიწისზედა ცოცხალი ბიომასის კარგვის გამო"
//       },
//       "description": {
//         "en": "Emissions do not include carbon emissions from other sources besides woody biomass (tree cover) loss. Select range and tree cover density then click the run analysis button to see results.",
//         "fr": "Les émissions n’incluent pas les émissions de carbone d’autres sources que la perte de biomasse (couverture arborée). Sélectionner la plage et la densité de couverture arborée, puis cliquer sur le bouton « Exécuter l’analyse » pour voir les résultats.",
//         "es": "Las emisiones no incluyen las emisiones de carbono de otras fuentes además de la pérdida de biomasa leñosa (cobertura arbórea). Para ver los resultados, seleccione el rango y la densidad de la cobertura arbórea, después haga clic en el botón ejecutar análisis.",
//         "pt": "As estimativas não incluem emissões de carbono geradas por fontes diferentes de perda (de cobertura arbórea) de biomassa de material lenhoso. Para ver os resultados, selecione o período e a densidade de cobertura arbórea; em seguida, clique no botão para executar a análise.",
//         "id": "Emisi tidak termasuk emisi karbon dari sumber lain selain kehilangan biomasa kayu (tutupan pohon). Pilih rentang dan kerapatan tutupan pohon kemudian klik tombol mulai analisis untuk melihat hasil.",
//         "zh": "排放量不包括除树木生物量（森林覆盖）损失之外的其他来源导致的碳排放量。选择范围和森林覆盖密度，然后点击“运行分析”按钮查看结果。总碳排放量 (吨 二氧化碳)",
//         "ka": "ემისიები არ შეიცავენ ნახშირის ემისიებს სხვა წყაროებიდან, გარდა ცოცხალი ბიომასის (ხის ვარჯი) კარგვის. შეარჩიეთ საზღვრები და ხის ვარჯის სიხშირე, შემდეგ დააჭირეთ ღილაკს ანალიზის ჩატარება შედეგების სანახავად."
//       },
//       "useGfwWidget": true,
//       "widgetId": "ac38fdbd-fdb1-4d8e-9109-674013fb51a2",
//       "uiParams": [{
//           "inputType": "rangeSlider",
//           "startParamName": "period",
//           "combineParams": true,
//           "valueSeparator": ",",
//           "bounds": [2001,
//             2018
//           ],
//           "valueType": "date",
//           "label": {
//             "en": "Select range for analysis",
//             "fr": "Sélectionner une plage pour l’analyse:",
//             "es": "Seleccione un rango para el análisis:",
//             "pt": "Selecione o período para análise:",
//             "id": "Pilih rentang untuk analisis:",
//             "zh": "选择分析范围:",
//             "ka": "საზღვრების შერჩევა ანალიზისთვის:"
//           }
//         },
//         {
//           name: 'thresh',
//           inputType: 'tcd',
//           label: {
//             en: 'Select tree cover density: ',
//             fr: 'Sélectionner la densité de couverture arborée: ',
//             es: 'Seleccione la densidad de la cobertura arbórea: ',
//             pt: 'Selecione a densidade de cobertura arbórea: ',
//             id: 'Pilih kerapatan tutupan pohon: ',
//             zh: '选择森林覆盖密度: ',
//             ka: 'ხის ვარჯის სიხშირის შერჩევა: '
//           }
//         }
//       ]
//     },
//     {
//       analysisId: 'GLAD_ALERTS',
//       chartType: 'line',
//       label: {
//         en: 'GLAD alerts per month',
//         fr: 'Alertes GLAD par mois',
//         es: 'Alertas GLAD por mes',
//         pt: 'Alertas GLAD por mês',
//         id: 'Peringatan GLAD per bulan',
//         zh: '每月 GLAD 预警',
//         ka: 'GLAD შეტყობინებები'
//       },
//       title: {
//         en: 'GLAD alerts per month',
//         fr: 'Alertes GLAD par mois',
//         es: 'Alertas GLAD por mes',
//         pt: 'Alertas GLAD por mês',
//         id: 'Peringatan GLAD per bulan',
//         zh: '每月 GLAD 预警',
//         ka: 'GLAD შეტყობინებები'
//       },
//       description: {
//         en: 'Count the number of GLAD tree cover loss alerts per month.',
//         fr: 'Compte le nombre d’alertes GLAD de perte de la couverture arborée par mois.',
//         es: 'Cuente el número de alertas GLAD sobre pérdida de cobertura arbórea por mes.',
//         pt: 'Quantificação de alertas GLAD de perda de cobertura arbórea por mês.',
//         id: 'Hitung jumlah peringatan kehilangan tutupan pohon GLAD per bulan.',
//         zh: 'Count the number of GLAD tree cover loss alerts per month.',
//         ka: 'Count the number of GLAD tree cover loss alerts per month.'
//       },
//       useGfwWidget: true,
//       widgetId: '0734ba0a-3a6c-4388-aa4a-5871791b1d1f',
//       uiParams: 'none'
//     },
//     {
//       analysisId: 'TOTAL_GLAD_ALERTS',
//       chartType: 'badge',
//       label: {
//         en: 'Total GLAD Alerts',
//         fr: 'Total des alertes GLAD',
//         es: 'Alertas GLAD totales',
//         pt: 'Total de alertas GLAD',
//         id: 'Total Peringatan GLAD',
//         zh: 'GLAD 预警总数',
//         ka: 'GLAD შეტყობინებები'
//       },
//       title: {
//         en: 'Total GLAD Alerts',
//         fr: 'Total des alertes GLAD',
//         es: 'Alertas GLAD totales',
//         pt: 'Total de alertas GLAD',
//         id: 'Total Peringatan GLAD',
//         zh: 'GLAD 预警总数',
//         ka: 'Total GLAD Alerts'
//       },
//       description: {
//         en: 'Count the number of GLAD alerts which occurred within the selected time range.',
//         fr: 'Compte le nombre d’alertes GLAD durant la période sélectionnée.',
//         es: 'Cuente el número de alertas GLAD que ocurrieron en el rango de tiempo seleccionado.',
//         pt: 'Quantifica o número de alertas GLAD ocorridos em um período selecionado.',
//         id: 'Hitung jumlah peringatan GLAD yang terjadi dalam rentang waktu yang dipilih.',
//         zh: '统计在所选时间范围内出现的 GLAD 预警次数。',
//         ka: 'Count the number of GLAD tree cover loss alerts per month.'
//       },
//       useGfwWidget: true,
//       widgetId: '16ff6282-8ceb-4055-938a-43726a62b205',
//       uiParams: [{
//         inputType: 'datepicker',
//         startParamName: 'period',
//         combineParams: true,
//         valueSeparator: ',',
//         multi: true,
//         defaultStartDate: '2018-01-01',
//         minDate: '2015-01-01',
//         label: {
//           en: 'Select range for analysis',
//           fr: 'Sélectionner une plage pour l’analyse',
//           es: 'Seleccione un rango para el análisis',
//           pt: 'Selecione o período para análise',
//           id: 'Pilih rentang untuk analisis',
//           zh: '选择分析范围',
//           ka: 'საზღვრების შერჩევა ანალიზისთვის'
//         }
//       }]
//     },
//     {
//       analysisId: 'VIIRS_FIRES',
//       chartType: 'badge',
//       label: {
//         en: 'VIIRS Active Fires',
//         fr: 'Feux actifs VIIRS',
//         es: 'Incendios activos VIIRS',
//         pt: 'Incêndios ativos VIIRS',
//         id: 'Kebakaran Aktif VIIRS',
//         zh: 'VIIRS 活跃火点',
//         ka: 'VIIRS აქტიური ხანძრები'
//       },
//       title: {
//         en: 'VIIRS Active Fires',
//         fr: 'Feux actifs VIIRS',
//         es: 'Incendios activos VIIRS',
//         pt: 'Incêndios ativos VIIRS',
//         id: 'Kebakaran Aktif VIIRS',
//         zh: 'VIIRS 活跃火点',
//         ka: 'VIIRS აქტიური ხანძრები'
//       },
//       description: {
//         en: 'This analysis counts the number of VIIRS fire alert detections during the past 7 days',
//         fr: 'Cette analyse compte le nombre d’alertes de détection d’incendies VIIRS durant les 7 derniers jours',
//         es: 'Este análisis cuenta el número de detecciones de alertas de incendios VIIRS durante los últimos siete días',
//         pt: 'Incêndios ativos VIIRS',
//         id: 'Analisis ini menghitung jumlah deteksi peringatan kebakaran VIIRS selama 7 hari terakhir',
//         zh: '此分析可统计过去 7 天 VIIRS 火警监测的次数。',
//         ka: 'ეს ანალიზი თვლის VIIRS ხანძრის შეტყობინებების გამოვლენის რაოდენობას ბოლო 7 დღის განმავლობაში.'
//       },
//       useGfwWidget: true,
//       widgetId: '5d696f96-e6c7-4323-8bda-4c99cd6b0cb4',
//       uiParams: 'none'
//     },
//     {
//       "analysisId": "LCC",
//       "chartType": "pie",
//       "label": {
//         "en": "Land Cover Composition",
//         "fr": "Composition de la couverture terrestre",
//         "es": "Cobertura terrestre",
//         "pt": "Cobertura do Solo",
//         "id": "Komposisi tutupan lahan",
//         "zh": "土地覆盖构成",
//         "ka": "მიწის საფარის შემადგენლობა"
//       },
//       "title": {
//         "en": "Land Cover Composition",
//         "fr": "Composition de la couverture terrestre",
//         "es": "Composición de la cobertura de tierra",
//         "pt": "Composição da cobertura de terra",
//         "id": "Komposisi tutupan lahan",
//         "zh": "土地覆盖构成",
//         "ka": "მიწის საფარის შემადგენლობა"
//       },
//       "description": {
//         "en": "Land cover data is from 2015 and provided by the European Space Agency (ESA) and UCLouvain.",
//         "fr": "Les données de la couverture terrestre datent de 2015 et sont fournies par l’Agence Spatiale Européenne (European Space Agency, ESA) et UCLouvain.",
//         "es": "Los datos de la cobertura de tierra son de 2015 y fueron proporcionados por la Agencia Espacial Europea (European Space Agency, ESA) y UCLouvain. ",
//         "pt": "Dados de cobertura de terra relativos ao período posterior a 2015 e fornecidos pela Agência Espacial Europeia (ESA) e pela UCLouvain. ",
//         "id": "Data tutupan lahan dari tahun 2015 yang disediakan oleh Badan Antariksa Eropa () dan UCLouvain.",
//         "zh": "自 2015 年以来的土地覆盖数据，由欧洲空间局 (ESA) 和 UCLouvain 提供。 ",
//         "ka": "მიწის საფარის მონაცემები 2015 წლის შემდეგაა და მოწოდებულია ევროპული კოსმოსური სააგენტოს (ESA) და ლუვენის კათოლიკური უნივერსიტეტის (UCLouvain) მიერ."
//       },
//       "useGfwWidget": true,
//       "widgetId": "1b84364d-0efd-4d60-81ef-870f7d13ee7b",
//       "uiParams": "none",
//       "params": [{
//         "name": "layer",
//         "value": "gfw-landcover-2015"
//       }]
//     }
//   ],

//   /**
//    * Layer panel configuration, anything with an = is optional, {object=}
//    * Order at the group level controls the order of the accordions, the top most accordion's layers
//    * will also be the top most layers on the map. The order in the layer level controls how those layers
//    * are organized within their own group
//    ** @name layerPanel
//    ** Both labels and sublabels are objects whose properties are ISO codes for supported languages
//    ** and values are string labels
//    * @property {object=} label - Label for the group in the layer panel
//    * @property {number} order - Order the accordions, and their layers, appear in the UI and the map, MUST START AT 1
//    * @property {object[]=} layers - Layers placed in the various accordions
//    * @property {object[]=} extraLayers - Layers not placed in the Layer panel but are on the map
//    * @property {number} layers[].order - Order of this layer in this section only
//    * @property {string} layers[].id - Must be a unique id for the layer
//    * @property {string} layers[].type - The type of the layer, valid values are currently one of the following:
//    ** tiled | webtiled | image | dynamic | feature | graphic | glad | terra
//    * @property {boolean=} layers[].visible - Default visibility of the layer, default is false
//    * @property {string} layers[].technicalName - Technical name for the GFW Metadata API
//    * @property {number=} layers[].legendLayer - Optional layer id for an extra legend
//    * @property {string} layers[].url - URL for the service
//    * @property {object=} layers[].label - Label for the layer in the UI
//    * @property {object=} layers[].sublabel - Sublabel for the layer in the UI
//    * @property {boolean=} layers[].{ANY} - Any additional layer params that need to be passed through
//    * @property {object=} popup - Popup configuration for the layer if it is available
//    */
//   layerPanel: {
//     GROUP_WEBMAP: {
//       order: 2,
//       label: {}, // Configurable via alternativeWebmapMenuName and webmapMenuName above
//       layers: [] // Will get filled in with layers from the webmap
//     },
//     "GROUP_LCD": {
//       "grouptype": "default",
//       "order": 1,
//       "label": {
//         "en": "Land Cover Dynamics",
//         "fr": "Evolution de la couverture des sols",
//         "es": "Dinámica de la Cobertura del Suelo",
//         "pt": "Dinâmica de cobertura da terra",
//         "id": "Land Cover Dynamics",
//         "zh": "土地覆盖动态数据",
//         "ka": "მიწის საფარის დინამიკა"
//       },
//       "layers": [{
//           "order": 1,
//           "id": "TREE_COVER_LOSS",
//           "type": "remoteDataLayer",
//           "uuid": "2aed67b3-3643-40d3-9c1e-8af9afb5d9e2"
//         },
//         {
//           "order": 2,
//           "type": "remoteDataLayer",
//           "id": "TREE_COVER_GAIN",
//           "uuid": "cb016f17-f12d-463a-9dc2-aabcf5db566c"
//         },
//         {
//           "order": 3,
//           "type": "remoteDataLayer",
//           "id": "IMAZON_SAD",
//           "uuid": "3e9e86ae-e38d-4c59-8484-c8214ca5186a"
//         },
//         {
//           "order": 4,
//           "id": "GLAD_ALERTS",
//           "type": "remoteDataLayer",
//           "uuid": "356f862b-3e70-493a-997b-dc2a193410e9"
//         },
//         {
//           "order": 5,
//           "id": "FORMA_ALERTS",
//           "type": "remoteDataLayer",
//           "uuid": "56aa7e57-0ac4-446c-a82d-7713904b17c3"
//         },
//         {
//           id: 'FORMA_ALERTS',
//           order: 4,
//           type: 'remoteDataLayer',
//           uuid: '56aa7e57-0ac4-446c-a82d-7713904b17c3'
//         },
//         {
//           id: 'GLAD_ALERTS',
//           order: 5,
//           type: 'remoteDataLayer',
//           uuid: '356f862b-3e70-493a-997b-dc2a193410e9'
//         }, {
//           id: 'TERRA_I_ALERTS',
//           order: 6,
//           type: 'remoteDataLayer',
//           uuid: '1fc7b0c5-259a-4685-8665-b2f1ed3f808f'
//         }, {
//           id: 'VIIRS_ACTIVE_FIRES',
//           order: 7,
//           type: 'remoteDataLayer',
//           uuid: '15cb32c9-874f-4552-afdc-8a35ef70682f'
//         }, {
//           id: 'MODIS_ACTIVE_FIRES',
//           order: 8,
//           type: 'remoteDataLayer',
//           uuid: '8ae39d34-a5e5-4742-b06e-6e913a8f1eb8'
//         }
//       ]
//     },
//     "GROUP_LC": {
//       "groupttype": "default",
//       "order": 3,
//       "label": {
//         "en": "Land Cover",
//         "fr": "Couverture des sols",
//         "es": "Cobertura terrestre",
//         "pt": "Cobertura do Solo",
//         "id": "Land Cover",
//         "zh": "土地覆盖",
//         "ka": "მიწის საფარი"
//       },
//       "layers": [{
//           "order": 1,
//           "id": "GLOB_MANGROVE",
//           "type": "remoteDataLayer",
//           "uuid": "533cbe18-22a6-46ac-99ca-027c96f33ac3"
//         },
//         {
//           "order": 2,
//           "id": "IFL",
//           "type": "remoteDataLayer",
//           "uuid": "5f815a7d-457e-4eae-a8e5-8864a60696ad"
//         },
//         {
//           "order": 3,
//           "id": "PRIMARY_FORESTS",
//           "type": "remoteDataLayer",
//           "uuid": "edffb745-e523-462d-ad1e-3052006a3dbc"
//         },
//         {
//           "order": 4,
//           "id": "AG_BIOMASS",
//           "type": "remoteDataLayer",
//           "uuid": "04526d47-f3f5-4f76-a939-e5f7861fd085"
//         },
//         {
//           "order": 5,
//           "id": "LAND_COVER",
//           "type": "remoteDataLayer",
//           "uuid": "b8d3f175-0565-443f-839a-49eb890a4b3d"
//         },
//         {
//           "order": 6,
//           "id": "TREE_COVER",
//           "type": "remoteDataLayer",
//           "uuid": "2569adca-ef87-42c4-a153-57c5e8ba0ef7"
//         }
//       ]
//     },
//     GROUP_IMAGERY: {
//       groupType: 'imagery',
//       order: 4,
//       label: {
//         en: 'Recent Imagery',
//         fr: 'Recent Imagery',
//         es: 'Recent Imagery',
//         pt: 'Recent Imagery',
//         id: 'Recent Imagery',
//         zh: 'Recent Imagery',
//         ka: 'Recent Imagery'
//       },
//       layers: [{
//         order: 1,
//         id: 'RECENT_IMAGERY',
//         type: 'imagery',
//         technicalName: 'recent_satellite_imagery',
//         visible: false,
//         label: {
//           en: 'Recent Imagery',
//           fr: 'Recent Imagery',
//           es: 'Recent Imagery',
//           pt: 'Recent Imagery',
//           id: 'Recent Imagery',
//           zh: 'Recent Imagery',
//           ka: 'Recent Imagery'
//         },
//         dynamicSublabel: {
//           en: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
//           fr: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
//           es: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
//           pt: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
//           id: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
//           zh: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
//           ka: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})'
//         }
//       }]
//     },
//     GROUP_BASEMAP: {
//       groupType: 'basemap',
//       order: 200,
//       label: {
//         en: 'Basemap',
//         fr: 'Basemap',
//         es: 'Basemap',
//         pt: 'Basemap',
//         id: 'Basemap',
//         zh: 'Basemap',
//         ka: 'საბაზო რუკა'
//       },
//       layers: [{
//         id: 'landsat',
//         thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/basemaps-sdd18a411a3-5bf18f445e58b8766f773184b7741c67.png',
//         templateUrl: 'https://d2h71bpqsyf4vw.cloudfront.net/2016/${level}/${col}/${row}.png',
//         years: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'],
//         title: {
//           en: 'Landsat',
//           fr: 'Landsat',
//           es: 'Landsat',
//           pt: 'Landsat',
//           id: 'Landsat',
//           zh: 'Landsat',
//           ka: 'Landsat'
//         }
//       }, {
//         id: 'wri_mono',
//         thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/wri_mono.png',
//         // thumbnailUrl: './css/images/wri_mono.png',
//         title: {
//           en: 'WRI Mono',
//           fr: 'WRI Mono',
//           es: 'WRI Mono',
//           pt: 'WRI Mono',
//           id: 'WRI Mono',
//           zh: 'WRI Mono',
//           ka: 'WRI Mono'
//         }
//       }, {
//         id: 'wri_contextual',
//         thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/wri_contextual.png',
//         // thumbnailUrl: './css/images/wri_contextual.png',
//         title: {
//           en: 'WRI Contextual',
//           fr: 'WRI Contextual',
//           es: 'WRI Contextual',
//           pt: 'WRI Contextual',
//           id: 'WRI Contextual',
//           zh: 'WRI Contextual',
//           ka: 'WRI Contextual'
//         }
//       }]
//     },

//     /**
//      * CUSTOM GROUPS
//      * Add your custom groups below. The custom groups are similar to the groups defined above.
//      * They are an object defined with a unique key (this key MUST be unique).
//      * There are three (3) group types that you may choose from:
//      *    checkbox - This is a standard group type with checkboxes to turn layers on and off.
//      *               With this group type, more than one layer may be on at a time
//      *
//      *    radio - This group contains raio buttons instead of checkboxes for the layer toggles
//      *            Only one layer may be on at a time within the same group
//      *            You may optionally choose to turn this group off when any other radio group is selected
//      *
//      *    nested - This group allows for layers to be grouped further within a layer panel
//      *
//      * COMMON GROUP PROPERTIES
//      * @property {string} groupType - the group type, one of checkbox, radio, nested
//      * @property {number} order - the order of the group in the layer panel
//      * @property {object} label - the label for the group in the layer panel
//      * @property {object[]} layers - the layers to be placed in the group
//      * @property {string} layers[].id - the id of the layer as generated by your AGOL webmap
//      * @property {number} layers[].order - the order of the layer within the group
//      * @property {object=} layers[].sublabel - the sublabel displayed under the layer name
//      *
//      * RADIO GROUP PROPERTIES
//      * @property {object[]} layers[].includedSublayers - for a dynamic layer, this is which
//      * sublayers you would like to include in the group. This property is required, so if you
//      * wish to include all sublayers, you must still provide this property with all sublayers
//      * @property {object} sublabel - for a dynamic layer the sublabel property must specify
//      * which sublayer the sublabel belongs to
//      *
//      * NESTED GROUP PROPERTIES
//      * @property {number} layers[].order - the order of the nested group within the panel group
//      * @property {object} layers[].label - the label for the nested group
//      * @property {object[]} layers[].nestedLayers - the layers for the nested group
//      */

//     extraLayers: [{
//         id: 'MASK',
//         type: 'dynamic',
//         order: 10000,
//         url: 'https://gis.forest-atlas.org/server/rest/services/country_masks/country_mask_global/MapServer',
//         opacity: 0.35,
//         layerIds: [0]
//       },
//       {
//         id: 'LEGEND_LAYER',
//         type: 'dynamic',
//         url: 'https://gis-gfw.wri.org/arcgis/rest/services/legends/MapServer',
//         visible: false,
//         opacity: 0,
//         layerIds: []
//       },
//       {
//         id: 'USER_FEATURES',
//         type: 'graphic',
//         visible: true
//       }
//     ]
//   }
// };

export default {
    "webmap": "1293b7494e9f41eb9219d8b98b757290",
    "title": "FLUIDS Georgia",
    "subtitle": "",
    "webmapMenuName": "მიწათსარგებლობა",
    "logoUrl": "https://geo.forest-atlas.org/system/site_settings/images/000/000/140/original/mepa.png?1530171023",
    "logoLinkUrl": "https://geo.forest-atlas.org",
    "printServiceUrl": "https://gis.mepa.gov.ge/server/rest/services/PrintService/ExportWebMap2/GPServer/Export%20Web%20Map",
    "narrative": "\u003cp\u003e ეს რუკები ასახავს ტყისა და მიწათსარგებლობის დინამიურ ცვლილებებს საქართველოს ტერიტორიაზე. რუკები მომზადდა Global Forest Watch პროექტის ფარგლებში, გარემოს დაცვისა და სოფლის მეურნეობის სამინისტროსა და მსოფლიო რესურსების ინსტიტუტის (WRI) ერთიანი ძალისხმევით, გაეროს გარემოსდაცვითი პროგრამის (UNEP) და მსოფლიო გარემოსდაცვითი ფონდის (GEF) დაფინანსებით.\u003c/p\u003e\u003cp\u003e\u003ci\u003e \u003ca href=http://www.moe.gov.ge/en/home target=_blank\u003eMEPA\u003c/a\u003e,\u003ca href=https://www.wri.org target=_blank\u003e WRI\u003c/a\u003e\u003c/i\u003e\u003c/p\u003e",
    "includeSubscribeButton": true,
    "sharinghost": "https://gis.mepa.gov.ge/portal",
    "analyticsCode": "UA-62288390-18",
    "iso": "GEO",
    "language": "ka",
    "useAlternativeLanguage": true,
    "alternativeLanguage": "en",
    "alternativeWebmap": "ad6eb30b32014a528423bfc068acebf3",
    "alternativeLanguageTitle": "FLUIDS Georgia",
    "alternativeLanguageSubtitle": "",
    "alternativeNarrative": "\u003cp\u003e These maps represent the dynamics of land and forest use/cover change in the Republic of Georgia. This has been made possible through a partnership between the Ministry of Environment Protection and Agriculture of Georgia (MEPA), supported by the World Resources Institute (WRI) in the framework of Global Forest Watch Project, funded by UNEP and GEF.\u003c/p\u003e\u003cp\u003e\u003ci\u003e \u003ca href=http://www.moe.gov.ge/en/home target=_blank\u003eMEPA\u003c/a\u003e,\u003ca href=https://www.wri.org target=_blank\u003e WRI\u003c/a\u003e\u003c/i\u003e\u003c/p\u003e",
    "alternativeWebmapMenuName": "Land Use",
    "includeDocumentsTab": true,
    "includeMeasurementTab": true,
    "viirsFires": true,
    "modisFires": true,
    "intactForests": true,
    "aboveGroundBiomass": false,
    "landCover": true,
    "mangroves": false,
    "sadAlerts": false,
    "gladAlerts": false,
    "terraIAlerts": false,
    "forma": false,
    "primaryForests": false,
    "recentImagery": false,
    "analysisModules": [{
        "analysisId": "TC_LOSS_GAIN",
        "chartType": "badge",
        "label": {
          "en": "Total tree cover loss/ gain",
          "fr": "Perte/gain total de la couverture arborée",
          "es": "Pérdida/ganancia de cobertura arbórea total",
          "pt": "Perda/ganho total de cobertura arbórea",
          "id": "Total kehilangan/perolehan tutupan pohon",
          "zh": "总森林覆盖减少/增加面积量",
          "ka": "ხის ვარჯის საერთო კარგვა / მატება"
        },
        "title": {
          "en": "Total tree cover loss/ gain",
          "fr": "Perte/gain total de la couverture arborée",
          "es": "Pérdida/ganancia de cobertura arbórea total",
          "pt": "Perda/ganho total de cobertura arbórea",
          "id": "Total kehilangan/perolehan tutupan pohon ",
          "zh": "总森林覆盖减少/增加面积量",
          "ka": "ხის ვარჯის საერთო კარგვა / მატება"
        },
        "description": {
          "en": "Select range and tree cover density for loss data then click the run analysis button to see results. Gain data is currently only available for 2000 – 2012 and the gain analysis will always reflect the full 12-year time-period.",
          "fr": "Sélectionner la plage et la densité de couverture arborée pour les données de perte, puis cliquer sur le bouton « lancer l’analyse » pour voir les résultats. Les données de gain ne sont actuellement disponibles que pour 2000 – 2012 et l’analyse de gain reflétera toujours la plage de 12 ans entière.",
          "es": "Para obtener los datos sobre pérdida, seleccione el rango y la densidad de la cobertura arbórea, después haga clic en el botón ejecutar análisis para ver los resultados. Los datos sobre ganancia actualmente solo están disponibles para los años 2000 a 2012 y el análisis de la ganancia siempre reflejará el periodo de 12 años completo.",
          "pt": "Selecione o período e a densidade de cobertura arbórea para dados de perda; em seguida, clique no botão para executar a análise e ver os resultados. Os dados de ganho estão disponíveis atualmente apenas para o período 2000 – 2012 e a análise de ganho sempre refletirá o período completo de 12 anos.",
          "id": "Pilih rentang dan kerapatan tutupan pohon untuk data yang hilang, kemudian klik tombol mulai analisis untuk melihat hasilnya. Data perolehan saat ini hanya tersedia untuk periode 2000 – 2012 dan analisis perolehan akan selalu mencerminkan periode waktu 12 tahun penuh.",
          "zh": "选择要考察减少量数据的范围和森林覆盖密度，然后点击“运行分析”按钮查看结果。目前仅有 2000 – 2012 年的增加量数据，增加分析始终反映这 12 年的完整情况。",
          "ka": "შეარჩიეთ საზღვრები და ხის ვარჯის სიხშირე კარგვის მონაცემებისთვის, შემდეგ დააჭირეთ ღილაკს ანალიზის ჩატარება შედეგების სანახავად. მატების მონაცემები ამჟამად ხელმისაწვდომია 2000-2012 წლებისთვის და მატების ანალიზი ყოველთვის ასახავს სრულ 12-წლიან დროის პერიოდს."
        },
        "useGfwWidget": true,
        "widgetId": "95c2c559-ca78-4b7a-b18b-7b2bca14ce83",
        "uiParams": [{
            "inputType": "rangeSlider",
            "startParamName": "period",
            "combineParams": true,
            "valueSeparator": ",",
            "bounds": [2001,
              2018
            ],
            "valueType": "date",
            "label": {
              "en": "Select range for analysis:",
              "fr": "Sélectionner une plage pour l’analyse:",
              "es": "Seleccione un rango para el análisis:",
              "pt": "Selecione o período para análise:",
              "id": "Pilih rentang untuk analisis:",
              "zh": "选择分析范围:",
              "ka": "საზღვრების შერჩევა ანალიზისთვის:"
            }
          },
          {
            "name": "thresh",
            "inputType": "tcd",
            "label": {
              "en": "Select tree cover density: ",
              "fr": "Sélectionner la densité de couverture arborée: ",
              "es": "Seleccione la densidad de la cobertura arbórea: ",
              "pt": "Selecione a densidade de cobertura arbórea: ",
              "id": "Pilih kerapatan tutupan pohon: ",
              "zh": "选择森林覆盖密度: ",
              "ka": "ხის ვარჯის სიხშირის შერჩევა: "
            }
          }
        ]
      },
      {
        "analysisId": "TC_LOSS",
        "chartType": "bar",
        "label": {
          "en": "Annual Tree cover loss",
          "fr": "Pertes de la couverture arborée annuelles",
          "es": "Pérdida de cobertura arbórea anual",
          "pt": "Perda anual de cobertura arbórea",
          "id": "Kehilangan tutupan pohon tahunan",
          "zh": "年度森林覆盖减少量面积",
          "ka": "წლიური ხის ვარჯის კარგვა"
        },
        "title": {
          "en": "Annual Tree cover loss",
          "fr": "Pertes de la couverture arborée annuelles",
          "es": "Pérdida de cobertura arbórea anual",
          "pt": "Perda anual de cobertura arbórea",
          "id": "Kehilangan tutupan pohon tahunan",
          "zh": "年度森林覆盖减少量面积",
          "ka": "წლიური ხის ვარჯის კარგვა"
        },
        "description": {
          "en": "Select range and tree cover density then click the run analysis button to see results.",
          "fr": "Sélectionner la plage et la densité de couverture arborée, puis cliquer sur le bouton « Lancer l’analyse » pour voir les résultats.",
          "es": "Para ver los resultados, seleccione el rango y la densidad de la cobertura arbórea, después haga clic en el botón ejecutar análisis.",
          "pt": "Para ver os resultados, selecione o período e a densidade de cobertura arbórea; em seguida, clique no botão para executar a análise.",
          "id": "Pilih rentang dan kerapatan tutupan pohon kemudian klik tombol mulai analisis untuk melihat hasil.",
          "zh": "选择范围和森林覆盖密度，然后点击“运行分析”按钮查看结果。",
          "ka": "შეარჩიეთ საზღვრები და ხის ვარჯის სიხშირე, შემდეგ დააჭირეთ ღილაკს ანალიზის ჩატარება შედეგებს სანახავად."
        },
        "useGfwWidget": true,
        "widgetId": "e53e541c-92cd-4b00-9aa7-2c7bb36d4697",
        "uiParams": [{
            "inputType": "rangeSlider",
            "startParamName": "period",
            "combineParams": true,
            "valueSeparator": ",",
            "bounds": [2001,
              2018
            ],
            "valueType": "date",
            "label": {
              "en": "Select range for analysis",
              "fr": "Sélectionner une plage pour l’analyse:",
              "es": "Seleccione un rango para el análisis:",
              "pt": "Selecione o período para análise:",
              "id": "Pilih rentang untuk analisis:",
              "zh": "选择分析范围:",
              "ka": "საზღვრების შერჩევა ანალიზისთვის:"
            }
          },
          {
            "name": "thresh",
            "inputType": "tcd",
            "label": {
              "en": "Select tree cover density: ",
              "fr": "Sélectionner la densité de couverture arborée: ",
              "es": "Seleccione la densidad de la cobertura arbórea: ",
              "pt": "Selecione a densidade de cobertura arbórea: ",
              "id": "Pilih kerapatan tutupan pohon: ",
              "zh": "选择森林覆盖密度: ",
              "ka": "ხის ვარჯის სიხშირის შერჩევა: "
            }
          }
        ]
      },
      {
        "analysisId": "IFL",
        "chartType": "bar",
        "label": {
          "en": "Annual tree cover loss in IFL",
          "fr": "Perte annuelle de la couverture arborée en PFI",
          "es": "Pérdida de cobertura arbórea anual en IFL",
          "pt": "Perda anual de cobertura arbórea em IFL",
          "id": "Kehilangan tutupan pohon tahunan di IFL",
          "zh": "年度原生森林（IFL）覆盖减面积",
          "ka": "ყოველწლიური ხის ვარჯის კარგვა ხტლ-ში"
        },
        "title": {
          "en": "Annual Tree Cover Loss in Intact Forest Landscapes (IFL)",
          "fr": "Perte annuelle de la couverture arborée en Paysage Forestier Intact (PFI)",
          "es": "Pérdida de cobertura arbórea anual en Paisajes Forestales Intactos (Intact Forest Landscapes, IFL)",
          "pt": "Perda anual de cobertura arbórea em paisagens florestais intactas (IFL)",
          "id": "Kehilangan Tutupan Pohon Tahunan di Lanskap Hutan Utuh (IFL)",
          "zh": "年度原生森林（IFL）树木覆盖减面积",
          "ka": "ყოველწლიური ხის ვარჯის კარგვა ხელუხლებელი ტყის ლანდშაფტებში (ხტლ)"
        },
        "description": {
          "en": "Results will not be available if the area you selected does not include IFL. Select range and tree cover density then click the run analysis button to see results.",
          "fr": "Les résultats ne seront pas disponibles si la zone que vous avez sélectionnée n’inclut pas de PFI. Sélectionner la plage et la densité de couverture arborée, puis cliquer sur le bouton « Lancer l’analyse » pour voir les résultats.",
          "es": "Los resultados no estarán disponibles si el área que seleccionó no incluye IFL. Para ver los resultados, seleccione el rango y la densidad de la cobertura arbórea, después haga clic en el botón ejecutar análisis.",
          "pt": "Os resultados não estarão disponíveis se a área selecionada não for considerada IFL. Para ver os resultados, selecione o período e a densidade de cobertura arbórea; em seguida, clique no botão para executar a análise.",
          "id": "Hasil tidak akan tersedia jika kawasan yang Anda pilih tidak mencakup Lanskap Hutan Utuh (IFL). Pilih rentang dan kerapatan tutupan pohon kemudian klik tombol mulai analisis untuk melihat hasil.",
          "zh": "如果您选择的区域不包括原生森林，将不会提供结果。选择范围和森林覆盖密度，然后点击“运行分析”按钮查看结果。",
          "ka": "შედეგები არ იქნება ხელმისაწვდომი, თუკი თქვენ მიერ შერჩეული ფართობი არ შეიცავს ხტლ-ს. შეარჩიეთ საზღვრები და ხის ვარჯის სიხშირე, შემდეგ დააჭირეთ ღილაკს ანალიზის ჩატარება შედეგების სანახავად."
        },
        "useGfwWidget": true,
        "widgetId": "2083a1bc-440d-43fe-8b50-ff9918a37c57",
        "params": [{
          "name": "layer",
          "value": "ifl2000"
        }],
        "uiParams": [{
            "inputType": "rangeSlider",
            "startParamName": "period",
            "combineParams": true,
            "valueSeparator": ",",
            "bounds": [2001,
              2018
            ],
            "valueType": "date",
            "label": {
              "en": "Select range for analysis",
              "fr": "Sélectionner une plage pour l’analyse:",
              "es": "Seleccione un rango para el análisis:",
              "pt": "Selecione o período para análise:",
              "id": "Pilih rentang untuk analisis:",
              "zh": "选择分析范围:",
              "ka": "საზღვრების შერჩევა ანალიზისთვის:"
            }
          },
          {
            "name": "thresh",
            "inputType": "tcd",
            "label": {
              "en": "Select tree cover density: ",
              "fr": "Sélectionner la densité de couverture arborée: ",
              "es": "Seleccione la densidad de la cobertura arbórea: ",
              "pt": "Selecione a densidade de cobertura arbórea: ",
              "id": "Pilih kerapatan tutupan pohon: ",
              "zh": "选择森林覆盖密度: ",
              "ka": "ხის ვარჯის სიხშირის შერჩევა: "
            }
          }
        ]
      },
      {
        "analysisId": "Loss_LandCover",
        "chartType": "bar",
        "label": {
          "en": "Annual tree cover loss by land cover class",
          "fr": "Perte annuelle de la couverture arborée par catégorie de couverture terrestre",
          "es": "Pérdida de cobertura arbórea anual por clase de cobertura de tierra",
          "pt": "Perda anual de cobertura arbórea por classe de cobertura de terra",
          "id": "Kehilangan tutupan pohon tahunan berdasarkan kelas tutupan lahan",
          "zh": "年度森林覆盖减少量（按土地覆盖分类）",
          "ka": "ყოველწლიური ხის ვარჯის კარგვა მიწის საფარის კლასის მიხედვით"
        },
        "title": {
          "en": "Annual tree cover loss by land cover class",
          "fr": "Perte annuelle de la couverture arborée par catégorie de couverture terrestre",
          "es": "Pérdida de cobertura arbórea anual por clase de cobertura de tierra",
          "pt": "Perda anual de cobertura arbórea por classe de cobertura de terra",
          "id": "Kehilangan tutupan pohon tahunan berdasarkan kelas tutupan lahan",
          "zh": "年度森林覆盖减少量（按土地覆盖分类）",
          "ka": "ყოველწლიური ხის ვარჯის კარგვა მიწის საფარის კლასის მიხედვით"
        },
        "description": {
          "en": "Land cover data from 2000 and provided by the European Space Agency (ESA) and UCLouvain. Select range and tree cover density then click the run analysis button to see results.",
          "fr": "Données de couverture du sol datant de 2000 et fournies par l’Agence Spatiale Européenne (European Space Agency, ESA) et UCLouvain. Sélectionner la plage et la densité de couverture arborée, puis cliquer sur le bouton « Lancer l’analyse » pour voir les résultats.",
          "es": "Los datos de la cobertura de tierra son de 2000 y fueron proporcionados por la Agencia Espacial Europea (European Space Agency, ESA) y UCLouvain. Para ver los resultados, seleccione el rango y la densidad de la cobertura arbórea, después haga clic en el botón ejecutar análisis.",
          "pt": "Dados de cobertura de terra relativos ao período posterior a 2000 e fornecidos pela Agência Espacial Europeia (ESA) e pela Universidade Católica da Lovaina (UCLouvain). Para ver os resultados, selecione o período e a densidade de cobertura arbórea; em seguida, clique no botão para executar a análise.",
          "id": "Data tutupan lahan dari tahun 2000 dan disediakan oleh Badan Antariksa Eropa –(ESA) dan UCLouvain. Pilih rentang dan kerapatan tutupan pohon kemudian klik tombol mulai analisis untuk melihat hasil.",
          "zh": "自 2000 年以来的土地覆盖数据，由欧洲空间局 (ESA) 和 UCLouvain 提供。选择范围和森林覆盖密度，然后点击“运行分析”按钮查看结果。",
          "ka": "მიწის საფარის მონაცემები 2000 წლიდან მოწოდებულია ევროპული კოსმოსური სააგენტოს (ESA) და ლუვენის კათოლიკური უნივერსიტეტის (UCLouvain) მიერ. შეარჩიეთ საზღვრები და ხის ვარჯის სიხშირე, შემდეგ დააჭირეთ ღილაკს ანალიზის ჩატარება შედეგების სანახავად."
        },
        "useGfwWidget": true,
        "widgetId": "31f78466-fc0b-42f9-a7ae-bea8559740d8",
        "params": [{
          "name": "layer",
          "value": "gfw-landcover-2000"
        }],
        "uiParams": [{
            "inputType": "rangeSlider",
            "startParamName": "period",
            "combineParams": true,
            "valueSeparator": ",",
            "bounds": [2001,
              2018
            ],
            "valueType": "date",
            "label": {
              "en": "Select range for analysis",
              "fr": "Sélectionner une plage pour l’analyse:",
              "es": "Seleccione un rango para el análisis:",
              "pt": "Selecione o período para análise:",
              "id": "Pilih rentang untuk analisis:",
              "zh": "选择分析范围:",
              "ka": "საზღვრების შერჩევა ანალიზისთვის:"
            }
          },
          {
            "name": "thresh",
            "inputType": "tcd",
            "label": {
              "en": "Select tree cover density: ",
              "fr": "Sélectionner la densité de couverture arborée: ",
              "es": "Seleccione la densidad de la cobertura arbórea: ",
              "pt": "Selecione a densidade de cobertura arbórea: ",
              "id": "Pilih kerapatan tutupan pohon: ",
              "zh": "选择森林覆盖密度: ",
              "ka": "ხის ვარჯის სიხშირის შერჩევა: "
            }
          }
        ]
      },
      {
        "analysisId": "BIO_LOSS",
        "chartType": "bar",
        "label": {
          "en": "CO2 emissions from biomass loss",
          "fr": "Émissions de Co2 de la perte de biomasse",
          "es": "Emisiones de CO2 provenientes de la pérdida de biomasa",
          "pt": "Emissões de CO₂ por perda de biomassa",
          "id": "Emisi CO2 dari kehilangan biomassa",
          "zh": "生物量损失导致的二氧化碳排放量",
          "ka": "CO2 ემისია ბიომასის კარგვის გამო"
        },
        "title": {
          "en": "Carbon Dioxide Emissions from Above Ground Live Woody Biomass Loss",
          "fr": "Émissions de dioxyde de carbone de la perte de biomasse ligneuse vivante aérienne",
          "es": "Emisiones de dióxido de carbono provenientes de la pérdida de biomasa leñosa viva en superficie",
          "pt": "Emissões de dióxido de carbono por perda de biomassa de vegetação lenhosa viva acima do solo",
          "id": "Emisi Karbon Dioksida dari kehilangan biomassa vegetasi berkayu di atas permukaan tanah",
          "zh": "地上活木生物量损失导致的二氧化碳排放",
          "ka": "ნახშირორჟანგის ემისია მიწისზედა ცოცხალი ბიომასის კარგვის გამო"
        },
        "description": {
          "en": "Emissions do not include carbon emissions from other sources besides woody biomass (tree cover) loss. Select range and tree cover density then click the run analysis button to see results.",
          "fr": "Les émissions n’incluent pas les émissions de carbone d’autres sources que la perte de biomasse (couverture arborée). Sélectionner la plage et la densité de couverture arborée, puis cliquer sur le bouton « Lancer l’analyse » pour voir les résultats.",
          "es": "Las emisiones no incluyen las emisiones de carbono de otras fuentes además de la pérdida de biomasa leñosa (cobertura arbórea). Para ver los resultados, seleccione el rango y la densidad de la cobertura arbórea, después haga clic en el botón ejecutar análisis.",
          "pt": "As estimativas não incluem emissões de carbono geradas por fontes diferentes de perda (de cobertura arbórea) de biomassa de material lenhoso. Para ver os resultados, selecione o período e a densidade de cobertura arbórea; em seguida, clique no botão para executar a análise.",
          "id": "Emisi tidak termasuk emisi karbon dari sumber lain selain kehilangan biomasa kayu (tutupan pohon). Pilih rentang dan kerapatan tutupan pohon kemudian klik tombol mulai analisis untuk melihat hasil.",
          "zh": "排放量不包括除树木生物量（森林覆盖）损失之外的其他来源导致的碳排放量。选择范围和森林覆盖密度，然后点击“运行分析”按钮查看结果。总碳排放量 (吨 二氧化碳)",
          "ka": "ემისიები არ შეიცავენ ნახშირის ემისიებს სხვა წყაროებიდან, გარდა ცოცხალი ბიომასის (ხის ვარჯი) კარგვის. შეარჩიეთ საზღვრები და ხის ვარჯის სიხშირე, შემდეგ დააჭირეთ ღილაკს ანალიზის ჩატარება შედეგების სანახავად."
        },
        "useGfwWidget": true,
        "widgetId": "ac38fdbd-fdb1-4d8e-9109-674013fb51a2",
        "uiParams": [{
            "inputType": "rangeSlider",
            "startParamName": "period",
            "combineParams": true,
            "valueSeparator": ",",
            "bounds": [2001,
              2018
            ],
            "valueType": "date",
            "label": {
              "en": "Select range for analysis",
              "fr": "Sélectionner une plage pour l’analyse:",
              "es": "Seleccione un rango para el análisis:",
              "pt": "Selecione o período para análise:",
              "id": "Pilih rentang untuk analisis:",
              "zh": "选择分析范围:",
              "ka": "საზღვრების შერჩევა ანალიზისთვის:"
            }
          },
          {
            "name": "thresh",
            "inputType": "tcd",
            "label": {
              "en": "Select tree cover density: ",
              "fr": "Sélectionner la densité de couverture arborée: ",
              "es": "Seleccione la densidad de la cobertura arbórea: ",
              "pt": "Selecione a densidade de cobertura arbórea: ",
              "id": "Pilih kerapatan tutupan pohon: ",
              "zh": "选择森林覆盖密度: ",
              "ka": "ხის ვარჯის სიხშირის შერჩევა: "
            }
          }
        ]
      },
      {
        "analysisId": "VIIRS_FIRES",
        "chartType": "badge",
        "label": {
          "en": "VIIRS Active Fires",
          "fr": "Feux actifs VIIRS",
          "es": "Incendios activos VIIRS",
          "pt": "Incêndios ativos VIIRS",
          "id": "Kebakaran Aktif VIIRS",
          "zh": "VIIRS 活跃火点",
          "ka": "VIIRS აქტიური ხანძრები"
        },
        "title": {
          "en": "VIIRS Active Fires",
          "fr": "Feux actifs VIIRS",
          "es": "Incendios activos VIIRS",
          "pt": "Incêndios ativos VIIRS",
          "id": "Kebakaran Aktif VIIRS",
          "zh": "VIIRS 活跃火点",
          "ka": "VIIRS აქტიური ხანძრები"
        },
        "description": {
          "en": "This analysis counts the number of VIIRS fire alert detections during the past 7 days",
          "fr": "Cette analyse compte le nombre d’alertes de détection d’incendies VIIRS durant les 7 derniers jours",
          "es": "Este análisis cuenta el número de detecciones de alertas de incendios VIIRS durante los últimos siete días",
          "pt": "Esta análise apresenta a quantidade de detecções de alertas de incêndio VIIRS nos últimos 7 dias",
          "id": "Analisis ini menghitung jumlah deteksi peringatan kebakaran VIIRS selama 7 hari terakhir",
          "zh": "此分析可统计过去 7 天 VIIRS 火警监测的次数。",
          "ka": "ეს ანალიზი თვლის VIIRS ხანძრის შეტყობინებების გამოვლენის რაოდენობას ბოლო 7 დღის განმავლობაში."
        },
        "useGfwWidget": true,
        "widgetId": "5d696f96-e6c7-4323-8bda-4c99cd6b0cb4",
        "uiParams": "none"
      },
      {
        "analysisId": "LCC",
        "chartType": "pie",
        "label": {
          "en": "Land Cover Composition",
          "fr": "Composition de la couverture terrestre",
          "es": "Cobertura terrestre",
          "pt": "Cobertura do Solo",
          "id": "Komposisi tutupan lahan",
          "zh": "土地覆盖构成",
          "ka": "მიწის საფარის შემადგენლობა"
        },
        "title": {
          "en": "Land Cover Composition",
          "fr": "Composition de la couverture terrestre",
          "es": "Composición de la cobertura de tierra",
          "pt": "Composição da cobertura de terra",
          "id": "Komposisi tutupan lahan",
          "zh": "土地覆盖构成",
          "ka": "მიწის საფარის შემადგენლობა"
        },
        "description": {
          "en": "Land cover data is from 2015 and provided by the European Space Agency (ESA) and UCLouvain.",
          "fr": "Les données de la couverture terrestre datent de 2015 et sont fournies par l’Agence Spatiale Européenne (European Space Agency, ESA) et UCLouvain.",
          "es": "Los datos de la cobertura de tierra son de 2015 y fueron proporcionados por la Agencia Espacial Europea (European Space Agency, ESA) y UCLouvain. ",
          "pt": "Dados de cobertura de terra relativos ao período posterior a 2015 e fornecidos pela Agência Espacial Europeia (ESA) e pela UCLouvain. ",
          "id": "Data tutupan lahan dari tahun 2015 yang disediakan oleh Badan Antariksa Eropa () dan UCLouvain.",
          "zh": "自 2015 年以来的土地覆盖数据，由欧洲空间局 (ESA) 和 UCLouvain 提供。 ",
          "ka": "მიწის საფარის მონაცემები 2015 წლის შემდეგაა და მოწოდებულია ევროპული კოსმოსური სააგენტოს (ESA) და ლუვენის კათოლიკური უნივერსიტეტის (UCLouvain) მიერ."
        },
        "useGfwWidget": true,
        "widgetId": "1b84364d-0efd-4d60-81ef-870f7d13ee7b",
        "uiParams": "none",
        "params": [{
          "name": "layer",
          "value": "gfw-landcover-2015"
        }]
      },
      {
        "analysisId": "Aspect",
        "chartType": "pie",
        "label": {
          "en": "Aspect in Forested Areas",
          "ka": "ასპექტი ტყიან ზონებში"
        },
        "title": {
          "en": "Aspect in Forested Areas",
          "ka": "ასპექტი ტყიან ზონებში"
        },
        "description": {
          "en": "Analysis only includes forested areas, and some national parks are excluded from the analysis. To view the areas included in the analysis please view the aspect in forested areas layer",
          "ka": "ანალიზი მოიცავს მარტო ტყიან ტერიტორიებს, ეროვნული პარკების ტერიტორიას არ მოიცავს. იმისათვის რომ ნახოთ თუ რა ტერიტორიებს მოიცავს ანალიზი, გთხოვთ იხილოთ ტყიანი ტერიტორიების ასპექტის ფენა"
        },
        "useGfwWidget": true,
        "widgetId": "dc01a94a-58d5-4835-9277-7244399bece3",
        "uiParams": "none"
      },
      {
        "analysisId": "Elevation",
        "chartType": "pie",
        "label": {
          "en": "Elevation in Forested Areas",
          "ka": "სიმაღლე ტყიან ზონებში"
        },
        "title": {
          "en": "Elevation in Forested Areas",
          "ka": "სიმაღლე ტყიან ზონებში"
        },
        "description": {
          "en": "Analysis only includes forested areas, and some national parks are excluded from the analysis. To view the areas included in the analysis please view the elevation in forested areas layer",
          "ka": "ანალიზი მოიცავს მარტო ტყიან ტერიტორიებს, ეროვნული პარკების ტერიტორიას არ მოიცავს. იმისათვის რომ ნახოთ თუ რა ტერიტორიებს მოიცავს ანალიზი, გთხოვთ იხილოთ ტყიანი ტერიტორიების სიმაღლის ფენა"
        },
        "useGfwWidget": true,
        "widgetId": "e776d408-73a8-4674-b578-c3fbd479a3c9",
        "uiParams": "none"
      },
      {
        "analysisId": "Slope",
        "chartType": "pie",
        "label": {
          "en": "Slope in Forested Areas",
          "ka": "დაქანება ტყიან ზონებში"
        },
        "title": {
          "en": "Slope in Forested Areas",
          "ka": "დაქანება ტყიან ზონებში"
        },
        "description": {
          "en": "Analysis only includes forested areas, and some national parks are excluded from the analysis. To view the areas included in the analysis please view the slope in forested areas layer",
          "ka": "ანალიზი მოიცავს მარტო ტყიან ტერიტორიებს, ეროვნული პარკების ტერიტორიას არ მოიცავს. იმისათვის რომ ნახოთ თუ რა ტერიტორიებს მოიცავს ანალიზი, გთხოვთ იხილოთ ტყიანი ტერიტორიების დაქანების ფენა"
        },
        "useGfwWidget": true,
        "widgetId": "814e4fd9-6b82-4482-95a2-ffb30935b577",
        "uiParams": "none"
      },
      {
        "analysisId": "Hazard",
        "chartType": "pie",
        "label": {
          "en": "Forest Hazard Risk Anaylsis",
          "ka": "ტყის საფრთხის რისკის ანალიზი"
        },
        "title": {
          "en": "Forest hazard risk anaylsis",
          "ka": "ტყის საფრთხის რისკის ანალიზი"
        },
        "description": {
          "en": "Analysis only includes forested areas, and some national parks are excluded from the analysis. To view the areas included in the analysis please view the forest hazard risk layer",
          "ka": "ანალიზი მოიცავს მარტო ტყიან ტერიტორიებს, ეროვნული პარკების ტერიტორიას არ მოიცავს. იმისათვის რომ ნახოთ თუ რა ტერიტორიებს მოიცავს ანალიზი, გთხოვთ იხილოთ ტყის საფრთხის რისკის ფენა"
        },
        "useGfwWidget": true,
        "widgetId": "f42aa3d7-d33b-4067-b2a6-5554e15092b1",
        "uiParams": "none"
      }
    ],
    "layerPanel": {
      "GROUP_WEBMAP": {
        "order": 2,
        "label": {
  
        },
        "layers": []
      },
      "GROUP_LCD": {
        "order": 1,
        "label": {
          "en": "Land Cover Dynamics",
          "ka": "მიწის საფარის დინამიკა"
        },
        "layers": [{
            "visible": true,
            "id": "TREE_COVER_LOSS",
            "order": 1,
            "type": "remoteDataLayer",
            "uuid": "2aed67b3-3643-40d3-9c1e-8af9afb5d9e2"
          },
          {
            "visible": true,
            "order": 2,
            "type": "remoteDataLayer",
            "id": "TREE_COVER_GAIN",
            "uuid": "cb016f17-f12d-463a-9dc2-aabcf5db566c"
          },
          {
            "order": 3,
            "id": "VIIRS_ACTIVE_FIRES",
            "type": "remoteDataLayer",
            "uuid": "15cb32c9-874f-4552-afdc-8a35ef70682f"
          },
          {
            "order": 4,
            "id": "MODIS_ACTIVE_FIRES",
            "type": "remoteDataLayer",
            "uuid": "8ae39d34-a5e5-4742-b06e-6e913a8f1eb8"
          },
          {
            "order": 5,
            "id": "Historicf",
            "type": "dynamic",
            "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/historical_fires/MapServer",
            "layerIds": [0],
            "label": {
              "en": "Historical Fires",
              "ka": "ისტორიული ხანძრები"
            },
            "popup": {
              "title": {
                "en": "Historical Fires",
                "ka": "ისტორიული ხანძრები"
              },
              "content": {
                "ka": [{
                    "label": "წელი",
                    "fieldExpression": "year"
                  },
                  {
                    "label": "რიცხვი",
                    "fieldExpression": "number"
                  },
                  {
                    "label": "ფართობი ჰა",
                    "fieldExpression": "Area_ha"
                  }
                ],
                "en": [{
                    "label": "Year",
                    "fieldExpression": "year"
                  },
                  {
                    "label": "Number",
                    "fieldExpression": "number"
                  },
                  {
                    "label": "Area ha",
                    "fieldExpression": "Area_ha"
                  }
                ]
              }
            }
          }
        ]
      },
      "GROUP_PA": {
        "order": 3,
        "label": {
          "en": "Protected Areas",
          "ka": "დაცული ტერიტორიები"
        },
        "layers": [{
            "order": 1,
            "id": "PAInf",
            "type": "dynamic",
            "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/protected_areas/MapServer",
            "layerIds": [0],
            "label": {
              "en": "Infrastructure of Protected Areas",
              "ka": "ინფრასტრუქტურა"
            },
            "popup": {
              "title": {
                "en": "Infrastructure of Protected Areas",
                "ka": "ინფრასტრუქტურა"
              },
              "content": {
                "ka": [{
                    "label": "დასახელება",
                    "fieldExpression": "Name_KA"
                  },
                  {
                    "label": "დაცული ტერიტორია",
                    "fieldExpression": "Protected_Areas_KA"
                  }
                ],
                "en": [{
                    "label": "Name",
                    "fieldExpression": "Name_EN"
                  },
                  {
                    "label": "Protected Area",
                    "fieldExpression": "Protected_Areas_EN"
                  }
                ]
              }
            }
          },
          {
            "order": 2,
            "id": "PARoads",
            "type": "dynamic",
            "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/protected_areas/MapServer",
            "layerIds": [1],
            "label": {
              "en": "Touristic Routes of Protected Areas",
              "ka": "ტურისტული ბილიკები"
            },
            "filterField": {
              "en": "Type_EN",
              "ka": "Type_KA"
            },
            "filterLabel": {
              "en": "Filter by Type",
              "ka": "ფილტრი ტიპის მიხედვით"
            },
            "popup": {
              "title": {
                "en": "Touristic Routes of Protected Areas",
                "ka": "ტურისტული ბილიკები"
              },
              "content": {
                "ka": [{
                    "label": "დაცული ტერიტორია",
                    "fieldExpression": "Protected_Area_KA"
                  },
                  {
                    "label": "ხანგძლივობა",
                    "fieldExpression": "Duraction_KA"
                  },
                  {
                    "label": "სირთულე",
                    "fieldExpression": "Difficulty_KA"
                  },
                  {
                    "label": "დასახელება",
                    "fieldExpression": "Trail_Name_KA"
                  },
                  {
                    "label": "ტიპი",
                    "fieldExpression": "Type_KA"
                  }
                ],
                "en": [{
                    "label": "Protected areas",
                    "fieldExpression": "Protected_Area_EN"
                  },
                  {
                    "label": "Duraction",
                    "fieldExpression": "Duraction_EN"
                  },
                  {
                    "label": "Difficulty",
                    "fieldExpression": "Difficulty_EN"
                  },
                  {
                    "label": "Trail Name",
                    "fieldExpression": "Trail_Name_EN"
                  },
                  {
                    "label": "Type",
                    "fieldExpression": "Type_EN"
                  }
                ]
              }
            }
          },
          {
            "order": 3,
            "id": "PALease",
            "type": "dynamic",
            "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/protected_areas/MapServer",
            "layerIds": [2],
            "label": {
              "en": "Lease of Protected Areas",
              "ka": "იჯარები"
            },
            "popup": {
              "title": {
                "en": "Protected Area Zoning",
                "ka": "ფუნქციური ზონები"
              },
              "content": {
                "ka": [{
                    "label": "დაცული ტერიტორია",
                    "fieldExpression": "Protected_areas_KA"
                  },
                  {
                    "label": "დანიშნულება",
                    "fieldExpression": "Purpose_KA"
                  },
                  {
                    "label": "ჰექტარი",
                    "fieldExpression": "Hectare_KA"
                  }
                ],
                "en": [{
                    "label": "Protected Area",
                    "fieldExpression": "Protected_Area_EN"
                  },
                  {
                    "label": "Purpose",
                    "fieldExpression": "Purpose_EN"
                  },
                  {
                    "label": "Area (ha)",
                    "fieldExpression": "Hectare_KA"
                  }
                ]
              }
            }
          },
          {
            "order": 4,
            "id": "PAFunction",
            "type": "dynamic",
            "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/protected_areas/MapServer",
            "layerIds": [3],
            "label": {
              "en": "Functional Zoning of Protected Areas",
              "ka": "ფუნქციური ზონები"
            },
            "filterField": {
              "en": "Zone_EN",
              "ka": "Zone_KA"
            },
            "filterLabel": {
              "en": "Filter by Zone",
              "ka": "ფილტრი ზონების მიხედვით"
            },
            "popup": {
              "title": {
                "en": "Functional Zoning of Protected Areas",
                "ka": "ფუნქციური ზონები"
              },
              "content": {
                "ka": [{
                    "label": "დაცული ტერიტორია",
                    "fieldExpression": "Protected_areas_KA"
                  },
                  {
                    "label": "ზონა",
                    "fieldExpression": "Zone_KA"
                  },
                  {
                    "label": "ფართობი ჰა",
                    "fieldExpression": "PA_Area_ha_KA"
                  }
                ],
                "en": [{
                    "label": "Protected Area",
                    "fieldExpression": "Protected_Areas_EN"
                  },
                  {
                    "label": "Zone",
                    "fieldExpression": "Zone_EN"
                  },
                  {
                    "label": "Area (ha)",
                    "fieldExpression": "PA_Area_ha_KA"
                  }
                ]
              }
            }
          },
          {
            "order": 5,
            "id": "PA",
            "type": "dynamic",
            "visible": true,
            "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/protected_areas/MapServer",
            "layerIds": [4],
            "label": {
              "en": "Protected Areas",
              "ka": "დაცული ტერიტორიები"
            },
            "filterField": {
              "en": "Category_EN",
              "ka": "Category_KA"
            },
            "filterLabel": {
              "en": "Filter by Category",
              "ka": "ფილტრი კატეგორიების მიხედვით"
            },
            "popup": {
              "title": {
                "en": "Protected Areas",
                "ka": "კატეგორიები"
              },
              "content": {
                "ka": [{
                    "label": "დაცული ტერიტორია",
                    "fieldExpression": "Protected_Areas_KA"
                  },
                  {
                    "label": "დაარსების წელი",
                    "fieldExpression": "Year_of_Establishment_KA"
                  },
                  {
                    "label": "ადმინისტრაცია",
                    "fieldExpression": "Administration_KA"
                  },
                  {
                    "label": "კატეგორია",
                    "fieldExpression": "Category_KA"
                  },
                  {
                    "label": "ფართობი ჰა",
                    "fieldExpression": "PA_Area_ha_KA"
                  }
                ],
                "en": [{
                    "label": "Protected Area Name",
                    "fieldExpression": "Protected_Areas_EN"
                  },
                  {
                    "label": "Year of Establishment",
                    "fieldExpression": "Year_of_Establishment_KA"
                  },
                  {
                    "label": "Administration",
                    "fieldExpression": "Administration_EN"
                  },
                  {
                    "label": "Category",
                    "fieldExpression": "Category_EN"
                  },
                  {
                    "label": "Area (ha)",
                    "fieldExpression": "PA_Area_ha_KA"
                  }
                ]
              }
            }
          }
        ]
      },
      "GROUP_Bio": {
        "order": 4,
        "label": {
          "en": "Biodiversity",
          "ka": "ბიომრავალფეროვნება"
        },
        "layers": [{
            "order": 1,
            "id": "Woodlands",
            "type": "dynamic",
            "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Biodiversity/MapServer",
            "layerIds": [0],
            "label": {
              "en": "EUNIS Habitats",
              "ka": "ტყის ჰაბიტატები EUNIS კლასიფიკაციით"
            },
            "popup": {
              "title": {
                "en": "EUNIS Habitats",
                "ka": "ტყის ჰაბიტატები EUNIS კლასიფიკაციით"
              },
              "content": {
                "ka": [{
                    "label": "ჰაბიტატი",
                    "fieldExpression": "Habitat_KA"
                  },
                  {
                    "label": "EUNIS კოდი",
                    "fieldExpression": "EUNIS_code_KA"
                  }
                ],
                "en": [{
                    "label": "Habitat",
                    "fieldExpression": "Habitat_EN"
                  },
                  {
                    "label": "EUNIS code",
                    "fieldExpression": "EUNIS_code_EN"
                  }
                ]
              }
            }
          },
          {
            "order": 2,
            "id": "Habitats",
            "type": "dynamic",
            "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Biodiversity/MapServer",
            "layerIds": [1],
            "label": {
              "en": " EUNIS Habitats",
              "ka": "ტყის ჰაბიტატები EUNIS კლასიფიკაციით"
            },
            "filterField": {
              "en": "Habitat_EN",
              "ka": "Habitat_KA"
            },
            "filterLabel": {
              "en": "Filter by Habitat Type",
              "ka": "ფილტრი ჰაბიტატის მიხედვით"
            },
            "popup": {
              "title": {
                "en": "EUNIS Habitats",
                "ka": "ტყის ჰაბიტატები EUNIS კლასიფიკაციით"
              },
              "content": {
                "ka": [{
                    "label": "ჰაბიტატი",
                    "fieldExpression": "Habitat_KA"
                  },
                  {
                    "label": "EUNIS კოდი",
                    "fieldExpression": "EUNIS_code_KA"
                  },
                  {
                    "label": "ფართობი ჰა",
                    "fieldExpression": "Area_ha_KA"
                  }
                ],
                "en": [{
                    "label": "Habitat",
                    "fieldExpression": "Habitat_EN"
                  },
                  {
                    "label": "EUNIS code",
                    "fieldExpression": "EUNIS_code_EN"
                  },
                  {
                    "label": "Area ha",
                    "fieldExpression": "Area_ha_EN"
                  }
                ]
              }
            }
          },
          {
            "order": 3,
            "id": "EmeraldNetwork",
            "type": "dynamic",
            "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Biodiversity/MapServer",
            "layerIds": [2],
            "label": {
              "en": "Emerald Network",
              "ka": "ზურმუხტის ქსელი"
            },
            "filterField": {
              "en": "Status_EN",
              "ka": "Status_KA"
            },
            "filterLabel": {
              "en": "Filter by status",
              "ka": "ფილტრი სტატუსის მიხედვით"
            },
            "popup": {
              "title": {
                "en": "Emerald Network",
                "ka": "ზურმუხტის ქსელი"
              },
              "content": {
                "ka": [{
                    "label": "სტატუსი",
                    "fieldExpression": "Status_KA"
                  },
                  {
                    "label": "საიტის კოდი",
                    "fieldExpression": "Sitecode_KA"
                  },
                  {
                    "label": "ფართობი ჰა",
                    "fieldExpression": "Area_ha_KA"
                  }
                ],
                "en": [{
                    "label": "Status",
                    "fieldExpression": "Status_EN"
                  },
                  {
                    "label": "Sitecode",
                    "fieldExpression": "Sitecode_KA"
                  },
                  {
                    "label": "Area ha",
                    "fieldExpression": "Area_ha_KA"
                  }
                ]
              }
            }
          },
          {
            "order": 4,
            "id": "Spa",
            "type": "dynamic",
            "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Biodiversity/MapServer",
            "layerIds": [3],
            "label": {
              "en": "Special Protected Areas for birds",
              "ka": "ფრინველთათვის განსაკუთრებული მნიშვნელობის მქონე ტერიტორიები"
            },
            "popup": {
              "title": {
                "en": "Special Protected Areas for birds",
                "ka": "ფრინველთათვის განსაკუთრებული მნიშვნელობის მქონე ტერიტორიები"
              },
              "content": {
                "ka": [{
                    "label": "სახელი",
                    "fieldExpression": "Name_KA"
                  },
                  {
                    "label": "ფართობი ჰა",
                    "fieldExpression": "Area_ha"
                  }
                ],
                "en": [{
                    "label": "Name",
                    "fieldExpression": "Name_EN"
                  },
                  {
                    "label": "Area ha",
                    "fieldExpression": "Area_ha"
                  }
                ]
              }
            }
          },
          {
            "order": 5,
            "id": "Iba",
            "type": "dynamic",
            "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Biodiversity/MapServer",
            "layerIds": [4],
            "label": {
              "en": "Important bird areas",
              "ka": "ფრინველთათვის მნიშვნელოვანი ტერიტორიები"
            },
            "popup": {
              "title": {
                "en": "Important bird areas",
                "ka": "ფრინველთათვის მნიშვნელოვანი ტერიტორიები"
              },
              "content": {
                "ka": [{
                    "label": "ქვეყანა",
                    "fieldExpression": "Country_KA"
                  },
                  {
                    "label": "სახელი",
                    "fieldExpression": "Name_KA"
                  },
                  {
                    "label": "რეგიონი",
                    "fieldExpression": "Region_KA"
                  },
                  {
                    "label": "ფართობი ჰა",
                    "fieldExpression": "Area_ha"
                  },
                  {
                    "label": "კოდი",
                    "fieldExpression": "Fincode"
                  },
                  {
                    "label": "დაცული",
                    "fieldExpression": "Protect_KA"
                  },
                  {
                    "label": "დაცული ტერ. რაოდენობა",
                    "fieldExpression": "Pas_Number"
                  },
                  {
                    "label": "სტატუსი",
                    "fieldExpression": "Iba_Status_KA"
                  },
                  {
                    "label": "დამატებულია",
                    "fieldExpression": "Added_by"
                  },
                  {
                    "label": "დამატების თარიღი",
                    "fieldExpression": "Add_Date"
                  }
                ],
                "en": [{
                    "label": "Country",
                    "fieldExpression": "Country_EN"
                  },
                  {
                    "label": "Name",
                    "fieldExpression": "Name_EN"
                  },
                  {
                    "label": "Region",
                    "fieldExpression": "Region_EN"
                  },
                  {
                    "label": "Area ha",
                    "fieldExpression": "Area_ha"
                  },
                  {
                    "label": "Fincode",
                    "fieldExpression": "Fincode"
                  },
                  {
                    "label": "Protect",
                    "fieldExpression": "Protect_EN"
                  },
                  {
                    "label": "Pas Number",
                    "fieldExpression": "Pas_Number"
                  },
                  {
                    "label": "Status",
                    "fieldExpression": "Status_EN"
                  },
                  {
                    "label": "Added by",
                    "fieldExpression": "Added_by"
                  },
                  {
                    "label": "Add Date",
                    "fieldExpression": "Add_Date"
                  }
                ]
              }
            }
          }
        ]
      },
      "GROUP_LC": {
        "order": 5,
        "label": {
          "en": "Land Cover",
          "fr": "Couverture des sols",
          "es": "Cobertura terrestre",
          "pt": "Cobertura do Solo",
          "id": "Land Cover",
          "zh": "土地覆盖",
          "ka": "მიწის საფარი"
        },
        "layers": [{
            "order": 1,
            "id": "IFL",
            "type": "remoteDataLayer",
            "uuid": "5f815a7d-457e-4eae-a8e5-8864a60696ad"
          },
          {
            "order": 2,
            "id": "LAND_COVER",
            "type": "remoteDataLayer",
            "uuid": "b8d3f175-0565-443f-839a-49eb890a4b3d"
          },
          {
            "order": 3,
            "id": "TREE_COVER",
            "type": "remoteDataLayer",
            "uuid": "2569adca-ef87-42c4-a153-57c5e8ba0ef7"
          },
          {
            "order": 4,
            "id": "Windbreak",
            "type": "dynamic",
            "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Land_Cover/MapServer/",
            "layerIds": [0],
            "label": {
              "en": "Windbreaks",
              "ka": "ქარსაცავი ზოლები"
            },
            "popup": {
              "title": {
                "en": "Windbreaks",
                "ka": "ქარსაცავი ზოლები"
              },
              "content": {
                "ka": [{
                    "label": "რეგიონი",
                    "fieldExpression": "Region_KA"
                  },
                  {
                    "label": "რეესტრი",
                    "fieldExpression": "Napr_KA"
                  },
                  {
                    "label": "მუნიციპალიტეტი",
                    "fieldExpression": "Municipality_KA"
                  },
                  {
                    "label": "მდგომარეობა",
                    "fieldExpression": "Condition_KA"
                  },
                  {
                    "label": "ძველი კორომთა გეგმა",
                    "fieldExpression": "Old__forest_stands_net_KA"
                  },
                  {
                    "label": "ფართობი ჰა",
                    "fieldExpression": "Area_ha"
                  }
                ],
                "en": [{
                    "label": "Region",
                    "fieldExpression": "Region_EN"
                  },
                  {
                    "label": "Registry",
                    "fieldExpression": "Napr_EN"
                  },
                  {
                    "label": "Municipality",
                    "fieldExpression": "Municipality_EN"
                  },
                  {
                    "label": "Condition",
                    "fieldExpression": "Condition_EN"
                  },
                  {
                    "label": "Old forest stands network",
                    "fieldExpression": "Old__forest_stands_net_EN"
                  },
                  {
                    "label": "Area ha",
                    "fieldExpression": "Area_ha"
                  }
                ]
              }
            }
          },
          {
            "order": 5,
            "id": "Deforestation",
            "type": "dynamic",
            "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/deforestation_drivers/MapServer",
            "layerIds": [0],
            "label": {
              "en": "Deforestation drivers ",
              "ka": "ტყის კარგვის მიზეზები"
            },
            "popup": {
              "title": {
                "en": "Deforestation drivers",
                "ka": "ტყის კარგვის მიზეზები"
              },
              "content": {
                "ka": [{
                    "label": "რეგიონი",
                    "fieldExpression": "Region_KA"
                  },
                  {
                    "label": "მუნიციპალიტეტი",
                    "fieldExpression": "District_KA"
                  },
                  {
                    "label": "ტყის კარგვა",
                    "fieldExpression": "Tree_cover_loss_KA"
                  },
                  {
                    "label": "დამატებითი ინფორმაცია",
                    "fieldExpression": "Additional_Information_KA"
                  },
                  {
                    "label": "ფართობი ჰა",
                    "fieldExpression": "Area_Ha"
                  }
                ],
                "en": [{
                    "label": "Region",
                    "fieldExpression": "Region_EN"
                  },
                  {
                    "label": "District",
                    "fieldExpression": "District_EN"
                  },
                  {
                    "label": "Tree cover loss",
                    "fieldExpression": "Tree_cover_loss_EN"
                  },
                  {
                    "label": "Additional Information",
                    "fieldExpression": "Additional_Information_EN"
                  },
                  {
                    "label": "Area Ha",
                    "fieldExpression": "Area_Ha"
                  }
                ]
              }
            }
          },
          {
            "order": 6,
            "id": "Forestgain",
            "type": "dynamic",
            "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Forest_gain/MapServer",
            "layerIds": [0],
            "label": {
              "en": "Forest cover gain ",
              "ka": "ტყის საფარის მატება"
            },
            "popup": {
              "title": {
                "en": "Forest cover gain",
                "ka": "ტყის საფარის მატება"
              },
              "content": {
                "ka": [{
                    "label": "რეგიონი",
                    "fieldExpression": "REGION_GEO"
                  },
                  {
                    "label": "მუნიციპალიტეტი",
                    "fieldExpression": "DISTR_GEO"
                  },
                  {
                    "label": "ტყის მატება",
                    "fieldExpression": "Tree_cover_gain"
                  },
                  {
                    "label": "დამატებითი ინფორმაცია",
                    "fieldExpression": "additional_information"
                  },
                  {
                    "label": "მხარდაჭერა",
                    "fieldExpression": "Support_by"
                  },
                  {
                    "label": "ფართობი ჰა",
                    "fieldExpression": "Area_ha"
                  }
                ],
                "en": [{
                    "label": "Region",
                    "fieldExpression": "REGION_GEO"
                  },
                  {
                    "label": "District",
                    "fieldExpression": "DISTR_GEO"
                  },
                  {
                    "label": "Forest gain",
                    "fieldExpression": "Tree_cover_gain"
                  },
                  {
                    "label": "Additional Information",
                    "fieldExpression": "additional_information"
                  },
                  {
                    "label": "Support by",
                    "fieldExpression": "Support_by"
                  },
                  {
                    "label": "Area ha",
                    "fieldExpression": "Area_ha"
                  }
                ]
              }
            }
          },
          {
            "order": 7,
            "id": "Forestfire",
            "type": "dynamic",
            "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Forest_gain/MapServer",
            "layerIds": [1],
            "label": {
              "en": "forest and field fires",
              "ka": "ტყისა და მინდვრის ხანძრები"
            },
            "popup": {
              "title": {
                "en": "forest and field fires",
                "ka": "ტყისა და მინდვრის ხანძრები"
              },
              "content": {
                "ka": [{
                    "label": "თარიღი",
                    "fieldExpression": "data_1"
                  },
                  {
                    "label": "საფარი",
                    "fieldExpression": "cover_1"
                  }
                ],
                "en": [{
                    "label": "Date",
                    "fieldExpression": "data_1"
                  },
                  {
                    "label": "Cover",
                    "fieldExpression": "cover_1"
                  }
                ]
              }
            }
          },
          {
            "order": 8,
            "id": "GEOFC",
            "opacity": 0.6,
            "type": "dynamic",
            "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Land_Cover/MapServer/",
            "layerIds": [1],
            "label": {
              "en": "Forest Cover",
              "ka": "ტყის საფარი"
            },
            "sublabel": {
              "en": "GIZ, 2015",
              "ka": "GIZ, 2015"
            }
          }
        ]
      },
      "GROUP_Hazards": {
        "order": 6,
        "groupType": "radio",
        "label": {
          "en": "Hazards",
          "ka": "საფრთხეები"
        },
        "layers": [{
            "order": 1,
            "id": "ForestHazard",
            "type": "dynamic",
            "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards/MapServer/",
            "layerIds": [0],
            "opacity": 0.75,
            "label": {
              "en": "Forest General Hazard Risk",
              "ka": "ბუნებრივი კატასტროფები ტყით დაფარულ ტერიტორიებზე"
            }
          },
          {
            "order": 2,
            "id": "Elevation",
            "type": "dynamic",
            "opacity": 0.8,
            "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards_Raster/MapServer",
            "layerIds": [1],
            "label": {
              "en": "Elevation in Forested Areas",
              "ka": "სიმაღლე ტყიან ზონებში"
            }
          },
          {
            "order": 3,
            "id": "Slope",
            "type": "dynamic",
            "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards_Raster/MapServer",
            "layerIds": [0],
            "opacity": 0.8,
            "label": {
              "en": "Slope in Forested Areas",
              "ka": "დაქანება ტყიან ზონებში"
            }
          },
          {
            "order": 4,
            "id": "Aspect",
            "type": "dynamic",
            "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards_Raster/MapServer",
            "layerIds": [2],
            "opacity": 0.8,
            "label": {
              "en": "Aspect in Forested Areas",
              "ka": "ასპექტი ტყიან ზონებში"
            }
          },
          {
            "order": 5,
            "id": "Landslide",
            "type": "dynamic",
            "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards/MapServer/",
            "layerIds": [1],
            "opacity": 0.6,
            "label": {
              "en": "Landslide Zoning",
              "ka": "ბუნებრივი კატასტროფები"
            },
            "popup": {
              "title": {
                "en": "Landslide Zoning",
                "ka": "ბუნებრივი კატასტროფები"
              },
              "content": {
                "ka": [{
                    "label": "კატეგორია",
                    "fieldExpression": "Category_KA"
                  },
                  {
                    "label": "ფართობი ჰა",
                    "fieldExpression": "Area_ha_KA"
                  }
                ],
                "en": [{
                    "label": "Category",
                    "fieldExpression": "Category_EN"
                  },
                  {
                    "label": "Area ha",
                    "fieldExpression": "Area_ha_EN"
                  }
                ]
              }
            }
          },
          {
            "order": 6,
            "id": "Debrisflow",
            "type": "dynamic",
            "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards/MapServer/",
            "layerIds": [2],
            "opacity": 0.6,
            "label": {
              "en": "Debrisflow Zoning",
              "ka": "რისკის ზონები"
            },
            "popup": {
              "title": {
                "en": "Debrisflow Zoning",
                "ka": "რისკის ზონები"
              },
              "content": {
                "ka": [{
                    "label": "კატეგორია",
                    "fieldExpression": "Category_KA"
                  },
                  {
                    "label": "ფართობი ჰა",
                    "fieldExpression": "Area_ha_KA"
                  }
                ],
                "en": [{
                    "label": "Category",
                    "fieldExpression": "Category_EN"
                  },
                  {
                    "label": "Area ha",
                    "fieldExpression": "Area_ha_EN"
                  }
                ]
              }
            }
          }
        ]
      },
      "GROUP_IMAGERY": {
        "grouptype": "imagery",
        "order": 4,
        "label": {
          "en": "Recent Imagery",
          "fr": "Imagerie récente",
          "es": "Imágenes recientes",
          "pt": "Imagens recentes",
          "id": "Citra Satelit Terbaru",
          "zh": "Recent Imagery",
          "ka": "ბოლო გამოსახულება"
        },
        "layers": [{
          "order": 1,
          "id": "RECENT_IMAGERY",
          "type": "imagery",
          "technicalName": "recent_satellite_imagery",
          "visible": false,
          "label": {
            "en": "Recent Imagery",
            "fr": "Imagerie récente",
            "es": "Imágenes recientes",
            "pt": "Imagens recentes",
            "id": "Citra Satelit Terbaru",
            "zh": "云层覆盖",
            "ka": "ბოლო გამოსახულება"
          },
          "dynamicSublabel": {
            "en": "({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})",
            "fr": "({DATE_TIME}, {CLOUD_COVERAGE}% Imagerie récente, {INSTRUMENT})",
            "es": "({DATE_TIME}, {CLOUD_COVERAGE}% Cobertura de nubes, {INSTRUMENT})",
            "pt": "({DATE_TIME}, {CLOUD_COVERAGE}% Cobertura de nuvens, {INSTRUMENT})",
            "id": "({DATE_TIME}, {CLOUD_COVERAGE}% Tutupan Awan, {INSTRUMENT})",
            "zh": "({DATE_TIME}, {CLOUD_COVERAGE}% 近期图像, {INSTRUMENT})",
            "ka": "({DATE_TIME}, {CLOUD_COVERAGE}% ღრუბლიანობა, {INSTRUMENT})"
          }
        }]
      },
      "GROUP_Orth": {
        "groupType": "nested",
        "order": 8,
        "label": {
          "en": "Orthophotos/Topographic Maps",
          "ka": "ორთოფოტოები/ტოპოგრაფიული რუკები"
        },
        "layers": [{
            "order": 1,
            "id": "ortho",
            "label": {
              "en": "Orthophotos",
              "ka": "ორთოფოტოები"
            },
            "nestedLayers": [{
                "id": "Adjara",
                "order": 1,
                "type": "webtiled",
                "url": "http://mp1.napr.gov.ge/ORTHO_2015_ADJARA/wmts/ORTHO_2015_ADJARA/GLOBAL_MERCATOR/{level}/{col}/{row}.png",
                "label": {
                  "en": "2015 Adjara",
                  "ka": "აჭარის ა/რ 2015"
                }
              },
              {
                "id": "Samegrelo",
                "order": 2,
                "type": "webtiled",
                "url": "http://mp1.napr.gov.ge/ORTHO_2015_SAMEGRELO/wmts/ORTHO_2015_SAMEGRELO/GLOBAL_MERCATOR/{level}/{col}/{row}.png",
                "label": {
                  "en": "2015 Samegrelo",
                  "ka": "სამეგრელო 2015"
                }
              },
              {
                "id": "Vere",
                "order": 3,
                "type": "webtiled",
                "url": "http://mp1.napr.gov.ge/ORTHO_2015_VERE/wmts/ORTHO_2015_VERE/GLOBAL_MERCATOR/{level}/{col}/{row}.png",
                "label": {
                  "en": "2015 Vere",
                  "ka": "ვერეს ხეობა 2015"
                }
              },
              {
                "id": "Norv",
                "order": 4,
                "type": "webtiled",
                "url": "http://mp1.napr.gov.ge/ORTHO_2016-17_NORV/wmts/ORTHO_2016-17_NORV/GLOBAL_MERCATOR/{level}/{col}/{row}.png",
                "label": {
                  "en": "2016-17 Norv",
                  "ka": "ორთოფოტო გეგმა 2016-2017"
                }
              },
              {
                "id": "Dasavleti",
                "order": 5,
                "type": "webtiled",
                "url": "http://mp1.napr.gov.ge/ORTHO_2014_DASAVLETI/wmts/ORTHO_2014_DASAVLETI/GLOBAL_MERCATOR/{level}/{col}/{row}.png",
                "label": {
                  "en": "2014 Dasavleti",
                  "ka": "დასავლეთი 2014"
                }
              }
            ]
          },
          {
            "order": 2,
            "id": "topo",
            "label": {
              "en": "Topographic Maps",
              "ka": "ტოპოგრაფიული რუკები"
            },
            "nestedLayers": [{
                "id": "Topo1000",
                "order": 1,
                "type": "webtiled",
                "url": "http://mp1.napr.gov.ge/TOPO_10k_1952_2007/wmts/TOPO_10000_1952_2007/GLOBAL_MERCATOR/{level}/{col}/{row}.png",
                "label": {
                  "en": "TOPO 10000 1952_2007",
                  "ka": "10 000 - იანი ტოპოგრაფიული რუკები 1952-2007"
                }
              },
              {
                "id": "TOPO50000",
                "order": 1,
                "type": "webtiled",
                "url": "http://mp1.napr.gov.ge/TOPO_50k_GEO_2007/wmts/TOPO_50000_GEO_2007/GLOBAL_MERCATOR/{level}/{col}/{row}.png",
                "label": {
                  "en": "TOPO 50000 GEO_2007",
                  "ka": "50 000 - იანი ტოპოგრაფიული რუკები 2007"
                }
              }
            ]
          }
        ]
      },
      "GROUP_BASEMAP": {
        "groupType": "basemap",
        "order": 9,
        "label": {
          "en": "Basemap",
          "fr": "Basemap",
          "es": "Basemap",
          "pt": "Basemap",
          "id": "Basemap",
          "zh": "Basemap",
          "ka": "საბაზო რუკა"
        },
        "layers": [{
            "id": "landsat",
            "thumbnailUrl": "https://my.gfw-mapbuilder.org/img/basemaps-sdd18a411a3-5bf18f445e58b8766f773184b7741c67.png",
            "templateUrl": "https://d2h71bpqsyf4vw.cloudfront.net/2016/${level}/${col}/${row}.png",
            "years": ["2000",
              "2001",
              "2002",
              "2003",
              "2004",
              "2005",
              "2006",
              "2007",
              "2008",
              "2009",
              "2010",
              "2011",
              "2012",
              "2013",
              "2014",
              "2015",
              "2016",
              "2017"
            ],
            "title": {
              "en": "Landsat",
              "fr": "Landsat",
              "es": "Landsat",
              "pt": "Landsat",
              "id": "Landsat",
              "zh": "Landsat",
              "ka": "Landsat"
            }
          },
          {
            "id": "wri_mono",
            "thumbnailUrl": "https://my.gfw-mapbuilder.org/img/wri_mono.png",
            "title": {
              "en": "WRI Mono",
              "fr": "WRI Mono",
              "es": "WRI Mono",
              "pt": "WRI Mono",
              "id": "WRI Mono",
              "zh": "WRI Mono",
              "ka": "WRI Mono"
            }
          },
          {
            "id": "wri_contextual",
            "thumbnailUrl": "https://my.gfw-mapbuilder.org/img/wri_contextual.png",
            "title": {
              "en": "WRI Contextual",
              "fr": "WRI Contextual",
              "es": "WRI Contextual",
              "pt": "WRI Contextual",
              "id": "WRI Contextual",
              "zh": "WRI Contextual",
              "ka": "WRI Contextual"
            }
          }
        ]
      },
      "extraLayers": [{
          "id": "MASK",
          "type": "dynamic",
          "order": 10000,
          "url": "https://gis.forest-atlas.org/server/rest/services/country_masks/country_mask_global/MapServer",
          "opacity": 0.35,
          "layerIds": [0]
        },
        {
          "id": "LEGEND_LAYER",
          "type": "dynamic",
          "url": "https://gis-gfw.wri.org/arcgis/rest/services/legends/MapServer",
          "visible": true,
          "opacity": 0,
          "layerIds": []
        },
        {
          "id": "USER_FEATURES",
          "type": "graphic",
          "visible": true
        }
      ]
    },
    "otherFieldsModules": ""
  };
  