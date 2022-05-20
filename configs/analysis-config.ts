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
        multi: true,
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
    analysisId: 'BIODIVERSITY_HOTSPOTS',
    chartType: 'badge', //badge, pie, bar, line
    label: {
      en: 'Biodiversity Hotspots',
      fr: '',
      es: '',
      pt: '',
      id: '',
      zh: '',
      ka: ''
    },
    title: {
      en: 'Biodiversity Hotspots',
      fr: '',
      es: '',
      pt: '',
      id: '',
      zh: '',
      ka: ''
    },
    description: {
      en:
        'Displays Conservation International’s biodiversity hotspots—defined regions around the world where biodiversity conservation is most urgent because of high levels of endemism and human threat',
      fr: '',
      es: '',
      pt: '',
      id: '',
      zh: '',
      ka: ''
    },
    widgetId: '4b1676f4-1c07-4c87-80f1-0f348bddc42b',
    analysisParams: [
      /*{
        type: 'date-picker', //'range-slider' | 'tcd' | 'date-picker'
        label: {
          en: 'Select range for analysis',
          fr: 'Sélectionner une plage pour l’analyse',
          es: 'Seleccione un rango para el análisis',
          pt: 'Selecione o período para análise',
          id: 'Pilih rentang untuk analisis',
          zh: '选择分析范围',
          ka: 'საზღვრების შერჩევა ანალიზისთვის',
        },
      },*/
    ],
    sqlString: 'select count(name) as "sum" from ci_biodiversity_hotspots'
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
    analysisParams: [
      {
        multi: true,
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
      'select count(*) from umd_glad_landsat_alerts where umd_glad_landsat_alerts__date >= {startDate} and umd_glad_landsat_alerts__date <= {endDate}'
  },
  {
    analysisId: 'TC_LOSS',
    chartType: 'bar',
    label: {
      en: 'Annual Tree Cover Loss',
      fr: 'Pertes de la couverture arborée annuelles',
      es: 'Pérdida de cobertura arbórea anual',
      pt: 'Perda anual de cobertura arbórea',
      id: 'Kehilangan tutupan pohon tahunan',
      zh: '年度森林覆盖减少量面积',
      ka: 'წლიური ხის ვარჯის კარგვა'
    },
    title: {
      en: 'Annual Tree Cover Loss',
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
        multi: true,
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
      en: 'Annual Tree Cover Loss in Intact Forest Landscapes (IFL)',
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
        multi: true,
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
      en: 'Land cover data is from 2015 and provided by the European Space Agency (ESA) and UCLouvain.',
      fr:
        'Les données de la couverture terrestre datent de 2015 et sont fournies par l’Agence Spatiale Européenne (European Space Agency, ESA) et UCLouvain.',
      es:
        'Los datos de la cobertura de tierra son de 2015 y fueron proporcionados por la Agencia Espacial Europea (European Space Agency, ESA) y UCLouvain. ',
      pt:
        'Dados de cobertura de terra relativos ao período posterior a 2015 e fornecidos pela Agência Espacial Europeia (ESA) e pela UCLouvain. ',
      id: 'Data tutupan lahan dari tahun 2015 yang disediakan oleh Badan Antariksa Eropa () dan UCLouvain.',
      zh: '自 2015 年以来的土地覆盖数据，由欧洲空间局 (ESA) 和 UCLouvain 提供。 ',
      ka:
        'მიწის საფარის მონაცემები 2015 წლის შემდეგაა და მოწოდებულია ევროპული კოსმოსური სააგენტოს (ESA)  და ლუვენის კათოლიკური უნივერსიტეტის (UCLouvain) მიერ.'
    },
    useGfwWidget: true,
    widgetId: 'd8317d56-b7d9-4888-81d4-e1c411c380a4',
    analysisParams: [],
    sqlString: 'select sum(area__ha) from esa_land_cover_2015 group by esa_land_cover_2015__class'
  },
  {
    analysisId: 'TC_LOSS_TOTAL',
    chartType: 'badge',
    label: {
      en: 'Total Tree Cover Loss',
      fr: 'Perte total de la couverture arborée',
      es: 'Pérdida de cobertura arbórea total',
      pt: 'Perda total de cobertura arbórea',
      id: 'Total kehilangan tutupan pohon ',
      zh: '总森林覆盖减少',
      ka: 'ხის ვარჯის საერთო კარგვა'
    },
    title: {
      en: 'Total Tree Cover Loss',
      fr: 'Perte total de la couverture arborée',
      es: 'Pérdida de cobertura arbórea total',
      pt: 'Perda total de cobertura arbórea',
      id: 'Total kehilangan tutupan pohon ',
      zh: '总森林覆盖减少',
      ka: 'ხის ვარჯის საერთო კარგვა'
    },
    description: {
      en:
        'Click the run analysis button to see results. This analysis includes tree cover with >30% tree canopy density.',
      fr:
        'Cliquez sur le bouton « Lancer l’analyse » pour voir les résultats. Cette analyse comprend la couverture arborée avec une densité de canopée >30 %.',
      es:
        'Haga clic en el botón ejecutar análisis. Este análisis incluye la cobertura arbórea con> 30% de densidad de la copa de los árboles.',
      pt:
        'Clique no botão para executar a análise. Esta análise inclui cobertura de árvores com> 30% de densidade da copa das árvores.',
      id:
        'Klik tombol mulai analisis untuk melihat hasil. Analisis ini meliputi tutupan pohon dengan kerapatan tajuk pohon >30%.',
      zh: '点击“运行分析”按钮查看结果。分析包括树冠密度 >30% 的树木覆盖率。',
      ka: 'შედეგების სანახავად დააჭირეთ ღილაკს ანალიზი. ანალიზი მოიცავს 30%-ზე მეტი სიმკვრივის ხეებს.',
      hy: 'Սեղմեք «Կատարել վերլուծություն» կոճակը:Վերլուծությունը ներառում է ավելի քան 30% խտությամբ ծառեր:',
      az: 'Təhlili həyata keçirin düyməsini basın. Təhlil 30%-dən çox sıxlığı olan ağacları əhatə edir.'
    },
    useGfwWidget: true,
    widgetId: '7a7aba4a-2b71-47d7-983a-bdba4c4b6223',
    analysisParams: [],
    sqlString: 'select sum(area__ha) from umd_tree_cover_loss where umd_tree_cover_density_2000__threshold >= {density}'
  },
  {
    analysisId: 'TC_GAIN_TOTAL',
    chartType: 'badge',
    label: {
      en: 'Total Tree Cover Gain',
      fr: 'Gain total de la couverture arborée',
      es: 'Ganancia de cobertura arbórea total',
      pt: 'Ganho total de cobertura arbórea',
      id: 'Perolehan tutupan pohon ',
      zh: '增加面积量',
      ka: 'ხის ვარჯის საერთო მატება'
    },
    title: {
      en: 'Total Tree Cover Gain',
      fr: 'Gain total de la couverture arborée',
      es: 'Ganancia de cobertura arbórea total',
      pt: 'Ganho total de cobertura arbórea',
      id: 'Total perolehan tutupan pohon ',
      zh: '增加面积量',
      ka: 'ხის ვარჯის საერთო მატება'
    },
    description: {
      en:
        'Gain data is currently only available for 2000 – 2012 and the gain analysis will always reflect the full 12-year time-period.',
      fr:
        'Les données de gain ne sont actuellement disponibles que pour 2000 – 2012 et l’analyse de gain reflétera toujours la plage de 12 ans entière.',
      es:
        'Los datos sobre ganancia actualmente solo están disponibles para los años 2000 a 2012 y el análisis de la ganancia siempre reflejará el periodo de 12 años completo.',
      pt:
        'Os dados de ganho estão disponíveis atualmente apenas para o período 2000 – 2012 e a análise de ganho sempre refletirá o período completo de 12 anos.',
      id:
        'Data perolehan saat ini hanya tersedia untuk periode 2000 – 2012 dan analisis perolehan akan selalu mencerminkan periode waktu 12 tahun penuh.',
      zh: '目前仅有 2000 – 2012 年的增加量数据，增加分析始终反映这 12 年的完整情况。',
      ka:
        'მატების მონაცემები ამჟამად ხელმისაწვდომია 2000-2012 წლებისთვის და მატების ანალიზი ყოველთვის ასახავს სრულ 12-წლიან დროის პერიოდს.'
    },
    useGfwWidget: true,
    widgetId: '8e6f1e58-bdb8-4e2d-bb08-9c223de53896',
    analysisParams: [],
    sqlString: 'select sum(area__ha) from umd_tree_cover_gain'
  }
];
