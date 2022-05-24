import { User } from "./user";
import { Validation } from "./validation";

export class SignIn extends Validation {
  constructor() {
    super(() => this.handleSubmitCallback());
    this.loadingButton.setOptions({ text: "Sign In" });
  }

  async handleSubmitCallback() {
    await User.login(this.email, this.password);
  }
}
