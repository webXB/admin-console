import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import services from './services'
import '@/router/routeInterceptor'

Vue.config.productionTip = false

Object.defineProperties(Vue.prototype, {
  $services: {
    configurable: false,
    value: services
  },
  $bus: {
    configurable: false,
    value: new Vue()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
