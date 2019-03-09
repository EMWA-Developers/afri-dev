<template lang="html">
  <!-- <ais-search-box :search-store="searchStore"></ais-search-box> -->
  <input type="text" placeholder="Tap your search..." v-model.trim="searching" @keyup.enter="onSearch">
  <!--  -->
  <ais-index :search-store="searchStore" index-name="bestbuy"
  :query-parameters="{'page': page}"
  >
    <!-- Page Selector -->
      <ais-results-per-page-selector :options="[20, 50, 100]"></ais-results-per-page-selector>
      <!-- Results -->
      <ais-results :results-per-page="100">
        <template slot-scope="{ result }">
          <h2>
            <ais-highlight :result="result" attribute-name="name"></ais-highlight>
          </h2>
        </template>
      </ais-results>
      <!-- Paginations -->
      <ais-pagination v-on:page-change="onPageChange" :padding="3"></ais-pagination>
  </ais-index>
</template>

<script>
export default {
  methods: {
    getCurrentPosition () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this._geoloc.lat = position.coords.latitude
          this._geoloc.lng = position.coords.longitude
        }, (error) => {
          switch(error.code) {
            case error.PERMISSION_DENIED:
              this.error = this.language == 'fr' ? "Vous avez refusé la demande de Géolocalisation." : "You denied the request for Geolocation."
              break;
            case error.POSITION_UNAVAILABLE:
              this.error = this.language == 'fr' ? "Les informations de Géolocalisation sont indisponibles." : "Location information is unavailable."
              break;
            case error.TIMEOUT:
              this.error = this.language == 'fr' ? "La demande d'obtention de votre Géolocation a expiré." : "The request to get user location timed out."
              break;
            case error.UNKNOWN_ERROR:
              this.error = this.language == 'fr' ? "Une erreur inconnue est survenue." : "An unknown error occurred."
              break;
          }
        });
      } else {
        this.error = this.language == 'fr' ? "Votre Géolocation a échoué..." : "Your Geolocation failed."
      }
    },
  }
}
</script>

<style lang="css">
</style>
