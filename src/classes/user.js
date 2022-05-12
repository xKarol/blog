import { getAuth, signOut } from "firebase/auth";
import { ROUTE_SIGN_IN } from "../config/routes";

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

  static async logout() {
    const auth = getAuth();
    await signOut(auth);
    User.clear();
    window.location.pathname = ROUTE_SIGN_IN;
  }
}
