<template>
  <tbody class="recipe-ingredient">
    <tr>
      <td><button type="button" class="btn btn-danger btn-sm"
          @click="deleteIngredient(recipeIngredient)">Delete</button>
      </td>
      <td>
        <auto-complete @result="setIngredient" :items="ingredients" @input="setIngredientName" />
      </td>
      <td><input type="number" placeholder="Quantity" min="0" step=".5" v-model="recipeIngredient.quantity"
          class="quan-input" required></td>
      <td><select class="form-control unit-input" placeholder="Unit" readonly="true" v-model="recipeIngredient.unit"
          required>
          <option disabled value="">Unit</option>
          <option value="Oz">OZ</option>
          <option value="Ea">EA</option>
        </select></td>

      <td>
        <input v-if="!calculateCost()" type="text" placeholder="Cost" v-model="recipeIngredient.itemCost"
          class="ingC-input" required>
        <p class="mt-1">{{calculateCost()}}</p>
      </td>

      <!-- <td v-if="recipe-ingredient.category"><input type="text" v-model="recipeIngredient.category" readonly="true"
          class=" category-input1">
      </td> -->
      <td><select class="category-input2" placeholder="Category" v-model="recipeIngredient.category" required>
          <option disabled value="">Category</option>
          <option value="Bakery">Bakery</option>
          <option value="Dairy">Dairy</option>
          <option value="Frozen">Frozen</option>
          <option value="Produce">Produce</option>
          <option value="Meat">Meat</option>
          <option value="Storeroom">Storeroom</option>
        </select>
      </td>
      <td><input type="text" placeholder="Distributor" v-model="recipeIngredient.distributor" class="dist-input"
          required></td>
      <!-- TODO get a input select with a custom input field included -->
      <td><input type="text" placeholder="Product #" readonly="recipeIngredient.productNumber"
          v-model="recipeIngredient.productNumber" class="prod-input" required>
      </td>
      <td><input type="text" placeholder="Brand" readonly="recipeIngredient.brand" v-model="recipeIngredient.brand"
          class="brand-input" required></td>
      <td><input type="text" placeholder="Package Size" readonly="recipeIngredient.packageSize"
          v-model="recipeIngredient.packageSize" class="packS-input" required></td>
      <td><input type="text" placeholder="Package Cost" readonly="recipeIngredient.packageCost"
          v-model="recipeIngredient.packageCost" class="packC-input" required></td>
    </tr>
  </tbody>
</template>

<script>
  import AutoComplete from '@/components/AutoComplete'

  export default {
    name: "RecipeIngredient",
    props: ['recipeIngredient', 'recipeIngredients'],
    data() {
      return {}
    },
    mounted() {
      return this.$store.dispatch("getIngredients")
    },
    computed: {
      ingredients() {
        return this.$store.state.ingredients
      },
    },
    methods: {
      deleteIngredient(ingredient) {
        let index = this.recipeIngredients.indexOf(ingredient)
        this.recipeIngredients.splice(index, 1)
      },
      setIngredientName(val) {
        this.recipeIngredient = {}
        this.recipeIngredient.itemName = val
      },
      setIngredient(autocomplete) {

        // console.log("FROM AUTOCOMPLETE", ingredient)
        this.recipeIngredient = autocomplete.result
        this.recipeIngredient.quantity = 1
        this.recipeIngredients = [this.recipeIngredient]
        this.calculateCost()
      },
      seperatePackage(string) {
        let dict = {}
        if (string.includes('/') && string.includes(' ')) {
          //string coming in looks like "12/12 EA"
          let array = string.split('/').join(" ").split(" ")
          dict["fullCase"] = array[0]
          dict["fullPackage"] = array[1]
          dict["unit"] = array[2]
        } else if (!string.includes(' ')) {
          // strings that look like 12/12EA
          let arr = string.split('/').join(" ").split(" ")
          dict["fullCase"] = arr[0]
          dict["fullPackage"] = arr[1].split(/[a-z]/gi).shift()
          dict["unit"] = arr[1].split(/[0-9]/gi).pop()
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
        let sPDict = this.seperatePackage(fullPackage)
        let pCost = this.totalCost(fullPrice)
        if (sPDict.fullPackage) {
          let fullPkg = +sPDict.fullCase * +sPDict.fullPackage
          let costEA = +pCost / fullPkg
        } else {
          let Pkg = +sPDict.fullCase * 16
          let costOZ = +pCost / Pkg
          return costOZ.toFixed(2)
        }

        return costEA.toFixed(2)
      },
      calculateCost() {
        if (this.recipeIngredient.packageSize && this.recipeIngredient.packageCost) {
          // return this.costPer(this.recipeIngredient.packageSize, this.recipeIngredient.packageCost) * this.recipeIngredient.quantity
        }
      }

    },
    components: { AutoComplete }
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