<template>
  <div class="container">
    <h3>Registration</h3>
    <hr>

    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading">Registration</div>
          <div class="panel-body">
            <form class="form-horizontal" id="register_form" role="form" @submit.prevent="onSubmit">

              <div class="form-group" :class="{ 'has-error': errors.name }">
                <label for="name" class="col-md-4 control-label">Name</label>
                <div class="col-md-6">
                  <input id="name" type="text" class="form-control" v-model="form.name" required autofocus>
                  <div class="help-block" v-if="errors.name"><div v-for="error in errors.name"><strong>{{ error }}</strong></div></div>
                </div>
              </div>

              <div class="form-group" :class="{ 'has-error': errors.email }">
                <label for="email" class="col-md-4 control-label">E-Mail Address</label>
                <div class="col-md-6">
                  <input id="email" type="email" class="form-control" v-model="form.email" required>
                  <div class="help-block" v-if="errors.email"><div v-for="error in errors.email"><strong>{{ error }}</strong></div></div>
                </div>
              </div>

              <div class="form-group" :class="{ 'has-error': errors.password }">
                <label for="password" class="col-md-4 control-label">Password</label>

                <div class="col-md-6">
                  <input id="password" type="password" class="form-control" v-model="form.password" required>
                  <div class="help-block" v-if="errors.password"><div v-for="error in errors.password"><strong>{{ error }}</strong></div></div>
                </div>
              </div>

              <div class="form-group">
                <label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>
                <div class="col-md-6">
                  <input id="password-confirm" type="password" class="form-control" v-model="form.password_confirmation" required>
                </div>
              </div>

              <div class="form-group">
                <div class="col-md-6 col-md-offset-4">
                  <button type="submit" class="btn btn-primary">
                    Register
                  </button>
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
import { mapState, mapActions } from 'vuex';

export default {

  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      errors: {}
    }
  },

  methods: {

    ...mapActions([
      'register',
    ]),

    onSubmit() {
      this.errors = {};
      this.register(this.form)
        .then(() => { this.$router.replace('/dashboard'); })
        .catch((data) => { this.errors = data.validation || {}; });
    },

  }

}
</script>
