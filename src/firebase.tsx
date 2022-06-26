import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOtx-dsrjS09bBAfcenHIEX_SsViBitJ4",
  authDomain: "vsv-chat.firebaseapp.com",
  projectId: "vsv-chat",
  storageBucket: "vsv-chat.appspot.com",
  messagingSenderId: "411060484932",
  appId: "1:411060484932:web:10ec52dee8a062ddd1f511",
  measurementId: "G-89EPT478JG",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function logInWithEmailAndPassword(
  email: string,
  password: string,
): Promise<void> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    console.error(err);
  }
}

async function registerWithEmailAndPassword(
  name: string,
  email: string,
  password: string,
): Promise<void> {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err: any) {
    console.error(err);
  }
}

async function sendPasswordReset(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err: any) {
    console.error(err);
  }
}

function logout(): void {
  signOut(auth);
}

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
