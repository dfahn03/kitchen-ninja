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
            <div class="col">
              <input type="text" class="form-control" placeholder="Recipe Name">
            </div>
            <div class="col">
              <input type="text" class="form-control" placeholder="Portions">
            </div>
            <div class="col">
              <input type="text" class="form-control" placeholder="Portion Size">
            </div>
            <div class="col">
              <select class="form-control" placeholder="Side" v-model="side">
                <option disabled value="">Side</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div class="col">
              <select class="form-control" placeholder="Station" v-model="station">
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
              <button type="button" class="btn addIng-btn text-white my-" @click="showForm = !showForm">Add
                Ingredient <img src="../assets/icons8-plus-25.png" alt="Plus Icon" class="ml-1"></button>
              <!-- TODO re-color icon/button to make same bg color  -->
            </div>
            <div class="col">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
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
                <recipe-ingredient v-if="showForm" />
                <recipe-ingredient v-for="recipeIngredient in recipeIngredients" :key="recipeIngredient._id"
                  :recipeIngredient="recipeIngredient" />
              </table>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-6">
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
                <div class="col-6">
                  <ul>
                    <li>Total Cost:</li>
                    <li>Food Cost: </li>
                    <li v-if="salesPrice">Sales Price: $<input type="number" placeholder="0">{{this.salesPrice}}</li>
                    <li v-else>Sales Price: $<input type="text" placeholder="0"></li>
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
        showForm: false,
        side: '',
        station: '',
        recipeIngredients: [], //how does add ingredient know to add object with specific props and their values empty
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
        itemName: recipeIngredient.name
        //TODO Fill this out to what the empty object is going to be in recipeIngredients
      }
    },
    components: {
      RecipeIngredient
    }
  }
</script>

<style>
  .addIng-btn {
    background-color: rgb(5, 38, 45);
  }

  ul {
    list-style: none;
  }
</style>