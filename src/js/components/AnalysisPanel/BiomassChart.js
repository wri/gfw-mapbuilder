//- These charts have a dependency of highcharts
import React, {PropTypes, Component} from 'react';
import charts from 'utils/charts';
import text from 'js/languages';
import number from 'dojo/number';

export default class BiomassChart extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      loading: true,
      grossEmissions: 0,
      grossLoss: 0,
      isEmpty: false,
      isError: false
    };
  }

  componentDidMount() {
    const { payload, colors, labels } = this.props;
    const { language } = this.context;
    const { data } = payload;

    if (typeof payload === 'object' && payload.hasOwnProperty('error')) {
      this.setState({ isError: true });
    } else {

      const { series, grossLoss, grossEmissions } = charts.formatSeriesForBiomassLoss({
        data: data.attributes,
        lossColor: colors.loss,
        carbonColor: colors.carbon,
        lossName: text[language].ANALYSIS_CARBON_LOSS,
        carbonName: 't CO2'
      });
      if (series.some(obj => !obj.data.some(item => item !== 0)) && grossLoss === 0 && grossEmissions === 0) {
        this.setState({ isEmpty: true, loading: false });
      } else {
        //- Data is in million tons for emission, multiply by a million so we can show tons
        // If they update the api, remove the * 1000000
        this.setState({
          loading: false,
          grossEmissions: grossEmissions,
          grossLoss
        });

        charts.makeBiomassLossChart(this.refs.chart, {
          series,
          categories: labels
        });
      }
    }
  }

  render () {
    const {grossEmissions, grossLoss, loading, isEmpty, isError} = this.state;
    const results = this.props.payload;
    const {language} = this.context;

    if (isError) {
      return (
        <div className='data-error'>
          <h5>{results.message}</h5>
        </div>
      );
    } else {

      return (
        <div>
          <div ref='chart' className='biomass-loss analysis__chart-container'></div>
          <div className={loading || isEmpty ? 'hidden' : ''}>
            <div className='analysis__legend-container'>
              <span>{text[language].ANALYSIS_CARBON_LOSS}</span>
              <span>{number.format(grossLoss, { places: 0 })} ha</span>
            </div>
            <div className='analysis__legend-container'>
              <span>{text[language].ANALYSIS_CARBON_EMISSION}</span>
              <span>{number.format(grossEmissions, { places: 0 })} t CO<sub>2</sub></span>
            </div>
          </div>
          <div id='chartError' className={`chart-error ${this.state.isEmpty ? '' : ' hidden'}`}>No data available.</div>
        </div>
      );
    }
  }
}

BiomassChart.propTypes = {
  payload: PropTypes.object.isRequired
};
