import mongoose from "mongoose"
// import { stringify } from "querystring";
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

let _schema = new Schema({
  blogTitle: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  author: { type: String, required: true },
  blogContent: { type: String, required: true },
  image: { type: String, default: "https://images.unsplash.com/photo-1488992783499-418eb1f62d08?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" },
  siteId: { type: ObjectId, ref: 'Site', required: true }
})


export default class DashboardService {
  get repository() {
    return mongoose.model('Dashboard', _schema)
  }
}