export default {
  webmap: '8189599625d44c219e6b7a060a048dc2',
  title: 'Vibrant Oceans',
  subtitle: 'Exploring Coral Reef Conservation Priorities',
  logoUrl:
    'https://programs.wcs.org/Desktopmodules/WCSVega/WCSMapBuilder/wcslogo.png',
  logoLinkUrl: 'https://programs.wcs.org/vibrantoceans/',
  aboutLinkUrl: '',
  downloadLinkUrl: '',
  printServiceUrl:
    'https://gis.forest-atlas.org/server/rest/services/print/ExportWebMap/GPServer/Export%20Web%20Map',
  maskServiceUrl: '',
  mapThemeIds: '',
  mapThemes: '',
  narrative: '',
  includeSubscribeButton: false,
  includeMyGFWLogin: false,
  navLinksInNewTab: false,
  hideHeader: false,
  hideFooter: false,
  language: 'en',
  webmapMenuName: 'WCS Layers',
  useAlternativeLanguage: true,
  alternativeWebmap: '',
  alternativeLanguage: 'fr',
  alternativeLanguageTitle: '',
  alternativeLanguageSubtitle: '',
  alternativeMapThemes: '',
  alternativeNarrative: '',
  alternativeWebmapMenuName: '',
  includeDocumentsTab: false,
  documentsDirectory: '',
  documentsMapserver: '',
  iso: '',
  initialExtent: {
    x: '',
    y: '',
    z: ''
  },
  analysisModules: [
    {
      analysisId:
        'WCS_OceansPopulationWithin5km_WCSBarChart1DropDown_[TabID]_[PortalID]_[Locale]___',
      label: {
        en: 'Oceans: Population Within 5km'
      },
      title: {
        en: 'Oceans: Population Within 5km'
      },
      description: {
        en: 'Click below to run the analysis for Population Within 5km'
      },
      useGfwWidget: true,
      widgetId: '684e5f08-d657-41c8-aa1d-0b87f3bec079',
      uiParams: 'none',
      chartType: 'bar'
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
    }
  ],
  layerPanel: {
    GROUP_WEBMAP: {
      order: 1,
      label: {
        en: 'WCS Layers'
      },
      layers: []
    },
    GROUP_Range: {
      groupType: 'default',
      order: 2,
      label: {
        en: 'Species Data'
      },
      layers: []
    },
    GROUP_Other: {
      order: 3,
      label: {
        en: 'Other'
      },
      layers: []
    },
    GROUP_BASEMAP: {
      groupType: 'basemap',
      order: 4,
      label: {
        en: 'Basemap',
        fr: 'Basemap',
        es: 'Basemap',
        pt: 'Basemap',
        id: 'Basemap',
        zh: 'Basemap',
        ka: '?????? ????'
      },
      layers: []
    },
    extraLayers: []
  }
};
