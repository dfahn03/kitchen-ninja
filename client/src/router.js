import Vue from 'vue'
import Router from 'vue-router'
// @ts-ignore
import Dashboard from './views/Dashboard.vue'
// @ts-ignore
import Costing from './views/Costing.vue'
// @ts-ignore
import EditRecipe from './views/EditRecipe.vue'
// @ts-ignore
import Login from './views/Login.vue'
// @ts-ignore
import Recipes from './views/Recipes.vue'

//admin route and child routes below. add menu child when complete
// @ts-ignore
import Admin from './views/Admin.vue'
// @ts-ignore
import AdminUsers from './components/AdminUsers.vue'
// @ts-ignore
import AdminSites from './components/AdminSites.vue'
// @ts-ignore
import AdminKitchens from './components/AdminKitchens.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "",
      redirect: "/login"
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/costing',
      name: 'Costing',
      component: Costing
    },
    {
      path: '/edit',
      name: 'EditRecipe',
      // props: true,
      component: EditRecipe
    },
    {
      path: '/recipes',
      name: 'Recipes',
      component: Recipes
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: 'users',
          name: 'AdminUsers',
          component: AdminUsers
        },
        {
          path: 'sites',
          name: 'AdminSites',
          component: AdminSites
        },
        {
          path: 'kitchens',
          name: 'AdminKitchens',
          component: AdminKitchens
        },
      ]
    }
  ]
})
