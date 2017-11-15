import React, { Component, PropTypes } from 'react';
import layerActions from 'actions/LayerActions';
import text from 'js/languages';

export default class LayerToggles extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  render () {
    const {language} = this.context;

    return (
      <div className='layer-toggles'>
        <span>{text[language].LAYERS}</span>
        <span onClick={this.clearAll.bind(this)} className='right small'>{text[language].CLEAR_ALL}</span>
        <span onClick={this.selectAll.bind(this)} className='right small'>{text[language].SELECT_ALL}</span>
      </div>
    );
  }

  clearAll () {
    layerActions.removeAll();
  }

  selectAll() {
    layerActions.addAll();
  }
}
