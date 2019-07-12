<template>
  <div class="site-selector-modal card" :class="open ? '': 'd-none'" v-if="user._id">
    <div v-if="user._id" class="modal-content">
      <label for="#owned">Owned Sites</label>
      <select v-model="siteId" @change="selectSite($event)" id="owned" class="form-control mySite-input"
        placeholder="Owner" required>
        <option disabled value="">Choose Site</option>
        <option v-for="mySite in mySites" :value="mySite._id">{{mySite.name}}</option>
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
  </div>
</template>

<script>
  export default {
    name: "SiteSelector",
    data() {
      return {
        siteId: "",
        // open: false
      }
    },
    mounted() {
      this.$store.state.open
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      mySites() {
        return this.$store.state.sites.mySites
      },
      memberSites() {
        return this.$store.state.sites.memberSites
      },
      open() {

        return this.$store.state.open

      }
    },
    methods: {
      // selectSite() {
      //   this.$store.dispatch('selectSite', this.siteId)
      // },
      selectSite(e) {
        let site = e.target.value
        this.$store.dispatch("selectSite", this.siteId)
        this.$store.dispatch("")
        $("#exampleModal").modal("hide");
        $(".modal-backdrop").remove();

      }
    }
  }
</script>


<style>
  .site-selector-modal {
    /* position: fixed; */
    display: flex;
    align-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    position: fixed;
  }
</style>