<template lang="html">
  <div class="widget--collapse-main" :class="isOpen ? 'widget--collapse-open' : 'widget--collapse-close'">
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
