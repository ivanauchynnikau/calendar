import React from 'react';
import EVENTS from './../../../EVENTS';
import { connect } from 'react-redux';
import { Day } from './Day';
import {
  calendarLoaded,
} from './../../actions/calendar';

import {
  getToday,
  setCalendarPreferences,
  formatDateToHumanReadable,
  createDayHours,
  createWeekDays,
} from './../../utils/calendar-utils';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setCalendarPreferences();

    // TODO add load from server, with setTimeout

    calendarInit({
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
      dayHours,
      weekDays,
    } = this.props;

    return (
      <div className="calendar">
        <div className="calendar__header">
          <h1 className="calendar__title">Calendar</h1>
          <h2 className="calendar__today">Today is: {todayDateStr}</h2>
        </div>
        <div className="calendar__container">
          <div className="calendar__hours-list">

          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = ({ calendar, calendarInit }) => {
  return {
    events: calendar.events,
    todayDateStr: calendar.todayDateStr,
    todayISODate: calendar.todayISODate,
    dayHours: calendar.dayHours,
    weekDays: calendar.weekDays,
    calendarInit
  }
};

export default connect(mapStateToProps)(Calendar);
