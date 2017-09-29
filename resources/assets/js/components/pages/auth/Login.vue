<template>
  <div class="container">
    <h3>Login</h3>
    <hr>

    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading">Login</div>
          <div class="panel-body">

            <div class="alert alert-danger" v-if="error">
              {{ error }}
            </div>

            <form id="login_form" class="form-horizontal" role="form" @submit.prevent="onSubmit">

              <div class="form-group" :class="{ 'has-error': errors.email }">
                <label for="email" class="col-md-4 control-label">E-Mail Address</label>
                <div class="col-md-6">
                  <input id="email" type="email" class="form-control" v-model.trim="form.email" required autofocus>
                  <div class="help-block" v-if="errors.email">
                    <div v-for="error in errors.email"><strong>{{ error }}</strong></div>
                  </div>
                </div>
              </div>

              <div class="form-group" :class="{ 'has-error': errors.password }">
                <label for="password" class="col-md-4 control-label">Password</label>
                <div class="col-md-6">
                  <input id="password" type="password" class="form-control" v-model.trim="form.password" required>
                  <div class="help-block" v-if="errors.password">
                    <div v-for="error in errors.password"><strong>{{ error }}</strong></div>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="col-md-8 col-md-offset-4">
                  <button type="submit" class="btn btn-primary">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {

    data() {
      return {
        form: {
          email: Laravel.demoMode ? 'admin@gmail.com' : '',
          password: Laravel.demoMode ? '123456' : '',
        },
        error: '',
        errors: {},
      };
    },

    computed: {
      ...mapState({
        me: state => state.auth.me,
      })
    },

    methods: {

      ...mapActions([
        'login',
        'addToastMessage',
      ]),

      onSubmit() {
        this.errors = {};
        this.login(this.form)
          .then(() => {
            this.addToastMessage({
              text: 'You logged in!',
              type: 'success'
            });
            this.$router.replace('/dashboard');
          })
          .catch((data) => {
            this.error = data.message;
            this.errors = data.validation || {};
          });
      },

    }
  }
</script>
