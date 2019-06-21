<template>
  <div id="app">
    <div class="container-fluid" id="home-nav">
      <div class="row">

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <p>
            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample"
              aria-expanded="false" aria-controls="collapseExample">
              directory
            </button>
          </p>

          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="true" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <p>
                  <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseLogin"
                    aria-expanded="false" aria-controls="collapseExample">
                    Login
                  </button>
                </p>
                <form class="form-inline" id="collapseLogin">
                  <div class="form-group mb-2">
                    <label for="staticEmail2" class="sr-only">Email</label>
                    <input type="text" readonly class="form-control-plaintext" id="staticEmail2"
                      value="email@example.com">
                  </div>
                  <div class="form-group mx-sm-3 mb-2">
                    <label for="inputPassword2" class="sr-only">Password</label>
                    <input type="password" class="form-control" id="inputPassword2" placeholder="Password">
                  </div>
                  <button type="submit" class="btn btn-primary mb-2">Login</button>
                </form>
              </li>
              <li class="nav-item active">
                <router-link to="/">Home |<span class="sr-only">(current)</span></router-link>
              </li>
              <li class="nav-item">
                <router-link to="/costing">Costing</router-link> |
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Pricing</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown link
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    <header class="container-fluid side-bar">
      <div class="row" id="main-body">
        <div class="col">

          <nav id="sidebar">
            <div class="collapse navbar-collapse navbar-expand-lg flex-column" id="collapseExample">
              <div class="card card-body">
                <div class="list-group">
                  <h1><b><u>Directory</u></b></h1>
                  <a href="#" class="list-group-item list-group-item-action active">
                    Recipes
                  </a>
                  <a href="#" class="list-group-item list-group-item-action nav-link">Menu</a>
                  <a href="#" class="list-group-item list-group-item-action nav-link">Cost Recipe</a>
                  <a href="#" class="list-group-item list-group-item-action nav-link">Inventory</a>
                  <a href="#" class="list-group-item list-group-item-action nav-link">
                    <!--TODO Calculator Goes here -->
                    <slot></slot>
                  </a>
                  <a href="#" class="list-group-item list-group-item-action disabled" tabindex="-1"
                    aria-disabled="true">Production
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div class="col">

        </div>
      </div>
    </header>


    <router-view />
  </div>
</template>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  #home-nav {
    background-color: rgb(85, 72, 72);
    padding: -10px;
    display: flex;
    justify-content: center;
    align-content: space-between;
  }

  body {
    background-color: antiquewhite;
  }
</style>