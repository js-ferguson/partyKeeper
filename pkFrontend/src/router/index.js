import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import CharacterComponent from '@/components/CharacterComponent'
import SignupPage from '@/components/auth/Signup.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'CharacterHome',
      component: CharacterComponent
    },
    {
      path: '/character',
      name: 'CharacterPage',
      component: CharacterComponent
    },
    {
      path: '/signup',
      component: SignupPage
    }
  ]
})
