import React, { Component } from 'react';

import utils from 'utils/AppUtils';

export default class CommoditiesChart extends Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      isEmpty: false,
      isError: false
    };
  }

  componentDidMount() {
    if (typeof this.props.results === 'object' && this.props.results.hasOwnProperty('error')) {
      this.setState({ isError: true });
    } else {
      const oilPalm = this.props.oilPalm;
      const mining = this.props.mining;
      const managedForests = this.props.managedForests;

      if (oilPalm === 0 && mining === 0 && managedForests === 0) {
        this.setState({ isEmpty: true, loading: false });
      } else {

        const colors = ['#FDDB61', '#8E6E63', '#475961'];
        const names = ['Oil palm concessions', 'Mining concessions', 'Managed forest concessions'];
        Highcharts.chart(this.commChart, {
          chart: {
            height: 300,
            type: 'bar'
          },
          title: {
            text: 'Total Concessions: ' + (oilPalm + mining + managedForests)
          },
          xAxis: {
            categories: names,
            allowDecimals: false,
            label: 'count'
          },
          yAxis: {
            allowDecimals: false
          },
          plotOptions: {
            series: {
              events: {
                legendItemClick: function (x) {
                  var i = this.index - 1;
                  var series = this.chart.series[0];
                  var point = series.points[i];

                  if (point.oldY === undefined) {
                    point.oldY = point.y;
                  }

                  point.update({y: point.y !== null ? null : point.oldY});
                }
              }
            }
          },
          legend: {
            labelFormatter: function(){
              return names[this.index - 1];
            }
          },
          series: [
            {
              pointWidth: 25,
              color: colors[0],
              showInLegend: false,
              data: [
                {
                  y: Number(oilPalm),
                  color: '#FDDB61',
                  name: 'Oil palm concessions'
                },
                {
                  y: Number(mining),
                  color: '#8E6E63',
                  name: 'Mining concessions'
                },
                {
                  y: Number(managedForests),
                  color: '#475961',
                  name: 'Managed forest concessions '
                }
              ]
            },
            {color: '#FDDB61'},
            {color: '#8E6E63'},
            {color: '#475961'}
          ]//,
          // labels: {
          //   items: [
          //     {
          //       html: `Total: ${utils.formatNumber(oilPalm + mining + managedForests)} concessions`,
          //       style: {
          //         top: '220px',
          //         left: '50%',
          //         fontSize: '16px'
          //       }
          //     }
          //   ],
          //   style: {
          //     color: '#6f6f6f'
          //   }
          // }

        });
      }
    }
  }

  render() {
    const { results } = this.props;
    const { isError, isEmpty } = this.state;

    if (isError) {
      return (
        <div className='data-error'>
          <h5>{results.message}</h5>
        </div>
      );
    } else {
      return (
        <div className='analysis__carbon-container flex'>
          <div ref={(chart) => {this.commChart = chart;}} className='analysis__carbon-chart-container' />
          <div id='chartError' className={`chart-error ${isEmpty ? '' : ' hidden'}`}>No data available.</div>
        </div>
      );
    }
  }
}
