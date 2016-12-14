<template>
  <div class="container">
    <h3>Edit Entry</h3>
    <hr>

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
      'storeEntry',
    ]),

    getForm() {
      const id = this.$route.params.id;
      const entry = this.$store.state.entries.data.find(entry => entry.id == id);
      const duration = moment.duration(parseInt(entry.time), 'seconds');

      return {
        date: entry.date,
        distance: entry.distance,
        time_minutes: Math.floor(duration.asMinutes()),
        time_seconds: _.padStart(duration.seconds(), 2, '0'),
      }
    },

    onSubmit(form) {
      this.storeEntry(form)
        .then(() => { this.$router.replace('/entries'); })
        .catch((data) => { this.errors = data.validation || {} });
    },

  }
}
</script>
