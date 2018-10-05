import React from 'react';
//import moment from 'moment';
import DATA from './../../../DATA';
import { connect } from 'react-redux';


class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { onLoad } = this.props;
    // TODO add load from server, with setTimeout
    onLoad(DATA);
  }

  render() {
    const {events} = this.props;

    return (
      <div className="calendar">
        <h1 className="calendar__title">Calendar</h1>
        <h2 className="calendar__today">TODAY</h2>
        <div className="calendar__week">
          {events.map((event, index) => {
            return (
              <div key={index} className="event">
                <div className="event__name">
                  { event.name }
                </div>
                <div className="event__start">
                  { event.startDate }
                </div>
                <div className="event__end">
                  { event.endDate }
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.calendar.events,
});

const mapDispatchToProps = dispatch => ({
  onLoad: data => dispatch({type: 'CALENDAR_LOADED', data})
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);