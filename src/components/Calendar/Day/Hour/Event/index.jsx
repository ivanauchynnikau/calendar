import React from 'react';
import { calculateEventHeight } from '../../../../../utils/calendar-utils'
export class Event extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      event
    } = this.props;

    return (
      <div style={calculateEventHeight(event)} className="event" data-start-time={event.startDate} data-end-time={event.endDate}>
        <div className="event__title">{event.name}</div>
        <div className="event__text">{event.description}</div>
      </div>
    );
  }
}
