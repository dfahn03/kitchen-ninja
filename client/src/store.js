import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'


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
