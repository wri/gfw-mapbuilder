import React, { Component } from 'react';

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
      const total = aboveground + belowground;

      if (aboveground === 0 && belowground === 0) {
        this.setState({ isEmpty: true, loading: false });
      } else {
        Highcharts.chart(this.chart, {
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
                enabled: true,
                distance: -35,
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
            valueSuffix: this.props.suffix
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
              size: '90%',
              innerSize: '35%',
              id: 'total-biomass'
            }
          ],
          legend: {
            layout: 'vertical'
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
          <div ref={(chart) => {this.chart = chart;}} className='analysis__chart-container' />
          <div id='chartError' className={`chart-error ${isEmpty ? '' : ' hidden'}`}>No data available.</div>
        </div>
      );
    }
  }
}
