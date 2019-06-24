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

  },
  mutations: {

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

    //#endregion

    //#region --  Dashboard Stuff --

    //#endregion

    //#region --  Costing Stuff --

    //#endregion

    //#region --  Recipes Stuff --

    //#endregion

    //#region --  Stuff --

    //#endregion

  }
})
