import React from 'react';

const borderStyleMap = {
  dash: 'dashed',
  solid: 'solid',
  none: 'none',
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
        style.border = `1px ${borderStyleMap[border.style]} rgba(${border.color.r}, ${border.color.g}, ${
          border.color.b
        }, ${border.color.a}) `;
      }

      symbolDOMElement = (
        <div style={style} className={`legend-symbol ${symbolType === 'circle' ? 'circle' : ''}`}></div>
      );
      break;
    }
    case 'simple-marker': {
      style.color = `rgba(${symbol.color.r}, ${symbol.color.g}, ${symbol.color.b}, ${symbol.color.a}) `;
      style.outline = symbol.outline;
      style.width = '15px';
      style.height = '15px';
      symbolDOMElement = (
        <div style={style} className={`legend-symbol ${symbolType === 'circle' ? 'circle' : ''}`}></div>
      );
      break;
    }
    case 'solid':
    case 'simple-fill': {
      //BG FILL COLOR
      style.backgroundColor =
        symbol.color === null
          ? 'transparent'
          : `rgba(${symbol.color.r}, ${symbol.color.g}, ${symbol.color.b}, ${symbol.color.a}) `;
      style.width = '15px';
      style.height = '15px';
      const border = symbol.outline;
      if (border && border.style !== 'none') {
        style.border = `1px ${borderStyleMap[border.style]} rgba(${border.color.r}, ${border.color.g}, ${
          border.color.b
        }, ${border.color.a}) `;
      }
      symbolDOMElement = (
        <div style={style} className={`legend-symbol ${symbolType === 'circle' ? 'circle' : ''}`}></div>
      );
      break;
    }
    case 'line': {
      style.height = '0'; // give the div a height of 0, so it appears as a line

      const border = symbol.outline || null;

      if (border && border.style !== 'none') {
        // if it has a border, use the border color
        style.borderTop = `${(border.width || 1) * 1.5}px ${borderStyleMap[border.style]} rgba(${border.color.r}, ${
          border.color.g
        }, ${border.color.b}, ${border.color.a})`;
      }

      if (!border) {
        // if it doesn't have a border, it's just a line so use the symbol color
        style.borderTop = `${(symbol.width || 1) * 1.5}px ${borderStyleMap[symbol.style]} rgba(${symbol.color.r}, ${
          symbol.color.g
        }, ${symbol.color.b}, ${symbol.color.a})`;
      }

      symbolDOMElement = <div style={style} className="legend-symbol"></div>;
      break;
    }
    case 'image':
      symbolDOMElement = <img style={style} className="legend-symbol" alt="legend symbol" src={symbol.url} />;
      break;
  }
  if (symbol.type === 'picture-marker') {
    style.width = '12px';
    style.height = '12px';
    symbolDOMElement = <img style={style} className="legend-symbol" alt="legend symbol" src={symbol.url} />;
  }
  return symbolDOMElement;
}

export function generateLegendInfo(layer: any) {
  const container: any = [];
  if (layer?.renderer?.symbol) {
    const defaultSymbol = layer.renderer.symbol;
    const symbolDOMElement = createSymbolStyles(defaultSymbol);
    container.push(
      <div className="sublayer-item-feature">
        <div>{symbolDOMElement}</div>
        <span>{layer.title}</span>
      </div>
    );
  } else if (layer?.renderer?.visualVariables?.length && layer?.renderer?.type !== 'unique-value') {
    const visualStops = layer.renderer.visualVariables;
    if (visualStops && visualStops.length) {
      interface GradientItem {
        colors: string[];
        labels: string[];
      }
      const gradientElement: GradientItem = {
        colors: [],
        labels: [],
      };
      visualStops.forEach((item) => {
        if (item?.stops && item.stops.length) {
          if (item.type === 'size') {
            // push elements to size
          } else if (item.type === 'opacity') {
            // push elements to opacity
          } else if (item.type === 'color') {
            // push elements for color
            item.stops.forEach((stop) => {
              const { r, g, b, a } = stop.color;
              gradientElement.colors.push(`rgba(${r},${g},${b},${a})`);
              gradientElement.labels.push(stop.label);
            });
          }
        }
      });

      if (gradientElement.colors.length) {
        const gradientString = `linear-gradient(180deg, ${gradientElement.colors.join(',')})`;
        container.push(
          <div className="sublayer-item-feature gradient">
            <div className="gradient-icon" style={{ background: gradientString }}></div>
            <div style={{ fontSize: '0.7rem' }}>
              {gradientElement.labels.map((l, i) => (
                <p key={i} style={{ margin: 0, padding: 0 }}>
                  {l}
                </p>
              ))}
            </div>
            <span className="gradient-label">{visualStops?.field}</span>
          </div>
        );
      }
    }
  } else if (layer?.renderer?.type === 'class-breaks') {
    layer.renderer.classBreakInfos.forEach((value: any) => {
      const defaultSymbol = value.symbol;
      const symbolDOMElement = createSymbolStyles(defaultSymbol);
      container.push(
        <div className="sublayer-item-feature">
          <div>{symbolDOMElement}</div>
          <span>{value.label}</span>
        </div>
      );
    });
  } else if (layer?.renderer?.type === 'unique-value') {
    layer.renderer.uniqueValueInfos.forEach((value: any) => {
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
