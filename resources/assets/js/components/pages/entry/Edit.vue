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
            <entry-form @onSubmit="onSubmit" :form="form" :errors="errors"></entry-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import moment from 'moment';

export default {

  components: {
    'entry-form': require('./partials/Form.vue'),
  },

  data() {
    return {
      errors: {},
      form: this.getForm(),
    };
  },

  computed: {

  },

  methods: {

    ...mapActions([
      'updateEntry',
    ]),

    getForm() {
      const id = this.$route.params.id;
      const entry = this.$store.state.entries.data.find(entry => entry.id == id);
      const duration = moment.duration(parseInt(entry.time), 'seconds');

      return {
        date: entry.date,
        distance: entry.distance,
        time_hours: Math.floor(duration.asHours()),
        time_minutes: _.padStart(duration.minutes(), 2, '-'),
        time_seconds: _.padStart(duration.seconds(), 2, '0'),
      }
    },

    onSubmit(form) {
      const id = this.$route.params.id;

      this.updateEntry({id, form})
        .then(() => { this.$router.go(-1); })
        .catch((data) => { this.errors = data.validation || {} });
    },

  }
}
</script>
