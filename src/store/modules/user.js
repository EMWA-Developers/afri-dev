import firebase from 'firebase'
import { db } from '../../main'

const state = {
  user: null,
  available: [],
}

const getters = {
  user: state => state.user,
  available: state => state.available,
}

const mutations = {
  SET_USER (state, payload) {
    return state.user = payload
  },
  GET_AVAILABLE_USERS (state, payload) {
    return state.available = payload
  },
}

const actions = {
  getAvailableUsers ({commit}) {
    commit('SET_LOADING', true);
    db.collection('status')
    .where('state', '==', 'online')
    .onSnapshot((snapshot) => {
      let available = []
      snapshot.forEach((doc) => {
        available.push({
          id: doc.id,
          ...doc.data()
        })
      });
      commit('GET_AVAILABLE_USERS', available);
      commit('SET_LOADING', false);
    }, (error) => {
      commit('SET_LOADING', false);
    })
  },
  setStatus ({commit, getters}) {
    // Fetch the current user's ID from Firebase Authentication.
    var uid = firebase.auth().currentUser.uid;
    // Create a reference to this user's specific status node.
    // This is where we will store data about being online/offline.
    var userStatusDatabaseRef = firebase.database().ref('/status/' + uid);
    // We'll create two constants which we will write to
    // the Realtime database when this device is offline
    // or online.
    var isOfflineForDatabase = {
        state: 'offline',
        last_changed: firebase.database.ServerValue.TIMESTAMP,
    };

    var isOnlineForDatabase = {
        state: 'online',
        last_changed: firebase.database.ServerValue.TIMESTAMP,
    };

    // Firestore
    var userStatusFirestoreRef = db.doc('/status/' + uid);

    // Firestore uses a different server timestamp value, so we'll
    // create two more constants for Firestore state.
    var isOfflineForFirestore = {
        state: 'offline',
        last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    };

    var isOnlineForFirestore = {
        state: 'online',
        last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    };

    firebase.database().ref('.info/connected').on('value', (snapshot) => {
        if (snapshot.val() == false) {
            // Instead of simply returning, we'll also set Firestore's state
            // to 'offline'. This ensures that our Firestore cache is aware
            // of the switch to 'offline.'
            userStatusFirestoreRef.set(isOfflineForFirestore);
            return;
        };

        userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(() => {
            userStatusDatabaseRef.set(isOnlineForDatabase);

            // We'll also add Firestore set here for when we come online.
            userStatusFirestoreRef.set(isOnlineForFirestore);
        });
    });
  },
  removeStatus ({commit, getters}) {
    // Fetch the current user's ID from Firebase Authentication.
    var uid = firebase.auth().currentUser.uid;
    // Create a reference to this user's specific status node.
    // This is where we will store data about being online/offline.
    var userStatusDatabaseRef = firebase.database().ref('/status/' + uid);
    // We'll create two constants which we will write to
    // the Realtime database when this device is offline
    // or online.
    var isOfflineForDatabase = {
        state: 'offline',
        last_changed: firebase.database.ServerValue.TIMESTAMP,
    };

    // Firestore
    var userStatusFirestoreRef = db.doc('/status/' + uid);

    // Firestore uses a different server timestamp value, so we'll
    // create two more constants for Firestore state.
    var isOfflineForFirestore = {
        state: 'offline',
        last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    };

    userStatusFirestoreRef.set(isOfflineForFirestore);
    userStatusDatabaseRef.set(isOfflineForDatabase);
  },
  updateUserPosition ({commit, getters}, payload) {
    commit('CLEAR_ERROR')
    const user = getters.user;

    db.doc(`users/${user.id}`)
      .update({
        _geoloc: {
          lat: payload.lat,
          lng: payload.lng
        }
      })
      .then(() => {
      })
      .catch((e) => {
        console.error(e);
      })
  },
  updateGeneral ({commit, getters}, payload) {
    commit('CLEAR_ERROR')
    const user = getters.user;

    db.doc(`users/${user.id}`).update(payload)
      .then(() => {
        console.log('success');
      })
      .catch((e) => {
        console.error(e);
      })
  },
  updateAvatar ({commit, getters}, payload) {
    commit('CLEAR_ERROR')
    const user = getters.user;

    const filename = payload.name
    const ext = filename.slice(filename.lastIndexOf('.'))
    let uploadTask = firebase.storage().ref(`users/${user.id}.${ext}`).put(payload)
    uploadTask.on('state_changed', (snapshot) => {
    }, (error) => {
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        db.doc(`users/${user.id}`).update({avatar: downloadURL})
          .then(() => {
            console.log('success');
          })
          .catch((e) => {
            console.error(e);
          });
      });
    });

  },
  updateProfessional ({commit, getters}, payload) {
    commit('CLEAR_ERROR')
    const user = getters.user;

    db.doc(`users/${user.id}`).update(payload)
      .then(() => {
        console.log('success');
      })
      .catch((e) => {
        console.error(e);
      })
  },
  // getUserPosition ({commit, getters}, payload) {
  //   const user = getters.user
  //   let data = {}
  //
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         data._geoloc.lat = position.coords.latitude
  //         data._geoloc.lng = position.coords.longitude
  //
  //         db.doc(`users/${user.id}`).update(data)
  //       },
  //       (error) => {
  //         switch(error.code) {
  //           case error.PERMISSION_DENIED:
  //             this.error = this.language == 'fr' ? "Vous avez refusé la demande de Géolocalisation." : "You denied the request for Geolocation."
  //             break;
  //           case error.POSITION_UNAVAILABLE:
  //             this.error = this.language == 'fr' ? "Les informations de Géolocalisation sont indisponibles." : "Location information is unavailable."
  //             break;
  //           case error.TIMEOUT:
  //             this.error = this.language == 'fr' ? "La demande d'obtention de votre Géolocation a expiré." : "The request to get user location timed out."
  //             break;
  //           case error.UNKNOWN_ERROR:
  //             this.error = this.language == 'fr' ? "Une erreur inconnue est survenue." : "An unknown error occurred."
  //             break;
  //         }
  //     });
  //   } else {
  //     this.error = this.language == 'fr' ? "Votre Géolocation a échoué..." : "Your Geolocation failed."
  //   }
  // },
  autoSignin ({ commit }, payload) {
    commit('SET_USER', {
      id: payload.uid
    })
  },
  setUser ({ commit}, payload) {
      commit('SET_USER', payload)
  },
  getUser ({commit}, payload) {
    const userId = payload.uid
    db.doc(`users/${userId}`)
      .onSnapshot((doc) => {
        if (doc && doc.exists) {
          const data = doc.data()
          // const user = {
          //   id: doc.id,
          //   ...doc.data()
          // }
          commit('SET_USER', data)
        }
      }, (error) => {
        console.error(error);
      })
  },
  updateUser ({commit, getters}, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)

    const user = getters.user;

    let data = {}

    data.email = user.email ? user.email : ''
    data.firstname = payload.firstname ? payload.firstname : ''
    data.lastname = payload.lastname ? payload.lastname : ''
    data.avatar = payload.avatar ? payload.avatar : ''
    data._geoloc = {
      lat: payload.geoloc.lat ? payload.geoloc.lat : '',
      lng: payload.geoloc.lng ? payload.geoloc.lng : '',
    }
    //
    db.doc(`users/${user.id}`).update(data)
      .then(() => {
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        let uploadTask = firebase.storage().ref(`users/${user.id}.${ext}`).put(payload.image)
        uploadTask.on('state_changed', (snapshot) => {
        }, (error) => {
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            db.doc(`users/${user.id}`).update({avatar: downloadURL})
          });
        });
      })
      .then(() => {
        commit('SET_LOADING', false)
      })
    .catch((e) => {
      commit('SET_LOADING', false)
      console.error(e)
    })
  },
  signupWithEmail ({ commit, getters }, payload) {
    const language = getters.language

    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    .then(userInfo => {

      const user = userInfo.user;

      const data = {
        id: user.uid,
        createdAt: Date.now(),
        email: payload.email,
        enabled: true,
        account: 'basic'
      }
      db.doc(`users/${user.uid}`).set(data, {merge: true})
      commit('SET_USER', data)
    })
    .then(() => {
      commit('SET_LOADING', false)
    })
    .catch((err) => {
      let errorCode;
      switch (err.code) {
        case 'auth/weak-password':
          errorCode = language == "fr" ? 'Le mot de passe doit avoir au-moins 6 charactères. Veuillez réessayer...' : "Password shoud have at least 6 characters. Please try again..."
          break;
        case 'auth/email-already-in-use':
          errorCode = language == "fr" ? 'L\'adresse email existe déjà sur un autre compte. Veuillez réessayer...' : "Email address already exists on another account. Please, try again..."
          break;
        case 'auth/invalid-email':
          errorCode = language == "fr" ? 'L\'adresse email n\'est pas valide. Veuillez réessayer...' : "Email address isn't valid. Please, try again..."
          break;
        case 'auth/network-request-failed':
          errorCode = language == "fr" ? 'Vérifiez votre connexion internet. Veuillez réessayer...' : 'Try to connect to the network. Please, try again...'
        default:
          errorCode = error.code
      }
      commit('SET_ERROR', errorCode)
      commit('SET_LOADING', false)
    })
  },
  loginWithEmail ({ commit, getters }, payload) {
    const language = getters.language

    commit('SET_LOADING', true)
    commit('CLEAR_ERROR')

    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        const data = {
          id: user.uid,
        }
        commit('SET_USER', data)
        commit('SET_LOADING', false)
      })
      .catch(error => {
        let errorCode = ''
        switch (error.code) {
          case 'auth/user-not-found':
              errorCode = language == "fr" ? "Il n'y a pas d'utilisateur correspondant à cette adresse email. Veuillez réessayer..." : "User's not found for this email. Please, try again..."
              break;
          case 'auth/wrong-password':
              errorCode = language == "fr" ? "Le mot de passe est invalide. Veuillez réessayer..." : "Invalid password. Please, try again..."
              break;
          case 'auth/invalid-email':
              errorCode = language == "fr" ? "L'adresse email n'est pas valide. Veuillez réessayer..." : "Invalid ID. Please, try again..."
              break;
          case 'auth/network-request-failed':
              errorCode = language == "fr" ? 'Vérifiez votre connexion internet. Veuillez réessayer...' : 'Try to connect to the network. Please, try again...'
          default:
              errorCode = error.code
        }
        commit('SET_ERROR', errorCode)
        commit('SET_LOADING', false)
      })
  },
  loginWithGoogle ({ commit }) {
    // commit('SET_LOADING', true)
    commit('CLEAR_ERROR')

    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
      .then(userInfo => {

        const user = userInfo.user;
        console.log(user);

        const data = {
          id: user.uid,
          createdAt: Date.now(),
          lastname: user.displayName,
          firstname: '',
          email: user.email,
          avatar: user.photoURL,
          enabled: true,
          account: 'basic'
        }
        db.doc(`/users/${user.uid}`).set(data, {merge: true})
        commit('SET_USER', user.uid)
      })
      .catch((e) => {
        console.error(e);
      })
  },
  loginWithFacebook ({ commit }) {
    commit('CLEAR_ERROR')

    const provider = new firebase.auth.FacebookAuthProvider()

    firebase.auth().signInWithPopup(provider)
      .then(userInfo => {

        const user = userInfo.user;
        console.log(user);

        const data = {
          id: user.uid,
          createdAt: Date.now(),
          lastname: user.displayName,
          firstname: '',
          email: user.email,
          avatar: user.photoURL,
          enabled: true,
          account: 'basic'
        }
        db.doc(`/users/${user.uid}`).set(data, {merge: true})
        commit('SET_USER', user.uid)
      })
      .catch((e) => {
        console.error(e);
      })
  },
  logout ({ commit }) { // TO KEEP
    firebase.auth().signOut()
    commit('SET_USER', null)
  }
}

export default {
    state,
    getters,
    mutations,
    actions
}
