<template lang="html">
  <div :class="isOpen ? 'container-fluid' : 'container'">
    <slot />
  </div>
</template>

<script>
export default {
  computed: {
    isOpen() {
      return this.$store.getters.isOpen;
    }
  }
}
</script>

<style lang="css">
</style>
