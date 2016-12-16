import Vue from 'vue';
import moment from 'moment';


Vue.mixin({
  methods: {
    range(begin, end) {
      var offset = begin > end ? end : begin;
      var delta = Math.abs(end - begin);
      var result = [];
      for (var i = 0; i <= delta; i++) {
        result.push(i + offset);
      }

      return result;
    },

    secondsToTime(seconds) {
      const duration = moment.duration(parseInt(seconds), 'seconds');
      const hours = Math.floor(duration.asHours());

      return (hours ? hours + ':' : '')
        + _.padStart(duration.minutes(), 2, '0')
        + ':' + _.padStart(duration.seconds(), 2, '0');
    },

    formatDate(date) {
      return moment(date).format('MM/DD/YYYY');
    }
  }
});