import { App } from "../classes/app";
import { Header } from "../classes/header";
import { Posts } from "../classes/posts";
import { Seed } from "../classes/seed";
import { User } from "../classes/user";

App.init(async () => {
  //   if (process.env.NODE_ENV === "development") {
  //     await Seed.refresh();
  //   }

  const user = User.get();
  new Header(user);
  const posts = new Posts();
  posts.renderSkeleton();
  await posts.fetch();
});
