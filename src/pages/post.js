import { App } from "../classes/app";
import { Header } from "../classes/header";
import { Post } from "../classes/post";
import { Router } from "../classes/router";
import { User } from "../classes/user";

App.init(() => {
  const header = new Header();
  User.init(() => {
    header.render();
  });
  const params = Router.getURLParams();
  const postId = params.id;
  new Post(postId);
});
