<template>
  <tbody class="recipe-ingredient" v-for="ingredient in recipeIngredients">
    <tr>
      <th scope="row">1</th>
      <td><input type="text" placeholder="Distributor" v-model="{{recipeIngredient.distributor}}"></td>
      <td><input type="text" placeholder="Product Number" v-model="{{recipeIngredient.productNumber}}"></td>
      <td><input type="text" placeholder="Category" v-model="{{recipeIngredient.category}}"></td>
      <td><input type="text" placeholder="Ingredient Name" v-model="{{recipeIngredient.itemName}}"></td>
      <td><input type="text" placeholder="Brand" v-model="{{recipeIngredient.brand}}"></td>
      <td><input type="text" placeholder="Package Size" v-model="{{recipeIngredient.packageSize}}"></td>
      <td><input type="text" placeholder="Package Cost" v-model="{{recipeIngredient.packageCost}}"></td>
      <td><input type="text" placeholder="Quantity" v-model="{{recipeIngredient.quantity}}"></td>
      <td><input type="text" placeholder="Unit" v-model="{{recipeIngredient.unit}}"></td>
      <td><input type="text" placeholder="Ingredient Cost" :v-model="if(!ingredientCostCalc) {return }"></td>
      <!-- TODO finish v-model conditional to show calculator cost or empty if user needs to enter it -->
    </tr>
  </tbody>
</template>

<script>
  export default {
    name: "RecipeIngredient",
    props: ['recipeIngredient'],
    data() {
      return {

      }
    },
    computed: {
      ingredientCostCalc() {
        //TODO finish filling this out so it will auto populate ingredient cost
      }
    },
    methods: {},
    components: {}
  }
</script>