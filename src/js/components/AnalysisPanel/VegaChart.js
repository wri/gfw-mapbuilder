import React, { Component } from 'react';
import charts from 'utils/charts';
import SVGIcon from 'utils/svgIcon';
import { urls } from 'js/config';
import Loader from '../Loader';

export default class VegaChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      errorMsg: null,
      showDownloadOptions: false,
      downloadOptions: [],
      chartDownloadTitle: 'analysis.png',
      chartImgDownloadUrl: null,
      toggle: false,
      isLoading: false,
      description: ''
    };
  }

  handleError(errorMsg) {
    this.setState({
      isError: true,
      errorMsg,
      isLoading: false
    });
    if (this.props.setLoading) {
      this.props.setLoading();
    }
  }

  componentDidMount() {
    if (this.props.results.hasOwnProperty('error')) {
      this.handleError();
    } else {
      const config = this.props.results.data.attributes.widgetConfig;
      // config.autosize = {type: 'fit', resize: true};
      const {setLoading, language, results} = this.props;
      if (config.data[0].url.indexOf('?&') > -1){
        const urlPieces = config.data[0].url.split('?&');
        config.data[0].url = `${urlPieces[0]}?${urlPieces[1]}`;
        this.setState({
          isLoading: true
        });
      }
      
      const dataset = this.props.results.data.attributes.dataset;
      const id = this.props.results.data.id;
      
   
      if (this.props.component === 'Report'){
        fetch(`https://production-api.globalforestwatch.org/v1/dataset/${dataset}/widget/${id}/metadata?language=${language}`).then(res => {
          res.json().then(json => {
            if (res.status !== 200) {
              this.setState({
                description: 'Error retrieving description'
              });
            } else {
            this.setState({
              description: json.data[0].attributes.description
            });
            }
          });
        });
      }
      
      fetch(config.data[0].url).then(res => {
        if (res.status !== 200) {
          this.handleError('Error creating analysis.');
        } else {
          res.json().then(json => {
            charts.makeVegaChart(this.chart, config, language, setLoading, this.addChartDownload);
            const downloadOptions = [];
            if (json.data && json.data.attributes && json.data.attributes.downloadUrls && !config.title) {
              const downloadUrls = json.data.attributes.downloadUrls;
              const label = 'csv';
              downloadOptions.push({label, url: downloadUrls[label]});
            }
            const chartDownloadTitle = json.data && json.data.type ? json.data.type + '-analysis.png' : 'analysis.png';
            this.setState({
              downloadOptions,
              chartDownloadTitle
            });
          }).then(
            this.setState({
              isLoading: false
            })
          );
        }
      })
      .catch(() => this.handleError('Error creating analysis.'));
    }
  }

  addChartDownload = (url) => {
    this.setState({ chartImgDownloadUrl: url });
  };

  renderdownloadOptions = (option, i) => {
    const baseUrl = urls.analysisDataBaseUrl;
    return (
      <a href={option.url.includes('cartodb') ? option.url : baseUrl + option.url} target="_blank" download key={`option-${i}`}>
        <span className='download-option-label'>Download Alerts as .CSV</span>
      </a>
    );
  };

  toggleChart = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  render() {
    const { isError, errorMsg, showDownloadOptions, downloadOptions, chartDownloadTitle, chartImgDownloadUrl, toggle, description, isLoading } = this.state;
    const { results, component, reportLabel } = this.props;
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
            <div className='vega-chart_click-area' onClick={() => this.setState({ showDownloadOptions: false })}></div> 
          }
          {component === 'Report' ?
          <div className='vega-chart_download-container'>
            {/* <h3 className="vega-chart-label">{results.data.attributes.name}</h3> */}
            <h3 className="vega-chart-label">{reportLabel}</h3>
            <div className='vega-chart-menu-container'>
              <div className='vega-chart-menu' onClick={() => console.log('clicked')}>
                <SVGIcon className="vega-chart-menu-icon" id={'icon-gear'} />
                {/* <span className="vega-chart-menu-text">SETTINGS</span> */}
              </div>
              <div className="vega-chart-divider"></div>
              <div className='vega-chart-menu' onClick={() => this.setState({showDownloadOptions: !showDownloadOptions})}>
                <SVGIcon className="vega-chart-menu-icon" id={'icon-download-grey'} />
              </div>
              <div className="vega-chart-divider"></div>
              <div className={`vega-chart-toggle-${toggle}`} onClick={this.toggleChart}>
                <span className="vega-chart-toggle-dot"></span>
              </div>
            </div>
          </div> :
          <div className='vega-chart_download-container'>
            <h3 className="vega-chart-label">{reportLabel}</h3>
            <div className='vega-chart-menu-container'>
              <div className='vega-chart-menu' onClick={() => this.setState({showDownloadOptions: !showDownloadOptions})}>
                <SVGIcon className="vega-chart-menu-icon" id={'icon-download-grey'} />
              </div>
            </div>
          </div>
          }
          { showDownloadOptions &&
            <div className='vega-chart_download-options' onClick={() => this.setState({showDownloadOptions: !showDownloadOptions})}>
              {downloadOptions.map(this.renderdownloadOptions)}
              {this.chart &&
                <a className="download-option" href={chartImgDownloadUrl} download={chartDownloadTitle}>
                  <span className='download-option-label'>Download PNG</span>
                </a>
              }
            </div>
          }
          {component === 'Report' ?
            <div>
              {isLoading ?
                <div className="loader">
                  {/* <svg width="100px" height="100px" viewBox="0 0 50 50" style={{ enableBackground: 'new 0 0 50 50'}}>
                    <path fill="#bbb" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                      <animateTransform attributeType="xml"
                        attributeName="transform"
                        type="rotate"
                        from="0 25 25"
                        to="360 25 25"
                        dur=".9s"
                        repeatCount="indefinite"/>
                      </path>
                  </svg> */}
                  {/* <Loader active={isLoading} /> */}
                </div>
              : <div className={`vega-chart ${toggle ? 'vega-chart-hide' : ''}`} id='AnalysisVegaChart' ref={(chart) => { this.chart = chart; }}></div>
              }
            </div>
            :
            <div className={`vega-chart ${toggle ? 'vega-chart-hide' : ''}`} id='AnalysisVegaChart' ref={(chart) => { this.chart = chart; }}></div>
          }
          {component === 'Report' &&
            <div>
              <div className={`vega-chart-info-container ${toggle && 'vega-chart-hide'}`}>
                <div className="vega-chart-info">
                    {description}
                </div>
              </div>
              <div className="vega-chart-separator"></div>
            </div>
          }
        </div>
      );
    }
  }
}
