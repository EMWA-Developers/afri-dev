<template lang="html">
  <div class="home">
    <!-- Header -->
    <Header />
    <!--  -->
    <transition name="slide" appear mode="out-in">
      <main role="main" class="pb-5">
        <div class="widget--listing-1 w3-padding-48">
          <div class="px-md-5 container">
            <h1 class="my-0 d-flex flex-row align-items-center">
              <strong>My account</strong>
            </h1>
          </div>
        </div>
        <div class="container my-3">
          <ul class="nav nav-tabs nav-justified px-0 widget--nav-tabs text-uppercase font-weight-bold">
              <li class="nav-item">
                  <a class="nav-link active" id="general-tab" data-toggle="tab" role="tab" aria-controls="general"
                      aria-selected="true" href="#general">General</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" id="publications-tab" data-toggle="tab" role="tab" aria-controls="publications"
                      aria-selected="true" href="#publications">Publications</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" id="invoices-tab" data-toggle="tab" role="tab" aria-controls="invoices"
                      aria-selected="true" href="#invoices">Invoices</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" id="campaigns-tab" data-toggle="tab" role="tab" aria-controls="campaigns"
                      aria-selected="true" href="#campaigns">Campaigns</a>
              </li>
          </ul>

          <div class="tab-content" id="myTabContent">
            <!-- General -->
            <div class="tab-pane fade show active" id="general" role="tabpanel" aria-labelledby="general-tab">
              <div class="px-3 pt-5">
                <div class="row">
                  <div class="col-12 col-md-6">
                    <form @submit.prevent="onSubmitGeneral" class="card rounded-0 border-0 shadow-lg mb-4">
                      <div class="card-header pb-0 w3-white border-0">
                        <h6 class="my-0">Informations générales</h6>
                      </div>
                      <div class="card-body">
                        <div class="form-group">
                          <label for="firstname">Gender</label>
                          <select class="custom-select w3-light-grey border-0" name="" v-model="gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="firstname">First name</label>
                          <input type="text" class="form-control border-0 w3-light-grey" placeholder="First name" id="firstname" v-model.trim="firstname">
                        </div>
                        <div class="form-group">
                          <label for="lastname">Last name</label>
                          <input type="text" class="form-control border-0 w3-light-grey" placeholder="First name" id="lastname" v-model.trim="lastname">
                        </div>
                      </div>
                      <div class="card-footer w3-white border-0 px-4 pt-0">
                        <button type="submit" class="btn btn-block w3-light-grey rounded-pill font-weight-medium">Valider</button>
                      </div>
                    </form>
                    <!--  -->
                    <form @submit.prevent="onSubmitProfil" class="card rounded-0 border-0 shadow-lg mb-4">
                      <div class="card-header pb-0 w3-white border-0">
                        <h6 class="my-0">Photo de profil</h6>
                      </div>
                      <div class="card-body text-center">
                        <img :src="imageUrl" alt="" class="rounded-circle" style="height:70px;width:70px">
                        <p class="mt-3">
                          <button type="button" class="btn w3-light-grey rounded-pill" @click="onPickPhoto">Modifier</button>
                          <input type="file"
                          style="display: none;"
                          ref="photoInput"
                          accept="image/*"
                          @change="onPhotoPicked"
                          required>
                        </p>
                      </div>
                      <div class="card-footer w3-white border-0 px-4 pt-0">
                        <button type="submit" class="btn btn-block w3-light-grey rounded-pill font-weight-medium">Valider</button>
                      </div>
                    </form>
                  </div>

                  <div class="col-12 col-md-6">
                    <form @submit.prevent="onSubmitProfessional" class="card rounded-0 border-0 shadow-lg mb-4">
                      <div class="card-header pb-0 w3-white border-0">
                        <h6 class="my-0">Informations professionnelles</h6>
                      </div>
                      <div class="card-body">
                        <div class="form-group">
                          <label for="company">Company name</label>
                          <input type="text" class="form-control border-0 w3-light-grey" placeholder="Company name" id="company" v-model.trim="company">
                        </div>
                        <div class="form-group">
                          <label for="phone">Phone number</label>
                          <input type="text" class="form-control border-0 w3-light-grey" placeholder="Phone number" id="phone" v-model.trim="phone">
                        </div>
                        <div class="form-group">
                          <label for="email">Email address</label>
                          <input type="text" class="form-control border-0 w3-light-grey" placeholder="Email address" id="email" v-model.trim="email">
                        </div>
                        <div class="form-group">
                          <label for="website">Website or Blog</label>
                          <input type="text" class="form-control border-0 w3-light-grey" placeholder="Website or Blog" id="website" v-model.trim="website">
                        </div>
                      </div>
                      <div class="card-footer w3-white border-0 px-4 pt-0">
                        <button type="submit" class="btn btn-block w3-light-grey rounded-pill font-weight-medium">Valider</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <!-- Publications -->
            <div class="tab-pane fade" id="publications" role="tabpanel" aria-labelledby="publications-tab">
              <div class="px-3 pt-3">

              </div>
            </div>
            <!-- Invoices -->
            <div class="tab-pane fade" id="invoices" role="tabpanel" aria-labelledby="invoices-tab">
              <div class="px-3 pt-3">

              </div>
            </div>
            <!-- Campaigns -->
            <div class="tab-pane fade" id="campaigns" role="tabpanel" aria-labelledby="campaigns-tab">
              <div class="px-3 pt-3">

              </div>
            </div>
          </div>
        </div>
      </main>
    </transition>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data: () => ({
    firstname: '',
    lastname: '',
    imageUrl: '',
    image: null,
    company: '',
    email: '',
    gender: '',
    phone: '',
    website: '',
  }),
  computed: {
    ...mapGetters(['user', 'loading', 'error']),
  },
  watch: {
    user (value) {
      if (value != null && value != undefined) {
        this.firstname = value.firstname ? value.firstname : '';
        this.lastname = value.lastname ? value.lastname : '';
        this.imageUrl = value.avatar ? value.avatar : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
        this.image = value.avatar ? value.avatar : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
        this.gender = value.gender ? value.gender : '';
        this.company = value.company ? value.company : '';
        this.phone = value.phone ? value.phone : '';
        this.email = value.email ? value.email : '';
        this.website = value.website ? value.website : '';
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
    onSubmitGeneral() {
      const data = {
        gender: this.gender,
        firstname: this.firstname,
        lastname: this.lastname
      }
      this.$store.dispatch('updateGeneral', data);
    },
    onSubmitProfil() {
      console.log('clicked');
      this.$store.dispatch('updateAvatar', this.image)
    },
    onSubmitProfessional() {
      const data = {
        company: this.company,
        phone: this.phone,
        email: this.email,
        website: this.website
      }
      this.$store.dispatch('updateProfessional', data)
    },
  },
  created() {
    // this.getCurrentPosition()
    if (this.user != null && this.user != undefined) {
      this.firstname = this.user.firstname ? this.user.firstname : '';
      this.lastname = this.user.lastname ? this.user.lastname : '';
      this.imageUrl = this.user.avatar ? this.user.avatar : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
      this.image = this.user.avatar ? this.user.avatar : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
      this.gender = this.user.gender ? this.user.gender : '';
      this.company = this.user.company ? this.user.company : '';
      this.phone = this.user.phone ? this.user.phone : '';
      this.email = this.user.email ? this.user.email : '';
      this.website = this.user.website ? this.user.website : '';
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
