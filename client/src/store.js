import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import { runInNewContext } from 'vm';



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
    blogs: []
  },
  mutations: {
    setSites(state, sites) {
      state.sites = sites
    },
    setSite(state, siteId) {

      SID += siteId
      state.site = state.sites.memberSites.find(s => s._id == siteId) || state.sites.mySites.find(s => s._id == siteId)
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
      state.recipes = recipes
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
          commit('setUser', res.data)
          dispatch('selectSite', res.data._id)
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
          // router.push({ name: 'dashboard' })
        })
    },
    async getUserSites({ commit, dispatch }, userId) {
      try {
        let res = await api.get('sites/' + userId)
        commit('setSites', res.data)
        console.log(res)
      } catch (error) { console.error(error) }
    },
    async selectSite({ commit, dispatch }, siteId) {
      try {

        // let res = await api.get('sites/' + siteId)
        commit('setSite', siteId)
        // console.log(res)
        router.push({ name: 'dashboard' })
      } catch (error) { console.error(error) }
    },
    logout({ commit, dispatch }, creds) {
      auth.delete('logout', creds)
        .then(res => {
          commit('setUser', {})
          router.push({ name: 'Login' })
        })
    },
    deleteUser({ commit, dispatch }, userId) {
      api.delete('auth/' + SID + userId)
        .then(res => {
          dispatch('getUsers')
        })
    },
    async editUser({ commit, dispatch }, payload) {
      try {
        await api.put('auth/' + SID + payload._id, payload)
        commit('setUser', payload.data)
        dispatch('getUsers')
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
        let res = await api.get('' + SID)
        commit('setBlogs', res.data)
      } catch (error) { console.error(error) }
    },
    async createBlog({ commit, dispatch }, newBlog) {
      try {
        debugger
        let res = await api.post('blogs' + SID, newBlog)
        dispatch('getBlogs', res.data)
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
    getRecipes({ commit, dispatch }) {
      api.get('recipes')
        .then(res => {
          commit('setRecipes' + SID, res.data)
        })
    },
    async saveRecipe({ commit, dispatch }, newRecipe) {
      try {
        let res = api.post('recipes' + SID, newRecipe)
        router.push({ name: 'Recipes' })
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
      } catch (error) { console.error(error) }
    },
    //#endregion

    //#region --  Stuff --

    //#endregion

  }
})
