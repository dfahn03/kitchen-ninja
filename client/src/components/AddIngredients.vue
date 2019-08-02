<template>
  <div class="col add-ingredients justify-content-center">
    <!-- Add Ing Button -->
    <div class="row">
      <div class="col-lg-12 col-md-8 col-sm-6">
        <button type="button" class="btn addIng-btn text-white my-2" @click="addIngredient">Add
          Ingredient <img src="../assets/icons8-plus-25.png" alt="Plus Icon" class="ml-1"></button>
      </div>
    </div>

    <!-- Ingredient Form -->
    <form @submit.prevent="saveIngredients">
      <div class="form-row">
        <div class="col-lg-12 col-md-8 col-sm-3">
          <div class="table-responsive">
            <table class="table text-white">
              <thead>
                <tr>
                  <th scope="col">Ingredient Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Ingredient Cost</th>
                  <th scope="col">Category</th>
                  <th scope="col">Distributor</th>
                  <th scope="col">Product #</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Package Size</th>
                  <th scope="col">Package Cost</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody v-for="rIngredient in recipeIngredients" :rIngredient="rIngredient" class="recipe-ingredient">
                <tr>
                  <td>
                    <auto-complete @result="setIngredient" :selected="rIngredient" :items="ingredients"
                      @input="setIngredientName(rIngredient)" />
                  </td>
                  <td><input type="number" placeholder="Quantity" min="0" step=".5" v-model="rIngredient.quantity"
                      class="quan-input" required></td>
                  <td><select class="form-control unit-input" placeholder="Unit" readonly="true"
                      v-model="rIngredient.unit" required>
                      <option disabled value="">Unit</option>
                      <option value="OZ">OZ</option>
                      <option value="EA">EA</option>
                    </select>
                  </td>
                  <td> <input v-if="!calculateCost()" type="text" placeholder="Cost" v-model="rIngredient.itemCost"
                      class="ingC-input" required>
                    <p v-else class="mt-1">{{calculateCost()}}</p>
                  </td>
                  <td><select class="category-input2" placeholder="Category" v-model="rIngredient.category" required>
                      <option disabled value="">Category</option>
                      <option value="bakery">Bakery</option>
                      <option value="dairy">Dairy</option>
                      <option value="frozen">Frozen</option>
                      <option value="produce">Produce</option>
                      <option value="meat">Meat</option>
                      <option value="storeroom">Storeroom</option>
                    </select> </td>
                  <td><input type="text" placeholder="Distributor" v-model="rIngredient.distributor" class="dist-input"
                      required> </td>
                  <td><input type="text" placeholder="Product #" readonly="ingredient.productNumber"
                      v-model="rIngredient.productNumber" class="prod-input" required>
                  </td>
                  <td><input type="text" placeholder="Brand" readonly="ingredient.brand" v-model="rIngredient.brand"
                      class="brand-input" required> </td>
                  <td><input type="text" placeholder="Package Size" readonly="ingredient.packageSize"
                      v-model="rIngredient.packageSize" class="packS-input" required> </td>
                  <td><input type="text" placeholder="Package Cost" readonly="ingredient.packageCost"
                      v-model="rIngredient.packageCost" class="packC-input" required> </td>
                  <td>
                    <button type="button" class="btn btn-danger btn-sm"
                      @click="deleteIngredient(ingredient)">Delete</button>
                  </td>
                </tr>
              </tbody>

            </table>
          </div>
        </div>
      </div>
      <!-- TODO Add submit button to save(put request) ingredients into recipe -->
    </form>
  </div>
</template>

