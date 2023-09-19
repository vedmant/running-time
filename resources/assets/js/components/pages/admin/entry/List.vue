<template>
  <div>
    <h3>Time Entries</h3>
    <hr>

    <div class="row marginbot10">
      <div class="col-sm-6 filters">
        <div class="input-group">
          <span class="input-group-addon">From:</span>
          <input v-model="dateFrom" type="date" class="form-control date-filter" placeholder="Date from">
          <span class="input-group-addon">To:</span>
          <input v-model="dateTo" type="date" class="form-control date-filter" placeholder="Date to">
          <span class="input-group-btn">
            <button class="btn btn-primary" @click="onFilter">Filter</button>
          </span>
          <span class="input-group-btn">
            <button class="btn btn-default" @click="onFilterClear">Clear</button>
          </span>
        </div>
      </div>
      <div class="col-sm-6 text-right">
        <span class="page-info">Page {{ entries.current_page }} of  {{ entries.last_page }}</span>
      </div>
    </div>

    <div class="panel panel-default">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>User</th>
            <th>Date</th>
            <th>Distance</th>
            <th>Time</th>
            <th>Avg. Speed</th>
            <th>Avg. Pace</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <row v-for="entry in entries.data" :key="entry.id" :row="entry" @onDelete="onDelete" />
        </tbody>
      </table>
    </div>

    <div v-if="entries.last_page > 1" class="text-right">
      <ul class="pagination marginpulltop15">
        <li v-for="page in range(1, entries.last_page)" :key="page" :class="{active: page == entries.current_page}">
          <a href="#" @click.prevent="onLoadEntries(page)">{{ page }}</a>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import Row from './partials/Row.vue'

export default {

  components: {
    Row,
  },

  data () {
    return {
      dateFrom: '',
      dateTo: '',
    }
  },

  computed: {
    ...mapState({
      entries: state => state.all_entries.entries,
    }),

    params () {
      return {
        page: this.entries.current_page,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
      }
    },
  },

  mounted () {
    this.loadAllEntries(this.params)
  },

  methods: {

    ...mapActions([
      'loadAllEntries',
      'deleteEntry',
      'addToastMessage',
    ]),

    onLoadEntries (page) {
      this.loadAllEntries({ ...this.params, page })
    },

    onFilter () {
      this.loadAllEntries({ ...this.params, page: 1 })
    },

    onFilterClear () {
      this.dateFrom = ''
      this.dateTo = ''
      this.loadAllEntries(this.params)
    },

    onDelete (id) {
      this.deleteEntry(id).then(() => {
        this.addToastMessage({
          text: 'Entry was deleted!',
          type: 'success',
        })
        this.loadAllEntries(this.params)
      })
    },

  },
}
</script>
