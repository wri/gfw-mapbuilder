import React, { Component } from 'react';

import utils from 'utils/AppUtils';

export default class CarbonChart extends Component {
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
      const aboveground = this.props.aboveground;
      const belowground = this.props.belowground;
      const averageAboveground = this.props.averageAboveground;
      const averageBelowground = this.props.averageBelowground;
      const total = this.props.total;
      const averageTotal = this.props.averageTotal;

      if (aboveground === 0 && belowground === 0 && averageAboveground === 0 && averageBelowground === 0) {
        this.setState({ isEmpty: true, loading: false });
      } else {
        // Total chart
        total > 0 && Highcharts.chart(this.totalChart, {
          chart: {
            type: 'pie',
            spacingTop: -20
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
                enabled: true,
                distance: -30,
                style: {
                  fontSize: '18px',
                  textOutline: 'none',
                  fontWeight: 'normal'
                }
              },
              showInLegend: true
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
                  y: Number(aboveground.toFixed(2)),
                  color: '#5CCEF8',
                  name: 'Aboveground'
                },
                {
                  y: Number(belowground.toFixed(2)),
                  color: '#50AC58',
                  name: 'Belowground'
                }
              ],
              dataLabels: {
                formatter: function() {
                  return ((this.y / total) * 100).toFixed(2) + '%';
                }
              },
              size: '77%',
              innerSize: '35%',
              id: 'total-biomass'
            }
          ],
          labels: {
            items: [
              {
                html: `Total: ${utils.formatNumber(Math.round(total))} ${this.props.totalSuffix}`,
                style: {
                  top: '215px',
                  left: '40px',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }
              }
            ]
          },
          legend: {
            layout: 'vertical',
            y: 19
          }
        });

        // Average chart
        averageTotal > 0 && Highcharts.chart(this.averageChart, {
          chart: {
            type: 'pie',
            spacingTop: -20
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
                enabled: true,
                distance: -30,
                style: {
                  fontSize: '18px',
                  textOutline: 'none',
                  fontWeight: 'normal'
                }
              }
            }
          },
          tooltip: {
            valueSuffix: this.props.averageSuffix
          },
          series: [
            {
              name: 'Total',
              data: [
                {
                  y: Number(averageAboveground.toFixed(2)),
                  color: '#5CCEF8',
                  name: 'Aboveground'
                },
                {
                  y: Number(averageBelowground.toFixed(2)),
                  color: '#50AC58',
                  name: 'Belowground'
                }
              ],
              dataLabels: {
                formatter: function() {
                  return ((this.y / averageTotal) * 100).toFixed(2) + '%';
                }
              },
              size: '81%',
              innerSize: '35%',
              id: 'total-biomass'
            }
          ],
          labels: {
            items: [
              {
                html: `Average: ${utils.formatNumber(Math.round(averageTotal))} ${this.props.averageSuffix}`,
                style: {
                  top: '215px',
                  left: '40px',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }
              }
            ]
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
        <div>
          <div ref={(chart) => {this.totalChart = chart;}} className='analysis__carbon-chart-container total' />
          <div ref={(chart) => {this.averageChart = chart;}} className='analysis__carbon-chart-container average' />
          <div id='chartError' className={`chart-error ${isEmpty ? '' : ' hidden'}`}>No data available.</div>
        </div>
      );
    }
  }
}
