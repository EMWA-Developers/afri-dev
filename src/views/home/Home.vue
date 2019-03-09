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
          <div class="w3-white widget--home-find widget--shadow-small w3-padding-48 px-5">
            <ContainerTile>
              <!-- Header -->
              <div class="my-5">
                <h1 class="w3-xxxlarge m-0"><strong>Find African Law Experts <br>anywhere in the world</strong></h1>
              </div>
              <!-- Search -->
              <div class="row no-gutters">
                <div class="col-12 col-md-10">
                  <div class="row no-gutters w3-light-grey rounded-pill widget--borderless">
                    <div class="col-12 col-md-4 border-right">
                      <div class="input-group p-1">
                        <input type="text" name="" value="" class="form-control border-0 rounded-pill w3-light-grey font-size-14" placeholder="Lawyer or law firm">
                        <div class="input-group-prepend w3-transparent border-0 rounded-pill">
                          <div class="input-group-text w3-transparent border-0"><i class="icon-badge"></i></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-4 border-right">
                      <div class="input-group p-1">
                        <input type="text" id="location" class="form-control border-0 text-truncate rounded-pill w3-light-grey font-size-14" placeholder="Location">
                      </div>
                    </div>
                    <div class="col-12 col-md-4">
                      <div class="input-group p-1">
                        <input type="text" list="areaOfPractices" value="" class="form-control border-0 rounded-pill w3-light-grey font-size-14" placeholder="Area of Practice">
                        <datalist id="areaOfPractices">
                          <span v-for="practice in areaOfPractices" :key="practice.category">
                            <option v-for="area in practice.practices" :key="area" :value="area"></option>
                          </span>
                        </datalist>
                        <div class="input-group-prepend w3-transparent border-0 rounded-pill">
                          <div class="input-group-text w3-transparent border-0"><i class="icon-layers"></i></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-2 d-flex flex-row justify-content-center">
                <button class="btn widget--light-black rounded-pill text-white d-flex flex-row justify-content-center align-items-center font-weight-medium px-3 widget--shadow" @click="onSearch">
                  <i class="fa icon-magnifier font-weight-bold mr-2" aria-hidden="true"></i> Search
                </button>
              </div>
            </div>
            </ContainerTile>
            <!-- Advanced search parameters -->
            <!-- <div class="mt-3 mb-5">
              <div class="d-flex flex-row flex-wrap align-items-center">
                <i class="icon-directions mr-2" aria-hidden="true"></i>
                Advanced search :
                <a href="#" class="btn w3-light-grey btn-sm rounded-pill mx-1">
                  Around me
                </a>
                <a href="#" class="btn w3-light-grey btn-sm rounded-pill mx-1">By location</a>
                <a href="#" class="btn w3-light-grey btn-sm rounded-pill mx-1">By practice areas</a>
              </div>
            </div> -->
            <div class="my-3 text-center">
              <i class="fa fa-angle-double-down fa-2x" aria-hidden="true"></i>
            </div>
          </div>
          <ContainerTile class="w3-padding-48">
            <h2 class="d-flex flex-row align-items-center mb-5">
              <i class="material-icons mr-2" style="font-size:30px;" aria-hidden="true">explore</i>
              <strong>Discover</strong>
            </h2>
            <div class="d-flex flex-row align-items-center justify-content-center w3-padding-32" v-if="loading">
              <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <div class="row no-gutters" v-if="posts.length">
              <!--  -->
              <div class="col-12 col-md-6 pr-md-3">
                <PostCard :post="post" v-for="(post, i) in posts" :key="post.id" v-if="(i+1) % 2" />
              </div>
              <!--  -->
              <div class="col-12 col-md-6 pl-md-3">
                <PostCard :post="post" v-for="(post, i) in posts" :key="post.id" v-if="(i+2) % 2" />
              </div>
            </div>
          </ContainerTile>
        </MainTile>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createFromAlgoliaCredentials } from 'vue-instantsearch'

export default {
  name: 'home',
  data: () => ({
    location: '',
    page: 1,
    searching: '',
    searchStore: createFromAlgoliaCredentials('latency', '3d9875e51fbd20c7754e65422f7ce5e1'),
  }),
  computed: {
    ...mapGetters(['loading', 'user', 'error', 'areaOfPractices', 'posts', 'isOpen']),
  },
  methods: {
    onPageChange(page) {
      window.scrollTo(0,0);
    },
    onSearch () {
      return this.$router.push({
        name: 'search',
        query: { q: this.searching }
      })
    },
  },
  mounted() {
    var placesAutocomplete = places({
        appId: 'pl1JBGLSZ0E3',
        apiKey: 'e0fa3416080782e74c75e6da5a1c2df9',
        container: document.querySelector('#location'),
        templates: {
            value: function (suggestion) {
                return suggestion.name;
            }
        }
    });
    placesAutocomplete.on('change', (e) => {
      this.location = e.suggestion.name;
    });
  },
  created() {
    if (!this.posts.length) {
      this.$store.dispatch('getAllPosts')
    }
  }
}
</script>
