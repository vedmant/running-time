<template>
  <div class="container">
    <h3>Edit Entry</h3>
    <hr>

    <p>
      <a href="#" class="btn btn-primary" @click.prevent="$router.go(-1)">Back</a>
    </p>

    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading">Edit Time Record</div>
          <div class="panel-body">
            <entry-form :form="form" :errors="errors" @onSubmit="onSubmit" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import padStart from 'lodash/padStart'
import EntryForm from './partials/Form.vue'

export default {

  components: {
    EntryForm,
  },

  data () {
    return {
      errors: {},
    }
  },

  computed: {

    ...mapState({
      entry: state => state.entries.entry,
    }),

    id () {
      return this.$route.params.id
    },

    form () {
      const duration = moment.duration(this.entry.time)

      return {
        date: moment(this.entry.date).format('YYYY-MM-DD'),
        distance: this.entry.distance,
        time_hours: Math.floor(duration.asHours()),
        time_minutes: padStart(duration.minutes(), 2, '-'),
        time_seconds: padStart(duration.seconds(), 2, '0'),
      }
    },

  },

  mounted () {
    this.loadEntry(this.id)
  },

  methods: {

    ...mapActions([
      'loadEntry',
      'updateEntry',
      'addToastMessage',
    ]),

    onSubmit (form) {
      const id = this.$route.params.id

      this.updateEntry({ id, form })
        .then(() => {
          this.addToastMessage({
            text: 'Time record was updated!',
            type: 'success',
          })
          this.$router.go(- 1)
        })
        .catch((data) => {
          this.errors = data.errors || {}
        })
    },

  },
}
</script>
