<template>
  <div class="home">
    <!-- Header -->
    <Header />
    <!--  -->
    <main role="main" class="row no-gutters">
      <SidebarTile>
        <Sidebar />
      </SidebarTile>
      <transition name="slide" mode="out-in">
        <MainTile v-if="article">
          <div class="w3-padding-48 row px-5">
            <!--  -->
            <div class="col-12 col-md-8">
              <h3 class="border-bottom pb-3" v-if="article.title">{{article.title}}</h3>
              <div class="row no-gutters my-4 px-2" v-if="creator">
                <div class="col-1">
                  <img :src="creator.avatar"
                  class="mr-3 rounded-circle" style="height:40px;width: 40px;">
                </div>
                <div class="col-11 text-truncate">
                  <h6 class="mb-1">{{`${creator.firstname} ${creator.lastname}`}}</h6>
                  <div class="w3-small text-truncate text-black-50 font-weight-medium">
                    {{article.createdAt | date}}
                  </div>
                </div>
              </div>
              <!--  -->
              <div class="widget--card-images mt-3" v-if="article.imageUrl">
                <div class="row no-gutters">
                  <div class="col-12">
                    <img :src="article.imageUrl" alt="" class="card-img-top w3-round-large widget--card-images-main">
                  </div>
                </div>
              </div>
              <!--  -->
              <div class="my-3" v-if="article.content">
                {{article.content}}
              </div>
              <!--  -->
              <div class="card-body px-3 py-1">
                <div class="my-2 d-flex flex-row align-items-center justify-content-between">
                  <div class="d-flex flex-row align-items-center font-weight-medium">
                    <button class="mr-3 btn m-0 p-0 w3-hover-text-blue d-flex flex-row align-items-center" :class="userIsLikedPost ? 'w3-text-blue' : ''" @click="onLikePost">
                      <i class="material-icons w3-large pointer">thumb_up_alt</i>&nbsp; {{article.favoriteCount}}
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
              <!--  -->
              <div class="d-flex flex-row align-items-center rounded-pill w3-light-grey px-2 py-1 my-2" v-if="userIsAuthenticated">
                <img :src="user.avatar"
                alt="" class="rounded-circle mr-1" style="height:30px;width:30px">
                <input type="text" name="" value="" class="form-control form-control-sm rounded-pill border-0 py-0 w3-light-grey" placeholder="Add a comment...">
              </div>
              <div class="d-flex flex-row align-items-center w3-light-grey px-3 py-2 rounded-pill" v-else>
                <i class="material-icons mr-2" aria-hidden="true">https</i> Login to comment this post
              </div>
              <!--  -->
              <div class="d-flex flex-row align-items-center text-black-50" :class="{'mb-2': commentsLoaded}">
                <div class="text-black-50 w3-small">{{article.commentCount}} comment{{article.commentCount > 0 ? 's': ''}}</div>
              </div>
              <div v-if="commentsLoaded" class="widget--commentsLoaded">
                <ul class="list-unstyled font-size-14">
                  <li class="text-truncate" v-for="comment in comments" :key="comment.id">
                    <strong>{{`${comment.firstname} ${comment.lastname}`}}</strong>&nbsp; {{comment.content}}
                  </li>
                </ul>
              </div>
            </div>
            <!--  -->
            <!--  -->
            <!--  -->
            <div class="col-12 col-md-4 mt-4 mt-md-0 pl-md-3">
              <div class="card rounded-0 widget--borderless widget--shadow">
                <div class="card-header w3-white">
                  <h6 class="m-0">Related articles</h6>
                </div>
                <div class="card-body">
                  <ul class="list-unstyled">
                    <li class="border-bottom pb-2 mb-2" v-for="n in 5" :key="n">
                      <div class="font-weight-medium">American Jurisprudence and Just Culture</div>
                      <small class="text-black-50">By: <a href="#">Aaron Dizele</a></small>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </MainTile>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {db} from '../../main'

export default {
  name: 'legal-articles',
  props: ['id'],
  data: () => ({
    content: '',
    userIsLikedPost: false,
    comments: [],
    loading: false,
    commentsLoaded: false,
  }),
  computed: {
    ...mapGetters(['creator', 'user']),
    article() {
      return this.$store.getters.article(this.id)
    },
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
      db.collection('comments')
        .where('postId', '==', this.id)
        // .orderBy('createdAt', 'desc')
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
        postId: this.id,
      }
      await this.$store.dispatch('commentPost', data)
      this.content = ''
    },
    onLikePost() {
      if (!this.userIsAuthenticated) {
        $('#noUserModal').modal('show')
      } else if (this.userIsLikedPost) {
        this.$store.dispatch('dislikePost', this.id)
      } else {
        this.$store.dispatch('likePost', this.id)
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
      this.$store.dispatch('getCreator', this.article.createdBy)
    },
    isUserLikedPost() {
      db.collection('favorites').doc(`${this.user.id}_${this.id}`)
      .onSnapshot((doc) => {
        if (doc.exists) {
          this.userIsLikedPost = true
        } else {
          this.userIsLikedPost = false
        }
      }, (e) => {
      })
    }
  },
  created() {
    this.getCreator()
    this.onLoadComments()
    this.getUserCommented()
    if (this.userIsAuthenticated) {
      this.isUserLikedPost()
    }
  }
}
</script>
