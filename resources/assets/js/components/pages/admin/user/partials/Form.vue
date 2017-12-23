<template>
  <form class="form-horizontal" role="form" @submit.prevent="$emit('onSubmit', form)">

    <div class="form-group" :class="{ 'has-error': errors.name }">
      <label for="name" class="col-md-4 control-label">Name</label>
      <div class="col-md-6">
        <input id="name" type="text" class="form-control" v-model="form.name" required autofocus>
        <div class="help-block" v-if="errors.name">
          <div v-for="error in errors.name"><strong>{{ error }}</strong></div>
        </div>
      </div>
    </div>

    <div class="form-group" :class="{ 'has-error': errors.email }">
      <label for="email" class="col-md-4 control-label">E-Mail Address</label>
      <div class="col-md-6">
        <input id="email" type="email" class="form-control" v-model="form.email" required>
        <div class="help-block" v-if="errors.email">
          <div v-for="error in errors.email"><strong>{{ error }}</strong></div>
        </div>
      </div>
    </div>

    <div class="form-group" :class="{ 'has-error': errors.role }" v-if="me.role == 'admin'">
      <label for="role" class="col-md-4 control-label">Role</label>
      <div class="col-md-6">
        <select id="role" class="form-control" v-model="form.role">
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <div class="help-block" v-if="errors.role">
          <div v-for="error in errors.role"><strong>{{ error }}</strong></div>
        </div>
      </div>
    </div>

    <div class="form-group" :class="{ 'has-error': errors.password }">
      <label for="password" class="col-md-4 control-label">Password</label>

      <div class="col-md-6">
        <input id="password" type="password" class="form-control" v-model="form.password">
        <div class="help-block" v-if="errors.password">
          <div v-for="error in errors.password"><strong>{{ error }}</strong></div>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>
      <div class="col-md-6">
        <input id="password-confirm" type="password" class="form-control" v-model="form.password_confirmation">
      </div>
    </div>

    <div class="form-group">
      <div class="col-md-6 col-md-offset-4">
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  </form>
</template>

<script>
  import { mapState } from 'vuex'

  export default {

    props: {
      form: {
        type: Object,
        required: true,
      },
      errors: {
        type: Object,
      }
    },

    computed: {

      ...mapState({
        me: state => state.auth.me,
      }),

    }

  }
</script>
