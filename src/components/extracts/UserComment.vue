<template lang="html">
  <strong>
    {{username}}
  </strong>
</template>

<script>
import {db} from '../../main'
export default {
  props: ['id'],
  data: () => ({
    username: '',
  }),
  methods: {
    getUser() {
      db.collection('users').doc(this.id)
        .get()
        .then((doc) => {
          if (!doc.exists) return null;
          this.username = `${doc.data().firstname} ${doc.data().lastname}`;
        })
        .catch((error) => console.log(error));
    },
  },
  created() {
    this.getUser()
  }
}
</script>

<style lang="css">
</style>
