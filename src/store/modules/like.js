import firebase from 'firebase'
import { db } from '../../main'

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
  likePost({ commit, getters }, payload) { // payload == postId
    const userId = getters.user.id;
    const docRef = db.collection('posts').doc(payload);

    docRef.collection('favorites').doc(`${userId}_${payload}`)
      .set({
          postId: payload,
          userId: userId
      }, {merge: true})
      .catch(error => console.error(error))
  },
  dislikePost({ commit, getters }, payload) { // payload == postId
    const userId = getters.user.id;
    const docRef = db.collection('posts').doc(payload);

    docRef.collection('favorites').doc(`${userId}_${payload}`)
      .delete()
      .catch(error => console.error(error))
  },
}

export default {
    state,
    getters,
    mutations,
    actions
}
