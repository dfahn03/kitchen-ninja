<template>
  <div>
    <div class="title">
      <h1>This is the AdminUsers component</h1>
      <label for="#manage">Manage Site</label>
      <select v-model="newSite" @change="selectUser($event)" id="manage" class="form-control" placeholder="Owner"
        required>
        <option disabled value="">Choose Site</option>
        <option v-for="siteOne in mySites" :value="siteOne">{{siteOne.name}}</option>
        <option v-for="siteTwo in memberSites" :value="siteTwo">{{siteTwo.name}}</option>
      </select>
    </div>

    <div id="sites">
      <form>
        <div class="card form-group" v-for='user in users' :key='user._id'>
          <div class=" card-block px-2 py-2 form-group">
            <div class="form-group">
              <h4 class="card-title text-left form-control-sm">User role: {{user.role}} </h4>
            </div>
            <div class="form-group">
              <h4 class="card-title text-left form-control-sm">User name: {{user.userId.name}}</h4>
            </div>
            <div class="form-group">
              <h6 class="author-Name text-left form-control-sm">User email: {{user.userId.email}}</h6>
              <button class="btn btn-warning" type="button" data-toggle="modal" data-target="#editModal">Edit</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <!--Edit Modal -->


    <!-- Modal End -->
  </div>
</template>

<script>
  export default {
    name: "AdminUsers",
    mounted() {
      this.$store.dispatch('getAllSites')
      // this.$store.dispatch('getAllUsersBySite')
    },
    props: [],
    data() {
      return {
        newSite: {
          name: '',
          siteId: '',
          siteUser: {
            role: '',
            name: '',
            email: '',
            siteId: ''
          },
        },
      }
    },
    computed: {
      site() {
        return this.$store.state.site
      },
      mySites() {
        return this.$store.state.sites.mySites
      },
      memberSites() {
        return this.$store.state.sites.memberSites
      },
      users() {
        return this.$store.state.users
      }
    },
    methods: {
      selectUser() {
        this.$store.dispatch('selectAdminUser', this.newSite)
      },
      editUser() {
        debugger
        this.$store.dispatch("editUser", payload)
      }
    },
    components: {}
  }
</script>

<style scoped>
  #manage {
    color: rgb(5, 38, 45);
  }

  #sites {
    padding-top: 100px;
  }
</style>