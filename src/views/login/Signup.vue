<template lang="html">
  <div>
    <!-- Header -->
    <Header />
    <!--  -->
    <main role="main" class="row no-gutters">
      <div class="widget--collapse-sidebar sidebar">
        <Sidebar />
      </div>
      <transition name="slide" appear mode="out-in">
        <div class="widget--collapse-main">
          <div class="widget--listing-1 w3-padding-48 px-md-5 w3-container">
            <h1 class="my-0"><strong>Sign up to Afrilex</strong></h1>
          </div>
          <div class="row w3-padding-48">
            <div class="col-12 col-md-8 offset-md-2">
              <div class="container">
                <div class="card rounded-0 widget--borderless">
                  <div class="card-body text-center font-size-16">
                    <router-link to="/list-practice" tag="div">Do you want to create a professional or business account? <a href="#"> <u>List your practice</u> </a></router-link>
                  </div>
                </div>
                <div class="mt-4 card rounded-0 widget--borderless">
                  <div class="card-body pb-0">
                    <div class="d-flex flex-row align-items-center justify-content-center">
                      <button type="button" class="btn w3-light-grey rounded-0 font-weight-medium d-flex flex-row align-items-center mx-2" @click="onLoginWithFacebook">
                        <img src="../../assets/facebook.png" alt="" style="width:18px;height:18px">
                        <span class="ml-2">Sign up with Facebook</span>
                      </button>
                      <button type="button" class="btn w3-light-grey rounded-0 font-weight-medium d-flex flex-row align-items-center mx-2" @click="onLoginWithGoogle">
                        <svg width="18" height="18" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><title>UI/icons/color/google</title><g fill="none" fill-rule="evenodd"><path d="M34.44 18.6c0-1.15-.1-2.26-.3-3.32h-15.6v6.28h8.92a7.46 7.46 0 0 1-3.3 4.9v4.07h5.34c3.13-2.82 4.94-6.98 4.94-11.93z" fill="#4285F4"/><path d="M18.55 34.47c4.47 0 8.21-1.46 10.95-3.94l-5.35-4.07a10.09 10.09 0 0 1-5.6 1.55 9.84 9.84 0 0 1-9.26-6.7H3.76v4.21a16.58 16.58 0 0 0 14.79 8.95z" fill="#34A853"/><path d="M9.29 21.32a9.6 9.6 0 0 1 0-6.17v-4.2H3.76a15.98 15.98 0 0 0 0 14.57l5.53-4.2z" fill="#FBBC05"/><path d="M18.55 8.46c2.43 0 4.61.82 6.33 2.42l4.74-4.65A16.08 16.08 0 0 0 18.55 2a16.58 16.58 0 0 0-14.79 8.94l5.53 4.2a9.84 9.84 0 0 1 9.26-6.68z" fill="#EA4335"/></g></svg>
                        <span class="ml-2">Sign up with Google</span>
                      </button>
                    </div>
                    <hr>
                    <form @submit.prevent="onSignupWithEmail">
                      <div class="alert alert-danger alert-dismissible fade show rounded-0 mb-3" role="alert" v-if="error">
                        <strong>Error!</strong> {{error}}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="form-group">
                          <label for="email" class="font-weight-medium pl-2">Email</label>
                          <input type="email" class="form-control rounded-pill w3-light-grey border-0" id="email" placeholder="youraddress@mail.com" v-model.trim="email">
                      </div>
                      <div class="form-group">
                          <label for="password" class="font-weight-medium pl-2">Password</label>
                          <input type="password" class="form-control rounded-pill w3-light-grey border-0" id="password" placeholder="Password" aria-describedby="passwordHelpBlock" v-model.trim="password">
                          <small id="passwordHelpBlock" class="form-text text-muted">
                              Your password must be 6-20 characters long, contain letters and numbers, and must not contain spaces, special
                              characters, or emoji.
                          </small>
                      </div>
                      <div class="modal-footer mt-4">
                        <router-link tag="button" to="/" class="btn font-weight-medium rounded-pill text-uppercase">Cancel</router-link>
                        <button type="submit" class="btn font-weight-medium rounded-pill text-uppercase">Sign up</button>
                      </div>
                    </form>
                  </div>
                </div>
                <!--  -->
                <div class="card rounded-0 widget--borderless mt-4">
                  <div class="card-body text-center">
                    Have already an account ? <router-link tag="a" to="/login"><u>Log in</u></router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    email: '',
    password: '',
    isPasswordValid: false,
  }),
  computed: {
    ...mapGetters(['loading', 'error', 'user'])
  },
  watch: {
    password(value) {
      if (value.length < 6) {
        return this.isPasswordValid = false
      }
      return this.isPasswordValid = true
    },
    user (value) {
      if (value != null && value != undefined) {
        this.$router.push('/edit-profile')
      }
    }
  },
  methods: {
    onSignupWithEmail () {
      if (!this.isPasswordValid) return

      return this.$store.dispatch('signupWithEmail', {
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
