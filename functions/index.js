const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Since this code will be running in the Cloud Functions enviornment
// we call initialize Firestore without any arguments because it
// detects authentication from the environment.
const firestore = admin.firestore();

// Algolia Settings
const algoliasearch = require('algoliasearch');
const algolia = algoliasearch(
    functions.config().algolia.appid,
    functions.config().algolia.adminkey
);

// Stripe Settings
const stripe = require('stripe')(functions.config().stripe.secret);

// Create a new function which is triggered on changes to /status/{uid}
// Note: This is a Realtime Database trigger, *not* Cloud Firestore.
exports.onUserStatusChanged = functions.database.ref('/status/{uid}').onUpdate(
    (change, context) => {
      // Get the data written to Realtime Database
      const eventStatus = change.after.val();

      // Then use other event data to create a reference to the
      // corresponding Firestore document.
      const userStatusFirestoreRef = firestore.doc(`status/${context.params.uid}`);

      // It is likely that the Realtime Database change that triggered
      // this event has already been overwritten by a fast change in
      // online / offline status, so we'll re-read the current data
      // and compare the timestamps.
      return change.after.ref.once('value').then((statusSnapshot) => {
        const status = statusSnapshot.val();
        console.log(status, eventStatus);
        // If the current timestamp for this data is newer than
        // the data that triggered this event, we exit this function.
        if (status.last_changed > eventStatus.last_changed) {
          return null;
        }

        // Otherwise, we convert the last_changed field to a Date
        eventStatus.last_changed = new Date(eventStatus.last_changed);

        // ... and write it to Firestore.
        return userStatusFirestoreRef.set(eventStatus);
      });
    });


// AGGREGATE COMMENTS
exports.aggregateComments = functions.firestore
    .document('posts/{postId}/comments/{commentId}')
    .onWrite((change, context) => {
        // Comment Id
        const commentId = context.params.commentId;
        const postId = context.params.postId;

        // ref to the parent document
        const docRef = firestore.collection('posts').doc(postId);

        return docRef.collection('comments')
            .orderBy('createdAt', 'desc')
            .get()
            .then(querySnapshot => {

                const commentCount = querySnapshot.size

                let recentComments = []

                querySnapshot.forEach(doc => {
                    recentComments.push(doc.data())
                });

                recentComments.splice(5)
                // record last comment timestamp
                const lastActivity = recentComments[0].createdAt

                // data to update on the Post document
                const data = { commentCount, recentComments, lastActivity }

                return docRef.update(data)
            })
            .catch(error => console.log(error))
    })

exports.aggregateFavorites = functions.firestore
    .document('posts/{postId}/favorites/{favoriteId}')
    .onWrite((change, context) => {

        // Favorite Id
        const favoriteId = context.params.favoriteId;
        const postId = context.params.postId;

        // ref to the parent document
        const docRef = firestore.collection('posts').doc(postId);

        return docRef.collection('favorites')
            .get()
            .then(querySnapshot => {

                const favoriteCount = querySnapshot.size
                const data = { favoriteCount: favoriteCount}
                return docRef.update(data)
            })
            .catch(error => console.log(error))
    })

// Update Office Listing to Algolia Dashboard
exports.algoliaOfficeListingIndex = functions.firestore
    .document('listing/{listingId}/offices/{officeId}')
    .onWrite((change, context) => {

        let index = algolia.initIndex('offices');
        //
        let officeId = change.after.id;
        let data = change.after.data();

        if (!data) {
            return index.deleteObject(officeId, (err) => {
                if (err) throw err;
                console.log('Office Listing Removed in Algolia Index', officeId)
            })
        }

        data['objectID'] = officeId;

        return index.saveObject(data, (err, content) => {
            if (err) throw err;
            console.log('Office Listing Updated in Algolia Index', data.objectID);
        })
    });
// Update Profile Listing to Algolia Dashboard
exports.algoliaProfileListingIndex = functions.firestore
    .document('listing/{listingId}/profiles/{profileId}')
    .onWrite((change, context) => {

        let index = algolia.initIndex('profiles');
        //
        let profileId = change.after.id;
        let data = change.after.data();

        if (!data) {
            return index.deleteObject(profileId, (err) => {
                if (err) throw err;
                console.log('Profile Listing Removed in Algolia Index', profileId)
            })
        }

        data['objectID'] = profileId;

        return index.saveObject(data, (err, content) => {
            if (err) throw err;
            console.log('Profile Listing Updated in Algolia Index', data.objectID);
        })
    });

// Update Status to Algolia Dashboard
exports.algoliaAvailableIndex = functions.firestore
    .document('status/{statusId}')
    .onWrite((change, context) => {

        let index = algolia.initIndex('status');
        //
        let statusId = change.after.id;
        let data = change.after.data();

        if (!data) {
            return index.deleteObject(statusId, (err) => {
                if (err) throw err;
                console.log('Status Removed in Algolia Index', statusId)
            })
        }

        data['objectID'] = statusId;

        return index.saveObject(data, (err, content) => {
            if (err) throw err;
            console.log('Status Updated in Algolia Index', data.objectID);
        })
    });

// Update User to Algolia Dashboard
exports.algoliaUserIndex = functions.firestore
    .document('users/{userId}')
    .onWrite((change, context) => {

        let index = algolia.initIndex('users');
        //
        let userId = change.after.id;
        let data = change.after.data();

        if (!data) {
            return index.deleteObject(userId, (err) => {
                if (err) throw err;
                console.log('User Removed in Algolia Index', userId);
            })
        }

        data['objectID'] = userId;

        return index.saveObject(data, (err, content) => {
            if (err) throw err;
            console.log('User Updated in Algolia Index', data.objectID);
        })
    });

// Create Stripe Customer
exports.createStripeCustomer = functions.auth
    .user()
    .onCreate((user, context) => {
        const uid = user.uid;

        const customer = stripe.customers.create({
            metadata: { uid }
        })

        return db.doc(`users/${uid}`).update({
            stripeId: customer.id
        })
    })

// Start Subscription
exports.startSubscription = functions.https.onCall(
    (data, context) => {
        const userId = context.auth.uid;
        const userDoc = firestore.doc(`users/${userId}`).get();

        const user = userDoc.data();

        // Attach the card to the user
        const source = stripe.customers.createSource(user.stripeId, {
            source: data.source
        });

        if (!source) {
            throw "Stripe failed attach card";
            return;
        }
        // Subscribe the user to the plan
        const sub = stripe.subscriptions.create({
            customer: user.stripeId,
            items: [{ plan: data.planId }]
        });

        // Update User document
        return firestore.doc(`users/${userId}`).update({
            status: sub.status,
            currentUsage: 0,
            subscriptionId: sub.id,
            planId: sub.items.data[0].id
        });
    });