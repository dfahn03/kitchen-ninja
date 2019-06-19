import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
import Inventory from './InventoryService'



let _schema = new Schema({
  itemName: { type: String, required: true },
  category: { type: String, enum: { ''}, required: true },
  brand: { type: String, required: true },
  productNumber: { type: Number, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  newItemCost: { type: Number, required: true },
  packageSize: { type: String },
  packageCost: { type: String },
  otherOrderList: { type: ObjectId, ref: 'Inventory', required: true },
  mainOrderList: { type: ObjectId, ref: 'Inventory', required: true }
})



export default class IngredientService {
  get repository() {
    return mongoose.model('Ingriedent', _schema)
  }
}