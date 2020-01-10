//@ts-ignore
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { appStateReducer } from './appState/reducers';
import { mapviewReducer } from './mapview/reducers';
import { createLogger } from 'redux-logger';

const rootReducer = combineReducers({
  appState: appStateReducer,
  mapviewState: mapviewReducer
});

const middlewares: any[] = [];
// Environment specific middlewares configuration
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-line no-undef
  const logger = createLogger();
  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
