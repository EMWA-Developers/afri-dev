import firebase from 'firebase'
import { db } from '../../main'

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
  retweetPost ({commit, getters}, payload) {
    const user = getters.user
    // payload = all post data
    const data = {
      userId: user.id,
      postId: payload.postId,
      creatorId: payload.userId,
      content: payload.content,
      sponsored: payload.sponsored,
      enabled: payload.enabled,
      createdAt: Date.now(),
      publishedAt: payload.createdAt,
      type: 'retweet'
    }

    return db.collection('retweets').doc(`${user.id}_${payload.postId}`)
      .set(data, { merge: true })
      .then(() => console.log('Retweet done!'))
      .catch((e) => console.error(e))
  },
  unRetweetPost ({commit, getters}, payload) { // payload = postId
    const user = getters.user
    return db.collection('retweets').doc(`${user.id}_${payload.postId}`)
      .delete()
      .then(() => console.log('Retweet Removed!'))
      .catch((e) => console.error(e))
  }
}

export default {
    state,
    getters,
    mutations,
    actions
}
