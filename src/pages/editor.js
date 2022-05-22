import { App } from "../classes/app";
import { Editor } from "../classes/editor";
import { Header } from "../classes/header";
import { User } from "../classes/user";

App.init(() => {
  const header = new Header();
  User.init(() => {
    header.render();
  });
  const root = document.querySelector("#editor-container");
  new Editor(root);
});
