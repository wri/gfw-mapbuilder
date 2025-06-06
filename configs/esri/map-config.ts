export const MAP_CONFIG = {
  printWidget: {
    forceFeatureAttributes: true,
    format: 'pdf',
    showLabels: true,
    customTextElements: [
      { description: 'My description' },
      { location: 'My Location' },
      { date: '11/11/2020, 11:11:20 AM' },
    ],
    layoutOptions: {
      titleText: 'Mapbuilder',
      copyrightText: '© World Resources Institute',
      authorText: 'GFW Mapbuilder',
      scalebarUnit: 'Kilometers',
      customTextElements: [{ title: 'GFW Mapbuilder' }, { subtitle: 'Make maps that matter' }],
      legendLayers: [],
    },
  },
};
