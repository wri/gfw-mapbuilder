export const pt = {
  title: 'Altura da cobertura arbórea',
  subtitle: '2000/2020, 30 m, global, UMD/NASA GEDI',
  download_data: '',
  learn_more: 'https://glad.umd.edu/dataset/gedi/',
  content: [
    {
      label: 'Função',
      value: 'Mostra a altura do dossel florestal global nos anos 2000 e 2020.',
    },
    {
      label: 'Resolução',
      value: '30 metros (30 metros)',
    },
    {
      label: 'Cobertura geográfica',
      value: 'Global, com dados protótipos acima de 52°N',
    },
    {
      label: 'Fonte',
      value:
        'Potapov, P., Li, X., Hernandez-Serna, A., Tyukavina, A., Hansen, M.C., Kommareddy, A., Pickens, A., Turubanova, S., Tang, H., Silva, C.E. and Armston, J., 2021. Mapping global forest canopy height through integration of GEDI and Landsat data. Remote Sensing of Environment, 253, p.112165. https://doi.org/10.1016/j.rse.2020.112165',
    },
    {
      label: 'Frequência de atualizações',
      value: '',
    },
    {
      label: 'Dados de conteúdo',
      value: '2000 and 2020',
    },
    {
      label: 'Precauções',
      value:
        'O mapa global da altura da floresta é um produto protótipo que tem problemas conhecidos relacionados à qualidade dos dados GEDI e à disponibilidade dos dados Landsat. Os dados GEDI superestimam a altura da floresta em declives dentro de pradarias de montanha temperadas e subtropicais, por exemplo, na Nova Zelândia e Lesoto. A altura das árvores em cidades e subúrbios pode ser confundida com a altura dos edifícios, pois os dados GEDI não fazem distinção entre a altura da vegetação e os objetos feitos pelo homem. As imprecisões de calibração GEDI (especificamente, precisão da geolocalização e estimativa da altura da superfície terrestre) podem ser responsáveis por alguns dos erros do mapa. O modelo de altura das árvores saturadas acima de 30 m pode não representar adequadamente a altura das árvores mais altas. O produto global será atualizado no futuro para resolver a maioria das questões.',
    },
    {
      label: 'Licença',
      value: '',
    },
  ],
  overview: {
    label: 'Visão geral',
    value:
      'Um novo mapa global de 30 m de resolução espacial da altura da copa da floresta foi desenvolvido pela integração das medidas de estrutura florestal lidar do Global Ecosystem Dynamics Investigation (GEDI) e a série temporal de dados prontos para análise do Landsat. O GEDI da NASA é um instrumento lidar espacial operando a bordo da Estação Espacial Internacional desde abril de 2019. Ele fornece medições pontuais da estrutura da vegetação, incluindo a altura da copa da floresta entre 52°N e 52°S globalmente. A equipe Global Land Analysis and Discover da Universidade de Maryland (UMD GLAD) integrou os dados GEDI disponíveis até o momento (abril–outubro de 2019) com os dados das séries temporais prontos para análise do Landsat do ano de 2019 (Landsat ARD). A métrica GEDI RH95 (altura relativa a 95%) foi usada para calibrar o modelo. As métricas multitemporais do Landsat que representam a fenologia da superfície servem como variáveis independentes para a modelagem da altura global da floresta. A "janela móvel" calibrada localmente e o modelo de conjunto de árvore de regressão aplicado foram implementados para garantir a alta qualidade da previsão da altura da floresta e a consistência do mapa global. O modelo foi extrapolado nas regiões boreais (além da faixa de dados GEDI) para criar o mapa protótipo da altura global da floresta.',
  },
  citation: {
    label: 'Citação',
    value:
      'Potapov, P., Li, X., Hernandez-Serna, A., Tyukavina, A., Hansen, M.C., Kommareddy, A., Pickens, A., Turubanova, S., Tang, H., Silva, C.E. and Armston, J., 2021. Mapping global forest canopy height through integration of GEDI and Landsat data. Remote Sensing of Environment, 253, p.112165. https://doi.org/10.1016/j.rse.2020.112165. Accessed through Global Forest Watch on 14/02/2025. www.globalforestwatch.org.',
  },
};
