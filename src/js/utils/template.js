import Deferred from 'dojo/Deferred';
import lang from 'dojo/_base/lang';

import { urls} from 'js/config';
import resources from 'resources';
import { getUrlParams } from 'utils/params';
import arcgisUtils from 'esri/arcgis/utils';
import layerKeys from 'constants/LayerConstants';

const SEPARATOR = ';';

const pruneValues = (dict) => {
  Object.keys(dict).forEach((key) => {
    if (dict[key] === '' || dict[key] === undefined || dict[key] === null) {
      delete dict[key];
    }
  });
  return dict;
};

/**
* Takes a string and parse it into an array based on separator, e.g hey;you; => ['hey', 'you', '']
* This will remove any blanks from the array as well, e.g. ['hey', 'you', ''] => ['hey', 'you']
*/
const parseIntoArray = (resourceString) => {
  return resourceString.split(SEPARATOR).filter((value) => {
    return value !== undefined && value !== '';
  });
};

/**
 * This function globally filters layers marked as false in the core config from the table of contents,
 * and optionally accepts an array of objects containing a layer within a property
 */
const filterLayers = ({layers, layerKey}) => {
  return layers.filter(layer => {
    layer = layerKey ? layer[layerKey] : layer;
    switch (layer.id) {
      case layerKeys.VIIRS_ACTIVE_FIRES:
        return resources.viirsFires;
      case layerKeys.MODIS_ACTIVE_FIRES:
        return resources.modisFires;
      case layerKeys.LAND_COVER:
        return resources.landCover;
      case layerKeys.AG_BIOMASS:
        return resources.aboveGroundBiomass;
      case layerKeys.IFL:
        return resources.intactForests;
      case layerKeys.PRIMARY_FORESTS:
        return resources.primaryForests;
      case layerKeys.FORMA_ALERTS:
        return resources.forma;
      case layerKeys.GLOB_MANGROVE:
        return resources.mangroves;
      case layerKeys.IMAZON_SAD:
        return resources.sadAlerts;
      case layerKeys.GLAD_ALERTS:
        return resources.gladAlerts;
      case layerKeys.TERRA_I_ALERTS:
        return resources.terraIAlerts;
      case layerKeys.RECENT_IMAGERY:
        return resources.recentImagery;
      default:
        return true;
    }
  });
};

