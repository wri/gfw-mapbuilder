import Measurement from 'esri/dijit/Measurement';
import React, {
  Component,
  PropTypes
} from 'react';

export default class InfoWindow extends Component {
  static contextTypes = {
    map: PropTypes.object.isRequired
  }

  initialized = false

  componentWillUpdate(prevProps) {
    if (
      this.context.map.loaded
      // the Measurement tool depends on navigationManager so we
      // need to explicitly check for that before starting the widget
      && this.context.map.navigationManager
      && !this.initialized
    ) {
      this.initialized = true;

      const measurementDiv = document.createElement('DIV');
      this.measurementContainer.appendChild(measurementDiv);

      this.measurement = new Measurement({
        map: this.context.map
      }, measurementDiv);
      this.measurement.startup();
      // this.measurement.on('measure-end', (event) => {
      //   // deactivate the tool after drawing
      //   const toolName = event.toolName;
      //   this.measurement.setTool(toolName, false);
      // });
    }

    if (prevProps.activeWebmap !== undefined && prevProps.activeWebmap !== this.props.activeWebmap) {
      if (this.context.map.destroy && this.initialized) {
        this.measurement.clearResult();
        this.initialized = false;
      }
    }

  }

  componentWillUnmount() {
    this.measurement.destroy();
  }

  render () {
    return <div
      ref={(div) => { this.measurementContainer = div; }}
      className='measurement-container'
    />;
  }
}
