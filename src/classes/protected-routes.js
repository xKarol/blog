import { ROUTE_HOME, ROUTE_SIGN_IN, ROUTE_SIGN_UP } from "../config/routes";
import { Route } from "./route";

export class ProtectedRoutes {
  constructor(url, user) {
    if (!user || !url?.length) throw new Error();
    this.user = user;
    this.url = url;
  }
  check() {
    if (this.url === ROUTE_SIGN_UP || this.url === ROUTE_SIGN_IN) {
      if (this.user.loggedIn) {
        return Route.set(ROUTE_HOME);
      }
      return true;
    }
  }
}
