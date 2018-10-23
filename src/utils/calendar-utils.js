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
  if (!periodType || !date) {
    console.log('getEventsForCurrentHour method is expecting arguments "periodType" and "date"!!!!!');
    return null;
  }


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
  if (!periodType || !date || !events) {
    console.log('getEventsForCurrentHour method is expecting arguments "periodType" and "events" and "date"!!!!!');
    return null;
  }

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
  if (!events || !date) {
    console.log('getEventsForCurrentHour method is expecting arguments "events" and "date"!!!!!');
    return null;
  }

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
  if (!event) {
    console.log('calculateEventHeight method is expecting argument "event"!!!!!');
    return null;
  }

  let elementHeight;
  const eventDurationMinutes = Math.abs(moment(event.startDate).diff(moment(event.endDate), 'minutes'));

  if (eventDurationMinutes < 20) { //set minimal height for event, if event duration less than 20 minutes
    elementHeight = HOUR_CELL_HEIGHT /2;
  }

  if (MINUTES_PER_HOUR - (eventDurationMinutes % MINUTES_PER_HOUR) < 5) {
    elementHeight = eventDurationMinutes * HOUR_CELL_HEIGHT / MINUTES_PER_HOUR - EVENT_PADDING * 2;
  } else {
    elementHeight = eventDurationMinutes * HOUR_CELL_HEIGHT / MINUTES_PER_HOUR;
  }

  const result = {
    height: `${elementHeight}px`
  };

  return result;
};


