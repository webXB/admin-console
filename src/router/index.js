import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component (resolve) {
      require(['@views/Home.vue'], resolve)
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component (resolve) {
      require(['@views/About.vue'], resolve)
    }
  }
]

export default new Router({
  mode: 'hash',
  routes
})
