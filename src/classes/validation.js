import { getFirebaseErrorByCode } from "../helpers/firebase-errors";
import { Router } from "./router";
import { LoadingButton } from "./loading-button.js";
import { ROUTE_HOME } from "../config/routes.js";

export class Validation {
  constructor(submitCallback) {
    this.emailElement = document.querySelector("#validation-email");
    this.passElement = document.querySelector("#validation-password");
    this.formElement = document.querySelector("#validation-form");
    this.submitElement = document.querySelector("#validation-submit");
    this.errorElement = document.querySelector("#validation-error");

    const validationBtnsEl = document.querySelector("#validation-submit-btns");
    this.loadingButton = new LoadingButton(validationBtnsEl, {
      className: "validation__button",
      buttonType: "submit",
      id: "validation-submit",
    });

    this.formElement.addEventListener("submit", (e) =>
      this.handleSubmit(e, submitCallback)
    );
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
      this.loadingButton.toggleLoading(true);
      await submitCallback?.();
      Router.set(ROUTE_HOME);
    } catch (error) {
      if (error?.custom) {
        this.#setError(error.message);
      } else {
        this.#setError(getFirebaseErrorByCode(error.message));
      }
    } finally {
      this.loadingButton.toggleLoading(false);
    }
  };
}
