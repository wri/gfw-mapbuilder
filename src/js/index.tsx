import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store/index';
import { setAssetPath } from '@esri/calcite-components/dist/components';
import '@esri/calcite-components/dist/calcite/calcite.css';

setAssetPath('https://js.arcgis.com/calcite-components/2.5.1/assets');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
