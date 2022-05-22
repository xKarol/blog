import { App } from "../classes/app";
import { Header } from "../classes/header";
import { User } from "../classes/user";

App.init(() => {
  const header = new Header();
  User.init(() => {
    header.render();
  });
  const iframe = document.querySelector("#editor-iframe");
  iframe.contentDocument.body.style.color = "#fff";
  iframe.contentDocument.body.style.fontFamily = "sans-serif";
  iframe.contentDocument.designMode = "on";
});
