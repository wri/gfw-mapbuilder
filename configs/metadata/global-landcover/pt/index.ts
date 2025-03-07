export const pt = {
  title: 'Cobertura de terra 2015',
  subtitle: 'ESA/UCLouvain, 2015',
  download_data: 'http://maps.elie.ucl.ac.be/CCI/viewer/download.php',
  learn_more: 'http://maps.elie.ucl.ac.be/CCI/viewer/download/ESACCI-LC-Ph2-PUGv2_2.0.pdf',
  content: [
    {
      label: 'Função',
      value: 'Mostra a distribuição global da cobertura de solo em 2015',
    },
    {
      label: 'Resolução',
      value: '300 × 300 meters',
    },
    {
      label: 'Cobertura geográfica',
      value: 'Global',
    },
    {
      label: 'Fonte',
      value: '© ESA Climate Change Initiative - Land Cover led by UCLouvain (2017)',
    },
    {
      label: 'Frequência de atualizações',
      value: 'Annual',
    },
    {
      label: 'Dados de conteúdo',
      value: 2015,
    },
    {
      label: 'Precauções',
      value:
        "Uma avaliação de precisão completa está disponível no CCI. Em geral, as classes de cobertura de solo, tais como terras cultivadas em sequeiro e irrigadas, floresta perene de folhas largas, áreas urbanas, áreas descobertas, corpos d'água e neve permanente, são mapeadas com bastante precisão. Por outro lado, classes como líquens e musgos, vegetação esparsa e floresta alagada com água doce podem ser afetadas por erros.\n\nA qualidade dos dados varia de acordo com a região, principalmente em relação à cobertura de imagens MERIS para a criação do mapa inicial. Áreas com cobertura menor incluem a parte oeste da bacia amazônica, o Chile e a parte sul da Argentina, a parte oeste da bacia do Congo, assim como o golfo da Guiné, a parte leste da Rússia e a costa leste da China e da Indonésia.",
    },
    {
      label: 'Licença',
      value: 'http://maps.elie.ucl.ac.be/CCI/viewer/download.php',
    },
  ],
  overview: {
    label: 'Visão geral',
    value:
      'Esse conjunto de dados (versão 2.07) foi criado a partir da Climate Change Initiative (CCI), uma iniciativa da Agência Espacial Europeia para criar dados de longo prazo, consistentes e globais com o objetivo de moldar o clima. O projeto Land Cover do CCI forneceu mapas terrestres consistentes de todo o mundo em uma resolução espacial de 300m de ano em ano, de 1992 a 2015. A plataforma Global Forest Watch apenas mostra dados de cobertura terrestre de 2015.\n\nPara garantir a consistência de ano a ano, os mapas de cobertura de terra para cada ano são derivados de um único mapa base de cobertura da terra. O mapa base foi criado usando o registro completo de imagens do MERIS de 2003 a 2012, usando classificação não supervisionada, bem como um algoritmo de "machine learning" (aprendizagem de IA) com imagens coletadas ao longo de vários anos. As mudanças são detectadas entre anos individuais com resolução de 1 km, usando dados do AVHRR de 1992 a 1999, dados do SPOT-VGT de 1999 a 2013 e dados do PROVA-V de 2014 e 2015. Tais mudanças devem ser consistentes por dois anos consecutivos para serem consideradas, com exceção das mudanças florestais em 2014 e 2015, que são consideradas bem detectadas. As mudanças de 1 km são combinadas com o mapa base de cobertura da terra e delineadas a 300 metros para 2004 em diante (quando os dados MERIS e PROVA-V estão disponíveis).\n\nOs dados resultantes contam com um total de 22 classes globais de cobertura terrestre. Para melhor visualização, o Global Forest Watch mostra apenas um conjunto de classes simplificadas, baseadas no IPCC (agricultura, floresta, pastagem, zonas úmidas, assentamento, matagal, vegetação esparsa, área descoberta, água, e gelo e neve permanentes). O conjunto completo de classes, assim como os mapas anuais de cobertura da terra desde 1992, estão disponíveis no visualizador ESA/CCI.',
  },
  citation: {
    label: 'Citação',
    value:
      'ESA Climate Change Initiative, Land Cover - led by UC Louvain. “2015 global land cover.” Land Cover CCI Product User Guide Version 2. Tech. Rep. (2017). Available at: maps.elie.ucl.ac.be/CCI/viewer/download/ESACCI-LC-Ph2-PUGv2_2.0.pdf. Accessed through Global Forest Watch on 14/02/2025. www.globalforestwatch.org.',
  },
};
