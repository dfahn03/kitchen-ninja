<template>
  <div class="col active-recipe">
    <table class="table table-borderless table-sm text-white">
      <thead>
        <tr class="row">
          <th class="col-sm-3">Recipe Name</th>
          <th class="col-sm-1">Portions</th>
          <th class="col-sm-2">Portion Size</th>
          <!-- <th class="col-sm-1">Unit</th> -->
          <th class="col-sm-1">Side</th>
          <th class="col-sm-2">Station</th>
          <th class="col-sm-1">Calories</th>
          <th class="col-sm-2">Allergens</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row">
          <td class="col-sm-3">{{activeRecipe.name}}</td>
          <td class="col-sm-1">{{activeRecipe.portions}}</td>
          <td class="col-sm-2">{{activeRecipe.portionSize}} {{activeRecipe.portionUnit}}</td>
          <!-- <td class="col-sm-1">{{activeRecipe.portionUnit}}</td> -->
          <td class="col-sm-1">{{activeRecipe.side}}</td>
          <td class="col-sm-2">{{activeRecipe.station}}</td>
          <td class="col-sm-1">{{activeRecipe.calories}}</td>
          <td class="col-sm-2" v-for="allergen in activeRecipe.allergens">{{allergen}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: "ActiveRecipe",
    data() {
      return {}
    },
    computed: {
      activeRecipe() {
        return this.$store.state.activeRecipe
      }
    },
  }
</script>

<style scoped>
  .recipe-title {
    color: white;
  }

  table {
    border: none;
  }

  td {
    color: white;
  }
</style>