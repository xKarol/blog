import { App } from "../classes/app";
import { Editor } from "../classes/editor";
import { Header } from "../classes/header";
import { ProtectedRoutes } from "../classes/protected-routes";
import { Router } from "../classes/router";
import { User } from "../classes/user";
import { ROUTE_EDITOR, ROUTE_POST } from "../config/routes";

App.init(() => {
  const header = new Header();
  User.init((userData) => {
    new ProtectedRoutes(ROUTE_EDITOR, userData).check();
    header.render();
  });
  const root = document.querySelector("#editor-container");
  new Editor(root);
});
