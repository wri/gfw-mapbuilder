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
      console.log('graphics start', brApp.map.graphics);

      const measurementDiv = document.createElement('DIV');
      this.measurementContainer.appendChild(measurementDiv);

      this.measurement = new Measurement({
        map: this.context.map
      }, measurementDiv);
      this.measurement.startup();
      // this.measurement.on('measure-start', (event) => {
      //   console.log('graphics start', brApp.map.graphics);
      // });
      this.measurement.on('measure', (event) => {
        //console.log('graphics end', brApp.map.graphics);
        const graphics = brApp.map.graphics;
        for (let i = 0; i < graphics.length; i++) {
          if (graphics[i].geometry.type !== 'polygon' && !graphics[i].symbol.type) {
            brApp.map.graphics.remove(graphics[i]);
            i--;
          }
        }
      });
      window.mm = this.measurement;
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
