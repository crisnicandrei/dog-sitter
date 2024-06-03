// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithCustomToken,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBaU6-ysP-siDXMZumLWuys_7leDMSL4VM",
  authDomain: "dog-care-e55ea.firebaseapp.com",
  projectId: "dog-care-e55ea",
  storageBucket: "dog-care-e55ea.appspot.com",
  messagingSenderId: "387916965285",
  appId: "1:387916965285:web:ffca57f7c3cc976b9ef44c",
  measurementId: "G-QWTGZ2ZJPG",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    console.log(res);
    const user = res.user;

    const userData = {
      token: user.accessToken,
      uid: user.uid,
      name: user.displayName,
      email: user.email,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        isSuperAdmin: false,
      });
    }
    const { email, displayName } = user;

    return { email, displayName };
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    const userData = {
      token: user.accessToken,
      uid: user.uid,
      name,
      email,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    console.log("THE USER IS:", user);
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      displayName: name,
      authProvider: "local",
      email,
      isSuperAdmin: false,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    localStorage.setItem("user", JSON.stringify(user));

    const userData = await getUserData(user.uid);

    return userData;
  } catch (err) {
    return undefined;
  }
};

const getUserData = async (id) => {
  const q = query(collection(db, "users"), where("uid", "==", id));
  try {
    const querySnapshot = await getDocs(q);
    let data = null;
    querySnapshot.forEach((doc) => {
      data = doc.data();
    });
    return data;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

const getUserInfoUsingUiid = async (uid) => {
  try {
    const userData = await getUserData(uid);
    return userData;
  } catch (err) {
    console.log("THE ERROR FROM TOKEN IS:", err);
  }
};

const updateProfile = async (data) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", data.uid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.error("No matching documents.");
      return;
    }
    const userDoc = querySnapshot.docs[0];
    const userRef = doc(db, "users", userDoc.id);
    await updateDoc(userRef, data);
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  getUserInfoUsingUiid,
  updateProfile,
};
