export default {
  $schema: 'https://vega.github.io/schema/vega/v5.json',
  description: 'Fragmentation Badge',
  width: 250,
  height: 150,
  padding: 5,
  data: [],
  signals: [],
  marks: [
    {
      type: 'rect',
      encode: {
        enter: {
          x: {
            signal: '10'
          },
          y: {
            signal: '10'
          },
          width: {
            signal: '230'
          },
          height: {
            signal: '130'
          },
          fill: {
            value: '#DC6C9A'
          },
          stroke: {
            value: '#800080'
          },
          fillOpacity: {
            value: 0.1
          },
          strokeWidth: {
            value: 1
          }
        }
      }
    },
    {
      type: 'text',
      encode: {
        enter: {
          align: {
            value: 'center'
          },
          baseline: {
            value: 'middle'
          },
          x: {
            signal: 'width/2'
          },
          y: {
            signal: 'height/4'
          },
          fill: {
            value: '#6f6f6f'
          },
          text: {
            value: 'Habitat: Fragmentation Analysis'
          },
          fontSize: {
            value: 12
          }
        }
      }
    },
    {
      type: 'text',
      encode: {
        enter: {
          align: {
            value: 'center'
          },
          baseline: {
            value: 'middle'
          },
          x: {
            signal: 'width/2'
          },
          y: {
            signal: 'height/2.5'
          },
          fill: {
            value: '#6f6f6f'
          },
          text: {
            value: '2001-2017'
          },
          fontSize: {
            value: 12
          }
        }
      }
    },
    {
      type: 'text',
      encode: {
        enter: {
          align: {
            value: 'center'
          },
          baseline: {
            value: 'top'
          },
          x: {
            signal: 'width/2'
          },
          y: {
            signal: 'height/1.4'
          },
          fill: {
            value: '#800080'
          },
          text: {
            value: '16.1515'
          },
          fontSize: {
            value: 22
          },
          fontWeight: {
            value: 'bold'
          }
        }
      }
    }
  ]
};
