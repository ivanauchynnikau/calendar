import moment from "moment";
import {HOURS_PER_DAY, LOCALE, MOMENT_JS_CONFIG} from "../../config";
import {
  FORMAT_HH_mm,
  FORMAT_dddd,
  FORMAT_MMMM_D_YYYY
} from "../constants";

export const setPreferences = () => {
  moment.locale(LOCALE, MOMENT_JS_CONFIG);
};

export const createDayHours = () => {
  let hoursPerDay = HOURS_PER_DAY;
  let oneDayHoursArray = [];
  let formattedTime = [];

  for (let i = 1; i < hoursPerDay + 1; i++) {
    formattedTime = (moment('2001-01-01').subtract(i, 'hours')).format(FORMAT_HH_mm);
    oneDayHoursArray.unshift(formattedTime);
  }

  return oneDayHoursArray;
};

export const createWeekDays = () => {
  const date = moment();
  const dayIndex = date.startOf('day').day();
  let weekDays = [];

  if (dayIndex !== 0) date.subtract(dayIndex, 'days');

  for (let i = 0; i < 7; i++) {
    weekDays.push({
      name: date.format(FORMAT_dddd),
      date: date.add(1, 'day').toISOString(),
      formattedDate: date.format(FORMAT_MMMM_D_YYYY),
    })
  }

  return weekDays;
};

export const getStartEndDateForPeriod = (periodType, momentDate) => {
  let result = {};

  switch (periodType) {
    case 'week':
      const dayIndex = momentDate.day();

      if (dayIndex !== 0) {
        result.start = momentDate.subtract(dayIndex, 'days').toISOString();
      } else {
        result.start = momentDate.toISOString();
      }

      result.end = momentDate.add(7, 'days').toISOString();
      break;

    case 'day':
      result.start = momentDate.startOf('day').toISOString();
      result.end = momentDate.endOf('day').toISOString();
      break;

    default:
      return null;
  }

  return result;
};

export const getEventsForPeriod = (periodType, momentDate, events) => {
  const period = getStartEndDateForPeriod(periodType, momentDate);
  const result = [];

  events.forEach((event) => {
    if (moment(event.startDate).isAfter(period.start) && moment(event.startDate).isBefore(period.end)) {
      result.push(event);
    }
  });

  return result;
};
