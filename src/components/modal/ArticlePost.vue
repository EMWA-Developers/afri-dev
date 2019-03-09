<template lang="html">
  <div>
    <div class="modal fade" id="postArticleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content rounded-0 widget--borderless" v-if="user">
          <div class="modal-header pt-3 pb-0 border-bottom-0">
            <div class="row d-flex flex-row align-items-center">
                <div class="col-3" v-if="user.avatar">
                  <img :src="user.avatar"
                  alt="" class="rounded-circle" style="height:40px;width:40px">
                </div>
                <div class="col-9 pl-3">
                  <h6 class="text-truncate m-0">{{`${user.firstname} ${user.lastname}`}}</h6>
                </div>
            </div>
          </div>
          <div class="modal-body pb-1">
            <!-- <i class="icon-note w3-text-grey" aria-hidden="true"></i> -->
            <textarea name="name" rows="1" cols="2" class="form-control rounded border-0 mb-2 w3-light-grey" v-model.trim="title" placeholder="Title of article" required></textarea>
            <textarea name="" id="quote" cols="9" rows="4" class="form-control rounded border-0 pt-2 w3-light-grey" :placeholder="placeholder" v-model.trim="content" required></textarea>
            <div class="my-3 px-3">
              <img :src="imageUrl" alt="" class="lazyload widget--add-image rounded">
              <input type="file"
              style="display: none;"
              ref="photoInput"
              accept="image/*"
              @change="onPhotoPicked"
              required>
            </div>
            <button type="button" class="btn w3-light-grey rounded-pill d-flex flex-row align-items-center font-weight-medium py-1" @click="onPickPhoto">
              <i class="material-icons mr-1 w3-large" aria-hidden="true">photo_camera</i>
              Photo
              <!-- Photo/Video -->
            </button>
          </div>
          <div class="modal-footer pt-0 pb-3 border-top-0">
            <button type="button" class="btn btn-sm w3-rounded-0 text-uppercase font-weight-medium" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-sm w3-rounded-0 text-uppercase font-weight-medium" @click="onPost">Publish</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data: () => ({
    title: '',
    content: '',
    image: null,
    imageUrl: ''
  }),
  computed: {
    ...mapGetters(['user']),
    placeholder() {
      return `Content`
    }
  },
  methods: {
    async onPost() {
      if (!this.title || !this.content) return;
      
      const data = {
        title: this.title,
        content: this.content,
        image: this.image
      }
      $("#postArticleModal").modal('hide');
      await this.$store.dispatch('postLegalArticle', data);
      this.title = "";
      this.content = "";
      this.image = null;
      this.imageUrl = "";
    },
    onPickPhoto () {
      this.$refs.photoInput.click()
    },
    onPhotoPicked (e) {
      const files = e.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return this.error = 'Photo invalide. Veuillez réessayez avec une autre photo.'
      }
      const fileReader = new FileReader()
      fileReader.readAsDataURL(files[0])
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result;
      })
      this.image = files[0]
    },
  },
  mounted() {
    this.title = "";
    this.content = "";
    this.image = null;
    this.imageUrl = "";
  },
  beforeRouteEnter (to, from, next) {
    if (this.$store.getters.user) {
        next()
    } else {
        next('/login')
    }
  }
}
</script>

<style lang="css">
</style>
