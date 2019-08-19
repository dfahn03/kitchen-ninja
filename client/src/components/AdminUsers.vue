<template>
  <div admin-users>
    <div class="title">
      <h1>Manage Sites</h1>
      <label for="#manage">Select Site</label>
      <select v-model="newSite" @change="selectUser($event)" id="manage" class="form-control d-inline-flex"
        style="inline-size: 30%" placeholder="Owner" required>
        <option disabled value="">Choose Site</option>
        <option v-for="siteOne in mySites" :value="siteOne">{{siteOne.name}}</option>
        <option v-for="siteTwo in memberSites" :value="siteTwo">{{siteTwo.name}}</option>
      </select>
    </div>

    <div id="sites">
      <form>
        <div class="card form-group d-flex justify-content-center" style="inline-size: 40%" v-for='user in users'
          :key='user._id'>
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
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit User</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editUser(newSite.siteUser)">
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Username:</label>
                <input type="text" v-model="name" class="form-control" id="recipient-name">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Email:</label>
                <input type="email" v-model="email" class="form-control" id="message-text">
                <!-- <textarea class="form-control" id="message-text"></textarea> -->
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Submit Changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal End -->
  </div>
</template>

<script>
  import AdminUserModal from '@/components/AdminUserModal.vue'

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
          role: this.role || '',
          name: this.name || '',
          email: this.email || '',
          siteId: this.siteId || ''
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
      editUser(siteUser) {
        this.$store.dispatch("editUser", siteUser)
      }
    },
    components: {
      AdminUserModal
    }
  }
</script>

<style scoped>
  #manage {
    color: black;
  }

  label {
    color: rgb(109, 197, 154);
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 20px;
  }

  h1 {
    color: rgb(109, 197, 154);
    font-family: Aleo;
  }

  #sites {
    padding-top: 100px;
  }
</style>