import React from 'react';
import moment from 'moment';
import axios from 'axios';
import {connect} from 'react-redux';
import {Day} from './Day';

import EVENTS from './../../../EVENTS';

import {
  FORMAT_HH_mm,
  FORMAT_LL,
} from '../../constants'

import { HOUR_CELL_HEIGHT } from "../../../config";

import {
  createDayHours,
  createWeekDays,
  getEventsForPeriod,
  getTodayStartOfDayDate,
  getTodayDate,
  toggleLoader,
} from './../../utils/calendar-utils';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    toggleLoader(true);
    axios.get('https://private-13395-calendar38.apiary-mock.com/week-events')
      .then((response) => {
        console.log('week events - ', response.data);

        const { initStore } = this.props;
        initStore({ weekEvents: response.data });
      })
      .catch( (error) => {
        console.log('can\'t get week events from the server, error - ', error);
      }).then(() => {
        toggleLoader(false);
    });


    // TO GET DATA from EVENTS.js uncomment this
    //const { initStore } = this.props;
    //initStore({ weekEvents: EVENTS });

  }

  render() {
    const {
      weekEvents
    } = this.props;

    if (!weekEvents.length) return null;


    const weekDays = createWeekDays();
    const todayDate = getTodayDate();
    const todayDateDayStart = getTodayStartOfDayDate();
    const dayHours = createDayHours(todayDateDayStart);
    const events = getEventsForPeriod('week', todayDateDayStart, weekEvents);

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