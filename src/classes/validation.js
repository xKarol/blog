import { SIGN_UP } from "../constants/validation";
import { App } from "./app";
import { User } from "./user";

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

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = this.emailElement.value;
      const password = this.passElement.value;
      if (this.type === SIGN_UP) {
        const firstName = this.firstNameElement.value;
        const lastName = this.lastNameElement.value;
        await User.register(firstName, lastName, email, password);
      } else {
        await User.login(email, password);
      }
    } catch (error) {
      console.error(error);
    } finally {
      window.location.pathname = "/";
    }
  };
}
