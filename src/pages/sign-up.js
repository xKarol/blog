import { App } from "../classes/app";
import { ProtectedRoutes } from "../classes/protected-routes";
import { User } from "../classes/user";
import { SignUp } from "../classes/sign-up";
import { ROUTE_SIGN_UP } from "../config/routes";

App.init(() => {
  User.init((userData) => {
    new ProtectedRoutes(ROUTE_SIGN_UP, userData).check();
  });
  new SignUp();
});
