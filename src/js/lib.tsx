import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '../../configs/dojoConfig';
import store from './store/index';
// import MapBuilder from 'js/libraryMain';
import { MapBuilderMain } from 'js/MapBuilderMain';

declare global {
  interface Window {
    MapBuilda: any;
  }
}

interface MapB {
  render: Function;
}

class MapBuilda {
  element: string;
  config: object;
  mapB: MapB;

  constructor(element: string, config: object) {
    this.config = config;
    this.element = element;
    console.log('element', element);
    console.log('config', config);
    this.mapB = new MapBuilderMain(config);

    this.render();
  }

  render(): any {
    ReactDOM.render(
      <Provider store={store}>{this.mapB.render()}</Provider>,
      document.getElementById(this.element)
    );
  }
}

// export default MapBuilda;

window.MapBuilda = MapBuilda;
