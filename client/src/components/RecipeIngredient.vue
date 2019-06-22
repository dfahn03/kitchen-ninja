<template>
  <tbody class="recipe-ingredient">
    <tr>
      <th scope="row">1</th>
      <td><button type="button" class="btn btn-danger btn-sm"
          @click="deleteIngredient(recipeIngredient.id)">Delete</button>
      </td>
      <td><input type="text" placeholder="Distributor" v-model="recipeIngredient.distributor" class="dist-input"
          required></td>
      <td><input type="text" placeholder="Product #" v-model="recipeIngredient.productNumber" class="prod-input"
          required>
      </td>
      <td><input type="text" placeholder="Category" v-model="recipeIngredient.category" class="cat-input" required></td>
      <td><input type="text" placeholder="Ingredient Name" v-model="recipeIngredient.itemName" class="ingName-input"
          required>
      </td>
      <td><input type="text" placeholder="Brand" v-model="recipeIngredient.brand" class="brand-input" required></td>
      <td><input type="text" placeholder="Package Size" v-model="recipeIngredient.packageSize"
          class="pack requiredS-input" required></td>
      <td><input type="text" placeholder="Package Cost" v-model="recipeIngredient.packageCost" class="packC-input"
          required></td>
      <td><input type="number" placeholder="Quantity" min="0" step=".5" v-model="recipeIngredient.quantity"
          class="quan-input" required></td>
      <td><input type="text" placeholder="Unit" v-model="recipeIngredient.unit" class="unit-input" required></td>
      <td v-if="ingredientCostCalc"><input type="text" placeholder="Ingredient Cost" v-model="itemCost"
          class="ingC-input" required>{{ingredientCostCalc()}}</td>
      <td v-else><input type="text" placeholder="Ingredient Cost" v-model="itemCost" class="ingC2-input" required></td>
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
    computed: {
      ingredientCostCalc() {
        //TODO finish filling this out so it will auto populate ingredient cost
        //return size/cost * qquantity 
      },
      // actualIngredient() { // returns appropriate ingredient object
      //   return this.recipeIngredient ? this.recipeIngredient : this.ingredient
      // }
    },
    methods: {
      deleteIngredient(id) {
        debugger
        return this.recipeIngredients.splice(id)
      }
    },
    components: {}
  }
</script>

<style>
  .dist-input {
    text-align: center;
    max-width: 6rem;
  }

  .prod-input {
    text-align: center;
    max-width: 6rem;
  }

  .cat-input {
    text-align: center;
    max-width: 6rem;
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
    max-width: 3rem;
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
</style>