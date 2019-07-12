import Axios from 'axios'
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let auth = Axios.create({
  baseURL: base + "auth/",
  timeout: 3000,
  withCredentials: true
})

export default class AuthService {
  static async authenticate() {
    try {
      let res = await auth.get('authenticate')
      return res.data
    } catch (e) {
      throw new Error("No Login Information availble")
    }
  }
}