import React from 'react';
import { Event } from './Event';
import moment from "moment";

import {
  getStartEndDateForPeriod,
  returnError,
} from "../../../../utils/calendar-utils";

import {
  EVENT_PADDING,
  HOUR_CELL_HEIGHT,
  MAX_EVENTS_PER_HOUR_LIMIT,
} from "../../../../../config";


export class Hour extends React.Component {
  constructor(props) {
    super(props);

    this.getEventsContainerClassNames = this.getEventsContainerClassNames.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }

  addEvent() {
    console.log('add event for time:', this.props.date.time);
  }

  getEventsContainerClassNames(events) {
    let eventsContainerClassNames = 'hour__events';

    if (events.length > MAX_EVENTS_PER_HOUR_LIMIT) {
      eventsContainerClassNames += '  __many-events';
    }

    return eventsContainerClassNames;
  }

  getEventsForCurrentHour (date, events) {
    if (!events || !date) return returnError('getEventsForCurrentHour', '"events" and "date"');

    const period = getStartEndDateForPeriod('hour', date);
    const result = [];

    events.forEach((event) => {
      const isEventStartsInCurrentHour =
        moment(event.startDate).isBefore(moment(period.endHour))  // is event start before current hour ends
        && (   moment(event.startDate).isAfter(moment(period.startHour))  // is event starts after current hour starts
        || moment(event.startDate).isSame(moment(period.startHour))); // is event start in the same time that hour start

      const isEventEndsInCurrentDay =
        (moment(event.endDate).isBefore(moment(period.endDay))  // is event ends before day ends
          || moment(event.endDate).isSame(moment(period.endDay)));  // is event ends in the same time that day ends


      if (isEventStartsInCurrentHour && isEventEndsInCurrentDay) {
        result.push(event);
      }
    });

    return result;
  };

  render() {
    const {
      date,
      events,
    } = this.props;

    const eventsList = this.getEventsForCurrentHour( date.time, events);

    return (
      <div className="hour" style={{ padding: `${EVENT_PADDING}px`, height: `${HOUR_CELL_HEIGHT}px` }}>
        <div className={this.getEventsContainerClassNames(events)} >
          {eventsList.map((event, index) => {
            return (
              <Event
                key={index}
                event={event}
                date={date.time}
                index={index}
                isManyEvents={eventsList.length > MAX_EVENTS_PER_HOUR_LIMIT}
              />
            )
          })}
        </div>
        <button className="hour__add-event-btn" onClick={this.addEvent}>+</button>
      </div>
    );
  }
}
