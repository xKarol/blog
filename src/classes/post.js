import { App } from "./app";
import { getDoc, doc } from "firebase/firestore";

export class Post {
  constructor(id) {
    this.id = id;
    this.#fetch().then(() => this.#render());
  }

  async #fetch() {
    const db = App.db;
    const docData = await getDoc(doc(db, "posts", this.id));
    this.data = docData.data();
    console.log(this.data);
  }

  #render() {
    const { title, images } = this.data;
    const titleElement = document.querySelector("#post-title");
    const imageElement = document.querySelector("#post-image");
    titleElement.innerText = title;
    titleElement.setAttribute("data-text", title);
    imageElement.src = images.regular;
    imageElement.alt = ""; //TODO add alt
    console.log(images);
  }
}
