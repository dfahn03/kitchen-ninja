import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId



let _kitchenSchema = new Schema({
  menuId: { type: ObjectId, ref: 'Menu' },
  inventoryId: { type: ObjectId, ref: 'Inventory' },
  name: { type: String, required: true }
})


let _schema = new Schema({
  kitchens: [_kitchenSchema],
  // userId: { type: ObjectId, ref: 'User', required: true }
  name: { type: String, required: true },
  passcode: { type: String, required: true },
})

export default class SiteService {
  get repository() {
    return mongoose.model('Site', _schema)
  }
}

