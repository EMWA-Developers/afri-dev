<template lang="html">
  <div class="">
    <div class="card border-0 rounded-0 widget--shadow mb-4">
      <div class="card-body px-3 pb-2 pt-3" v-if="creator">
        <!-- Profile -->
        <div class="row no-gutters d-flex flex-row align-items-center">
          <div class="col-1">
            <img :data-src="creator.avatar"
            alt="" class="lazyload rounded-circle" style="height:40px;width:40px">
          </div>
          <div class="col-11 pl-4 d-flex justify-content-between align-items-start">
            <h6 class="mx-0 mb-1 mt-0 text-truncate font-size-15 font-weight-medium">{{`${creator.firstname} ${creator.lastname}`}}</h6>
            <small class="w3-text-grey">{{post.createdAt | date}}</small>
          </div>
        </div>
        <!-- Description -->
        <p class="row mt-3 mb-2 px-3" v-if="post.content">
          {{post.content}}
        </p>
      </div>
      <div class="widget--card-images" v-if="post.imageUrl">
        <div class="row no-gutters">
          <div class="col-12">
            <img :data-src="post.imageUrl" alt="" class="lazyload card-img-top rounded-0 widget--card-images-main">
          </div>
        </div>
      </div>
      <div class="card-body px-3 pt-2 pb-3">
        <div class="my-2 d-flex flex-row align-items-center justify-content-between">
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
        <div class="d-flex flex-row align-items-center text-black-50" :class="{'mb-2': commentsLoaded}">
          <small class="text-black-50 w3-small">{{post.commentCount}} comment{{post.commentCount > 0 ? 's': ''}}</small>
          <span class="mx-1">•</span>
          <button type="button" class="btn btn-link w3-small p-0 m-0" @click="onLoadComments">All comments</button>
        </div>
        <div v-if="commentsLoaded" class="widget--commentsLoaded">
          <ul class="list-unstyled font-size-14">
            <li class="text-truncate d-flex flex-row align-items-center" v-for="comment in comments" :key="comment.id">
              <UserComment :id="comment.userId" />&nbsp; {{comment.content}}
              <!-- <strong>{{`${comment.firstname} ${comment.lastname}`}}</strong>&nbsp; {{comment.content}} -->
            </li>
          </ul>
        </div>
        <div class="d-flex flex-row align-items-center rounded-pill w3-light-grey px-2 py-1 mt-2" v-if="userIsAuthenticated">
          <img :src="user.avatar"
          alt="" class="lazyload rounded-circle mr-1" style="height:30px;width:30px">
          <input type="text" name="" value="" class="form-control form-control-sm rounded-pill border-0 py-0 w3-light-grey" placeholder="Add a comment..." v-model.trim="content" @keyup.enter="onCommentPost">
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
    user (value) {
      if (value != null && value != undefined) {
        this.isUserLikedPost()
      } else {
        this.userIsLikedPost = false;
      }
    }
  },
  methods: {
    async onLoadComments() {
      this.commentsLoaded ? this.commentsLoaded = false : this.commentsLoaded = true;
      if (this.comments.length) return;

      this.loading = true;
      var comments = []
      var commentsWithUser = []

      const docRef = db.collection('posts').doc(this.post.id);

      await docRef.collection('comments')
        .onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            comments.push({
              id: doc.id,
              ...doc.data()
            })
          })
        }, (error) => {
          this.commentsLoaded = false;
          this.loading = false
        })

        comments.forEach((comment) => {
          db.collection('users').doc(comment.userId)
            .get()
            .then((doc) => {
              const data = doc.data()
              let avatar = data.avatar;
              let firstname = data.firstname;
              let lastname = data.lastname;
              commentsWithUser.push({
                avatar,
                firstname,
                lastname,
                ...comment
              })
            })
            .catch(error => {
              this.commentsLoaded = false;
              this.loading = false
            })
        })
        this.comments = comments
        this.loading = false
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
    if (this.userIsAuthenticated) {
      this.isUserLikedPost()
    }
  }
}
</script>

<style lang="css">
</style>
