import moment from 'moment-mini'
import padStart from 'lodash/padStart'

export default {
  methods: {
    range(begin, end) {
      begin = Number.parseInt(begin)
      end = Number.parseInt(end)

      const result = []

      if (begin < end) {
        for (let i = begin; i <= end; i++) {
          result.push(i)
        }
      } else {
        for (let i = begin; i >= end; i--) {
          result.push(i)
        }
      }

      return result
    },

    secondsToTime(seconds) {
      const duration = moment.duration(Number.parseInt(seconds), 'seconds')
      const hours = Math.floor(duration.asHours())

      return `${(hours ? `${hours  }:` : '') +
        padStart(duration.minutes(), 2, '0') 
        }:${  padStart(duration.seconds(), 2, '0')}`
    },

    formatDate(date) {
      return moment(date).format('MM/DD/YYYY')
    },
  },
}
