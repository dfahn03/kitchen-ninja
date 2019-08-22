<template>
  <div class="col add-ingredients justify-content-center">
    <!-- Add Ing Button -->
    <div class="row">
      <div class="col-lg-12 col-md-8 col-sm-6 mt-3 mb-1">
        <button type="button" class="btn addIng-btn text-white my-2" @click="addIngredient">Add
          Ingredient <img src="../assets/icons8-plus-25.png" alt="Plus Icon" class="ml-1"></button>
      </div>
    </div>

    <!-- Ingredient Form -->
    <form @submit.prevent="saveIngredients">
      <div class="form-row">
        <div class="col-lg-12 col-md-8 col-sm-3 d-flex justify-content-center">
          <div class="table-responsive">
            <table class="table table-sm text-white">
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
              <tbody v-for="nIngredient in recipeIngredients" :nIngredient="nIngredient" class="recipe-ingredient">
                <tr>
                  <td class="align-middle">
                    <auto-complete @result="setIngredient" :selected="nIngredient" :items="masterIngredients"
                      @input="setIngredientName" id="autocomplete" />
                    <!-- v-bind:quantity.sync="nIngredient.itemName" -->
                  </td>

                  <!-- @oninput="quantity(this.value, nIngredient)" :selected="nIngredient" -->
                  <!-- v-bind:quantity.sync="nIngredient.quantity" -->
                  <td class="align-middle"><input type="number" v-model=" nIngredient.quantity" :selected="nIngredient"
                      @input="quantity" placeholder="Quantity" min="0" step=".5" class="quan-input" required></td>
                  <td class="align-middle"><select class="form-control custom-select-sm unit-input" placeholder="Unit"
                      v-model="nIngredient.unit" required>
                      <option disabled value="">Unit</option>
                      <option value="OZ">OZ</option>
                      <option value="EA">EA</option>
                    </select>
                  </td>

                  <td class="align-middle">
                    <p v-model="nIngredient.itemCost" class="mt-3">{{nIngredient.itemCost}}</p>
                  </td>
                  <td class="align-middle">
                    <p v-model="nIngredient.category" class="mt-3">{{nIngredient.category}}</p>
                  </td>
                  <td class="align-middle"><input type="text" placeholder="Distributor"
                      v-model="nIngredient.distributor" class="dist-input" required> </td>
                  <td class="align-middle">
                    <p v-if="nIngredient.productNumber" v-model="nIngredient.productNumber" class="mt-3">
                      {{nIngredient.productNumber}}</p>
                    <input v-else type="text" placeholder="Product #" v-model="nIngredient.productNumber"
                      class="prod-input" required>
                  </td>
                  <td class="align-middle">
                    <p v-model="nIngredient.brand" class="mt-3">{{nIngredient.brand}}</p>
                  </td>
                  <td class="align-middle">
                    <p v-model="nIngredient.packageSize" class="mt-3">{{nIngredient.packageSize}}</p>
                  </td>
                  <td class="align-middle">
                    <p v-model="nIngredient.packageCost" class="mt-3">{{nIngredient.packageCost}}</p>
                  </td>
                  <td class="align-middle">
                    <img src="../assets/Trash-Can-Red-30.png" alt="Delete Ingredient" title="Delete Ingredient"
                      @click="deleteIngredient(nIngredient)" class="del-ing-btn">
                  </td>
                </tr>
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import AutoComplete from '@/components/AutoComplete'

  export default {
    name: "AddIngredients",
    mounted() {
      this.$store.state.activeRecipe.recipeIngredients
    },
    data() {
      return {
        ingredientIndex: 0,
        ingredient: {},
        ingredients: []
      }
    },
    computed: {
      recipeIngredients() {
        return this.$store.state.activeRecipe.recipeIngredients
      },
      masterIngredients() {
        return this.$store.state.masterIngredients
      },
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
          distributor: ""
        }
        // this.newIngredients.push(newIngredient)
        this.$store.dispatch('addIngredient', newIngredient)
      },
      deleteIngredient(ingredient) {
        let i = this.recipeIngredients.indexOf(ingredient)
        this.recipeIngredients.splice(i, 1)
      },
      setIngredientName(payload) {
        let rec = this.recipeIngredients.find(r => r.name == payload)
        if (!rec) {
          rec = this.recipeIngredients[this.recipeIngredients.length - 1]
        }
        this.ingredientIndex = this.recipeIngredients.indexOf(rec)
        rec.itemName = payload
      },
      setIngredient(autocomplete) {
        let ing = this.recipeIngredients[this.ingredientIndex]
        ing = autocomplete.result
        ing.quantity = 1
        let i = this.ingredientIndex
        this.ingredient = ing
        ing.itemCost = this.calculateCost()
        let payload = {
          ing,
          i
        }
        this.ingredients.push(ing)
        this.$store.dispatch('editIngredient', payload)
      },
      seperatePackage(string) {
        // console.log(string)
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
        // console.log(str)
        let pkgCost = str.split("$").join('')
        return pkgCost
      },
      costPer(fullPackage, fullPrice) {
        // console.log(fullPackage, fullPrice)
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
        // console.log(costEA)
      },
      calculateCost() {
        if (this.ingredient.packageSize && this.ingredient.packageCost) {
          return this.costPer(this.ingredient.packageSize, this.ingredient.packageCost) * this.ingredient.quantity
        }
        return 0
      },
      quantity(val) {
        // var x = document.getElementById("autocomplete").value
        // var x = document.getElementsByClassName("recipe-ingredient")[0].nIngredient;
        // console.log(x)
        // document.getElementById("autocomplete").accessKey = "nIngredient._id"

        // var child = parent.$refs.profile
        // let rec = this.recipeIngredients.find(r => r.name == req.body.itemName)
        // if (!rec) {
        //   rec = this.recipeIngredients[this.recipeIngredients.length - 1]
        // }
        // this.ingredientIndex = this.recipeIngredients.indexOf(rec)
        // let q = rec.quantity
        // if (val.data) {
        //   q = parseFloat(val.data)
        // }
        // let cost = rec.itemCost
        // let newCost = cost * q
        // let ing = rec
        // rec.itemCost = newCost.toFixed(2)
        let q = this.ingredient.quantity
        if (val.data) {
          q = parseFloat(val.data)
        }
        let cost = this.ingredient.itemCost
        let newCost = cost * q
        let ing = this.ingredient
        this.ingredient.itemCost = newCost.toFixed(2)
      },

    },
    components: {
      AutoComplete
    },
    watch: {
      recipeIngredients(nv, ov) {
        this.calculateCost()
      },
      // newIngredients(nv, ov) {
      //   console.log("newIngredients updated")
      // }
      //   recipeIngredients(val) {
      //     this.$emit('passThemIngredients', val)
      //   }
      ingredient(nv, ov) {
        this.$store.dispatch("editIngredient", this.ingredient)
      },
    }
  }

</script>

<style scoped>
  table {
    border: 1px solid;
  }

  /* .table>tbody>tr>td {
    text-align: center;
    vertical-align: middle;
  } */

  .addIng-btn {
    background-color: rgb(5, 38, 45);
  }

  .del-ing-btn {
    cursor: pointer;
  }

  .ingName-input {
    text-align: center;
    max-width: 10rem;
  }

  .quan-input {
    text-align: center;
    max-width: 3.5rem;
  }

  .unit-input {
    text-align: center;
    min-width: 4.5rem;
    /* height: 2rem; */
  }

  .ing-cost {
    text-align: center;
    align-self: center;
  }

  .dist-input {
    text-align: center;
    max-width: 6rem;
    /* max-width: fit-content; */
  }

  .prod-input {
    text-align: center;
    max-width: 6rem;
  }
</style>