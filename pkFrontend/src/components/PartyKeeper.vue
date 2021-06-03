<template>
  <div class="container root-div">
    <!-- <div class="container root-div"> -->
    <div class="row">
      <character-component
        v-if="appView.chara || appView.overview"
        :csrfToken="csrfToken"
        :class="{
          'col-12 full': appView.chara,
          'col-6 overview': appView.overview
        }"
      ></character-component>
      <stats-component
        v-if="appView.stats || appView.overview"
        :title="statsTitle"
        :class="{
          'col-12 full': appView.stats,
          'col-6 overview': appView.overview
        }"
        :chara-name="charaName"
      ></stats-component>
      <inventory-component
        v-if="appView.inv || appView.overview"
        :title="inventoryTitle"
        :class="{
          'col-12 full': appView.inv,
          'col-12 overview': appView.overview
        }"
      ></inventory-component>
    </div>
    <!-- SignUp Modal -->
    <b-modal id="signUpModal" title="Greetings Traveller">
      <p class="">Sign up as a patron of our fine establishment</p>
      <form v-on:submit.prevent="register()">
        <input
          type="hidden"
          name="csrfmiddlewaretoken"
          v-bind:value="csrfToken"
        />
        <input v-model="email" placeholder="Email:" name="email" type="text" />
        <input
          v-model="screen_name"
          placeholder="Screen Name:"
          name="first_name"
          type="text"
        />
        <input
          v-model="password"
          placeholder="Password:"
          name="password"
          type="password"
        />
        <input
          class="mt-2"
          v-model="password2"
          placeholder="Confirm Password:"
          name="password2"
          type="password"
        />
        <div class="mt-2">
          <label class="col-12" v-if="!dungeon_master" for="party_name"
            >Search a party to join</label
          >
          <input
            v-if="!dungeon_master"
            v-model="party_name"
            placeholder="Search Party:"
            type="text"
          />
        </div>
        <div class="mt-2">
          <input
            v-model="dungeon_master"
            type="checkbox"
            id="dungeon_master"
            name="dungeon_master"
            checked
          />
          <label for="dungeon_master">Are you a DM creating a new party?</label>
        </div>
        <input
          v-if="dungeon_master"
          v-model="party_name"
          placeholder="Party Name:"
          name="party_name"
          type="text"
        />
        <div class="col-12">
          <button
            type="submit"
            class="btn btn-primary mt-4"
            style="float: left"
          >
            Submit
          </button>
        </div>
      </form>
    </b-modal>
    <!-- Login Modal -->
    <b-modal id="loginModal" title="Login">
      <p class="my-4">Welcome Back</p>
      <form v-on:submit.prevent="login()">
        <input
          type="hidden"
          name="csrfmiddlewaretoken"
          v-bind:value="csrfToken"
        />
        <input v-model="email" placeholder="Email:" name="email" type="text" />
        <input
          v-model="password"
          placeholder="Password:"
          name="password"
          type="text"
        />
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import CharacterComponent from './CharacterComponent'
import InventoryComponent from './InventoryComponent'
import StatsComponent from './StatsComponent'
import { eventBus } from '../event-bus'
export default {
  components: {
    CharacterComponent,
    InventoryComponent,
    StatsComponent
  },
  name: 'CharacterPage',
  data () {
    return {
      token: '',
      csrfToken: '',
      axiosInstance: null,
      // api_token: this.$store.getters.getApiToken,
      headers: { csrfToken: this.csrfToken },
      // user: null,
      showSignUp: 0,
      msg: 'Party Keeper',
      email: '',
      dob: '',
      first_name: '',
      last_name: '',
      password: '',
      password2: '',
      dungeon_master: false,
      party_name: '',
      screen_name: '',
      characterTitle: 'Character',
      charaName: '',
      charaClass: '',
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
      },
      appView: {
        overview: true,
        stats: false,
        inv: false,
        chara: false
      }
    }
  },
  created () {
    // this.csrfToken = this.$store.getCSRF
    // this.token = this.$store.getToken
    this.initEvenBus()
    if (this.api_token && !this.user.name) {
      this.$store.dispatch('getUser')
    }
  },
  computed: {
    api_token () {
      return this.$store.getters.getJWT
    },
    user () {
      return this.$store.state.authUser
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
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
    // this.verification_login()
    // this.getUser()
  },
  methods: {
    initEvenBus () {
      eventBus.$on('embiggen', data => {
        this.changeWindowFocus(data)
      })
    },
    changeWindowFocus (data) {
      if (data === 'overview') {
        this.appView = {
          overview: true,
          stats: false,
          inv: false,
          chara: false
        }
      } else {
        this.appView = data
      }
    },
    register () {
      const data = {
        email: this.email,
        password: this.password,
        password2: this.password2,
        party_name: this.party_name,
        dungeon_master: this.dungeon_master
      }
      this.$store.dispatch('signup', data)
    },
    verification_login () {
      const data = {
        email: this.$store.state.authUser.email,
        password: this.$store.state.authUser.password
      }
      console.log(this.$store.state.authUser)
      if (this.$route.query.verification === '1') {
        console.log('verification = 1')
        this.$store.dispatch('login', data)
      }
    },
    login () {
      const data = { email: this.email, password: this.password }
      this.$store.dispatch('getJWT', data).then(response => {})
    },
    logout () {
      this.$store.dispatch('logout')
    },
    // getJwtToken () {
    //   const data = { username: this.email, password: this.password1 }
    //   this.$store.commit('setToken', data)
    //   console.log(this.token)
    //   // this.getUser()
    //   // axios
    //   //   .post('http://localhost:5000/auth/obtain_token/', data, this.headers)
    //   //   .then((response) => {
    //   //     // console.log(response.data.key)
    //   //     // this.$store.commit('setApiToken', response.data.key)
    //   //     // console.log(this.$store.getters.getApiToken)
    //   //     console.log(response)
    //   //     // this.getUser()
    //   //   })
    // },
    // getArmor() {
    //   axios
    //     .post('https://ourdjangoapi/gear/armor')
    //     .then((response) => {
    //       console.log(response.data);
    //       // reveives a list of gear objects which can be loaded onto the character
    //     })
    //     .catch((error) => {
    //       console.log(error.data);
    //     });
    // },
    getUser () {
      const headers = {
        headers: {
          Authorization: `Bearer ${this.api_token}`,
          csrfToken: this.csrfToken
        }
      }
      axios
        .get('rest-auth/user/', {}, headers)
        .then(res => {
          console.log(res.data)
        })
        .catch(error => {
          console.log(error.data)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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
  /* border-right: 1px solid black; */
  /* display: inline-block; */
  float: left;
  height: 500px;
  background-color: aliceblue;
  padding: 10px;
  margin: 10px;
}
.right {
  /* display: inline-block; */
  float: right;
  height: 500px;
  background-color: aliceblue;
  padding: 10px;
  margin: 10px;
}
.bottom {
  /* border-top: 1px solid black; */
  height: 500px;
  margin-top: 515px;
  background-color: aliceblue;
  padding: 10px;
  margin: 10px;
}
.root-div {
  padding: 0 30px 0 30px;
  /* background-color: #b6a4a4; */
}
.full {
  height: 1000px;
}
.overview {
  height: 500px;
  background-color: azure;
  padding: 10px;
}
</style>
© 2021 GitHub, Inc. Terms Privacy Security Status Docs Contact GitHub Pricing
API Training Blog About
