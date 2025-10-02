export const pt = {
  title: 'Alertas integrados de desflorestamento',
  subtitle: 'Diariamente, 10 m, trópicos, UMD/GLAD e WUR',
  download_data:
    'Monitore o distúrbio florestal quase em tempo real usando alertas integrados de três sistemas de alerta',
  content: [
    {
      label: 'Função',
      value: 'https://data.globalforestwatch.org/datasets/gfw::integrated-deforestation-alerts/about',
    },
    {
      label: 'Resolução',
      value: '10 × 10 m',
    },
    {
      label: 'Cobertura geográfica',
      value: '30°N to 30°S',
    },
    {
      label: 'Fonte',
      value:
        'GLAD Alerts:\nHansen, M.C., A. Krylov, A. Tyukavina, P.V. Potapov, S. Turubanova, B. Zutta, S. Ifo, B. Margono, F. Stolle, and R. Moore. 2016. Humid tropical forest disturbance alerts using Landsat data. Environmental Research Letters, 11 (3). (https://dx.doi.org/10.1088/1748-9326/11/3/034008)[https://dx.doi.org/10.1088/1748-9326/11/3/034008]',
    },
    {
      label: 'Frequência de atualizações',
      value: 'Diário',
    },
    {
      label: 'Dados de conteúdo',
      value: '1º de janeiro de 2019 até o presente',
    },
    {
      label: 'Precauções',
      value:
        'Embora sejam chamados de “alertas de desmatamento”, esses alertas detectam distúrbios na floresta ou na cobertura arbórea. Esse produto não distingue entre os tipos de distúrbios causados ​​pelo homem ou outra coisa. Onde os alertas são detectados em florestas plantadas (mais provável de acontecer no sistema GLAD-L), os alertas podem indicar operações de extração de madeira, sem uma conversão para um uso do terreno não florestal. \nO termo desmatamento é usado porque estes são eventos potenciais de desmatamento, e os alertas podem ser investigados para determinar isso. \nNão recomendamos o uso de alertas de desmatamento para avaliação de tendências globais ou regionais, nem para estimativas de áreas. Recomendamos usar os dados de perda de cobertura arbórea anuais para uma comparação mais precisa das tendências de mudança florestal ao longo do tempo e para estimativas de áreas. Os alertas recentes incluirão falso-positivos que ainda precisam aumentar seu nível de confiança e podem eventualmente ser removidos. Os alertas anteriores podem ter sido removidos por engano do banco de dados se o fechamento rápido do dossel preceder as observações de satélite não obscurecidas adicionais dentro de 6 meses. Além disso, atualizações nas metodologias, número diferente de sistemas (no caso dos alertas integrados) e variação na cobertura de nuvens entre meses e anos representam riscos adicionais ao uso de alertas de desmatamento para comparação inter/intra-anual.\nOs alertas podem ser "selecionados" para identificar os alertas de interesse para um usuário, como os alertas que provavelmente são desmatamento, e podem ter ação prioritária. Um usuário pode fazer isso sobrepondo outros conjuntos de dados contextuais, como áreas protegidas ou árvores plantadas. Os dados não selecionados são fornecidos aqui para que os usuários possam definir suas próprias abordagens de priorização. Locais de alerta selecionados são fornecidos na camada de dados Locais a Observar.\nOs três sistemas de alerta têm diferentes definições de cobertura florestal/arbórea e distúrbios na cobertura florestal/arbórea: \n\n\nGLAD-L: os alertas estão dentro da "cobertura arbórea", que é definida como toda vegetação com mais de 5 metros de altura com mais de 60% de cobertura de dossel, e pode assumir a forma de florestas naturais ou plantações. A “perda de cobertura arbórea” indica a remoção do dossel de pelo menos meio pixel e pode ser devido a uma variedade de fatores, incluindo colheita mecânica, incêndio, doença ou danos causados ​​por tempestades. Como tal, “perda” não equivale a desmatamento. \nGLAD-S2: os alertas estão dentro da máscara de floresta primária de Turubanova et al (2018) na bacia do rio Amazonas, com perda florestal de 2001 até o presente de Hansen et al. (2013) removido. \nRADD: os alertas estão em florestas úmidas primárias. A perda florestal é definida como a remoção completa ou parcial da cobertura arbórea dentro de um pixel, e uma unidade mínima de mapeamento de 0,5 ha é usada. \nOs sistemas de alerta de entrada não têm a mesma cobertura espacial e temporal:\nGLAD-L: operando em todos os trópicos (30°N a 30°S) de 1º de janeiro de 2018 até o presente e de 2015 até o presente (embora pausado por um período durante 2022) para selecionar países na Amazônia, Bacia do Congo e Sudeste Asiático insular \nGLAD-S2: operando nas áreas de floresta tropical úmida primária da América do Sul de janeiro de 2019 até o presente \nRADD: operando nas principais áreas de floresta tropical úmida da América do Sul, África subsaariana e sudeste da Ásia insular com cobertura de janeiro de 2019 até o presente para a África e de janeiro de 2020 até o presente para a América do Sul e sudeste Ásia, com cobertura para a América Central a partir de janeiro de 2023 (a expansão para o sudeste da Ásia continental e Pacífico está prevista para o fim de 2023) \n\nPara integrar os três sistemas de alerta em uma grade comum, o GLAD-L é reamostrado de uma resolução espacial de 30 m para 10 m para corresponder ao GLAD-S2 e RADD. Como resultado, um único pixel do GLAD-L de 30 m se tornará múltiplos pixels de 10 m na camada integrada. Os usuários devem ter cuidado ao comparar os resultados da análise de sistemas individuais com a camada de alerta integrado, pois o número de alertas integrados será muito maior do que o número de alertas GLAD-L nativos. Além disso, os pixels na camada integrada podem não se alinhar exatamente no mapa com os pixels na camada GLAD-L individual como resultado dessa reamostragem. \nCada pixel na camada integrada preserva a data mais antiga de detecção de qualquer sistema de alerta, mesmo que vários sistemas tenham relatado um alerta nesse pixel. Em algumas situações, isso pode levar a visualizações inconsistentes ao alternar da camada integrada para camadas individuais do sistema de alerta. É aconselhável usar a camada integrada quando estiver interessado na data mais antiga de detecção por qualquer sistema de alerta. No entanto, é melhor usar as camadas individuais do sistema de alerta se você estiver interessado em um tipo de alerta específico. \nO nível “Confiança máxima: detectado por vários sistemas de alerta” só pode ser alcançado em áreas e por períodos em que mais de um sistema de alerta estava em operação para aquela região. \nO nível de confiança pode mudar retroativamente à medida que os dados de origem são atualizados; os alertas que não se tornaram de alta confiança em 180 dias são removidos do conjunto de dados.\nQuando um pixel de alerta atinge alta confiança, a perda florestal não será detectada pelo mesmo sistema de alerta naquele local novamente\nAs precisões variam em toda a cobertura dos alertas integrados, devido às diferentes características dos três sistemas de alerta — alertas de radar (RADD), por exemplo, podem ter mais detecções falsas em florestas pantanosas devido à alta sensibilidade do radar de banda C de comprimento de onda curto à variação de umidade\nCom a redução do zoom, essa camada de dados exibe algum grau de imprecisão porque os pontos de dados devem ser recolhidos para serem visíveis em uma escala maior. Aumente o zoom para obter mais detalhes.',
    },
    {
      label: 'Licença',
      value: 'CC by 4.0',
    },
  ],
  overview: {
    label: 'Visão geral',
    value:
      'Este conjunto de dados, montado pelo Global Forest Watch, agrega alertas de desmatamento de três sistemas de alerta (GLAD-L, GLAD-S2, RADD) em uma única camada de alerta de desmatamento integrada. Essa integração permite que os usuários detectem eventos de desmatamento mais rapidamente do que qualquer sistema sozinho, pois a camada integrada é atualizada quando qualquer um dos sistemas de alerta de origem é atualizado.',
  },
  citation: {
    label: 'Citação',
    value: 'Source: "Integrated Deforestation Alerts". UMD/GLAD and WUR, accessed through Global Forest Watch',
  },
};
