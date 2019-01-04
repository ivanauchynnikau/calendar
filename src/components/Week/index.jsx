import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import { Day } from '../Day';

import {
  FORMAT_HH_mm,
  FORMAT_LL,
} from '../../constants'

import {
  HOUR_CELL_HEIGHT,
  WEEK_EVENTS_ENDPOINT
} from "../../../config";

import {
  createDayHours,
  createWeekDays,
  getEventsForPeriod,
  getTodayStartOfDayDate,
  getTodayDate,
} from './../../utils/calendar-utils';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.getTodayFormattedDate = this.getTodayFormattedDate.bind(this);
    this.getCalendarHourStyles = this.getCalendarHourStyles.bind(this);
  }

  componentDidMount() {
    const {
      initStore,
    } = this.props;

    axios.get(WEEK_EVENTS_ENDPOINT)
      .then((response) => {
        initStore({ weekEvents: response.data });
      })
      .catch( (error) => {
        console.log('can\'t get week events from the server, error - ', error);
      }).then(() => {

    });
  }

  getTodayFormattedDate () {
    const result = moment(getTodayDate()).format(FORMAT_LL);

    return result;
  }

  getCalendarHourStyles () {
    const result = { minHeight: `${HOUR_CELL_HEIGHT}px` };

    return result;
  }

  render() {
    const {
      weekEvents,
    } = this.props;

    if (!weekEvents.length) return null;

    const weekDays = createWeekDays();
    const todayDateDayStart = getTodayStartOfDayDate();
    const dayHours = createDayHours(todayDateDayStart);
    const events = getEventsForPeriod('week', todayDateDayStart, weekEvents);

    return (
      <div className="calendar">
        <div className="calendar__header">
          <h1 className="calendar__title">Calendar</h1>
          <h2 className="calendar__today">Today is: {this.getTodayFormattedDate()}</h2>
        </div>
        <div className="calendar__container">
          <div className="calendar__hours-list">
            {dayHours.map((hour, index) => {
              return (
                <div key={index} className="calendar__hour" style={this.getCalendarHourStyles()}>
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
                  events={events}
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
    weekEvents: state.calendar.weekEvents,
  }
};

const mapDispatchToProps = dispatch => ({
  initStore: data => dispatch({type: 'INIT', data}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);