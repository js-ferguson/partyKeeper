<template>
  <div>
    {{ title }}
    <div>{{ charaName }}</div>
  </div>
</template>

<script>
export default {
  props: ['title', 'chara-name'],

  data () {
    return {
      // charaName: ''
    }
  }
}
</script>
