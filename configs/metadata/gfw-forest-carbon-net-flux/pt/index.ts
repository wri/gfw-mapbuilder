export const pt = {
  title: 'Fluxo Líquido de Carbono Florestal',
  subtitle: '30 m, global, 2001-2024, Harris et al. 2021',
  download_data: 'https://data.globalforestwatch.org/datasets/94871bf57f544ea39e594feb92b06305',
  learn_more: '',
  content: [
    {
      label: 'Função',
      value:
        'Exibe a perda líquida do carbono do ecossistema florestal, calculada como a diferença entre as emissões de carbono florestal decorrentes de perturbações florestais com substituição de área e as remoções do carbono decorrentes do crescimento florestal ',
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
      value: '2001-2024',
    },
    {
      label: 'Precauções',
      value:
        '- Os dados são o produto da modelagem e, portanto, têm um grau inerente de erro e imprecisão. Os usuários são fortemente encorajados a ler e compreender completamente os metadados e outra documentação disponível antes da utilização dos dados.\n- O fluxo líquido reflete o total durante o período modelo de 2001 a 2024, e não uma série temporal anual a partir da qual se possa derivar uma tendência. Assim, os valores devem ser divididos por 23 para que o fluxo líquido médio anual seja calculado.\n- A incerteza é maior nas remoções brutas do que nas emissões, particularmente devido à incerteza nos fatores de remoção. Essas incertezas são propagadas para a incerteza no fluxo líquido.\n- Os valores são aplicáveis a áreas florestais (cobertura de dossel >30 por cento e >5 m de altura). Veja o Harris et al. (2021) para obter mais informações sobre a definição de floresta utilizada na análise.\n- As emissões refletem os distúrbios de substituição estáveis como observado nas imagens do satélite Landsat e não incluem as emissões da degradação da floresta não observada.\n- Os dados de atividade usados como base das estimativas contêm inconsistências temporais:\n- Os dados de remoções contêm inconsistências temporais porque o ganho de cobertura arbórea representa um total acumulado de 2000 a 2020, em vez de ganhos anuais estimados até 2024.\n- Melhorias na detecção da perda de cobertura arbórea devido à incorporação de novos dados de satélite e mudanças de metodologia entre 2011 e 2015 podem resultar em estimativas de emissões mais altas nos últimos anos em comparação com anos anteriores. Acesse aqui para obter mais informações.\n- Grandes saltos em fluxo líquido ao longo de algumas fronteiras são decorrência do uso de fatores de remoção específicos da ecozona. As mudanças no fluxo líquido ocorrem nas fronteiras de ecozonas, onde diferentes fatores de remoção são aplicados em cada um dos lados.\n- Esse conjunto de dados foi atualizado desde sua publicação original. Veja a Visão Geral para mais informações.',
    },
    {
      label: 'Licença',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Visão geral',
    value:
      'Esta camada de fluxo líquido faz parte do modelo de fluxo de carbono florestal descrito no Harris et al. (2021). Esse artigo apresenta uma estrutura de monitoramento geoespacial que estima os fluxos globais de carbono florestal que podem ajudar uma variedade de atores e organizações no rastreamento dos fluxos de gases de efeito estufa das florestas e na diminuição das emissões ou no aumento das remoções pelas florestas. O fluxo líquido de carbono florestal representa a perda líquida de carbono do ecossistema florestal, calculada como a diferença entre o carbono emitido pelas florestas e o carbono removido (ou sequestrado por) florestas durante o período modelo. O fluxo líquido de carbono é calculado subtraindo as remoções brutas médias das emissões brutas anuais em cada pixel florestal; os valores negativos são onde as florestas foram sumidouros líquidos de carbono e os valores positivos são onde as florestas foram fontes líquidas de carbono entre 2001 e 2024. Os fluxos líquidos são calculados conforme as Diretrizes do IPCC para inventários nacionais de gases de efeito estufa em cada pixel onde as florestas existiam em 2000 ou foram estabelecidas entre 2000 e 2020, conforme o Potapov et al. de 2022. Essa camada reflete o fluxo líquido acumulado durante o período modelo (2001 a 2024) e deve ser dividida por 23 para obter o fluxo líquido médio anual; os valores de fluxo líquido não podem ser atribuídos a anos individuais do modelo. Todas as camadas de entrada foram reajustadas para uma resolução comum de 0,00025 x 0,00025 graus cada para corresponder ao Hansen et al. (2013).\n\nA cada ano, a perda de cobertura arbórea, os fatores de perda de cobertura arbórea e a área queimada são atualizados. Em 2024 e 2024, alguns conjuntos de dados de entrada e constantes do modelo também foram alterados, conforme descrito abaixo. Consulte esta postagem do blog para saber mais.\n\n- A fonte da proporção entre carbono abaixo do solo e carbono acima do solo. Anteriormente era usado uma constante global; agora usa-se o mapa de Huang et al. de 2021\n- Os anos de ganho de cobertura arbórea. Anteriormente era usado de 2000 a 2012; agora usa-se de 2000 a 2020 do Potapov et al. de 2022.\n- A fonte dos dados de incêndios. Anteriormente era usado o MODIS para visualização da área queimada; agora usa-se a perda de cobertura arbórea por incêndios do Tyukavina et al. de 2022.\n- A fonte dos mapas de turfa. Novos conjuntos de dados tropicais foram incluídos e o conjunto de dados acima de 40 graus ao norte foi alterado.\n- Constantes do potencial de aquecimento global (GWP) para CH4 e N2O. Anteriormente era usado o GWP do Quinto Relatório de Avaliação do IPCC; agora usa-se o GWP do Sexto Relatório de Avaliação do IPCC.\n- Fatores de remoção para florestas temperadas secundárias mais antigas (>20 anos) e suas incertezas associadas. Fatores de remoção usados anteriormente publicados na Tabela 4.9 do Refinamento de 2019 das Diretrizes do IPCC de 2006 para Inventários Nacionais de Gases de Efeito Estufa; agora utiliza fatores de remoção corrigidos e incertezas da 4ª Retificação ao Refinamento de 2019 das Diretrizes do IPCC de 2006 para Inventários Nacionais de Gases de Efeito Estufa.\n- Extensão das árvores plantadas e fatores de remoção. Anteriormente era usado o Spatial Database of Planted Trees (SDPT) versão 1.0; agora usa-se o SDPT versão 2.0 e fatores de remoção associados.\n\nO fluxo líquido está disponível para download em duas unidades de área diferentes ao longo da duração do modelo: 1) megagramas de emissões de CO2/ha e 2) megagramas de emissões de CO2/pixel. A primeira é adequada para visualizar (mapear) o fluxo líquido porque representa a densidade dos fluxos de carbono por hectare. A segunda é adequada para calcular o fluxo líquido em uma área desejada (AOI) porque os valores dos pixels na AOI podem ser somados para obter o fluxo total de carbono para aquela área. Os valores desta última são calculados ajustando o fluxo líquido por hectare pelo tamanho de cada pixel, que varia conforme a latitude. Ao estimar o fluxo líquido que ocorre ao longo de um número específico de anos entre 2001 e 2024, divida os valores pela duração do modelo e depois multiplique pelo número de anos no período desejado. Ambos os conjuntos de dados incluem apenas pixels dentro de florestas, conforme definido nos métodos de Harris et al. (2021) e atualizado com ganho de cobertura arbórea até 2020.',
  },
  citation: {
    label: 'Citação',
    value:
      'Harris et al. (2021). Global maps of 21st century forest carbon fluxes. Accessed on 14/02/2025 from Global Forest Watch.',
  },
};
