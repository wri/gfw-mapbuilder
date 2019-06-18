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
      console.log('config', config);
      console.log('this.props', this.props);
      const url = config.data[0].url;
      console.log('url', url);
      //https://measures.wcs.org/DesktopModules/WCSVega/API/Data/MapBuilderVegaSQL
        //?polygonname=Nouabale-Ndoki%20NP
        //&AnalysisID=WCS_SpeciesPopulationTrend_WCSBarChart2DropDown_%5bTabID%5d_%5bPortalID%5d_%5bLocale%5d___

        //"analysisId": "WCS_SpeciesPopulationTrend_WCSBarChart2DropDown_[TabID]_[PortalID]_[Locale]___",

        //var uri = "my test.asp?name=ståle&car=saab";
        // var res = encodeURI(uri);
      // debugger
      const fakeUrl = 'https://measures.wcs.org/DesktopModules/WCSVega/API/Data/MapBuilderVegaSQL?polygonname=Nouabale-Ndoki%20NP&AnalysisID=WCS_SpeciesPopulationTrend_WCSBarChart2DropDown_%5bTabID%5d_%5bPortalID%5d_%5bLocale%5d___';

      fetch(fakeUrl).then(res => {
        if (res.status !== 200) {
          this.handleError('Error creating analysis.');
        } else {
          res.json().then(() => {
            console.log('this.props.selectedFeature.attributes', this.props.selectedFeature.attributes);
            console.log('this.props.results', this.props.results);
            // debugger
            charts.makeVegaChart(this.chart, config, this.props.setLoading, this.props.selectedFeature.attributes, this.props.results.data.id);
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
