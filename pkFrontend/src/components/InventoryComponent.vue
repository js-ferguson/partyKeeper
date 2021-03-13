<template>
  <div>
    <div>{{ title }}</div>
    <div>{{ charaClass }}</div>
    <input @click="embiggen()" type="checkbox" id="checkbox" v-model="checked">
    <label for="checkbox"></label>
  </div>
</template>

<script>
import { eventBus } from '../event-bus'

export default {
  props: ['title'],

  data () {
    return {
      charaClass: '',
      checked: false,
      focusInvPanel: {
        overview: false,
        inv: true,
        stats: false,
        chara: false
      }
    }
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
