import React from 'react';
import { Event } from './Event';
import {
  getEventsForCurrentHour
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

  render() {
    const {
      date,
      events
    } = this.props;

    const eventsList = getEventsForCurrentHour( date.time, events);

    return (
      <div className="hour" style={{ padding: `${EVENT_PADDING}px`, height: `${HOUR_CELL_HEIGHT}px` }}>
        <div className={this.getEventsContainerClassNames(events)} >
          {eventsList.map((event, index) => {
            return (
              <Event
                key={index}
                event={event}
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
