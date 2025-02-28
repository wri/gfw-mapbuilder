export const pt = {
  title: 'PRODES (Amazônia Legal)',
  subtitle: 'anual, 6,25ha, Amazônia Legal, INPE',
  content: [
    {
      label: 'Função',
      value:
        'Sistema de monitoramento do desmatamento da Amazônia Legal Brasileira, usado pelo governo brasileiro para estabelecer políticas públicas',
    },
    {
      label: 'Resolução',
      value: '6,25ha',
    },
    {
      label: 'Cobertura geográfica',
      value: 'Amazônia Legal Brasileira',
    },
    {
      label: 'Fonte',
      value: 'INPE',
    },
    {
      label: 'Frequência de atualizações',
      value: 'Anualmente',
    },
    {
      label: 'Dados de conteúdo',
      value: '2008-2021',
    },
    {
      label: 'Precauções',
      value:
        'O PRODES identifica apenas clareiras florestais de 6,25 hectares ou maiores, portanto não são detectadas degradação florestal ou clareiras menores causadas por incêndios ou extração seletiva. A cobertura frequente de nuvens sobre as áreas de cobertura pode alterar o ano de desmatamento relatado. O ano relatado é o primeiro ano em que o desmatamento é identificado pelos analistas, mas isso não corresponde necessariamente ao ano do desmatamento se a paisagem tiver sido coberta por nuvens em anos anteriores.',
    },
    {
      label: 'Licença',
      value: 'Creative Commons POR SA 3.0',
    },
  ],
  overview: {
    label: 'Visão geral',
    value:
      'O projeto PRODES monitora o desmatamento em cortes rasos nos biomas Amazônia brasileira e Cerrado, e produz taxas anuais de desmatamento para a região desde 1988. O governo brasileiro usa esses números para estabelecer políticas públicas, incluindo a definição de acesso ao crédito no bioma Amazônia, o estabelecimento de metas de redução do desmatamento e a solicitação de fundos para reduzir o desmatamento. O PRODES historicamente usou imagens do Landsat 5, mas agora também incorpora imagens do Landsat 7 e 8, CBERS-2, CBERS-2B, Resourcesat-1 e UK2-DMC. O PRODES é operado pelo Instituto Nacional de Pesquisas Espaciais (INPE) em colaboração com o Ministério do Meio Ambiente (MMA) e o Instituto Brasileiro do Meio Ambiente e dos Recursos Naturais Renováveis ​​(IBAMA). Desde 2002, todos os dados do PRODES estão disponíveis publicamente online. As imagens de entrada para cada uma das 220 pegadas Landsat que cobrem a Amazônia brasileira e o Cerrado são selecionadas com base na falta de cobertura de nuvens e na data de captura. O sistema PRODES utiliza o ano sazonal, começando em 1º de agosto, para calcular o desmatamento anual, portanto as imagens são selecionadas o mais próximo possível desta data (geralmente de julho, agosto e setembro). De 2003 a 2005, os analistas usaram a transformação de imagens para determinar os componentes de vegetação, solo e sombra usando o programa SPRING. Esses componentes foram segmentados e classificados nas classes florestal, não florestal, desmatamento no ano alvo, desmatamento anterior, nuvens e água, que são então corrigidos manualmente por especialistas. A partir de 2005, foi implementada uma nova metodologia que utiliza a plataforma open source TerraAmazon. A plataforma permite que a análise do PRODES seja mais uniforme e pode incorporar imagens de diversos satélites. Como antes, as imagens são selecionadas para estarem tão livres de nuvens quanto possível. As imagens são então mascaradas para excluir áreas não florestais, desmatamento anterior e água, usando a análise do ano anterior. Os analistas então delineiam polígonos desmatados na floresta intacta do ano anterior. Este conjunto de dados mostra o desmatamento anual em 2008-2020 na Amazônia Legal Brasileira.',
  },
  citation: {
    label: 'Citação',
    value:
      "Instituto Nacional de Pesquisas Espaciais (INPE). 'PRODES desmatamento.' Acessado através do Global Forest Watch em [data]. www.globalforestwatch.org",
  },
};
