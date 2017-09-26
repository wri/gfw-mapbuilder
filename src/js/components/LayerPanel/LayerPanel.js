import DensityDisplay from 'components/LayerPanel/DensityDisplay';
import TerraIControls from 'components/LayerPanel/TerraIControls';
import LayerCheckbox from 'components/LayerPanel/LayerCheckbox';
import LayerRadio from 'components/LayerPanel/LayerRadio';
import NestedGroup from 'components/LayerPanel/NestedGroup';
import FiresControls from 'components/LayerPanel/FiresControls';
import LossControls from 'components/LayerPanel/LossControls';
import GladControls from 'components/LayerPanel/GladControls';
import SadControls from 'components/LayerPanel/SadControls';
import LayerGroup from 'components/LayerPanel/LayerGroup';
import layerActions from 'actions/LayerActions';
// import BasemapGroup from 'components/LayerPanel/BasemapGroup';
import WRIBasemapLayer from 'components/LayerPanel/WRIBasemapLayer';
import LandsatLayer from 'components/LayerPanel/LandsatLayer';
import BasemapLayer from 'components/LayerPanel/BasemapLayer';
import LayerKeys from 'constants/LayerConstants';
import basemapUtils from 'utils/basemapUtils';
import basemaps from 'esri/basemaps';
// import utils from 'utils/AppUtils';
// import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

export default class LayerPanel extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };

  // renderLayerGroup = (group, layers) => {
  //   return (
  //     <LayerGroup
  //       key={group.key}
  //       groupKey={group.key}
  //       label={group.label}
  //       {...this.props}>
  //       {layers.map(this.checkboxMap(group.key), this)}
  //     </LayerGroup>
  //   );
  // };

  renderLayerGroups = (groups, language) => {
    //- Make an array, filter it, then sort by order
    const orderedGroups = Object.keys(groups).filter((key) => {
      //- extraLayers show on the map but not here, if no layers are configured
      //- don't add the group
      return key !== 'extraLayers' && groups[key].layers.length;
    }).map(key => {
      //- Add a key to it for React
      groups[key].key = key;
      return groups[key];
    }).sort((a, b) => {
      //- Sort on configured order
      return a.order - b.order;
    });

    return orderedGroups.map((group) => {
      //- Sort the layers and then render them, basemaps use a different function
      //- as not all basemaps are present in configuration

      let layers = [];

      if (group.key === 'GROUP_LAND_MAPS') {

        group.indigenous = [];
        group.community = [];

        group.layers.forEach(layer => {

          if (layer.id === 'comm_comm_NotDocumented_9336'
            || layer.id === 'comm_comm_Documented_4717') { // if this is the community group and IS acknowledged by govt
            layer.acknowledgedByGovt = true;
            layer.indigenousOrCommunity = 'community';
            layer.order = layer.id === 'comm_comm_Documented_4717' ? 0 : 1; // Order the 'Documented' layer ahead of the 'Not Documented' layer
          } else if (layer.id === 'comm_comm_CustomaryTenure_6877'
            || layer.id === 'comm_comm_FormalLandClaim_5585') { // if this is the community group and NOT acknowledged by govt
            layer.acknowledgedByGovt = false;
            layer.indigenousOrCommunity = 'community';
            layer.order = layer.id === 'comm_comm_FormalLandClaim_5585' ? 0 : 1; // Order the 'Formal' layer ahead of the 'Customary' layer
          } else if (layer.id === 'comm_ind_CustomaryTenure_8127'
            || layer.id === 'comm_ind_FormalLandClaim_2392') { // if this is the indigenous group and NOT acknowledged by govt
            layer.acknowledgedByGovt = false;
            layer.indigenousOrCommunity = 'indigenous';
            layer.order = layer.id === 'comm_ind_FormalLandClaim_2392' ? 0 : 1; // Order the 'Formal' layer ahead of the 'Customary' layer
          } else if (layer.id === 'comm_ind_NotDocumented_2683'
            || layer.id === 'comm_ind_Documented_8219') { // if this is the indigenous group and IS acknowledged by govt
            layer.acknowledgedByGovt = true;
            layer.indigenousOrCommunity = 'indigenous';
            layer.order = layer.id === 'comm_ind_Documented_8219' ? 0 : 1; // Order the 'Documented' layer ahead of the 'Not Documented' layer
          }
        });
      }

      // IF group.key is one of the ones we need radio buttons for run a new function this.createRadios (or something)
      // and pass all of the layers to it. That way we can handle the radio selection in the component

      if (group.key === LayerKeys.GROUP_INDIGENOUS_INDICATORS || group.key === LayerKeys.GROUP_COMMUNITY_INDICATORS) {
        group.layers.sort((a, b) => a.subIndex - b.subIndex);
        layers = this.createRadioGroup(group.layers);
      } else if (group.key === 'GROUP_LAND_MAPS') {
        layers = <NestedGroup layers={group.layers} activeLayers={this.props.activeLayers} />;
      } else if (group.key === 'GROUP_INDIGENOUS_LANDS_HELD') {
        group.layers.sort((a, b) => a.subIndex - b.subIndex);
        layers = this.createRadioGroup(group.layers);
      } else {
        layers = group.key === LayerKeys.GROUP_BASEMAP ?
        this.renderBasemaps(group.layers) :
        group.layers.sort((a, b) => { return b.order - a.order; }).map(this.checkboxMap, this);
      }

      return (
        <LayerGroup
          key={group.key}
          groupKey={group.key}
          label={group.label[language]}
          {...this.props}>
          {layers}
        </LayerGroup>
      );
    });
  };

  checkboxMap (layer) {
    const {
      activeLayers,
      dynamicLayers,
      iconLoading,
      gladStartDate,
      gladEndDate,
      terraIStartDate,
      terraIEndDate,
      viirsFiresSelectIndex,
      viirsStartDate,
      viirsEndDate,
      modisFiresSelectIndex,
      modisStartDate,
      modisEndDate,
      ...props} = this.props;
    const {language} = this.context;
    let childComponent;

    switch (layer.id) {
      case 'VIIRS_ACTIVE_FIRES':
        childComponent = <FiresControls
          loaded={props.loaded}
          layer={layer}
          language={language}
          firesSelectIndex={viirsFiresSelectIndex}
          selectChangeAction={layerActions.changeViirsFiresTimeline}
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
          firesSelectIndex={modisFiresSelectIndex}
          selectChangeAction={layerActions.changeModisFiresTimeline}
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
      case LayerKeys.TERRA_I_ALERTS:
        childComponent = <TerraIControls layer={layer} startDate={terraIStartDate} endDate={terraIEndDate}/>;
        break;
      default:
        childComponent = null;
    }

    let checkbox;
    if (layer.subId) {
      const checked = (dynamicLayers[layer.id] && dynamicLayers[layer.id].indexOf(layer.subIndex) > -1) || false;
      checkbox = <LayerCheckbox key={layer.subId} layer={layer} subLayer={true} checked={checked} iconLoading={iconLoading}>
      {childComponent}
      </LayerCheckbox>;
    } else {
      checkbox = <LayerCheckbox key={layer.id} layer={layer} checked={activeLayers.indexOf(layer.id) > -1} iconLoading={iconLoading}>
        {childComponent}
      </LayerCheckbox>;
    }
    return checkbox;
  }

  createRadioGroup = layers => {
    return <LayerRadio layers={layers} dynamicLayers={this.props.dynamicLayers}/>;
  }

  renderBasemaps = (configuredLayers) => {
    const {language} = this.context;
    const {basemap} = this.props;
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
