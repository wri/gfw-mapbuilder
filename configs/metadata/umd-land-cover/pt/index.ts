export const pt = {
  title: 'Cobertura de terra 2000-2020',
  subtitle: 'UMD',
  download_data: '',
  learn_more: '',
  content: [
    {
      label: 'Função',
      value: 'Mapa global de uso e cobertura da terra para 2000 e 2020',
    },
    {
      label: 'Resolução',
      value: '30 metros',
    },
    {
      label: 'Cobertura geográfica',
      value: 'Global',
    },
    {
      label: 'Fonte',
      value: 'UMD',
    },
    {
      label: 'Frequência de atualizações',
      value: '',
    },
    {
      label: 'Dados de conteúdo',
      value: '',
    },
    {
      label: 'Precauções',
      value:
        '- O mapeamento da cobertura do solo foi limitado pela disponibilidade de dados de céu claro do Landsat. A incompletude das séries temporais de observação Landsat diminui a precisão do mapa em regiões com cobertura de nuvens persistentes. \n- O mapeamento de classes discretas de cobertura do solo em paisagens heterogêneas foi limitado pela alta proporção de pixels mistos na resolução espacial do Landsat. A maioria das classes LULC tem maior precisão de mapa em grandes áreas homogêneas em comparação com paisagens fragmentadas e bordas de patch de classe. \n- A semelhança espectral entre diferentes classes LCLU pode impedir a discriminação de classe.\n- O produto de altura da floresta tem problemas relacionados à qualidade dos dados GEDI e à disponibilidade de dados do Landsat. Pequenas mudanças na altura da floresta entre os anos 2000 e 2020 podem não indicar a mudança real na estrutura da floresta, mas representam o ruído nas saídas do modelo. \n- As classes dinâmicas (perda e ganho de classe LCLU) têm precisões mais baixas em comparação com os mapas estáticos. \n- As estimativas baseadas em mapas não são adequadas para relatórios nacionais e internacionais devido à variabilidade espacial e temporal desconhecida da incerteza do mapa.',
    },
    {
      label: 'Licença',
      value: 'Licença Creative Commons (https://glad.umd.edu/dataset/GLCLUC2020)',
    },
  ],
  overview: {
    label: 'Visão geral',
    value:
      'Os mapas globais de uso e cobertura da terra foram criados pelo laboratório Global Land Analysis and Discovery Lab (GLAD), e os dados estão disponíveis em resolução espacial de 30 m para 2000 e 2020. O laboratório GLAD usou o espaço-temporal consistente [Landsat Analysis Ready Data (GLAD ARD)] (https://glad.umd.edu/ard) para quantificar as mudanças na extensão e altura da floresta, terras agrícolas, terras construídas, águas superficiais e extensão perene de neve e gelo ao longo do período de vinte anos. Cada produto temático foi derivado de forma independente usando ferramentas de aprendizado de máquina de última geração, calibradas local e regionalmente. O conjunto de dados foi validado usando uma amostragem estatística que confirma sua alta precisão. O laboratório Global Land Analysis and Discovery Lab (GLAD) do Departamento de Ciências Geográficas da UMD investiga métodos, causas e impactos da mudança global da superfície terrestre. As imagens de observação da Terra são a principal fonte de dados, e a extensão e a mudança da cobertura da terra são o principal tópico de interesse. O GLAD aspira gerar novos insights científicos sobre os recursos terrestres, educar a próxima geração de cientistas de mudanças terrestres baseados em sensoriamento remoto e disseminar recursos de monitoramento terrestre para ambientes operacionais nacional e internacionalmente.',
  },
  citation: {
    label: 'Citação',
    value:
      'Potapov P., Hansen M.C., Pickens A., Hernandez-Serna A., Tyukavina A., Turubanova S., Zalles V., Li X., Khan A., Stolle F., Harris N., Song X.-P., Baggett A., Kommareddy I., Kommareddy A. (2022) The global 2000-2020 land cover and land use change dataset derived from the Landsat archive: first results. Frontiers in Remote Sensing. [https://doi.org/10.3389/frsen.2022.856903](https://doi.org/10.3389/frsen.2022.856903). Accessed through Resource Watch, (date). [www.resourcewatch.org](https://www.resourcewatch.org).',
  },
};
