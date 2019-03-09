<template lang="html">
  <div class="row no-gutters">
    <div class="col-2">
      <div class="w3-display-container">
        <img :src="user.avatar"
        alt="" class="rounded-circle" style="height:40px;width:40px">
        <div class="widget--messaging-active-user"></div>
      </div>
    </div>
    <div class="col-10 pl-1">
      <div class="d-flex w-100 justify-content-between">
        <h6 class="mb-1 text-truncate font-size-15 font-weight-medium">{{`${user.firstname} ${user.lastname}`}}</h6>
        <small class="w3-text-grey">3 days ago</small>
      </div>
      <p class="mb-0 w3-text-grey text-truncate font-size-14">Donec id elit non mi porta gravida at eget
        metus. Maecenas sed diam eget risus varius
        blandit.
      </p>
    </div>
  </div>
</template>

<script>
import {db} from '../../main';
import {mapGetters} from 'vuex'

export default {
  props: ['repicientId'],
  data: () => ({
    user: null,
  }),
  methods: {
    getUser() {
      db.collection('users').doc(this.repicientId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          this.user = {
            id: doc.id,
            avatar: data.avatar,
            firstname: data.firstname,
            lastname: data.lastname
          }
        }
      })
    }
  },
  created() {
    this.getUser()
  }
}
</script>

<style lang="css">
</style>
