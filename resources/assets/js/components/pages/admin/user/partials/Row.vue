<template>
  <tr>
    <td>
      <router-link :to="'/admin/user/show/' + row.id">{{ row.name }}</router-link>
    </td>
    <td>{{ row.email }}</td>
    <td>{{ row.role }}</td>
    <td>{{ createdAt }}</td>
    <td>
      <router-link class="btn btn-primary btn-xs" :to="'/admin/user/edit/' + row.id">
        <i class="glyphicon glyphicon-pencil"></i></router-link>
      <button class="btn btn-danger btn-xs" @click="$emit('onDelete', row.id)">
        <i class="glyphicon glyphicon-remove"></i></button>
    </td>
  </tr>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import moment from 'moment-mini';

  export default {

    props: {
      row: {
        type: Object,
        required: true,
      }
    },

    computed: {
      createdAt() {
        return moment(this.row.date).format('MM/DD/YYYY HH:mm:ss');
      },
    },

  }
</script>
