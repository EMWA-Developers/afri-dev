<template>
  <div class="home">
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
            <h1 class="my-0 d-flex flex-row align-items-center">
              <i class="material-icons w3-xxlarge mr-2" aria-hidden="true">help</i>
              <strong>Help</strong>
            </h1>
          </div>
          <div class="w3-padding-48 px-5">

          </div>
        </div>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'legal-articles',
  computed: {
    ...mapGetters(['areaOfPractices'])
  }
}
</script>
