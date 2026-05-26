export const pt = {
  title: 'Remoções de Carbono Florestal',
  subtitle: '30 m, global, 2001-2025, Harris et al. 2021',
  download_data: 'https://data.globalforestwatch.org/datasets/94871bf57f544ea39e594feb92b06305',
  learn_more: 'https://www.nature.com/articles/s41558-020-00976-6',
  content: [
    {
      label: 'Função',
      value: 'Exibe as remoções de carbono florestal por sumidouros florestais',
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
      value: '2001-2025',
    },
    {
      label: 'Precauções',
      value:
        '- Os dados são o produto da modelagem e, portanto, têm um grau inerente de erro e imprecisão. Os usuários são fortemente encorajados a ler e compreender completamente os metadados e outra documentação disponível antes da utilização dos dados.\n- Os valores são aplicáveis a áreas florestais (cobertura do dossel >30 por cento e >5 m de altura ou áreas com ganho de cobertura arbórea). Veja o Harris et al. (2021) para obter mais informações sobre a definição de floresta utilizada na análise.\n- As remoções de carbono refletem o total de remoções durante o período modelo de 2001 a 2025, e não uma série temporal anual a partir da qual se possa gerar uma tendência. Assim, os valores devem ser divididos por 23 para o cálculo das remoções médias anuais.\n- A indefinição é maior nas remoções brutas do que nas emissões, especialmente devido à indefinição nos fatores de remoção.\n- As remoções de carbono refletem uma estimativa bruta, ou seja, emissões de carbono de perdas de cobertura arbórea anteriores ou subsequentes não são incluídas. Em vez disso, as emissões brutas de carbono são contabilizadas na camada complementar de emissão de carbono florestal.\n- Os dados de remoções contêm inconsistências temporais porque o ganho de cobertura arbórea representa um total acumulado de 2000 a 2020, em vez de ganhos anuais estimados até 2025.\n- As remoções de carbono florestal refletem aquelas que ocorrem somente dentro dos ecossistemas florestais e não refletem o aumento do estoque de carbono na reserva de produtos de madeira colhida (HWP).\n- Grandes saltos em remoções ao longo de algumas fronteiras são decorrência do uso de fatores de remoção específicos da ecozona. As mudanças nas remoções ocorrem nas fronteiras de ecozonas, onde diferentes fatores de remoção são aplicados em cada um dos lados.\n- Esse conjunto de dados foi atualizado desde sua publicação original. Veja a Visão Geral para mais informações.',
    },
    {
      label: 'Licença',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Visão geral',
    value:
      'Essa camada de remoções de carbono faz parte do modelo de fluxo de carbono florestal descrito no Harris et al. (2021). Esse artigo apresenta uma estrutura de monitoramento geoespacial que estima os fluxos globais de carbono florestal que podem ajudar uma variedade de atores e organizações no rastreamento dos fluxos de gases de efeito estufa das florestas e na diminuição das emissões ou no aumento das remoções pelas florestas. As remoções de carbono florestal da atmosfera (sequestro) por sumidouros florestais representam o carbono cumulativo capturado (megagramas de CO2/ha) pelo crescimento de florestas estabelecidas e em novo crescimento durante o período modelo de 2001 a 2025. As remoções incluem o acúmulo de carbono na biomassa de árvores vivas acima e abaixo do solo. Seguindo os pressupostos do Nível 1 do IPCC para florestas remanescentes, as remoções por madeira morta, lixo e reservas de carbono do solo são consideradas nulas. Em cada pixel, as remoções de carbono são calculadas conforme as Diretrizes do IPCC para inventários nacionais de gases de efeito estufa onde as florestas existiam em 2000 ou foram estabelecidas entre 2000 e 2020, conforme o Potapov et al. de 2022. O carbono atmosférico removido em cada pixel é baseado em mapas de tipos de floresta (por exemplo, mangue, plantação), região biogeográfica (por exemplo, neotrópicos úmidos), idade da floresta (por exemplo, primária, secundária antiga) e número de anos de remoção de carbono. Essa camada reflete as remoções acumuladas durante o período modelo (2001 a 2025) e deve ser dividida por 23 para ser obtida uma média anual durante a duração do modelo; as taxas de remoção não podem ser atribuídas a anos individuais do modelo. Todas as camadas de entrada foram reajustadas para uma resolução comum de 0,00025 x 0,00025 graus cada para corresponder ao Hansen et al. (2013).\n\nA cada ano, a perda de cobertura arbórea, os fatores de perda de cobertura arbórea e a área queimada são atualizados. Em 2025 e 2025, alguns conjuntos de dados de entrada e constantes do modelo também foram alterados, conforme descrito abaixo. Consulte esta postagem do blog para saber mais.\n\n- A fonte da proporção entre o carbono da biomassa abaixo do solo e o carbono da biomassa acima do solo. Anteriormente era usado uma constante global; agora usa-se o mapa do Huang et al. de 2021\n- Os anos de ganho de cobertura arbórea. Anteriormente era usado de 2000 a 2012; agora usa-se de 2000 a 2020 do Potapov et al. de 2022.\n- A fonte dos dados de incêndios. Anteriormente era usado o MODIS para visualização da área queimada; agora usa-se a perda de cobertura arbórea por incêndios do Tyukavina et al. de 2022.\n- A fonte dos mapas de turfa. Novos conjuntos de dados tropicais foram incluídos e o conjunto de dados acima de 40 graus ao norte foi alterado.\n- Constantes do potencial de aquecimento global (GWP) para CH4 e N2O. Anteriormente era usado o GWP do Quinto Relatório de Avaliação do IPCC; agora usa-se o GWP do Sexto Relatório de Avaliação do IPCC.\n- Fatores de remoção para florestas temperadas secundárias mais antigas (>20 anos) e suas incertezas associadas. Fatores de remoção usados anteriormente publicados na Tabela 4.9 do Refinamento de 2019 das Diretrizes do IPCC de 2006 para Inventários Nacionais de Gases de Efeito Estufa; agora utiliza fatores de remoção corrigidos e incertezas da 4ª Retificação ao Refinamento de 2019 das Diretrizes do IPCC de 2006 para Inventários Nacionais de Gases de Efeito Estufa.\n- Extensão das árvores plantadas e fatores de remoção. Anteriormente era usado o Spatial Database of Planted Trees (SDPT) versão 1.0; agora usa-se o SDPT versão 2.0 e fatores de remoção associados.\n\nAs remoções estão disponíveis para download em duas unidades de área diferentes ao longo da duração do modelo: 1) megagramas de CO2 removido/ha e 2) megagramas de CO2 removido/pixel. A primeira é adequada para visualização (mapeamento) de remoções porque representa a densidade de remoções por hectare. A segunda é adequada para calcular as remoções em uma área de interesse (AOI), pois os valores dos pixels na AOI podem ser somados para obter o total de remoções daquela área. Os valores desta última foram calculados ajustando as remoções por hectare pelo tamanho de cada pixel, que varia conforme a latitude. Ao estimar as remoções ocorridas ao longo de um número definido de anos entre 2001 e 2025 para comparar com as emissões, divida o total de remoções de carbono pela duração do modelo e depois multiplique pelo número de anos no período desejado. Ambos os conjuntos de dados incluem apenas pixels dentro de florestas, conforme definido nos métodos do Harris et al. (2021) e atualizado com ganho de cobertura arbórea até 2020.',
  },
  citation: {
    label: 'Citação',
    value:
      'Harris et al. (2021). Global maps of 21st century forest carbon fluxes. Accessed on 14/02/2025 from Global Forest Watch.',
  },
};
