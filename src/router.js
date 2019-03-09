import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/Home.vue'
import AuthGuard from './authGuard'
import ListingGuard from './listingGuard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      props: route => ({
        query: route.query.q
      }),
      component: () => import('./views/home/Search.vue')
    },
    {
      path: '/about',
      component: () => import('./views/contact/About.vue')
    },
    // Profile
    {
      path: '/lawyer/:id',
      component: () => import('./views/profile/Profile.vue'),
      props: true
    },
    // Articles
    {
      path: '/article/:id',
      component: () => import('./views/articles/Article.vue'),
      props: true
    },
    {
      path: '/legal-articles',
      component: () => import('./views/articles/LegalArticles.vue')
    },
    // Messaging
    {
      path: '/messaging',
      component: () => import('./views/chats/Chats.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/message/:id',
      props: true,
      component: () => import('./views/chats/Chat.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/chat/:id',
      props: true,
      component: () => import('./views/chats/SingleChat.vue'),
      beforeEnter: AuthGuard
    },
    // Available Lawyers
    {
      path: '/available-lawyers',
      component: () => import('./views/available/Available.vue')
    },
    // Discover
    {
      path: '/discover',
      component: () => import('./views/discover/Discover.vue')
    },
    // Area of Practices
    {
      path: '/area-of-practices',
      component: () => import('./views/practices/AreaOfPractices.vue')
    },
    // Feedback
    {
      path: '/send-feedback',
      component: () => import('./views/feedback/SendFeedback.vue')
    },
    // Help
    {
      path: '/help',
      component: () => import('./views/help/Help.vue')
    },
    // Settings
    {
      path: '/settings',
      component: () => import('./views/settings/Settings.vue'),
      beforeEnter: AuthGuard
    },
    // Profile
    {
      path: '/account',
      component: () => import('./views/account/Account.vue'),
      beforeEnter: AuthGuard
    },
    // Awards
    {
      path: '/awards',
      component: () => import('./views/lawyers/TopLawyers.vue')
    },
    // Add listing
    {
      path: '/list-practice',
      component: () => import('./views/login/Listing.vue')
    },
    {
      path: '/listing-management',
      component: () => import('./views/listing/ListingManagement.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/update-office/:id',
      props: true,
      component: () => import('./views/listing/UpdateOffice.vue'),
      beforeEnter: AuthGuard
    },
    // Add Office to the Listing
    {
      path: '/add-office',
      component: () => import('./views/listing/AddOffice.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/update-profile/:id',
      props: true,
      component: () => import('./views/listing/UpdateProfile.vue'),
      beforeEnter: AuthGuard
    },
    // Add Profile to the Listing
    {
      path: '/add-profile/',
      component: () => import('./views/listing/AddProfile.vue'),
      beforeEnter: AuthGuard
    },
    // login && sign up
    {
      path: '/login',
      component: () => import('./views/login/Login.vue')
    },
    {
      path: '/add-payment',
      component: () => import('./views/login/AddPayment.vue'),
      props: route => ({
        plan: route.query.plan
      }),
      beforeEnter: AuthGuard,
    },
    {
      path: '/sign-up-silver',
      component: () => import('./views/login/SilverAccount.vue'),
      beforeEnter: ListingGuard
    },
    {
      path: '/sign-up-electrum',
      component: () => import('./views/login/ElectrumAccount.vue'),
      beforeEnter: ListingGuard
    },
    {
      path: '/sign-up-gold',
      component: () => import('./views/login/GoldAccount.vue'),
      beforeEnter: ListingGuard
    },
    {
      path: '/sign-up',
      component: () => import('./views/login/Signup.vue')
    },
    {
      path: '/edit-profile',
      component: () => import('./views/login/EditProfile.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '**',
      redirect: '/'
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
