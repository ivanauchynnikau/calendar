import React from 'react';
import cn from 'classnames'
import { Hour } from '../Hour';

import {
  getEventsForPeriod,
  createDayHours,
  getTodayStartOfDayDate,
} from './../../utils/calendar-utils';

export class Day extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      day,
      events
    } = this.props;

    const dayHours = createDayHours(day.date);
    const dayEvents = getEventsForPeriod('day', day.date, events);

    let dayClassNames = cn('day', {
      '_current-day' : getTodayStartOfDayDate() === day.date
    });

    return (
      <div className={dayClassNames}>
        <div className="day__header">
          <div className="day__day-name">{day.name}</div>
          <div className="day__date">{day.formattedDate}</div>
        </div>
        <div className="day__hours-container">
          {dayHours.map((date, index) => {
            return (
              <Hour
                key={index}
                date={date}
                events={dayEvents}/>
            )
          })}
        </div>
      </div>
    );
  }
}