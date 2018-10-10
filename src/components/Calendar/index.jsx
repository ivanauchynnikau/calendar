import React from 'react';
import EVENTS from './../../../EVENTS';
import { connect } from 'react-redux';
import { Day } from './Day';
import moment from 'moment';

import {
  getToday,
  setPreferences,
  formatDateToHumanReadable,
  createDayHours,
  createWeekDays,
} from './../../utils/calendar-utils';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    setPreferences();

    const { initStore } = this.props;

    initStore({
      events: EVENTS,
      todayISODate: getToday(),
      todayDateStr: formatDateToHumanReadable(),
      dayHours: createDayHours(),
      weekDays: createWeekDays(),
    });
  }

  render() {
    const {
      todayDateStr,
      weekDays,
      dayHours,
    } = this.props;

    return (
      <div className="calendar">
        <div className="calendar__header">
          <h1 className="calendar__title">Calendar</h1>
          <h2 className="calendar__today">Today is: {todayDateStr}</h2>
        </div>
        <div className="calendar__container">
          <div className="calendar__hours-list">
            {dayHours.map((hour, index) => {
              return (
                <div key={index} className="calendar__hour">
                  {hour}
                </div>
              )
            })}
          </div>
          <div className="calendar__days">
            {weekDays.map((day, index) => {
              return (
                <Day key={index} day={day} dayHours={dayHours}/>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.calendar.events,
    todayDateStr: state.calendar.todayDateStr,
    todayISODate: state.calendar.todayISODate,
    dayHours: state.calendar.dayHours,
    weekDays: state.calendar.weekDays,
  }
};

const mapDispatchToProps = dispatch => ({
  initStore: data => dispatch({ type: 'INIT', data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
