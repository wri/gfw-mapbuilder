import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './components/App';
import '../../configs/dojoConfig';
import store from './store/index';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main')
);
