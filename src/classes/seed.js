import {
  addDoc,
  doc,
  collection,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { App } from "./app";

export class Seed {
  constructor() {}

  async init() {
    const data = await this.#getSeed();
    const db = App.db;
    const postsRef = collection(db, "posts");
    data.forEach(async (post) => {
      await addDoc(postsRef, post);
    });
  }

  async deleteAll() {
    const db = App.db;
    const postsRef = collection(db, "posts");
    const data = await getDocs(postsRef);
    data.forEach(async (docData) => {
      await deleteDoc(doc(db, "posts", docData.id));
    });
  }

  async #getSeed() {
    try {
      const res = await fetch(
        "https://random-data-api.com/api/lorem_ipsum/random_lorem_ipsum?size=30"
      );
      const img = await fetch(
        `https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_CLIENT_ID}&count=30`
      );
      const images = await img.json();
      const data = await res.json();
      const timestamp = new Date().toUTCString();
      return data.map((item, index) => ({
        id: item.uid,
        title: item.long_sentence,
        text: item.very_long_sentence,
        createdAt: timestamp,
        images: images[index].urls,
      }));
    } catch (error) {
      console.error(error);
    }
  }
}
