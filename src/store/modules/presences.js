import firebase from 'firebase'
import { db } from '../../main'

const state = {
  // userStatus: null,
  presences: []
}

const getters = {
  // userStatus: state => state.userStatus,
  presences: state => state.presences,
}

const mutations = {
  // 'SET_USER_STATUS' (state, payload) {
  //   return state.userStatus = payload
  // },
  'SET_PRESENCE' (state, status) { // payload == status
    const user = state.user;
    if (user) {
      return firebase.database().ref(`/status/${user.id}`)
        .set({
          status,
          last_changed: firebase.database.ServerValue.TIMESTAMP,
        })
    }
  },
  'GET_PRESENCES' (state, payload) {
    return state.presences = payload
  }
}

const actions = {
  getPresences ({commit}) {
    firebase.database().ref('status').on('value', (snapshot) => {
      let presences = [];
      const obj = snapshot.val();
      for (let key in obj) {
        presences.push({
          id: key,
          ...obj[key]
        })
      };
      // console.log(presences);
      commit('GET_PRESENCES', presences);
    });
  },
  // getPresence ({commit}, payload) {
  //   // Fetch the current user's ID from Firebase Authentication.
  //   var uid = payload.uid;
  //
  //   // Create a reference to this user's specific status node.
  //   // This is where we will store data about being online/offline.
  //   var userStatusDatabaseRef = firebase.database().ref('/status/' + uid);
  //
  //   userStatusDatabaseRef.on('value', function(snapshot) {
  //     console.log(snapshot);
  //     commit('SET_USER_STATUS', snapshot)
  //   })
  // },
  setPresence ({ commit}, payload) {
    commit('SET_PRESENCE', payload)
  },
  updateOnUSer ({ commit }) {
    firebase.database().ref('.info/connected').on('value', (snapshot) => {
        let status = snapshot.val() == false ? status = 'offline' : status = 'online';
        commit('SET_PRESENCE', status);
    })
  },
  updateOnDisconnect ({commit}) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var userStatusDatabaseRef = firebase.database().ref('/status/' + user.uid);
        userStatusDatabaseRef.onDisconnect()
          .set({
            status: 'offline',
            last_changed: firebase.database.ServerValue.TIMESTAMP
          })
      }
    })
  },
}

export default {
    state,
    getters,
    mutations,
    actions
}
