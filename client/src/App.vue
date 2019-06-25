<template>
  <div id="app">
    <!-- Navbar -->
    <div class="container-fluid" id="navbar">
      <ul class="navbar">
        <li class="d-flex justify-content:flex-start;"><a href="#sidebar-wrapper" role="button" aria-expanded="false"
            class="btn btn-outline-secondary" data-toggle="#wrapper #page-content-wrapper"
            aria-controls="wrapper page-content-wrapper" id="menu-toggle"><img
              src="../src/assets/iconFinalLeaf.png"></a></li>
        <router-link to='/'><img src="../src/assets/finalLogo2.png"></router-link>
        <!-- https://img.icons8.com/office/16/000000/leaf.png -->

        <li>
        </li>
        <li>

        </li>
        <li>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src="../src/assets/menuButton2.png" alt="" srcset="">
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a @click='logout' class="dropdown-item" href="#">Logout</a>
              <a v-if='role = Admin' class="dropdown-item" href="#">Admin Options</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </div>
        </li>
      </ul>
      <!-- Login Modal -->


      <!-- Login Form -->
    </div>
    <div id="wrapper">
      <!-- Sidebar -->
      <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
          <h4><b>Directory</b></h4>
          <li>
            <router-link to='/'><a href="#">Dashboard</a></router-link>
          </li>
          <li>
            <router-link to='/recipes'><a href="#">Recipes</a></router-link>
          </li>
          <li>
            <router-link to='/costing'><a href="#">Costing</a></router-link>
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
            <!-- <slot name='Calculator' v-slot:Calculator></slot> -->
          </li>
        </ul>
      </div>
      <!-- Page Content -->
    </div>
    <div id="page-content-wrapper">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>



<script>
  import Calculator from '@/components/Calculator.vue'

  // $('#myModal').on('shown.bs.modal', function () {
  //   $('#myInput').trigger('focus')
  // })
  export default {

    methods: {
      logout() {
        this.$store.dispatch('logout', this.creds)
      }
    },
    mounted() {
      $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
        $("#page-content-wrapper").toggleClass("toggled")
      });
    },
    components: {
      Calculator
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

  }

  /* wrapper */
  #sidebar-wrapper {
    position: absolute;
    width: 0px;
    height: 100%;
    overflow-y: hidden;
    background-color: #fff;
    border: 5px #42b983;
    opacity: .9;
    margin-top: 80px;
    margin-bottom: -80px;
    padding-top: 20px;
  }

  /* Page */
  #page-content-wrapper {
    position: absolute;
    margin-top: 80px;
    /* padding-left: 250px; */
    /* margin-left: 250px; */
    /* margin-right: -250px; */
    width: 100%;
    padding: 15px;
    border: 5px #fff;
  }

  /* Displayed */
  #wrapper.toggled #sidebar-wrapper {
    width: 250px;
  }

  #wrapper.toggled #page-content-wrapper {
    padding-left: 250px;
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