<template>
  <div class="costing contianer-fluid">

    <!-- Converter Button -->
    <!-- TODO link this button to the sidebar calculator -->
    <!-- <div class="row">
      <div class="col-12">
        <button type="button" class="btn btn-secondary float-right my-2" @click="">Converter</button>
      </div>
    </div> -->

    <!-- New Recipe Form Template -->
    <div class="row">
      <recipe-form />
    </div>

    <div class="row" v-if="activeRecipe._id">
      <add-ingredients />
    </div>



    <!-- New Ingredient Table -->
    <!-- <add-form @passThemIngredients="arr => newRecipe.recipeIngredients = arr" /> -->

    <!-- New Recipe Calculations -->
    <!-- <div class="form-row">
      <div class="col-12">
        <div class="row">
          <div class="col-6 text-white text-left d-flex justify-content-center">
            <ul>
              <li class="">Cost Per Category:</li>
              <li class="mt-2">Storeroom PL (${{this.storeroom}}) </li>
              <li class="mt-2">Meat PL (${{this.meat}})</li>
              <li class="mt-2">Dairy PL (${{this.dairy}})</li>
              <li class="mt-2">Produce PL (${{this.produce}})</li>
              <li class="mt-2">Bakery PL (${{this.bakery}})</li>
              <li class="mt-2">Frozen PL (${{this.frozen}})</li>
            </ul>
          </div>
          <div class="col-6 text-white d-flex justify-content-center text-left">
            <ul>
              <li v-model="newRecipe.costPerRecipe">Total Cost: $ {{recipeCost}}</li>
              <li class="mt-2">Food Cost: $ {{foodCost}} </li>
              <li>Sales Price: $ <input type="number" placeholder="0.00" class="totalP-input ml-1 mt-2"
                  v-model="newRecipe.salesPrice" required>
              </li>
              <li class="mt-2"> Suggested Price: $ {{suggestedSalesPrice}} </li>
              <li class="mt-2">Profit: $ {{profit}} </li>
              <li class="mt-2">Profit Margin: $ {{profitMargin}} </li>
              <li class="mt-2">Markup: % {{markup}} </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="form-row d-flex justify-content-center align-content-center">
      <button type="submit" class="btn btn-success">Save Recipe</button>
    </div>
    </form>
  </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
  import RecipeForm from '@/components/RecipeForm'
  import AddIngredients from '@/components/AddIngredients'
  // import AddForm from '@/components/AddForm'

  export default {
    name: "Costing",
    mounted() {
      //TODO  ingredients persist on reload 
    },
    props: ["id"],
    data() {
      return {
        storeroom: 0,
        meat: 0,
        dairy: 0,
        produce: 0,
        bakery: 0,
        frozen: 0
      }
    },
    // watch: {
    //   itemCost(nv, ov) {
    //     console.log("itemCost has changed")
    //   },
    //   recipeCost(nv, ov) {
    //     console.log("recipeCost has changed")
    //   },
    //   foodCost(nv, ov) {
    //     console.log("foodCost has changed")
    //   },
    //   profit(nv, ov) {
    //     console.log("profit has changed")
    //   },
    //   profitMargin(nv, ov) {
    //     console.log("profitMargin has changed")
    //   },
    // activeRecipe(nv, ov) {
    //   console.log("active recipe has changed")
    //   this.newRecipe = nv
    // }
    // },
    computed: {
      // recipeIngredient() {
      //   return this.recipeIngredient
      // },
      activeRecipe() {
        return this.$store.state.activeRecipe
      },
      // recipeIngredients() {
      //   return this.$data.newRecipe.recipeIngredients
      // },
      // recipeIngredients() {
      //   return this.$store.state.activeRecipe.recipeIngredients
      // },
      // recipeCost() {
      //   return this.newRecipe.costPerRecipe = this.storeroom + this.meat + this.dairy + this.produce + this.bakery + this.frozen
      // },
      // itemCost() {
      //   this.storeroom = 0
      //   this.meat = 0
      //   this.dairy = 0
      //   this.produce = 0
      //   this.bakery = 0
      //   this.frozen = 0
      //   if (!this.newRecipe.recipeIngredients) {
      //     return 0
      //   }
      //   return this.recipeIngredients.forEach(r => this.$data[r.category.toLowerCase()] += +r.itemCost)
      // },
      // foodCost() {
      //   //totalCost / portions
      //   if (this.newRecipe.portions && this.recipeCost) {
      //     return (this.recipeCost / this.newRecipe.portions).toFixed(2)
      //   }
      // },
      // profit() {
      //   if (this.foodCost && this.newRecipe.salesPrice) {
      //     return (this.newRecipe.salesPrice - this.foodCost).toFixed(2)
      //   }
      // },
      // profitMargin() {
      //   // profit/salesprice
      //   if (this.newRecipe.salesPrice) {
      //     return (this.profit / this.newRecipe.salesPrice).toFixed(2)
      //   }
      // },
      // markup() {
      //   //profit / foodcost
      //   if (this.newRecipe.salesPrice) {
      //     return ((this.profit / this.foodCost) * 100).toFixed(0)
      //   }
      // },
      // suggestedSalesPrice() {
      //   if (this.profitMargin >= .04) {
      //     return (this.foodCost * 1.04).toFixed(2)
      //   }
      // },
      // activeRecipe() {
      //   return this.$store.state.recipe
      // }

    },


    methods: {
      // saveRecipe() {
      //   this.$data.newRecipe.recipeIngredients.forEach(i => {
      //     i.unit = i.unit.toUpperCase();
      //     i.category = i.category.toLowerCase();
      //   })
      //   this.$store.dispatch('saveRecipe', this.newRecipe)
      // }
    },
    components: {
      AddIngredients,
      // AddForm,
      RecipeForm
    }
  }

</script>

<style>
  table {
    border: 1px solid;
  }


  ul {
    list-style: none;
  }

  .totalP-input {
    max-width: 5rem;
    text-align: center;
    height: 1.5rem;
  }

  .totalC-input {
    max-width: 5rem;
    text-align: center;
    height: 1.5rem;
  }
</style>