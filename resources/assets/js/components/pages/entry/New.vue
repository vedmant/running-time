<template>
  <div class="container">
    <h3>New Entry</h3>
    <hr>

    <p>
      <a href="#" class="btn btn-primary" @click.prevent="$router.go(-1)">Back</a>
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
          time_hours: '00',
          time_minutes: '00',
          time_seconds: '00',
        }
      };
    },

    computed: {},

    methods: {

      ...mapActions([
        'storeEntry',
        'addToastMessage',
      ]),

      onSubmit(form) {
        this.storeEntry(form)
          .then(() => {
            this.addToastMessage({
              text: 'New time record was added!',
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
