<template>
  <div id="app">
    <div class="container-fluid" id="nav">
      <div class="row" id="navbar">
        <div class="col"></div>
        <div class="col"></div>
      </div>
      <div class="row" id="main-body">
        <div class="col" id="sidebar"></div>
        <div class="col">

        </div>
      </div>
      <router-link to="/">Home</router-link> |
      <router-link to="/">Costing</router-link> |

    </div>
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
</style>