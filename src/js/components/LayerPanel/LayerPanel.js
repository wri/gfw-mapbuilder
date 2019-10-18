import DensityDisplay from 'components/LayerPanel/DensityDisplay';
import TerraIControls from 'components/LayerPanel/TerraIControls';
import LayerCheckbox from 'components/LayerPanel/LayerCheckbox';
import FiresControls from 'components/LayerPanel/FiresControls';
import LossControls from 'components/LayerPanel/LossControls';
import GladControls from 'components/LayerPanel/GladControls';
import FormaControls from 'components/LayerPanel/FormaControls';
import SadControls from 'components/LayerPanel/SadControls';
import LayerFieldFilter from 'components/LayerPanel/LayerFieldFilter';
import LayerGroup from 'components/LayerPanel/LayerGroup';
import RadioGroup from 'components/LayerPanel/RadioGroup';
import NestedGroup from 'components/LayerPanel/NestedGroup';
import LayerVersions from 'components/LayerPanel/LayerVersions';
import layerActions from 'actions/LayerActions';
import mapActions from 'actions/MapActions';
// import BasemapGroup from 'components/LayerPanel/BasemapGroup';
import WRIBasemapLayer from 'components/LayerPanel/WRIBasemapLayer';
import AGOLBasemap from 'components/LayerPanel/AGOLBasemap';
import LandsatLayer from 'components/LayerPanel/LandsatLayer';
import BasemapLayer from 'components/LayerPanel/BasemapLayer';
import LayerKeys from 'constants/LayerConstants';
import basemapUtils from 'utils/basemapUtils';
import basemaps from 'esri/basemaps';
import moment from 'moment';

// import utils from 'utils/AppUtils';
// import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

let hasNotRun = true;

