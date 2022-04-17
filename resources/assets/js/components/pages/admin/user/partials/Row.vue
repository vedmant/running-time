<template>
  <tr :id="`user-row-${row.id}`">
    <td>
      <RouterLink :to="'/admin/user/show/' + row.id">{{ row.name }}</RouterLink>
    </td>
    <td>{{ row.email }}</td>
    <td>{{ row.role }}</td>
    <td>{{ createdAt }}</td>
    <td>
      <RouterLink class="btn btn-primary btn-xs" :to="'/admin/user/edit/' + row.id">
        <i class="glyphicon glyphicon-pencil" /></RouterLink>
      <button class="btn btn-danger btn-xs" @click="$emit('onDelete', row.id)">
        <i class="glyphicon glyphicon-remove" /></button>
    </td>
  </tr>
</template>

<script>
import moment from 'moment-mini'

export default {

  props: {
    row: {
      type: Object,
      required: true,
    },
  },

  computed: {
    createdAt () {
      return moment(this.row.date).format('MM/DD/YYYY HH:mm:ss')
    },
  },

}
</script>
