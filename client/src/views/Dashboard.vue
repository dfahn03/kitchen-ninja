<template>
  <div class="row dashboard">
    <div class="col-12 text-center">
      <h1 class="blog-page-title">Chef Notes</h1>

      <button type="button" class="btn btn-sm create-new-blog-bg mb-5 mt-3" data-toggle="modal"
        data-target="#blogModal">
        Create New Blog
      </button>

      <!-- Create Blog Modal -->
      <div class="modal fade" id="blogModal" tabindex="-1" role="dialog" aria-labelledby="blogModalLabel"
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
              <form @submit.prevent="createBlog">
                <div class="modalform-group">
                  <label for="blogInputTitle" class="mt-2 mb-0">Blog Title</label>
                  <input v-model="newBlog.title" type="text" class="form-control" id="blogInputTitle"
                    aria-describedby="blogHelp" placeholder="Enter Blog Title" required>
                  <small id="blogHelp" class="form-text text-muted">Enter a descriptive blog title.</small>
                </div>
                <div class="modal-form-group">
                  <label for="inputBlogAuthor" class="mt-2 mb-0">Blog Author</label>
                  <input v-model="newBlog.author" type="text" class="form-control" id="inputBlogAuthor"
                    placeholder="Enter Username" required>
                </div>
                <div class="modal-form-group">
                  <label for="inputBlogImage" class="mt-2 mb-0">Blog Image</label>
                  <input v-model="newBlog.image" type="url" class="form-control" id="inputBlogImage"
                    aria-describedby="blogImageHelp" placeholder="Enter Image">
                  <small id="blogImageHelp" class="form-text text-muted">Image not required.</small>
                </div>
                <div class="modal-form-group">
                  <label for="inputBlogContent" class="mt-2 mb-0">Blog Content</label>
                  <textarea rows="3" v-model="newBlog.content" type="text" class="form-control" id="inputBlogContent"
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

    <!-- Blog List -->
    <div class="row">
      <blog-list v-for="blog in blogs" :key="blog._id" :blogData="blog" />
    </div>

  </div>
</template>


<script>
  import BlogList from '@/components/BlogList.vue'

  export default {
    name: "dashboard",
    data() {
      return {
        newBlog: {
          content: '',
          title: '',
          author: '',
          image: ''
        }
      }
    },
    components: {
      BlogList
    },
    computed: {
      blogs() {
        return this.$store.state.blogs
      }
    },
    methods: {
      createBlog() {
        this.$store.dispatch('createBlog', this.newBlog)
        setTimeout(() => {
          this.newBlog.title = ""
          this.newBlog.content = ""
          this.newBlog.image = ""
          this.newBlog.author = ""
        }, 1000);
        $("#blogModal").modal("hide");
        $(".modal-backdrop").remove();
      },
    }
  }
</script>

<style>
  .create-new-blog-bg {
    background-color: white;
    font-weight: 600;
    color: rgb(5, 38, 45);
  }

  .blog-page-title {
    font-family: 'Pacifico', cursive;
    color: rgb(109, 197, 154);
    font-size: 70px;
  }
</style>