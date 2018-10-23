import moment from 'moment';
import 'moment-timezone';

import {
  HOURS_PER_DAY,
  LOCALE,
  MOMENT_JS_CONFIG,
  HOUR_CELL_HEIGHT,
  MINUTES_PER_HOUR,
  EVENT_PADDING,
} from "../../config";

import {
  FORMAT_dddd,
  FORMAT_MMMM_D_YYYY,
} from "../constants";

export const setPreferences = () => {
  moment.locale(LOCALE, MOMENT_JS_CONFIG);
};

export const getTodayDate = () => {
  const todayDate = moment().format();

  return todayDate;
};

export const getTodayStartOfDayDate = () => {
  const todayMomentDate = getTodayDate();
  const result = moment(todayMomentDate).startOf('day').format();

  return result;
};

export const createDayHours = (date) => {
  if (!date) {
    console.log('getEventsForCurrentHour method is expecting arguments "date"!!!!!');
    return null;
  }


  let momentDate = moment(date);
  let hoursPerDay = HOURS_PER_DAY;
  let oneDayHoursArray = [];

  for (let i = 1; i < hoursPerDay + 1; i++) {
    oneDayHoursArray.push({
      time: momentDate.format(),
    });

    momentDate.add(1, 'hour');
  }

  return oneDayHoursArray;
};

export const createWeekDays = () => {
  const date = getTodayDate();
  const momentDate = moment(date);
  const dayIndex = momentDate.startOf('day').day();
  let weekDays = [];

  if (dayIndex !== 0) momentDate.subtract(dayIndex, 'days');

  for (let i = 0; i < 7; i++) {
    weekDays.push({
      name: momentDate.format(FORMAT_dddd),
      date: momentDate.add(1, 'day').format(),
      formattedDate: momentDate.format(FORMAT_MMMM_D_YYYY),
    })
  }

  return weekDays;
};

export const getStartEndDateForPeriod = (periodType, date) => {
  if (!periodType || !date ) return returnError('getEventsForCurrentHour', '"periodType" and "date"');

  const momentDate = moment(date);
  let result = {};

  switch (periodType) {
    case 'week':
      const dayIndex = momentDate.day();

      if (dayIndex !== 0) {
        result.start = momentDate.subtract(dayIndex, 'days').format();
      } else {
        result.start = momentDate.format();
      }

      result.end = momentDate.add(7, 'days').format();
      break;

    case 'day':
      result.start = momentDate.startOf('day').format();
      result.end = momentDate.endOf('day').format();
      break;

    case 'hour':
      result.startHour = momentDate.format();
      result.endHour = momentDate.add(1, 'hour').subtract(1, 'second').format();
      result.endDay = momentDate.endOf('day').format();
      break;

    default:
      return null;
  }

  return result;
};

export const getEventsForPeriod = (periodType, date, events) => {
  if (!periodType || !date || !events) return returnError('getEventsForCurrentHour', '"periodType" and "events" and "date"');

  const period = getStartEndDateForPeriod(periodType, date);
  const result = [];

  events.forEach((event) => {
    if ((moment(event.startDate).isAfter(moment(period.start)) || moment(event.startDate).isSame(moment(period.start)))
      && moment(event.startDate).isBefore(moment(period.end))
      && moment(event.endDate).isAfter(moment(period.start))
      && (moment(event.endDate).isBefore(moment(period.end)) || moment(event.endDate).isSame(moment(period.end)))
    ) {
      result.push(event);
    }
  });

  return result;
};

export const getEventsForCurrentHour = (date, events) => {
  if (!events || !date) return returnError('getEventsForCurrentHour', '"events" and "date"');

  // console.log('date', date);

  const period = getStartEndDateForPeriod('hour', date);
  const result = [];

  // console.log('period',period.startHour.split('T')[1],'---', period.endHour.split('T')[1],'---', period.endDay.split('T')[1] );

  events.forEach((event) => {
    const isEventStartsInCurrentHour =
      moment(event.startDate).isBefore(moment(period.endHour))  // is event start before current hour ends
      && (   moment(event.startDate).isAfter(moment(period.startHour))  // is event starts after current hour starts
          || moment(event.startDate).isSame(moment(period.startHour))); // is event start in the same time that hour start

    const isEventEndsInCurrentDay =
      (moment(event.endDate).isBefore(moment(period.endDay))  // is event ends before day ends
        || moment(event.endDate).isSame(moment(period.endDay)));  // is event ends in the same time that day ends

    // console.log(event);
    // console.log( 'isEventStartInCurrentHour', isEventStartsInCurrentHour );
    // console.log( 'isEventEndsInCurrentDay', isEventEndsInCurrentDay );

    if (isEventStartsInCurrentHour && isEventEndsInCurrentDay) {
      result.push(event);
    }
  });

  return result;
};

export const calculateEventHeight = (event) => {
  if (!event) if (!event) return returnError('calculateEventHeight', "event");


  let elementHeight;
  const eventDurationMinutes = Math.abs(moment(event.startDate).diff(moment(event.endDate), 'minutes'));

  if (eventDurationMinutes < 20) { //set height for event with duration less than 20 minutes
    elementHeight = HOUR_CELL_HEIGHT / 2;
  }

  if (MINUTES_PER_HOUR - (eventDurationMinutes % MINUTES_PER_HOUR) < 5) { // set event height for event with duration 1 hour +- 5 minutes
    elementHeight = eventDurationMinutes * HOUR_CELL_HEIGHT / MINUTES_PER_HOUR - EVENT_PADDING * 2;
  } else { // set event height for event with other duration
    elementHeight = eventDurationMinutes * HOUR_CELL_HEIGHT / MINUTES_PER_HOUR;
  }

  const result = {
    height: `${Math.round(elementHeight)}px`
  };

  return result;
};

export const calculateEventTopOffset = (event, date) => {
  if (!event) return returnError('calculateEventHeight', "event");

  const period = getStartEndDateForPeriod('hour', date);

  let topOffset = 0;

  if (!(moment(event.startDate).isSame(moment(period.startHour)))) {
    const eventStartOffsetMinutes = Math.abs(moment(event.startDate).diff(moment(period.startHour), 'minutes'));

    topOffset = eventStartOffsetMinutes * HOUR_CELL_HEIGHT / MINUTES_PER_HOUR - EVENT_PADDING * 2;
  }

  const result = {
    top: `${Math.round(topOffset)}px`,
    position: 'relative',
  };

  return result;
};




export const returnError = (name, args) => {
  console.log(`${name} method is expecting argument "${args}"!!!!!`);
  return null;
};


