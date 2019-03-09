<template lang="html">
  <div>
    <!-- Header -->
    <Header />
    <!--  -->
    <div class="container-fluid">
      <div class="row">
        <!--  -->
        <nav class="col-md-3 sidebar w3-white">
          <div class="sidebar-sticky">
            <div class="sticky-top w3-white py-3 wigdet--shadow" style="top:-10px;">
              <div class="input-group p-1 w3-light-grey rounded-pill widget--borderless">
                <div class="input-group-prepend w3-transparent border-0 rounded-pill">
                  <div class="input-group-text w3-transparent border-0"><i class="icon-magnifier"></i></div>
                </div>
                <input type="text" name="" value="" class="form-control border-0 rounded-pill w3-light-grey" placeholder="Search Messenger" v-model.trim="search" @keyup.enter="onSearchIn">
              </div>
            </div>
            <div class="pb-5">
              <div class="list-group">
                <a class="list-group-item list-group-item-action px-0 border-right-0 border-left-0 border-top-0" v-for="chat in chats" :key="chat.id" @click="onChangeChat(chat.id)" v-if="chats.length">
                <!-- <a class="list-group-item list-group-item-action px-0 border-right-0 border-left-0 border-top-0" v-for="n in 50" :key="n" :class="{'active': isActive(user)}"> -->
                  <UserCard :repicientId="chat.repicientId" :chat="chat" />
                </a>
              </div>
            </div>
          </div>
        </nav>
        <!--  -->
        <transition name="slide" mode="out-in">
          <main role="main" class="col-md-9 ml-sm-auto d-none d-md-block px-0">
            <Chat />
          </main>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from './UserCard';
import {db} from '../../main';
import {mapGetters} from 'vuex'

export default {
  components: {
    UserCard
  },
  data: () => ({
    loading: false,
    chats: [],
    search: ''
  }),
  computed: {
    ...mapGetters(['user']),
    currentUser() {
      return this.user;
    }
  },
  watch: {

  },
  methods: {
    onChangeChat(chat) {
      this.$router.push(`/message/${chat.id}`)
    },
    onSearchIn() {

    },
    async getChats () {
      this.loading = true;
      await db.collection('chats').where('senderId', '==', this.user.id)
        .onSnapshot((snapshot) => {
          let chats = [];
          snapshot.forEach((doc) => {
            chats.push({
              id: doc.id,
              ...doc.data()
            })
          });
          this.chats = chats;
          this.loading = false;
        }, (eror) => {
          this.loading = false;
          console.error(error);
        })
    },
  }
}
</script>

<style lang="css">
</style>
