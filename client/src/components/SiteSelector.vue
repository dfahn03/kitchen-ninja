<template>
  <div class="site-select">
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
        <!-- TODO Fix the selection issue - does register if select same site twice -->
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "SiteSelector",
    data() {
      return {
        siteId: "",
      }
    },
    mounted() { },
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
      selectSite(e) {
        let site = e.target.value
        this.$store.dispatch("selectSite", this.siteId)
      }
    }
  }
</script>


<style>
  .site-select {
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .site-selector-modal {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    height: 25%;
    width: 50%;
    position: fixed;
  }
</style>