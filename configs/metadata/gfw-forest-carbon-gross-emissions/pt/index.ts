export const pt = {
  title: 'Emissões de Carbono Florestal',
  subtitle: '30 m, global, 2001-2023, Harris et al. 2021',
  download_data: 'https://data.globalforestwatch.org/datasets/753016096c1d49f0977e7b62533375ee',
  learn_more: '',
  content: [
    {
      label: 'Função',
      value:
        'Exibe as emissões de gases de efeito estufa florestais provenientes de distúrbios de substituição estáveis',
    },
    {
      label: 'Resolução',
      value: '30 × 30m',
    },
    {
      label: 'Cobertura geográfica',
      value: 'Global',
    },
    {
      label: 'Fonte',
      value:
        'Harris, N.L., D.A. Gibbs, A. Baccini, R.A. Birdsey, S. de Bruin, M. Farina, L. Fatoyinbo, M.C. Hansen, M. Herold, R.A. Houghton, P.V. Potapov, D. Requena Suarez, R.M. Roman-Cuesta, S.S. Saatchi, C.M. Slay, S.A. Turubanova, A. Tyukavina. 2021. Global maps of twenty-first century forest carbon fluxes. Nature Climate Change. https://doi.org/10.1038/s41558-020-00976-6',
    },
    {
      label: 'Frequência de atualizações',
      value: 'Annual',
    },
    {
      label: 'Dados de conteúdo',
      value: '2001-2023',
    },
    {
      label: 'Precauções',
      value:
        '- Os dados são o produto da modelagem e, portanto, têm um grau inerente de erro e imprecisão. Os usuários são fortemente encorajados a ler e compreender completamente os metadados e outra documentação disponível antes da utilização dos dados.\n- Os valores são aplicáveis apenas a áreas florestais (cobertura de dossel >30 por cento e >5 m de altura ou áreas com ganho de cobertura arbórea). Consulte o Harris et al. (2021) para mais informações sobre a definição de floresta usada na análise.\n- Embora as emissões em cada pixel estejam associadas a um ano específico de distúrbio, as emissões numa área desejada refletem o total durante o período do modelo de 2001 a 2023. Assim, os valores devem ser divididos por 23 para que as remoções médias anuais sejam calculadas.\n- As emissões refletem os distúrbios de substituição estáveis como observado nas imagens do satélite Landsat e não incluem as emissões da degradação da floresta não observada.\n- As emissões refletem uma estimativa bruta, ou seja, as remoções de carbono de qualquer rebrota que ocorra após o distúrbio não estão incluídas. Em vez disso, as remoções brutas de carbono são contabilizadas na camada de remoções de carbono florestal acompanhante.\n- Os dados de emissões contêm inconsistências temporais. Melhorias na detecção da perda de cobertura arbórea devido à incorporação de novos dados de satélite e mudanças de metodologia entre 2011 e 2015 podem resultar em estimativas de emissões mais altas nos últimos anos em comparação com anos anteriores. Acesse aqui para mais informações.\n- As emissões de carbono florestal não refletem as transferências de carbono dos reservatórios de carbono do ecossistema para o reservatório de produtos de madeira colhida (HWP).\n- Esse conjunto de dados foi atualizado desde sua publicação original. Veja a Visão Geral para mais informações.',
    },
    {
      label: 'Licença',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Visão geral',
    value:
      'Essa camada de emissões faz parte do modelo de fluxo de carbono florestal descrito no Harris et al. (2021). Esse artigo apresenta uma estrutura de monitoramento geoespacial que estima os fluxos globais de carbono florestal que podem ajudar uma variedade de atores e organizações no rastreamento dos fluxos de gases de efeito estufa das florestas e na diminuição das emissões ou no aumento das remoções pelas florestas. As emissões de carbono florestal representam as emissões de gases de efeito estufa decorrentes de distúrbios florestais que substituíram povoamentos e que ocorreram em cada ano do modelo (megagramas de emissões de CO2/ha, entre 2001 e 2023). As emissões incluem todos os reservatórios relevantes de carbono do ecossistema (biomassa acima do solo, biomassa abaixo do solo, madeira morta, lixo, carbono orgânico do solo) e gases de efeito estufa (CO2, CH4, N2O). As estimativas de emissões para cada pixel são calculadas conforme as Diretrizes do IPCC para inventários nacionais de gases de efeito estufa onde ocorreram distúrbios na substituição de povoamentos, conforme mapeado nos dados anuais de perda de cobertura arbórea do Global Forest Change do Hansen et al. (2013). O carbono emitido por cada pixel é baseado nas densidades de carbono em 2000, com ajuste para carbono acumulado entre 2000 e o ano do distúrbio.\n\nAs emissões refletem uma estimativa bruta, ou seja, as remoções de carbono provenientes da regeneração subsequente não estão incluídas. Em vez disso, as remoções brutas de carbono resultantes da regeneração subsequente após o desmatamento são contabilizadas na camada complementar de remoções de carbono florestal. A fração de carbono emitida por cada pixel após o distúrbio (fator de emissão) é afetada por vários fatores, incluindo o fator direto do distúrbio, se o incêndio foi observado no ano anterior ou no ano do evento observado do distúrbio, se o distúrbio ocorreu na turfa, e assim por diante. Presume-se que todas as emissões ocorreram no ano do distúrbio. As emissões podem ser atribuídas a um ano específico usando os dados de perda de cobertura arbórea do Hansen; rasters separados para emissões de cada ano não estão disponíveis no GFW. Todas as camadas de entrada foram redefinidas para uma resolução comum de 0,00025 × 0,00025 graus cada para corresponder ao Hansen et al. (2013).\n\n- A cada ano, a perda de cobertura arbórea, os fatores de perda de cobertura arbórea e a área queimada são atualizados. Em 2023 e 2024, alguns conjuntos de dados de entrada e constantes do modelo também foram alterados, conforme descrito abaixo. Consulte esta postagem do blog para saber mais.\n- A fonte da proporção entre o carbono da biomassa abaixo do solo e o carbono da biomassa acima do solo. Anteriormente era usado uma constante global; agora usa-se o mapa do Huang et al. de 2021\n- Os anos de ganho de cobertura arbórea. Anteriormente era usado de 2000 a 2012; agora usa-se de 2000 a 2020 do Potapov et al. de 2022.\n- A fonte dos dados de incêndios. Anteriormente era usado o MODIS para visualização da área queimada; agora usa-se a perda de cobertura arbórea por incêndios do Tyukavina et al. de 2022.\n- A fonte dos mapas de turfa. Novos conjuntos de dados tropicais foram incluídos e o conjunto de dados acima de 40 graus ao norte foi alterado.\n- Constantes do potencial de aquecimento global (GWP) para CH4 e N2O. Anteriormente era usado o GWP do Quinto Relatório de Avaliação do IPCC; agora usa-se o GWP do Sexto Relatório de Avaliação do IPCC.\n- Fatores de remoção para florestas temperadas secundárias mais antigas (>20 anos) e suas incertezas associadas. Fatores de remoção usados anteriormente publicados na Tabela 4.9 do Refinamento de 2019 das Diretrizes do IPCC de 2006 para Inventários Nacionais de Gases de Efeito Estufa; agora utiliza fatores de remoção corrigidos e incertezas da 4ª Retificação ao Refinamento de 2019 das Diretrizes do IPCC de 2006 para Inventários Nacionais de Gases de Efeito Estufa.\n- Extensão das árvores plantadas e fatores de remoção. Anteriormente era usado o Spatial Database of Planted Trees (SDPT) versão 1.0; agora usa-se o SDPT versão 2.0 e fatores de remoção associados.\n\nAs emissões estão disponíveis para download em duas unidades de área diferentes: 1) megagramas de emissões de CO2/ha e 2) megagramas de emissões de CO2/pixel. A primeira é adequada para visualizar (mapear) emissões porque representa a densidade de emissões por hectare. A segunda é adequada para calcular as emissões em uma área de interesse (AOI) porque os valores dos pixels na AOI podem ser somados para obter as emissões totais para aquela área. Os valores desta última foram calculados ajustando as emissões por hectare pelo tamanho de cada pixel, que varia conforme a latitude. Ambos os conjuntos de dados incluem apenas pixels dentro de florestas, conforme definido nos métodos de Harris et al. (2021) e atualizado com ganho de cobertura arbórea até 2020. ',
  },
  citation: {
    label: 'Citação',
    value:
      'Harris et al. (2021). Global maps of 21st century forest carbon fluxes. Accessed on 14/02/2025 from Global Forest Watch.',
  },
};
