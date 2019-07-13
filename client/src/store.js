import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let auth = Axios.create({
  baseURL: base + "auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

let SID = "?siteId="

export default new Vuex.Store({
  state: {
    sites: {},
    site: {},
    user: {},
    users: [],
    ingredient: {},
    ingredients: [],
    recipe: {},
    recipes: [],
    blogs: [],
    siteId: "",
    open: false
    // menus: [],
    // kitchens: []
  },
  mutations: {
    setSites(state, sites) {
      state.sites = sites
      if (state.siteId) {
        state.site = state.sites.memberSites.find(s => s._id == state.siteId) || state.sites.mySites.find(s => s._id == state.siteId)
      }
    },
    setSite(state, siteId) {
      SID = "?siteId=" + siteId
      state.siteId = siteId
      if (state.sites.memberSites) {
        state.site = state.sites.memberSites.find(s => s._id == siteId) || state.sites.mySites.find(s => s._id == siteId)
      }
    },
    setUser(state, user) {
      state.user = user
    },
    setUsers(state, users) {
      state.users = users
    },
    setIngredients(state, ingredients = []) {
      state.ingredients = ingredients
    },
    setIngredient(state, ingredient) {
      state.ingredient = ingredient
    },
    setRecipe(state, recipe) {
      state.recipe = recipe
    },
    setRecipes(state, recipes) {
      state.recipes = recipes.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
    },
    setBlogs(state, blogs) {
      state.blogs = blogs
    },
    setSiteSelectorStatus(state, status) {

      state.open = status

    }
  },
  actions: {

    //#region -- Auth Stuff --
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'Login' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          let user = res.data
          commit('setUser', user)
          dispatch('getUserSites', user._id)
          dispatch('loadLastSite')
          router.push({ name: "dashboard" })
          // dispatch('selectSite', res.data._id)
          // if (router.currentRoute.name !== 'cositng') {
          //   router.push({ name: 'dashboard' })
          // }
        })
        .catch(res => {
          router.push({ name: 'Login' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          dispatch('getUserSites', res.data._id)
        })
    },
    async getUserSites({ commit, dispatch }, userId) {
      try {
        let res = await api.get('sites/' + userId)
        commit('setSites', res.data)

      } catch (error) { console.error(error) }
    },
    async getAllSites({ commit, dispatch }) {
      try {
        let res = await api.get('sites')
        console.log(res)
        commit('setSites', res.data)
      } catch (error) {
        console.error(error)

      }
    },
    // working on this 
    // async getUserBySites({ commit, dispatch }, userId) {
    //   try {
    //     let res = await api.get('sites/' + userId)
    //     commit('setSites', res.data)

    //   } catch (error) { console.error(error) }
    // },
    changeSite({ commit, dispatch }) {

      // localStorage.removeItem("KM__lastsite")
      commit('setSiteSelectorStatus', true)

      // dispatch("selectSite")
    },
    async selectSite({ commit, dispatch }, siteId) {
      try {
        localStorage.setItem("KM__lastsite", siteId)
        // let res = await api.get('sites/' + siteId)
        commit('setSite', siteId)
        commit('setSiteSelectorStatus', false)
        dispatch("getBlogs")
        dispatch("getRecipes")
        dispatch("getIngredients")
        router.push({ name: 'dashboard' })
      } catch (error) { console.error(error) }
    },
    loadLastSite({ dispatch, commit }) {
      let siteId = localStorage.getItem("KM__lastsite")
      if (siteId) {
        commit('setSite', siteId)
      }

    },
    async selectAdminSite({ commit, dispatch }, siteId) {
      try {
        // let res = await api.get('sites/' + siteId)
        commit('setSite', siteId)
        // router.push({ name: 'dashboard' })
      } catch (error) { console.error(error) }
    },
    async selectAdminUser({ commit, dispatch }, siteId) {
      try {
        // let res = await api.get('sites/' + siteId)
        commit('setSite', siteId._id)
        dispatch('getAllUsersBySite', siteId._id)
        // router.push({ name: 'dashboard' })
      } catch (error) { console.error(error) }
    },
    logout({ commit, dispatch }, creds) {
      localStorage.removeItem("KM__lastsite")
      auth.delete('logout', creds)
        .then(res => {
          commit('setUser', {})
          router.push({ name: 'Login' })
        })
    },
    deleteUser({ commit, dispatch }, userId) {
      api.delete('auth/' + SID + userId)
        .then(res => {
          dispatch('getSiteUsers')
        })
    },
    async editUser({ commit, dispatch }, payload) {
      try {
        await api.put('auth/' + SID + payload._id, payload)
        commit('setUser', payload.data)
        dispatch('getSiteUsers')
      } catch (error) { console.error(error) }
    },
    //#endregion

    //#region -- extra Admin Stuff --
    // async getAllUsersbySite({ commit, dispatch }, siteId) {
    //   try {
    //     let res = await api.get(SID + siteId + '/users')
    //     // console.log(res)
    //     commit('setUsers', siteId)
    //     dispatch('getSiteUsers')
    //   } catch (error) {
    //     console.error(error)
    //   }
    // },
    async getAllUsersBySite({ commit, dispatch }, siteId) {
      try {
        let res = await api.get('sites/' + siteId + '/users')
        // SID
        // '5d1a5bb2349598141c0e31ba'
        console.log(res)
        commit('setUsers', res.data)
      } catch (error) { console.error(error) }
    },
    //#endregion

    //#region -- MasterIngredient Stuff --
    async getIngredients({ commit, dispatch }) {
      try {
        let res = await api.get("ingredients")
        commit('setIngredients', res.data)
      } catch (error) { console.error(error) }
    },
    //#endregion

    //#region --  Dashboard Stuff --
    async getBlogs({ commit, dispatch }) {
      try {
        let res = await api.get('blogs' + SID)
        commit('setBlogs', res.data)
      } catch (error) { console.error(error) }
    },
    async createBlog({ commit, dispatch }, newBlog) {
      try {
        await api.post('blogs' + SID, newBlog)
        dispatch('getBlogs', newBlog)
      } catch (error) { console.error(error) }
    },
    async editBlog({ commit, dispatch }, blogData) {
      try {
        await api.put('blogs/' + blogData._id + SID, blogData)
        dispatch('getBlogs')
      } catch (error) { console.error(error) }
    },
    deleteBlog({ commit, dispatch }, blogId) {
      api.delete('blogs/' + blogId + SID)
        .then(res => {
          dispatch('getBlogs')
        })
    },
    //#endregion

    //#region --  Costing Stuff --

    //#endregion

    //#region --  Recipes Stuff --
    async getRecipes({ commit, dispatch }) {
      try {
        let res = await api.get('recipes' + SID)
        commit('setRecipes', res.data)
      } catch (error) {
        console.error(error)

      }
    },
    async saveRecipe({ commit, dispatch }, newRecipe) {
      try {
        await api.post('recipes' + SID, newRecipe)
        router.push({ name: 'Recipes' })
        dispatch('setRecipes')
      } catch (err) { console.error(err) }
    },

    // async getRecipeById({ commit, dispatch }, recipeId) {
    //   try {
    //     let res = await api.get('recipes/' + recipeId)
    //     commit('setActiveBoard', res.data)
    //   } catch (error) { console.error(error) }
    // },
    // TODO this works differently, so set up when modal idea developed

    // addRecipe({ commit, dispatch }, recipeData) {
    //   api.post('recipes', recipeData)
    //     .then(serverRecipe => {
    //       dispatch('getRecipes')
    //     })
    // TODO this works differently, so set up when modal idea developed
    // },
    deleteRecipe({ commit, dispatch }, recipeId) {
      api.delete('recipes/' + SID + recipeId)
        .then(res => {
          dispatch('getRecipes')
        })
    },

    async editRecipe({ commit, dispatch }, payload) {
      try {
        await api.put('recipes/' + SID + payload._id, payload)
        dispatch('getRecipes')
        router.push({ name: 'Costing' })
      } catch (error) { console.error(error) }
    },
    //#endregion

    //#region --  Stuff --

    //#endregion

  }
})
