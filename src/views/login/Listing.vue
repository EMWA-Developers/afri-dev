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
        <MainTile>
          <div class="widget--listing-1 w3-padding-64 px-md-5 w3-container">
            <div class="container">
              <h1 class="mb-4"><strong>Add your practice's listing to Afrilex</strong></h1>
              <div class="row">
                <div class="col-12 col-md-8">
                  <p class="w3-large">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="w3-padding-48 px-md-5 w3-container font-size-16">
            <div class="card rounded-0 widget--borderless mb-5">
              <div class="card-body">
                <h4 class="font-weight-bold my-0 text-center">Select a plan</h4>
              </div>
            </div>
            <div class="row d-flex flex-row">
              <!-- Silver -->
              <div class="col-12 col-md-4 flex-fill">
                <div class="card widget--borderless shadow-sm rounded-0 text-center w-100 w3-display-container">
                  <button type="button" class="btn border-0 w3-shadow-small btn-primary btn-sm text-white w3-round-large w3-display-topmiddle py-2 px-3" style="top:-20px">
                    <h6 class="my-0 font-weight-medium">Silver Plan</h6>
                  </button>
                  <div class="card-header w3-white border-bottom-0 pt-5">
                    <h5>$149.99</h5>
                  </div>
                  <div class="card-body py-0">
                    <ul class="list-unstyled">
                      <li>Immediate listing</li>
                      <li>Full firm practice</li>
                      <li>Service Information</li>
                      <li>customizable Listing Title</li>
                      <li>Area of Practice</li>
                      <li>Full Address</li>
                      <li>Phone number and 800 number</li>
                      <li>Firm Logo</li>
                      <li>Videos</li>
                      <li>Links to your website</li>
                    </ul>
                  </div>
                  <div class="card-footer w3-white border-top-0">
                    <router-link tag="a" to="/sign-up-silver" href="#" class="btn btn-block btn-primary text-white w3-round-large">Get started</router-link>
                  </div>
                </div>
              </div>
              <!-- Gold -->
              <div class="col-12 col-md-4 flex-fill">
                <div class="card widget--borderless shadow-sm rounded-0 text-center w-100">
                  <button type="button" class="btn border-0 w3-shadow-small btn-primary btn-sm text-white w3-round-large w3-display-topmiddle py-2 px-3" style="top:-20px">
                    <h6 class="my-0 font-weight-medium">Gold Plan</h6>
                  </button>
                  <div class="card-header w3-white border-bottom-0 pt-5">
                    <h5>$499.99</h5>
                  </div>
                  <div class="card-body py-0">
                    <ul class="list-unstyled">
                      <li>Immediate listing</li>
                      <li>Full firm practice</li>
                      <li>Service Information</li>
                      <li>customizable Listing Title</li>
                      <li>Area of Practice</li>
                      <li>Full Address</li>
                      <li>Phone number and 800 number</li>
                      <li>Firm Logo</li>
                      <li>Videos</li>
                      <li>Links to your website</li>
                      <li>Analytic and Technology Package</li>
                      <li>Professional email and domain name</li>
                    </ul>
                  </div>
                  <div class="card-footer w3-white border-top-0">
                    <router-link tag="a" to="/sign-up-electrum" href="#" class="btn btn-block btn-primary text-white w3-round-large">Get started</router-link>
                  </div>
                </div>
              </div>
              <!-- Etherium -->
              <div class="col-12 col-md-4 flex-fill">
                <div class="card widget--borderless shadow-sm rounded-0 text-center w-100">
                  <button type="button" class="btn border-0 w3-shadow-small btn-primary btn-sm text-white w3-round-large w3-display-topmiddle py-2 px-3" style="top:-20px">
                    <h6 class="my-0 font-weight-medium">Electrum Plan</h6>
                  </button>
                  <div class="card-header w3-white border-bottom-0 pt-5">
                    <h5>$889.99</h5>
                  </div>
                  <div class="card-body py-0">
                    <ul class="list-unstyled">
                      <li>Immediate listing</li>
                      <li>Full firm practice</li>
                      <li>Service Information</li>
                      <li>customizable Listing Title</li>
                      <li>Area of Practice</li>
                      <li>Full Address</li>
                      <li>Phone number and 800 number</li>
                      <li>Firm Logo</li>
                      <li>Videos</li>
                      <li>Links to your website</li>
                      <li>Analytic and Technology Package</li>
                      <li>Professional email and domain name</li>
                    </ul>
                  </div>
                  <div class="card-footer w3-white border-top-0">
                    <router-link tag="a" to="/sign-up-gold" href="#" class="btn btn-block btn-primary text-white w3-round-large">Get started</router-link>
                  </div>
                </div>
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
  data: () => ({
    email: '',
    password: ''
  }),
  computed: {
    ...mapGetters(['loading', 'error', 'user'])
  },
  watch: {
    user (value) {
      if (value != null && value != undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onLoginWithEmail () {
      return this.$store.dispatch('loginWithEmail', {
        email: this.email,
        password: this.password
      })
    },
    onLoginWithGoogle () {
      return this.$store.dispatch('loginWithGoogle')
    },
    onLoginWithFacebook () {
      return this.$store.dispatch('loginWithFacebook')
    }
  },
  created() {
    this.email = ''
    this.password = ''
  }
}
</script>

<style lang="scss" scoped>
</style>
