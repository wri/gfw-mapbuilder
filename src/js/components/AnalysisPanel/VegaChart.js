import React, { Component } from 'react';
import charts from 'utils/charts';

export default class VegaChart extends Component {
  constructor(props) {
    super(props);

    this.state = { isError: false, errorMsg: null };
  }

  handleError(errorMsg) {
    this.setState({ isError: true, errorMsg });
    if (this.props.setLoading) {
      this.props.setLoading();
    }
  }

  componentDidMount() {
    if (this.props.results.hasOwnProperty('error')) {
      this.handleError();
    } else {
      const config = this.props.results.data.attributes.widgetConfig;
      const {setLoading, language} = this.props;
      if (config.data[0].url.indexOf('?&') > -1){
        const urlPieces = config.data[0].url.split('?&');
        config.data[0].url = urlPieces[0] + '?' + urlPieces[1];
      }
      fetch(config.data[0].url).then(res => {
        if (res.status !== 200) {
          this.handleError('Error creating analysis.');
        } else {
          res.json().then(json => {
            // We used to have this 'json' object for validation and error-checking, but now
            // we leave that up to the Widget API!
            /* makeVegaChart also makes a request call to the API - Maybe refactor this
            and remove the fetch call here and put error handling inside of Vega? */
            charts.makeVegaChart(this.chart, config, language, setLoading);
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
