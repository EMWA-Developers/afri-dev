import firebase from 'firebase'
import { db } from '../../main'

const state = {
  comments: []
}

const getters = {
  comments: (state) => state.comments
}

const mutations = {
  'GET_POST_COMMENTS': (state, payload) => state.comments = payload,
}

const actions = {
  commentPost({ commit, getters }, payload) {
    const user = getters.user

    const data = {
      // firstname: user.firstname ? user.firstname : '',
      // lastname: user.lastname ? user.lastname : '',
      // avatar: user.avatar ? user.avatar : '',
      userId: user.id,
      content: payload.content,
      createdAt: Date.now()
    }

    const docRef = db.collection('posts').doc(payload.postId);
    docRef.collection('comments')
      .add(data)
      .then()
      .catch(error => console.error(error));
  },
}

export default {
    state,
    getters,
    mutations,
    actions
}
