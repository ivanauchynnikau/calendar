import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from './../../actions/calendar';
import { initialState } from './../initialState';

const calendarInit = handleActions({
  [actions.setCalendarPreferences](state = initialState, payload) {
    return {
      ...state,
        events: payload.events,
        todayISODate: payload.todayISODate,
        todayDateStr: payload.todayDateStr,
        dayHours: payload.dayHours,
        weekDays: payload.weekDays,
    };
  },
}, {});

export default combineReducers({
  calendarInit,
});
