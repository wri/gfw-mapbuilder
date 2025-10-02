export const zh = {
  title: '土地覆盖 2015',
  subtitle: 'ESA/UCLouvain, 2015',
  download_data: 'http://maps.elie.ucl.ac.be/CCI/viewer/download.php',
  learn_more: 'http://maps.elie.ucl.ac.be/CCI/viewer/download/ESACCI-LC-Ph2-PUGv2_2.0.pdf',
  content: [
    {
      label: '功能',
      value: '显示 2015 年全球土地植被覆盖分布',
    },
    {
      label: '分辨率',
      value: '300 × 300 meters',
    },
    {
      label: '地理覆盖范围',
      value: '全球',
    },
    {
      label: '来源',
      value: '© ESA Climate Change Initiative - Land Cover led by UCLouvain (2017)',
    },
    {
      label: '更新频率',
      value: '每年',
    },
    {
      label: '内容日期',
      value: 2015,
    },
    {
      label: '注意事项',
      value:
        'CCI 提供全面精度评估。通常，土地覆盖类别，如旱作农田、灌溉农田、阔叶常绿林、城区、裸地、水体和永久积雪等，可以准确绘制。另一方面，地衣、苔藓、稀疏植被和淡水沼泽森林等类别可能会受到误差的影响。\n\n数据质量因区域而异，特别是与用于创建基线地图的 MERIS 图像的覆盖范围有关。覆盖较少的地区包括亚马逊盆地西部、智利、阿根廷南部、刚果盆地西部以及几内亚湾、俄罗斯东部、中国东海岸和印度尼西亚。',
    },
    {
      label: '许可证',
      value: 'http://maps.elie.ucl.ac.be/CCI/viewer/download.php',
    },
  ],
  overview: {
    label: '概览',
    value:
      '这个数据集（版本 2.07）是作为气候变化倡议 (CCI) 的一部分创建的，CCI 是欧洲太空总署为气候建模目的，创建的长期一致全球数据倡议的一部分。从 1992 年到 2015 年，CCI Land Cover 项目每年提供 300 米空间分辨率的全球土地覆盖地图。Global Forest Watch 平台只显示 2015 年的土地覆盖数据。\n\n为了确保逐年的一致性，每年的土地覆盖图都是从单个基准土地覆盖图得出的。基线图是使用2003年至2012年的MERIS图像的完整记录，无监督分类，以及多年图像的机器学习算法创建的。然后，使用1992年至1999年的AVHRR数据，1999年至2013年的SPOT-VGT数据，2014年和2015年的PROVA-V数据，以1 km的分辨率检测各个年份之间的变化。为了连续计算变化，必须连续两年保持一致，但2014年和2015年的森林变化除外，因为我们认为这些变化能被很好地识别。然后将1km的变化与基线土地覆盖图合并，并在2004年以后划定为300米（当MERIS和PROVA-V数据可用时）。\n\n结果数据共有22种全球土地覆盖类别。为了实现更好地可视化，Global Forest Watch仅根据IPCC（农业，森林，草原，湿地，定居点，灌木丛，稀疏植被，裸露区域，水和永久性冰雪）显示一组简化的分类。ESA/CCI查看器提供了完整的分类集，以及早至1992年的年度土地覆盖图。',
  },
  citation: {
    label: '引用',
    value:
      'ESA Climate Change Initiative, Land Cover - led by UC Louvain. “2015 global land cover.” Land Cover CCI Product User Guide Version 2. Tech. Rep. (2017). Available at: maps.elie.ucl.ac.be/CCI/viewer/download/ESACCI-LC-Ph2-PUGv2_2.0.pdf. Accessed through Global Forest Watch on 14/02/2025. www.globalforestwatch.org.',
  },
};
