<template>
  <!-- This is the form for the ingredients it gos to the costing view -->
  <div class="add-form">
    <div class="form-row">
      <div class="col-lg-12 col-md-8 col-sm-6">
        <button type="button" class="btn addIng-btn text-white my-2" @click="addIngredient">Add
          Ingredient <img src="../assets/icons8-plus-25.png" alt="Plus Icon" class="ml-1"></button>
      </div>
      <div class="form-row">
        <div class="col-12">
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
            <add-ingredient @deleteIngredient="test" @sendThatIngredient="ing => recipeIngredients.push(ing)"
              v-for="(recipeIngredient, i) in recipeIngredients" :key="recipeIngredient._id" :i="i"
              :recipe-ingredient="recipeIngredient" />

          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AddIngredient from '@/components/AddIngredient'
  // import EditIngredient from '@/components/EditIngredient'
  export default {
    name: "AddForm",
    data() {
      return {
        // recipeIngredients: []
      }
    },
    computed: {
      recipeIngredients() {
        return this.$store.state.recipe.recipeIngredients || []
      }
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
        this.recipeIngredients.push(newIngredient)
      },
      test(i) {
        this.recipeIngredients.splice(i, 1)
      }
    },
    components: {
      AddIngredient,
      // EditIngredient
    },
    watch: {
      recipeIngredients(val) {
        this.$emit('passThemIngredients', val)
      }
    }
  }

</script>

<style>

</style>