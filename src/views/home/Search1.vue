<template>
  <div class="home">
    <!-- <ais-search-box :search-store="searchStore"></ais-search-box> -->
    <input type="text" placeholder="Tap your search..." v-model.trim="searching" @keyup.enter="onSearch">
    <!--  -->
    <ais-index :search-store="searchStore" index-name="bestbuy" :query="query">
      <ais-results-per-page-selector :options="[20, 50, 100]"></ais-results-per-page-selector>
      <!-- Statistics -->
      <ais-stats></ais-stats>
      <!-- Results -->
      <ais-results :results-per-page="50">
        <template slot-scope="{ result }">
          <h2>
            <!-- {{result.name}} -->
            <ais-highlight :result="result" attribute-name="name"></ais-highlight>
          </h2>
        </template>
      </ais-results>
      <!-- Paginations -->
      <ais-pagination v-on:page-change="onPageChange" :padding="3"></ais-pagination>
      <!-- No results -->
      <ais-no-results>
         <template slot-scope="props">
         	No products found for <i>{{ props.query }}</i>.
         </template>
      </ais-no-results>
    </ais-index>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createFromAlgoliaCredentials } from 'vue-instantsearch'

export default {
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    searching: '',
    searchStore: createFromAlgoliaCredentials('latency', '3d9875e51fbd20c7754e65422f7ce5e1'),
  }),
  watch: {
    'searchStore.query'(value) {
      this.$router.push({
        name: 'search',
        query: { q: value }
      })
    },
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
  }
}
</script>