/**
* This function formats the resources object by adding information to it
* The default values in the resources match the values from AGOL, to make
* them easier to consume in my components, do all the formatting here
*/
const formatResources = () => {
  const appUrl = location.href.replace(location.search, '');
  //- LANGUAGE SETTINGS START
  resources.labels = {};
  resources.labels[resources.language] = {
    title: resources.title,
    subtitle: resources.subtitle,
    narrative: resources.narrative,
    webmapMenuName: resources.webmapMenuName
  };
  //- parse map themes for default laguage if present
  const names = resources.mapThemes ? parseIntoArray(resources.mapThemes) : [];
  const appids = resources.mapThemeIds ? parseIntoArray(resources.mapThemeIds) : [];

  if (names.length === appids.length && names.length > 0) {
    resources.labels[resources.language].themes = [];
    names.forEach((name, i) => {
      let url = `${appUrl}?appid=${appids[i].trim()}`;
      if (appids[i] === '#') {
        url = appUrl + '?';
      }

      resources.labels[resources.language].themes.push({
        label: name.trim(),
        url: url
      });
    });
  }

  const langUrlParam = getUrlParams(location.href).l;
  if (langUrlParam && langUrlParam === resources.alternativeLanguage) {
    resources.useAlternativeLanguage = true;
  }
  //- Add content for second language if configured
  if (resources.useAlternativeLanguage && resources.alternativeLanguage) {
    resources.labels[resources.alternativeLanguage] = {
      title: resources.alternativeLanguageTitle,
      subtitle: resources.alternativeLanguageSubtitle,
      narrative: resources.alternativeNarrative || resources.narrative,
      webmapMenuName: resources.alternativeWebmapMenuName || resources.webmapMenuName
    };
    //- parse map themes for second laguage if present
    const secondNames = resources.alternativeMapThemes ? parseIntoArray(resources.alternativeMapThemes) : [];
    if (secondNames.length === appids.length && names.length > 0) {
      resources.labels[resources.alternativeLanguage].themes = [];
      secondNames.forEach((name, i) => {
        resources.labels[resources.alternativeLanguage].themes.push({
          label: name.trim(),
          url: `${appUrl}?appid=${appids[i].trim()}`
        });
      });
    }
  }
  //- LANGUAGE SETTINGS END

  //- Restoration Module Configurations
  if (resources.restorationModule) {
    //- Parse the restoration module options if they are in AGOL
    if (resources.restorationOptions) {
      let optionLabels = parseIntoArray(resources.restorationOptions);
      const rasterIds = parseIntoArray(resources.restorationOptionsRasterIds);
      //- Make it in a format easier to consume in our components
      resources.labels[resources.language].restorationOptions = [];
      optionLabels.forEach((label, index) => {
        resources.labels[resources.language].restorationOptions.push({
          id: `$${rasterIds[index]}`,
          label: label
        });
      });

      //- Parse the options, colors, and any other content that will be used in the analysis
      resources.slopeAnalysisPotentialColors = parseIntoArray(resources.slopePotentialColors);
      resources.labels[resources.language].slopeAnalysisPotentialOptions = parseIntoArray(resources.slopePotentialOptions);
      //- Add description text
      resources.labels[resources.language].restorationChartDescription = resources.restorationChartDescription;
      resources.labels[resources.language].restorationTableDescription = resources.restorationTableDescription;
      resources.labels[resources.language].slopeDescription = resources.slopeDescription;
      //- Add the slope options in another language if configured
      if (resources.useAlternativeLanguage) {
        // Slope Options
        resources.labels[resources.alternativeLanguage].slopeAnalysisPotentialOptions = parseIntoArray(resources.alternativeSlopePotentialOptions);
        // Restoration Options
        optionLabels = parseIntoArray(resources.alternativeRestorationOptions);
        resources.labels[resources.alternativeLanguage].restorationOptions = [];
        optionLabels.forEach((label, index) => {
          resources.labels[resources.alternativeLanguage].restorationOptions.push({
            id: `$${rasterIds[index]}`,
            label: label
          });
        });
        //- Add description text
        resources.labels[resources.alternativeLanguage].restorationChartDescription = resources.alternativeRestorationChartDescription;
        resources.labels[resources.alternativeLanguage].restorationTableDescription = resources.alternativeRestorationTableDescription;
        resources.labels[resources.alternativeLanguage].slopeDescription = resources.alternativeSlopeDescription;
      }
    }
    //- Parse slope class names if present
    if (resources.slopeClassNames) {
      resources.slopeClasses = parseIntoArray(resources.slopeClassNames);
      resources.slopeColors = parseIntoArray(resources.slopeClassColors);
    }
    //- Parse tree cover class names if present
    if (resources.treeCoverClassNames) {
      resources.treeCoverClasses = parseIntoArray(resources.treeCoverClassNames);
      resources.treeCoverColors = parseIntoArray(resources.treeCoverClassColors);
    }
    //- Parse land cover class names if present
    if (resources.landCoverClassNames) {
      resources.landCoverClasses = parseIntoArray(resources.landCoverClassNames);
      resources.landCoverColors = parseIntoArray(resources.landCoverClassColors);
    }
    //- Parse population density class names if present
    if (resources.populationClassNames) {
      resources.populationClasses = parseIntoArray(resources.populationClassNames);
      resources.populationColors = parseIntoArray(resources.populationClassColors);
    }

    //- Parse rainfall class names if present
    if (resources.rainfallClassNames) {
      resources.rainfallClasses = parseIntoArray(resources.rainfallClassNames);
      resources.rainfallColors = parseIntoArray(resources.rainfallClassColors);
    }
  }

  //- Remove Layers from resources.layers if configured
  Object.keys(resources.layerPanel).forEach((group) => {
    const groupSettings = resources.layerPanel[group];
    if (!groupSettings.layers) { return; }
    resources.layerPanel[group].layers = filterLayers({layers: resources.layerPanel[group].layers});
  });

  //- Separate remote data layers
  const remoteDataLayers = [];
  Object.keys(resources.layerPanel).forEach(groupId => {
    if (!remoteDataLayers[groupId]) { remoteDataLayers[groupId] = []; }
    const groupSettings = resources.layerPanel[groupId];
    if (!groupSettings.layers) { return; }
    resources.layerPanel[groupId].layers = resources.layerPanel[groupId].layers.filter(layer => {
      if (layer.type === 'remoteDataLayer') {
        // console.log('layer', layer);
        remoteDataLayers.push({
          order: layer.order,
          groupId,
          layer,
        });
        // console.log('remoteDataLayers', remoteDataLayers);
        return false;
      }
      else {
        return true;
      }
    });
  });

  console.log('remoteDataLayers', remoteDataLayers);

  const remoteDataLayerRequests = remoteDataLayers
  .map((item, j) => fetch(`${urls.forestWatchLayerApi}/${item.layer.uuid}`)
    // .map(item => fetch(`${urls.forestWatchLayerApi}/${item.layer.uuid}`)
    // .map(item => {
    //   fetch(`${urls.forestWatchLayerApi}/${item.layer.uuid}`).then(foreignLayer => {
    //     return foreignLayer;
    //   })
    // })
    // .map(item => {
    //   fetch(`${urls.forestWatchLayerApi}/${item.layer.uuid}`).then(foreignLayer => {
    //     return foreignLayer;
    //   })
    // })
    .then(response => response.json())
    .then(json => json.data)
    .then(layer => fetch(layer.attributes.layerConfig.metadata)
    .then(response => response.json())
    .then(metadata => {
        const attributes = layer.attributes;
        const itemGroup = item.group;
        // console.log('layer', layer);
        // console.log('item', item);
        // console.log('j', j);
        // console.log(remoteDataLayers);
        // console.log(remoteDataLayers[j]);
        Object.keys(remoteDataLayers[j].layer).forEach(layerProp => {
          // console.log('layerProp', layerProp);
          if (layerProp !== 'type' && layerProp !== 'uuid') {
            layer.attributes.layerConfig[layerProp] = remoteDataLayers[j].layer[layerProp];
          }
        });
        item.layer = layer.attributes.layerConfig;
        item.group = itemGroup;
        // console.log('item.layer', item.layer);
        // debugger
        item.layer.metadata = {
          metadata,
          legendConfig: attributes.legendConfig
        };
        return item;
      })
    )
  );

  //- Update path if it is relative to point to local
  const base = window._app.base ? window._app.base + '/' : '';
  if (resources.logoUrl && resources.logoUrl.indexOf('.') === 0) {
    resources.logoUrl = base + resources.logoUrl;
  }

  // Object.keys(resources.basemaps).forEach((language) => {
  //   Object.keys(resources.basemaps[language]).forEach((bm) => {
  //     const basemap = resources.basemaps[language][bm];
  //     if (basemap.thumbnailUrl && basemap.thumbnailUrl.indexOf('.') === 0) {
  //       basemap.thumbnailUrl = base + basemap.thumbnailUrl;
  //#endregion//     }
  //   });
  // });

  resources.layerPanel.GROUP_BASEMAP.layers.forEach((basemap) => {
    if (basemap.thumbnailUrl && basemap.thumbnailUrl.indexOf('.') === 0) {
      basemap.thumbnailUrl = base + basemap.thumbnailUrl;
    }
  });

  return Promise.all(remoteDataLayerRequests)
  .then(remoteLayers => {
    // console.log('remoteLayers', remoteLayers);
    remoteLayers = filterLayers({layers: remoteLayers, layerKey: 'layer'});
    // console.log('remoteLayers2', remoteLayers);
    remoteLayers.forEach(item => {
      // console.log('item', item);
      // console.log('item.groupId', item.groupId);
      // console.log('resources.layerPanel[item.groupId', resources.layerPanel[item.groupId]);
      // console.log(resources);
      // debugger
      item.layer.order = item.order; // item.order is the value we set in resources, this needs to be added to the layer object
      resources.layerPanel[item.groupId].layers.push(item.layer);
    });
    return resources;
  });
};

