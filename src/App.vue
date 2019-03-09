<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import firebase from 'firebase'
import {mapGetters} from 'vuex'

export default {
  name: 'app',
  data: () => ({
    // connectivity: false,
  }),
  computed: {
    ...mapGetters(['user']),
    userIsAuthenticated() {
      return this.user != null && this.user != undefined ? true : false
    },
    // professionalAccount() {
    //   if (this.userIsAuthenticated) {
    //     return this.user.account == "professional" ? true : false
    //   }
    //   return false
    // }
  },
  watch: {
    user (value) {
      if (value != null && value != undefined) {
        this.$store.dispatch('setStatus')
        let geoloc = JSON.parse(window.localStorage.getItem('geoloc'))
        if (geoloc != null) {
          return this.$store.dispatch('updateUserPosition', geoloc)
        }
      }
    },
  },
  methods: {
    updateOnAway () {
      document.onvisibilitychange = (e) => {
        if (document.visibilityState === 'hidden') {
          this.$store.dispatch('setPresence', 'away')
        } else {
          this.$store.dispatch('setPresence', 'online')
        }
      }
    },
    async getLocation() {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition((position) => {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          //
          const geoloc = {lat, lng};
          window.localStorage.setItem('geoloc', JSON.stringify(geoloc))
        }, (error) => {
          console.error(error);
        })
        let geoloc = JSON.parse(window.localStorage.getItem('geoloc'))
      }
    }
  },
  created() {
    this.getLocation();
  }
}
</script>

<style>
@import '../static/icons/css/simple-line-icons.css';
@import './styles/pace.css';
@import './styles/style.scss';
@import './styles/w3.css';
@import './styles/fonts.css';
@import './styles/leaflet.css';
#app {
  padding-top: 50px;
  font-size: 15px;
}
datalist {
  display: none;
}
.form-control, .w3-input {
  font-size: 14px;
}
.slide-enter-active {
  animation: slide-in .1s ease-out forwards;
}
.slide-leave-active {
  animation: slide-out .1s ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-20px);
    opacity: 0;
  }
}
</style>
