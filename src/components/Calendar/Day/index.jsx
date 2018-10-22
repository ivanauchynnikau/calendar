import React from 'react';
import moment from 'moment';

import {
  getEventsForPeriod,
} from './../../../utils/calendar-utils';

export class Day extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      dayHours,
      day,
      today,
      events
    } = this.props;



    const dayEvents = getEventsForPeriod('day', moment(day.date), events);
    console.log('events for current day - ', day.formattedDate, dayEvents);



    //TODO fix detect current day logic!!!!!

    let className = 'day';
    console.log(today.toISOString());
    console.log(day.date);

    if (today.toISOString() === day.date) {
      className += ' _current-day';
    }

    return (
      <div className={className}>
        <div className="day__header">
          <div className="day__day-name">{day.name}</div>
          <div className="day__date">{day.formattedDate}</div>
        </div>
        <div className="day__hours-container">
          {dayHours.map((hour, index) => {
            return (
              <div key={index} className="day__hour">

              </div>
            )
          })}
        </div>
      </div>
    );
  }
}
