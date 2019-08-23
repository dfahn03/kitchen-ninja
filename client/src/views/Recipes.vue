<template>
  <div class="container-fluid recipes">

    <div class="row recipes">
      <div class="col-12 text-center">
        <h1 class="recipes_title">Recipes</h1>
        <button class="btn btn-sm create-recipe-bg mb-5 mt-4" @click="addRecipe()">Add Recipe</button>
      </div>
    </div>

    <!-- Recipe List -->
    <div class="row" id="recipe-by-station">
      <div v-for="menu in menus" class="col-6">
        <div v-for="(recipes, stationName) in menu">
          <h3 class="text-light station_name mt-4">{{stationName}}</h3>
          <ul v-for="recipe in recipes" :key="recipe._id">
            <li class="recipe_list">{{recipe.name}} -- Cost per Portion: $
              {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}}
              <img src="../assets/Plus-Icon-18.png" alt="Recipe Details" title="Recipe Details"
                @click="itemClicked(recipe)" class="mb-1 ml-1 details-img">
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Recipe Details Modal -->
    <div id="recipe modal">
      <div id="my-modal" class="modal fade">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Recipe Details</h5>
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
            <div class="modal-footer justify-content-center">
              <img src="../assets/Edit-Icon-40.png" alt="Edit Recipe" title="Edit Recipe" @click="sendRecipeToCosting()"
                class="edit-recipe">
              <img src="../assets/Trash-Can-Red-40.png" alt="Delete Recipe" title="Delete Recipe"
                @click="deleteRecipe()" class="delete-recipe">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- TODO Pagination for when have a lot of recipes in here -->
  </div>
</template>

<script>
  export default {
    name: "Recipes",
    mounted() {
      // this.$store.dispatch('getRecipes')
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
        //Putting Recipes into columns & stations
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
        return colMenus
      },
    },
    methods: {
      addRecipe() {
        this.$store.dispatch('createActiveRecipe')
      },
      deleteRecipe() {
        let ActiveRecipe = this.$data
        this.$store.dispatch("deleteRecipe", ActiveRecipe.id);
        $("#my-modal").modal("hide");
        $(".modal-backdrop").remove();
      },
      sendRecipeToCosting() {
        let ActiveRecipe = this.$data
        this.$store.dispatch("setActiveRecipe", ActiveRecipe)
        $("#my-modal").modal("hide");
        $(".modal-backdrop").remove();
      },
      itemClicked: function (item) {
        this.siteId = item.siteId;
        this.id = item._id;
        this.name = item.name;
        this.station = item.station;
        this.side = item.side;
        this.costPerRecipe = item.costPerRecipe.toFixed(2);
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
    font-size: 15px;
    font-family: 'Aleo', serif;
    font-size: 18px;
  }

  .details-img {
    cursor: pointer;
  }

  .edit-recipe {
    cursor: pointer;
  }

  .delete-recipe {
    cursor: pointer;
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

  #recipe-by-station {
    display: flex;
    justify-content: center;
  }
</style>