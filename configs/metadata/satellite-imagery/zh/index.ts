export const zh = {
  title: 'Landsat-8 / Sentinel-2 Satellite Imagery',
  content: [
    {
      label: '功能',
      value:
        '为了向 GFW 上可用的其他数据层提供背景，比如解释造成树木覆盖变化的原因，高分辨率卫星图像必不可少。它常用来查找准实时森林破坏警报的可能原因。它还可以在验证协议中使用，用于评估土地/森林覆盖的准确性及更改产品.',
    },
    {
      label: '分辨率',
      value: 'Sentinal-2: 10 x 10 meters, Landsat 8: 30 x 30 meters',
    },
    {
      label: '地理覆盖范围',
      value: '全球',
    },
    {
      label: '来源',
      value:
        'Copernicus Sentinel-2. Retrieved from Google Earth Engine. Data processed by the European Space Agency (ESA).',
    },
    {
      label: '更新频率',
      value: '每天都有新的图片出现。图片重访时间：Sentinel-2A：每 10 天，Landsat 8：每 16 天',
    },
    {
      label: '内容日期',
      value: '2012 年 1 月至今',
    },
  ],
  overview: {
    label: '概览',
    value:
      '该数据显示了符合 Sentinel-2 和 Landsat 8 系统中所选云层覆盖标准的最新卫星图像。Sentinel-2 由欧洲航天局运营，提供分辨率为 10 米的覆盖全球的图像，每 10 天更新一次。由美国地质调查局运营的 Landsat 8 也是一颗全球卫星，提供分辨率为 30 米的图像，每 16 天更新一次。 两颗卫星均可提供显示自然色彩和植被健康状况的图像。自然色彩图像使用可见光（红色、绿色和蓝色）的信息来显示地球表面，就像人眼看到的那样。归一化差异植被指数 (NDVI) 用于检测植被健康状况，该指数包含红光和近红外光反射率的信息。该方法基于这样一个事实：健康的植被吸收大部分可见光，并将照射在其表面上的大部分近红外光反射出去。在对显示植被健康状况的图像进行解读时，红色表示健康生长的植被，绿色表示裸露的地面，黑色表示水体。',
  },
};
