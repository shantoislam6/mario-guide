const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const createNotification = notification => {
  return admin
    .firestore()
    .collection("notifications")
    .add({ ...notification, time: Date.now() });
};

exports.projectCreate = functions.firestore
  .document("projects/{projectId}")
  .onCreate((snap, context) => {
    const project = snap.data();
    return admin
      .firestore()
      .collection("users")
      .doc(project.uid)
      .get()
      .then(snap => {
        const user = snap.data();
        const notification = {
          name: "Added a new project",
          user: {
            ...user,
            uid: project.uid
          }
        };
        return createNotification(notification);
      });
  });

exports.createUser = functions.https.onCall((user, context) => {
  if (context.auth.uid) {
    return admin
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set(user)
      .then(() => {
        const notification = {
          name: "Joined the party",
          user
        };
        createNotification(notification);
        return {
          message: "User Created"
        };
      });
  }else{
     throw new Error('Unthorized Request');
  }
});

exports.userDeleted = functions.auth.user().onDelete(user => {
  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .delete();
});

