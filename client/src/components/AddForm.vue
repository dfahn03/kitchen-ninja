<template>
  <!-- This is the form for the ingredients it gos to the costing view -->
  <div class="form-row add-form justify-content-center">
    <div class="col-lg-12 col-md-8 col-sm-6">
      <button type="button" class="btn addIng-btn text-white my-2" @click="addIngredient">Add
        Ingredient <img src="../assets/icons8-plus-25.png" alt="Plus Icon" class="ml-1"></button>
    </div>
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
  // import AddIngredient from '@/components/AddIngredient'

  // export default {
  //   name: "AddForm",
  //   data() {
  //     return {
  //       // recipeIngredients: []
  //     }
  //   },
  //   computed: {
  //     // recipeIngredients() {
  //     //   return this.$store.state.recipe.recipeIngredients
  //     //   // NOTE This is state & not local so shouldn't be here
  //     // }
  //   },
  //   methods: {
  //     addIngredient() {
  //       let newIngredient = {
  //         itemName: "",
  //         category: "",
  //         brand: "",
  //         productNumber: 0,
  //         quantity: 1,
  //         unit: "",
  //         itemCost: 0,
  //         packageSize: "",
  //         packageCost: "",
  //         distributor: "",
  //       }
  //       this.recipeIngredients.push(newIngredient)
  //       // NOTE This is pushing to local data on this component
  //     },
  //     test(i) {
  //       this.recipeIngredients.splice(i, 1)
  //     }
  //   },
  //   components: {
  //     AddIngredient,
  //   },
  //   watch: {
  //     recipeIngredients(val) {
  //       this.$emit('passThemIngredients', val)
  //     }
  //   }
  // }

</script>

<style>
  .dist-input {
    text-align: center;
    max-width: 9rem;
  }

  .addIng-btn {
    background-color: rgb(5, 38, 45);
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