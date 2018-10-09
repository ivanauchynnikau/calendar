import React from 'react';


export class Day extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      dayHours,
      day,
    } = this.props;

    return (
      <div className="day">
        <div className="day__header">
          <div className="day__date">{day}</div>
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
