import React from 'react';

export class Day extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      dayHours,
      day,
      today
    } = this.props;

    let className = 'day';
    if (today.unix() === day.date) {
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
