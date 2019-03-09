<template>
  <div class="home">
    <!-- Header -->
    <Header />
    <!--  -->
    <main role="main" class="row no-gutters">
      <SidebarTile>
        <Sidebar />
      </SidebarTile>
      <transition name="slide" appear mode="out-in">
        <MainTile>
          <div class="widget--listing-1 w3-padding-48 px-md-5 w3-container">
            <div class="container">
              <h1 class="my-0 d-flex flex-row align-items-center">
                <i class="icon-book-open mr-3" style="font-size:34px;" aria-hidden="true"></i>
                <strong>Legal Articles</strong>
              </h1>
            </div>
          </div>
          <div class="w3-padding-32 px-5">
            <div class="container">
              <div class="rounded-pill py-2 mb-5 px-2 d-flex flex-row align-items-center w3-light-grey">
                <img src="https://lh3.googleusercontent.com/-3cB6E0IJd-o/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcn4x9wy2Y0xvzUaOtAl-rnrLTxIw/mo/photo.jpg?sz=46"
                class="mr-2 rounded-circle" alt="..." style="height:40px;width:40px;">
                <textarea name="name" rows="1" cols="1" class="form-control border-0 w3-light-grey font-size-16" placeholder="Publish a legal article" @click="onPostLegal"></textarea>
              </div>
              <div class="d-flex flex-row align-items-center justify-content-center w3-padding-32" v-if="loading">
                <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <div class="row no-gutters" v-else>
                <!--  -->
                <div class="col-12 col-md-6 pr-md-3">
                  <ArticleCard :post="post" v-for="(post, i) in legalArticles" :key="post.id" v-if="(i+1) % 2" />
                </div>
                <div class="col-12 col-md-6 pl-md-3">
                  <ArticleCard :post="post" v-for="(post, i) in legalArticles" :key="post.id" v-if="(i+2) % 2" />
                </div>
              </div>
            </div>
          </div>
        </MainTile>
      </transition>
    </main>
    <!-- LegalModal -->
    <ArticlePostModal />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'legal-articles',
  computed: {
    ...mapGetters(['legalArticles', 'loading']),
  },
  methods: {
    onPostLegal() {
      $('#postArticleModal').modal('show')
    }
  },
  created() {
    if (!this.legalArticles.length) {
      this.$store.dispatch('getLegalArticles')
    }
  }
}
</script>
