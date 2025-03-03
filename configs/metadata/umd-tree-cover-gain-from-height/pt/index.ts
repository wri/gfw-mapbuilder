export const pt = {
  title: 'Ganho de Cobertura Florestal',
  subtitle: '(20 anos, 30 m, global, UMD/NASA GEDI)',
  content: [
    {
      label: 'Função',
      value: 'Identifica áreas com ganho de cobertura de árvores',
    },
    {
      label: 'Resolução',
      value: '30 × 30 metros',
    },
    {
      label: 'Cobertura geográfica',
      value: 'Global',
    },
    {
      label: 'Fonte',
      value:
        'Potapov, P., Hansen, M.C., Pickens, A., Hernandez-Serna, A., Tyukavina, A., Turubanova, S., Zalles, V., Li, X., Khan, A., Stolle, F., Harris, N., Song, X-P., Baggett, A., Kommareddy, I., and Kommareddy, A. 2022. The Global 2000-2020 Land Cover and Land Use Change Dataset Derived From the Landsat Archive: First Results. Frontiers in Remote Sensing, 13, April 2022. https://doi.org/10.3389/frsen.2022.856903',
    },
    {
      label: 'Dados de conteúdo',
      value: '2000-2020',
    },
    {
      label: 'Precauções',
      value:
        'Neste conjunto de dados, “cobertura arbórea” é definida como vegetação lenhosa com altura igual ou superior a 5 metros, podendo assumir a forma de bosques naturais, florestas ou plantações de árvores em uma gama de densidade de dosséis. O ganho de cobertura arbórea não constitui, diretamente, restauração, reflorestação ou reflorestamento. Em razão das diferenças na metodologia de pesquisa e data do conteúdo, os conjuntos de dados de cobertura arbórea, ganho e perda anual não podem ser comparados uns com os outros com precisão. Consequentemente, não é possível calcular o “líquido” subtraindo os números dos conjuntos de dados do ganho de cobertura arbórea dos da perda anual de cobertura arbórea. Em vez disso, a camada de variação líquida de cobertura arbórea, que foi calculada exclusivamente com base nos dados da altura arbórea, deve ser usada. O uso integrado de outros produtos também disponíveis no GFW, como dados de densidade da cobertura de dossel, deve ser realizado com cautela. Os autores avaliaram a precisão do produto e chegaram a uma precisão global de 99,3%, um erro por comissão (falsos positivos) de 28,6% e um erro por omissão (falsos negativos) de 42,2%. A precisão varia por bioma, podendo assim ser maior ou menor em uma determinada localização. Como o erro por omissão é maior do que o erro por comissão, isso indica que o produto oferece estimativas conservadoras das dinâmicas florestais. Houve confusão entre melhoria florestal (aumento na altura da floresta existente) e ganho florestal (estabelecimento de florestas dentro de terras não florestais do ano 2000). Isso foi mais proeminente em áreas de florestas boreais, onde foi difícil determinar a altura florestal no ano de 2000.',
    },
    {
      label: 'Licença',
      value: 'CC by 4.0',
    },
  ],
  overview: {
    label: 'Visão geral',
    value:
      'O conjunto de dados do laboratório GLAD (Global Land Analysis & Discovery) na Universidade de Maryland mede áreas de ganho de cobertura arbórea de 2000 a 2020 ao redor do globo em uma resolução de 30x30 metros, exibida em uma camada cumulativa de 20 anos. O ganho de cobertura arbórea foi determinado usando informações sobre a altura arbórea dos anos de 2000 e 2020. A altura arbórea foi modelada pela integração das medições de estrutura florestal lidar da Global Ecosystem Dynamics Investigation (GEDI) e das séries cronológicas de dados prontos para análise do Landsat. O GEDI da NASA é um instrumento lidar espacial que é operado a bordo da Estação Espacial Internacional desde abril de 2019. Ele oferece medições baseadas em pontos da estrutura da vegetação, incluindo altura do dossel florestal em latitudes entre 52°N e 52°S no mundo todo. O ganho foi identificado onde os pixels apresentaram altura arbórea ≥5 m em 2020 e altura arbórea <5 m em 2000.',
  },
  citation: {
    label: 'Citação',
    value:
      'Use the following credit when this data is displayed:\nAccessed through Global Forest Watch on 29/01/2025. www.globalforestwatch.org. Use the following credit when this data is cited:\nPotapov, P., Hansen, M.C., Pickens, A., Hernandez-Serna, A., Tyukavina, A., Turubanova, S., Zalles, V., Li, X., Khan, A., Stolle, F., Harris, N., Song, X-P., Baggett, A., Kommareddy, I., and Kommareddy, A. 2022. The Global 2000-2020 Land Cover and Land Use Change Dataset Derived From the Landsat Archive: First Results. Frontiers in Remote Sensing, 13, April 2022. https://doi.org/10.3389/frsen.2022.856903',
  },
};
