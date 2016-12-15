<template>
  <div class="container">
    <h3>Time Entries</h3>
    <hr>

    <p class="text-right">
      <span class="page-info">Page {{ entries.current_page }} of  {{ entries.last_page }}</span>
      <router-link class="btn btn-primary" to="/entry/new">Add new Entry</router-link>
    </p>

    <div class="panel panel-default">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th>Date</th>
          <th>Distance</th>
          <th>Time</th>
          <th>Avg. Speed</th>
          <th>Avg. Pace</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <row v-for="entry in entries.data" :row="entry" @onDelete="onDelete"></row>
        </tbody>
      </table>
    </div>

    <div class="text-right" v-if="entries.last_page > 1">
      <ul class="pagination marginpulltop15">
        <li v-for="page in range(1, entries.last_page)" :class="{active: page == entries.current_page}">
          <a href="#" @click.prevent="loadEntries(page)">{{ page }}</a>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {

  components: {
    row: require('./partials/Row.vue'),
  },

  data() {
    return {
      showAddNew: false,
    };
  },

  mounted() {
    this.loadEntries(this.entries.current_page || 1);
  },

  computed: {
    ...mapState([
      'entries',
    ])
  },

  methods: {

    ...mapActions([
      'loadEntries',
      'deleteEntry',
    ]),

    onDelete(id) {
      this.deleteEntry(id).then(() => { this.loadEntries(this.entries.current_page || 1); });
    },

  }
}
</script>
