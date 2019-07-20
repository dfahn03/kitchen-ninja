<template>
  <tbody class="ingredient-list">
    <tr v-for="newI in recipe" :key="newI._id">
      <td>
        <input type="text" placeholder="Ingredient" v-model="newI.itemName" class="ingName-input" required>
      </td>
      <td><input type="number" placeholder="Quantity" min="0" step=".5" v-model="newI.quantity" class="quan-input"
          required></td>
      <td><select class="form-control unit-input" placeholder="Unit" readonly="true" v-model="newI.unit" required>
          <option disabled value="">Unit</option>
          <option value="OZ">OZ</option>
          <option value="EA">EA</option>
        </select></td>

      <td>
        <input type="text" placeholder="Cost" v-model="newI.itemCost" class="ingC-input" required>
      </td>
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
      <td><input type="text" placeholder="Product #" readonly="newI.productNumber" v-model="newI.productNumber"
          class="prod-input" required>
      </td>
      <td><input type="text" placeholder="Brand" readonly="newI.brand" v-model="newI.brand" class="brand-input"
          required></td>
      <td><input type="text" placeholder="Package Size" readonly="newI.packageSize" v-model="newI.packageSize"
          class="packS-input" required></td>
      <td><input type="text" placeholder="Package Cost" readonly="newI.packageCost" v-model="newI.packageCost"
          class="packC-input" required></td>
      <td><button type="button" class="btn btn-danger btn-sm" @click="$emit('deleteIngredient', i)">Delete</button>
      </td>
    </tr>
  </tbody>
</template>

<script>

  export default {
    name: "IngredientList",
    props: ['recipeIngredients', "i"],
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
      recipe() {
        return this.$store.state.recipe.recipeIngredients
      }
    },
    methods: {
      deleteIngredient(i) {
        this.recipeIngredients.splice(i, 1)
      },
    },

  }
</script>

<style>

</style>