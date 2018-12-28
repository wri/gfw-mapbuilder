import React, { Component } from 'react';
import charts from 'utils/charts';
import SVGIcon from 'utils/svgIcon';
import { urls } from 'js/config';

export default class VegaChart extends Component {
  constructor(props) {
    super(props);

    this.state = { isError: false, errorMsg: null, showDownloadOptions: false, downloadOptions: []};
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
            if (json.data){
              const values = json.data.attributes.value;
              if (values.length) {
                charts.makeVegaChart(this.chart, config, this.props.setLoading);
              } else {
                this.handleError('No results for this analysis.' );
              }

              const downloadOptions = [];
              const downloadUrls = json.data.attributes.downloadUrls;
              if (downloadUrls) {
                const labels = Object.keys(downloadUrls);
                labels.forEach((label) => {
                  downloadOptions.push({label, url: downloadUrls[label]});
                });
              }
              this.setState({ downloadOptions });

            }
          });
        });
      }
  }

  renderdownloadOptions = (option, i) => {
    const baseUrl = urls.analysisDataBaseUrl;
    return (
      <a href={baseUrl + option.url} key={`option-${i}`}>
        Download data as <span className='download-option-label'>{option.label}</span>
      </a>
    );
  };

  render() {
    const { isError, errorMsg, showDownloadOptions, downloadOptions } = this.state;
    const { results } = this.props;

    if (isError) {
      return (
        <div className='data-error'>
          <h5>{results.message || errorMsg}</h5>
        </div>
      );
    } else {
      return (
        <div className='vega-chart_container'>
          { showDownloadOptions &&
            <div className='vega-chart_click-area' onClick={() => this.setState({ showDownloadOptions: false })}></div> }
          <div className='vega-chart_download-container'>
            <div className='pointer' onClick={() => this.setState({showDownloadOptions: !showDownloadOptions})}><SVGIcon id={'icon-menu'} /></div>

            { showDownloadOptions &&
              <div className='vega-chart_download-options shadow' onClick={() => this.setState({showDownloadOptions: !showDownloadOptions})}>
                {downloadOptions.map(this.renderdownloadOptions)}
              </div> }

          </div>
          <div className='vega-chart' ref={(chart) => { this.chart = chart; }}></div>
        </div>
      );
    }
  }
}
