<template>
  <div class="col-12 my-2 blog-list d-flex justify-content-center align">
    <div class="card" style="width: 60rem">
      <div class="row no-gutters">
        <div class="col-md-4 d-flex justify-content-start">
          <img
            src="https://images.unsplash.com/photo-1488992783499-418eb1f62d08?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
            width="310px" class="blog-img">
        </div>
        <div class="col-md-8 px-0 py-0">
          <div class="card-body">
            <h4 class="card-title text-left">{{blogData.blogTitle}}</h4>
            <p class="card-text text-left blog-content">{{blogData.blogContent}}</p>
            <button class="btn btn-warning" type="button" data-toggle="modal" data-target="#editBlogModal">Edit
              Blog</button>
            <!-- TODO make sure that the edit modal is the right blog id that we want to edit -->
            <button class="btn btn-danger ml-1" type="button" @click="deleteBlog">Delete Blog</button>
            <p class="card-text d-flex justify-content-end">
              <small class="author-name text-right text-muted">@{{blogData.author}}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- TODO Put buttons in a dropdown 3 button layout in top right of the card -->

    <div class="modal fade" id="editBlogModal" tabindex="-1" role="dialog" aria-labelledby="blogModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="blogModalLabel">Blog Creator</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editBlog">
              <div class="modalform-group">
                <label for="blogInputTitle" class="mt-2 mb-0">Blog Title</label>
                <input v-model="blog.blogTitle" type="text" class="form-control" id="blogInputTitle"
                  aria-describedby="blogHelp" placeholder="Enter Blog Title" required>
                <small id="blogHelp" class="form-text text-muted">Enter a descriptive blog title.</small>
              </div>
              <div class="modal-form-group">
                <label for="inputBlogAuthor" class="mt-2 mb-0">Blog Author</label>
                <input v-model="blog.blogAuthor" type="text" class="form-control" id="inputBlogAuthor"
                  placeholder="Enter Username" required>
              </div>
              <div class="modal-form-group">
                <label for="inputBlogImage" class="mt-2 mb-0">Blog Image</label>
                <input v-model="blog.blogImage" type="url" class="form-control" id="inputBlogImage"
                  aria-describedby="blogImageHelp" placeholder="Enter Image">
                <small id="blogImageHelp" class="form-text text-muted">Image not required.</small>
              </div>
              <div class="modal-form-group">
                <label for="inputBlogContent" class="mt-2 mb-0">Blog Content</label>
                <textarea rows="3" v-model="blog.blogContent" type="text" class="form-control" id="inputBlogContent"
                  aria-describedby="blogContentHelp" placeholder="Enter Blog Content" required></textarea>
                <small id="blogContentHelp" class="form-text text-muted">Enter blog content here.</small>
              </div>
              <button type="submit" class="btn btn-success mb-3 mt-3">Save Blog</button>
              <div class="modal-footer justify-content-center">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
  export default {
    name: "BlogList",
    props: ['blogData'],
    data() {
      return {
        blog: {
          blogTitle: this.blogData.blogTitle || "",
          blogImage: this.blogData.blogImage || "",
          blogContent: this.blogData.blogContent || "",
          blogAuthor: this.blogData.author || "",
          blogId: this.blogData._id
          //TODO Make is so the author is automatically set to user name
        }
      }
    },
    mounted() {
      this.$store.dispatch('getBlogs')
    },
    computed: {
      blogs() {
        return this.$store.state.blogs
      }
    },
    methods: {
      editBlog() {
        if (this.blog) {
          this.blogData.blog = this.blog
          this.$store.dispatch('editBlog', this.blog)
          //TODO need to pass it the right id so the action in store knows which blog to edit
        }
        $("#editBlogModal").modal("hide");
        $(".modal-backdrop").remove();
      },
      deleteBlog() {
        this.$store.dispatch("deleteBlog", this.blog.blogId)
      }
    },
    components: {}
  }
</script>

<style scoped>
  .card-body {
    padding-left: 0px;
  }

  .blog-content {
    font-family: 'Aleo', serif;
    font-size: 18px;
  }

  .card-title {
    font-family: 'Bree Serif', serif;
  }
</style>