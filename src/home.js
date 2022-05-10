import { App } from "./classes/app";
import { Header } from "./classes/header";
import { Posts } from "./classes/posts";
import { User } from "./classes/user";

App.init();

const posts = new Posts();
posts.fetch();

// if (process.env.NODE_ENV === "development") {
//   // fetching random data
//   posts.deleteAll();
//   posts.createRandom();
// }

const user = new User();
new Header(user);
