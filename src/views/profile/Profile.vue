<template lang="html">
  <div>
    <!-- Header -->
    <Header />
    <!--  -->
    <main role="main" class="row no-gutters">
      <SidebarTile>
        <Sidebar />
      </SidebarTile>
      <transition name="slide" appear mode="out-in">
        <MainTile v-if="profile">
          <div class="w3-padding-64 px-md-5 w3-container widget--shadow-text">
            <div class="container">
              <div class="row">
                <div class="col-12 col-md-3 text-center">
                  <img :data-src="profile.avatar" alt="" class="rounded-circle lazyload" style="width:80px;height:80px">
                </div>
                <div class="col-12 col-md-9">
                  <h4>{{`${profile.general.firstname} ${profile.general.lastname}`}}</h4>
                  <h5>{{profile.title}}</h5>
                  <div class="d-flex flex-row align-items-center mt-3">
                    <button type="button" name="button" class="btn btn-sm w3-light-grey rounded-0 d-flex flex-row align-items-center mr-3">
                      <i class="material-icons w3-large mr-2" aria-hidden="true">add</i>Follow
                    </button>
                    <button type="button" name="button" class="btn btn-sm w3-light-grey rounded-0 d-flex flex-row align-items-center mr-3">
                      <i class="material-icons w3-large mr-2" aria-hidden="true">message</i> Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--  -->
          <section class="">
            <ul class="nav nav-tabs widget--nav-tabs text-uppercase widget--subtitle font-weight-medium widget--nav-tabs-profile" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" href="#overview" aria-controls="overview" role="tab" data-toggle="tab">
                    General
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#publications" aria-controls="publications" role="tab" data-toggle="tab">Publications
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#team" aria-controls="team" role="tab" data-toggle="tab">Legal articles</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#team" aria-controls="team" role="tab" data-toggle="tab">Contact</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#team" aria-controls="team" role="tab" data-toggle="tab">Partners</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#team" aria-controls="team" role="tab" data-toggle="tab">Address</a>
                </li>
            </ul>
          </section>
          <!--  -->
          <div class="container">

          </div>
        </MainTile>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['id'],
  data: () => ({
  }),
  computed: {
    ...mapGetters(['loading', 'error', 'user']),
    profile() {
      return this.$store.getters.currentProfile;
    }
  },
  watch: {
    user (value) {
      if (value != null && value != undefined) {
      }
    }
  },
  methods: {
  },
  created() {
    this.$store.dispatch('getCurrentPosition')
    console.log(this.profile);
  }
}
</script>

<style lang="scss" scoped>
</style>
