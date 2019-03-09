<template lang="html">

</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['user', 'loading'])
  },
}
</script>

<style lang="scss" scoped>
</style>
