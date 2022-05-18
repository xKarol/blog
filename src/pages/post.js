import { App } from "../classes/app";
import { Header } from "../classes/header";
import { Post } from "../classes/post";
import { Route } from "../classes/route";
import { User } from "../classes/user";

App.init(() => {
  User.init((userData) => {
    new Header(userData);
  });
  const params = Route.getURLParams();
  const postId = params.id;
  new Post(postId);
});
