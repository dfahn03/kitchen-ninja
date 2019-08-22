<template>
  <div class="edit-recipe-form col mt-2">

    <form @submit.prevent="saveRecipe">
      <div class="form-row">
        <div class="col d-flex justify-content-center">
          <input type="text" class="form-control-sm recipeName-input" placeholder="Recipe Name"
            v-model="activeRecipe.name" required>
          <input type="number" class="form-control-sm portions-input ml-1" placeholder="Portions"
            v-model="activeRecipe.portions" min="0" required>
          <input type="number" class="form-control-sm portionS-input ml-1" placeholder="Portion Size"
            v-model="activeRecipe.portionSize" min="0" step=".5" required>
          <select class="form-control custom-select-sm portionU-input ml-1" v-model="activeRecipe.portionUnit" required>
            <option disabled value="">Unit</option>
            <option value="OZ">OZ</option>
            <option value="EA">EA</option>
          </select>
          <select class="form-control custom-select-sm side-input ml-1" v-model="activeRecipe.side" required>
            <option disabled value="">Side</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <select class="form-control custom-select-sm station-input ml-1" v-model="activeRecipe.station" required>
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
          <input type="number" class="form-control-sm calories-input ml-1" placeholder="Calories"
            v-model="activeRecipe.calories" min="0" required>
          <input type="text" class="form-control-sm allergens-input ml-1" placeholder="Allergens"
            v-model="activeRecipe.allergens" min="0" required>
        </div>
      </div>
    </form>

  </div>
</template>

<script>

  export default {
    name: "EditRecipeForm",
    mounted() {
      this.$store.dispatch('getRecipes', this.activeRecipe._id)
      //TODO  ingredients persist on reload
    },
    data() {
      return {}
    },
    computed: {
      activeRecipe() {
        return this.$store.state.activeRecipe
      }
    }
  }

</script>

<style scoped>
  .saveRecipe-btn {
    margin: 1rem;
    background-color: #6DC59A;
    color: white;
  }

  .station-input {
    max-width: 10rem;
    text-align: center
  }

  p {
    color: white;
    font-size: 2rem;
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