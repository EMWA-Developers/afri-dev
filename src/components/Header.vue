<template lang="html">
  <div>
    <!-- Header -->
    <nav class="navbar navbar-expand-lg widget--light-black font-size-15 fixed-top d-flex flex-row align-items-center shadow-sm">
      <div class="d-flex flex-row align-items-center">
        <button class="btn my-0 py-0" type="button" @click="onToggleSidebar">
          <i class="material-icons">menu</i>
        </button>
        <router-link tag="a" to="/" class="navbar-brand w3-xlarge py-0 my-0">
          <strong>afrilex</strong>
        </router-link>
      </div>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item btn widget--btn-link">
          <!-- <li class="nav-item btn widget--btn-link" data-toggle="modal" data-target="#createPostModal"> -->
            <a class="nav-link font-weight-medium d-flex flex-row align-items-center" @click="onNewPost">
              <i class="material-icons mr-1 w3-large">add</i>New Post <span class="sr-only">(current)</span>
            </a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item btn widget--btn-link">
            <a class="nav-link font-weight-medium" @click="onListPractice">List your practice</a>
          </li>
          <router-link tag="li" to="/login" class="nav-item btn widget--btn-link" v-if="!userIsAuthenticated">
            <a class="nav-link font-weight-medium" href="#">Log in</a>
          </router-link>
          <router-link tag="li" to="/sign-up" class="nav-item btn widget--btn-link" v-if="!userIsAuthenticated">
            <a class="nav-link font-weight-medium" href="#">Sign up</a>
          </router-link>
          <router-link tag="li" to="/messaging" class="nav-item btn widget--btn-link" v-if="userIsAuthenticated">
            <a class="nav-link font-weight-medium">
              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-messenger" height="28" width="28" fill="currentColor" class="svg-inline--fa fa-facebook-messenger" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 32C15.9 32-77.5 278 84.6 400.6V480l75.7-42c142.2 39.8 285.4-59.9 285.4-198.7C445.8 124.8 346.5 32 224 32zm23.4 278.1L190 250.5 79.6 311.6l121.1-128.5 57.4 59.6 110.4-61.1-121.1 128.5z"></path></svg>
            </a>
          </router-link>
          <li class="nav-item btn widget--btn-link dropdown" v-if="userIsAuthenticated">
            <a class="nav-link dropdown-toggle pb-0 px-0" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img :src="user.avatar"
              alt="" class="lazyload rounded-circle mr-2 " style="height:36px;width:36px">
              {{username}}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link tag="a" to="/account" class="dropdown-item" href="#">My account</router-link>
              <a class="dropdown-item" @click="onLogout">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <!-- Create Post Modal -->
    <CreatePostModal />
    <!-- No User Modal -->
    <NoUserModal />
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import CreatePostModal from '@/components/modal/CreatePost';

export default {
  components: {
    CreatePostModal
  },
  computed: {
    ...mapGetters(['user', 'isOpen']),
    userIsAuthenticated () {
      return this.user != null && this.user != undefined ? true : false;
    },
    username() {
      let firstname, lastname = '';
      (this.user.firstname != undefined || this.user.firstname) ? firstname = this.user.firstname : firstname = '';
      (this.user.lastname != undefined || this.user.lastname) ? lastname = this.user.lastname : lastname = '';
      return `${firstname} ${lastname}`
    }
  },
  methods: {
    onToggleSidebar () {
      if (this.isOpen) {
        this.$store.dispatch('setIsOpen', false)
      } else {
        this.$store.dispatch('setIsOpen', true)
      }
    },
    onNewPost() {
      return this.user != null && this.user != undefined ? $('#createPostModal').modal('show') : $('#noUserModal').modal('show');
    },
    onListPractice() {
      return this.user != null && this.user != undefined ? this.$router.push('/list-practice') : $('#noUserModal').modal('show');
    },
    async onLogout() {
      await this.$store.dispatch('removeStatus')
      await this.$store.dispatch('logout');
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
