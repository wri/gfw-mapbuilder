export const pt = {
  title: 'Cobertura de árvores tropicais',
  subtitle: '2020, 10 m/0.5 ha, tropical, WRI',
  download_data: 'https://data.globalforestwatch.org/datasets/tropical-tree-cover/explore',
  learn_more: '',
  content: [
    {
      label: 'Função',
      value:
        'Exibe a extensão de árvores na escala de dez metros e a cobertura arbórea na escala de meio hectare para possibilitar o monitoramento preciso de árvores em áreas urbanas, terras agrícolas e em ecossistemas de copa aberta e de floresta seca',
    },
    {
      label: 'Resolução',
      value: '10 x 10 metros, meio hectare',
    },
    {
      label: 'Cobertura geográfica',
      value: '4,3 bilhões de hectares dos trópicos (latitude de -23,44 a 23,44)',
    },
    {
      label: 'Fonte',
      value: 'World Resources Institute',
    },
    {
      label: 'Frequência de atualizações',
      value: 'Mapas de detecção de mudança anual com início em 2017 têm lançamento planejado para 2024.',
    },
    {
      label: 'Dados de conteúdo',
      value: 2020,
    },
    {
      label: 'Precauções',
      value:
        'Este conjunto de dados utiliza uma definição diferente de árvore e uma definição diferente de cobertura arbórea em relação à de Hansen et al. (2013). Este conjunto de dados define árvore conforme sua altura e diâmetro de copa. Considera-se árvore a vegetação lenhosa com altura superior a 5 metros (independentemente do diâmetro de copa) ou entre 3 e 5 metros com um diâmetro de copa mínimo de 5 metros. Essa definição é diferente da de Hansen et al. (2013), que define árvore como qualquer vegetação com altura mínima de 5 metros. O conjunto de dados de cobertura de árvores tropicais não diferencia árvores de plantações de árvores que não são de plantações.\n\nAnálises ou estatísticas derivadas para shapefiles menores que 0,5 ha podem não ser precisas.',
    },
    {
      label: 'Licença',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Visão geral',
    value:
      'Os dados de cobertura de árvores tropicais mapeiam a extensão de árvores na escala de dez metros e a cobertura arbórea na escala de meio hectare para possibilitar o monitoramento preciso de árvores em áreas urbanas, terras agrícolas e em ecossistemas de copa aberta e de floresta seca. Os dados abarcam 4,3 bilhões de hectares dos trópicos globais.\n\nOs dados são derivados de modelos multitemporais de redes neurais convolucionais aplicados a imagens ópticas e de radar do Sentinel. O conjunto de dados de 10 metros é uma camada binária de extensão de árvores similar a um mapa de cobertura terrestre, e os dados de cobertura arbórea representam cobertura fracionária a uma escala de meio hectare. Mais detalhes sobre a metodologia e as análises podem ser encontrados na página do GitHub.',
  },
  citation: {
    label: 'Citação',
    value:
      'Use the following credit when this data is displayed: Source: 14/02/2025, accessed through Global Forest Watch on 14/02/2025\n\nUse the following credit when this data is cited: Brandt,\nBrandt, J., Ertel, J., Spore, J., & Stolle, F. (2023). WALL-to-wall\nmapping of tree extent in the tropics with sentinel-1 and sentinel-2. Remote Sensing of Environment, 292, 113574. https://doi.org/10.1016/j.rse.2023.11357',
  },
};
