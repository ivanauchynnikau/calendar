import { initialState } from './../initialState';

export default (state = initialState, action) => {
  switch(action.type) {
    case 'INIT':
      return {
        ...state,
        events: action.data.events,
      };
    default:
      return initialState;
  }
};
