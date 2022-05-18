import { Validation } from "../classes/validation";
import { SIGN_IN } from "../constants/validation";
import { App } from "../classes/app";
import { ProtectedRoutes } from "../classes/protected-routes";
import { ROUTE_SIGN_IN } from "../config/routes";
import { User } from "../classes/user";

App.init(() => {
  const user = User.get();
  new ProtectedRoutes(ROUTE_SIGN_IN, user).check();
  new Validation(SIGN_IN);
});
