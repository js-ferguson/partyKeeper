<template>
  <div>
    <div>{{ title }}</div>
    <div>{{ charaClass }}</div>
  </div>
</template>

<script>
export default {
  props: ['title'],

  data () {
    return {
      charaClass: ''
    }
  }
}
</script>
