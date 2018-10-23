import React from 'react';
import { Event } from './Event';
import {
  getEventsForCurrentHour
} from "../../../../utils/calendar-utils";

import {
  EVENT_PADDING,
  HOUR_CELL_HEIGHT
} from "../../../../../config";

export class Hour extends React.Component {
  constructor(props) {
    super(props);

    this.addEvent = this.addEvent.bind(this);
  }

  addEvent() {
    console.log('add event for time:', this.props.date.time);
  }

  render() {
    const {
      date,
      events
    } = this.props;

    const hourEvents = getEventsForCurrentHour( date.time, events);

    return (
      <div className="hour" style={{ padding: `${EVENT_PADDING}px`, height: `${HOUR_CELL_HEIGHT}px` }}>
        <div className="hour__events" >
          {hourEvents.map((event, index) => {
            return (
              <Event
                key={index}
                event={event}
              />
            )
          })}
        </div>
        <button className="hour__add-event-btn" onClick={this.addEvent}>+</button>
      </div>
    );
  }
}
