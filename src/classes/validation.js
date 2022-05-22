import { Loader } from "./loader.js";
import { getFirebaseErrorByCode } from "../utils/firebase-utils";
import { Router } from "./router";

export class Validation {
  constructor(submitCallback) {
    this.emailElement = document.querySelector("#validation-email");
    this.passElement = document.querySelector("#validation-password");
    this.formElement = document.querySelector("#validation-form");
    this.submitElement = document.querySelector("#validation-submit");
    this.errorElement = document.querySelector("#validation-error");

    this.formElement.addEventListener("submit", (e) =>
      this.handleSubmit(e, submitCallback)
    );
  }

  toggleLoading(toggle) {
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
      submitBtn.innerText = this.submitName;
    }
  }

  #setError(error) {
    this.errorElement.innerText = error;
  }

  handleSubmit = async (e, submitCallback) => {
    e.preventDefault();
    try {
      this.#setError("");
      this.email = this.emailElement.value;
      this.password = this.passElement.value;
      this.toggleLoading(true);
      await submitCallback?.();
      Router.set("/");
    } catch (error) {
      if (error?.custom) {
        this.#setError(error.message);
      } else {
        this.#setError(getFirebaseErrorByCode(error.message));
      }
    } finally {
      this.toggleLoading(false);
    }
  };
}
