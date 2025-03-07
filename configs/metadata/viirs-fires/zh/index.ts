export const zh = {
  title: 'VIIRS 活跃火灾',
  subtitle: '（每日、375米、全球、美国航空航天局）',
  download_data: 'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/active-fire-data',
  learn_more: 'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/viirs-i-band-active-fire-data',
  content: [
    {
      label: '功能',
      value: '显示过去 24 小时、48 小时、72 小时或 7 天的火灾警报数据',
    },
    {
      label: '分辨率',
      value: '375 × 375 米',
    },
    {
      label: '地理覆盖范围',
      value: '全球',
    },
    {
      label: '来源',
      value: 'NASA',
    },
    {
      label: '更新频率',
      value: '每日两次',
    },
    {
      label: '内容日期',
      value: '近实时',
    },
    {
      label: '注意事项',
      value:
        '不是所有的火灾都能被探测到。有几个理由会导致 VIIRS 可能没有监测到某场火灾。火灾有可能在卫星经过时间的空隙之间就开始并结束了。火灾有可能太小或温度太低，以至于无法在375米的像素中被探测到。云层、浓烟或树冠有可能完全遮盖火灾。',
    },
    {
      label: '许可证',
      value:
        '我们确认使用来自由 NASA/HQ 提供资金的 NASA/GSFC/地球科学数据和信息系统 (ESDIS) 操作的 LANCE FIRMS 的数据和图像。',
    },
  ],
  overview: {
    label: '概览',
    value:
      'VIIRS 活跃火灾数据 (VNP14IMGT) 是 FIRMS （资源管理系统的火灾信息）的最新火灾监测产品，可以近实时地识别全球火灾位置。信息通过可见光红外成像辐射仪套件 (VIIRS) 传感器收集，并通过火灾探测算法进行处理，以标记活跃的火灾。地图上的每个点代表了被算法标记的一个 375 米像素的中心。',
  },
  citation: {
    label: '引用',
    value:
      'NASA FIRMS. “VIIRS Active Fires.” Accessed through Global Forest Watch on 30/01/2025. www.globalforestwatch.org',
  },
};
