<template>
  <div>
    <h3>Edit User</h3>
    <hr>

    <p>
      <a href="#" class="btn btn-primary" @click.prevent="$router.go(-1)">Back</a>
    </p>

    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading">Edit User</div>
          <div class="panel-body">
            <user-form @onSubmit="onSubmit" :form="form" :errors="errors"></user-form>
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
    'user-form': require('./partials/Form.vue'),
  },

  data() {
    return {
      errors: {},
    };
  },

  mounted() {
    this.loadUser(this.id);
  },

  computed: {

    id() {
      return this.$route.params.id;
    },

    ...mapState({
      user: state => state.users.user,
    }),

    form() {
      if ( ! this.user) return {};

      return {
        name: this.user.name,
        email: this.user.email,
        role: this.user.role,
      };
    }

  },

  methods: {

    ...mapActions([
      'loadUser',
      'updateUser',
      'addToastMessage',
    ]),

    onSubmit(form) {
      this.updateUser({id: this.id, form})
        .then(() => {
          this.addToastMessage({
            text: 'User was updated!',
            type: 'success'
          });
          this.$router.go(-1);
        })
        .catch((data) => { this.errors = data.validation || {} });
    },

  }
}
</script>
