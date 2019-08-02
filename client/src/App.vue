<template>
  <div id="app">

    <!-- Navbar -->
    <div class="container-fluid" id="navbar">
      <ul class="navbar">
        <li class="d-flex justify-content:flex-start;"><a href="#sidebar-wrapper" role="button" aria-expanded="false"
            class="btn btn-outline-secondary" data-toggle="#wrapper #page-content-wrapper"
            aria-controls="wrapper page-content-wrapper" id="menu-toggle"><img
              src="../src/assets/iconFinalLeaf.png"></a></li>
        <router-link to='/dashboard'><img src="../src/assets/finalLogo2.png" class></router-link>
        <div v-if="user._id" class="dropdown dropleft">
          <button class="btn btn-outline-secondary" type="button" id="dropdownMenuButton" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            <img src="../src/assets/icons8-user-menu-male-35.png" alt="" srcset="">
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a @click='logout' class="dropdown-item" href="#">Logout</a>
            <a @click='openSiteSelect' class="dropdown-item" href="#">Change Site</a>
            <router-link v-if="owned" to="/admin"><a class="dropdown-item" href="#">Admin Options</a>
            </router-link>
          </div>
        </div>
        <div v-else class="dropdown dropleft">
          <button class="btn btn-outline-secondary" type="button" id="dropdownMenuButton" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            <img src="../src/assets/icons8-user-menu-male-35.png" alt="" srcset="">
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item">Login</a>
          </div>
        </div>
        </li>
      </ul>
    </div>

    <!-- Sidebar -->
    <div id="wrapper">
      <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
          <h4><b>Directory</b></h4>
          <li>
            <router-link to='/dashboard'><a href="#">Dashboard</a></router-link>
          </li>
          <li>
            <router-link to='/recipes'><a href="#">Recipes</a></router-link>
          </li>
          <li>
            <router-link @click.native="createActiveRecipe" to='/costing'><a href="#">Costing</a></router-link>
          </li>
          <li>
            <router-link to='/menu'><a href="#">Menu</a></router-link>
          </li>
          <li>
            <router-link to='/menus'><a href="#">Weekly Menus</a></router-link>
          </li>
          <li>
            <router-link to='/inventory'><a href="#">Inventory</a></router-link>
          </li>
          <li>
            <a href="#" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false"
              aria-controls="collapseOne">Calculator</a>
            <div id="collapseOne" class="collapse">
              <calculator />
            </div>
          </li>
        </ul>
      </div>

      <!-- Page Content -->
      <div id="page-content-wrapper">
        <div class="container-fluid">
          <router-view />
        </div>
      </div>
    </div>

    <!-- Site Selector Modal -->
    <site-selector />

  </div>
</template>



<script>
  import Calculator from '@/components/Calculator.vue'
  import SiteSelector from "@/components/SiteSelector.vue"

  export default {
    name: "APP",
    computed: {
      owned() {
        //FIXME Will need to be changed for new admins that have no sites yet
        return this.$store.state.sites.mySites ? this.$store.state.sites.mySites.length > 0 : false
      },
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout', this.creds)
      },
      openSiteSelect() {
        this.$store.dispatch('changeSite')
      },
      // clearRecipe() {
      //   this.$store.dispatch('clearRecipe')
      // }
      createActiveRecipe() {
        this.$store.dispatch('createActiveRecipe')
      }
    },
    mounted() {
      $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
        $("#page-content-wrapper").toggleClass("toggled")
      });
      this.$store.dispatch("authenticate")
    },
    components: {
      Calculator,
      SiteSelector
    }
  }
</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    user-select: none;
  }

  #home-nav {
    background-color: rgb(109, 197, 154);
    padding: -10px;
    display: flex;
    justify-content: center;
    align-content: flex-start;
  }

  body {
    background-color: rgb(5, 38, 45);
  }

  #navbar {
    position: absolute;
    height: 80px;
    width: 100%;
    background-color: #fff;
    border: 5px #42b98385;
    color: rgb(5, 38, 45);
    top: 0;

  }

  /* wrapper */
  #sidebar-wrapper {
    position: absolute;
    width: 0px;
    height: 100%;
    overflow-y: hidden;
    background-color: whitesmoke;
    border: 5px #42b983;

    /* margin-top: 80px; */
    margin-bottom: -80px;
    padding-top: 20px;
  }

  /* Page */
  #page-content-wrapper {
    position: absolute;
    margin-top: 80px;
    width: 100%;
    padding: 15px;
    border: 5px #fff;
  }

  /* Displayed */
  #wrapper.toggled #sidebar-wrapper {
    width: 250px;
    position: absolute;

  }

  #wrapper.toggled #page-content-wrapper {
    padding-left: 250px;
    position: static;
  }

  .sidebar-nav {
    padding: 0;
    list-style: none;
  }

  .sidebar-nav li {
    text-indent: 20px;
    line-height: 40px;
  }

  .sidebar-nav li a {
    display: block;
    text-decoration: none;
    color: rgb(5, 38, 45);
  }

  .sidebar-nav li a:hover {
    background: rgb(109, 197, 154);
  }
</style>