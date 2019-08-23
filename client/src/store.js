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
    masterIngredients: [],
    activeRecipe: {},
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
    setSiteSelectorStatus(state, status) {
      state.open = status
    },
    setUser(state, user) {
      state.user = user
    },
    setUsers(state, users) {
      state.users = users
    },
    setMasterIngredients(state, masterIngredients) {
      state.masterIngredients = masterIngredients
    },
    setActiveRecipe(state, activeRecipe) {
      state.activeRecipe = activeRecipe
    },
    setActiveRecipeIngredient(state, newIngredient) {
      state.activeRecipe.recipeIngredients.push(newIngredient)
    },
    editActiveRecipeIngredient(state, payload) {
      state.activeRecipe.recipeIngredients[payload.i] = payload.ing
    },
    resetRecipe(state) {
      state.activeRecipe = {}
    },
    setRecipes(state, recipes) {
      state.recipes = recipes.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
    },
    setBlogs(state, blogs) {
      state.blogs = blogs
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
          if (router.currentRoute.path == '/login') {
            router.push({ name: "dashboard" })
          }
        })
        .catch(res => { router.push({ name: 'Login' }) })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          dispatch('getUserSites', res.data._id)
        })
    },
    logout({ commit, dispatch }, creds) {
      localStorage.removeItem("KM__lastsite")
      auth.delete('logout', creds)
        .then(res => {
          commit('setUser', {})
          window.location.reload()
        })
    },
    //#endregion

    //#region -- Site --
    async getUserSites({ commit, dispatch }, userId) {
      try {
        let res = await api.get('sites/' + userId)
        commit('setSites', res.data)
      } catch (err) { console.error(err) }
    },
    async getAllSites({ commit, dispatch }) {
      try {
        let res = await api.get('sites')
        console.log(res)
        commit('setSites', res.data)
      } catch (err) { console.error(err) }
    },
    changeSite({ commit, dispatch }) {
      commit('setSiteSelectorStatus', true)
    },
    async selectSite({ commit, dispatch }, siteId) {
      try {
        localStorage.setItem("KM__lastsite", siteId)
        commit('setSite', siteId)
        commit('setSiteSelectorStatus', false)
        dispatch("getBlogs")
        dispatch("getMasterIngredients")
        dispatch("getRecipes")
        if (router.currentRoute.path == '/login') {
          router.push({ name: 'dashboard' })
        }
      } catch (err) { console.error(err) }
    },
    loadLastSite({ dispatch, commit }) {
      let siteId = localStorage.getItem("KM__lastsite")
      if (siteId) {
        dispatch('selectSite', siteId)
      }
    },
    async selectAdminSite({ commit, dispatch }, siteId) {
      try {
        commit('setSite', siteId)
      } catch (err) { console.error(err) }
    },
    //#endregion

    //#region -- Admin/User --
    async selectAdminUser({ commit, dispatch }, siteId) {
      try {
        commit('setSite', siteId._id)
        dispatch('getAllUsersBySite', siteId._id)
      } catch (err) { console.error(err) }
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
      } catch (err) { console.error(err) }
    },
    async getAllUsersBySite({ commit, dispatch }, siteId) {
      try {
        let res = await api.get('sites/' + siteId + '/users')
        console.log(res)
        commit('setUsers', res.data)
      } catch (err) { console.error(err) }
    },
    //#endregion

    //#region -- MasterIngredient Stuff --
    async getMasterIngredients({ commit, dispatch }) {
      try {
        let res = await api.get("ingredients")
        commit('setMasterIngredients', res.data)
      } catch (err) { console.error(err) }
    },
    //#endregion

    //#region --  Dashboard/Blog Stuff --
    async getBlogs({ commit, dispatch }) {
      try {
        let res = await api.get('blogs' + SID)
        commit('setBlogs', res.data)
      } catch (err) { console.error(err) }
    },
    async createBlog({ commit, dispatch }, newBlog) {
      try {
        await api.post('blogs' + SID, newBlog)
        dispatch('getBlogs', newBlog)
      } catch (err) { console.error(err) }
    },
    async editBlog({ commit, dispatch }, blogData) {
      try {
        await api.put('blogs/' + blogData.id + SID, blogData)
        dispatch('getBlogs')
      } catch (err) { console.error(err) }
    },
    deleteBlog({ commit, dispatch }, blogId) {
      api.delete('blogs/' + blogId + SID)
        .then(res => { dispatch('getBlogs') })
    },
    //#endregion

    //#region --  Recipes Stuff --
    async getRecipes({ commit, dispatch }) {
      try {
        let res = await api.get('recipes' + SID)
        commit('setRecipes', res.data)
      } catch (err) { console.error(err) }
    },
    async saveRecipe({ commit, dispatch }, newRecipe) {
      try {
        let res = await api.post('recipes' + SID, newRecipe)
        commit('setActiveRecipe', res.data)
      } catch (err) { console.error(err) }
    },
    async editRecipe({ commit, dispatch }, payload) {
      try {
        await api.put('recipes/' + payload._id + SID, payload)
        commit("resetRecipe")
        router.push({ name: 'Recipes' })
      } catch (err) { console.error(err) }
    },
    async editRecipeInCosting({ commit, dispatch }, payload) {
      try {
        await api.put('recipes/' + payload._id + SID, payload)
        commit('setActiveRecipe', payload)
      } catch (err) { console.error(err) }
    },
    createActiveRecipe({ commit, dispatch }) {
      commit('resetRecipe')
      let newRecipe = {
        recipeIngredients: [],
        station: "",
        side: "",
        name: "",
        portions: "",
        portionSize: "",
        portionUnit: "",
        costPerRecipe: "",
        calories: "",
        allergens: [],
        salesPrice: ""
      }
      commit('setActiveRecipe', newRecipe)
      if (router.currentRoute.path == '/recipes') {
        router.push({ name: "Costing" })
      }
    },
    async setActiveRecipe({ commit, dispatch }, Recipe) {
      try {
        debugger
        let res = await api.put('recipes/' + Recipe.id + SID, Recipe)
        // localStorage.setItem("KM__activeRecipe", activeRecipe)
        commit('setActiveRecipe', res.data)
        router.push({ name: 'Costing' })
      } catch (err) { console.error(err) }
    },
    // loadLastRecipe({ dispatch, commit }) {
    //   debugger
    //   let activeRecipe = localStorage.getItem("KM__activeRecipe")
    //   if (activeRecipe) {
    //     dispatch('setActiveRecipe', activeRecipe)
    //   }
    // },
    deleteRecipe({ commit, dispatch }, recipeId) {
      api.delete('recipes/' + recipeId + SID)
        .then(res => { dispatch('getRecipes') })
    },
    //#endregion

    //#region -- Ingredient Stuff --
    addIngredient({ commit, dispatch }, newIngredient) {
      commit('setActiveRecipeIngredient', newIngredient)
    },
    editIngredient({ commit, dispatch }, payload) {
      commit('editActiveRecipeIngredient', payload)
    },
    //#endregion
  }
})
