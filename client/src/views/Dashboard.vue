<template>
  <div class="row dashboard">
    <div class="col-12 text-center">
      <h1 class="text-white">Communications Blog</h1>

      <!-- Blog Modal -->
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#blogModal">
        Enter New Blog
      </button>
      <div class="modal fade" id="blogModal" tabindex="-1" role="dialog" aria-labelledby="blogModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="blogModalLabel">Enter Blog</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="enterBlog">
                <div class="modalform-group">
                  <label for="blogInputTitle">Blog Title</label>
                  <input v-model="title" type="email" class="form-control" id="blogInputTitle"
                    aria-describedby="blogHelp" placeholder="Enter blog title">
                  <small id="blogHelp" class="form-text text-muted">Enter a descriptive blog title.</small>
                </div>
                <div class="modal-form-group">
                  <label for="inputBlogAuthor">Blog Author</label>
                  <input v-model="user" type="text" class="form-control" id="inputBlogAuthor"
                    placeholder="Enter Username">
                </div>
                <div class="modal-form-group">
                  <label for="inputBlogImage">Blog Image</label>
                  <input v-model="image" type="image" class="form-control" id="inputBlogImage"
                    aria-describedby="blogImageHelp" placeholder="Enter Image">
                  <small id="blogImageHelp" class="form-text text-muted">Image not required.</small>
                </div>
                <div class="modal-form-group">
                  <label for="inputBlogContent">Blog Image</label>
                  <textarea rows="3" v-model="content" type="text" class="form-control" id="inputBlogContent"
                    aria-describedby="blogContentHelp" placeholder="Enter Blog Content"></textarea>
                  <small id="blogContentHelp" class="form-text text-muted">Image not required.</small>
                </div>
                <button type="submit" class="btn btn-primary mb-3">Save Blog</button>
                <div class="modal-footer justify-content-center">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-5">
        <blog-list />
      </div>
    </div>
  </div>
  </div>
</template>


<script>
  import BlogList from '@/components/BlogList.vue'

  export default {
    name: "dashboard",
    data() {
      return {
        content: '',
        title: '',
        author: '',
        image: '',
        showModal: false
      }
    },
    components: {
      BlogList
    },
    methods: {
      enterBlog() {
        let data = {
          title: this.title,
          content: this.content,
          image: this.image,
          user: this.name
        }
        this.$store.dispatch('createBlog', data)
        this.blog = ''
      },
    }
  }
</script>

<style>


</style>