<template>
  <div class="home">
    <Header />
    <!--  -->
    <main role="main" class="row no-gutters">
      <SidebarTile>
        <Sidebar />
      </SidebarTile>
      <MainTile>
        <div class="row pt-0">
          <div class="col-12 col-md-8 w3-padding-32 order-2 order-md-1 pt-0">
            <div class="widget--listing-1 w3-padding-48 px-md-5 w3-container">
              <!-- Filter -->
              <div class="card w3-white widget--borderless rounded-0">

                <div class="card-header border-bottom-0 pb-0 w3-white d-flex flex-row flex-wrap align-items-center justify-content-between">
                  <h5 class="my-0">Filter by:</h5>
                  <button type="button" class="btn w3-light-grey rounded-0 d-flex flex-row align-items-center">
                    <i class="material-icons w3-large mr-1" aria-hidden="true">filter_list</i>
                    Filter</button>
                  </div>

                <div class="card-body py-3">
                    <div class="w3-row">
                      <div class="w3-half pr-1">
                        <button type="button" class="btn w3-light-grey font-size-14 rounded-pill d-flex flex-row align-items-center mb-2 btn-block">
                          <i class="material-icons mr-2 w3-large" aria-hidden="true">my_location</i>
                          Around me
                        </button>
                        <div class="input-group py-0 w3-light-grey rounded-pill">
                          <input type="text" name="" value="" class="form-control widget--input-search border-0 rounded-pill w3-light-grey font-size-14" placeholder="Lawyer or law firm">
                          <div class="input-group-prepend w3-transparent border-0 rounded-pill">
                            <div class="input-group-text w3-transparent border-0"><i class="icon-badge"></i></div>
                          </div>
                        </div>
                      </div>
                      <div class="w3-half pl-1">
                        <div class="input-group py-0 w3-light-grey rounded-pill mb-2">
                          <input type="text" id="location" class="form-control widget--input-search border-0 text-truncate rounded-pill w3-light-grey font-size-14" placeholder="Location">
                        </div>
                        <div class="input-group py-0 w3-light-grey rounded-pill">
                          <input type="text" name="" value="" class="form-control widget--input-search border-0 rounded-pill w3-light-grey font-size-14" placeholder="Area of Practice">
                          <div class="input-group-prepend w3-transparent border-0 rounded-pill">
                            <div class="input-group-text w3-transparent border-0"><i class="icon-layers"></i></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            <div style="padding-right:40px!important;padding-left:20px!important;">
            <!-- Found -->
            <div class="my-3 text-center">
              <h6>36 results found</h6>
            </div>
            <!-- Results -->
            <div class="card border-0 rounded-0 w3-shadow mb-4">
              <div class="card-body p-3 media">
                <div class="d-flex flex-column justify-content-center">
                  <img src="https://lh3.googleusercontent.com/-3cB6E0IJd-o/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcn4x9wy2Y0xvzUaOtAl-rnrLTxIw/mo/photo.jpg?sz=46"
                  class="mr-3 rounded-circle" alt="..." style="height:64px;width: 64px;">
                  <button class="btn btn-light btn-sm mt-3">Message</button>
                </div>
                <div class="media-body pl-3">
                  <p class="mb-1">
                    <span class="badge badge-warning font-weight-medium">LAW FIRM</span>
                    <span class="badge badge-warning font-weight-medium ml-2">
                      <i class="icon-info mr-1 font-weight-bold font-weight-medium" aria-hidden="true"></i>
                      SPONSORED
                    </span>
                  </p>
                  <a href="#">
                    <h5 class="mt-0 mb-1">Emery Mukendi Wafwana & Associates</h5>
                  </a>
                  <h6 class="mb-1">Legal assurance, natural resources, infrastructure, commerce & industry</h6>
                  <p class="d-flex flex-row align-items-center my-1">
                    <span class="widget--rate">
                      <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                    </span>
                    <span class="widget--rate">
                      <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                    </span>
                    <span class="widget--rate">
                      <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                    </span>
                    <span class="widget--rate">
                      <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                    </span>
                    <span class="widget--rate">
                      <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                    </span>
                    (50)
                  </p>
                  <div class="d-flex flex-row align-items-center my-1">
                    <i class="icon-clock mr-2" aria-hidden="trie"></i>Open: <span class="font-weight-medium">09h - 18h</span>
                  </div>
                  <div class="pt-2 text-black-50">
                    <i class="icon-location-pin mr-1" aria-hidden="true"></i>321 Mannathan, New York, USA
                  </div>
                </div>
              </div>
            </div>
            <div class="card border-0 rounded-0 w3-shadow mb-4">
              <div class="card-body p-3 media">
                <div class="d-flex flex-column justify-content-center">
                  <img src="https://lh3.googleusercontent.com/-3cB6E0IJd-o/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcn4x9wy2Y0xvzUaOtAl-rnrLTxIw/mo/photo.jpg?sz=46"
                  class="mr-3 rounded-circle" alt="..." style="height:64px;width: 64px;">
                  <button class="btn btn-light btn-sm mt-3">Message</button>
                </div>
                <div class="media-body pl-3">
                  <p class="mb-1">
                    <span class="badge badge-warning font-weight-medium">LAW FIRM</span>
                    <span class="badge badge-warning font-weight-medium ml-2">
                      <i class="icon-info mr-1 font-weight-bold font-weight-medium" aria-hidden="true"></i>
                      SPONSORED
                    </span>
                  </p>
                  <a href="#">
                    <h5 class="mt-0 mb-1">Emery Mukendi Wafwana & Associates</h5>
                  </a>
                  <h6 class="mb-1">Legal assurance, natural resources, infrastructure, commerce & industry</h6>
                  <p class="d-flex flex-row align-items-center my-1">
                    <span class="widget--rate">
                      <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                    </span>
                    <span class="widget--rate">
                      <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                    </span>
                    <span class="widget--rate">
                      <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                    </span>
                    <span class="widget--rate">
                      <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                    </span>
                    <span class="widget--rate">
                      <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                    </span>
                    (50)
                  </p>
                  <div class="d-flex flex-row align-items-center my-1">
                    <i class="icon-clock mr-2" aria-hidden="trie"></i>Open: <span class="font-weight-medium">09h - 18h</span>
                  </div>
                  <div class="pt-2 text-black-50">
                    <i class="icon-location-pin mr-1" aria-hidden="true"></i>321 Mannathan, New York, USA
                  </div>
                </div>
              </div>
            </div>
            <div class="card border-0 rounded-0 w3-shadow mb-4">
              <div class="card-body p-3 media">
                <div class="d-flex flex-column justify-content-center">
                  <img src="https://lh3.googleusercontent.com/-3cB6E0IJd-o/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcn4x9wy2Y0xvzUaOtAl-rnrLTxIw/mo/photo.jpg?sz=46"
                  class="mr-3 rounded-circle" alt="..." style="height:64px;width: 64px;">
                  <button class="btn btn-light btn-sm mt-3">Message</button>
                </div>
                <div class="media-body pl-3">

                  <a href="#">
                    <h5 class="mt-0 mb-1">
                      <i class="icon-badge" aria-hidden="true"></i> Trésor Ilunga
                    </h5>
                  </a>
                  <h6 class="mb-1">Legal assurance, natural resources, infrastructure, commerce & industry</h6>
                  <p class="mb-1 mt-0"><i class="icon-home mr-1" aria-hidden="true"></i> Emery Mukendi Wafwana &
                    Associates</p>
                    <p class="d-flex flex-row align-items-center my-1">
                      <span class="widget--rate">
                        <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                      </span>
                      <span class="widget--rate">
                        <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                      </span>
                      <span class="widget--rate">
                        <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                      </span>
                      <span class="widget--rate">
                        <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                      </span>
                      <span class="widget--rate">
                        <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                      </span>
                      (50)
                    </p>
                    <div class="d-flex flex-row align-items-center my-1">
                      <i class="icon-clock mr-2" aria-hidden="trie"></i>Open: <span class="font-weight-medium">09h - 18h</span>
                    </div>
                    <div class="pt-2 text-black-50">
                      <i class="icon-location-pin mr-1" aria-hidden="true"></i>321 Mannathan, New York, USA
                    </div>
                  </div>
                </div>
              </div>
              <div class="card border-0 rounded-0 w3-shadow mb-4">
                <div class="card-body p-3 media">
                  <div class="d-flex flex-column justify-content-center">
                    <img src="https://lh3.googleusercontent.com/-3cB6E0IJd-o/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcn4x9wy2Y0xvzUaOtAl-rnrLTxIw/mo/photo.jpg?sz=46"
                    class="mr-3 rounded-circle" alt="..." style="height:64px;width: 64px;">
                    <button class="btn btn-light btn-sm mt-3">Message</button>
                  </div>
                  <div class="media-body pl-3">
                    <p class="mb-1">
                      <span class="badge badge-warning font-weight-medium">LAW FIRM</span>
                    </p>
                    <a href="#">
                      <h5 class="mt-0 mb-1">Emery Mukendi Wafwana & Associates</h5>
                    </a>
                    <h6 class="mb-1">Legal assurance, natural resources, infrastructure, commerce & industry</h6>
                    <p class="d-flex flex-row align-items-center my-1">
                      <span class="widget--rate">
                        <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                      </span>
                      <span class="widget--rate">
                        <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                      </span>
                      <span class="widget--rate">
                        <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                      </span>
                      <span class="widget--rate">
                        <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                      </span>
                      <span class="widget--rate">
                        <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                      </span>
                      (50)
                    </p>
                    <div class="d-flex flex-row align-items-center my-1">
                      <i class="icon-clock mr-2" aria-hidden="trie"></i>Open: <span class="font-weight-medium">09h - 18h</span>
                    </div>
                    <div class="pt-2 text-black-50">
                      <i class="icon-location-pin mr-1" aria-hidden="true"></i>321 Mannathan, New York, USA
                    </div>
                  </div>
                </div>
              </div>
              <div class="card border-0 rounded-0 w3-shadow mb-4">
                <div class="card-body p-3 media">
                  <div class="d-flex flex-column justify-content-center">
                    <img src="https://lh3.googleusercontent.com/-3cB6E0IJd-o/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcn4x9wy2Y0xvzUaOtAl-rnrLTxIw/mo/photo.jpg?sz=46"
                    class="mr-3 rounded-circle" alt="..." style="height:64px;width: 64px;">
                    <button class="btn btn-light btn-sm mt-3">Message</button>
                  </div>
                  <div class="media-body pl-3">
                    <p class="mb-1">
                      <span class="badge badge-warning font-weight-medium">LAW FIRM</span>
                      <span class="badge badge-warning font-weight-medium ml-2">
                        <i class="icon-info mr-1 font-weight-bold font-weight-medium" aria-hidden="true"></i>
                        SPONSORED
                      </span>
                    </p>
                    <a href="#">
                      <h5 class="mt-0 mb-1">Emery Mukendi Wafwana & Associates</h5>
                    </a>
                    <h6 class="mb-1">Legal assurance, natural resources, infrastructure, commerce & industry</h6>
                    <p class="d-flex flex-row align-items-center my-1">
                      <span class="widget--rate">
                        <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                      </span>
                      <span class="widget--rate">
                        <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                      </span>
                      <span class="widget--rate">
                        <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                      </span>
                      <span class="widget--rate">
                        <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                      </span>
                      <span class="widget--rate">
                        <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                      </span>
                      (50)
                    </p>
                    <div class="d-flex flex-row align-items-center my-1">
                      <i class="icon-clock mr-2" aria-hidden="trie"></i>Open: <span class="font-weight-medium">09h - 18h</span>
                    </div>
                    <div class="pt-2 text-black-50">
                      <i class="icon-location-pin mr-1" aria-hidden="true"></i>321 Mannathan, New York, USA
                    </div>
                  </div>
                </div>
              </div>
              <div class="card border-0 rounded-0 w3-shadow mb-4">
                <div class="card-body p-3 media">
                  <div class="d-flex flex-column justify-content-center">
                    <img src="https://lh3.googleusercontent.com/-3cB6E0IJd-o/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcn4x9wy2Y0xvzUaOtAl-rnrLTxIw/mo/photo.jpg?sz=46"
                    class="mr-3 rounded-circle" alt="..." style="height:64px;width: 64px;">
                    <button class="btn btn-light btn-sm mt-3">Message</button>
                  </div>
                  <div class="media-body pl-3">
                    <p class="mb-1">
                      <span class="badge badge-warning font-weight-medium">LAW FIRM</span>
                      <span class="badge badge-warning font-weight-medium ml-2">
                        <i class="icon-info mr-1 font-weight-bold font-weight-medium" aria-hidden="true"></i>
                        SPONSORED
                      </span>
                    </p>
                    <a href="#">
                      <h5 class="mt-0 mb-1">Emery Mukendi Wafwana & Associates</h5>
                    </a>
                    <h6 class="mb-1">Legal assurance, natural resources, infrastructure, commerce & industry</h6>
                    <p class="d-flex flex-row align-items-center my-1">
                      <span class="widget--rate">
                        <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                      </span>
                      <span class="widget--rate">
                        <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                      </span>
                      <span class="widget--rate">
                        <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                      </span>
                      <span class="widget--rate">
                        <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                      </span>
                      <span class="widget--rate">
                        <i class="material-icons w3-large mr-1" aria-hidden="true">star</i>
                      </span>
                      (50)
                    </p>
                    <div class="d-flex flex-row align-items-center my-1">
                      <i class="icon-clock mr-2" aria-hidden="trie"></i>Open: <span class="font-weight-medium">09h - 18h</span>
                    </div>
                    <div class="pt-2 text-black-50">
                      <i class="icon-location-pin mr-1" aria-hidden="true"></i>321 Mannathan, New York, USA
                    </div>
                  </div>
                </div>
              </div>
              <!-- Pagination -->
              <nav aria-label="pagination" class="mt-5 d-flex flex-row justify-content-center">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item active text-white"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item"><a class="page-link" href="#">4</a></li>
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <!-- Map -->
          <div class="col-12 col-md-4 order-1 order-md-2 flex-fill widget--map">
            <div id="map" style="right:-15px;top:60px" class="w3-shadow-small"></div>
          </div>
        </div>
      </MainTile>
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
    // Create Post
    imageURLs: [],
    form: {
      note: '',
      images: []
    }
  }),
  computed: {
    ...mapGetters(['loading', 'user', 'error']),
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
    onPublishPost() {

    }
  },
  mounted() {
    // Map
    var map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png', {
            // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([51.5, -0.09]).addTo(map)
            // .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            // .openPopup();
  },
}
</script>
