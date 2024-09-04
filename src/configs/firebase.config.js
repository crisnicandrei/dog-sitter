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
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

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

    console.log(res);
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
        tarif: "",
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
      tarif: "",
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

const getUsersByCity = async (city) => {
  console.log(city);

  try {
    const usersQueryCollection = query(
      collection(db, "users"),
      where("city", "==", city),
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
  sendPasswordResetEmail,
};
