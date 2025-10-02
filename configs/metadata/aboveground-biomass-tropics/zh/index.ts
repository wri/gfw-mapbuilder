export const zh = {
  title: '热带地上活木质生物量密度',
  subtitle: '热带地区，扎林/WHR',
  download_data: 'http://data.globalforestwatch.org/datasets/8f93a6f94a414f9588ce4657a39c59ff_1',
  content: [
    {
      label: '功能',
      value: '显示地上活木质生物量的碳密度值',
    },
    {
      label: '分辨率',
      value: '30米',
    },
    {
      label: '地理覆盖范围',
      value: '热带地区（北纬 30 度，南纬 20 度）',
    },
    {
      label: '来源',
      value: 'ICEsat GLAS 激光雷达、MODIS、陆地卫星、地面测量',
    },
    {
      label: '内容日期',
      value: '2000年',
    },
    {
      label: '注意事项',
      value:
        '建议同时使用地上碳密度和不确定性值进行碳评估和验证。当汇总到大面积（5,000 至 10,000 公顷）以进行项目和区域级别评估时，该地图将提供地上碳储量和地上碳密度的准确估计。单个像素的生物量密度值与验证的小图相比可能具有较大的不确定性。',
    },
    {
      label: '许可证',
      value: '知识共享 CC BY 4.0',
    },
  ],
  overview: {
    label: '概览',
    value:
      '这是一种更高分辨率的数据产品，扩展了 Baccini 等人提出的方法。 (2012) 生成了大约 2000 年分辨率为 30 m 的地上活木本生物量密度的泛热带地图。除了碳密度值之外，还有一个相同空间分辨率的误差图，提供了地上碳密度估计的不确定性。这些地图允许与 Hansen 等人一起进行生物量估计。 (2013, v1.0) 类似空间分辨率下的树木覆盖损失估计。 Baccini 等人描述的森林生物量密度地面测量值与同位地球科学激光高度计系统 (GLAS) LiDAR 波形指标之间得出的统计关系。 (2012) 用于估计整个热带地区 40,000 多个 GLAS 足迹的生物量密度。然后，使用 randomForest 模型，将 GLAS 得出的生物量密度估计值与连续的网格变量相关联，包括 Landsat 7 ETM+ 卫星图像和产品（例如反射率）、海拔和生物物理变量。通过使用连续网格数据集作为 randomForest 模型的输入，生成了整个热带地区地上木质生物量密度的 30 m 分辨率地图以及相关的不确定性层。不确定性层考虑了异速生长方程、基于激光雷达的模型和随机森林模型的误差。所有误差都会传播到最终的生物量估计值。该工作的详细描述将在正在准备的新论文中报告。',
  },
  citation: {
    label: '引用',
    value:
      'Baccini A.、W. Walker、L. Carvahlo、M. Farina、D. Sulla-Menashe、R. Houghton (2015)。热带森林是基于新的增益和损失测量的净碳源。审核中。于[日期]通过全球森林观察气候获取。 Climate.globalforestwatch.org。',
  },
};
