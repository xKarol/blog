import { App } from "../classes/app";
import { Header } from "../classes/header";
import { Posts } from "../classes/posts";
import { InfiniteScroll } from "../classes/infinite-scroll";
import { Seed } from "../classes/seed";
import { User } from "../classes/user";

App.init(async () => {
  //   if (process.env.NODE_ENV === "development") {
  //     await Seed.refresh();
  //   }

  const posts = new Posts();
  await posts.fetch();
  const user = User.get();
  new Header(user);

  const mainEl = document.querySelector(".main");
  new InfiniteScroll(mainEl, async () => await posts.fetch());
});
