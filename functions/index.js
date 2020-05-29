'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendSnippetNotification = functions.database.ref('/snippets/{snippetId}/suid/{userUid}')
    .onWrite(async (change, context) => {
      const userUid = context.params.userUid;
      const snippetId = context.params.snippetId;

      if (!change.after.val()) {
        return;
      }

      const authorSnapshot = await admin.database().ref(`/snippets/${snippetId}/uid`).once('value');
      const authorUid = authorSnapshot.val();

      const getDeviceTokensPromise = admin.database()
          .ref(`/users/${authorUid}/pushToken`).once('value');

      const getUserPromise = admin.database().ref(`/users/${userUid}`).once('value');;

      let tokensSnapshot;
      let tokens;

      const results = await Promise.all([getDeviceTokensPromise, getUserPromise]);
      tokensSnapshot = results[0];
      const user = results[1];

      // Check if there are any device tokens.
      if (!tokensSnapshot.hasChildren()) {
        return;
      }
      const payload = {
        notification: {
          title: 'Your snippet was saved!',
          body: `Saved by ${user.username}.`,
          icon: user.photoUrlPath
        }
      };

      tokens = Object.keys(tokensSnapshot.val());
      await admin.messaging().sendToDevice(tokens, payload);
      return;
    });