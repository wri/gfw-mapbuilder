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
      // note: as configured, "basic" is essentially the same as "choropleth"
      case 'basic':
        return items.map((item, i) => {
          const { name, color, outlineColor } = item;
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

      case 'point':
        return items.map((item, i) => {
          const { name, color, outlineColor, size } = item;
          return (
            <div className='legend-row' key={`webmap-legend-row-${name[language]}-${i}`}>
              <div className='legend-icon centered'>
                <div style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
                  borderColor: outlineColor,
                  opacity: this.state.opacity,
                  marginTop: `-${size / 2 - 2}px`
                }} className='legend-point'></div>
              </div>
              <div className='legend-label'>{name[language]}</div>
            </div>
          );
        });

      case 'line':
        return items.map((item, i) => {
          const { name, color, lineType, width } = item;
          return (
            <div className='legend-row' key={`webmap-legend-row-${name[language]}-${i}`}>
              <div className='legend-icon line'>
                <div style={{
                  borderColor: color,
                  borderStyle: lineType,
                  marginTop: `-${width}px`,
                  opacity: this.state.opacity,
                  borderWidth: `${width / 2}px`
                }} className='legend-line'></div>
              </div>
              <div className='legend-label'>{name[language]}</div>
            </div>
          );
        });

      case 'choropleth':
        return (
          items.map((item, i) => {
            const { name, color, outlineColor } = item;
            console.log(outlineColor);
              return (
                <div className='legend-row' key={`webmap-legend-row-${name[language]}-${i}`}>
                  <div style={{
                    backgroundColor: color,
                    opacity: this.state.opacity,
                    border: `1px solid ${outlineColor}`
                  }} className='legend-icon'></div>
                  <div className='legend-label'>{name[language]}</div>
                </div>
              );
            }
          )
        );

      case 'gradient':
        const background = `linear-gradient(180deg,${items.map(item => item.color)}`;
        return (
          <div>
            <div className='gradient-legend' style={{height: `${18 * items.length}px`, background}}></div>
              {items.map((item, i) => {
                const name = item.name;
                return (
                  <div className='legend-row' key={`webmap-legend-row-${name[language]}-${i}`}>
                    <div className='legend-label'>{name[language]}</div>
                  </div>
                );
              })}
            </div>
          );
    }
  }

  render () {
    const visible = this.state.visible;
    const { label, metadata, language } = this.props;
    const { name, type, items } = metadata.legendConfig;

    if (type === 'group') {
      return (
        <div>
          {items.map((category, i) => {
            const { name: categoryName, subgroup } = category;
            return (
              <div className={`parent-legend-container ${visible && 'hidden'}`} ref='myRef' key={`webmap-legend-${i}`}>
                <div className='label-container'>
                  <strong>{categoryName[language]}</strong>
                </div>
                <div className='legend-container'>
                  {subgroup.items.length &&
                    <div className='crowdsource-legend'>
                      {this.generateLegends(subgroup.items, subgroup.type, language)}
                    </div>}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    else {
      return (
        <div className={`parent-legend-container ${visible && 'hidden'}`} ref='myRef' key={`webmap-legend-${name[language]}`}>
          <div className='label-container'>
            <strong>{name[language]}</strong>
          </div>
          <div className='legend-container'>
            {items.length &&
              <div className='crowdsource-legend'>
                {this.generateLegends(items, type, language)}
              </div>}
          </div>
        </div>
      );
    }
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
