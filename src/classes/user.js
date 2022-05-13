import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ROUTE_SIGN_IN } from "../config/routes";
import { App } from "./app";

export class User {
  static get() {
    const userJSON = window.sessionStorage.getItem("user");
    const user = JSON.parse(userJSON);
    return user ?? { loggedIn: false };
  }

  static save(data) {
    sessionStorage.setItem("user", JSON.stringify({ ...data, loggedIn: true }));
  }

  static clear() {
    sessionStorage.removeItem("user");
  }

  static async login(email, password) {
    if (!email.length || !password.length) return;
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const db = App.db;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      User.save({ ...user, ...docSnap.data() });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
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
      User.save({ ...user, ...userData });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  }

  static async logout() {
    const auth = getAuth();
    await signOut(auth);
    User.clear();
    window.location.pathname = ROUTE_SIGN_IN;
  }
}
