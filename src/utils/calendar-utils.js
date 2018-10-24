import moment from 'moment';
import 'moment-timezone';

import {
  HOURS_PER_DAY,
} from "../../config";

import {
  FORMAT_dddd,
  FORMAT_MMMM_D_YYYY,
} from "../constants";

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

export const returnError = (name, args) => {
  console.log(`${name} method is expecting argument "${args}"!!!!!`);
  return null;
};


