import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ROUTE_SIGN_IN } from "../config/routes";
import { getUserById } from "../services/firebase";
import { App } from "./app";
import { Router } from "./router";

export class User {
  static data = { loggedIn: false };

  static async init(callback) {
    const auth = getAuth();
    const db = App.db;
    onAuthStateChanged(auth, async (user) => {
      let userData = {};
      if (user) {
        const uid = user.uid;
        const userDoc = await getUserById(db, uid);
        userData = { uid, ...userDoc, loggedIn: true };
      } else {
        userData = { loggedIn: false };
      }
      User.data = userData;
      callback?.(userData);
    });
  }

  static clear() {
    User.data = { loggedIn: false };
  }

  static async login(email, password) {
    if (!email.length || !password.length) return;
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(error.code, error.message);
    }
  }

  static async register(firstName, lastName, email, password) {
    if (!email.length || !password.length) return;
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const db = App.db;
      const docRef = doc(db, "users", user.uid);
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
      };
      await setDoc(docRef, userData);
    } catch (error) {
      throw new Error(error.code, error.message);
    }
  }

  static async logout() {
    const auth = getAuth();
    await signOut(auth);
    User.clear();
    Router.set(ROUTE_SIGN_IN);
  }
}
