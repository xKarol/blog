import { App } from "./classes/app";
import { Header } from "./classes/header";
import { Post } from "./classes/post";
import { User } from "./classes/user";

App.init();

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const postId = params.id;
new Post(postId);
const user = User.get();
console.log(user);
new Header(user);
