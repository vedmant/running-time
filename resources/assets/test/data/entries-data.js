var moment = require('moment');

module.exports = {
  valid: {
    date: moment().format('MM/DD/YYYY'),
    distance: 6,
    time: '00:30:00',
    hours: '00',
    minutes: '30',
    seconds: '50',
  },
  invalid: {
    ate: moment().format('MM/DD/YYYY'),
    distance: 0,
    time: '00:00:00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  }
};
