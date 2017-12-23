<template>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {

    mounted () {
      this.logout()
      this.$router.replace('/')
    },

    methods: {
      ...mapActions([
        'logout',
      ]),
    }
  }
</script>
