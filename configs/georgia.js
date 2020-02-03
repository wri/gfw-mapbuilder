export default {
  webmap: '1293b7494e9f41eb9219d8b98b757290',
  title: 'FLUIDS Georgia',
  subtitle: '',
  webmapMenuName: 'მიწათსარგებლობა',
  logoUrl:
    'https://geo.forest-atlas.org/system/site_settings/images/000/000/140/original/mepa.png?1530171023',
  logoLinkUrl: 'https://geo.forest-atlas.org',
  printServiceUrl:
    'https://gis.mepa.gov.ge/server/rest/services/PrintService/ExportWebMap/GPServer/Export%20Web%20Map',
  narrative:
    '\u003cp\u003e\u0026lt;p\u0026gt; These maps represent the dynamics of land and forest use/cover change in the Republic of Georgia. This has been made possible through a partnership between the Ministry of Environment Protection and Agriculture of Georgia (MEPA), supported by the World Resources Institute (WRI) in the framework of Global Forest Watch Project, funded by UNEP and GEF.\u0026lt;/p\u0026gt;\u0026lt;p\u0026gt;\u0026lt;i\u0026gt; \u0026lt;a href=http://www.moe.gov.ge/en/home target=_blank\u0026gt;MEPA\u0026lt;/a\u0026gt;,\u0026lt;a href=https://www.wri.org target=_blank\u0026gt; WRI\u0026lt;/a\u0026gt;\u0026lt;/i\u0026gt;\u0026lt;/p\u0026gt;\u003cbr\u003e\u003c/p\u003e',
  includeSubscribeButton: true,
  sharinghost: 'https://gis.mepa.gov.ge/portal',
  analyticsCode: 'UA-62288390-18',
  iso: 'GEO',
  language: 'ka',
  useAlternativeLanguage: true,
  alternativeLanguage: 'en',
  alternativeWebmap: 'ad6eb30b32014a528423bfc068acebf3',
  alternativeLanguageTitle: 'FLUIDS Georgia',
  alternativeLanguageSubtitle: '',
  alternativeNarrative:
    '\u003cp\u003e\u0026lt;p\u0026gt; These maps represent the dynamics of land and forest use/cover change in the Republic of Georgia. This has been made possible through a partnership between the Ministry of Environment Protection and Agriculture of Georgia (MEPA), supported by the World Resources Institute (WRI) in the framework of Global Forest Watch Project, funded by UNEP and GEF.\u0026lt;/p\u0026gt;\u0026lt;p\u0026gt;\u0026lt;i\u0026gt; \u0026lt;a href=http://www.moe.gov.ge/en/home target=_blank\u0026gt;MEPA\u0026lt;/a\u0026gt;,\u0026lt;a href=https://www.wri.org target=_blank\u0026gt; WRI\u0026lt;/a\u0026gt;\u0026lt;/i\u0026gt;\u0026lt;/p\u0026gt;\u003cbr\u003e\u003c/p\u003e',
  alternativeWebmapMenuName: 'Land Use',
  includeDocumentsTab: true,
  includeMeasurementTab: true,
  viirsFires: true,
  modisFires: true,
  intactForests: true,
  aboveGroundBiomass: true,
  landCover: true,
  mangroves: false,
  sadAlerts: false,
  gladAlerts: false,
  terraIAlerts: false,
  forma: true,
  primaryForests: false,
  recentImagery: true,
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
      widgetId: '53e541c-92cd-4b00-9aa7-2c7bb36d4697',
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
    },
    {
      analysisId: 'Aspect',
      chartType: 'pie',
      label: {
        en: 'Aspect in Forested Areas',
        ka: 'ასპექტი ტყიან ზონებში'
      },
      title: {
        en: 'Aspect in Forested Areas',
        ka: 'ასპექტი ტყიან ზონებში'
      },
      description: {
        en:
          'Analysis only includes forested areas, and some national parks are excluded from the analysis. To view the areas included in the analysis please view the aspect in forested areas layer',
        ka:
          'ანალიზი მოიცავს მარტო ტყიან ტერიტორიებს, ეროვნული პარკების ტერიტორიას არ მოიცავს. იმისათვის რომ ნახოთ თუ რა ტერიტორიებს მოიცავს ანალიზი, გთხოვთ იხილოთ ტყიანი ტერიტორიების ასპექტის ფენა'
      },
      useGfwWidget: true,
      widgetId: 'dc01a94a-58d5-4835-9277-7244399bece3',
      uiParams: 'none'
    },
    {
      analysisId: 'Elevation',
      chartType: 'pie',
      label: {
        en: 'Elevation in Forested Areas',
        ka: 'სიმაღლე ტყიან ზონებში'
      },
      title: {
        en: 'Elevation in Forested Areas',
        ka: 'სიმაღლე ტყიან ზონებში'
      },
      description: {
        en:
          'Analysis only includes forested areas, and some national parks are excluded from the analysis. To view the areas included in the analysis please view the elevation in forested areas layer',
        ka:
          'ანალიზი მოიცავს მარტო ტყიან ტერიტორიებს, ეროვნული პარკების ტერიტორიას არ მოიცავს. იმისათვის რომ ნახოთ თუ რა ტერიტორიებს მოიცავს ანალიზი, გთხოვთ იხილოთ ტყიანი ტერიტორიების სიმაღლის ფენა'
      },
      useGfwWidget: true,
      widgetId: 'e776d408-73a8-4674-b578-c3fbd479a3c9',
      uiParams: 'none'
    },
    {
      analysisId: 'Slope',
      chartType: 'pie',
      label: {
        en: 'Slope in Forested Areas',
        ka: 'დაქანება ტყიან ზონებში'
      },
      title: {
        en: 'Slope in Forested Areas',
        ka: 'დაქანება ტყიან ზონებში'
      },
      description: {
        en:
          'Analysis only includes forested areas, and some national parks are excluded from the analysis. To view the areas included in the analysis please view the slope in forested areas layer',
        ka:
          'ანალიზი მოიცავს მარტო ტყიან ტერიტორიებს, ეროვნული პარკების ტერიტორიას არ მოიცავს. იმისათვის რომ ნახოთ თუ რა ტერიტორიებს მოიცავს ანალიზი, გთხოვთ იხილოთ ტყიანი ტერიტორიების დაქანების ფენა'
      },
      useGfwWidget: true,
      widgetId: '814e4fd9-6b82-4482-95a2-ffb30935b577',
      uiParams: 'none'
    },
    {
      analysisId: 'Hazard',
      chartType: 'pie',
      label: {
        en: 'Forest Hazard Risk Anaylsis',
        ka: 'ტყის საფრთხის რისკის ანალიზი'
      },
      title: {
        en: 'Forest hazard risk anaylsis',
        ka: 'ტყის საფრთხის რისკის ანალიზი'
      },
      description: {
        en:
          'Analysis only includes forested areas, and some national parks are excluded from the analysis. To view the areas included in the analysis please view the forest hazard risk layer',
        ka:
          'ანალიზი მოიცავს მარტო ტყიან ტერიტორიებს, ეროვნული პარკების ტერიტორიას არ მოიცავს. იმისათვის რომ ნახოთ თუ რა ტერიტორიებს მოიცავს ანალიზი, გთხოვთ იხილოთ ტყის საფრთხის რისკის ფენა'
      },
      useGfwWidget: true,
      widgetId: 'f42aa3d7-d33b-4067-b2a6-5554e15092b1',
      uiParams: 'none'
    }
  ],
  layerPanel: {
    GROUP_WEBMAP: {
      order: 2,
      label: {},
      layers: []
    },
    GROUP_LCD: {
      order: 1,
      label: {
        en: 'Land Cover Dynamics',
        ka: 'მიწის საფარის დინამიკა'
      },
      layers: [
        {
          visible: true,
          id: 'TREE_COVER_LOSS',
          order: 1,
          type: 'remoteDataLayer',
          uuid: '2aed67b3-3643-40d3-9c1e-8af9afb5d9e2'
        },
        {
          order: 2,
          id: 'Deforestation',
          type: 'dynamic',
          url:
            'https://gis.mepa.gov.ge/server/rest/services/atlas/Forest_cover_dynamic/MapServer',
          layerIds: [0],
          label: {
            en: 'Tree cover loss drivers',
            ka: 'ტყის კარგვის მიზეზები'
          },
          sublabel: {
            en: '(2001 - 2018, 30m, Georgia, CENN)',
            ka: '(2001 - 2018, 30m, Georgia, CENN)'
          },
          popup: {
            title: {
              en: 'Tree cover loss drivers',
              ka: 'ტყის კარგვის მიზეზები'
            },
            content: {
              ka: [
                {
                  label: 'რეგიონი',
                  fieldExpression: 'Region_KA'
                },
                {
                  label: 'მუნიციპალიტეტი',
                  fieldExpression: 'Municipality_KA'
                },
                {
                  label: 'ტყის კარგვა',
                  fieldExpression: 'Tree_cover_loss_KA'
                },
                {
                  label: 'დამატებითი ინფორმაცია',
                  fieldExpression: 'Additional_Information_KA'
                },
                {
                  label: 'ფართობი ჰა',
                  fieldExpression: 'Area_ha'
                }
              ],
              en: [
                {
                  label: 'Region',
                  fieldExpression: 'Region_EN'
                },
                {
                  label: 'District',
                  fieldExpression: 'Municipality_EN'
                },
                {
                  label: 'Tree cover loss',
                  fieldExpression: 'Tree_cover_loss_EN'
                },
                {
                  label: 'Additional Information',
                  fieldExpression: 'Additional_Information_EN'
                },
                {
                  label: 'Area Ha',
                  fieldExpression: 'Area_ha'
                }
              ]
            }
          }
        },
        {
          visible: true,
          order: 3,
          type: 'remoteDataLayer',
          id: 'TREE_COVER_GAIN',
          uuid: 'cb016f17-f12d-463a-9dc2-aabcf5db566c'
        },
        {
          order: 4,
          id: 'Forestgain',
          type: 'dynamic',
          url:
            'https://gis.mepa.gov.ge/server/rest/services/atlas/Forest_cover_dynamic/MapServer',
          layerIds: [1],
          label: {
            en: 'Tree cover gain driver',
            ka: 'ტყის საფარის მატება'
          },
          sublabel: {
            en: '(2001 - 2012, 30m, Georgia, CENN)',
            ka: '(2001 - 2012, 30m, Georgia, CENN)'
          },
          popup: {
            title: {
              en: 'Tree cover gain',
              ka: 'ტყის საფარის მატება'
            },
            content: {
              ka: [
                {
                  label: 'რეგიონი',
                  fieldExpression: 'Region_KA'
                },
                {
                  label: 'მუნიციპალიტეტი',
                  fieldExpression: 'Municipality_KA'
                },
                {
                  label: 'ტყის მატება',
                  fieldExpression: 'Tree_cover_gain_KA'
                },
                {
                  label: 'დამატებითი ინფორმაცია',
                  fieldExpression: 'additional_information_KA'
                },
                {
                  label: 'მხარდაჭერა',
                  fieldExpression: 'Support_by_KA'
                },
                {
                  label: 'ფართობი ჰა',
                  fieldExpression: 'Area_ha'
                }
              ],
              en: [
                {
                  label: 'Region',
                  fieldExpression: 'Region_EN'
                },
                {
                  label: 'District',
                  fieldExpression: 'Municipality_EN'
                },
                {
                  label: 'Forest gain',
                  fieldExpression: 'Tree_cover_gain_EN'
                },
                {
                  label: 'Additional Information',
                  fieldExpression: 'additional_information_EN'
                },
                {
                  label: 'Support by',
                  fieldExpression: 'Support_by_EN'
                },
                {
                  label: 'Area ha',
                  fieldExpression: 'Area_ha'
                }
              ]
            }
          }
        },
        {
          order: 5,
          id: 'VIIRS_ACTIVE_FIRES',
          type: 'remoteDataLayer',
          uuid: '15cb32c9-874f-4552-afdc-8a35ef70682f'
        },
        {
          order: 6,
          id: 'MODIS_ACTIVE_FIRES',
          type: 'remoteDataLayer',
          uuid: '8ae39d34-a5e5-4742-b06e-6e913a8f1eb8'
        },
        {
          order: 7,
          id: 'Forestfire',
          type: 'dynamic',
          url:
            'https://gis.mepa.gov.ge/server/rest/services/atlas/Forest_cover_dynamic/MapServer',
          layerIds: [2],
          label: {
            en: 'Forest and field fires',
            ka: 'ტყისა და მინდვრის ხანძრები'
          },
          sublabel: {
            en: '(2001 - 2018, Georgia, CENN)',
            ka: '(2001 - 2018, Georgia, CENN)'
          },
          popup: {
            title: {
              en: 'Forest and field fires',
              ka: 'ტყისა და მინდვრის ხანძრები'
            },
            content: {
              ka: [
                {
                  label: 'თარიღი',
                  fieldExpression: 'Date'
                },
                {
                  label: 'წელი',
                  fieldExpression: 'Year'
                },
                {
                  label: 'ხანძრის ნომერი',
                  fieldExpression: 'Fire_Number'
                },
                {
                  label: 'რეგიონი',
                  fieldExpression: 'Region_KA'
                },
                {
                  label: 'საფარი',
                  fieldExpression: 'Cover_KA'
                },
                {
                  label: 'სახეობა',
                  fieldExpression: 'Species_KA'
                },
                {
                  label: 'ფართობი ჰა',
                  fieldExpression: 'Area_ha'
                }
              ],
              en: [
                {
                  label: 'Date',
                  fieldExpression: 'Date'
                },
                {
                  label: 'Year',
                  fieldExpression: 'Year'
                },
                {
                  label: 'Fire Number',
                  fieldExpression: 'Fire_Number'
                },
                {
                  label: 'Region',
                  fieldExpression: 'Region_EN'
                },
                {
                  label: 'Cover',
                  fieldExpression: 'Cover_EN'
                },
                {
                  label: 'Species',
                  fieldExpression: 'Species_EN'
                },
                {
                  label: 'Area ha',
                  fieldExpression: 'Area_ha'
                }
              ]
            }
          }
        }
      ]
    },
    GROUP_PA: {
      order: 3,
      label: {
        en: 'Protected Areas',
        ka: 'დაცული ტერიტორიები'
      },
      layers: [
        {
          order: 1,
          id: 'PAInf',
          type: 'dynamic',
          url:
            'https://gis.mepa.gov.ge/server/rest/services/atlas/protected_areas/MapServer',
          layerIds: [0],
          label: {
            en: 'Infrastructure of Protected Areas',
            ka: 'ინფრასტრუქტურა'
          },
          popup: {
            title: {
              en: 'Infrastructure of Protected Areas',
              ka: 'ინფრასტრუქტურა'
            },
            content: {
              ka: [
                {
                  label: 'დასახელება',
                  fieldExpression: 'Name_KA'
                },
                {
                  label: 'დაცული ტერიტორია',
                  fieldExpression: 'Protected_Areas_KA'
                }
              ],
              en: [
                {
                  label: 'Name',
                  fieldExpression: 'Name_EN'
                },
                {
                  label: 'Protected Area',
                  fieldExpression: 'Protected_Areas_EN'
                }
              ]
            }
          }
        },
        {
          order: 2,
          id: 'PARoads',
          type: 'dynamic',
          url:
            'https://gis.mepa.gov.ge/server/rest/services/atlas/protected_areas/MapServer',
          layerIds: [1],
          label: {
            en: 'Touristic Routes of Protected Areas',
            ka: 'ტურისტული ბილიკები'
          },
          filterField: {
            en: 'Type_EN',
            ka: 'Type_KA'
          },
          filterLabel: {
            en: 'Filter by Type',
            ka: 'ფილტრი ტიპის მიხედვით'
          },
          popup: {
            title: {
              en: 'Touristic Routes of Protected Areas',
              ka: 'ტურისტული ბილიკები'
            },
            content: {
              ka: [
                {
                  label: 'დაცული ტერიტორია',
                  fieldExpression: 'Protected_Area_KA'
                },
                {
                  label: 'ხანგძლივობა',
                  fieldExpression: 'Duraction_KA'
                },
                {
                  label: 'სირთულე',
                  fieldExpression: 'Difficulty_KA'
                },
                {
                  label: 'დასახელება',
                  fieldExpression: 'Trail_Name_KA'
                },
                {
                  label: 'ტიპი',
                  fieldExpression: 'Type_KA'
                }
              ],
              en: [
                {
                  label: 'Protected areas',
                  fieldExpression: 'Protected_Area_EN'
                },
                {
                  label: 'Duraction',
                  fieldExpression: 'Duraction_EN'
                },
                {
                  label: 'Difficulty',
                  fieldExpression: 'Difficulty_EN'
                },
                {
                  label: 'Trail Name',
                  fieldExpression: 'Trail_Name_EN'
                },
                {
                  label: 'Type',
                  fieldExpression: 'Type_EN'
                }
              ]
            }
          }
        },
        {
          order: 3,
          id: 'PALease',
          type: 'dynamic',
          url:
            'https://gis.mepa.gov.ge/server/rest/services/atlas/protected_areas/MapServer',
          layerIds: [2],
          label: {
            en: 'Lease of Protected Areas',
            ka: 'იჯარები'
          },
          popup: {
            title: {
              en: 'Protected Area Zoning',
              ka: 'ფუნქციური ზონები'
            },
            content: {
              ka: [
                {
                  label: 'დაცული ტერიტორია',
                  fieldExpression: 'Protected_areas_KA'
                },
                {
                  label: 'დანიშნულება',
                  fieldExpression: 'Purpose_KA'
                },
                {
                  label: 'ჰექტარი',
                  fieldExpression: 'Hectare_KA'
                }
              ],
              en: [
                {
                  label: 'Protected Area',
                  fieldExpression: 'Protected_Area_EN'
                },
                {
                  label: 'Purpose',
                  fieldExpression: 'Purpose_EN'
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'Hectare_KA'
                }
              ]
            }
          }
        },
        {
          order: 4,
          id: 'PAFunction',
          type: 'dynamic',
          url:
            'https://gis.mepa.gov.ge/server/rest/services/atlas/protected_areas/MapServer',
          layerIds: [3],
          label: {
            en: 'Functional Zoning of Protected Areas',
            ka: 'ფუნქციური ზონები'
          },
          filterField: {
            en: 'Zone_EN',
            ka: 'Zone_KA'
          },
          filterLabel: {
            en: 'Filter by Zone',
            ka: 'ფილტრი ზონების მიხედვით'
          },
          popup: {
            title: {
              en: 'Functional Zoning of Protected Areas',
              ka: 'ფუნქციური ზონები'
            },
            content: {
              ka: [
                {
                  label: 'დაცული ტერიტორია',
                  fieldExpression: 'Protected_areas_KA'
                },
                {
                  label: 'ზონა',
                  fieldExpression: 'Zone_KA'
                },
                {
                  label: 'ფართობი ჰა',
                  fieldExpression: 'PA_Area_ha_KA'
                }
              ],
              en: [
                {
                  label: 'Protected Area',
                  fieldExpression: 'Protected_Areas_EN'
                },
                {
                  label: 'Zone',
                  fieldExpression: 'Zone_EN'
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'PA_Area_ha_KA'
                }
              ]
            }
          }
        },
        {
          order: 5,
          id: 'PA',
          type: 'dynamic',
          visible: true,
          url:
            'https://gis.mepa.gov.ge/server/rest/services/atlas/protected_areas/MapServer',
          layerIds: [4],
          label: {
            en: 'Protected Areas',
            ka: 'დაცული ტერიტორიები'
          },
          filterField: {
            en: 'Category_EN',
            ka: 'Category_KA'
          },
          filterLabel: {
            en: 'Filter by Category',
            ka: 'ფილტრი კატეგორიების მიხედვით'
          },
          popup: {
            title: {
              en: 'Protected Areas',
              ka: 'კატეგორიები'
            },
            content: {
              ka: [
                {
                  label: 'დაცული ტერიტორია',
                  fieldExpression: 'Protected_Areas_KA'
                },
                {
                  label: 'დაარსების წელი',
                  fieldExpression: 'Year_of_Establishment_KA'
                },
                {
                  label: 'ადმინისტრაცია',
                  fieldExpression: 'Administration_KA'
                },
                {
                  label: 'კატეგორია',
                  fieldExpression: 'Category_KA'
                },
                {
                  label: 'ფართობი ჰა',
                  fieldExpression: 'PA_Area_ha_KA'
                }
              ],
              en: [
                {
                  label: 'Protected Area Name',
                  fieldExpression: 'Protected_Areas_EN'
                },
                {
                  label: 'Year of Establishment',
                  fieldExpression: 'Year_of_Establishment_KA'
                },
                {
                  label: 'Administration',
                  fieldExpression: 'Administration_EN'
                },
                {
                  label: 'Category',
                  fieldExpression: 'Category_EN'
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'PA_Area_ha_KA'
                }
              ]
            }
          }
        }
      ]
    },
    GROUP_Bio: {
      order: 4,
      label: {
        en: 'Biodiversity',
        ka: 'ბიომრავალფეროვნება'
      },
      layers: [
        {
          order: 1,
          id: 'Woodlands',
          type: 'dynamic',
          url:
            'https://gis.mepa.gov.ge/server/rest/services/atlas/Biodiversity/MapServer',
          layerIds: [0],
          label: {
            en: 'EUNIS Habitats',
            ka: 'ტყის ჰაბიტატები EUNIS კლასიფიკაციით'
          },
          popup: {
            title: {
              en: 'EUNIS Habitats',
              ka: 'ტყის ჰაბიტატები EUNIS კლასიფიკაციით'
            },
            content: {
              ka: [
                {
                  label: 'ჰაბიტატი',
                  fieldExpression: 'Habitat_KA'
                },
                {
                  label: 'EUNIS კოდი',
                  fieldExpression: 'EUNIS_code_KA'
                }
              ],
              en: [
                {
                  label: 'Habitat',
                  fieldExpression: 'Habitat_EN'
                },
                {
                  label: 'EUNIS code',
                  fieldExpression: 'EUNIS_code_EN'
                }
              ]
            }
          }
        },
        {
          order: 2,
          id: 'Habitats',
          type: 'dynamic',
          url:
            'https://gis.mepa.gov.ge/server/rest/services/atlas/Biodiversity/MapServer',
          layerIds: [1],
          label: {
            en: ' EUNIS Habitats',
            ka: 'ტყის ჰაბიტატები EUNIS კლასიფიკაციით'
          },
          filterField: {
            en: 'Habitat_EN',
            ka: 'Habitat_KA'
          },
          filterLabel: {
            en: 'Filter by Habitat Type',
            ka: 'ფილტრი ჰაბიტატის მიხედვით'
          },
          popup: {
            title: {
              en: 'EUNIS Habitats',
              ka: 'ტყის ჰაბიტატები EUNIS კლასიფიკაციით'
            },
            content: {
              ka: [
                {
                  label: 'ჰაბიტატი',
                  fieldExpression: 'Habitat_KA'
                },
                {
                  label: 'EUNIS კოდი',
                  fieldExpression: 'EUNIS_code_KA'
                },
                {
                  label: 'ფართობი ჰა',
                  fieldExpression: 'Area_ha_KA'
                }
              ],
              en: [
                {
                  label: 'Habitat',
                  fieldExpression: 'Habitat_EN'
                },
                {
                  label: 'EUNIS code',
                  fieldExpression: 'EUNIS_code_EN'
                },
                {
                  label: 'Area ha',
                  fieldExpression: 'Area_ha_EN'
                }
              ]
            }
          }
        },
        {
          order: 3,
          id: 'EmeraldNetwork',
          type: 'dynamic',
          url:
            'https://gis.mepa.gov.ge/server/rest/services/atlas/Biodiversity/MapServer',
          layerIds: [2],
          label: {
            en: 'Emerald Network',
            ka: 'ზურმუხტის ქსელი'
          },
          filterField: {
            en: 'Status_EN',
            ka: 'Status_KA'
          },
          filterLabel: {
            en: 'Filter by status',
            ka: 'ფილტრი სტატუსის მიხედვით'
          },
          popup: {
            title: {
              en: 'Emerald Network',
              ka: 'ზურმუხტის ქსელი'
            },
            content: {
              ka: [
                {
                  label: 'სტატუსი',
                  fieldExpression: 'Status_KA'
                },
                {
                  label: 'საიტის კოდი',
                  fieldExpression: 'Sitecode_KA'
                },
                {
                  label: 'ფართობი ჰა',
                  fieldExpression: 'Area_ha_KA'
                }
              ],
              en: [
                {
                  label: 'Status',
                  fieldExpression: 'Status_EN'
                },
                {
                  label: 'Sitecode',
                  fieldExpression: 'Sitecode_KA'
                },
                {
                  label: 'Area ha',
                  fieldExpression: 'Area_ha_KA'
                }
              ]
            }
          }
        },
        {
          order: 4,
          id: 'Spa',
          type: 'dynamic',
          url:
            'https://gis.mepa.gov.ge/server/rest/services/atlas/Biodiversity/MapServer',
          layerIds: [3],
          label: {
            en: 'Special Protected Areas for birds',
            ka: 'ფრინველთათვის განსაკუთრებული მნიშვნელობის მქონე ტერიტორიები'
          },
          popup: {
            title: {
              en: 'Special Protected Areas for birds',
              ka: 'ფრინველთათვის განსაკუთრებული მნიშვნელობის მქონე ტერიტორიები'
            },
            content: {
              ka: [
                {
                  label: 'სახელი',
                  fieldExpression: 'Name_KA'
                },
                {
                  label: 'ფართობი ჰა',
                  fieldExpression: 'Area_ha'
                }
              ],
              en: [
                {
                  label: 'Name',
                  fieldExpression: 'Name_EN'
                },
                {
                  label: 'Area ha',
                  fieldExpression: 'Area_ha'
                }
              ]
            }
          }
        },
        {
          order: 5,
          id: 'Iba',
          type: 'dynamic',
          url:
            'https://gis.mepa.gov.ge/server/rest/services/atlas/Biodiversity/MapServer',
          layerIds: [4],
          label: {
            en: 'Important bird areas',
            ka: 'ფრინველთათვის მნიშვნელოვანი ტერიტორიები'
          },
          popup: {
            title: {
              en: 'Important bird areas',
              ka: 'ფრინველთათვის მნიშვნელოვანი ტერიტორიები'
            },
            content: {
              ka: [
                {
                  label: 'ქვეყანა',
                  fieldExpression: 'Country_KA'
                },
                {
                  label: 'სახელი',
                  fieldExpression: 'Name_KA'
                },
                {
                  label: 'რეგიონი',
                  fieldExpression: 'Region_KA'
                },
                {
                  label: 'ფართობი ჰა',
                  fieldExpression: 'Area_ha'
                },
                {
                  label: 'კოდი',
                  fieldExpression: 'Fincode'
                },
                {
                  label: 'დაცული',
                  fieldExpression: 'Protect_KA'
                },
                {
                  label: 'დაცული ტერ. რაოდენობა',
                  fieldExpression: 'Pas_Number'
                },
                {
                  label: 'სტატუსი',
                  fieldExpression: 'Iba_Status_KA'
                },
                {
                  label: 'დამატებულია',
                  fieldExpression: 'Added_by'
                },
                {
                  label: 'დამატების თარიღი',
                  fieldExpression: 'Add_Date'
                }
              ],
              en: [
                {
                  label: 'Country',
                  fieldExpression: 'Country_EN'
                },
                {
                  label: 'Name',
                  fieldExpression: 'Name_EN'
                },
                {
                  label: 'Region',
                  fieldExpression: 'Region_EN'
                },
                {
                  label: 'Area ha',
                  fieldExpression: 'Area_ha'
                },
                {
                  label: 'Fincode',
                  fieldExpression: 'Fincode'
                },
                {
                  label: 'Protect',
                  fieldExpression: 'Protect_EN'
                },
                {
                  label: 'Pas Number',
                  fieldExpression: 'Pas_Number'
                },
                {
                  label: 'Status',
                  fieldExpression: 'Status_EN'
                },
                {
                  label: 'Added by',
                  fieldExpression: 'Added_by'
                },
                {
                  label: 'Add Date',
                  fieldExpression: 'Add_Date'
                }
              ]
            }
          }
        },
        {
          order: 6,
          id: 'Wetlands',
          type: 'dynamic',
          url:
            'https://gis.mepa.gov.ge/server/rest/services/atlas/Biodiversity/MapServer',
          layerIds: [5],
          label: {
            en: 'Wetlands',
            ka: 'ჭაობები'
          },
          popup: {
            title: {
              en: 'Wetlands',
              ka: 'ჭაობები'
            },
            content: {
              ka: [
                {
                  label: 'რამსარის კლასიფიკაცია',
                  fieldExpression: 'Ramsar_Classification'
                },
                {
                  label: 'ფართობი ჰა',
                  fieldExpression: 'ha'
                },
                {
                  label: 'ჭაობის კოდი',
                  fieldExpression: 'Wetland_Id'
                },
                {
                  label: 'EUNIS ჰაბიტატი',
                  fieldExpression: 'EUNIS_Habitat_KA'
                },
                {
                  label: 'L 1 აღწერა',
                  fieldExpression: 'L_1_Description_KA'
                },
                {
                  label: 'L 2 აღწერა',
                  fieldExpression: 'L_2_Description_KA'
                },
                {
                  label: 'L 3 აღწერა',
                  fieldExpression: 'L_3_Description_KA'
                },
                {
                  label: 'რამსარის კლასის აღწერა',
                  fieldExpression: 'Ramsar_Class_Description_KA'
                },
                {
                  label: 'მუნიციპალიტეტი',
                  fieldExpression: 'District_KA'
                }
              ],
              en: [
                {
                  label: 'Ramsar Classification',
                  fieldExpression: 'Ramsar_Classification'
                },
                {
                  label: 'Area Ha',
                  fieldExpression: 'ha'
                },
                {
                  label: 'Wetlands',
                  fieldExpression: 'Wetland_Id'
                },
                {
                  label: 'EUNIS Habitat',
                  fieldExpression: 'EUNIS_Habitat_EN'
                },
                {
                  label: 'L 1 Description',
                  fieldExpression: 'L_1_Description_EN'
                },
                {
                  label: 'L 2 Description',
                  fieldExpression: 'L_2_Description_EN'
                },
                {
                  label: 'L 3 Description',
                  fieldExpression: 'L_3_Description_EN'
                },
                {
                  label: 'Ramsar Class Description',
                  fieldExpression: 'Ramsar_Class_Description_EN'
                },
                {
                  label: 'Municipality',
                  fieldExpression: 'District_EN'
                }
              ]
            }
          }
        }
      ]
    },
    GROUP_LC: {
      order: 5,
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
          id: 'IFL',
          type: 'remoteDataLayer',
          uuid: '5f815a7d-457e-4eae-a8e5-8864a60696ad'
        },
        {
          order: 2,
          id: 'LAND_COVER',
          type: 'remoteDataLayer',
          uuid: 'b8d3f175-0565-443f-839a-49eb890a4b3d'
        },
        {
          order: 3,
          id: 'TREE_COVER',
          type: 'remoteDataLayer',
          uuid: '2569adca-ef87-42c4-a153-57c5e8ba0ef7'
        },
        {
          order: 4,
          id: 'Windbreak',
          type: 'dynamic',
          url:
            'https://gis.mepa.gov.ge/server/rest/services/atlas/Land_Cover/MapServer/',
          layerIds: [0],
          label: {
            en: 'Windbreaks',
            ka: 'ქარსაცავი ზოლები'
          },
          popup: {
            title: {
              en: 'Windbreaks',
              ka: 'ქარსაცავი ზოლები'
            },
            content: {
              ka: [
                {
                  label: 'რეგიონი',
                  fieldExpression: 'Region_KA'
                },
                {
                  label: 'რეესტრი',
                  fieldExpression: 'Napr_KA'
                },
                {
                  label: 'მუნიციპალიტეტი',
                  fieldExpression: 'Municipality_KA'
                },
                {
                  label: 'მდგომარეობა',
                  fieldExpression: 'Condition_KA'
                },
                {
                  label: 'ძველი კორომთა გეგმა',
                  fieldExpression: 'Old__forest_stands_net_KA'
                },
                {
                  label: 'ფართობი ჰა',
                  fieldExpression: 'Area_ha'
                }
              ],
              en: [
                {
                  label: 'Region',
                  fieldExpression: 'Region_EN'
                },
                {
                  label: 'Registry',
                  fieldExpression: 'Napr_EN'
                },
                {
                  label: 'Municipality',
                  fieldExpression: 'Municipality_EN'
                },
                {
                  label: 'Condition',
                  fieldExpression: 'Condition_EN'
                },
                {
                  label: 'Old forest stands network',
                  fieldExpression: 'Old__forest_stands_net_EN'
                },
                {
                  label: 'Area ha',
                  fieldExpression: 'Area_ha'
                }
              ]
            }
          }
        },
        {
          order: 8,
          id: 'GEOFC',
          opacity: 0.6,
          type: 'dynamic',
          url:
            'https://gis.mepa.gov.ge/server/rest/services/atlas/Land_Cover/MapServer/',
          layerIds: [1],
          label: {
            en: 'Forest Cover',
            ka: 'ტყის საფარი'
          },
          sublabel: {
            en: 'GIZ, 2015',
            ka: 'GIZ, 2015'
          }
        }
      ]
    },
    GROUP_Hazards: {
      order: 6,
      groupType: 'radio',
      label: {
        en: 'Hazards',
        ka: 'საფრთხეები'
      },
      layers: [
        {
          order: 1,
          id: 'ForestHazard',
          type: 'dynamic',
          url:
            'https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards/MapServer/',
          layerIds: [0],
          opacity: 0.75,
          label: {
            en: 'Forest General Hazard Risk',
            ka: 'ბუნებრივი კატასტროფები ტყით დაფარულ ტერიტორიებზე'
          }
        },
        {
          order: 2,
          id: 'Elevation',
          type: 'dynamic',
          opacity: 0.8,
          url:
            'https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards_Raster/MapServer',
          layerIds: [1],
          label: {
            en: 'Elevation in Forested Areas',
            ka: 'სიმაღლე ტყიან ზონებში'
          }
        },
        {
          order: 3,
          id: 'Slope',
          type: 'dynamic',
          url:
            'https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards_Raster/MapServer',
          layerIds: [0],
          opacity: 0.8,
          label: {
            en: 'Slope in Forested Areas',
            ka: 'დაქანება ტყიან ზონებში'
          }
        },
        {
          order: 4,
          id: 'Aspect',
          type: 'dynamic',
          url:
            'https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards_Raster/MapServer',
          layerIds: [2],
          opacity: 0.8,
          label: {
            en: 'Aspect in Forested Areas',
            ka: 'ექსპოზიცია ტყიან ზონებში'
          }
        },
        {
          order: 5,
          id: 'Landslide',
          type: 'dynamic',
          url:
            'https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards/MapServer/',
          layerIds: [1],
          opacity: 0.6,
          label: {
            en: 'Landslide Zoning',
            ka: 'ბუნებრივი კატასტროფები'
          },
          popup: {
            title: {
              en: 'Landslide Zoning',
              ka: 'ბუნებრივი კატასტროფები'
            },
            content: {
              ka: [
                {
                  label: 'კატეგორია',
                  fieldExpression: 'Category_KA'
                },
                {
                  label: 'ფართობი ჰა',
                  fieldExpression: 'Area_ha_KA'
                }
              ],
              en: [
                {
                  label: 'Category',
                  fieldExpression: 'Category_EN'
                },
                {
                  label: 'Area ha',
                  fieldExpression: 'Area_ha_EN'
                }
              ]
            }
          }
        },
        {
          order: 6,
          id: 'Debrisflow',
          type: 'dynamic',
          url:
            'https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards/MapServer/',
          layerIds: [2],
          opacity: 0.6,
          label: {
            en: 'Debrisflow Zoning',
            ka: 'რისკის ზონები'
          },
          popup: {
            title: {
              en: 'Debrisflow Zoning',
              ka: 'რისკის ზონები'
            },
            content: {
              ka: [
                {
                  label: 'კატეგორია',
                  fieldExpression: 'Category_KA'
                },
                {
                  label: 'ფართობი ჰა',
                  fieldExpression: 'Area_ha_KA'
                }
              ],
              en: [
                {
                  label: 'Category',
                  fieldExpression: 'Category_EN'
                },
                {
                  label: 'Area ha',
                  fieldExpression: 'Area_ha_EN'
                }
              ]
            }
          }
        }
      ]
    },
    GROUP_IMAGERY: {
      grouptype: 'imagery',
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
    GROUP_Orth: {
      groupType: 'nested',
      order: 8,
      label: {
        en: 'Orthophotos/Topographic Maps',
        ka: 'ორთოფოტოები/ტოპოგრაფიული რუკები'
      },
      layers: [
        {
          order: 1,
          id: 'ortho',
          label: {
            en: 'Orthophotos',
            ka: 'ორთოფოტოები'
          },
          nestedLayers: [
            {
              id: 'Adjara',
              order: 1,
              type: 'webtiled',
              url:
                'http://mp1.napr.gov.ge/ORTHO_2015_ADJARA/wmts/ORTHO_2015_ADJARA/GLOBAL_MERCATOR/{level}/{col}/{row}.png',
              label: {
                en: '2015 Adjara',
                ka: 'აჭარის ა/რ 2015'
              }
            },
            {
              id: 'Samegrelo',
              order: 2,
              type: 'webtiled',
              url:
                'http://mp1.napr.gov.ge/ORTHO_2015_SAMEGRELO/wmts/ORTHO_2015_SAMEGRELO/GLOBAL_MERCATOR/{level}/{col}/{row}.png',
              label: {
                en: '2015 Samegrelo',
                ka: 'სამეგრელო 2015'
              }
            },
            {
              id: 'Vere',
              order: 3,
              type: 'webtiled',
              url:
                'http://mp1.napr.gov.ge/ORTHO_2015_VERE/wmts/ORTHO_2015_VERE/GLOBAL_MERCATOR/{level}/{col}/{row}.png',
              label: {
                en: '2015 Vere',
                ka: 'ვერეს ხეობა 2015'
              }
            },
            {
              id: 'Norv',
              order: 4,
              type: 'webtiled',
              url:
                'http://mp1.napr.gov.ge/ORTHO_2016-17_NORV/wmts/ORTHO_2016-17_NORV/GLOBAL_MERCATOR/{level}/{col}/{row}.png',
              label: {
                en: '2016-17 Norv',
                ka: 'ორთოფოტო გეგმა 2016-2017'
              }
            },
            {
              id: 'Dasavleti',
              order: 5,
              type: 'webtiled',
              url:
                'http://mp1.napr.gov.ge/ORTHO_2014_DASAVLETI/wmts/ORTHO_2014_DASAVLETI/GLOBAL_MERCATOR/{level}/{col}/{row}.png',
              label: {
                en: '2014 Dasavleti',
                ka: 'დასავლეთი 2014'
              }
            }
          ]
        },
        {
          order: 2,
          id: 'topo',
          label: {
            en: 'Topographic Maps',
            ka: 'ტოპოგრაფიული რუკები'
          },
          nestedLayers: [
            {
              id: 'Topo1000',
              order: 1,
              type: 'webtiled',
              url:
                'http://mp1.napr.gov.ge/TOPO_10k_1952_2007/wmts/TOPO_10000_1952_2007/GLOBAL_MERCATOR/{level}/{col}/{row}.png',
              label: {
                en: 'TOPO 10000 1952_2007',
                ka: '10 000 - იანი ტოპოგრაფიული რუკები 1952-2007'
              }
            },
            {
              id: 'TOPO50000',
              order: 1,
              type: 'webtiled',
              url:
                'http://mp1.napr.gov.ge/TOPO_50k_GEO_2007/wmts/TOPO_50000_GEO_2007/GLOBAL_MERCATOR/{level}/{col}/{row}.png',
              label: {
                en: 'TOPO 50000 GEO_2007',
                ka: '50 000 - იანი ტოპოგრაფიული რუკები 2007'
              }
            }
          ]
        }
      ]
    },
    GROUP_BASEMAP: {
      groupType: 'basemap',
      order: 9,
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
            'https://d2h71bpqsyf4vw.cloudfront.net/2016/${level}/${col}/${row}.png',
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
        },
        {
          id: 'wri_contextual',
          thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/wri_contextual.png',
          title: {
            en: 'WRI Contextual',
            fr: 'WRI Contextual',
            es: 'WRI Contextual',
            pt: 'WRI Contextual',
            id: 'WRI Contextual',
            zh: 'WRI Contextual',
            ka: 'WRI Contextual'
          }
        }
      ]
    },
    extraLayers: [
      {
        id: 'MASK',
        type: 'dynamic',
        order: 10000,
        url:
          'https://gis.forest-atlas.org/server/rest/services/country_masks/country_mask_global/MapServer',
        opacity: 0.35,
        layerIds: [0]
      },
      {
        id: 'LEGEND_LAYER',
        type: 'dynamic',
        url: 'https://gis-gfw.wri.org/arcgis/rest/services/legends/MapServer',
        visible: true,
        opacity: 0,
        layerIds: []
      },
      {
        id: 'USER_FEATURES',
        type: 'graphic',
        visible: true
      }
    ]
  },
  otherFieldsModules: ''
};
