import moment from "moment";
import {HOURS_PER_DAY, LOCALE, MOMENT_JS_CONFIG} from "../../config";
import {FORMAT_LL, FORMAT_HH_mm} from "../constants/formats";

export const setPreferences = () => {
  moment.locale(LOCALE, MOMENT_JS_CONFIG);
};

export const getToday = () => {
  const todayISODate = moment().format();

  return todayISODate;
};

export const formatDateToHumanReadable = (dateISOString) => {
  const date = moment(dateISOString).format(FORMAT_LL);

  return date;
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
  const weekArray = moment.weekdays();

  return weekArray;
};
