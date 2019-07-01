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
          <div v-if="user._id && !site._id" class="modal-body">
            <label for="#owned">Owned Sites</label>
            <select v-model="siteId" @change="selectSite($event)" id="owned" class="form-control mySite-input"
              placeholder="Owner" required>
              <option disabled value="">Choose Site</option>
              <option v-for="mySite in mySites">{{mySite.name}}</option>
            </select>
            <label class="mt-2" for="#member">Team Member</label>
            <select v-model="siteId" id="member" @change="selectSite($event)" class="form-control myMember-input"
              placeholder="Team Member" required>
              <option disabled value="">Choose Site</option>
              <option v-for="memberSite in memberSites" :value="memberSite._id">{{memberSite.name}}</option>
            </select>
            <!-- <div class="dropdown">
  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown"
    aria-haspopup="true" aria-expanded="false">
    Owned Site
  </a>

  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <a class="dropdown-item" v-for="mySite in mySites" href="#">{{mySite.name}}</a>
    
  </div>
</div> -->

          </div>
          <div v-else class="modal-body">
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
              <button type="submit" class="btn btn-primary mt-2">Login</button>
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
        <div class="form-group mt-2">
          <label for="userNameInput">User Name</label>
          <input v-model="registerForm.name" type="name" class="form-control" id="userNameInput"
            placeholder="User Name">
        </div>
        <div class="form-group">
          <label for="registerInputEmail1">Email address</label>
          <input v-model="registerForm.email" type="email" class="form-control" id="registerInputEmail1"
            aria-describedby="emailHelp" placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="registerInputPassword1">Password</label>
          <input v-model="registerForm.password" type="password" class="form-control" id="registerInputPassword1"
            placeholder="Password">
          <small id="emailHelp" class="form-text text-muted">Password Must be at least 6 Characters</small>
        </div>

        <button type="submit" class="btn btn-primary mb-1">Create Account</button>
        <button type="button" class="btn btn-outline-secondary ml-1 mb-1" data-toggle="modal"
          data-target="#exampleModal">Login</button>
      </form>
    </div>
    <!-- Site Selector -->

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
        registerForm: {
          name: "",
          email: "",
          password: ""
        },
        siteId: ""
      }
    },
    methods: {
      loginUser() {
        this.$store.dispatch("login", this.creds);
      },
      registerUser() {
        this.$store.dispatch("register", this.registerForm);
      },
      selectSite(e) {
        let site = e.target.value
        this.$store.dispatch("selectSite", this.siteId)
        $("#exampleModal").modal("hide");
        $(".modal-backdrop").remove();

      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      site() {
        return this.$store.state.site
      },
      mySites() {
        return this.$store.state.sites.mySites
      },
      memberSites() {
        return this.$store.state.sites.memberSites
      }
    },
    components: {},
  }
</script>

<style scoped>
  card {
    padding: 15px;
  }
</style>