import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { SIGN_UP } from "../constants/validation";

export class Validation {
  constructor(type) {
    this.type = type;
    this.firstNameElement = document.querySelector("#validation-first-name");
    this.lastNameElement = document.querySelector("#validation-last-name");
    this.emailElement = document.querySelector("#validation-email");
    this.passElement = document.querySelector("#validation-password");
    this.formElement = document.querySelector("#validation-form");
    this.formElement.addEventListener("submit", this.handleSubmit);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const email = this.emailElement.value;
    const password = this.passElement.value;
    if (!email.length && !password.length) return;
    if (this.type === SIGN_UP) {
      this.register(email, password);
    } else {
      this.login(email, password);
    }
    // window.location.pathname = "/";
  };

  async login(email, password) {
    if (!email.length && !password.length) return;
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  }

  async register(email, password) {
    if (!email.length && !password.length) return;
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  }
}
