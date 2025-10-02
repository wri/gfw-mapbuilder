export const zh = {
  title: '热带树木覆盖',
  subtitle: '2020, 10 m/0.5 ha, tropical, WRI',
  download_data: 'https://data.globalforestwatch.org/datasets/tropical-tree-cover/explore',
  learn_more: '',
  content: [
    {
      label: '功能',
      value:
        '以10米为单位显示树木范围，以半公顷为单位显示树木覆盖，从而能够准确监测城市地区、农业用地以及稀疏林冠和干燥森林生态系统中的树木',
    },
    {
      label: '分辨率',
      value: '10 x 10米，半公顷',
    },
    {
      label: '地理覆盖范围',
      value: '43亿公顷热带地区（北纬23.44度至南纬23.44度）',
    },
    {
      label: '来源',
      value: 'World Resources Institute',
    },
    {
      label: '更新频率',
      value: '从2017年开始的年度变化监测地图计划于2024年发布。',
    },
    {
      label: '内容日期',
      value: 2020,
    },
    {
      label: '注意事项',
      value:
        '本数据集使用了与Hansen等人不同的树木定义和树木覆盖定义。（2013）。本数据集根据树的高度和树冠直径来定义树木。任何高于5米的木本植被，或高度为3至5米且树冠直径不小于5米的的木本植被可被视为树木。这一定义与Hansen等人的不同（2013），他们将树木定义为任何高度为5米及以上的植被。热带树木覆盖数据集并没有消除人工林树木和非人工林树木的歧义。\n\n对小于0.5ha的shapefiles进行的分析或统计可能不准确。',
    },
    {
      label: '许可证',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: '概览',
    value:
      '热带树木覆盖数据绘制出了以10米为单位的树木范围和以半公顷为单位的树木覆盖，从而能够准确监测城市地区、农业用地、稀疏林冠和干燥森林生态系统中的树木。数据涵盖了全球热带地区超过43亿公顷的土地。\n\n数据来源于应用于Sentinel光学和雷达图像的多时相卷积神经网络模型。10米的数据集是一个类似于土地覆盖图的二叉树范围图层，而树木覆盖数据代表以半公顷为单位的部分覆盖。有关方法和分析的更多详细信息，请访问GitHub页面。',
  },
  citation: {
    label: '引用',
    value:
      'Use the following credit when this data is displayed: Source: 14/02/2025, accessed through Global Forest Watch on 14/02/2025\n\nUse the following credit when this data is cited: Brandt,\nBrandt, J., Ertel, J., Spore, J., & Stolle, F. (2023). WALL-to-wall\nmapping of tree extent in the tropics with sentinel-1 and sentinel-2. Remote Sensing of Environment, 292, 113574. https://doi.org/10.1016/j.rse.2023.11357',
  },
};
