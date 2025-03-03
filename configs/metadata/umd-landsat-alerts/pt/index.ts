export const pt = {
  title: 'Alertas de desmatamento GLAD-Landsat (GLAD-L)',
  subtitle: '(semanalmente, 30m, trópicos, UMD/GLAD)',
  download_data: 'http://glad-forest-alert.appspot.com/',
  content: [
    {
      label: 'Função',
      value: 'Identifica áreas com provável perda de cobertura arbórea quase em tempo real',
    },
    {
      label: 'Resolução',
      value: '30 × 30 metros',
    },
    {
      label: 'Cobertura geográfica',
      value: '30 graus norte a 30 graus sul',
    },
    {
      label: 'Fonte',
      value:
        'Hansen, MC, A. Krylov, A. Tyukavina, PV. Potapov, S. Turubanova, B. Zutta, S. Ifo, B. Margono, F. Stolle e R. Moore. 2016. Alertas de perturbação de florestas tropicais úmidas usando dados Landsat. Cartas de Pesquisa Ambiental, 11 (3)',
    },
    {
      label: 'Frequência de atualizações',
      value: 'Atualizado semanalmente',
    },
    {
      label: 'Dados de conteúdo',
      value:
        '1º de janeiro de 2021 (os alertas GLAD-L estão em operação desde 2015 para países selecionados nas bacias da Amazônia e do Congo e no Sudeste Asiático insular, mas os dados históricos não estão disponíveis no GFW)',
    },
    {
      label: 'Precauções',
      value:
        'Embora sejam chamados de “alertas de desmatamento”, esses alertas detectam perturbações na floresta ou na cobertura arbórea. Este produto não faz distinção entre tipos de perturbações causadas pelo homem e outras. Quando os alertas são detectados em plantações florestais (mais prováveis ​​de acontecer no sistema GLAD-L), os alertas podem indicar operações de colheita de madeira, sem conversão para um uso da terra não florestal. \n\nO termo desmatamento é usado porque estes são eventos potenciais de desmatamento e os alertas poderiam ser investigados mais detalhadamente para determinar isso. \n\nNão recomendamos o uso de alertas de desmatamento para avaliação de tendências globais ou regionais, nem para estimativas de área. Recomendamos a utilização dos dados anuais de perda de cobertura arbórea para uma comparação mais precisa das tendências nas mudanças florestais ao longo do tempo e para estimativas de área. Alertas recentes incluirão falsos positivos que ainda não aumentaram o seu nível de confiança e poderão eventualmente ser removidos. Os alertas anteriores podem ter sido removidos por engano da base de dados se o rápido fechamento da cobertura preceder as observações adicionais desobstruídas por satélite dentro de 6 meses. Além disso, as atualizações nas metodologias, o número diferente de sistemas (no caso dos alertas integrados) e a variação na cobertura de nuvens entre meses e anos representam riscos adicionais ao uso de alertas de desmatamento para comparação inter/intra-anual. \n\nOs alertas podem ser “curados” para identificar os alertas de interesse para um usuário, como aqueles que são provavelmente desmatamento e podem ser priorizados para ação. Um usuário pode fazer isso sobrepondo outros conjuntos de dados contextuais, como áreas protegidas ou árvores plantadas. Os dados não selecionados são fornecidos aqui para que os usuários possam definir suas próprias abordagens de priorização. Os locais de alerta selecionados são fornecidos na camada de dados Places to Watch. \n\nEmbora os satélites Landsat 8 e 9 (anteriormente Landsat 7 e 8) juntos tenham um período de revisita de 8 dias, a cobertura de nuvens pode limitar a disponibilidade de imagens, especialmente na estação chuvosa. As datas de alerta representam o caso de detecção, embora a perda de cobertura arbórea possa ter ocorrido mais cedo, possivelmente semanas antes, devido à cobertura persistente de nuvens. Observe que os alertas GLAD-L eram anteriormente provenientes de imagens do Landsat 7, que tinham um problema conhecido na linha de varredura que às vezes resultava em alertas falsos positivos, até abril de 2023, quando a entrada foi alterada para o Landsat 9. \n\n\nNeste conjunto de dados, “cobertura de árvores” é definida como toda a vegetação com mais de 5 metros de altura e mais de 60% de cobertura de copa, podendo assumir a forma de florestas naturais ou plantações. “Perda de cobertura de árvores” indica a remoção da copa de pelo menos meio pixel e pode ser devido a uma variedade de fatores, incluindo colheita mecânica, incêndio, doença ou danos causados ​​por tempestades. Como tal, “perda” não equivale a desmatamento. \n\nNo Peru, onde o sistema de alerta foi desenvolvido pela primeira vez, os autores avaliaram que os dados tinham 13,5% de falsos positivos (perdas detectadas onde nenhuma ocorreu), embora a maioria desses falsos positivos (9,5%) ocorra nas bordas das clareiras. Nas bordas, os pixels do Landsat de 30 m mostram uma mistura de floresta e outras coberturas do solo, o que os torna propensos a erros no sistema. A taxa de falsos positivos cai para 1% quando se consideram apenas alertas de alta confiança. Os dados têm 33% de falsos negativos (perdas não detectadas onde ocorreram), embora a maioria deles ocorra em florestas secundárias – provavelmente porque o algoritmo foi criado para capturar a perda de florestas primárias. A taxa mais elevada de falsos negativos em comparação com falsos positivos também indica que os alertas são uma estimativa conservadora da perda de cobertura arbórea que está realmente a ocorrer. \n\nO nível de confiança pode mudar retroativamente à medida que os dados de origem são atualizados; alertas que não se tornaram altamente confiáveis ​​dentro de 180 dias ou após 4 observações são removidos do conjunto de dados \n\nQuando um pixel de alerta atingir alta confiança, a perda florestal não será detectada novamente naquele local. \n\nQuando reduzida, esta camada de dados exibe algum grau de imprecisão porque os pontos de dados devem ser recolhidos para serem visíveis em uma escala maior. Aumente o zoom para obter mais detalhes.',
    },
    {
      label: 'Licença',
      value: 'CC POR 4,0',
    },
  ],
  overview: {
    label: 'Visão geral',
    value:
      'Este conjunto de dados, criado pelo laboratório GLAD (Global Land Analysis & Discovery) da Universidade de Maryland e apoiado pela Global Forest Watch, é o primeiro sistema de alerta baseado em Landsat para perda de cobertura arbórea. Embora a maioria dos produtos de alerta de perda existentes use imagens MODIS com resolução de 250 metros, esses alertas têm resolução de 30 metros e, portanto, podem detectar perdas em uma escala espacial muito mais precisa. Esses alertas têm resolução de 30 metros e estão operacionais para áreas terrestres entre 30 graus norte e sul. \n\nNovas imagens do Landsat 8 e 9 são baixadas à medida que são publicadas on-line, avaliadas quanto à cobertura de nuvens ou baixa qualidade dos dados e comparadas com as métricas derivadas do Landsat dos três anos anteriores (incluindo classificações, médias e regressões de bandas vermelhas, infravermelhas e de ondas curtas, e classificações de NDVI, NBR e NDWI). As métricas e a imagem Landsat mais recente são analisadas através de sete árvores de decisão para calcular uma probabilidade média de perturbação florestal. Pixels com probabilidade >50% são relatados como alertas de perda de cobertura de árvores. Todo o processo é executado no Google Earth Engine para garantir atualizações confiáveis ​​e escalabilidade. Para obter mais informações sobre metodologia, consulte o artigo em Environmental Research Letters. \n\nOs alertas não são classificados como de alta confiança até que duas ou mais das quatro observações consecutivas sejam rotuladas como perda de cobertura arbórea. Os alertas são removidos do conjunto de dados após quatro observações consecutivas ou mais de 180 dias se não forem classificados como de alta confiança. Você pode optar por visualizar apenas alertas de alta confiança no menu, mas tenha em mente que usar apenas alertas de alta confiança perde as detecções mais recentes de perda de cobertura de árvores.',
  },
  citation: {
    label: 'Citação',
    value:
      'Use o seguinte crédito quando esses dados forem exibidos: \n\nFonte: GLAD/UMD, acessado através do Global Forest Watch \n\nUse o seguinte crédito quando esses dados forem citados: \n\nHansen, MC, A. Krylov, A. Tyukavina, PV. Potapov, S. Turubanova, B. Zutta, S. Ifo, B. Margono, F. Stolle e R. Moore. 2016. Alertas de perturbação de florestas tropicais úmidas usando dados Landsat. Cartas de Pesquisa Ambiental, 11 (3). Acessado através do Global Forest Watch em [data]. www.globalforestwatch.org',
  },
};
