<template>
  <div id="app">
    <!-- Navbar -->
    <div class="container-fluid" id="navbar">
      <ul class="navbar">
        <li class="d-flex justify-content:flex-start;"><a href="#sidebar-wrapper" role="button" aria-expanded="false"
            class="btn btn-outline-secondary" data-toggle="#wrapper" aria-controls="wrapper" id="menu-toggle"><img
              src="../src/assets/iconFinalLeaf.png"></a></li>
        <router-link to='/'><img src="../src/assets/finalLogo2.png"></router-link>
        <!-- https://img.icons8.com/office/16/000000/leaf.png -->

        <li>
        </li>
        <li>
          <button class="btn btn-outline-secondary" data-toggle="modal" data-target="#exampleModal">Login</button>
        </li>
        <li><a href="#" class="btn btn-outline-secondary"><img src="../src/assets/menuButton2.png" alt="" srcset=""></a>
        </li>
      </ul>
      <!-- Login Modal -->

      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Login</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form v-if="loginForm" @submit.prevent="loginUser">
                <div class="modalform-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input v-model="creds.email" type="email" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="Enter email">
                  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
                    else.</small>
                </div>
                <div class="modal-form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input v-model="creds.password" type="password" class="form-control" id="exampleInputPassword1"
                    placeholder="Password">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </div>
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
    <div class='container-fluid' id="page-content-wrapper">
      <router-view />
    </div>
  </div>
</template>



<script>
  import Calculator from '@/components/Calculator.vue'

  // $('#myModal').on('shown.bs.modal', function () {
  //   $('#myInput').trigger('focus')
  // })
  export default {
    data() {
      return {

      }
    },
    methods: {
      loginUser() {
        this.$store.dispatch("login", this.creds);
      }
    },
    mounted() {
      $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
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
    /* margin-left: 250px;
    margin-right: -250px; */
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

  .modal {}

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