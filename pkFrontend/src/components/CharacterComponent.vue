<template>
<create-character></create-character>
</template>

<script>
import axios from 'axios'
import CreateCharacter from './CreateCharacter.vue'

export default {
  components: { CreateCharacter },

  props: ['csrfToken'],

  data () {
    return {
      inputName: '',
      inputClass: '',
      characterTitle: '',
      headers: {'csrfToken': this.csrfToken}
    }
  },
  methods: {
    createCharacter () {
      const formData = {
        name: this.inputName,
        class: this.inputClass
      }
      axios
        .post('api/character/create/', formData, this.headers)
        .then(response => {
          console.log(response.data)
          this.charaName = response.data.returncontent
        }).catch(error => {
          console.log(error.data)
        })
    }
  }
}
</script>
<style scoped>
.component-box {
  background-color: #1d0a0a;
  padding: 10px;
}
.inner-box {
  margin: 10px;
  background-color: #fafafa;
}
</style>
