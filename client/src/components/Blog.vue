<template>
  <div class="card flex-row flex-wrap">
    <div class="card-header border-0">
      <img src="//placehold.it/200" alt="">
    </div>
    <div class="card-block px-2">
      <h4 class="card-title">Title</h4>
      <h6 class="author-Name">Author</h6>
      <p class="card-text">Content</p>
    </div>
    <div class="w-100"></div>
    <div class="card-footer w-100 text-muted">
      <a href="#" class="btn btn-primary">EDIT
        BUTTON</a>Footer with edit or delete button seperated from content or
      simply remove footer and keep the button within the content
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    props: [],
    data() {
      return {}
    },
    computed: {},
    methods: {},
    components: {}
  }
</script>