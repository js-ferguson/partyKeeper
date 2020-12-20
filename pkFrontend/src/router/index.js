import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import CharacterComponent from '@/components/CharacterComponent'
import SignupPage from '@/components/auth/Signup.vue'
import SigninPage from '@/components/auth/Signin.vue'
import PartyKeeper from '@/components/PartyKeeper.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'PartyKeeper',
    //   component: PartyKeeper
    // },
    {
      path: '/:verification?',
      name: 'PartyKeeper',
      component: PartyKeeper
    },
    {
      path: '/character',
      name: 'CharacterPage',
      component: CharacterComponent
    },
    {
      path: '/signup',
      component: SignupPage
    },
    {
      path: '/signin',
      component: SigninPage
    }
  ]
})
