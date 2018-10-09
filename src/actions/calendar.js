import { createAction } from 'redux-actions';

const setCalendarPreferences = createAction('SET_CALENDAR_PREFERENCES', (data) => { data });

export {
  setCalendarPreferences
};
