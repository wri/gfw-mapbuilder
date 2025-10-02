export const pt = {
  title: 'Landsat-8 / Sentinel-2 Satellite Imagery',
  content: [
    {
      label: 'Função',
      value:
        'Imagens de satélite de alta resolução são essenciais para contextualizar outras camadas de dados disponíveis na GFW, como a interpretação dos fatores de alteração da cobertura arbórea. Elas são comumente utilizadas para identificar possíveis causas de alertas de desmatamento em tempo quase real. As imagens também podem ser utilizadas em protocolos de validação, para avaliar a precisão da cobertura do solo/arbórea e produtos de alteração.',
    },
    {
      label: 'Resolução',
      value: 'Sentinal-2: 10 x 10 meters, Landsat 8: 30 x 30 meters',
    },
    {
      label: 'Cobertura geográfica',
      value: 'Global',
    },
    {
      label: 'Fonte',
      value:
        'Copernicus Sentinel-2. Retrieved from Google Earth Engine. Data processed by the European Space Agency (ESA).',
    },
    {
      label: 'Frequência de atualizações',
      value:
        'Novas imagens ficam disponíveis diariamente. Prazo de atualização das imagens: Sentinel-2A: A cada 10 dias, Landsat 8: A cada 16 dias',
    },
    {
      label: 'Dados de conteúdo',
      value: 'De janeiro de 2012 até o momento',
    },
  ],
  overview: {
    label: 'Visão geral',
    value:
      'Esses dados mostram as mais recentes imagens de satélite que preenchem os critérios selecionados de cobertura de nuvens dos sistemas Sentinel-2 e Landsat 8. O sistema Sentinel-2, operado pela Agência Espacial Europeia, possui cobertura global em resoluções de 10 metros e pode obter imagens atualizadas a cada 10 dias. O Landsat 8, operado pelo Serviço Geológico dos Estados Unidos, também é um satélite global e pode obter imagens atualizadas, com uma resolução de 30 metros, a cada 16 dias. Imagens que retratam a cor natural e a saúde da vegetação estão disponíveis nos dois satélites. As imagens em cores naturais utilizam as informações da luz visível (vermelho, verde e azul) para mostrar a superfície da Terra tal como ela aparece ao olho humano. A saúde da vegetação é detectada utilizando o Índice de Vegetação por Diferença Normalizada (NDVI), que incorpora informações de refletância no vermelho e quase infravermelho. Esse método se baseia no fato de que a vegetação saudável absorve a maior parte da luz visível e reflete a maior parte da luz quase infravermelha que atinge sua superfície. Ao interpretar imagens que mostram a saúde da vegetação, lembre que vermelho indica vegetação saudável em crescimento, verde indica solo descoberto e preto indica corpos de água.',
  },
};
