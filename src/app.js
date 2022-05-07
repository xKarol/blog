import "./scss/index.scss";
import { App } from "./classes/app";
import { Posts } from "./classes/posts";

App.init();

const posts = new Posts();
posts.fetch();
