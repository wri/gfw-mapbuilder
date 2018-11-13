import Request from 'utils/request';
import React from 'react';

export default class WebMapLegend extends React.Component {

  constructor (props) {
    super(props);
    this.state = { legendInfos: [], visible: props.visibility, opacity: props.defaultOpacity };

    this.apiItemMapper = this.apiItemMapper.bind(this);
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

  componentDidMount() {
    const layerID = typeof this.props.layerSubIndex !== 'undefined' ? [this.props.layerSubIndex] : this.props.layerId;
    const url = this.props.url.replace(/\d+$/, '');
    Request.getLegendInfos(url, layerID).then(legendInfos => {
      if(this.refs.myRef) {
        this.setState({ legendInfos: legendInfos });
      }
    });

    this.props.initialLayerOpacities.forEach(opacity => {
      if (opacity.layerId === this.props.layerId) {
        this.setState({ opacity: opacity.value });
      }
    });

  }

  apiItemMapper(items, type, language) {
    switch(type) {
      case 'choropleth':
        return items.map((item, i) => {
            return (
              <div className='legend-row' key={`webmap-legend-row-${item.name[language]}-${i}`}>
                <div style={{backgroundColor: item.color, opacity: this.state.opacity}} className='legend-icon'></div>
                <div className='legend-label'>{item.name[language]}</div>
              </div>
            );
          }
        );

      case 'gradient':
        const background = `linear-gradient(180deg,${items.map(item => item.color)}`;
        return (
          <div>
            <div className='gradient-legend' style={{height: `${18 * items.length}px`, background}}></div>
            {items.map((item, i) => {
              return (
                <div className='legend-row' key={`webmap-legend-row-${item.name[language]}-${i}`}>
                  <div className='legend-label'>{item.name[language]}</div>
                </div>
              );
            })}
          </div>
        );
    }
  }

  itemMapper = (item, idx) => {
    return (
      <div className='legend-row' key={String(item.url) + idx}>
        <img style={{'opacity': this.state.opacity}} className='legend-icon' title={item.label} src={`data:image/png;base64,${item.imageData}`} />
        <div className='legend-label'>{item.label}</div>
      </div>
    );
  }

  render () {
    const { visible, legendInfos } = this.state;
    const { labels: label, metadata, language } = this.props;
    metadata.legendConfig = {
      dataMaxZoom: 12, //control zoom level
      threshold: 30, // optional - loss specific tag to show TCD threshold
      color: '#dc6c9a',
      name: 'Tree cover loss',
      source: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)', // optional
      notes: [                                                                                                             // optional
        'Displaying loss with {thresh} canopy density.',
        'Tree cover loss is not always deforestation.'
      ],
      type: 'gradient',
      items: [{
        color: '#ffffb2',
        name: {
          en: '<300',
          fr: '<300',
          es: '<300',
          pt: '<300',
          id: '<300',
          zh: '<300',
          ka: '<300'
        }
        }, {
        color: '#fecc5c',
        name: {
          en: '<325',
          fr: '<325',
          es: '<325',
          pt: '<325',
          id: '<325',
          zh: '<325',
          ka: '<325'
        }
        }, {
        color: '#fd8d3c',
        name: {
          en: '<350',
          fr: '<350',
          es: '<350',
          pt: '<350',
          id: '<350',
          zh: '<350',
          ka: '<350'
        }
        }, {
        color: '#f03b20',
        name: {
          en: '<375',
          fr: '<375',
          es: '<375',
          pt: '<375',
          id: '<375',
          zh: '<375',
          ka: '<375'
        }
        }, {
        color: '#bd0026',
        name: {
          en: '<505',
          fr: '<505',
          es: '<505',
          pt: '<505',
          id: '<505',
          zh: '<505',
          ka: '<505'
        }
      }
    ],
    };

  //   metadata.legendConfig = {
  //     type: 'group',
  //     items: [{
  //       name: {
  //         en: 'Cereals',
  //         fr: 'Cereals',
  //         es: 'Cereals',
  //         pt: 'Cereals',
  //         id: 'Cereals',
  //         zh: 'Cereals',
  //         ka: 'Cereals'
  //       },
  //       subgroup: {
  //         type: 'choropleth',
  //         items: [{
  //           name: {
  //             en: 'Barley',
  //             fr: 'Barley',
  //             es: 'Barley',
  //             pt: 'Barley',
  //             id: 'Barley',
  //             zh: 'Barley',
  //             ka: 'Barley'
  //           },
  //           color: '#531332'
  //         }, {
  //           name: {
  //             en: 'Wheat',
  //             fr: 'Wheat',
  //             es: 'Wheat',
  //             pt: 'Wheat',
  //             id: 'Wheat',
  //             zh: 'Wheat',
  //             ka: 'Wheat'
  //           },
  //           color: '#c3ff00'
  //         },
  //     ]}}, {
  //     name: {
  //       en: 'Pulses and legumes',
  //       fr: 'Pulses and legumes',
  //       es: 'Pulses and legumes',
  //       pt: 'Pulses and legumes',
  //       id: 'Pulses and legumes',
  //       zh: 'Pulses and legumes',
  //       ka: 'Pulses and legumes'
  //     },
  //     subgroup: {
  //       type: 'choropleth',
  //       items: [{
  //         name: {
  //           en: 'Soybeans',
  //           fr: 'Soybeans',
  //           es: 'Soybeans',
  //           pt: 'Soybeans',
  //           id: 'Soybeans',
  //           zh: 'Soybeans',
  //           ka: 'Soybeans'
  //         },
  //         color: '#42f4f4'
  //         }, {
  //           name: {
  //             en: 'Peas',
  //             fr: 'Peas',
  //             es: 'Peas',
  //             pt: 'Peas',
  //             id: 'Peas',
  //             zh: 'Peas',
  //             ka: 'Peas'
  //           },
  //           color: '#f44141'
  //         },
  //       ]
  //     }
  //   }]
  // };

    if (metadata && metadata.legendConfig) {
      const { name, type, items } = metadata.legendConfig;

      if (type === 'group') {
        return (
          <div>
            {items.map((category, i) => {
              const { name: categoryName, subgroup } = category;
              return (
                <div className={`parent-legend-container ${!visible && 'hidden'}`} ref='myRef' key={`webmap-legend-${i}`}>
                  <div className='label-container'>
                    <strong>{categoryName[language]}</strong>
                  </div>
                  <div className='legend-container'>
                    {category.subgroup.items.length &&
                      <div className='crowdsource-legend'>
                        {this.apiItemMapper(subgroup.items, subgroup.type, language)}
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
          <div>
            <div className={`parent-legend-container ${!visible && 'hidden'}`} ref='myRef' key={`webmap-legend-${name[language]}`}>
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
          </div>
        );
      }
    }

    return (
      <div className={`parent-legend-container ${visible ? '' : 'hidden'}`} ref='myRef'>
        <div className='label-container'><strong>{label}</strong></div>
        <div className='legend-container'>
          {legendInfos.length === 0 ? '' :
            <div className='crowdsource-legend'>
              {legendInfos.map(this.itemMapper, this)}
            </div>
          }
        </div>
      </div>
    );
  }
}
