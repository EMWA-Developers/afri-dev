import firebase from 'firebase'
import { db } from '../../main'

const state = {
  connectedUsers: [],
  userStatus: {}
}

const getters = {
  connectedUsers: state => state.connectedUsers,
  userStatus: state => state.userStatus,
}

const mutations = {
  'GET_CONNECTED_USERS': (state, payload) => state.connectedUsers = payload,
  'GET_USER_STATUS': (state, payload) => state.userStatus = payload
}

const actions = {
  getUserStatus ({commit}, payload) { // payload == userId
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)

    db.collection('status')
      .doc(payload)
      .onSnapshot((doc) => {
        const data = doc.data()
        commit('GET_USER_STATUS', data)
        commit('SET_LOADING', false)
      }, (error) => {
        console.error(error)
        commit('SET_LOADING', false)
      })
  },
  getConnectedUsers ({commit}) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)

    db.collection('status')
      .where('state', 'online')
      .orderBy('last_seen')
      .onSnapshot((snapshot) => {
        let connectedUsers = []
        snapshot.forEach(doc => {
          activeUsers.push({
            id: doc.id,
            ...doc.data()
          })
        })
        commit('GET_CONNECTED_USERS', connectedUsers)
        commit('SET_LOADING', false)
      }, (error) => {
        console.error(error)
        commit('SET_LOADING', false)
      })
  },
  setUserPresence ({commit, getters}, payload) {
    const user = getters.user
    var status = {
      userId: getters.userId,
      state: payload.state ? payload.state : 'offline',
      last_seen: Date.now()
    }

    db.doc(`status/${user.id}`)
      .update(status)
      .then(() => console.log('success'))
      .catch((e) => {
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
