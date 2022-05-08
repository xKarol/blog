import { App } from "./app";
import { getDoc, doc, increment, updateDoc } from "firebase/firestore";
import { formatNumber } from "../utils/format-number";
import { countWords } from "../utils/count-words";
import { calculateReadingTime } from "../utils/calculate-reading-time";

export class Post {
  constructor(id) {
    this.id = id;
    this.#fetch().then(() => this.#render());
    this.#incrementViews();
  }

  async #fetch() {
    const db = App.db;
    const docData = await getDoc(doc(db, "posts", this.id));
    this.data = docData.data();
  }

  async #incrementViews() {
    const db = App.db;
    await updateDoc(doc(db, "posts", this.id), {
      views: increment(1),
    });
  }

  #render() {
    const { title, text, images, views } = this.data;
    const titleElement = document.querySelector("#post-title");
    const imageElement = document.querySelector("#post-image");
    const viewsElement = document.querySelector("#post-views");
    const textElement = document.querySelector("#post-text");
    const readingTimeElement = document.querySelector("#post-reading-time");
    titleElement.innerText = title;
    titleElement.setAttribute("data-text", title);
    imageElement.src = images.regular;
    imageElement.alt = ""; //TODO add alt
    viewsElement.innerText = `${formatNumber(views)} views`;
    textElement.innerText = text;
    const words = countWords(text);
    readingTimeElement.innerText = calculateReadingTime(words);
  }
}
