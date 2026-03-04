import './publicPath';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
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
  root: ReturnType<typeof createRoot>;

  constructor(params: Params) {
    this.element = params.el;
    this.builderMain = new MapBuilderMain(params.config);
    const container = document.getElementById(this.element);
    this.root = createRoot(container!);
    console.log(params);
    this.render();
  }

  render(): void {
    this.root.render(<Provider store={store}>{this.builderMain.render()}</Provider>);
  }
}

window.MapBuilderLoader = MapBuilder;
