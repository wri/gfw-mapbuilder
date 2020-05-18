import * as React from 'react';
import { LayerProps } from 'js/store/mapview/types';
import {
  PointItem,
  BasicItem,
  PolyFromMapServer,
  LineItem,
  GradientItem
} from './LegendLabelComponents';
import { mapController } from 'js/controllers/mapController';

interface LegendItemProps {
  visibleLayers: LayerProps[];
  language: string;
}

type LabelTypes =
  | 'basic'
  | 'point'
  | 'line'
  | 'gradient'
  | 'group'
  | string
  | undefined;

function getLegendLabel(
  type: LabelTypes,
  options: any,
  opacity: number
): JSX.Element | null {
  const {
    color,
    size,
    outlineColor,
    thickness,
    lineType,
    label,
    imageData,
    contentType
  } = options;
  switch (type) {
    case 'basic':
    case 'choropleth':
      return (
        <BasicItem
          color={color}
          outline={outlineColor}
          height={16}
          width={16}
          opacity={opacity}
        />
      );
    case 'point':
      return (
        <PointItem color={color} height={size} width={size} opacity={opacity} />
      );
    case 'webmap':
      return (
        <PolyFromMapServer
          opacity={opacity}
          dataURI={imageData}
          title={label}
          contentType={contentType}
        />
      );
    case 'line':
      return (
        <LineItem
          color={color}
          thickness={thickness}
          lineType={lineType}
          opacity={opacity}
        />
      );
    default:
      return (
        <BasicItem
          color={'#c8a2c8'}
          outline={'#000000'}
          height={16}
          width={16}
          opacity={opacity}
        />
      );
  }
}

function generateGradientItem(
  legendConfig: any,
  language: string
): JSX.Element {
  return (
    <div className="label-item">
      <GradientItem items={legendConfig.items} language={language} />
    </div>
  );
}

function getLegendInfoFromRenderer(layer: LayerProps): any {
  const esriLayer = mapController._map?.findLayerById(layer.id) as any;
  if (!esriLayer) return;

  const borderStyleMap = {
    dash: 'dashed',
    solid: 'solid',
    none: 'none'
  };

  function createSymbolStyles(symbol: any): JSX.Element | undefined {
    const style = {} as any;
    let symbolDOMElement;
    const symbolType = symbol?.style; // "circle"|"square"|"cross"|"x"|"diamond"|"triangle"|"path"
    switch (symbolType) {
      case 'circle': {
        //BG FILL COLOR
        style.backgroundColor =
          symbol.color === null
            ? 'transparent'
            : `rgba(${symbol.color.r}, ${symbol.color.g}, ${symbol.color.b}, ${symbol.color.a}) `;
        style.width = '15px';
        style.height = '15px';
        style['borderRadius'] = '50%';

        //BORDER FILL
        const border = symbol.outline;
        if (border && border.style !== 'none') {
          style.border = `1px ${borderStyleMap[border.style]} rgba(${
            border.color.r
          }, ${border.color.g}, ${border.color.b}, ${border.color.a}) `;
        }

        symbolDOMElement = (
          <div
            style={style}
            className={`legend-symbol ${
              symbolType === 'circle' ? 'circle' : ''
            }`}
          ></div>
        );
        break;
      }
      case 'solid':
      case 'fill': {
        //BG FILL COLOR
        style.backgroundColor =
          symbol.color === null
            ? 'transparent'
            : `rgba(${symbol.color.r}, ${symbol.color.g}, ${symbol.color.b}, ${symbol.color.a}) `;
        style.width = '15px';
        style.height = '15px';
        const border = symbol.outline;
        if (border && border.style !== 'none') {
          style.border = `1px ${borderStyleMap[border.style]} rgba(${
            border.color.r
          }, ${border.color.g}, ${border.color.b}, ${border.color.a}) `;
        }
        symbolDOMElement = (
          <div
            style={style}
            className={`legend-symbol ${
              symbolType === 'circle' ? 'circle' : ''
            }`}
          ></div>
        );
        break;
      }
      case 'line': {
        style.height = '0'; // give the div a height of 0, so it appears as a line

        const border = symbol.outline || null;

        if (border && border.style !== 'none') {
          // if it has a border, use the border color
          style.borderTop = `${(border.width || 1) * 1.5}px ${
            borderStyleMap[border.style]
          } rgba(${border.color.r}, ${border.color.g}, ${border.color.b}, ${
            border.color.a
          })`;
        }

        if (!border) {
          // if it doesn't have a border, it's just a line so use the symbol color
          style.borderTop = `${(symbol.width || 1) * 1.5}px ${
            borderStyleMap[symbol.style]
          } rgba(${symbol.color.r}, ${symbol.color.g}, ${symbol.color.b}, ${
            symbol.color.a
          })`;
        }

        symbolDOMElement = <div style={style} className="legend-symbol"></div>;
        break;
      }
      case 'image':
        symbolDOMElement = (
          <img style={style} className="legend-symbol" src={symbol.url} />
        );
        break;
    }
    return symbolDOMElement;
  }

  function createLegendSymbol(esriLayer: any): any {
    if (!esriLayer.renderer) return;
    const container: any[] = [];
    if (esriLayer.renderer.symbol) {
      const defaultSymbol = esriLayer.renderer.symbol;
      const symbolDOMElement = createSymbolStyles(defaultSymbol);
      container.push(symbolDOMElement);
    } else if (esriLayer.renderer.uniqueValueInfos?.length) {
      esriLayer.renderer.uniqueValueInfos.forEach((value: any) => {
        const defaultSymbol = value.symbol;
        const symbolDOMElement = createSymbolStyles(defaultSymbol);
        container.push(
          <div className="sublayer-item-feature">
            <div>{symbolDOMElement}</div>
            <span>{value.label}</span>
          </div>
        );
      });
    }

    return container;
  }

  const legendSymbols = createLegendSymbol(esriLayer);
  return legendSymbols;
}

