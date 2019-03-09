<template lang="html">
  <div>
    <!-- Header -->
    <Header />
    <!--  -->
    <main role="main" class="row no-gutters">
      <div class="widget--collapse-sidebar sidebar">
        <Sidebar />
      </div>
      <transition name="slide" mode="out-in">
        <div class="widget--collapse-main">
          <div class="row w3-padding-48">
            <div class="col-12 col-md-8 offset-md-2">
              <div class="container">
                <div class="card rounded-0 widget--borderless">
                  <div class="card-body">
                    <h4 class="font-weight-bold my-0 text-center">Set up your profile</h4>
                  </div>
                </div>
                <div class="mt-4 card rounded-0 widget--borderless">
                  <form @submit.prevent="onSaveProfile" class="card-body pb-0">
                    <div class="form-group">
                        <label for="firstname" class="font-weight-medium pl-2">First name</label>
                        <input type="text" class="form-control rounded-pill w3-light-grey border-0" id="firstname"
                            placeholder="Eg.: John" v-model.trim="firstname">
                    </div>
                    <div class="form-group">
                        <label for="lastname" class="font-weight-medium pl-2">Last name</label>
                        <input type="text" class="form-control rounded-pill w3-light-grey border-0" id="lastname"
                            placeholder="Eg.: Doe" v-model.trim="lastname">
                    </div>
                    <legend class="font-size-14 mb-3">Add avatar</legend>
                    <div class="row align-items-center d-flex flex-row">
                      <div class="col-3 text-center">
                        <img :src="imageUrl" alt="" class="rounded-circle" style="height:70px;width:70px">
                      </div>
                      <div class="col-9">
                        <button class="btn btn-sm w3-light-grey" @click="onPickPhoto">Choose picture</button>
                        <input type="file"
                        style="display: none;"
                        ref="photoInput"
                        accept="image/*"
                        @change="onPhotoPicked"
                        required>
                      </div>
                    </div>
                    <div class="modal-footer mt-4">
                      <router-link tag="button" to="/" type="button" class="btn font-weight-medium rounded-pill text-uppercase">Skip</router-link>
                      <button type="submit" class="btn font-weight-medium rounded-pill text-uppercase">Save</button>
                    </div>
                  </form>
                </div>
                <!--  -->
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
    firstname: '',
    lastname: '',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    geoloc: {
      lat: '',
      lng: '',
    },
  }),
  computed: {
    ...mapGetters(['loading', 'error', 'user', 'language'])
  },
  watch: {
    user (value) {
      if (value != null && value != undefined) {
        this.firstname = value.firstname ? value.firstname : '';
        this.lastname = value.lastname ? value.lastname : '';
        this.imageUrl = value.avatar ? value.avatar : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
        this.image = value.avatar ? value.avatar : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
      }
    }
  },
  methods: {
    onPhotoPicked(e) {
      const files = e.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        // return this.error = 'Invalid file. Please, try again...'
        return this.language == 'fr' ? this.error = "Image invalide. Veuillez réessayer..." : this.error = 'Invalid image. Please, try again...'
      }
      const fileReader = new FileReader()
      fileReader.readAsDataURL(files[0])
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      this.image = files[0]
    },
    onPickPhoto () {
      this.$refs.photoInput.click()
    },
    onSaveProfile() {
      const data = {
        firstname: this.firstname,
        lastname: this.lastname,
        image: this.image,
        geoloc: {
          lat: this.geoloc.lat,
          lng: this.geoloc.lng,
        }
      }
      this.$store.dispatch('updateUser', data)
      this.$router.push('/')
    },
  },
  created() {
    // this.getCurrentPosition()
    if (this.user != null && this.user != undefined) {
      this.firstname = this.user.firstname ? this.user.firstname : '';
      this.lastname = this.user.lastname ? this.user.lastname : '';
      this.imageUrl = this.user.avatar ? this.user.avatar : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
      this.image = this.user.avatar ? this.user.avatar : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