export default class LayerPanel extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    if (this.props.activeLayers !== prevProps.activeLayers
      && this.props.activeLayers.filter(id => id !== 'USER_FEATURES').length > 0
      && hasNotRun) {
        hasNotRun = false;
        const { layerPanel } = this.context.settings;
        const groupsWithLayersTurnedOn = [];
        Object.keys(layerPanel).filter(key => key !== 'GROUP_BASEMAP' && key !== 'extraLayers').forEach(k => {
          if (layerPanel[k].hasOwnProperty('layers')) {
            layerPanel[k].layers.forEach(l => {
              let idToCheck = '';
              if (l.hasOwnProperty('nestedLayers')) {
                l.nestedLayers.forEach(nl => {
                  idToCheck = nl.subId || nl.id;
                });
              } else {
                idToCheck = l.subId || l.id;
              }
              if (this.props.activeLayers.indexOf(idToCheck) > -1 && groupsWithLayersTurnedOn.indexOf(k) === -1) {
                groupsWithLayersTurnedOn.push(k);
              }
            });
          }
        });
        if (groupsWithLayersTurnedOn.length > 0) {
          mapActions.openTOCAccordion.defer(groupsWithLayersTurnedOn[0]);
        }
    }
  }

  renderLayerGroups = (groups, language) => {
    const allRadioLayers = [];
    Object.keys(groups)
      .filter(groupKey => groups[groupKey].groupType === 'radio')
      .forEach(radioGroup => {
        allRadioLayers.push(...groups[radioGroup].layers);
      });

    //- Make an array, filter it, then sort by order
    const orderedGroups = Object.keys(groups).filter((key) => {
      //- extraLayers show on the map but not here, if no layers are configured
      //- don't add the group
      return key !== 'extraLayers';
    }).map(key => {
      //- Add a key to it for React
      groups[key].key = key;
      return groups[key];
    }).sort((a, b) => {
      //- Sort on configured order
      return a.order - b.order;
    });
    return orderedGroups.map((group) => {
      if (group.layers.length === 0) { return null; }
      group.layers = group.layers.sort((a, b) => b.order - a.order);
      //- Sort the layers and then render them, basemaps use a different function
      //- as not all basemaps are present in configuration

      let layers = [];
      switch (group.groupType) {
        case 'radio': {
          layers = <RadioGroup
            groupLayers={group.layers}
            allRadioLayers={allRadioLayers.filter(l => this.props.exclusiveLayerIds.indexOf(l.id) > -1)}
            activeLayers={this.props.activeLayers}
            dynamicLayers={this.props.dynamicLayers}
            iconLoading={this.props.iconLoading}
            initialLayerOpacities={this.props.initialLayerOpacities}
          />;
          break;
        }
        case 'nested':
          layers = <NestedGroup
            layers={group.layers}
            activeLayers={this.props.activeLayers}
            dynamicLayers={this.props.dynamicLayers}
            initialLayerOpacities={this.props.initialLayerOpacities}
          />;
          break;
        case 'basemap':
          layers = this.renderBasemaps(group.layers);
          break;
        default:
          layers = group.layers.map(this.checkboxMap);
      }

      let layerLoading;
      switch (group.key) {
        case 'GROUP_IMAGERY':
          layerLoading = this.props.loadingImagery;
          break;
        default:
          layerLoading = false;
      }

      return (
        <LayerGroup
          key={group.key}
          groupKey={group.key}
          layerLoading={layerLoading}
          label={group.label[language]}
          {...this.props}>
          {layers}
        </LayerGroup>
      );
    });
  };

  checkboxMap = (layer) => {
    const {
      activeLayers,
      dynamicLayers,
      iconLoading,
      gladStartDate,
      gladEndDate,
      formaStartDate,
      formaEndDate,
      terraIStartDate,
      terraIEndDate,
      viirsStartDate,
      viirsEndDate,
      modisStartDate,
      modisEndDate,
      initialLayerOpacities,
      selectedImagery,
      loadingImagery,
      ...props} = this.props;

    const {language} = this.context;
    let childComponent, editCallback, dynamicSublabel, layerLoading;

    // Set child component based on layer id
    switch (layer.id) {
      case 'VIIRS_ACTIVE_FIRES':
        childComponent = <FiresControls
          loaded={props.loaded}
          layer={layer}
          language={language}
          updateStartDate={layerActions.updateViirsStartDate}
          updateEndDate={layerActions.updateViirsEndDate}
          startDate={viirsStartDate}
          endDate={viirsEndDate}
          {...props}
        />;
        break;
      case 'MODIS_ACTIVE_FIRES':
        childComponent = <FiresControls
          loaded={props.loaded}
          layer={layer}
          language={language}
          updateStartDate={layerActions.updateModisStartDate}
          updateEndDate={layerActions.updateModisEndDate}
          startDate={modisStartDate}
          endDate={modisEndDate}
          {...props}
        />;
        break;
      case 'TREE_COVER_LOSS':
        childComponent = [
          <LossControls key='tcl_loss_control' layerId={layer.id} loaded={props.loaded} {...props} />,
          <DensityDisplay key='tcl_density-display' {...props} />
        ];
        break;
      case LayerKeys.RECENT_IMAGERY:
        editCallback = () => {
          const imageryMobile = window.innerWidth <= 600;
          mapActions.toggleImageryVisible(true);
          if (imageryMobile) {
            this.props.hideTabView();
          }
        };
        const attr = selectedImagery ? selectedImagery.attributes : null;
        const label = layer.dynamicSublabel[language];
        dynamicSublabel = attr && label ? label
                          .replace('{DATE_TIME}', `${moment(attr.date_time).format('DD MMM YYYY')}`)
                          .replace('{CLOUD_COVERAGE}', `${attr.cloud_score.toFixed(0)}`)
                          .replace('{INSTRUMENT}', `${attr.instrument.replace('_', ' ')}`) : '';
        layerLoading = loadingImagery;
        break;
      case LayerKeys.TREE_COVER:
      case LayerKeys.AG_BIOMASS:
        childComponent = <DensityDisplay {...props} />;
        break;
      case LayerKeys.IMAZON_SAD:
        childComponent = <SadControls
            layer={layer}
            startMonth={props.imazonStartMonth}
            endMonth={props.imazonEndMonth}
            startYear={props.imazonStartYear}
            endYear={props.imazonEndYear}
          />;
        break;
      case LayerKeys.GLAD_ALERTS:
        childComponent = <GladControls layer={layer} startDate={gladStartDate} endDate={gladEndDate} />;
      break;
      case LayerKeys.FORMA_ALERTS:
        childComponent = <FormaControls layer={layer} startDate={formaStartDate} endDate={formaEndDate} />;
      break;
      case LayerKeys.TERRA_I_ALERTS:
        childComponent = <TerraIControls layer={layer} startDate={terraIStartDate} endDate={terraIEndDate}/>;
      break;
      default:
        if (layer.filterField && (layer.type === 'dynamic' || layer.type === 'feature')) {
          childComponent = <LayerFieldFilter language={language} layer={layer} />;
        } else if (layer.versions && layer.versions.length > 0 && (layer.type === 'feature' || layer.type === 'dynamic')) {
          childComponent = <LayerVersions layer={layer}/>;
        } else {
          childComponent = null;
          editCallback = null;
        }
    }

    let checkbox;

    if (layer.subId) {
      const checked = (dynamicLayers[layer.id] && dynamicLayers[layer.id].indexOf(layer.subIndex) > -1) || false;
      checkbox = <LayerCheckbox initialLayerOpacities={initialLayerOpacities} key={layer.subId || `layer-checkbox-${Math.floor(Math.random() * 100000)}`} layer={layer} subLayer={true} checked={checked} iconLoading={iconLoading}>
        {childComponent}
      </LayerCheckbox>;
    } else {
      checkbox = <LayerCheckbox layerLoading={layerLoading} onEdit={editCallback} dynamicSublabel={dynamicSublabel} initialLayerOpacities={initialLayerOpacities} key={layer.id || `layer-checkbox-${Math.floor(Math.random() * 100000)}`} layer={layer} checked={activeLayers.indexOf(layer.id) > -1 } iconLoading={iconLoading}>
        {childComponent}
      </LayerCheckbox>;
    }
    return checkbox;
  }

  renderBasemaps = (configuredLayers) => {
    const {language, settings} = this.context;
    const { basemap, webmapInfo} = this.props;
    let basemapLayers = [];

    //- Add Custom Basemaps
    configuredLayers.forEach((layer) => {
      if (layer.id === LayerKeys.WRI_MONO || layer.id === LayerKeys.WRI_CONTEXTUAL) {
        basemapLayers.push(
          <WRIBasemapLayer
            key={layer.id}
            layerId={layer.id}
            icon={layer.thumbnailUrl}
            label={layer.title[language]}
            active={basemap === layer.id} />
        );
      }

      if (layer.id === LayerKeys.LANDSAT) {
        basemapLayers.push(
          <LandsatLayer
            key={layer.id}
            layerId={layer.id}
            years={layer.years}
            icon={layer.thumbnailUrl}
            label={layer.title[language]}
            active={basemap === 'landsat'} />
        );
      }
    });

    if (settings.useWebmapBasemap) {
      const bmLayerNames = webmapInfo.baseMap.baseMapLayers.map(baseMapLayer => baseMapLayer.id);
      // console.log('bmLayerNames', bmLayerNames);
      // console.log('basemap', basemap);
      
      basemapLayers.push(
        <AGOLBasemap
          label={'Webmap Basemap'}
          active={!basemap || basemap === 'agol' || bmLayerNames.includes(basemap)} />
      );
    }

    //- Add Esri Basemaps
    if (basemaps) {
      let basemapNames = Object.keys(basemaps);
      basemapNames = basemapNames.filter(bm => {
        /* Only show basemaps WRI wants */
        return basemapUtils.arcgisBasemaps.indexOf(bm) > -1;
      });

      basemapLayers = basemapLayers.concat(basemapNames.map(bm => {
        return (
          <BasemapLayer
            icon={basemaps[bm].thumbnailUrl}
            label={basemaps[bm].title}
            active={basemap === bm}
            basemap={bm}
            key={bm} />
        );
      }));
    }

    return basemapLayers;
  };

  render() {
    const {settings, language} = this.context;
    //- Create the layerGroup components
    const layerGroups = settings.layerPanel || {};
    const groups = this.renderLayerGroups(layerGroups, language);

    return (
      <div className={`layer-panel custom-scroll`}>
        {groups}
      </div>
    );
  }

}
