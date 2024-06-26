//@ts-ignore
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { appSettingsReducer } from './appSettings/reducers';
import { appStateReducer } from './appState/reducers';
import { mapviewReducer } from './mapview/reducers';
import { createLogger } from 'redux-logger';

import * as actionCreators from './mapview/actions';

const composeEnhancers = composeWithDevTools({ actionCreators, trace: true, traceLimit: 25 });

const rootReducer = combineReducers({
  appSettings: appSettingsReducer,
  appState: appStateReducer,
  mapviewState: mapviewReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const middlewares: any[] = [];
// Environment specific middlewares configuration
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-line no-undef
  const logger = createLogger();
  middlewares.push(logger);
}

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

export default store;
