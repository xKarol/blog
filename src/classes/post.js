import { App } from "./app";
import { getDoc, doc, increment, updateDoc } from "firebase/firestore";
import { formatNumber } from "../utils/format-number";
import { countWords } from "../utils/count-words";
import { calculateReadingTime } from "../utils/calculate-reading-time";
import { Scroll } from "./scroll";

export class Post {
  constructor(id) {
    this.id = id;
    this.#fetch().then(() => this.#render());
    this.#incrementViews();
    new Scroll();
  }

  async #fetch() {
    const db = App.db;
    const docData = await getDoc(doc(db, "posts", this.id));
    const data = docData.data();
    const userData = await getDoc(doc(db, "users", data.userId));
    const user = userData.data();
    this.data = { ...data, user };
  }

  async #incrementViews() {
    const db = App.db;
    await updateDoc(doc(db, "posts", this.id), {
      views: increment(1),
    });
  }

  #render() {
    const { title, text, images, views, user } = this.data;
    const titleElement = document.querySelector("#post-title");
    const imageElement = document.querySelector("#post-image");
    const viewsElement = document.querySelector("#post-views");
    const authorElement = document.querySelector("#post-author");
    const textElement = document.querySelector("#post-text");
    const readingTimeElement = document.querySelector("#post-reading-time");
    titleElement.innerText = title;
    titleElement.setAttribute("data-text", title);
    imageElement.src = images.regular;
    imageElement.alt = ""; //TODO add alt
    viewsElement.innerText = `${formatNumber(views)} views`;
    authorElement.innerText = `${user.firstName} ${user.lastName}`;
    textElement.innerText = text;
    const words = countWords(text);
    readingTimeElement.innerText = calculateReadingTime(words);
  }
}
