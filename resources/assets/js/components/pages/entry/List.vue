<template>
  <div class="container">
    <h3>Time Entries</h3>
    <hr>

    <div class="row marginbot10">
      <div class="col-sm-6 filters">
        <div class="input-group input-group-stack-sm">
          <span class="input-group-addon">From:</span>
          <input type="date" class="form-control date-filter" v-model="dateFrom" placeholder="Date from">
          <span class="input-group-addon">To:</span>
          <input type="date" class="form-control date-filter" v-model="dateTo" placeholder="Date to">
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
        <router-link class="btn btn-primary" to="/entry/new">Add new Entry</router-link>
      </div>
    </div>

    <div class="panel panel-default table-responsive">
      <table class="table table-bordered" id="entries_list">
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
        <row v-for="entry in entries.data" :key="entry.id" :row="entry" @onDelete="onDelete"></row>
        </tbody>
      </table>
    </div>

    <div class="text-right" v-if="entries.last_page > 1">
      <ul class="pagination marginpulltop15">
        <li v-for="page in range(1, entries.last_page)" :key="page" :class="{active: page == entries.current_page}">
          <a href="#" @click.prevent="onLoadEntries(page)">{{ page }}</a>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {

    components: {
      row: require('./partials/Row.vue'),
    },

    data () {
      return {
        dateFrom: '',
        dateTo: '',
      }
    },

    mounted () {
      this.loadEntries(this.params)
    },

    computed: {
      ...mapState({
        entries: state => state.entries.entries,
      }),

      params () {
        return {
          page: this.entries.current_page,
          dateFrom: this.dateFrom,
          dateTo: this.dateTo
        }
      }
    },

    methods: {

      ...mapActions([
        'loadEntries',
        'deleteEntry',
        'addToastMessage',
      ]),

      onLoadEntries (page) {
        this.loadEntries({...this.params, page})
      },

      onFilter () {
        this.loadEntries({...this.params, page: 1})
      },

      onFilterClear () {
        this.dateFrom = ''
        this.dateTo = ''
        this.loadEntries(this.params)
      },

      onDelete (id) {
        this.deleteEntry(id).then(() => {
          this.addToastMessage({
            text: 'Entry was deleted!',
            type: 'success'
          })
          this.loadEntries(this.params)
        })
      },

    }
  }
</script>
