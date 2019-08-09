<template>
  <div class="recipe-form col">
    <form @submit.prevent="saveRecipe">
      <div class="form-row">
        <div class="col d-flex justify-content-center">
          <p v-if="activeRecipe">{{activeRecipe.name}}</p>
          <input v-else type="text" class="form-control recipeName-input" placeholder="Recipe Name"
            v-model="newRecipe.name" required>
          <p v-if="activeRecipe">{{activeRecipe.portions}}</p>
          <input v-else type="number" class="form-control portions-input ml-1" placeholder="Portions"
            v-model="newRecipe.portions" min="0" required>
          <p v-if="activeRecipe">{{activeRecipe.portionSize}}</p>
          <input v-else type="number" class="form-control portionS-input ml-1" placeholder="Portion Size"
            v-model="newRecipe.portionSize" min="0" step=".5" required>
          <p v-if="activeRecipe">{{activeRecipe.portionUnit}}</p>
          <select v-else class="form-control portionU-input ml-1" v-model="newRecipe.portionUnit" required>
            <option disabled value="">Unit</option>
            <option value="OZ">OZ</option>
            <option value="EA">EA</option>
          </select>
          <p v-if="activeRecipe">{{activeRecipe.side}}</p>
          <select v-else class="form-control side-input ml-1" v-model="newRecipe.side" required>
            <option disabled value="">Side</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <p v-if="activeRecipe">{{activeRecipe.station}}</p>
          <select v-else class="form-control station-input ml-1" v-model="newRecipe.station" required>
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
          <p v-if="activeRecipe._id">{{activeRecipe.calories}}</p>
          <input v-else type="number" class="form-control calories-input ml-1" placeholder="Calories"
            v-model="newRecipe.calories" min="0" required>
          <p v-if="activeRecipe">{{activeRecipe.allergens}}</p>
          <input v-else type="text" class="form-control allergens-input ml-1" placeholder="Allergens"
            v-model="newRecipe.allergens" min="0" required>
        </div>
      </div>
      <button type="submit" v-if="!activeRecipe._id" class="btn saveRecipe-btn">Create
        Recipe</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: "RecipeForm",
    mounted() { },
    props: [],
    data() {
      return {
        newRecipe: {
          recipeIngredients: [],
          station: "",
          side: "",
          name: "",
          portions: "",
          portionSize: "",
          portionUnit: "",
          costPerRecipe: 0,
          calories: "",
          allergens: [],
          salesPrice: 0
        }
      }
    },
    computed: {
      activeRecipe() {
        return this.$store.state.activeRecipe
      }
    },


    methods: {
      saveRecipe() {
        // this.$data.newRecipe.recipeIngredients.forEach(i => {
        //   i.unit = i.unit.toUpperCase();
        //   i.category = i.category.toLowerCase();
        // })
        this.$store.dispatch('saveRecipe', this.newRecipe)
      }
    },
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