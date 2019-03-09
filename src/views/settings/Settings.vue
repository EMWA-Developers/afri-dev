<template>
  <div class="home">
    <!-- Header -->
    <Header />
    <!--  -->
    <main role="main" class="row no-gutters">
      <SidebarTile>
        <Sidebar />
      </SidebarTile>
      <transition name="slide" appear mode="out-in">
        <MainTile>
          <div class="widget--listing-1 w3-padding-48 px-md-5 w3-container">
            <h1 class="my-0 d-flex flex-row align-items-center">
              <i class="material-icons w3-xxlarge mr-2" aria-hidden="true">settings</i>
              <strong>Settings</strong>
            </h1>
          </div>
          <div class="w3-padding-48 px-5">

          </div>
        </MainTile>
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
