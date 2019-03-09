<template lang="html">
  <div>
    <!-- Header -->
    <Header />
    <!--  -->
    <main role="main" class="row no-gutters">
      <SidebarTile>
        <Sidebar />
      </SidebarTile>
      <transition name="slide" appear mode="out-in">
        <MainTile>
          <div class="widget--listing-1 w3-padding-48 px-md-5 w3-container">
            <div class="container">
              <h2 class="my-0"><strong>Listing Management</strong></h2>
            </div>
          </div>
          <div class="row w3-padding-48">
            <div class="col-12 col-md-10 offset-md-1">
              <div class="container">
                <!--  -->
                <div class="card rounded-0 border-0 shadow-lg mb-5">
                    <div class="card-header w3-white border-0 pb-0 d-flex flex-row align-items-center justify-content-between">
                      <h6 class="my-0">Office (s)</h6>
                      <button @click="onAddOffice" class="btn w3-light-grey btn-sm d-flex flex-row align-items-center">
                        <i class="material-icons w3-small" aria-hidden="true">add</i>&nbsp; Add an Office
                      </button>
                    </div>
                    <div class="card-body pt-1">
                        <h6 class="text-black-50 font-size-14">Paid offices: 6</h6>
                        <table class="table table-bordered">
                            <tbody>
                                <tr v-for="office in offices" :key="office.id">
                                    <td class="text-truncate text-capitalize"><span class="font-weight-medium mr-1">{{office.address.country}},</span>{{office.address.city}}&nbsp;<span v-if="office.general.status">(Main Office)</span></td>
                                    <td class="text-truncate text-capitalize" style="width:180px">{{office.address.streetAddress}}</td>
                                    <td class="text-truncate text-center">
                                        <button class="btn ml-0 my-0 p-0 mr-2 pointer">
                                            <i class="material-icons w3-large" aria-hidden="true">cast</i>
                                        </button>
                                        <router-link tag="button" :to="`/update-office/${office.id}`" class="btn ml-0 my-0 p-0 mr-2 pointer">
                                            <i class="material-icons w3-large" aria-hidden="true">edit</i>
                                        </router-link>
                                        <button class="btn p-0 m-0 pointer" @click="onDeleteOfficeModal(office.id)">
                                            <i class="material-icons w3-large" aria-hidden="true">delete</i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!--  -->
                <div class="card rounded-0 border-0 shadow-lg mb-5">
                    <div class="card-header w3-white border-0 pb-0 d-flex flex-row align-items-center justify-content-between">
                      <h6 class="my-0">Partners & Lawyers profiles</h6>
                      <button @click="onAddProfile" class="btn w3-light-grey btn-sm d-flex flex-row align-items-center">
                        <i class="material-icons w3-small" aria-hidden="true">add</i>&nbsp; Add an Profile
                      </button>
                    </div>
                    <div class="card-body pt-1">
                      <h6 class="text-black-50 font-size-14">Maximun Profiles: 6</h6>
                        <table class="table table-bordered">
                          <tbody>
                            <tr v-for="profile in profiles" :key="profile.id">
                              <td class="text-truncate text-capitalize"><span class="font-weight-medium">{{profile.general.lastname}} {{profile.general.middlename}},</span>&nbsp;{{profile.general.firstname}}</td>
                              <td class="text-truncate text-capitalize">{{profile.general.honorary}}</td>
                              <td class="text-truncate text-capitalize"><span class="font-weight-medium">{{profile.address.country}},</span>&nbsp;{{profile.address.city}}</td>
                              <td class="text-truncate text-center">
                                <button class="btn ml-0 my-0 p-0 mr-2 pointer" @click="onViewProfile(profile)">
                                  <i class="material-icons w3-large" aria-hidden="true">cast</i>
                                </button>
                                <router-link tag="button" :to="`/update-profile/${profile.id}`" class="btn ml-0 my-0 p-0 mr-2 pointer">
                                  <i class="material-icons w3-large" aria-hidden="true">edit</i>
                                </router-link>
                                <button class="btn p-0 m-0 pointer" @click="onDeleteProfileModal(profile.id)">
                                  <i class="material-icons w3-large" aria-hidden="true">delete</i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <h6 class="font-size-14">
                           <i class="icon-info" aria-hidden="true"></i>&nbsp;
                           Partners and lawyers profile are created in Premium Listings
                         </h6>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </MainTile>
      </transition>
    </main>
    <!-- Modal -->
    <!-- Delete Office -->
    <div class="modal fade" id="deleteOfficeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Delete office confirmation</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Do you want to delete this office ?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn w3-light-grey font-weight-medium" data-dismiss="modal">Close</button>
            <button type="button" class="btn w3-light-grey font-weight-medium" @click="onDeleteOffice">Confirm</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Delete Profile -->
    <div class="modal fade" id="deleteProfileModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Delete profile confirmation</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Do you want to delete this profile ?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn w3-light-grey font-weight-medium" data-dismiss="modal">Close</button>
            <button type="button" class="btn w3-light-grey font-weight-medium" @click="onDeleteProfile">Confirm</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Add Profile limit -->
    <div class="modal fade" id="limitProfileModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Adding profile limit</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            You cannot add more than 6 profiles according your current listing plan. <br>Please, upgrade your plan to add more profiles.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn w3-light-grey font-weight-medium" data-dismiss="modal">Close</button>
            <button type="button" class="btn w3-light-grey font-weight-medium" data-dismiss>Upgrade</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Add Office limit -->
    <div class="modal fade" id="limitOfficeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Adding office limit</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            You cannot add more than 6 offices according your current listing plan. <br>Please, upgrade your plan to add more offices.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn w3-light-grey font-weight-medium" data-dismiss="modal">Close</button>
            <button type="button" class="btn w3-light-grey font-weight-medium" data-dismiss>Upgrade</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    selectedOfficeId: null,
    selectedProfileId: null,
  }),
  computed: {
    ...mapGetters(['loading', 'error', 'offices', 'profiles']),
    availableProfiles () {
      return this.profiles.length;
    },
    availableOffices () {
      return this.offices.length;
    }
  },
  methods: {
    onViewProfile(profile) {
      this.$store.dispatch('setCurrentProfile', profile)
      this.$router.push(`/lawyer/${profile.id}`)
    },
    onAddProfile() {
      if (this.availableProfiles >= 6) {
        $('#limitProfileModal').modal('show')
        return;
      }
      this.$router.push('/add-profile');
    },
    onAddOffice() {
      if (this.availableOffices >= 6) {
        $('#limitOfficeModal').modal('show')
        return;
      }
      this.$router.push('/add-office');
    },
    onDeleteOfficeModal(officeId) {
      $('#deleteOfficeModal').modal('show')
      this.selectedOfficeId = officeId;
    },
    onDeleteOffice() {
      $('#deleteOfficeModal').modal('hide')
      this.$store.dispatch('deleleListingOffice', this.selectedOfficeId)
    },
    onDeleteProfileModal(profileId) {
      $('#deleteProfileModal').modal('show')
      this.selectedProfileId = profileId;
    },
    onDeleteProfile() {
      $('#deleteProfileModal').modal('hide')
      this.$store.dispatch('deleleListingProfile', this.selectedProfileId)
    },
  },
  mounted() {
    this.selectedOffice = null;
  },
  created() {
    this.$store.dispatch('getListingOffices');
    this.$store.dispatch('getListingProfiles');
  }
}
</script>

<style lang="scss" scoped>
</style>
