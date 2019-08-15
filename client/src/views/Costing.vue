<template>
  <div class="costing contianer-fluid">

    <!-- Converter Button -->
    <!-- <div class="row">
      <div class="col-12">
        <button type="button" class="btn btn-secondary float-right my-2" @click="">Converter</button>
        TODO link this button to the sidebar calculator
      </div>
    </div> -->

    <!-- Recipe Form Templates -->
    <div class="row">
      <edit-recipe-form v-if="activeRecipe._id" />
      <new-recipe-form v-else />
    </div>
    <!-- Ingredient Table Template -->
    <div class="row" v-if="activeRecipe._id">
      <add-ingredients />
    </div>
    <!-- Recipe Calculations -->
    <div class="row">
      <div class="col-3 text-white text-left d-flex justify-content-center">
        <ul>
          <li class="">Cost Per Category:</li>
          <li class="mt-2">Storeroom PL </li>
          <li class="mt-2">Meat PL </li>
          <li class="mt-2">Dairy PL </li>
          <li class="mt-2">Produce PL </li>
          <li class="mt-2">Bakery PL </li>
          <li class="mt-2">Frozen PL </li>
        </ul>
      </div>
      <div class="col-3 text-white text-left d-flex justify-content-center">
        <ul>
          <li class="">Price:</li>
          <li class="mt-2">${{this.storeroom}}</li>
          <li class="mt-2">${{this.meat}}</li>
          <li class="mt-2">${{this.dairy}}</li>
          <li class="mt-2">${{this.produce}}</li>
          <li class="mt-2">${{this.bakery}}</li>
          <li class="mt-2">${{this.frozen}}</li>
        </ul>
      </div>
      <div class="col-3 text-white d-flex justify-content-center text-left">
        <ul>
          <li v-model="activeRecipe.costPerRecipe">Total Cost:</li>
          <li class="mt-2">Food Cost:</li>
          <li>Sales Price:
          </li>
          <li class="mt-2">Gross Margin: </li>
          <li class="mt-2"> Suggested Price: 40%</li>
          <li class="mt-2"> Suggested Price: 45%</li>
          <li class="mt-2"> Suggested Price: 50%</li>
        </ul>
      </div>
      <div class="col-3 text-white d-flex justify-content-center text-left">
        <ul>
          <li v-model="activeRecipe.costPerRecipe">{{recipeCost}}</li>
          <li class="mt-2">{{foodCost}} </li>
          <li>$ <input type="number" placeholder="0.00" class="totalP-input ml-1 mt-2" v-model="activeRecipe.salesPrice"
              required>
          </li>
          <li class="mt-2">$ {{profit}} </li>
          <li class="mt-2">$ {{suggestedSalesPrice1}} </li>
          <li class="mt-2">$ {{suggestedSalesPrice2}} </li>
          <li class="mt-2">$ {{suggestedSalesPrice3}} </li>

        </ul>
      </div>
    </div>
    <!-- Save Recipe Button -->
    <div v-if="activeRecipe._id" class="form-row d-flex justify-content-center align-content-center">
      <button @click="saveRecipe" type="button" class="btn saveRecipe-btn">Save Recipe</button>
    </div>
  </div>
</template>

<script>
  import NewRecipeForm from '@/components/NewRecipeForm'
  import EditRecipeForm from '@/components/EditRecipeForm'
  import AddIngredients from '@/components/AddIngredients'

  export default {
    name: "Costing",
    mounted() {
      //TODO  ingredients persist on reload 
    },
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
    watch: {
      itemCost(nv, ov) {
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
      // activeRecipe(nv, ov) {
      //   console.log("active recipe has changed")
      //   this.activeRecipe = nv
      // }
    },
    computed: {
      activeRecipe() {
        return this.$store.state.activeRecipe
      },
      recipeIngredients() {
        return this.$store.state.activeRecipe.recipeIngredients
      },
      recipeCost() {
        return this.activeRecipe.costPerRecipe = (this.storeroom + this.meat + this.dairy + this.produce + this.bakery + this.frozen).toFixed(2)
      },
      itemCost() {
        this.storeroom = 0
        this.meat = 0
        this.dairy = 0
        this.produce = 0
        this.bakery = 0
        this.frozen = 0
        if (!this.activeRecipe.recipeIngredients) {
          return 0
        }
        return this.recipeIngredients.forEach(r => this.$data[r.category.toLowerCase()] += +r.itemCost)
      },
      foodCost() {
        //totalCost / portions
        if (this.activeRecipe.portions && this.recipeCost) {
          return (this.recipeCost / this.activeRecipe.portions).toFixed(2)
        }
      },
      profit() {
        if (this.foodCost && this.activeRecipe.salesPrice) {
          return (this.activeRecipe.salesPrice - this.foodCost).toFixed(2)
        }
      },
      profitMargin() {
        // profit/salesprice
        if (this.activeRecipe.salesPrice) {
          return (this.profit / this.activeRecipe.salesPrice).toFixed(2)
        }
      },
      markup() {
        //profit / foodcost
        if (this.activeRecipe.salesPrice) {
          return ((this.profit / this.foodCost) * 100).toFixed(0)
        }
      },
      suggestedSalesPrice1() {
        if (this.profitMargin) {
          return (this.foodCost * 1.4).toFixed(2)
        }
      },
      suggestedSalesPrice2() {
        if (this.profitMargin) {
          return (this.foodCost * 1.45).toFixed(2)
        }
      },
      suggestedSalesPrice3() {
        if (this.profitMargin) {
          return (this.foodCost * 1.5).toFixed(2)
        }
      }
    },
    methods: {
      saveRecipe() {
        this.activeRecipe.recipeIngredients.forEach(i => {
          i.unit = i.unit.toUpperCase();
          i.category = i.category.toLowerCase();
        })
        if (this.activeRecipe.recipeIngredients.length > 0) {
          this.$store.dispatch('editRecipe', this.activeRecipe)
        } else { this.$store.dispatch('editRecipeInCosting', this.activeRecipe) }
      }
    },
    components: {
      AddIngredients,
      NewRecipeForm,
      EditRecipeForm
    }
  }

</script>

<style>
  ul {
    list-style: none;
  }

  .saveRecipe-btn {
    margin: 1rem;
    background-color: #6DC59A;
    color: white;
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