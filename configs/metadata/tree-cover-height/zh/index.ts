export const zh = {
  title: '树木覆盖高度',
  subtitle: '2000/2020, 30 m, global, UMD/NASA GEDI',
  download_data: '',
  learn_more: 'https://glad.umd.edu/dataset/gedi/',
  content: [
    {
      label: '功能',
      value: '展示 2000 年和 2020 年全球森林冠层的高度。',
    },
    {
      label: '分辨率',
      value: '30 meters (30 m)',
    },
    {
      label: '地理覆盖范围',
      value: '全球，原型数据高于 52°N',
    },
    {
      label: '来源',
      value:
        'Potapov, P., Li, X., Hernandez-Serna, A., Tyukavina, A., Hansen, M.C., Kommareddy, A., Pickens, A., Turubanova, S., Tang, H., Silva, C.E. and Armston, J., 2021. Mapping global forest canopy height through integration of GEDI and Landsat data. Remote Sensing of Environment, 253, p.112165. https://doi.org/10.1016/j.rse.2020.112165',
    },
    {
      label: '更新频率',
      value: '',
    },
    {
      label: '内容日期',
      value: '2000 and 2020',
    },
    {
      label: '注意事项',
      value:
        '全球森林高度图是一个原型产品，存在与 GEDI 数据质量和 Landsat 数据可用性相关的已知问题。 GEDI 数据过高地估计了温带和亚热带山地草原斜坡上的森林高度，例如在新西兰和莱索托。由于 GEDI 数据存在区分植被高度和人造物体高度的问题，城市和郊区的树木高度可能与建筑物高度混淆。 GEDI 校准的不确定性（特别是地理定位精度和地表高度估计）可能是造成某些地图误差的原因。树高模型的最大取值为 30m，可能无法充分涵盖最高树木的高度。全球产品将在未来进行更新以解决大部分问题。',
    },
    {
      label: '许可证',
      value: '',
    },
  ],
  overview: {
    label: '概览',
    value:
      '通过整合Global Ecosystem Dynamics Investigation (GEDI) 激光雷达森林结构测量和 Landsat 可直接分析的数据时间序列，开发了此全新的 30 m空间分辨率全球森林冠层高度图。NASA GEDI 是一种星载激光雷达仪器，自 2019 年 4 月起在国际空间站上运行。它提供基于点的植被结构测量，测量包括全球 52°N 至 52°S 之间的森林冠层高度。马里兰大学的全球土地分析和发现团队 (UMD GLAD) 将迄今为止（2019 年 4 月至 10 月）可用的 GEDI 数据与 2019 年 Landsat 可直接分析的时间序列数据（Landsat ARD）相整合。GEDI RH95（95% 的相对高度）度量标准被用于校准模型。代表地表物候的 Landsat 多时态指标可作为全球森林高度建模的自变量。实施了“移动窗口”局部校准和应用回归树集成模型，以确保高质量的森林高度预测和全球地图一致性。该模型在北方地区（超出 GEDI 数据范围）进行外推，以创建全球森林高度原型图。',
  },
  citation: {
    label: '引用',
    value:
      'Potapov, P., Li, X., Hernandez-Serna, A., Tyukavina, A., Hansen, M.C., Kommareddy, A., Pickens, A., Turubanova, S., Tang, H., Silva, C.E. and Armston, J., 2021. Mapping global forest canopy height through integration of GEDI and Landsat data. Remote Sensing of Environment, 253, p.112165. https://doi.org/10.1016/j.rse.2020.112165. Accessed through Global Forest Watch on 14/02/2025. www.globalforestwatch.org.',
  },
};
