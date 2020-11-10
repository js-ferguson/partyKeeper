<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <hr>
    <div class="col-md-6 left">
      <h4>{{ characterTitle }}</h4>
      <form v-on:submit.prevent="createCharacter()">
      <input type="hidden" name="csrfmiddlewaretoken" v-bind:value="csrfToken">
      <input v-model="inputName" placeholder="Name:" name="name" type="text">
      <input v-model="inputClass" placeholder="Class:" name="class" type="text">
      <button class="btn btn-primary">Submit</button>
      </form>
    </div>
    <div class="col-md-6 right">
     {{ statsTitle }}
     <div>{{ chara_name }}</div>
    </div>
    <div class="col-md-12 bottom">
      <div>{{ inventoryTitle }}</div>
      <div>{{ chara_class }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CharacterPage',
  data () {
    return {
      token: '',
      csrfToken: '',
      msg: 'Party Keeper',
      username: 'jimi',
      password: '35ufn0c',
      characterTitle: 'Character',
      chara_name: '',
      chara_class: '',
      inputName: '',
      inputClass: '',
      statsTitle: 'Stats',
      inventoryTitle: 'Inventory',
      gear: {
        armor: {
          head: null,
          shoulder: null,
          arms: null,
          hands: null,
          chest: null,
          waist: null,
          legs: null,
          feet: null,
          misc1: null,
          misc2: null,
          misc3: null
        },
        items: {
          item1: null,
          item2: null,
          item3: null,
          item4: null,
          item5: null
        },
        weapons: {
          mainHand: null,
          offHand: null,
          twoHand: null,
          ranged: null,
          concealed: null
        }
      }
    }
  },

  created () {
    this.csrfToken = this.$store.getCSRF
    this.token = this.$store.getToken
  },

  asyncComputed: {
    getToken () {
      this.token = this.$store.state.token
    },

    getCSRF () {
      this.csrfToken = this.$store.state.token
    }
  //   getToken () {
  //     axios
  //       .post('auth/obtain_token/')
  //       .then(response => {
  //         console.log(response.data)
  //         this.token = response.data
  //       })
  //       .catch(error => {
  //         console.log(error.data)
  //       })
  //   }
  },

  mounted () {
    this.token = this.$store.state.token
    this.csrfToken = this.$store.state.token
    this.getUser()
  },

  methods: {

    createCharacter () {
      const formData = {
        name: this.inputName,
        class: this.inputClass
      }
      axios
        .post('api/character/create/', formData)
        .then(response => {
          console.log(response.data)
          this.chara_name = response.data.returncontent
        }).catch(error => {
          console.log(error.data)
        })
    },

    getArmor () {
      axios
        .post('https://ourdjangoapi/gear/armor')
        .then((response) => {
          console.log(response.data)
        // reveives a list of gear objects which can be loaded onto the character
        })
        .catch((error) => {
          console.log(error.data)
        })
    },

    getUser () {
      axios
        .get('rest-auth/user/')
        .then(res => {
          console.log(res.data)
        }).catch(error => {
          console.log(error.data)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.left {
  border-right: 1px solid black;
  /* display: inline-block; */
  float: left;
  height: 500px;
}
.right {
  /* display: inline-block; */
  float: right;
  height: 500px;
}
.bottom {
  border-top: 1px solid black;
  height: 500px;
  margin-top: 515px;
}
</style>
