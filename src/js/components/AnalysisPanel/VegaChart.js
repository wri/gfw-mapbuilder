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
      //const url = config.data[0].url;
      const url = "https://production-api.globalforestwatch.org/v1/umd-loss-gain?aggregate_values=false&table=true&period=2001-01-01,2017-12-31&geostore=2c71036c5314cfe1a11bf9a00148bcc0&thresh=30";
      fetch(url.toString()).then(res => {
        if (res.status !== 200) {
          this.handleError('Error creating analysis.');
        } else {
          res.json().then(json => {
            // We used to have this 'json' object for validation and error-checking, but now
            // we leave that up to the Widget API!
            /* makeVegaChart also makes a request call to the API - Maybe refactor this 
            and remove the fetch call here and put error handling inside of Vega? */
            console.log(json);
            charts.makeVegaChart(this.chart, config, this.props.setLoading);
          });
        }

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
