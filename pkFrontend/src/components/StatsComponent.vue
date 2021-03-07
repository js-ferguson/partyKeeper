<template>
  <div class="container component-box">
    <div class="inner-box">
      {{ title }}
    <div>{{ charaName }}</div>
    </div>
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
<style scoped>
.component-box {
  background-color: rgb(151, 126, 95);
}

</style>
