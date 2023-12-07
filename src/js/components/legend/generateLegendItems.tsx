import * as React from 'react';

import { LayerProps } from '../../store/mapview/types';
import { GradientItem } from './LegendLabelComponents';
import { mapController } from '../../controllers/mapController';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import LegendLabel from './LegendLabel';
import legendInfoController from '../../helpers/legendInfo';
import ManualLegend from './ManualLegend';
import WMSImageWithPlaceholder from './generateWMSLegendGraphic';

interface LegendItemProps {
  visibleLayers: LayerProps[];
  language: string;
  gladConfirmed: boolean;
}

function generateGradientItem(legendConfig: any, language: string): JSX.Element {
  return (
    <div className="label-item">
      <GradientItem items={legendConfig.items} language={language} />
    </div>
  );
}

function checkForRenderer(layer: LayerProps): boolean {
  const esriLayer = mapController._map?.findLayerById(layer.id) as any;
  if (esriLayer) {
    return esriLayer.renderer;
  }
  return false;
}

function generateWMSLegendInfo(layer: LayerProps, i: number): JSX.Element {
  return (
    <div className="layer-item" key={layer.id + `${i}`}>
      <p className="layer-title">{layer.title}</p>
      <div className="title">{layer.legendInfo.layerName}</div>
      <WMSImageWithPlaceholder alt={'wms-legend'} src={layer.legendInfo} errorMessage={'Legend graphic not found'} />
    </div>
  );
}

const LegendItems = (props: LegendItemProps): JSX.Element => {
  const { language } = props;
  const selectedProdesLayer = useSelector((store: RootState) => store.appState.leftPanel.prodesLayer);
  const integratedAlertLabel = useSelector((store: RootState) => store.appState.leftPanel.gfwLayerLabel);
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);
  const allAvailableLayers = useSelector((store: RootState) => store.mapviewState.allAvailableLayers);
  const selectedLayer: any = allAvailableLayers.find((layer: any) => layer.id === selectedProdesLayer);

  const getLayerTitle = (layer: LayerProps): any => {
    if (layer.title === 'PRODES Cerrado Biome' || layer.title === 'PRODES Amazon Biome') {
      return selectedLayer?.sublabel[selectedLanguage];
    } else if (layer.title === 'Integrated Deforestation Alerts') {
      return integratedAlertLabel;
    } else {
      return layer.title;
    }
  };

  const items = props.visibleLayers.map((layer, i) => {
    //@TODO this needs some refactoring to make it more readable!!
    if (!layer.legendInfo) {
      return <ManualLegend layer={layer} language={language} i={i} />;
    } else if (layer.legendInfo && layer.origin === 'service') {
      if (layer.type === 'wms') {
        return generateWMSLegendInfo(layer, i);
      } else {
        const labelIcons = layer.legendInfo.map((item: any, i: number) => {
          item.label = item.label && item.label.length ? item.label : layer.title;
          const subLabels = item.legend.map((subitem: any, i: number) => {
            return (
              <div key={i} className="sublayer-item-feature">
                <div>
                  <LegendLabel type={'webmap'} options={subitem} opacity={layer.opacity.combined} />
                </div>
                <span>{subitem.label}</span>
              </div>
            );
          });
          return (
            <div className="label-item-feature" key={i}>
              {layer.type === 'tiled' && <div className="title">{item.name}</div>}
              {subLabels}
            </div>
          );
        });
        return (
          <div className="layer-item" key={layer.id + `${i}`}>
            <p className="layer-title">{layer.title}</p>
            {labelIcons}
          </div>
        );
      }
    } else if (layer.legendInfo && layer.origin === 'webmap') {
      if (layer.type === 'wms') {
        return generateWMSLegendInfo(layer, i);
      } else {
        const labelIcons = layer.legendInfo?.map((item: any, i: number) => {
          item.label = item.label && item.label.length ? item.label : layer.title;
          const rendererExists = checkForRenderer(layer);
          return (
            <div className="label-item" key={i}>
              {!rendererExists ? (
                <LegendLabel type={layer.type} options={item} opacity={layer.opacity.combined} />
              ) : (
                legendInfoController.getLegendInfoFromRenderer(layer)
              )}
              <p>{item.label}</p>
            </div>
          );
        });
        return (
          <div className="layer-item" key={layer.id + `${i}`}>
            <p className="layer-title">{layer.title}</p>
            <div className="title">{layer.legendInfo.layerName}</div>
            {labelIcons}
          </div>
        );
      }
    } else if (layer.legendInfo && layer.origin === 'remote') {
      let labelIcons;
      if (layer.metadata?.legendConfig?.type === 'gradient') {
        //Gradient requires combining items into a single image, so we deal with it separately
        labelIcons = generateGradientItem(layer.metadata?.legendConfig, language);
      } else if (layer.metadata?.legendConfig?.type === 'group') {
        labelIcons = layer.metadata?.legendConfig?.items.map((item: any, i: number) => {
          let subgroupItems;
          if (item.subgroup.type === 'gradient') {
            subgroupItems = <div>{generateGradientItem(item.subgroup, language)}</div>;
          } else {
            subgroupItems = item.subgroup.items.map((subItem: any, i: number) => {
              return (
                <div key={i} className="subgroup-item">
                  <LegendLabel type={item.subgroup.type} options={subItem} opacity={layer.opacity.combined} />
                  <p>{subItem.name[language]}</p>
                </div>
              );
            });
          }
          return (
            <div className="label-item subgroup" key={i}>
              <p>{item.name[language]}</p>
              <div>{subgroupItems}</div>
            </div>
          );
        });
      } else {
        labelIcons = layer.metadata?.legendConfig?.items.map((item: any, i: number) => {
          return (
            <div className="label-item" key={i}>
              <LegendLabel type={layer.metadata?.legendConfig?.type} options={item} opacity={layer.opacity.combined} />
              <p>{item.name[language]}</p>
            </div>
          );
        });
      }

      return (
        <div className="layer-item" key={layer.id + `${i}`}>
          <p className="layer-title">{getLayerTitle(layer)}</p>
          {labelIcons}
        </div>
      );
    }
  });
  return <div className="legend-item-container">{items}</div>;
};

export default LegendItems;
