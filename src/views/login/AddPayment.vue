<template lang="html">
  <div>
    <!-- Header -->
    <Header />
    <!--  -->
    <main role="main" class="row no-gutters">
      <div class="widget--collapse-sidebar sidebar">
        <Sidebar />
      </div>
      <transition name="slide" appear mode="out-in">
        <div class="widget--collapse-main">
          <div class="widget--listing-1 w3-padding-48 px-md-5 w3-container">
            <h1 class="my-0"><strong>Add payment method</strong></h1>
          </div>
          <div class="row w3-padding-48">
            <div class="col-12 col-md-8 offset-md-2">
              <div class="container">
                <div class="mt-4 rounded-0 widget--borderless">
                  <div class="p-3 pb-0">
                    <div class="tab-content" id="myTabContent">
                      <div ref="card"></div>
                      <div class="modal-footer mt-4">
                        <button data-toggle="modal" data-target="#paymentConfirmationModal" type="button" name="button" class="btn font-weight-medium rounded-pill text-uppercase">Make payment</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </main>
    <!-- Confirmation modal -->
    <div class="modal fade" id="paymentConfirmationModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content rounded-0 widget--borderless" v-if="user">
          <div class="modal-header border-bottom-0">
            <h6 class="m-0">Payment confirmation</h6>
          </div>
          <div class="modal-body pb-1">
            Do you want to subscribe to this <span class="font-weight-bold">{{plan}} plan</span> ?
          </div>
          <div class="modal-footer pt-0 pb-3 border-top-0">
            <button type="button" class="btn btn-sm w3-rounded-0 text-uppercase font-weight-medium" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-sm w3-rounded-0 text-uppercase font-weight-medium" @click="onPurchase">Purchase</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import firebase from 'firebase'
let stripe = Stripe('pk_test_RrF4o3mereWRgRI0qiXxlCgz'),
    elements = stripe.elements(),
    card = undefined;

export default {
  props: {
    plan: {
      type: String,
      default: 'silver'
    }
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters(['user']),
    planId() {
      switch (this.plan) {
        case 'silver':
          return 'prod_Ee0OwFoJQ4McDW'
          break;
        case 'electrum':
          return 'prod_Ee0UET7ouSEH1H'
          break;
        case 'gold':
          return 'prod_Ee0S94ylKfkKON'
          break;
      }
    }
  },
  methods: {
    async onPurchase () {
      $('#paymentConfirmationModal').modal('hide')
      await stripe.createToken(card).then((result) => {
        if (result.error) {
          this.hasCardErrors = true;
          this.$forceUpdate(); // Forcing the DOM to update so the Stripe Element can update.
          return;
        }
        // Access the token with result.token
        console.log(result.token);
        return result.token;
      })
      .then((token) => {
        var startSubscription = firebase.functions().httpsCallablle('startSubscription')
        // ({ source: token.id, planId: this.plan })
        return startSubscription({
          source: token.id,
          planId: this.planId,
        })
      })
      .then((result) => {
        // Read result of the Cloud Function.
        console.log(result.data.text)
        this.$router.push('/listing-management')
      })
      .catch((e) => console.error(e.code))
    }
  },
  mounted() {
    card = elements.create('card');
    card.mount(this.$refs.card)
  },
}
</script>

<style lang="scss" scoped>
</style>
