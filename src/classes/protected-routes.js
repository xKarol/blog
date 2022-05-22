import {
  ROUTE_EDITOR,
  ROUTE_HOME,
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP,
} from "../config/routes";
import { Router } from "./router";

export class ProtectedRoutes {
  constructor(url, user) {
    if (!user || !url?.length) throw new Error();
    this.user = user;
    this.url = url;
  }
  check() {
    if (this.url === ROUTE_SIGN_UP || this.url === ROUTE_SIGN_IN) {
      if (this.user.loggedIn) {
        return Router.set(ROUTE_HOME);
      }
      return true;
    } else if (this.url === ROUTE_EDITOR) {
      if (!this.user.loggedIn) {
        return Router.set(ROUTE_HOME);
      }
    }
  }
}
