import utils from 'utils/AppUtils';

export function prepareStateForShare (options) {
  const {map, settings, language, basemap, activeLayers, activeTab, gladStartDate,
    gladEndDate, canopyDensity, terraIStartDate, terraIEndDate, lossFromSelectIndex, lossToSelectIndex,
    imazonStartMonth, imazonEndMonth, imazonStartYear, imazonEndYear,
    viirsStartDate, viirsEndDate, modisStartDate, modisEndDate
  } = options;
  const shareState = {};

  //- Application info
  if (settings.appid) { shareState.appid = settings.appid; }
  //- Map Related Info
  const center = map.extent.getCenter();
  shareState.x = center.getLongitude().toFixed(2);
  shareState.y = center.getLatitude().toFixed(2);
  shareState.z = map.getLevel();
  shareState.l = language;
  shareState.b = basemap;
  shareState.t = activeTab;

  if (activeLayers.length > 0) {
    console.log('activeLayers', activeLayers);
    shareState.a = activeLayers;
    shareState.o = [];
    activeLayers.forEach(activeLayerId => {
      let mapLayer = map.getLayer(activeLayerId);

      if (!mapLayer) {
        const webmapLayers = settings.layerPanel.GROUP_WEBMAP.layers;
        const webmapLayerConfig = utils.getObject(webmapLayers, 'subId', activeLayerId);
        console.log('webmapLayerConfig', webmapLayerConfig);

        if (webmapLayerConfig) {
          const id = webmapLayerConfig.id;
          mapLayer = map.getLayer(id);
        }
      }

      if (mapLayer) {
        if (mapLayer && !mapLayer.layerDrawingOptions && mapLayer.setOpacity) {
          console.log(1);
          console.log('setOpacity', mapLayer.setOpacity);
          shareState.o.push(mapLayer.opacity);
        } else if (mapLayer && mapLayer.layerDrawingOptions && mapLayer.visibleLayers) {
          // console.log('setOpacity', mapLayer.opacity);
          console.log('mapLayer.visibleLayers', mapLayer.visibleLayers);
          console.log('mapLayer.layerDrawingOptions', mapLayer.layerDrawingOptions);
          mapLayer.visibleLayers.forEach(visibleLayer => {
            if (mapLayer.layerDrawingOptions[visibleLayer]) {
              console.log(2);
              shareState.o.push((100 - mapLayer.layerDrawingOptions[visibleLayer].transparency) / 100);
            }
          });
        } else {
          console.log(4);
          shareState.o.push(1);
        }
      }
    });
    console.log('shareState.o', shareState.o);
  }
  if (canopyDensity !== 30) {
    shareState.c = canopyDensity;
  }

  if (activeLayers.indexOf('GLAD_ALERTS') > -1) {
    shareState.gs = gladStartDate;
    shareState.ge = gladEndDate;
  }

  if (activeLayers.indexOf('TERRA_I_ALERTS') > -1) {
    shareState.ts = terraIStartDate;
    shareState.te = terraIEndDate;
  }

  if (activeLayers.indexOf('TREE_COVER_LOSS') > -1) {
    shareState.ls = lossFromSelectIndex;
    shareState.le = lossToSelectIndex;
  }

  if (activeLayers.indexOf('IMAZON_SAD') > -1) {
    shareState.ism = imazonStartMonth;
    shareState.iem = imazonEndMonth;
    shareState.isy = imazonStartYear;
    shareState.iey = imazonEndYear;
  }

  if (activeLayers.indexOf('VIIRS_ACTIVE_FIRES') > -1) {
    shareState.vs = viirsStartDate;
    shareState.ve = viirsEndDate;
  }

  if (activeLayers.indexOf('MODIS_ACTIVE_FIRES') > -1) {
    shareState.ms = modisStartDate;
    shareState.me = modisEndDate;
  }

  return shareState;
}
