<template>
  <div />
</template>

<script>
import { mapActions } from 'pinia'
import { useAuthStore } from '../../../stores/auth'

export default {

  mounted () {
    this.logout()
    this.$router.replace('/')
  },

  methods: {
    ...mapActions(useAuthStore, [
      'logout',
    ]),
  },
}
</script>
