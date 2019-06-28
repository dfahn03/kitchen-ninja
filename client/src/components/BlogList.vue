<template>
  <div class="container-fluid blog-list">
    <div class="card flex-row flex-wrap m-2">
      <div class="card-header border-0">
        <!-- <img :src="" alt=""> {{blogData.blogImage}} -->
      </div>
      <div class=" card-block px-2 py-2">
        <h4 class="card-title">Title: {{blogData.blogTitle}}</h4>
        <h6 class="author-Name">Author: {{blogData.author}}</h6>
        <p class="card-text">Content: {{blogData.blogContent}}</p>
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
    props: ['blogData'],
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