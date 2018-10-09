import { initialState } from './../initialState';

export default (state = initialState, action) => {
  switch(action.type) {
    case 'INIT':
      return {
        ...state,
        events: action.data.events,
        todayDateStr: action.data.todayDateStr,
        todayISOCode: action.data.todayISOCode,
        dayHours: action.data.dayHours,
        weekDays: action.data.weekDays,
      };
    default:
      return initialState;
  }
};