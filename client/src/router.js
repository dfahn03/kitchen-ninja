import Vue from 'vue'
import Router from 'vue-router'
// @ts-ignore
import Dashboard from './views/Dashboard.vue'
// @ts-ignore
import Costing from './views/Costing.vue'
// @ts-ignore
import Login from './views/Login.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
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
  ]
})
