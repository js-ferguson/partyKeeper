<template>
  <div class="container component-box">
    <h4>{{ characterTitle }}</h4>
    <div class="inner-box">
      <form v-on:submit.prevent="createCharacter()">
      <input
        type="hidden"
        name="csrfmiddlewaretoken"
        v-bind:value="csrfToken"
      />
      <input v-model="inputName" placeholder="Name:" name="name" type="text" />
      <input
        v-model="inputClass"
        placeholder="Class:"
        name="class"
        type="text"
      />
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {

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
  background-color: brown;
  padding: 10px;
}
.inner-box {
  margin: 10px;
  background-color: #fafafa;
}
</style>
