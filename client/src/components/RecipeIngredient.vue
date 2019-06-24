<template>
  <tbody class="recipe-ingredient">
    <tr>
      <th scope="row">1</th>
      <td><button type="button" class="btn btn-danger btn-sm"
          @click="deleteIngredient(recipeIngredient)">Delete</button>
      </td>
      <td><select class="form-control category-input" placeholder="Category" v-model="recipeIngredient.category"
          required>
          <option disabled value="">Choose Category</option>
          <option value="Bakery">Bakery</option>
          <option value="Dairy">Dairy</option>
          <option value="Frozen">Frozen</option>
          <option value="Produce">Produce</option>
          <option value="Meat">Meat</option>
          <option value="Storeroom">Storeroom</option>
        </select></td>
      <td><input type="text" placeholder="Ingredient Name" v-model="recipeIngredient.itemName" class="ingName-input"
          required>
      </td>
      <td><input type="text" placeholder="Distributor" v-model="recipeIngredient.distributor" class="dist-input"
          required></td>
      <!-- TODO get a input select with a custom input field included -->
      <td><input type="text" placeholder="Product #" v-model="recipeIngredient.productNumber" class="prod-input"
          required>
      </td>
      <td><input type="text" placeholder="Brand" v-model="recipeIngredient.brand" class="brand-input" required></td>
      <td><input type="text" placeholder="Package Size" v-model="recipeIngredient.packageSize" class="packS-input"
          required></td>
      <td><input type="text" placeholder="Package Cost" v-model="recipeIngredient.packageCost" class="packC-input"
          required></td>
      <td><input type="number" placeholder="Quantity" min="0" step=".5" v-model="recipeIngredient.quantity"
          class="quan-input" required></td>
      <!-- <td><input type="text" placeholder="Unit" v-model="recipeIngredient.unit" class="unit-input" required></td> -->
      <td><select class="form-control unit-input" placeholder="Unit" v-model="recipeIngredient.unit" required>
          <option disabled value="">Unit</option>
          <option value="Oz">Oz</option>
          <option value="Ea">Ea</option>
        </select></td>
      <td v-if="ingredientCostCalc"><input type="text" placeholder="Cost" v-model="recipeIngredient.itemCost"
          class="ingC-input" required>{{ingredientCostCalc()}}</td>
      <td v-else><input type="text" placeholder="Cost" v-model="recipeIngredient.itemCost" class="ingC2-input" required>
      </td>
    </tr>
  </tbody>
</template>

<script>
  export default {
    name: "RecipeIngredient",
    props: ['recipeIngredient', 'recipeIngredients'], // use this object if already exists
    data() {
      return {
        itemCost: 0,
        // id: this.recipeIngredient._id,
        ingredient: { //use this object if creating

        }
      }
    },
    mounted() {
      return this.$store.dispatch("getIngredients")
    },
    computed: {
      seperatePackage(string) {
        let dict = {}
        if (string.includes('/') && string.includes(' ')) {
          let array = string.split('/').join(" ").split(" ")
          dict["fullCase"] = array[0]
          dict["fullPackage"] = array[1]
          dict["unit"] = array[2]
        } else if (!string.includes(' ')) {
          let arr = string.split('/').join(" ").split(" ")
          dict["fullCase"] = arr[0]
          dict["fullPackage"] = arr[1].split(/[a-z]/gi).shift()
          dict["unit"] = arr[1].split(/[0-9]/gi).pop()
        }
        else {
          let array = string.split(" ")
          dict["fullCase"] = array[0]
          dict["unit"] = array[1]
        }
        return dict
      },
      totalCost(str) {
        let pkgCost = str.split("$").join('')
        return pkgCost
      },
      costPer(fullPackage, fullPrice) {
        let sPDict = this.seperatePackage(fullPackage)
        let pCost = this.totalCost(fullPrice)
        let fullPkg = sPDict['fullCase'] * sPDict['package']
        let costEA = pCost / fullPkg
        return costEA
      },

      ingredientCostCalc() {
        // this.$store.dispatch(costPer, payload)
        //TODO finish filling this out so it will auto populate ingredient cost
        //return size/cost * qquantity 
      },
      // actualIngredient() { // returns appropriate ingredient object
      //   return this.recipeIngredient ? this.recipeIngredient : this.ingredient
      // }
    },
    methods: {
      deleteIngredient(ingredient) {
        let index = this.recipeIngredients.indexOf(ingredient)
        this.recipeIngredients.splice(index, 1)
        //return this.recipeIngredients.filter(recipeIngredient => this.recipeIngredient.tempId !== id)
        //TODO Be able to delete the specific ingredient in the array with the specific tempId
      }
    },
    components: {}
  }
</script>

<style>
  .dist-input {
    text-align: center;
    max-width: 9rem;
  }

  .prod-input {
    text-align: center;
    max-width: 6rem;
  }

  .category-input {
    text-align: center;
    min-width: 8rem;
    height: 2rem;
  }

  .ingName-input {
    text-align: center;
    max-width: 10rem;
  }

  .brand-input {
    text-align: center;
    max-width: 6rem;
  }

  .unit-input {
    text-align: center;
    min-width: 5rem;
    height: 2rem;
  }

  .packS-input {
    text-align: center;
    max-width: 7rem;
  }

  .packC-input {
    text-align: center;
    max-width: 7rem;
  }

  .quan-input {

    max-width: 3rem;
  }

  .ingC-input {
    text-align: center;
    max-width: 5rem;
  }

  .ingC2-input {
    text-align: center;
    max-width: 5rem;
  }
</style>