<script>
  import AutoComplete from '@/components/AutoComplete'

  export default {
    name: "AddIngredients",
    // props: {
    //   ingredient: { bind: true, type: Object, required: true },
    //   i: Number
    // },
    mounted() {
      this.ingredient = { ...this.recipeIngredient }
      this.$store.state.activeRecipe
    },
    data() {
      return {
        // recipeIngredients: [],
        // ingredient: {}
      }
    },
    computed: {
      recipeIngredients() {
        return this.$store.state.activeRecipe.recipeIngredients
      },
      ingredients() {
        return this.$store.state.masterIngredients
      },
      // ingredient:
      // {
      //   get() {
      //     return this.$store.state.recipe.recipeIngredients[this.i]
      //   },
      //   set() {

      //   }
      // }
    },
    methods: {
      addIngredient() {
        let newIngredient = {
          itemName: "",
          category: "",
          brand: "",
          productNumber: 0,
          quantity: 1,
          unit: "",
          itemCost: 0,
          packageSize: "",
          packageCost: "",
          distributor: "",
        }
        this.$store.dispatch('addIngredient', newIngredient)
      },
      // test(i) {
      //   this.recipeIngredients.splice(i, 1)
      // },
      deleteIngredient(ingredient) {
        let i = this.recipeIngredients.indexOf(ingredient)
        this.recipeIngredients.splice(i, 1)
      },
      setIngredientName(rIngredient, val) {
        let i = this.recipeIngredients.indexOf(rIngredient)
        this.recipeIngredients[i].itemName = val
        // TODO Get this working for autocomplete
      },
      setIngredient(autocomplete) {
        // console.log("FROM AUTOCOMPLETE", ingredient)
        this.rIngredient = autocomplete.result
        this.rIngredient.quantity = 1
        // this.recipeIngredients = [this.ingredient]
        this.rIngredient.itemCost = this.calculateCost()
        // TODO Get this working for autocomplete
      },
      seperatePackage(string) {
        //TODO Needs futher evaluation for various cases
        let dict = {}
        if (string.includes('/') && string.includes(' ')) {
          //string coming in looks like "12/12 EA"
          let array = string.split('/').join(" ").split(" ")
          dict["fullCase"] = array[0]
          dict["fullPackage"] = array[1]
          dict["unit"] = array[2]
        } else if (!string.includes(' ') && string.includes('/')) {
          // strings that look like 12/12EA
          let arr = string.split('/').join(" ").split(" ")
          dict["fullCase"] = arr[0]
          dict["fullPackage"] = arr[1].split(/[a-z]/gi).shift()
          dict["unit"] = arr[1].split(/[0-9]/gi).pop()
        } else if (!string.includes(' ')) {
          let arr = string.split(/[a-z]/gi)
          dict["fullCase"] = arr[0]
          dict["unit"] = arr[2]
        }
        else {
          // strings that look like 12 EA
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
        let costEA = 0
        let sPDict = this.seperatePackage(fullPackage)
        let pCost = this.totalCost(fullPrice)
        if (sPDict.fullPackage) {
          let fullPkg = +sPDict.fullCase * +sPDict.fullPackage
          costEA = +pCost / fullPkg
        } else {
          let Pkg = +sPDict.fullCase * 16
          let costOZ = +pCost / Pkg
          return costOZ.toFixed(2)
        }

        return costEA.toFixed(2)
      },
      calculateCost() {
        if (this.ingredient.packageSize && this.ingredient.packageCost) {
          return this.costPer(this.ingredient.packageSize, this.ingredient.packageCost) * this.ingredient.quantity
        }
        return 0
      },
    },
    components: {
      AutoComplete
    },
    // watch: {
    //   recipeIngredients(val) {
    //     this.$emit('passThemIngredients', val)
    //   }
    // }
  }

</script>

<style scoped>
  table {
    border: 1px solid;
  }

  .addIng-btn {
    background-color: rgb(5, 38, 45);
  }

  .ingName-input {
    text-align: center;
    max-width: 10rem;
  }

  .dist-input {
    text-align: center;
    max-width: 9rem;
  }

  .prod-input {
    text-align: center;
    max-width: 6rem;
  }

  .category-input1 {
    text-align: center;
    max-width: 6rem;
    height: 2rem;
  }

  /* .category-input2 {
    text-align: center;
    min-width: 8rem;
    height: 2rem;
  } */

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