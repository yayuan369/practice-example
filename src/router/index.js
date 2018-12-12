import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import index from '../pages/index.vue';
import message from '../pages/message.vue'
import my from '../pages/my.vue'
import more from '../pages/more.vue'
import people from '../pages/people.vue'
import content from '../pages/content.vue'
import publish from '../pages/publish.vue'
import login from '../pages/login.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/vue-home/dist',
      name: 'index',
      component: index
    },
    {
      path: '/vue-home/dist/message',
      name: 'message',
      component: message
    },
    {
      path: '/vue-home/dist/my',
      name: 'my',
      component: my
    },
    {
      path: '/vue-home/dist/more',
      name: 'more',
      component: more
    },
    {
      path: '/vue-home/dist/people',
      name: 'people',
      component: people
    },
    {
      path: '/vue-home/dist/content',
      name: 'content',
      component: content
    },
    {
      path: '/vue-home/dist/publish',
      name: 'publish',
      component: publish
    },
    {
      path: '/vue-home/dist/login',
      name: 'login',
      component: login
    },
    

  ]
})
