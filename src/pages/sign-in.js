import { Validation } from "../classes/validation";
import { SIGN_IN } from "../constants/validation";
import { App } from "../classes/app";
import { ProtectedRoutes } from "../classes/protected-routes";
import { ROUTE_SIGN_IN } from "../config/routes";
import { User } from "../classes/user";

App.init(async () => {
  User.init((userData) => {
    new ProtectedRoutes(ROUTE_SIGN_IN, userData).check();
  })
  new Validation(SIGN_IN);
});
