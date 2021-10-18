import { AnalysisModule } from '../src/js/store/appSettings/types';

export const defaultAnalysisModules: AnalysisModule[] = [
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
      en: 'This analysis counts the number of VIIRS fire alert detections during the past 7 days',
      fr: 'Cette analyse compte le nombre d’alertes de détection d’incendies VIIRS durant les 7 derniers jours',
      es: 'Este análisis cuenta el número de detecciones de alertas de incendios VIIRS durante los últimos siete días',
      pt: 'Incêndios ativos VIIRS',
      id: 'Analisis ini menghitung jumlah deteksi peringatan kebakaran VIIRS selama 7 hari terakhir',
      zh: '此分析可统计过去 7 天 VIIRS 火警监测的次数。',
      ka: 'ეს ანალიზი თვლის VIIRS ხანძრის შეტყობინებების გამოვლენის რაოდენობას ბოლო 7 დღის განმავლობაში.'
    },
    useGfwWidget: true,
    widgetId: '5d696f96-e6c7-4323-8bda-4c99cd6b0cb4',
    analysisParams: [
      {
        type: 'date-picker',
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
    ],
    sqlString:
      'select COALESCE(sum(alert__count), 0)  as "sum" from nasa_viirs_fire_alerts where alert__date >= {startDate} and alert__date <= {endDate}'
  },
  {
    analysisId: 'GLAD_ALERTS',
    chartType: 'line',
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
      en: 'Count the number of GLAD alerts which occurred within the selected time range.',
      fr: 'Compte le nombre d’alertes GLAD durant la période sélectionnée.',
      es: 'Cuente el número de alertas GLAD que ocurrieron en el rango de tiempo seleccionado.',
      pt: 'Quantifica o número de alertas GLAD ocorridos em um período selecionado.',
      id: 'Hitung jumlah peringatan GLAD yang terjadi dalam rentang waktu yang dipilih.',
      zh: '统计在所选时间范围内出现的 GLAD 预警次数。',
      ka: 'Count the number of GLAD tree cover loss alerts per month.'
    },
    useGfwWidget: true,
    widgetId: '0734ba0a-3a6c-4388-aa4a-5871791b1d1f',
    analysisParams: [],
    sqlString:
      'select count(*) from umd_glad_landsat_alerts where umd_glad_landsat_alerts__date >= {startDate} and umd_glad_landsat_alerts__date <= {endDate}'
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
      en: 'Select range and tree cover density then click the run analysis button to see results.',
      fr:
        'Sélectionner la plage et la densité de couverture arborée, puis cliquer sur le bouton « Lancer l’analyse » pour voir les résultats.',
      es:
        'Para ver los resultados, seleccione el rango y la densidad de la cobertura arbórea, después haga clic en el botón ejecutar análisis.',
      pt:
        'Para ver os resultados, selecione o período e a densidade de cobertura arbórea; em seguida, clique no botão para executar a análise.',
      id: 'Pilih rentang dan kerapatan tutupan pohon kemudian klik tombol mulai analisis untuk melihat hasil.',
      zh: '选择范围和森林覆盖密度，然后点击“运行分析”按钮查看结果。',
      ka: 'შეარჩიეთ საზღვრები და ხის ვარჯის სიხშირე, შემდეგ დააჭირეთ ღილაკს ანალიზის ჩატარება შედეგებს სანახავად.'
    },
    useGfwWidget: true,
    widgetId: '12ef50f6-af39-405b-a5b4-1a2f1bbadb1a',
    analysisParams: [
      {
        type: 'rangeSlider',
        bounds: [2001, 2018],
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
        type: 'tcd',
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
    ],
    sqlString:
      'select sum(area__ha) from umd_tree_cover_loss where umd_tree_cover_density_2000__threshold >= {density} group by umd_tree_cover_loss__year'
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
      fr: 'Perte annuelle de la couverture arborée en Paysage Forestier Intact (PFI)',
      es: 'Pérdida de cobertura arbórea anual en Paisajes Forestales Intactos (Intact Forest Landscapes, IFL)',
      pt: 'Perda anual de cobertura arbórea em paisagens florestais intactas (IFL)',
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
      zh: '如果您选择的区域不包括原生森林，将不会提供结果。选择范围和森林覆盖密度，然后点击“运行分析”按钮查看结果。',
      ka:
        'შედეგები არ იქნება ხელმისაწვდომი, თუკი თქვენ მიერ შერჩეული ფართობი არ შეიცავს ხტლ-ს. შეარჩიეთ საზღვრები და ხის ვარჯის სიხშირე, შემდეგ დააჭირეთ ღილაკს ანალიზის ჩატარება შედეგების სანახავად.'
    },
    useGfwWidget: true,
    widgetId: 'f95b2715-6f6b-483d-827a-5dada5614263',
    analysisParams: [
      {
        type: 'rangeSlider',
        bounds: [2001, 2018],
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
        type: 'tcd',
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
    ],
    sqlString:
      "select sum(area__ha) from umd_tree_cover_loss where umd_tree_cover_density_2000__threshold >= {density} and is__ifl_intact_forest_landscapes = 'true' group by umd_tree_cover_loss__year"
  },
  {
    analysisId: 'Loss_LandCover',
    chartType: 'bar',
    label: {
      en: 'Annual tree cover loss by land cover class',
      fr: 'Perte annuelle de la couverture arborée par catégorie de couverture terrestre',
      es: 'Pérdida de cobertura arbórea anual por clase de cobertura de tierra',
      pt: 'Perda anual de cobertura arbórea por classe de cobertura de terra',
      id: 'Kehilangan tutupan pohon tahunan berdasarkan  kelas tutupan lahan',
      zh: '年度森林覆盖减少量（按土地覆盖分类）',
      ka: 'ყოველწლიური ხის ვარჯის კარგვა მიწის საფარის კლასის მიხედვით'
    },
    title: {
      en: 'Annual tree cover loss by land cover class',
      fr: 'Perte annuelle de la couverture arborée par catégorie de couverture terrestre',
      es: 'Pérdida de cobertura arbórea anual por clase de cobertura de tierra',
      pt: 'Perda anual de cobertura arbórea por classe de cobertura de terra',
      id: 'Kehilangan tutupan pohon tahunan berdasarkan  kelas tutupan lahan',
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
    widgetId: 'd8317d56-b7d9-4888-81d4-e1c411c380a4',
    analysisParams: [
      {
        type: 'rangeSlider',
        bounds: [2001, 2018],
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
        type: 'tcd',
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
    ],
    sqlString:
      "select sum(area__ha) from umd_tree_cover_loss where umd_tree_cover_density_2000__threshold >= {density} and is__ifl_intact_forest_landscapes = 'true' group by umd_tree_cover_loss__year"
  }
];
