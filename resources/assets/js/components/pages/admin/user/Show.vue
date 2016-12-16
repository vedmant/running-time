<template>
  <div>
    <h3>User: {{ user.name }}</h3>
    <hr>

    <div class="row marginbot10">
      <div class="col-sm-6">
        <a href="#" class="btn btn-primary" @click.prevent="$router.go(-1)">Back</a>
      </div>
      <div class="col-sm-6 text-right">
        <router-link :to="'/admin/user/edit/' + user.id" class="btn btn-primary">Edit</router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading">User info</div>
          <div class="panel-body">
            <p>Name: <strong>{{ user.name }}</strong></p>
            <p>Email: <strong>{{ user.email }}</strong></p>
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

    };
  },

  mounted() {
    this.loadUser(this.id);
  },

  computed: {

    ...mapState({
      user: 'show_user',
    }),

    id() {
      return this.$route.params.id;
    }

  },

  methods: {

    ...mapActions([
      'loadUser',
    ]),

  }
}
</script>
