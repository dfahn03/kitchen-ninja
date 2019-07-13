<template>
  <div class="costing">
    <!-- Converter Button -->
    <div class="row">
      <div class="col-12">
        <button type="button" class="btn btn-secondary float-right my-2" @click="">Converter</button>
        <!-- TODO link this button to the sidebar calculator -->
      </div>
    </div>
    <!-- Recipe Form -->
    <div class="row">
      <div class="col">
        <form @submit.prevent="saveRecipe">
          <div class="form-row">
            <div class="col d-flex justify-content-center">
              <input type="text" class="form-control recipeName-input" placeholder="Recipe Name"
                v-model="newRecipe.name" required>
              <input type="number" class="form-control portions-input ml-1" placeholder="Portions"
                v-model="newRecipe.portions" min="0" required>
              <input type="number" class="form-control portionS-input ml-1" placeholder="Portion Size"
                v-model="newRecipe.portionSize" min="0" step=".5" required>
              <select class="form-control portionU-input ml-1" v-model="newRecipe.portionUnit" required>
                <option disabled value="">Unit</option>
                <option value="OZ">OZ</option>
                <option value="EA">EA</option>
              </select>
              <select class="form-control side-input ml-1" v-model="newRecipe.side" required>
                <option disabled value="">Side</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <select class="form-control station-input ml-1" v-model="newRecipe.station" required>
                <option disabled value="">Choose Station</option>
                <option value="Global">Global</option>
                <option value="Grill">Grill</option>
                <option value="Salad Bar">Salad Bar</option>
                <option value="Hot Entree">Hot Entree</option>
                <option value="Deli">Deli</option>
                <option value="Soup">Soup</option>
                <option value="Breakfast Bar">Breakfast Bar</option>
                <option value="Sushi">Sushi</option>
                <option value="Southwest">Southwest</option>
                <option value="Pizza">Pizza</option>
                <option value="Chef's Choice">Chef's Choice</option>
              </select>
              <input type="number" class="form-control calories-input ml-1" placeholder="Calories"
                v-model="newRecipe.calories" min="0" required>
              <input type="text" class="form-control allergens-input ml-1" placeholder="Allergens"
                v-model="newRecipe.allergens" min="0" required>
            </div>
          </div>
          <ingredient @passThemIngredients="arr => newRecipe.recipeIngredients = arr" />
          <div class="form-row">
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
                  <!--run a for each on each  category using ingcostcalc
                  total is all added-->
                </div>
                <div class="col-6 text-white d-flex justify-content-center text-left">
                  <ul>
                    <li v-model="newRecipe.costPerRecipe">Total Cost: $ {{recipeCost}}</li>
                    <li class="mt-2">Food Cost: $ {{foodCost}} </li>
                    <!-- TODO possibly recommended sales price -->
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
          <!-- v-if="!req.params.id" -->
          <!-- v-else -->
          <div class="form-row d-flex justify-content-center align-content-center">
            <button type="submit" class="btn btn-success">Save Recipe</button>
            <button type="submit" class="btn btn-warning ml-1">Update Recipe</button>
          </div>
        </form>
      </div>
    </div>
    <!-- Recipe Form -->
  </div>
</template>

<script>
  import RecipeIngredient from '@/components/RecipeIngredient'
  import Ingredient from '@/components/Ingredient'
  export default {
    name: "Costing",
    mounted() {
      this.$store.dispatch('getIngredients')
      if (this.id) {
        this.newRecipe = this.$store.state.recipes.find(r => r._id == this.id)
      };
      // if (ActiveRecipe) {
      //   this.store.dispatch('setRecipe')
      // }
      //TODO  ingredients persist on reload 
    },
    props: ["id"],
    data() {
      return {
        newRecipe: {
          recipeIngredients: [],
          station: "",
          side: "",
          name: "",
          portions: "",
          portionSize: "",
          portionUnit: "",
          costPerRecipe: "",
          calories: "",
          allergens: [],
          salesPrice: ""
        },
        storeroom: 0,
        meat: 0,
        dairy: 0,
        produce: 0,
        bakery: 0,
        frozen: 0
      }
    },
    watch: {
      itemCost(nv, ov) {
        // Leave watcher to run computed
        console.log("itemCost has changed")
      },
      recipeCost(nv, ov) {
        console.log("recipeCost has changed")
      },
      foodCost(nv, ov) {
        console.log("foodCost has changed")
      },
      profit(nv, ov) {
        console.log("profit has changed")
      },
      profitMargin(nv, ov) {
        console.log("profitMargin has changed")
      },
      activeRecipe(nv, ov) {
        console.log("active recipe has changed")
        this.newRecipe = nv
      }

    },
    computed: {
      recipeIngredient() {
        return this.recipeIngredient
      },
      recipeIngredients() {
        return this.$data.newRecipe.recipeIngredients
      },
      recipeCost() {
        return this.newRecipe.costPerRecipe = this.storeroom + this.meat + this.dairy + this.produce + this.bakery + this.frozen
      },
      itemCost() {
        this.storeroom = 0
        this.meat = 0
        this.dairy = 0
        this.produce = 0
        this.bakery = 0
        this.frozen = 0
        if (!this.newRecipe.recipeIngredients) {
          return 0
        }
        return this.newRecipe.recipeIngredients.forEach(r => this.$data[r.category.toLowerCase()] += +r.itemCost)
      },
      foodCost() {
        //totalCost / portions
        if (this.newRecipe.portions && this.recipeCost) {
          return (this.recipeCost / this.newRecipe.portions).toFixed(2)
        }
      },
      profit() {
        if (this.foodCost && this.newRecipe.salesPrice) {
          return (this.newRecipe.salesPrice - this.foodCost).toFixed(2)
        }
      },
      profitMargin() {
        // profit/salesprice
        if (this.newRecipe.salesPrice) {
          return (this.profit / this.newRecipe.salesPrice).toFixed(2)
        }
      },
      markup() {
        //profit / foodcost
        if (this.newRecipe.salesPrice) {
          return ((this.profit / this.foodCost) * 100).toFixed(0)
        }
      },
      suggestedSalesPrice() {
        if (this.profitMargin >= .04) {
          return (this.foodCost * 1.04).toFixed(2)
        }
      },
      activeRecipe() {
        return this.$store.state.recipe
      }

    },

    methods: {
      //TODO Find out while data isn't sending to the server 
      saveRecipe() {
        this.$store.dispatch('saveRecipe', this.newRecipe)
      },
    },
    components: {
      RecipeIngredient,
      Ingredient
    }
  }

</script>

<style>
  /* table {
    border: 1px solid;
  } */

  .addIng-btn {
    background-color: rgb(5, 38, 45);
    /* border-color: rgb(109, 197, 154);
    border: 1px; */
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

  .station-input {
    max-width: 10rem;
    text-align: center
  }

  .side-input {
    max-width: 5rem;
    text-align: center
  }

  .portionS-input {
    max-width: 8rem;
    text-align: center
  }

  .portionU-input {
    max-width: 7rem;
    text-align: center
  }

  .portions-input {
    max-width: 7rem;
    text-align: center
  }

  .recipeName-input {
    max-width: 20rem;
    text-align: center
  }

  .calories-input {
    max-width: 7rem;
    text-align: center
  }

  .allergens-input {
    max-width: 20rem;
    text-align: center
  }
</style>