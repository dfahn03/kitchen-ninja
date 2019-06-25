<template>
  <div class="login row">
    <!-- Login Model -->
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
            <form @submit.prevent="loginUser">
              <div class="modalform-group">
                <label for="loginInputEmail1">Email address</label>
                <input v-model="creds.email" type="email" class="form-control" id="loginInputEmail1"
                  aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
                  else.</small>
              </div>
              <div class="modal-form-group">
                <label for="loginInputPassword1">Password</label>
                <input v-model="creds.password" type="password" class="form-control" id="loginInputPassword1"
                  placeholder="Password">
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Register New User Form -->
    <div class="card d-inline-flex col-4 offset-4" id="registerForm">
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="userNameInput">User Name</label>
          <input v-model="creds.name" type="name" class="form-control" id="userNameInput" placeholder="User Name">
        </div>
        <div class="form-group">
          <label for="registerInputEmail1">Email address</label>
          <input v-model="creds.email" type="email" class="form-control" id="registerInputEmail1"
            aria-describedby="emailHelp" placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="registerInputPassword1">Password</label>
          <input v-model="creds.password" type="password" class="form-control" id="registerInputPassword1"
            placeholder="Password">
          <small id="emailHelp" class="form-text text-muted">Password Must be at least 6 Characters</small>
        </div>

        <button type="submit" class="btn btn-primary">Create Account</button>
        <button class="btn btn-outline-secondary" data-toggle="modal" data-target="#exampleModal">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {

    name: 'Login',
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: "",
        },
        registerForm: true,
        creds: {
          name: "",
          email: "",
          password: ""
        }
      }
    },
    methods: {
      loginUser() {
        debugger
        this.$store.dispatch("login", this.creds);
      },
      registerUser() {
        this.$store.dispatch("register", this.registerUser);
      }
    },
    components: {

    },

  }
</script>

<style scoped>
  card {
    padding: 15px;
  }
</style>