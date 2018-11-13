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
                  opacity: this.state.opacity,
                  border: `1px solid ${outlineColor}`
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
                  opacity: this.state.opacity
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
                  borderColor: color,
                  borderStyle: lineType,
                  opacity: this.state.opacity,
                  marginTop: `-${thickness}px`,
                  borderWidth: `${thickness / 2}px`
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
    const { metadata, language } = this.props;
    const { type, items } = metadata.legendConfig;


    metadata.legendConfig = {
      name: {
        en: 'Choropleth Legend',
        fr: 'Choropleth Legend',
        es: 'Choropleth Legend',
        pt: 'Choropleth Legend',
        id: 'Choropleth Legend',
        zh: 'Choropleth Legend',
        ka: 'Choropleth Legend'
      },
      type: 'choropleth',
      items: [{
        color: '#ffffb2',
        outlineColor: "#000000",
        name: {
          en: 'Step 1',
          fr: 'Step 1',
          es: 'Step 1',
          pt: 'Step 1',
          id: 'Step 1',
          zh: 'Step 1',
          ka: 'Step 1'
        }
        }, {
        color: '#fecc5c',
        outlineColor: "#000000",
        name: {
          en: 'Step 2',
          fr: 'Step 2',
          es: 'Step 2',
          pt: 'Step 2',
          id: 'Step 2',
          zh: 'Step 2',
          ka: 'Step 2'
        }
        }, {
        color: '#fd8d3c',
        outlineColor: "#000000",
        name: {
          en: 'Step 3',
          fr: 'Step 3',
          es: 'Step 3',
          pt: 'Step 3',
          id: 'Step 3',
          zh: 'Step 3',
          ka: 'Step 3'
        }
        }, {
        color: '#f03b20',
        outlineColor: "#000000",
        name: {
          en: 'Step 4',
          fr: 'Step 4',
          es: 'Step 4',
          pt: 'Step 4',
          id: 'Step 4',
          zh: 'Step 4',
          ka: 'Step 4'
        }
        }, {
        color: '#bd0026',
        outlineColor: "#000000",
        name: {
          en: 'Step 5',
          fr: 'Step 5',
          es: 'Step 5',
          pt: 'Step 5',
          id: 'Step 5',
          zh: 'Step 5',
          ka: 'Step 5'
        }
      }
    ],
    };

    metadata.legendConfig = {
      name: {
        en: 'Gradient Legend',
        fr: 'Gradient Legend',
        es: 'Gradient Legend',
        pt: 'Gradient Legend',
        id: 'Gradient Legend',
        zh: 'Gradient Legend',
        ka: 'Gradient Legend'
      },
      type: 'gradient',
      outlineColor: '#555555',
      items: [{
        color: '#ffffb2',
        outlineColor: "#000000",
        name: {
          en: 'Step 1',
          fr: 'Step 1',
          es: 'Step 1',
          pt: 'Step 1',
          id: 'Step 1',
          zh: 'Step 1',
          ka: 'Step 1'
        }
        }, {
        color: '#fecc5c',
        outlineColor: "#000000",
        name: {
          en: 'Step 2',
          fr: 'Step 2',
          es: 'Step 2',
          pt: 'Step 2',
          id: 'Step 2',
          zh: 'Step 2',
          ka: 'Step 2'
        }
        }, {
        color: '#fd8d3c',
        outlineColor: "#000000",
        name: {
          en: 'Step 3',
          fr: 'Step 3',
          es: 'Step 3',
          pt: 'Step 3',
          id: 'Step 3',
          zh: 'Step 3',
          ka: 'Step 3'
        }
        }, {
        color: '#f03b20',
        outlineColor: "#000000",
        name: {
          en: 'Step 4',
          fr: 'Step 4',
          es: 'Step 4',
          pt: 'Step 4',
          id: 'Step 4',
          zh: 'Step 4',
          ka: 'Step 4'
        }
        }, {
        color: '#bd0026',
        outlineColor: "#000000",
        name: {
          en: 'Step 5',
          fr: 'Step 5',
          es: 'Step 5',
          pt: 'Step 5',
          id: 'Step 5',
          zh: 'Step 5',
          ka: 'Step 5'
        }
      }
    ],
    };
     metadata.legendConfig = {
      type: 'group',
      name: {
        en: 'Group Legend',
        fr: 'Group Legend',
        es: 'Group Legend',
        pt: 'Group Legend',
        id: 'Group Legend',
        zh: 'Group Legend',
        ka: 'Group Legend'
      },
      items: [{
        name: {
          en: 'Cereals',
          fr: 'Cereals',
          es: 'Cereals',
          pt: 'Cereals',
          id: 'Cereals',
          zh: 'Cereals',
          ka: 'Cereals'
        },
        subgroup: {
          type: 'choropleth',
          items: [{
            name: {
              en: 'Barley',
              fr: 'Barley',
              es: 'Barley',
              pt: 'Barley',
              id: 'Barley',
              zh: 'Barley',
              ka: 'Barley'
            },
            color: '#009900',
            outlineColor: '#555555'
          }, {
            name: {
              en: 'Wheat',
              fr: 'Wheat',
              es: 'Wheat',
              pt: 'Wheat',
              id: 'Wheat',
              zh: 'Wheat',
              ka: 'Wheat'
            },
            color: '#99ff99',
            outlineColor: '#555555'
          },
      ]}}, {
      name: {
        en: 'Pulses and legumes',
        fr: 'Pulses and legumes',
        es: 'Pulses and legumes',
        pt: 'Pulses and legumes',
        id: 'Pulses and legumes',
        zh: 'Pulses and legumes',
        ka: 'Pulses and legumes'
      },
      subgroup: {
        type: 'gradient',
        items: [{
          color: '#ffffb2',
          outlineColor: "#000000",
          name: {
            en: 'Step 1',
            fr: 'Step 1',
            es: 'Step 1',
            pt: 'Step 1',
            id: 'Step 1',
            zh: 'Step 1',
            ka: 'Step 1'
          }
          }, {
          color: '#fecc5c',
          outlineColor: "#000000",
          name: {
            en: 'Step 2',
            fr: 'Step 2',
            es: 'Step 2',
            pt: 'Step 2',
            id: 'Step 2',
            zh: 'Step 2',
            ka: 'Step 2'
          }
          }, {
          color: '#fd8d3c',
          outlineColor: "#000000",
          name: {
            en: 'Step 3',
            fr: 'Step 3',
            es: 'Step 3',
            pt: 'Step 3',
            id: 'Step 3',
            zh: 'Step 3',
            ka: 'Step 3'
          }
          }, {
          color: '#f03b20',
          outlineColor: "#000000",
          name: {
            en: 'Step 4',
            fr: 'Step 4',
            es: 'Step 4',
            pt: 'Step 4',
            id: 'Step 4',
            zh: 'Step 4',
            ka: 'Step 4'
          }
          }, {
          color: '#bd0026',
          outlineColor: "#000000",
          name: {
            en: 'Step 5',
            fr: 'Step 5',
            es: 'Step 5',
            pt: 'Step 5',
            id: 'Step 5',
            zh: 'Step 5',
            ka: 'Step 5'
          }
        }
        ]
      }
    }]
  };

  const name = metadata.legendConfig.name[language];

  //  metadata.legendConfig = {
  //   "type": "line",
  //   "name": {
  //     en: 'Line Legend',
  //     fr: 'Line Legend',
  //     es: 'Line Legend',
  //     pt: 'Line Legend',
  //     id: 'Line Legend',
  //     zh: 'Line Legend',
  //     ka: 'Line Legend'
  //   },
  //   "items": [{
  //     "name": {
  //       en: 'Line 1',
  //       fr: 'Line 1',
  //       es: 'Line 1',
  //       pt: 'Line 1',
  //       id: 'Line 1',
  //       zh: 'Line 1',
  //       ka: 'Line 1'
  //     },
  //     "color": "#6A1ED2",
  //     "thickness": "1",
  //     "lineType": "solid"
  //     }, {
  //     "name": {
  //       en: 'Line 2',
  //       fr: 'Line 2',
  //       es: 'Line 2',
  //       pt: 'Line 2',
  //       id: 'Line 2',
  //       zh: 'Line 2',
  //       ka: 'Line 2'
  //     },
  //     "color": "#DC14DC",
  //     "thickness": "2",
  //     "lineType": "dashed"
  //    }]
  //   };
  //    metadata.legendConfig = {
  //     "type": "point",
  //     "name": {
  //       en: 'Point Legend',
  //       fr: 'Point Legend',
  //       es: 'Point Legend',
  //       pt: 'Point Legend',
  //       id: 'Point Legend',
  //       zh: 'Point Legend',
  //       ka: 'Point Legend'
  //     },
  //     "items": [{
  //       "name": {
  //         en: 'Point 1',
  //         fr: 'Point 1',
  //         es: 'Point 1',
  //         pt: 'Point 1',
  //         id: 'Point 1',
  //         zh: 'Point 1',
  //         ka: 'Point 1'
  //       },
  //       "color": "#ff0000",
  //       "outlineColor": "#000000",
  //       "size": 12,
  //       }, {
  //       "name": {
  //         en: 'Point 2',
  //         fr: 'Point 2',
  //         es: 'Point 2',
  //         pt: 'Point 2',
  //         id: 'Point 2',
  //         zh: 'Point 2',
  //         ka: 'Point 2'
  //       },
  //       "color": "#ffff00",
  //       "outlineColor": "#000000",
  //       "size": 7
  //      }]
  //     };

    if (type === 'group') {
      return (
        <div className={`parent-legend-container api-legend ${visible && 'hidden'}`} ref='myRef' key={`webmap-legend-${name}`}>
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
                    <div className='legend'>
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
        <div className={`parent-legend-container api-legend ${visible && 'hidden'}`} ref='myRef' key={`webmap-legend-${name}`}>
          <div className='label-container'>
            <strong>{name}</strong>
          </div>
          <div className='legend-container'>
            {items.length &&
              <div className='api-legend'>
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
