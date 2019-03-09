import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import _ from 'lodash'
// Firebase
import firebase from 'firebase/app'
require('firebase/firestore')
require('lazysizes')
// Pace.js
require('./js/pace.min.js')
// Algolia Search Engine
import InstantSearch from 'vue-instantsearch';
// Components
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import Chat from '@/views/chats/Chat'
import PostCard from '@/components/cards/PostCard'
import ArticleCard from '@/components/cards/ArticleCard'
import LawyerCard from '@/components/cards/LawyerCard'
// Extracts
import UserComment from '@/components/extracts/UserComment'
/// Modal
import NoUserModal from '@/components/modal/NoUser'
import ArticlePostModal from '@/components/modal/ArticlePost'
// Tiles
import MainTile from '@/components/tiles/MainTile';
import SidebarTile from '@/components/tiles/SidebarTile';
import ContainerTile from '@/components/tiles/ContainerTile';
// Filter
import DateFilter from '@/filters/date'

Vue.use(InstantSearch);
//
Vue.component('Header', Header);
Vue.component('Footer', Footer);
Vue.component('Sidebar', Sidebar);
Vue.component('Chat', Chat);
Vue.component('PostCard', PostCard)
Vue.component('ArticleCard', ArticleCard)
Vue.component('LawyerCard', LawyerCard)
/// Modal
Vue.component('NoUserModal', NoUserModal);
Vue.component('ArticlePostModal', ArticlePostModal);
/// Tiles
Vue.component('MainTile', MainTile);
Vue.component('SidebarTile', SidebarTile);
Vue.component('ContainerTile', ContainerTile);
/// Extracts
Vue.component('UserComment', UserComment);
// Filter
Vue.filter('date', DateFilter)

// Firebase Settings
firebase.initializeApp({
  apiKey: "AIzaSyA53hjsmOgObk3xRynXMPoq6gbvWSIyP7Y",
  authDomain: "african-law-experts.firebaseapp.com",
  databaseURL: "https://african-law-experts.firebaseio.com",
  projectId: "african-law-experts",
  storageBucket: "african-law-experts.appspot.com",
  messagingSenderId: "128149020364"
})

export const db = firebase.firestore()
const settings = {timestampsInSnapshots: true};
db.settings(settings);
db.enablePersistence()

window._ = _

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    (this.$store.getters.language == null || this.$store.getters.language == undefined) ? this.$store.dispatch('changeLanguage', 'fr') : this.$store.dispatch('changeLanguage', this.$store.getters.language)

    this.$store.dispatch('getLanguage')

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignin', user)
        this.$store.dispatch('getUser', user)
      }
    });
  },
  render: h => h(App)
}).$mount('#app')
