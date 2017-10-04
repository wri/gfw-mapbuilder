import {actionTypes} from 'constants/AppConstants';
import mapActions from 'actions/MapActions';
import React, { Component, PropTypes } from 'react';
import request from 'utils/request';
import utils from 'utils/AppUtils';
import all from 'dojo/promise/all';
import text from 'js/languages';

const STATS = {
  url: 'https://gis-gfw.wri.org/arcgis/rest/services/forest_change/MapServer/2',
  field: 'date',
  outFields: ['date']
};

export default class SadControls extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      min_month: 0,
      max_month: 0,
      min_year: 0,
      max_year: 0
    };
  }

  componentDidMount () {
    //- Get the bounds for this layer
    all({
      'MIN': request.getLayerStatistics({ type: 'min', ...STATS }),
      'MAX': request.getLayerStatistics({ type: 'max', ...STATS })
    }).then(results => {
      const {MIN, MAX} = results;
      let minDate = MIN.features.length && MIN.features[0].attributes.date;
      let maxDate = MAX.features.length && MAX.features[0].attributes.date;

      if (minDate && maxDate) {
        minDate = new Date(minDate);
        maxDate = new Date(maxDate);

        //- Update local state to enforce disabled status on options
        this.setState({
          min_month: minDate.getMonth(),
          max_month: maxDate.getMonth(),
          min_year: minDate.getFullYear(),
          max_year: maxDate.getFullYear()
        });

        //- Update default values of the selects in our store
        mapActions.updateImazonAlertSettings(actionTypes.UPDATE_IMAZON_START_MONTH, minDate.getMonth());
        mapActions.updateImazonAlertSettings(actionTypes.UPDATE_IMAZON_END_MONTH, maxDate.getMonth());
        mapActions.updateImazonAlertSettings(actionTypes.UPDATE_IMAZON_START_YEAR, minDate.getFullYear());
        mapActions.updateImazonAlertSettings(actionTypes.UPDATE_IMAZON_END_YEAR, maxDate.getFullYear());
      }

    });
  }

  componentDidUpdate (prevProps, prevState, prevContext) {
    const {startYear, endYear, startMonth, endMonth, layer} = this.props;
    const {min_year, max_year, min_month, max_month} = this.state;
    const {map} = this.context;
    const defs = [];
    // - If the years don't exist, don't even bother attempting to update
    if ((!startYear && startYear !== 0) || (!endYear && endYear !== 0)) { return; }

    if (prevProps.startYear !== startYear ||
      prevProps.endYear !== endYear ||
      prevProps.startMonth !== startMonth ||
      prevProps.endMonth !== endMonth
    ) {
      if (map.getLayer && map.getLayer(layer.id)) {
        if (startYear === 0 && endYear === 0 && startMonth === 0 && endMonth === 0) { // if we have just reset all layers
          // Update store values
          mapActions.updateImazonAlertSettings(actionTypes.UPDATE_IMAZON_START_MONTH, min_month);
          mapActions.updateImazonAlertSettings(actionTypes.UPDATE_IMAZON_END_MONTH, max_month);
          mapActions.updateImazonAlertSettings(actionTypes.UPDATE_IMAZON_START_YEAR, min_year);
          mapActions.updateImazonAlertSettings(actionTypes.UPDATE_IMAZON_END_YEAR, max_year);

          const definitionExpression = this.formatQuery(min_year, max_year, min_month, max_month);
          defs[2] = definitionExpression;
        } else { // else the select is what set the values so we don't need to update the store here
          const definitionExpression = this.formatQuery(startYear, endYear, startMonth, endMonth);
          defs[2] = definitionExpression;
        }
        const sadLayer = map.getLayer(layer.id);
        if (sadLayer) {
          sadLayer.setLayerDefinitions(defs);
        }
      }
    }

    // Anytime the map changes to a new map, update that here
    if (prevContext.map !== map) {
      const signal = map.on('update-end', () => {
        signal.remove();
        const definitionExpression = this.formatQuery(startYear, endYear, startMonth, endMonth);
        defs[2] = definitionExpression;
        const sadLayer = map.getLayer(layer.id);
        if (sadLayer) {
          sadLayer.setLayerDefinitions(defs);
        }
      });
    }
  }

  formatQuery (startYear, endYear, startMonth, endMonth) {
    const startDateString = `${startMonth + 1}-1-${startYear} 00:00:00`;
    const endDateString = `${endMonth + 1}-1-${endYear} 00:00:00`;
    return `date_alias BETWEEN timestamp '${startDateString}' AND timestamp '${endDateString}'`;
  }

  updateSadAlerts = (type, {target}) => {
    mapActions.updateImazonAlertSettings(type, +target.value);
  };

  renderMonthOptions (indicator) {
    const {min_month, max_month, min_year, max_year} = this.state;
    const {startYear, endYear, startMonth, endMonth} = this.props;
    const {language} = this.context;
    return text[language].MONTHS_LIST.map((item, index) => {
      const disabled = indicator === 'start' ?
        (index < min_month && startYear === min_year) || (startYear === endYear && index >= endMonth) :
        (index > max_month && endYear === max_year) || (startYear === endYear && index <= startMonth);

      return <option key={index} value={index} disabled={disabled}>{item.name}</option>;
    });
  }

  renderYearOptions (indicator) {
    const {startYear, endYear} = this.props;
    const {min_year, max_year} = this.state;
    return utils.range(min_year, max_year).map((year, index) => {
      const disabled = indicator === 'start' ? year > endYear : year < startYear;
      return <option key={index} value={year} disabled={disabled}>{year}</option>;
    });
  }

  render () {
    const {startMonth, startYear, endMonth, endYear} = this.props;
    const {language} = this.context;
    const {min_year} = this.state;
    //- If min_year, or any year value for that matter, is still 0, don't render the UI
    if (!min_year) { return <div />; }

    return (
      <div className='timeline-container imazon-controls flex'>
        <div className='relative'>
          <select
            value={startMonth}
            onChange={this.updateSadAlerts.bind(this, actionTypes.UPDATE_IMAZON_START_MONTH)}>
            {this.renderMonthOptions('start')}
          </select>
          <div className='fa-button sml white'>{text[language].MONTHS_LIST[startMonth].abbr}</div>
        </div>
        <div className='relative'>
          <select
            value={startYear}
            onChange={this.updateSadAlerts.bind(this, actionTypes.UPDATE_IMAZON_START_YEAR)}>
            {this.renderYearOptions('start')}
          </select>
          <div className='fa-button sml white'>{startYear}</div>
        </div>
        <div className='loss-timeline-spacer'> - </div>
        <div className='relative'>
          <select
            value={endMonth}
            onChange={this.updateSadAlerts.bind(this, actionTypes.UPDATE_IMAZON_END_MONTH)}>
            {this.renderMonthOptions('end')}
          </select>
          <div className='fa-button sml white'>{text[language].MONTHS_LIST[endMonth].abbr}</div>
        </div>
        <div className='relative'>
          <select
            value={endYear}
            onChange={this.updateSadAlerts.bind(this, actionTypes.UPDATE_IMAZON_END_YEAR)}>
            {this.renderYearOptions('end')}
          </select>
          <div className='fa-button sml white'>{endYear}</div>
        </div>
      </div>
    );
  }

}

SadControls.propTypes = {
  layer: PropTypes.object.isRequired,
  startMonth: PropTypes.number.isRequired,
  endMonth: PropTypes.number.isRequired,
  startYear: PropTypes.number.isRequired,
  endYear: PropTypes.number.isRequired
};
