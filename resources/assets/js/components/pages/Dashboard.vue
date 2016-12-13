<template>
  <div class="container">
    Dashboard
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
