import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { SIGN_UP } from "../constants/validation";
import { App } from "./app";
export class Validation {
  constructor(type) {
    this.type = type;
    this.firstNameElement = document.querySelector("#validation-first-name");
    this.lastNameElement = document.querySelector("#validation-last-name");
    this.emailElement = document.querySelector("#validation-email");
    this.passElement = document.querySelector("#validation-password");
    this.formElement = document.querySelector("#validation-form");
    this.formElement.addEventListener("submit", this.handleSubmit);
    this.db = App.db;
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const email = this.emailElement.value;
    const password = this.passElement.value;
    if (this.type === SIGN_UP) {
      const firstName = this.firstNameElement.value;
      const lastName = this.lastNameElement.value;
      await this.register(firstName, lastName, email, password);
    } else {
      await this.login(email, password);
    }
    window.location.pathname = "/";
  };

  async login(email, password) {
    if (!email.length || !password.length) return;
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const db = this.db;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      sessionStorage.setItem(
        "user",
        JSON.stringify({ ...user, ...docSnap.data() })
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  }

  async register(firstName, lastName, email, password) {
    if (!email.length || !password.length) return;
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const db = this.db;
      const docRef = doc(db, "users", user.uid);
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
      };
      await setDoc(docRef, userData);
      sessionStorage.setItem("user", JSON.stringify({ ...user, ...userData }));
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  }
}
