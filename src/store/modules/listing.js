import firebase from 'firebase'
import {db} from '../../main'

const state = {
  offices: [],
  profiles: [],
  currentProfile: null,
}

const getters = {
  currentProfile: (state) => state.currentProfile,
  offices: (state) => state.offices,
  office: (state) => (id) => state.offices.find(office => office.id === id),
  profiles: (state) => state.profiles,
  profile: (state) => (id) => state.profiles.find(profile => profile.id === id),
}

const mutations = {
  'GET_OFFICES': (state, payload) => state.offices = payload,
  'GET_PROFILES': (state, payload) => state.profiles = payload,
  'SET_CURRENT_PROFILE': (state, payload) => state.currentProfile = payload,
}

const actions = {
  setCurrentProfile ({commit}, payload) {
    window.localStorage.setItem('currentProfile', JSON.stringify(payload))
  },
  getCurrentPosition ({commit}) {
    let currentProfile = JSON.parse(window.localStorage.getItem('currentProfile'))
    commit('SET_CURRENT_PROFILE', currentProfile)
  },
  getListingOffices ({commit, getters}) {
    commit('SET_LOADING', true);
    const user = getters.user;
    db.collection('listing').doc(user.id).collection('offices')
      .onSnapshot((snapshot) => {
        let offices = [];
        snapshot.forEach((doc) => {
          offices.push({
            id: doc.id,
            ...doc.data()
          })
        });
        commit('GET_OFFICES', offices);
        commit('SET_LOADING', false);
      }, (error) => {
        commit('SET_LOADING', false);
        console.log(error);
      })
  },
  addListingOffice ({commit, getters}, payload) {
    commit('SET_LOADING', true);
    const user = getters.user;

    let key;

    const data = {
      general: {
        status: payload.general.status,
        title: payload.general.title,
        email: payload.general.email,
        website: payload.general.website,
        officeOpen: payload.general.officeOpen,
        officeClose: payload.general.officeClose,
        honorary_price: payload.general.honorary_price,
        honorary_currency: payload.general.honorary_currency,
        overview: payload.general.overview,
      },
      address: {
        country: payload.address.country,
        city: payload.address.city,
        zip: payload.address.zip,
        streetAddress: payload.address.streetAddress,
        phone: payload.address.phone,
        free_phone: payload.address.free_phone,
        vat_number: payload.address.vat_number,
      },
      office: {
        yearFounded: payload.office.yearFounded,
        officeNumbers: payload.office.officeNumbers,
        lawyerNumbersAtOffice: payload.office.lawyerNumbersAtOffice,
        lawyerNumbersAllOffices: payload.office.lawyerNumbersAllOffices,
      },
      useful: {
        languages: payload.useful.languages,
        free_consulation: payload.useful.free_consulation,
        contingencyFee: payload.useful.contingencyFee,
        creditCardAccepted: payload.useful.creditCardAccepted,
      },
      areaOfPractices: {
        practice: payload.areaOfPractices.practice,
        areaOfPractices: payload.areaOfPractices.areaOfPractices,
        additionalPracticeAreas: payload.areaOfPractices.additionalPracticeAreas,
      },
      socials: {
        facebook: payload.socials.facebook,
        googleplus: payload.socials.googleplus,
        twitter: payload.socials.twitter,
        youtube: payload.socials.youtube,
      },
    };

    db.collection('listing').doc(user.id).collection('offices')
      .add(data)
      .then((doc) => {
        key = doc.id
      })
      .then(() => {
        if (!payload.image) return;
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        let uploadTask = firebase.storage().ref(`listing/${user.id}/offices/${key}.${ext}`).put(payload.image)
        uploadTask.on('state_changed', (snapshot) => {
        }, (error) => {
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            db.collection('listing').doc(user.id).collection('offices').doc(key).update({avatar: downloadURL})
          });
        });
      })
      .then(() => {
        commit('SET_LOADING', false);
      })
      .catch((e) => {
        commit('SET_LOADING', false);
        console.log(e);
      })
  },
  updateListingOffice ({commit, getters}, payload) {
    commit('SET_LOADING', true);
    const user = getters.user;

    const data = {
      general: {
        status: payload.general.status,
        title: payload.general.title,
        email: payload.general.email,
        website: payload.general.website,
        officeOpen: payload.general.officeOpen,
        officeClose: payload.general.officeClose,
        honorary_price: payload.general.honorary_price,
        honorary_currency: payload.general.honorary_currency,
        overview: payload.general.overview,
      },
      address: {
        country: payload.address.country,
        city: payload.address.city,
        zip: payload.address.zip,
        streetAddress: payload.address.streetAddress,
        phone: payload.address.phone,
        free_phone: payload.address.free_phone,
        vat_number: payload.address.vat_number,
      },
      office: {
        yearFounded: payload.office.yearFounded,
        officeNumbers: payload.office.officeNumbers,
        lawyerNumbersAtOffice: payload.office.lawyerNumbersAtOffice,
        lawyerNumbersAllOffices: payload.office.lawyerNumbersAllOffices,
      },
      useful: {
        languages: payload.useful.languages,
        free_consulation: payload.useful.free_consulation,
        contingencyFee: payload.useful.contingencyFee,
        creditCardAccepted: payload.useful.creditCardAccepted,
      },
      areaOfPractices: {
        practice: payload.areaOfPractices.practice,
        areaOfPractices: payload.areaOfPractices.areaOfPractices,
        additionalPracticeAreas: payload.areaOfPractices.additionalPracticeAreas,
      },
      socials: {
        facebook: payload.socials.facebook,
        googleplus: payload.socials.googleplus,
        twitter: payload.socials.twitter,
        youtube: payload.socials.youtube,
      },
    };

    db.collection('listing').doc(user.id).collection('offices').doc(payload.id)
      .update(data)
      .then(() => {
        if (!payload.image) return;
        //
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        let uploadTask = firebase.storage().ref(`listing/${user.id}/offices/${payload.id}.${ext}`).put(payload.image)
        uploadTask.on('state_changed', (snapshot) => {
        }, (error) => {
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            db.collection('listing').doc(user.id).collection('offices').doc(payload.id).update({avatar: downloadURL})
          });
        });
      })
      .then(() => {
        commit('SET_LOADING', false);
      })
      .catch((e) => {
        commit('SET_LOADING', false);
        console.log(e);
      })
  },
  deleleListingOffice ({commit, getters}, payload) {
    const user = getters.user;
    db.collection('listing').doc(user.id).collection('offices').doc(payload)
      .delete()
      .then()
      .catch((e) => console.log(error))
  },
  //
  getListingProfiles ({commit, getters}) {
    commit('SET_LOADING', true);
    const user = getters.user;
    db.collection('listing').doc(user.id).collection('profiles')
      .onSnapshot((snapshot) => {
        let profiles = [];
        snapshot.forEach((doc) => {
          profiles.push({
            id: doc.id,
            ...doc.data()
          })
        });
        commit('GET_PROFILES', profiles);
        commit('SET_LOADING', false);
      }, (error) => {
        commit('SET_LOADING', false);
        console.log(error);
      })
  },
  addListingProfile ({commit, getters}, payload) {
    commit('SET_LOADING', true);
    const user = getters.user;

    let key;

    const data = {
      general: {
        firstname: payload.general.firstname,
        lastname: payload.general.lastname,
        middlename: payload.general.middlename,
        honorary: payload.general.honorary,
        company: payload.general.company,
        office: payload.general.office,
        title: payload.general.title,
        position: payload.general.position,
        email: payload.general.email,
        website: payload.general.website,
        fee_price: payload.general.fee_price,
        fee_currency: payload.general.fee_currency,
        overview: payload.general.overview,
        yearJoined: payload.general.yearJoined,
      },
      address: {
        country: payload.address.country,
        city: payload.address.city,
        zip: payload.address.zip,
        streetAddress: payload.address.streetAddress,
        phone: payload.address.phone,
        free_phone: payload.address.free_phone,
        vat_number: payload.address.vat_number,
      },
      useful: {
        languages: payload.useful.languages,
        free_consulation: payload.useful.free_consulation,
        contingencyFee: payload.useful.contingencyFee,
        creditCardAccepted: payload.useful.creditCardAccepted,
      },
      career: {
        education: payload.career.education,
        barAdmissions: payload.career.barAdmissions,
        professionalExperiences: payload.career.professionalExperiences,
      },
      areaOfPractices: {
        practice: payload.areaOfPractices.practice,
        areaOfPractices: payload.areaOfPractices.areaOfPractices,
        additionalPracticeAreas: payload.areaOfPractices.additionalPracticeAreas,
      },
      socials: {
        facebook: payload.socials.facebook,
        googleplus: payload.socials.googleplus,
        twitter: payload.socials.twitter,
        youtube: payload.socials.youtube,
      },
    };

    db.collection('listing').doc(user.id).collection('profiles')
      .add(data)
      .then((doc) => {
        key = doc.id
      })
      .then(() => {
        if (!payload.image) return;
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        let uploadTask = firebase.storage().ref(`listing/${user.id}/profiles/${key}.${ext}`).put(payload.image)
        uploadTask.on('state_changed', (snapshot) => {
        }, (error) => {
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            db.collection('listing').doc(user.id).collection('profiles').doc(key).update({avatar: downloadURL})
          });
        });
      })
      .then(() => {
        commit('SET_LOADING', false);
      })
      .catch((e) => {
        commit('SET_LOADING', false);
        console.log(e);
      })
  },
  updateListingProfile ({commit, getters}, payload) {
    commit('SET_LOADING', true);
    const user = getters.user;

    const data = {
      general: {
        firstname: payload.general.firstname,
        lastname: payload.general.lastname,
        middlename: payload.general.middlename,
        honorary: payload.general.honorary,
        company: payload.general.company,
        office: payload.general.office,
        title: payload.general.title,
        position: payload.general.position,
        email: payload.general.email,
        website: payload.general.website,
        fee_price: payload.general.fee_price,
        fee_currency: payload.general.fee_currency,
        overview: payload.general.overview,
        yearJoined: payload.general.yearJoined,
      },
      address: {
        country: payload.address.country,
        city: payload.address.city,
        zip: payload.address.zip,
        streetAddress: payload.address.streetAddress,
        phone: payload.address.phone,
        free_phone: payload.address.free_phone,
        vat_number: payload.address.vat_number,
      },
      useful: {
        languages: payload.useful.languages,
        free_consulation: payload.useful.free_consulation,
        contingencyFee: payload.useful.contingencyFee,
        creditCardAccepted: payload.useful.creditCardAccepted,
      },
      career: {
        education: payload.career.education,
        barAdmissions: payload.career.barAdmissions,
        professionalExperiences: payload.career.professionalExperiences,
      },
      areaOfPractices: {
        practice: payload.areaOfPractices.practice,
        areaOfPractices: payload.areaOfPractices.areaOfPractices,
        additionalPracticeAreas: payload.areaOfPractices.additionalPracticeAreas,
      },
      socials: {
        facebook: payload.socials.facebook,
        googleplus: payload.socials.googleplus,
        twitter: payload.socials.twitter,
        youtube: payload.socials.youtube,
      },
    };

    db.collection('listing').doc(user.id).collection('profiles').doc(payload.id)
      .update(data)
      .then(() => {
        if (!payload.image) return;
        //
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        let uploadTask = firebase.storage().ref(`listing/${user.id}/profiles/${payload.id}.${ext}`).put(payload.image)
        uploadTask.on('state_changed', (snapshot) => {
        }, (error) => {
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            db.collection('listing').doc(user.id).collection('profiles').doc(payload.id).update({avatar: downloadURL})
          });
        });
      })
      .then(() => {
        commit('SET_LOADING', false);
      })
      .catch((e) => {
        commit('SET_LOADING', false);
        console.log(e);
      })
  },
  deleleListingProfile ({commit, getters}, payload) {
    const user = getters.user;
    db.collection('listing').doc(user.id).collection('profiles').doc(payload)
      .delete()
      .then()
      .catch((e) => console.log(error))
  },
  // Profile
  getProfiles ({commit, getters}) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)
    const user = getters.user

    db.collection('profiles').where('userId', user.id)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        let profiles = []
        snapshot.forEach((doc) => {
          profiles.push({
            id: doc.id,
            ...doc.data()
          })
        })
        commit('GET_PROFILES', profiles)
        commit('SET_LOADING', false)
      }, (err) => {
        console.error(err);
        commit('SET_LOADING', false)
      })
  },
  addProfile ({commit, getters}, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)

    const user = getters.user
    let downloadURL = null
    let key;

    let data = {
      userId: user.id,
      officeId: payload.officeId ? payload.officeId : '',
      honorary: payload.honorary ? payload.honorary : '',
      lastName: payload.lastName ? payload.lastName : '',
      firstName: payload.firstName ? payload.firstName : '',
      title: payload.title_fr ? payload.title : '',
      phone: payload.phone ? payload.phone : '',
      fax: payload.fax ? payload.fax : '',
      email: payload.email ? payload.email : '',
      website: payload.website ? payload.website : '',
      facebook: payload.facebook ? payload.facebook : '',
      linkedin: payload.linkedin ? payload.linkedin : '',
      twitter: payload.twitter ? payload.twitter : '',
      googleplus: payload.googleplus ? payload.googleplus : '',
      youtube: payload.youtube ? payload.youtube : '',
      languages: payload.languages ? payload.languages : '',
      yearAtFirm: payload.yearAtFirm ? payload.yearAtFirm : '',
      practiceAreas: payload.practiceAreas ? payload.practiceAreas : '',
      barAdmissions: payload.barAdmissions ? payload.barAdmissions : '',
      experience: payload.experience ? payload.experience : '',
      publications: payload.publications ? payload.publications : '',
      education: payload.education ? payload.education : '',
      seminars: payload.seminars ? payload.seminars : '',
    }

    db.doc(`profiles`).add(data)
    .then((doc) => {
      key = doc.id
      return db.doc(`profiles/${key}`).update({id: key})
    })
    .then(() => {
      const filename = payload.image.name
      const ext = filename.slice(filename.lastIndexOf('.'))
      if (payload.image != null) {
        downloadURL = firebase.storage().ref(`profiles/${key}.${ext}`).put(payload.image)
      }
    })
    .then(() => {
      let imageUrl = downloadURL.metadata.downloadURLs[0]
      if (downloadURL != null) {
        return db.doc(`profiles/${key}`).update({avatar: imageUrl})
      }
    })
    .then(() => {
      commit('SET_LOADING', false)
    })
    .catch((e) => {
      commit('SET_LOADING', false)
      console.error(e)
    })
  },
  updateProfile ({commit}, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)

    let downloadURL = null

    db.doc(`profiles/${payload.id}`)
    .update(payload)
    .then(() => {
      const filename = payload.image.name
      const ext = filename.slice(filename.lastIndexOf('.'))
      if (payload.image != null) {
        downloadURL = firebase.storage().ref(`profiles/${payload.id}.${ext}`).put(payload.image)
      }
    })
    .then(() => {
      let imageUrl = downloadURL.metadata.downloadURLs[0]
      if (downloadURL != null) {
        return db.doc(`profiles/${payload.id}`).update({avatar: imageUrl})
      }
    })
    .then(() => {
      commit('SET_LOADING', false)
    })
    .catch((e) => {
      commit('SET_LOADING', false)
      console.error(e)
    })
  },
  deleteProfile ({commit}, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)

    db.doc(`profiles`)
      .delete(payload)
      .then(() => {
        commit('SET_LOADING', false)
      })
      .catch((e) => {
        commit('SET_LOADING', false)
        console.error(e)
      })
  },
  // Offices
  getOffices ({commit, getters}) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)
    const user = getters.user

    db.collection('offices').where('userId', user.id)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        let offices = []
        snapshot.forEach((doc) => {
          offices.push({
            id: doc.id,
            ...doc.data()
          })
        })
        commit('GET_OFFICES', offices)
        commit('SET_LOADING', false)
      }, (err) => {
        console.error(err);
        commit('SET_LOADING', false)
      })
  },
  addOffice ({commit, getters}, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)

    const user = getters.user
    let downloadURL = null
    let key;

    let data = {
      userId: user.id,
      administrative: {
        title: payload.title ? payload.title : '',
        firstName: payload.firstName ? payload.firstName : '',
        lastName: payload.lastName ? payload.lastName : '',
        email: payload.email ? payload.email : '',
      },
      contact: {
        website: payload.website ? payload.website : '',
        email: payload.email ? payload.email : '',
        fullname_primary: payload.fullname_primary ? payload.fullname_primary : '',
        email_primary: payload.email_primary ? payload.email_primary : '',
        fullname_secondary: payload.fullname_secondary ? payload.fullname_secondary : '',
        email_secondary: payload.email_secondary ? payload.email_secondary : '',
      },
      description: {
        title: payload.title ? payload.title : '',
        overview: payload.overview ? payload.overview : '',
      },
      general: {
        address: payload.address ? payload.address : '',
        city: payload.city ? payload.city : '',
        state: payload.state ? payload.state : '',
        zip: payload.zip ? payload.zip : '',
        country: payload.country ? payload.country : '',
        phone: payload.phone ? payload.phone : '',
        fax: payload.fax ? payload.fax : '',
        year: payload.year ? payload.year : '',
        website: payload.website ? payload.website : '',
        languages: payload.languages ? payload.languages : '',
      },
      offices: { // all about numbers
        offices: payload.offices ? payload.offices : '',
        lawyers: payload.lawyers ? payload.lawyers : '',
        allLawyers: payload.allLawyers ? payload.allLawyers : '',
      },
      video: {
        title: payload.title ? payload.title : '',
        url: payload.url ? payload.url : '',
      },
      practiceAreas: {
        description: payload.description ? payload.description : '',
        areas: payload.areas ? payload.areas : '',
      },
      socials: {
        facebook: payload.facebook ? payload.facebook : '',
        twitter: payload.twitter ? payload.twitter : '',
        linkedin: payload.linkedin ? payload.linkedin : '',
        googleplus: payload.googleplus ? payload.googleplus : '',
        youtube: payload.youtube ? payload.youtube : '',
      }
    }

    db.doc(`offices`).add(data)
    .then((doc) => {
      key = doc.id
      return db.doc(`offices/${key}`).update({id: key})
    })
    .then(() => {
      const filename = payload.image.name
      const ext = filename.slice(filename.lastIndexOf('.'))
      if (payload.image != null) {
        downloadURL = firebase.storage().ref(`offices/${key}.${ext}`).put(payload.image)
      }
    })
    .then(() => {
      let imageUrl = downloadURL.metadata.downloadURLs[0]
      if (downloadURL != null) {
        return db.doc(`offices/${key}`).update({logo: imageUrl})
      }
    })
    .then(() => {
      commit('SET_LOADING', false)
    })
    .catch((e) => {
      commit('SET_LOADING', false)
      console.error(e)
    })
  },
  updateOffice ({commit}, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)

    let downloadURL = null

    db.doc(`offices/${payload.id}`)
    .update(payload)
    .then(() => {
      const filename = payload.image.name
      const ext = filename.slice(filename.lastIndexOf('.'))
      if (payload.image != null) {
        downloadURL = firebase.storage().ref(`offices/${payload.id}.${ext}`).put(payload.image)
      }
    })
    .then(() => {
      let imageUrl = downloadURL.metadata.downloadURLs[0]
      if (downloadURL != null) {
        return db.doc(`offices/${payload.id}`).update({avatar: imageUrl})
      }
    })
    .then(() => {
      commit('SET_LOADING', false)
    })
    .catch((e) => {
      commit('SET_LOADING', false)
      console.error(e)
    })
  },
  deleteOffice ({commit}, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)

    db.doc(`offices`)
      .delete(payload)
      .then(() => {
        commit('SET_LOADING', false)
      })
      .catch((e) => {
        commit('SET_LOADING', false)
        console.error(e)
      })
  }
}

export default {
    state,
    getters,
    mutations,
    actions
}
