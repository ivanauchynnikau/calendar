import React from 'react';
import connect from "react-redux/es/connect/connect";


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