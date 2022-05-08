import { App } from "./app";
import { getDoc, doc, increment, updateDoc } from "firebase/firestore";

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
    const { title, images, views } = this.data;
    const titleElement = document.querySelector("#post-title");
    const imageElement = document.querySelector("#post-image");
    const viewsElement = document.querySelector("#post-views");
    titleElement.innerText = title;
    titleElement.setAttribute("data-text", title);
    imageElement.src = images.regular;
    imageElement.alt = ""; //TODO add alt
    viewsElement.innerText = views;
  }
}
