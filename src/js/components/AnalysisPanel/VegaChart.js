import React, { Component } from 'react';
import charts from 'utils/charts';

export default class VegaChart extends Component {
  constructor(props) {
    super(props);

    this.state = { isError: false, errorMsg: null };
  }

  handleError(errorMsg) {
    this.setState({ isError: true, errorMsg });
    this.props.setLoading();
  }

  componentDidMount() {
    if (this.props.results.hasOwnProperty('error')) {
      this.handleError();
    } else {
      const config = this.props.results.data.attributes.widgetConfig;
      const url = config.data[0].url;
      fetch(url)
        .then(res => {
          if (res.status !== 200) {
            this.handleError('Error creating analysis.');
          }

          res.json().then(json => {
            if (json.data) {
              const values = json.data.attributes.value;
              if (values.length) {
                charts.makeVegaChart(this.chart, config, this.props.setLoading);
              } else {
                this.handleError('No results for this analysis.' );
              }
            } else if (json.histograms) {
              const values = json.histograms[0].counts;
              if (values.length) {
                charts.makeVegaChart(this.chart, config, this.props.setLoading);
              } else {
                this.handleError('No results for this analysis.' );
              }
            } else {
              this.handleError('No results for this analysis.' );
            }
          });
        }).catch(() => {
          this.handleError('Error creating analysis.');
        });
      }


  }

  render() {
    const { isError, errorMsg } = this.state;
    const { results } = this.props;
    if (isError) {
      return (
        <div className='data-error'>
          <h5>{results.message || errorMsg}</h5>
        </div>
      );
    } else {
      return <div className='vega-chart' ref={(chart) => { this.chart = chart; }}></div>;
    }
  }
}
