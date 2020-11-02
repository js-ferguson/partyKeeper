<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <hr>
    <div class="col-md-6 left">
      {{ characterTitle }}
    </div>
    <div class="col-md-6 right">
     {{ statsTitle }}
    </div>
    <div class="col-md-12 bottom">
      {{ inventoryTitle }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CharacterPage',
  data () {
    return {
      msg: 'Party Keeper',
      characterTitle: 'Character',
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
  methods: {
    getArmor () {
      axios
        .get('https://ourdjangoapi/gear/armor')
        .then((response) => {
          console.log(response.data)
        // reveives a list of gear objects which can be loaded onto the character
        })
        .catch((error) => {
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
