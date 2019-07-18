<template>
  <div class="container-fluid recipes">
    <div class="row recipes">
      <div class="col-12 text-center">
        <h1 class="recipes_title">Recipes</h1>
        <button class="btn btn-sm create-recipe-bg mb-5 mt-3" @click="addRecipe()">Add Recipe</button>
      </div>
    </div>
    <div class="row">
      <div v-for="menu in menus" class="col-6">
        <!-- <li v-for="(group, station) in groups"> original, working but not sorted list -->
        <div v-for="(recipes, stationName) in menu">
          <h3 class="text-light station_name mt-4">{{stationName}}</h3>
          <!-- <ul v-for="recipe in group" :key="recipe._id"> original, working but not sorted list -->
          <ul v-for="recipe in recipes" :key="recipe._id">
            <li class="recipe_list">{{recipe.name}} -- Cost per Portion: $
              {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}}
              <span><button class="btn btn-sm edit_recipe" @click="itemClicked(recipe)">Show Recipe</button></span>
            </li>
          </ul>
        </div>
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
              <button type="button" class="btn btn-primary" @click="sendRecipeToCosting()">Edit Recipe</button>
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
      this.$store.dispatch("getRecipes")
    },
    data() {
      return {
        id: '',
        siteId: "",
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
    components: {
      // SubMenu
    },
    computed: {
      recipes() {
        let rec = this.$store.state.recipes.sort(function (a, b) {
          return (a.station).localeCompare(b.station);
        });
        return rec
      },
      menus() {
        let colMenus = []
        let menu = {}
        let count = 0
        this.recipes.forEach(r => {
          menu[r.station] = menu[r.station] || []
          menu[r.station].push(r)
          count++
          if (count == 15) {
            colMenus.push(JSON.parse(JSON.stringify(menu)))
            menu = {}
          }
        });
        colMenus.push(menu)
        // console.log(menu)
        return colMenus
        // console.log(groups)
      },
      // columnMenu() {
      //   //menu object with keys of stations values of recipies
      //   let colMenu = []
      //   //array of menu objects, where the total recipies among the keys does not exceed 15
      // }
    },
    methods: {
      addRecipe() {
        this.$router.push({ name: 'Costing' })
      },
      deleteRecipe(recipeId) {
        this.$store.dispatch("deleteRecipe", recipeId);
      },
      sendRecipeToCosting() {
        let ActiveRecipe = this.$data
        this.$store.dispatch("setActiveRecipe", ActiveRecipe)
        this.$router.push({ name: 'Costing' })
        $("#exampleModal").modal("hide");
        $(".modal-backdrop").remove();
      },
      itemClicked: function (item) {
        this.siteId = item.siteId;
        this.id = item._id;
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
    font-family: 'Aleo', serif;
    font-size: 18px;
  }

  .edit_recipe {
    background-color: rgb(109, 197, 154);
    margin-left: 15px;
  }

  .recipes_title {
    font-family: 'Pacifico', cursive;
    color: rgb(109, 197, 154);
    font-size: 70px;
  }

  .create-recipe-bg {
    background-color: white;
    font-weight: 600;
    color: rgb(5, 38, 45);
  }

  .station_name {
    font-family: 'Bree Serif', serif;
    font-size: 2em;
  }

  /* ul {
    -ms-column-count: 2;
    -o-column-count: 2;
    -moz-column-count: 2;
    -khtml-column-count: 2;
    column-count: 2;
  } */
</style>