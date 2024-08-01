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

import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJXjGqJsqdbnji-YQPtsm5GvHQzxmtwCg",
  authDomain: "dogoproject-bb3cb.firebaseapp.com",
  projectId: "dogoproject-bb3cb",
  storageBucket: "dogoproject-bb3cb.appspot.com",
  messagingSenderId: "511020674216",
  appId: "1:511020674216:web:60ba794c99da1c0f33269d",
  measurementId: "G-QGTW5CZHHG",
};

// const firebaseConfig = {
//   storageBucket: "gs://dog-care-e55ea.appspot.com",
//   apiKey: "AIzaSyBaU6-ysP-siDXMZumLWuys_7leDMSL4VM",
//   authDomain: "dog-care-e55ea.firebaseapp.com",
//   projectId: "dog-care-e55ea",
//   storageBucket: "dog-care-e55ea.appspot.com",
//   messagingSenderId: "387916965285",
//   appId: "1:387916965285:web:ffca57f7c3cc976b9ef44c",
//   measurementId: "G-QWTGZ2ZJPG",
// };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

async function uploadImageToFirebase(file) {
  // Create a storage reference
  const storageRef = ref(storage, "images/" + file.name);

  // Upload the file to the storage reference
  const snapshot = await uploadBytes(storageRef, file);

  // Get the download URL
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
}

async function saveImageURLToFirestore(imageURL) {
  // Create a reference to the Firestore document
  const docRef = doc(firestore, "images", "your_document_id");

  // Set the image URL in Firestore
  await setDoc(docRef, {
    url: imageURL,
  });
}

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    const { uid } = user;

    const userData = {
      token: user.accessToken,
      uid: user.uid,
      name: user.displayName,
      email: user.email,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    const q = query(collection(db, "users"), where("uid", "==", uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        displayName: user.displayName,
        authProvider: "google",
        email: user.email,
        isSuperAdmin: false,
        isAccepted: false,
        isReviewed: false,
        appointments: [],
        phone: "",
        description: "",
        boarding: false,
        walking: false,
        daycare: false,
        sitting: false,
      });
    }

    return { uid };
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password, router) => {
  try {
    const userResponse = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userResponse;

    const userData = {
      token: user.accessToken,
      uid: user.uid,
      name,
      email,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      displayName: name,
      authProvider: "local",
      email,
      isSuperAdmin: false,
      isAccepted: false,
      isReviewed: false,
      appointments: [],
      phone: "",
      description: "",
      boarding: false,
      walking: false,
      daycare: false,
      sitting: false,
    });

    return user;
  } catch (err) {
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

const getAllPendingUsers = async (id) => {
  const usersQueryCollection = query(
    collection(db, "users"),
    where("isAccepted", "==", false),
    where("isSuperAdmin", "==", false)
  );
  try {
    const querySnapshot = await getDocs(usersQueryCollection);
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

const getAllAcceptedUsers = async (id) => {
  const usersQueryCollection = query(
    collection(db, "users"),
    where("isAccepted", "==", true),
    where("isReviewed", "==", true)
  );
  try {
    const querySnapshot = await getDocs(usersQueryCollection);
    const data = querySnapshot.docs.map((doc) => doc.data());
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
  } catch (err) {}
};

const updateProfile = async (updatedUserData) => {
  try {
    const q = query(
      collection(db, "users"),
      where("uid", "==", updatedUserData.uid)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error("No matching documents.");
      return;
    }

    const userDoc = querySnapshot.docs[0];
    const userRef = doc(db, "users", userDoc.id);

    await updateDoc(userRef, updatedUserData);
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};

const acceptOrDeclineUserProfile = async (uid, bolleanAcceptence) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error("No matching documents.");
      return;
    }

    const userDoc = querySnapshot.docs[0];
    const userRef = doc(db, "users", userDoc.id);

    await updateDoc(userRef, {
      isReviewed: true,
      isAccepted: bolleanAcceptence,
    });

    console.log("User profile updated successfully.");
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};

const getUsersByCity = async (city, boarding, daycare, sitting, walking) => {
  try {
    const usersQueryCollection = query(
      collection(db, "users"),
      where("city", "==", city),
      where("boarding", "==", boarding),
      where("daycare", "==", daycare),
      where("sitting", "==", sitting),
      where("sitting", "==", walking),
      where("isAccepted", "==", true),
      where("isReviewed", "==", true)
    );
    const querySnapshot = await getDocs(usersQueryCollection);
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
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
  getAllPendingUsers,
  getAllAcceptedUsers,
  acceptOrDeclineUserProfile,
  getUserData,
  uploadImageToFirebase,
  getUsersByCity,
};
