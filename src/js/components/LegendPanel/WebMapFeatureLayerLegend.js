import React from 'react';

export default class WebMapFeatureLayerLegend extends React.Component {

  constructor (props) {
    super(props);

    this.symbolTypeMap = {
      simplefillsymbol: 'fill',
      simplelinesymbol: 'line',
      picturemarkersymbol: 'image'
    };

    this.borderStyleMap = {
      dash: 'dashed',
      solid: 'solid'
    };

    this.state = { visible: this.props.visibility };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visibility !== this.props.visibility) {
      this.setState(prevState => {
        return {
          visible: !prevState.visible
        };
      });
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
    } else {
      this.createSymbolStyles(renderer.getSymbol(), container);
    }
    return (
      container
    );
  }

  createSymbolStyles = (symbol, container, idx, info) => {
    const style = {};
    let symbolDOMElement;
    const symbolType = this.symbolTypeMap[symbol.type];

    if (symbolType === 'line') {
      // give the div a height of 0, so it appears as a line
      style.height = '0';

      const border = symbol.outline;
      style.border = `1px ${this.borderStyleMap[border.style]} rgba(${border.color.r}, ${border.color.g}, ${border.color.b}, ${border.color.a}) `;

      symbolDOMElement = <div style={style} className='legend-symbol'></div>;
    }

    if (symbolType === 'fill') {

      style.backgroundColor = symbol.color === null ? 'transparent' : `rgba(${symbol.color.r}, ${symbol.color.g}, ${symbol.color.b}, ${symbol.color.a}) `;

      const border = symbol.outline;
      style.border = `1px ${this.borderStyleMap[border.style]} rgba(${border.color.r}, ${border.color.g}, ${border.color.b}, ${border.color.a}) `;

      symbolDOMElement = <div style={style} className='legend-symbol'></div>;
    }

    if (symbolType === 'image') {

      symbolDOMElement = <img style={style} className='legend-symbol' src={symbol.url} />;
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
        <div className='label-container'>{this.props.layer.arcgisProps.title}</div>
        {this.createLegendSymbol(this.props.layer.renderer)}
      </div>
    );
  }
}
