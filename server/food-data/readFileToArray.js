var connection = require('../db/dbconfig')
var MasterIngredientService = require('../Services/MasterIngredientService')

let fs = require('fs')

let data = fs.readFileSync("food.json")
var food = JSON.parse(data.toString());


class Food {
  constructor(data) {
    try {

      if (!data.item || !data.category) {
        throw new Error("STOP EVERYTHING")
      }
      this.itemName = data.item
      if (data.category == "bread") {
        data.category = "bakery"
      }
      if (data.category == "freezer") {
        data.category = "frozen"
      }
      this.category = data.category
      this.brand = data.brand || "Unkown"
      this.productNumber = data.productId || "#N/A"
      this.unit = data.unit || ""
      this.packageSize = data['pack-size'] || ""
      this.packageCost = data['full-price'] || ""
    } catch (e) {
      console.error(e)
    }
  }
}

var foodData = food.map(f => new Food(f))

var service = new MasterIngredientService()

connection.once('open', () => {
  console.log("Connected to DB");

  createFood()
})

async function createFood() {
  try {
    console.log("STARTING DB WRITES");

    var docs = foodData.map(f => {
      return service.repository.create(f)
    })
    var foodDocs = await Promise.all(docs)
    console.log(foodDocs)
    console.log("IT IS DONE");
  } catch (e) {
    console.error(e)
  }
}





