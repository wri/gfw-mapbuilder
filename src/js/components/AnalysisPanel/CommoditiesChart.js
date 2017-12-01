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
    console.log('props', this.props);
    if (typeof this.props.results === 'object' && this.props.results.hasOwnProperty('error')) {
      this.setState({ isError: true });
    } else {
      const oilPalm = this.props.oilPalm;
      const mining = this.props.mining;
      const managedForests = this.props.managedForests;

      if (oilPalm === 0 && mining === 0 && managedForests === 0) {
        this.setState({ isEmpty: true, loading: false });
      } else {
        Highcharts.chart(this.commChart, {
          chart: {
            type: 'pie'
          },
          credits: {
            enabled: false
          },
          title: {
            text: null
          },
          plotOptions: {
            pie: {
              dataLabels: {
                enabled: false,
                distance: -30,
                style: {
                  fontSize: '18px',
                  textOutline: 'none',
                  fontWeight: 'normal'
                }
              },
              showInLegend: true,
              center: ['50%', '35%']
            }
          },
          tooltip: {
            valueSuffix: this.props.totalSuffix
          },
          series: [
            {
              name: 'Total',
              data: [
                {
                  y: Number(oilPalm),
                  color: '#5CCEF8',
                  name: 'Oil palm concessions'
                },
                {
                  y: Number(mining),
                  color: '#50AC58',
                  name: 'Mining concessions'
                },
                {
                  y: Number(managedForests),
                  color: '#1cca1c',
                  name: 'Managed forest concessions '
                }
              ],
              dataLabels: {
                formatter: function() {
                  return this.y;
                }
              },
              size: '170',
              innerSize: '35%',
              id: 'total-comm'
            }
          ],
          labels: {
            items: [
              {
                html: `Total: ${utils.formatNumber(oilPalm + mining + managedForests)} concessions`,
                style: {
                  top: '220px',
                  left: '50%',
                  fontSize: '16px'
                }
              }
            ],
            style: {
              color: '#6f6f6f'
            }
          },
          legend: {
            layout: 'vertical',
            y: -21
          }
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
