import React from 'react';

export default class WebMapFeatureLayerLegend extends React.Component {

  constructor (props) {
    super(props);

    this.symbolTypeMap = {
      simplefillsymbol: 'fill',
      simplelinesymbol: 'line',
      picturemarkersymbol: 'image',
      simplemarkersymbol: 'circle'
    };

    this.borderStyleMap = {
      dash: 'dashed',
      solid: 'solid',
      none: 'none'
    };
    this.state = { visible: props.visibility, opacity: props.defaultOpacity || 1 };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visibility !== this.props.visibility) {
      this.setState(prevState => {
        return {
          visible: !prevState.visible
        };
      });
    }

    if (this.props.legendOpacity.layerId === this.props.layer.id && this.props.legendOpacity.value !== prevProps.legendOpacity.value) {
      this.setState({ opacity: this.props.legendOpacity.value });
    }
  }

  createLegendSymbol = (renderer) => {
    const container = [];
    const infos = renderer.infos;

    if (infos && infos.length > 0) {
      infos.forEach((info, idx) => {
        const symbol = info.symbol;
          this.createSymbolStyles(symbol, container, idx, info);
      });
      return container;
    }

    this.createSymbolStyles(renderer.getSymbol(), container);
    return container;
  }

  createSymbolStyles = (symbol, container, idx, info) => {
    const style = {};
    style.opacity = this.state.opacity;

    let symbolDOMElement;
    const symbolType = this.symbolTypeMap[symbol.type];
    switch (symbolType) {
      case 'line': {
        style.height = '0'; // give the div a height of 0, so it appears as a line

        const border = symbol.outline || null;

        if (border && border.style !== 'none') { // if it has a border, use the border color
          style.borderTop = `${(border.width || 1) * 1.5}px ${this.borderStyleMap[border.style]} rgba(${border.color.r}, ${border.color.g}, ${border.color.b}, ${border.color.a})`;
        }

        if (!border) { // if it doesn't have a border, it's just a line so use the symbol color
          style.borderTop = `${(symbol.width || 1) * 1.5}px ${this.borderStyleMap[symbol.style]} rgba(${symbol.color.r}, ${symbol.color.g}, ${symbol.color.b}, ${symbol.color.a})`;
        }

        symbolDOMElement = <div style={style} className='legend-symbol'></div>;
        break;
      }

      case 'fill':
      case 'circle':
        style.backgroundColor = symbol.color === null ? 'transparent' : `rgba(${symbol.color.r}, ${symbol.color.g}, ${symbol.color.b}, ${symbol.color.a})`;

        const border = symbol.outline;

        if (border.style !== 'none') {
          style.border = `1px ${this.borderStyleMap[border.style]} rgba(${border.color.r}, ${border.color.g}, ${border.color.b}, ${border.color.a})`;
        }

        symbolDOMElement = <div style={style} className={`legend-symbol ${symbolType === 'circle' ? 'circle' : ''}`}></div>;
        break;

      case 'image':
        symbolDOMElement = <img style={style} className='legend-symbol image' src={symbol.url} />;
        break;

      default:
        break;
    }


    container.push(
      <div key={idx ? idx : null} className='legend-container'>
        {symbolDOMElement}
        <div>{info ? info.label : ''}</div>
      </div>
    );
  }

  render () {
    return (
      <div className={`parent-legend-container ${this.state.visible ? '' : 'hidden'}`} ref="myRef">
        <div className='label-container'><strong>{this.props.layer.arcgisProps.title}</strong></div>
        {this.createLegendSymbol(this.props.layer.renderer)}
      </div>
    );
  }
}
