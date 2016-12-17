<template>
  <div>
    <h3>Users</h3>
    <hr>

    <div class="row marginbot10">
      <div class="col-sm-6">
      </div>
      <div class="col-sm-6 text-right">
        <span class="page-info">Page {{ users.current_page }} of  {{ users.last_page }}</span>
      </div>
    </div>

    <div class="panel panel-default">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created at</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <row v-for="user in users.data" :row="user" @onDelete="onDelete"></row>
        </tbody>
      </table>
    </div>

    <div class="text-right" v-if="users.last_page > 1">
      <ul class="pagination marginpulltop15">
        <li v-for="page in range(1, users.last_page)" :class="{active: page == users.current_page}">
          <a href="#" @click.prevent="onLoadEntries(page)">{{ page }}</a>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {

  components: {
    row: require('./partials/Row.vue'),
  },

  data() {
    return {

    };
  },

  mounted() {
    this.loadUsers(this.params);
  },

  computed: {
    ...mapState({
      users: state => state.users.users,
    }),

    params() {
      return {
        page: this.users.current_page,
      }
    }
  },

  methods: {

    ...mapActions([
      'loadUsers',
      'deleteUser',
      'addToastMessage',
    ]),

    onLoadEntries(page) {
      this.loadUsers({...this.params, page});
    },

    onFilter() {
      this.loadUsers({...this.params, page: 1});
    },

    onFilterClear() {
      this.dateFrom = '';
      this.dateTo = '';
      this.loadUsers(this.params);
    },

    onDelete(id) {
      this.deleteUser(id).then(() => {
        this.addToastMessage({
          text: 'User was deleted!',
          type: 'success'
        });
        this.loadUsers(this.params);
      });
    },

  }
}
</script>
