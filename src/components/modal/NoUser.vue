<template lang="html">
  <div>
    <div class="modal fade" id="noUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content rounded-0 widget--borderless">
          <div class="modal-header pt-3 pb-0 border-bottom-0 font-weight-medium">
            <h5>Connection alert</h5>
          </div>
          <div class="modal-body pb-1">
            You're not connected. Please login or signup.
          </div>
          <div class="modal-footer pt-0 pb-3 border-top-0">
            <button type="button" class="btn btn-sm w3-rounded-0 text-uppercase font-weight-medium" @click="gotoLogin">Log in</button>
            <button type="button" class="btn btn-sm w3-rounded-0 text-uppercase font-weight-medium" @click="gotoSignup">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    gotoLogin() {
      $('#noUserModal').modal('hide')
      this.$router.push('/login')
    },
    gotoSignup() {
      $('#noUserModal').modal('hide')
      this.$router.push('/sign-up')
    },
  }
}
</script>

<style lang="css">
</style>
