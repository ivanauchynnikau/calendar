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
    formattedTime = (moment().subtract(i, 'hours')).format(FORMAT_HH_mm);
    oneDayHoursArray.unshift(formattedTime);
  }

  return oneDayHoursArray;
};

export const createWeekDays = () => {
  const date = moment();
  const dayIndex = date.day();
  let weekDays = [];

  if (dayIndex !== 0) date.subtract(dayIndex, 'days');

  for (let i = 0; i < 7; i++) {
    weekDays.push({
      name: date.format(FORMAT_dddd),
      date: date.add(1, 'day').unix(),
      formattedDate: date.format(FORMAT_MMMM_D_YYYY),
    })
  }

  return weekDays;
};
