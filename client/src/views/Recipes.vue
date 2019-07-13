<template>
  <div class="container-fluid recipes">
    <div class="row">
      <div class="col">
        <ul>
          <li v-for="(group, station) in groups">
            <h3 class="text-light">{{station}}</h3>
            <ul v-for="recipe in group" :key="recipe._id">
              <li class="recipe_list">{{recipe.name}} -- Cost per Portion: $
                {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}}
                <span><button class="btn btn-sm edit_recipe" @click="itemClicked(recipe)">Show Recipe</button></span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-warning" @click="addRecipe()">Add Recipe</button>
      </div>
    </div>
    <!-- RECIPE MODAL -->
    <div id="recipe modal">
      <div id="my-modal" class="modal fade">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">RECIPE DETAILS</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Name: {{ name }}</p>
              <p>Station: {{ station }}</p>
              <p>Side: {{ side }}</p>
              <p>Cost per Recipe: {{ costPerRecipe }}</p>
              <p>Portions: {{ portions }}</p>
              <p>Portions Size: {{ portionSize }}</p>
              <p>Portions Unit: {{ portionUnit }}</p>
              <p>Portions Calories: {{ calories }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">Edit Recipe</button>
              <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Recipes",
    mounted() {
      this.$store.dispatch("getRecipes");
    },
    data() {
      return {
        name: "",
        station: "",
        side: "",
        costPerRecipe: "",
        portions: "",
        portionSize: "",
        portionUnit: "",
        calories: "",
      };
    },
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "dashboard" });
      }
    },
    computed: {
      recipes() {
        return this.$store.state.recipes;
      },
      groups() {
        let groups = {}
        this.recipes.forEach(r => {
          groups[r.station] = groups[r.station] || []
          groups[r.station].push(r)
        });
        return groups
      }
    },
    methods: {
      addRecipe() {
        this.$router.push({ name: 'Costing' })
      },
      deleteRecipe(recipeId) {
        this.$store.dispatch("deleteRecipe", recipeId);
      },
      openRecipe(recipeId) {
        this.$router.push({ name: 'recipe', params: { recipeId } })
      },
      itemClicked: function (item) {
        this.name = item.name;
        this.station = item.station;
        this.side = item.side;
        this.costPerRecipe = item.costPerRecipe;
        this.portions = item.portions;
        this.portionSize = item.portionSize;
        this.portionUnit = item.portionUnit;
        this.calories = item.calories;
        $("#my-modal").modal('show');
      },
    }
  };
</script>
<style>
  .recipe_list {
    color: white;
    padding: 2px;
    border: 1px solid whitesmoke;
    font-size: 15px;
  }

  .edit_recipe {
    background-color: rgb(109, 197, 154);
    margin-left: 15px;
  }
</style>