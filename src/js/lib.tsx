import './publicPath';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import { MapBuilderMain } from '../js/MapBuilderMain';

declare global {
  interface Window {
    MapBuilderLoader: Function;
  }
}

interface BuilderMain {
  render: Function;
}

type Params = {
  el: string;
  config: any;
};

class MapBuilder {
  element: string;
  config: object;
  builderMain: BuilderMain;

  constructor(params: Params) {
    // this.config = config;
    this.element = params.el;
    this.builderMain = new MapBuilderMain(params.config);
    console.log(params);
    this.render();
  }

  render(): void {
    ReactDOM.render(
      <Provider store={store}>{this.builderMain.render()}</Provider>,
      document.getElementById(this.element)
    );
  }
}

window.MapBuilderLoader = MapBuilder;
