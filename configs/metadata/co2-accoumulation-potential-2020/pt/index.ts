export const pt = {
  title: 'Potencial de acúmulo de carbono da rebrota natural da floresta em áreas reflorestáveis',
  subtitle: 'reforestable areas, 1 km, Cook-Patton et al. 2020',
  download_data: '',
  learn_more: '',
  content: [
    {
      label: 'Função',
      value:
        'Estima a taxa na qual o carbono poderia ser sequestrado na biomassa viva acima do solo durante os primeiros trinta anos de rebrota natural da floresta em áreas potencialmente reflorestáveis (Mg carbono/ha/ano).',
    },
    {
      label: 'Resolução',
      value: '1 × 1 km',
    },
    {
      label: 'Cobertura geográfica',
      value:
        'Global, dentro da extensão de reflorestamento de Griscom et al. 2017 (que exclui os biomas boreais e gramíneos e terras de cultivo)',
    },
    {
      label: 'Fonte',
      value:
        'Cook-Patton, S.C., S.M. Leavitt, D. Gibbs, N.L. Harris, K. Lister, K.J. Anderson-Teixeira, R.D. Briggs, R.L. Chazdon, T.W. Crowther, P.W. Ellis, H.P. Griscom, V. Herrmann, K.D. Holl, R.A. Houghton, C. Larrosa, G. Lomax, R. Lucas, P. Madsen, Y. Malhi, A. Paquette, J.D. Parker, K. Paul, D. Routh, S. Roxburgh, S. Saatchi, J.van den Hoogen, W.S. Walker, C.E. Wheeler, S.A. Wood, L. Xu, B.W. Griscom. 2020. Mapping carbon accumulation potential from natural forest regrowth. Nature, in press. https://www.nature.com/articles/s41586-020-2686-x. This work resulted from a collaboration between The Nature Conservancy, World Resources Institute, and 18 other institutions.',
    },
    {
      label: 'Frequência de atualizações',
      value: '',
    },
    {
      label: 'Dados de conteúdo',
      value: 'Aplicável aos primeiros 30 anos de rebrota natural da floresta.',
    },
    {
      label: 'Precauções',
      value:
        '- Os valores representam as melhores estimativas, mas contêm imprecisões. A exatidão dos resultados depende da disponibilidade de dados para o treinamento de modelo, que se concentra em dez países. O mapa de imprecisões associado a essa camada de dados pode ser baixado do Portal de Dados Abertos da GFW.\n- As taxas de acúmulo de carbono são aplicáveis somente à rebrota natural da floresta, e não se aplicam a outros métodos de restauração ativa (agroflorestação, plantações etc.).\n- As taxas de acúmulo de carbono são lineares e médias ao longo dos primeiros 30 anos de rebrota. Estender para além de 30 anos superestimará o sequestro.\n- As taxas refletem o acúmulo de carbono somente em biomassa viva acima do solo. Acúmulo em biomassa sob o solo, matéria orgânica morta e carbono orgânico do solo não estão incluídos, mas um mapa de acúmulo de carbono sob o solo está disponível mediante solicitação.\n- Nas savanas, as taxas se aplicam apenas a porções florestadas dessas matrizes de floresta de pastagem.\n- Esses dados não são um substituto para avaliações detalhadas em nível local do potencial de rebrota da floresta.',
    },
    {
      label: 'Licença',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Visão geral',
    value:
      'Esse mapa mostra a taxa na qual as florestas poderiam capturar carbono da atmosfera e armazená-lo em biomassa viva acima do solo durante os primeiros 30 anos de rebrota natural da floresta. Ele foi criado combinando medições baseadas no solo em milhares de locais ao redor do mundo com 66 camadas colocalizadas de covariáveis ambientais em um modelo de aprendizado de máquina para produzir um mapa completo. Os dados de lotes florestais usados para treinar o modelo foram obtidos de literatura publicada, que pode ser encontrada no banco de dados Forest Carbon (ForC, mantido pelo Smithsonian Institute (https://github.com/forc-db)), bem como dados georreferenciados de inventários florestais nacionais disponíveis publicamente. Embora as taxas tenham sido estimadas em todos os biomas florestais e de savana do mundo, elas são filtradas aqui por área "reflorestável", como definido em Griscom et al. 2017 (PNAS). As áreas reflorestáveis excluem áreas de pastagens e terras de cultivo nativas para salvaguardar a produção de alimentos e fibras e habitat para a diversidade biológica.',
  },
  citation: {
    label: 'Citação',
    value:
      'Cook-Patton et al. 2020. Carbon accumulation potential from natural forest regrowth in potentially reforestable areas. Accessed through Global Forest Watch 14/02/2025. www.globalforestwatch.org',
  },
};
