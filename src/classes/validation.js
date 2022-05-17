import { SIGN_UP } from "../constants/validation";
import { User } from "./user";
import { Loader } from "./loader.js";
import { getFirebaseErrorByCode } from "../utils/firebase-utils";

export class Validation {
  constructor(type) {
    this.emailElement = document.querySelector("#validation-email");
    this.passElement = document.querySelector("#validation-password");
    this.formElement = document.querySelector("#validation-form");
    this.submitElement = document.querySelector("#validation-submit");
    this.errorElement = document.querySelector("#validation-error");

    this.type = type;
    this.#toggleLoading(false);
    if (type === SIGN_UP) {
      this.firstNameElement = document.querySelector("#validation-first-name");
      this.lastNameElement = document.querySelector("#validation-last-name");
    }
    this.formElement.addEventListener("submit", this.handleSubmit);
  }

  #toggleLoading(toggle) {
    const submitBtn = this.submitElement;
    this.loading = toggle;
    submitBtn.disabled = toggle;
    if (toggle) {
      if (this.loader) {
        this.loader.delete();
      }
      submitBtn.innerText = "";
      this.loader = new Loader(submitBtn, 0.8);
    } else {
      this.loader?.delete?.();
      submitBtn.innerText = this.type === SIGN_UP ? "Sign Up" : "Sign In";
    }
  }

  #setError(error) {
    this.errorElement.innerText = error;
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      this.#setError("");
      const email = this.emailElement.value;
      const password = this.passElement.value;
      this.#toggleLoading(true);
      if (this.type === SIGN_UP) {
        const firstName = this.firstNameElement.value;
        const lastName = this.lastNameElement.value;
        await User.register(firstName, lastName, email, password);
      } else {
        await User.login(email, password);
      }
      window.location.pathname = "/";
    } catch (error) {
      this.#setError(getFirebaseErrorByCode(error.message));
    } finally {
      this.#toggleLoading(false);
    }
  };
}
