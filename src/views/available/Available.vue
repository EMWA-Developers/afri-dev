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
              <ContainerTile>
                <div class="widget--listing-1 w3-padding-48 px-md-5 w3-container">
                  <h1 class="my-0 d-flex flex-row align-items-center">
                    <div class="spinner-grow spinner-grow-sm mr-2 text-success" role="status"></div>
                    <strong>Available Lawyers</strong>
                  </h1>
                </div>
                <div style="padding-right:40px!important;padding-left:20px!important;">
                  <!--  -->
                  <ais-index :search-store="searchStore" index-name="status">
                    <div class="d-flex flex-row align-items-center justify-content-between">
                      <!-- Statistics -->
                      <div class="my-4 text-center">
                        <ais-stats>
                          <template slot-scope="{ totalResults, processingTime}">
                            <h6>{{totalResults}} Lawyers available found</h6>
                          </template>
                        </ais-stats>
                      </div>
                      <!-- Show -->
                      <div class="d-flex flex-row align-items-center">
                        <span class="mr-2 font-weight-medium">Show:</span>
                        <ais-results-per-page-selector :options="[20, 50, 100]" :classNames="{'ais-results-per-page-selector': 'form-control widget--show-result rounded-0 py-2'}"></ais-results-per-page-selector>
                      </div>
                    </div>
                    <!-- Results -->
                    <ais-results :results-per-page="50">
                      <template slot-scope="{ result }">
                        <LawyerCard :record="result" />
                      </template>
                    </ais-results>
                    <!-- Paginations -->
                    <nav aria-label="pagination" class="mt-5 d-flex flex-row justify-content-center">
                      <ais-pagination
                      class="pagination"
                      :classNames="{
                        'ais-pagination': 'pagination',
                        'ais-pagination__item': 'page-item',
                        'ais-pagination__item--active': 'page-item active text-white',
                        'ais-pagination__item--disabled': 'page-item disabled',
                        'ais-pagination__link': 'page-link'
                        }"
                        :padding="3"
                        v-on:page-change="onPageChange"
                        />
                    </nav>
                    <!-- No results -->
                    <ais-no-results>
                       <template slot-scope="props">
                       	No avaialable laywers found!
                       </template>
                    </ais-no-results>
                  </ais-index>
                  <!-- Results -->
                  <!-- <div v-for="user in users" :key="user.id">
                    <LawFirmCard :user="user" v-if="user.office == true" />
                    <LawyerCard :user="user" v-else />
                  </div> -->
                </div>
              </ContainerTile>
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
import {db} from '../../main'
import { mapGetters } from 'vuex'
import { createFromAlgoliaCredentials, createFromSerialized } from 'vue-instantsearch';

export default {
  name: 'home',
  data: () => ({
    algoliaRecords: [],
    availableUsers: [],
    map: null,
    selectedTileSet: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
    markers: [],
    markerClusters: null,
  }),
  computed: {
    ...mapGetters(['loading', 'user', 'error']),
    searchStore() {
      return createFromAlgoliaCredentials('8EQUU0LGVV', '3501d6b4c297d0993fdbd1aa1e17c9ed');
    }
  },
  watch: {
    algoliaRecords(value) {
      if (!value.length) return;
      return this.getAvailableUsers();
    },
    availableUsers(value) {
      if (value.length) {
        this.onUsersMap()
      }
    },
  },
  methods: {
    async startAlgolia() {
      this.searchStore.indexName = "status";
      await this.searchStore.start();
      await this.searchStore.refresh();
      await this.searchStore.waitUntilInSync();
      this.algoliaRecords = this.searchStore.results;
    },
    async getAvailableUsers () {
      if (!this.algoliaRecords.length) return;
      let data = [];

      await this.algoliaRecords.forEach((record) => {
        return db.collection('users').doc(record.objectID)
          .get()
          .then((doc) => {
            if (!doc.exists) return;

            data.push({
              id: doc.id,
              state: record.state,
              last_changed: record.last_changed,
              ...doc.data()
            })
          })
          .catch(e => console.log(error))
      })

      this.availableUsers = data;
    },
    onPageChange(page) {
      window.scrollTo(0,0);
    },
    onUsersMap() {
      var myIcon = L.icon({
        iconUrl: require('../../assets/marker.png'),
        iconSize: [30, 30],
        iconAnchor: [22, 94],
        // popupAnchor: [-3, -76],
        // shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      this.availableUsers.forEach((user) => {
        let lat = user._geoloc.lat;
        let lng = user._geoloc.lng;

        var markerX = L.marker([lat, lng]).bindPopup('<img src="'+ user.avatar + '" class="w3-circle mb-1 mr-1" style="height:30px;width:30px" />' + `${user.firstname} ${user.lastname}`);
        this.map.addLayer(markerX)
      })
    },
    setTileSet(selectedTileSet) {
      var basemap = L.tileLayer(selectedTileSet, {
        maxZoom: 20,
          // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
      if (this.map.hasLayer(basemap)) {
        this.map.removeLayer(basemap);
      } else {
        this.map.addLayer(basemap);
      };
    }
  },
  created() {
    this.startAlgolia();
  },
  mounted() {
    // Map
    // this.markerClusters = L.markerClusterGroup();
    this.map = L.map('map', {
      center: [10.0, 5.0],
      minZoom: 2,
      zoom: 2
    });
    this.setTileSet(this.selectedTileSet)
  },
}
</script>
