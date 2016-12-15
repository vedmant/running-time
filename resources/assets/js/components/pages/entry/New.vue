<template>
  <div class="container">
    <h3>New Entry</h3>
    <hr>

    <p>
      <router-link class="btn btn-primary" to="/entries">Back</router-link>
    </p>

    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading">Add new Time Record</div>
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

export default {

  components: {
    'entry-form': require('./partials/Form.vue'),
  },

  data() {
    return {
      errors: {},
      form: {
        date: '',
        distance: '',
        time_minutes: '00',
        time_seconds: '00',
      }
    };
  },

  computed: {

  },

  methods: {

    ...mapActions([
      'storeEntry',
    ]),

    onSubmit(form) {
      this.storeEntry(form)
        .then(() => { this.$router.replace('/entries'); })
        .catch((data) => { this.errors = data.validation || {} });
    },

  }
}
</script>
