import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Costing from './views/Costing.vue'
import Login from './views/Login.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/costing',
      name: 'Costing',
      component: Costing
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
  ]
})
