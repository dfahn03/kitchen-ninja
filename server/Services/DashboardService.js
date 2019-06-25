import mongoose from "mongoose"
import { stringify } from "querystring";
const Schema = mongoose.Schema
const objectId = Schema.Types.ObjectId

let _schema = new Schema({
  title: { type: stringify, required: true, default: "no desc" },
  authorId: { type: objectId, ref: 'User', required: true },
  content: { type: Text, required: true, default: "this post needs some content" },
  image: { type: Image, required: false, default: "https://www.fairfaxcounty.gov/news2/wp-content/uploads/2016/05/meal.jpg" }
})


export default class DashboardService {
  get repository() {
    return mongoose.model('Dashboard', _schema)
  }
}