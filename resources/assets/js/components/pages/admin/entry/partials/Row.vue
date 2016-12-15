<template>
  <tr>
    <td>
      <router-link v-if="row.user" :to="'/user/show/' + row.user.id">{{ row.user.name }}</router-link>
    </td>
    <td>{{ date }}</td>
    <td>{{ row.distance }} km</td>
    <td>{{ time }}</td>
    <td>{{ Number(row.speed).toFixed(2) }} km/h</td>
    <td>{{ Number(row.pace).toFixed(2) }} min/km</td>
    <td>
      <router-link class="btn btn-primary btn-xs" :to="'/entry/edit/' + row.id"><i class="glyphicon glyphicon-pencil"></i></router-link>
      <button class="btn btn-danger btn-xs" @click="$emit('onDelete', row.id)"><i class="glyphicon glyphicon-remove"></i></button>
    </td>
  </tr>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import moment from 'moment';

export default {

  props: {
    row: {
      type: Object,
      required: true,
    }
  },

  computed: {
    date() {
      return moment(this.row.date).format('MM/DD/YYYY');
    },
    time() {
      const duration = moment.duration(parseInt(this.row.time), 'seconds');
      const hours = Math.floor(duration.asHours());

      return (hours ? hours + ':' : '')
        + _.padStart(duration.minutes(), 2, '0')
        + ':' + _.padStart(duration.seconds(), 2, '0');
    }
  },

}
</script>
