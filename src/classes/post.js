import { App } from "./app";
import { getDoc, doc } from "firebase/firestore";

export class Post {
  constructor(id) {
    this.id = id;
    this.#fetch();
  }
  async #fetch() {
    const db = App.db;
    const docData = await getDoc(doc(db, "posts", this.id));
    console.log(docData.data());
  }
}
