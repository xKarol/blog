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
      const db = App.db;
      const usersRef = collection(db, "users");
      const usersData = await getDocs(usersRef);
      const users = usersData.docs.map((docData) => docData.id);
      if (!users.length) throw new Error("Seed Error: Not found user");
      const randomIndex = Math.floor(Math.random() * users.length);
      const randomUser = users[randomIndex];
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
        title: item.long_sentence,
        text: item.very_long_sentence,
        createdAt: timestamp,
        images: images[index].urls,
        userId: randomUser,
        views: 0,
      }));
    } catch (error) {
      console.error(error);
    }
  }
}
