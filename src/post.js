import { App } from "./classes/app";
import { Post } from "./classes/post";

App.init();

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const postId = params.id;
console.log(postId);
new Post(postId);
