<template lang="html">
  <div>
    <div class="w3-display-container widget--messaging-box">
        <div class="w3-display-topleft w-100 border-bottom p-3 w3-white w3-shadow-sm" style="z-index:20">
            <div class="d-flex flex-row align-items-center justify-content-between">
                <div>
                    <img src="https://lh3.googleusercontent.com/-3cB6E0IJd-o/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcn4x9wy2Y0xvzUaOtAl-rnrLTxIw/mo/photo.jpg?sz=46"
                        alt="" class="rounded-circle" style="height:40px;width:40px">
                </div>
                <div class="text-center">
                    <h6 class="my-0">Aaron Dizele</h6>
                    <small class="w3-text-grey d-flex flex-row align-items-center">
                       <div class="widget--messaging-active-user-default mr-1"></div> Active now
                    </small>
                </div>
                <button class="btn btn-sm w3-light-grey rounded-0">See profile</button>
            </div>
        </div>
        <div class="widget--messaging-box-contents pl-3 pr-5">
            <div class="row">
                <div class="col-12">
                    <div class="row">
                        <div class="col-8">
                            <div class="comments-output">
                                <div class="comment bubble font-size-14 w3-text-grey">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim eum, necessitatibus veniam earum sunt velit aut vero? Adipisci odit laborum, libero ea atque necessitatibus iste ab, dolorum deserunt delectus ullam?
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="row">
                        <div class="col-8 offset-4">
                            <div class="comments-input">
                                <div class="comment bubble font-size-14 w3-text-grey">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="row">
                        <div class="col-8 offset-4">
                            <div class="comments-input">
                                <div class="comment bubble font-size-14 w3-text-grey">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="row">
                        <div class="col-8">
                            <div class="comments-output">
                                <div class="comment bubble font-size-14 w3-text-grey">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim eum, necessitatibus veniam earum sunt velit aut vero? Adipisci odit laborum, libero ea atque necessitatibus iste ab, dolorum deserunt delectus ullam?
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="row">
                        <div class="col-8 offset-4">
                            <div class="comments-input">
                                <div class="comment bubble font-size-14 w3-text-grey">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w3-display-bottomleft w-100 px-3 pt-3 pb-0 w3-white w3-shadow">
            <div class="w3-light-grey d-flex flex-row align-items-center rounded widget--borderless px-3">
                <textarea class="w3-light-grey rounded border-0 w-100 py-2" id="" cols="80" rows="2" placeholder="Type a message"></textarea>
                <div class="d-flex flex-row align-items-center">
                    <span class="w3-text-grey mx-2">
                        <i class="icon-microphone font-weight-bold w3-large" aria-hidden="true"></i>
                    </span>
                    <span class="w3-text-grey mx-2">
                        <i class="icon-paper-clip font-weight-bold w3-large" aria-hidden="true"></i>
                    </span>
                    <span class="w3-text-grey mx-2">
                        <i class="icon-paper-plane font-weight-bold w3-large" aria-hidden="true"></i>
                    </span>
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
    loading: false,
    messages: []
  }),
  computed: {
    ...mapGetters(['user', 'error'])
  },
  methods: {
    async getMessages() {
      this.loading = true;
      await db.collection('chats').doc(this.id)
        .onSnapshot((snapshot) => {
          let messages = []
          snapshot.forEach((doc) => {
            messages.push({
              id: doc.id,
              ...doc.data()
            })
          })
          this.messages = messages;
          this.loading = false;
        }, (error) => {
          console.error(error);
        })
    },
    scrollToBottom() {
      // target id="messages" to scroll to bottom
      // scroll to bottom when new message
      // scroll to bottom when fetching messages
      let box = document.querySelector('#messages')
      box.scrollTop = box.scrollHeight
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
