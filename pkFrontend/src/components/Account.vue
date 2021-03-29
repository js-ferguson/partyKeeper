<template>
  <div class="container">
      word
    <div>{{ name }}</div>
    <div>{{ user.party_name }}</div>
    <div>{{ user.screen_name }}</div>
  </div>
</template>

<script>
import { eventBus } from '../event-bus'

export default {
  name: 'CharacterPage',
  computed: {
    api_token () {
      return this.$store.getters.getJWT
    },

    user () {
      return this.$store.state.authUser
    },

    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  },
  data () {
    return {
      name: 'name',
      party_name: 'party'
    }
  },

  mounted () {
    this.token = this.$store.state.token
    this.csrfToken = this.$store.state.token
    // this.verification_login()
    // this.getUser()
  },

  methods: {

    embiggen () {
      if (!this.checked) {
        eventBus.$emit('embiggen', this.focusInvPanel)
      } else {
        eventBus.$emit('embiggen', 'overview')
      }
    }
  }
}
</script>
