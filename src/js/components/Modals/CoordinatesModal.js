import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import React, { Component } from 'react';

export default class AnalysisModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      DMS: true,
      DD: false
    };
  }

  close = () => {
    mapActions.toggleCoordinatesModal({ visible: false });
  };
  
  handleChange = () => {
    this.setState({
      DMS: !this.state.DMS,
      DD: !this.state.DD
    });
  };
  
  createOptions = (analysisObj) => {
    const { language } = this.context;
    const { analysisId, label } = analysisObj;
    return (
      <option
        key={analysisId}
        value={analysisId}
      >
        {label[language] ? label[language] : ''}
      </option>
    );
  };

  render () {
    return (
      <ControlledModalWrapper onClose={this.close}>
        <div className='relative analysis-results__select-container'>
          <select
            value={activeAnalysisType || 'default'}
            className='analysis-results__select pointer'
            onChange={this.handleChange}
          >
            {analysisItems.map(this.createOptions)}
          </select>
          <div className='analysis-results__select-arrow' />
        </div>
         <div>
          <label htmlFor="deg-lat">Latitude</label>
          <input ref='decimalDegreeLat' type='number' id='deg-lat' name='deg-lat' />
        </div>
        <div>
        <label htmlFor="deg-lng">Longitude</label>
          <input ref='decimalDegreeLng' type='number' id='deg-lng' name='deg-lng' />
        </div>
      </ControlledModalWrapper>
    );
  }

}
