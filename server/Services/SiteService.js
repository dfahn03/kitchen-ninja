import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId



let _kitchenSchema = new Schema({
  menuId: { type: ObjectId, ref: 'Menu', required: true },
  inventoryId: { type: ObjectId, ref: 'Inventory', required: true }
})


let _schema = new Schema({
  kitchens: [_kitchenSchema]
})

export default class SiteService {
  get repository() {
    return mongoose.model('Site', _schema)
  }
}

