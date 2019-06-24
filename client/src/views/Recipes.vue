<template>
  <div class="container-fluid recipes">
    <div class="row">
      <div class="col">
        <div class="card text-center">
          <h5 class="card-header">{{recipe.name}}</h5>
          <div class="card-body">
            <h5 class="card-title">{{recipe.portionSize}}</h5>
            <p class="card-text">{{recipe.costPerPortion}}</p>
            <!-- TODO check the above two routes for exact names -->
            <button class="btn btn-primary">Go somewhere</button>
            <button class="btn btn-primary">Go somewhere</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "recipes",
    mounted() {
      this.$store.dispatch("getRecipes");
    },
    data() {
      return {
        // newBoard: {
        //   title: "",
        //   description: ""
        // },
        // showForm: false,
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
      // addBoard() {
      //   this.$store.dispatch("addBoard", this.newBoard);
      //   this.newBoard = { title: "", description: "" };
      // },
      deleteRecipe(boardId) {
        this.$store.dispatch("deleteRecipe", recipeId);
      },
      userLogOut() {
        this.$store.dispatch('logout')
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