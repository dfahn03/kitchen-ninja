<template>
  <div class="container-fluid admin">
    <div class="row justify-content-center">
      <div class="col-2">
        <button class="btn" type="button" id="btn-users">
          <router-link to="/admin/users">Users</router-link>
        </button>
      </div>
      <div class="col-2">
        <button class="btn" type="button" id="btn-sites">
          <router-link to="/admin/sites">Sites</router-link>
        </button>
      </div>
      <div class="col-2">
        <button class="btn" type="button" id="btn-kitchens">
          <router-link to="/admin/kitchens">Kitchens</router-link>
        </button>
      </div>
      <div class="col-2">
        <button class="btn" type="button" id="btn-menus" disabled="true">
          <router-link to="/admin/menus">Menus</router-link>
        </button>
      </div>
    </div>
    <!-- Outlet for children routes -->
    <div class="row">
      <div class="col-12 mt-5">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "admin",
    props: [],
    data() {
      return {}
    },
    computed: {},
    methods: {},
    components: {}
  }
</script>

<style scoped>
  #btn-users {
    background-color: rgb(109, 197, 154);
    color: rgb(5, 38, 45)
  }

  #btn-sites {
    background-color: rgb(109, 197, 154);
    color: rgb(5, 38, 45)
  }

  #btn-kitchens {
    background-color: rgb(109, 197, 154);
    color: rgb(5, 38, 45)
  }

  #btn-menus {
    background-color: rgb(204, 153, 0);
    color: rgb(5, 38, 45)
  }
</style>