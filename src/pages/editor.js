import { App } from "../classes/app";
import { Header } from "../classes/header";
import { User } from "../classes/user";

App.init(() => {
  const header = new Header();
  User.init(() => {
    header.render();
  });
  const editor = document.querySelector("#editor-textarea");
  editor.addEventListener("click", (e) => {
    console.log(e.target.selectionStart, e.target.selectionEnd);
  });

  const iframe = document.querySelector("#editor-iframe");
  iframe.contentDocument.body.addEventListener("click", (e) => {
    console.dir(e.target);
  });
});
