import Vue from 'vue'
import VueRouter from 'vue-router'

import SearchAutocomplete from "../components/SearchAutocomplete.vue"
import town from "../components/town.vue"
import cityError from "../components/cityError.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: SearchAutocomplete
  },
  {
    path: '/towm',
    name: 'town',
    component: town
  },
  {
    path: '/error',
    name: 'cityError',
    component: cityError
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
