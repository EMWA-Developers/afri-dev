<template lang="html">
  <div class="">
    <div class="card border-0 rounded-0 widget--shadow mb-4">
      <div class="card-body p-3 media">
        <div class="d-flex flex-column justify-content-center">
          <img :src="user.avatar"
          class="mr-3 rounded-circle" alt="..." style="height:64px;width: 64px;">
          <button class="btn btn-light btn-sm mt-3" @click="onSendMessage">Message</button>
        </div>
        <div class="media-body pl-3">
          <p class="mb-1">
            <span class="badge badge-warning font-weight-medium" v-if="user.plan == 'business'">LAW FIRM</span>
            <span class="badge badge-warning font-weight-medium ml-2" v-if="user.sponsored">
              <i class="icon-info mr-1 font-weight-bold font-weight-medium" aria-hidden="true"></i>
              SPONSORED
            </span>
          </p>
          <router-link tag="a" :to="`/profile/${user.id}`">
            <h5 class="mt-0 mb-1">
              <i class="icon-badge" aria-hidden="true" v-if="!user.plan == 'business'"></i> {{`${user.firstname} ${user.lastname}`}}
            </h5>
          </router-link>
          <h6 class="mb-1">Legal assurance, natural resources, infrastructure, commerce & industry</h6>
          <p class="mb-1 mt-0" v-if="!user.plan == 'business' && user.company"><i class="icon-home mr-1" aria-hidden="true"></i> {{user.company}}</p>
          <p class="d-flex flex-row align-items-center my-1">
            <span class="widget--rate">
              <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
            </span>
            <span class="widget--rate">
              <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
            </span>
            <span class="widget--rate">
              <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
            </span>
            <span class="widget--rate">
              <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
            </span>
            <span class="widget--rate">
              <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
            </span>
            (50)
          </p>
          <div class="d-flex flex-row align-items-center my-1">
            <i class="icon-clock mr-2" aria-hidden="trie"></i>Open: <span class="font-weight-medium">09h - 18h</span>
          </div>
          <div class="pt-2 text-black-50">
            <i class="icon-location-pin mr-1" aria-hidden="true"></i>321 Mannathan, New York, USA
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user'],
  computed: {
    currentUser() {
      return this.$store.getters.user;
    },
    userIsAuthenticated() {
      return this.currentUser != null && this.currentUser != undefined ? true : false;
    },
  },
  methods: {
    onSendMessage() {
      if (!this.userIsAuthenticated) {
        $('#noUserModal').modal('show');
        return;
      }
      if (this.user.id === this.currentUser.id) return;
      this.$store.dispatch('setCurrentChannel',{
        sender: this.currentUser,
        recipient: this.user
      })
      this.$router.push(`/chat/${this.currentUser.id}_${this.user.id}`)
    }
  }
}
</script>

<style lang="css">
</style>
