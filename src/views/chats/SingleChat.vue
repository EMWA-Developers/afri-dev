<template lang="html">
  <div>
    <!-- Header -->
    <Header />
    <!--  -->
    <div class="w3-display-container widget--messaging-box">
        <div class="w3-display-topleft w-100 border-bottom pt-4 pb-2 px-3 w3-white w3-shadow-sm" style="z-index:20">
            <div class="d-flex flex-row align-items-center justify-content-between">
                <div>
                    <img :src="currentChannel.recipient.avatar"
                        alt="" class="rounded-circle" style="height:40px;width:40px">
                </div>
                <div class="text-center">
                    <h6 class="my-0">{{`${currentChannel.recipient.firstname} ${currentChannel.recipient.lastname}`}}</h6>
                    <small class="w3-text-grey d-flex flex-row align-items-center">
                       <div class="widget--messaging-active-user-default mr-1"></div> Active now
                    </small>
                </div>
                <router-link tag="a" :to="`/profile/${currentChannel.recipient.id}`" class="btn btn-sm w3-light-grey rounded-0">See profile</router-link>
            </div>
        </div>
        <div class="widget--messaging-box-contents pl-3 pr-5">
            <div class="row">
                <div class="col-12" v-for="message in messages" :key="message.id" v-if="message.senderId == user.id">
                    <div class="row">
                        <div class="col-8 offset-4">
                            <div class="comments-input">
                                <div class="comment bubble font-size-14 w3-text-grey">
                                    {{message.content}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12" v-else>
                    <div class="row">
                        <div class="col-8">
                            <div class="comments-output">
                                <div class="comment bubble font-size-14 w3-text-grey">
                                    {{message.content}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w3-display-bottomleft w-100 px-3 pt-3 pb-0 w3-white w3-shadow">
            <div class="w3-light-grey d-flex flex-row align-items-center rounded widget--borderless px-3">
                <textarea class="w3-light-grey rounded border-0 w-100 py-2" id="" cols="80" rows="2" placeholder="Type a message" v-model.trim="content" @keyup.enter="onSendMessage"></textarea>
                <div class="d-flex flex-row align-items-center">
                    <span class="w3-text-grey mx-2">
                        <i class="icon-microphone font-weight-bold w3-large" aria-hidden="true"></i>
                    </span>
                    <button class="btn w3-text-grey px-2 my-0">
                        <i class="icon-paper-clip font-weight-bold w3-large" aria-hidden="true"></i>
                    </button>
                    <button class="btn w3-text-grey px-2 my-0" @click="onSendMessage">
                        <i class="icon-paper-plane font-weight-bold w3-large" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {db} from '../../main';
import {mapGetters} from 'vuex';

export default {
  props: ['id', 'chat'],
  data: () => ({
    imageURL: '',
    image: null,
    loading: false,
    content: '',
    messages: []
  }),
  computed: {
    ...mapGetters(['user', 'error', 'currentChannel'])
  },
  methods: {
    async getMessages() {
      this.loading = true;
      await db.collection('chats')
        .where("senderId", "==", this.currentChannel.sender.id)
        // .where("senderId", "==", this.currentChannel.recipient.id)
        // .where("relation", "array-contains", this.currentChannel.sender.id).where("relation", "array-contains", this.currentChannel.recipient.id)
        .onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            this.messages.push({
              id: doc.id,
              ...doc.data()
            })
          })
          this.loading = false;
        }, (error) => {
          console.error(error);
          this.loading = false;
        })
    },
    async onSendMessage() {
      const message = {
        senderId: this.currentChannel.sender.id,
        recipientId: this.currentChannel.recipient.id,
        content: this.content,
        image: this.image
      }
      await this.$store.dispatch('sendMessage', message);
      this.content = "";
      this.imageURL = "";
      this.image = null;
    },
    scrollToBottom() {
      // target id="messages" to scroll to bottom
      // scroll to bottom when new message
      // scroll to bottom when fetching messages
      let box = document.querySelector('#messages')
      box.scrollTop = box.scrollHeight
    }
  },
  created() {
    this.getMessages()
  }
}
</script>

<style lang="scss" scoped>
</style>
