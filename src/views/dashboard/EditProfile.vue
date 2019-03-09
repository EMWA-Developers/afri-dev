<template lang="html">

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    copyUrl: '',
    imageUrl: '',
    form: {
      firstName: '',
      lastName: '',
      avatar: '',
      image: null,
      description: '',
      company: '',
      website: '',
      twitter: '',
      linkedin: '',
      facebook: '',
      youtube: '',
      address: {
        address: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      },
      geolocation: {
        lat: '',
        lng: '',
      },
      account: '',
      paymentPlan: '',
    }
  }),
  computed: {
    ...mapGetters(['loading', 'error', 'user', 'language'])
  },
  watch: {
    imageUrl(value) {
      if (value) {
        return this.copyUrl = ''
      }
      return
    },
    copyUrl(value) {
      if (value) {
        return this.form.image = value
      }
      return
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
      this.form.image = files[0]
    },
    onPickPhoto () {
      this.$refs.photoInput.click()
    },
    onSaveProfile() {
      this.$store.dispatch('updateUser', this.form)
      this.$router.push('/')
    },
  },
  created() {
    this.imageUrl = this.user.avatar
    this.form = {
      firstName: this.user.firstName ? this.user.firstName : '',
      lastName: this.user.lastName ? this.user.lastName : '',
      avatar: this.user.avatar ? this.user.avatar : '',
      description: this.user.description ? this.user.description : '',
      company: this.user.company ? this.user.company : '',
      website: this.user.website ? this.user.website : '',
      twitter: this.user.twitter ? this.user.twitter : '',
      linkedin: this.user.linkedin ? this.user.linkedin : '',
      facebook: this.user.facebook ? this.user.facebook : '',
      youtube: this.user.youtube ? this.user.youtube : '',
      address: {
        address: this.user.address.address ? this.user.address.address : '',
        city: this.user.address.city ? this.user.address.city : '',
        state: this.user.address.state ? this.user.address.state : '',
        zip: this.user.address.zip ? this.user.address.zip : '',
        country: this.user.address.country ? this.user.address.country : '',
      },
      account: this.user.account ? this.user.account : '',
      paymentPlan: this.user.paymentPlan ? this.user.paymentPlan : '',
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
