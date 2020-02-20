import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '../../configs/dojoConfig';
import store from './store/index';
import { MapBuilderMain } from 'js/MapBuilderMain';

declare global {
  interface Window {
    MapBuilder: Function;
  }
}

interface BuilderMain {
  render: Function;
}

class MapBuilder {
  element: string;
  config: object;
  builderMain: BuilderMain;

  constructor(element: string, config: object) {
    this.config = config;
    this.element = element;
    this.builderMain = new MapBuilderMain(config);

    this.render();
  }

  render(): void {
    ReactDOM.render(
      <Provider store={store}>{this.builderMain.render()}</Provider>,
      document.getElementById(this.element)
    );
  }
}

window.MapBuilder = MapBuilder;
