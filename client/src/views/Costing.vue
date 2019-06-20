<template>
  <div class="costing">
    <div class="row">
      <div class="col">
        <form @submit.prevent="">
          <div class="form-row">
            <div class="col">
              <input type="text" class="form-control" placeholder="Recipe Name">
            </div>
            <div class="col">
              <input type="text" class="form-control" placeholder="Portions">
            </div>
            <div class="col">
              <input type="text" class="form-control" placeholder="Portion Size">
            </div>
            <div class="col">
              <select class="form-control" placeholder="Station">
                <option selected>Choose Station</option>
                <option>Global</option>
                <option>Grill</option>
                <option>Salad Bar</option>
                <option>Hot Entree</option>
                <option>Deli</option>
                <option>Soup</option>
                <option>Breakfast Bar</option>
                <option>Sushi</option>
                <option>Southwest</option>
                <option>Pizza</option>
                <option>Chef's Choice</option>
              </select>

            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import Recipe from '@/components/Recipe'

  export default {
    name: "Costing",
    mounted: {

    },
    props: [],
    data() {
      return {}
    },
    computed: {},
    methods: {},
    components: {
      Recipe
    }
  }
</script>