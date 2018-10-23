import React from 'react';
import EVENTS from './../../../EVENTS';
import moment from 'moment';
import {connect} from 'react-redux';
import {Day} from './Day';
import {
  FORMAT_HH_mm,
  FORMAT_LL,
} from '../../constants'

import {
  setPreferences,
  createDayHours,
  createWeekDays,
  getEventsForPeriod,
  getTodayStartOfDayDate,
  getTodayDate
} from './../../utils/calendar-utils';
import { HOUR_CELL_HEIGHT } from "../../../config";


class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    setPreferences();

    const { initStore } = this.props;

    initStore({
      events: EVENTS,
      weekDays: createWeekDays(),
    });
  }

  render() {
    const {
      weekDays,
    } = this.props;

    const todayDate = getTodayDate();
    const todayDateDayStart = getTodayStartOfDayDate();
    const dayHours = createDayHours(todayDateDayStart);

    const weekEvents = getEventsForPeriod('week', todayDateDayStart, EVENTS);

    return (
      <div className="calendar">
        <div className="calendar__header">
          <h1 className="calendar__title">Calendar</h1>
          <h2 className="calendar__today">Today is: {moment(todayDate).format(FORMAT_LL)}</h2>
        </div>
        <div className="calendar__container">
          <div className="calendar__hours-list">
            {dayHours.map((hour, index) => {
              return (
                <div key={index} className="calendar__hour" style={{ minHeight: `${HOUR_CELL_HEIGHT}px` }}>
                  {moment(hour.time).format(FORMAT_HH_mm)}
                </div>
              )
            })}
          </div>
          <div className="calendar__days">
            {weekDays.map((day, index) => {
              return (
                <Day
                  key={index}
                  events={weekEvents}
                  day={day}
                  dayHours={dayHours}/>
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
    weekDays: state.calendar.weekDays,
  }
};

const mapDispatchToProps = dispatch => ({
  initStore: data => dispatch({type: 'INIT', data}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
