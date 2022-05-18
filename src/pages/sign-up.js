import { Validation } from "../classes/validation";
import { SIGN_UP } from "../constants/validation";
import { App } from "../classes/app";
import { ROUTE_SIGN_UP } from "../config/routes";
import { ProtectedRoutes } from "../classes/protected-routes";
import { User } from "../classes/user";

App.init(() => {
  const user = User.get();
  new ProtectedRoutes(ROUTE_SIGN_UP, user).check();
  new Validation(SIGN_UP);
});
