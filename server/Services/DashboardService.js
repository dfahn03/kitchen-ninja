import mongoose from "mongoose"
// import { stringify } from "querystring";
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

let _schema = new Schema({
  title: { type: String, required: true, default: "no desc" },
  authorId: { type: ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, default: "this post needs some content" },
  image: { type: ObjectId, required: false }
})
// TODO insert default image
// default: "https://www.fairfaxcounty.gov/news2/wp-content/uploads/2016/05/meal.jpg"

export default class DashboardService {
  get repository() {
    return mongoose.model('Dashboard', _schema)
  }
}