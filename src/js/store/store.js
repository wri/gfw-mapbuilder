import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from '../reducers/app';

const middlewares = [];

// Environment specific middlewares configuration
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-line no-undef
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
