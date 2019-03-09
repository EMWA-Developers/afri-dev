import firebase from 'firebase'
import { db } from '../../main'
import * as _ from 'lodash'

const state = {
  posts: [],
  legalArticles: [],
  creator: null
}

const getters = {
  posts: state => state.posts,
  legalArticles: state => state.legalArticles,
  article: (state) => (id) => state.legalArticles.find(article => article.id === id),
  creator: state => state.creator
}

const mutations = {
  'GET_POSTS': (state, payload) => state.posts = payload,
  'GET_LEGAL_ARTICLES': (state, payload) => state.legalArticles = payload,
  'GET_CREATOR': (state, payload) => state.creator = payload,
}

const actions = {
  getCreator ({commit}, payload) {
    db.collection('users').doc(payload)
      .get()
      .then((doc) => {
        commit('GET_CREATOR', doc.data())
      })
      .catch((e) => {
        console.log(e);
      })
  },
  getAllPosts ({commit}) {
    commit('SET_LOADING', true)
      db.collection('posts').where('type', '==', 'post').onSnapshot((snapshot) => {
      // db.collection('posts').orderBy("createdAt", "desc").onSnapshot((snapshot) => {
        let posts = [];
        snapshot.forEach(doc => {
          posts.push({
            id: doc.id,
            ...doc.data()
          })
        })
        commit('SET_LOADING', false)
        commit('GET_POSTS', posts)
      }, (error) => {
        commit('SET_LOADING', false)
        console.error(error)
      })
  },
  getLegalArticles ({commit}) {
    commit('SET_LOADING', true)
      db.collection('posts').where('type', '==', 'legal-article').onSnapshot((snapshot) => {
        let legalArticles = [];
        snapshot.forEach(doc => {
          legalArticles.push({
            id: doc.id,
            ...doc.data()
          })
        })
        commit('SET_LOADING', false)
        commit('GET_LEGAL_ARTICLES', legalArticles)
      }, (error) => {
        commit('SET_LOADING', false)
        console.error(error)
      })
  },
  addPost ({commit, getters}, payload) {
    commit('CLEAR_ERROR')

    const user = getters.user
    let imageURLs = []
    let key

    const post = {
      type: 'post',
      createdBy: user.id,
      content: payload.content,
      createdAt: Date.now(),
      enabled: true,
      favoriteCount: 0,
      commentCount: 0,
      recentComments: [],
      // retweetCount: 0
    }

    db.collection('posts').add(post)
      .then((doc) => {
        key = doc.id
      })
      .then(() => {
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        let uploadTask = firebase.storage().ref(`posts/${key}.${ext}`).put(payload.image)
        uploadTask.on('state_changed', (snapshot) => {
        }, (error) => {
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            db.doc(`posts/${key}`).update({imageUrl:downloadURL})
          });
        });
      })
      // .then(() => {
      //   let imagesIndex = _.range(payload.images.length)
      //   _.each(imagesIndex, (idx) => {
      //       var randImage = payload.images[idx]
      //       var storageRef = firebase.storage().ref('posts')
      //       var uploadTask = storageRef.child(`${key}/${randImage.name}`).put(randImage)
      //
      //       uploadTask.on('state_changed', (snapshot) => {
      //       }, (error) => {
      //       }, () => {
      //         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      //           console.log(downloadURL);
      //           imageURLs.push(downloadURL)
      //         });
      //       })
      //     })
      // })
      .catch(error => {
        commit('SET_ERROR', error)
        console.log(error);
      })
  },
  postLegalArticle ({commit, getters}, payload) {
    commit('CLEAR_ERROR')

    const user = getters.user
    let imageURLs = []
    let key

    const post = {
      createdBy: user.id,
      title: payload.title,
      content: payload.content,
      createdAt: Date.now(),
      enabled: true,
      favoriteCount: 0,
      commentCount: 0,
      recentComments: [],
      type: 'legal-article'
      // retweetCount: 0
    }

    db.collection('posts').add(post)
      .then((doc) => {
        key = doc.id
      })
      .then(() => {
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        let uploadTask = firebase.storage().ref(`legal-articles/${key}.${ext}`).put(payload.image)
        uploadTask.on('state_changed', (snapshot) => {
        }, (error) => {
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            db.doc(`legal-articles/${key}`).update({imageUrl:downloadURL})
          });
        });
      })
      // .then(() => {
      //   let imagesIndex = _.range(payload.images.length)
      //   _.each(imagesIndex, (idx) => {
      //       var randImage = payload.images[idx]
      //       var storageRef = firebase.storage().ref('posts')
      //       var uploadTask = storageRef.child(`${key}/${randImage.name}`).put(randImage)
      //
      //       uploadTask.on('state_changed', (snapshot) => {
      //       }, (error) => {
      //       }, () => {
      //         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      //           console.log(downloadURL);
      //           imageURLs.push(downloadURL)
      //         });
      //       })
      //     })
      // })
      .catch(error => {
        commit('SET_ERROR', error)
        console.log(error);
      })
  },
  updatePost ({commit, getters}, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)

    let imageURLs = []

    db.doc(`posts/${payload.id}`)
      .update(payload)
      .then(() => {
        let imagesIndex = _.range(payload.images.length)
        _.each(imagesIndex, (idx) => {
            var randImage = payload.images[idx]
            var storageRef = firebase.storage().ref('posts')
            var uploadTask = storageRef.child(`${key}/${randImage.name}`).put(randImage)

            uploadTask.on('state_changed', (snapshot) => {
            }, (error) => {
            }, () => {
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log(downloadURL);
                imageURLs.push(downloadURL)
              });
            })
          })
      })
      .then(() => {
        return db.doc(`posts/${payload.id}`).update({
          imageURLs: imageURLs,
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
  deletePost ({commit, getters}, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)

    db.doc(`posts/${payload}`)
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