export default {

  /**
  * Fetch application information from arcgis online and merge it in to our local resources
  * @param {string=} id - optional app id, if you dont provide it, it will attempt to get it from url
  * @return {promise} promise
  */
  getAppInfo: (id) => {
    const promise = new Deferred();
    const appid = id ? id : getUrlParams(location.href).appid;

    // Set the sharinghost to the correct location so the app can find the webmap content
    if (!resources.sharinghost) { resources.sharinghost = 'https://www.arcgis.com'; }
    arcgisUtils.arcgisUrl = `${resources.sharinghost}/sharing/rest/content/items`;

    if (!appid) {
      //- Format the resources before resolving
      formatResources().then(formattedResources => {
        promise.resolve(formattedResources);
      });
      return promise;
    }

    arcgisUtils.getItem(appid).then(res => {
      let agolValues = res.itemData && res.itemData.values;

      //- If we dont have agol settings, save the defaults, else merge them in
      if (!agolValues) {
        //- Format the resources before resolving
        formatResources().then(formattedResources => {
          promise.resolve(formattedResources);
        });
        return promise;
      } else {
        //- Prune agolValues by removing null keys
        agolValues = pruneValues(agolValues);

        //- This will merge all the settings in, but some things need a little massaging
        lang.mixin(resources, agolValues);

        //- Put the appid in settings so its easy to get to elsewhere in the app without rereading the url
        resources.appid = appid;

        //- Format the resources before resolving
        formatResources().then(formattedResources => {
          promise.resolve(formattedResources);
        });
      }

    }, err => {
      if (brApp.debug) { console.warn(`template.getAppInfo >> ${err.message}`); }
      formatResources().then(formattedResources => {
        promise.resolve(formattedResources);
      });
    });

    return promise;
  }

};
