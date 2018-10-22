import React from 'react';
import EVENTS from './../../../EVENTS';
import {connect} from 'react-redux';
import {Day} from './Day';
import {FORMAT_LL} from '../../constants'
import moment from 'moment';

import {
  setPreferences,
  createDayHours,
  createWeekDays,
  getEventsForPeriod,
} from './../../utils/calendar-utils';


class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    setPreferences();

    const {initStore} = this.props;

    initStore({
      events: EVENTS,
      todayDate: moment(),
      dayHours: createDayHours(),
      weekDays: createWeekDays(),
    });
  }

  render() {
    const {
      weekDays,
      dayHours,
      todayDate,
    } = this.props;

    const date = moment(todayDate);
    const weekEvents = getEventsForPeriod('week', date, EVENTS);

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
                <div key={index} className="calendar__hour">
                  {hour}
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
                  today={todayDate}
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
    todayDate: state.calendar.todayDate,
    dayHours: state.calendar.dayHours,
    weekDays: state.calendar.weekDays,
  }
};

const mapDispatchToProps = dispatch => ({
  initStore: data => dispatch({type: 'INIT', data}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
