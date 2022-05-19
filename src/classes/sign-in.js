import { User } from "./user";
import { Validation } from "./validation";

export class SignIn extends Validation {
  constructor() {
    super(() => this.handleSubmitCallback());
    this.submitName = "Sign In";
    this.toggleLoading(false);
  }

  async handleSubmitCallback() {
    await User.login(this.email, this.password);
  }
}
