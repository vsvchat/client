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
  collection,
  doc,
  getDoc,
  setDoc,
  DocumentData,
  query,
  where,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { userData } from "./dbTypes";

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

// Check if string is valid email
function isEmail(value: string) {
  return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/.test(value);
}

// Convert snapshot of documents to array
function snapshotToArray(snapshot: QuerySnapshot<DocumentData>): DocumentData[] {
  const array: DocumentData[] = [];
  snapshot.forEach(function (childSnapshot) {
    array.push({ ...childSnapshot.data(), id: childSnapshot.id });
  });
  return array;
}

// Get email address from username in database
function getEmailFromUsername(username: string) {
  return new Promise<string>(async (resolve, reject) => {
    try {
      // Query docs
      const querySnapshot = await getDocs(
        await query(collection(db, "users"), where("username", "==", username)),
      );
      if (querySnapshot.size < 1) {
        // No doc with that username
        throw new Error("auth/user-not-exist");
      }
      if (querySnapshot.size > 1) {
        // Multiple users with same username
        throw new Error("auth/username-conflict");
      }
      // Convert to array and get first item email
      resolve(snapshotToArray(querySnapshot)[0].email);
    } catch (err: unknown) {
      reject(err);
    }
  });
}

// Login with username or email
export function loginUser(usernameOrEmail: string, password: string) {
  return new Promise<UserCredential | null>(async (resolve, reject) => {
    try {
      // Get email if is username
      const email = isEmail(usernameOrEmail)
        ? usernameOrEmail
        : await getEmailFromUsername(usernameOrEmail);
      // Login
      resolve(await signInWithEmailAndPassword(auth, email, password));
    } catch (err: unknown) {
      reject(err);
    }
  });
}

// Register (sign in) with email
export function registerUser(
  username: string,
  email: string,
  password: string,
  name: string,
) {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // Create user
      const user = (await createUserWithEmailAndPassword(auth, email, password)).user;
      // Add user to database
      const data: userData = {
        time: Date.now(),
        username,
        email,
        name,
        avatar: null, // Avatar
        channels: [],
      };
      resolve(await setDoc(doc(db, "users", user.uid), data));
    } catch (err: unknown) {
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
    } catch (err: unknown) {
      reject(err);
    }
  });
}

// Get current user data from database
export function getUserData(user: User | null | undefined) {
  return new Promise<DocumentData>(async (resolve, reject) => {
    try {
      if (!user?.uid) {
        throw new Error("auth/invalid-user");
      }
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        throw new Error("auth/user-not-exist");
      }
      const data = userDoc.data();
      resolve(data);
    } catch (err: unknown) {
      reject(err);
    }
  });
}
