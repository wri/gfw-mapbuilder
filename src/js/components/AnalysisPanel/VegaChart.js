import React, { Component } from 'react';
import charts from 'utils/charts';
import SVGIcon from 'utils/svgIcon';
import { urls } from 'js/config';
import ReportSettings from '../../report/ReportSettings';
import Loader from '../Loader';
import Measure from 'react-measure';

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
      chartName: '',
      description: '',
      showSettings: false,
      isLoading: false,
      dimensions: {
        width: -1,
        height: -1
      }
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
      this.setState({
        isLoading: true
      });
      const config = this.props.results.data.attributes.widgetConfig;
      if (this.props.component === 'Report') {
        if (!config.signals) {
          config.signals = [];
        }
        config.autosize = {
          type: 'fit',
          resize: true
        };

        const resizeWidthSignal = {
          name: "width",
          update: "containerSize()[0]*0.95",
          value: "",
          on: [
            {
              events: {
                source: "window",
                type: "resize"
              },
              update: "containerSize()[0]*0.95"
            }
          ]
        };
        config.signals.push(resizeWidthSignal);
      }

      const {setLoading, language} = this.props;
      if (config.data[0].url.indexOf('?&') > -1) {
        const urlPieces = config.data[0].url.split('?&');
        config.data[0].url = `${urlPieces[0]}?${urlPieces[1]}`;
      }
      const dataset = this.props.results.data.attributes.dataset;
      const id = this.props.results.data.id;
      if (this.props.component === 'Report'){
        fetch(`https://production-api.globalforestwatch.org/v1/dataset/${dataset}/widget/${id}/metadata?language=${language}`).then(res => {
          res.json().then(json => {
            if (res.status !== 200) {
              this.setState({
                description: `Error retrieving description for ${this.props.reportLabel}`
              });
            } else {
              if (json.data && json.data.length > 0 && json.data[0].attributes) {
                this.setState({
                  description: json.data[0].attributes.description
                });
              }
            }
          });
        });
      }

      fetch(config.data[0].url).then(res => {
        if (res.status !== 200) {
          this.handleError(`Error creating analysis for ${this.props.reportLabel}`);
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
      .catch(() => this.handleError(`Error creating analysis for ${this.props.reportLabel}`));
    }
  }

  addChartDownload = (url) => {
    this.setState({ chartImgDownloadUrl: url, isLoading: false });
  };

  renderdownloadOptions = (option, i) => {
    const baseUrl = urls.analysisDataBaseUrl;
    return (
      <a className="download-option" href={option.url.includes('cartodb') ? option.url : baseUrl + option.url} target="_blank" download key={`option-${i}`}>
        <span className='download-option-label'>Download Alerts as .CSV</span>
      </a>
    );
  };

  reRenderChart = (config) => {
    this.setState({
      isLoading: true
    });
    const {language, setLoading} = this.props;
    const widgetConfig = config.data.attributes.widgetConfig;
    widgetConfig.autosize = {
      type: 'fit',
      resize: true
    };
    if (!widgetConfig.signals) {
      widgetConfig.signals = [];
    }
    const resizeWidthSignal = {
      name: "width",
      update: "containerSize()[0]*0.95",
      value: "",
      on: [
        {
          events: {
            source: "window",
            type: "resize"
          },
          update: "containerSize()[0]*0.95"
        }
      ]
    };
    widgetConfig.signals.push(resizeWidthSignal);
    charts.makeVegaChart(this.chart, widgetConfig, language, setLoading, this.addChartDownload);
  };

  render() {
    const { isError, errorMsg, showDownloadOptions, downloadOptions, chartDownloadTitle, chartImgDownloadUrl, description, isLoading, showSettings } = this.state;
    const {width, height} = this.state.dimensions;
    const { results, component, reportLabel, module, params, language, analysisId, chartType, toggle, toggleChart} = this.props;
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
            <div className={component === 'Report' ? 'vega-chart_download-container-report' : 'vega-chart_download-container'}>
              <h3 className={`vega-chart-label ${toggle ? 'print-hide' : ''}`}>{reportLabel}</h3>
              <div className='vega-chart-menu-container'>
                {
                  (
                  analysisId === 'TC_LOSS' ||
                  analysisId === 'TC_LOSS_GAIN' ||
                  analysisId === 'IFL' ||
                  analysisId === 'Loss_LandCover' ||
                  analysisId === 'BIO_LOSS' ||
                  analysisId === 'TOTAL_GLAD_ALERTS'
                  ) ?
                  <div className="vega-chart-menu-settings">
                    <div className='vega-chart-menu' onClick={() => this.setState({ showSettings: !showSettings })}>
                      <SVGIcon className="vega-chart-menu-icon" id={'icon-gear'} />
                    </div>
                  </div> :
                  null
                }
                {
                  (
                  analysisId === 'TC_LOSS' ||
                  analysisId === 'TC_LOSS_GAIN' ||
                  analysisId === 'IFL' ||
                  analysisId === 'Loss_LandCover' ||
                  analysisId === 'BIO_LOSS' ||
                  analysisId === 'TOTAL_GLAD_ALERTS'
                  ) ?
                  <div className="vega-chart-divider"></div> :
                  null
                }
                <div className='vega-chart-menu' onClick={() => this.setState({showDownloadOptions: !showDownloadOptions})}>
                  <SVGIcon className="vega-chart-menu-icon" id={'icon-download-grey'} />
                </div>
                <div className="vega-chart-divider"></div>
                <div className={`vega-chart-toggle-${toggle}`} onClick={toggleChart}>
                  <span className="vega-chart-toggle-dot"></span>
                </div>
              </div>
            </div> :
            <div className={component === 'Report' ? 'vega-chart_download-container-report' : 'vega-chart_download-container'}>
              <h3 className="vega-chart-label">{reportLabel}</h3>
              <div className='vega-chart-menu-container'>
                <div className='vega-chart-menu' onClick={() => this.setState({showDownloadOptions: !showDownloadOptions})}>
                  <SVGIcon className="vega-chart-menu-icon" id={'icon-download-grey'} />
                </div>
              </div>
            </div>
          }
          {component === 'Report' &&
            <div className={`vega-chart-report-settings-container ${(showSettings && !toggle) ? '' : 'vega-chart-hide'}`}>
              <ReportSettings module={module} params={params} language={language} reRenderChart={this.reRenderChart} />
            </div>
          }
          { showDownloadOptions &&
            <div className={component === 'Report' ? 'vega-chart_download-options-report' : 'vega-chart_download-options'} onClick={() => this.setState({showDownloadOptions: !showDownloadOptions})}>
              {downloadOptions.map(this.renderdownloadOptions)}
              {this.chart &&
                <a className="download-option" href={chartImgDownloadUrl} download={chartDownloadTitle}>
                  <span className='download-option-label'>Download PNG</span>
                </a>
              }
            </div>
          }
          {component === 'Report' ?
          <div className={`loader-wrapper ${toggle ? 'vega-chart-hide' : ''}`}>
              {
                isLoading &&
                <div className="loader">
                  <Loader active={isLoading} />
                </div>
              }
              <Measure
                bounds
                onResize={contentRect => {
                this.setState({ dimensions: contentRect.bounds });
                }}
              >
                {({ measureRef }) => (
                  <div
                    ref={measureRef}
                    className={
                    `${chartType && chartType === 'bar' && 'vega-chart-bar-container'}
                    ${chartType && chartType === 'line' && 'vega-chart-line-container'}
                    ${chartType && chartType === 'badge' && 'vega-chart-badge-container'}
                    ${chartType && chartType === 'pie' && 'vega-chart-pie-container'}
                    ${(toggle || isLoading) ? 'vega-chart-hidden' : ''}`
                    }
                  >
                    <div width={width} height={height} className={`vega-chart ${(toggle || isLoading) ? 'vega-chart-hidden' : ''}`} id='AnalysisVegaChart' ref={(chart) => { this.chart = chart; }}></div>
                  </div>
                )}
              </Measure>
              {!isLoading && description && description !== '' &&
                <div className={`vega-chart-info-container ${toggle ? 'vega-chart-hide' : ''}`}>
                  <div className="vega-chart-info">
                      {description}
                  </div>
                </div>
              }
            </div>
            :
            <div className="vega-chart-container">
              <div className={`vega-chart ${toggle && 'vega-chart-hide'}`} id='AnalysisVegaChart' ref={(chart) => { this.chart = chart; }}></div>
            </div>
          }
        </div>
      );
    }
  }
}
