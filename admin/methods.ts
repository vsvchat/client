// Admin
import admin from "firebase-admin";
// Client
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  query,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { resolve } from "path";
// From client folder
export { registerUser } from "../client/src/auth/firebase";

// Initialize admin
admin.initializeApp({
  credential: admin.credential.cert("./firebase.json"),
});

// Client config
export const firebaseConfig = {
  apiKey: "AIzaSyBOtx-dsrjS09bBAfcenHIEX_SsViBitJ4", // Security flaw :(
  authDomain: "vsv-chat.firebaseapp.com",
  projectId: "vsv-chat",
  storageBucket: "vsv-chat.appspot.com",
  messagingSenderId: "411060484932",
  appId: "1:411060484932:web:10ec52dee8a062ddd1f511",
  measurementId: "G-89EPT478JG",
};

// Initialize client
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export function deleteUser(uid: string) {
  return admin.auth().deleteUser(uid);
}

export function deleteAllUsers(nextPageToken?: string | undefined) {
  console.log("Deleting all users...");
  return new Promise<void>(async (resolve, reject) => {
    admin
      .auth()
      .listUsers(100, nextPageToken)
      .then(listUsersResult => {
        Promise.all(
          listUsersResult.users.map(userRecord => deleteUser(userRecord.uid)),
        ).then(async () => {
          if (listUsersResult.pageToken) {
            await deleteAllUsers(listUsersResult.pageToken);
          }
          resolve();
        });
      })
      .catch(function (err: any) {
        console.log("Error listing users:", err);
        reject(err);
      });
  });
}

export async function deleteDocsOfCollection(name: string) {
  console.log(`Deleting all documents of collection '${name}'...`);
  return Promise.all(
    (await getDocs(query(collection(db, name)))).docs.map(doc =>
      deleteDoc(doc.ref),
    ),
  );
}

export function deleteUsersAndDocs() {
  console.log("Deleting users and user docs");
  return Promise.all([
    new Promise(async resolve => resolve(await deleteAllUsers())),
    new Promise(async resolve =>
      resolve(await deleteDocsOfCollection("users")),
    ),
  ]);
}
