<template>
  <tr>
    <td>{{ formatDate(row.date) }}</td>
    <td>{{ row.distance }} km</td>
    <td>{{ row.time }}</td>
    <td>{{ Number(row.speed).toFixed(2) }} km/h</td>
    <td>{{ Number(row.pace).toFixed(2) }} min/km</td>
    <td>
      <router-link class="btn btn-primary btn-xs" :to="'/entry/edit/' + row.id">
        <i class="glyphicon glyphicon-pencil"></i></router-link>
      <button class="btn btn-danger btn-xs" @click="$emit('onDelete', row.id)">
        <i class="glyphicon glyphicon-remove"></i></button>
    </td>
  </tr>
</template>

<script>
  export default {

    props: {
      row: {
        type: Object,
        required: true,
      }
    },

    computed: {},

  }
</script>
