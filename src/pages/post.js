import { App } from "../classes/app";
import { Header } from "../classes/header";
import { Post } from "../classes/post";
import { User } from "../classes/user";
import { ScrollProgress } from "../classes/scroll-progress";

App.init(() => {
  const params = App.getURLParams();
  const postId = params.id;
  new Post(postId);
  const user = User.get();
  new Header(user);

  const postEl = document.querySelector(".post__container");
  new ScrollProgress(postEl);
});
