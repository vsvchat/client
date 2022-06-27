// Wrap firebase API
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  UserCredential,
  User,
} from "firebase/auth";
import {
  getFirestore,
  // collection,
  doc,
  // addDoc,
  getDoc,
  // DocumentData,
  setDoc,
  DocumentData,
} from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";

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

//TODO Remove console.error

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
  return new Promise<void>(async (resolve, reject) => {
    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      // Add user to database
      resolve(
        await setDoc(doc(db, "users", user.uid), {
          name,
          email,
          password_lol_haha: password, // Security flaw :(
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

// Get current user data from database
export function getUserData(user: User | null | undefined) {
  return new Promise<DocumentData>(async (resolve, reject) => {
    try {
      if (!user?.uid) {
        throw new Error("Invalid user");
      }
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        throw new Error("User does not exist");
      }
      resolve(userDoc.data());
    } catch (err: any) {
      console.error(err);
      reject(err);
    }
  });
}

// Get current user display name
export function getName(user: User | null | undefined) {
  return new Promise<string>(async (resolve, reject) => {
    try {
      resolve((await getUserData(user)).name);
    } catch (err: any) {
      console.error(err);
      reject(err);
    }
  });
}
