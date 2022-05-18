import { Validation } from "../classes/validation";
import { SIGN_UP } from "../constants/validation";
import { App } from "../classes/app";
import { ProtectedRoutes } from "../classes/protected-routes";
import { User } from "../classes/user";

App.init(() => {
  User.init((userData) => {
    new ProtectedRoutes(ROUTE_SIGN_IN, userData).check();
  });
  new Validation(SIGN_UP);
});
