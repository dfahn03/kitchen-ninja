<template>
  <li v-for="(recipes, stationName) in menu">
    <h3 class="text-light station_name mt-4">{{stationName}}</h3>
    <ul v-for="recipe in recipes" :key="recipe._id">
      <li class="recipe_list">{{recipe.name}} -- Cost per Portion: $
        {{(recipe.costPerRecipe / recipe.portions).toFixed(2)}}
        <span><button class="btn btn-sm edit_recipe" @click="itemClicked(recipe)">Show Recipe</button></span>
      </li>
    </ul>
  </li>
</template>

<script>
  export default {
    name: "SubMenu",
    props: [],
    data() {
      return {}
    },
    computed: {},
    methods: {},
    components: {}
  }
</script>
<style>

</style>