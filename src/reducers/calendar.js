import { initialState } from './../initialState';

export default (state = initialState, action) => {
  switch(action.type) {
    case 'INIT':
      return {
        ...state,
        weekEvents: action.data.weekEvents,
      };
    default:
      return initialState;
  }
};
