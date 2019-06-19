import mongoose from 'mongoose'
const Schema = mongoose.Schema


let _schema = new Schema({
  itemName: { type: String, required: true },
  category: { type: String, enum: ['Bakery', 'Dairy', 'Frozen', 'Meat', 'Produce', 'Storeroom'], required: true },
  brand: { type: String, required: true },
  productNumber: { type: Number, required: true },
  unit: { type: String, required: true },
  packageSize: { type: String },
  packageCost: { type: String }
})



export default class MasterIngredientService {
  get repository() {
    return mongoose.model('MasterIngriedent', _schema)
  }
}