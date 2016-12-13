<template>
  <div class="container">
    Front page
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
