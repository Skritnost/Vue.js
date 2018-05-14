// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import loginpage from './pages/loginpage.vue'
import homepage from './pages/homepage.vue'
import registerpage from './pages/registerpage.vue'
import adress from './pages/autocomplete.vue'
import table from './pages/table.vue'
import mapgoogle from './pages/mapGog.vue'
import store from './store'
import Vuelidate from 'vuelidate'
import  AuthUser  from './pages/checking.vue'


Vue.use(axios)

Vue.use(Vuelidate)
Vue.use(VueAxios, axios)
Vue.use(VueRouter)

Vue.component('app', App)
Vue.component('authuser', AuthUser)

const routes = [
  {
    path: '/', component: loginpage, name: 'author'
  },
  {
    path: '/home', component: homepage, name: 'home', meta: { requiresAuth: true }
  },
  {
    path: '/registration', component: registerpage, name: 'registration'
  },
  {
    path: '/mapgoogle', component: mapgoogle, name: 'google-map'
  },
  {
    path: '/adress', component: adress, name: 'auto-add'
  },
  {
    path: '/table', component: table, name: 'res-table'
  }
  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to,from,next)=>{
  while(sessionStorage.getItem('UserInSystem'))
 next({path: '/home'})
 next()
  })

new Vue({
  router, store
}).$mount('#app')