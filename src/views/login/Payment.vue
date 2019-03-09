<template lang="html">
  <div ref="card"></div>
</template>

<script>
import firebase from 'firebase'
let stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY),
    elements = stripe.elements(),
    card = undefined;

export default {
  data: () => ({
    selectedPlanId: ''
  }),
  mounted() {
    card = elements.create('card');
    card.mount(this.$refs.card)
  },
  onPurchase () {
    stripe.createToken(card).then((result) => {
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
      return startSubscription({
        source: token.id,
        planId: this.selectedPlanId,
      })
    })
    .then(function(result) {
      // Read result of the Cloud Function.
      console.log(result.data.text)
    })
    .catch((e) => console.error(e.code))
  }
}
</script>

<style lang="css">
</style>
