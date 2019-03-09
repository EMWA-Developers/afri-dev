<template lang="html">
  <div class="widget--collapse-sidebar sidebar" v-show="isOpen" :class="{'display-block': isOpen}">
    <slot />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isOpen']),
  },
}
</script>
