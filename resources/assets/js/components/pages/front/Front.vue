<template>
  <div class="container">
    <h3>Front page</h3>
    <hr>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {

  data() {
    return {};
  },

  computed: {
    ...mapState([
      'user',
    ])
  },

  methods: {}
}
</script>
