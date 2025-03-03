export const pt = {
  title: 'Incêndios ativos VIIRS',
  subtitle: '(diário, 375 m, global, NASA)',
  download_data: 'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/active-fire-data',
  learn_more: 'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/viirs-i-band-active-fire-data',
  content: [
    {
      label: 'Função',
      value: 'Mostra dados de alertas de queimadas para as últimas 24 horas, 48 horas, 72 horas ou 7 dias',
    },
    {
      label: 'Resolução',
      value: '375 × 375 metros',
    },
    {
      label: 'Cobertura geográfica',
      value: 'Global',
    },
    {
      label: 'Fonte',
      value: 'NASA',
    },
    {
      label: 'Frequência de atualizações',
      value: 'Duas vezes ao dia',
    },
    {
      label: 'Dados de conteúdo',
      value: 'Quase em tempo real',
    },
    {
      label: 'Precauções',
      value:
        'Nem todas as queimadas são detectadas. Existem várias razões pelas quais o VIIRS pode não ter detectado uma determinada queimada. Ela pode ter começado e terminado entre os movimentos de satélite. O fogo pode ter sido muito pequeno ou estava muito frio para ser detectado no pixel de 375 metros. O tempo nublado, a fumaça densa ou o dossel da árvore pode ocultar completamente uma queimada.',
    },
    {
      label: 'Licença',
      value:
        'Reconhecemos o uso de dados e imagens do LANCE FIRMS operado pela NASA/GSFC/Earth Science Data and Information System (ESDIS, ou, em português, Sistema de Informações e Dados de Geociências) com financiamento da NASA/Sede.',
    },
  ],
  overview: {
    label: 'Visão geral',
    value:
      'Os dados sobre queimadas ativas da VIIRS (VNP14IMGT) são o mais novo produto para monitoramento de queimadas da FIRMS (Fire Information for Resource Management System). Serve para identificar focos de queimada no mundo todo quase em tempo real. As informações são coletadas pelo sensor da Visible Infrared Imaging Radiometer Suite (VIIRS) e processadas com um algoritmo de detecção de queimadas para marcar queimadas ativas. Cada ponto no mapa representa o centro de um pixel de 375 metros que foi marcado pelo algoritmo.',
  },
  citation: {
    label: 'Citação',
    value:
      'NASA FIRMS. “VIIRS Active Fires.” Accessed through Global Forest Watch on 30/01/2025. www.globalforestwatch.org',
  },
};
