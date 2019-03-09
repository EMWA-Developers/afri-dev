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
                <i class="material-icons mr-2" style="font-size:38px;" aria-hidden="true">explore</i>
                <strong>Discover</strong>
              </h1>
            </div>
          </div>
          <div class="w3-padding-48 px-5">
            <div class="container">
              <div class="row no-gutters" v-if="posts.length">
                <!--  -->
                <div class="col-12 col-md-6 pr-md-3">
                  <PostCard :post="post" v-for="(post, i) in posts" :key="post.id" v-if="(i+1) % 2" />
                </div>
                <!--  -->
                <div class="col-12 col-md-6 pl-md-3">
                  <PostCard :post="post" v-for="(post, i) in posts" :key="post.id" v-if="(i+2) % 2" />
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

export default {
  name: 'legal-articles',
  computed: {
    ...mapGetters(['loading', 'user', 'error', 'areaOfPractices', 'posts']),
  },
  created() {
    if (!this.posts.length) {
      this.$store.dispatch('getAllPosts')
    }
  }
}
</script>
