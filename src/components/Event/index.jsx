import React from 'react';
import moment from "moment";

import {
  EVENT_PADDING,
  HOUR_CELL_HEIGHT,
  MAX_EVENTS_PER_HOUR_LIMIT,
  MINUTES_PER_HOUR,
} from '../../../config';

import {
  getStartEndDateForPeriod,
  returnError,
} from '../../utils/calendar-utils'

export class Event extends React.Component {
  constructor(props) {
    super(props);

    this.getEventsStyles = this.getEventsStyles.bind(this);
  }

  calculateEventHeight(event) {
    if (!event) if (!event) return returnError('calculateEventHeight', "event");

    let elementHeight;

    const eventDurationMinutes = Math.abs(moment(event.startDate).diff(moment(event.endDate), 'minutes'));
    const eventStartMinutesTime = moment(event.startDate).minute();

    if (eventDurationMinutes < 20) { //set height for event with duration less than 20 minutes
      elementHeight = HOUR_CELL_HEIGHT / 2;
    }

    if ((MINUTES_PER_HOUR - (eventDurationMinutes % MINUTES_PER_HOUR) < 5) && eventStartMinutesTime === 0 ) { // set event height for event with duration 1 hour +- 5 minutes
      elementHeight = eventDurationMinutes * HOUR_CELL_HEIGHT / MINUTES_PER_HOUR - EVENT_PADDING * 2;
    } else { // set event height for event with other duration
      elementHeight = eventDurationMinutes * HOUR_CELL_HEIGHT / MINUTES_PER_HOUR;
    }

    const roundedHeight = Math.round(elementHeight);
    const result = {
      height: `${roundedHeight}px`
    };

    return result;
  };

  calculateEventTopOffset(event, date) {
    if (!event) return returnError('calculateEventHeight', "event");

    const period = getStartEndDateForPeriod('hour', date);

    let topOffset = 0;

    if (!(moment(event.startDate).isSame(moment(period.startHour)))) {
      const eventStartOffsetMinutes = Math.abs(moment(event.startDate).diff(moment(period.startHour), 'minutes'));

      topOffset = eventStartOffsetMinutes * HOUR_CELL_HEIGHT / MINUTES_PER_HOUR - EVENT_PADDING;
    }

    const roundedTopOffset = Math.round(topOffset);

    const result = {
      top: `${Math.round(roundedTopOffset)}px`,
      position: 'relative',
    };

    return result;
  };

  getEventsStyles(index, event, isManyEvents, date) {
    let eventElementStyles = {};

    eventElementStyles = Object.assign(eventElementStyles, this.calculateEventHeight(event));
    eventElementStyles = Object.assign(eventElementStyles, this.calculateEventTopOffset(event, date));

    if (isManyEvents) {
      eventElementStyles = Object.assign(eventElementStyles, {
        zIndex: index + 1,
        maxWidth: (100 - 10) / MAX_EVENTS_PER_HOUR_LIMIT,
        position: 'relative',
        left: this.calculateLeftOffsetPosition(index),
      });
    }

    return eventElementStyles;
  }

  calculateLeftOffsetPosition (index) {
    if (index !== 0) {
      return `-${index * 75}px`
    }
  }

  render() {
    const {
      event,
      index,
      date,
      isManyEvents
    } = this.props;

    return (
      <div style={this.getEventsStyles(index, event, isManyEvents, date)} className="event">
        <div className="event__title">{event.name}</div>
        <div className="event__text">{event.description}</div>
      </div>
    );
  }
}
