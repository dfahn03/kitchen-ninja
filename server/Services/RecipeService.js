import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

let _schema = new Schema({
  stations: { type: String, enum: ['Global', 'Grill', 'Salad Bar', 'Hot Entree', 'Deli', 'Soup', 'Breakfast Bar', 'Sushi', 'Southwest', 'Pizza', 'Chef\'s Choice'], required: true },
  name: { type: String, required: true },
  portions: { type: Number, required: true },
  portionSize: { type: Number },
  ingredients: [],
  costPerRecipe: { type: Number }
})




export default class RecipeService {
  get repository() {
    return mongoose.model('Recipe', _schema)
  }
}