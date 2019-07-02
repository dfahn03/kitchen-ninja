<template>
  <div>
    <div class="title">
      <h1>This is the AdminUsers component</h1>
      <label for="#manage">Manage Site</label>
      <select v-model="site" @change="selectUsers($event)" id="manage" class="form-control" placeholder="Owner"
        required>
        <option disabled value="">Choose Site</option>
        <option v-for="siteOne in mySites" :value="siteOne">{{siteOne.name}}</option>
        <option v-for="siteTwo in memberSites" :value="siteTwo">{{siteTwo.name}}</option>
      </select>
    </div>

    <div id="sites">
      <div class="card">
        <div class=" card-block px-2 py-2">
          <h4 class="card-title text-left">User name: {{user.name}}</h4>
          <h6 class="author-Name text-left">User email: {{user.email}}</h6>
          <h6 class="card-text text-left">Site Code: {{site.passcode}}</h6>
          <button class="btn btn-warning" type="button" data-toggle="modal" data-target="#editBlogModal">Edit</button>
          <!-- <button class="btn btn-danger ml-1" type="button" @click="deleteBlog">Delete Site</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AdminUsers",
    mounted() {
      this.$store.dispatch('getAllSites')
    },
    props: [],
    data() {
      return {
        site: {
          // kitchens: [],
          name: '',
          // passcode: '',
          siteId: '',
          siteUser: ''
        },
        user: {
          name: '',
          email: '',
          siteId: ''
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
      // users() {
      //   return this.$store.state.site.users
      // }
    },
    methods: {
      selectUsers() {
        this.$store.dispatch('getAllUsersBySite', this.site)
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