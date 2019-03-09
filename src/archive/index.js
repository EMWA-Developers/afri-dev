const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
admin.firestore().settings({ timestampsInSnapshots: true });

// Init Firestore
const db = admin.firestore()

// Algolia Settings
const algoliasearch = require('algoliasearch');
const algolia = algoliasearch(
  functions.config().algolia.appid,
  functions.config().algolia.adminkey
);

// Stripe Settings
var stripe = require('stripe')(functions.config().stripe.secret);

// Update Post to Algolia Dashboard
exports.algoliaPostIndex = functions.firestore
  .document('posts/{postId}')
  .onWrite((change, context) => {

    let index = algolia.initIndex('posts');
    //
    let postId = change.after.id;
    let data = change.after.data();

    if (!data) {
        return index.deleteObject(postId, (err) => {
            if (err) throw err;
            console.log('Post Removed in Algolia Index', postId)
        })
    }

    data['objectID'] = postId;

    return index.saveObject(data, (err, content) => {
        if (err) throw err;
        console.log('Post Updated in Algolia Index', data.objectID);
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
  .onCreate(async (userRecord, context) => {
    const firebaseUID = userRecord.uid;

    const customer = await stripe.customers.create({
      metadata: { firebaseUID }
    })

    return db.doc(`users${firebaseUID}`).update({
      stripeId: customer.id
    })
  })

exports.startSubscription = functions.https.onCall(
  async (data, context) => {
    const userId = context.auth.uid;
    const userDoc = await db.doc(`users${userId}`).get();

    const user = userDoc.data();

    // Attach the card to the user
    const source = await stripe.customers.createSource(user.stripeId, {
      source: data.source
    });

    if (!source) {
      throw "Stripe failed attach card";
      return;
    }
    // Subscribe the user to the plan
    const sub = await stripe.subscriptions.create({
      customer: user.stripeId,
      items: [{ plan: data.planId }]
    });

    // Update User document
    return db.doc(`users/${userId}`).update({
      status: sub.status,
      subscriptionId: sub.id,
      planId: sub.items.data[0].id
    });
  }
);

// AGGREGATE COMMENTS
exports.aggregateComments = functions.firestore
  .document('comments/{commentId}')
  .onWrite((change, context) => {
    // Comment Id
    const commentId = change.after.id
    const data = change.after.data()
    const postId = data.postId

    return db.collection('comments')
      .where('postId', postId)
      .get()
      .then(querySnapshot => {

        const commentCount = querySnapshot.size

        let recentComments = []

        querySnapshot.forEach(doc => {
          recentComments.push( doc.data() )
        });

        recentComments.splice(5)
        // record last comment timestamp
        const lastActivity = recentComments[0].createdAt

        // data to update on the Post document
        const data = { commentCount, recentComments, lastActivity }

        return db.collection('posts').doc(postId).update(data)
      })
      .catch(error => console.log(error))
})

exports.aggregateFavorites = functions.firestore
  .document('favorites/{favoriteId}')
  .onWrite((change, context) => {

    const data = change.after.data()
    const postId = data.postId

    return db.collection('favorites')
      .where('postId', postId)
      .get()
      .then(querySnapshot => {

        const favoriteCount = querySnapshot.size

        return db.collection('posts').doc(postId).update({
          favoriteCount: favoriteCount
        })
      })
      .catch(error => console.log(error))
})

exports.aggregateRetweets = functions.firestore
  .document('retweets/{retweetId}')
  .onWrite((change, context) => {

    const data = change.after.data()
    const postId = data.postId

    return db.collection('retweets')
      .where('postId', postId)
      .get()
      .then(querySnapshot => {

        const retweetCount = querySnapshot.size

        return db.collection('posts').doc(postId).update({
          retweetCount: retweetCount
        })
      })
      .catch(error => console.log(error))
})
