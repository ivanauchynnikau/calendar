import moment from 'moment';

export default [
  {
    name: 'EVENT 1 2018-10-23',
    startDate: moment('2018-10-23 18:00').format(), // ISO DateTime String
    endDate: moment('2018-10-23 20:00').format(), // ISO DateTime String
  }, {
    name: 'EVENT 2 2018-10-23',
    startDate: moment('2018-10-23 21:00').format(), // ISO DateTime String
    endDate: moment('2018-10-23 23:30').format(), // ISO DateTime String
  }, {
    name: 'EVENT 3 2018-10-24',
    startDate: moment('2018-10-24 10:00').format(), // ISO DateTime String
    endDate: moment('2018-10-24 23:30').format(), // ISO DateTime String
  }, {
    name: 'EVENT 4 2018-10-25',
    startDate: moment('2018-10-25 00:00').format(), // ISO DateTime String
    endDate: moment('2018-10-25 23:00').format(), // ISO DateTime String
  }, {
    name: 'EVENT 5 2018-10-26',
    startDate: moment('2018-10-26 11:00').format(), // ISO DateTime String
    endDate: moment('2018-10-26 12:00').format(), // ISO DateTime String
  }, {
    name: 'EVENT 6 2018-11-26',
    startDate: moment('2018-11-26 11:00').format(), // ISO DateTime String
    endDate: moment('2018-11-26 12:00').format(), // ISO DateTime String
  }
];
