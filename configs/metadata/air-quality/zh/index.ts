export const zh = {
  title: '空气质量：二氧化氮 (NO₂) 卫星测量数据',
  subtitle: '3.5 x 5.5 km, global, 2018, TROPOMI/ESA/KNMI/DLR/SRON/BIRA-IASB/STFC/MPIC/S[&]T/Uni-Bremen',
  download_data: '',
  learn_more: '',
  content: [
    {
      label: '功能',
      value: '对流层二氧化氮 (NO₂) 的月均浓度',
    },
    {
      label: '分辨率',
      value: '3.5 × 5.5 公里',
    },
    {
      label: '地理覆盖范围',
      value: '全球预计干旱期变化',
    },
    {
      label: '来源',
      value: 'TROPOMI/ESA/KNMI/DLR/SRON/BIRA-IASB/STFC/MPIC/S[&]T/Uni-Bremen',
    },
    {
      label: '更新频率',
      value: '每月',
    },
    {
      label: '内容日期',
      value: '2022-05-18 - 2022-06-17',
    },
    {
      label: '注意事项',
      value:
        '当前使用的地表反照率气候学数据的空间分辨率为 0.5° × 0.5°（约 55 × 55 公里），相较于 S5P TROPOMI 使用的 3.5 × 5.5 公里 的更高空间分辨率而言较为粗略。因此，反照率网格会影响 NO₂ 柱产品的质量，特别是在沿海地区。\n\n总体而言，TROPOMI 在污染地区通常低估了对流层 NO₂ 浓度。日常对比分析的中位负偏差通常小于 50%（这是对流层 NO₂ 产品的要求），但具体数值可能因测站位置和 NO₂ 水平而有所变化。TROPOMI 数据与 多轴差分吸收光谱法（MAX-DOAS） 观测的 NO₂ 数据集之间具有良好的一致性，相关系数为 0.84。\n\n有关数据质量的更多信息，请参阅 产品自述文件。',
    },
    {
      label: '许可证',
      value: '[需要署名](https://sentinel.esa.int/documents/247904/690755/Sentinel_Data_Legal_Notice)',
    },
  ],
  overview: {
    label: '概览',
    value:
      '空气质量：NO₂ 卫星测量数据集 提供了全球对流层二氧化氮（NO₂）浓度的月均值。数据集中显示的每个值代表地球表面到对流层顶部之间的 NO₂ 浓度，单位为 每平方米空气中的 NO₂ 摩尔数（mol/m²）。\n\n二氧化氮（NO₂）是氮氧化物（NOx） 组中最常见的化合物之一，其他氮氧化物包括硝酸（HNO₃）和一氧化氮（NO）。NO₂ 通常被用作整个氮氧化物类别的指标，即如果空气中存在 NO₂，很可能其他氮氧化物也存在。NO₂ 主要由燃料燃烧产生，其来源包括汽车、卡车、公交车、发电厂以及非公路设备。\n\nNO₂ 对人体健康的影响短期高浓度暴露 可能会刺激人类呼吸系统的气道，加重哮喘等呼吸道疾病，并引发咳嗽、喘息或呼吸困难等症状。\n长期暴露 于高浓度 NO₂ 可能会增加哮喘的发生风险，并可能提高对呼吸道感染的易感性。儿童、老年人以及哮喘患者通常对 NO₂ 影响更为敏感。\n数据来源 该数据集基于 Sentinel-5 前驱（S5P） 任务收集的数据。S5P 是低地球轨道的极地卫星系统，属于欧洲委员会（EC） 与 欧洲航天局（ESA） 合作开展的全球环境与安全监测（GMES/COPERNICUS） 空间计划的一部分，旨在提供空气质量、气候和臭氧层 相关的信息与服务。S5P 任务包括对流层监测仪器（TROPOMI），可每日获取全球关键大气成分（如 NO₂）的观测数据，空间分辨率为 5.5 × 3.5 公里。\n\n相关数据集 Resource Watch 还提供了 TROPOMI 数据的其他空气质量指标，包括：一氧化碳（CO）, 臭氧（O₃）, 吸收气溶胶指数（AAI）',
  },
  citation: {
    label: '引用',
    value:
      'European Space Agency. 2018. ESA Sentinel-5P TROPOMI L3 products. Accessed through Resource Watch, (date). [www.resourcewatch.org](https://www.resourcewatch.org).',
  },
};
