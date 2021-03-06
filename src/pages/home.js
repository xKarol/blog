import { App } from "../classes/app";
import { Header } from "../classes/header";
import { Posts } from "../classes/posts";
// import { Seed } from "../classes/seed";
import { User } from "../classes/user";

App.init(async () => {
  const header = new Header();
  User.init(() => {
    header.render();
  });
  const posts = new Posts();
  posts.renderSkeleton();

  // if (process.env.NODE_ENV === "development") {
  //   await Seed.refresh(250);
  // }

  await posts.fetch();
});