const LegendItems = (props: LegendItemProps): JSX.Element => {
  const { language } = props;
  const items = props.visibleLayers.map((layer, i) => {
    if (!layer.legendInfo) {
      //No legend Info available, that usually means that we are dealing with FeatureServer layers and need to attempt to create legend symbols manually
      const legendInfo = getLegendInfoFromRenderer(layer);
      let versionedLabel = '';
      if (layer.versions) {
        const idx = layer?.versionIndex || 0;
        versionedLabel = layer.versions[idx].label[language];
      }
      const label = (
        <div className="label-item-feature">
          {legendInfo}
          {versionedLabel !== '' && versionedLabel}
        </div>
      );
      return (
        <div className="layer-item" key={layer.id + i}>
          <p className="layer-title">{layer.title}</p>
          {label}
        </div>
      );
    } else if (layer.legendInfo && layer.origin === 'webmap') {
      const labelIcons = layer.legendInfo?.map((item: any, i: number) => {
        console.log(item);
        item.label = item.label && item.label.length ? item.label : layer.title;
        return (
          <div className="label-item" key={i}>
            {getLegendLabel(layer.type, item, layer.opacity)}
            <p>{item.label}</p>
          </div>
        );
      });
      return (
        <div className="layer-item" key={layer.id + i}>
          <p className="layer-title">{layer.title}</p>
          {labelIcons}
        </div>
      );
    } else if (layer.legendInfo && layer.origin === 'remote') {
      const title = layer.metadata?.legendConfig?.name[language];
      let labelIcons;
      if (layer.metadata?.legendConfig?.type === 'gradient') {
        //Gradient requires combining items into a single image, so we deal with it separately
        labelIcons = generateGradientItem(
          layer.metadata?.legendConfig,
          language
        );
      } else if (layer.metadata?.legendConfig?.type === 'group') {
        labelIcons = layer.metadata?.legendConfig?.items.map(
          (item: any, i: number) => {
            let subgroupItems;
            if (item.subgroup.type === 'gradient') {
              subgroupItems = (
                <div>{generateGradientItem(item.subgroup, language)}</div>
              );
            } else {
              subgroupItems = item.subgroup.items.map(
                (subItem: any, i: number) => {
                  return (
                    <div key={i} className="subgroup-item">
                      {getLegendLabel(
                        item.subgroup.type,
                        subItem,
                        layer.opacity
                      )}
                      <p>{subItem.name[language]}</p>
                    </div>
                  );
                }
              );
            }
            return (
              <div className="label-item subgroup" key={i}>
                <p>{item.name[language]}</p>
                <div>{subgroupItems}</div>
              </div>
            );
          }
        );
      } else {
        labelIcons = layer.metadata?.legendConfig?.items.map(
          (item: any, i: number) => {
            return (
              <div className="label-item" key={i}>
                {getLegendLabel(
                  layer.metadata?.legendConfig?.type,
                  item,
                  layer.opacity
                )}
                <p>{item.name[language]}</p>
              </div>
            );
          }
        );
      }
      return (
        <div className="layer-item" key={layer.id}>
          <p className="layer-title">{title ? title : layer.title}</p>
          {labelIcons}
        </div>
      );
    }
  });
  return <div className="legend-item-container">{items}</div>;
};

export default LegendItems;
