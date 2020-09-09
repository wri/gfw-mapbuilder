export default {
  webmap: '8892b20e94244843b8e46d71ea1b03f2 ',
  title: 'Atlas Forestier du Cameroun',
  subtitle: 'Ministère des Forêts et de la Faune',
  webmapMenuName: 'Affectation des Terres',
  // initialExtent: {"x": -91.7,"y": 16.6,"z": 9},
  hideLegend: false,
  logoUrl:
    'https://cmr.forest-atlas.org/system/site_settings/images/000/000/094/original/CAMEROON.png?1487267590',
  logoLinkUrl: 'http://www.minfof.cm/',
  printServiceUrl:
    'https://gis.forest-atlas.org/server/rest/services/cmr/ExportWebMap/GPServer/Export%20Web%20Map',
  narrative:
    "\u003cp\u003eCe thème présente la situation générale de l'affectation des terres au Cameroun. Sont représentés : les permis minier (d'exploitation et de recherche), les zones d'intérêt cynégétique, les ventes de coupe, les forêts de production (UFA et forêt communale), les forêts communautaires, les aires protégées, les réserves forestières et les plantations agro industrielle.\u003cbr\u003e\u003c/p\u003e",
  includeSubscribeButton: true,
  useWebmapBasemap: false,
  sharinghost: 'https://www.arcgis.com',
  analyticsCode: 'UA-62288390-1',
  iso: 'CMR',
  customColorTheme: '#ff8000',
  aboutLinkUrl: 'https://www.blueraster.com',
  downloadLinkUrl: 'https://www.blueraster.com',
  language: 'fr',
  useAlternativeLanguage: true,
  alternativeLanguage: 'en',
  alternativeWebmap: '3ab4c186c87b44d8bf2520609fba783e',
  alternativeLanguageTitle: 'Forest Atlas of Cameroon',
  alternativeLanguageSubtitle: 'Ministry of Forest and Wildlife',
  mapThemeIds:
    '1c38ba1095fe49e3ba234bf9105c1077;c76d788b7487476bae4d09a4e933be19',
  mapThemes: ' Forest Atlas of Cameroon;Forest Atlas of Equatorial Guinea',
  alternativeMapThemes: 'Alt name 1; Alt name 2',
  alternativeNarrative:
    '\u003cp\u003eThis map show the general land use allocation in Cameroon. It includes mining permits, hunting zones, various forest titles as well as agro-industrial plantations.\u003cbr\u003e\u003c/p\u003e',
  alternativeWebmapMenuName: 'Land Use',
  includeDocumentsTab: true,
  viirsFires: true,
  modisFires: true,
  intactForests: true,
  aboveGroundBiomass: true,
  landCover: true,
  mangroves: false,
  sadAlerts: false,
  gladAlerts: true,
  gladAlertDates: {
    startDate: '',
    endDate: '' //YYYY-MM-DD
  },
  primaryForests: true,
  recentImagery: true,
  footerLinks: [
    {
      label: 'WRI Privacy Policy',
      link: 'https://www.wri.org/about/privacy-policy'
    },
    {
      label: 'GFW Terms of Service',
      link: 'https://www.globalforestwatch.org/terms'
    }
  ],
  analysisModules: [
    {
      analysisId: 'TC_LOSS_GAIN',
      chartType: 'badge',
      label: {
        en: 'Total tree cover loss/ gain',
        fr: 'Perte/gain total de la couverture arborée',
        es: 'Pérdida/ganancia de cobertura arbórea total',
        pt: 'Perda/ganho total de cobertura arbórea',
        id: 'Total kehilangan/perolehan tutupan pohon',
        zh: '总森林覆盖减少/增加面积量',
        ka: 'ხის ვარჯის საერთო კარგვა / მატება'
      },
      title: {
        en: 'Total tree cover loss/ gain',
        fr: 'Perte/gain total de la couverture arborée',
        es: 'Pérdida/ganancia de cobertura arbórea total',
        pt: 'Perda/ganho total de cobertura arbórea',
        id: 'Total kehilangan/perolehan tutupan pohon ',
        zh: '总森林覆盖减少/增加面积量',
        ka: 'ხის ვარჯის საერთო კარგვა / მატება'
      },
      description: {
        en:
          'Select range and tree cover density for loss data then click the run analysis button to see results. Gain data is currently only available for 2000 – 2012 and the gain analysis will always reflect the full 12-year time-period.',
        fr:
          'Sélectionner la plage et la densité de couverture arborée pour les données de perte, puis cliquer sur le bouton « lancer l’analyse » pour voir les résultats. Les données de gain ne sont actuellement disponibles que pour 2000 – 2012 et l’analyse de gain reflétera toujours la plage de 12 ans entière.',
        es:
          'Para obtener los datos sobre pérdida, seleccione el rango y la densidad de la cobertura arbórea, después haga clic en el botón ejecutar análisis para ver los resultados. Los datos sobre ganancia actualmente solo están disponibles para los años 2000 a 2012 y el análisis de la ganancia siempre reflejará el periodo de 12 años completo.',
        pt:
          'Selecione o período e a densidade de cobertura arbórea para dados de perda; em seguida, clique no botão para executar a análise e ver os resultados. Os dados de ganho estão disponíveis atualmente apenas para o período 2000 – 2012 e a análise de ganho sempre refletirá o período completo de 12 anos.',
        id:
          'Pilih rentang dan kerapatan tutupan pohon untuk data yang hilang, kemudian klik tombol mulai analisis untuk melihat hasilnya. Data perolehan saat ini hanya tersedia untuk periode 2000 – 2012 dan analisis perolehan akan selalu mencerminkan periode waktu 12 tahun penuh.',
        zh:
          '选择要考察减少量数据的范围和森林覆盖密度，然后点击“运行分析”按钮查看结果。目前仅有 2000 – 2012 年的增加量数据，增加分析始终反映这 12 年的完整情况。',
        ka:
          'შეარჩიეთ საზღვრები და ხის ვარჯის სიხშირე კარგვის მონაცემებისთვის, შემდეგ დააჭირეთ ღილაკს ანალიზის ჩატარება შედეგების სანახავად. მატების მონაცემები ამჟამად ხელმისაწვდომია 2000-2012 წლებისთვის და მატების ანალიზი ყოველთვის ასახავს სრულ 12-წლიან დროის პერიოდს.'
      },
      useGfwWidget: true,
      widgetId: '95c2c559-ca78-4b7a-b18b-7b2bca14ce83',
      uiParams: [
        {
          inputType: 'rangeSlider',
          startParamName: 'period',
          combineParams: true,
          valueSeparator: ',',
          bounds: [2001, 2018],
          valueType: 'date',
          label: {
            en: 'Select range for analysis:',
            fr: 'Sélectionner une plage pour l’analyse:',
            es: 'Seleccione un rango para el análisis:',
            pt: 'Selecione o período para análise:',
            id: 'Pilih rentang untuk analisis:',
            zh: '选择分析范围:',
            ka: 'საზღვრების შერჩევა ანალიზისთვის:'
          }
        },
        {
          name: 'thresh',
          inputType: 'tcd',
          label: {
            en: 'Select tree cover density: ',
            fr: 'Sélectionner la densité de couverture arborée: ',
            es: 'Seleccione la densidad de la cobertura arbórea: ',
            pt: 'Selecione a densidade de cobertura arbórea: ',
            id: 'Pilih kerapatan tutupan pohon: ',
            zh: '选择森林覆盖密度: ',
            ka: 'ხის ვარჯის სიხშირის შერჩევა: '
          }
        }
      ]
    },
    {
      analysisId: 'TC_LOSS',
      chartType: 'bar',
      label: {
        en: 'Annual Tree cover loss',
        fr: 'Pertes de la couverture arborée annuelles',
        es: 'Pérdida de cobertura arbórea anual',
        pt: 'Perda anual de cobertura arbórea',
        id: 'Kehilangan tutupan pohon tahunan',
        zh: '年度森林覆盖减少量面积',
        ka: 'წლიური ხის ვარჯის კარგვა'
      },
      title: {
        en: 'Annual Tree cover loss',
        fr: 'Pertes de la couverture arborée annuelles',
        es: 'Pérdida de cobertura arbórea anual',
        pt: 'Perda anual de cobertura arbórea',
        id: 'Kehilangan tutupan pohon tahunan',
        zh: '年度森林覆盖减少量面积',
        ka: 'წლიური ხის ვარჯის კარგვა'
      },
      description: {
        en:
          'Select range and tree cover density then click the run analysis button to see results.',
        fr:
          'Sélectionner la plage et la densité de couverture arborée, puis cliquer sur le bouton « Lancer l’analyse » pour voir les résultats.',
        es:
          'Para ver los resultados, seleccione el rango y la densidad de la cobertura arbórea, después haga clic en el botón ejecutar análisis.',
        pt:
          'Para ver os resultados, selecione o período e a densidade de cobertura arbórea; em seguida, clique no botão para executar a análise.',
        id:
          'Pilih rentang dan kerapatan tutupan pohon kemudian klik tombol mulai analisis untuk melihat hasil.',
        zh: '选择范围和森林覆盖密度，然后点击“运行分析”按钮查看结果。',
        ka:
          'შეარჩიეთ საზღვრები და ხის ვარჯის სიხშირე, შემდეგ დააჭირეთ ღილაკს ანალიზის ჩატარება შედეგებს სანახავად.'
      },
      useGfwWidget: true,
      widgetId: 'e53e541c-92cd-4b00-9aa7-2c7bb36d4697',
      uiParams: [
        {
          inputType: 'rangeSlider',
          startParamName: 'period',
          combineParams: true,
          valueSeparator: ',',
          bounds: [2001, 2018],
          valueType: 'date',
          label: {
            en: 'Select range for analysis',
            fr: 'Sélectionner une plage pour l’analyse:',
            es: 'Seleccione un rango para el análisis:',
            pt: 'Selecione o período para análise:',
            id: 'Pilih rentang untuk analisis:',
            zh: '选择分析范围:',
            ka: 'საზღვრების შერჩევა ანალიზისთვის:'
          }
        },
        {
          name: 'thresh',
          inputType: 'tcd',
          label: {
            en: 'Select tree cover density: ',
            fr: 'Sélectionner la densité de couverture arborée: ',
            es: 'Seleccione la densidad de la cobertura arbórea: ',
            pt: 'Selecione a densidade de cobertura arbórea: ',
            id: 'Pilih kerapatan tutupan pohon: ',
            zh: '选择森林覆盖密度: ',
            ka: 'ხის ვარჯის სიხშირის შერჩევა: '
          }
        }
      ]
    },
    {
      analysisId: 'IFL',
      chartType: 'bar',
      label: {
        en: 'Annual tree cover loss in IFL',
        fr: 'Perte annuelle de la couverture arborée en PFI',
        es: 'Pérdida de cobertura arbórea anual en IFL',
        pt: 'Perda anual de cobertura arbórea em IFL',
        id: 'Kehilangan tutupan pohon tahunan di IFL',
        zh: '年度原生森林（IFL）覆盖减面积',
        ka: 'ყოველწლიური ხის ვარჯის კარგვა ხტლ-ში'
      },
      title: {
        en: 'Annual Tree Cover Loss in Intact Forest Landscapes (IFL)',
        fr:
          'Perte annuelle de la couverture arborée en Paysage Forestier Intact (PFI)',
        es:
          'Pérdida de cobertura arbórea anual en Paisajes Forestales Intactos (Intact Forest Landscapes, IFL)',
        pt:
          'Perda anual de cobertura arbórea em paisagens florestais intactas (IFL)',
        id: 'Kehilangan Tutupan Pohon Tahunan di Lanskap Hutan Utuh (IFL)',
        zh: '年度原生森林（IFL）树木覆盖减面积',
        ka: 'ყოველწლიური ხის ვარჯის კარგვა ხელუხლებელი ტყის ლანდშაფტებში (ხტლ)'
      },
      description: {
        en:
          'Results will not be available if the area you selected does not include IFL. Select range and tree cover density then click the run analysis button to see results.',
        fr:
          'Les résultats ne seront pas disponibles si la zone que vous avez sélectionnée n’inclut pas de PFI. Sélectionner la plage et la densité de couverture arborée, puis cliquer sur le bouton « Lancer l’analyse » pour voir les résultats.',
        es:
          'Los resultados no estarán disponibles si el área que seleccionó no incluye IFL. Para ver los resultados, seleccione el rango y la densidad de la cobertura arbórea, después haga clic en el botón ejecutar análisis.',
        pt:
          'Os resultados não estarão disponíveis se a área selecionada não for considerada IFL. Para ver os resultados, selecione o período e a densidade de cobertura arbórea; em seguida, clique no botão para executar a análise.',
        id:
          'Hasil tidak akan tersedia jika kawasan yang Anda pilih tidak mencakup Lanskap Hutan Utuh (IFL). Pilih rentang dan kerapatan tutupan pohon kemudian klik tombol mulai analisis untuk melihat hasil.',
        zh:
          '如果您选择的区域不包括原生森林，将不会提供结果。选择范围和森林覆盖密度，然后点击“运行分析”按钮查看结果。',
        ka:
          'შედეგები არ იქნება ხელმისაწვდომი, თუკი თქვენ მიერ შერჩეული ფართობი არ შეიცავს ხტლ-ს. შეარჩიეთ საზღვრები და ხის ვარჯის სიხშირე, შემდეგ დააჭირეთ ღილაკს ანალიზის ჩატარება შედეგების სანახავად.'
      },
      useGfwWidget: true,
      widgetId: '2083a1bc-440d-43fe-8b50-ff9918a37c57',
      params: [
        {
          name: 'layer',
          value: 'ifl2000'
        }
      ],
      uiParams: [
        {
          inputType: 'rangeSlider',
          startParamName: 'period',
          combineParams: true,
          valueSeparator: ',',
          bounds: [2001, 2018],
          valueType: 'date',
          label: {
            en: 'Select range for analysis',
            fr: 'Sélectionner une plage pour l’analyse:',
            es: 'Seleccione un rango para el análisis:',
            pt: 'Selecione o período para análise:',
            id: 'Pilih rentang untuk analisis:',
            zh: '选择分析范围:',
            ka: 'საზღვრების შერჩევა ანალიზისთვის:'
          }
        },
        {
          name: 'thresh',
          inputType: 'tcd',
          label: {
            en: 'Select tree cover density: ',
            fr: 'Sélectionner la densité de couverture arborée: ',
            es: 'Seleccione la densidad de la cobertura arbórea: ',
            pt: 'Selecione a densidade de cobertura arbórea: ',
            id: 'Pilih kerapatan tutupan pohon: ',
            zh: '选择森林覆盖密度: ',
            ka: 'ხის ვარჯის სიხშირის შერჩევა: '
          }
        }
      ]
    },
    {
      analysisId: 'Loss_LandCover',
      chartType: 'bar',
      label: {
        en: 'Annual tree cover loss by land cover class',
        fr:
          'Perte annuelle de la couverture arborée par catégorie de couverture terrestre',
        es:
          'Pérdida de cobertura arbórea anual por clase de cobertura de tierra',
        pt: 'Perda anual de cobertura arbórea por classe de cobertura de terra',
        id: 'Kehilangan tutupan pohon tahunan berdasarkan kelas tutupan lahan',
        zh: '年度森林覆盖减少量（按土地覆盖分类）',
        ka: 'ყოველწლიური ხის ვარჯის კარგვა მიწის საფარის კლასის მიხედვით'
      },
      title: {
        en: 'Annual tree cover loss by land cover class',
        fr:
          'Perte annuelle de la couverture arborée par catégorie de couverture terrestre',
        es:
          'Pérdida de cobertura arbórea anual por clase de cobertura de tierra',
        pt: 'Perda anual de cobertura arbórea por classe de cobertura de terra',
        id: 'Kehilangan tutupan pohon tahunan berdasarkan kelas tutupan lahan',
        zh: '年度森林覆盖减少量（按土地覆盖分类）',
        ka: 'ყოველწლიური ხის ვარჯის კარგვა მიწის საფარის კლასის მიხედვით'
      },
      description: {
        en:
          'Land cover data from 2000 and provided by the European Space Agency (ESA) and UCLouvain. Select range and tree cover density then click the run analysis button to see results.',
        fr:
          'Données de couverture du sol datant de 2000 et fournies par l’Agence Spatiale Européenne (European Space Agency, ESA) et UCLouvain. Sélectionner la plage et la densité de couverture arborée, puis cliquer sur le bouton « Lancer l’analyse » pour voir les résultats.',
        es:
          'Los datos de la cobertura de tierra son de 2000 y fueron proporcionados por la Agencia Espacial Europea (European Space Agency, ESA) y UCLouvain. Para ver los resultados, seleccione el rango y la densidad de la cobertura arbórea, después haga clic en el botón ejecutar análisis.',
        pt:
          'Dados de cobertura de terra relativos ao período posterior a 2000 e fornecidos pela Agência Espacial Europeia (ESA) e pela Universidade Católica da Lovaina (UCLouvain). Para ver os resultados, selecione o período e a densidade de cobertura arbórea; em seguida, clique no botão para executar a análise.',
        id:
          'Data tutupan lahan dari tahun 2000 dan disediakan oleh Badan Antariksa Eropa –(ESA) dan UCLouvain. Pilih rentang dan kerapatan tutupan pohon kemudian klik tombol mulai analisis untuk melihat hasil.',
        zh:
          '自 2000 年以来的土地覆盖数据，由欧洲空间局 (ESA) 和 UCLouvain 提供。选择范围和森林覆盖密度，然后点击“运行分析”按钮查看结果。',
        ka:
          'მიწის საფარის მონაცემები 2000 წლიდან მოწოდებულია ევროპული კოსმოსური სააგენტოს (ESA) და ლუვენის კათოლიკური უნივერსიტეტის (UCLouvain) მიერ. შეარჩიეთ საზღვრები და ხის ვარჯის სიხშირე, შემდეგ დააჭირეთ ღილაკს ანალიზის ჩატარება შედეგების სანახავად.'
      },
      useGfwWidget: true,
      widgetId: '31f78466-fc0b-42f9-a7ae-bea8559740d8',
      params: [
        {
          name: 'layer',
          value: 'gfw-landcover-2000'
        }
      ],
      uiParams: [
        {
          inputType: 'rangeSlider',
          startParamName: 'period',
          combineParams: true,
          valueSeparator: ',',
          bounds: [2001, 2018],
          valueType: 'date',
          label: {
            en: 'Select range for analysis',
            fr: 'Sélectionner une plage pour l’analyse:',
            es: 'Seleccione un rango para el análisis:',
            pt: 'Selecione o período para análise:',
            id: 'Pilih rentang untuk analisis:',
            zh: '选择分析范围:',
            ka: 'საზღვრების შერჩევა ანალიზისთვის:'
          }
        },
        {
          name: 'thresh',
          inputType: 'tcd',
          label: {
            en: 'Select tree cover density: ',
            fr: 'Sélectionner la densité de couverture arborée: ',
            es: 'Seleccione la densidad de la cobertura arbórea: ',
            pt: 'Selecione a densidade de cobertura arbórea: ',
            id: 'Pilih kerapatan tutupan pohon: ',
            zh: '选择森林覆盖密度: ',
            ka: 'ხის ვარჯის სიხშირის შერჩევა: '
          }
        }
      ]
    },
    {
      analysisId: 'BIO_LOSS',
      chartType: 'bar',
      label: {
        en: 'CO2 emissions from biomass loss',
        fr: 'Émissions de Co2 de la perte de biomasse',
        es: 'Emisiones de CO2 provenientes de la pérdida de biomasa',
        pt: 'Emissões de CO₂ por perda de biomassa',
        id: 'Emisi CO2 dari kehilangan biomassa',
        zh: '生物量损失导致的二氧化碳排放量',
        ka: 'CO2 ემისია ბიომასის კარგვის გამო'
      },
      title: {
        en:
          'Carbon Dioxide Emissions from Above Ground Live Woody Biomass Loss',
        fr:
          'Émissions de dioxyde de carbone de la perte de biomasse ligneuse vivante aérienne',
        es:
          'Emisiones de dióxido de carbono provenientes de la pérdida de biomasa leñosa viva en superficie',
        pt:
          'Emissões de dióxido de carbono por perda de biomassa de vegetação lenhosa viva acima do solo',
        id:
          'Emisi Karbon Dioksida dari kehilangan biomassa vegetasi berkayu di atas permukaan tanah',
        zh: '地上活木生物量损失导致的二氧化碳排放',
        ka: 'ნახშირორჟანგის ემისია მიწისზედა ცოცხალი ბიომასის კარგვის გამო'
      },
      description: {
        en:
          'Emissions do not include carbon emissions from other sources besides woody biomass (tree cover) loss. Select range and tree cover density then click the run analysis button to see results.',
        fr:
          'Les émissions n’incluent pas les émissions de carbone d’autres sources que la perte de biomasse (couverture arborée). Sélectionner la plage et la densité de couverture arborée, puis cliquer sur le bouton « Lancer l’analyse » pour voir les résultats.',
        es:
          'Las emisiones no incluyen las emisiones de carbono de otras fuentes además de la pérdida de biomasa leñosa (cobertura arbórea). Para ver los resultados, seleccione el rango y la densidad de la cobertura arbórea, después haga clic en el botón ejecutar análisis.',
        pt:
          'As estimativas não incluem emissões de carbono geradas por fontes diferentes de perda (de cobertura arbórea) de biomassa de material lenhoso. Para ver os resultados, selecione o período e a densidade de cobertura arbórea; em seguida, clique no botão para executar a análise.',
        id:
          'Emisi tidak termasuk emisi karbon dari sumber lain selain kehilangan biomasa kayu (tutupan pohon). Pilih rentang dan kerapatan tutupan pohon kemudian klik tombol mulai analisis untuk melihat hasil.',
        zh:
          '排放量不包括除树木生物量（森林覆盖）损失之外的其他来源导致的碳排放量。选择范围和森林覆盖密度，然后点击“运行分析”按钮查看结果。总碳排放量 (吨 二氧化碳)',
        ka:
          'ემისიები არ შეიცავენ ნახშირის ემისიებს სხვა წყაროებიდან, გარდა ცოცხალი ბიომასის (ხის ვარჯი) კარგვის. შეარჩიეთ საზღვრები და ხის ვარჯის სიხშირე, შემდეგ დააჭირეთ ღილაკს ანალიზის ჩატარება შედეგების სანახავად.'
      },
      useGfwWidget: true,
      widgetId: 'ac38fdbd-fdb1-4d8e-9109-674013fb51a2',
      uiParams: [
        {
          inputType: 'rangeSlider',
          startParamName: 'period',
          combineParams: true,
          valueSeparator: ',',
          bounds: [2001, 2018],
          valueType: 'date',
          label: {
            en: 'Select range for analysis',
            fr: 'Sélectionner une plage pour l’analyse:',
            es: 'Seleccione un rango para el análisis:',
            pt: 'Selecione o período para análise:',
            id: 'Pilih rentang untuk analisis:',
            zh: '选择分析范围:',
            ka: 'საზღვრების შერჩევა ანალიზისთვის:'
          }
        },
        {
          name: 'thresh',
          inputType: 'tcd',
          label: {
            en: 'Select tree cover density: ',
            fr: 'Sélectionner la densité de couverture arborée: ',
            es: 'Seleccione la densidad de la cobertura arbórea: ',
            pt: 'Selecione a densidade de cobertura arbórea: ',
            id: 'Pilih kerapatan tutupan pohon: ',
            zh: '选择森林覆盖密度: ',
            ka: 'ხის ვარჯის სიხშირის შერჩევა: '
          }
        }
      ]
    },
    {
      analysisId: 'GLAD_ALERTS',
      chartType: 'line',
      label: {
        en: 'GLAD alerts per month',
        fr: 'Alertes GLAD par mois',
        es: 'Alertas GLAD por mes',
        pt: 'Alertas GLAD por mês',
        id: 'Peringatan GLAD per bulan',
        zh: '每月 GLAD 预警',
        ka: 'GLAD შეტყობინებები'
      },
      title: {
        en: 'GLAD alerts per month',
        fr: 'Alertes GLAD par mois',
        es: 'Alertas GLAD por mes',
        pt: 'Alertas GLAD por mês',
        id: 'Peringatan GLAD per bulan',
        zh: '每月 GLAD 预警',
        ka: 'GLAD შეტყობინებები'
      },
      description: {
        en:
          'Count the number of GLAD tree cover loss alerts per month over the past two years and compare to the historical average.',
        fr:
          'Compte le nombre d’alertes GLAD de perte de la couverture arborée par mois sur les deux dernières années et le compare à la moyenne historique.',
        es:
          'Cuente el número de alertas GLAD sobre pérdida de cobertura arbórea por mes en los últimos dos años y compárela con el promedio histórico.',
        pt:
          'Apresentação da quantidade de alertas GLAD de perda de cobertura arbórea por mês nos últimos dois anos e comparação com a média histórica.',
        id:
          'Hitung jumlah peringatan kehilangan tutupan pohon GLAD per bulan selama dua tahun terakhir dan bandingkan dengan rata-rata historis.',
        zh:
          '统计过去两年内每月 GLAD 森林覆盖减少预警次数，并与历史平均值比较。',
        ka:
          'Count the number of GLAD tree cover loss alerts per month over the past two years and compare to the historical average.'
      },
      useGfwWidget: true,
      widgetId: 'b5e43ea3-2812-484e-bc31-1bf5d2fe8aa0',
      uiParams: 'none'
    },
    {
      analysisId: 'TOTAL_GLAD_ALERTS',
      chartType: 'badge',
      label: {
        en: 'Total GLAD Alerts',
        fr: 'Total des alertes GLAD',
        es: 'Alertas GLAD totales',
        pt: 'Total de alertas GLAD',
        id: 'Total Peringatan GLAD',
        zh: 'GLAD 预警总数',
        ka: 'GLAD შეტყობინებები'
      },
      title: {
        en: 'Total GLAD Alerts',
        fr: 'Total des alertes GLAD',
        es: 'Alertas GLAD totales',
        pt: 'Total de alertas GLAD',
        id: 'Total Peringatan GLAD',
        zh: 'GLAD 预警总数',
        ka: 'Total GLAD Alerts'
      },
      description: {
        en:
          'Count the number of GLAD alerts which occurred within the selected time range.',
        fr: 'Compte le nombre d’alertes GLAD durant la période sélectionnée.',
        es:
          'Cuente el número de alertas GLAD que ocurrieron en el rango de tiempo seleccionado.',
        pt:
          'Quantifica o número de alertas GLAD ocorridos em um período selecionado.',
        id:
          'Hitung jumlah peringatan GLAD yang terjadi dalam rentang waktu yang dipilih.',
        zh: '统计在所选时间范围内出现的 GLAD 预警次数。',
        ka: 'Count the number of GLAD tree cover loss alerts per month.'
      },
      useGfwWidget: true,
      widgetId: '16ff6282-8ceb-4055-938a-43726a62b205',
      uiParams: [
        {
          inputType: 'datepicker',
          startParamName: 'period',
          combineParams: true,
          valueSeparator: ',',
          multi: true,
          defaultStartDate: '2018-01-01',
          minDate: '2015-01-01',
          label: {
            en: 'Select range for analysis',
            fr: 'Sélectionner une plage pour l’analyse',
            es: 'Seleccione un rango para el análisis',
            pt: 'Selecione o período para análise',
            id: 'Pilih rentang untuk analisis',
            zh: '选择分析范围',
            ka: 'საზღვრების შერჩევა ანალიზისთვის'
          }
        }
      ]
    },
    {
      analysisId: 'VIIRS_FIRES',
      chartType: 'badge',
      label: {
        en: 'VIIRS Active Fires',
        fr: 'Feux actifs VIIRS',
        es: 'Incendios activos VIIRS',
        pt: 'Incêndios ativos VIIRS',
        id: 'Kebakaran Aktif VIIRS',
        zh: 'VIIRS 活跃火点',
        ka: 'VIIRS აქტიური ხანძრები'
      },
      title: {
        en: 'VIIRS Active Fires',
        fr: 'Feux actifs VIIRS',
        es: 'Incendios activos VIIRS',
        pt: 'Incêndios ativos VIIRS',
        id: 'Kebakaran Aktif VIIRS',
        zh: 'VIIRS 活跃火点',
        ka: 'VIIRS აქტიური ხანძრები'
      },
      description: {
        en:
          'This analysis counts the number of VIIRS fire alert detections during the past 7 days',
        fr:
          'Cette analyse compte le nombre d’alertes de détection d’incendies VIIRS durant les 7 derniers jours',
        es:
          'Este análisis cuenta el número de detecciones de alertas de incendios VIIRS durante los últimos siete días',
        pt:
          'Esta análise apresenta a quantidade de detecções de alertas de incêndio VIIRS nos últimos 7 dias',
        id:
          'Analisis ini menghitung jumlah deteksi peringatan kebakaran VIIRS selama 7 hari terakhir',
        zh: '此分析可统计过去 7 天 VIIRS 火警监测的次数。',
        ka:
          'ეს ანალიზი თვლის VIIRS ხანძრის შეტყობინებების გამოვლენის რაოდენობას ბოლო 7 დღის განმავლობაში.'
      },
      useGfwWidget: true,
      widgetId: '5d696f96-e6c7-4323-8bda-4c99cd6b0cb4',
      uiParams: 'none'
    },
    {
      analysisId: 'LCC',
      chartType: 'pie',
      label: {
        en: 'Land Cover Composition',
        fr: 'Composition de la couverture terrestre',
        es: 'Cobertura terrestre',
        pt: 'Cobertura do Solo',
        id: 'Komposisi tutupan lahan',
        zh: '土地覆盖构成',
        ka: 'მიწის საფარის შემადგენლობა'
      },
      title: {
        en: 'Land Cover Composition',
        fr: 'Composition de la couverture terrestre',
        es: 'Composición de la cobertura de tierra',
        pt: 'Composição da cobertura de terra',
        id: 'Komposisi tutupan lahan',
        zh: '土地覆盖构成',
        ka: 'მიწის საფარის შემადგენლობა'
      },
      description: {
        en:
          'Land cover data is from 2015 and provided by the European Space Agency (ESA) and UCLouvain.',
        fr:
          'Les données de la couverture terrestre datent de 2015 et sont fournies par l’Agence Spatiale Européenne (European Space Agency, ESA) et UCLouvain.',
        es:
          'Los datos de la cobertura de tierra son de 2015 y fueron proporcionados por la Agencia Espacial Europea (European Space Agency, ESA) y UCLouvain. ',
        pt:
          'Dados de cobertura de terra relativos ao período posterior a 2015 e fornecidos pela Agência Espacial Europeia (ESA) e pela UCLouvain. ',
        id:
          'Data tutupan lahan dari tahun 2015 yang disediakan oleh Badan Antariksa Eropa () dan UCLouvain.',
        zh:
          '自 2015 年以来的土地覆盖数据，由欧洲空间局 (ESA) 和 UCLouvain 提供。 ',
        ka:
          'მიწის საფარის მონაცემები 2015 წლის შემდეგაა და მოწოდებულია ევროპული კოსმოსური სააგენტოს (ESA) და ლუვენის კათოლიკური უნივერსიტეტის (UCLouvain) მიერ.'
      },
      useGfwWidget: true,
      widgetId: '1b84364d-0efd-4d60-81ef-870f7d13ee7b',
      uiParams: 'none',
      params: [
        {
          name: 'layer',
          value: 'gfw-landcover-2015'
        }
      ]
    }
  ],
  layerPanel: {
    GROUP_WEBMAP: {
      order: 2,
      label: {},
      layers: []
    },
    // GROUP_Hazards: {
    //   order: 6,
    //   groupType: 'radio',
    //   label: {
    //     en: 'Hazards',
    //     ka: 'საფრთხეები'
    //   },
    //   layers: [
    //     {
    //       order: 1,
    //       id: 'ForestHazard',
    //       type: 'dynamic',
    //       url:
    //         'https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards/MapServer/',
    //       layerIds: [0],
    //       opacity: 0.75,
    //       label: {
    //         en: 'Forest General Hazard Risk',
    //         ka: 'ბუნებრივი კატასტროფები ტყით დაფარულ ტერიტორიებზე'
    //       }
    //     },
    //     {
    //       order: 2,
    //       id: 'Elevation',
    //       type: 'dynamic',
    //       opacity: 0.8,
    //       url:
    //         'https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards_Raster/MapServer',
    //       layerIds: [1],
    //       label: {
    //         en: 'Elevation in Forested Areas',
    //         ka: 'სიმაღლე ტყიან ზონებში'
    //       }
    //     },
    //     {
    //       order: 3,
    //       id: 'Slope',
    //       type: 'dynamic',
    //       url:
    //         'https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards_Raster/MapServer',
    //       layerIds: [0],
    //       opacity: 0.8,
    //       label: {
    //         en: 'Slope in Forested Areas',
    //         ka: 'დაქანება ტყიან ზონებში'
    //       }
    //     },
    //     {
    //       order: 4,
    //       id: 'Aspect',
    //       type: 'dynamic',
    //       url:
    //         'https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards_Raster/MapServer',
    //       layerIds: [2],
    //       opacity: 0.8,
    //       label: {
    //         en: 'Aspect in Forested Areas',
    //         ka: 'ექსპოზიცია ტყიან ზონებში'
    //       }
    //     },
    //     {
    //       order: 5,
    //       id: 'Landslide',
    //       type: 'dynamic',
    //       url:
    //         'https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards/MapServer/',
    //       layerIds: [1],
    //       opacity: 0.6,
    //       label: {
    //         en: 'Landslide Zoning',
    //         ka: 'ბუნებრივი კატასტროფები'
    //       },
    //       popup: {
    //         title: {
    //           en: 'Landslide Zoning',
    //           ka: 'ბუნებრივი კატასტროფები'
    //         },
    //         content: {
    //           ka: [
    //             {
    //               label: 'კატეგორია',
    //               fieldExpression: 'Category_KA'
    //             },
    //             {
    //               label: 'ფართობი ჰა',
    //               fieldExpression: 'Area_ha_KA'
    //             }
    //           ],
    //           en: [
    //             {
    //               label: 'Category',
    //               fieldExpression: 'Category_EN'
    //             },
    //             {
    //               label: 'Area ha',
    //               fieldExpression: 'Area_ha_EN'
    //             }
    //           ]
    //         }
    //       }
    //     },
    //     {
    //       order: 6,
    //       id: 'Debrisflow',
    //       type: 'dynamic',
    //       url:
    //         'https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards/MapServer/',
    //       layerIds: [2],
    //       opacity: 0.6,
    //       label: {
    //         en: 'Debrisflow Zoning',
    //         ka: 'რისკის ზონები'
    //       },
    //       popup: {
    //         title: {
    //           en: 'Debrisflow Zoning',
    //           ka: 'რისკის ზონები'
    //         },
    //         content: {
    //           ka: [
    //             {
    //               label: 'კატეგორია',
    //               fieldExpression: 'Category_KA'
    //             },
    //             {
    //               label: 'ფართობი ჰა',
    //               fieldExpression: 'Area_ha_KA'
    //             }
    //           ],
    //           en: [
    //             {
    //               label: 'Category',
    //               fieldExpression: 'Category_EN'
    //             },
    //             {
    //               label: 'Area ha',
    //               fieldExpression: 'Area_ha_EN'
    //             }
    //           ]
    //         }
    //       }
    //     }
    //   ]
    // },
    GROUP_LCD: {
      groupType: 'default',
      order: 7,
      label: {
        en: 'Land Cover Dynamics',
        fr: 'Evolution de la couverture des sols',
        es: 'Dinámica de la Cobertura del Suelo',
        pt: 'Dinâmica de cobertura da terra',
        id: 'Land Cover Dynamics',
        zh: '土地覆盖动态数据',
        ka: 'მიწის საფარის დინამიკა'
      },
      layers: [
        {
          order: 1,
          id: 'TREE_COVER_LOSS',
          type: 'remoteDataLayer',
          uuid: '2aed67b3-3643-40d3-9c1e-8af9afb5d9e2'
        },
        {
          order: 2,
          type: 'remoteDataLayer',
          id: 'TREE_COVER_GAIN',
          uuid: 'cb016f17-f12d-463a-9dc2-aabcf5db566c'
        },
        {
          order: 3,
          type: 'remoteDataLayer',
          id: 'IMAZON_SAD',
          uuid: '3e9e86ae-e38d-4c59-8484-c8214ca5186a'
        },
        {
          order: 4,
          id: 'GLAD_ALERTS',
          type: 'remoteDataLayer',
          uuid: '356f862b-3e70-493a-997b-dc2a193410e9'
        },
        {
          order: 5,
          id: 'TERRA_I_ALERTS',
          type: 'remoteDataLayer',
          uuid: '1fc7b0c5-259a-4685-8665-b2f1ed3f808f'
        },
        {
          order: 6,
          id: 'VIIRS_ACTIVE_FIRES',
          type: 'remoteDataLayer',
          uuid: '6d316908-92c8-4f95-8598-f2a0c72786af'
        },
        {
          order: 7,
          id: 'MODIS_ACTIVE_FIRES',
          type: 'remoteDataLayer',
          uuid: '8ae39d34-a5e5-4742-b06e-6e913a8f1eb8'
        }
      ]
    },
    GROUP_TEST: {
      // This is a test group consisting of various layers not related to cameroon, this should not make to PROD
      groupType: 'default',
      order: 1,
      label: {
        en: 'TEST',
        fr: 'TEST',
        es: 'TEST',
        pt: 'TEST',
        id: 'TEST',
        zh: 'TEST',
        ka: 'TEST'
      },
      layers: [
        {
          order: 1,
          id: 'GROUP_LAYER_TEST',
          type: 'remoteDataLayer',
          uuid: 'bb5dc1f1-06b9-4117-943a-e2dd9341ea6b'
        }
        // {
        //   order: 1,
        //   id: 'Versioned Dynamic Layer',
        //   type: 'dynamic',
        //   visible: true,
        //   label: {
        //     en: 'Versioned Dynamic Layer',
        //     fr: 'Versioned Dynamic Layer'
        //   },
        //   versionHeaderText: {
        //     en: 'Pick a version',
        //     fr: 'Pick a version'
        //   },
        //   versions: [
        //     {
        //       label: {
        //         en: 'All Protected Areas',
        //         fr: 'All Protected Areas'
        //       },
        //       url:
        //         'https://gis.forest-atlas.org/server/rest/services/Richard_test/DRC_NationalParks_test/MapServer',
        //       layerIds: [0]
        //     },
        //     {
        //       label: {
        //         en: 'National Parks',
        //         fr: 'National Parks'
        //       },
        //       url:
        //         'https://gis.forest-atlas.org/server/rest/services/Richard_test/DRC_NationalParks_test/MapServer',
        //       layerIds: [1]
        //     }
        //   ]
        // },
        // {
        //   order: 1,
        //   id: 'Versioned Feature Layer',
        //   type: 'feature',
        //   visible: true,
        //   label: {
        //     en: 'Versioned Feature Layer',
        //     fr: 'Versioned Feature Layer'
        //   },
        //   versionHeaderText: {
        //     en: 'Pick a version',
        //     fr: 'Pick a version'
        //   },
        //   versions: [
        //     {
        //       label: {
        //         en: 'Esri_Partners',
        //         fr: 'Esri_Partners'
        //       },
        //       url:
        //         'https://services.arcgis.com/EDxZDh4HqQ1a9KvA/ArcGIS/rest/services/Esri_Partners/FeatureServer/0'
        //     },
        //     {
        //       label: {
        //         en: 'Flood',
        //         fr: 'Flood'
        //       },
        //       url:
        //         'https://services7.arcgis.com/gp50Ao2knMlOM89z/ArcGIS/rest/services/AG_PRD_FIESSI_2_1_2_2019Q2G01/FeatureServer/0'
        //     }
        //   ]
        // }
      ]
    },
    GROUP_LC: {
      groupType: 'default',
      order: 3,
      label: {
        en: 'Land Cover',
        fr: 'Couverture des sols',
        es: 'Cobertura terrestre',
        pt: 'Cobertura do Solo',
        id: 'Land Cover',
        zh: '土地覆盖',
        ka: 'მიწის საფარი'
      },
      layers: [
        {
          order: 1,
          id: 'GLOB_MANGROVE',
          type: 'remoteDataLayer',
          uuid: '533cbe18-22a6-46ac-99ca-027c96f33ac3'
        },
        {
          order: 2,
          id: 'IFL',
          type: 'remoteDataLayer',
          uuid: '5f815a7d-457e-4eae-a8e5-8864a60696ad'
        },
        {
          order: 3,
          id: 'PRIMARY_FORESTS',
          type: 'remoteDataLayer',
          uuid: 'edffb745-e523-462d-ad1e-3052006a3dbc'
        },
        {
          order: 4,
          id: 'AG_BIOMASS',
          type: 'remoteDataLayer',
          uuid: '04526d47-f3f5-4f76-a939-e5f7861fd085'
        },
        {
          order: 5,
          id: 'LAND_COVER',
          type: 'remoteDataLayer',
          uuid: 'b8d3f175-0565-443f-839a-49eb890a4b3d'
        },
        {
          order: 6,
          id: 'TREE_COVER',
          type: 'remoteDataLayer',
          uuid: '2569adca-ef87-42c4-a153-57c5e8ba0ef7'
        }
      ]
    },
    GROUP_IMAGERY: {
      groupType: 'imagery',
      order: 4,
      label: {
        en: 'Recent Imagery',
        fr: 'Imagerie récente',
        es: 'Imágenes recientes',
        pt: 'Imagens recentes',
        id: 'Citra Satelit Terbaru',
        zh: 'Recent Imagery',
        ka: 'ბოლო გამოსახულება'
      },
      layers: [
        {
          order: 1,
          id: 'RECENT_IMAGERY',
          type: 'imagery',
          technicalName: 'recent_satellite_imagery',
          visible: false,
          label: {
            en: 'Recent Imagery',
            fr: 'Imagerie récente',
            es: 'Imágenes recientes',
            pt: 'Imagens recentes',
            id: 'Citra Satelit Terbaru',
            zh: '云层覆盖',
            ka: 'ბოლო გამოსახულება'
          },
          dynamicSublabel: {
            en: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            fr:
              '({DATE_TIME}, {CLOUD_COVERAGE}% Imagerie récente, {INSTRUMENT})',
            es:
              '({DATE_TIME}, {CLOUD_COVERAGE}% Cobertura de nubes, {INSTRUMENT})',
            pt:
              '({DATE_TIME}, {CLOUD_COVERAGE}% Cobertura de nuvens, {INSTRUMENT})',
            id: '({DATE_TIME}, {CLOUD_COVERAGE}% Tutupan Awan, {INSTRUMENT})',
            zh: '({DATE_TIME}, {CLOUD_COVERAGE}% 近期图像, {INSTRUMENT})',
            ka: '({DATE_TIME}, {CLOUD_COVERAGE}% ღრუბლიანობა, {INSTRUMENT})'
          }
        }
      ]
    },
    GROUP_BASEMAP: {
      groupType: 'basemap',
      order: 6,
      label: {
        en: 'Basemap',
        fr: 'Basemap',
        es: 'Basemap',
        pt: 'Basemap',
        id: 'Basemap',
        zh: 'Basemap',
        ka: 'საბაზო რუკა'
      },
      layers: [
        {
          id: 'landsat',
          thumbnailUrl:
            'https://my.gfw-mapbuilder.org/img/basemaps-sdd18a411a3-5bf18f445e58b8766f773184b7741c67.png',
          templateUrl:
            'https://production-api.globalforestwatch.org/v2/landsat-tiles/2017/{level}/{col}/{row}',
          years: [
            '2000',
            '2001',
            '2002',
            '2003',
            '2004',
            '2005',
            '2006',
            '2007',
            '2008',
            '2009',
            '2010',
            '2011',
            '2012',
            '2013',
            '2014',
            '2015',
            '2016',
            '2017'
          ],
          title: {
            en: 'Landsat',
            fr: 'Landsat',
            es: 'Landsat',
            pt: 'Landsat',
            id: 'Landsat',
            zh: 'Landsat',
            ka: 'Landsat'
          }
        },
        {
          id: 'wri_mono',
          thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/wri_mono.png',
          title: {
            en: 'WRI Mono',
            fr: 'WRI Mono',
            es: 'WRI Mono',
            pt: 'WRI Mono',
            id: 'WRI Mono',
            zh: 'WRI Mono',
            ka: 'WRI Mono'
          }
        }
        // {
        //   id: 'wri_contextual',
        //   thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/wri_contextual.png',
        //   title: {
        //     en: 'WRI Contextual',
        //     fr: 'WRI Contextual',
        //     es: 'WRI Contextual',
        //     pt: 'WRI Contextual',
        //     id: 'WRI Contextual',
        //     zh: 'WRI Contextual',
        //     ka: 'WRI Contextual'
        //   }
        // }
      ]
    },
    // GROUP_Orth: {
    //   groupType: 'nested',
    //   order: 8,
    //   label: {
    //     en: 'Orthophotos/Topographic Maps',
    //     ka: 'ორთოფოტოები/ტოპოგრაფიული რუკები'
    //   },
    //   layers: [
    //     {
    //       order: 1,
    //       id: 'ortho',
    //       label: {
    //         en: 'Orthophotos',
    //         ka: 'ორთოფოტოები'
    //       },
    //       nestedLayers: [
    //         {
    //           id: 'Adjara',
    //           order: 1,
    //           type: 'webtiled',
    //           url:
    //             'http://mp1.napr.gov.ge/ORTHO_2015_ADJARA/wmts/ORTHO_2015_ADJARA/GLOBAL_MERCATOR/{level}/{col}/{row}.png',
    //           label: {
    //             en: '2015 Adjara',
    //             ka: 'აჭარის ა/რ 2015'
    //           }
    //         },
    //         {
    //           id: 'Samegrelo',
    //           order: 2,
    //           type: 'webtiled',
    //           url:
    //             'http://mp1.napr.gov.ge/ORTHO_2015_SAMEGRELO/wmts/ORTHO_2015_SAMEGRELO/GLOBAL_MERCATOR/{level}/{col}/{row}.png',
    //           label: {
    //             en: '2015 Samegrelo',
    //             ka: 'სამეგრელო 2015'
    //           }
    //         },
    //         {
    //           id: 'Vere',
    //           order: 3,
    //           type: 'webtiled',
    //           url:
    //             'http://mp1.napr.gov.ge/ORTHO_2015_VERE/wmts/ORTHO_2015_VERE/GLOBAL_MERCATOR/{level}/{col}/{row}.png',
    //           label: {
    //             en: '2015 Vere',
    //             ka: 'ვერეს ხეობა 2015'
    //           }
    //         },
    //         {
    //           id: 'Norv',
    //           order: 4,
    //           type: 'webtiled',
    //           url:
    //             'http://mp1.napr.gov.ge/ORTHO_2016-17_NORV/wmts/ORTHO_2016-17_NORV/GLOBAL_MERCATOR/{level}/{col}/{row}.png',
    //           label: {
    //             en: '2016-17 Norv',
    //             ka: 'ორთოფოტო გეგმა 2016-2017'
    //           }
    //         },
    //         {
    //           id: 'Dasavleti',
    //           order: 5,
    //           type: 'webtiled',
    //           url:
    //             'http://mp1.napr.gov.ge/ORTHO_2014_DASAVLETI/wmts/ORTHO_2014_DASAVLETI/GLOBAL_MERCATOR/{level}/{col}/{row}.png',
    //           label: {
    //             en: '2014 Dasavleti',
    //             ka: 'დასავლეთი 2014'
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       order: 2,
    //       id: 'topo',
    //       label: {
    //         en: 'Topographic Maps',
    //         ka: 'ტოპოგრაფიული რუკები'
    //       },
    //       nestedLayers: [
    //         {
    //           id: 'Topo1000',
    //           order: 1,
    //           type: 'webtiled',
    //           url:
    //             'http://mp1.napr.gov.ge/TOPO_10k_1952_2007/wmts/TOPO_10000_1952_2007/GLOBAL_MERCATOR/{level}/{col}/{row}.png',
    //           label: {
    //             en: 'TOPO 10000 1952_2007',
    //             ka: '10 000 - იანი ტოპოგრაფიული რუკები 1952-2007'
    //           }
    //         },
    //         {
    //           id: 'TOPO50000',
    //           order: 1,
    //           type: 'webtiled',
    //           url:
    //             'http://mp1.napr.gov.ge/TOPO_50k_GEO_2007/wmts/TOPO_50000_GEO_2007/GLOBAL_MERCATOR/{level}/{col}/{row}.png',
    //           label: {
    //             en: 'TOPO 50000 GEO_2007',
    //             ka: '50 000 - იანი ტოპოგრაფიული რუკები 2007'
    //           }
    //         }
    //       ]
    //     }
    //   ]
    // },
    // GROUP_PA: {
    //   order: 3,
    //   label: {
    //     en: 'Protected Areas',
    //     ka: 'დაცული ტერიტორიები'
    //   },
    //   layers: [
    //     {
    //       order: 1,
    //       id: 'PAInf',
    //       type: 'dynamic',
    //       url:
    //         'https://gis.mepa.gov.ge/server/rest/services/atlas/protected_areas/MapServer',
    //       layerIds: [0],
    //       label: {
    //         en: 'Infrastructure of Protected Areas',
    //         ka: 'ინფრასტრუქტურა'
    //       },
    //       popup: {
    //         title: {
    //           en: 'Infrastructure of Protected Areas',
    //           ka: 'ინფრასტრუქტურა'
    //         },
    //         content: {
    //           ka: [
    //             {
    //               label: 'დასახელება',
    //               fieldExpression: 'Name_KA'
    //             },
    //             {
    //               label: 'დაცული ტერიტორია',
    //               fieldExpression: 'Protected_Areas_KA'
    //             }
    //           ],
    //           en: [
    //             {
    //               label: 'Name',
    //               fieldExpression: 'Name_EN'
    //             },
    //             {
    //               label: 'Protected Area',
    //               fieldExpression: 'Protected_Areas_EN'
    //             }
    //           ]
    //         }
    //       }
    //     },
    //     {
    //       order: 2,
    //       id: 'PARoads',
    //       type: 'dynamic',
    //       url:
    //         'https://gis.mepa.gov.ge/server/rest/services/atlas/protected_areas/MapServer',
    //       layerIds: [1],
    //       label: {
    //         en: 'Touristic Routes of Protected Areas',
    //         ka: 'ტურისტული ბილიკები'
    //       },
    //       filterField: {
    //         en: 'Type_EN',
    //         ka: 'Type_KA'
    //       },
    //       filterLabel: {
    //         en: 'Filter by Type',
    //         ka: 'ფილტრი ტიპის მიხედვით'
    //       },
    //       popup: {
    //         title: {
    //           en: 'Touristic Routes of Protected Areas',
    //           ka: 'ტურისტული ბილიკები'
    //         },
    //         content: {
    //           ka: [
    //             {
    //               label: 'დაცული ტერიტორია',
    //               fieldExpression: 'Protected_Area_KA'
    //             },
    //             {
    //               label: 'ხანგძლივობა',
    //               fieldExpression: 'Duraction_KA'
    //             },
    //             {
    //               label: 'სირთულე',
    //               fieldExpression: 'Difficulty_KA'
    //             },
    //             {
    //               label: 'დასახელება',
    //               fieldExpression: 'Trail_Name_KA'
    //             },
    //             {
    //               label: 'ტიპი',
    //               fieldExpression: 'Type_KA'
    //             }
    //           ],
    //           en: [
    //             {
    //               label: 'Protected areas',
    //               fieldExpression: 'Protected_Area_EN'
    //             },
    //             {
    //               label: 'Duraction',
    //               fieldExpression: 'Duraction_EN'
    //             },
    //             {
    //               label: 'Difficulty',
    //               fieldExpression: 'Difficulty_EN'
    //             },
    //             {
    //               label: 'Trail Name',
    //               fieldExpression: 'Trail_Name_EN'
    //             },
    //             {
    //               label: 'Type',
    //               fieldExpression: 'Type_EN'
    //             }
    //           ]
    //         }
    //       }
    //     },
    //     {
    //       order: 3,
    //       id: 'PALease',
    //       type: 'dynamic',
    //       url:
    //         'https://gis.mepa.gov.ge/server/rest/services/atlas/protected_areas/MapServer',
    //       layerIds: [2],
    //       label: {
    //         en: 'Lease of Protected Areas',
    //         ka: 'იჯარები'
    //       },
    //       popup: {
    //         title: {
    //           en: 'Protected Area Zoning',
    //           ka: 'ფუნქციური ზონები'
    //         },
    //         content: {
    //           ka: [
    //             {
    //               label: 'დაცული ტერიტორია',
    //               fieldExpression: 'Protected_areas_KA'
    //             },
    //             {
    //               label: 'დანიშნულება',
    //               fieldExpression: 'Purpose_KA'
    //             },
    //             {
    //               label: 'ჰექტარი',
    //               fieldExpression: 'Hectare_KA'
    //             }
    //           ],
    //           en: [
    //             {
    //               label: 'Protected Area',
    //               fieldExpression: 'Protected_Area_EN'
    //             },
    //             {
    //               label: 'Purpose',
    //               fieldExpression: 'Purpose_EN'
    //             },
    //             {
    //               label: 'Area (ha)',
    //               fieldExpression: 'Hectare_KA'
    //             }
    //           ]
    //         }
    //       }
    //     },
    //     {
    //       order: 4,
    //       id: 'PAFunction',
    //       type: 'dynamic',
    //       url:
    //         'https://gis.mepa.gov.ge/server/rest/services/atlas/protected_areas/MapServer',
    //       layerIds: [3],
    //       label: {
    //         en: 'Functional Zoning of Protected Areas',
    //         ka: 'ფუნქციური ზონები'
    //       },
    //       filterField: {
    //         en: 'Zone_EN',
    //         ka: 'Zone_KA'
    //       },
    //       filterLabel: {
    //         en: 'Filter by Zone',
    //         ka: 'ფილტრი ზონების მიხედვით'
    //       },
    //       popup: {
    //         title: {
    //           en: 'Functional Zoning of Protected Areas',
    //           ka: 'ფუნქციური ზონები'
    //         },
    //         content: {
    //           ka: [
    //             {
    //               label: 'დაცული ტერიტორია',
    //               fieldExpression: 'Protected_areas_KA'
    //             },
    //             {
    //               label: 'ზონა',
    //               fieldExpression: 'Zone_KA'
    //             },
    //             {
    //               label: 'ფართობი ჰა',
    //               fieldExpression: 'PA_Area_ha_KA'
    //             }
    //           ],
    //           en: [
    //             {
    //               label: 'Protected Area',
    //               fieldExpression: 'Protected_Areas_EN'
    //             },
    //             {
    //               label: 'Zone',
    //               fieldExpression: 'Zone_EN'
    //             },
    //             {
    //               label: 'Area (ha)',
    //               fieldExpression: 'PA_Area_ha_KA'
    //             }
    //           ]
    //         }
    //       }
    //     },
    //     {
    //       order: 5,
    //       id: 'PA',
    //       type: 'dynamic',
    //       visible: true,
    //       url:
    //         'https://gis.mepa.gov.ge/server/rest/services/atlas/protected_areas/MapServer',
    //       layerIds: [4],
    //       label: {
    //         en: 'Protected Areas',
    //         ka: 'დაცული ტერიტორიები'
    //       },
    //       filterField: {
    //         en: 'Category_EN',
    //         ka: 'Category_KA'
    //       },
    //       filterLabel: {
    //         en: 'Filter by Category',
    //         ka: 'ფილტრი კატეგორიების მიხედვით'
    //       },
    //       popup: {
    //         title: {
    //           en: 'Protected Areas',
    //           ka: 'კატეგორიები'
    //         },
    //         content: {
    //           ka: [
    //             {
    //               label: 'დაცული ტერიტორია',
    //               fieldExpression: 'Protected_Areas_KA'
    //             },
    //             {
    //               label: 'დაარსების წელი',
    //               fieldExpression: 'Year_of_Establishment_KA'
    //             },
    //             {
    //               label: 'ადმინისტრაცია',
    //               fieldExpression: 'Administration_KA'
    //             },
    //             {
    //               label: 'კატეგორია',
    //               fieldExpression: 'Category_KA'
    //             },
    //             {
    //               label: 'ფართობი ჰა',
    //               fieldExpression: 'PA_Area_ha_KA'
    //             }
    //           ],
    //           en: [
    //             {
    //               label: 'Protected Area Name',
    //               fieldExpression: 'Protected_Areas_EN'
    //             },
    //             {
    //               label: 'Year of Establishment',
    //               fieldExpression: 'Year_of_Establishment_KA'
    //             },
    //             {
    //               label: 'Administration',
    //               fieldExpression: 'Administration_EN'
    //             },
    //             {
    //               label: 'Category',
    //               fieldExpression: 'Category_EN'
    //             },
    //             {
    //               label: 'Area (ha)',
    //               fieldExpression: 'PA_Area_ha_KA'
    //             }
    //           ]
    //         }
    //       }
    //     }
    //   ]
    // },
    extraLayers: [
      // {
      // id: 'MASKK',
      // type: 'feature',
      // order: 10000,
      // url:
      // 'https://services.arcgis.com/EDxZDh4HqQ1a9KvA/arcgis/rest/services/LandCover/FeatureServer/0',
      // opacity: 0.35
      // },
      // {
      // order: 2,
      // id: 'CTC',
      // type: 'dynamic',
      // url:
      // 'https://gis.forest-atlas.org/server/rest/services/ind/RO_TC_Carbon_final/MapServer',
      // layerIds: [2],
      // technicalName: 'ind_treecover',
      // visible: true,
      // label: {
      //   en:
      //   'Potential for Increase in Forest and Tree Cover where Maximum Tree Cover in Cultivated Areas is Capped at 20%'
      // }
      // },
      {
        id: 'MASK',
        type: 'dynamic',
        order: 10000,
        url:
          'https://gis.forest-atlas.org/server/rest/services/country_masks/country_mask_global/MapServer',
        opacity: 0.35,
        layerIds: [0]
      },
      // {
      //   id: 'LEGEND_LAYER',
      //   type: 'dynamic',
      //   url: 'https://gis-gfw.wri.org/arcgis/rest/services/legends/MapServer',
      //   visible: false,
      //   opacity: 0,
      //   layerIds: []
      // },
      {
        id: 'USER_FEATURES',
        type: 'graphic',
        visible: true
      }
    ]
  },
  otherFieldsModules: ''
};
