<template lang="html">
  <div>
    <div class="card border-0 rounded-0 widget--shadow mb-4">
      <div class="card-body px-3 py-2">
        <!-- Profile -->
        <div class="row align-items-center">
          <div class="col-9" v-if="creator">
            <div class="row no-gutters pt-1">
              <div class="col-2">
                <img :data-src="creator.avatar"
                alt="" class="lazyload rounded-circle" style="height:40px;width:40px">
              </div>
              <div class="col-10 text-truncate">
                <h6 class="mx-0 mb-1 mt-0 text-truncate font-size-15 font-weight-medium">{{`${creator.firstname} ${creator.lastname}`}}</h6>
                <div class="w3-small text-truncate text-black-50 font-weight-medium">
                  {{post.createdAt | date}}
                </div>
              </div>
            </div>
          </div>
          <div class="col-3 d-flex flex-row justify-content-end">
            <router-link tag="button" :to="`/article/${post.id}`" type="button" class="btn btn-sm w3-light-grey">Read</router-link>
          </div>
        </div>
        <!-- Description -->
        <div class="mt-3">
          <h6 v-if="post.title">{{post.title}}</h6>
          <p v-if="post.content">{{post.content}}</p>
        </div>
      </div>
      <div class="widget--card-images mb-3" v-if="post.imageUrl">
        <img :src="post.imageUrl" alt="" class="card-img-top rounded-0 widget--card-images-main">
      </div>
      <div class="card-body px-3 pt-0 pb-3">
        <div class="d-flex flex-row align-items-center justify-content-between">
          <div class="d-flex flex-row align-items-center font-weight-medium">
            <button class="mr-3 btn m-0 p-0 w3-hover-text-blue d-flex flex-row align-items-center" :class="userIsLikedPost ? 'w3-text-blue' : ''" @click="onLikePost">
              <i class="material-icons w3-large pointer">thumb_up_alt</i>&nbsp; {{post.favoriteCount}}
            </button>
            <!-- <span class="mr-3 d-flex flex-row align-items-center">
              <i class="material-icons w3-large pointer">thumb_down_alt</i>&nbsp; 230
            </span> -->
          </div>
          <span class="">
            <i class="material-icons w3-large pointer">share</i>
          </span>
        </div>
      </div>
    </div>
    <NoUserModal />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {db} from '../../main'

export default {
  props: ['post'],
  data: () => ({
    content: '',
    userIsLikedPost: false,
    comments: [],
    loading: false,
    commentsLoaded: false,
  }),
  computed: {
    ...mapGetters(['creator', 'user']),
    userIsAuthenticated () {
      return this.user != null && this.user != undefined ? true : false;
    },
  },
  watch: {
    comments(value) {
      if (value.length) {
        this.getUserCommented()
      }
    },
    user (value) {
      if (value != null && value != undefined) {
        this.isUserLikedPost()
      } else {
        this.userIsLikedPost = false;
      }
    }
  },
  methods: {
    onLoadComments() {
      this.commentsLoaded ? this.commentsLoaded = false : this.commentsLoaded = true;
      this.loading = true;

      const docRef = db.collection('posts').doc(this.post.id);

      docRef.collection('comments')
        .onSnapshot((snapshot) => {
          var comments = []
          if (snapshot) {
            snapshot.forEach((doc) => {
              comments.push({
                id: doc.id,
                ...doc.data()
              })
            })
          }
          this.comments = comments
          this.loading = false
        }, (error) => {
          this.commentsLoaded = false;
          this.loading = false
        })
    },
    async onCommentPost() {
      if (!this.content) return;

      const data = {
        content: this.content,
        postId: this.post.id,
      }
      await this.$store.dispatch('commentPost', data)
      this.content = ''
    },
    onLikePost() {
      if (!this.userIsAuthenticated) {
        $('#noUserModal').modal('show')
      } else if (this.userIsLikedPost) {
        this.$store.dispatch('dislikePost', this.post.id)
      } else {
        this.$store.dispatch('likePost', this.post.id)
      }
    },
    getUserCommented() {
      let comments = [];
      if (!this.comments.length) return;

      this.comments.forEach((comment) => {
        db.collection('users').doc(comment.userId)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const data = doc.data()
              let avatar = data.avatar;
              let firstname = data.firstname;
              let lastname = data.lastname;
              comments.push({
                avatar,
                firstname,
                lastname,
                ...comment
              })
            }
          })
      })
      this.comments = comments
    },
    getCreator() {
      this.$store.dispatch('getCreator', this.post.createdBy)
    },
    isUserLikedPost() {
      const docRef = db.collection('posts').doc(this.post.id);

      docRef.collection('favorites').doc(`${this.user.id}_${this.post.id}`)
        .onSnapshot(doc => {
          if (doc.exists) {
            this.userIsLikedPost = true
          } else {
            this.userIsLikedPost = false
          }
        })
    }
  },
  created() {
    this.getCreator()
    this.getUserCommented()
    if (this.userIsAuthenticated) {
      this.isUserLikedPost()
    }
  }
}
</script>


<style lang="css">
</style>
