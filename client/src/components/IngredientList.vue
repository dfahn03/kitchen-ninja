<template>
  <tbody class="ingredient-list">
    <tr v-for="newI in recipe" :key="newI._id">
      <td><button type="button" class="btn btn-danger btn-sm" @click="$emit('deleteIngredient', i)">Delete</button>
      </td>
      <td>
        <input type="text" placeholder="Ingredient" v-model="newI.ingredient" class="dist-input" required>
        <!-- <auto-complete @result="setIngredient" :items="ingredients" @input="setIngredientName" /> -->
      </td>
      <td><input type="number" placeholder="Quantity" min="0" step=".5" v-model="newI.quantity" class="quan-input"
          required></td>
      <td><select class="form-control unit-input" placeholder="Unit" readonly="true" v-model="newI.unit" required>
          <option disabled value="">Unit</option>
          <option value="OZ">OZ</option>
          <option value="EA">EA</option>
        </select></td>

      <td>
        <!-- <input v-if="!calculateCost()" type="text" placeholder="Cost" v-model="newI.itemCost" class="ingC-input" -->
        required>
        <!-- <p class="mt-1">{{calculateCost()}}</p> -->
      </td>

      <!-- <td v-if="recipe-ingredient.category"><input type="text" v-model="newI.category" readonly="true"
          class=" category-input1">
      </td> -->
      <td><select class="category-input2" placeholder="Category" v-model="newI.category" required>
          <option disabled value="">Category</option>
          <option value="bakery">Bakery</option>
          <option value="dairy">Dairy</option>
          <option value="frozen">Frozen</option>
          <option value="produce">Produce</option>
          <option value="meat">Meat</option>
          <option value="storeroom">Storeroom</option>
        </select>
      </td>
      <td><input type="text" placeholder="Distributor" v-model="newI.distributor" class="dist-input" required>
      </td>
      <!-- TODO get a input select with a custom input field included -->
      <td><input type="text" placeholder="Product #" readonly="newI.productNumber" v-model="newI.productNumber"
          class="prod-input" required>
      </td>
      <td><input type="text" placeholder="Brand" readonly="newI.brand" v-model="newI.brand" class="brand-input"
          required></td>
      <td><input type="text" placeholder="Package Size" readonly="newI.packageSize" v-model="newI.packageSize"
          class="packS-input" required></td>
      <td><input type="text" placeholder="Package Cost" readonly="newI.packageCost" v-model="newI.packageCost"
          class="packC-input" required></td>
    </tr>
  </tbody>
</template>

<script>
  // import AutoComplete from '@/components/AutoComplete'

  export default {
    name: "IngredientList",
    props: ['recipeIngredients', "i"],
    // 'recipeIngredient',
    data() {
      return {
        // newI: this.recipeIngredients[this.i]
      }
    },
    mounted() {
      return this.$store.dispatch("getIngredients")
    },
    computed: {
      ingredients() {
        return this.$store.state.ingredients
      },
      recipe() {
        return this.$store.state.recipe.recipeIngredients
      }
      // newI: {
      //   get: function () {
      //     return this.recipeIngredients[this.i]
      //   },
      //   set: function (whatAmI) {
      //     console.log(whatAmI)
      //   }
      // }
    },
    methods: {
      deleteIngredient(i) {
        this.recipeIngredients.splice(i, 1)
      },
      // setIngredientName(val) {
      //   this.recipeIngredient = {}
      //   this.newI.itemName = val
      // },
      // setIngredient(autocomplete) {
      //   // console.log("FROM AUTOCOMPLETE", ingredient)
      //   this.newI = autocomplete.result
      //   this.newI.quantity = 1
      //   // this.recipeIngredients = [this.newI]
      //   // this.newI.itemCost = this.calculateCost()
      //   this.recipeIngredients[this.i] = this.newI
      // },
      // seperatePackage(string) {
      //   //TODO Needs futher evaluation for various cases
      //   let dict = {}
      //   if (string.includes('/') && string.includes(' ')) {
      //     //string coming in looks like "12/12 EA"
      //     let array = string.split('/').join(" ").split(" ")
      //     dict["fullCase"] = array[0]
      //     dict["fullPackage"] = array[1]
      //     dict["unit"] = array[2]
      //   } else if (!string.includes(' ') && string.includes('/')) {
      //     // strings that look like 12/12EA
      //     let arr = string.split('/').join(" ").split(" ")
      //     dict["fullCase"] = arr[0]
      //     dict["fullPackage"] = arr[1].split(/[a-z]/gi).shift()
      //     dict["unit"] = arr[1].split(/[0-9]/gi).pop()
      //   } else if (!string.includes(' ')) {
      //     let arr = string.split(/[a-z]/gi)
      //     dict["fullCase"] = arr[0]
      //     dict["unit"] = arr[2]
      //   }
      //   else {
      //     // strings that look like 12 EA
      //     let array = string.split(" ")
      //     dict["fullCase"] = array[0]
      //     dict["unit"] = array[1]
      //   }
      //   return dict
      // },
      // totalCost(str) {
      //   let pkgCost = str.split("$").join('')
      //   return pkgCost
      // },
      // costPer(fullPackage, fullPrice) {
      //   let costEA = 0
      //   let sPDict = this.seperatePackage(fullPackage)
      //   let pCost = this.totalCost(fullPrice)
      //   if (sPDict.fullPackage) {
      //     let fullPkg = +sPDict.fullCase * +sPDict.fullPackage
      //     costEA = +pCost / fullPkg
      //   } else {
      //     let Pkg = +sPDict.fullCase * 16
      //     let costOZ = +pCost / Pkg
      //     return costOZ.toFixed(2)
      //   }

      //   return costEA.toFixed(2)
      // },
      // calculateCost() {
      //   if (this.newI.packageSize && this.newI.packageCost) {
      //     return this.costPer(this.newI.packageSize, this.newI.packageCost) * this.newI.quantity
      //   }
      // },
    },
    // components: { AutoComplete }

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

  .category-input1 {
    text-align: center;
    max-width: 6rem;
    height: 2rem;
  }

  .category-input2 {
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