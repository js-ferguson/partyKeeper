<template>
  <div class="container">
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item><router-link to="/">Partykeeper</router-link></b-nav-item>
        <div style="float: right">
          <b-nav-item-dropdown v-if="isAuthenticated" right>
            <template #button-content>
              <em
                >{{ user.screen_name }}<span v-if="user.party_name">@</span
                >{{ user.party_name }}</em
              >
              <font-awesome-icon :icon="['fas', 'cog']" />
            </template>
            <b-dropdown-item
              ><router-link to="/Account">Account</router-link></b-dropdown-item
            >
            <b-dropdown-item
              ><router-link to="/Settings"
                >Settings</router-link
              ></b-dropdown-item
            >
          </b-nav-item-dropdown>
        </div>
      </b-navbar-nav>
      <div class="col-4 ml-auto" style="float: right">
        <b-button
          v-if="isAuthenticated"
          class="btn btn-primary"
          style="float: right; margin-left: 5px"
          @click="logout"
          >Logout
        </b-button>
        <b-button
          v-if="!isAuthenticated"
          class="btn btn-primary"
          style="float: right; margin-left: 5px"
          v-b-modal.loginModal
          >Login</b-button
        >
        <b-button
          v-if="!isAuthenticated"
          class="btn btn-primary"
          style="float: right"
          v-b-modal.signUpModal
          >Sign Up!</b-button
        >
      </div>
    </b-navbar>
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
          v-model="password1"
          placeholder="Password:"
          name="password1"
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
          v-model="password1"
          placeholder="Password:"
          name="password1"
          type="text"
        />
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </b-modal>
  </div>
</template>
<script>
import { eventBus } from '../event-bus'

export default {
  name: 'NavComponent',

  created () {
    eventBus.$on('loginModal', () => {
      this.$bvModal.show('loginModal')
    })
  },

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
      password1: '',
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
      inventoryTitle: 'Inventory'
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
  methods: {
    register () {
      const data = {
        email: this.email,
        password1: this.password1,
        password2: this.password2,
        party_name: this.party_name,
        dungeon_master: this.dungeon_master
      }
      this.$store.dispatch('signup', data)
    },

    // verification_login () {
    //   const data = { email: this.$store.state.authUser.email, password: this.$store.state.authUser.password1 }
    //   console.log(this.$store.state.authUser)
    //   if (this.$route.query.verification === '1') {
    //     console.log('verification = 1')
    //     this.$store.dispatch('login', data)
    //   }
    // },

    login () {
      const data = { email: this.email, password: this.password1 }
      this.$store.dispatch('getJWT', data).then((response) => {})
    },

    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
