import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search.vue'
import User from '../views/User.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Search',
    component: Search
  },
  {
    path: "/user/:userName",
    name: "User",
    component: User
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
