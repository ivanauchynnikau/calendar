import { createStore, combineReducers } from 'redux';

import { calendar } from './reducers';

const reducers = combineReducers({
  calendar,
});

const store = createStore(reducers);

export default store;