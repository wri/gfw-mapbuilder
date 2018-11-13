import React, { Component } from 'react';

export default class ApiLegend extends Component {

  constructor (props) {
    super(props);
    this.state = {
      visible: props.visibility,
      opacity: props.defaultOpacity
    };

    this.generateLegends = this.generateLegends.bind(this);
  }


  generateLegends(items, type, language) {
    switch(type) {
      case 'choropleth':
        return items.map((item, i) => {
          const { name, color, outlineColor } = item;
          console.log(outlineColor);
            return (
              <div className='legend-row' key={`webmap-legend-row-${name[language]}-${i}`}>
                <div style={{
                  backgroundColor: color,
                  border: `1px solid ${outlineColor}`,
                  opacity: this.state.opacity
                }} className='legend-icon'></div>
                <div className='legend-label'>{name[language]}</div>
              </div>
            );
          }
        );

    }
  }

  render () {
    const visible = this.state.visible;
    const { label, metadata, language } = this.props;
    const { name, type, items } = metadata.legendConfig;

    return (
      <div className={`parent-legend-container ${visible && 'hidden'}`} ref='myRef' key={`webmap-legend-${name[language]}`}>
        <div className='label-container'>
          <strong>{name[language]}</strong>
        </div>
        <div className='legend-container'>
          {items.length &&
            <div className='crowdsource-legend'>
              {this.apiItemMapper(items, type, language)}
            </div>}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.initialLayerOpacities.forEach(opacity => {
      if (opacity.layerId === this.props.layerId) {
        this.setState({ opacity: opacity.value });
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visibility !== this.props.visibility) {
      this.setState(prevState => {
        return {
          visible: !prevState.visible
        };
      });
    }

    if (this.props.legendOpacity.layerId === this.props.layerId && this.props.legendOpacity.value !== prevProps.legendOpacity.value) {
      this.setState({ opacity: this.props.legendOpacity.value });
    }
  }
}
