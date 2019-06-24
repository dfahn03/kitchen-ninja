<template>
  <div class="costing">
    <div class="row">
      <div class="col-12">
        <button type="button" class="btn btn-secondary float-right my-2" @click="">Converter</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <form @submit.prevent="">
          <div class="form-row">
            <div class="col-12 d-flex justify-content-center">
              <input type="text" class="form-control recipeName-input" placeholder="Recipe Name" required>
              <input type="text" class="form-control portions-input ml-1" placeholder="Portions" required>
              <input type="text" class="form-control portionS-input ml-1" placeholder="Portion Size" required>
              <input type="text" class="form-control portionU-input ml-1" placeholder="Portion Unit" required>
              <select class="form-control side-input ml-1" placeholder="Side" v-model="side" required>
                <option disabled value="">Side</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <select class="form-control station-input ml-1" placeholder="Station" v-model="station" required>
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
            </div>
            <div class="col-12">
              <button type="button" class="btn addIng-btn text-white my-2" @click="addIngredient">Add
                Ingredient <img src="../assets/icons8-plus-25.png" alt="Plus Icon" class="ml-1"></button>
              <!-- TODO re-color icon/button to make same bg color  -->
            </div>
            <div class="col">
              <table class="table table-hover text-white">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Remove</th>
                    <th scope="col">Distributor</th>
                    <th scope="col">Product #</th>
                    <th scope="col">Category</th>
                    <th scope="col">Ingredient Name</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Package Size</th>
                    <th scope="col">Package Cost</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Ingredient Cost</th>
                  </tr>
                </thead>
                <!-- <recipe-ingredient v-if="showForm" /> -->
                <recipe-ingredient v-for="recipeIngredient in recipeIngredients" :recipeIngredient="recipeIngredient"
                  :recipeIngredients="recipeIngredients" />
              </table>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-6 text-white text-left d-flex justify-content-center">
                  <ul>
                    <li>Storeroom PL ({{}}) </li>
                    <li>Meat PL ()</li>
                    <li>Diary PL ()</li>
                    <li>Produce PL ()</li>
                    <li>Bakery PL ()</li>
                    <li>Frozen PL ()</li>
                  </ul>
                  <!--run a for each on each  category using ingcostcalc
                  total is all added-->
                </div>
                <div class="col-6 text-white d-flex justify-content-center text-left">
                  <ul>
                    <li>Total Cost:</li>
                    <li>Food Cost: </li>
                    <li v-if="salesPrice">Sales Price: $<input type="number" placeholder="0"
                        class="totalP-input ml-1">{{this.salesPrice}}</li>
                    <li v-else>Sales Price: $<input type="text" placeholder="0" class="totalP-input ml-1"></li>
                    <li>Profit: </li>
                    <li>Profit Margin: {{this.profitMargin}}</li>
                    <li>Markup: </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
  import RecipeIngredient from '@/components/RecipeIngredient'

  export default {
    name: "Costing",
    mounted() { },
    props: [],
    data() {
      return {
        // showForm: false,
        side: '',
        station: '',
        recipeIngredients: [],
        // use emits
      }
    },
    computed: {
      recipeIngredient() {
        return this.data.recipeIngredient
      },
      totalCost() {

      },
      foodCost() {

      },
      salesPrice() {

      },
      profit() {

      },
      profitMargin() {

      },
      markup() {

      }
    },
    methods: {
      addIngredient() {
        let newIngredient = {
          itemName: "",
          category: "",
          brand: "",
          productNumber: "",
          quantity: 0,
          unit: "",
          itemCost: "",
          packageSize: "",
          packageCost: "",
          distributor: "",
        }
        this.recipeIngredients.push(newIngredient)
        //TODO Fill this out to what the empty object is going to be in recipeIngredients
      }
    },
    components: {
      RecipeIngredient
    }
  }
</script>

<style>
  table {
    max-width: 100vw;
  }

  .addIng-btn {
    background-color: rgb(5, 38, 45);
  }

  ul {
    list-style: none;
  }

  .totalP-input {
    max-width: 5rem;
    text-align: center;
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
    max-width: 6rem;
    text-align: center
  }

  .recipeName-input {
    max-width: 20rem;
    text-align: center
  }
</style>