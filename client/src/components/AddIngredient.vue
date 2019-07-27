<template>
  <!-- Recipe ingredient once an ingredient field is added takes in auto-complete fills out information sends to database -->
  <tbody class="recipe-ingredient" v-if="ingredient">
    <tr>
      <td>
        <auto-complete @result="setIngredient" :selected="ingredient" :items="ingredients" @input="setIngredientName" />
      </td>
      <td><input type="number" placeholder="Quantity" min="0" step=".5" v-model="ingredient.quantity" class="quan-input"
          required></td>
      <td><select class="form-control unit-input" placeholder="Unit" readonly="true" v-model="ingredient.unit" required>
          <option disabled value="">Unit</option>
          <option value="OZ">OZ</option>
          <option value="EA">EA</option>
        </select></td>

      <td>
        <input v-if="!calculateCost()" type="text" placeholder="Cost" v-model="ingredient.itemCost" class="ingC-input"
          required>
        <p class="mt-1">{{calculateCost()}}</p>
      </td>
      <td><select class="category-input2" placeholder="Category" v-model="ingredient.category" required>
          <option disabled value="">Category</option>
          <option value="bakery">Bakery</option>
          <option value="dairy">Dairy</option>
          <option value="frozen">Frozen</option>
          <option value="produce">Produce</option>
          <option value="meat">Meat</option>
          <option value="storeroom">Storeroom</option>
        </select>
      </td>
      <td><input type="text" placeholder="Distributor" v-model="ingredient.distributor" class="dist-input" required>
      </td>
      <td><input type="text" placeholder="Product #" readonly="ingredient.productNumber"
          v-model="ingredient.productNumber" class="prod-input" required>
      </td>
      <td><input type="text" placeholder="Brand" readonly="ingredient.brand" v-model="ingredient.brand"
          class="brand-input" required></td>
      <td><input type="text" placeholder="Package Size" readonly="ingredient.packageSize"
          v-model="ingredient.packageSize" class="packS-input" required></td>
      <td><input type="text" placeholder="Package Cost" readonly="ingredient.packageCost"
          v-model="ingredient.packageCost" class="packC-input" required></td>
      <td><button type="button" class="btn btn-danger btn-sm" @click="$emit('deleteIngredient', i)">Delete</button>
      </td>
    </tr>
  </tbody>
</template>

<script>
  import AutoComplete from '@/components/AutoComplete'

  export default {
    name: "RecipeIngredient",
    props: ['recipeIngredient', "i"],
    data() {
      return {
        ingredient: {}
      }
    },
    mounted() {
      this.ingredient = { ...this.recipeIngredient }
      // return this.$store.dispatch("getIngredients")
    },
    computed: {
      ingredients() {
        return this.$store.state.ingredients
      },
    },
    methods: {
      deleteIngredient(i) {
        this.recipeIngredients.splice(i, 1)
      },
      setIngredientName(val) {
        this.ingredient.itemName = val
      },
      setIngredient(autocomplete) {
        // console.log("FROM AUTOCOMPLETE", ingredient)
        this.ingredient = autocomplete.result
        this.ingredient.quantity = 1
        // this.recipeIngredients = [this.ingredient]
        this.ingredient.itemCost = this.calculateCost()
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
    components: { AutoComplete }

  }
</script>

<style>

</style>