export const zh = {
  title: '树木覆盖增加',
  subtitle: '(20年，30米，全球，UMD/NASA GEDI)',
  content: [
    {
      label: '功能',
      value: '确定森林覆盖增加的区域',
    },
    {
      label: '分辨率',
      value: '30 × 30 米',
    },
    {
      label: '地理覆盖范围',
      value: '全球',
    },
    {
      label: '来源',
      value:
        'Potapov, P., Hansen, M.C., Pickens, A., Hernandez-Serna, A., Tyukavina, A., Turubanova, S., Zalles, V., Li, X., Khan, A., Stolle, F., Harris, N., Song, X-P., Baggett, A., Kommareddy, I., and Kommareddy, A. 2022. The Global 2000-2020 Land Cover and Land Use Change Dataset Derived From the Landsat Archive: First Results. Frontiers in Remote Sensing, 13, April 2022. https://doi.org/10.3389/frsen.2022.856903',
    },
    {
      label: '内容日期',
      value: '2000-2020',
    },
    {
      label: '注意事项',
      value:
        '在此数据集中，“树木覆盖”的定义是高度为 5 m 及以上的林木植被，各种林冠密度的天然林地、森林或人工林均是其可能存在的形态。树木覆盖增加并不直接等同于恢复、造林或再造林。 由于研究方法和内容日期的差异，树木覆盖、增加和年损失数据集之间无法做到准确对照。因此，不能通过从年度树木覆盖损失数据集中减去树木覆盖增加的数值来计算“净值”，而是应当使用净树木覆盖变化图层，该图层完全是根据树高数据计算得出的。 综合利用其他产品（例如 GFW 上提供的林冠覆盖密度数据）时应审慎处理。 作者评估了产品的准确率，发现总体准确率为 99.3%，错分误差（误报）为 28.6%，漏分误差（漏报）为 42.2%。准确率会因生物群落而异，因此在任何特定地点都可能更高或更低。由于漏分误差高于错分误差，这表明产品提供了对森林动态的保守估计。 森林增强（现有森林高度增加）和森林增加（2000 年非林地内植树造林）之间存在混淆，这在难以确定 2000 年森林高度的北方森林地区更为突出。',
    },
    {
      label: '许可证',
      value: 'CC by 4.0',
    },
  ],
  overview: {
    label: '概览',
    value:
      '此数据集来自马里兰大学的 GLAD（全球土地分析与发现）实验室，以 30 × 30 米的分辨率测量了 2000 年至 2020 年全球树木覆盖面积增加情况，并以 20 年累加图层的形式显示。树木覆盖增加是使用 2000 年和 2020 年的树木高度信息确定的。树木高度是通过整合全球生态系统动力学调查 (GEDI) 激光雷达森林结构测量和 Landsat 可用于分析的数据时间序列来建模的。NASA GEDI 是 2019 年 4 月起在国际空间站上运行的星载激光雷达仪器。它提供基于点的植被结构测量，包括全球 北纬 52° 至南纬 52° 范围内的森林冠层高度。2020 年树高 ≥ 5 m 且 2000 年树高 < 5 m 的像素即认定为增加。',
  },
  citation: {
    label: '引用',
    value:
      'Use the following credit when this data is displayed:\nAccessed through Global Forest Watch on 29/01/2025. www.globalforestwatch.org. Use the following credit when this data is cited:\nPotapov, P., Hansen, M.C., Pickens, A., Hernandez-Serna, A., Tyukavina, A., Turubanova, S., Zalles, V., Li, X., Khan, A., Stolle, F., Harris, N., Song, X-P., Baggett, A., Kommareddy, I., and Kommareddy, A. 2022. The Global 2000-2020 Land Cover and Land Use Change Dataset Derived From the Landsat Archive: First Results. Frontiers in Remote Sensing, 13, April 2022. https://doi.org/10.3389/frsen.2022.856903',
  },
};
