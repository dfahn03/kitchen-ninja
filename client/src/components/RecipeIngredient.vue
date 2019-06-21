<template>
  <tbody class="recipe-ingredient">
    <tr>
      <th scope="row">1</th>
      <td><input type="text" placeholder="Distributor" v-model="actualIngredient.distributor"></td>
      <td><input type="text" placeholder="Product Number" v-model="actualIngredient.productNumber"></td>
      <td><input type="text" placeholder="Category" v-model="actualIngredient.category"></td>
      <td><input type="text" placeholder="Ingredient Name" v-model="actualIngredient.itemName"></td>
      <td><input type="text" placeholder="Brand" v-model="actualIngredient.brand"></td>
      <td><input type="text" placeholder="Package Size" v-model="actualIngredient.packageSize"></td>
      <td><input type="text" placeholder="Package Cost" v-model="actualIngredient.packageCost"></td>
      <td><input type="text" placeholder="Quantity" v-model="actualIngredient.quantity"></td>
      <td><input type="text" placeholder="Unit" v-model="actualIngredient.unit"></td>
      <td v-if="ingredientCostCalc"><input type="text" placeholder="Ingredient Cost"
          v-model="itemCost">{{ingredientCostCalc()}}</td>
      <td v-else><input type="text" placeholder="Ingredient Cost" v-model="itemCost"></td>
    </tr>
  </tbody>
</template>

<script>
  export default {
    name: "RecipeIngredient",
    props: ['recipeIngredient'], // use this object if already exists
    data() {
      return {
        itemCost: 0,
        ingredient: { //use this object if creating

        }
      }
    },
    computed: {
      ingredientCostCalc() {
        //TODO finish filling this out so it will auto populate ingredient cost
        //return size/cost * qquantity 
      },
      actualIngredient() { // returns appropriate ingredient object
        return this.recipeIngredient ? this.recipeIngredient : this.ingredient
      }
    },
    methods: {},
    components: {}
  }
</script>