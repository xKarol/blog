import { App } from "../classes/app";
import { Header } from "../classes/header";
import { Post } from "../classes/post";
import { Route } from "../classes/route";
import { User } from "../classes/user";

App.init(() => {
  const header = new Header();
  User.init(() => {
    header.render();
  });
  const params = Route.getURLParams();
  const postId = params.id;
  new Post(postId);
});
