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

export default new Vuex.Store({
  state: {
    ingredient: {},
    ingredients: [],
    recipe: {},
    recipes: []
  },
  mutations: {
    setIngredients(state, ingredients) {
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
    }
  },
  actions: {

    //#region -- Auth Stuff --
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'dashboard' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          if (router.currentRoute.name !== '') {
            router.push({ name: 'dashboard' })
          }
        })
        .catch(res => {
          router.push({ name: 'dashboard' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'dashboard' })
        })
    },

    async logout({ commit, dispatch }) {
      await auth.delete('logout')
      commit('setUser', {})
      router.push({ name: 'dashboard' })
    },
    //#endregion

    //#region -- MasterIngredient Stuff --
    async getIngredients({ commit, dispatch }) {
      try {
        let res = await api.get("ingredients")
        commit('setIngredients')
      } catch (error) {
        console.error(error)

      }
    },
    //#endregion

    //#region --  Dashboard Stuff --

    //#endregion

    //#region --  Costing Stuff --

    //#endregion

    //#region --  Recipes Stuff --
    getRecipes({ commit, dispatch }) {
      api.get('recipes')
        .then(res => {
          commit('setRecipes', res.data)
        })
    },
    async saveRecipe({ commit, dispatch }, recipeData) {
      try {
        let res = api.post('recipes', recipeData)
        dispatch('getRecipes')
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
      api.delete('recipes/' + recipeId)
        .then(res => {
          dispatch('getRecipes')
        })
    },

    async editRecipe({ commit, dispatch }, payload) {
      try {
        await api.put('recipes/' + payload._id, payload)
        dispatch('getRecipes')
      } catch (error) { console.error(error) }
    },
    //#endregion

    //#region --  Stuff --

    //#endregion

  }
})
