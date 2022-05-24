import { validateFullName } from "../utils/validate-full-name";
import { User } from "./user";
import { Validation } from "./validation";

export class SignUp extends Validation {
  constructor() {
    super(() => this.handleSubmitCallback());
    this.firstNameElement = document.querySelector("#validation-first-name");
    this.lastNameElement = document.querySelector("#validation-last-name");
    this.loadingButton.setOptions({ text: "Create Account" });
  }

  async handleSubmitCallback() {
    const firstName = this.firstNameElement.value;
    const lastName = this.lastNameElement.value;
    const fullName = `${firstName} ${lastName}`;
    if (!validateFullName(fullName)) {
      throw {
        custom: true,
        message: "First name or last name is not valid.",
      };
    }
    await User.register(firstName, lastName, this.email, this.password);
  }
}
