<template>
  <form class="form-horizontal" role="form" @submit.prevent="$emit('onSubmit', form)">

    <div class="form-group" :class="{ 'has-error': errors.name }">
      <label for="name" class="col-md-4 control-label">Name</label>
      <div class="col-md-6">
        <input id="name" v-model="form.name" type="text" class="form-control" required autofocus>
        <div v-if="errors.name" class="help-block">
          <div v-for="(error, index) in errors.name" :key="index"><strong>{{ error }}</strong></div>
        </div>
      </div>
    </div>

    <div class="form-group" :class="{ 'has-error': errors.email }">
      <label for="email" class="col-md-4 control-label">E-Mail Address</label>
      <div class="col-md-6">
        <input id="email" v-model="form.email" type="email" class="form-control" required>
        <div v-if="errors.email" class="help-block">
          <div v-for="(error, index) in errors.email" :key="index"><strong>{{ error }}</strong></div>
        </div>
      </div>
    </div>

    <div v-if="me.role == 'admin'" class="form-group" :class="{ 'has-error': errors.role }">
      <label for="role" class="col-md-4 control-label">Role</label>
      <div class="col-md-6">
        <select id="role" v-model="form.role" class="form-control">
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <div v-if="errors.role" class="help-block">
          <div v-for="(error, index) in errors.role" :key="index"><strong>{{ error }}</strong></div>
        </div>
      </div>
    </div>

    <div class="form-group" :class="{ 'has-error': errors.password }">
      <label for="password" class="col-md-4 control-label">Password</label>

      <div class="col-md-6">
        <input id="password" v-model="form.password" type="password" class="form-control">
        <div v-if="errors.password" class="help-block">
          <div v-for="(error, index) in errors.password" :key="index"><strong>{{ error }}</strong></div>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>
      <div class="col-md-6">
        <input id="password-confirm" v-model="form.password_confirmation" type="password" class="form-control">
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
        default: () => ({}),
      }
    },

    computed: {

      ...mapState({
        me: state => state.auth.me,
      }),

    }

  }
</script>
