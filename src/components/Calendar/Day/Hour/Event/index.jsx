import React from 'react';
import { MAX_EVENTS_PER_HOUR_LIMIT } from '../../../../../../config';
import { calculateEventHeight } from '../../../../../utils/calendar-utils'
export class Event extends React.Component {
  constructor(props) {
    super(props);

    this.getEventsStyles = this.getEventsStyles.bind(this);
  }

  getEventsStyles(index, event, isManyEvents) {
    let eventElementStyles = {};
    eventElementStyles = Object.assign(eventElementStyles, calculateEventHeight(event));

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
      isManyEvents
    } = this.props;

    return (
      <div style={this.getEventsStyles(index, event, isManyEvents)} className="event">
        <div className="event__title">{event.name}</div>
        <div className="event__text">{event.description}</div>
      </div>
    );
  }
}
