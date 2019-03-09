import firebase from 'firebase'
import { db } from '../../main'
import * as _ from 'lodash'

const state = {
  currentChannel: null,
}

const getters = {
  currentChannel: (state) => state.currentChannel
}

const mutations = {
  'SET_CURRENT_CHANNEL' (state, channel) {
    state.currentChannel = channel;
  }
}

const actions = {
  setCurrentChannel({commit}, payload) {
    commit('SET_CURRENT_CHANNEL', payload)
  },
  sendMessage ({commit, getters}, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)

    const user = getters.user
    let key

    const chat = {
      senderId: payload.senderId,
      recipientId: payload.recipientId,
      content: payload.content,
      createdAt: Date.now(),
      relation: [payload.senderId, payload.recipientId]
    }

      db.collection('chats').add(chat)
      .then((doc) => {
        key = doc.id
      })
      .then(() => {
        const filename = payload.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        let uploadTask = firebase.storage().ref(`chats/${key}.${ext}`).put(payload)

        uploadTask.on('state_changed',
          (snapshot) => {},
          (error) => {},
          () => {
            uploadTask.snapshot.ref.getDownloadURL()
              .then((downloadURL) => {
                db.collection('chats').doc(key)
                  .update({imageURL: downloadURL})
                    .then(() => {
                      console.log('success');
                    })
                    .catch((e) => {
                      console.error(e);
                    });
            })
        })
      })
      .then(() => {
        commit('SET_LOADING', false)
      })
      .catch(error => {
        commit('SET_ERROR', error)
        commit('SET_LOADING', false)
      })
  },
  deleteMessage ({commit, getters}, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)

    db.doc(`chats/${payload}`)
      .delete(payload)
      .then(() => {
        commit('SET_LOADING', false)
      })
      .catch(error => {
        commit('SET_ERROR', error)
        commit('SET_LOADING', false)
      })
  }
}

export default {
    state,
    getters,
    mutations,
    actions
}
