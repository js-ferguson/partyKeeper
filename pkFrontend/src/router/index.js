import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import CharacterComponent from '@/components/CharacterComponent'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
