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
    console.log(items, type, language);
    switch(type) {
      case 'basic':
        return items.map((item, i) => {
          const { name, color, outlineColor, icon } = item;
          return (
              <div className='legend-row' key={`webmap-legend-row-${name[language]}-${i}`}>
                {icon
                  ? (
                    <div style={{
                      backgroundImage: `url(data:image/png;base64,${icon})`,
                      backgroundSize: 'cover',
                      opacity: this.state.opacity,
                      border: outlineColor ? `1px solid ${outlineColor}` : 'none',
                      height: outlineColor ? '16px' : '18px',
                      width: outlineColor ? '16px' : '18px'
                    }} className='legend-icon'></div>
                  )
                  : (
                    <div style={{
                      backgroundColor: color,
                      opacity: this.state.opacity,
                      border: outlineColor ? `1px solid ${outlineColor}` : `1px solid ${color}`
                    }} className='legend-icon'></div>
                  )}
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
                  opacity: this.state.opacity,
                  border: outlineColor ? `1px solid ${outlineColor}` : `1px solid ${color}`
                }} className='legend-point'></div>
              </div>
              <div className='legend-label'>{name[language]}</div>
            </div>
          );
        });

      case 'line':
        return items.map((item, i) => {
          const { name, color, lineType, thickness } = item;
          return (
            <div className='legend-row' key={`webmap-legend-row-${name[language]}-${i}`}>
              <div className='legend-icon centered'>
                <div style={{
                  opacity: this.state.opacity,
                  marginTop: `-${thickness}px`,
                  border: color ? `${thickness / 2}px ${lineType} ${color}` : `${thickness / 2}px ${lineType} ${color}`
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
              return (
                <div className='legend-row' key={`webmap-legend-row-${name[language]}-${i}`}>
                  <div style={{
                    backgroundColor: color,
                    opacity: this.state.opacity,
                    border: outlineColor ? `1px solid ${outlineColor}` : `1px solid ${color}`
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
          <div className='gradient-legend'>
            <div className='gradient' style={{height: `${18 * items.length}px`, background}}></div>
              <div className='legend-labels'>
                {items.map((item, i) => {
                  const name = item.name;
                  return (
                    <div className='legend-row' key={`webmap-legend-row-${name[language]}-${i}`}>
                      <div className='legend-label'>{name[language]}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
    }
  }

  render () {
    const visible = this.state.visible;
    const { metadata, language } = this.props;
    const { type, items } = metadata.legendConfig;
    console.log(metadata.legendConfig)
    const name = metadata.legendConfig.name[language];
    if (type === 'group') {
      return (
        <div className={`parent-legend-container api-legend ${!visible ? 'hidden' : ''}`} ref='myRef' key={`webmap-legend-${name}`}>
          <div className='group-label-container'>
            <strong>{name}</strong>
          </div>
          {items.map((category, i) => {
            const { name: categoryName, subgroup } = category;
            return (
              <div className='subgroup' key={`legend-group-${name}-${i}`}>
                <div className='label-container'>
                  <strong>{categoryName[language]}</strong>
                </div>
                <div className='legend-container'>
                  {subgroup.items.length &&
                    <div>
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
        <div className={`parent-legend-container api-legend ${!visible ? 'hidden' : ''}`} ref='myRef' key={`webmap-legend-${name}`}>
          <div className='label-container'>
            <strong>{name}</strong>
          </div>
          <div className='legend-container'>
            {items.length &&
              <div>
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
