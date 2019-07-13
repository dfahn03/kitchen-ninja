<template>
  <div class="container-fluid recipes">
    <div class="row">
      <div class="col">
        <ul>
          <li v-for="(group, station) in groups">
            <h3 class="text-light">{{station}}</h3>
            <ul v-for="recipe in group" :key="recipe._id">
              <li class="recipe_list">{{recipe.name}} -- Cost per Portion: $
                {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}}</li>
            </ul>
          </li>
        </ul>
        <!-- <div class="card text-center" v-for="recipe in recipes" :key="recipe._id">
          <h5 class="card-header">Recipe Name: {{recipe.name}}</h5>
          <div class="card-body">
            <h5 class="card-title">Recipe Portion Size: {{recipe.portionSize}}</h5>
            <p class="card-text">Recipe Cost per Portion: $ {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}}</p>
            <button class="btn btn-secondary" @click="openRecipe(recipe._id)">Show Recipe</button>
            <button class="btn btn-danger" @click="deleteRecipe(recipe._id)">Delete Recipe</button>
          </div>
        </div> -->
      </div>
    </div>
    <!-- <slot></slot> -->
    <!-- TODO slot for recipe modal -->
    <div class="row">
      <div class="col">
        <button class="btn btn-warning" @click="addRecipe()">Add Recipe</button>
      </div>
    </div>
  </div>
</template>
<!-- Sort by Station If(recipe.station == 'Salad bar') -->
<script>
  export default {
    name: "Recipes",
    mounted() {
      this.$store.dispatch("getRecipes");
    },
    data() {
      return {
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
      // TODO how do we handle this openRecipe?
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
</style>