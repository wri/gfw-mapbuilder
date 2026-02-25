//In some deployments, index.html is in a different spot than main javascript bundle code,
//because of this we need to set the publicPath dynamically on the fly, below script achieves that
//https://github.com/webpack/webpack/issues/7968
//@ts-ignore
const url = new URL(document.currentScript.src);
const widgetLink = url.href.substring(0, url.href.lastIndexOf('/') + 1);
//@ts-ignore
__webpack_public_path__ = widgetLink;

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
