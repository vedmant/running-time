<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading">Login</div>
          <div class="panel-body">

            <div class="alert alert-danger" v-if="error">
              {{ error }}
            </div>

            <form class="form-horizontal" role="form" @submit.prevent="onSubmit">

              <div class="form-group">
                <label for="email" class="col-md-4 control-label">E-Mail Address</label>
                <div class="col-md-6">
                  <input id="email" type="email" class="form-control" v-model.trim="form.username" required autofocus>
                </div>
              </div>

              <div class="form-group">
                <label for="password" class="col-md-4 control-label">Password</label>
                <div class="col-md-6">
                  <input id="password" type="password" class="form-control" v-model.trim="form.password" required>
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
import { mapState, mapActions } from 'vuex';

export default {

    /*
     * The component's data.
     */
    data() {
      return {
        form: {
          username: '',
          password: '',
        },
        error: '',
      };
    },

    computed: {
      ...mapState([
        'user',
      ])
    },

    methods: {

      ...mapActions([
        'login',
      ]),

      onSubmit() {
        this.login(this.form)
          .then(() => { this.$router.replace('/dashboard'); })
          .catch((data) => { this.error = data.message; });
      },

    }
  }
</script>
