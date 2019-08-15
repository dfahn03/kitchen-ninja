var mongoose = require('mongoose')
const Schema = mongoose.Schema

let _schema = new Schema({
  itemName: { type: String, required: true },
  category: { type: String, enum: ['bakery', 'dairy', 'frozen', 'meat', 'produce', 'storeroom'], required: true },
  brand: { type: String },
  productNumber: { type: String },
  unit: { type: String },
  packageSize: { type: String },
  packageCost: { type: String },
  distributor: []
})



export default class MasterIngredientService {
  get repository() {
    return mongoose.model('MasterIngredients', _schema)
  }
}
// module.exports = MasterIngredientService