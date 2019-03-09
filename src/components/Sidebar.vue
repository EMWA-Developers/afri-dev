<template lang="html">
  <nav class="sidebar-sticky font-size-14 w3-white">
    <ul class="nav flex-column">
      <router-link tag="li" to="/" class="nav-item">
        <a class="nav-link d-flex flex-row align-items-center" href="#">
           <i class="material-icons w3-large mr-2" aria-hidden="true">search</i> Find a lawyer
        </a>
      </router-link>
      <router-link tag="li" to="/discover" class="nav-item">
        <a class="nav-link d-flex flex-row align-items-center" href="#">
          <i class="material-icons w3-large mr-2" aria-hidden="true">explore</i> Discover
        </a>
      </router-link>
      <router-link tag="li" to="/available-lawyers" class="nav-item">
        <a class="nav-link d-flex flex-row align-items-center" href="#">
          <div class="spinner-grow spinner-grow-sm mr-2 text-success" role="status"></div>
          Available Lawyers
        </a>
      </router-link>
      <router-link tag="li" to="/legal-articles" class="nav-item">
        <a class="nav-link" href="#">
          <i class="icon-book-open font-weight-bold mr-2" aria-hidden="true"></i>
          Legal articles
        </a>
      </router-link>
      <router-link tag="li" to="/awards" class="nav-item">
        <a class="nav-link" href="#">
          <i class="icon-badge font-weight-bold mr-2" aria-hidden="true"></i>
          Top Law firms & Lawyers
        </a>
      </router-link>
      <router-link tag="li" to="/area-of-practices" class="nav-item">
        <a class="nav-link" href="#">
          <i class="icon-layers font-weight-bold mr-2" aria-hidden="true"></i>
          Area of Practice
        </a>
      </router-link>
      <!-- <router-link tag="li" to="/my-followers" class="nav-item">
        <a class="nav-link" href="#">
          <i class="icon-people font-weight-bold mr-2" aria-hidden="true"></i>
          Followers
        </a>
      </router-link> -->
      <!-- <router-link tag="li" to="/pricing" class="nav-item">
        <a class="nav-link d-flex flex-row align-items-center" href="#">
          <i class="material-icons w3-large mr-2" aria-hidden="true">monetization_on</i>
          Pricing
        </a>
      </router-link> -->
      <router-link tag="li" to="/my-notifications" class="nav-item">
        <a class="nav-link d-flex flex-row align-items-center" href="#">
          <i class="material-icons w3-large mr-2" aria-hidden="true">notifications</i>
          Notifications
        </a>
      </router-link>
    </ul>
    <hr>
    <ul class="nav flex-column mb-2 text-break text-wrap">
      <router-link tag="li" to="/listing-management" class="nav-item" v-if="userIsAuthenticated">
        <a class="nav-link d-flex flex-row align-items-center" href="#">
          <i class="material-icons w3-large mr-2" aria-hidden="true">settings</i>
          Settings
        </a>
      </router-link>
      <router-link tag="li" to="/send-feedback" class="nav-item">
        <a class="nav-link d-flex flex-row align-items-center" href="#">
          <i class="material-icons w3-large mr-2" aria-hidden="true">message</i>
          Send Feedback
        </a>
      </router-link>
      <router-link tag="li" to="/help" class="nav-item">
        <a class="nav-link d-flex flex-row align-items-center" href="#">
          <i class="material-icons w3-large mr-2" aria-hidden="true">help</i>
          Help
        </a>
      </router-link>
      <div class="w3-small mt-5 d-flex flex-row flex-wrap align-items-center text-break text-wrap">
        &copy; {{new Date().getFullYear()}} African Law Reports <span class="mx-1">•</span>
        <router-link tag="a" to="/privacy-policy" href="#">Privacy Policy</router-link> <span class="mx-1">•</span>
        <router-link tag="a" to="/terms-of-service" href="#">Terms of service</router-link>
      </div>
    </ul>
  </nav>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  computed: {
    ...mapGetters(['user', 'isOpen']),
    userIsAuthenticated () {
      return this.user != null && this.user != undefined ? true : false;
    },
  },
}
</script>

<style lang="scss" scoped>
/* Sidebar */
.sidebar {
  // width: 300px;
}
</style>
