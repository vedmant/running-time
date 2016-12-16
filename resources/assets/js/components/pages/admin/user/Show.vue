<template>
  <div>
    <h3>User: {{ user.name }}</h3>
    <hr>

    <p>
      <a href="#" class="btn btn-primary" @click.prevent="$router.go(-1)">Back</a>
    </p>

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
    this.showUser(this.$route.params.id);
  },

  computed: {

    ...mapState({
      user: 'show_user',
    }),

  },

  methods: {

    ...mapActions([
      'showUser',
    ]),

  }
}
</script>
