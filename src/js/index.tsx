import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store/index';
import { setAssetPath } from '@esri/calcite-components';
import '@esri/calcite-components/dist/calcite/calcite.css';

setAssetPath('https://js.arcgis.com/calcite-components/2.5.1/assets');

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
