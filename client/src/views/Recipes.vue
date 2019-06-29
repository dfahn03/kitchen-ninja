<template>
  <div class="container-fluid recipes">

    <div class="row">
      <div class="col">
        <div class="card text-center" v-for="recipe in recipes" :key="recipe._id">
          <h5 class="card-header">{{recipe.name}}</h5>
          <div class="card-body">
            <h5 class="card-title">{{recipe.portionSize}}</h5>
            <p class="card-text">{{recipe.costPerPortion}}</p>
            <!-- TODO check the above route for exact name/function -->
            <button class="btn btn-secondary" @click="openRecipe(recipe._id)">Show Recipe</button>
            <button class="btn btn-danger" @click="deleteRecipe(recipe._id)">Delete Recipe</button>
          </div>
        </div>
      </div>
    </div>
    <slot></slot>
    <!-- TODO slot for recipe modal -->
    <div class="row">
      <div class="col">
        <button class="btn btn-warning" @click="addRecipe()">Add Recipe</button>
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

</style>