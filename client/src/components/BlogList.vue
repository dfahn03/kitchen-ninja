<template>
  <div class="container-fluid blog-list">
    <div class="card flex-row flex-wrap">
      <!-- v-for="blog in blogs" :key="blog._id" -->
      <div class="card-header border-0">
        <img src="//placehold.it/200" alt="">
      </div>
      <div class="card-block px-2">
        <h4 class="card-title">Title: </h4>
        <h6 class="author-Name">Author: </h6>
        <p class="card-text">Content: </p>
      </div>
      <div class="w-100"></div>
      <div class="card-footer w-100 text-muted">
        <button class="btn btn-warning" type="button" @click="">Edit Blog</button>
        <button class="btn btn-danger ml-1" type="button" @click="">Delete Blog</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BlogList",
    mounted() {
      this.$store.dispatch('getBlogs')
    },
    computed: {
      blogs() {
        return this.$store.state.blogs
      }
    },
    methods: {},
    components: {}
  }
</script>