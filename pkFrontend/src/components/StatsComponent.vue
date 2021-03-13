<template>
  <div class="container component-box">
    <div class="inner-box">
      {{ title }}
    <div>{{ charaName }}</div>
    <input @click="embiggen()" type="checkbox" id="checkbox" v-model="checked">
    <label for="checkbox"></label>
    </div>
  </div>
</template>

<script>

import { eventBus } from '../event-bus'

export default {
  props: ['title', 'chara-name'],

  data () {
    return {
      // charaName: ''
      checked: false,
      focusStatsPanel: {
        overview: false,
        inv: false,
        stats: true,
        chara: false
      }
    }
  },

  methods: {

    embiggen () {
      if (!this.checked) {
        eventBus.$emit('embiggen', this.focusStatsPanel)
      } else {
        eventBus.$emit('embiggen', 'overview')
      }
    }
  }
}
</script>
<style scoped>
.component-box {
  background-color: rgb(151, 126, 95);
}

</style>
