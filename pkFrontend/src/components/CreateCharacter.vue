<template>
  <div class="container component-box">
    <div class="row">
      <form
        class="col-12"
        v-on:submit.prevent="createCharacter(importCharacterData)"
      >
        <input type="hidden" name="csrfmiddlewaretoken" />
        <input
          class="col-12"
          v-model="importCharacterData.inputName"
          placeholder="Name:"
          name="name"
          type="text"
        />
        <input
          class="col-12"
          v-model="importCharacterData.inputClass"
          placeholder="Class:"
          name="class"
          type="text"
        />
        <input
          class="col-12"
          v-model="importCharacterData.inputRace"
          placeholder="Race:"
          name="race"
          type="text"
        />
        <input
          class="col-12"
          v-model="importCharacterData.inputAC"
          placeholder="Armor Class:"
          name="ac"
          type="text"
        />
        <input
          class="col-12"
          v-model="importCharacterData.inputHP"
          placeholder="Health Points:"
          name="hp"
          type="text"
        />
        <input
          class="col-12"
          v-model="importCharacterData.inputInitiative"
          placeholder="Initiative:"
          name="initiative"
          type="text"
        />
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
// import { eventBus } from '../event-bus'

export default {
  // props: ['csrfToken'],

  data () {
    return {
      importCharacterData: {
        inputName: '',
        inputClass: '',
        inputRace: '',
        inputAC: '',
        inputHP: '',
        inputInitiative: ''
      }
      // headers: { csrfToken: this.csrfToken }
    }
  },
  //   computed: {
  //     csrf () {
  //       return this.$store.state.csrfToken
  //     }
  //   },

  methods: {
    createCharacter () {
      const {
        inputName,
        inputClass,
        inputRace,
        inputHP,
        inputAC,
        inputInitiative
      } = this.importCharacterData

      const formData = {
        name: inputName,
        class: inputClass,
        race: inputRace,
        hitPoints: inputHP,
        armorClass: inputAC,
        inititative: inputInitiative
      }
      this.$store.dispatch('createCharacter', formData)
      console.log(formData)
      //   axios
      //     .post('api/character/create/', formData, this.headers)
      //     .then((response) => {
      //       console.log(response.data)
      //       this.charaName = response.data.returncontent
      //     })
      //     .catch((error) => {
      //       console.log(error.data)
      //     })
    }
  }
}
</script>
<style scoped>
.component-box {
  background-color: #1d0a0a;
  padding: 10px;
}
</style>
