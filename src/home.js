import { App } from "./classes/app";
import { Header } from "./classes/header";
import { Posts } from "./classes/posts";
import { User } from "./classes/user";
import { Seed } from "./classes/seed";

App.init();

if (process.env.NODE_ENV === "development") {
  // fetching random data
  //   const seed = new Seed();
  // await seed.deleteAll();
  // await seed.init();
}
const posts = new Posts();
posts.fetch();

const user = new User();
const header = new Header();
header.updateButtons(user.loggedIn);
