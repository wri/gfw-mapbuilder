export const pt = {
  title: 'Densidade de biomassa lenhosa viva tropical acima do solo',
  subtitle: 'Trópicos, Zarin/WHR',
  download_data: 'http://data.globalforestwatch.org/datasets/8f93a6f94a414f9588ce4657a39c59ff_1',
  content: [
    {
      label: 'Função',
      value: 'Mostra valores de densidade de carbono da biomassa lenhosa viva acima do solo',
    },
    {
      label: 'Resolução',
      value: '30 metros',
    },
    {
      label: 'Cobertura geográfica',
      value: 'Trópicos (30 graus N, 20 graus S)',
    },
    {
      label: 'Fonte',
      value: 'ICEsat GLAS lidar, MODIS, Landsat, medições de solo',
    },
    {
      label: 'Dados de conteúdo',
      value: 2000,
    },
    {
      label: 'Precauções',
      value:
        'Recomenda-se que tanto a densidade de carbono acima do solo como os valores de incerteza sejam usados ​​em conjunto para avaliações e verificação de carbono. O mapa fornecerá estimativas precisas do estoque de carbono acima do solo e da densidade de carbono acima do solo quando agregados a grandes áreas (5.000 a 10.000 ha) para avaliações de projetos e a nível regional. O valor da densidade de biomassa de um único pixel pode apresentar grande incerteza quando comparado com pequenas parcelas para verificação.',
    },
    {
      label: 'Licença',
      value: 'Creative Commons CC BY 4.0',
    },
  ],
  overview: {
    label: 'Visão geral',
    value:
      'Este é um produto de dados de maior resolução que expande a metodologia apresentada em Baccini et al. (2012) para gerar um mapa pan-tropical da densidade de biomassa lenhosa viva acima do solo com resolução de 30 m para cerca do ano 2000. Junto com os valores de densidade de carbono, há um mapa de erro na mesma resolução espacial que fornece a incerteza na estimativa da densidade de carbono acima do solo. Estes mapas permitem a co-localização de estimativas de biomassa com Hansen et al. (2013, v1.0) estimativas de perda de cobertura arbórea em resolução espacial semelhante. A relação estatística derivada entre medições terrestres de densidade de biomassa florestal e métricas de forma de onda LiDAR do Geoscience Laser Altimeter System (GLAS), conforme descrito por Baccini et al. (2012) foram usados ​​para estimar a densidade de biomassa de mais de 40.000 pegadas GLAS nos trópicos. Em seguida, usando modelos randomForest, as estimativas de densidade de biomassa derivadas do GLAS foram correlacionadas com variáveis ​​contínuas em grade, incluindo imagens e produtos do satélite Landsat 7 ETM+ (por exemplo, refletância), elevação e variáveis ​​biofísicas. Usando conjuntos de dados em grade contínua como entradas para os modelos randomForest, foi produzido um mapa de parede a parede com resolução de 30 m da densidade de biomassa lenhosa acima do solo nos trópicos, bem como a camada de incerteza associada. A camada de incerteza leva em consideração os erros das equações alométricas, do modelo baseado em LiDAR e do modelo randomForest. Todos os erros são propagados para a estimativa final da biomassa. Uma descrição detalhada do trabalho será relatada em novo artigo em preparação.',
  },
  citation: {
    label: 'Citação',
    value:
      'Baccini A., W. Walker, L. Carvahlo, M. Farina, D. Sulla-Menashe, R. Houghton (2015). As florestas tropicais são uma fonte líquida de carbono com base em novas medições de ganhos e perdas. Em revisão. Acessado através do Global Forest Watch Climate em [data]. clima.globalforestwatch.org.',
  },
};
