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
  import moment from 'moment-mini';

  export default {

    components: {
      'entry-form': require('./partials/Form.vue'),
    },

    data() {
      return {
        errors: {},
      };
    },

    mounted() {
      this.loadEntry(this.id);
    },

    computed: {

      ...mapState({
        entry: state => state.entries.entry,
      }),

      id() {
        return this.$route.params.id;
      },

      form() {
        const duration = moment.duration(this.entry.time);

        return {
          date: moment(this.entry.date).format('YYYY-MM-DD'),
          distance: this.entry.distance,
          time_hours: Math.floor(duration.asHours()),
          time_minutes: _.padStart(duration.minutes(), 2, '-'),
          time_seconds: _.padStart(duration.seconds(), 2, '0'),
        }
      }

    },

    methods: {

      ...mapActions([
        'loadEntry',
        'updateEntry',
        'addToastMessage',
      ]),

      onSubmit(form) {
        const id = this.$route.params.id;

        this.updateEntry({id, form})
          .then(() => {
            this.addToastMessage({
              text: 'Time record was updated!',
              type: 'success'
            });
            this.$router.go(- 1);
          })
          .catch((data) => {
            this.errors = data.errors || {}
          });
      },

    }
  }
</script>
