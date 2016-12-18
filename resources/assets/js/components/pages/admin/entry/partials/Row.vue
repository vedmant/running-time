<template>
  <tr>
    <td>
      <router-link v-if="row.user" :to="'/admin/user/show/' + row.user.id">{{ row.user.name }}</router-link>
    </td>
    <td>{{ formatDate(row.date) }}</td>
    <td>{{ row.distance }} km</td>
    <td>{{ row.time }}</td>
    <td>{{ Number(row.speed).toFixed(2) }} km/h</td>
    <td>{{ Number(row.pace).toFixed(2) }} min/km</td>
    <td>
      <router-link class="btn btn-primary btn-xs" :to="'/admin/entry/edit/' + row.id"><i class="glyphicon glyphicon-pencil"></i></router-link>
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

  },

}
</script>
