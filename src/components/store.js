import { createStore, combineReducers } from 'redux';

import { calendar } from './reducers';

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__;
const reducers = combineReducers({
  calendar,
});

const store = createStore(
  reducers,
  reduxDevtools && reduxDevtools()
);

export default store;