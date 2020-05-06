export const { firebase } = window;
const config = {
  apiKey: "AIzaSyDGqFG3qxVk2XXWOvsYVKfMo1gS6FFKbWE",
  authDomain: "crwn-db-fe6a4.firebaseapp.com",
  databaseURL: "https://crwn-db-fe6a4.firebaseio.com",
  projectId: "crwn-db-fe6a4",
  storageBucket: "crwn-db-fe6a4.appspot.com",
  messagingSenderId: "870236810548",
  appId: "1:870236810548:web:a1ce7c9838a82b6c464961",
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
