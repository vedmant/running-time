<template>
  <div class="container">
    <h3>Login</h3>
    <hr>

    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading">Login</div>
          <div class="panel-body">

            <div v-if="error" class="alert alert-danger">
              {{ error }}
            </div>

            <form id="login_form" class="form-horizontal" role="form" @submit.prevent="onSubmit">

              <div class="form-group" :class="{ 'has-error': errors.email }">
                <label for="email" class="col-md-4 control-label">E-Mail Address</label>
                <div class="col-md-6">
                  <input id="email" v-model.trim="form.email" type="email" class="form-control" required autofocus>
                  <div v-if="errors.email" class="help-block">
                    <div v-for="(err, index) in errors.email" :key="index"><strong>{{ err }}</strong></div>
                  </div>
                </div>
              </div>

              <div class="form-group" :class="{ 'has-error': errors.password }">
                <label for="password" class="col-md-4 control-label">Password</label>
                <div class="col-md-6">
                  <input id="password" v-model.trim="form.password" type="password" class="form-control" required>
                  <div v-if="errors.password" class="help-block">
                    <div v-for="(err, index) in errors.password" :key="index"><strong>{{ err }}</strong></div>
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
import { mapActions, mapState } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import { useToastStore } from '../../../stores/toast'

export default {

  data () {
    return {
      form: {
        email: Laravel.demoMode ? 'admin@gmail.com' : '',
        password: Laravel.demoMode ? '123456' : '',
      },
      error: '',
      errors: {},
    }
  },

  computed: {
    ...mapState(useAuthStore, ['me']),
  },

  methods: {
    ...mapActions(useAuthStore, ['login']),

    onSubmit () {
      this.errors = {}
      this.login(this.form)
        .then(() => {
          useToastStore().addToastMessage({ text: 'You logged in!', type: 'success' })
          this.$router.replace('/dashboard')
        })
        .catch((data) => {
          this.error = data.message
          this.errors = data.errors || {}
        })
    },
  },
}
</script>
