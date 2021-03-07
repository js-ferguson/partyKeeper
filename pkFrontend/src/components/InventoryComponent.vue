<template>
  <div>
    <div>{{ title }}</div>
    <div>{{ charaClass }}</div>
    <input @click="embiggen()" type="checkbox" id="checkbox" v-model="checked">
    <label for="checkbox">{{ checked }}</label>
  </div>
</template>

<script>
import { eventBus } from '../event-bus'

export default {
  props: ['title'],

  data () {
    return {
      charaClass: ''
    }
  },
  methods: {

    embiggen () {
      const data = {
        inv: true,
        overview: false,
        stats: false,
        chara: false
      }
      eventBus.$emit('embiggen-inv', data)
    }
  }
}
</script>
