// Wrap firebase API
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  UserCredential,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  DocumentData,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOtx-dsrjS09bBAfcenHIEX_SsViBitJ4", // Security flaw :(
  authDomain: "vsv-chat.firebaseapp.com",
  projectId: "vsv-chat",
  storageBucket: "vsv-chat.appspot.com",
  messagingSenderId: "411060484932",
  appId: "1:411060484932:web:10ec52dee8a062ddd1f511",
  measurementId: "G-89EPT478JG",
};

// Initialize firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Login with email
export function loginUser(email: string, password: string) {
  return new Promise<UserCredential>(async (resolve, reject) => {
    try {
      resolve(await signInWithEmailAndPassword(auth, email, password));
    } catch (err: any) {
      console.error(err);
      reject(err);
    }
  });
}

// Register (sign in) with email
export function registerUser(name: string, email: string, password: string) {
  return new Promise<DocumentData>(async (resolve, reject) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      resolve(
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name,
          authProvider: "local",
          email,
        }),
      );
    } catch (err: any) {
      console.error(err);
      reject(err);
    }
  });
}

// Logout
export function logoutUser(): void {
  signOut(auth);
}

// Send reset password email
export function resetPassword(email: string) {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await sendPasswordResetEmail(auth, email);
      resolve();
    } catch (err: any) {
      console.error(err);
      reject(err);
    }
  });
}
